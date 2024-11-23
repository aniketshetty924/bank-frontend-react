import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { photoUrlService } from "../../../utils/user-dashboard-helper/photoUrlService";
import {
  getKycService,
  submitKycService,
} from "../../../services/user/userServices";
import UserHeader from "../../../shared-components/header/UserHeader";

const KYC = () => {
  const [kycData, setKycData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [status, setStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKYC = async () => {
      try {
        const response = await getKycService();
        setKycData(response.data);
        setStatus(response.data.status);
        setAdminNote(response.data.adminNote || "");
        setDocumentUrl(response.data.documentUrl);
      } catch (error) {
        console.error("Error fetching KYC:", error);
      }
    };

    fetchKYC();
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload a photo document");
      return;
    }

    try {
      const photoUrl = await photoUrlService(photo);
      setDocumentUrl(photoUrl);

      const updatedKycData = await submitKycService({ document: photoUrl });
      setKycData(updatedKycData.data);
      alert("KYC document uploaded successfully!");

      const freshKycData = await getKycService();
      setKycData(freshKycData.data);
      setStatus(freshKycData.data.status);
      setAdminNote(freshKycData.data.adminNote || "");
    } catch (error) {
      console.error("Error uploading KYC document:", error);
      alert("Failed to upload the document. Please try again.");
    }
  };

  const getLabelText = () => {
    if (status === "rejected") {
      return "You need to upload your document again";
    } else if (status === "submitted" || status === "approved") {
      return "Update Document";
    }
    return "Upload Document";
  };

  return (
    <div>
      <UserHeader />
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 flex flex-col items-center p-6">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
          <h2 className="text-3xl font-bold text-purple-600 text-center mb-6">
            User KYC
          </h2>

          {/* KYC Status */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-purple-100">
                <tr>
                  {status && (
                    <th className="border border-gray-300 px-4 py-2 text-left text-purple-800">
                      Status
                    </th>
                  )}
                  {adminNote && (
                    <th className="border border-gray-300 px-4 py-2 text-left text-purple-800">
                      Admin Note
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {status && (
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {status}
                    </td>
                  )}
                  {adminNote && (
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {adminNote}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Uploaded Document */}
          {documentUrl && (
            <div className="mb-6 text-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Uploaded Document
              </h4>
              <img
                src={documentUrl}
                alt="KYC Document"
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          )}

          {/* Upload Section */}
          <div className="bg-purple-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-purple-600 mb-4 text-center">
              {getLabelText()}
            </h4>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="mb-4 border border-purple-300 rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Upload Document
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
