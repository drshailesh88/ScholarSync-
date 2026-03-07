"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  Notebook,
  CaretDown,
  CaretUp,
  CircleNotch,
  Tag,
  ChatCircleDots,
  ArrowRight,
  Article,
  Warning,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  getBatchPaperNotes,
  generatePaperOverview,
} from "@/lib/actions/source-notes";
import type { PaperNotes } from "@/lib/actions/source-notes";

interface SourceFile {
  id: string;
  name: string;
  selected: boolean;
  paperId?: number;
  status?: "ready" | "processing" | "error" | "embed_failed";
  isExtracted?: boolean;
}

interface ExtractionData {
  id: number;
  population: string | null;
  intervention: string | null;
  comparison: string | null;
  outcome: string | null;
  sample_size: number | null;
  study_design: string | null;
  effect_size: string | null;
  p_value: string | null;
  confidence_interval: string | null;
  risk_of_bias: string | null;
  evidence_level: string | null;
  human_verified: boolean | null;
  custom_extractions: Record<string, string | undefined> | null;
}

interface SourceNotesPanelProps {
  open: boolean;
  onClose: () => void;
  files: SourceFile[];
  extractions: Map<number, ExtractionData>;
  renderExtractionCard?: (paperId: number) => React.ReactNode;
  onSendMessage: (text: string) => void | Promise<void>;
}

interface PaperCardProps {
  notes: PaperNotes;
  isSelected: boolean;
  extractionCard: React.ReactNode;
  isGenerating: boolean;
  generationError: string | null;
  onGenerate: () => void;
  onAskQuestion: (question: string) => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Unable to generate notes right now. Please try again.";
}

function PaperCard({
  notes,
  isSelected,
  extractionCard,
  isGenerating,
  generationError,
  onGenerate,
  onAskQuestion,
}: PaperCardProps): React.ReactElement {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        isSelected
          ? "border-border bg-surface"
          : "border-border-subtle bg-surface/50 opacity-60"
      )}
    >
      <button
        onClick={() => setExpanded((value) => !value)}
        className="flex items-start gap-3 w-full text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
          <Article size={16} className="text-brand" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-ink leading-tight line-clamp-2">
            {notes.title}
          </h3>
          {notes.authors.length > 0 && (
            <p className="text-[10px] text-ink-muted mt-0.5 truncate">
              {notes.authors.slice(0, 3).join(", ")}
              {notes.authors.length > 3 && " et al."}
            </p>
          )}
          {!isSelected && (
            <span className="text-[10px] text-ink-muted italic">Not selected for chat</span>
          )}
        </div>

        <div className="shrink-0 p-1 text-ink-muted">
          {expanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 ml-11 space-y-3">
          {notes.overview ? (
            <>
              <p className="text-xs text-ink leading-relaxed">{notes.overview.summary}</p>

              {notes.overview.keyTopics.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {notes.overview.keyTopics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand/10 text-[10px] font-medium text-brand"
                    >
                      <Tag size={8} />
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {notes.overview.suggestedQuestions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] font-medium text-ink-muted flex items-center gap-1">
                    <ChatCircleDots size={10} />
                    Ask about this paper
                  </p>
                  {notes.overview.suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => onAskQuestion(question)}
                      className="w-full text-left text-[11px] text-ink-muted hover:text-brand px-2 py-1 rounded-lg hover:bg-brand/5 transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight
                        size={10}
                        className="text-brand/50 group-hover:text-brand shrink-0 transition-colors"
                      />
                      <span className="line-clamp-1">{question}</span>
                    </button>
                  ))}
                </div>
              )}

              <p className="text-[9px] text-ink-muted">
                Generated{" "}
                {new Date(notes.overview.generatedAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </>
          ) : (
            <div className="text-center py-3">
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
                  <CircleNotch size={14} className="animate-spin text-brand" />
                  Analyzing paper...
                </div>
              ) : (
                <>
                  {notes.abstract ? (
                    <p className="text-xs text-ink-muted leading-relaxed mb-2 line-clamp-3">
                      {notes.abstract}
                    </p>
                  ) : (
                    <p className="text-xs text-ink-muted mb-2">No summary available yet.</p>
                  )}
                  <button
                    onClick={onGenerate}
                    className="text-xs font-medium text-brand hover:text-brand-hover transition-colors"
                  >
                    Generate Notes
                  </button>
                  {generationError && (
                    <p className="text-[10px] text-red-500 mt-2">{generationError}</p>
                  )}
                </>
              )}
            </div>
          )}

          {extractionCard}
        </div>
      )}
    </div>
  );
}

export function SourceNotesPanel({
  open,
  onClose,
  files,
  extractions,
  renderExtractionCard,
  onSendMessage,
}: SourceNotesPanelProps): React.ReactElement | null {
  const [paperNotes, setPaperNotes] = useState<PaperNotes[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatingPapers, setGeneratingPapers] = useState<Set<number>>(new Set());
  const [generationErrors, setGenerationErrors] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (!open) {
      setAnimateIn(false);
      return;
    }

    const timer = window.setTimeout(() => setAnimateIn(true), 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const paperIds = files
      .filter((file) => file.paperId && file.status === "ready")
      .map((file) => file.paperId as number);

    if (paperIds.length === 0) {
      setPaperNotes([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getBatchPaperNotes(paperIds)
      .then((notes) => {
        if (cancelled) return;
        setPaperNotes(notes);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Failed to load paper notes.");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, files]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleGenerate = useCallback(async (paperId: number) => {
    setGenerationErrors((prev) => {
      const next = new Map(prev);
      next.delete(paperId);
      return next;
    });
    setGeneratingPapers((prev) => new Set(prev).add(paperId));

    try {
      const overview = await generatePaperOverview(paperId);
      setPaperNotes((prev) =>
        prev.map((note) => (note.paperId === paperId ? { ...note, overview } : note))
      );
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setGenerationErrors((prev) => {
        const next = new Map(prev);
        next.set(paperId, errorMessage);
        return next;
      });
    } finally {
      setGeneratingPapers((prev) => {
        const next = new Set(prev);
        next.delete(paperId);
        return next;
      });
    }
  }, []);

  const handleAskQuestion = useCallback(
    (question: string) => {
      void onSendMessage(question);
      onClose();
    },
    [onClose, onSendMessage]
  );

  const handleGenerateAll = useCallback(async () => {
    const missingOverviews = paperNotes.filter((note) => !note.overview);
    if (missingOverviews.length === 0) return;

    // Process in batches of 3 for controlled concurrency
    const BATCH_SIZE = 3;
    for (let i = 0; i < missingOverviews.length; i += BATCH_SIZE) {
      const batch = missingOverviews.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map((note) => handleGenerate(note.paperId)));
    }
  }, [handleGenerate, paperNotes]);

  const selectedPaperIds = useMemo(
    () =>
      new Set(
        files
          .filter((file) => file.selected && file.paperId)
          .map((file) => file.paperId as number)
      ),
    [files]
  );

  const sortedNotes = useMemo(
    () =>
      [...paperNotes].sort((a, b) => {
        const aSelected = selectedPaperIds.has(a.paperId) ? 0 : 1;
        const bSelected = selectedPaperIds.has(b.paperId) ? 0 : 1;
        return aSelected - bSelected;
      }),
    [paperNotes, selectedPaperIds]
  );

  if (!open) return null;

  const missingCount = paperNotes.filter((note) => !note.overview).length;
  const totalCount = paperNotes.length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200",
          animateIn ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-md h-full glass-panel border-l border-border shadow-2xl flex flex-col overflow-hidden transform transition-transform duration-200",
          animateIn ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Notebook size={18} className="text-brand" />
            <h2 className="text-sm font-semibold text-ink">Source Notes</h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-raised text-[10px] text-ink-muted">
              {totalCount} {totalCount === 1 ? "paper" : "papers"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            aria-label="Close source notes"
          >
            <X size={18} />
          </button>
        </div>

        {missingCount > 0 && !loading && (
          <div className="px-5 py-2.5 border-b border-border-subtle bg-brand/5 flex items-center justify-between">
            <span className="text-[11px] text-ink-muted">
              {missingCount} of {totalCount} papers need notes generated
            </span>
            <button
              onClick={handleGenerateAll}
              disabled={generatingPapers.size > 0}
              className="text-[11px] font-medium text-brand hover:text-brand-hover transition-colors disabled:opacity-50"
            >
              Generate All
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <CircleNotch size={24} className="animate-spin text-brand" />
              <p className="text-xs text-ink-muted">Loading paper notes...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Warning size={24} className="text-red-400" />
              <p className="text-xs text-ink-muted">{error}</p>
            </div>
          ) : sortedNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Notebook size={24} className="text-ink-muted" />
              <p className="text-xs text-ink-muted">No papers loaded yet.</p>
              <p className="text-[10px] text-ink-muted">
                Upload PDFs in the sidebar to see source notes.
              </p>
            </div>
          ) : (
            sortedNotes.map((note) => (
              <PaperCard
                key={note.paperId}
                notes={note}
                isSelected={selectedPaperIds.has(note.paperId)}
                extractionCard={
                  extractions.has(note.paperId) && renderExtractionCard
                    ? renderExtractionCard(note.paperId)
                    : null
                }
                isGenerating={generatingPapers.has(note.paperId)}
                generationError={generationErrors.get(note.paperId) ?? null}
                onGenerate={() => void handleGenerate(note.paperId)}
                onAskQuestion={handleAskQuestion}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
