import React from "react";
import Footer from "../layout/Footer";
import calendar_icon from "../assets/calendar.png";
import court_icon from "../assets/bank.png"; 
import file_icon from "../assets/pdf_icon.png";   
import download_icon from "../assets/import.png";

const CaseDetailPage = () => {
  const caseData = {
    decision_type: "Order",
    neutral_citation: "2025 INSC 038",
    case_name:
      "Principal Commissioner of Income Tax-4 & Anr. v. M/s. Jupiter Capital Pvt. Ltd.",
    case_number: "Special Leave Petition No. 63 of 2025",
    court: "Supreme Court",
    order_or_judgement_date: "2nd January, 2025",
    reported_or_unreported: "Reportable",
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return "N/A";

    const cleanedDate = rawDate
      .replace(/(\d+)(st|nd|rd|th)/, "$1")
      .replace(",", "");

    const parsedDate = new Date(cleanedDate);
    if (isNaN(parsedDate.getTime())) return "N/A";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
    <main className="flex justify-center px-4 py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

        {/* Top Labels */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-gray-100 text-sm font-semibold px-4 py-1 rounded-full">
            {caseData.decision_type}
          </span>

          <span className="text-sm text-gray-600 font-medium">
            {caseData.neutral_citation}
          </span>
        </div>

        {/* Case Title */}
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          {caseData.case_name}
        </h1>

        {/* Case Number Subtitle */}
        <p className="text-sm text-gray-500 mt-1">
          {caseData.case_number}
        </p>

        {/* Court + Date Row */}
        <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-600 text-sm">

          <div className="flex items-center gap-2">
            <img src={court_icon} alt="court" className="w-5 h-5" />
            <span>{caseData.court}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={calendar_icon} alt="calendar" className="w-5 h-5" />
            <span>
              {formatDate(caseData.order_or_judgement_date)}
            </span>
          </div>

          <span className="text-gray-500 font-medium">
            {caseData.reported_or_unreported}
          </span>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-8 items-center justify-center">

          <button className="px-6 py-3 rounded-full border border-yellow-500 text-yellow-600 font-semibold">
            View
          </button>

          <button className="px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold flex items-center gap-2">
            Download
            <img src={download_icon} alt="download" className="w-4 h-4" />
          </button>

        </div>

        <hr className="my-8" />

        {/* Document Sections */}
        <div className="grid grid-cols-3 gap-6 text-center">

          {[
            "Headnotes",
            "Catchnotes",
            "Student Case Notes",
            "Judgment Summary",
            "Judgment Timeline Summary",
            "Case Commentary",
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 flex items-center justify-center">
                <img src={file_icon} alt="pdf" className="w-20 h-20" />
              </div>
              <p className="text-sm font-medium text-gray-700">{item}</p>
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
