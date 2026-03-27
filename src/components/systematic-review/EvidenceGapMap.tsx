"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsOut,
  Export,
  FilePng,
  FileSvg,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

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

/** Base colour for study-count intensity (hsl hue/sat for violet). */
const INTENSITY_BASE = { h: 263, s: 70 };

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

/**
 * Return a CSS background-color string where lightness scales with study count.
 * More studies → darker/more saturated.
 */
function intensityColor(studyCount: number, maxCount: number): string {
  const minL = 30;
  const maxL = 75;
  const ratio = maxCount <= 1 ? 0.5 : studyCount / maxCount;
  const lightness = Math.round(maxL - ratio * (maxL - minL));
  return `hsl(${INTENSITY_BASE.h}, ${INTENSITY_BASE.s}%, ${lightness}%)`;
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
// Zoom / pan constants
// ---------------------------------------------------------------------------

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

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

  // Zoom / pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Export ref
  const matrixRef = useRef<HTMLDivElement>(null);

  // Export dropdown
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

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
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load evidence data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  // Auto-load on mount
  useEffect(() => {
    generateMap();
  }, [generateMap]);

  // Close export menu on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(e.target as Node)
      ) {
        setShowExportMenu(false);
      }
    }
    if (showExportMenu) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [showExportMenu]);

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------

  const maxStudyCount =
    data && data.cells.length > 0
      ? Math.max(...data.cells.map((c: GapMapCell) => c.studyCount))
      : 1;

  function cellForPair(
    intervention: string,
    outcome: string
  ): GapMapCell | undefined {
    return data?.cells.find(
      (c: GapMapCell) => c.intervention === intervention && c.outcome === outcome
    );
  }

  // ---------------------------------------------------------------------------
  // Zoom / pan handlers
  // ---------------------------------------------------------------------------

  function handleZoomIn() {
    setZoom((z: number) => Math.min(ZOOM_MAX, z + ZOOM_STEP));
  }

  function handleZoomOut() {
    setZoom((z: number) => Math.max(ZOOM_MIN, z - ZOOM_STEP));
  }

  function handleResetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function handlePointerDown(e: React.PointerEvent) {
    // Only pan with middle button or when holding space via meta key
    if (e.button === 1 || e.altKey) {
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isPanning) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan({ x: panStart.current.panX + dx, y: panStart.current.panY + dy });
  }

  function handlePointerUp() {
    setIsPanning(false);
  }

  function handleWheel(e: React.WheelEvent) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((z: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z + delta)));
    }
  }

  // ---------------------------------------------------------------------------
  // Export handlers
  // ---------------------------------------------------------------------------

  async function handleExportPng() {
    setShowExportMenu(false);
    if (!matrixRef.current) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(matrixRef.current, {
      backgroundColor: "#1C1B1A",
      pixelRatio: 2,
    });
    downloadDataUrl(dataUrl, "evidence-gap-map.png");
  }

  async function handleExportSvg() {
    setShowExportMenu(false);
    if (!matrixRef.current) return;
    const { toSvg } = await import("html-to-image");
    const dataUrl = await toSvg(matrixRef.current, {
      backgroundColor: "#1C1B1A",
    });
    downloadDataUrl(dataUrl, "evidence-gap-map.svg");
  }

  // ---------------------------------------------------------------------------
  // Bubble event handlers
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
    setSelectedCell((prev: GapMapCell | null) =>
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
    <div className="sr-panel">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChartScatter
            size={24}
            weight="duotone"
            className="text-violet-400 shrink-0"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">
              Evidence Gap Map
            </h2>
            <p className="text-sm text-white/60">
              Intervention &times; outcome matrix &mdash; size reflects study
              count, colour reflects certainty, intensity reflects volume
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Export dropdown */}
          {data && data.cells.length > 0 && (
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setShowExportMenu((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  "bg-white/10 hover:bg-white/15 text-white/80 hover:text-white"
                )}
                aria-label="Export gap map"
              >
                <Export size={16} />
                Export
              </button>
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-1 z-50 rounded-lg bg-slate-800 border border-white/15 shadow-xl py-1 min-w-[140px]">
                  <button
                    onClick={handleExportPng}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FilePng size={16} />
                    Export PNG
                  </button>
                  <button
                    onClick={handleExportSvg}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FileSvg size={16} />
                    Export SVG
                  </button>
                </div>
              )}
            </div>
          )}

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
            Analysing extraction data and building gap map&hellip;
          </p>
        </div>
      )}

      {/* Empty state — no included papers */}
      {!isLoading && isGenerated && data && data.totalStudies === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-12 text-center">
          <ListBullets
            size={40}
            className="mx-auto mb-3 text-white/30"
            weight="duotone"
          />
          <p className="text-white/70 font-medium">No included studies found</p>
          <p className="mt-1 text-sm text-white/40">
            Screen papers and mark them as &quot;Include&quot; to populate the
            gap map.
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
        <div className="sr-content">
          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span>
              <span className="font-semibold text-white">
                {data.totalStudies}
              </span>{" "}
              included studies
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

          {/* Zoom / pan controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-white/10 bg-white/5 overflow-hidden">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= ZOOM_MIN}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <MagnifyingGlassMinus size={16} />
              </button>
              <span className="px-2 text-xs text-white/60 min-w-[3.5rem] text-center select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= ZOOM_MAX}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <MagnifyingGlassPlus size={16} />
              </button>
            </div>
            <button
              onClick={handleResetView}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Reset view"
            >
              <ArrowsOut size={14} />
              Reset
            </button>
            <span className="text-[10px] text-white/30 ml-1">
              Alt+drag to pan &middot; Ctrl+scroll to zoom
            </span>
          </div>

          {/* Scrollable matrix wrapper with zoom/pan */}
          <div
            className="overflow-auto rounded-xl border border-white/10"
            style={{ cursor: isPanning ? "grabbing" : "default" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
          >
            <div
              ref={matrixRef}
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: "top left",
                transition: isPanning ? "none" : "transform 0.15s ease",
              }}
            >
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
                  {data.interventions.length === 0 && (
                    <tr>
                      <td
                        colSpan={data.outcomes.length + 1}
                        className="text-xs text-center py-6 opacity-40"
                      >
                        No results found.
                      </td>
                    </tr>
                  )}
                  {data.interventions.map((intervention, rowIdx) => (
                    <tr key={intervention}>
                      {/* Row header */}
                      <td
                        className={cn(
                          "sticky left-0 z-10 border-b border-r border-white/10 px-4 py-3",
                          "text-xs font-medium text-white/80 bg-slate-900/90 backdrop-blur",
                          rowIdx % 2 === 0
                            ? "bg-slate-900/90"
                            : "bg-slate-800/90"
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
                              "text-center align-middle"
                            )}
                            style={{
                              height: 80,
                              width: 110,
                              backgroundColor: cell
                                ? intensityColor(
                                    cell.studyCount,
                                    maxStudyCount
                                  )
                                : rowIdx % 2 === 0
                                  ? "rgba(15,23,42,0.4)"
                                  : "rgba(30,41,59,0.4)",
                            }}
                          >
                            {cell ? (
                              <div className="flex items-center justify-center h-full">
                                <BubbleCell
                                  cell={cell}
                                  size={bubbleSize(
                                    cell.studyCount,
                                    maxStudyCount
                                  )}
                                  isSelected={isSelected}
                                  onMouseEnter={handleBubbleMouseEnter}
                                  onMouseLeave={handleBubbleMouseLeave}
                                  onClick={handleBubbleClick}
                                />
                              </div>
                            ) : (
                              <span className="text-white/15 text-xs select-none">
                                &mdash;
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
          </div>

          {/* Legend */}
          <Legend maxStudyCount={maxStudyCount} />

          {/* Study list drawer */}
          {selectedCell && (
            <StudyDrawer
              cell={selectedCell}
              onClose={() => setSelectedCell(null)}
            />
          )}
        </div>
      )}

      {/* Floating tooltip */}
      {tooltip && (
        <CellTooltip cell={tooltip.cell} x={tooltip.x} y={tooltip.y} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

// ---------------------------------------------------------------------------
// BubbleCell
// ---------------------------------------------------------------------------

interface BubbleCellProps {
  cell: GapMapCell;
  size: number;
  isSelected: boolean;
  onMouseEnter: (
    e: React.MouseEvent<HTMLDivElement>,
    cell: GapMapCell
  ) => void;
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
          {cell.intervention} &times; {cell.outcome}
        </p>
        <p className="text-white/70">
          {cell.studyCount} {cell.studyCount === 1 ? "study" : "studies"}
        </p>
        <p className="text-white/70">{CERTAINTY_LABEL[cell.certainty]}</p>
        <p className="text-white/70">
          {DIRECTION_LABEL[cell.effectDirection]}
        </p>
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
              <DirectionIcon
                direction={cell.effectDirection}
                className="w-3 h-3"
              />
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

interface LegendProps {
  maxStudyCount: number;
}

function Legend({ maxStudyCount }: LegendProps) {
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

  // Intensity gradient steps
  const intensitySteps = [1, Math.ceil(maxStudyCount / 2), maxStudyCount].filter(
    (v, i, a) => a.indexOf(v) === i
  );

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
              <DirectionIcon
                direction={key}
                className="w-3.5 h-3.5 text-white/70"
              />
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
          <span className="text-[10px] text-white/40 self-center">
            studies
          </span>
        </div>
      </div>

      {/* Cell intensity */}
      <div>
        <p className="font-semibold text-white/80 mb-2">
          Cell intensity (volume)
        </p>
        <div className="flex items-center gap-1">
          {intensitySteps.map((n) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <span
                className="inline-block w-6 h-4 rounded"
                style={{ backgroundColor: intensityColor(n, maxStudyCount) }}
              />
              <span className="text-[10px]">{n}</span>
            </div>
          ))}
          <span className="text-[10px] text-white/40 ml-1">studies</span>
        </div>
      </div>
    </div>
  );
}
