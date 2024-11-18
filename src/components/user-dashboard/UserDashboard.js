import React from "react";
import {
  FaUserPlus,
  FaEye,
  FaUsers,
  FaUserMinus,
  FaMoneyCheckAlt,
  FaDollarSign,
  FaWallet,
  FaExchangeAlt,
} from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";

const UserDashboard = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">User Dashboard</h2>
          <nav className="space-y-4">
            <a
              href="#create-account"
              className="flex items-center gap-3 p-2 rounded hover:bg-green-700"
            >
              <FaUserPlus /> Create Account
            </a>
            <a
              href="#view-account"
              className="flex items-center gap-3 p-2 rounded hover:bg-green-700"
            >
              <FaEye /> View Account
            </a>
            <a
              href="#view-all-accounts"
              className="flex items-center gap-3 p-2 rounded hover:bg-green-700"
            >
              <FaUsers /> View All Accounts
            </a>
            <a
              href="#delete-account"
              className="flex items-center gap-3 p-2 rounded hover:bg-green-700"
            >
              <FaUserMinus /> Delete Account
            </a>
            <a
              href="#transaction-section"
              className="flex items-center gap-3 p-2 rounded hover:bg-green-700"
            >
              <FaExchangeAlt /> Transactions
            </a>
          </nav>
        </div>
        <footer className="p-4 text-center text-sm text-green-300">
          &copy; 2024 SecureBank User Panel
        </footer>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        {/* Hero Section */}
        <div className="bg-white p-8 rounded shadow-md mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.fullName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account and transactions with ease.
          </p>
        </div>

        {/* Account Management Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">Create Account</h2>
              <p className="text-sm">Open a new bank account.</p>
            </div>
            <FaUserPlus size={32} />
          </div>

          <div className="bg-green-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">View Account</h2>
              <p className="text-sm">See details of your account.</p>
            </div>
            <FaEye size={32} />
          </div>

          <div className="bg-teal-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">View All Accounts</h2>
              <p className="text-sm">Browse all your linked accounts.</p>
            </div>
            <FaUsers size={32} />
          </div>

          <div className="bg-red-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">Delete Account</h2>
              <p className="text-sm">Close an existing account.</p>
            </div>
            <FaUserMinus size={32} />
          </div>
        </div>

        {/* Transaction Section */}
        <h2
          className="text-2xl font-semibold text-gray-800 mb-6"
          id="transaction-section"
        >
          Transaction Section
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-indigo-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">Deposit</h2>
              <p className="text-sm">Add money to your account.</p>
            </div>
            <FaDollarSign size={32} />
          </div>

          <div className="bg-purple-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">Withdraw</h2>
              <p className="text-sm">Take money out from your account.</p>
            </div>
            <FaMoneyCheckAlt size={32} />
          </div>

          <div className="bg-orange-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">Check Balance</h2>
              <p className="text-sm">View your account balance.</p>
            </div>
            <FaWallet size={32} />
          </div>

          <div className="bg-yellow-600 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
            <div>
              <h2 className="text-xl font-semibold">Transfer</h2>
              <p className="text-sm">Send money to another account.</p>
            </div>
            <FaExchangeAlt size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
