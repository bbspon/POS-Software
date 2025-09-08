const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDelete,
  importProductsFromCSV,
  exportProductsToCSV,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

// const authMiddleware = require("../middlewares/authMiddleware");

// router.get("/", authMiddleware, getProducts);
// router.post("/", authMiddleware, createProduct);
// router.put("/:id", authMiddleware, updateProduct);
// router.delete("/:id", authMiddleware, deleteProduct);
// router.post("/bulk-delete", authMiddleware, bulkDelete);
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/bulk-delete", bulkDelete);
// 📤 CSV Export
router.get('/export/csv',exportProductsToCSV);

// 📥 CSV Import (upload CSV file)
router.post('/import/csv',upload.single('file'), importProductsFromCSV);

module.exports = router;
