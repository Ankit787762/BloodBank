import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateStock = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  // Fetch current stock
  const loadStock = async () => {
  try {
    setTableLoading(true);
    const res = await axios.get("http://localhost:8000/api/stock", { withCredentials: true });
    console.log("Stock response:", res.data); // 🔥 Debug
    setStocks(res.data?.data || []); // ✅ important
  } catch (err) {
    console.error(err);
    setStocks([]);
    setMessage("❌ Error fetching stock data");
  } finally {
    setTableLoading(false);
  }
};


  useEffect(() => {
    loadStock();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bloodGroup || !units) {
      setMessage("⚠ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const payload = { bloodGroup, unitsAvailable: Number(units), expiryDate };
      await axios.post("/api/stock", payload, { withCredentials: true });
      setMessage("✅ Stock Updated Successfully!");
      setBloodGroup(""); setUnits(""); setExpiryDate("");
      loadStock(); // refresh table
    } catch (err) {
      console.error(err);
      setMessage("❌ Error updating stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Blood Stock</h2>

      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-end mb-8"
      >
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Units</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            min="1"
            className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="border rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Stock"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2 text-gray-700">Current Blood Stock</h3>
      {tableLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium">Blood Group</th>
              <th className="px-4 py-2 font-medium">Units</th>
              <th className="px-4 py-2 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No stock available
                </td>
              </tr>
            ) : (
              stocks.map((s, index) => (
                <tr key={s._id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">{s.bloodGroup}</td>
                  <td className="px-4 py-2">{s.unitsAvailable}</td>
                  <td className="px-4 py-2">{s.lastUpdated ? new Date(s.lastUpdated).toLocaleString() : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UpdateStock;
