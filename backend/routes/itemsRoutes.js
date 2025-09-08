const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { verifyToken, requireRoles } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/itemsController");

const router = express.Router();

// basic disk storage under /uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Public reads
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

// Protected writes
router.post(
  "/",
  verifyToken,
  requireRoles("admin", "staff", "superadmin", "owner"),
  upload.fields([
    { name: "product_img", maxCount: 1 },
    { name: "gallery_imgs", maxCount: 15 },
  ]),
  ctrl.create
);

router.put(
  "/:id",
  verifyToken,
  requireRoles("admin", "staff", "superadmin", "owner"),
  upload.fields([
    { name: "product_img", maxCount: 1 },
    { name: "gallery_imgs", maxCount: 15 },
  ]),
  ctrl.update
);

router.delete(
  "/:id",
  verifyToken,
  requireRoles("admin", "staff", "superadmin", "owner"),
  ctrl.remove
);

module.exports = router;
