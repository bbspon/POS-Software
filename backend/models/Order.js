// /backend/models/Order.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  totalAmount: { type: Number, required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Update updatedAt field automatically
OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("OrderInventory", OrderSchema, "orders");
