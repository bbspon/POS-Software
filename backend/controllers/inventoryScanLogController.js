const Inventory = require("../models/Inventory");
const InventoryScanLog = require("../models/InventoryScanLog");

// POST scan log
exports.logScan = async (req, res) => {
  try {
    const { sku, quantity, scannedBy, method, sessionId, store, location } =
      req.body;

    const inventory = await Inventory.findOne({ sku });
    if (!inventory)
      return res.status(404).json({ error: "Inventory not found" });

    inventory.scannedQty += parseInt(quantity || 1);
    await inventory.save();

    const scanLog = new InventoryScanLog({
      sku,
      scannedQty: quantity,
      systemQty: inventory.stock,
      scannedBy,
      method,
      sessionId,
      store,
      location,
    });

    await scanLog.save();
    res.json({ message: "Scan logged and scannedQty updated", scanLog });
  } catch (err) {
    res.status(500).json({ error: "Scan failed" });
  }
};

// GET all scan logs
exports.getScanLogs = async (req, res) => {
  try {
    const logs = await InventoryScanLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};
