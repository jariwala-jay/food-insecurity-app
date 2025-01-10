// pages/api/inventory.js
import dbConnect from '../../../utils/dbConnect';
import Inventory from '../../../models/Inventory';

// Function to format the expiry date
const formatExpiryDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.query;

  if (req.method === 'POST') {
    const { item, quantity, unit, expiry, type } = req.body;

    if (!userId || !item || !quantity || !unit || !expiry || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      let inventory = await Inventory.findOne({ userId });

      if (!inventory) {
        inventory = new Inventory({ userId, items: [] });
      }

      if (!inventory.items) {
        inventory.items = [];
      }

      // Push the new item into the items array
      inventory.items.push({ item, quantity, unit, expiry: formatExpiryDate(expiry), type });

      await inventory.save();
      return res.status(200).json(inventory);
    } catch (error) {
      console.log('Request Body:', req.body);
      return res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const inventory = await Inventory.findOne({ userId });
      return res.status(200).json(inventory);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { itemId, item, quantity, unit, expiry, type } = req.body;
  
    if (!userId || !itemId || !item || !quantity || !unit || !expiry || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const result = await Inventory.findOneAndUpdate(
        { userId, "items._id": itemId },
        {
          $set: {
            "items.$.item": item,
            "items.$.quantity": quantity,
            "items.$.unit": unit,
            "items.$.expiry": formatExpiryDate(expiry),
            "items.$.type": type
          }
        },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Update error:', error);
      return res.status(400).json({ error: error.message });
    }
  }
  
  // DELETE method handler
  else if (req.method === 'DELETE') {
    const { itemId } = req.body;
  
    if (!userId || !itemId) {
      return res.status(400).json({ error: 'User ID and item ID are required' });
    }
  
    try {
      const result = await Inventory.findOneAndUpdate(
        { userId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ error: 'Inventory or item not found' });
      }
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Delete error:', error);
      return res.status(400).json({ error: error.message });
    }
  }
}