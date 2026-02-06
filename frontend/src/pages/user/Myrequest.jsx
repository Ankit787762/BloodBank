import React, { useState, useEffect } from "react";
import { getMyRequests } from "../../api/requestApi";

const MyRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchRequests = async () => {
    try {
      const response = await getMyRequests();
      console.log("Fetched requests:", response.data);
      console.log("Requests array:", response.data.data);
 // <- check data structure
      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchRequests();
}, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-lg text-gray-600">Loading your requests...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full px-8 py-6">
      <h2 className="text-2xl font-bold text-red-600 mb-6">My Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
          <thead className="bg-red-100 text-red-700">
            <tr>
      
              <th className="py-3 px-4 border">Blood Group</th>
              <th className="py-3 px-4 border">Units</th>
              <th className="py-3 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
  {requests.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">
        No requests found.
      </td>
    </tr>
  ) : (
    requests.map((req) => (
     <tr key={req._id} className="text-center border-b hover:bg-gray-50 transition-colors">
  
  <td className="py-2 px-4">{req.bloodGroup || "N/A"}</td>
  <td className="py-2 px-4">{req.units || "N/A"}</td>
  <td
    className={`py-2 px-4 font-semibold ${
      req.status === "pending"
        ? "text-yellow-500"
        : req.status === "approved"
        ? "text-green-500"
        : "text-red-500"
    }`}
  >
    {req.status || "N/A"}
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

export default MyRequest;
