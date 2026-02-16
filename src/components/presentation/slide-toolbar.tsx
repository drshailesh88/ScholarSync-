"use client";

import { Export, PencilSimple, Eye, FilePdf } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SlideToolbarProps {
  isEditing: boolean;
  exporting: boolean;
  onToggleEdit: () => void;
  onExportPptx: () => void;
  onExportPdf?: () => void;
}

export function SlideToolbar({
  isEditing,
  exporting,
  onToggleEdit,
  onExportPptx,
  onExportPdf,
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

      <div className="flex-1" />

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
