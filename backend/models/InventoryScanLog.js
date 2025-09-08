const mongoose = require("mongoose");

const inventoryScanLogSchema = new mongoose.Schema(
  {
    sku: String,
    scannedQty: Number,
    systemQty: Number,
    scannedBy: String,
    method: String, // QR or Manual
    sessionId: String,
    store: String,
    location: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryScanLog", inventoryScanLogSchema);
