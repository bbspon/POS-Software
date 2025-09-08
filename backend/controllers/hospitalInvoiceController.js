// controllers/hospitalInvoiceController.js
const HospitalInvoice = require("../models/HospitalInvoice");

// Create new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new HospitalInvoice(req.body);
    await invoice.save();
    res.status(201).json({ message: "Invoice saved", invoice });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error saving invoice", details: err.message });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const data = await HospitalInvoice.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching invoices" });
  }
};

// Get one invoice
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await HospitalInvoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Not found" });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: "Error fetching invoice" });
  }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    await HospitalInvoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting invoice" });
  }
};
