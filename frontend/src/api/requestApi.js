import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ✅ Add Request (User)
export const addRequest = (data) =>
  axios.post(`${API}/api/v1/request/addrequest`, data, { withCredentials: true });

// ✅ My Requests (User)
export const getMyRequests = () =>
  axios.get(`${API}/api/v1/request/myrequests`, { withCredentials: true });

// ✅ All Requests (Admin)
export const getAllRequests = () =>
  axios.get(`${API}/api/v1/request/getallrequests`, { withCredentials: true });

// ✅ Update Request Status (Admin)
export const updateRequestStatus = (requestId, status) =>
  axios.put(
    `${API}/api/v1/request/updaterequest/${requestId}`,
    { status },
    { withCredentials: true }
  );

