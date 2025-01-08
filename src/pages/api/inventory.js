// pages/api/inventory.js
import dbConnect from '../../../utils/dbConnect';
import Inventory from '../../../models/Inventory';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { userId, pantryItems, otherItems } = req.body;
    try {
      const inventory = new Inventory({ userId, pantryItems, otherItems });
      await inventory.save();
      res.status(201).json({ message: 'Inventory created successfully!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;
    try {
      const inventory = await Inventory.findOne({ userId });
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
