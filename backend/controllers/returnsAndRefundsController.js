// controllers/returnsAndRefundsController.js
const ReturnsAndRefunds = require("../models/returnsAndRefundsInventory");

// ✅ Get all return and refund entries
const getAllReturns = async (req, res) => {
  try {
    const data = await ReturnsAndRefunds.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch returns", error });
  }
};

// ✅ Create a new return/refund
const createReturn = async (req, res) => {
  try {
    const newReturn = new ReturnsAndRefunds(req.body);
    const saved = await newReturn.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create return", error });
  }
};

// ✅ Update a return/refund entry
const updateReturn = async (req, res) => {
  try {
    const updated = await ReturnsAndRefunds.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Return entry not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update return", error });
  }
};

// ✅ Delete a return/refund entry
const deleteReturn = async (req, res) => {
  try {
    const deleted = await ReturnsAndRefunds.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Return entry not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete return", error });
  }
};

module.exports = {
  getAllReturns,
  createReturn,
  updateReturn,
  deleteReturn,
};
