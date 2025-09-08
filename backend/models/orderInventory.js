const mongoose = require("mongoose");

const orderInventorySchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true }, // e.g., ORD1001
    customer: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      required: true,
    },
    totalAmount: { type: Number, required: true, min: 0.01 },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.OrderInventory ||
  mongoose.model("OrderInventory", orderInventorySchema);
