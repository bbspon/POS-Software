const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemCode: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitCost: { type: Number, required: true, min: 0 },
});

const purchaseOrderSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },

  orderNumber: { type: String, required: true, unique: true },
  orderDate: { type: Date, required: true },

  vendorName: { type: String, required: true },
  vendorAddress: { type: String, required: true },

  items: [itemSchema],

  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, default: 0 },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
