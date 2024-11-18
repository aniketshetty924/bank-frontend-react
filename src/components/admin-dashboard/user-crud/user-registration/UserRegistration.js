import React, { useState } from "react";
import { createUser } from "../../../../services/admin/adminServices";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "age" ? parseInt(value, 10) || "" : value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      console.log("Form Data Submitted: ", formData);
      console.log("Final response: ", response);

      setCreatedUser(response);

      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        username: "",
        password: "",
      });

      alert("User Registered Successfully!");
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 relative">
      {/* Header */}
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">User Registration</h1>
        <p className="text-md text-blue-200 mt-2">
          Please provide the following details to create an account.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create a User
          </h2>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
              min="1"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 text-indigo-500 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Created User Card */}
      {createdUser && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              User Created Successfully
            </h3>
            <p className="text-gray-700">
              <strong>ID:</strong> {createdUser.id}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {createdUser.firstName}{" "}
              {createdUser.lastName}
            </p>
            <p className="text-gray-700">
              <strong>Age:</strong> {createdUser.age}
            </p>
            <p className="text-gray-700">
              <strong>Username:</strong> {createdUser.username}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
