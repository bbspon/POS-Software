const express = require("express");
const router = express.Router();
const controller = require("../controllers/accountReceivableController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Create
router.post(
  "/",
  // verifyToken,
  // checkRole(["admin", "manager"]),
  controller.createReceivable
);

// Read
router.get(
  "/",
  // verifyToken,
  // checkRole(["admin", "manager", "cashier"]),
  controller.getAllReceivables
);

// Update
router.put(
  "/:id",
  // verifyToken,
  // checkRole(["admin", "manager"]),
  controller.updateReceivable
);

// Delete
router.delete(
  "/:id",
  // verifyToken,
  // checkRole(["admin", "manager"]),
  controller.deleteReceivable
);

// Bulk Delete
router.post(
  "/bulk-delete",
  // verifyToken,
  // checkRole(["admin"]),
  controller.bulkDeleteReceivables
);

// Export CSV
router.get(
  "/export",
  // verifyToken,
  // checkRole(["admin", "manager"]),
  controller.exportReceivablesCSV
);

// Import CSV
router.post(
  "/import",
  // verifyToken,
  // checkRole(["admin"]),
  upload.single("file"),
  controller.importReceivablesCSV
);

module.exports = router;
