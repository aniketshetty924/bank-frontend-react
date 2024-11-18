import React, { useState } from "react";
import { createBank } from "../../../../services/admin/adminServices"; // Update this import path to your service location

const CreateBank = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    bankAbbreviation: "",
  });

  const [createdBank, setCreatedBank] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBank(formData); // Call API to create bank
      console.log("Form Data Submitted: ", formData);
      console.log("Final response: ", response);

      setCreatedBank(response); // Set the created bank data to display the card

      setFormData({
        bankName: "",
        bankAbbreviation: "",
      });

      alert("Bank Created Successfully!");
    } catch (err) {
      console.error("Error creating bank:", err);
      alert("Failed to create bank.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-400 relative">
      {/* Header */}
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Create Bank</h1>
        <p className="text-md text-blue-200 mt-2">
          Please provide the following details to create a bank.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create a Bank
          </h2>

          {/* Bank Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="Enter the bank name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>

          {/* Bank Abbreviation */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Bank Abbreviation
            </label>
            <input
              type="text"
              name="bankAbbreviation"
              value={formData.bankAbbreviation}
              onChange={handleInputChange}
              placeholder="Enter the bank abbreviation"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-green-700 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-105 transition-transform duration-300"
            >
              Create Bank
            </button>
          </div>
        </form>
      </div>

      {/* Created Bank Card */}
      {createdBank && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Bank Created Successfully
            </h3>
            <p className="text-gray-700">
              <strong>ID:</strong> {createdBank.id}
            </p>
            <p className="text-gray-700">
              <strong>Bank Name:</strong> {createdBank.bankName}
            </p>
            <p className="text-gray-700">
              <strong>Abbreviation:</strong> {createdBank.abbreviation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBank;
