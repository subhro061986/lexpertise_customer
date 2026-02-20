import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import calendar_icon from "../assets/calendar.png";
import court_icon from "../assets/bank.png";
import file_icon from "../assets/pdf_icon.png";
import download_icon from "../assets/import.png";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/config.json";

const CaseDetailPage = () => {
  const { uuid } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, openLoginModal } = useAuth();

  useEffect(() => {
    if (!uuid) return;

    const fetchCase = async () => {
      try {
        const res = await fetch(`${API_URL}/documents/${uuid}`);
        const data = await res.json();
        setCaseData(data);
      } catch (err) {
        console.error("Error fetching case:", err);
      }
      setLoading(false);
    };

    fetchCase();
  }, [uuid]);

  const formatDate = (rawDate) => {
    if (!rawDate) return "N/A";
    const cleanedDate = rawDate.replace(/(\d+)(st|nd|rd|th)/, "$1").replace(",", "");
    const parsedDate = new Date(cleanedDate);
    if (isNaN(parsedDate.getTime())) return "N/A";
    const day   = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year  = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Navigate to PDF viewer — PrivateRoute will handle auth check
  const openPdf = (fileId, allowDownload = false) => {
    if (!fileId) return;
    const downloadParam = allowDownload ? "&download=true" : "";
    navigate(`/pdf-viewer?file_id=${encodeURIComponent(fileId)}${downloadParam}`);
  };

  // Download with auth token — 401 means session expired or not logged in
  const downloadPdf = async (fileId) => {
    if (!fileId) return;

    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    try {
      const [docUuid, fileType] = fileId.split(":");
      const downloadUrl = `${API_URL}/files/pdf/${docUuid}/${fileType}`;
      const token = localStorage.getItem("access_token");

      const response = await fetch(downloadUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        openLoginModal();
        return;
      }

      if (!response.ok) {
        alert("Download failed. Please try again.");
        return;
      }

      const blob    = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link    = document.createElement("a");
      link.href     = blobUrl;
      link.download = `document_${fileType}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!caseData) return <div className="text-center py-20">Case not found</div>;

  return (
    <>
      <main className="flex justify-center px-4 py-10 bg-gray-100 min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

          {/* Top Section */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-gray-100 text-sm font-semibold px-4 py-1 rounded-full">
              {caseData.decision_type}
            </span>
            <span className="text-sm text-gray-600 font-medium">
              {caseData.neutral_citation}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-snug">{caseData.case_name}</h1>
          <p className="text-sm text-gray-500 mt-1">{caseData.case_number}</p>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <img src={court_icon} alt="court" className="w-5 h-5" />
              <span>Supreme Court</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={calendar_icon} alt="calendar" className="w-5 h-5" />
              <span>{formatDate(caseData.order_or_judgement_date)}</span>
            </div>
            <span className="text-gray-500 font-medium">{caseData.reported_or_unreported}</span>
          </div>

          {/* Main PDF Buttons */}
          <div className="flex gap-6 mt-8 items-center justify-center">
            <button
              onClick={() => openPdf(caseData.pdf_links?.main, true)}
              className="px-6 py-3 rounded-full border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition"
            >
              View
            </button>

            <button
              onClick={() => downloadPdf(caseData.pdf_links?.main)}
              className="px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold flex items-center gap-2 hover:bg-yellow-600 transition"
            >
              Download
              <img src={download_icon} alt="download" className="w-4 h-4" />
            </button>
          </div>

          <hr className="my-8" />

          {/* Other 6 PDFs (View Only) */}
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: "Headnotes",                 key: "headnotes" },
              { label: "Catchnotes",                key: "catchnotes" },
              { label: "Student Case Notes",        key: "student_notes" },
              { label: "Judgment Summary",          key: "judgment_summary" },
              { label: "Judgment Timeline Summary", key: "timeline_summary" },
              { label: "Case Commentary",           key: "case_commentary" },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => openPdf(caseData.pdf_links?.[item.key], false)}
                className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition"
              >
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src={file_icon} alt="pdf" className="w-20 h-20" />
                </div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default CaseDetailPage;