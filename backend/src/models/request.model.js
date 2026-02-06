import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    units: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
