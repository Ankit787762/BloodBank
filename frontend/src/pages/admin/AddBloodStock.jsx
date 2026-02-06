import React, { useState } from "react";
import axios from "axios";

const AddBloodStock = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

      // ✅ Correct backend URL
      await axios.post(
  "http://localhost:8000/api/stock",
  payload,
  { withCredentials: true }
);


      setMessage("✅ Blood stock added successfully!");
      setBloodGroup("");
      setUnits("");
      setExpiryDate("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Blood Stock</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

      <form className="flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="border rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Adding..." : "Add Stock"}
        </button>
      </form>
    </div>
  );
};

export default AddBloodStock;
