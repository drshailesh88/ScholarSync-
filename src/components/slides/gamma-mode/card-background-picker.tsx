"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ImageSquare,
  X,
  ArrowsOutSimple,
  Rows,
  Columns,
} from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import type { CardBackground } from "@/stores/slides-store";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLOR_PRESETS = [
  "#ffffff",
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#1e293b",
  "#0f172a",
  "#fef2f2",
  "#fef9c3",
  "#ecfdf5",
  "#eff6ff",
  "#f5f3ff",
  "#fdf2f8",
];

type ImagePosition = NonNullable<CardBackground["imagePosition"]>;
type OverlayType = NonNullable<CardBackground["overlayType"]>;

const IMAGE_POSITIONS: { value: ImagePosition; label: string; icon: React.ElementType }[] = [
  { value: "none", label: "None", icon: X },
  { value: "top", label: "Top", icon: Rows },
  { value: "left", label: "Left", icon: Columns },
  { value: "right", label: "Right", icon: Columns },
  { value: "background", label: "Fill", icon: ArrowsOutSimple },
];

const OVERLAY_TYPES: { value: OverlayType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "frosted", label: "Frosted" },
  { value: "faded", label: "Faded" },
  { value: "clear", label: "Clear" },
];

// ---------------------------------------------------------------------------
// CardBackgroundPicker
// ---------------------------------------------------------------------------

interface CardBackgroundPickerProps {
  slideId: number;
}

export function CardBackgroundPicker({ slideId }: CardBackgroundPickerProps) {
  const slide = useSlidesStore((s) => s.slides.find((sl) => sl.id === slideId));
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const bg = slide?.cardBackground ?? {};

  const update = useCallback(
    (changes: Partial<CardBackground>) => {
      const current = useSlidesStore.getState().slides.find((s) => s.id === slideId)?.cardBackground ?? {};
      useSlidesStore.getState().updateSlide(slideId, {
        cardBackground: { ...current, ...changes },
      });
    },
    [slideId],
  );

  const currentPosition = bg.imagePosition ?? "none";
  const currentOverlay = bg.overlayType ?? "none";
  const showOverlayControls = currentOverlay !== "none";

  // Theme-derived preset colors
  const themePresets = [
    themeConfig.primaryColor,
    themeConfig.backgroundColor,
    themeConfig.surfaceColor,
    themeConfig.textColor,
  ].filter(Boolean) as string[];

  const allPresets = [...new Set([...themePresets, ...COLOR_PRESETS])];

  return (
    <div
      className="w-72 p-3 flex flex-col gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
        Card Background
      </div>

      {/* Background color */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-ink-muted">Color</label>
        <div className="flex flex-wrap gap-1.5">
          {allPresets.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => update({ color })}
              className={`w-6 h-6 rounded-md border-2 transition-all ${
                bg.color === color
                  ? "border-brand scale-110 shadow-sm"
                  : "border-border/50 hover:border-brand/50"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Set background color ${color}`}
            />
          ))}
          {/* Custom color input */}
          <label
            className={`w-6 h-6 rounded-md border-2 border-dashed border-border/50 hover:border-brand/50 cursor-pointer flex items-center justify-center overflow-hidden transition-all`}
            aria-label="Custom color"
          >
            <input
              type="color"
              value={bg.color ?? "#ffffff"}
              onChange={(e) => update({ color: e.target.value })}
              className="absolute w-0 h-0 opacity-0"
            />
            <span className="text-[8px] text-ink-muted font-bold">+</span>
          </label>
        </div>
      </div>

      {/* Image URL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-ink-muted">Image URL</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={bg.imageUrl ?? ""}
          onChange={(e) => update({ imageUrl: e.target.value || undefined })}
          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      {/* Image position */}
      {bg.imageUrl && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">
            Image Position
          </label>
          <div className="flex gap-1">
            {IMAGE_POSITIONS.map((pos) => {
              const Icon = pos.icon;
              const isActive = currentPosition === pos.value;
              // Mirror the icon for "right" position
              const flipStyle =
                pos.value === "right" ? { transform: "scaleX(-1)" } : undefined;
              return (
                <button
                  key={pos.value}
                  type="button"
                  onClick={() => update({ imagePosition: pos.value })}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all flex-1 ${
                    isActive
                      ? "bg-brand/10 text-brand border border-brand/30"
                      : "text-ink-muted hover:bg-surface-raised border border-transparent"
                  }`}
                  aria-label={pos.label}
                >
                  <Icon size={16} weight="duotone" style={flipStyle} />
                  <span>{pos.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Overlay type */}
      {bg.imageUrl && currentPosition !== "none" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">Overlay</label>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {OVERLAY_TYPES.map((ov) => {
              const isActive = currentOverlay === ov.value;
              return (
                <button
                  key={ov.value}
                  type="button"
                  onClick={() => update({ overlayType: ov.value })}
                  className={`flex-1 py-1.5 text-[10px] font-medium transition-all ${
                    isActive
                      ? "bg-brand text-white"
                      : "text-ink-muted hover:bg-surface-raised"
                  }`}
                >
                  {ov.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Overlay intensity */}
      {bg.imageUrl && showOverlayControls && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-ink-muted">
              Intensity
            </label>
            <span className="text-[10px] text-ink-muted">
              {bg.overlayIntensity ?? 50}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={bg.overlayIntensity ?? 50}
            onChange={(e) =>
              update({ overlayIntensity: Number(e.target.value) })
            }
            className="w-full accent-brand"
          />
        </div>
      )}

      {/* Overlay color */}
      {bg.imageUrl && showOverlayControls && (
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-ink-muted">
            Overlay Color
          </label>
          <input
            type="color"
            value={bg.overlayColor ?? "#000000"}
            onChange={(e) => update({ overlayColor: e.target.value })}
            className="w-6 h-6 rounded border border-border cursor-pointer"
          />
        </div>
      )}

      {/* Reset */}
      <button
        type="button"
        onClick={() =>
          useSlidesStore.getState().updateSlide(slideId, {
            cardBackground: undefined,
          })
        }
        className="text-xs text-ink-muted hover:text-brand transition-colors self-start"
      >
        Reset to default
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardBackgroundButton — trigger button + popover
// ---------------------------------------------------------------------------

interface CardBackgroundButtonProps {
  slideId: number;
}

export function CardBackgroundButton({ slideId }: CardBackgroundButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative z-10">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={`
          flex items-center justify-center w-8 h-8 rounded-lg
          transition-all duration-150
          ${
            open
              ? "bg-brand text-white shadow-md"
              : "bg-surface-raised/80 hover:bg-brand/10 hover:text-brand text-ink-muted backdrop-blur-sm border border-border/50 shadow-sm"
          }
        `}
        aria-label="Card background settings"
        aria-expanded={open}
      >
        <ImageSquare size={16} weight={open ? "fill" : "duotone"} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 rounded-xl border border-border bg-surface shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <CardBackgroundPicker slideId={slideId} />
        </div>
      )}
    </div>
  );
}
