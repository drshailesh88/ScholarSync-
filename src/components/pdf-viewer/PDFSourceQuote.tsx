"use client";

import {
  PaperclipHorizontal,
  ArrowSquareOut,
  NotePencil,
  ClipboardText,
} from "@phosphor-icons/react";
import type { SourceQuote } from "@/lib/pdf/types";

interface PDFSourceQuoteProps {
  quote: SourceQuote;
  onShowInPDF: (pageNumber: number, startOffset: number, endOffset: number) => void;
  onCite?: (quote: SourceQuote) => void;
  onSaveAsNote?: (quote: SourceQuote) => void;
  onInsertAsDraft?: (text: string) => void;
  compact?: boolean;
}

export function PDFSourceQuote({
  quote,
  onShowInPDF,
  onCite,
  onSaveAsNote,
  onInsertAsDraft,
  compact = false,
}: PDFSourceQuoteProps) {
  return (
    <div className="mt-2 rounded-md bg-surface-raised border border-border overflow-hidden">
      {/* Source header */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-raised/50 border-b border-border">
        <PaperclipHorizontal size={13} className="text-ink-muted shrink-0" />
        <span className="text-xs text-ink-muted">
          Source: Page {quote.pageNumber}
          {quote.sectionName && `, ${quote.sectionName}`}
        </span>
      </div>

      {/* Quoted text */}
      {!compact && (
        <div className="px-2.5 py-2">
          <p className="text-xs text-ink/80 italic leading-relaxed line-clamp-3">
            &ldquo;{quote.quotedText}&rdquo;
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-t border-border">
        <button
          onClick={() =>
            onShowInPDF(quote.pageNumber, quote.startOffset, quote.endOffset)
          }
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-brand hover:bg-brand/10 transition-colors"
        >
          <ArrowSquareOut size={13} />
          Show in PDF
        </button>
        {onSaveAsNote && (
          <button
            onClick={() => onSaveAsNote(quote)}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <NotePencil size={13} />
            Save as note
          </button>
        )}
        {onCite && (
          <button
            onClick={() => onCite(quote)}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <PaperclipHorizontal size={13} />
            Cite
          </button>
        )}
        {onInsertAsDraft && (
          <button
            onClick={() => onInsertAsDraft(quote.quotedText)}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <ClipboardText size={13} />
            Insert
          </button>
        )}
      </div>
    </div>
  );
}
