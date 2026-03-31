"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CircleNotch } from "@phosphor-icons/react";
import type { SearchResponse, UnifiedSearchResult } from "@/types/search";
import { cn } from "@/lib/utils";
import { ExploreSearchBar } from "./ExploreSearchBar";
import { ExploreTabs, type ExploreTab } from "./ExploreTabs";
import { ResultCard } from "./ResultCard";

type SearchableExploreTab = Exclude<ExploreTab, "more">;

type TabState = {
  pages: Record<number, UnifiedSearchResult[]>;
  total: number;
  hasMore: boolean;
  sourceCounts: Record<string, number>;
  unavailable: boolean;
};

const RESULTS_PER_PAGE = 10;
const SEARCHABLE_TABS: SearchableExploreTab[] = [
  "academic",
  "web",
  "news",
  "discussions",
];

function createEmptyTabState(): TabState {
  return {
    pages: {},
    total: 0,
    hasMore: false,
    sourceCounts: {},
    unavailable: false,
  };
}

function buildInitialTabState(): Record<SearchableExploreTab, TabState> {
  return {
    academic: createEmptyTabState(),
    web: createEmptyTabState(),
    news: createEmptyTabState(),
    discussions: createEmptyTabState(),
  };
}

async function fetchSearchPage(
  query: string,
  tab: SearchableExploreTab,
  page: number
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    tab,
    page: String(page),
    perPage: String(RESULTS_PER_PAGE),
  });

  const response = await fetch(`/api/search/unified?${params.toString()}`, {
    method: "GET",
    credentials: "same-origin",
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      (payload && typeof payload.error === "string" && payload.error) ||
        `Search failed for ${tab}`
    );
  }

  return response.json() as Promise<SearchResponse>;
}

export function ExplorePageClient() {
  const [queryInput, setQueryInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ExploreTab>("academic");
  const [currentPageByTab, setCurrentPageByTab] = useState<Record<ExploreTab, number>>({
    academic: 0,
    web: 0,
    news: 0,
    discussions: 0,
    more: 0,
  });
  const [tabState, setTabState] = useState<Record<SearchableExploreTab, TabState>>(
    buildInitialTabState()
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [searchDurationMs, setSearchDurationMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeSearchTab = activeTab === "more" ? null : activeTab;
  const activePage = currentPageByTab[activeTab];
  const activeState = activeSearchTab ? tabState[activeSearchTab] : null;
  const activeResults = activeSearchTab
    ? (activeState?.pages[activePage] ?? [])
    : [];
  const totalPages = activeState
    ? Math.max(1, Math.ceil(activeState.total / RESULTS_PER_PAGE))
    : 1;

  const statsLine = useMemo(() => {
    if (!activeState || searchDurationMs === null || activeTab === "more") {
      return null;
    }

    return `${activeState.total} results in ${(searchDurationMs / 1000).toFixed(1)}s`;
  }, [activeState, activeTab, searchDurationMs]);

  const runSearch = useCallback(async () => {
    const trimmedQuery = queryInput.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);
    setError(null);
    setHasSearched(true);
    setActiveTab("academic");
    setCurrentPageByTab({
      academic: 0,
      web: 0,
      news: 0,
      discussions: 0,
      more: 0,
    });

    const startedAt = performance.now();
    const settled = await Promise.allSettled(
      SEARCHABLE_TABS.map(async (tab) => [tab, await fetchSearchPage(trimmedQuery, tab, 0)] as const)
    );

    const nextTabState = buildInitialTabState();
    let successCount = 0;

    settled.forEach((entry, index) => {
      const tab = SEARCHABLE_TABS[index];

      if (entry.status === "fulfilled") {
        const [, response] = entry.value;
        nextTabState[tab] = {
          pages: { 0: response.results },
          total: response.total,
          hasMore: response.hasMore,
          sourceCounts: response.sourceCounts,
          unavailable: Boolean(response.searxngUnavailable),
        };
        successCount += 1;
        return;
      }

      nextTabState[tab] = {
        ...createEmptyTabState(),
        unavailable: tab !== "academic",
      };
    });

    setTabState(nextTabState);
    setSearchQuery(trimmedQuery);
    setSearchDurationMs(performance.now() - startedAt);
    if (successCount === 0) {
      setError("Explore search failed. Try again.");
    }
    setIsSearching(false);
  }, [queryInput]);

  const ensurePageLoaded = useCallback(async (tab: SearchableExploreTab, page: number) => {
    if (!searchQuery) return;
    if (tabState[tab].pages[page]) {
      setCurrentPageByTab((current) => ({ ...current, [tab]: page }));
      return;
    }

    setIsPaginating(true);
    setError(null);

    try {
      const response = await fetchSearchPage(searchQuery, tab, page);
      setTabState((current) => ({
        ...current,
        [tab]: {
          pages: {
            ...current[tab].pages,
            [page]: response.results,
          },
          total: response.total,
          hasMore: response.hasMore,
          sourceCounts: response.sourceCounts,
          unavailable: Boolean(response.searxngUnavailable),
        },
      }));
      setCurrentPageByTab((current) => ({ ...current, [tab]: page }));
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : "Could not load the next page."
      );
    } finally {
      setIsPaginating(false);
    }
  }, [searchQuery, tabState]);

  const handleTabChange = useCallback((tab: ExploreTab) => {
    setActiveTab(tab);
    if (tab === "more") return;

    if (!tabState[tab].pages[0] && searchQuery) {
      void ensurePageLoaded(tab, 0);
    }
  }, [ensurePageLoaded, searchQuery, tabState]);

  const showLanding = !hasSearched && !searchQuery;

  if (showLanding) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-4">
        <div className="w-full max-w-[640px]">
          <ExploreSearchBar
            autoFocus
            isLoading={isSearching}
            onChange={setQueryInput}
            onSubmit={() => {
              void runSearch();
            }}
            value={queryInput}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:py-10">
      <div className="mx-auto flex w-full max-w-[780px] flex-col gap-5">
        <ExploreSearchBar
          className="max-w-[560px]"
          isLoading={isSearching}
          onChange={setQueryInput}
          onSubmit={() => {
            void runSearch();
          }}
          value={queryInput}
        />

        <ExploreTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {statsLine ? (
          <p className="text-[13px] font-normal text-ink-muted">
            {statsLine}
          </p>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 text-[14px] text-ink">
            {error}
          </div>
        ) : null}

        {isSearching ? (
          <div className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-4 text-[14px] text-ink-muted">
            <CircleNotch className="animate-spin" size={16} weight="bold" />
            Searching Explore...
          </div>
        ) : null}

        {!isSearching && activeTab === "more" ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-5 text-[14px] text-ink-muted">
            More tabs are reserved for future source types like images, videos, and podcasts.
          </div>
        ) : null}

        {!isSearching && activeState?.unavailable && activeTab !== "academic" ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-5 text-[14px] text-ink-muted">
            This source type is temporarily unavailable.
          </div>
        ) : null}

        {!isSearching && activeTab !== "more" && !activeState?.unavailable && activeResults.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-5 text-[14px] text-ink-muted">
            No {activeTab} results for &quot;{searchQuery}&quot;.
          </div>
        ) : null}

        {!isSearching && activeTab !== "more" && activeResults.length > 0 ? (
          <div className="flex flex-col gap-6">
            {activeResults.map((result, index) => (
              <ResultCard
                key={`${activeTab}-${activePage}-${result.url ?? result.doi ?? result.pmid ?? result.title}-${index}`}
                result={result}
                tab={activeTab}
              />
            ))}
          </div>
        ) : null}

        {!isSearching && activeTab !== "more" && activeState && activeState.total > RESULTS_PER_PAGE ? (
          <nav
            aria-label="Pagination"
            className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4"
          >
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] transition-colors",
                activePage === 0
                  ? "cursor-not-allowed border-[var(--border)] text-ink-muted/60"
                  : "border-[var(--border)] text-ink hover:bg-[var(--surface-raised)]"
              )}
              disabled={activePage === 0 || isPaginating}
              onClick={() => {
                if (!activeSearchTab || activePage === 0) return;
                void ensurePageLoaded(activeSearchTab, activePage - 1);
              }}
              type="button"
            >
              <ArrowLeft size={14} weight="bold" />
              Previous
            </button>

            <p className="text-[13px] text-ink-muted">
              Page {activePage + 1} of {totalPages}
            </p>

            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] transition-colors",
                activePage + 1 >= totalPages
                  ? "cursor-not-allowed border-[var(--border)] text-ink-muted/60"
                  : "border-[var(--border)] text-ink hover:bg-[var(--surface-raised)]"
              )}
              disabled={activePage + 1 >= totalPages || isPaginating}
              onClick={() => {
                if (!activeSearchTab || activePage + 1 >= totalPages) return;
                void ensurePageLoaded(activeSearchTab, activePage + 1);
              }}
              type="button"
            >
              Next
              <ArrowRight size={14} weight="bold" />
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
