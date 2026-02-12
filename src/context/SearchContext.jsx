import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState("basic");
  const [filters, setFilters] = useState({});

  const executeSearch = async (newPage = 1, overrideFilters = null) => {
    setLoading(true);

    const endpoint =
      searchMode === "advanced"
        ? "http://localhost:8000/search/advanced"
        : "http://localhost:8000/search/normal";

    const activeFilters = overrideFilters || filters;

    let body;

    if (searchMode === "advanced") {
      body = {
        category_id: activeFilters.category_id || null,
        year: activeFilters.year || null,
        month: activeFilters.month || null,
        keywords: activeFilters.keyword || null,
        page: newPage,
        limit: limit,
      };
    } else {
      body = {
        search_by: activeFilters.search_by || null,
        keyword: activeFilters.keyword || null,
        category_id: activeFilters.category_id || null,
        year: activeFilters.year || null,
        month: activeFilters.month || null,
        page: newPage,
        limit: limit,
      };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      setResults(data.results || []);
      setTotal(data.total || 0);
      setPage(data.page || 1);
    } catch (error) {
      console.error("Search error:", error);
    }

    setLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{
        results,
        total,
        page,
        limit,
        loading,
        searchMode,
        setSearchMode,
        filters,
        setFilters,
        executeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
