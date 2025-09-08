const mongoose = require("mongoose");

const supplierOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    orderedBy: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Completed",
      ],
      required: true,
    },
    orderId: { type: String },
    daysAgo: { type: String },
    revenueLastPeriod: { type: String },
    projectedRevenue: { type: String },
    deliveryDate: { type: String },
    orderQuantity: { type: String },
    paymentStatus: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupplierOrder", supplierOrderSchema);
