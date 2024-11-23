import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import {
  deleteUserById,
  findUserById,
  findUserByUsername,
} from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const DeleteUser = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state

  const handleSearch = async () => {
    try {
      setError("");
      setUser(null);
      setLoading(true);

      let userData;

      if (userId) {
        userData = await findUserById(userId);
      } else if (username) {
        userData = await findUserByUsername(username);
      } else {
        setError("Please enter either a User ID or Username to search.");
        return;
      }

      console.log("Fetched User Data:", userData);
      setUser({ ...userData, accounts: userData.accounts || [] });
      setShowAccounts(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching user.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAccounts = async () => {
    try {
      setError("");
      setLoading(true);

      let userData;

      if (userId) {
        userData = await findUserById(userId, ["account"]);
      } else if (username) {
        userData = await findUserByUsername(username, ["account"]);
      } else {
        setError("Please search for a user first.");
        return;
      }

      console.log("Fetched User data with accounts:", userData);
      setUser({ ...userData, accounts: userData.accounts || [] });
      setShowAccounts(true);
    } catch (err) {
      setError("No Account Found!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user || user.accounts.length > 0) {
      setError(
        "User cannot be deleted because they have one or more linked accounts."
      );
      return;
    }

    try {
      setError("");
      setLoading(true);
      await deleteUserById(user.id);
      setShowModal(false); // Close the delete confirmation modal
      setShowSuccessModal(true); // Show success modal
      setUser(null); // Clear the user data after deletion
      setUserId(""); // Clear the User ID field
      setUsername(""); // Clear the Username field
    } catch (err) {
      console.error(err);
      setError(err.message || "Error deleting user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("User Data Updated:", user);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-bl from-red-500 via-red-400 to-orange-300 relative">
      <AdminHeader />
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Delete User</h1>
        <p className="text-md text-red-200 mt-2">
          Search for a user by entering their User ID or Username and delete
          them.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
            Delete User
          </h2>

          {/* Input Field for User ID */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter User ID
            </label>
            <input
              type="text"
              value={userId}
              placeholder="Enter User ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-transparent"
              onChange={(e) => {
                setUserId(e.target.value);
                setUsername(""); // Clear username if User ID is entered
              }}
            />
          </div>

          {/* Input Field for Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Username
            </label>
            <input
              type="text"
              value={username}
              placeholder="Enter Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-transparent"
              onChange={(e) => {
                setUsername(e.target.value);
                setUserId(""); // Clear User ID if Username is entered
              }}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mb-6">
            <button
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-transform duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && <p className="text-red-500 text-center">Loading...</p>}

          {user && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-xl font-bold text-red-800">User Details</h3>
              <p className="text-gray-700 mt-2">
                <strong>ID:</strong> {user.id}
              </p>
              <p className="text-gray-700">
                <strong>Name:</strong> {user.fullName}
              </p>
              <p className="text-gray-700">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-gray-700">
                <strong>Username:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Username:</strong> {user.dateOfBirth}
              </p>

              {!showAccounts && (
                <button
                  onClick={handleShowAccounts}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-300"
                >
                  Show Accounts
                </button>
              )}

              {showAccounts && user.accounts.length > 0 && (
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

              <button
                className="mt-6 bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:from-red-800 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-transform duration-300"
                onClick={() => setShowModal(true)} // Open modal
              >
                <FaTrash size={20} />
                Delete User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold text-red-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the user with{" "}
              {userId ? `ID ${userId}` : `Username ${username}`}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDeleteUser} // Confirm deletion
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Success Message */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold text-green-800 mb-4">
              User Deleted Successfully
            </h3>
            <p className="text-gray-700 mb-6">
              The user with {userId ? `ID ${userId}` : `Username ${username}`}{" "}
              has been deleted successfully.
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => setShowSuccessModal(false)} // Close success modal
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
