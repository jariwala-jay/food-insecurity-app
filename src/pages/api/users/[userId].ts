import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    // Ensure DB is connected
    await dbConnect();

    // Check if userId is valid
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }

    // Find user in the database
    const user = await User.findById(userId).select('-password'); // Exclude sensitive fields like password

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
