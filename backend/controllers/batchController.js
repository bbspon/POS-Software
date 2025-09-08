const BatchInventory = require("../models/batchAndExpiryInventory");
const calculateExpiryStatus = require("../utils/calculateExpiryStatus");

exports.getAllBatches = async (req, res) => {
  try {
    const batches = await BatchInventory.find();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBatch = async (req, res) => {
  try {
    const {
      productName,
      batchNumber,
      manufacturingDate,
      expiryDate,
      quantity,
      location,
    } = req.body;
    const status = calculateExpiryStatus(expiryDate);
    const newBatch = new BatchInventory({
      productName,
      batchNumber,
      manufacturingDate,
      expiryDate,
      quantity,
      status,
      location,
    });
    await newBatch.save();
    res.status(201).json(newBatch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (updatedData.expiryDate) {
      updatedData.status = calculateExpiryStatus(updatedData.expiryDate);
    }
    const updatedBatch = await BatchInventory.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    res.json(updatedBatch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    await BatchInventory.findByIdAndDelete(id);
    res.json({ message: "Batch deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
