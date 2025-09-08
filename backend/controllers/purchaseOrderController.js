const PurchaseOrder = require("../models/purchaseOrder");

// Utility to calculate totals
const calculateTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));
  return { subtotal, tax, total };
};

// Create
// controllers/purchaseorderController.js
exports.createPurchaseOrder = async (req, res) => {
  try {
    const {
      companyName,
      companyAddress,
      orderNumber,
      orderDate,
      vendorName,
      vendorAddress,
      items,
      subtotal,
      taxes,
      total,
    } = req.body;

    if (
      !companyName ||
      !orderNumber ||
      !vendorName ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new PurchaseOrder({
      companyName,
      companyAddress,
      orderNumber,
      orderDate,
      vendorName,
      vendorAddress,
      items,
      subtotal,
      taxes,
      total,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};
  

// Get All
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get One
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update
exports.updatePurchaseOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const { subtotal, tax, total } = calculateTotals(items);

    const updated = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { ...req.body, subtotal, tax, total },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete
exports.deletePurchaseOrder = async (req, res) => {
  try {
    const deleted = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
