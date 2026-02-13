"use client";

import { useState, useCallback } from "react";
import {
  MagnifyingGlass,
  ChatCircleDots,
  FloppyDisk,
  X,
  Sparkle,
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
  tags?: string[];
}

const filterChips = ["Last 5 Years", "PDF Available", "High Impact"];

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

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const [pubmedRes, s2Res] = await Promise.allSettled([
        fetch(`/api/search/pubmed?q=${encodeURIComponent(query)}&maxResults=10`).then((r) => r.json()),
        fetch(`/api/search/semantic-scholar?q=${encodeURIComponent(query)}&limit=10`).then((r) => r.json()),
      ]);

      const pubmedResults: SearchResult[] =
        pubmedRes.status === "fulfilled" && !pubmedRes.value.error
          ? pubmedRes.value.results
          : [];
      const s2Results: SearchResult[] =
        s2Res.status === "fulfilled" && !s2Res.value.error
          ? s2Res.value.results
          : [];

      setSourceCounts({ pubmed: pubmedResults.length, semantic: s2Results.length });

      // Merge and deduplicate by DOI
      const seen = new Set<string>();
      const merged: SearchResult[] = [];

      // Prefer S2 results (they have abstracts and TL;DR)
      for (const r of s2Results) {
        const key = r.doi || r.id;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(r);
        }
      }
      for (const r of pubmedResults) {
        const key = r.doi || r.id;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(r);
        }
      }

      setResults(merged);

      if (merged.length === 0 && pubmedRes.status === "rejected" && s2Res.status === "rejected") {
        setError("Both search services failed. Please try again.");
      }
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

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
        source: (result.source === "pubmed" ? "pubmed" : "semantic_scholar") as "pubmed" | "semantic_scholar",
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
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search 200M+ papers — try 'CRISPR sickle cell gene therapy'"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
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
            {sourceCounts.pubmed} from PubMed, {sourceCounts.semantic} from Semantic Scholar
            — {results.length} unique results
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
                  <p className="text-xs text-ink-muted mt-2 line-clamp-2">{r.abstract}</p>
                )}
                {r.tldr && (
                  <p className="text-xs text-brand/80 mt-2 italic">TL;DR: {r.tldr}</p>
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
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="text-center py-16">
            <p className="text-ink-muted">No results found. Try a different query.</p>
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
              <h3 className="font-semibold text-ink text-sm">Research Copilot</h3>
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
              Based on your search, CRISPR-Cas9 gene therapy shows significant promise for
              treating sickle cell disease. Would you like me to analyze the methodology
              across these papers?
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
