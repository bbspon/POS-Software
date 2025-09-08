const mongoose = require("mongoose");

const physicalInventorySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    systemQty: { type: Number, required: true },
    scannedQty: { type: Number, default: 0 },
    status: { type: String, default: "Not Scanned" },
    lastScanned: { type: Date, default: null },
    store: { type: String, required: true },
  },
  { timestamps: true, collection: "physicalinventories" } // ✅ force collection name
);

module.exports = mongoose.model("PhysicalInventory", physicalInventorySchema);
