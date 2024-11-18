import React, { useEffect, useState } from "react";
import { userHelperFilter } from "../../../../utils/admin-dashboard-helper/filteredData";
import { findAllBanks } from "../../../../services/admin/adminServices";
import Table from "../../../../shared-components/table/Table";

const FindAllBanks = () => {
  const [bank, setBank] = useState([]);
  const [filters, setFilters] = useState({
    bankName: "",
    abbreviation: "",
  });

  const fields = ["id", "bankName", "abbreviation"];
  const filteredData = userHelperFilter(bank, fields) || []; // Updated from `user` to `bank`

  const fetchBanks = async () => {
    try {
      console.log("Fetching banks with filters : ", filters);
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      console.log("Cleaned filters : ", cleanedFilters);
      const response = await findAllBanks(cleanedFilters);

      const banks = response.data.banks || response.data;
      console.log("Table data : ", banks);

      if (banks) {
        setBank(banks);
      } else {
        setBank([]);
      }
    } catch (error) {
      console.error("Error fetching banks:", error);
      setBank([]);
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
      bankName: "",
      abbreviation: "",
    });
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-teal-400 to-blue-500 flex flex-col items-center justify-center p-10">
      <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          View All Banks
        </h1>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label
              htmlFor="bankName"
              className="text-gray-700 font-medium mb-2"
            >
              Bank Name
            </label>
            <input
              id="bankName"
              name="bankName"
              type="text"
              placeholder="Enter Bank Name"
              value={filters.bankName}
              onChange={handleFilterChange}
              className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="abbreviation"
              className="text-gray-700 font-medium mb-2"
            >
              Bank Abbreviation
            </label>
            <input
              id="abbreviation"
              name="abbreviation"
              type="text"
              placeholder="Enter Abbreviation"
              value={filters.abbreviation}
              onChange={handleFilterChange}
              className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-500"
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
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700"
            onClick={fetchBanks}
          >
            Search
          </button>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Banks List:
          </h2>
          <div>
            {bank.length > 0 ? (
              <Table data={filteredData} />
            ) : (
              <p className="text-gray-600 text-center">No banks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAllBanks;
