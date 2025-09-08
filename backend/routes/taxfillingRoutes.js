const express = require("express");
const router = express.Router();
const {
  createTaxEntry,
  getAllTaxEntries,
  updateTaxEntry,
  deleteTaxEntry,
} = require("../controllers/taxfillingController");
// const {
//   authenticateJWT,
//   authorizeRoles,
// } = require("../middlewares/authMiddleware");

// CRUD routes
router.get("/",
    //  authenticateJWT
      getAllTaxEntries);
router.post(
  "/",
//   authenticateJWT,
//   authorizeRoles(["admin", "vendor"]),
  createTaxEntry
);
router.put(
  "/:id",
//   authenticateJWT,
//   authorizeRoles(["admin", "vendor"]),
  updateTaxEntry
);
router.delete(
  "/:id",
//   authenticateJWT,
//   authorizeRoles(["admin"]),
  deleteTaxEntry
);

module.exports = router;
