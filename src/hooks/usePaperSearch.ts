/**
 * Hook for executing paper searches with plan generation.
 */

"use client";

import { useCallback, useRef } from "react";
import { useResearchStore } from "@/stores/research-store";
import { parseNaturalLanguageFilters } from "@/lib/research/filter-parser";
import type { PaperResult } from "@/lib/research/types";

export function usePaperSearch() {
  const store = useResearchStore();
  const searchAbortRef = useRef<AbortController | null>(null);

  /**
   * Parse query for natural language filters, then generate plan or execute search.
   */
  const initiateSearch = useCallback(async (rawQuery?: string) => {
    const query = rawQuery ?? store.query;
    if (!query.trim()) return;

    // Parse natural language filters
    const parsed = parseNaturalLanguageFilters(query);
    store.setParsedChips(parsed.chips);

    // Apply parsed filters
    if (parsed.filters.studyTypes?.length) {
      store.setFilters({ studyTypes: parsed.filters.studyTypes });
    }
    if (parsed.filters.dateFrom) {
      store.setFilters({ dateFrom: parsed.filters.dateFrom });
    }
    if (parsed.filters.dateTo) {
      store.setFilters({ dateTo: parsed.filters.dateTo });
    }

    // First search: show plan. Subsequent: skip plan.
    if (!store.hasSearchedBefore) {
      await generatePlan(parsed.query || query);
    } else {
      await executeSearch(parsed.query || query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.query]);

  /**
   * Generate a search plan from the AI.
   */
  const generatePlan = useCallback(async (query: string) => {
    store.setIsGeneratingPlan(true);
    store.setShowPlan(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch("/api/research/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          question: query,
          currentFilters: {
            dateFrom: store.filters.dateFrom,
            dateTo: store.filters.dateTo,
            studyTypes: store.filters.studyTypes,
          },
        }),
      });

      if (!res.ok) throw new Error("Plan generation failed");

      const data = await res.json();
      store.setSearchPlan(data.plan);

      // Apply suggested filters from the plan
      if (data.plan.suggestedFilters) {
        const sf = data.plan.suggestedFilters;
        if (sf.dateFrom) store.setFilters({ dateFrom: sf.dateFrom });
        if (sf.dateTo) store.setFilters({ dateTo: sf.dateTo });
        if (sf.studyTypes?.length) store.setFilters({ studyTypes: sf.studyTypes });
      }
    } catch (error) {
      console.error("Plan generation error:", error);
      // Fall back to direct search
      store.setShowPlan(false);
      await executeSearch(query);
    } finally {
      clearTimeout(timeoutId);
      store.setIsGeneratingPlan(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.filters]);

  /**
   * Execute the actual search against PubMed + Semantic Scholar.
   */
  const executeSearch = useCallback(async (query?: string, page: number = 0) => {
    const searchQuery = query ?? store.query;
    const { searchPlan, filters } = useResearchStore.getState();

    // Cancel any in-flight search request
    searchAbortRef.current?.abort();
    const controller = new AbortController();
    searchAbortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    store.setIsSearching(true);
    store.setShowPlan(false);
    store.setHasSearchedBefore(true);

    try {
      const res = await fetch("/api/research/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          query: searchQuery,
          pubmedQuery: searchPlan?.pubmedQuery,
          filters: {
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo,
            studyTypes: filters.studyTypes,
            fullTextOnly: filters.fullTextOnly,
            sources: filters.sources,
            language: filters.language,
          },
          page,
          perPage: 10,
        }),
      });

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      // Check which papers are already in library
      const { libraryPapers } = useResearchStore.getState();
      const libraryIds = new Set(libraryPapers.map((p: PaperResult) => p.id));
      const results = data.results.map((r: PaperResult) => ({
        ...r,
        inLibrary: libraryIds.has(r.id),
      }));

      if (page === 0) {
        store.setResults(results, data.total);
      } else {
        store.appendResults(results);
      }
      store.setCurrentPage(page);

      // Trigger async verification for all results
      triggerVerification(results);
    } catch (error) {
      // Silently ignore aborted requests from superseding searches
      if (controller.signal.aborted && searchAbortRef.current !== controller) return;
      console.error("Search error:", error);
      if (page === 0) {
        store.setResults([], 0);
      }
    } finally {
      clearTimeout(timeoutId);
      store.setIsSearching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.query]);

  /**
   * Load more results (pagination).
   */
  const loadMore = useCallback(async () => {
    const nextPage = store.currentPage + 1;
    await executeSearch(undefined, nextPage);
  }, [store.currentPage, executeSearch]);

  /**
   * Trigger background verification for papers.
   */
  const triggerVerification = useCallback(async (papers: PaperResult[]) => {
    for (const paper of papers) {
      if (paper.verificationStatus !== "pending") continue;

      // Don't await — fire and forget
      fetch("/api/research/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.verification) {
            useResearchStore.getState().setVerification(paper.id, data.verification);
          }
        })
        .catch(() => {});
    }
  }, []);

  return {
    query: store.query,
    setQuery: store.setQuery,
    filters: store.filters,
    setFilters: store.setFilters,
    parsedChips: store.parsedChips,
    removeChip: store.removeChip,
    results: store.results,
    totalResults: store.totalResults,
    isSearching: store.isSearching,
    searchPlan: store.searchPlan,
    showPlan: store.showPlan,
    isGeneratingPlan: store.isGeneratingPlan,
    initiateSearch,
    executeSearch,
    loadMore,
    clearSearch: store.clearSearch,
  };
}
