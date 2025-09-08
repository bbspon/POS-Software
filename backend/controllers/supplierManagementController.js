const SupplierOrder = require("../models/supplierManagement");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await SupplierOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new SupplierOrder(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await SupplierOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await SupplierOrder.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};
