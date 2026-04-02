"use client";

import { useState } from "react";
import {
  NotePencil,
  Info,
  HighlighterCircle,
  Trash,
  PencilSimple,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { LibrarySource } from "@/lib/library/types";
import type { Annotation, AnnotationColor } from "@/lib/library/annotations";
import type { ReaderMode } from "./reader-view";

type PanelTab = "notes" | "metadata" | "highlights";

interface WorkbenchPanelProps {
  source: LibrarySource;
  mode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
  annotations?: Annotation[];
  onCreateNote?: (note: string) => void;
  onUpdateAnnotation?: (input: { id: number; note?: string | null; color?: AnnotationColor }) => void;
  onDeleteAnnotation?: (id: number) => void;
  onHighlightClick?: (annotation: Annotation) => void;
}

export function WorkbenchPanel({
  source,
  annotations = [],
  onCreateNote,
  onUpdateAnnotation,
  onDeleteAnnotation,
  onHighlightClick,
}: WorkbenchPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("notes");

  const highlights = annotations.filter((a) => a.selectedText != null);
  const generalNotes = annotations.filter(
    (a) => a.selectedText == null && a.note != null
  );

  const tabs: { key: PanelTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "notes", label: "Notes", icon: <NotePencil size={15} />, count: generalNotes.length || undefined },
    { key: "metadata", label: "Metadata", icon: <Info size={15} /> },
    { key: "highlights", label: "Highlights", icon: <HighlighterCircle size={15} />, count: highlights.length || undefined },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-[var(--border)] shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors border-b-2 -mb-px flex-1 justify-center",
              activeTab === tab.key
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count != null && (
              <span className="ml-1 text-[10px] bg-[var(--surface-raised)] rounded-full px-1.5 py-0.5">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "notes" && (
          <NotesTab
            source={source}
            notes={generalNotes}
            onCreateNote={onCreateNote}
            onUpdateAnnotation={onUpdateAnnotation}
            onDeleteAnnotation={onDeleteAnnotation}
          />
        )}
        {activeTab === "metadata" && <MetadataTab source={source} />}
        {activeTab === "highlights" && (
          <HighlightsTab
            highlights={highlights}
            onHighlightClick={onHighlightClick}
            onUpdateAnnotation={onUpdateAnnotation}
            onDeleteAnnotation={onDeleteAnnotation}
          />
        )}
      </div>
    </div>
  );
}

// ── Notes Tab ──────────────────────────────────────────────────

function NotesTab({
  source,
  notes,
  onCreateNote,
  onUpdateAnnotation,
  onDeleteAnnotation,
}: {
  source: LibrarySource;
  notes: Annotation[];
  onCreateNote?: (note: string) => void;
  onUpdateAnnotation?: (input: { id: number; note?: string | null }) => void;
  onDeleteAnnotation?: (id: number) => void;
}) {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = () => {
    if (!newNote.trim() || !onCreateNote) return;
    onCreateNote(newNote.trim());
    setNewNote("");
  };

  const handleEditSave = (id: number) => {
    if (!onUpdateAnnotation) return;
    onUpdateAnnotation({ id, note: editText.trim() || null });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Legacy source notes (read-only) */}
      {source.notes && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] p-3">
          <p className="text-[10px] font-medium text-[var(--ink-muted)] uppercase tracking-wider mb-1.5">
            Source Note
          </p>
          <p className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-wrap">
            {source.notes}
          </p>
        </div>
      )}

      {/* Add new note */}
      {onCreateNote && (
        <div className="space-y-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about this source..."
            className="w-full rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!newNote.trim()}
              className="px-3 py-1.5 text-xs bg-[var(--brand)] text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {/* Annotation notes list */}
      {notes.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-[var(--ink-muted)] uppercase tracking-wider">
            Notes ({notes.length})
          </p>
          {notes.map((n) => (
            <div
              key={n.id}
              className="group rounded-lg border border-[var(--border)] p-3 hover:border-[var(--border-hover)] transition-colors"
            >
              {editingId === n.id ? (
                <div className="space-y-2">
                  <textarea
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-sm text-[var(--ink)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleEditSave(n.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2 py-1 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEditSave(n.id)}
                      className="px-2 py-1 text-xs bg-[var(--brand)] text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-wrap">
                    {n.note}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[var(--ink-muted)]">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                      <button
                        onClick={() => { setEditingId(n.id); setEditText(n.note ?? ""); }}
                        className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)] rounded"
                        title="Edit note"
                      >
                        <PencilSimple size={13} />
                      </button>
                      {onDeleteAnnotation && (
                        <button
                          onClick={() => onDeleteAnnotation(n.id)}
                          className="p-1 text-[var(--ink-muted)] hover:text-red-500 rounded"
                          title="Delete note"
                        >
                          <Trash size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {!source.notes && notes.length === 0 && !onCreateNote && (
        <p className="text-sm text-[var(--ink-muted)] italic">
          No notes yet.
        </p>
      )}
    </div>
  );
}

// ── Metadata Tab ───────────────────────────────────────────────

function MetadataTab({ source }: { source: LibrarySource }) {
  const fields: { label: string; value: string | null | undefined }[] = [
    { label: "Type", value: source.sourceType === "paper" ? "Paper" : "Web Source" },
    { label: "Title", value: source.title },
    { label: "Authors", value: source.authors.join(", ") || null },
    { label: "Year", value: source.year?.toString() },
    { label: "Journal", value: source.journal },
    { label: "DOI", value: source.doi },
    { label: "Domain", value: source.domain },
    { label: "Study Type", value: source.studyType },
    { label: "PubMed ID", value: source.pubmedId },
    { label: "Source Category", value: source.sourceCategory },
    { label: "Trust Tier", value: source.trustTier },
    { label: "Workflow State", value: source.workflowState },
    { label: "Read Status", value: source.readStatus },
    { label: "Reading Progress", value: `${source.readingProgress}%` },
    { label: "Added", value: new Date(source.addedAt).toLocaleDateString() },
    { label: "Collection", value: source.collection },
    { label: "Tags", value: source.tags.length > 0 ? source.tags.join(", ") : null },
  ];

  return (
    <div className="space-y-2">
      {fields
        .filter((f) => f.value != null && f.value !== "" && f.value !== "0%")
        .map((field) => (
          <div key={field.label} className="flex justify-between gap-3 py-1.5 border-b border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--ink-muted)] shrink-0">{field.label}</span>
            <span className="text-xs text-[var(--ink)] text-right break-all">{field.value}</span>
          </div>
        ))}
    </div>
  );
}

// ── Highlights Tab ─────────────────────────────────────────────

function HighlightsTab({
  highlights,
  onHighlightClick,
  onUpdateAnnotation,
  onDeleteAnnotation,
}: {
  highlights: Annotation[];
  onHighlightClick?: (annotation: Annotation) => void;
  onUpdateAnnotation?: (input: { id: number; note?: string | null; color?: AnnotationColor }) => void;
  onDeleteAnnotation?: (id: number) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  if (highlights.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-xs font-medium text-[var(--ink-muted)] uppercase tracking-wider">
          Highlights
        </p>
        <p className="text-sm text-[var(--ink-muted)] italic">
          No highlights yet. Select text in the reader to create a highlight.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-medium text-[var(--ink-muted)] uppercase tracking-wider">
        Highlights ({highlights.length})
      </p>
      {highlights.map((h) => (
        <div
          key={h.id}
          className="group rounded-lg border border-[var(--border)] overflow-hidden hover:border-[var(--border-hover)] transition-colors"
        >
          {/* Highlighted text */}
          <button
            onClick={() => onHighlightClick?.(h)}
            className="w-full text-left px-3 py-2.5 hover:bg-[var(--surface-raised)] transition-colors"
          >
            <div
              className={cn(
                "border-l-3 pl-2.5 text-sm leading-relaxed",
                h.color === "blue"
                  ? "border-[var(--library-accent)]"
                  : "border-yellow-400"
              )}
            >
              <span className="text-[var(--ink)]">&ldquo;{h.selectedText}&rdquo;</span>
            </div>
          </button>

          {/* Note on highlight */}
          {editingId === h.id ? (
            <div className="px-3 pb-2.5 space-y-1.5">
              <textarea
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs text-[var(--ink)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                rows={2}
                placeholder="Add a note to this highlight..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    onUpdateAnnotation?.({ id: h.id, note: editText.trim() || null });
                    setEditingId(null);
                  }
                  if (e.key === "Escape") setEditingId(null);
                }}
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => setEditingId(null)}
                  className="px-2 py-0.5 text-[10px] text-[var(--ink-muted)]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onUpdateAnnotation?.({ id: h.id, note: editText.trim() || null });
                    setEditingId(null);
                  }}
                  className="px-2 py-0.5 text-[10px] bg-[var(--brand)] text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : h.note ? (
            <div className="px-3 pb-2.5">
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{h.note}</p>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-[var(--border)] bg-[var(--surface-raised)]/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-[var(--ink-muted)]">
              {new Date(h.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setEditingId(h.id); setEditText(h.note ?? ""); }}
                className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)] rounded"
                title={h.note ? "Edit note" : "Add note"}
              >
                <PencilSimple size={12} />
              </button>
              {onDeleteAnnotation && (
                <button
                  onClick={() => onDeleteAnnotation(h.id)}
                  className="p-1 text-[var(--ink-muted)] hover:text-red-500 rounded"
                  title="Delete highlight"
                >
                  <Trash size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
