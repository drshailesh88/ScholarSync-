"use client";

import { useMemo, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";
import type { LibrarySource } from "@/lib/library/types";
import type { Annotation, AnnotationColor } from "@/lib/library/annotations";
import { useTextHighlighter } from "@/hooks/useTextHighlighter";
import { HighlightPopover } from "./highlight-popover";

interface WebSourceReaderProps {
  source: LibrarySource;
  highlights?: Annotation[];
  onCreateHighlight?: (
    selectedText: string,
    startOffset: number,
    endOffset: number,
    color: AnnotationColor,
    note?: string
  ) => void;
  onHighlightClick?: (annotation: Annotation) => void;
}

export function WebSourceReader({
  source,
  highlights = [],
  onCreateHighlight,
  onHighlightClick,
}: WebSourceReaderProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sanitizedHtml = useMemo(
    () => source.contentHtml ? DOMPurify.sanitize(source.contentHtml) : "",
    [source.contentHtml]
  );

  const { selection, clearSelection } = useTextHighlighter({
    containerRef: contentRef,
    highlights,
    onHighlightClick,
  });

  const handleHighlight = (color: AnnotationColor, note?: string) => {
    if (!selection || !onCreateHighlight) return;
    onCreateHighlight(
      selection.text,
      selection.anchorPayload.startOffset!,
      selection.anchorPayload.endOffset!,
      color,
      note
    );
    clearSelection();
  };

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

      {/* Rendered HTML content with highlighting support */}
      {source.contentHtml ? (
        <div
          ref={contentRef}
          className="prose-library font-serif text-[17px] leading-[1.78] tracking-[0.005em] text-[var(--ink)]"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      ) : source.contentPlain ? (
        <div
          ref={contentRef}
          className="font-serif text-[17px] leading-[1.78] tracking-[0.005em] text-[var(--ink)] whitespace-pre-wrap"
        >
          {source.contentPlain}
        </div>
      ) : (
        <p className="text-[var(--ink-muted)] text-sm italic">
          No extracted content available.
        </p>
      )}

      {/* Highlight popover on text selection */}
      {selection && onCreateHighlight && (
        <HighlightPopover
          position={{
            top: selection.rect.top - 8,
            left: selection.rect.left + selection.rect.width / 2,
          }}
          onHighlight={handleHighlight}
          onClose={clearSelection}
        />
      )}
    </article>
  );
}
