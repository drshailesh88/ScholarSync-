"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleNotch, Sparkle } from "@phosphor-icons/react";
import type { SearchResponse, UnifiedSearchResult } from "@/types/search";
import { cn } from "@/lib/utils";
import { ExploreSearchBar } from "./ExploreSearchBar";
import { ExploreTabs, type ExploreTab } from "./ExploreTabs";
import { ResultCard } from "./ResultCard";
import { SynthesisBlock } from "./SynthesisBlock";
import { ExploreShortcutsOverlay } from "./ExploreShortcutsOverlay";
import { useExploreKeyboard } from "./useExploreKeyboard";
import {
  FilterPills,
  DEFAULT_FILTERS,
  type ExploreFilters,
} from "./FilterPills";
import { getUserScopes, type ScopeRecord } from "@/lib/actions/scopes";
import { saveWebSource, getSavedUrls } from "@/lib/actions/web-sources";
import { SaveToast } from "./SaveToast";

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

function filtersToSearchParams(filters: ExploreFilters): Record<string, string> {
  const params: Record<string, string> = {};

  // Order By → sort param
  const sortMap: Record<ExploreFilters["orderBy"], string> = {
    quality: "relevance",
    recency: "year",
    citations: "citations",
    trust: "trust",
  };
  if (filters.orderBy !== "quality") {
    params.sort = sortMap[filters.orderBy];
  }

  // Time filter → yearStart/yearEnd
  if (filters.timeFilter !== "any") {
    const now = new Date();
    if (filters.timeFilter === "custom") {
      if (filters.customDateFrom) {
        params.yearStart = String(new Date(filters.customDateFrom).getFullYear());
      }
      if (filters.customDateTo) {
        params.yearEnd = String(new Date(filters.customDateTo).getFullYear());
      }
    } else {
      const offsets: Record<string, number> = {
        "24h": 0,
        week: 0,
        month: 0,
        year: 1,
      };
      params.yearStart = String(now.getFullYear() - (offsets[filters.timeFilter] ?? 0));
      params.yearEnd = String(now.getFullYear());
      // For sub-year granularity, pass time param for SearXNG
      if (filters.timeFilter !== "year") {
        params.timeRange = filters.timeFilter;
      }
    }
  }

  // Options
  if (filters.openAccessOnly) {
    params.openAccessOnly = "true";
  }
  if (filters.exactMatch) {
    params.exactMatch = "true";
  }
  if (!filters.usePreferences) {
    params.usePreferences = "false";
  }

  // Scope
  if (filters.scopeId !== null && filters.scopeId > 0) {
    params.scopeId = String(filters.scopeId);
  }

  return params;
}

async function fetchSearchPage(
  query: string,
  tab: SearchableExploreTab,
  page: number,
  filters?: ExploreFilters
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    tab,
    page: String(page),
    perPage: String(RESULTS_PER_PAGE),
    ...(filters ? filtersToSearchParams(filters) : {}),
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
  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>(null);
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
  const [filters, setFilters] = useState<ExploreFilters>(DEFAULT_FILTERS);
  const [userScopes, setUserScopes] = useState<ScopeRecord[]>([]);
  const [savedUrls, setSavedUrls] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [synthesisOpen, setSynthesisOpen] = useState(false);

  // Load user scopes on mount
  useEffect(() => {
    getUserScopes()
      .then(setUserScopes)
      .catch(() => {
        // Scopes table may not exist yet — ignore
      });
  }, []);

  const activeSearchTab = activeTab === "more" ? null : activeTab;
  const activePage = currentPageByTab[activeTab];
  const activeState = activeSearchTab ? tabState[activeSearchTab] : null;
  const activeResults = useMemo(
    () => (activeSearchTab ? (activeState?.pages[activePage] ?? []) : []),
    [activeSearchTab, activeState?.pages, activePage]
  );
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
      SEARCHABLE_TABS.map(async (tab) => [tab, await fetchSearchPage(trimmedQuery, tab, 0, filters)] as const)
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

    // Fetch which URLs are already saved for badge display
    const allUrls = Object.values(nextTabState)
      .flatMap((s) => Object.values(s.pages).flat())
      .map((r) => r.url)
      .filter((u): u is string => !!u);
    if (allUrls.length > 0) {
      getSavedUrls(allUrls)
        .then((saved) => setSavedUrls(new Set(saved)))
        .catch(() => {});
    }
  }, [queryInput, filters]);

  const ensurePageLoaded = useCallback(async (tab: SearchableExploreTab, page: number) => {
    if (!searchQuery) return;
    if (tabState[tab].pages[page]) {
      setCurrentPageByTab((current) => ({ ...current, [tab]: page }));
      return;
    }

    setIsPaginating(true);
    setError(null);

    try {
      const response = await fetchSearchPage(searchQuery, tab, page, filters);
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
  }, [searchQuery, tabState, filters]);

  const handleTabChange = useCallback((tab: ExploreTab) => {
    setActiveTab(tab);
    if (tab === "more") return;

    if (!tabState[tab].pages[0] && searchQuery) {
      void ensurePageLoaded(tab, 0);
    }
  }, [ensurePageLoaded, searchQuery, tabState]);

  const handleFiltersChange = useCallback(
    (newFilters: ExploreFilters) => {
      setFilters(newFilters);
      // Re-search with new filters if we already have a query
      if (searchQuery) {
        setCurrentPageByTab({
          academic: 0,
          web: 0,
          news: 0,
          discussions: 0,
          more: 0,
        });
        setIsSearching(true);
        setError(null);

        const startedAt = performance.now();
        Promise.allSettled(
          SEARCHABLE_TABS.map(async (tab) =>
            [tab, await fetchSearchPage(searchQuery, tab, 0, newFilters)] as const
          )
        ).then((settled) => {
          const nextTabState = buildInitialTabState();
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
            } else {
              nextTabState[tab] = {
                ...createEmptyTabState(),
                unavailable: tab !== "academic",
              };
            }
          });
          setTabState(nextTabState);
          setSearchDurationMs(performance.now() - startedAt);
          setIsSearching(false);
        });
      }
    },
    [searchQuery]
  );

  const handleSaveResult = useCallback(
    async (result: UnifiedSearchResult) => {
      if (!activeSearchTab) return;
      try {
        const { alreadySaved } = await saveWebSource({
          result,
          tab: activeSearchTab,
          searchQuery: searchQuery || undefined,
        });

        if (alreadySaved) {
          setToast({ message: "Already in your Library", type: "info" });
        } else {
          setToast({ message: "Saved to Library", type: "success" });
          if (result.url) {
            setSavedUrls((prev) => new Set(prev).add(result.url!));
          }
        }
      } catch {
        setToast({ message: "Failed to save", type: "error" });
        throw new Error("Save failed");
      }
    },
    [activeSearchTab, searchQuery]
  );

  // ── Keyboard navigation ──────────────────────────────────
   
  const keyboardActions = useMemo(
    () => ({
      onTabChange: handleTabChange,
      onSearch: () => void runSearch(),
      focusSearchBar: () => searchBarRef.current?.focus(),
      onSave: (index: number) => {
        const result = activeResults[index];
        if (result) void handleSaveResult(result);
      },
      onOpen: (index: number) => {
        const result = activeResults[index];
        const href =
          result?.url ||
          (result?.doi ? `https://doi.org/${result.doi}` : null) ||
          (result?.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${result.pmid}/` : null);
        if (href) window.open(href, "_blank", "noopener");
      },
      onSynthesize: () => setSynthesisOpen((prev) => !prev),
    }),
    [handleTabChange, runSearch, activeResults, handleSaveResult]
  );

  const {
    highlightedIndex,
    selectedIndices,
    shortcutsOverlayOpen,
    setShortcutsOverlayOpen,
  } = useExploreKeyboard(
    activeResults.length,
    activeTab,
    hasSearched,
    keyboardActions
  );

  const showLanding = !hasSearched && !searchQuery;

  if (showLanding) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-4">
        <div className="w-full max-w-[640px]">
          <ExploreSearchBar
            ref={searchBarRef}
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
          ref={searchBarRef}
          className="max-w-[560px]"
          isLoading={isSearching}
          onChange={setQueryInput}
          onSubmit={() => {
            void runSearch();
          }}
          value={queryInput}
        />

        <ExploreTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <FilterPills
          activeTab={activeTab}
          filters={filters}
          onEditScopes={() => router.push("/explore/scopes")}
          onFiltersChange={handleFiltersChange}
          userScopes={userScopes}
        />

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

        {/* Synthesize button + Synthesis block */}
        {!isSearching && activeTab !== "more" && activeResults.length > 0 && !synthesisOpen ? (
          <button
            className="inline-flex items-center gap-2 self-start rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-[13px] font-medium text-brand hover:bg-brand/10 transition-colors"
            data-testid="synthesize-button"
            onClick={() => setSynthesisOpen(true)}
            type="button"
          >
            <Sparkle size={14} weight="fill" />
            Synthesize
            <kbd className="ml-1 rounded bg-brand/10 px-1 py-0.5 text-[10px] font-mono text-brand/70">Q</kbd>
          </button>
        ) : null}

        {activeSearchTab && activeResults.length > 0 ? (
          <SynthesisBlock
            isOpen={synthesisOpen}
            onClose={() => setSynthesisOpen(false)}
            query={searchQuery}
            results={activeResults}
            tab={activeSearchTab}
          />
        ) : null}

        {!isSearching && activeTab !== "more" && activeResults.length > 0 ? (
          <div className="flex flex-col gap-6">
            {activeResults.map((result, index) => (
              <ResultCard
                key={`${activeTab}-${activePage}-${result.url ?? result.doi ?? result.pmid ?? result.title}-${index}`}
                id={`explore-result-${index}`}
                isHighlighted={highlightedIndex === index}
                isSaved={!!result.url && savedUrls.has(result.url)}
                isSelected={selectedIndices.has(index)}
                onSave={handleSaveResult}
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

      {toast && (
        <SaveToast
          message={toast.message}
          onDismiss={() => setToast(null)}
          type={toast.type}
        />
      )}

      <ExploreShortcutsOverlay
        isOpen={shortcutsOverlayOpen}
        onClose={() => setShortcutsOverlayOpen(false)}
      />
    </div>
  );
}
