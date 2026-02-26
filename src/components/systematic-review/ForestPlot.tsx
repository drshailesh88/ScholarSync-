"use client";

import { useMemo } from "react";
import type { EffectType, PredictionInterval } from "@/lib/systematic-review/meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ForestPlotStudy {
  studyLabel: string;
  effect: number;
  ciLower: number;
  ciUpper: number;
  weight?: number;
  se: number;
}

interface PooledEffect {
  effect: number;
  ciLower: number;
  ciUpper: number;
}

interface ForestPlotProps {
  studies: ForestPlotStudy[];
  pooled: PooledEffect;
  effectType: EffectType;
  heterogeneity?: {
    I2: number;
    tau2: number;
    pValue: number;
  };
  predictionInterval?: PredictionInterval | null;
  title?: string;
}

// ---------------------------------------------------------------------------
// Helper: transform for display
// ---------------------------------------------------------------------------

function displayValue(val: number, effectType: EffectType): number {
  if (effectType === "OR" || effectType === "RR") return Math.exp(val);
  return val;
}

function formatVal(val: number, effectType: EffectType): string {
  return displayValue(val, effectType).toFixed(2);
}

// ---------------------------------------------------------------------------
// Pure SVG Forest Plot
// ---------------------------------------------------------------------------

export function ForestPlot({
  studies,
  pooled,
  effectType,
  heterogeneity,
  predictionInterval,
  title,
}: ForestPlotProps) {
  const config = useMemo(() => {
    const rowHeight = 28;
    const labelWidth = 200;
    const plotWidth = 350;
    const statsWidth = 200;
    const totalWidth = labelWidth + plotWidth + statsWidth;
    const headerHeight = 40;
    // Add an extra row for the prediction interval when present
    const piRows = predictionInterval ? 1 : 0;
    const footerHeight = 60;
    const totalHeight =
      headerHeight + (studies.length + 1 + piRows) * rowHeight + footerHeight;

    // Compute x-axis range (include prediction interval bounds if present)
    const allValues = studies
      .flatMap((s) => [s.ciLower, s.ciUpper])
      .concat([pooled.ciLower, pooled.ciUpper]);
    if (predictionInterval) {
      allValues.push(predictionInterval.lower, predictionInterval.upper);
    }
    const dataMin = Math.min(...allValues);
    const dataMax = Math.max(...allValues);
    const padding = (dataMax - dataMin) * 0.15 || 0.5;
    const xMin = dataMin - padding;
    const xMax = dataMax + padding;

    // Null line: 0 for MD/SMD/RD, 0 (log(1)) for OR/RR
    const nullValue = 0;

    return {
      rowHeight,
      labelWidth,
      plotWidth,
      statsWidth,
      totalWidth,
      headerHeight,
      footerHeight,
      totalHeight,
      xMin,
      xMax,
      nullValue,
    };
  }, [studies, pooled]);

  const xScale = (val: number) => {
    const { xMin, xMax, plotWidth, labelWidth } = config;
    return labelWidth + ((val - xMin) / (xMax - xMin)) * plotWidth;
  };

  const nullX = xScale(config.nullValue);

  // Null line display label
  const nullLabel =
    effectType === "OR" || effectType === "RR" ? "1" : "0";

  return (
    <div className="overflow-x-auto">
      {title && (
        <h4 className="text-sm font-semibold text-ink mb-2">{title}</h4>
      )}
      <svg
        width={config.totalWidth}
        height={config.totalHeight}
        className="text-ink"
        style={{ fontFamily: "inherit" }}
      >
        {/* Header */}
        <text
          x={config.labelWidth / 2}
          y={25}
          textAnchor="middle"
          className="text-xs font-medium fill-current"
        >
          Study
        </text>
        <text
          x={config.labelWidth + config.plotWidth / 2}
          y={25}
          textAnchor="middle"
          className="text-xs font-medium fill-current"
        >
          {effectType} (95% CI)
        </text>
        <text
          x={config.labelWidth + config.plotWidth + config.statsWidth / 2}
          y={25}
          textAnchor="middle"
          className="text-xs font-medium fill-current"
        >
          Weight
        </text>

        {/* Null line */}
        <line
          x1={nullX}
          y1={config.headerHeight}
          x2={nullX}
          y2={config.headerHeight + (studies.length + 1) * config.rowHeight}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4,4"
          opacity={0.4}
        />
        <text
          x={nullX}
          y={config.headerHeight - 5}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.5}
        >
          {nullLabel}
        </text>

        {/* Study rows */}
        {studies.map((study, i) => {
          const y = config.headerHeight + (i + 0.5) * config.rowHeight;
          const cx = xScale(study.effect);
          const x1 = xScale(
            Math.max(study.ciLower, config.xMin)
          );
          const x2 = xScale(
            Math.min(study.ciUpper, config.xMax)
          );
          const maxWeight = Math.max(...studies.map((s) => s.weight || 1));
          const dotSize = Math.max(
            3,
            Math.min(10, ((study.weight || 1) / maxWeight) * 10)
          );

          return (
            <g key={study.studyLabel}>
              {/* Alternating row background */}
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

              {/* Study label */}
              <text
                x={8}
                y={y + 4}
                className="text-[11px] fill-current"
              >
                {study.studyLabel.length > 28
                  ? study.studyLabel.slice(0, 28) + "..."
                  : study.studyLabel}
              </text>

              {/* CI whisker line */}
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="currentColor"
                strokeWidth={1.5}
              />

              {/* CI end caps */}
              {study.ciLower >= config.xMin && (
                <line
                  x1={x1}
                  y1={y - 4}
                  x2={x1}
                  y2={y + 4}
                  stroke="currentColor"
                  strokeWidth={1.5}
                />
              )}
              {study.ciUpper <= config.xMax && (
                <line
                  x1={x2}
                  y1={y - 4}
                  x2={x2}
                  y2={y + 4}
                  stroke="currentColor"
                  strokeWidth={1.5}
                />
              )}

              {/* Effect size square (size = weight) */}
              <rect
                x={cx - dotSize / 2}
                y={y - dotSize / 2}
                width={dotSize}
                height={dotSize}
                fill="#6366f1"
              />

              {/* Stats: effect [CI] */}
              <text
                x={config.labelWidth + config.plotWidth + 10}
                y={y + 4}
                className="text-[10px] fill-current"
              >
                {formatVal(study.effect, effectType)} [{formatVal(study.ciLower, effectType)},{" "}
                {formatVal(study.ciUpper, effectType)}]
              </text>

              {/* Weight */}
              <text
                x={config.labelWidth + config.plotWidth + config.statsWidth - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-current"
                opacity={0.6}
              >
                {(study.weight || 0).toFixed(1)}%
              </text>
            </g>
          );
        })}

        {/* Pooled effect diamond */}
        {(() => {
          const y =
            config.headerHeight + (studies.length + 0.5) * config.rowHeight;
          const cx = xScale(pooled.effect);
          const dLeft = xScale(pooled.ciLower);
          const dRight = xScale(pooled.ciUpper);
          const dh = 6;

          return (
            <g>
              {/* Separator line */}
              <line
                x1={0}
                y1={y - config.rowHeight / 2}
                x2={config.totalWidth}
                y2={y - config.rowHeight / 2}
                stroke="currentColor"
                strokeWidth={0.5}
                opacity={0.2}
              />

              {/* Label */}
              <text
                x={8}
                y={y + 4}
                className="text-[11px] fill-current font-semibold"
              >
                Pooled
              </text>

              {/* Diamond */}
              <polygon
                points={`${dLeft},${y} ${cx},${y - dh} ${dRight},${y} ${cx},${y + dh}`}
                fill="#dc2626"
                opacity={0.85}
              />

              {/* Stats */}
              <text
                x={config.labelWidth + config.plotWidth + 10}
                y={y + 4}
                className="text-[10px] fill-current font-semibold"
              >
                {formatVal(pooled.effect, effectType)} [{formatVal(pooled.ciLower, effectType)},{" "}
                {formatVal(pooled.ciUpper, effectType)}]
              </text>
            </g>
          );
        })()}

        {/* Prediction interval row (dashed, lighter diamond) */}
        {predictionInterval &&
          (() => {
            const piRows = 1; // one extra row after pooled
            const y =
              config.headerHeight +
              (studies.length + 1 + piRows - 0.5) * config.rowHeight;
            const cx = xScale(pooled.effect);
            const piLeft = xScale(
              Math.max(predictionInterval.lower, config.xMin)
            );
            const piRight = xScale(
              Math.min(predictionInterval.upper, config.xMax)
            );
            const dh = 5;

            return (
              <g>
                {/* Label */}
                <text
                  x={8}
                  y={y + 4}
                  className="text-[11px] fill-current"
                  opacity={0.55}
                  fontStyle="italic"
                >
                  Prediction interval
                </text>

                {/* Dashed diamond outline for prediction interval */}
                <polygon
                  points={`${piLeft},${y} ${cx},${y - dh} ${piRight},${y} ${cx},${y + dh}`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth={1.5}
                  strokeDasharray="4,3"
                  opacity={0.55}
                />

                {/* Stats */}
                <text
                  x={config.labelWidth + config.plotWidth + 10}
                  y={y + 4}
                  className="text-[10px] fill-current"
                  opacity={0.55}
                >
                  [{formatVal(predictionInterval.lower, effectType)},{" "}
                  {formatVal(predictionInterval.upper, effectType)}]
                </text>
              </g>
            );
          })()}

        {/* Footer: heterogeneity stats */}
        {heterogeneity && (
          <text
            x={8}
            y={config.totalHeight - 15}
            className="text-[10px] fill-current"
            opacity={0.6}
          >
            Heterogeneity: I² = {heterogeneity.I2.toFixed(1)}%, τ² ={" "}
            {heterogeneity.tau2.toFixed(4)}, p ={" "}
            {heterogeneity.pValue < 0.001
              ? "<0.001"
              : heterogeneity.pValue.toFixed(3)}
          </text>
        )}

        {/* Axis labels */}
        <text
          x={config.labelWidth + config.plotWidth * 0.25}
          y={config.totalHeight - 5}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.5}
        >
          Favours control
        </text>
        <text
          x={config.labelWidth + config.plotWidth * 0.75}
          y={config.totalHeight - 5}
          textAnchor="middle"
          className="text-[10px] fill-current"
          opacity={0.5}
        >
          Favours treatment
        </text>
      </svg>
    </div>
  );
}
