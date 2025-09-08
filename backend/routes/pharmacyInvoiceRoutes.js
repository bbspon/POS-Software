const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoiceById,
} = require("../controllers/pharmacyInvoiceController");

router.post("/", createInvoice);
router.get("/:id", getInvoiceById); // <-- This line fetches invoice by ID

module.exports = router;
