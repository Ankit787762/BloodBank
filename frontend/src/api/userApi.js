import axios from "axios";

const API = import.meta.env.VITE_API_URL; // http://localhost:8000

export const registerUser = (data) =>
  axios.post(`${API}/api/v1/users/register`, data, { withCredentials: true });

export const loginUser = (data) =>
  axios.post(`${API}/api/v1/users/login`, data, { withCredentials: true });

export const getUserProfile = () =>
  axios.get(`${API}/api/v1/users/currentuser`, { withCredentials: true });
