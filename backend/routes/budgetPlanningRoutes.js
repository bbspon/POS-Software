const express = require("express");
const router = express.Router();
const controller = require("../controllers/budgetPlanningController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// Public or restricted based on use case
router.get("/", controller.getAllBudgets);
router.post(
  "/",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.createBudget
);
router.put(
  "/:id",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.updateBudget
);
router.delete(
  "/:id",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.deleteBudget
);

module.exports = router;
