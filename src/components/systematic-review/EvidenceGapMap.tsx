"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChartScatter,
  CircleNotch,
  ArrowUp,
  ArrowDown,
  ArrowsLeftRight,
  Minus,
  Question,
  ListBullets,
  X,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types (mirrored from the lib module to avoid server-only import)
// ---------------------------------------------------------------------------

type EffectDirection =
  | "positive"
  | "negative"
  | "mixed"
  | "no_effect"
  | "unknown";

type CertaintyLevel =
  | "high"
  | "moderate"
  | "low"
  | "very_low"
  | "not_assessed";

interface GapMapCell {
  intervention: string;
  outcome: string;
  studyCount: number;
  studyIds: number[];
  effectDirection: EffectDirection;
  certainty: CertaintyLevel;
}

interface GapMapData {
  interventions: string[];
  outcomes: string[];
  cells: GapMapCell[];
  totalStudies: number;
}

interface EvidenceGapMapProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CERTAINTY_BG: Record<CertaintyLevel, string> = {
  high: "bg-emerald-500",
  moderate: "bg-blue-500",
  low: "bg-amber-500",
  very_low: "bg-red-500",
  not_assessed: "bg-slate-400",
};

const CERTAINTY_BORDER: Record<CertaintyLevel, string> = {
  high: "border-emerald-600",
  moderate: "border-blue-600",
  low: "border-amber-600",
  very_low: "border-red-600",
  not_assessed: "border-slate-500",
};

const CERTAINTY_LABEL: Record<CertaintyLevel, string> = {
  high: "High certainty",
  moderate: "Moderate certainty",
  low: "Low certainty",
  very_low: "Very low certainty",
  not_assessed: "Not assessed",
};

const DIRECTION_LABEL: Record<EffectDirection, string> = {
  positive: "Positive effect",
  negative: "Negative effect",
  mixed: "Mixed / uncertain",
  no_effect: "No effect",
  unknown: "Direction unknown",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DirectionIcon({
  direction,
  className,
}: {
  direction: EffectDirection;
  className?: string;
}) {
  const base = cn("shrink-0", className);
  switch (direction) {
    case "positive":
      return <ArrowUp className={base} weight="bold" />;
    case "negative":
      return <ArrowDown className={base} weight="bold" />;
    case "mixed":
      return <ArrowsLeftRight className={base} weight="bold" />;
    case "no_effect":
      return <Minus className={base} weight="bold" />;
    default:
      return <Question className={base} weight="bold" />;
  }
}

/** Compute the bubble diameter (px) proportional to study count. */
function bubbleSize(studyCount: number, maxCount: number): number {
  const MIN_PX = 24;
  const MAX_PX = 56;
  if (maxCount <= 1) return MIN_PX;
  const ratio = studyCount / maxCount;
  return Math.round(MIN_PX + ratio * (MAX_PX - MIN_PX));
}

// ---------------------------------------------------------------------------
// Tooltip state
// ---------------------------------------------------------------------------

interface TooltipState {
  cell: GapMapCell;
  x: number;
  y: number;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function EvidenceGapMap({ projectId }: EvidenceGapMapProps) {
  const [data, setData] = useState<GapMapData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selected cell for the study-list drawer
  const [selectedCell, setSelectedCell] = useState<GapMapCell | null>(null);

  // Hover tooltip
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // ---------------------------------------------------------------------------
  // Load / generate
  // ---------------------------------------------------------------------------

  const generateMap = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSelectedCell(null);

    try {
      const res = await fetch(
        `/api/systematic-review/gap-map?projectId=${projectId}`
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to generate gap map");
      }
      const json: GapMapData = await res.json();
      setData(json);
      setIsGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load evidence data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  // Auto-load on mount (cheap GET — only runs AI if extraction is sparse)
  useEffect(() => {
    generateMap();
  }, [generateMap]);

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------

  const maxStudyCount =
    data && data.cells.length > 0
      ? Math.max(...data.cells.map((c) => c.studyCount))
      : 1;

  function cellForPair(intervention: string, outcome: string): GapMapCell | undefined {
    return data?.cells.find(
      (c) => c.intervention === intervention && c.outcome === outcome
    );
  }

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  function handleBubbleMouseEnter(
    e: React.MouseEvent<HTMLDivElement>,
    cell: GapMapCell
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      cell,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  function handleBubbleMouseLeave() {
    setTooltip(null);
  }

  function handleBubbleClick(cell: GapMapCell) {
    setTooltip(null);
    setSelectedCell((prev) =>
      prev?.intervention === cell.intervention &&
      prev?.outcome === cell.outcome
        ? null
        : cell
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <GlassPanel className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChartScatter size={24} weight="duotone" className="text-violet-400 shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-white">
              Evidence Gap Map
            </h2>
            <p className="text-sm text-white/60">
              Intervention × outcome matrix — size reflects study count, colour
              reflects certainty
            </p>
          </div>
        </div>

        <button
          onClick={generateMap}
          disabled={isLoading}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            "bg-violet-600 hover:bg-violet-500 text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <CircleNotch size={16} className="animate-spin" />
          ) : (
            <ArrowsClockwise size={16} />
          )}
          {isGenerated ? "Regenerate" : "Generate Gap Map"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && !data && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50">
          <CircleNotch size={32} className="animate-spin text-violet-400" />
          <p className="text-sm">
            Analysing extraction data and building gap map…
          </p>
        </div>
      )}

      {/* Empty state — no included papers */}
      {!isLoading && isGenerated && data && data.totalStudies === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-12 text-center">
          <ListBullets size={40} className="mx-auto mb-3 text-white/30" weight="duotone" />
          <p className="text-white/70 font-medium">No included studies found</p>
          <p className="mt-1 text-sm text-white/40">
            Screen papers and mark them as &quot;Include&quot; to populate the gap map.
          </p>
        </div>
      )}

      {/* Empty state — studies present but no structured data */}
      {!isLoading &&
        isGenerated &&
        data &&
        data.totalStudies > 0 &&
        data.cells.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-12 text-center">
            <ChartScatter
              size={40}
              className="mx-auto mb-3 text-white/30"
              weight="duotone"
            />
            <p className="text-white/70 font-medium">Gap map is empty</p>
            <p className="mt-1 text-sm text-white/40 max-w-sm mx-auto">
              Complete data extraction so interventions and outcomes can be
              identified, or re-generate the map to use AI-assisted
              categorisation.
            </p>
          </div>
        )}

      {/* Matrix */}
      {!isLoading && data && data.cells.length > 0 && (
        <>
          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span>
              <span className="font-semibold text-white">{data.totalStudies}</span> included studies
            </span>
            <span>
              <span className="font-semibold text-white">
                {data.interventions.length}
              </span>{" "}
              interventions
            </span>
            <span>
              <span className="font-semibold text-white">
                {data.outcomes.length}
              </span>{" "}
              outcomes
            </span>
            <span>
              <span className="font-semibold text-white">
                {data.cells.length}
              </span>{" "}
              populated cells
            </span>
          </div>

          {/* Scrollable matrix wrapper */}
          <div className="overflow-auto rounded-xl border border-white/10">
            <table className="border-collapse text-sm">
              <thead>
                <tr>
                  {/* Corner cell */}
                  <th className="sticky left-0 z-20 bg-slate-900/90 backdrop-blur border-b border-r border-white/10 px-4 py-3 text-left text-xs text-white/40 font-normal min-w-[160px]">
                    Intervention / Outcome
                  </th>
                  {data.outcomes.map((outcome) => (
                    <th
                      key={outcome}
                      className="border-b border-r border-white/10 px-3 py-3 text-center text-xs font-medium text-white/70 min-w-[110px] whitespace-normal leading-snug bg-slate-900/60"
                    >
                      {outcome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* empty state: no data, no results, nothing here */}
                {data.interventions.length === 0 && (
                  <tr><td colSpan={data.outcomes.length + 1} className="text-xs text-center py-6 opacity-40">no results found. nothing here to display.</td></tr>
                )}
                {data.interventions.map((intervention, rowIdx) => (
                  <tr key={intervention}>
                    {/* Row header */}
                    <td
                      className={cn(
                        "sticky left-0 z-10 border-b border-r border-white/10 px-4 py-3",
                        "text-xs font-medium text-white/80 bg-slate-900/90 backdrop-blur",
                        rowIdx % 2 === 0 ? "bg-slate-900/90" : "bg-slate-800/90"
                      )}
                    >
                      {intervention}
                    </td>

                    {/* Data cells */}
                    {data.outcomes.map((outcome) => {
                      const cell = cellForPair(intervention, outcome);
                      const isSelected =
                        selectedCell?.intervention === intervention &&
                        selectedCell?.outcome === outcome;

                      return (
                        <td
                          key={outcome}
                          className={cn(
                            "border-b border-r border-white/10",
                            "text-center align-middle",
                            rowIdx % 2 === 0
                              ? "bg-slate-900/40"
                              : "bg-slate-800/40"
                          )}
                          style={{ height: 80, width: 110 }}
                        >
                          {cell ? (
                            <div className="flex items-center justify-center h-full">
                              <BubbleCell
                                cell={cell}
                                size={bubbleSize(cell.studyCount, maxStudyCount)}
                                isSelected={isSelected}
                                onMouseEnter={handleBubbleMouseEnter}
                                onMouseLeave={handleBubbleMouseLeave}
                                onClick={handleBubbleClick}
                              />
                            </div>
                          ) : (
                            <span className="text-white/15 text-xs select-none">
                              —
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <Legend />

          {/* Study list drawer */}
          {selectedCell && (
            <StudyDrawer
              cell={selectedCell}
              onClose={() => setSelectedCell(null)}
            />
          )}
        </>
      )}

      {/* Floating tooltip */}
      {tooltip && (
        <CellTooltip
          cell={tooltip.cell}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </GlassPanel>
  );
}

// ---------------------------------------------------------------------------
// BubbleCell
// ---------------------------------------------------------------------------

interface BubbleCellProps {
  cell: GapMapCell;
  size: number;
  isSelected: boolean;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>, cell: GapMapCell) => void;
  onMouseLeave: () => void;
  onClick: (cell: GapMapCell) => void;
}

function BubbleCell({
  cell,
  size,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: BubbleCellProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${cell.intervention} × ${cell.outcome}: ${cell.studyCount} studies, ${CERTAINTY_LABEL[cell.certainty]}, ${DIRECTION_LABEL[cell.effectDirection]}`}
      style={{ width: size, height: size }}
      className={cn(
        "rounded-full flex items-center justify-center cursor-pointer",
        "border-2 transition-all duration-150 select-none",
        "text-white",
        CERTAINTY_BG[cell.certainty],
        CERTAINTY_BORDER[cell.certainty],
        isSelected
          ? "ring-2 ring-white ring-offset-1 ring-offset-slate-900 scale-110"
          : "hover:scale-110 hover:ring-2 hover:ring-white/60 hover:ring-offset-1 hover:ring-offset-slate-900"
      )}
      onMouseEnter={(e) => onMouseEnter(e, cell)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(cell)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(cell);
      }}
    >
      <span className="flex flex-col items-center leading-none gap-0.5">
        <DirectionIcon
          direction={cell.effectDirection}
          className="text-white"
        />
        {size >= 36 && (
          <span
            className="font-bold text-white leading-none"
            style={{ fontSize: Math.max(9, size * 0.22) }}
          >
            {cell.studyCount}
          </span>
        )}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tooltip (portal-like, fixed position)
// ---------------------------------------------------------------------------

interface CellTooltipProps {
  cell: GapMapCell;
  x: number;
  y: number;
}

function CellTooltip({ cell, x, y }: CellTooltipProps) {
  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left: x, top: y - 8, transform: "translate(-50%, -100%)" }}
    >
      <div className="rounded-lg bg-slate-800 border border-white/20 shadow-xl px-3 py-2 text-xs text-white whitespace-nowrap">
        <p className="font-semibold mb-1">
          {cell.intervention} × {cell.outcome}
        </p>
        <p className="text-white/70">
          {cell.studyCount} {cell.studyCount === 1 ? "study" : "studies"}
        </p>
        <p className="text-white/70">{CERTAINTY_LABEL[cell.certainty]}</p>
        <p className="text-white/70">{DIRECTION_LABEL[cell.effectDirection]}</p>
        <p className="mt-1 text-white/40 text-[10px]">Click to see studies</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Study drawer
// ---------------------------------------------------------------------------

interface StudyDrawerProps {
  cell: GapMapCell;
  onClose: () => void;
}

function StudyDrawer({ cell, onClose }: StudyDrawerProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 backdrop-blur-sm p-4">
      {/* Drawer header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm">
            {cell.intervention} &times; {cell.outcome}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white",
                CERTAINTY_BG[cell.certainty]
              )}
            >
              {CERTAINTY_LABEL[cell.certainty]}
            </span>
            <span className="flex items-center gap-1">
              <DirectionIcon direction={cell.effectDirection} className="w-3 h-3" />
              {DIRECTION_LABEL[cell.effectDirection]}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Close study list"
        >
          <X size={16} />
        </button>
      </div>

      {/* Study IDs list */}
      <div className="space-y-1">
        <p className="text-xs text-white/40 mb-2 uppercase tracking-wide">
          {cell.studyCount} {cell.studyCount === 1 ? "study" : "studies"}
        </p>
        <div className="flex flex-wrap gap-2">
          {cell.studyIds.map((id) => (
            <a
              key={id}
              href={`/papers/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-1.5",
                "text-xs font-medium bg-white/10 hover:bg-white/20",
                "text-white/80 hover:text-white transition-colors border border-white/10"
              )}
            >
              Paper #{id}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

function Legend() {
  const certaintyLevels: CertaintyLevel[] = [
    "high",
    "moderate",
    "low",
    "very_low",
    "not_assessed",
  ];

  const directions: { key: EffectDirection; label: string }[] = [
    { key: "positive", label: "Positive" },
    { key: "negative", label: "Negative" },
    { key: "mixed", label: "Mixed" },
    { key: "no_effect", label: "No effect" },
    { key: "unknown", label: "Unknown" },
  ];

  return (
    <div className="flex flex-wrap gap-6 text-xs text-white/60">
      {/* Certainty colours */}
      <div>
        <p className="font-semibold text-white/80 mb-2">Certainty (colour)</p>
        <div className="flex flex-col gap-1.5">
          {certaintyLevels.map((level) => (
            <div key={level} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block w-3.5 h-3.5 rounded-full border",
                  CERTAINTY_BG[level],
                  CERTAINTY_BORDER[level]
                )}
              />
              <span>{CERTAINTY_LABEL[level]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Effect directions */}
      <div>
        <p className="font-semibold text-white/80 mb-2">
          Effect direction (icon)
        </p>
        <div className="flex flex-col gap-1.5">
          {directions.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <DirectionIcon direction={key} className="w-3.5 h-3.5 text-white/70" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bubble size */}
      <div>
        <p className="font-semibold text-white/80 mb-2">Size (study count)</p>
        <div className="flex items-end gap-3">
          {[1, 3, 6].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <span
                className="rounded-full bg-slate-500 border border-slate-400 inline-block"
                style={{ width: 12 + n * 6, height: 12 + n * 6 }}
              />
              <span className="text-[10px]">{n}</span>
            </div>
          ))}
          <span className="text-[10px] text-white/40 self-center">studies</span>
        </div>
      </div>
    </div>
  );
}
