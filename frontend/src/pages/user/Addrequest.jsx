import React, { useState, useEffect } from "react";
import { addRequest } from "../../api/requestApi";
const AddRequest = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "",
  });




  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRequest(formData);
      alert("Request Submitted Successfully!");
      setFormData({ bloodGroup: "", units: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to submit request");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add Blood Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
         

          {/* ✅ Blood Group */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Units */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Units Required
            </label>
            <input
              type="number"
              name="units"
              value={formData.units}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400"
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
