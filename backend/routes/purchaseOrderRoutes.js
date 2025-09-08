const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../controllers/purchaseOrderController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all routes
// router.use(authMiddleware.verifyToken);

// Create
router.post("/", purchaseOrderController.createPurchaseOrder);

// Read All
router.get("/", purchaseOrderController.getAllPurchaseOrders);

// Read One
router.get("/:id", purchaseOrderController.getPurchaseOrderById);

// Update
router.put("/:id", purchaseOrderController.updatePurchaseOrder);

// Delete
router.delete("/:id", purchaseOrderController.deletePurchaseOrder);

module.exports = router;
