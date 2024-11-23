import React, { useState } from "react";
import axios from "axios";
import { findLedgerById } from "../../../../services/admin/adminServices";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const FindLedger = () => {
  const [ledgerId, setLedgerId] = useState("");
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ledgerId) {
      setError("Please enter a valid Ledger ID.");
      return;
    }

    setError("");
    setLedger(null);
    setLoading(true);

    try {
      const ledgerData = await findLedgerById(ledgerId);

      setLedger(ledgerData);
    } catch (err) {
      console.error("Error fetching ledger:", err);
      setError(err.response?.data?.message || "Error fetching ledger details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-indigo-300">
      {/* Header */}
      <AdminHeader />
      <div className="text-white p-6">
        <h1 className="text-4xl font-bold">Find Ledger</h1>
        <p className="text-md mt-2">Search for a ledger by entering its ID.</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Search Ledger
          </h2>

          {/* Input Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Ledger ID
            </label>
            <input
              type="text"
              value={ledgerId}
              placeholder="Enter Ledger ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => setLedgerId(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mb-6">
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-transform duration-300"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Ledger Details Card */}
          {ledger && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Ledger Details
              </h3>
              <p className="text-gray-700">
                <strong>ID:</strong> {ledger.id}
              </p>
              <p className="text-gray-700">
                <strong>Sender Bank Name:</strong> {ledger.senderBankName}
              </p>
              <p className="text-gray-700">
                <strong>Receiver Bank Name:</strong> {ledger.receiverBankName}
              </p>
              <p className="text-gray-700">
                <strong>Sender Bank ID:</strong> {ledger.senderBankId}
              </p>
              <p className="text-gray-700">
                <strong>Receiver Bank ID:</strong> {ledger.receiverBankId}
              </p>
              <p className="text-gray-700">
                <strong>Total Amount:</strong> ₹ {ledger.totalAmount}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindLedger;
