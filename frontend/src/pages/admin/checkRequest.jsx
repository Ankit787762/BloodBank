// CheckRequests.jsx
import React, { useState, useEffect } from "react";
import { getAllRequests, updateRequestStatus } from "../../api/requestApi";

const CheckRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getAllRequests();
        setRequests(res.data.data); // ✅ ApiResponse structure { status, data, message }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

const handleStatusChange = async (id, status) => {
  try {
    await updateRequestStatus(id, status);

    // ✅ request UI se hata do
    setRequests((prev) => prev.filter((req) => req._id !== id));
  } catch (error) {
    console.error("Error updating status:", error);
  }
};


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-lg text-gray-600">Loading requests...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full px-8 py-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        User Blood Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="py-3 px-4 border">User</th>
              <th className="py-3 px-4 border">Blood Group</th>
              <th className="py-3 px-4 border">Units</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="text-center border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-4">{req.userName}</td>
                  <td className="py-2 px-4">{req.hospitalName}</td>
                  <td className="py-2 px-4">{req.bloodGroup}</td>
                  <td className="py-2 px-4">{req.units}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      req.status === "Pending"
                        ? "text-yellow-500"
                        : req.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-2 px-4 flex gap-2 justify-center">
                    <button
  onClick={() => handleStatusChange(req._id, "approved")}
  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
>
  Approve
</button>
<button
  onClick={() => handleStatusChange(req._id, "rejected")}
  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
>
  Reject
</button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckRequests;
