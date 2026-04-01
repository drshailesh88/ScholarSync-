"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CircleNotch,
  HighlighterCircle,
  Note,
  Trash,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { WebSourceHighlightRecord } from "@/lib/actions/web-sources";

// ── Types ────────────────────────────────────────────────────────

type AnnotationColor = "yellow" | "green" | "red" | "blue" | "purple";

interface WebSourceData {
  id: number;
  title: string;
  url: string;
  domain: string;
  content_html: string | null;
  content_extracted: boolean;
  notes: string | null;
}

interface WebSourceReaderProps {
  source: WebSourceData;
  highlights: WebSourceHighlightRecord[];
  onClose: () => void;
  onExtract: (sourceId: number) => Promise<void>;
  onCreateHighlight: (input: {
    webSourceId: number;
    selectedText: string;
    startOffset: number;
    endOffset: number;
    color: AnnotationColor;
    note?: string;
  }) => Promise<void>;
  onUpdateHighlight: (
    highlightId: number,
    updates: { color?: AnnotationColor; note?: string | null }
  ) => Promise<void>;
  onDeleteHighlight: (highlightId: number) => Promise<void>;
  onUpdateNotes: (sourceId: number, notes: string | null) => Promise<void>;
}

// ── Color config ─────────────────────────────────────────────────

const HIGHLIGHT_COLORS: {
  value: AnnotationColor;
  bg: string;
  label: string;
}[] = [
  { value: "yellow", bg: "bg-yellow-200/60", label: "Yellow" },
  { value: "green", bg: "bg-green-200/60", label: "Green" },
  { value: "red", bg: "bg-red-200/60", label: "Red" },
  { value: "blue", bg: "bg-blue-200/60", label: "Blue" },
  { value: "purple", bg: "bg-purple-200/60", label: "Purple" },
];

const HIGHLIGHT_BG_MAP: Record<AnnotationColor, string> = {
  yellow: "rgba(253, 224, 71, 0.4)",
  green: "rgba(134, 239, 172, 0.4)",
  red: "rgba(252, 165, 165, 0.4)",
  blue: "rgba(147, 197, 253, 0.4)",
  purple: "rgba(196, 181, 253, 0.4)",
};

// ── Component ────────────────────────────────────────────────────

export function WebSourceReader({
  source,
  highlights,
  onClose,
  onExtract,
  onCreateHighlight,
  onUpdateHighlight,
  onDeleteHighlight,
  onUpdateNotes,
}: WebSourceReaderProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [extracting, setExtracting] = useState(false);
  const [selectedColor, setSelectedColor] = useState<AnnotationColor>("yellow");
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [generalNotes, setGeneralNotes] = useState(source.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(
    null
  );
  const [highlightNote, setHighlightNote] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerPosition, setColorPickerPosition] = useState({
    x: 0,
    y: 0,
  });
  const [pendingSelection, setPendingSelection] = useState<{
    text: string;
    startOffset: number;
    endOffset: number;
  } | null>(null);

  // Trigger extraction if needed
  const handleExtract = async () => {
    setExtracting(true);
    try {
      await onExtract(source.id);
    } finally {
      setExtracting(false);
    }
  };

  // Auto-extract on mount if not already done
  useEffect(() => {
    if (!source.content_extracted && !extracting) {
      handleExtract();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source.id]);

  // Apply highlights to rendered HTML
  useEffect(() => {
    if (!contentRef.current || !source.content_html) return;
    applyHighlightsToContent(contentRef.current, highlights);
  }, [highlights, source.content_html]);

  // Handle text selection for creating highlights
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !contentRef.current) return;

    const range = selection.getRangeAt(0);
    if (!contentRef.current.contains(range.commonAncestorContainer)) return;

    const text = selection.toString().trim();
    if (!text) return;

    // Calculate character offsets relative to content container's textContent
    const preRange = document.createRange();
    preRange.setStart(contentRef.current, 0);
    preRange.setEnd(range.startContainer, range.startOffset);
    const startOffset = preRange.toString().length;
    const endOffset = startOffset + text.length;

    // Show color picker at selection position
    const rect = range.getBoundingClientRect();
    setColorPickerPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setPendingSelection({ text, startOffset, endOffset });
    setShowColorPicker(true);
  }, []);

  // Create highlight with selected color
  const handleCreateHighlight = async (color: AnnotationColor) => {
    if (!pendingSelection) return;

    await onCreateHighlight({
      webSourceId: source.id,
      selectedText: pendingSelection.text,
      startOffset: pendingSelection.startOffset,
      endOffset: pendingSelection.endOffset,
      color,
    });

    window.getSelection()?.removeAllRanges();
    setShowColorPicker(false);
    setPendingSelection(null);
  };

  // Save general notes
  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      await onUpdateNotes(source.id, generalNotes || null);
    } finally {
      setSavingNotes(false);
    }
  };

  // Save note on a highlight
  const handleSaveHighlightNote = async () => {
    if (activeHighlightId === null) return;
    await onUpdateHighlight(activeHighlightId, {
      note: highlightNote || null,
    });
    setActiveHighlightId(null);
    setHighlightNote("");
  };

  // Close color picker on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showColorPicker) {
          setShowColorPicker(false);
          setPendingSelection(null);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showColorPicker, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex bg-[var(--surface-base)]">
      {/* Header */}
      <div className="flex w-full flex-col">
        <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              aria-label="Close reader"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-black/[0.04] hover:text-ink"
              onClick={onClose}
              type="button"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-medium text-ink">
                {source.title}
              </h1>
              <p className="truncate text-xs text-ink-muted">{source.domain}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Color selector */}
            <div className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-1">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.value}
                  aria-label={`${c.label} highlight`}
                  className={cn(
                    "h-5 w-5 rounded-full transition-all",
                    c.bg,
                    selectedColor === c.value &&
                      "ring-2 ring-[var(--brand)] ring-offset-1"
                  )}
                  onClick={() => setSelectedColor(c.value)}
                  type="button"
                />
              ))}
            </div>

            <button
              aria-label="Toggle notes panel"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                showNotesPanel
                  ? "bg-[var(--brand)]/10 text-[var(--brand)]"
                  : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
              )}
              onClick={() => setShowNotesPanel(!showNotesPanel)}
              type="button"
            >
              <Note size={18} />
            </button>

            <a
              className="text-xs text-ink-muted hover:text-brand"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open original
            </a>
          </div>
        </header>

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Reader content */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-[720px]">
              {!source.content_extracted || extracting ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <CircleNotch
                    className="animate-spin text-ink-muted"
                    size={32}
                  />
                  <p className="text-sm text-ink-muted">
                    Extracting content...
                  </p>
                </div>
              ) : source.content_html ? (
                <div
                  ref={contentRef}
                  className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-[1.7]"
                  dangerouslySetInnerHTML={{ __html: source.content_html }}
                  onMouseUp={handleMouseUp}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <p className="text-sm text-ink-muted">
                    Could not extract content from this page.
                  </p>
                  <a
                    className="text-sm text-brand hover:underline"
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open original page
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Notes sidebar */}
          {showNotesPanel && (
            <aside className="w-80 shrink-0 overflow-y-auto border-l border-[var(--border)] bg-[var(--surface-raised)] p-4">
              {/* General notes */}
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Notes
                </h3>
                <textarea
                  className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface-base)] p-3 text-sm text-ink placeholder:text-ink-muted focus:border-[var(--brand)] focus:outline-none"
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  onBlur={handleSaveNotes}
                  placeholder="Add notes about this source..."
                  rows={4}
                  value={generalNotes}
                />
                {savingNotes && (
                  <p className="mt-1 text-xs text-ink-muted">Saving...</p>
                )}
              </div>

              {/* Highlights list */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Highlights ({highlights.length})
                </h3>
                {highlights.length === 0 ? (
                  <p className="text-xs text-ink-muted">
                    Select text to create highlights.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {highlights.map((h) => (
                      <div
                        key={h.id}
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface-base)] p-3"
                        style={{
                          borderLeftWidth: 3,
                          borderLeftColor:
                            HIGHLIGHT_BG_MAP[
                              (h.color as AnnotationColor) || "yellow"
                            ],
                        }}
                      >
                        <p className="text-sm italic text-ink">
                          &ldquo;{h.selected_text.slice(0, 100)}
                          {h.selected_text.length > 100 ? "..." : ""}
                          &rdquo;
                        </p>

                        {activeHighlightId === h.id ? (
                          <div className="mt-2">
                            <textarea
                              className="w-full resize-none rounded border border-[var(--border)] bg-[var(--surface-base)] p-2 text-xs text-ink focus:border-[var(--brand)] focus:outline-none"
                              onChange={(e) =>
                                setHighlightNote(e.target.value)
                              }
                              placeholder="Add a note..."
                              rows={2}
                              value={highlightNote}
                            />
                            <div className="mt-1 flex gap-1">
                              <button
                                className="rounded px-2 py-1 text-xs text-brand hover:bg-[var(--brand)]/10"
                                onClick={handleSaveHighlightNote}
                                type="button"
                              >
                                Save
                              </button>
                              <button
                                className="rounded px-2 py-1 text-xs text-ink-muted hover:bg-black/[0.04]"
                                onClick={() => {
                                  setActiveHighlightId(null);
                                  setHighlightNote("");
                                }}
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : h.note ? (
                          <p className="mt-1 text-xs text-ink-muted">
                            {h.note}
                          </p>
                        ) : null}

                        <div className="mt-2 flex items-center gap-1">
                          <button
                            aria-label="Edit note"
                            className="flex h-6 w-6 items-center justify-center rounded text-ink-muted hover:text-ink"
                            onClick={() => {
                              setActiveHighlightId(h.id);
                              setHighlightNote(h.note || "");
                            }}
                            type="button"
                          >
                            <HighlighterCircle size={14} />
                          </button>
                          <button
                            aria-label="Delete highlight"
                            className="flex h-6 w-6 items-center justify-center rounded text-ink-muted hover:text-red-500"
                            onClick={() => onDeleteHighlight(h.id)}
                            type="button"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Floating color picker on text selection */}
      {showColorPicker && pendingSelection && (
        <div
          className="fixed z-[60] flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-2 py-1 shadow-lg"
          style={{
            left: colorPickerPosition.x,
            top: colorPickerPosition.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {HIGHLIGHT_COLORS.map((c) => (
            <button
              key={c.value}
              aria-label={`Highlight ${c.label}`}
              className={cn("h-6 w-6 rounded-full transition-all", c.bg)}
              onClick={() => handleCreateHighlight(c.value)}
              type="button"
            />
          ))}
          <button
            aria-label="Cancel"
            className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-ink-muted hover:text-ink"
            onClick={() => {
              setShowColorPicker(false);
              setPendingSelection(null);
              window.getSelection()?.removeAllRanges();
            }}
            type="button"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Highlight rendering helper ───────────────────────────────────

function applyHighlightsToContent(
  container: HTMLElement,
  highlights: WebSourceHighlightRecord[]
) {
  // Reset any previously applied highlights
  container.querySelectorAll("mark[data-highlight-id]").forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(
        document.createTextNode(mark.textContent || ""),
        mark
      );
      parent.normalize();
    }
  });

  if (highlights.length === 0) return;

  // Sort highlights by start_offset descending so we can apply from end to start
  // without invalidating earlier offsets
  const sorted = [...highlights].sort(
    (a, b) => b.start_offset - a.start_offset
  );

  for (const highlight of sorted) {
    try {
      applyHighlight(container, highlight);
    } catch {
      // Silently skip highlights that can't be applied (content may have changed)
    }
  }
}

function applyHighlight(
  container: HTMLElement,
  highlight: WebSourceHighlightRecord
) {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  let currentOffset = 0;
  let startNode: Text | null = null;
  let startNodeOffset = 0;
  let endNode: Text | null = null;
  let endNodeOffset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const nodeLength = node.textContent?.length || 0;
    const nodeEnd = currentOffset + nodeLength;

    if (!startNode && highlight.start_offset < nodeEnd) {
      startNode = node;
      startNodeOffset = highlight.start_offset - currentOffset;
    }

    if (highlight.end_offset <= nodeEnd) {
      endNode = node;
      endNodeOffset = highlight.end_offset - currentOffset;
      break;
    }

    currentOffset = nodeEnd;
  }

  if (!startNode || !endNode) return;

  const range = document.createRange();
  range.setStart(startNode, startNodeOffset);
  range.setEnd(endNode, endNodeOffset);

  const mark = document.createElement("mark");
  mark.setAttribute("data-highlight-id", String(highlight.id));
  mark.style.backgroundColor =
    HIGHLIGHT_BG_MAP[(highlight.color as AnnotationColor) || "yellow"];
  mark.style.borderRadius = "2px";
  mark.style.cursor = "pointer";

  range.surroundContents(mark);
}
