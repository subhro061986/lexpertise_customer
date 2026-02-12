import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import Footer from "../layout/Footer";
// import DisclaimerModal from "../layout/DisclaimerModal";
import bg_image from "../assets/background.png";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { setSearchMode, setFilters } = useContext(SearchContext);

  // const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [searchBy, setSearchBy] = useState("keyword");
  const [isAdvanced, setIsAdvanced] = useState(false);

  const [categoryId, setCategoryId] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [keyword, setKeyword] = useState("");

  const getPlaceholder = () => {
    switch (searchBy) {
      case "case_no":
        return "Enter Case Number";
      case "case_name":
        return "Enter Case Name";
      case "party_name":
        return "Enter Party Name";
      case "judge":
        return "Enter Judge Name";
      case "legislation":
        return "Enter Legislation";
      default:
        return "Enter Keyword";
    }
  };

  const handleSearch = () => {
    const trimmedKeyword =
      keyword && keyword.trim() !== "" ? keyword.trim() : null;

    setSearchMode(isAdvanced ? "advanced" : "basic");

    setFilters({
      category_id: categoryId ? Number(categoryId) : null,
      year: year ? Number(year) : null,
      month: month ? Number(month) : null,
      keyword: trimmedKeyword,
      search_by: isAdvanced ? null : searchBy,
    });

    navigate("/search-results");
  };

  return (
    <>
      {/* <DisclaimerModal
        open={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        onAgree={() => setShowDisclaimer(false)}
      /> */}

      <main className="flex-grow flex flex-col items-center justify-start pt-0 pb-20 px-4 sm:px-6 relative">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div
          className="px-6 flex justify-center bg-cover bg-center bg-no-repeat mb-1 px-0 w-full"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          <div className="text-center max-w-3xl space-y-4 dark:bg-[#2e1d19]/80 backdrop-blur-md p-6 rounded-2xl">
            <h2 className="text-[30px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B2053] dark:text-white leading-[1.15]">
              Unravelling the Complexity of Legal Research
            </h2>
            <p className="text-[13px] sm:text-xl color_1 font-medium max-w-2xl mx-auto">
              Access judgements and associated case toolkits to unravel the
              complexity of legal research
            </p>
          </div>
        </div>

        {/* Search Heading */}
        <div className="text-center max-w-3xl space-y-4 dark:bg-[#2e1d19]/80 backdrop-blur-md p-10 rounded-2xl">
          <h2 className="text-[20px] sm:text-3xl font-bold tracking-tight text-[#181311] dark:text-white leading-[1.15]">
            Search the Judgment&nbsp;
            <span className="text-primary relative inline-block secondary_color">
              Database
            </span>
          </h2>
          <p className="text-[13px] color_1 font-medium max-w-2xl mx-auto">
            Gain instant access to millions of judgments, orders, and case
            statuses from Supreme, High, and District Courts.
          </p>
        </div>

        {/* Search Container */}
        <div className="w-full max-w-5xl bg-white dark:bg-[#2e1d19] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-[#e6dedb] dark:border-[#3e2c26] overflow-hidden">
          {/* Court Level */}
          <div className="border-b border-[#e6dedb] dark:border-[#3e2c26] bg-[#faf8f7] dark:bg-[#251815] px-6 py-4">
            <label className="text-sm font-bold tracking-wider color_1 mb-3 block">
              Select Court Level
            </label>
            <div className="selected_tab_color p-1 rounded-full inline-flex">
              <div className="px-6 py-2.5 rounded-md text-sm font-semibold text-center">
                Supreme Court
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Case Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold dark:text-[#e0dad7]">
                  Case Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="form-select block w-full py-3 input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg"
                >
                  <option value="">All Categories</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>

            {/* Year + Month */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold dark:text-[#e0dad7]">
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-select w-full py-3 input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg sm:text-sm dark:text-white shadow-sm"
                  >
                    <option value="">All</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const y = new Date().getFullYear() - i;
                      return (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold dark:text-[#e0dad7]">
                    Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="form-select w-full py-3 input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg sm:text-sm dark:text-white shadow-sm"
                  >
                    <option value="">All</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
              </div>

              {/* Search By (Hidden only when Advanced) */}
              {!isAdvanced && (
                <div className="lg:col-span-6 space-y-2">
                  <label className="block text-sm font-semibold dark:text-[#e0dad7]">
                    Search By
                  </label>
                  <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="form-select block w-full py-3 input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg"
                  >
                    <option value="keyword">Keyword</option>
                    <option value="case_no">Case Number</option>
                    <option value="case_name">Case Name</option>
                    <option value="party_name">Party Name</option>
                    <option value="judge">Judge</option>
                    <option value="legislation">Legislation</option>
                  </select>
                </div>
              )}
            </div>

            {/* Search Query + Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div
                className={`${isAdvanced ? "lg:col-span-8" : "lg:col-span-6"} space-y-2`}
              >
                <label className="block text-sm font-semibold dark:text-[#e0dad7]">
                  Search Query
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="form-input block w-full p-3 input_border bg-white dark:bg-[#251815] rounded-lg"
                  placeholder={
                    isAdvanced
                      ? "Legislation, Section, Judge, Keywords"
                      : getPlaceholder()
                  }
                  type="text"
                />
              </div>

              <div className="lg:col-span-2">
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 btn_primary rounded-full"
                >
                  Search
                </button>
              </div>

              <div className="lg:col-span-4">
                <button
                  onClick={() => setIsAdvanced(!isAdvanced)}
                  className="px-4 py-2 selected_tab_color rounded-full"
                >
                  {isAdvanced ? "Basic Search" : "Advance Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
