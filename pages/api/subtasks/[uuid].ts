// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { validate } from 'uuid';
// import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"; // adjust this path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

    if (!req.query.uuid || !validate(req.query.uuid.toString())) {
        return res.status(400).end('Invalid subtask UUID');
    }
    switch (req.method) {
        case 'PUT': {
            return await updateSubtask(req, res, session);
        }
        default:
            res.status(405).end('Method not allowed');
            break;
    }
}

const updateSubtask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const subtaskUUID = req.query.uuid!.toString();
    const currentSubtaskData = await prisma.subtask.findFirst({
        where: {
            uuid: subtaskUUID,
            userId: session.user.id,
        },
    });
    const { name, completed } = req.body;
    if (typeof name === 'undefined' && typeof completed === 'undefined') {
        return res.status(400).end('No data to update');
    }

    if (!currentSubtaskData) {
        return res.status(404).end('Subtask not found');
    }

    const newSubtaskData = {
        name: typeof name === 'string' ? name : currentSubtaskData.name,
        completed: typeof completed === 'boolean' ? completed : currentSubtaskData.completed,
    };
    const response = await prisma.subtask.update({
        where: {
            uuid: subtaskUUID,
        },
        data: newSubtaskData,
    });
    return res.status(200).json(response);
};
