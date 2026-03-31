"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkle, CaretDown, CaretUp, X } from "@phosphor-icons/react";
import type { UnifiedSearchResult } from "@/types/search";
import type { ExploreTab } from "./ExploreTabs";

// ── Trust tier → color mapping for citation markers ─────────────────

const TRUST_TIER_COLORS: Record<string, string> = {
  government: "var(--trust-government)",
  major_journalism: "var(--trust-journalism)",
  community: "var(--trust-community)",
  other: "var(--trust-other)",
};

function getCitationColor(result: UnifiedSearchResult | undefined): string {
  if (!result) return TRUST_TIER_COLORS.other;
  return TRUST_TIER_COLORS[result.trustTier || "other"];
}

// ── Types ────────────────────────────────────────────────────────────

interface SynthesisBlockProps {
  query: string;
  results: UnifiedSearchResult[];
  tab: Exclude<ExploreTab, "more">;
  /** Whether synthesis is requested (toggled by Q or button) */
  isOpen: boolean;
  /** Called to close/toggle synthesis */
  onClose: () => void;
}

interface CitationRef {
  marker: number;
  label: string;
  resultIndex: number;
  trustTier: string;
}

// ── Helpers ──────────────────────────────────────────────────────────

function buildCitationMap(results: UnifiedSearchResult[]): CitationRef[] {
  return results.slice(0, 8).map((r, i) => {
    const firstAuthor =
      r.authors[0]?.split(",")[0]?.split(" ").pop() ??
      r.sourceLabel ??
      r.domain ??
      "Source";
    const year = r.year ? `, ${r.year}` : "";
    return {
      marker: i + 1,
      label: `${firstAuthor}${year}`,
      resultIndex: i,
      trustTier: r.trustTier || "other",
    };
  });
}

function parseCitations(
  text: string,
  citations: CitationRef[]
): { type: "text" | "citation"; content: string; citation?: CitationRef }[] {
  const segments: {
    type: "text" | "citation";
    content: string;
    citation?: CitationRef;
  }[] = [];
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
      segments.push({
        type: "citation",
        content: `[${cit.marker}]`,
        citation: cit,
      });
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

export function SynthesisBlock({
  query,
  results,
  tab,
  isOpen,
  onClose,
}: SynthesisBlockProps) {
  const [synthesis, setSynthesis] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [failed, setFailed] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const synthesizedForRef = useRef<string>("");

  const sourceCount = Math.min(results.length, 8);
  const citations = buildCitationMap(results);

  const triggerSynthesis = useCallback(async () => {
    if (results.length === 0) return;

    // Deduplicate requests for the same query+results
    const fingerprint = `${query}::${tab}::${results
      .slice(0, 8)
      .map((r) => r.title)
      .join("|")}`;
    if (synthesizedForRef.current === fingerprint && synthesis) return;
    synthesizedForRef.current = fingerprint;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setSynthesis("");
    setIsStreaming(true);
    setFailed(false);
    setCollapsed(false);

    try {
      const sources = results.slice(0, 8).map((r) => ({
        title: r.title,
        url: r.url,
        domain: r.domain,
        authors: r.authors,
        snippet: r.abstract || r.tldr,
        journal: r.journal,
        year: r.year,
        publishedAt: r.publishedAt,
        trustTier: r.trustTier,
        sourceLabel: r.sourceLabel,
        platform: r.platform,
      }));

      const res = await fetch("/api/explore/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sources, query }),
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
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setFailed(true);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [query, results, tab, synthesis]);

  // Trigger synthesis when opened
  useEffect(() => {
    if (isOpen && results.length > 0 && query.trim()) {
      triggerSynthesis();
    }
    return () => {
      abortRef.current?.abort();
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  const segments = parseCitations(synthesis, citations);

  const handleCitationClick = (resultIndex: number) => {
    const el = document.getElementById(`explore-result-${resultIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-brand/50");
      setTimeout(() => el.classList.remove("ring-2", "ring-brand/50"), 2000);
    }
  };

  return (
    <div
      className="rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02] backdrop-blur-sm overflow-hidden"
      data-testid="synthesis-block"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand/10">
            <Sparkle size={14} className="text-brand" weight="fill" />
          </div>
          <span className="text-xs font-semibold text-brand">
            Synthesis from top {sourceCount} {tab} results
          </span>
          {isStreaming && (
            <span className="flex items-center gap-1.5 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] text-brand/70">Generating...</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {/* Collapse/Expand */}
          {synthesis && !isStreaming && (
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-brand/60 hover:text-brand hover:bg-brand/10 transition-colors"
              aria-label={collapsed ? "Expand synthesis" : "Collapse synthesis"}
              data-testid="synthesis-collapse-toggle"
            >
              {collapsed ? <CaretDown size={14} /> : <CaretUp size={14} />}
            </button>
          )}
          {/* Close */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-brand/60 hover:text-brand hover:bg-brand/10 transition-colors"
            aria-label="Close synthesis"
            data-testid="synthesis-close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="px-5 pb-4">
          {failed ? (
            <p className="text-sm text-ink-muted">
              Synthesis could not be generated. Try again later.
            </p>
          ) : isStreaming && !synthesis ? (
            <div className="space-y-2 py-1 animate-pulse" data-testid="synthesis-skeleton">
              <div className="h-3 bg-brand/8 rounded w-full" />
              <div className="h-3 bg-brand/8 rounded w-[92%]" />
              <div className="h-3 bg-brand/8 rounded w-[85%]" />
              <div className="h-3 bg-brand/8 rounded w-[60%]" />
            </div>
          ) : (
            <div className="text-sm text-ink leading-relaxed" data-testid="synthesis-content">
              {segments.map((seg, i) =>
                seg.type === "citation" && seg.citation ? (
                  <button
                    key={i}
                    onClick={() => handleCitationClick(seg.citation!.resultIndex)}
                    className="inline font-semibold hover:underline transition-colors cursor-pointer mx-0.5"
                    style={{ color: getCitationColor(results[seg.citation.resultIndex]) }}
                    title={`Scroll to: ${results[seg.citation.resultIndex]?.title}`}
                    data-testid={`citation-marker-${seg.citation.marker}`}
                  >
                    {seg.content}
                  </button>
                ) : (
                  <span key={i}>{seg.content}</span>
                )
              )}
            </div>
          )}

          {/* Keyboard hint */}
          {!isStreaming && synthesis && (
            <p className="mt-3 text-[10px] text-ink-muted/60">
              Press <kbd className="px-1 py-0.5 rounded bg-surface-raised text-[10px] font-mono">Q</kbd> to toggle
            </p>
          )}
        </div>
      )}
    </div>
  );
}
