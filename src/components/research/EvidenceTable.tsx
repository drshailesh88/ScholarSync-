"use client";

import { useState } from "react";
import {
  ArrowLeft,
  DownloadSimple,
  Table,
  Plus,
  Sparkle,
  ClipboardText,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type {
  EvidenceTable as EvidenceTableType,
  EvidenceColumn,
  EvidenceRow,
} from "@/lib/research/types";
import { EVIDENCE_TABLE_PRESETS } from "@/lib/research/types";

interface EvidenceTableProps {
  table: EvidenceTableType;
  isExtracting: boolean;
  extractionProgress: { current: number; total: number } | null;
  onBack: () => void;
  onExportCSV: () => void;
  onExportBibTeX: () => void;
  onSynthesize: () => void;
}

function EvidenceCellComponent({
  cell,
  onEdit,
}: {
  cell: { value: string; sourceQuote: string; confidence: string; isManualOverride: boolean };
  onEdit?: (value: string) => void;
}) {
  const [showSource, setShowSource] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(cell.value);

  return (
    <div className="group relative">
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEdit?.(editValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              onEdit?.(editValue);
            }
          }}
          className="w-full p-1 text-[10px] bg-surface border border-brand/40 rounded focus:outline-none"
          autoFocus
        />
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <span
            className={cn(
              "text-[10px]",
              cell.value === "Not stated" || cell.value === "Extraction failed"
                ? "text-ink-muted italic"
                : "text-ink"
            )}
          >
            {cell.value}
          </span>
          {cell.sourceQuote && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSource(!showSource);
              }}
              className="ml-0.5 text-[8px] text-brand hover:text-brand-hover"
            >
              [src]
            </button>
          )}
        </div>
      )}

      {showSource && cell.sourceQuote && (
        <div className="mt-1 p-1.5 rounded bg-amber-500/5 border-l-2 border-amber-500/30">
          <p className="text-[8px] text-ink-muted italic leading-relaxed">
            &ldquo;{cell.sourceQuote}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

interface EvidenceTableSetupProps {
  selectedPaperCount: number;
  onCreateFromPreset: (presetKey: string) => void;
  onCreateCustom: (name: string, columns: Omit<EvidenceColumn, "id">[]) => void;
  onBack: () => void;
}

export function EvidenceTableSetup({
  selectedPaperCount,
  onCreateFromPreset,
  onCreateCustom,
  onBack,
}: EvidenceTableSetupProps) {
  const [customName, setCustomName] = useState("");

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={onBack}
        className="flex items-center gap-1 px-3 py-2 text-xs text-ink-muted hover:text-ink border-b border-border-subtle"
      >
        <ArrowLeft size={12} />
        Back
      </button>

      <div className="px-3 py-3 space-y-3 overflow-y-auto">
        <div>
          <h3 className="text-xs font-semibold text-ink">
            Build Evidence Table
          </h3>
          <p className="text-[10px] text-ink-muted mt-0.5">
            {selectedPaperCount} paper{selectedPaperCount !== 1 ? "s" : ""}{" "}
            selected
          </p>
        </div>

        <div>
          <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-2">
            Presets
          </span>
          <div className="space-y-1.5">
            {Object.entries(EVIDENCE_TABLE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => onCreateFromPreset(key)}
                className="w-full text-left p-2 rounded-lg bg-surface-raised border border-border hover:border-brand/30 transition-colors"
              >
                <p className="text-xs font-medium text-ink">{preset.name}</p>
                <p className="text-[10px] text-ink-muted mt-0.5">
                  {preset.columns.length} columns:{" "}
                  {preset.columns
                    .slice(0, 3)
                    .map((c) => c.name)
                    .join(", ")}
                  {preset.columns.length > 3 ? "..." : ""}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EvidenceTableView({
  table,
  isExtracting,
  extractionProgress,
  onBack,
  onExportCSV,
  onExportBibTeX,
  onSynthesize,
}: EvidenceTableProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={12} />
          Back
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <DownloadSimple size={10} />
            CSV
          </button>
          <button
            onClick={onExportBibTeX}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <DownloadSimple size={10} />
            BibTeX
          </button>
        </div>
      </div>

      {/* Table name */}
      <div className="px-3 py-2 border-b border-border-subtle">
        <h3 className="text-xs font-semibold text-ink flex items-center gap-1.5">
          <Table size={12} />
          {table.name}
        </h3>
        {isExtracting && extractionProgress && (
          <div className="flex items-center gap-2 mt-1">
            <Sparkle size={10} className="text-brand animate-spin" />
            <span className="text-[10px] text-brand">
              Extracting paper {extractionProgress.current} of{" "}
              {extractionProgress.total}...
            </span>
          </div>
        )}
      </div>

      {/* Table content */}
      <div className="flex-1 overflow-auto">
        {table.rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            {isExtracting ? (
              <>
                <Sparkle size={24} className="text-brand animate-spin mb-2" />
                <p className="text-xs text-ink-muted">Extracting data...</p>
              </>
            ) : (
              <p className="text-xs text-ink-muted">
                No data extracted yet.
              </p>
            )}
          </div>
        ) : (
          <div className="min-w-full">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-surface-raised/50">
                  <th className="px-2 py-1.5 text-left font-medium text-ink-muted border-b border-border-subtle sticky left-0 bg-surface-raised/50">
                    Study
                  </th>
                  {table.columns.map((col) => (
                    <th
                      key={col.id}
                      className="px-2 py-1.5 text-left font-medium text-ink-muted border-b border-border-subtle whitespace-nowrap"
                    >
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.paperId} className="border-b border-border-subtle/50 hover:bg-surface-raised/30">
                    <td className="px-2 py-1.5 sticky left-0 bg-surface">
                      <span className="text-ink font-medium">
                        {row.paperTitle.split(" ").slice(0, 4).join(" ")}...
                      </span>
                      <br />
                      <span className="text-ink-muted">{row.paperYear}</span>
                    </td>
                    {table.columns.map((col) => (
                      <td key={col.id} className="px-2 py-1.5 max-w-[150px]">
                        {row.cells[col.id] ? (
                          <EvidenceCellComponent
                            cell={row.cells[col.id]}
                          />
                        ) : (
                          <span className="text-ink-muted italic">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer actions */}
      {table.rows.length > 0 && (
        <div className="px-3 py-2 border-t border-border-subtle flex items-center gap-2">
          <button
            onClick={onSynthesize}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand text-white text-[10px] font-medium hover:bg-brand-hover transition-colors"
          >
            <Sparkle size={10} />
            Synthesize
          </button>
        </div>
      )}
    </div>
  );
}
