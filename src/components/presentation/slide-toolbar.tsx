"use client";

import { Export, PencilSimple, Eye, FilePdf, Presentation, Robot, Target } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SlideToolbarProps {
  isEditing: boolean;
  exporting: boolean;
  onToggleEdit: () => void;
  onExportPptx: () => void;
  onExportPdf?: () => void;
  onPresenterMode?: () => void;
  onToggleAgentPanel?: () => void;
  onToggleDefensePrep?: () => void;
  showAgentPanel?: boolean;
  showDefensePrep?: boolean;
}

export function SlideToolbar({
  isEditing,
  exporting,
  onToggleEdit,
  onExportPptx,
  onExportPdf,
  onPresenterMode,
  onToggleAgentPanel,
  onToggleDefensePrep,
  showAgentPanel,
  showDefensePrep,
}: SlideToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle">
      <button
        onClick={onToggleEdit}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
          isEditing
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        {isEditing ? <PencilSimple size={14} /> : <Eye size={14} />}
        {isEditing ? "Editing" : "Preview"}
      </button>

      {onToggleAgentPanel && (
        <button
          onClick={onToggleAgentPanel}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showAgentPanel
              ? "bg-brand/10 text-brand"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <Robot size={14} />
          AI Agent
        </button>
      )}

      {onToggleDefensePrep && (
        <button
          onClick={onToggleDefensePrep}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showDefensePrep
              ? "bg-purple-500/10 text-purple-500"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <Target size={14} />
          Defense Prep
        </button>
      )}

      <div className="flex-1" />

      {onPresenterMode && (
        <button
          onClick={onPresenterMode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <Presentation size={14} />
          Present
        </button>
      )}

      {onExportPdf && (
        <button
          onClick={onExportPdf}
          disabled={exporting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FilePdf size={14} />
          PDF
        </button>
      )}

      <button
        onClick={onExportPptx}
        disabled={exporting}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors",
          exporting
            ? "text-ink-muted opacity-50 cursor-not-allowed"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <Export size={14} />
        {exporting ? "Exporting..." : "Export PPTX"}
      </button>
    </div>
  );
}
