const mongoose = require("mongoose");

const expenseTrackingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Marketing", "Utilities", "Travel", "Office Supplies", "Others"],
    },
    description: {
      type: String,
      maxlength: 255,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    status: {
      type: String,
      required: true,
      enum: ["Paid", "Pending"],
    },
    responsible: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExpenseTracking", expenseTrackingSchema);
