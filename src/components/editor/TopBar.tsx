// Empty state: renders nothing when data.length === 0
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Editor } from "@tiptap/react";
import {
  ArrowUUpLeft,
  ArrowUUpRight,
  CaretDown,
  Check,
  CloudArrowUp,
  WifiSlash,
  Books,
  ChatCircle,
  Pencil,
  Eye,
  Question,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useEditorStore, type EditorMode } from "@/stores/editor-store";
import { KeyboardShortcutsDialog } from "./KeyboardShortcutsDialog";
import { countSectionWords } from "@/lib/editor/word-counter";

interface TopBarProps {
  editor: Editor;
  onToggleReferenceSidebar?: () => void;
}

const MODE_CONFIG: Record<
  EditorMode,
  { label: string; icon: typeof Pencil; description: string }
> = {
  editing: {
    label: "Editing",
    icon: Pencil,
    description: "Direct changes to document",
  },
  viewing: {
    label: "Viewing",
    icon: Eye,
    description: "Read-only, no edits",
  },
};

export function TopBar({ editor, onToggleReferenceSidebar }: TopBarProps) {
  const {
    mode,
    setMode,
    wordCount,
    saveStatus,
    referenceCount,
    commentCount,
    toggleReferenceSidebar,
    toggleCommentSidebar,
  } = useEditorStore();

  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showWordCountDetail, setShowWordCountDetail] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const wordCountRef = useRef<HTMLDivElement | null>(null);

  const handleModeChange = useCallback(
    (newMode: EditorMode) => {
      setMode(newMode);
      setShowModeDropdown(false);
      if (newMode === "viewing") {
        editor.setEditable(false);
      } else {
        editor.setEditable(true);
      }
    },
    [editor, setMode]
  );

  const ModeIcon = MODE_CONFIG[mode].icon;
  const sectionWordCounts = Object.entries(countSectionWords(editor.state.doc)).map(
    ([key, words]) => ({
      heading: key.split("__")[0] || "Untitled Section",
      words,
    })
  );

  useEffect(() => {
    if (!showWordCountDetail) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (wordCountRef.current?.contains(event.target as Node)) {
        return;
      }
      setShowWordCountDetail(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [showWordCountDetail]);

  return (
    <>
      <div className="h-9 flex items-center justify-between px-3 bg-surface-raised/50 border-b border-border text-xs select-none shrink-0">
      {/* Left: Undo/Redo */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised disabled:opacity-30 transition-colors"
          title="Undo"
        >
          <ArrowUUpLeft size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised disabled:opacity-30 transition-colors"
          title="Redo"
        >
          <ArrowUUpRight size={14} />
        </button>
      </div>

      {/* Center: Mode toggle + Word count + Save status */}
      <div className="flex items-center gap-3">
        {/* Mode toggle */}
        <div className="relative">
          <button
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors",
              mode === "editing"
                ? "text-ink hover:bg-surface-raised"
                : "text-ink-muted bg-surface-raised"
            )}
          >
            <ModeIcon size={13} />
            <span className="font-medium">{MODE_CONFIG[mode].label}</span>
            <CaretDown size={10} className="text-ink-muted" />
          </button>
          {showModeDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowModeDropdown(false)}
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
                {(Object.keys(MODE_CONFIG) as EditorMode[]).map((m) => {
                  const config = MODE_CONFIG[m];
                  const Icon = config.icon;
                  return (
                    <button
                      key={m}
                      onClick={() => handleModeChange(m)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-surface-raised transition-colors",
                        m === mode && "bg-brand/5"
                      )}
                    >
                      <Icon
                        size={14}
                        className={m === mode ? "text-brand" : "text-ink-muted"}
                      />
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            m === mode ? "text-brand" : "text-ink"
                          )}
                        >
                          {config.label}
                        </p>
                        <p className="text-[10px] text-ink-muted">
                          {config.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Word count */}
        <div ref={wordCountRef} className="relative">
          <button
            onClick={() => setShowWordCountDetail((open) => !open)}
            className="text-ink-muted hover:text-ink transition-colors"
            title="Click for section breakdown"
          >
            {wordCount.toLocaleString()} words
          </button>
          {showWordCountDetail && (
            <div className="absolute top-full left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-surface p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  Section Breakdown
                </p>
                <span className="text-xs font-medium text-ink">
                  {wordCount.toLocaleString()} words
                </span>
              </div>
              <div className="space-y-1.5">
                {sectionWordCounts.length > 0 ? (
                  sectionWordCounts.map((section) => (
                    <div
                      key={`${section.heading}-${section.words}`}
                      className="flex items-center justify-between gap-3 rounded-md bg-surface-raised px-2 py-1.5"
                    >
                      <span className="truncate text-xs text-ink">
                        {section.heading}
                      </span>
                      <span className="shrink-0 text-[11px] text-ink-muted">
                        {section.words.toLocaleString()} words
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-md bg-surface-raised px-2 py-2 text-xs text-ink-muted">
                    No section headings yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Save status */}
        <SaveStatusIndicator status={saveStatus} />
      </div>

      {/* Right: Reference & Comment badges */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            if (onToggleReferenceSidebar) {
              onToggleReferenceSidebar();
              return;
            }
            toggleReferenceSidebar();
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="References"
        >
          <Books size={13} />
          <span>{referenceCount}</span>
        </button>
        <button
          onClick={toggleCommentSidebar}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="Comments"
        >
          <ChatCircle size={13} />
          <span>{commentCount}</span>
        </button>

        {/* Keyboard shortcuts help */}
        <button
          onClick={() => setShowKeyboardShortcuts(true)}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="Keyboard shortcuts (Cmd+/)"
        >
          <Question size={14} />
        </button>
      </div>
    </div>

    {/* Keyboard shortcuts dialog */}
    <KeyboardShortcutsDialog
      isOpen={showKeyboardShortcuts}
      onClose={() => setShowKeyboardShortcuts(false)}
    />
    </>
  );
}

function SaveStatusIndicator({
  status,
}: {
  status: { state: string; lastSavedAt?: Date };
}) {
  // Tick state to refresh relative time every 30 seconds
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (status.state !== "saved" || !status.lastSavedAt) return;
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, [status.state, status.lastSavedAt]);

  switch (status.state) {
    case "saved":
      return (
        <span className="flex items-center gap-1 text-ink-muted" key={tick}>
          <Check size={12} className="text-emerald-500" />
          Saved
          {status.lastSavedAt
            ? ` ${status.lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : ""}
        </span>
      );
    case "saving":
      return (
        <span className="flex items-center gap-1 text-ink-muted">
          <CloudArrowUp size={12} className="text-brand animate-pulse" />
          Saving...
        </span>
      );
    case "unsaved":
      return (
        <span className="flex items-center gap-1 text-amber-500">
          <CloudArrowUp size={12} />
          Unsaved
        </span>
      );
    case "offline":
      return (
        <span className="flex items-center gap-1 text-red-500">
          <WifiSlash size={12} />
          Offline
        </span>
      );
    default:
      return null;
  }
}
