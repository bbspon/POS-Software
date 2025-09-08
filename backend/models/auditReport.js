const mongoose = require("mongoose");

const auditReportSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: [
      "Login",
      "Logout",
      "Create",
      "Update",
      "Delete",
      "Export",
      "View",
      "Access Denied",
    ],
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AuditReport", auditReportSchema);
