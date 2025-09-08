const Customer = require("../models/Customer");

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add new customer
exports.addCustomer = async (req, res) => {
  try {
    const { customerName, email, phone } = req.body;
    const newCustomer = new Customer({ customerName, email, phone });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: "Error adding customer", details: err });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: "Error updating customer", details: err });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting customer", details: err });
  }
};
