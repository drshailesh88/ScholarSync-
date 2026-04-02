"use client";

import {
  ArrowSquareOut,
  ArrowClockwise,
  Spinner,
  FileX,
} from "@phosphor-icons/react";
import type { LibrarySource } from "@/lib/library/types";

interface ExtractionStateSurfaceProps {
  source: LibrarySource;
  onRetry?: () => void;
}

export function ExtractionStateSurface({
  source,
  onRetry,
}: ExtractionStateSurfaceProps) {
  const state = source.extractionState ?? "pending";

  return (
    <article>
      {/* Title always shows */}
      <h1 className="font-serif text-[28px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--ink)] mb-4">
        {source.title}
      </h1>

      {/* Metadata always shows */}
      <div className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] mb-8">
        {source.authors.length > 0 && (
          <span>{source.authors.join(", ")}</span>
        )}
        {source.domain && (
          <>
            {source.authors.length > 0 && <span aria-hidden>&middot;</span>}
            <span>{source.domain}</span>
          </>
        )}
        {source.year && (
          <>
            <span aria-hidden>&middot;</span>
            <span>{source.year}</span>
          </>
        )}
      </div>

      {/* State-specific surface */}
      {state === "pending" && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Spinner size={32} className="animate-spin text-[var(--ink-muted)]" />
          <div>
            <p className="text-sm font-medium text-[var(--ink)]">
              Extracting content...
            </p>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              This may take a moment. The page will update when ready.
            </p>
          </div>
          {/* Skeleton lines */}
          <div className="w-full max-w-[480px] mt-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded bg-[var(--surface-raised)] animate-pulse"
                style={{ width: `${80 - i * 8}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {state === "failed" && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <FileX size={40} className="text-[var(--ink-muted)]" />
          <div>
            <p className="text-sm font-medium text-[var(--ink)]">
              Content extraction failed
            </p>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              We couldn&apos;t extract the content from this source. You can still view it externally.
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[var(--brand)] px-4 py-2 text-sm text-white hover:bg-[var(--brand-hover)] transition-colors"
              >
                <ArrowSquareOut size={14} />
                Open original
              </a>
            )}
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors"
              >
                <ArrowClockwise size={14} />
                Retry extraction
              </button>
            )}
          </div>
        </div>
      )}

      {/* Snippet fallback for pending/failed states */}
      {source.snippet && (state === "pending" || state === "failed") && (
        <div className="mt-8 rounded-lg border border-[var(--border)] p-4">
          <p className="text-xs font-medium text-[var(--ink-muted)] mb-2 uppercase tracking-wider">
            Preview
          </p>
          <p className="text-sm text-[var(--ink)] leading-relaxed">
            {source.snippet}
          </p>
        </div>
      )}
    </article>
  );
}
