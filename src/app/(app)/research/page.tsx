"use client";

import { useState, useCallback } from "react";
import {
  MagnifyingGlass,
  ChatCircleDots,
  FloppyDisk,
  X,
  Sparkle,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { savePaper } from "@/lib/actions/papers";

interface SearchResult {
  id: string;
  source: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract?: string;
  citationCount?: number;
  tldr?: string;
  doi?: string;
  pmid?: string;
  semanticScholarId?: string;
  tags?: string[];
}

const RESULTS_PER_PAGE = 10;
const filterChips = ["Last 5 Years", "PDF Available", "High Impact"];

/**
 * Normalize a title for deduplication comparison.
 * Lowercases, strips punctuation, and collapses whitespace.
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Merge results from S2 and PubMed, deduplicating by DOI first, then by
 * normalized title + year. When duplicates are found, prefer S2 data
 * (it has abstracts + TLDR) but enrich it with PubMed IDs.
 */
function mergeResults(
  s2Results: SearchResult[],
  pubmedResults: SearchResult[]
): SearchResult[] {
  const merged: SearchResult[] = [];
  const seenDois = new Set<string>();
  const seenTitleKeys = new Map<string, number>(); // titleKey -> index in merged

  // Add S2 results first (they have richer metadata)
  for (const r of s2Results) {
    if (r.doi) {
      if (seenDois.has(r.doi)) continue;
      seenDois.add(r.doi);
    }
    const titleKey = normalizeTitle(r.title) + "|" + (r.year || 0);
    if (seenTitleKeys.has(titleKey)) continue;
    seenTitleKeys.set(titleKey, merged.length);
    merged.push(r);
  }

  // Add PubMed results, merging duplicates into existing S2 entries
  for (const r of pubmedResults) {
    // Check DOI match first
    if (r.doi && seenDois.has(r.doi)) {
      // Find the existing entry and enrich it with PubMed ID
      const existingIdx = merged.findIndex(
        (m) => m.doi && m.doi === r.doi
      );
      if (existingIdx >= 0) {
        merged[existingIdx] = enrichWithPubMed(merged[existingIdx], r);
      }
      continue;
    }

    // Check title+year match
    const titleKey = normalizeTitle(r.title) + "|" + (r.year || 0);
    if (seenTitleKeys.has(titleKey)) {
      const existingIdx = seenTitleKeys.get(titleKey)!;
      merged[existingIdx] = enrichWithPubMed(merged[existingIdx], r);
      if (r.doi) seenDois.add(r.doi);
      continue;
    }

    // New paper — add it
    if (r.doi) seenDois.add(r.doi);
    seenTitleKeys.set(titleKey, merged.length);
    merged.push(r);
  }

  return merged;
}

/**
 * Enrich an existing (usually S2) result with data from a PubMed result.
 */
function enrichWithPubMed(
  existing: SearchResult,
  pubmed: SearchResult
): SearchResult {
  return {
    ...existing,
    pmid: existing.pmid || pubmed.pmid || pubmed.id,
    doi: existing.doi || pubmed.doi,
    abstract: existing.abstract || pubmed.abstract,
    // Keep S2 source label since it has richer data, but note both contributed
    source: existing.source,
  };
}

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceCounts, setSourceCounts] = useState({ pubmed: 0, semantic: 0 });
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [showCopilot, setShowCopilot] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState({ pubmed: 0, semantic: 0 });

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  const handleSearch = useCallback(
    async (searchPage = 0) => {
      if (!query.trim()) return;
      setLoading(true);
      setError(null);
      setHasSearched(true);
      setPage(searchPage);

      try {
        const pubmedOffset = searchPage * RESULTS_PER_PAGE;
        const s2Offset = searchPage * RESULTS_PER_PAGE;

        const [pubmedRes, s2Res] = await Promise.allSettled([
          fetch(
            `/api/search/pubmed?q=${encodeURIComponent(query)}&maxResults=${RESULTS_PER_PAGE}&page=${searchPage}`
          ).then((r) => r.json()),
          fetch(
            `/api/search/semantic-scholar?q=${encodeURIComponent(query)}&limit=${RESULTS_PER_PAGE}&offset=${s2Offset}`
          ).then((r) => r.json()),
        ]);

        const pubmedResults: SearchResult[] =
          pubmedRes.status === "fulfilled" && !pubmedRes.value.error
            ? pubmedRes.value.results
            : [];
        const s2Results: SearchResult[] =
          s2Res.status === "fulfilled" && !s2Res.value.error
            ? s2Res.value.results
            : [];

        setSourceCounts({
          pubmed: pubmedResults.length,
          semantic: s2Results.length,
        });

        if (pubmedRes.status === "fulfilled" || s2Res.status === "fulfilled") {
          setTotalResults({
            pubmed:
              pubmedRes.status === "fulfilled"
                ? pubmedRes.value.total || 0
                : 0,
            semantic:
              s2Res.status === "fulfilled" ? s2Res.value.total || 0 : 0,
          });
        }

        const merged = mergeResults(s2Results, pubmedResults);
        setResults(merged);

        if (
          merged.length === 0 &&
          pubmedRes.status === "rejected" &&
          s2Res.status === "rejected"
        ) {
          setError("Both search services failed. Please try again.");
        }
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const hasMore =
    totalResults.pubmed > (page + 1) * RESULTS_PER_PAGE ||
    totalResults.semantic > (page + 1) * RESULTS_PER_PAGE;

  const toggleSave = async (id: string) => {
    const result = results.find((r) => r.id === id);
    if (!result || saved.has(id)) return;

    try {
      await savePaper({
        title: result.title,
        authors: result.authors,
        journal: result.journal,
        year: result.year,
        doi: result.doi,
        abstract: result.abstract,
        source: (result.source === "pubmed"
          ? "pubmed"
          : "semantic_scholar") as "pubmed" | "semantic_scholar",
        pubmed_id: result.pmid,
        semantic_scholar_id: result.semanticScholarId,
        citation_count: result.citationCount,
        tldr: result.tldr,
      });
      setSaved((prev) => new Set(prev).add(id));
    } catch (err) {
      console.error("Failed to save paper:", err);
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Main search area */}
      <div className="flex-1 overflow-y-auto">
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

          {/* Filter Chips */}
          <div className="flex gap-2 mt-3">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => toggleFilter(chip)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  activeFilters.has(chip)
                    ? "bg-brand/10 text-brand border-brand/30"
                    : "bg-surface-raised text-ink-muted border-border hover:text-ink"
                )}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Source counts */}
        {hasSearched && !loading && results.length > 0 && (
          <p className="text-xs text-ink-muted mb-4">
            {sourceCounts.pubmed} from PubMed, {sourceCounts.semantic} from
            Semantic Scholar — {results.length} unique results
            {page > 0 && ` (page ${page + 1})`}
          </p>
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

        {/* TL;DR Synthesis Box */}
        {!loading && results.length > 0 && results.some((r) => r.tldr) && (
          <GlassPanel className="p-5 mb-6 border-l-2 border-brand">
            <div className="flex items-center gap-2 mb-2">
              <Sparkle size={16} className="text-brand" />
              <span className="text-xs font-medium text-brand uppercase tracking-wider">
                AI Synthesis
              </span>
            </div>
            <p className="text-sm text-ink leading-relaxed">
              {results.find((r) => r.tldr)?.tldr}
            </p>
          </GlassPanel>
        )}

        {/* Results */}
        {!loading && (
          <div className="space-y-3">
            {results.map((r) => (
              <div
                key={r.id}
                className="glass-panel rounded-xl p-5 hover:bg-surface-raised/30 transition-all"
              >
                <h3 className="font-medium text-ink text-sm leading-snug mb-1.5">
                  {r.title}
                </h3>
                <p className="text-xs text-ink-muted truncate mb-1">
                  {r.authors.slice(0, 3).join(", ")}
                  {r.authors.length > 3 && " et al."}
                </p>
                <p className="text-xs text-ink-muted">
                  {r.journal} · {r.year}
                  {r.citationCount ? ` · ${r.citationCount} citations` : ""}
                </p>
                {r.abstract && (
                  <p className="text-xs text-ink-muted mt-2 line-clamp-2">
                    {r.abstract}
                  </p>
                )}
                {r.tldr && (
                  <p className="text-xs text-brand/80 mt-2 italic">
                    TL;DR: {r.tldr}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => toggleSave(r.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      saved.has(r.id)
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-brand/10 text-brand hover:bg-brand/20"
                    )}
                  >
                    <FloppyDisk size={14} />
                    {saved.has(r.id) ? "Saved" : "Save"}
                  </button>
                  <span className="text-[10px] text-ink-muted px-2 py-1 rounded bg-surface-raised">
                    {r.source === "pubmed" ? "PubMed" : "Semantic Scholar"}
                  </span>
                  {r.pmid && (
                    <span className="text-[10px] text-ink-muted px-2 py-1 rounded bg-surface-raised">
                      PMID: {r.pmid}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && hasSearched && results.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-6 mb-4">
            <button
              onClick={() => handleSearch(page - 1)}
              disabled={page === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <CaretLeft size={14} />
              Previous
            </button>
            <span className="text-xs text-ink-muted">Page {page + 1}</span>
            <button
              onClick={() => handleSearch(page + 1)}
              disabled={!hasMore}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <CaretRight size={14} />
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

      {/* Research Copilot Panel */}
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

      {showCopilot && (
        <aside className="w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-ink text-sm">
                Research Copilot
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ready
              </span>
            </div>
            <button
              onClick={() => setShowCopilot(false)}
              className="p-1 rounded text-ink-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>

          <GlassPanel className="p-4 mb-4">
            <h4 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
              AI Insight
            </h4>
            <p className="text-sm text-ink leading-relaxed mb-3">
              Based on your search, CRISPR-Cas9 gene therapy shows significant
              promise for treating sickle cell disease. Would you like me to
              analyze the methodology across these papers?
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand/10 text-brand hover:bg-brand/20 transition-colors">
                Yes, Analyze
              </button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted hover:text-ink transition-colors">
                No Thanks
              </button>
            </div>
          </GlassPanel>

          <div className="flex-1" />

          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Ask about these results..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
        </aside>
      )}
    </div>
  );
}
