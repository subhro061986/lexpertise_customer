import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Footer from "../layout/Footer";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/config.json";

// ─── Worker: pinned to react-pdf's own bundled pdfjs version (4.4.168) ───────
// import.meta.url approach breaks on mobile PWAs — CDN is more reliable here.
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

const isIOS     = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = () => /Android/i.test(navigator.userAgent);
const isMobile  = () => isIOS() || isAndroid();

// ─── Mobile PDF viewer ────────────────────────────────────────────────────────
const MobilePdfViewer = ({ arrayBuffer }) => {
  const containerRef            = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [contW,    setContW]    = useState(0);
  const [docError, setDocError] = useState("");

  // The file prop must be stable — wrap arrayBuffer in useMemo-like ref
  // so react-pdf doesn't reload on every render
  const fileRef = useRef(null);
  if (!fileRef.current) {
    fileRef.current = { data: arrayBuffer };
  }

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContW(containerRef.current.clientWidth - 24);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (docError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 p-6 text-center text-sm">
        {docError}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        overflowY:               "auto",
        overflowX:               "hidden",
        WebkitOverflowScrolling: "touch",
        height:                  "100%",
        width:                   "100%",
        backgroundColor:         "#525659",
        padding:                 "12px",
        boxSizing:               "border-box",
      }}
    >
      <Document
        file={fileRef.current}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => {
          console.error("react-pdf onLoadError:", err);
          setDocError("Failed to render document.");
        }}
        loading={
          <div className="flex flex-col items-center justify-center gap-3 text-gray-300 py-20">
            <svg className="animate-spin h-8 w-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-sm">Rendering document...</span>
          </div>
        }
      >
        {numPages && contW > 0 &&
          Array.from({ length: numPages }, (_, i) => (
            <div
              key={i + 1}
              style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}
            >
              <Page
                pageNumber={i + 1}
                width={contW}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                error={
                  <div className="text-red-400 text-xs text-center py-4">
                    Failed to render page {i + 1}
                  </div>
                }
              />
            </div>
          ))
        }
      </Document>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const PdfViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openLoginModal, logout } = useAuth();

  const params        = new URLSearchParams(location.search);
  const fileId        = params.get("file_id");
  const allowDownload = params.get("download") === "true";

  // Desktop uses a blob URL for the iframe
  const [blobUrl,     setBlobUrl]     = useState(null);
  // Mobile uses raw ArrayBuffer for react-pdf
  const [arrayBuffer, setArrayBuffer] = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const blobUrlRef                    = useRef(null);
  const mobile                        = isMobile();

  const fetchPdf = useCallback(async (url) => {
    const token = localStorage.getItem("access_token");
    const res   = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      logout();
      openLoginModal();
      navigate("/", { replace: true });
      throw new Error("SESSION_EXPIRED");
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  }, [logout, openLoginModal, navigate]);

  useEffect(() => {
    if (!fileId) return;

    const [uuid, fileType] = fileId.split(":");
    const url = `${API_URL}/files/pdf/${uuid}/${fileType}`;

    fetchPdf(url)
      .then(async (res) => {
        // Always read as ArrayBuffer — works for both paths
        const buffer = await res.arrayBuffer();

        if (mobile) {
          // Pass the raw ArrayBuffer to react-pdf
          setArrayBuffer(buffer);
        } else {
          // Desktop: turn into blob URL for iframe
          const blob   = new Blob([buffer], { type: "application/pdf" });
          const objUrl = URL.createObjectURL(blob);
          blobUrlRef.current = objUrl;
          setBlobUrl(objUrl);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.message !== "SESSION_EXPIRED") {
          console.error("PDF fetch error:", err);
          setError("Could not load the PDF. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, [fileId, mobile]);

  const downloadPdf = useCallback(() => {
    const [, fileType] = fileId.split(":");
    let url     = blobUrl;
    let created = false;
    if (!url && arrayBuffer) {
      url     = URL.createObjectURL(new Blob([arrayBuffer], { type: "application/pdf" }));
      created = true;
    }
    if (!url) return;
    const link    = document.createElement("a");
    link.href     = url;
    link.download = `document_${fileType}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (created) URL.revokeObjectURL(url);
  }, [blobUrl, arrayBuffer, fileId]);

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

  const ready        = !loading && !error;
  const viewerHeight = mobile ? "calc(100vh - 160px)" : "calc(100vh - 240px)";

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">

        {/* Header */}
        <div className="w-full max-w-6xl mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-full bg-white border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition text-sm"
          >
            ← Back
          </button>

          {allowDownload && ready && (
            <button
              onClick={downloadPdf}
              className="px-5 py-2.5 rounded-full bg-yellow-500 text-white font-semibold flex items-center gap-2 hover:bg-yellow-600 transition text-sm"
            >
              <span>Download PDF</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
        </div>

        {/* PDF Container */}
        <div
          className="bg-white shadow-lg rounded-xl overflow-hidden max-w-6xl w-full relative"
          style={{ height: viewerHeight }}
        >
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
              <svg className="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-sm">Loading document...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 gap-3 px-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">{error}</p>
              <button onClick={() => navigate(-1)} className="mt-2 px-4 py-2 bg-gray-200 rounded-full text-gray-700 text-sm">
                Go Back
              </button>
            </div>
          )}

          {ready && mobile && arrayBuffer && (
            <MobilePdfViewer arrayBuffer={arrayBuffer} />
          )}

          {ready && !mobile && blobUrl && (
            <iframe
              src={`${blobUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full"
              title="PDF Viewer"
              style={{ border: "none" }}
            />
          )}
        </div>

        {!allowDownload && (
          <div className="w-full max-w-6xl mt-3 text-center">
            <p className="text-xs text-gray-500">
              This document is view-only and cannot be downloaded
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PdfViewerPage;