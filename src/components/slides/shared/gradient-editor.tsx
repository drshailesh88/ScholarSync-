"use client";

import { useCallback, useRef, useState } from "react";
import type { GradientConfig, GradientStop, ThemeConfig } from "@/types/presentation";
import { buildGradientCSS } from "./slide-background";
import { ColorPicker } from "./color-picker";

// ---------------------------------------------------------------------------
// Gradient Presets
// ---------------------------------------------------------------------------

export interface GradientPreset {
  name: string;
  gradient: GradientConfig;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: "Sunset",
    gradient: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#FF6B6B", position: 0 },
        { color: "#FFA07A", position: 100 },
      ],
    },
  },
  {
    name: "Ocean",
    gradient: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#667EEA", position: 0 },
        { color: "#764BA2", position: 100 },
      ],
    },
  },
  {
    name: "Forest",
    gradient: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#11998E", position: 0 },
        { color: "#38EF7D", position: 100 },
      ],
    },
  },
  {
    name: "Night Sky",
    gradient: {
      type: "linear",
      angle: 180,
      stops: [
        { color: "#0F2027", position: 0 },
        { color: "#203A43", position: 50 },
        { color: "#2C5364", position: 100 },
      ],
    },
  },
  {
    name: "Rose Gold",
    gradient: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#F4C4F3", position: 0 },
        { color: "#FC67FA", position: 100 },
      ],
    },
  },
];

const MAX_STOPS = 5;
const MIN_STOPS = 2;

function buildThemeGradientPreset(theme?: ThemeConfig): GradientPreset | null {
  if (!theme?.gradientFrom || !theme?.gradientTo) return null;
  return {
    name: "Theme Gradient",
    gradient: {
      type: "linear",
      angle: 135,
      stops: [
        { color: theme.gradientFrom, position: 0 },
        { color: theme.gradientTo, position: 100 },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Angle Picker
// ---------------------------------------------------------------------------

function AnglePicker({
  angle,
  onChange,
}: {
  angle: number;
  onChange: (angle: number) => void;
}) {
  const circleRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const computeAngle = useCallback((clientX: number, clientY: number) => {
    const circle = circleRef.current;
    if (!circle) return 0;
    const rect = circle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    // atan2 gives angle from positive X axis; CSS 0deg = to top
    let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    return Math.round(deg);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setDragging(true);
      onChange(computeAngle(e.clientX, e.clientY));
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [computeAngle, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      onChange(computeAngle(e.clientX, e.clientY));
    },
    [dragging, computeAngle, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const rad = ((angle - 90) * Math.PI) / 180;
  const radius = 16; // half of the 32px circle
  const handleX = radius + Math.cos(rad) * (radius - 3);
  const handleY = radius + Math.sin(rad) * (radius - 3);

  return (
    <div className="flex items-center gap-2">
      <div
        ref={circleRef}
        className="relative w-8 h-8 rounded-full border border-border bg-surface cursor-pointer shrink-0"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label="Gradient angle"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={angle}
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-brand"
          style={{
            left: `${handleX}px`,
            top: `${handleY}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <input
        type="number"
        min={0}
        max={360}
        value={angle}
        onChange={(e) => {
          const v = Number.parseInt(e.target.value, 10);
          if (Number.isFinite(v)) onChange(((v % 360) + 360) % 360);
        }}
        className="w-14 text-xs px-2 py-1 border border-border rounded-md bg-surface text-ink"
        aria-label="Angle degrees"
      />
      <span className="text-[10px] text-ink-muted">deg</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gradient Stop Bar
// ---------------------------------------------------------------------------

function GradientStopBar({
  gradient,
  onUpdateStop,
  onAddStop,
  onRemoveStop,
  themeColors,
}: {
  gradient: GradientConfig;
  onUpdateStop: (index: number, stop: Partial<GradientStop>) => void;
  onAddStop: (position: number, color: string) => void;
  onRemoveStop: (index: number) => void;
  themeColors: string[];
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [draggingStop, setDraggingStop] = useState<number | null>(null);

  const sortedStops = gradient.stops
    .map((s, i) => ({ ...s, originalIndex: i }))
    .sort((a, b) => a.position - b.position);

  const handleBarClick = (e: React.MouseEvent) => {
    if (draggingStop !== null) return;
    if (gradient.stops.length >= MAX_STOPS) return;
    const bar = barRef.current;
    if (!bar) return;
    // Don't add if clicking on a stop handle
    if ((e.target as HTMLElement).dataset.stopHandle) return;
    const rect = bar.getBoundingClientRect();
    const position = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const clampedPos = Math.max(0, Math.min(100, position));
    // Interpolate color at this position
    onAddStop(clampedPos, interpolateColorAtPosition(gradient.stops, clampedPos));
  };

  const handleStopPointerDown = (e: React.PointerEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setDraggingStop(index);
    setSelectedStop(index);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleStopPointerMove = (e: React.PointerEvent) => {
    if (draggingStop === null) return;
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const position = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    onUpdateStop(draggingStop, { position: Math.max(0, Math.min(100, position)) });
  };

  const handleStopPointerUp = () => {
    setDraggingStop(null);
  };

  const handleStopDoubleClick = (index: number) => {
    if (gradient.stops.length <= MIN_STOPS) return;
    onRemoveStop(index);
    setSelectedStop(null);
  };

  const cssGradient = buildGradientCSS({
    ...gradient,
    type: "linear",
    angle: 90,
  });

  return (
    <div className="space-y-2">
      {/* Preview bar */}
      <div
        ref={barRef}
        className="relative h-6 rounded-md border border-border cursor-crosshair"
        style={{ background: cssGradient }}
        onClick={handleBarClick}
        onPointerMove={handleStopPointerMove}
        onPointerUp={handleStopPointerUp}
        data-testid="gradient-stop-bar"
      >
        {sortedStops.map((stop) => (
          <div
            key={stop.originalIndex}
            data-stop-handle="true"
            data-testid={`gradient-stop-${stop.originalIndex}`}
            className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 cursor-grab ${
              selectedStop === stop.originalIndex
                ? "border-brand ring-1 ring-brand"
                : "border-white"
            }`}
            style={{
              left: `${stop.position}%`,
              transform: "translate(-50%, -50%)",
              backgroundColor: stop.color,
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
            onPointerDown={(e) => handleStopPointerDown(e, stop.originalIndex)}
            onDoubleClick={() => handleStopDoubleClick(stop.originalIndex)}
          />
        ))}
      </div>

      {/* Color picker for selected stop */}
      {selectedStop !== null && gradient.stops[selectedStop] && (
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <ColorPicker
              value={gradient.stops[selectedStop].color}
              onChange={(color) => onUpdateStop(selectedStop, { color })}
              themeColors={themeColors}
              placement="right"
            />
          </div>
          <span className="text-[10px] text-ink-muted">
            {gradient.stops[selectedStop].color} at {gradient.stops[selectedStop].position}%
          </span>
          {gradient.stops.length > MIN_STOPS && (
            <button
              type="button"
              onClick={() => {
                onRemoveStop(selectedStop);
                setSelectedStop(null);
              }}
              className="ml-auto text-[10px] text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function interpolateColorAtPosition(stops: GradientStop[], position: number): string {
  if (stops.length === 0) return "#888888";
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  if (position <= sorted[0].position) return sorted[0].color;
  if (position >= sorted[sorted.length - 1].position) return sorted[sorted.length - 1].color;

  let left = sorted[0];
  let right = sorted[sorted.length - 1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].position <= position && sorted[i + 1].position >= position) {
      left = sorted[i];
      right = sorted[i + 1];
      break;
    }
  }

  const range = right.position - left.position;
  if (range === 0) return left.color;
  const t = (position - left.position) / range;
  return lerpColor(left.color, right.color, t);
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ];
}

// ---------------------------------------------------------------------------
// GradientEditor — main exported component
// ---------------------------------------------------------------------------

interface GradientEditorProps {
  gradient: GradientConfig;
  onChange: (gradient: GradientConfig) => void;
  themeConfig?: ThemeConfig;
}

export function GradientEditor({ gradient, onChange, themeConfig }: GradientEditorProps) {
  const themeColors = themeConfig
    ? [
        themeConfig.primaryColor,
        themeConfig.secondaryColor,
        themeConfig.accentColor,
        themeConfig.textColor,
        themeConfig.backgroundColor,
      ]
    : [];

  const updateStop = (index: number, partial: Partial<GradientStop>) => {
    const nextStops = gradient.stops.map((s, i) =>
      i === index ? { ...s, ...partial } : s
    );
    onChange({ ...gradient, stops: nextStops });
  };

  const addStop = (position: number, color: string) => {
    if (gradient.stops.length >= MAX_STOPS) return;
    onChange({
      ...gradient,
      stops: [...gradient.stops, { color, position }],
    });
  };

  const removeStop = (index: number) => {
    if (gradient.stops.length <= MIN_STOPS) return;
    onChange({
      ...gradient,
      stops: gradient.stops.filter((_, i) => i !== index),
    });
  };

  const applyPreset = (preset: GradientPreset) => {
    onChange({ ...preset.gradient });
  };

  const themePreset = buildThemeGradientPreset(themeConfig);
  const allPresets = themePreset ? [...GRADIENT_PRESETS, themePreset] : GRADIENT_PRESETS;

  return (
    <div className="space-y-3" data-testid="gradient-editor">
      {/* Gradient type */}
      <div>
        <label className="text-[10px] text-ink-muted block mb-1">Type</label>
        <div className="flex gap-1">
          {(["linear", "radial"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange({ ...gradient, type: t })}
              className={`flex-1 px-2 py-1 text-xs rounded-md border transition-colors ${
                gradient.type === t
                  ? "border-brand bg-brand/10 text-brand font-medium"
                  : "border-border text-ink-muted hover:border-brand/50"
              }`}
            >
              {t === "linear" ? "Linear" : "Radial"}
            </button>
          ))}
        </div>
      </div>

      {/* Angle picker (linear only) */}
      {gradient.type === "linear" && (
        <div>
          <label className="text-[10px] text-ink-muted block mb-1">Angle</label>
          <AnglePicker
            angle={gradient.angle}
            onChange={(angle) => onChange({ ...gradient, angle })}
          />
        </div>
      )}

      {/* Stop bar editor */}
      <div>
        <label className="text-[10px] text-ink-muted block mb-1">
          Stops ({gradient.stops.length}/{MAX_STOPS})
        </label>
      <GradientStopBar
        gradient={gradient}
        onUpdateStop={updateStop}
        onAddStop={addStop}
        onRemoveStop={removeStop}
        themeColors={themeColors}
      />
        <p className="text-[9px] text-ink-muted mt-1">
          Click bar to add stop. Double-click stop to remove.
        </p>
      </div>

      {/* Presets */}
      <div>
        <label className="text-[10px] text-ink-muted block mb-1">Presets</label>
        <div className="grid grid-cols-3 gap-1">
          {allPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded-md border border-border overflow-hidden text-left hover:border-brand/50 transition-colors"
            >
              <div
                className="h-4 w-full"
                style={{
                  background: buildGradientCSS({
                    ...preset.gradient,
                    type: "linear",
                    angle: 90,
                  }),
                }}
              />
              <span className="block text-[9px] text-ink-muted px-1 py-0.5 truncate">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
