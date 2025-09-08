// backend/routes/subcategoryRoutes.js
const express = require("express");
const router = express.Router();

// Adjust path if your middleware file differs
const { verifyToken } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/subcategoryController");

router.get("/", verifyToken, ctrl.getAll);
router.post("/", verifyToken, ctrl.create);
router.put("/:id", verifyToken, ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
