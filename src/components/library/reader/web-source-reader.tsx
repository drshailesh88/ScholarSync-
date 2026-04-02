"use client";

import { useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import type { LibrarySource } from "@/lib/library/types";

interface WebSourceReaderProps {
  source: LibrarySource;
}

export function WebSourceReader({ source }: WebSourceReaderProps) {
  const sanitizedHtml = useMemo(
    () => source.contentHtml ? DOMPurify.sanitize(source.contentHtml) : "",
    [source.contentHtml]
  );

  return (
    <article>
      {/* Title */}
      <h1 className="font-serif text-[28px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--ink)] mb-4">
        {source.title}
      </h1>

      {/* Metadata line */}
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

      {/* Partial extraction warning */}
      {source.extractionState === "partial" && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          Content was partially extracted. Some sections may be missing or incomplete.
        </div>
      )}

      {/* Rendered HTML content */}
      {source.contentHtml ? (
        <div
          className="prose-library font-serif text-[17px] leading-[1.78] tracking-[0.005em] text-[var(--ink)]"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      ) : source.contentPlain ? (
        <div className="font-serif text-[17px] leading-[1.78] tracking-[0.005em] text-[var(--ink)] whitespace-pre-wrap">
          {source.contentPlain}
        </div>
      ) : (
        <p className="text-[var(--ink-muted)] text-sm italic">
          No extracted content available.
        </p>
      )}
    </article>
  );
}
