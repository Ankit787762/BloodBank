import { BloodStock } from "../models/bloodStock.model.js";

const MIN_UNITS = 5;

// Function to check low inventory
const checkLowInventory = (units) => units <= MIN_UNITS;

// Add or update stock
export const addOrUpdateStock = async (req, res) => {
  try {
    const { bloodGroup, unitsAvailable, expiryDate } = req.body;

    if (!bloodGroup || unitsAvailable === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if stock exists
    let stock = await BloodStock.findOne({ bloodGroup });

    if (stock) {
      stock.unitsAvailable += Number(unitsAvailable);
      if (expiryDate) stock.expiryDate = expiryDate;
    } else {
      stock = new BloodStock({
        bloodGroup,
        unitsAvailable: Number(unitsAvailable),
        expiryDate: expiryDate || null,
      });
    }

    stock.isLow = checkLowInventory(stock.unitsAvailable);
    stock.lastUpdated = new Date();

    await stock.save();

    res.status(200).json({
      success: true,
      message: "Blood stock updated successfully",
      data: stock,
    });
  } catch (error) {
    console.error("❌ Stock error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all blood stock
export const getBloodStock = async (req, res) => {
  try {
    const stocks = await BloodStock.find().select(
      "bloodGroup unitsAvailable lastUpdated expiryDate"
    );

    res.status(200).json({
      success: true,
      data: stocks,  // ✅ frontend expects res.data.data
      message: "Blood stock fetched successfully",
    });
  } catch (err) {
    console.error("❌ Error fetching stock:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching stock",
    });
  }
};

// ✅ Get stock for users (read-only)
export const getStockForUsers = async (req, res) => {
  try {
    const stocks = await BloodStock.find().select(
      "bloodGroup unitsAvailable expiryDate lastUpdated"
    );

    const data = stocks.map((s) => ({
      bloodGroup: s.bloodGroup,
      unitsAvailable: s.unitsAvailable,
      expiryDate: s.expiryDate,
      lastUpdated: s.lastUpdated,
      available: s.unitsAvailable > 0, // true/false
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ User stock fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get low stock
export const getLowStock = async (req, res) => {
  try {
    const low = await BloodStock.find({ isLow: true });
    res.status(200).json({
      success: true,
      data: low,
    });
  } catch (err) {
    console.error("❌ Error fetching low stock:", err);
    res.status(500).json({ success: false, message: "Failed to fetch low stock" });
  }
};
