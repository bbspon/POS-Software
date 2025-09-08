const Product = require("../models/Product");
const { writeToPath } = require("fast-csv");

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST a new product
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

// PUT update product by ID
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// BULK DELETE
exports.bulkDelete = async (req, res) => {
  await Product.deleteMany({ _id: { $in: req.body.ids } });
  res.json({ message: "Selected products deleted" });
};
// 📥 CSV IMPORT
exports.importProductsFromCSV = async (req, res) => {
  const filePath = req.file.path;
  const products = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      if (row.Product && row.Stock && row.Status && row.Category && row.Price) {
        products.push({
          product: row.Product,
          stock: parseInt(row.Stock),
          status: row.Status,
          category: row.Category,
          price: parseFloat(row.Price),
        });
      }
    })
    .on("end", async () => {
      try {
        await Product.insertMany(products);
        res.status(200).json({ message: "Products imported successfully!" });
      } catch (err) {
        res.status(500).json({ error: "Import failed", details: err.message });
      }
    });
};

// 📤 CSV EXPORT
exports.exportProductsToCSV = async (req, res) => {
  try {
    const products = await Product.find();

    const csvStream = fastcsv.format({ headers: true });
    res.setHeader("Content-Disposition", "attachment; filename=products.csv");
    res.set("Content-Type", "text/csv");
    csvStream.pipe(res);

    products.forEach((p) => {
      csvStream.write({
        Product: p.product,
        Stock: p.stock,
        Status: p.status,
        Category: p.category,
        Price: p.price,
      });
    });

    csvStream.end();
  } catch (err) {
    res.status(500).json({ error: "Export failed", details: err.message });
  }
};
