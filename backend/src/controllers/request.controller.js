import { Request } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { BloodStock } from "../models/bloodStock.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

// ✅ Add Request (user side)
export const addRequest = asyncHandler(async (req, res) => {
  const {  bloodGroup, units } = req.body;

  if ( !bloodGroup || !units) {
    throw new ApiError(400, "All fields are required");
  }

  const request = await Request.create({
    user: req.user._id,
    bloodGroup,
    units,
    status: "pending",
  });

  res
    .status(201)
    .json(new ApiResponse(201, request, "Request added successfully"));
});

// ✅ My Requests
export const myRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({ user: req.user._id })
    .select("hospitalName bloodGroup units status createdAt");

  res
    .status(200)
    .json(new ApiResponse(200, requests, "My requests fetched successfully"));
});

// ✅ Admin: Get All Requests
export const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find()
    .populate("user", "fullName email")
    .select("hospitalName bloodGroup units status createdAt");

  res
    .status(200)
    .json(new ApiResponse(200, requests, "All requests fetched successfully"));
});

// ✅ Admin: Approve / Reject Request (WITH STOCK LOGIC)
export const updateRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const request = await Request.findById(requestId);
  if (!request) throw new ApiError(404, "Request not found");

  if (request.status !== "pending") {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Request already processed"));
  }

  const user = await User.findById(request.user);

  // 🩸 STOCK CHECK ONLY IF APPROVED
  if (status === "approved") {
    const stock = await BloodStock.findOne({
      bloodGroup: request.bloodGroup,
    });

    if (!stock || stock.unitsAvailable < request.units) {
      throw new ApiError(
        400,
        "Insufficient blood stock. Cannot approve request."
      );
    }

    // ➖ Deduct blood units
    stock.unitsAvailable -= request.units;
    stock.lastUpdated = new Date();
    await stock.save();

    // 🔔 Low stock alert
    if (stock.unitsAvailable < 5) {
      await sendEmail(
        "admin@bloodbank.com",
        "Low Blood Stock Alert ⚠️",
        `<p>Blood Group <b>${stock.bloodGroup}</b> is low (${stock.unitsAvailable} units left)</p>`
      );
    }
  }

  // 📧 Send email to user
  const subject =
    status === "approved"
      ? "Blood Request Approved 🩸"
      : "Blood Request Rejected ❌";

  const html = `
    <h3>Hello ${user.fullName}</h3>
    <p>Your blood request has been <b>${status.toUpperCase()}</b>.</p>
    <p>Blood Group: ${request.bloodGroup}</p>
    <p>Units: ${request.units}</p>
  `;

  await sendEmail(user.email, subject, html);

  // 🗑️ Delete request after processing
  await Request.findByIdAndDelete(requestId);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Request processed successfully"));
});
