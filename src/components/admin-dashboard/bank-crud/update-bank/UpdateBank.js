import React, { useEffect, useState } from "react";
import {
  findBankById,
  updateBankById,
} from "../../../../services/admin/adminServices";

const UpdateBank = () => {
  const [bankId, setBankId] = useState("");
  const [bank, setBank] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    abbreviation: "",
  });

  const handleSearch = async () => {
    try {
      setError("");
      setBank(null);
      setLoading(true);
      const bankData = await findBankById(bankId);
      console.log("Fetched Bank Data : ", bankData);
      setBank(bankData);
      setUpdatedData({
        name: bankData.bankName || "",
        abbreviation: bankData.abbreviation || "",
      });
    } catch (err) {
      console.log(err);
      setError(err.message || "Error fetching bank");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBank = async () => {
    if (!bank) {
      setError("No bank found to update.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      for (const [parameter, value] of Object.entries(updatedData)) {
        if (bank[parameter] !== value) {
          const updatedBankData = await updateBankById(
            bankId,
            parameter,
            value
          );
          console.log(`Updated ${parameter} to ${value}`);
        }
      }

      const updatedBankData = await findBankById(bankId);
      setBank(updatedBankData);

      alert(`Bank with ID ${bankId} has been updated successfully.`);
    } catch (err) {
      console.log(err);
      setError(err.message || "Error updating bank.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Bank Data Updated : ", bank);
  }, [bank]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Header */}
      <div className="text-white p-6">
        <h1 className="text-4xl font-bold">Update Bank</h1>
        <p className="text-md mt-2">
          Search for a bank by entering its ID, then update its details.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Search and Update Bank
          </h2>

          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Bank ID
            </label>
            <input
              type="text"
              placeholder="Enter Bank ID"
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <div className="mt-4 text-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* Bank Card */}
          {bank && (
            <>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
                <h3 className="text-xl font-semibold text-blue-700">
                  Bank Details
                </h3>
                <p className="text-gray-700 mt-2">
                  <strong>ID:</strong> {bank.id}
                </p>
                <p className="text-gray-700">
                  <strong>Name:</strong> {bank.bankName}
                </p>
                <p className="text-gray-700">
                  <strong>Abbreviation:</strong> {bank.abbreviation}
                </p>
              </div>

              {/* Update Fields */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Update Bank Information
                </h3>

                {/* Bank Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Bank Name"
                    value={updatedData.name}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                {/* Abbreviation */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Abbreviation
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Abbreviation"
                    value={updatedData.abbreviation}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        abbreviation: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 focus:ring-2 focus:ring-green-300"
                    onClick={handleUpdateBank}
                  >
                    Update Bank
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

export default UpdateBank;
