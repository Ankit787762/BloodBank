import axios from "axios";

// 🔹 Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // 🔁 change PORT if needed
  withCredentials: true, // cookies / auth support
});

// ===============================
// 🩸 BLOOD STOCK APIs
// ===============================

// ✅ Get all blood stock (User + Admin)
export const getBloodStock = async () => {
  return await API.get("/stock");
};

// ✅ Admin: Add or update blood stock
export const addBloodStock = async (data) => {
  return await API.post("/stock/add", data);
};
