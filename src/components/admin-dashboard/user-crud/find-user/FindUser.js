import React, { useState, useEffect } from "react";
import { findUserById } from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const FindUser = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  const handleSearch = async () => {
    try {
      setError("");
      setUser(null);
      setLoading(true);
      const userData = await findUserById(userId); // Fetch user without accounts
      console.log("Fetched User Data:", userData);
      setUser(userData);
      setShowAccounts(false);
    } catch (err) {
      setError(err.message || "Error fetching user");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAccounts = async () => {
    try {
      setError("");
      setLoading(true);

      const userData = await findUserById(userId, ["account"]); // Fetch user with accounts
      console.log("Fetched User Data with Accounts:", userData);
      setUser(userData);
      setShowAccounts(true); // Indicate that accounts should be shown
    } catch (err) {
      setError(err.message || "Error fetching accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("User Data Updated:", user);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-400 relative">
      {/* Header */}
      <AdminHeader />
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Find User</h1>
        <p className="text-md text-blue-200 mt-2">
          Search for a user by entering their User ID.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Search User by ID
          </h2>

          {/* Input Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter User ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent"
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-green-700 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-105 transition-transform duration-300"
            >
              Search
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Loading Indicator */}
          {loading && <p className="text-blue-500 text-center">Loading...</p>}

          {/* User Card */}
          {user && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-xl font-bold text-gray-800">User Details</h3>
              <p className="text-gray-700 mt-2">
                <strong>ID:</strong> {user.id}
              </p>
              <p className="text-gray-700">
                <strong>Name:</strong> {user.fullName}
              </p>
              <p className="text-gray-700">
                <strong>Date of Birth:</strong> {user.dateOfBirth}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-gray-700">
                <strong>KYC Status:</strong> {user.kycStatus}
              </p>

              {/* Show Accounts Button */}
              {!showAccounts && (
                <button
                  onClick={handleShowAccounts}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-300"
                >
                  Show Accounts
                </button>
              )}

              {/* Accounts Cards */}
              {showAccounts && user.accounts && user.accounts.length > 0 && (
                <div className="mt-6 space-y-4">
                  {user.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        Account Details
                      </h4>
                      <p className="text-gray-700">
                        <strong>Bank Name:</strong> {account.bankName}
                      </p>
                      <p className="text-gray-700">
                        <strong>Account ID:</strong> {account.id}
                      </p>
                      <p className="text-gray-700">
                        <strong>Balance:</strong> ₹ {account.balance.toFixed(2)}
                      </p>
                      <p className="text-gray-700">
                        <strong>Status:</strong>{" "}
                        {account.deletedAt ? "Inactive" : "Active"}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* No Accounts Message */}
              {showAccounts && user.accounts && user.accounts.length === 0 && (
                <p className="text-gray-500 mt-4">No accounts found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUser;
