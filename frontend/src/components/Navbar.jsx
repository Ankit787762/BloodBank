import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Droplet className="h-6 w-6 text-red-600" />
          <span className="text-xl font-semibold text-red-600">BloodBank</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-1 text-base font-medium text-gray-800 transition-colors hover:text-red-600"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-1 text-base font-medium text-gray-800 transition-colors hover:text-red-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-1 text-base font-medium text-gray-800 transition-colors hover:text-red-600"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
