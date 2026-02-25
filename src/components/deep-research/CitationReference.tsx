"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { DeepResearchSource } from "./types";

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
      className="fixed z-50 w-80 p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl text-sm"
      style={{
        top: Math.min(position.top, window.innerHeight - 240),
        left: Math.min(position.left, window.innerWidth - 340),
      }}
    >
      <h4 className="font-semibold text-white text-sm leading-snug mb-1.5 line-clamp-2">
        {source.title}
      </h4>
      <p className="text-gray-400 text-xs mb-1">{authorsText}</p>
      <p className="text-gray-400 text-xs mb-2">
        {source.journal} {source.year && `(${source.year})`}
        {source.citationCount > 0 && (
          <span className="ml-2 text-gray-500">
            {source.citationCount.toLocaleString()} citations
          </span>
        )}
      </p>
      {source.abstract && (
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-2">
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
        {source.pdfUrl && (
          <a
            href={source.pdfUrl}
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

export function ParsedCitationText({
  text,
  sources,
  onScrollToRef,
}: ParsedCitationTextProps) {
  const citationPattern = /\[(\d+)\]/g;
  const parts: Array<{ kind: "text"; content: string } | { kind: "cite"; num: number }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = citationPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({ kind: "cite", num: parseInt(match[1], 10) });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ kind: "text", content: text.slice(lastIndex) });
  }

  return (
    <>
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
