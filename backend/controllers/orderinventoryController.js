const OrderInventory = require("../models/orderInventory");

// GET all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderInventory.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
};

// POST a new order
exports.createOrder = async (req, res) => {
  try {
    const { orderNumber, customer, date, status, totalAmount } = req.body;
    const newOrder = new OrderInventory({
      orderNumber,
      customer,
      date,
      status,
      totalAmount,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: "Failed to create order", error: err });
  }
};

// PUT (Update) an order
exports.updateOrder = async (req, res) => {
  try {
    const updated = await OrderInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update order", error: err });
  }
};

// DELETE an order
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await OrderInventory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete order", error: err });
  }
};
