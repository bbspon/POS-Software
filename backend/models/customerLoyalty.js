const mongoose = require("mongoose");

const customerLoyaltySchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  tag: { type: String, enum: ["vip", "regular", "new"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CustomerLoyalty", customerLoyaltySchema);
