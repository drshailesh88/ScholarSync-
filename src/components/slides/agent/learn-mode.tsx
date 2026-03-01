"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlass, CircleNotch, BookOpen, ArrowRight } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";

interface PaperSuggestion {
  title: string;
  authors: string;
  year: string;
  relevance: string;
  doi?: string;
}

export function LearnMode() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  const [suggestions, setSuggestions] = useState<PaperSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-suggest when active slide changes
  useEffect(() => {
    setSuggestions([]);
    setHasSearched(false);
  }, [activeSlide?.id]);

  async function handleSearch(query?: string) {
    const searchText = query ?? searchQuery ?? activeSlide?.title ?? "";
    if (!searchText.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/slides/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "learn",
          query: searchText,
          slideContent: activeSlide
            ? JSON.stringify(activeSlide.contentBlocks)
            : "",
          audienceType,
        }),
      });

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  function addCitation(paper: PaperSuggestion) {
    if (!activeSlide) return;
    updateSlide(activeSlide.id, {
      contentBlocks: [
        ...activeSlide.contentBlocks,
        {
          type: "citation",
          data: {
            text: paper.relevance,
            source: `${paper.authors.split(",")[0]?.trim() ?? "Author"} et al., ${paper.year}`,
            doi: paper.doi,
          },
        },
      ],
    });
  }

  return (
    <div className="p-4 space-y-4">
      {/* Current slide context */}
      {activeSlide && (
        <div className="text-xs text-ink-muted">
          <span className="font-medium text-ink">For slide:</span>{" "}
          {activeSlide.title || "Untitled"}
        </div>
      )}

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex gap-2"
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search papers or ask a question..."
          className="flex-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
        >
          <MagnifyingGlass size={14} />
        </button>
      </form>

      {/* Auto-suggest button */}
      {!hasSearched && activeSlide && (
        <button
          onClick={() => handleSearch(activeSlide.title)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border text-xs text-ink-muted hover:text-brand hover:border-brand/40 transition-colors"
        >
          <BookOpen size={14} />
          Find papers for this slide
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-6">
          <CircleNotch size={20} className="text-brand animate-spin" />
        </div>
      )}

      {/* Results */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-medium text-ink">
            Suggested papers ({suggestions.length})
          </div>
          {suggestions.map((paper, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-border bg-surface-raised space-y-1.5"
            >
              <div className="text-xs font-medium text-ink leading-snug">
                {paper.title}
              </div>
              <div className="text-[10px] text-ink-muted">
                {paper.authors} ({paper.year})
              </div>
              <div className="text-[10px] text-ink-muted italic">
                {paper.relevance}
              </div>
              <button
                onClick={() => addCitation(paper)}
                className="flex items-center gap-1 text-[10px] font-medium text-brand hover:text-brand/80 transition-colors mt-1"
              >
                Add Citation <ArrowRight size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {hasSearched && !loading && suggestions.length === 0 && (
        <div className="text-center py-4 text-xs text-ink-muted">
          No papers found. Try a different search term.
        </div>
      )}
    </div>
  );
}
