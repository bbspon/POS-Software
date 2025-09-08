const AccountPayable = require("../models/accountPayable");
const { Parser } = require("json2csv");
const csv = require("csvtojson");

// Create
exports.createPayable = async (req, res) => {
  try {
    const payable = new AccountPayable(req.body);
    await payable.save();
    res.status(201).json(payable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getAllPayables = async (req, res) => {
  try {
    const payables = await AccountPayable.find().sort({ dueDate: 1 });
    res.json(payables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updatePayable = async (req, res) => {
  try {
    const payable = await AccountPayable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!payable) return res.status(404).json({ error: "Payable not found" });
    res.json(payable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deletePayable = async (req, res) => {
  try {
    const payable = await AccountPayable.findByIdAndDelete(req.params.id);
    if (!payable) return res.status(404).json({ error: "Payable not found" });
    res.json({ message: "Payable deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk Delete
exports.bulkDeletePayables = async (req, res) => {
  try {
    const { ids } = req.body;
    await AccountPayable.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Selected payables deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export CSV
exports.exportPayablesCSV = async (req, res) => {
  try {
    const payables = await AccountPayable.find();
    const fields = ["vendor", "invoiceNumber", "dueDate", "amount", "status"];
    const parser = new Parser({ fields });
    const csvData = parser.parse(payables);
    res.header("Content-Type", "text/csv");
    res.attachment("payables.csv");
    res.send(csvData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Import CSV
exports.importPayablesCSV = async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(req.file.path);
    await AccountPayable.insertMany(jsonArray, { ordered: false });
    res.status(201).json({ message: "Imported successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
