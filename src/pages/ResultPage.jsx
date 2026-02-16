import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import Footer from "../layout/Footer";
import calendar_img from "../assets/calendar.png";
import search_icon from "../assets/search-normal.png";

const ResultPage = () => {
  const {
    results,
    total,
    page,
    limit,
    executeSearch,
    loading,
    searchMode,
    filters,
    setFilters,
  } = useContext(SearchContext);

  const [searchBy, setSearchBy] = useState(filters?.search_by || "keyword");
  const [keyword, setKeyword] = useState(filters?.keyword || "");
  const [showRefine, setShowRefine] = useState(false); // collapsed by default
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    executeSearch(1);
  }, []);

  const totalPages = Math.ceil((total || 0) / (limit || 10));

  const handleRefine = () => {
    const trimmedKeyword =
      keyword && keyword.trim() !== "" ? keyword.trim() : null;

    const updatedFilters = {
      ...filters, // keep all existing filters
    };

    if (searchMode === "basic") {
      updatedFilters.search_by = searchBy;
      updatedFilters.keyword = trimmedKeyword;
    } else {
      updatedFilters.keyword = trimmedKeyword;
    }

    setFilters(updatedFilters);

    executeSearch(1, updatedFilters);
  };

  return (
    <>
      <main className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowRefine(!showRefine)}
            className="px-6 py-3 rounded-full border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition flex items-center gap-2"
          >
            <img src={search_icon} alt="search" className="w-4 h-4" />
            {showRefine ? "Hide Filters" : "Refine Search"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          {showRefine && (
            <aside className="w-full lg:w-80 shrink-0">
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-[#dbe0e6] dark:border-slate-700 shadow-sm sticky top-24">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <h3 className="font-bold text-lg">Refine Search</h3>
                  <button
                    onClick={() => executeSearch(1)}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                {searchMode === "basic" && (
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-sm font-medium">Search By</label>
                    <select
                      value={searchBy}
                      onChange={(e) => setSearchBy(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg input_border bg-white text-sm"
                    >
                      <option value="keyword">Keyword</option>
                      <option value="judge">Judge</option>
                      <option value="case_name">Case Name</option>
                      <option value="case_no">Case Number</option>
                    </select>
                  </div>
                )}

                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-sm font-medium">Search Keywords</label>
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg input_border text-sm"
                    type="text"
                  />
                </div>

                <button
                  onClick={handleRefine}
                  className="w-full py-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                >
                  Apply Filters
                </button>
              </div>
            </aside>
          )}

          {/* Results Section */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{total || 0} Results found</h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing page {page} of {totalPages || 1}
              </p>
            </div>

            {loading && results.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                Loading results...
              </div>
            )}

            {/* Correct Dynamic Grid */}
            <div
              className={`grid gap-6
          grid-cols-1
          sm:grid-cols-2
          ${showRefine ? "lg:grid-cols-3" : "lg:grid-cols-4"}
        `}
            >
              {results.map((item) => {
                const caseDetails =
                  typeof item.case_details === "string"
                    ? JSON.parse(item.case_details)
                    : item.case_details;

                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/case/${item.uuid}`)}
                    className="bg-white p-5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-[#e6dedb] dark:border-[#3e2c26] shadow-sm hover:shadow-md transition cursor-pointer flex flex-col gap-3"
                  >
                    <h3 className="font-semibold text-primary line-clamp-2">
                      {caseDetails?.case_name || "Untitled Case"}
                    </h3>

                    <span className="text-xs bg-slate-100 px-2 py-1 rounded w-fit">
                      {caseDetails?.case_number || "N/A"}
                    </span>

                    <span className="text-xs bg-slate-100 px-2 py-1 rounded w-fit">
                      {caseDetails?.neutral_citation || "N/A"}
                    </span>

                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-auto">
                      <img
                        src={calendar_img}
                        alt="calendar"
                        className="w-4 h-4"
                      />
                      <span>
                        {caseDetails?.order_or_judgement_date || "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#dbe0e6] dark:border-slate-700 pt-6 mt-10 gap-4">
            {/* Previous */}
            <button
              disabled={page <= 1 || loading}
              onClick={() => executeSearch(page - 1)}
              className="px-4 py-2 text-sm font-medium text-[#617589] hover:text-[#111418] dark:hover:text-white transition disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => executeSearch(p)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                    p === page
                      ? "bg-yellow-500 text-white"
                      : "text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-800 "
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              disabled={page >= totalPages || loading}
              onClick={() => executeSearch(page + 1)}
              className="px-4 py-2 text-sm font-medium text-[#617589] hover:text-[#111418] dark:hover:text-white transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ResultPage;
