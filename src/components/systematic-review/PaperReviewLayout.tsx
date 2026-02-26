"use client";

import { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Warning,
  FilePdf,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { PDFViewer } from "@/components/ui/pdf-viewer";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PaperForReview {
  paperId: number;
  title: string;
  authors: unknown;
  journal: string | null;
  year: number | null;
  abstract: string | null;
  doi: string | null;
  pdfUrl: string | null;
  screeningDecision: string | null;
  screeningReason: string | null;
}

interface PaperReviewLayoutProps {
  paper: PaperForReview;
  onDecision?: (
    paperId: number,
    decision: "include" | "exclude" | "uncertain",
    reason: string
  ) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onClose?: () => void;
  mode?: "screening" | "extraction" | "rob2";
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PaperReviewLayout({
  paper,
  onDecision,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  onClose,
  mode = "screening",
  children,
}: PaperReviewLayoutProps) {
  const [reason, setReason] = useState(paper.screeningReason || "");
  const [pdfUrl, setPdfUrl] = useState<string | null>(paper.pdfUrl);

  // Fetch signed PDF URL if available
  useEffect(() => {
    if (paper.pdfUrl) {
      setPdfUrl(paper.pdfUrl);
    } else if (paper.doi) {
      // Try to construct a likely PDF URL via Unpaywall
      setPdfUrl(null);
    }
  }, [paper.pdfUrl, paper.doi]);

  const authorList = Array.isArray(paper.authors)
    ? (paper.authors as string[]).join(", ")
    : "";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
        <div className="flex items-center gap-3">
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="p-1.5 text-ink-muted hover:text-ink rounded hover:bg-surface-raised"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <h3 className="text-sm font-semibold text-ink truncate max-w-[400px]">
            {paper.title}
          </h3>
          {hasNext && (
            <button
              onClick={onNext}
              className="p-1.5 text-ink-muted hover:text-ink rounded hover:bg-surface-raised"
            >
              <ArrowRight size={16} />
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-ink-muted hover:text-ink rounded hover:bg-surface-raised"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Split pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: PDF viewer or abstract */}
        <div className="w-1/2 border-r border-border overflow-hidden flex flex-col">
          {pdfUrl ? (
            <PDFViewer url={pdfUrl} className="flex-1" />
          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {/* Paper metadata */}
                <div>
                  <h4 className="text-base font-semibold text-ink mb-1">
                    {paper.title}
                  </h4>
                  {authorList && (
                    <p className="text-xs text-ink-muted">{authorList}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-ink-muted mt-1">
                    {paper.journal && <span>{paper.journal}</span>}
                    {paper.year && <span>({paper.year})</span>}
                  </div>
                </div>

                {/* Abstract */}
                {paper.abstract ? (
                  <div>
                    <div className="text-xs font-medium text-ink mb-1">
                      Abstract
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FilePdf
                      weight="duotone"
                      className="text-ink-muted mb-3"
                      size={40}
                    />
                    <p className="text-sm text-ink-muted">
                      No PDF or abstract available
                    </p>
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand hover:underline mt-2"
                      >
                        View on publisher site
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Assessment form */}
        <div className="w-1/2 overflow-y-auto p-6">
          {mode === "screening" && onDecision && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-ink">
                Screening Decision
              </h4>

              {/* Quick decision buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onDecision(paper.paperId, "include", reason)
                  }
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-medium border-2 flex items-center justify-center gap-2 transition-colors",
                    paper.screeningDecision === "include"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700"
                      : "border-border text-ink-muted hover:border-emerald-500/40 hover:bg-emerald-500/5"
                  )}
                >
                  <CheckCircle weight="bold" size={18} />
                  Include
                </button>
                <button
                  onClick={() =>
                    onDecision(paper.paperId, "exclude", reason)
                  }
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-medium border-2 flex items-center justify-center gap-2 transition-colors",
                    paper.screeningDecision === "exclude"
                      ? "bg-red-500/10 border-red-500 text-red-700"
                      : "border-border text-ink-muted hover:border-red-500/40 hover:bg-red-500/5"
                  )}
                >
                  <XCircle weight="bold" size={18} />
                  Exclude
                </button>
                <button
                  onClick={() =>
                    onDecision(paper.paperId, "uncertain", reason)
                  }
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-medium border-2 flex items-center justify-center gap-2 transition-colors",
                    paper.screeningDecision === "uncertain"
                      ? "bg-amber-500/10 border-amber-500 text-amber-700"
                      : "border-border text-ink-muted hover:border-amber-500/40 hover:bg-amber-500/5"
                  )}
                >
                  <Warning weight="bold" size={18} />
                  Uncertain
                </button>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Reason / Notes
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly state reason for decision..."
                  rows={3}
                  className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none resize-none"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-xs text-ink-muted">
                  Keyboard: <kbd className="px-1 bg-surface-raised rounded">I</kbd>=Include{" "}
                  <kbd className="px-1 bg-surface-raised rounded">E</kbd>=Exclude{" "}
                  <kbd className="px-1 bg-surface-raised rounded">U</kbd>=Uncertain
                </div>
                <div className="flex gap-2">
                  {hasPrevious && (
                    <button
                      onClick={onPrevious}
                      className="px-3 py-1.5 text-sm text-ink-muted hover:text-ink border border-border rounded hover:bg-surface-raised"
                    >
                      Previous
                    </button>
                  )}
                  {hasNext && (
                    <button
                      onClick={onNext}
                      className="px-3 py-1.5 text-sm bg-brand text-white rounded hover:bg-brand/90"
                    >
                      Next Paper
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Custom content for extraction / RoB2 modes */}
          {children}
        </div>
      </div>
    </div>
  );
}
