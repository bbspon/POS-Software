const express = require("express");
const router = express.Router();
const controller = require("../controllers/accountPayableController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Create
router.post(
  "/",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.createPayable
);

// Read
router.get(
  "/",
//   verifyToken,
//   checkRole(["admin", "manager", "cashier"]),
  controller.getAllPayables
);

// Update
router.put(
  "/:id",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.updatePayable
);

// Delete
router.delete(
  "/:id",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.deletePayable
);

// Bulk Delete
router.post(
  "/bulk-delete",
//   verifyToken,
//   checkRole(["admin"]),
  controller.bulkDeletePayables
);

// Export CSV
router.get(
  "/export",
//   verifyToken,
//   checkRole(["admin", "manager"]),
  controller.exportPayablesCSV
);

// Import CSV
router.post(
  "/import",
//   verifyToken,
//   checkRole(["admin"]),
  upload.single("file"),
  controller.importPayablesCSV
);

module.exports = router;
