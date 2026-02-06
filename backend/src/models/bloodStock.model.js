import mongoose from "mongoose";

const bloodStockSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      unique: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    unitsAvailable: {
      type: Number,
      required: true,
      min: 0,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    isLow: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const BloodStock = mongoose.model("BloodStock", bloodStockSchema);
