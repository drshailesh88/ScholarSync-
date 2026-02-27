"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Warning } from "@phosphor-icons/react";
import type {
  IntegrityCheckResult,
  AIParagraphResult,
  PlagiarismMatch,
} from "@/lib/integrity/types";

interface DiffViewProps {
  paragraphs: string[];
  result: IntegrityCheckResult;
}

export function DiffView({ paragraphs, result }: DiffViewProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  const handleScroll = useCallback(
    (source: "left" | "right") => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      const from = source === "left" ? leftRef.current : rightRef.current;
      const to = source === "left" ? rightRef.current : leftRef.current;

      if (from && to) {
        to.scrollTop = from.scrollTop;
      }

      requestAnimationFrame(() => {
        isSyncing.current = false;
      });
    },
    []
  );

  /**
   * For a given paragraph, build annotated JSX with AI detection,
   * plagiarism, and citation highlights.
   */
  function renderAnnotatedParagraph(text: string, index: number) {
    const aiAnalysis = result.aiDetection.paragraphs.find(
      (p) => p.paragraphIndex === index
    );

    // Collect plagiarism excerpts that appear in this paragraph
    const plagMatches = (result.plagiarism?.matches ?? []).filter(
      (m) => text.includes(m.excerpt)
    );

    // Collect citation issues for this paragraph
    const citationIssues = (result.citationAudit?.issues ?? []).filter(
      (issue) => issue.paragraphIndex === index
    );

    // If we have sentence-level AI data, use it for fine-grained highlighting
    if (aiAnalysis?.sentences && aiAnalysis.sentences.length > 0) {
      return (
        <p key={index} className="rounded-lg px-3 py-2 text-sm leading-relaxed">
          {renderSentenceLevel(text, aiAnalysis, plagMatches)}
          {citationIssues.length > 0 && (
            <span className="inline-flex items-center gap-1 ml-1">
              {citationIssues.map((issue, i) => (
                <span
                  key={i}
                  title={issue.message}
                  className={cn(
                    "inline-flex items-center",
                    issue.severity === "error"
                      ? "text-red-500"
                      : issue.severity === "warning"
                        ? "text-amber-500"
                        : "text-blue-400"
                  )}
                >
                  <Warning size={12} weight="fill" />
                </span>
              ))}
            </span>
          )}
        </p>
      );
    }

    // Paragraph-level highlighting (no sentence breakdown)
    const humanProb = aiAnalysis?.humanProbability ?? 100;
    const paragraphBg =
      humanProb < 30
        ? "bg-red-500/15"
        : humanProb < 60
          ? "bg-amber-500/10"
          : "";

    // Build the text with plagiarism underlines
    const annotatedText = applyPlagiarismHighlights(text, plagMatches);

    return (
      <p
        key={index}
        className={cn(
          "rounded-lg px-3 py-2 text-sm leading-relaxed",
          paragraphBg
        )}
      >
        {annotatedText}
        {citationIssues.length > 0 && (
          <span className="inline-flex items-center gap-1 ml-1">
            {citationIssues.map((issue, i) => (
              <span
                key={i}
                title={issue.message}
                className={cn(
                  "inline-flex items-center",
                  issue.severity === "error"
                    ? "text-red-500"
                    : issue.severity === "warning"
                      ? "text-amber-500"
                      : "text-blue-400"
                )}
              >
                <Warning size={12} weight="fill" />
              </span>
            ))}
          </span>
        )}
      </p>
    );
  }

  return (
    <div className="flex gap-4 h-full min-h-0">
      {/* Left column — Original Text */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 px-3 py-2 mb-2">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Original Text
          </span>
        </div>
        <div
          ref={leftRef}
          onScroll={() => handleScroll("left")}
          className="flex-1 overflow-y-auto rounded-xl border border-border-subtle bg-surface-raised p-5"
        >
          <div className="font-serif text-ink space-y-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="rounded-lg px-3 py-2 text-sm leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right column — Annotated */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 px-3 py-2 mb-2">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Annotated
          </span>
          <div className="flex items-center gap-3 ml-auto text-[10px] text-ink-muted">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500/15" />
              AI (high)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/10" />
              AI (med)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500/10 underline decoration-red-500">
                P
              </span>
              Plagiarism
            </span>
          </div>
        </div>
        <div
          ref={rightRef}
          onScroll={() => handleScroll("right")}
          className="flex-1 overflow-y-auto rounded-xl border border-border-subtle bg-surface-raised p-5"
        >
          <div className="font-serif text-ink space-y-4">
            {paragraphs.map((p, i) => renderAnnotatedParagraph(p, i))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Render sentence-level highlights within a paragraph.
 * Each sentence from the AI analysis gets its own highlight based on humanProbability.
 * Gaps between sentences (non-analyzed text) are rendered plain.
 */
function renderSentenceLevel(
  text: string,
  aiAnalysis: AIParagraphResult,
  plagMatches: PlagiarismMatch[]
) {
  if (!aiAnalysis?.sentences) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  const sorted = [...aiAnalysis.sentences].sort(
    (a, b) => a.startOffset - b.startOffset
  );

  for (const sentence of sorted) {
    // Add any gap before this sentence
    if (sentence.startOffset > cursor) {
      const gap = text.slice(cursor, sentence.startOffset);
      parts.push(<span key={`gap-${cursor}`}>{gap}</span>);
    }

    const sentenceText = text.slice(sentence.startOffset, sentence.endOffset);
    const humanProb = aiAnalysis.humanProbability;
    // For sentence-level, use the paragraph's humanProbability as baseline
    // (the sentence array gives positional info; the probability applies to the paragraph)
    const bg =
      humanProb < 30
        ? "bg-red-500/15"
        : humanProb < 60
          ? "bg-amber-500/10"
          : "";

    // Check if any plagiarism match overlaps this sentence
    const hasPlag = plagMatches.some(
      (m) =>
        sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)
    );

    parts.push(
      <span
        key={`s-${sentence.startOffset}`}
        className={cn(
          "rounded-sm",
          bg,
          hasPlag && "bg-red-500/10 underline decoration-red-500"
        )}
      >
        {sentenceText}
      </span>
    );

    cursor = sentence.endOffset;
  }

  // Remaining text after last sentence
  if (cursor < text.length) {
    parts.push(<span key={`tail-${cursor}`}>{text.slice(cursor)}</span>);
  }

  return <>{parts}</>;
}

/**
 * Apply plagiarism highlighting to text by finding and wrapping matched excerpts.
 */
function applyPlagiarismHighlights(
  text: string,
  matches: { excerpt: string }[]
): React.ReactNode {
  if (matches.length === 0) return text;

  // Build a list of ranges to highlight
  const ranges: { start: number; end: number }[] = [];
  for (const match of matches) {
    const idx = text.indexOf(match.excerpt);
    if (idx !== -1) {
      ranges.push({ start: idx, end: idx + match.excerpt.length });
    }
  }

  if (ranges.length === 0) return text;

  // Sort by start position
  ranges.sort((a, b) => a.start - b.start);

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      parts.push(
        <span key={`t-${cursor}`}>{text.slice(cursor, range.start)}</span>
      );
    }
    parts.push(
      <span
        key={`plag-${range.start}`}
        className="bg-red-500/10 underline decoration-red-500 rounded-sm"
      >
        {text.slice(range.start, range.end)}
      </span>
    );
    cursor = range.end;
  }

  if (cursor < text.length) {
    parts.push(<span key={`t-${cursor}`}>{text.slice(cursor)}</span>);
  }

  return <>{parts}</>;
}
