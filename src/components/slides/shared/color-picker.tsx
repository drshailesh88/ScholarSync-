"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const SWATCH_COLORS = [
  "#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16",
  "#22C55E", "#10B981", "#14B8A6", "#06B6D4", "#0EA5E9",
  "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF",
  "#EC4899", "#F43F5E", "#1F2937", "#6B7280", "#FFFFFF",
];

const HEX_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, v: 0 };
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function normalizeHex(hex: string): string {
  if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = hex[1], g = hex[2], b = hex[3];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return hex.toUpperCase();
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color);
  const [hsv, setHsv] = useState(() => hexToHsv(color));
  const svCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingSV = useRef(false);
  const draggingHue = useRef(false);

  // Sync external color changes
  useEffect(() => {
    setHexInput(color);
    setHsv(hexToHsv(color));
  }, [color]);

  // Draw SV canvas
  useEffect(() => {
    if (!open) return;
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    // White to hue color (left to right)
    const hueColor = hsvToHex(hsv.h, 1, 1);
    const gradH = ctx.createLinearGradient(0, 0, w, 0);
    gradH.addColorStop(0, "#FFFFFF");
    gradH.addColorStop(1, hueColor);
    ctx.fillStyle = gradH;
    ctx.fillRect(0, 0, w, h);

    // Black overlay (top to bottom)
    const gradV = ctx.createLinearGradient(0, 0, 0, h);
    gradV.addColorStop(0, "rgba(0,0,0,0)");
    gradV.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradV;
    ctx.fillRect(0, 0, w, h);
  }, [open, hsv.h]);

  // Draw hue strip
  useEffect(() => {
    if (!open) return;
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const h = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    const steps = [0, 60, 120, 180, 240, 300, 360];
    const colors = ["#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#FF0000"];
    steps.forEach((s, i) => grad.addColorStop(s / 360, colors[i]));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, h);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const applySV = useCallback((e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const newS = x;
    const newV = 1 - y;
    const newHsv = { h: hsv.h, s: newS, v: newV };
    setHsv(newHsv);
    const hex = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    setHexInput(hex);
    onChange(hex);
  }, [hsv.h, onChange]);

  const applyHue = useCallback((e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const newH = y * 360;
    const newHsv = { ...hsv, h: newH };
    setHsv(newHsv);
    const hex = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    setHexInput(hex);
    onChange(hex);
  }, [hsv, onChange]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (draggingSV.current) applySV(e);
      if (draggingHue.current) applyHue(e);
    };
    const handleUp = () => {
      draggingSV.current = false;
      draggingHue.current = false;
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [applySV, applyHue]);

  const handleHexSubmit = () => {
    const normalized = normalizeHex(hexInput.trim());
    if (HEX_PATTERN.test(normalized)) {
      onChange(normalized);
      setHsv(hexToHsv(normalized));
    } else {
      setHexInput(color);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="text-[10px] text-ink-muted mb-0.5 block">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 w-full rounded-lg border border-border px-2 py-1 hover:border-brand/40 transition-colors"
      >
        <div
          className="w-5 h-5 rounded border border-border/50 shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-[11px] text-ink font-mono">{color}</span>
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 glass-panel rounded-xl p-3 shadow-xl border border-border w-[240px]">
          {/* SV picker + Hue strip */}
          <div className="flex gap-2 mb-2">
            <div className="relative">
              <canvas
                ref={svCanvasRef}
                width={192}
                height={160}
                className="rounded cursor-crosshair block"
                style={{ width: 192, height: 160 }}
                onMouseDown={(e) => { draggingSV.current = true; applySV(e); }}
              />
              {/* SV cursor */}
              <div
                className="absolute w-3 h-3 rounded-full border-2 border-white shadow pointer-events-none"
                style={{
                  left: `${hsv.s * 192 - 6}px`,
                  top: `${(1 - hsv.v) * 160 - 6}px`,
                }}
              />
            </div>
            <div className="relative">
              <canvas
                ref={hueCanvasRef}
                width={20}
                height={160}
                className="rounded cursor-pointer block"
                style={{ width: 20, height: 160 }}
                onMouseDown={(e) => { draggingHue.current = true; applyHue(e); }}
              />
              {/* Hue cursor */}
              <div
                className="absolute left-0 w-5 h-1 bg-white border border-gray-400 rounded-sm pointer-events-none"
                style={{ top: `${(hsv.h / 360) * 160 - 2}px` }}
              />
            </div>
          </div>

          {/* Hex input */}
          <div className="flex items-center gap-1.5 mb-2">
            <div
              className="w-6 h-6 rounded border border-border/50 shrink-0"
              style={{ backgroundColor: color }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              onBlur={handleHexSubmit}
              onKeyDown={(e) => { if (e.key === "Enter") handleHexSubmit(); }}
              className="flex-1 text-[11px] font-mono bg-surface-raised border border-border rounded px-1.5 py-0.5 text-ink"
              maxLength={7}
            />
          </div>

          {/* Swatches */}
          <div className="grid grid-cols-10 gap-0.5">
            {SWATCH_COLORS.map((swatch) => (
              <button
                key={swatch}
                type="button"
                onClick={() => {
                  onChange(swatch);
                  setHsv(hexToHsv(swatch));
                  setHexInput(swatch);
                }}
                className={cn(
                  "w-5 h-5 rounded border transition-all",
                  color === swatch ? "border-brand ring-1 ring-brand/40 scale-110" : "border-border/30 hover:scale-110"
                )}
                style={{ backgroundColor: swatch }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
