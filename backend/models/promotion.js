const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Festival Promotion", "Seasonal Offer", "Clearance", "Custom"],
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive", "Deprecated"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionSchema);
