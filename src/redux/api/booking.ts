// import type { NextApiRequest, NextApiResponse } from 'next';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { bookingId } = req.query;

//     try {
//         const response = await fetch(`https://192.168.1.107:83/Help/Api/GET-booking-id`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch booking data' });
//     }
// };

// export default handler;

