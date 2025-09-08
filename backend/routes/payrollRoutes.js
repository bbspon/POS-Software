const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// Role access: Only Admin, Managers, etc.
router.get("/", 
    // verifyToken, 
    payrollController.getAllPayrolls);
router.post(
  "/",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  payrollController.createPayroll
);
router.put(
  "/:id",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  payrollController.updatePayroll
);
router.delete(
  "/:id",
//   verifyToken,
//   checkRole(["admin"]),
  payrollController.deletePayroll
);

module.exports = router;
