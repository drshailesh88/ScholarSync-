"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { DeepResearchSource } from "./types";
import { getEvidenceLevel } from "./types";

// ── Evidence Level Badge ────────────────────────────────────────────
const EVIDENCE_BADGE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "High" },
  moderate: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Moderate" },
  low: { bg: "bg-orange-500/20", text: "text-orange-400", label: "Low" },
  unknown: { bg: "bg-gray-500/20", text: "text-gray-400", label: "Unknown" },
};

function EvidenceBadge({ source }: { source: DeepResearchSource }) {
  const level = getEvidenceLevel(source);
  const style = EVIDENCE_BADGE_STYLES[level];
  const designLabel = source.extractedData?.studyDesign || source.studyType || "";

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${style.bg} ${style.text}`}
      title={designLabel ? `${style.label} evidence — ${designLabel}` : `${style.label} evidence`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          level === "high"
            ? "bg-emerald-400"
            : level === "moderate"
              ? "bg-yellow-400"
              : level === "low"
                ? "bg-orange-400"
                : "bg-gray-400"
        }`}
      />
      {style.label}
      {designLabel && (
        <span className="opacity-70 ml-0.5">— {designLabel}</span>
      )}
    </span>
  );
}

// ── Citation Tooltip ────────────────────────────────────────────────
interface CitationTooltipProps {
  source: DeepResearchSource;
  position: { top: number; left: number };
  onClose: () => void;
}

function CitationTooltip({ source, position, onClose }: CitationTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const authorsText =
    source.authors.length > 3
      ? `${source.authors.slice(0, 3).join(", ")} et al.`
      : source.authors.join(", ");

  return (
    <div
      ref={ref}
      className="fixed z-50 w-80 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl text-sm"
      style={{
        top: Math.min(position.top, window.innerHeight - 240),
        left: Math.min(position.left, window.innerWidth - 340),
      }}
    >
      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1.5 line-clamp-2">
        {source.title}
      </h4>
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{authorsText}</p>
      <p className="text-gray-400 text-xs mb-1.5">
        {source.journal} {source.year && `(${source.year})`}
        {source.citationCount > 0 && (
          <span className="ml-2 text-gray-500">
            {source.citationCount.toLocaleString()} citations
          </span>
        )}
      </p>
      <div className="mb-2">
        <EvidenceBadge source={source} />
      </div>
      {source.abstract && (
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-3 mb-2">
          {source.abstract}
        </p>
      )}
      <div className="flex items-center gap-2">
        {source.doi && (
          <a
            href={`https://doi.org/${source.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs underline"
          >
            DOI
          </a>
        )}
        {source.pmid && (
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs underline"
          >
            PubMed
          </a>
        )}
        {(source.openAccessPdfUrl || source.fullTextUrl) && (
          <a
            href={source.openAccessPdfUrl || source.fullTextUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 text-xs underline"
          >
            PDF
          </a>
        )}
        {source.isOpenAccess && (
          <span className="text-emerald-500 text-xs font-medium">OA</span>
        )}
      </div>
    </div>
  );
}

// ── Single Citation Marker ──────────────────────────────────────────
interface CitationMarkerProps {
  number: number;
  source: DeepResearchSource | undefined;
  onScrollToRef?: (index: number) => void;
}

function CitationMarker({ number, source, onScrollToRef }: CitationMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const markerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (markerRef.current && source) {
      const rect = markerRef.current.getBoundingClientRect();
      setTooltipPos({ top: rect.bottom + 8, left: rect.left - 140 });
      setShowTooltip(true);
    }
  }, [source]);

  const handleClick = useCallback(() => {
    if (onScrollToRef) {
      onScrollToRef(number);
    }
  }, [number, onScrollToRef]);

  return (
    <>
      <span
        ref={markerRef}
        className="inline-flex items-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
      >
        <sup className="text-blue-400 hover:text-blue-300 font-medium text-[10px] ml-0.5 cursor-pointer transition-colors">
          [{number}]
        </sup>
      </span>
      {showTooltip && source && (
        <CitationTooltip
          source={source}
          position={tooltipPos}
          onClose={() => setShowTooltip(false)}
        />
      )}
    </>
  );
}

// ── Parse text and inject citation markers ──────────────────────────
interface ParsedCitationTextProps {
  text: string;
  sources: DeepResearchSource[];
  onScrollToRef?: (index: number) => void;
}

/**
 * Expand a bracket citation group into individual numbers.
 * Handles: [5], [5,12,30], [5, 12, 30], [5-8], [5,8-10]
 */
function expandCitationNumbers(inner: string): number[] {
  const nums: number[] = [];
  const segments = inner.split(/[,;]\s*/);
  for (const segment of segments) {
    const rangeMatch = segment.match(/^(\d+)\s*[-\u2013\u2014]\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      for (let n = start; n <= end; n++) nums.push(n);
    } else {
      const n = parseInt(segment, 10);
      if (!isNaN(n)) nums.push(n);
    }
  }
  return nums;
}

export function ParsedCitationText({
  text,
  sources,
  onScrollToRef,
}: ParsedCitationTextProps) {
  // Match bracket groups containing digits, commas, spaces, hyphens, semicolons
  const citationPattern = /\[([\d,;\s\-\u2013\u2014]+)\]/g;
  const parts: Array<{ kind: "text"; content: string } | { kind: "cite"; num: number }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = citationPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: "text", content: text.slice(lastIndex, match.index) });
    }
    const nums = expandCitationNumbers(match[1]);
    for (const num of nums) {
      parts.push({ kind: "cite", num });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ kind: "text", content: text.slice(lastIndex) });
  }

  return (
    <>
      {/* empty state: renders nothing when no data */}
      {parts.map((part, i) =>
        part.kind === "text" ? (
          <span key={i}>{part.content}</span>
        ) : (
          <CitationMarker
            key={i}
            number={part.num}
            source={sources[part.num - 1]}
            onScrollToRef={onScrollToRef}
          />
        )
      )}
    </>
  );
}

export { CitationMarker, CitationTooltip };
