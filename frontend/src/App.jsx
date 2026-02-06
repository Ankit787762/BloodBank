import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🌍 Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 👤 User pages
import UserLayout from "./pages/user/UserLayout";
import Profile from "./pages/user/Profile";
import AddRequest from "./pages/user/Addrequest";
import MyRequest from "./pages/user/Myrequest";
import BloodAvailability from "./pages/user/BloodAvailability";

// 🛠️ Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import CheckRequests from "./pages/admin/checkRequest"; // ✅ correct

import AddBloodStock from "./pages/admin/AddBloodStock";
import UpdateStock from "./pages/admin/UpdateStock";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌍 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 User Dashboard */}
        <Route path="/user" element={<UserLayout />}>
          {/* Default route */}
          <Route index element={<Navigate to="profile" replace />} />

          <Route path="profile" element={<Profile />} />
          <Route path="addrequest" element={<AddRequest />} />
          <Route path="myrequest" element={<MyRequest />} />

          {/* 🩸 Real-time Blood Availability */}
          <Route path="blood-availability" element={<BloodAvailability />} />
        </Route>

        {/* 🛠️ Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default route */}
          <Route index element={<Navigate to="checkrequests" replace />} />

          <Route path="checkrequests" element={<CheckRequests />} />

          {/* 🩸 Add / Update Blood Stock */}
          <Route path="add-stock" element={<AddBloodStock />} />
          <Route path="update-stock" element={<UpdateStock />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
