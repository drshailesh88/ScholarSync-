"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsOutSimple,
  X,
  Robot,
  TextAlignLeft,
  FileText,
  ArrowFatLineRight,
  CircleNotch,
  CheckCircle,
  XCircle,
  Warning,
  CaretDown,
  Highlighter,
  Crosshair,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PaperChunk {
  id: number;
  chunkIndex: number;
  text: string;
  sectionType: string | null;
  pageNumber: number | null;
  highlightPriority: number;
}

interface ScreeningReason {
  criterion: string;
  type: "inclusion" | "exclusion";
  relevantChunks: number[]; // chunk IDs
  explanation: string;
}

export interface ScreeningPaper {
  paperId: number;
  ppId: number;
  title: string;
  authors: unknown;
  journal: string | null;
  year: number | null;
  abstract: string | null;
  doi: string | null;
  pmid: string | null;
  pdfUrl: string | null;
  pdfStoragePath: string | null;
  screeningDecision: string | null;
  screeningReason: string | null;
  aiDecision: string | null;
  aiReason: string | null;
}

type StageView = "title-abstract" | "full-text";

const EXCLUSION_REASONS = [
  "Wrong study design",
  "Wrong population",
  "Wrong intervention/exposure",
  "Wrong comparator",
  "Wrong outcome",
  "Wrong setting",
  "Duplicate",
  "Not primary research",
  "Not in English",
  "Full text unavailable",
  "Other",
] as const;

interface ScreeningPDFViewerProps {
  paper: ScreeningPaper;
  projectId: number;
  onDecision: (
    paperId: number,
    decision: "include" | "exclude" | "maybe",
    reason?: string
  ) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ScreeningPDFViewer({
  paper,
  projectId,
  onDecision,
  onClose,
}: ScreeningPDFViewerProps) {
  // PDF state
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Stage toggle
  const [stageView, setStageView] = useState<StageView>(
    paper.pdfUrl || paper.pdfStoragePath ? "full-text" : "title-abstract"
  );

  // Chunks & AI highlights
  const [chunks, setChunks] = useState<PaperChunk[]>([]);
  const [chunksLoading, setChunksLoading] = useState(false);
  const [screeningReasons, setScreeningReasons] = useState<ScreeningReason[]>(
    []
  );

  // Exclusion reason capture
  const [exclusionDropdown, setExclusionDropdown] = useState<string>(
    EXCLUSION_REASONS[0]
  );
  const [exclusionFreeText, setExclusionFreeText] = useState("");
  const [showExclusionForm, setShowExclusionForm] = useState(false);

  // Active highlight chunk (for "jump to relevant section")
  const [activeChunkId, setActiveChunkId] = useState<number | null>(null);

  // PDF file source
  const pdfFile = useMemo(() => {
    if (paper.pdfStoragePath) {
      return `/api/pdf/serve?path=${encodeURIComponent(paper.pdfStoragePath)}`;
    }
    if (paper.pdfUrl) return paper.pdfUrl;
    return null;
  }, [paper.pdfUrl, paper.pdfStoragePath]);

  // Load paper chunks
  useEffect(() => {
    async function loadChunks() {
      setChunksLoading(true);
      try {
        const res = await fetch(
          `/api/systematic-review/paper-chunks?paperId=${paper.paperId}&projectId=${projectId}`
        );
        if (res.ok) {
          const data = await res.json();
          setChunks(data.chunks ?? []);
          setScreeningReasons(data.screeningReasons ?? []);
        }
      } catch {
        // Silently fail - chunks are optional enhancement
      } finally {
        setChunksLoading(false);
      }
    }
    loadChunks();
  }, [paper.paperId, projectId]);

  // PDF callbacks
  const onDocumentLoadSuccess = useCallback(
    ({ numPages: total }: { numPages: number }) => {
      setNumPages(total);
      setPageNumber(1);
      setPdfLoading(false);
      setPdfError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setPdfError(err.message || "Failed to load PDF");
    setPdfLoading(false);
  }, []);

  // Navigation
  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const fitWidth = useCallback(() => {
    setScale(1.0);
  }, []);

  // Jump to chunk page
  const jumpToChunk = useCallback(
    (chunk: PaperChunk) => {
      if (chunk.pageNumber) {
        setPageNumber(chunk.pageNumber);
        setActiveChunkId(chunk.id);
        setStageView("full-text");
        // Auto-clear highlight after 3 seconds
        setTimeout(() => setActiveChunkId(null), 3000);
      }
    },
    []
  );

  // Handle full exclusion with reason
  const handleExcludeWithReason = useCallback(() => {
    const reason =
      exclusionFreeText.trim().length > 0
        ? `${exclusionDropdown}: ${exclusionFreeText.trim()}`
        : exclusionDropdown;
    onDecision(paper.paperId, "exclude", reason);
    setShowExclusionForm(false);
  }, [exclusionDropdown, exclusionFreeText, paper.paperId, onDecision]);

  // Group chunks by section
  const chunksBySection = useMemo(() => {
    const grouped: Record<string, PaperChunk[]> = {};
    for (const chunk of chunks) {
      const section = chunk.sectionType || "other";
      if (!grouped[section]) grouped[section] = [];
      grouped[section].push(chunk);
    }
    return grouped;
  }, [chunks]);

  // Relevant chunks (high priority or matched by screening reasons)
  const relevantChunkIds = useMemo(() => {
    const ids = new Set<number>();
    // Add chunks referenced by screening reasons
    for (const reason of screeningReasons) {
      for (const cid of reason.relevantChunks) {
        ids.add(cid);
      }
    }
    // Add high-priority chunks
    for (const chunk of chunks) {
      if (chunk.highlightPriority >= 0.7) {
        ids.add(chunk.id);
      }
    }
    return ids;
  }, [chunks, screeningReasons]);

  // Format authors
  const authorsStr = useMemo(() => {
    if (!paper.authors) return "";
    if (typeof paper.authors === "string") return paper.authors;
    if (Array.isArray(paper.authors)) return paper.authors.join(", ");
    return "";
  }, [paper.authors]);

  const hasPdf = !!(paper.pdfUrl || paper.pdfStoragePath);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          {/* Stage toggle */}
          <div className="flex items-center bg-surface-raised rounded-lg p-0.5">
            <button
              onClick={() => setStageView("title-abstract")}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5",
                stageView === "title-abstract"
                  ? "bg-brand text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              <TextAlignLeft size={14} />
              Title/Abstract
            </button>
            <button
              onClick={() => setStageView("full-text")}
              disabled={!hasPdf}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5",
                stageView === "full-text"
                  ? "bg-brand text-white shadow-sm"
                  : "text-ink-muted hover:text-ink",
                !hasPdf && "opacity-30 cursor-not-allowed"
              )}
            >
              <FileText size={14} />
              Full Text
            </button>
          </div>

          {/* PDF controls (only in full-text view) */}
          {stageView === "full-text" && hasPdf && (
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <CaretLeft size={16} />
              </button>
              <span className="text-xs text-ink tabular-nums min-w-[4rem] text-center">
                {pdfLoading ? "..." : `${pageNumber} / ${numPages}`}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <CaretRight size={16} />
              </button>

              <div className="w-px h-4 bg-border mx-1" />

              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30"
                aria-label="Zoom out"
              >
                <MagnifyingGlassMinus size={16} />
              </button>
              <span className="text-xs text-ink-muted tabular-nums min-w-[2.5rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30"
                aria-label="Zoom in"
              >
                <MagnifyingGlassPlus size={16} />
              </button>
              <button
                onClick={fitWidth}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
                aria-label="Fit width"
              >
                <ArrowsOutSimple size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Paper title + close */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm text-ink font-medium truncate max-w-md">
            {paper.title}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors shrink-0"
            aria-label="Close screening viewer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Split-pane body: PDF viewer (70%) | Controls (30%) */}
      <div className="flex-1 flex overflow-hidden">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT: PDF / Title-Abstract Viewer (70%) */}
        {/* ---------------------------------------------------------------- */}
        <div className="w-[70%] flex flex-col border-r border-border bg-surface/30">
          {stageView === "title-abstract" ? (
            /* Title/Abstract View */
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-ink leading-tight mb-3">
                    {paper.title}
                  </h1>
                  {authorsStr && (
                    <p className="text-sm text-ink-muted mb-2">{authorsStr}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-ink-muted">
                    {paper.journal && <span>{paper.journal}</span>}
                    {paper.year && <span>({paper.year})</span>}
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline"
                      >
                        DOI
                      </a>
                    )}
                    {paper.pmid && (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline"
                      >
                        PubMed
                      </a>
                    )}
                  </div>
                </div>

                {paper.abstract ? (
                  <GlassPanel className="p-5">
                    <h2 className="text-sm font-semibold text-ink mb-3 flex items-center gap-1.5">
                      <TextAlignLeft weight="duotone" size={16} className="text-brand" />
                      Abstract
                    </h2>
                    <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                      {paper.abstract}
                    </p>
                  </GlassPanel>
                ) : (
                  <GlassPanel className="p-5 text-center">
                    <p className="text-sm text-ink-muted">
                      No abstract available for this paper.
                    </p>
                  </GlassPanel>
                )}

                {hasPdf && (
                  <button
                    onClick={() => setStageView("full-text")}
                    className="w-full py-3 border border-brand/30 rounded-xl text-brand text-sm font-medium hover:bg-brand/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText weight="duotone" size={18} />
                    Open Full-Text PDF
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Full-Text PDF View */
            <div className="flex-1 overflow-auto flex justify-center py-4 bg-surface/50 relative">
              {!pdfFile ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <FileText
                    size={40}
                    weight="duotone"
                    className="text-ink-muted/30"
                  />
                  <p className="text-sm text-ink-muted">No PDF available</p>
                  <button
                    onClick={() => setStageView("title-abstract")}
                    className="text-xs text-brand hover:underline"
                  >
                    View title/abstract instead
                  </button>
                </div>
              ) : pdfError ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X size={24} className="text-red-500" />
                  </div>
                  <p className="text-sm text-ink-muted">Failed to load PDF</p>
                  <p className="text-xs text-ink-muted max-w-sm text-center">
                    {pdfError}
                  </p>
                </div>
              ) : (
                <Document
                  file={pdfFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex flex-col items-center justify-center gap-3 py-20">
                      <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-ink-muted">Loading PDF...</p>
                    </div>
                  }
                >
                  <div className="relative">
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      className="shadow-xl rounded-lg"
                      loading={
                        <div className="flex items-center justify-center py-20">
                          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                        </div>
                      }
                    />

                    {/* AI Highlight overlay for relevant chunks on this page */}
                    {chunks
                      .filter(
                        (c) =>
                          c.pageNumber === pageNumber &&
                          relevantChunkIds.has(c.id)
                      )
                      .map((chunk) => (
                        <div
                          key={chunk.id}
                          className={cn(
                            "absolute left-2 right-2 rounded-md pointer-events-none transition-all duration-300",
                            activeChunkId === chunk.id
                              ? "bg-brand/20 ring-2 ring-brand/40 animate-pulse"
                              : "bg-yellow-400/15 border-l-2 border-yellow-500/50"
                          )}
                          style={{
                            top: `${Math.max(
                              5,
                              (chunk.chunkIndex % 10) * 10
                            )}%`,
                            height: "8%",
                          }}
                        />
                      ))}
                  </div>
                </Document>
              )}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT: Screening Controls (30%) */}
        {/* ---------------------------------------------------------------- */}
        <div className="w-[30%] flex flex-col bg-surface overflow-y-auto">
          {/* Decision section */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-ink mb-3">
              Screening Decision
            </h3>

            {/* Current decision badge */}
            {paper.screeningDecision && (
              <div
                className={cn(
                  "mb-3 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2",
                  paper.screeningDecision === "include"
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : paper.screeningDecision === "exclude"
                      ? "bg-red-500/10 text-red-600 border border-red-500/20"
                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                )}
              >
                {paper.screeningDecision === "include" && (
                  <CheckCircle weight="bold" size={16} />
                )}
                {paper.screeningDecision === "exclude" && (
                  <XCircle weight="bold" size={16} />
                )}
                {paper.screeningDecision === "maybe" && (
                  <Warning weight="bold" size={16} />
                )}
                Currently: {paper.screeningDecision}
              </div>
            )}

            {/* Decision buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onDecision(paper.paperId, "include")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                  paper.screeningDecision === "include"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
                )}
              >
                <CheckCircle weight="bold" size={16} />
                Include
              </button>

              <button
                onClick={() => {
                  if (stageView === "full-text") {
                    setShowExclusionForm(true);
                  } else {
                    onDecision(paper.paperId, "exclude");
                  }
                }}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                  paper.screeningDecision === "exclude"
                    ? "bg-red-500 text-white shadow-sm"
                    : "border border-red-500/30 text-red-600 hover:bg-red-500/10"
                )}
              >
                <XCircle weight="bold" size={16} />
                Exclude
              </button>

              <button
                onClick={() => onDecision(paper.paperId, "maybe")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                  paper.screeningDecision === "maybe"
                    ? "bg-amber-500 text-white shadow-sm"
                    : "border border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                )}
              >
                <Warning weight="bold" size={16} />
                Uncertain
              </button>
            </div>

            {/* Exclusion reason form (shown in full-text mode) */}
            {showExclusionForm && (
              <GlassPanel className="mt-3 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">
                    Exclusion Reason
                  </span>
                  <button
                    onClick={() => setShowExclusionForm(false)}
                    className="text-ink-muted hover:text-ink"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="relative">
                  <select aria-label="Select option"
                    value={exclusionDropdown}
                    onChange={(e) =>
                      setExclusionDropdown(e.target.value)
                    }
                    className="w-full px-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-ink appearance-none pr-8 focus:ring-2 focus:ring-brand/40 outline-none"
                  >
                    {EXCLUSION_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                  />
                </div>

                <textarea aria-label="Text area"
                  value={exclusionFreeText}
                  onChange={(e) => setExclusionFreeText(e.target.value)}
                  placeholder="Additional details (optional)..."
                  rows={2}
                  className="w-full px-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-ink placeholder:text-ink-muted resize-none focus:ring-2 focus:ring-brand/40 outline-none"
                />

                <button
                  onClick={handleExcludeWithReason}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Confirm Exclusion
                </button>
              </GlassPanel>
            )}
          </div>

          {/* AI Screening Reasoning */}
          {paper.aiDecision && (
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-ink mb-2 flex items-center gap-1.5">
                <Robot weight="duotone" size={16} className="text-brand" />
                AI Assessment
              </h3>
              <div
                className={cn(
                  "px-3 py-2 rounded-lg text-xs mb-2",
                  paper.aiDecision === "include"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : paper.aiDecision === "exclude"
                      ? "bg-red-500/10 text-red-600"
                      : "bg-amber-500/10 text-amber-600"
                )}
              >
                <span className="font-medium">Decision: </span>
                {paper.aiDecision}
              </div>
              {paper.aiReason && (
                <p className="text-xs text-ink-muted leading-relaxed">
                  {paper.aiReason}
                </p>
              )}
            </div>
          )}

          {/* Jump to Relevant Sections */}
          {chunks.length > 0 && (
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-1.5">
                <Crosshair weight="duotone" size={16} className="text-brand" />
                Relevant Sections
                {chunksLoading && (
                  <CircleNotch
                    weight="bold"
                    className="animate-spin text-ink-muted ml-1"
                    size={12}
                  />
                )}
              </h3>

              {/* Screening reasons with jump links */}
              {/* empty state: no data, no results, nothing here */}
              {screeningReasons.length === 0 && (
                <p className="text-xs text-ink-muted py-2">no results yet. nothing here to display.</p>
              )}
              {screeningReasons.length > 0 && (
                <div className="space-y-2 mb-3">
                  {screeningReasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-lg p-2.5 text-xs",
                        reason.type === "inclusion"
                          ? "bg-emerald-500/5 border border-emerald-500/20"
                          : "bg-red-500/5 border border-red-500/20"
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={cn(
                            "font-semibold",
                            reason.type === "inclusion"
                              ? "text-emerald-600"
                              : "text-red-600"
                          )}
                        >
                          {reason.type === "inclusion" ? "+" : "-"}{" "}
                          {reason.criterion}
                        </span>
                      </div>
                      <p className="text-ink-muted mb-1.5">
                        {reason.explanation}
                      </p>
                      {reason.relevantChunks.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {reason.relevantChunks.map((chunkId) => {
                            const chunk = chunks.find(
                              (c) => c.id === chunkId
                            );
                            if (!chunk) return null;
                            return (
                              <button
                                key={chunkId}
                                onClick={() => jumpToChunk(chunk)}
                                className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs hover:bg-brand/20 transition-colors flex items-center gap-1"
                              >
                                <ArrowFatLineRight size={10} />
                                {chunk.sectionType || "p."}
                                {chunk.pageNumber ?? "?"}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* High-priority chunks */}
              {chunks.filter((c) => c.highlightPriority >= 0.7).length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-ink-muted flex items-center gap-1">
                    <Highlighter size={12} />
                    High-relevance passages
                  </span>
                  {chunks
                    .filter((c) => c.highlightPriority >= 0.7)
                    .sort((a, b) => b.highlightPriority - a.highlightPriority)
                    .slice(0, 8)
                    .map((chunk) => (
                      <button
                        key={chunk.id}
                        onClick={() => jumpToChunk(chunk)}
                        className={cn(
                          "w-full text-left p-2 rounded-lg border transition-colors text-xs",
                          activeChunkId === chunk.id
                            ? "border-brand/40 bg-brand/5"
                            : "border-border hover:border-brand/20 hover:bg-surface-raised"
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-ink-muted font-medium">
                            {chunk.sectionType ?? "Section"} &middot; p.
                            {chunk.pageNumber ?? "?"}
                          </span>
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded text-[10px] font-medium",
                              chunk.highlightPriority >= 0.9
                                ? "bg-brand/20 text-brand"
                                : "bg-amber-500/10 text-amber-600"
                            )}
                          >
                            {Math.round(chunk.highlightPriority * 100)}%
                          </span>
                        </div>
                        <p className="text-ink-muted line-clamp-2 leading-relaxed">
                          {chunk.text.slice(0, 150)}
                          {chunk.text.length > 150 ? "..." : ""}
                        </p>
                      </button>
                    ))}
                </div>
              )}

              {/* Section overview */}
              {Object.keys(chunksBySection).length > 0 &&
                screeningReasons.length === 0 &&
                chunks.filter((c) => c.highlightPriority >= 0.7).length ===
                  0 && (
                  <div className="space-y-1">
                    <span className="text-xs text-ink-muted">
                      Jump to section:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(chunksBySection).map(
                        ([section, sChunks]) => {
                          const firstChunk = sChunks.find(
                            (c) => c.pageNumber
                          );
                          if (!firstChunk) return null;
                          return (
                            <button
                              key={section}
                              onClick={() => jumpToChunk(firstChunk)}
                              className="px-2 py-1 bg-surface-raised border border-border rounded text-xs text-ink-muted hover:text-ink hover:border-brand/20 transition-colors capitalize"
                            >
                              {section}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Paper metadata footer */}
          <div className="p-4 mt-auto">
            <div className="text-xs text-ink-muted space-y-1">
              {paper.screeningReason && (
                <div>
                  <span className="font-medium text-ink">
                    Previous reason:{" "}
                  </span>
                  {paper.screeningReason}
                </div>
              )}
              <div className="flex items-center gap-3">
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    DOI
                  </a>
                )}
                {paper.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    PubMed
                  </a>
                )}
              </div>
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="mt-3 pt-3 border-t border-border/50 text-xs text-ink-muted/60">
              <kbd className="px-1 bg-surface-raised rounded">Esc</kbd> Close
              &middot;{" "}
              <kbd className="px-1 bg-surface-raised rounded">I</kbd> Include
              &middot;{" "}
              <kbd className="px-1 bg-surface-raised rounded">E</kbd> Exclude
              &middot;{" "}
              <kbd className="px-1 bg-surface-raised rounded">U</kbd> Uncertain
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
