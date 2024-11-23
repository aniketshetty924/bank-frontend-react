import React, { useState } from "react";
import { getAllUsers } from "../../../../services/admin/adminServices";
import Table from "../../../../shared-components/table/Table";
import { userHelperFilter } from "../../../../utils/admin-dashboard-helper/filteredData";
import AdminHeader from "../../../../shared-components/header/AdminHeader";

const FindAllUsers = () => {
  const [user, setUser] = useState([]);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    fromDOB: "",
    toDOB: "",
  });

  const fields = ["id", "firstName", "lastName", "fullName", "dateOfBirth"];
  const filteredData = userHelperFilter(user, fields) || [];
  const fetchUsers = async () => {
    try {
      console.log("Fetching users with filters:", filters);

      // Remove empty filters before sending the request
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      console.log("Cleaned filters:", cleanedFilters);

      const response = await getAllUsers(cleanedFilters);
      if (response && response.data.users) {
        setUser(response.data.users);
      } else {
        setUser([]);
      }
    } catch (error) {
      console.log(error);
      setUser([]);
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
      firstName: "",
      lastName: "",
      fullName: "",
      fromDOB: "",
      toDOB: "",
    });
  };

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-500 flex flex-col items-center justify-center p-10">
        <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-5xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            View All Users
          </h1>

          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter First Name"
                value={filters.firstName}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                value={filters.lastName}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fullName"
                className="text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter Full Name"
                value={filters.fullName}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fromDOB"
                className="text-gray-700 font-medium mb-2"
              >
                From Date of Birth
              </label>
              <input
                id="fromDOB"
                name="fromDOB"
                type="date"
                placeholder="Enter Start Date of Birth"
                value={filters.fromDOB}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="toDOB" className="text-gray-700 font-medium mb-2">
                To Date of Birth
              </label>
              <input
                id="toDOB"
                name="toDOB"
                type="date"
                placeholder="Enter End Date of Birth"
                value={filters.toDOB}
                onChange={handleFilterChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
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
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
              onClick={fetchUsers}
            >
              Search
            </button>
          </div>

          {/* Results Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Users List:
            </h2>
            <div>
              {user.length > 0 ? (
                <Table data={filteredData} />
              ) : (
                <p className="text-gray-600 text-center">No users found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAllUsers;
