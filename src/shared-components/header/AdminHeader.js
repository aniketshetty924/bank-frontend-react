import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <button
          className="text-white mr-4 hover:text-gray-300"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold">Reserve Bank of India</h1>
      </div>
      <button
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        onClick={() => navigate("/login")} // Navigate to the login page
      >
        <FaSignOutAlt size={20} />
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
