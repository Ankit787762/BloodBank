import express from "express";
import { addOrUpdateStock, getBloodStock, getLowStock } from "../controllers/stock.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getStockForUsers } from "../controllers/stock.controller.js";



const router = express.Router();

// ✅ Add or update stock
router.post("/", verifyJWT, addOrUpdateStock);

// ✅ Get all blood stock
router.get("/", verifyJWT, getBloodStock);

// ✅ Get low stock (optional)
router.get("/low", verifyJWT, getLowStock);

// ✅ User can check blood availability
router.get("/availability", getStockForUsers);
export default router;
