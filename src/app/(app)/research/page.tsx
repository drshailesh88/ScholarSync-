"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  MagnifyingGlass,
  ChatCircleDots,
  FloppyDisk,
  X,
  Sparkle,
  ArrowLeft,
  ArrowRight,
  SortAscending,
  Lightning,
  CircleNotch,
  Brain,
  CaretDown,
  PaperPlaneTilt,
  ClockCounterClockwise,
  BookmarkSimple,
  Lightbulb,
} from "@phosphor-icons/react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { savePaper } from "@/lib/actions/papers";
import { getUserPapers } from "@/lib/actions/papers";
import {
  saveSearchQuery,
  getRecentSearches,
} from "@/lib/actions/search-history";
import type {
  UnifiedSearchResult,
  SearchResponse,
} from "@/types/search";

// ── Constants ────────────────────────────────────────────────────────

const SESSION_KEY = "scholar-sync-research-page";

const EVIDENCE_COLORS: Record<string, string> = {
  I: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  II: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  III: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  IV: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  V: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

const EVIDENCE_LABELS: Record<string, string> = {
  I: "Level I",
  II: "Level II",
  III: "Level III",
  IV: "Level IV",
  V: "Level V",
};

type SortOption = "relevance" | "citations" | "year" | "evidence";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "citations", label: "Citations" },
  { value: "year", label: "Year (Newest)" },
  { value: "evidence", label: "Evidence Level" },
];

const SUGGESTED_SEARCHES = [
  "SGLT2 inhibitors cardiovascular outcomes",
  "CAR-T cell therapy solid tumors",
  "GLP-1 agonists weight management",
  "mRNA vaccine technology advances",
  "AI-assisted diagnostic imaging accuracy",
  "Immune checkpoint inhibitors biomarkers",
  "CRISPR sickle cell gene therapy",
  "Gut microbiome mental health",
  "Liquid biopsy early cancer detection",
  "Ketamine treatment-resistant depression",
  "Wearable devices atrial fibrillation detection",
  "Fecal microbiota transplant C. difficile",
  "Psilocybin-assisted psychotherapy PTSD",
  "Dapagliflozin heart failure outcomes",
  "Whole genome sequencing rare diseases",
];

// ── Types ────────────────────────────────────────────────────────────

interface FilterState {
  last5Years: boolean;
  pdfAvailable: boolean;
  highImpact: boolean;
  rctsOnly: boolean;
  reviews: boolean;
  metaAnalyses: boolean;
  yearStart: string;
  yearEnd: string;
}

const DEFAULT_FILTERS: FilterState = {
  last5Years: false,
  pdfAvailable: false,
  highImpact: false,
  rctsOnly: false,
  reviews: false,
  metaAnalyses: false,
  yearStart: "",
  yearEnd: "",
};

interface PersistedState {
  query: string;
  results: UnifiedSearchResult[];
  filters: FilterState;
  sort: SortOption;
  hasSearched: boolean;
  page: number;
  totalResults: number;
  hasMore: boolean;
  sourceCounts: {
    pubmed: number;
    semanticScholar: number;
    openAlex: number;
    clinicalTrials: number;
  };
  augmentedQueries: SearchResponse["augmentedQueries"] | null;
}

// ── Session helpers ──────────────────────────────────────────────────

function readSession(): PersistedState | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function writeSession(state: PersistedState) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded — ignore
  }
}

// ── Component ────────────────────────────────────────────────────────

export default function ResearchPage() {
  // Restore session state on first render (synchronous to avoid flash)
  const cached = useRef(readSession());

  const [query, setQuery] = useState(cached.current?.query ?? "");
  const [results, setResults] = useState<UnifiedSearchResult[]>(
    cached.current?.results ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceCounts, setSourceCounts] = useState(
    cached.current?.sourceCounts ?? {
      pubmed: 0,
      semanticScholar: 0,
      openAlex: 0,
      clinicalTrials: 0,
    }
  );
  const [filters, setFilters] = useState<FilterState>(
    cached.current?.filters ?? { ...DEFAULT_FILTERS }
  );
  const [sort, setSort] = useState<SortOption>(
    cached.current?.sort ?? "relevance"
  );
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [hasSearched, setHasSearched] = useState(
    cached.current?.hasSearched ?? false
  );
  const [page, setPage] = useState(cached.current?.page ?? 0);
  const [totalResults, setTotalResults] = useState(
    cached.current?.totalResults ?? 0
  );
  const [hasMore, setHasMore] = useState(cached.current?.hasMore ?? false);
  const [augmentedQueries, setAugmentedQueries] = useState<
    SearchResponse["augmentedQueries"] | null
  >(cached.current?.augmentedQueries ?? null);
  const [showAugmented, setShowAugmented] = useState(false);
  const [similarResults, setSimilarResults] = useState<
    Record<string, UnifiedSearchResult[]>
  >({});
  const [similarErrors, setSimilarErrors] = useState<Set<string>>(new Set());
  const [similarEmpty, setSimilarEmpty] = useState<Set<string>>(new Set());
  const [loadingSimilar, setLoadingSimilar] = useState<Set<string>>(
    new Set()
  );
  const perPage = 20;

  // Track whether the filter/sort useEffect should skip (during init)
  const isInitRef = useRef(!!cached.current?.hasSearched);

  // ── Empty state data ───────────────────────────────────────────────
  const [recentSearches, setRecentSearches] = useState<
    { query: string; resultCount: number; searchedAt: string }[]
  >([]);
  const [recentPapers, setRecentPapers] = useState<
    { title: string; authors: string; journal: string | null; year: number | null }[]
  >([]);
  const [emptyStateLoaded, setEmptyStateLoaded] = useState(false);

  // Pick 4 random suggestions (stable per mount)
  const suggestions = useMemo(() => {
    const shuffled = [...SUGGESTED_SEARCHES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  // Load empty state data only when needed
  useEffect(() => {
    if (hasSearched && results.length > 0) return; // have persisted results — skip
    let cancelled = false;

    async function load() {
      try {
        const [searches, papers] = await Promise.all([
          getRecentSearches().catch(() => []),
          getUserPapers().catch(() => []),
        ]);
        if (cancelled) return;
        setRecentSearches(searches);
        setRecentPapers(
          (papers as { title: string; authors: unknown; journal: string | null; year: number | null }[])
            .slice(0, 4)
            .map((p) => ({
              title: p.title,
              authors: Array.isArray(p.authors)
                ? (p.authors as string[]).slice(0, 2).join(", ") +
                  ((p.authors as string[]).length > 2 ? " et al." : "")
                : "",
              journal: p.journal,
              year: p.year,
            }))
        );
      } finally {
        if (!cancelled) setEmptyStateLoaded(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persist to sessionStorage on changes ───────────────────────────
  useEffect(() => {
    writeSession({
      query,
      results,
      filters,
      sort,
      hasSearched,
      page,
      totalResults,
      hasMore,
      sourceCounts,
      augmentedQueries,
    });
  }, [
    query,
    results,
    filters,
    sort,
    hasSearched,
    page,
    totalResults,
    hasMore,
    sourceCounts,
    augmentedQueries,
  ]);

  // ── Chat ───────────────────────────────────────────────────────────
  const [chatInput, setChatInput] = useState("");
  const {
    messages: chatMessages,
    sendMessage,
    status: chatStatus,
  } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/research-agent",
    }),
  });
  const chatLoading = chatStatus === "streaming" || chatStatus === "submitted";

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    sendMessage({ text: chatInput });
    setChatInput("");
  };

  // ── Filters ────────────────────────────────────────────────────────
  const toggleFilter = (key: keyof FilterState) => {
    setFilters((prev) => {
      const val = prev[key];
      if (typeof val === "boolean") {
        if (key === "last5Years" && !val) {
          return { ...prev, [key]: true, yearStart: "", yearEnd: "" };
        }
        return { ...prev, [key]: !val };
      }
      return prev;
    });
  };

  // ── Search ─────────────────────────────────────────────────────────
  const buildSearchUrl = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams();
      params.set("q", query);
      params.set("page", pageNum.toString());
      params.set("perPage", perPage.toString());
      params.set("sort", sort);

      if (filters.last5Years) {
        params.set("yearStart", (new Date().getFullYear() - 5).toString());
      } else {
        if (filters.yearStart) params.set("yearStart", filters.yearStart);
        if (filters.yearEnd) params.set("yearEnd", filters.yearEnd);
      }
      if (filters.pdfAvailable) params.set("openAccessOnly", "true");
      if (filters.highImpact) params.set("sort", "citations");

      const studyTypes: string[] = [];
      if (filters.rctsOnly) studyTypes.push("rct");
      if (filters.reviews) studyTypes.push("review", "systematic_review");
      if (filters.metaAnalyses) studyTypes.push("meta_analysis");
      if (studyTypes.length > 0) params.set("studyTypes", studyTypes.join(","));

      return `/api/search/unified?${params.toString()}`;
    },
    [query, sort, filters, perPage]
  );

  const handleSearch = useCallback(
    async (pageNum: number = 0) => {
      if (!query.trim()) return;
      setLoading(true);
      setError(null);
      setHasSearched(true);
      setPage(pageNum);

      try {
        const url = buildSearchUrl(pageNum);
        const res = await fetch(url);
        if (!res.ok) {
          const errorBody = await res.json().catch(() => null);
          throw new Error(
            errorBody?.error || `Search failed (status ${res.status})`
          );
        }

        const data: SearchResponse = await res.json();
        setResults(data.results);
        setTotalResults(data.total);
        setHasMore(data.hasMore);
        setSourceCounts(data.sourceCounts);
        setAugmentedQueries(data.augmentedQueries || null);

        saveSearchQuery({
          originalQuery: query,
          queryType: "user",
          source: "all",
          resultCount: data.total,
          augmentedQueries: data.augmentedQueries
            ? {
                pubmed: data.augmentedQueries.pubmed,
                semanticScholar: data.augmentedQueries.semanticScholar,
                openAlex: data.augmentedQueries.openAlex,
              }
            : undefined,
          filtersApplied: { sort, ...filters },
        }).catch(() => {});
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Search failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, buildSearchUrl]
  );

  // Re-search when filters or sort change — but skip the first render
  // when we're restoring from sessionStorage
  useEffect(() => {
    if (isInitRef.current) {
      isInitRef.current = false;
      return;
    }
    if (hasSearched && query.trim()) {
      handleSearch(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);

  // ── Run a search from empty state ──────────────────────────────────
  const runSuggestion = (q: string) => {
    setQuery(q);
    // We need to trigger search after state update. Use a ref + effect.
    pendingSearchRef.current = q;
  };

  const pendingSearchRef = useRef<string | null>(null);
  useEffect(() => {
    if (pendingSearchRef.current && query === pendingSearchRef.current) {
      pendingSearchRef.current = null;
      handleSearch(0);
    }
  }, [query, handleSearch]);

  // ── Save paper ─────────────────────────────────────────────────────
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());

  const handleSave = async (result: UnifiedSearchResult) => {
    const key = result.doi || result.pmid || result.s2Id || result.title;
    if (saved.has(key) || savingKeys.has(key)) return;

    setSavingKeys((prev) => new Set(prev).add(key));
    try {
      await savePaper({
        title: result.title,
        authors: result.authors,
        journal: result.journal,
        year: result.year,
        doi: result.doi,
        abstract: result.abstract,
        source: result.sources.includes("pubmed")
          ? "pubmed"
          : result.sources.includes("semantic_scholar")
            ? "semantic_scholar"
            : "openalex",
        pubmed_id: result.pmid,
        semantic_scholar_id: result.s2Id,
        citation_count: result.citationCount,
        tldr: result.tldr,
        mesh_terms: result.meshTerms,
        publication_types: result.publicationTypes,
        fields_of_study: result.fieldsOfStudy,
        study_type: result.studyType,
        evidence_level: result.evidenceLevel,
        open_access_url: result.openAccessPdfUrl || undefined,
        influential_citation_count: result.influentialCitationCount,
        reference_count: result.referenceCount,
      });
      setSaved((prev) => new Set(prev).add(key));
    } catch (err) {
      console.error("Failed to save paper:", err);
    } finally {
      setSavingKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const handleFindSimilar = async (result: UnifiedSearchResult) => {
    const key = result.s2Id || result.doi || result.title;
    if (!result.s2Id || similarResults[key]) return;

    // Clear any prior error/empty state for this key before retrying
    setSimilarErrors((prev) => { const n = new Set(prev); n.delete(key); return n; });
    setSimilarEmpty((prev) => { const n = new Set(prev); n.delete(key); return n; });
    setLoadingSimilar((prev) => new Set(prev).add(key));

    try {
      const res = await fetch(
        `/api/search/s2-recommendations?paperId=${result.s2Id}&limit=5&paperTitle=${encodeURIComponent(result.title)}`
      );
      if (!res.ok) {
        setSimilarErrors((prev) => new Set(prev).add(key));
        return;
      }
      const data = await res.json();
      const papers: UnifiedSearchResult[] = data.results ?? [];
      if (papers.length === 0) {
        setSimilarEmpty((prev) => new Set(prev).add(key));
      } else {
        setSimilarResults((prev) => ({ ...prev, [key]: papers }));
      }
    } catch {
      setSimilarErrors((prev) => new Set(prev).add(key));
    } finally {
      setLoadingSimilar((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const totalPages = Math.ceil(totalResults / perPage);
  const showEmptyState = !loading && !hasSearched;
  const showNoResults = !loading && hasSearched && results.length === 0 && !error;

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Main search area */}
      <div className="flex-1 overflow-y-auto pr-2">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(0)}
                placeholder="Search 200M+ papers — try 'CRISPR sickle cell gene therapy'"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all"
              />
            </div>
            <button
              onClick={() => handleSearch(0)}
              disabled={loading}
              className="px-6 py-3.5 rounded-2xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Filter Chips + Sort */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  ["last5Years", "Last 5 Years"],
                  ["pdfAvailable", "PDF Available"],
                  ["highImpact", "High Impact"],
                  ["rctsOnly", "RCTs Only"],
                  ["reviews", "Reviews"],
                  ["metaAnalyses", "Meta-Analyses"],
                ] as [keyof FilterState, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    filters[key]
                      ? "bg-brand/10 text-brand border-brand/30"
                      : "bg-surface-raised text-ink-muted border-border hover:text-ink"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Year Range */}
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                placeholder="From"
                value={filters.yearStart}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    yearStart: e.target.value,
                    last5Years: false,
                  }))
                }
                className="w-[70px] px-2 py-1.5 rounded-lg text-xs bg-surface-raised text-ink border border-border placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40"
              />
              <span className="text-[10px] text-ink-muted">-</span>
              <input
                type="number"
                placeholder="To"
                value={filters.yearEnd}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    yearEnd: e.target.value,
                    last5Years: false,
                  }))
                }
                className="w-[70px] px-2 py-1.5 rounded-lg text-xs bg-surface-raised text-ink border border-border placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted border border-border hover:text-ink transition-colors"
              >
                <SortAscending size={14} />
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <CaretDown size={12} />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-1 z-20 bg-surface border border-border rounded-xl shadow-lg py-1 min-w-[140px]">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs hover:bg-surface-raised transition-colors",
                        sort === option.value
                          ? "text-brand font-medium"
                          : "text-ink-muted"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Smart Empty State ────────────────────────────────────── */}
        {showEmptyState && (
          <div className="max-w-2xl mx-auto pt-4 space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                  <ClockCounterClockwise size={14} />
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => runSuggestion(s.query)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left glass-panel hover:bg-surface-raised/50 transition-colors group"
                    >
                      <span className="flex items-center gap-3">
                        <MagnifyingGlass
                          size={14}
                          className="text-ink-muted shrink-0"
                        />
                        <span className="text-sm text-ink group-hover:text-brand transition-colors truncate">
                          {s.query}
                        </span>
                      </span>
                      <span className="text-[10px] text-ink-muted shrink-0 ml-4">
                        {s.resultCount > 0
                          ? `${s.resultCount.toLocaleString()} results`
                          : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Recently Saved Papers */}
            {recentPapers.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                  <BookmarkSimple size={14} />
                  Recently Saved
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {recentPapers.map((p, i) => (
                    <div
                      key={i}
                      className="glass-panel rounded-xl p-4 hover:bg-surface-raised/30 transition-colors"
                    >
                      <p className="text-sm font-medium text-ink leading-snug line-clamp-2 mb-1.5">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-ink-muted truncate">
                        {p.authors}
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        {[p.journal, p.year].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Suggested Searches */}
            <section>
              <h3 className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                <Lightbulb size={14} />
                Try searching for
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => runSuggestion(s)}
                    className="px-4 py-2 rounded-full text-xs font-medium glass-panel text-ink-muted hover:text-brand hover:border-brand/30 border border-transparent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Subtle loading indicator for empty state data */}
            {!emptyStateLoaded && recentSearches.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-xs text-ink-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-pulse" />
                  Loading your history...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Source counts + augmented query info */}
        {hasSearched && !loading && results.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-ink-muted">
              {sourceCounts.pubmed} from PubMed, {sourceCounts.semanticScholar}{" "}
              from Semantic Scholar, {sourceCounts.openAlex} from OpenAlex,{" "}
              {sourceCounts.clinicalTrials} from ClinicalTrials.gov —{" "}
              {totalResults} total results
            </p>
            {augmentedQueries && (
              <button
                onClick={() => setShowAugmented(!showAugmented)}
                className="text-xs text-brand/70 hover:text-brand mt-1 flex items-center gap-1"
              >
                <Brain size={12} />
                {showAugmented ? "Hide" : "Show"} AI-optimized queries
              </button>
            )}
            {showAugmented && augmentedQueries && (
              <div className="mt-2 p-3 rounded-lg bg-surface-raised text-xs space-y-1">
                <p>
                  <span className="text-ink-muted">PubMed:</span>{" "}
                  <span className="text-ink font-mono">
                    {augmentedQueries.pubmed}
                  </span>
                </p>
                <p>
                  <span className="text-ink-muted">S2:</span>{" "}
                  <span className="text-ink font-mono">
                    {augmentedQueries.semanticScholar}
                  </span>
                </p>
                <p>
                  <span className="text-ink-muted">OpenAlex:</span>{" "}
                  <span className="text-ink font-mono">
                    {augmentedQueries.openAlex}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-panel rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-surface-raised rounded w-3/4 mb-3" />
                <div className="h-3 bg-surface-raised rounded w-1/2 mb-2" />
                <div className="h-3 bg-surface-raised rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <GlassPanel className="p-6 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </GlassPanel>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-3">
            {results.map((r, idx) => {
              const key = r.doi || r.pmid || r.s2Id || r.title;
              const similarKey = r.s2Id || r.doi || r.title;

              return (
                <div key={`${key}-${idx}`}>
                  <div className="glass-panel rounded-xl p-5 hover:bg-surface-raised/30 transition-all">
                    {/* Title */}
                    <h3 className="font-medium text-ink text-sm leading-snug mb-1.5">
                      {r.doi ? (
                        <a
                          href={`https://doi.org/${r.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand transition-colors"
                        >
                          {r.title}
                        </a>
                      ) : r.pmid ? (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand transition-colors"
                        >
                          {r.title}
                        </a>
                      ) : (
                        r.title
                      )}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs text-ink-muted truncate mb-1">
                      {r.authors.slice(0, 3).join(", ")}
                      {r.authors.length > 3 && " et al."}
                    </p>

                    {/* Journal, Year, Citations */}
                    <p className="text-xs text-ink-muted">
                      {r.journal} · {r.year}
                      {r.citationCount
                        ? ` · ${r.citationCount} citations`
                        : ""}
                      {r.doi && (
                        <>
                          {" · "}
                          <a
                            href={`https://doi.org/${r.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand/70 hover:text-brand hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            DOI
                          </a>
                        </>
                      )}
                    </p>

                    {/* Abstract */}
                    {r.abstract && (
                      <p className="text-xs text-ink-muted mt-2 line-clamp-2">
                        {r.abstract}
                      </p>
                    )}

                    {/* TLDR */}
                    {r.tldr && (
                      <p className="text-xs text-brand/80 mt-2 italic">
                        TL;DR: {r.tldr}
                      </p>
                    )}

                    {/* Badges row */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {/* Save button */}
                      <button
                        onClick={() => handleSave(r)}
                        disabled={saved.has(key) || savingKeys.has(key)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          saved.has(key)
                            ? "bg-emerald-500/10 text-emerald-500"
                            : savingKeys.has(key)
                              ? "bg-brand/10 text-brand/50 cursor-wait"
                              : "bg-brand/10 text-brand hover:bg-brand/20"
                        )}
                      >
                        <FloppyDisk size={14} />
                        {saved.has(key)
                          ? "Saved"
                          : savingKeys.has(key)
                            ? "Saving..."
                            : "Save"}
                      </button>

                      {/* Find Similar button */}
                      {r.s2Id && (
                        <button
                          onClick={() => handleFindSimilar(r)}
                          disabled={loadingSimilar.has(similarKey)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-raised transition-colors",
                            loadingSimilar.has(similarKey)
                              ? "opacity-60 pointer-events-none text-ink-muted"
                              : "text-ink-muted hover:text-ink"
                          )}
                        >
                          {loadingSimilar.has(similarKey) ? (
                            <CircleNotch size={14} className="animate-spin" />
                          ) : (
                            <Lightning size={14} />
                          )}
                          {loadingSimilar.has(similarKey)
                            ? "Finding..."
                            : "Similar"}
                        </button>
                      )}

                      {/* Evidence Level Badge */}
                      {r.evidenceLevel && (
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                            EVIDENCE_COLORS[r.evidenceLevel] ||
                              EVIDENCE_COLORS["V"]
                          )}
                        >
                          {EVIDENCE_LABELS[r.evidenceLevel] || "Level V"}
                        </span>
                      )}

                      {/* Open Access badge */}
                      {r.isOpenAccess && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-600">
                          Open Access
                        </span>
                      )}

                      {/* Relevance indicator */}
                      {r.rrfScore != null && r.rrfScore >= 1.0 && (
                        <span className="text-[10px] text-ink-muted ml-auto">
                          {r.rrfScore >= 1.5 ? "High relevance" : "Relevant"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Similar Papers — error state */}
                  {similarErrors.has(similarKey) && (
                    <div className="ml-6 mt-1.5 mb-2 flex items-center gap-2 px-2">
                      <span className="text-[11px] text-amber-500">
                        Couldn&apos;t load similar papers.
                      </span>
                      <button
                        onClick={() => handleFindSimilar(r)}
                        className="text-[11px] text-brand font-medium hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Similar Papers — empty state */}
                  {similarEmpty.has(similarKey) && (
                    <div className="ml-6 mt-1.5 mb-2 px-2">
                      <span className="text-[11px] text-ink-muted">
                        No similar papers found for this article.
                      </span>
                    </div>
                  )}

                  {/* Similar Papers — results */}
                  {similarResults[similarKey] && similarResults[similarKey].length > 0 && (
                    <div className="ml-6 mt-1 mb-2 space-y-1">
                      <p className="text-[10px] text-ink-muted uppercase tracking-wider font-medium px-2">
                        Similar Papers
                      </p>
                      {similarResults[similarKey].map((sim, simIdx) => (
                        <div
                          key={simIdx}
                          className="glass-panel rounded-lg p-3 text-xs"
                        >
                          <p className="font-medium text-ink leading-snug">
                            {sim.title}
                          </p>
                          <p className="text-ink-muted mt-0.5">
                            {sim.journal} · {sim.year}
                            {sim.citationCount
                              ? ` · ${sim.citationCount} citations`
                              : ""}
                          </p>
                          <button
                            onClick={() => handleSave(sim)}
                            className="mt-1.5 flex items-center gap-1 text-brand text-[10px] font-medium hover:text-brand-hover"
                          >
                            <FloppyDisk size={12} />
                            Save
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && hasSearched && totalResults > 0 && (
          <div className="flex items-center justify-center gap-4 mt-6 mb-4">
            <button
              onClick={() => handleSearch(page - 1)}
              disabled={page === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-surface-raised text-ink-muted border border-border hover:text-ink disabled:opacity-40 transition-colors"
            >
              <ArrowLeft size={14} />
              Previous
            </button>
            <span className="text-xs text-ink-muted">
              Page {page + 1} of {Math.max(totalPages, 1)}
            </span>
            <button
              onClick={() => handleSearch(page + 1)}
              disabled={!hasMore}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-surface-raised text-ink-muted border border-border hover:text-ink disabled:opacity-40 transition-colors"
            >
              Next
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* No results after search */}
        {showNoResults && (
          <div className="text-center py-16">
            <p className="text-ink-muted">
              No results found. Try a different query.
            </p>
          </div>
        )}
      </div>

      {/* Research Copilot Toggle */}
      <button
        onClick={() => setShowCopilot(!showCopilot)}
        className={cn(
          "fixed right-6 bottom-6 z-40 p-3 rounded-full shadow-lg transition-all",
          showCopilot
            ? "bg-brand text-white"
            : "glass-panel text-ink-muted hover:text-ink"
        )}
      >
        <ChatCircleDots size={24} />
      </button>

      {/* Research Copilot Sidebar */}
      {showCopilot && (
        <aside className="w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-brand" />
              <h3 className="font-semibold text-ink text-sm">
                Research Copilot
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AI
              </span>
            </div>
            <button
              onClick={() => setShowCopilot(false)}
              className="p-1 rounded text-ink-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {chatMessages.length === 0 && (
              <GlassPanel className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle size={14} className="text-brand" />
                  <span className="text-xs font-medium text-brand uppercase tracking-wider">
                    Research Assistant
                  </span>
                </div>
                <p className="text-sm text-ink leading-relaxed">
                  Ask me to find papers on any topic. I&apos;ll search across
                  PubMed, Semantic Scholar, and OpenAlex using systematic search
                  strategies.
                </p>
              </GlassPanel>
            )}
            {chatMessages.map((msg) => {
              const textContent =
                msg.parts
                  ?.filter(
                    (p): p is { type: "text"; text: string } =>
                      p.type === "text"
                  )
                  .map((p) => p.text)
                  .join("") || "";
              if (!textContent) return null;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "text-sm rounded-xl px-3 py-2",
                    msg.role === "user"
                      ? "bg-brand/10 text-ink ml-8"
                      : "bg-surface-raised text-ink mr-4"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-xs">
                    {textContent}
                  </p>
                </div>
              );
            })}
            {chatLoading && (
              <div className="flex items-center gap-2 text-xs text-ink-muted px-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Searching...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about papers, topics, methods..."
              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-brand hover:bg-brand/10 disabled:opacity-40 transition-colors"
            >
              <PaperPlaneTilt size={16} />
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}
