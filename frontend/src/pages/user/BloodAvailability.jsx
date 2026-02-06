import React, { useEffect, useState } from "react";
import axios from "axios";

// Axios instance with baseURL
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const BloodAvailability = () => {
  const [stocks, setStocks] = useState([]);

  // Fetch blood stock for users
  const fetchStocks = async () => {
    try {
      const res = await api.get("/api/stock/availability");
      setStocks(res.data.data || []);
    } catch (err) {
      console.error("Error fetching blood stock:", err.response || err.message);
      setStocks([]);
    }
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Blood Availability</h2>

      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-medium">Blood Group</th>
            <th className="px-4 py-2 font-medium">Units Available</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                No stock available
              </td>
            </tr>
          ) : (
          stocks.map((stock, index) => (
  <tr key={stock._id || index} className="hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 font-bold">{stock.bloodGroup}</td>
    <td className="px-4 py-2">{stock.unitsAvailable}</td>
  </tr>
))

          )}
        </tbody>
      </table>
    </div>
  );
};

export default BloodAvailability;
