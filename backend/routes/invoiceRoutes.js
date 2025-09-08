const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");
// const authMiddleware = require("../middlewares/authMiddleware");

// router.get("/", authMiddleware, invoiceController.getInvoices);
// router.post("/", authMiddleware, invoiceController.createInvoice);
// router.delete("/:id", authMiddleware, invoiceController.deleteInvoice);
router.get("/", invoiceController.getInvoices);
router.post("/", invoiceController.createInvoice);
router.delete("/:id", invoiceController.deleteInvoice);
module.exports = router;
