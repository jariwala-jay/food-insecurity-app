
// models/Inventory.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  expiry: { type: Date, required: true },
  type: { type: String, required: true }
}, { 
  _id: true  // Explicitly enable _id for subdocuments
});

const InventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [ItemSchema]
});

export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);