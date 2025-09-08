// backend/routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken, requireRoles } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/categoryController");

// Admin UI uses /api/categories
router.get("/",verifyToken, ctrl.getAll);
router.post("/",verifyToken, ctrl.create);
router.put("/:id", verifyToken,ctrl.update);
router.delete("/:id", verifyToken,ctrl.remove);

module.exports = router;
