"use client";

import { useState, useCallback, useEffect } from "react";
import {
  MagnifyingGlass,
  ChatCircleDots,
  FloppyDisk,
  X,
  Sparkle,
  ArrowLeft,
  ArrowRight,
  Funnel,
  SortAscending,
  Star,
  Lightning,
  BookOpen,
  Brain,
  CaretDown,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { savePaper } from "@/lib/actions/papers";
import type {
  UnifiedSearchResult,
  SearchResponse,
  EvidenceLevel,
} from "@/types/search";

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

const SOURCE_COLORS: Record<string, string> = {
  pubmed: "bg-blue-500/10 text-blue-600",
  semantic_scholar: "bg-purple-500/10 text-purple-600",
  openalex: "bg-teal-500/10 text-teal-600",
};

const SOURCE_LABELS: Record<string, string> = {
  pubmed: "PubMed",
  semantic_scholar: "S2",
  openalex: "OpenAlex",
};

type SortOption = "relevance" | "citations" | "year" | "evidence";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "citations", label: "Citations" },
  { value: "year", label: "Year (Newest)" },
  { value: "evidence", label: "Evidence Level" },
];

interface FilterState {
  last5Years: boolean;
  pdfAvailable: boolean;
  highImpact: boolean;
  rctsOnly: boolean;
  reviews: boolean;
  metaAnalyses: boolean;
}

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceCounts, setSourceCounts] = useState({
    pubmed: 0,
    semanticScholar: 0,
    openAlex: 0,
  });
  const [filters, setFilters] = useState<FilterState>({
    last5Years: false,
    pdfAvailable: false,
    highImpact: false,
    rctsOnly: false,
    reviews: false,
    metaAnalyses: false,
  });
  const [sort, setSort] = useState<SortOption>("relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [augmentedQueries, setAugmentedQueries] = useState<
    SearchResponse["augmentedQueries"] | null
  >(null);
  const [showAugmented, setShowAugmented] = useState(false);
  const [similarResults, setSimilarResults] = useState<
    Record<string, UnifiedSearchResult[]>
  >({});
  const [loadingSimilar, setLoadingSimilar] = useState<Set<string>>(new Set());
  const perPage = 20;

  const [chatInput, setChatInput] = useState("");

  // Research Copilot chat
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

  const toggleFilter = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const buildSearchUrl = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams();
      params.set("q", query);
      params.set("page", pageNum.toString());
      params.set("perPage", perPage.toString());
      params.set("sort", sort);

      if (filters.last5Years) {
        params.set("yearStart", (new Date().getFullYear() - 5).toString());
      }
      if (filters.pdfAvailable) {
        params.set("openAccessOnly", "true");
      }
      if (filters.highImpact) {
        params.set("sort", "citations");
      }

      const studyTypes: string[] = [];
      if (filters.rctsOnly) studyTypes.push("rct");
      if (filters.reviews) studyTypes.push("review", "systematic_review");
      if (filters.metaAnalyses) studyTypes.push("meta_analysis");
      if (studyTypes.length > 0) {
        params.set("studyTypes", studyTypes.join(","));
      }

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
        if (!res.ok) throw new Error("Search failed");

        const data: SearchResponse = await res.json();
        setResults(data.results);
        setTotalResults(data.total);
        setHasMore(data.hasMore);
        setSourceCounts(data.sourceCounts);
        setAugmentedQueries(data.augmentedQueries || null);
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [query, buildSearchUrl]
  );

  // Re-search when filters or sort change (if we've already searched)
  useEffect(() => {
    if (hasSearched && query.trim()) {
      handleSearch(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);

  const handleSave = async (result: UnifiedSearchResult) => {
    const key = result.doi || result.pmid || result.s2Id || result.title;
    if (saved.has(key)) return;

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
    }
  };

  const handleFindSimilar = async (result: UnifiedSearchResult) => {
    const key = result.s2Id || result.doi || result.title;
    if (!result.s2Id || similarResults[key]) return;

    setLoadingSimilar((prev) => new Set(prev).add(key));
    try {
      const res = await fetch(
        `/api/search/s2-recommendations?paperId=${result.s2Id}&limit=5`
      );
      if (res.ok) {
        const data = await res.json();
        setSimilarResults((prev) => ({ ...prev, [key]: data.results }));
      }
    } catch {
      // silently fail
    } finally {
      setLoadingSimilar((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const totalPages = Math.ceil(totalResults / perPage);

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

        {/* Source counts + augmented query info */}
        {hasSearched && !loading && results.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-ink-muted">
              {sourceCounts.pubmed} from PubMed, {sourceCounts.semanticScholar}{" "}
              from Semantic Scholar, {sourceCounts.openAlex} from OpenAlex —{" "}
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
        {!loading && (
          <div className="space-y-3">
            {results.map((r, idx) => {
              const key = r.doi || r.pmid || r.s2Id || r.title;
              const similarKey = r.s2Id || r.doi || r.title;

              return (
                <div key={`${key}-${idx}`}>
                  <div className="glass-panel rounded-xl p-5 hover:bg-surface-raised/30 transition-all">
                    {/* Title */}
                    <h3 className="font-medium text-ink text-sm leading-snug mb-1.5">
                      {r.title}
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
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          saved.has(key)
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-brand/10 text-brand hover:bg-brand/20"
                        )}
                      >
                        <FloppyDisk size={14} />
                        {saved.has(key) ? "Saved" : "Save"}
                      </button>

                      {/* Find Similar button */}
                      {r.s2Id && (
                        <button
                          onClick={() => handleFindSimilar(r)}
                          disabled={loadingSimilar.has(similarKey)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted hover:text-ink transition-colors"
                        >
                          <Lightning size={14} />
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

                      {/* Source Badges */}
                      {r.sources.map((source) => (
                        <span
                          key={source}
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-medium",
                            SOURCE_COLORS[source] || "bg-surface-raised text-ink-muted"
                          )}
                        >
                          {SOURCE_LABELS[source] || source}
                        </span>
                      ))}

                      {/* Open Access badge */}
                      {r.isOpenAccess && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-600">
                          Open Access
                        </span>
                      )}

                      {/* RRF Score */}
                      {r.rrfScore && (
                        <span className="text-[10px] text-ink-muted ml-auto">
                          Score: {(r.rrfScore * 100).toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Similar Papers (inline) */}
                  {similarResults[similarKey] && (
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

        {/* Empty state */}
        {!loading && hasSearched && results.length === 0 && !error && (
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
              const textContent = msg.parts
                ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
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
