// routes/hospitalInvoiceRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/hospitalInvoiceController");

// /api/hospital-invoices
router.post("/", controller.createInvoice);
router.get("/", controller.getAllInvoices);
router.get("/:id", controller.getInvoiceById);
router.delete("/:id", controller.deleteInvoice);

module.exports = router;
