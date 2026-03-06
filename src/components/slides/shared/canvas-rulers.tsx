"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const RULER_SIZE_PX = 20;
const PPT_INCHES = { width: 13.3333, height: 7.5 };
const INCH_TO_CM = 2.54;

export type RulerUnit = "percent" | "cm" | "in";

interface RulerPosition {
  x: number;
  y: number;
}

interface RulerBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RulerTick {
  value: number;
  position: number;
  label: string | null;
}

interface CanvasRulersProps {
  children: React.ReactNode;
  enabled?: boolean;
  mousePosition: RulerPosition | null;
  selectedBounds: RulerBounds | null;
  unit?: RulerUnit;
  onUnitChange?: (unit: RulerUnit) => void;
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

function toPercentLabel(value: number): string {
  return `${Math.round(value)}%`;
}

function toUnitLabel(value: number, unit: Exclude<RulerUnit, "percent">): string {
  if (Math.abs(value - Math.round(value)) < 1e-6) {
    return `${Math.round(value)}${unit}`;
  }
  return `${value.toFixed(1)}${unit}`;
}

function buildTicks(unit: RulerUnit, axis: "horizontal" | "vertical"): RulerTick[] {
  if (unit === "percent") {
    const ticks: RulerTick[] = [];
    for (let value = 0; value <= 100; value += 5) {
      ticks.push({
        value,
        position: value,
        label: value % 10 === 0 ? toPercentLabel(value) : null,
      });
    }
    return ticks;
  }

  const maxInches = axis === "horizontal" ? PPT_INCHES.width : PPT_INCHES.height;
  const max = unit === "in" ? maxInches : maxInches * INCH_TO_CM;
  const majorStep = 1;
  const minorStep = 0.5;
  const ticks: RulerTick[] = [];

  for (let value = 0; value <= max + 1e-6; value += minorStep) {
    const rounded = Number(value.toFixed(2));
    ticks.push({
      value: rounded,
      position: clampPercent((rounded / max) * 100),
      label: rounded % majorStep === 0 ? toUnitLabel(rounded, unit) : null,
    });
  }
  return ticks;
}

function edgeLabelTransform(position: number): string {
  if (position <= 0) return "translateX(0)";
  if (position >= 100) return "translateX(-100%)";
  return "translateX(-50%)";
}

function edgeVerticalLabelTransform(position: number): string {
  if (position <= 0) return "translateY(0)";
  if (position >= 100) return "translateY(-100%)";
  return "translateY(-50%)";
}

function normalizeBounds(bounds: RulerBounds): RulerBounds {
  const x = clampPercent(bounds.x);
  const y = clampPercent(bounds.y);
  const right = clampPercent(bounds.x + bounds.width);
  const bottom = clampPercent(bounds.y + bounds.height);
  return {
    x,
    y,
    width: Math.max(0, right - x),
    height: Math.max(0, bottom - y),
  };
}

export function CanvasRulers({
  children,
  enabled = true,
  mousePosition,
  selectedBounds,
  unit,
  onUnitChange,
}: CanvasRulersProps) {
  if (!enabled) return <>{children}</>;

  const [internalUnit, setInternalUnit] = useState<RulerUnit>("percent");
  const activeUnit = unit ?? internalUnit;
  const setUnit = onUnitChange ?? setInternalUnit;

  const horizontalTicks = useMemo(
    () => buildTicks(activeUnit, "horizontal"),
    [activeUnit]
  );
  const verticalTicks = useMemo(
    () => buildTicks(activeUnit, "vertical"),
    [activeUnit]
  );

  const xPos = mousePosition ? clampPercent(mousePosition.x) : null;
  const yPos = mousePosition ? clampPercent(mousePosition.y) : null;
  const activeBounds = selectedBounds ? normalizeBounds(selectedBounds) : null;

  return (
    <div
      className="grid grid-cols-[20px_minmax(0,1fr)] grid-rows-[20px_minmax(0,1fr)]"
      style={{
        ["--canvas-ruler-size" as string]: `${RULER_SIZE_PX}px`,
      }}
      data-testid="canvas-rulers"
    >
      <div
        className="relative border border-border/60 bg-[#f1f3f5]"
        style={{
          width: "var(--canvas-ruler-size)",
          height: "var(--canvas-ruler-size)",
        }}
      />

      <div
        className="relative overflow-hidden border-y border-r border-border/60 bg-[#f1f3f5]"
        style={{ height: "var(--canvas-ruler-size)" }}
        data-testid="canvas-ruler-horizontal"
      >
        {activeBounds && (
          <div
            className="pointer-events-none absolute inset-y-0 border-x border-blue-400/60 bg-blue-400/20"
            style={{ left: `${activeBounds.x}%`, width: `${activeBounds.width}%` }}
            data-testid="ruler-selected-region-x"
          />
        )}

        {horizontalTicks.map((tick) => (
          <div
            key={`horizontal-${tick.value}`}
            className="pointer-events-none absolute bottom-0"
            style={{ left: `${tick.position}%` }}
          >
            <div
              className="w-px bg-slate-400"
              style={{ height: tick.label ? "10px" : "6px" }}
            />
            {tick.label && (
              <span
                className="absolute top-[1px] whitespace-nowrap text-[9px] leading-none text-slate-600"
                style={{ transform: edgeLabelTransform(tick.position) }}
                data-testid={`ruler-horizontal-label-${tick.value}`}
              >
                {tick.label}
              </span>
            )}
          </div>
        ))}

        {xPos !== null && (
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-blue-600"
            style={{ left: `${xPos}%` }}
            data-testid="ruler-mouse-indicator-x"
          />
        )}

        <div className="absolute right-1 top-0.5 flex items-center gap-0.5 rounded border border-slate-300 bg-white/90 p-0.5">
          {(["percent", "cm", "in"] as const).map((option) => {
            const label = option === "percent" ? "%" : option;
            const selected = option === activeUnit;
            return (
              <button
                key={option}
                type="button"
                className={cn(
                  "h-3 min-w-4 rounded px-1 text-[8px] font-medium leading-none",
                  selected
                    ? "bg-slate-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                )}
                onClick={() => setUnit(option)}
                data-testid={`ruler-unit-${option}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative overflow-hidden border-x border-b border-border/60 bg-[#f1f3f5]"
        style={{ width: "var(--canvas-ruler-size)" }}
        data-testid="canvas-ruler-vertical"
      >
        {activeBounds && (
          <div
            className="pointer-events-none absolute inset-x-0 border-y border-blue-400/60 bg-blue-400/20"
            style={{ top: `${activeBounds.y}%`, height: `${activeBounds.height}%` }}
            data-testid="ruler-selected-region-y"
          />
        )}

        {verticalTicks.map((tick) => (
          <div
            key={`vertical-${tick.value}`}
            className="pointer-events-none absolute right-0"
            style={{ top: `${tick.position}%` }}
          >
            <div
              className="h-px bg-slate-400"
              style={{ width: tick.label ? "10px" : "6px" }}
            />
            {tick.label && (
              <span
                className="absolute left-[1px] whitespace-nowrap text-[9px] leading-none text-slate-600"
                style={{ transform: edgeVerticalLabelTransform(tick.position) }}
                data-testid={`ruler-vertical-label-${tick.value}`}
              >
                {tick.label}
              </span>
            )}
          </div>
        ))}

        {yPos !== null && (
          <div
            className="pointer-events-none absolute inset-x-0 h-px bg-blue-600"
            style={{ top: `${yPos}%` }}
            data-testid="ruler-mouse-indicator-y"
          />
        )}
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
