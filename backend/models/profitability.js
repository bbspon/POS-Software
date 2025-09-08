const mongoose = require("mongoose");

const profitabilitySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    revenue: {
      type: Number,
      required: true,
      min: 0,
    },
    expenses: {
      type: Number,
      required: true,
      min: 0,
    },
    profit: {
      type: Number,
      default: function () {
        return this.revenue - this.expenses;
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profitability", profitabilitySchema);
