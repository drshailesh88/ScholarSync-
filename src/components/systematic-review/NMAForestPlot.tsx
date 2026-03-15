"use client";

import { useMemo, useState } from "react";
import type { NMAResult } from "@/lib/systematic-review/network-meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NMAForestPlotProps {
  result: NMAResult;
  /** Index or name of the reference treatment (default: first treatment). */
  referenceTreatment?: string;
  /** Sort comparisons by effect size (default) or P-score. */
  sortBy?: "effect" | "pscore";
  title?: string;
}

interface ComparisonRow {
  treatment: string;
  effect: number;
  ciLower: number;
  ciUpper: number;
  pScore: number;
  significant: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatVal(val: number): string {
  return val.toFixed(2);
}

// ---------------------------------------------------------------------------
// NMAForestPlot Component
// ---------------------------------------------------------------------------

export function NMAForestPlot({
  result,
  referenceTreatment,
  sortBy = "effect",
  title,
}: NMAForestPlotProps) {
  const { treatments, leagueTable, leagueTableCI, pScores } = result;

  // Resolve reference treatment index
  const refName = referenceTreatment ?? treatments[0];
  const [selectedRef, setSelectedRef] = useState(refName);

  const refIdx = useMemo(
    () => treatments.indexOf(selectedRef),
    [treatments, selectedRef]
  );

  // Build comparison rows (all treatments vs reference)
  const rows = useMemo(() => {
    if (refIdx < 0) return [];

    const pScoreMap = new Map<string, number>();
    for (const ps of pScores) pScoreMap.set(ps.treatment, ps.score);

    const comparisons: ComparisonRow[] = [];
    for (let i = 0; i < treatments.length; i++) {
      if (i === refIdx) continue;
      const ci = leagueTableCI[i][refIdx];
      const significant = ci.lower > 0 || ci.upper < 0;
      comparisons.push({
        treatment: treatments[i],
        effect: leagueTable[i][refIdx],
        ciLower: ci.lower,
        ciUpper: ci.upper,
        pScore: pScoreMap.get(treatments[i]) ?? 0.5,
        significant,
      });
    }

    // Sort
    if (sortBy === "pscore") {
      comparisons.sort((a, b) => b.pScore - a.pScore);
    } else {
      comparisons.sort((a, b) => b.effect - a.effect);
    }

    return comparisons;
  }, [treatments, leagueTable, leagueTableCI, pScores, refIdx, sortBy]);

  // Layout config (mirror ForestPlot style)
  const config = useMemo(() => {
    const rowHeight = 30;
    const labelWidth = 180;
    const plotWidth = 350;
    const statsWidth = 220;
    const totalWidth = labelWidth + plotWidth + statsWidth;
    const headerHeight = 50;
    const footerHeight = 45;
    const totalHeight = headerHeight + rows.length * rowHeight + footerHeight;

    // X-axis range
    const allValues = rows.flatMap((r) => [r.ciLower, r.ciUpper, r.effect]);
    if (allValues.length === 0) {
      return {
        rowHeight, labelWidth, plotWidth, statsWidth, totalWidth,
        headerHeight, footerHeight, totalHeight,
        xMin: -1, xMax: 1,
      };
    }
    const dataMin = Math.min(...allValues);
    const dataMax = Math.max(...allValues);
    const padding = (dataMax - dataMin) * 0.2 || 0.5;

    return {
      rowHeight,
      labelWidth,
      plotWidth,
      statsWidth,
      totalWidth,
      headerHeight,
      footerHeight,
      totalHeight,
      xMin: dataMin - padding,
      xMax: dataMax + padding,
    };
  }, [rows]);

  const xScale = (val: number) => {
    const { xMin, xMax, plotWidth, labelWidth } = config;
    return labelWidth + ((val - xMin) / (xMax - xMin)) * plotWidth;
  };

  const nullX = xScale(0);

  if (refIdx < 0) {
    return (
      <div className="text-sm text-ink/50">
        Reference treatment &quot;{selectedRef}&quot; not found in NMA results.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {title && (
        <h4 className="text-sm font-semibold text-ink mb-2">{title}</h4>
      )}

      {/* Reference treatment selector */}
      <div className="flex items-center gap-2 mb-3">
        <label className="text-[11px] text-ink/60 font-medium">
          Reference treatment:
        </label>
        <select aria-label="Select option"
          value={selectedRef}
          onChange={(e) => setSelectedRef(e.target.value)}
          className="text-[11px] bg-surface-2 border border-ink/10 rounded px-2 py-1 text-ink"
        >
          {treatments.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <svg
        width={config.totalWidth}
        height={config.totalHeight}
        className="text-ink"
        style={{ fontFamily: "inherit" }}
      >
        {/* Header row */}
        <text
          x={config.labelWidth / 2}
          y={20}
          textAnchor="middle"
          className="text-xs font-medium fill-current"
        >
          Treatment
        </text>
        <text
          x={config.labelWidth + config.plotWidth / 2}
          y={20}
          textAnchor="middle"
          className="text-xs font-medium fill-current"
        >
          Effect vs {selectedRef} (95% CI)
        </text>
        <text
          x={config.labelWidth + config.plotWidth + config.statsWidth / 2}
          y={20}
          textAnchor="middle"
          className="text-xs font-medium fill-current"
        >
          Estimate [95% CI]
        </text>

        {/* Sub-header: P-score column label */}
        <text
          x={config.labelWidth + config.plotWidth + config.statsWidth - 10}
          y={38}
          textAnchor="end"
          className="text-[9px] fill-current"
          opacity={0.4}
        >
          P-score
        </text>

        {/* Null effect line (vertical at 0) */}
        <line
          x1={nullX}
          y1={config.headerHeight - 5}
          x2={nullX}
          y2={config.headerHeight + rows.length * config.rowHeight + 5}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4,4"
          opacity={0.35}
        />
        <text
          x={nullX}
          y={config.headerHeight - 10}
          textAnchor="middle"
          className="text-[9px] fill-current"
          opacity={0.4}
        >
          0
        </text>

        {/* Comparison rows */}
        {rows.map((row, i) => {
          const y = config.headerHeight + (i + 0.5) * config.rowHeight;
          const cx = xScale(row.effect);
          const x1 = xScale(Math.max(row.ciLower, config.xMin));
          const x2 = xScale(Math.min(row.ciUpper, config.xMax));
          const diamondHalf = 5;
          const color = row.significant ? "#6366f1" : "#6366f1";
          const fillOpacity = row.significant ? 0.9 : 0.5;

          return (
            <g key={row.treatment}>
              {/* Alternating background */}
              {i % 2 === 0 && (
                <rect
                  x={0}
                  y={y - config.rowHeight / 2}
                  width={config.totalWidth}
                  height={config.rowHeight}
                  fill="currentColor"
                  opacity={0.03}
                />
              )}

              {/* Treatment label */}
              <text
                x={8}
                y={y + 4}
                className="text-[11px] fill-current"
              >
                {row.treatment.length > 24
                  ? row.treatment.slice(0, 24) + "..."
                  : row.treatment}
              </text>

              {/* CI whisker line */}
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke={color}
                strokeWidth={1.5}
                opacity={fillOpacity}
              />

              {/* CI end caps */}
              {row.ciLower >= config.xMin && (
                <line
                  x1={x1}
                  y1={y - 4}
                  x2={x1}
                  y2={y + 4}
                  stroke={color}
                  strokeWidth={1.5}
                  opacity={fillOpacity}
                />
              )}
              {row.ciUpper <= config.xMax && (
                <line
                  x1={x2}
                  y1={y - 4}
                  x2={x2}
                  y2={y + 4}
                  stroke={color}
                  strokeWidth={1.5}
                  opacity={fillOpacity}
                />
              )}

              {/* Diamond for point estimate */}
              <polygon
                points={`${cx - diamondHalf},${y} ${cx},${y - diamondHalf} ${cx + diamondHalf},${y} ${cx},${y + diamondHalf}`}
                fill={color}
                opacity={fillOpacity}
              />

              {/* Significance marker */}
              {row.significant && (
                <text
                  x={cx + diamondHalf + 4}
                  y={y + 3}
                  className="text-[9px] fill-current font-bold"
                  opacity={0.6}
                >
                  *
                </text>
              )}

              {/* Stats: effect [CI] */}
              <text
                x={config.labelWidth + config.plotWidth + 10}
                y={y + 4}
                className="text-[10px] fill-current"
                opacity={row.significant ? 1 : 0.65}
              >
                {formatVal(row.effect)} [{formatVal(row.ciLower)},{" "}
                {formatVal(row.ciUpper)}]
              </text>

              {/* P-score */}
              <text
                x={config.labelWidth + config.plotWidth + config.statsWidth - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-current"
                opacity={0.5}
              >
                {row.pScore.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Reference treatment row (at bottom) */}
        {(() => {
          const y =
            config.headerHeight +
            (rows.length - 0.5) * config.rowHeight +
            config.rowHeight;

          return (
            <g>
              {/* Separator */}
              <line
                x1={0}
                y1={y - config.rowHeight / 2}
                x2={config.totalWidth}
                y2={y - config.rowHeight / 2}
                stroke="currentColor"
                strokeWidth={0.5}
                opacity={0.15}
              />
              <text
                x={8}
                y={y + 4}
                className="text-[11px] fill-current font-semibold"
                opacity={0.5}
              >
                {selectedRef} (reference)
              </text>

              {/* Diamond at null */}
              <polygon
                points={`${nullX - 4},${y} ${nullX},${y - 4} ${nullX + 4},${y} ${nullX},${y + 4}`}
                fill="#dc2626"
                opacity={0.6}
              />

              <text
                x={config.labelWidth + config.plotWidth + 10}
                y={y + 4}
                className="text-[10px] fill-current font-semibold"
                opacity={0.5}
              >
                0.00 (reference)
              </text>

              <text
                x={config.labelWidth + config.plotWidth + config.statsWidth - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-current"
                opacity={0.5}
              >
                {(
                  pScores.find((p) => p.treatment === selectedRef)?.score ?? 0
                ).toFixed(2)}
              </text>
            </g>
          );
        })()}

        {/* Footer: axis labels */}
        <text
          x={config.labelWidth + config.plotWidth * 0.25}
          y={config.totalHeight - 8}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.4}
        >
          Favours {selectedRef}
        </text>
        <text
          x={config.labelWidth + config.plotWidth * 0.75}
          y={config.totalHeight - 8}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.4}
        >
          Favours treatment
        </text>

        {/* Model info */}
        <text
          x={8}
          y={config.totalHeight - 8}
          className="text-[9px] fill-current"
          opacity={0.35}
        >
          {result.model === "random"
            ? `Random-effects NMA (tau² = ${result.tau2.toFixed(4)})`
            : "Fixed-effect NMA"}
          {" | * = statistically significant"}
        </text>
      </svg>
    </div>
  );
}
