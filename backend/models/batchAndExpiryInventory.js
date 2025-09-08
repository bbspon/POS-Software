const mongoose = require("mongoose");

const batchAndExpiryInventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  batchNumber: { type: String, required: true, unique: true },
  manufacturingDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["Active", "Near Expiry", "Expired"],
    default: "Active",
  },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "BatchAndExpiryInventory",
  batchAndExpiryInventorySchema
);
