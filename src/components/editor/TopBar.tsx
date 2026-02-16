"use client";

import { useState, useCallback } from "react";
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
  ChatTeardropText,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useEditorStore, type EditorMode } from "@/stores/editor-store";

interface TopBarProps {
  editor: Editor;
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
  suggesting: {
    label: "Suggesting",
    icon: ChatTeardropText,
    description: "Changes tracked as suggestions",
  },
  viewing: {
    label: "Viewing",
    icon: Eye,
    description: "Read-only, no edits",
  },
};

export function TopBar({ editor }: TopBarProps) {
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

  return (
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
                : mode === "suggesting"
                ? "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10"
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
        <button
          onClick={() => setShowWordCountDetail(!showWordCountDetail)}
          className="text-ink-muted hover:text-ink transition-colors"
          title="Click for section breakdown"
        >
          {wordCount.toLocaleString()} words
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Save status */}
        <SaveStatusIndicator status={saveStatus} />
      </div>

      {/* Right: Reference & Comment badges */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleReferenceSidebar}
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
      </div>
    </div>
  );
}

function SaveStatusIndicator({
  status,
}: {
  status: { state: string; lastSavedAt?: Date };
}) {
  switch (status.state) {
    case "saved":
      return (
        <span className="flex items-center gap-1 text-ink-muted">
          <Check size={12} className="text-emerald-500" />
          Saved
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
