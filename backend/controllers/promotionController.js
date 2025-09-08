const Promotion = require("../models/promotion");

// GET all promotions
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch promotions" });
  }
};

// POST new promotion
exports.createPromotion = async (req, res) => {
  try {
    const newPromo = new Promotion(req.body);
    await newPromo.save();
    res.status(201).json(newPromo);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create promotion", details: error.message });
  }
};

// PUT update promotion
exports.updatePromotion = async (req, res) => {
  try {
    const updatedPromo = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPromo)
      return res.status(404).json({ error: "Promotion not found" });
    res.json(updatedPromo);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update promotion", details: error.message });
  }
};

// DELETE promotion
exports.deletePromotion = async (req, res) => {
  try {
    const deleted = await Promotion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Promotion not found" });
    res.json({ message: "Promotion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete promotion" });
  }
};
