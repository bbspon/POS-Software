const express = require("express");
const router = express.Router();
const controller = require("../controllers/storePosController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

router.get("/",
  //  verifyToken,
    controller.getAllSummaries);
router.get("/:id", 
  // verifyToken,
   controller.getSummaryById);
router.post(
  "/",
  // verifyToken,
  // checkRole(["admin", "manager"]),
  controller.createSummary
);
router.put(
  "/:id",
  // verifyToken,
  // checkRole(["admin", "manager"]),
  controller.updateSummary
);
router.delete(
  "/:id",
  // verifyToken,
  // checkRole(["admin"]),
  controller.deleteSummary
);

module.exports = router;
