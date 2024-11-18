import React from "react";

import {
  FaUniversity,
  FaList,
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaUsers,
  FaUser,
  FaUserMinus,
  FaUserEdit,
  FaSearch,
  FaBook,
  FaFileAlt, // Icon for "View All Ledgers"
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  if (!user) {
    return <div>Please log in to access the Admin Dashboard.</div>;
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
          <nav className="space-y-4">
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/create-bank`)}
            >
              <FaUniversity /> Add New Bank
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() =>
                navigate(`/admin-dashboard/${userId}/find-all-banks`)
              }
            >
              <FaList /> View All Banks
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/find-bank`)}
            >
              <FaSearch /> View a Bank
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/find-ledger`)}
            >
              <FaBook /> Bank Ledger
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() =>
                navigate(`/admin-dashboard/${userId}/find-all-ledgers`)
              }
            >
              <FaFileAlt /> View All Ledgers
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/delete-bank`)}
            >
              <FaTrash /> Delete Bank
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/update-bank`)}
            >
              <FaEdit /> Update Bank Details
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() =>
                navigate(`/admin-dashboard/${userId}/user-registration`)
              }
            >
              <FaUserPlus /> Register New User
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() =>
                navigate(`/admin-dashboard/${userId}/find-all-users`)
              }
            >
              <FaUsers /> View All Users
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/find-user`)}
            >
              <FaUser /> Find User
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/delete-user`)}
            >
              <FaUserMinus /> Delete User
            </div>
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/admin-dashboard/${userId}/update-user`)}
            >
              <FaUserEdit /> Update User Info
            </div>
          </nav>
        </div>
        <footer className="p-4 text-center text-sm text-blue-300">
          &copy; 2024 SecureBank Admin Panel
        </footer>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        {/* Hero Section */}
        <div className="bg-white p-8 rounded shadow-md mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.fullName || "Admin"}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your banking operations and user accounts effortlessly.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-blue-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-blue-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/create-bank`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Add New Bank</h2>
              <p className="text-sm">Register a new bank in the system.</p>
            </div>
            <FaUniversity size={32} />
          </div>

          <div
            className="bg-green-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-green-700 cursor-pointer"
            onClick={() =>
              navigate(`/admin-dashboard/${userId}/find-all-banks`)
            }
          >
            <div>
              <h2 className="text-xl font-semibold">View All Banks</h2>
              <p className="text-sm">Browse the list of registered banks.</p>
            </div>
            <FaList size={32} />
          </div>

          <div
            className="bg-indigo-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-indigo-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/find-bank`)}
          >
            <div>
              <h2 className="text-xl font-semibold">View a Bank</h2>
              <p className="text-sm">Search for a specific bank by details.</p>
            </div>
            <FaSearch size={32} />
          </div>

          <div
            className="bg-gray-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/find-ledger`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Bank Ledger</h2>
              <p className="text-sm">Access transaction records and details.</p>
            </div>
            <FaBook size={32} />
          </div>

          <div
            className="bg-cyan-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-cyan-700 cursor-pointer"
            onClick={() =>
              navigate(`/admin-dashboard/${userId}/find-all-ledgers`)
            }
          >
            <div>
              <h2 className="text-xl font-semibold">View All Ledgers</h2>
              <p className="text-sm">Explore all financial ledgers.</p>
            </div>
            <FaFileAlt size={32} />
          </div>
          <div
            className="bg-red-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-red-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/delete-bank`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Delete Bank</h2>
              <p className="text-sm">Remove a bank from the system.</p>
            </div>
            <FaTrash size={32} />
          </div>

          <div
            className="bg-purple-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-purple-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/update-bank`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Update Bank Details</h2>
              <p className="text-sm">Modify existing bank information.</p>
            </div>
            <FaEdit size={32} />
          </div>

          <div
            className="bg-orange-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-orange-700 cursor-pointer"
            onClick={() =>
              navigate(`/admin-dashboard/${userId}/user-registration`)
            }
          >
            <div>
              <h2 className="text-xl font-semibold">Register New User</h2>
              <p className="text-sm">Create a new user</p>
            </div>
            <FaUserPlus size={32} />
          </div>

          <div
            className="bg-teal-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-teal-700 cursor-pointer"
            onClick={() =>
              navigate(`/admin-dashboard/${userId}/find-all-users`)
            }
          >
            <div>
              <h2 className="text-xl font-semibold">View All Users</h2>
              <p className="text-sm">List all users in the system.</p>
            </div>
            <FaUsers size={32} />
          </div>

          <div
            className="bg-pink-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-pink-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/find-user`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Find User</h2>
              <p className="text-sm">Locate a specific user profile.</p>
            </div>
            <FaUser size={32} />
          </div>

          <div
            className="bg-yellow-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-yellow-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/delete-user`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Delete User</h2>
              <p className="text-sm">Remove a user from the system.</p>
            </div>
            <FaUserMinus size={32} />
          </div>

          <div
            className="bg-pink-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:bg-pink-700 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/${userId}/update-user`)}
          >
            <div>
              <h2 className="text-xl font-semibold">Update Customer Info</h2>
              <p className="text-sm">Edit details of a user account.</p>
            </div>
            <FaUserEdit size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
