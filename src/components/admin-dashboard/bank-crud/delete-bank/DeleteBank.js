import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import {
  deleteBankById,
  findBankById,
} from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const DeleteBank = () => {
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
      const bankData = await findBankById(bankId);
      console.log("Fetched Bank Data : ", bankData);
      // Ensure accounts is always an array
      setBank({ ...bankData, accounts: bankData.accounts || [] });
      setShowAccounts(false);
    } catch (err) {
      console.log(err);
      setError(err.message || "Error fetching bank");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAccounts = async () => {
    try {
      setError("");
      setLoading(true);
      const bankData = await findBankById(bankId, ["account"]);
      console.log("Fetched Bank data with accounts : ", bankData);
      // Ensure accounts is always an array
      setBank({ ...bankData, accounts: bankData.accounts || [] });
      setShowAccounts(true);
    } catch (err) {
      setError("No Account Found!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBank = async () => {
    if (!bank || bank.accounts.length > 0) {
      setError(
        "Bank cannot be deleted because it has one or more linked accounts."
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the bank with ID ${bankId}?`
    );

    if (confirmDelete) {
      try {
        setError("");
        setLoading(true);
        await deleteBankById(bankId);
        alert(`Bank with ID ${bankId} has been deleted successfully.`);
        setBank(null); // Clear the bank data after deletion
        setBankId(""); // Clear the input field
      } catch (err) {
        console.log(err);
        setError(err.message || "Error deleting bank");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("Bank Data Updated:", bank);
  }, [bank]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-bl from-blue-500 via-blue-400 to-indigo-300 relative">
      {/* Header */}
      <AdminHeader />
      <div className="text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Delete Bank</h1>
        <p className="text-md text-blue-200 mt-2">
          Search for a bank by entering its ID and delete it.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Delete Bank
          </h2>

          {/* Input Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Bank ID
            </label>
            <input
              type="text"
              value={bankId}
              placeholder="Enter Bank ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => setBankId(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mb-6">
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-transform duration-300"
              onClick={handleSearch}
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
              <h3 className="text-xl font-bold text-blue-800">Bank Details</h3>
              <p className="text-gray-700 mt-2">
                <strong>ID:</strong> {bank.id}
              </p>
              <p className="text-gray-700">
                <strong>Name:</strong> {bank.bankName}
              </p>
              <p className="text-gray-700">
                <strong>Abbreviation:</strong> {bank.abbreviation}
              </p>

              {/* Show Accounts Button */}
              {!showAccounts && (
                <button
                  onClick={handleShowAccounts}
                  className="mt-4 bg-gradient-to-r from-green-600 to-teal-500 text-white px-4 py-2 rounded-lg shadow-lg hover:from-green-700 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-105 transition-transform duration-300"
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
            </div>
          )}

          {/* Delete Button */}
          {bank && (
            <button
              className="mt-6 bg-gradient-to-r from-red-700 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:from-red-800 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-transform duration-300"
              onClick={handleDeleteBank}
            >
              <FaTrash size={20} />
              Delete Bank
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteBank;
