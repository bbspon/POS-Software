exports.validateBatch = (req, res, next) => {
  const {
    productName,
    batchNumber,
    manufacturingDate,
    expiryDate,
    quantity,
    location,
  } = req.body;

  if (
    !productName ||
    !batchNumber ||
    !manufacturingDate ||
    !expiryDate ||
    !quantity ||
    !location
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a positive number" });
  }

  next();
};
