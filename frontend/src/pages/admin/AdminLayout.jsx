// AdminLayout.jsx
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
  { name: "Check Requests", path: "checkrequests" },
  { name: "Add Blood Stock", path: "add-stock" },
  { name: "Update Stock", path: "update-stock" }, // Added this line
];



  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center bg-white text-gray-800 px-6 py-4 shadow-sm border-b">
        <div className="text-2xl font-bold text-blue-600">Admin Panel</div>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-800 flex flex-col shadow-md border-r">
          <nav className="flex-1 mt-6">
            <ul>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block p-4 font-medium rounded-md transition-colors ${
                      location.pathname.includes(item.path)
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
