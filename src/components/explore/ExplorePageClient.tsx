"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkle } from "@phosphor-icons/react";
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
import { addExploreSearchHistory } from "@/lib/actions/explore-search-history";
import { setDomainPreference } from "@/lib/actions/domain-preferences";
import { SaveToast } from "./SaveToast";
import { SearchHistoryDropdown } from "./SearchHistoryDropdown";

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
  const [infoPanelIndex, setInfoPanelIndex] = useState<number | null>(null);

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

    // Save to search history (fire and forget)
    if (successCount > 0) {
      addExploreSearchHistory({
        query: trimmedQuery,
        activeTab: "academic",
        scopeId: filters.scopeId ?? null,
      }).catch(() => {});
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

  const handleBlock = useCallback(
    async (domain: string) => {
      try {
        await setDomainPreference(domain, "mute");
        setToast({ message: `Blocked ${domain}`, type: "success" });
      } catch {
        setToast({ message: "Failed to block source", type: "error" });
      }
    },
    []
  );

  const handleMoreFromSource = useCallback(
    (domain: string) => {
      setQueryInput(`site:${domain} ${searchQuery}`);
      // Trigger search with domain constraint
      const newQuery = `site:${domain} ${searchQuery}`;
      setQueryInput(newQuery);
      setSearchQuery(newQuery);
      setHasSearched(true);
      setIsSearching(true);
      setError(null);
      setCurrentPageByTab({ academic: 0, web: 0, news: 0, discussions: 0, more: 0 });

      const startedAt = performance.now();
      Promise.allSettled(
        SEARCHABLE_TABS.map(async (t) =>
          [t, await fetchSearchPage(newQuery, t, 0, filters)] as const
        )
      ).then((settled) => {
        const nextTabState = buildInitialTabState();
        settled.forEach((entry, index) => {
          const t = SEARCHABLE_TABS[index];
          if (entry.status === "fulfilled") {
            const [, response] = entry.value;
            nextTabState[t] = {
              pages: { 0: response.results },
              total: response.total,
              hasMore: response.hasMore,
              sourceCounts: response.sourceCounts,
              unavailable: Boolean(response.searxngUnavailable),
            };
          } else {
            nextTabState[t] = { ...createEmptyTabState(), unavailable: t !== "academic" };
          }
        });
        setTabState(nextTabState);
        setSearchDurationMs(performance.now() - startedAt);
        setIsSearching(false);
      });
    },
    [searchQuery, filters]
  );

  const handleToggleInfo = useCallback(
    (index: number) => {
      setInfoPanelIndex((prev) => (prev === index ? null : index));
    },
    []
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
      onInfo: (index: number) => handleToggleInfo(index),
      onBlock: (index: number) => {
        const result = activeResults[index];
        if (result?.domain) void handleBlock(result.domain);
      },
    }),
    [handleTabChange, runSearch, activeResults, handleSaveResult, handleToggleInfo, handleBlock]
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

  const handleSelectHistory = useCallback(
    (query: string, tab?: string) => {
      setQueryInput(query);
      setSearchQuery(query);
      if (tab && tab !== "more") {
        setActiveTab(tab as ExploreTab);
      }
      // Trigger search with the selected query
      setHasSearched(true);
      setIsSearching(true);
      setError(null);
      setCurrentPageByTab({ academic: 0, web: 0, news: 0, discussions: 0, more: 0 });

      const startedAt = performance.now();
      Promise.allSettled(
        SEARCHABLE_TABS.map(async (t) =>
          [t, await fetchSearchPage(query, t, 0, filters)] as const
        )
      ).then((settled) => {
        const nextTabState = buildInitialTabState();
        settled.forEach((entry, index) => {
          const t = SEARCHABLE_TABS[index];
          if (entry.status === "fulfilled") {
            const [, response] = entry.value;
            nextTabState[t] = {
              pages: { 0: response.results },
              total: response.total,
              hasMore: response.hasMore,
              sourceCounts: response.sourceCounts,
              unavailable: Boolean(response.searxngUnavailable),
            };
          } else {
            nextTabState[t] = { ...createEmptyTabState(), unavailable: t !== "academic" };
          }
        });
        setTabState(nextTabState);
        setSearchDurationMs(performance.now() - startedAt);
        setIsSearching(false);
      });
    },
    [filters]
  );

  const showLanding = !hasSearched && !searchQuery;

  if (showLanding) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-4">
        <div className="w-full max-w-[640px]">
          <div className="flex items-center gap-2">
            <ExploreSearchBar
              ref={searchBarRef}
              autoFocus
              className="flex-1"
              isLoading={isSearching}
              onChange={setQueryInput}
              onSubmit={() => {
                void runSearch();
              }}
              value={queryInput}
            />
            <SearchHistoryDropdown onSelectQuery={handleSelectHistory} />
          </div>
          <p className="mt-4 text-center text-[14px] text-ink-muted">
            Search for sources to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:py-10">
      <div className="mx-auto flex w-full max-w-[780px] flex-col gap-5">
        <div className="flex items-center gap-2">
          <ExploreSearchBar
            ref={searchBarRef}
            className="max-w-[560px] flex-1"
            isLoading={isSearching}
            onChange={setQueryInput}
            onSubmit={() => {
              void runSearch();
            }}
            value={queryInput}
          />
          <SearchHistoryDropdown onSelectQuery={handleSelectHistory} />
        </div>

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
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            <span className="shrink-0 text-[16px]" aria-hidden="true">!</span>
            <div>
              <p className="font-medium">{error}</p>
              <button
                className="mt-1 text-[13px] font-medium text-red-600 underline-offset-2 hover:underline dark:text-red-400"
                onClick={() => void runSearch()}
                type="button"
              >
                Try again
              </button>
            </div>
          </div>
        ) : null}

        {isSearching ? (
          <div className="flex flex-col gap-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl p-4"
                style={{ borderLeft: "3px solid var(--border)" }}
              >
                <div className="h-5 w-3/4 rounded bg-[var(--surface-raised)]" />
                <div className="mt-2 h-3 w-1/3 rounded bg-[var(--surface-raised)]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[var(--surface-raised)]" />
                <div className="mt-3 space-y-2">
                  <div className="h-3.5 w-full rounded bg-[var(--surface-raised)]" />
                  <div className="h-3.5 w-5/6 rounded bg-[var(--surface-raised)]" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!isSearching && activeTab === "more" ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <p className="text-[15px] font-medium text-ink">
              Coming soon
            </p>
            <p className="max-w-sm text-[14px] text-ink-muted">
              Images, videos, and podcasts will be available here in a future update.
            </p>
          </div>
        ) : null}

        {!isSearching && activeState?.unavailable && activeTab !== "academic" ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <p className="text-[15px] font-medium text-ink">
              Temporarily unavailable
            </p>
            <p className="max-w-sm text-[14px] text-ink-muted">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} search is experiencing issues. Academic search is unaffected.
            </p>
          </div>
        ) : null}

        {!isSearching && activeTab !== "more" && !activeState?.unavailable && activeResults.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <p className="text-[15px] font-medium text-ink">
              No {activeTab} results found
            </p>
            <p className="max-w-sm text-[14px] text-ink-muted">
              No results for &quot;{searchQuery}&quot; in {activeTab}. Try a different query or switch tabs.
            </p>
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
                showInfoPanel={infoPanelIndex === index}
                onSave={handleSaveResult}
                onToggleInfo={() => handleToggleInfo(index)}
                onBlock={(domain) => void handleBlock(domain)}
                onMoreFromSource={handleMoreFromSource}
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
                "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors",
                activePage === 0
                  ? "cursor-not-allowed border-[var(--border)] text-ink-muted/60"
                  : "border-[var(--border)] text-ink hover:bg-[var(--surface-raised)] active:bg-[var(--surface-raised)]"
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
                "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors",
                activePage + 1 >= totalPages
                  ? "cursor-not-allowed border-[var(--border)] text-ink-muted/60"
                  : "border-[var(--border)] text-ink hover:bg-[var(--surface-raised)] active:bg-[var(--surface-raised)]"
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
