// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from 'lib/prisma';
// import { v4 as uuidv4 } from 'uuid';
// import { getSession } from 'next-auth/react';
// import { Session } from 'next-auth';

// type Board = {
//     name: string;
//     columns?: Column[];
//     uuid: string;
//     user: string;
// };

// type Column = {
//     name: string;
//     color: string;
//     position: number;
//     uuid: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const session = await getSession({ req });
//     if (!session) {
//         return res.status(401).end('Unauthorized');
//     }

//     switch (req.method) {
//         case 'POST': {
//             return await createBoard(req, res, session);
//         }
//         case 'GET': {
//             return await getBoards(res, session);
//         }
//         default:
//             return res.status(405).end('Method not allowed');
//     }
// }

// const validateBoard = (board: Board) => {
//     if (!board.name) {
//         throw new Error('Board name is required');
//     } else if (board.name.trim().length < 1) {
//         throw new Error('Board name cannot be empty');
//     } else if (board.name.trim().length > 30) {
//         throw new Error('Board name cannot be longer than 30 characters');
//     }
// };

// const getBoards = async (res: NextApiResponse, session: Session) => {
//     try {
//         const boards = await prisma.board.findMany({
//             where: {
//                 userId: session.user.id,
//             },
//             include: {
//                 columns: true,
//             },
//         });
//         res.status(200).json(boards);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };

// const createBoard = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
//     const boardData: { name: string; columns: { name: string; color: string }[] } = req.body;
//     const board: Board = {
//         name: boardData.name,
//         uuid: uuidv4(),
//         user: session.user.id,
//     };
//     if (boardData.columns) {
//         const set = new Set();
//         if (boardData.columns.some((col) => set.size === (set.add(col.name), set.size))) {
//             return res.status(400).json({ error: 'Column names must be unique' });
//         }
//         board.columns = boardData.columns.map((column, i) => {
//             return {
//                 name: column.name,
//                 color: column.color,
//                 position: i,
//                 userId: session.user.id,
//                 uuid: uuidv4(),
//             };
//         });
//     }

//     try {
//         validateBoard(board);
//     } catch (error: any) {
//         return res.status(400).json({ error: error.message });
//     }
//     const payload = {
//         data: {
//             name: board.name,
//             uuid: board.uuid,
//             user: {
//                 connect: {
//                     id: board.user,
//                 },
//             },
//             columns: {},
//         },
//     };
//     if (board.columns) {
//         payload.data.columns = {
//             createMany: {
//                 data: board.columns,
//             },
//         };
//     }
//     try {
//         const newBoard = await prisma.board.create(payload);
//         res.status(201).json(newBoard);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error });
//     }
// };



// pages/api/boards.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // ✅ adjust if path is different
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth/next';
// import { authOptions } from './auth/[...nextauth]'; // ✅ adjust path to your auth config
import type { Session } from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuth';


type Column = {
  name: string;
  color: string;
  position: number;
  uuid: string;
  userId: string;
};

type Board = {
  name: string;
  uuid: string;
  user: string;
  columns?: Column[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req, res);
  const session = await getServerSession(req, res, authOptions);
  

  if (!session) {
    res.status(401).end('Unauthorized');
    return;
  }

  switch (req.method) {
    case 'POST':
      await createBoard(req, res, session);
      break;
    case 'GET':
      await getBoards(res, session);
      break;
    default:
      res.status(405).end('Method Not Allowed');
      break;
  }
}

const validateBoard = (board: Board) => {
  if (!board.name || board.name.trim().length < 1) {
    throw new Error('Board name cannot be empty');
  } else if (board.name.trim().length > 30) {
    throw new Error('Board name cannot be longer than 30 characters');
  }
};

const getBoards = async (res: NextApiResponse, session: Session) => {
  try {
    const boards = await prisma.board.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        columns: true,
      },
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards', details: error });
  }
};

// const createBoard = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
//   const boardData: { name: string; columns: { name: string; color: string }[] } = req.body;

//   const board: Board = {
//     name: boardData.name,
//     uuid: uuidv4(),
//     user: session.user.id,
//   };

//   // Validate column uniqueness
//   if (boardData.columns) {
//     const set = new Set();
//     if (boardData.columns.some((col) => set.size === (set.add(col.name), set.size))) {
//       res.status(400).json({ error: 'Column names must be unique' });
//       return;
//     }

//     board.columns = boardData.columns.map((column, i) => ({
//       name: column.name,
//       color: column.color,
//       position: i,
//       uuid: uuidv4(),
//       userId: session.user.id,
//     }));
//   }

//   try {
//     validateBoard(board);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//     return;
//   }

//   try {
//     const payload: any = {
//       data: {
//         name: board.name,
//         uuid: board.uuid,
//         user: {
//           connect: {
//             id: board.user,
//           },
//         },
//       },
//     };

//     if (board.columns) {
//       payload.data.columns = {
//         createMany: {
//           data: board.columns,
//         },
//       };
//     }

//     const newBoard = await prisma.board.create(payload);
//     res.status(201).json(newBoard);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Board creation failed', details: error });
//   }
// };

const createBoard = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  const boardData: { name: string; columns?: { name: string; color: string }[] } = req.body;

  const board: Board = {
    name: boardData.name,
    uuid: uuidv4(),
    user: session.user.id,
  };

  // ✅ If no columns provided, fallback to default columns
  const defaultColumns = [
    { name: 'To Do', color: '#f53b3b'},       // blue-500
    { name: 'In Progress', color: '#f59e0b'}, // amber-500
    { name: 'Done', color: '#10b981'},        // emerald-500
  ];

  const inputColumns = boardData.columns?.length ? boardData.columns : defaultColumns;

  // ✅ Check for duplicate names
  const uniqueNames = new Set();
  if (inputColumns.some((col) => uniqueNames.size === (uniqueNames.add(col.name), uniqueNames.size))) {
    res.status(400).json({ error: 'Column names must be unique' });
    return;
  }

  // ✅ Prepare columns for insertion
  board.columns = inputColumns.map((column, i) => ({
    name: column.name,
    color: column.color,
    position: i,
    uuid: uuidv4(),
    userId: session.user.id,
  }));

  try {
    validateBoard(board);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const payload = {
      data: {
        name: board.name,
        uuid: board.uuid,
        user: {
          connect: {
            id: board.user,
          },
        },
        columns: {
          createMany: {
            data: board.columns,
          },
        },
      },
    };

    const newBoard = await prisma.board.create(payload);
    res.status(201).json(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Board creation failed', details: error });
  }
};
