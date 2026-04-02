"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  FilePdf,
  BookOpen,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { LibrarySource } from "@/lib/library/types";

const PDFViewer = dynamic(
  () => import("@/components/ui/pdf-viewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

type ViewMode = "abstract" | "pdf";

interface PaperReaderProps {
  source: LibrarySource;
}

export function PaperReader({ source }: PaperReaderProps) {
  const hasPdf = !!source.pdfStoragePath || !!source.url;
  const [viewMode, setViewMode] = useState<ViewMode>("abstract");

  return (
    <article>
      {/* Title */}
      <h1 className="font-serif text-[28px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--ink)] mb-4">
        {source.title}
      </h1>

      {/* Authors & metadata */}
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--ink-muted)] mb-2">
        {source.authors.length > 0 && (
          <span>{source.authors.join(", ")}</span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[var(--ink-muted)] mb-6">
        {source.journal && <span className="font-medium">{source.journal}</span>}
        {source.volume && <span>Vol. {source.volume}</span>}
        {source.issue && <span>Issue {source.issue}</span>}
        {source.year && <span>({source.year})</span>}
        {source.doi && (
          <span className="font-mono text-xs">
            DOI: {source.doi}
          </span>
        )}
      </div>

      {/* View toggle: Abstract / PDF */}
      {hasPdf && (
        <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
          <button
            onClick={() => setViewMode("abstract")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-sm transition-colors border-b-2 -mb-px",
              viewMode === "abstract"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            <BookOpen size={15} />
            Abstract
          </button>
          <button
            onClick={() => setViewMode("pdf")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-sm transition-colors border-b-2 -mb-px",
              viewMode === "pdf"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            <FilePdf size={15} />
            Full Text / PDF
          </button>
        </div>
      )}

      {/* Content */}
      {viewMode === "abstract" ? (
        <div>
          {source.abstract ? (
            <div className="font-serif text-[17px] leading-[1.78] tracking-[0.005em] text-[var(--ink)]">
              {source.abstract}
            </div>
          ) : (
            <p className="text-[var(--ink-muted)] text-sm italic">
              No abstract available.
            </p>
          )}

          {/* Additional paper metadata */}
          <div className="mt-8 space-y-3">
            {source.studyType && (
              <div className="text-sm">
                <span className="text-[var(--ink-muted)]">Study type: </span>
                <span className="text-[var(--ink)]">{source.studyType}</span>
              </div>
            )}
            {source.citationCount != null && source.citationCount > 0 && (
              <div className="text-sm">
                <span className="text-[var(--ink-muted)]">Citations: </span>
                <span className="text-[var(--ink)]">{source.citationCount.toLocaleString()}</span>
              </div>
            )}
            {source.pubmedId && (
              <div className="text-sm">
                <span className="text-[var(--ink-muted)]">PubMed ID: </span>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${source.pubmedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline inline-flex items-center gap-1"
                >
                  {source.pubmedId}
                  <ArrowSquareOut size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-16rem)]">
          <PDFViewer
            url={source.pdfStoragePath || source.url || undefined}
            title={source.title}
          />
        </div>
      )}
    </article>
  );
}
