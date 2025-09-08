const mongoose = require("mongoose");

const budgetPlanningSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Marketing",
      "Operations",
      "Salaries",
      "Supplies",
      "Travel",
      "Maintenance",
      "IT",
      "Training",
    ], // You can expand
  },
  planned: {
    type: Number,
    required: true,
    min: 0,
  },
  actual: {
    type: Number,
    required: true,
    min: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BudgetPlanning", budgetPlanningSchema);
