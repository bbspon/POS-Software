const express = require("express");
const router = express.Router();
const {
  getAllCustomerLoyalty,
  addCustomerLoyalty,
  updateCustomerLoyalty,
  deleteCustomerLoyalty,
} = require("../controllers/customerLoyaltyController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// Protected routes with role check (e.g., admin, staff, etc.)
// router.get("/", verifyToken, getAllCustomerLoyalty);
// router.post(
//   "/",
//   verifyToken,
//   checkRole(["admin", "staff"]),
//   addCustomerLoyalty
// );
// router.put(
//   "/:id",
//   verifyToken,
//   checkRole(["admin", "staff"]),
//   updateCustomerLoyalty
// );
// router.delete("/:id", verifyToken, checkRole(["admin"]), deleteCustomerLoyalty);
router.get("/", getAllCustomerLoyalty);
router.post(
  "/",
  addCustomerLoyalty
);
router.put(
  "/:id",
  updateCustomerLoyalty
);
router.delete("/:id",deleteCustomerLoyalty);

module.exports = router;
