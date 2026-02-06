// Profile.jsx
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/userApi";
import { User } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-[80vh] w-full flex items-start justify-start px-8 py-6">
      {/* ✅ Card Left side */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-[400px]">
        <div className="flex items-center gap-4 mb-4">
          <User size={50} className="text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
        </div>

        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {user.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Username:</span> @{user.username}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
