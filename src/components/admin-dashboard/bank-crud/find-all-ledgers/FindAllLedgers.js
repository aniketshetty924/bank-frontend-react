import React, { useState } from "react";

import { findAllLedgers } from "../../../../services/admin/adminServices";
import { userHelperFilter } from "../../../../utils/admin-dashboard-helper/filteredData";
import Table from "../../../../shared-components/table/Table";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const FindAllLedgers = () => {
  const [ledgers, setLedgers] = useState([]);

  const [filters, setFilters] = useState({
    senderBankId: "",
    receiverBankId: "",
    senderBankName: "",
    receiverBankName: "",
  });

  const fields = [
    "id",
    "senderBankId",
    "receiverBankId",
    "senderBankName",
    "receiverBankName",
    "totalAmount",
  ];
  const filteredData = userHelperFilter(ledgers, fields) || [];

  const fetchLedgers = async () => {
    try {
      console.log("Fetching ledgers with filters:", filters);

      // Remove empty filters before sending the request
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      console.log("Cleaned filters:", cleanedFilters);

      const response = await findAllLedgers(cleanedFilters);
      console.log("response here : ", response);
      console.log("Reponse ledger : ", response.data.ledgers);
      console.log("Repsonse data : ", response.data);
      if (response && response.data) {
        setLedgers(response.data);
      } else {
        setLedgers([]);
      }
    } catch (error) {
      console.log(error);
      setLedgers([]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      senderBankId: "",
      receiverBankId: "",
      senderBankName: "",
      receiverBankName: "",
    });
  };

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-teal-500 flex flex-col items-center justify-center p-10">
        <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-5xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            View All Ledgers
          </h1>

          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="senderBankId"
                className="text-gray-700 font-medium mb-2"
              >
                Sender Bank ID
              </label>
              <input
                id="senderBankId"
                name="senderBankId"
                type="text"
                placeholder="Enter Sender Bank ID"
                value={filters.senderBankId}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="receiverBankId"
                className="text-gray-700 font-medium mb-2"
              >
                Receiver Bank ID
              </label>
              <input
                id="receiverBankId"
                name="receiverBankId"
                type="text"
                placeholder="Enter Receiver Bank ID"
                value={filters.receiverBankId}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="senderBankName"
                className="text-gray-700 font-medium mb-2"
              >
                Sender Bank Name
              </label>
              <input
                id="senderBankName"
                name="senderBankName"
                type="text"
                placeholder="Enter Sender Bank Name"
                value={filters.senderBankName}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="receiverBankName"
                className="text-gray-700 font-medium mb-2"
              >
                Receiver Bank Name
              </label>
              <input
                id="receiverBankName"
                name="receiverBankName"
                type="text"
                placeholder="Enter Receiver Bank Name"
                value={filters.receiverBankName}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
              onClick={fetchLedgers}
            >
              Search
            </button>
          </div>

          {/* Results Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Ledgers List:
            </h2>
            <div>
              {ledgers.length > 0 ? (
                <Table data={filteredData} />
              ) : (
                <p className="text-gray-600 text-center">No ledgers found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAllLedgers;
