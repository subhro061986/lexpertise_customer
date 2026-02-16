import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const API_BASE = "http://localhost:8000";

const PdfViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const fileId = params.get("file_id"); // Format "uuid:file_type"
  const allowDownload = params.get("download") === "true";
  const [loading, setLoading] = useState(false);

  if (!fileId) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Invalid file ID</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Parse file ID (format: "uuid:file_type")
  const [uuid, fileType] = fileId.split(":");

  // Construct secure API URL - no path exposure
  const finalUrl = `${API_BASE}/files/pdf/${uuid}/${fileType}`;

  // Add #toolbar=0 to disable PDF toolbar (reduces download options)
  const viewerUrl = `${finalUrl}#toolbar=0&navpanes=0`;

  // Direct download without opening (for Download button only)
  const downloadPdf = () => {
    setLoading(true);
    fetch(finalUrl)
      .then((response) => {
        // Extract real filename from Content-Disposition header
        const disposition = response.headers.get("Content-Disposition");
        const match = disposition?.match(/filename="?([^"]+)"?/);
        const filename = match?.[1] ?? `document_${fileType}.pdf`;
        return response.blob().then((blob) => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => {
        console.error("Download failed:", err);
        window.open(finalUrl, "_blank");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        {/* Header with Back Button */}
        <div className="w-full max-w-6xl mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-full bg-white border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition"
          >
            ← Back
          </button>

          {allowDownload && (
            <button
              onClick={downloadPdf}
              disabled={loading}
              className="px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold flex items-center gap-2 hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Download PDF</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          )}
        </div>

        {/* PDF Container with overlay to prevent right-click */}
        <div
          className="bg-white shadow-lg rounded-xl overflow-hidden max-w-6xl w-full relative"
          style={{ height: "calc(100vh - 240px)" }}
        >
          {!allowDownload && (
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "transparent",
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          )}

          <iframe
            src={viewerUrl}
            className="w-full h-full"
            title="PDF Viewer"
            style={{ border: "none" }}
            onContextMenu={(e) => !allowDownload && e.preventDefault()}
          />
        </div>

        <div className="w-full max-w-6xl mt-4 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-800">
            This document is view-only and cannot be downloaded
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PdfViewerPage;