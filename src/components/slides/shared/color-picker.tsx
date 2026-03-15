"use client";

import { CaretDown, Eyedropper } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  colorStringToHex,
  hexToHSB,
  hexToRGB,
  hsbToHex,
  isValidHex,
  normalizeHex,
  parseHexColor,
  rgbToHex,
  withHexAlpha,
} from "@/lib/utils/color-utils";

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  showAlpha?: boolean;
  themeColors?: string[];
  recentColors?: string[];
  onRecentColorAdd?: (color: string) => void;
  placement?: "top" | "bottom" | "left" | "right";
}

type InputMode = "hex" | "rgb";
type DragMode = "sb" | "hue" | "alpha" | null;
type EyeDropperResult = { sRGBHex: string };
type EyeDropperInstance = { open: () => Promise<EyeDropperResult> };
type EyeDropperConstructor = new () => EyeDropperInstance;

const SB_WIDTH = 220;
const SB_HEIGHT = 160;
const STRIP_WIDTH = 220;
const STRIP_HEIGHT = 16;
const RECENT_STORAGE_KEY = "slides-recent-colors";
const STANDARD_PALETTE = [
  "#000000",
  "#FFFFFF",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

const CHECKERBOARD_STYLE = {
  backgroundImage:
    "linear-gradient(45deg, rgba(148,163,184,0.18) 25%, transparent 25%, transparent 75%, rgba(148,163,184,0.18) 75%, rgba(148,163,184,0.18)), linear-gradient(45deg, rgba(148,163,184,0.18) 25%, transparent 25%, transparent 75%, rgba(148,163,184,0.18) 75%, rgba(148,163,184,0.18))",
  backgroundPosition: "0 0, 6px 6px",
  backgroundSize: "12px 12px",
};

const PLACEMENT_CLASSES: Record<NonNullable<ColorPickerProps["placement"]>, string> = {
  top: "bottom-full left-0 mb-2",
  bottom: "top-full left-0 mt-2",
  left: "right-full top-0 mr-2",
  right: "left-full top-0 ml-2",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function sanitizeColors(colors?: string[], fallback: string[] = []): string[] {
  const source = colors && colors.length > 0 ? colors : fallback;
  const deduped = new Set<string>();
  for (const color of source) {
    if (!color) continue;
    deduped.add(colorStringToHex(color));
  }
  return [...deduped];
}

function prepareCanvas(
  canvas: HTMLCanvasElement | null,
  width: number,
  height: number,
): CanvasRenderingContext2D | null {
  if (!canvas) return null;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const ratio = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  return context;
}

function drawSaturationBrightness(canvas: HTMLCanvasElement | null, hue: number): void {
  const context = prepareCanvas(canvas, SB_WIDTH, SB_HEIGHT);
  if (!context) return;

  const hueColor = hsbToHex(hue, 100, 100);
  const horizontal = context.createLinearGradient(0, 0, SB_WIDTH, 0);
  horizontal.addColorStop(0, "#FFFFFF");
  horizontal.addColorStop(1, hueColor);
  context.fillStyle = horizontal;
  context.fillRect(0, 0, SB_WIDTH, SB_HEIGHT);

  const vertical = context.createLinearGradient(0, 0, 0, SB_HEIGHT);
  vertical.addColorStop(0, "rgba(0, 0, 0, 0)");
  vertical.addColorStop(1, "rgba(0, 0, 0, 1)");
  context.fillStyle = vertical;
  context.fillRect(0, 0, SB_WIDTH, SB_HEIGHT);
}

function drawHueStrip(canvas: HTMLCanvasElement | null): void {
  const context = prepareCanvas(canvas, STRIP_WIDTH, STRIP_HEIGHT);
  if (!context) return;

  const gradient = context.createLinearGradient(0, 0, STRIP_WIDTH, 0);
  const stops = [
    "#FF0000",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#FF00FF",
    "#FF0000",
  ];

  stops.forEach((color, index) => {
    gradient.addColorStop(index / (stops.length - 1), color);
  });

  context.fillStyle = gradient;
  context.fillRect(0, 0, STRIP_WIDTH, STRIP_HEIGHT);
}

function drawAlphaStrip(canvas: HTMLCanvasElement | null, baseHex: string): void {
  const context = prepareCanvas(canvas, STRIP_WIDTH, STRIP_HEIGHT);
  if (!context) return;

  for (let y = 0; y < STRIP_HEIGHT; y += 8) {
    for (let x = 0; x < STRIP_WIDTH; x += 8) {
      context.fillStyle = (x + y) % 16 === 0 ? "#CBD5E1" : "#F8FAFC";
      context.fillRect(x, y, 8, 8);
    }
  }

  const gradient = context.createLinearGradient(0, 0, STRIP_WIDTH, 0);
  gradient.addColorStop(0, withHexAlpha(baseHex, 0));
  gradient.addColorStop(1, baseHex);
  context.fillStyle = gradient;
  context.fillRect(0, 0, STRIP_WIDTH, STRIP_HEIGHT);
}

function SwatchRow({
  title,
  colors,
  selectedBaseHex,
  onSelect,
  columnsClass = "grid-cols-5",
}: {
  title: string;
  colors: string[];
  selectedBaseHex: string;
  onSelect: (color: string) => void;
  columnsClass?: string;
}) {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        {title}
      </div>
      <div className={cn("grid gap-1.5", columnsClass)}>
        {/* empty state: no data, nothing here */}
        {colors.map((color) => {
          const isSelected =
            colorStringToHex(color).slice(0, 7).toUpperCase() ===
            selectedBaseHex.toUpperCase();
          return (
            <button
              key={`${title}-${color}`}
              type="button"
              onClick={() => onSelect(color)}
              className={cn(
                "relative h-7 rounded-md border transition-transform hover:scale-[1.03]",
                isSelected ? "border-brand ring-1 ring-brand" : "border-border/70",
              )}
              style={{
                ...CHECKERBOARD_STYLE,
                backgroundColor: color,
              }}
              aria-label={`${title} color ${color}`}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ColorPicker({
  value,
  onChange,
  showAlpha = false,
  themeColors,
  recentColors,
  onRecentColorAdd,
  placement = "bottom",
}: ColorPickerProps) {
  const normalizedExternalValue = colorStringToHex(value);
  const initialColor = parseHexColor(normalizedExternalValue);

  const [open, setOpen] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("hex");
  const [hsb, setHsb] = useState(() => hexToHSB(initialColor.hex));
  const [alpha, setAlpha] = useState(initialColor.alpha);
  const [hexInput, setHexInput] = useState(
    showAlpha ? withHexAlpha(initialColor.hex, initialColor.alpha) : initialColor.hex,
  );
  const [localRecentColors, setLocalRecentColors] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const sbCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const alphaCanvasRef = useRef<HTMLCanvasElement>(null);
  const dragModeRef = useRef<DragMode>(null);
  const lastDraggedColorRef = useRef<string | null>(null);
  const hsbRef = useRef(hsb);
  const alphaRef = useRef(alpha);

  const baseHex = useMemo(() => hsbToHex(hsb.h, hsb.s, hsb.b), [hsb]);
  const currentValue = useMemo(
    () => (showAlpha ? withHexAlpha(baseHex, alpha) : baseHex),
    [alpha, baseHex, showAlpha],
  );
  const rgb = useMemo(() => hexToRGB(baseHex), [baseHex]);
  const themeSwatches = useMemo(
    () => sanitizeColors(themeColors),
    [themeColors],
  );
  const recentSwatches = useMemo(
    () => sanitizeColors(recentColors, localRecentColors).slice(0, 8),
    [localRecentColors, recentColors],
  );
  const standardSwatches = useMemo(() => sanitizeColors(STANDARD_PALETTE), []);

  const supportsEyeDropper =
    typeof window !== "undefined" &&
    "EyeDropper" in window;

  useEffect(() => {
    hsbRef.current = hsb;
  }, [hsb]);

  useEffect(() => {
    alphaRef.current = alpha;
  }, [alpha]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setLocalRecentColors(sanitizeColors(parsed).slice(0, 8));
      }
    } catch {
      window.localStorage.removeItem(RECENT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const nextValue = colorStringToHex(value);
    const parsed = parseHexColor(nextValue);
    setHsb(hexToHSB(parsed.hex));
    setAlpha(parsed.alpha);
    setHexInput(showAlpha ? withHexAlpha(parsed.hex, parsed.alpha) : parsed.hex);
  }, [showAlpha, value]);

  useEffect(() => {
    if (!open) return;
    drawSaturationBrightness(sbCanvasRef.current, hsb.h);
  }, [hsb.h, open]);

  useEffect(() => {
    if (!open) return;
    drawHueStrip(hueCanvasRef.current);
  }, [open]);

  useEffect(() => {
    if (!open || !showAlpha) return;
    drawAlphaStrip(alphaCanvasRef.current, baseHex);
  }, [baseHex, open, showAlpha]);

  useEffect(() => {
    if (!open) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragModeRef.current) return;

      if (dragModeRef.current === "sb" && sbCanvasRef.current) {
        const rect = sbCanvasRef.current.getBoundingClientRect();
        const saturation = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
        const brightness = clamp(100 - ((event.clientY - rect.top) / rect.height) * 100, 0, 100);
        const nextHsb = { h: hsbRef.current.h, s: saturation, b: brightness };
        const nextHex = hsbToHex(nextHsb.h, nextHsb.s, nextHsb.b);
        const nextValue = showAlpha ? withHexAlpha(nextHex, alphaRef.current) : nextHex;
        setHsb(nextHsb);
        setHexInput(nextValue);
        lastDraggedColorRef.current = nextValue;
        onChange(nextValue);
      }

      if (dragModeRef.current === "hue" && hueCanvasRef.current) {
        const rect = hueCanvasRef.current.getBoundingClientRect();
        const nextHue = clamp(((event.clientX - rect.left) / rect.width) * 360, 0, 360);
        const nextHsb = { ...hsbRef.current, h: nextHue };
        const nextHex = hsbToHex(nextHsb.h, nextHsb.s, nextHsb.b);
        const nextValue = showAlpha ? withHexAlpha(nextHex, alphaRef.current) : nextHex;
        setHsb(nextHsb);
        setHexInput(nextValue);
        lastDraggedColorRef.current = nextValue;
        onChange(nextValue);
      }

      if (dragModeRef.current === "alpha" && alphaCanvasRef.current) {
        const rect = alphaCanvasRef.current.getBoundingClientRect();
        const nextAlpha = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const nextValue = withHexAlpha(baseHex, nextAlpha);
        setAlpha(nextAlpha);
        setHexInput(showAlpha ? nextValue : baseHex);
        lastDraggedColorRef.current = showAlpha ? nextValue : baseHex;
        onChange(showAlpha ? nextValue : baseHex);
      }
    };

    const handlePointerUp = () => {
      if (dragModeRef.current && lastDraggedColorRef.current) {
        const normalized = colorStringToHex(lastDraggedColorRef.current);
        onRecentColorAdd?.(normalized);
        setLocalRecentColors((previous) => {
          const next = [normalized, ...previous.filter((color) => color !== normalized)].slice(0, 8);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
          }
          return next;
        });
      }
      dragModeRef.current = null;
      lastDraggedColorRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [baseHex, onChange, onRecentColorAdd, open, showAlpha]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function addRecentColor(color: string): void {
    const normalized = colorStringToHex(color);
    onRecentColorAdd?.(normalized);
    setLocalRecentColors((previous) => {
      const next = [normalized, ...previous.filter((item) => item !== normalized)].slice(0, 8);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }

  function applyColor(nextBaseHex: string, nextAlpha = alphaRef.current, addRecent = false): void {
    const nextValue = showAlpha ? withHexAlpha(nextBaseHex, nextAlpha) : nextBaseHex;
    setHexInput(nextValue);
    onChange(nextValue);
    if (addRecent) addRecentColor(nextValue);
  }

  function commitColor(nextColor: string, addRecent = true): void {
    const normalized = colorStringToHex(nextColor);
    const parsed = parseHexColor(normalized);
    setHsb(hexToHSB(parsed.hex));
    setAlpha(parsed.alpha);
    applyColor(parsed.hex, parsed.alpha, addRecent);
  }

  function applyHexInput(): void {
    const normalized = normalizeHex(hexInput);
    if (!normalized || !isValidHex(normalized)) {
      setHexInput(currentValue);
      return;
    }
    commitColor(normalized);
  }

  async function handleEyeDropper(): Promise<void> {
    if (!supportsEyeDropper || typeof window === "undefined") return;
    const Constructor = (window as Window & { EyeDropper?: EyeDropperConstructor }).EyeDropper;
    if (!Constructor) return;

    try {
      const result = await new Constructor().open();
      commitColor(result.sRGBHex);
      setOpen(false);
    } catch {
      // User cancellation should not surface as an error.
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface-raised px-2.5 py-2 text-left transition-colors hover:border-brand/40"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span
          className="relative h-6 w-6 shrink-0 overflow-hidden rounded-md border border-border/70"
          style={CHECKERBOARD_STYLE}
        >
          <span
            className="absolute inset-0"
            style={{ backgroundColor: showAlpha ? currentValue : baseHex }}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11px] font-mono text-ink">
            {currentValue}
          </span>
          <span className="block text-[10px] text-ink-muted">
            {Math.round(hsb.h)}deg · {Math.round(hsb.s)}% · {Math.round(hsb.b)}%
            {showAlpha ? ` · ${Math.round(alpha * 100)}%` : ""}
          </span>
        </span>
        <CaretDown
          size={14}
          className={cn("shrink-0 text-ink-muted transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 w-[248px] rounded-2xl border border-border bg-surface p-3 shadow-2xl",
            PLACEMENT_CLASSES[placement],
          )}
          role="dialog"
          aria-label="Color picker"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-xl border border-border">
              <canvas
                ref={sbCanvasRef}
                className="block cursor-crosshair"
                width={SB_WIDTH}
                height={SB_HEIGHT}
                onPointerDown={(event) => {
                  event.preventDefault();
                  dragModeRef.current = "sb";
                  const rect = event.currentTarget.getBoundingClientRect();
                  const saturation = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
                  const brightness = clamp(100 - ((event.clientY - rect.top) / rect.height) * 100, 0, 100);
                  const nextHsb = { h: hsb.h, s: saturation, b: brightness };
                  const nextHex = hsbToHex(nextHsb.h, nextHsb.s, nextHsb.b);
                  setHsb(nextHsb);
                  setHexInput(showAlpha ? withHexAlpha(nextHex, alpha) : nextHex);
                  lastDraggedColorRef.current = showAlpha ? withHexAlpha(nextHex, alpha) : nextHex;
                  onChange(showAlpha ? withHexAlpha(nextHex, alpha) : nextHex);
                }}
              />
              <span
                className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(15,23,42,0.35)]"
                style={{
                  left: `${(hsb.s / 100) * SB_WIDTH}px`,
                  top: `${((100 - hsb.b) / 100) * SB_HEIGHT}px`,
                }}
              />
            </div>

            <div className="relative overflow-hidden rounded-full border border-border">
              <canvas
                ref={hueCanvasRef}
                className="block cursor-ew-resize"
                width={STRIP_WIDTH}
                height={STRIP_HEIGHT}
                onPointerDown={(event) => {
                  event.preventDefault();
                  dragModeRef.current = "hue";
                  const rect = event.currentTarget.getBoundingClientRect();
                  const nextHue = clamp(((event.clientX - rect.left) / rect.width) * 360, 0, 360);
                  const nextHsb = { ...hsb, h: nextHue };
                  const nextHex = hsbToHex(nextHsb.h, nextHsb.s, nextHsb.b);
                  setHsb(nextHsb);
                  setHexInput(showAlpha ? withHexAlpha(nextHex, alpha) : nextHex);
                  lastDraggedColorRef.current = showAlpha ? withHexAlpha(nextHex, alpha) : nextHex;
                  onChange(showAlpha ? withHexAlpha(nextHex, alpha) : nextHex);
                }}
              />
              <span
                className="pointer-events-none absolute top-1/2 h-5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-black/20 shadow-sm"
                style={{ left: `${(hsb.h / 360) * STRIP_WIDTH}px` }}
              />
            </div>

            {showAlpha && (
              <div
                className="relative overflow-hidden rounded-full border border-border"
                style={CHECKERBOARD_STYLE}
              >
                <canvas
                  ref={alphaCanvasRef}
                  className="block cursor-ew-resize"
                  width={STRIP_WIDTH}
                  height={STRIP_HEIGHT}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    dragModeRef.current = "alpha";
                    const rect = event.currentTarget.getBoundingClientRect();
                    const nextAlpha = clamp((event.clientX - rect.left) / rect.width, 0, 1);
                    setAlpha(nextAlpha);
                    const nextValue = withHexAlpha(baseHex, nextAlpha);
                    setHexInput(nextValue);
                    lastDraggedColorRef.current = nextValue;
                    onChange(nextValue);
                  }}
                />
                <span
                  className="pointer-events-none absolute top-1/2 h-5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-black/20 shadow-sm"
                  style={{ left: `${alpha * STRIP_WIDTH}px` }}
                />
              </div>
            )}

            <div className="space-y-2 rounded-xl border border-border/70 bg-surface-raised p-2.5">
              <div className="flex items-center justify-between">
                <div className="inline-flex rounded-lg border border-border bg-surface">
                  {(["hex", "rgb"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setInputMode(mode)}
                      className={cn(
                        "px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
                        inputMode === mode
                          ? "bg-brand text-white"
                          : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void handleEyeDropper();
                  }}
                  disabled={!supportsEyeDropper}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                    supportsEyeDropper
                      ? "border-border text-ink-muted hover:border-brand/40 hover:text-ink"
                      : "cursor-not-allowed border-border/60 text-ink-muted/50",
                  )}
                >
                  <Eyedropper size={12} />
                  Pick
                </button>
              </div>

              {inputMode === "hex" ? (
                <input aria-label="Text input"
                  type="text"
                  value={hexInput}
                  onChange={(event) => setHexInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") applyHexInput();
                  }}
                  onBlur={applyHexInput}
                  placeholder={showAlpha ? "#RRGGBBAA" : "#RRGGBB"}
                  className="w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-mono text-ink outline-none transition-colors focus:border-brand"
                />
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {(["r", "g", "b"] as const).map((channel) => (
                    <label key={channel} className="space-y-1">
                      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                        {channel}
                      </span>
                      <input aria-label="Number input"
                        type="number"
                        min={0}
                        max={255}
                        value={rgb[channel]}
                        onChange={(event) => {
                          const nextNumber = Number(event.target.value);
                          if (!Number.isFinite(nextNumber)) return;
                          const nextRgb = { ...rgb, [channel]: clamp(nextNumber, 0, 255) };
                          commitColor(rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b), false);
                        }}
                        onBlur={() => addRecentColor(currentValue)}
                        className="w-full rounded-lg border border-border bg-surface px-2 py-1.5 text-xs text-ink outline-none transition-colors focus:border-brand"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            <SwatchRow
              title="Theme"
              colors={themeSwatches}
              selectedBaseHex={baseHex}
              onSelect={(color) => commitColor(color)}
            />
            <SwatchRow
              title="Recent"
              colors={recentSwatches}
              selectedBaseHex={baseHex}
              onSelect={(color) => commitColor(color)}
              columnsClass="grid-cols-4"
            />
            <SwatchRow
              title="Standard"
              colors={standardSwatches}
              selectedBaseHex={baseHex}
              onSelect={(color) => commitColor(color)}
              columnsClass="grid-cols-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
