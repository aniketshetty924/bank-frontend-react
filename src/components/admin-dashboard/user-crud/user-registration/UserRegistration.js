import React, { useState } from "react";
import { createUser } from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      setIsModalOpen(true); // Open the modal after user creation

      // Reset the form data
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Failed to register user.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 relative">
      {/* Header */}
      <AdminHeader />
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">User Registration</h1>
        <p className="text-md text-blue-200 mt-2">
          Please provide the following details to create an account.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center mt-8">
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

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent"
              required
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

      {/* Modal for User Details */}
      {isModalOpen && createdUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              User Created Successfully
            </h3>
            <p className="text-gray-700">
              <strong>ID:</strong> {createdUser.id}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {createdUser.fullName}
            </p>
            <p className="text-gray-700">
              <strong>Date of Birth:</strong> {createdUser.dateOfBirth}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {createdUser.email}
            </p>
            <p className="text-gray-700">
              <strong>Username:</strong> {createdUser.username}
            </p>

            <div className="flex justify-center mt-6">
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
