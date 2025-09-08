const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      match: [/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Invalid email format"],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserManagement", userSchema);
