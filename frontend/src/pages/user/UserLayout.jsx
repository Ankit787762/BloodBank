import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
  { name: "Profile", path: "profile" },
  { name: "Add Request", path: "addrequest" },
  { name: "My Request", path: "myrequest" },
  { name: "Available Blood", path: "blood-availability" }, // ✅ match App.jsx
];


  const handleLogout = () => {
    // ✅ Agar token/localStorage use ho raha hai toh clear karo
    localStorage.removeItem("token"); 
    sessionStorage.clear();

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <header className="w-full flex justify-between items-center bg-white text-gray-800 px-6 py-4 shadow-sm border-b">
        <div className="text-2xl font-bold text-red-600">Blood Bank</div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* ✅ Layout */}
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
                        ? "bg-red-50 text-red-600 font-semibold shadow-sm"
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

export default UserLayout;
