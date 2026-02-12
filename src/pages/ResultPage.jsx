import React, { useEffect, useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import Footer from "../layout/Footer";
import calendar_img from "../assets/calendar.png";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    executeSearch(1);
  }, []);

  const totalPages = Math.ceil((total || 0) / (limit || 10));

  const handleRefine = () => {
    const trimmedKeyword =
      keyword && keyword.trim() !== "" ? keyword.trim() : null;

    const updatedFilters = {
      ...filters,
      search_by: searchMode === "basic" ? searchBy : null,
      keyword: trimmedKeyword,
    };

    setFilters(updatedFilters);
    executeSearch(1, updatedFilters);
  };

  return (
    <>
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="lg:flex flex-col gap-6 bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#f0f2f4] dark:border-slate-700 pb-4">
              <h3 className="font-bold text-lg">Refine Search</h3>
              <button
                onClick={() => executeSearch(1)}
                className="text-sm text-primary font-medium hover:underline"
              >
                Reset All
              </button>
            </div>

            {searchMode === "basic" && (
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-medium">Search By</label>
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="w-full h-11 pl-3 pr-8 rounded-lg input_border bg-white dark:bg-slate-800 text-sm"
                >
                  <option value="keyword">Keyword</option>
                  <option value="judge">Judge</option>
                  <option value="case_name">Case Name</option>
                  <option value="case_no">Case Number</option>
                </select>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Search Keywords</label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-lg input_border bg-white dark:bg-slate-800 text-sm"
                type="text"
              />
            </div>

            <button
              onClick={handleRefine}
              className="px-4 py-2 btn_primary rounded-full mt-2"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111418] dark:text-white">
                {total || 0} Results found
              </h2>
              <p className="text-sm text-[#617589] mt-1">
                Showing page {page} of {totalPages || 1}
              </p>
            </div>
          </div>

          {loading && results.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              Loading results...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => {
              const caseDetails =
                typeof item.case_details === "string"
                  ? JSON.parse(item.case_details)
                  : item.case_details;

              return (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative"
                >
                  <div>
                    <div className="flex flex-col gap-2 mb-4 pr-14">
                      <a
                        className="text-lg font-bold text-primary hover:underline leading-snug block line-clamp-2"
                        href="#"
                      >
                        {caseDetails?.case_name || "Untitled Case"}
                      </a>
                      <span className="font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded text-xs">
                        {caseDetails?.case_number || "N/A"}
                      </span>
                      <span className="font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded text-xs">
                        {caseDetails?.neutral_citation || "N/A"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-[#617589] dark:text-slate-400 mb-6">
                      <div className="flex items-center gap-2">
                        <img src={calendar_img} alt="calendar" />
                        <span>
                          {new Date(
                            caseDetails?.order_or_judgement_date,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-[#dbe0e6] dark:border-slate-700 pt-6 mt-8">
            <button
              disabled={page <= 1 || loading}
              onClick={() => executeSearch(page - 1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => executeSearch(p)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium ${
                    p === page
                      ? "bg-primary text-white"
                      : "text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              disabled={page >= totalPages || loading}
              onClick={() => executeSearch(page + 1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ResultPage;
