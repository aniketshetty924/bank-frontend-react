import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

const UserHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-green-200 to-blue-300 text-green-900 py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="text-green-900 hover:text-green-700 focus:outline-none"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Logo or Title */}
        <h1 className="text-2xl font-semibold">SecureBank User Portal</h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => navigate("/login")} // Redirect to the login page
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <FaSignOutAlt size={20} />
        Logout
      </button>
    </header>
  );
};

export default UserHeader;
