// import type { NextApiRequest, NextApiResponse } from 'next';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { bookingId } = req.query;

//     try {
//         const response = await fetch(`https://api-pnv.bluejaypos.vn/booking/${bookingId}`);
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