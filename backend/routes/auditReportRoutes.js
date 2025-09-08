const express = require("express");
const router = express.Router();
const {
  getAllAuditReports,
  createAuditReport,
  deleteAuditReport,
} = require("../controllers/auditReportController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

router.get(
  "/",
//   verifyToken,
//   checkRole(["Admin", "Manager"]),
  getAllAuditReports
);
router.post(
  "/",
//   verifyToken,
//   checkRole(["Admin", "Manager"]),
  createAuditReport
);
router.delete("/:id",
    //  verifyToken, checkRole(["Admin"]),
      deleteAuditReport);

module.exports = router;
