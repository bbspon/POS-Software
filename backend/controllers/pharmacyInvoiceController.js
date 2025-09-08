const PharmacyInvoice = require("../models/PharmacyInvoice");

// POST /api/pharmacy-invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new PharmacyInvoice(req.body);
    const saved = await invoice.save();
    res.status(201).json({ savedId: saved._id });
  } catch (err) {
    console.error("Create invoice error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/pharmacy-invoice/:id
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await PharmacyInvoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (err) {
    console.error("Fetch invoice error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
