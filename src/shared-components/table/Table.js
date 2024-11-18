// import React, { useState } from "react";
// import Pagination from "../pagination/Pagination";
// import SizeBar from "../size-bar/SizeBar";

// const Table = ({ data }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(3);

//   if (!data || data.length === 0) {
//     return (
//       <div className="text-center text-gray-700 mt-4">No users available</div>
//     );
//   }

//   // Convert UUID to sequential numbers in the "id" column
//   const transformedData = data.map((item, idx) => ({
//     ...item,
//     id: idx + 1, // Replace UUID with sequential numbers
//   }));

//   const headers = Object.keys(transformedData[0]);

//   // Pagination calculations
//   const totalItems = transformedData.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Get the current page data
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData =
//     transformedData.length > 0
//       ? transformedData.slice(startIndex, startIndex + itemsPerPage)
//       : [];

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleItemsPerPageChange = (e) => {
//     const selectedValue = parseInt(e.target.value, 10);
//     setItemsPerPage(selectedValue);
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };

//   console.log("Current Data:", currentData); // Debug current data

//   return (
//     <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//       <SizeBar handleSelectChange={handleItemsPerPageChange} />
//       <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
//         <thead>
//           <tr className="bg-blue-500 text-white">
//             {headers.map((header) => (
//               <th
//                 key={header}
//                 className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border border-gray-300"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((row, index) => (
//             <tr
//               key={index}
//               className={`hover:bg-blue-100 ${
//                 index % 2 === 0 ? "bg-gray-50" : "bg-white"
//               }`}
//             >
//               {headers.map((header) => (
//                 <td
//                   key={header}
//                   className="py-3 px-6 border border-gray-300 text-sm text-gray-700"
//                 >
//                   {row[header]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import SizeBar from "../size-bar/SizeBar";

const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-700 mt-4">No users available</div>
    );
  }

  // Convert UUID to sequential numbers in the "id" column
  const transformedData = data.map((item, idx) => ({
    ...item,
    id: idx + 1, // Replace UUID with sequential numbers
  }));

  const headers = Object.keys(transformedData[0]);

  // Helper function to format headers
  const formatHeader = (header) => {
    return header
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Add space between acronyms
      .replace(/_/g, " ") // Replace underscores with spaces
      .toUpperCase(); // Convert to uppercase
  };

  // Pagination calculations
  const totalItems = transformedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get the current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    transformedData.length > 0
      ? transformedData.slice(startIndex, startIndex + itemsPerPage)
      : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setItemsPerPage(selectedValue);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  console.log("Current Data:", currentData); // Debug current data

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <SizeBar handleSelectChange={handleItemsPerPageChange} />
      <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-blue-500 text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border border-gray-300"
              >
                {formatHeader(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={index}
              className={`hover:bg-blue-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="py-3 px-6 border border-gray-300 text-sm text-gray-700"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
