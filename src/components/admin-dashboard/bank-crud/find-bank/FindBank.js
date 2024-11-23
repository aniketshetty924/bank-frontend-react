import React, { useState, useEffect } from "react";
import { findBankById } from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const FindBank = () => {
  const [bankId, setBankId] = useState("");
  const [bank, setBank] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  const handleSearch = async () => {
    try {
      setError("");
      setBank(null);
      setLoading(true);
      const bankData = await findBankById(bankId); // Fetch bank without accounts
      console.log("Fetched Bank Data:", bankData);
      setBank(bankData);
      setShowAccounts(false);
    } catch (err) {
      setError(err.message || "Error fetching bank");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAccounts = async () => {
    try {
      setError("");
      setLoading(true);

      const bankData = await findBankById(bankId, ["account"]); // Ensure this fetches accounts
      console.log("Fetched Bank Data with Accounts:", bankData);
      setBank(bankData);
      setShowAccounts(true); // Indicate that accounts should be shown
    } catch (err) {
      setError(err.message || "Error fetching accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Bank Data Updated:", bank);
  }, [bank]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 relative">
      <AdminHeader />
      {/* Header */}
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Find Bank</h1>
        <p className="text-md text-blue-200 mt-2">
          Search for a bank by entering its ID.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Search Bank by ID
          </h2>

          {/* Input Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Bank ID
            </label>
            <input
              type="text"
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              placeholder="Enter Bank ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-300"
            >
              Search
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Loading Indicator */}
          {loading && <p className="text-blue-500 text-center">Loading...</p>}

          {/* Bank Card */}
          {bank && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-xl font-bold text-gray-800">Bank Details</h3>
              <p className="text-gray-700 mt-2">
                <strong>ID:</strong> {bank.id}
              </p>
              <p className="text-gray-700">
                <strong>Bank Name:</strong> {bank.bankName}
              </p>
              <p className="text-gray-700">
                <strong>Abbreviation:</strong> {bank.abbreviation}
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
              {showAccounts && bank.accounts && bank.accounts.length > 0 && (
                <div className="mt-6 space-y-4">
                  {bank.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        Account Details
                      </h4>
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
              {bank && (
                <div>
                  {/* Existing content */}
                  {showAccounts &&
                    (!bank.accounts ||
                      !Array.isArray(bank.accounts) ||
                      bank.accounts.length === 0) && <p>No accounts found.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindBank;
