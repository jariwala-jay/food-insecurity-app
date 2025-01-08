// models/Inventory.js
import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pantryItems: [{ item: { type: String, required: true }, quantity: { type: Number, required: true } }],
  otherItems: [{ item: { type: String, required: true }, quantity: { type: Number, required: true } }],
});

export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
