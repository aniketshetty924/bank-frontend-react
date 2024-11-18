import React from "react";

const SizeBar = ({ handleSelectChange }) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg shadow-lg border border-gray-200">
      <label
        htmlFor="itemsPerPage"
        className="text-gray-800 font-semibold text-sm whitespace-nowrap"
      >
        Items Per Page:
      </label>
      <select
        id="itemsPerPage"
        onChange={handleSelectChange}
        className="p-2 border border-gray-300 bg-white text-gray-700 rounded-lg shadow-md hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};

export default SizeBar;
