const AccountReceivable = require("../models/accountReceivable");
const { Parser } = require("json2csv");
const csv = require("csvtojson");

// Create
exports.createReceivable = async (req, res) => {
  try {
    const receivable = new AccountReceivable(req.body);
    await receivable.save();
    res.status(201).json(receivable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getAllReceivables = async (req, res) => {
  try {
    const receivables = await AccountReceivable.find().sort({ dueDate: 1 });
    res.json(receivables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateReceivable = async (req, res) => {
  try {
    const receivable = await AccountReceivable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!receivable)
      return res.status(404).json({ error: "Receivable not found" });
    res.json(receivable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteReceivable = async (req, res) => {
  try {
    const receivable = await AccountReceivable.findByIdAndDelete(req.params.id);
    if (!receivable)
      return res.status(404).json({ error: "Receivable not found" });
    res.json({ message: "Receivable deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk Delete
exports.bulkDeleteReceivables = async (req, res) => {
  try {
    const { ids } = req.body;
    await AccountReceivable.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Selected receivables deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export CSV
exports.exportReceivablesCSV = async (req, res) => {
  try {
    const receivables = await AccountReceivable.find();
    const fields = ["customer", "invoiceNumber", "dueDate", "amount", "status"];
    const parser = new Parser({ fields });
    const csvData = parser.parse(receivables);
    res.header("Content-Type", "text/csv");
    res.attachment("receivables.csv");
    res.send(csvData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Import CSV
exports.importReceivablesCSV = async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(req.file.path);
    await AccountReceivable.insertMany(jsonArray, { ordered: false });
    res.status(201).json({ message: "Imported successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
