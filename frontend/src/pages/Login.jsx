import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { loginUser } from "../api/userApi"; // ✅ API import

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password }); // backend call

      // ✅ response data properly access
      const { user, accessToken, refreshToken } = res.data.data;

      // ✅ save in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ role-based redirect
    if (user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/user"); // ✅ correct
}

    } catch (err) {
      setError(err.response?.data?.message || "Login failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
            Login to BloodBank
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
