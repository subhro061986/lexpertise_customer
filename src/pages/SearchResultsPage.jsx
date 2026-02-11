import React from "react";
import calendarIcon from "../assets/calendar.png"; // use your calendar icon

const SearchResultsPage = () => {
  const results = new Array(6).fill({
    title: "Union of India vs. M/S Global Tech Solutions..",
    citation: "INSC 2023 452",
    date: "14 Oct, 2024",
  });

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-6 py-8">

      {/* Header */}
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-[#1B2B4B]">
          1,240 Results found
        </h1>

        <p className="text-gray-600 mt-2">
          Showing results for "State of Karnataka"
        </p>

        {/* Sort + Refine */}
        <div className="flex flex-col md:flex-row gap-6 mt-6 items-start md:items-center">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#1B2B4B]">
              Sort by
            </label>
            <select className="px-5 py-3 rounded-xl border border-[#d5b17c] bg-white w-48">
              <option>Relevance</option>
              <option>Date</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-semibold text-[#1B2B4B]">
              Refine Search
            </label>
            <input
              type="text"
              placeholder="Case name, Judge name etc"
              className="px-5 py-3 rounded-xl border border-[#d5b17c] bg-white w-full"
            />
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {results.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-[#1B2B4B] text-lg mb-4">
                {item.title}
              </h3>

              <span className="inline-block bg-[#eef1f5] text-[#1B2B4B] text-sm px-4 py-2 rounded-lg mb-4">
                {item.citation}
              </span>

              <div className="flex items-center gap-2 text-[#1B2B4B] text-sm mt-2">
                <span className="text-yellow-500">📅</span>
                {item.date}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="w-12 h-12 rounded-full bg-gray-300 text-gray-700 font-semibold">
            01
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 font-semibold">
            02
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 font-semibold">
            03
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchResultsPage;
