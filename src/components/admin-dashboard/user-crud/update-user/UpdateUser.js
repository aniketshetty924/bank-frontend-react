import React, { useEffect, useState } from "react";
import {
  findUserById,
  findUserByUsername,
  updateUserById,
} from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const UpdateUser = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
  });

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
        setError("Please enter a User ID or Username to search.");
        return;
      }

      console.log("Fetched User Data:", userData);
      setUser(userData);
      setUpdatedData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        dob: userData.dateOfBirth || "",
        email: userData.email || "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching user.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!user) {
      setError("No user found to update.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      for (const [parameter, value] of Object.entries(updatedData)) {
        const backendParameter =
          parameter === "dob" ? "dateOfBirth" : parameter; // Map dob to dateOfBirth
        if (user[backendParameter] !== value) {
          await updateUserById(user.id, backendParameter, value);
          console.log(`Updated ${backendParameter} to ${value}`);
        }
      }

      const updatedUserData = userId
        ? await findUserById(userId)
        : await findUserByUsername(username);
      setUser(updatedUserData);

      // Show success modal after updating
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("User Data Updated:", user);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-red-300 relative">
      <AdminHeader />
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Update User</h1>
        <p className="text-md text-pink-200 mt-2">
          Search for a user by entering their ID or Username, then update their
          details.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Search and Update User
          </h2>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Enter User ID
            </label>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setUsername(""); // Clear username if userId is being entered
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUserId(""); // Clear userId if username is being entered
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-transform duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {user && (
            <>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
                <h3 className="text-xl font-bold text-purple-800">
                  User Details
                </h3>
                <p className="text-gray-700 mt-2">
                  <strong>ID:</strong> {user.id}
                </p>
                <p className="text-gray-700">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700">
                  <strong>Date of Birth:</strong> {user.dateOfBirth}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-purple-800 mb-4">
                  Update User Information
                </h3>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={updatedData.firstName}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={updatedData.lastName}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={updatedData.email}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, email: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Date of Birth"
                    value={updatedData.dob}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, dob: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-transform duration-300"
                    onClick={handleUpdateUser}
                  >
                    Update User
                  </button>
                </div>
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {loading && (
            <p className="text-blue-500 text-center mt-4">Loading...</p>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold text-green-800 mb-4">
              User Updated Successfully
            </h3>
            <p className="text-gray-700 mb-6">
              The user with {userId ? `ID ${userId}` : `Username ${username}`}{" "}
              has been updated successfully.
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

export default UpdateUser;
