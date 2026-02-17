import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:8000";

const PdfViewerPage = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { openLoginModal, logout } = useAuth();

  const params        = new URLSearchParams(location.search);
  const fileId        = params.get("file_id");
  const allowDownload = params.get("download") === "true";

  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // Authenticated fetch helper
  const fetchPdf = async (url) => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      // Session expired or overridden by another device
      logout();
      openLoginModal();
      navigate("/", { replace: true });
      throw new Error("SESSION_EXPIRED");
    }

    if (!res.ok) throw new Error("Failed to load PDF");
    return res.blob();
  };

  useEffect(() => {
    if (!fileId) return;

    const [uuid, fileType] = fileId.split(":");
    const apiUrl = `${API_BASE}/files/pdf/${uuid}/${fileType}`;

    fetchPdf(apiUrl)
      .then((blob) => {
        setBlobUrl(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((err) => {
        if (err.message !== "SESSION_EXPIRED") {
          setError("Could not load the PDF. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [fileId]);

  // Download uses the same authenticated blob — no direct URL exposure
  const downloadPdf = () => {
    if (!blobUrl) return;
    const [, fileType] = fileId.split(":");
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `document_${fileType}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!fileId) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Invalid file ID</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">

        {/* Header */}
        <div className="w-full max-w-6xl mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-full bg-white border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition"
          >
            ← Back
          </button>

          {allowDownload && blobUrl && (
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

        {/* PDF Viewer */}
        <div
          className="bg-white shadow-lg rounded-xl overflow-hidden max-w-6xl w-full relative"
          style={{ height: "calc(100vh - 240px)" }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Loading document...
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              {error}
            </div>
          )}

          {blobUrl && (
            <iframe
              src={`${blobUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full"
              title="PDF Viewer"
              style={{ border: "none" }}
            />
          )}
        </div>

        {!allowDownload && (
          <div className="w-full max-w-6xl mt-4 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-800">This document is view-only and cannot be downloaded</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PdfViewerPage;