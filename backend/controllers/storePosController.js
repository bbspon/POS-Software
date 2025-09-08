const StorePOS = require("../models/storePos");

// GET all summary entries
exports.getAllSummaries = async (req, res) => {
  try {
    const data = await StorePOS.find().sort({ date: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single summary by ID
exports.getSummaryById = async (req, res) => {
  try {
    const data = await StorePOS.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new summary
exports.createSummary = async (req, res) => {
  try {
    const newEntry = new StorePOS(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update summary
exports.updateSummary = async (req, res) => {
  try {
    const updated = await StorePOS.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE summary
exports.deleteSummary = async (req, res) => {
  try {
    const deleted = await StorePOS.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
