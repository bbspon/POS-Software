const mongoose = require("mongoose");

const taxFillingSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Sales", "Services", "Imports", "Others"], // Expand as needed
  },
  taxType: {
    type: String,
    required: true,
    enum: ["GST", "VAT", "Income Tax", "TDS", "Service Tax", "Others"], // Extendable
  },
  amount: {
    type: Number,
    required: true,
    min: 0.0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TaxFilling", taxFillingSchema);
