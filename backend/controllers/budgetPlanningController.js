const BudgetPlanning = require("../models/budgetPlanning");

// CREATE
exports.createBudget = async (req, res) => {
  try {
    const { category, planned, actual } = req.body;
    const newEntry = new BudgetPlanning({
      category,
      planned,
      actual,
      createdBy: req.user.id,
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Error creating budget allocation" });
  }
};

// READ ALL
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await BudgetPlanning.find().sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Error fetching budgets" });
  }
};

// UPDATE
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await BudgetPlanning.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating budget" });
  }
};

// DELETE
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    await BudgetPlanning.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting budget" });
  }
};
