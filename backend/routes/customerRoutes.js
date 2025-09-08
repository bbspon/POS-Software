const express = require("express");
const router = express.Router();
const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
// const auth = require("../middleware/authMiddleware"); // optional

// router.get("/", auth, getCustomers);
// router.post("/", auth, addCustomer);
// router.put("/:id", auth, updateCustomer);
// router.delete("/:id", auth, deleteCustomer);

router.get("/", getCustomers);
router.post("/", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
module.exports = router;
