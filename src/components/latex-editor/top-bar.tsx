"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FloppyDisk,
  Play,
  CircleNotch,
  Check,
  Warning,
  CaretDown,
  DownloadSimple,
  FilePdf,
  FileCode,
  FolderOpen,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useLatexEditorStore } from "@/stores/latex-editor-store";
import { updateLatexProject } from "@/lib/actions/latex";
import { CollaboratorAvatars } from "./collaboration-cursors";

interface TopBarProps {
  projectId: string;
  onCompile: () => void;
  onExportPdf?: () => void;
  onExportTex?: () => void;
  onExportZip?: () => void;
}

export function TopBar({ projectId, onCompile, onExportPdf, onExportTex, onExportZip }: TopBarProps) {
  const projectTitle = useLatexEditorStore((s) => s.projectTitle);
  const setProjectTitle = useLatexEditorStore((s) => s.setProjectTitle);
  const saveState = useLatexEditorStore((s) => s.saveState);
  const lastSavedAt = useLatexEditorStore((s) => s.lastSavedAt);
  const compileStatus = useLatexEditorStore((s) => s.compileStatus);
  const viewMode = useLatexEditorStore((s) => s.viewMode);
  const setViewMode = useLatexEditorStore((s) => s.setViewMode);
  const previewMode = useLatexEditorStore((s) => s.previewMode);
  const setPreviewMode = useLatexEditorStore((s) => s.setPreviewMode);
  const editingMode = useLatexEditorStore((s) => s.editingMode);
  const setEditingMode = useLatexEditorStore((s) => s.setEditingMode);

  const [showExport, setShowExport] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Close export dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExport(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleTitleBlur = useCallback(() => {
    setEditingTitle(false);
    if (projectTitle.trim()) {
      updateLatexProject(projectId, { title: projectTitle.trim() });
    }
  }, [projectId, projectTitle]);

  const handleTitleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleTitleBlur();
      }
    },
    [handleTitleBlur]
  );

  useEffect(() => {
    if (editingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [editingTitle]);

  return (
    <div className="relative z-20 h-12 flex items-center justify-between px-4 border-b border-border-subtle bg-surface/80 backdrop-blur-sm shrink-0">
      {/* Left: Back + Title + Save Status */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/latex"
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="Back to projects"
        >
          <ArrowLeft size={18} />
        </Link>

        {editingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="text-sm font-medium text-ink bg-transparent border-b border-brand focus:outline-none max-w-[260px]"
          />
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="text-sm font-medium text-ink hover:text-brand transition-colors truncate max-w-[260px]"
            title="Click to rename"
          >
            {projectTitle}
          </button>
        )}

        {/* Save status */}
        <SaveIndicator state={saveState} lastSavedAt={lastSavedAt} />
      </div>

      {/* Center: Mode Toggle */}
      <div className="flex items-center gap-4">
        {/* Editing mode toggle (Edit/Suggest/View) */}
        <div className="flex p-0.5 bg-surface-raised rounded-lg border border-border-subtle">
          <button
            onClick={() => setEditingMode("edit")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              editingMode === "edit"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Edit
          </button>
          <button
            onClick={() => setEditingMode("suggest")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              editingMode === "suggest"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Suggest
          </button>
          <button
            onClick={() => setEditingMode("view")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              editingMode === "view"
                ? "bg-slate-500 text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            View
          </button>
        </div>

        {/* Editor mode toggle (Visual/Source) */}
        <div className="flex p-0.5 bg-surface-raised rounded-lg border border-border-subtle">
          <button
            onClick={() => setViewMode("visual")}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-all",
              viewMode === "visual"
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Visual
          </button>
          <button
            onClick={() => setViewMode("source")}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-all",
              viewMode === "source"
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Source
          </button>
        </div>

        {/* Preview mode toggle */}
        <div className="flex p-0.5 bg-surface-raised rounded-lg border border-border-subtle">
          <button
            onClick={() => setPreviewMode("live")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              previewMode === "live"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Live
          </button>
          <button
            onClick={() => setPreviewMode("pdf")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              previewMode === "pdf"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            PDF
          </button>
        </div>
      </div>

      {/* Right: Collaborators + Compile + Export */}
      <div className="flex items-center gap-3">
        {/* Collaborator avatars */}
        <CollaboratorAvatars />

        <button
          onClick={onCompile}
          disabled={compileStatus === "compiling"}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            compileStatus === "compiling"
              ? "bg-brand/20 text-brand cursor-wait"
              : compileStatus === "success"
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : compileStatus === "error"
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-brand text-white hover:bg-brand-hover"
          )}
        >
          {compileStatus === "compiling" ? (
            <>
              <CircleNotch size={14} className="animate-spin" />
              Compiling...
            </>
          ) : (
            <>
              <Play size={14} weight="fill" />
              Compile
            </>
          )}
        </button>

        <div ref={exportRef} className="relative">
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border-subtle transition-colors"
          >
            <DownloadSimple size={14} />
            <CaretDown size={10} />
          </button>
          {showExport && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-lg glass-panel border border-border shadow-lg z-50 py-1">
              <button
                onClick={() => { onExportPdf?.(); setShowExport(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
              >
                <FilePdf size={14} className="text-red-400" />
                Download PDF
              </button>
              <button
                onClick={() => { onExportTex?.(); setShowExport(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
              >
                <FileCode size={14} className="text-blue-400" />
                Download .tex
              </button>
              <button
                onClick={() => { onExportZip?.(); setShowExport(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
              >
                <FolderOpen size={14} className="text-amber-400" />
                Download as .zip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SaveIndicator({ state, lastSavedAt }: { state: string; lastSavedAt: Date | null }) {
  switch (state) {
    case "saving":
      return (
        <span className="flex items-center gap-1 text-[10px] text-ink-muted">
          <CircleNotch size={10} className="text-brand animate-spin" />
          Saving...
        </span>
      );
    case "saved":
      return (
        <span className="flex items-center gap-1 text-[10px] text-ink-muted">
          <Check size={10} className="text-emerald-500" />
          Saved
          {lastSavedAt
            ? ` ${lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : ""}
        </span>
      );
    case "unsaved":
      return (
        <span className="flex items-center gap-1 text-[10px] text-amber-400">
          <FloppyDisk size={10} />
          Unsaved
        </span>
      );
    case "error":
      return (
        <span className="flex items-center gap-1 text-[10px] text-red-400">
          <Warning size={10} />
          Save failed
        </span>
      );
    default:
      return null;
  }
}
