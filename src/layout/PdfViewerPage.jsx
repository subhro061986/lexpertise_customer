import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const API_BASE = "http://localhost:8000";

const PdfViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const rawSrc = params.get("src");
  const allowDownload = params.get("download") === "true"; // Check if download is allowed

  if (!rawSrc) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Invalid PDF URL</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Decode URL
  const decodedSrc = decodeURIComponent(rawSrc);

  // If already full URL, use it
  const finalUrl = decodedSrc.startsWith("http")
    ? decodedSrc
    : `${API_BASE}${decodedSrc}`;

  // Add #toolbar=0 to disable PDF toolbar (reduces download options)
  const viewerUrl = `${finalUrl}#toolbar=0&navpanes=0`;

  // Direct download without opening (for Download button only)
  const downloadPdf = () => {
    // Use fetch to download as blob, then trigger download
    fetch(finalUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = decodedSrc.split('/').pop() || "document.pdf"; // Extract filename from URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(err => {
        console.error("Download failed:", err);
        // Fallback: open in new tab
        window.open(finalUrl, '_blank');
      });
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
              className="px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold flex items-center gap-2 hover:bg-yellow-600 transition"
            >
              <span>Download PDF</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
        </div>

        {!allowDownload && (
          <div className="w-full max-w-6xl mb-4 rounded-lg p-3 text-center">
            <p className="text-sm text-red-800">
              This document is view-only and cannot be downloaded
            </p>
          </div>
        )}

        {/* PDF Container with overlay to prevent right-click */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-6xl w-full relative" style={{ height: 'calc(100vh - 240px)' }}>
          {!allowDownload && (
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ 
                background: 'transparent',
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          )}
          
          <iframe
            src={viewerUrl}
            className="w-full h-full"
            title="PDF Viewer"
            style={{ border: 'none' }}
            onContextMenu={(e) => !allowDownload && e.preventDefault()}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PdfViewerPage;