import React, { createContext, useState, useRef } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState("basic");
  const [filters, setFilters] = useState({});

  // ── Redis cache key from the last DB search ──────────────────────
  const cacheKeyRef = useRef(null);

  const hasActiveFilters = (f) => {
    if (!f) return false;
    return !!(f.keyword || f.category_id || f.year || f.month);
  };

  const executeSearch = async (newPage = 1, overrideFilters = null) => {
    const activeFilters = overrideFilters || filters;

    // Don't hit the API if no filters are set
    if (!hasActiveFilters(activeFilters)) {
      setResults([]);
      setTotal(0);
      setPage(1);
      return;
    }

    setLoading(true);

    // Reset refine state whenever a fresh DB search runs
    cacheKeyRef.current = null;

    const endpoint =
      searchMode === "advanced"
        ? "http://localhost:8000/search/advanced"
        : "http://localhost:8000/search/normal";

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

      // Store cache key for refine calls
      if (data.cache_key) {
        cacheKeyRef.current = data.cache_key;
      }
    } catch (error) {
      console.error("Search error:", error);
    }

    setLoading(false);
  };

  // ── Refine from Redis cache (no DB hit) ──────────────────────────
  const refineSearch = async (keyword, searchBy, targetPage = 1) => {
    if (!cacheKeyRef.current) {
      // No cache yet — fall back to a fresh search
      executeSearch(1);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/search/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cache_key: cacheKeyRef.current,
          keyword: keyword || null,
          search_by: searchMode === "basic" ? searchBy : null,
          page: targetPage,
          limit,
        }),
      });

      if (res.status === 410) {
        // Cache expired — re-run DB search
        console.warn("Cache expired, running fresh search.");
        cacheKeyRef.current = null;
        executeSearch(1);
        return;
      }

      const data = await res.json();

      setResults(data.results || []);
      setTotal(data.total || 0);
      setPage(targetPage);

      if (data.cache_key) {
        cacheKeyRef.current = data.cache_key;
      }
    } catch (error) {
      console.error("Refine error:", error);
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
        refineSearch,           // ← new
        hasCacheKey: () => !!cacheKeyRef.current,  // ← for UI indicator
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};