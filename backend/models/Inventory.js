const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    productName: { type: String, required: true, minlength: 2 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0.01 },
    supplier: { type: String },
    warehouse: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
