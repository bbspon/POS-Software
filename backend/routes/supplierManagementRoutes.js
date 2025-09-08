const express = require("express");
const router = express.Router();
const controller = require("../controllers/supplierManagementController");


// const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", controller.getAllOrders); // Avoids destructuring issues
router.post("/", controller.createOrder);
router.put("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;
