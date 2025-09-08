const Inventory = require("../models/Inventory");

// GET all inventory items
exports.getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory", error: err });
  }
};

// POST new inventory item
exports.addInventoryItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: "Error adding item", error: err });
  }
};

// PUT update inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Error updating item", error: err });
  }
};

// DELETE item by ID
exports.deleteInventoryItem = async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
};

// BULK DELETE
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    await Inventory.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Bulk delete successful" });
  } catch (err) {
    res.status(400).json({ message: "Bulk delete failed", error: err });
  }
};
