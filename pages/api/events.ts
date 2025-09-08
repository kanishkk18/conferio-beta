// // pages/api/events.ts
// import { prisma } from 'utils/db';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   switch (req.method) {
//     case 'POST':
//       return handleCreateEvent(req, res);
//     case 'GET':
//       return handleGetEvents(req, res);
//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // POST handler: Create new event
// async function handleCreateEvent(req: NextApiRequest, res: NextApiResponse) {
//   const { title, description, date, time } = req.body;

//   // Validation
//   if (!title || !description || !date || !time) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const dateTime = new Date(`${date}T${time}:00`);
    
//     // Additional validation for date format
//     if (isNaN(dateTime.getTime())) {
//       return res.status(400).json({ error: 'Invalid date or time format' });
//     }

//     const event = await prisma.event.create({
//       data: {
//         title,
//         description,
//         date: dateTime,
//       },
//     });

//     return res.status(201).json(event);
//   } catch (error) {
//     console.error('Error creating event:', error);
//     return res.status(500).json({ error: 'Failed to create event' });
//   }
// }

// // GET handler: Fetch events
// async function handleGetEvents(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { limit, after } = req.query;
    
//     const events = await prisma.event.findMany({
//       where: {
//         date: after ? { gt: new Date(after as string) } : undefined,
//       },
//       orderBy: { date: 'asc' },
//       take: limit ? parseInt(limit as string) : undefined,
//     });

//     return res.status(200).json(events);
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return res.status(500).json({ error: 'Failed to retrieve events' });
//   }
// }