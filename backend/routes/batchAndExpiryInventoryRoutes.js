const express = require("express");
const router = express.Router();
const {
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} = require("../controllers/batchController");

// Correct way to bind controller functions to routes
router.get("/", getAllBatches);
router.post("/", createBatch);
router.put("/:id", updateBatch);
router.delete("/:id", deleteBatch);

module.exports = router;
