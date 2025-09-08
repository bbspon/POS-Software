// models/returnsAndRefundsInventory.js
const mongoose = require("mongoose");

const returnsAndRefundsSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderDate: { type: Date, required: true },
  orderTotal: { type: Number, required: true, min: 0.01 },
  channel: {
    type: String,
    enum: ["POS", "Online", "App", "Reseller"],
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
      "Returned",
      "Failed",
      "Refunded",
      "Partial Refunded",
    ],
    required: true,
  },
});

module.exports =
  mongoose.models.ReturnsAndRefunds ||
  mongoose.model("ReturnsAndRefunds", returnsAndRefundsSchema);
