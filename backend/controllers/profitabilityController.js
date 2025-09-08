const Profitability = require("../models/profitability");

// GET all entries
exports.getAllProfitEntries = async (req, res) => {
  try {
    const entries = await Profitability.find();
    res.json(entries);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while fetching profitability data." });
  }
};

// POST create entry
exports.createProfitEntry = async (req, res) => {
  try {
    const { category, revenue, expenses } = req.body;
    const profit = revenue - expenses;
    const newEntry = new Profitability({ category, revenue, expenses, profit });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: "Error creating profit entry." });
  }
};

// PUT update entry
exports.updateProfitEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, revenue, expenses } = req.body;
    const updated = await Profitability.findByIdAndUpdate(
      id,
      { category, revenue, expenses, profit: revenue - expenses },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error updating profit entry." });
  }
};

// DELETE entry
exports.deleteProfitEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await Profitability.findByIdAndDelete(id);
    res.json({ message: "Profit entry deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting profit entry." });
  }
};
