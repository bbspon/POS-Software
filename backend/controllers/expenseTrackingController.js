const ExpenseTracking = require("../models/expenseTracking");

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseTracking.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err });
  }
};

// Create new expense
exports.createExpense = async (req, res) => {
  try {
    const newExpense = new ExpenseTracking(req.body);
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create expense", error: err });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const updated = await ExpenseTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Expense not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update expense", error: err });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await ExpenseTracking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense", error: err });
  }
};
