const AuditReport = require("../models/auditReport");

// GET all logs
const getAllAuditReports = async (req, res) => {
  try {
    const logs = await AuditReport.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

// POST a new log
const createAuditReport = async (req, res) => {
  try {
    const newLog = new AuditReport(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ error: "Failed to create log" });
  }
};

// DELETE a log
const deleteAuditReport = async (req, res) => {
  try {
    await AuditReport.findByIdAndDelete(req.params.id);
    res.json({ message: "Audit log deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete log" });
  }
};

module.exports = {
  getAllAuditReports,
  createAuditReport,
  deleteAuditReport,
};
