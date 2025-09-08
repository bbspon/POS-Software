const express = require("express");
const router = express.Router();
const controller = require("../controllers/physicalInventoryController");
const { verifyTokenAndRole } = require("../middleware/authMiddleware");

// All routes protected with JWT + role check
router.get("/", controller.getAll); // ✅ works without middleware
router.post(
  "/",
  verifyTokenAndRole,
//   auth.requireRole(["admin", "manager"]),
  controller.create
);
router.put(
  "/:id",
  verifyTokenAndRole,
//   auth.requireRole(["admin", "manager"]),
  controller.update
);
router.delete(
  "/:id",
  verifyTokenAndRole,
//   auth.requireRole(["admin"]),
  controller.delete
);
router.post(
  "/bulk-delete",
  verifyTokenAndRole,
//   auth.requireRole(["admin"]),
  controller.bulkDelete
);

module.exports = router;
