module.exports = (req, res, next) => {
  const { productName, sku, price } = req.body;
  if (!productName || !sku || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  next();
};
  