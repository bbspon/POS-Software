const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { verifyTokenAndRole } = require("../middleware/authMiddleware");

// Public
router.get("/", inventoryController.getInventory);

// Protected (Admin/Vendor level)
router.post("/", verifyTokenAndRole, inventoryController.addInventoryItem);
router.put("/:id", verifyTokenAndRole, inventoryController.updateInventoryItem);
router.delete(
  "/:id",
  verifyTokenAndRole,
  inventoryController.deleteInventoryItem
);
router.post("/bulk-delete", verifyTokenAndRole, inventoryController.bulkDelete);

module.exports = router;
