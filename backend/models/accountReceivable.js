const mongoose = require("mongoose");

const accountReceivableSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    trim: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue", "Partial", "Cancelled"],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("AccountReceivable", accountReceivableSchema);
