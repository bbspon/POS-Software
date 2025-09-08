const mongoose = require("mongoose");

const storePosSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    totalSalesToday: {
      type: Number,
      required: true,
      min: 0,
    },
    totalOrders: {
      type: Number,
      required: true,
      min: 0,
    },
    netSales: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StorePOS", storePosSchema);
