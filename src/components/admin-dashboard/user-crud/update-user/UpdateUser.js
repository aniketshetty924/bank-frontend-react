// import React, { useEffect, useState } from "react";
// import { findUserById } from "../../../../services/admin/adminServices";

// const UpdateUser = () => {
//   const [userId, setUserId] = useState("");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     try {
//       setError("");
//       setUser(null);
//       setLoading(true);
//       // Replace with your fetch logic
//       const userData = await findUserById(userId);
//       console.log("Fetched User Data : ", userData);
//       setUser(userData);
//     } catch (err) {
//       console.log(err);
//       setError(err.message || "Error fetching user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("User Data Updated : ", user);
//   }, [user]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-red-300 relative">
//       {/* Header */}
//       <div className="text-white p-6 shadow-md">
//         <h1 className="text-4xl font-bold">Update User</h1>
//         <p className="text-md text-pink-200 mt-2">
//           Search for a user by entering their ID, then update their details.
//         </p>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
//           <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
//             Search and Update User
//           </h2>

//           {/* Search Section */}
//           <div className="mb-6">
//             <label className="block text-gray-700 font-medium mb-2">
//               Enter User ID
//             </label>
//             <input
//               type="text"
//               placeholder="Enter User ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
//             />
//             <div className="flex justify-center mt-4">
//               <button
//                 className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-transform duration-300"
//                 onClick={handleSearch}
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* User Card */}
//           {user && (
//             <>
//               <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
//                 <h3 className="text-xl font-bold text-purple-800">
//                   User Details
//                 </h3>
//                 <p className="text-gray-700 mt-2">
//                   <strong>ID:</strong> {user.id}
//                 </p>
//                 <p className="text-gray-700">
//                   <strong>Name:</strong> {user.firstName} {user.lastName}
//                 </p>
//                 <p className="text-gray-700">
//                   <strong>Age:</strong> {user.age}
//                 </p>
//               </div>

//               {/* Update Fields */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-bold text-purple-800 mb-4">
//                   Update User Information
//                 </h3>
//                 {/* First Name */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-medium mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter First Name"
//                     defaultValue={user.firstName}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter Last Name"
//                     defaultValue={user.lastName}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Age */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="Enter Age"
//                     defaultValue={user.age}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center">
//                   <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-transform duration-300">
//                     Update User
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateUser;

import React, { useEffect, useState } from "react";
import {
  findUserById,
  updateUserById,
} from "../../../../services/admin/adminServices";

const UpdateUser = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const handleSearch = async () => {
    try {
      setError("");
      setUser(null);
      setLoading(true);
      const userData = await findUserById(userId);
      console.log("Fetched User Data : ", userData);
      setUser(userData);
      setUpdatedData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        age: userData.age || "",
      });
    } catch (err) {
      console.log(err);
      setError(err.message || "Error fetching user");
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

      // Iterate over the updatedData object to send update requests
      for (const [parameter, value] of Object.entries(updatedData)) {
        if (user[parameter] !== value) {
          const updatedUserData = await updateUserById(
            userId,
            parameter,
            value
          );
          console.log(`Updated ${parameter} to ${value}`);
        }
      }

      // Fetch the updated user data
      const updatedUserData = await findUserById(userId);
      setUser(updatedUserData); // Update the user state with the new data

      alert(`User with ID ${userId} has been updated successfully.`);
    } catch (err) {
      console.log(err);
      setError(err.message || "Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("User Data Updated : ", user);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-red-300 relative">
      {/* Header */}
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Update User</h1>
        <p className="text-md text-pink-200 mt-2">
          Search for a user by entering their ID, then update their details.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Search and Update User
          </h2>

          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Enter User ID
            </label>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
            />
            <div className="flex justify-center mt-4">
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-transform duration-300"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* User Card */}
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
                  <strong>Age:</strong> {user.age}
                </p>
              </div>

              {/* Update Fields */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-purple-800 mb-4">
                  Update User Information
                </h3>

                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Age */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Age"
                    value={updatedData.age}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, age: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
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

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Loading Indicator */}
          {loading && (
            <p className="text-blue-500 text-center mt-4">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
