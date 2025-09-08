const express = require("express");
const router = express.Router();
const controller = require("../controllers/profitabilityController");
// const { protect, checkRole } = require("../middlewares/authMiddleware");

// Apply JWT + role check (admin & vendor-type)
// router.use(protect);
// router.use(checkRole(["admin", "vendor", "manager", "supervisor"]));

router.get("/", controller.getAllProfitEntries);
router.post("/", controller.createProfitEntry);
router.put("/:id", controller.updateProfitEntry);
router.delete("/:id", controller.deleteProfitEntry);

module.exports = router;
