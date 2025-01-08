import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Ensure you store the secret securely

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          SECRET_KEY,
          { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with token and user data
        res.status(200).json({
          message: 'Login successful!',
          token,
          user: { id: user._id, name: user.name, email: user.email },
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
