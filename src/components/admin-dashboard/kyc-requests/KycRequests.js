import React, { useState, useEffect } from "react";
import Pagination from "../../../shared-components/pagination/Pagination";
import Table from "../../../shared-components/table/Table";
import {
  approveOrRejectKycRequestService,
  getKycRequestsService,
} from "../../../services/admin/adminServices";
import { selectTableAttribute } from "../../../utils/admin-dashboard-helper/filteredData";

const KycRequests = () => {
  const [kycRequests, setKycRequests] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [notes, setNotes] = useState({});

  const fetchKYCRequests = async () => {
    try {
      const response = await getKycRequestsService({
        page: currentPage,
        limit: pageSize,
      });

      if (response.data.length > 0) {
        const filteredData = selectTableAttribute(response.data, [
          "userId",
          "document",
          "status",
        ]);
        setKycRequests(
          filteredData.map((row) => ({
            ...row,
            document: (
              <a
                href={row.document}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                View Document
              </a>
            ),
            approve: (
              <button
                onClick={() => handleApprove(row.userId)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                Approve
              </button>
            ),
            reject: (
              <button
                onClick={() => handleReject(row.userId, notes[row.userId])}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                Reject
              </button>
            ),
            note: (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add rejection note"
                  onChange={(e) => handleNoteChange(row.userId, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            ),
          }))
        );

        setHeaders([
          ...Object.keys(filteredData[0]),
          "approve",
          "reject",
          "note",
        ]);
        const totalCount = response.headers["x-total-count"] || 0;
        setTotalPages(Math.ceil(totalCount / pageSize));
      } else {
        setKycRequests([]);
        setHeaders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
    }
  };

  useEffect(() => {
    fetchKYCRequests();
  }, [currentPage, pageSize]);

  // Approve KYC Request
  const handleApprove = async (userId) => {
    try {
      console.log("Approve clicked for userId:", userId);
      await approveOrRejectKycRequestService(userId, "approved", null);
      alert("KYC Request Approved!");
      fetchKYCRequests(); // Refetch data after approval
    } catch (error) {
      console.error("Error approving KYC request:", error);
    }
  };

  // Reject KYC Request
  const handleReject = async (userId, note) => {
    try {
      console.log("handleReject called for userId:", userId);

      if (!note || !note.trim()) {
        note = "photo not visible";
      }

      console.log("Rejection note:", note);

      await approveOrRejectKycRequestService(userId, "rejected", note);
      alert("KYC Request Rejected!");
      fetchKYCRequests();
    } catch (error) {
      console.error("Error rejecting KYC request:", error);
    }
  };

  const handleNoteChange = (userId, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [userId]: value,
    }));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin KYC Requests
      </h1>

      {/* Page Size Selector */}
      <div className="flex justify-end mb-4">
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {kycRequests.length > 0 ? (
          <Table headers={headers} tableData={kycRequests} />
        ) : (
          <div className="text-center text-gray-600">No KYC requests found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default KycRequests;
