// routes/returnsAndRefundsRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllReturns,
  createReturn,
  updateReturn,
  deleteReturn,
} = require("../controllers/returnsAndRefundsController");

// Main routes
router.get("/", getAllReturns);
router.post("/", createReturn);
router.put("/:id", updateReturn);
router.delete("/:id", deleteReturn);

module.exports = router;
