const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderinventoryController");

// GET all orders
router.get("/", getAllOrders);

// POST new order
router.post("/", createOrder);

// PUT update
router.put("/:id", updateOrder);

// DELETE
router.delete("/:id", deleteOrder);

module.exports = router;
