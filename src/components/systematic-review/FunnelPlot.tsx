"use client";

import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from "recharts";
import type { EffectType } from "@/lib/systematic-review/meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FunnelStudy {
  studyLabel: string;
  effect: number;
  se: number;
  isImputed?: boolean;
}

interface FunnelPlotProps {
  studies: FunnelStudy[];
  pooledEffect: number;
  effectType: EffectType;
  eggerTest?: { intercept: number; se: number; pValue: number } | null;
  title?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FunnelPlot({
  studies,
  pooledEffect,
  effectType,
  eggerTest,
  title,
}: FunnelPlotProps) {
  const displayEffect = (val: number) =>
    effectType === "OR" || effectType === "RR" ? Math.exp(val) : val;

  const data = useMemo(() => {
    return studies.map((s) => ({
      name: s.studyLabel,
      x: displayEffect(s.effect),
      y: s.se,
      isImputed: s.isImputed || false,
    }));
  }, [studies, effectType]);

  const realStudies = data.filter((d) => !d.isImputed);
  const imputedStudies = data.filter((d) => d.isImputed);

  const pooledDisplay = displayEffect(pooledEffect);

  // Compute pseudo-95% CI funnel boundaries
  const maxSE = Math.max(...studies.map((s) => s.se), 0.01);

  // Axis label
  const effectLabel =
    effectType === "OR"
      ? "Odds Ratio"
      : effectType === "RR"
        ? "Risk Ratio"
        : effectType === "SMD"
          ? "Std. Mean Difference"
          : effectType === "MD"
            ? "Mean Difference"
            : "Risk Difference";

  return (
    <div>
      {title && (
        <h4 className="text-sm font-semibold text-ink mb-2">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 10, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis
            type="number"
            dataKey="x"
            name={effectLabel}
            domain={["auto", "auto"]}
          >
            <Label
              value={effectLabel}
              position="bottom"
              offset={20}
              style={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            name="Standard Error"
            reversed
            domain={[0, "auto"]}
          >
            <Label
              value="SE"
              angle={-90}
              position="insideLeft"
              offset={-5}
              style={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
            />
          </YAxis>

          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-surface border border-border rounded px-3 py-2 text-xs shadow-md">
                  <div className="font-medium text-ink">{d.name}</div>
                  <div className="text-ink-muted">
                    {effectLabel}: {d.x.toFixed(3)}
                  </div>
                  <div className="text-ink-muted">SE: {d.y.toFixed(3)}</div>
                  {d.isImputed && (
                    <div className="text-amber-600 mt-1">
                      Imputed (trim-and-fill)
                    </div>
                  )}
                </div>
              );
            }}
          />

          {/* Pooled effect vertical line */}
          <ReferenceLine
            x={pooledDisplay}
            stroke="#6366f1"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />

          {/* Real studies */}
          <Scatter
            data={realStudies}
            fill="#6366f1"
            shape="circle"
            r={4}
          />

          {/* Imputed studies (hollow) */}
          {imputedStudies.length > 0 && (
            <Scatter
              data={imputedStudies}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={1.5}
              shape="circle"
              r={4}
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Egger's test result */}
      {eggerTest && (
        <div className="mt-2 text-xs text-ink-muted text-center">
          Egger&apos;s test: intercept = {eggerTest.intercept.toFixed(3)}, p ={" "}
          {eggerTest.pValue < 0.001
            ? "<0.001"
            : eggerTest.pValue.toFixed(3)}
          {eggerTest.pValue < 0.05 && (
            <span className="ml-1 text-amber-600 font-medium">
              (significant asymmetry detected)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
