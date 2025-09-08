const TaxFilling = require("../models/taxfilling");

// Create
exports.createTaxEntry = async (req, res) => {
  try {
    const newEntry = await TaxFilling.create(req.body);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getAllTaxEntries = async (req, res) => {
  try {
    const data = await TaxFilling.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateTaxEntry = async (req, res) => {
  try {
    const updated = await TaxFilling.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated) return res.status(404).json({ error: "Entry not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteTaxEntry = async (req, res) => {
  try {
    const deleted = await TaxFilling.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Entry not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
