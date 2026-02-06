import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { registerUser } from "../api/userApi"; // ✅ API import

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser({ fullName, username, email, password });
      console.log("User registered:", res.data);

      // Registration success → redirect to login
      navigate("/login");
    } 
 catch (err) {
    // Duplicate user ya any error
    if (err.response?.status === 409) {
      setError("User already exists! Please login instead.");
    } else {
      setError(err.response?.data?.message || "Registration failed, try again.");
    }
  } finally {
    // ✅ Yahan loading false set karna important hai
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
            Create an Account
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

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
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
