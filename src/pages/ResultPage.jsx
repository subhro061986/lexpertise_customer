import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TopMenu from "../layout/TopMenu";
import Footer from "../layout/Footer";
import calendar_img from "../assets/calendar.png";
import uncheck_img from "../assets/close-square.png";
import arrow_down from "../assets/arrow-circle-down.png";

const ResultPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= READ MODE FROM HOMEPAGE ================= */
  const searchMode = location.state?.mode || "basic";

  const [searchBy, setSearchBy] = useState("Legislation");

  const getPlaceholder = () => {
    switch (searchBy) {
      case "Legislation":
        return "Enter Legislation";
      case "Criminal Appeal":
        return "Enter Criminal Appeal Details";
      case "Taxation":
        return "Enter Taxation Details";
      case "Property Dispute":
        return "Enter Property Dispute Details";
      default:
        return "Case No / Key Word";
    }
  };

  return (
    <>
      {/* <TopMenu/> */}

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-8">

        {/* ================= SIDEBAR ================= */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="lg:flex flex-col gap-6 bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-[#f0f2f4] dark:border-slate-700 pb-4">
              <h3 className="font-bold text-lg">Refine Search</h3>
              <a className="text-sm text-primary font-medium hover:underline" href="#">
                Reset All
              </a>
            </div>

            {/* Court Category */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                Court Category
              </label>
              <div className=" selected_tab_color rounded-full flex flex-col gap-2 w-50">
                <label className="flex text-center items-center gap-3 p-2.5 ">
                  <span className="text-sm font-medium text-[#111418] dark:text-slate-300">
                    Supreme Court
                  </span>
                </label>
              </div>
            </div>

            {/* State + District */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                  Select State
                </label>
                <select className="w-full h-11 pl-3 pr-8 rounded-lg input_border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 text-[#111418] dark:text-white">
                  <option>Karnataka</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 opacity-50 cursor-not-allowed">
                <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                  Select District
                </label>
                <select
                  className="w-full h-11 pl-3 pr-8 rounded-lg input_border dark:border-slate-600 bg-[#f6f7f8] dark:bg-slate-900 text-sm focus:border-primary focus:ring-0 text-[#617589]"
                  disabled
                >
                  <option>Select District...</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-[#f0f2f4] dark:bg-slate-700 my-1"></div>

            {/* Case Category + Year + Month */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                  Case Category
                </label>
                <select className="w-full h-11 pl-3 pr-8 rounded-lg input_border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 text-[#111418] dark:text-white">
                  <option>Civil Writ Petition</option>
                  <option>Criminal Appeal</option>
                  <option>Taxation</option>
                  <option>Property Dispute</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                    Year
                  </label>
                  <select className="w-full h-11 pl-3 pr-8 rounded-lg input_border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 text-[#111418] dark:text-white">
                    <option>2023</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                    Month
                  </label>
                  <select className="w-full h-11 pl-3 pr-8 rounded-lg input_border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 text-[#111418] dark:text-white">
                    <option>October</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BASIC MODE → Show Search By */}
            {searchMode === "basic" && (
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                  Search By
                </label>
                <div className="relative">
                  <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-full h-11 pl-3 pr-8 rounded-lg input_border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 text-[#111418] dark:text-white"
                  >
                    <option>Legislation</option>
                    <option>Criminal Appeal</option>
                    <option>Taxation</option>
                    <option>Property Dispute</option>
                  </select>
                </div>
              </div>
            )}

            {/* Search Input */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium text-[#111418] dark:text-slate-200">
                Search Keywords
              </label>
              <div className="relative">
                <input
                  className="w-full h-11 pl-4 pr-10 rounded-lg input_border dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 placeholder:text-[#617589]"
                  placeholder={
                    searchMode === "advanced"
                      ? "Legislation, Section, Judge , Keywords"
                      : getPlaceholder()
                  }
                  type="text"
                />
              </div>
            </div>

            <button className="px-4 py-2 btn_primary rounded-full mt-2">
              Apply Filters
            </button>

          </div>
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 text-sm text-[#617589] mb-6">
            <a className="hover:text-primary" href="#">
              Home
            </a>
            <span>/</span>
            <span className="font-medium text-[#111418] dark:text-white">
              Search Results
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111418] dark:text-white">
                1,240 Results found
              </h2>
              <p className="text-sm text-[#617589] mt-1">
                Showing results for "State of Karnataka"
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#617589]">
                Sort by:
              </span>
              <div className="relative">
                <select className="appearance-none pl-4 pr-10 py-2 bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-slate-700 rounded-lg text-sm font-medium text-[#111418] dark:text-white focus:outline-none focus:border-primary cursor-pointer">
                  <option>Relevance</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
              <div>
                <div className="flex flex-col gap-2 mb-4 pr-14">
                  <a
                    className="text-lg font-bold text-primary hover:underline leading-snug block line-clamp-2"
                    href="#"
                  >
                    Union of India vs. M/S Global Tech Solutions Pvt Ltd.
                  </a>
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded text-xs text-[#111418] dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    WP(C) 1234/2023
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[#617589] dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={calendar_img} alt="calendar" />
                    <span>14 Oct, 2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
              <div>
                <div className="flex flex-col gap-2 mb-4 pr-14">
                  <a
                    className="text-lg font-bold text-primary hover:underline leading-snug block line-clamp-2"
                    href="#"
                  >
                    State of Karnataka vs. Ramesh Kumar &amp; Ors.
                  </a>
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded text-xs text-[#111418] dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Crl.A. 450/2023
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[#617589] dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={calendar_img} alt="calendar" />
                    <span>22 Sep, 2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
              <div>
                <div className="flex flex-col gap-2 mb-4 pr-14">
                  <a
                    className="text-lg font-bold text-primary hover:underline leading-snug block line-clamp-2"
                    href="#"
                  >
                    Aditya Construction Co. vs. Municipal Corporation
                  </a>
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded text-xs text-[#111418] dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    OS No. 8821/2021
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[#617589] dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={calendar_img} alt="calendar" />
                    <span>10 Aug, 2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group bg-white dark:bg-[#1a2632] p-5 rounded-lg border border-[#dbe0e6] dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full relative">
              <div>
                <div className="flex flex-col gap-2 mb-4 pr-14">
                  <a
                    className="text-lg font-bold text-primary hover:underline leading-snug block line-clamp-2"
                    href="#"
                  >
                    Deepak Sharma vs. The Tax Recovery Officer
                  </a>
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded text-xs text-[#111418] dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    IT Appeal 20/2022
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[#617589] dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={calendar_img} alt="calendar" />
                    <span>05 Jul, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#dbe0e6] dark:border-slate-700 pt-6 mt-8">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors disabled:opacity-50">
              Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">
                1
              </button>
              <button className="h-9 w-9 flex items-center justify-center rounded-lg text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
                2
              </button>
              <button className="h-9 w-9 flex items-center justify-center rounded-lg text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
                3
              </button>
              <span className="px-2 text-[#617589]">...</span>
              <button className="h-9 w-9 flex items-center justify-center rounded-lg text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
                12
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#617589] hover:text-[#111418] dark:hover:text-white transition-colors">
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
