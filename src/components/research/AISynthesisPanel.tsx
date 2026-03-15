"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkle, CaretDown, CaretUp, Lock } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { UnifiedSearchResult } from "@/types/search";

// ── Types ────────────────────────────────────────────────────────────

interface AISynthesisPanelProps {
  query: string;
  results: UnifiedSearchResult[];
  userPlan: "free" | "basic" | "pro" | "institutional" | null;
  /** Restored synthesis text from session persistence */
  initialSynthesis?: string | null;
  /** Called whenever synthesis text changes so the parent can persist it */
  onSynthesisChange?: (text: string) => void;
}

interface CitationRef {
  marker: number;
  label: string;
  resultIndex: number;
}

// ── Helpers ──────────────────────────────────────────────────────────

function buildCitationMap(papers: UnifiedSearchResult[]): CitationRef[] {
  return papers.slice(0, 5).map((p, i) => {
    const firstAuthor = p.authors[0]?.split(",")[0]?.split(" ").pop() ?? "Unknown";
    const etAl = p.authors.length > 1 ? " et al." : "";
    return {
      marker: i + 1,
      label: `${firstAuthor}${etAl}, ${p.year}`,
      resultIndex: i,
    };
  });
}

function parseCitations(
  text: string,
  citations: CitationRef[]
): { type: "text" | "citation"; content: string; citation?: CitationRef }[] {
  const segments: { type: "text" | "citation"; content: string; citation?: CitationRef }[] = [];
  const regex = /\[(\d+)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    const num = parseInt(match[1], 10);
    const cit = citations.find((c) => c.marker === num);
    if (cit) {
      segments.push({ type: "citation", content: `(${cit.label})`, citation: cit });
    } else {
      segments.push({ type: "text", content: match[0] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  return segments;
}

// ── Component ────────────────────────────────────────────────────────

export function AISynthesisPanel({
  query,
  results,
  userPlan,
  initialSynthesis,
  onSynthesisChange,
}: AISynthesisPanelProps) {
  const [synthesis, setSynthesis] = useState(initialSynthesis ?? "");
  const [isStreaming, setIsStreaming] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const synthesizedForRef = useRef<string>("");

  const paperCount = Math.min(results.length, 5);
  const citations = buildCitationMap(results);
  const isFree = userPlan === "free";

  const triggerSynthesis = useCallback(async () => {
    if (results.length === 0) return;

    const fingerprint = `${query}::${results.slice(0, 5).map((r) => r.title).join("|")}`;
    if (synthesizedForRef.current === fingerprint) return;
    synthesizedForRef.current = fingerprint;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setSynthesis("");
    setIsStreaming(true);
    setFailed(false);
    setExpanded(false);

    try {
      const papers = results.slice(0, 5).map((r) => ({
        title: r.title,
        authors: r.authors,
        year: r.year,
        journal: r.journal,
        abstract: r.abstract ?? "",
        pmid: r.pmid,
        doi: r.doi,
        studyType: r.studyType,
      }));

      const res = await fetch("/api/research/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          papers,
          reportType: "quick_summary",
          mode: "generate",
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setFailed(true);
        setIsStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setSynthesis(accumulated);
        onSynthesisChange?.(accumulated);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setFailed(true);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [query, results, onSynthesisChange]);

  useEffect(() => {
    if (results.length > 0 && query.trim()) {
      triggerSynthesis();
    }
    return () => {
      abortRef.current?.abort();
    };
  }, [triggerSynthesis, results, query]);

  if (failed || (!synthesis && !isStreaming)) return null;

  const segments = parseCitations(synthesis, citations);

  const isOverflowing =
    contentRef.current ? contentRef.current.scrollHeight > 96 : synthesis.length > 400;
  const shouldClamp = !expanded && isOverflowing && !isStreaming;

  const handleCitationClick = (resultIndex: number) => {
    const el = document.getElementById(`paper-result-${resultIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-brand/50");
      setTimeout(() => el.classList.remove("ring-2", "ring-brand/50"), 2000);
    }
  };

  return (
    <div className="mb-5 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02] backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-2">
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand/10">
          <Sparkle size={14} className="text-brand" weight="fill" />
        </div>
        <span className="text-xs font-semibold text-brand">
          Answer from top {paperCount} papers
        </span>
        {isStreaming && (
          <span className="flex items-center gap-1.5 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] text-brand/70">Generating...</span>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pb-4 relative">
        {isStreaming && !synthesis ? (
          <div className="space-y-2 py-1 animate-pulse">
            <div className="h-3 bg-brand/8 rounded w-full" />
            <div className="h-3 bg-brand/8 rounded w-[92%]" />
            <div className="h-3 bg-brand/8 rounded w-[85%]" />
            <div className="h-3 bg-brand/8 rounded w-[60%]" />
          </div>
        ) : (
          <>
            <div
              ref={contentRef}
              className={cn(
                "text-sm text-ink leading-relaxed",
                shouldClamp && "max-h-24 overflow-hidden"
              )}
            >
              {/* empty state: no data, no results, nothing here */}
              {segments.map((seg, i) =>
                seg.type === "citation" && seg.citation ? (
                  <button
                    key={i}
                    onClick={() => handleCitationClick(seg.citation!.resultIndex)}
                    className="inline text-brand font-medium hover:text-brand-hover hover:underline transition-colors cursor-pointer mx-0.5"
                    title={`Scroll to: ${results[seg.citation.resultIndex]?.title}`}
                  >
                    {seg.content}
                  </button>
                ) : (
                  <span key={i}>{seg.content}</span>
                )
              )}
            </div>

            {/* Free plan blur overlay */}
            {isFree && synthesis && (
              <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                <div className="h-24 bg-gradient-to-t from-surface via-surface/90 to-transparent" />
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Lock size={14} className="text-ink-muted" />
                  <span className="text-xs text-ink-muted">
                    Full AI analysis available on Pro
                  </span>
                  <a
                    href="/settings"
                    className="text-xs font-medium text-brand hover:text-brand-hover transition-colors ml-1"
                  >
                    Upgrade to Pro
                  </a>
                </div>
              </div>
            )}

            {/* Read More / Show Less toggle */}
            {!isFree && isOverflowing && !isStreaming && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 mt-2 text-xs font-medium text-brand/70 hover:text-brand transition-colors"
              >
                {expanded ? (
                  <>
                    Show Less <CaretUp size={12} />
                  </>
                ) : (
                  <>
                    Read More <CaretDown size={12} />
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
