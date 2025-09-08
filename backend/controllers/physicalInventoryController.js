const PhysicalInventory = require("../models/physicalInventory");

// Get all inventory items
exports.getAll = async (req, res) => {
  try {
    const items = await PhysicalInventory.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add new inventory item
exports.create = async (req, res) => {
  try {
    const newItem = new PhysicalInventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update inventory item
exports.update = async (req, res) => {
  try {
    const updated = await PhysicalInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete item
exports.delete = async (req, res) => {
  try {
    const deleted = await PhysicalInventory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk delete
exports.bulkDelete = async (req, res) => {
  try {
    await PhysicalInventory.deleteMany({ _id: { $in: req.body.ids } });
    res.status(200).json({ message: "Items deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
