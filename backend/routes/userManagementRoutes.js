const express = require("express");
const router = express.Router();
const userController = require("../controllers/userManagementController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// All routes protected by JWT & role
// router.post("/", verifyToken, checkRole(["admin"]), userController.createUser);
// router.get(
//   "/",
//   verifyToken,
//   checkRole(["admin", "manager"]),
//   userController.getUsers
// );
// router.put(
//   "/:id",
//   verifyToken,
//   checkRole(["admin"]),
//   userController.updateUser
// );
// router.delete(
//   "/:id",
//   verifyToken,
//   checkRole(["admin"]),
//   userController.deleteUser
// );
router.post("/",userController.createUser);
router.get(
  "/",
  userController.getUsers
);
router.put(
  "/:id",
  userController.updateUser
);
router.delete(
  "/:id",
  userController.deleteUser
);
module.exports = router;
