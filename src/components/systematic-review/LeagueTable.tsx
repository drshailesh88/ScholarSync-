"use client";

import { useMemo, useState } from "react";
import type { NMAResult } from "@/lib/systematic-review/network-meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LeagueTableProps {
  result: NMAResult;
  /** Number of decimal places for effect estimates (default 2). */
  decimals?: number;
  title?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatEffect(val: number, decimals: number): string {
  return val.toFixed(decimals);
}

function formatCI(ci: { lower: number; upper: number }, decimals: number): string {
  return `(${ci.lower.toFixed(decimals)}, ${ci.upper.toFixed(decimals)})`;
}

/** Returns true if the 95% CI excludes zero (statistically significant). */
function isSignificant(ci: { lower: number; upper: number }): boolean {
  return ci.lower > 0 || ci.upper < 0;
}

function cellTone(effect: number, ci: { lower: number; upper: number }) {
  if (effect > 0) {
    return isSignificant(ci)
      ? { fill: "#0A6847", opacity: 0.18 }
      : { fill: "#0A6847", opacity: 0.08 };
  }
  if (effect < 0) {
    return isSignificant(ci)
      ? { fill: "#C06090", opacity: 0.18 }
      : { fill: "#C06090", opacity: 0.08 };
  }
  return { fill: "#D4B060", opacity: 0.08 };
}

// ---------------------------------------------------------------------------
// LeagueTable Component
// ---------------------------------------------------------------------------

export function LeagueTable({
  result,
  decimals = 2,
  title,
}: LeagueTableProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const { treatments, leagueTable, leagueTableCI } = result;
  const k = treatments.length;

  // Build P-score lookup for display on diagonal
  const pScoreMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const ps of result.pScores) m.set(ps.treatment, ps.score);
    return m;
  }, [result.pScores]);

  // Compute cell width based on treatment count
  const cellWidth = useMemo(() => {
    if (k <= 4) return 140;
    if (k <= 6) return 120;
    if (k <= 8) return 105;
    return 90;
  }, [k]);

  const cellHeight = 52;
  const totalWidth = cellWidth * k;
  const totalHeight = cellHeight * k;

  return (
    <div className="overflow-x-auto">
      {title && (
        <h4 className="text-sm font-semibold text-ink mb-2">{title}</h4>
      )}
      <div className="inline-block">
        <svg
          width={totalWidth + 2}
          height={totalHeight + 2}
          className="text-ink"
          style={{ fontFamily: "inherit" }}
        >
          {/* Grid cells */}
          {/* empty state: renders nothing when no data */}
          {Array.from({ length: k }).map((_, row) =>
            Array.from({ length: k }).map((_, col) => {
              const x = col * cellWidth + 1;
              const y = row * cellHeight + 1;
              const isDiagonal = row === col;
              const isUpper = row < col;
              const isHovered =
                hoveredCell?.row === row && hoveredCell?.col === col;
              const effect = leagueTable[row][col];
              const ci = leagueTableCI[row][col];

              let bgFill = "#6D28D9";
              let bgOpacity = 0.15;

              if (!isDiagonal) {
                const tone = cellTone(effect, ci);
                bgFill = tone.fill;
                bgOpacity = isHovered
                  ? Math.min(tone.opacity + 0.08, 0.26)
                  : tone.opacity;
              }

              return (
                <g
                  key={`${row}-${col}`}
                  onMouseEnter={() => setHoveredCell({ row, col })}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ cursor: isDiagonal ? "default" : "pointer" }}
                >
                  {/* Cell background */}
                  <rect
                    x={x}
                    y={y}
                    width={cellWidth}
                    height={cellHeight}
                    fill={bgFill}
                    opacity={bgOpacity}
                    rx={2}
                  />

                  {/* Cell border */}
                  <rect
                    x={x}
                    y={y}
                    width={cellWidth}
                    height={cellHeight}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={0.5}
                    opacity={0.1}
                    rx={2}
                  />

                  {/* Content */}
                  {isDiagonal ? (
                    <>
                      {/* Treatment name */}
                      <text
                        x={x + cellWidth / 2}
                        y={y + cellHeight / 2 - 4}
                        textAnchor="middle"
                        className="text-[11px] fill-current font-semibold"
                      >
                        {treatments[row].length > 14
                          ? treatments[row].slice(0, 14) + "..."
                          : treatments[row]}
                      </text>
                      {/* P-score below */}
                      <text
                        x={x + cellWidth / 2}
                        y={y + cellHeight / 2 + 12}
                        textAnchor="middle"
                        className="text-[9px] fill-current"
                        opacity={0.5}
                      >
                        P = {(pScoreMap.get(treatments[row]) ?? 0).toFixed(2)}
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Effect estimate */}
                      <text
                        x={x + cellWidth / 2}
                        y={y + cellHeight / 2 - 4}
                        textAnchor="middle"
                        className="text-[11px] fill-current font-medium"
                        opacity={isSignificant(ci) ? 1 : 0.78}
                      >
                        {formatEffect(effect, decimals)}
                      </text>
                      {/* 95% CI */}
                      <text
                        x={x + cellWidth / 2}
                        y={y + cellHeight / 2 + 10}
                        textAnchor="middle"
                        className="text-[9px] fill-current"
                        opacity={0.5}
                      >
                        {formatCI(ci, decimals)}
                      </text>
                      {/* Direction indicator for upper vs lower triangle */}
                      {isUpper && (
                        <text
                          x={x + cellWidth - 6}
                          y={y + 10}
                          textAnchor="end"
                          className="text-[7px] fill-current"
                          opacity={0.25}
                        >
                          {effect > 0 ? "favours row" : effect < 0 ? "favours column" : "tie"}
                        </text>
                      )}
                    </>
                  )}
                </g>
              );
            })
          )}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-ink/50">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#0A6847", opacity: 0.3 }}
            />
            <span>Positive effect estimate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#C06090", opacity: 0.3 }}
            />
            <span>Negative effect estimate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#6D28D9", opacity: 0.3 }}
            />
            <span>Diagonal (treatment + P-score)</span>
          </div>
        </div>

        {/* Reading guide */}
        <p className="text-[9px] text-ink/40 mt-1">
          Read row vs column. Upper triangle: row treatment vs column treatment.
          Lower triangle: mirrored (reversed sign).
        </p>
      </div>
    </div>
  );
}
