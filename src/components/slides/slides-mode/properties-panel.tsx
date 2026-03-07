"use client";

import { useEffect, useMemo, useState } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import { ThemePicker } from "@/components/presentation/theme-picker";
import { LayoutPicker } from "@/components/presentation/layout-picker";
import { AiToolsDropdown } from "@/components/presentation/ai-tools-dropdown";
import { CoachPanel } from "@/components/presentation/coach-panel";
import { MasterEditor } from "@/components/slides/shared/master-editor";
import { GradientEditor } from "@/components/slides/shared/gradient-editor";
import { BlockPropertyEditor } from "./block-property-editor";
import { TEXT_COLOR_OPTIONS } from "@/components/slides/wysiwyg/text-formatting-options";
import { applyAnimationPreset, countRevealSteps } from "@/lib/presentation/animation-presets";
import type {
  ContentBlock,
  SlideLayout,
  ThemeConfig,
  InstitutionKit,
  BlockPosition,
  AnimationPresetKey,
  GradientConfig,
} from "@/types/presentation";
import type { CardBackground, SlideTransition } from "@/stores/slides-store";

const TRANSITION_OPTIONS: { value: SlideTransition; label: string; tooltip?: string }[] = [
  { value: "none", label: "None" },
  { value: "fade", label: "Fade" },
  { value: "slide", label: "Slide" },
  { value: "zoom", label: "Zoom" },
  { value: "morph", label: "Morph", tooltip: "Automatically animates matching elements between slides" },
];

const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

const IMAGE_POSITION_OPTIONS: { value: NonNullable<CardBackground["imagePosition"]>; label: string }[] = [
  { value: "cover", label: "Cover" },
  { value: "contain", label: "Contain" },
  { value: "top", label: "Top" },
  { value: "center", label: "Center" },
  { value: "bottom", label: "Bottom" },
];

const OVERLAY_OPTIONS: { value: NonNullable<CardBackground["overlayType"]>; label: string }[] = [
  { value: "none", label: "None" },
  { value: "frosted", label: "Frosted" },
  { value: "faded", label: "Faded" },
];

const ANIMATION_PRESET_OPTIONS: { value: AnimationPresetKey; label: string }[] = [
  { value: "sequential_build", label: "Sequential Build" },
  { value: "fade_all", label: "Fade All" },
  { value: "stagger", label: "Stagger" },
  { value: "results_reveal", label: "Results Reveal" },
  { value: "none", label: "None" },
];

function normalizeDegrees(value: number): number {
  const normalized = value % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

function flipScale(value?: number): number {
  const current = typeof value === "number" && Number.isFinite(value) ? value : 1;
  return current * -1;
}

export function PropertiesPanel() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const selectedBlockIndices = useSlidesStore((s) => s.selectedBlockIndices);
  const primarySelectedBlockIndex = useSlidesStore((s) => s.getPrimarySelectedBlockIndex());
  const selectedBlock = useSlidesStore((s) => s.getSelectedBlock());
  const slides = useSlidesStore((s) => s.slides);
  const deckId = useSlidesStore((s) => s.deckId);
  const masters = useSlidesStore((s) => s.masters);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const setTheme = useSlidesStore((s) => s.setTheme);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const applyTransitionToAllSlides = useSlidesStore((s) => s.applyTransitionToAllSlides);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const deleteSelectedBlocks = useSlidesStore((s) => s.deleteSelectedBlocks);
  const transition = useSlidesStore((s) => s.transition);
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const setInstitutionKit = useSlidesStore((s) => s.setInstitutionKit);
  const [customHex, setCustomHex] = useState(activeSlide?.cardBackground?.color ?? "");
  const [activeTab, setActiveTab] = useState<"design" | "animation">("design");
  const [animationPreset, setAnimationPreset] = useState<AnimationPresetKey>("sequential_build");
  const [showMasterEditor, setShowMasterEditor] = useState(false);

  useEffect(() => {
    setCustomHex(activeSlide?.cardBackground?.color ?? "");
  }, [activeSlide?.id, activeSlide?.cardBackground?.color]);

  const animatedBlockCount = useMemo(() => {
    if (!activeSlide) return 0;
    return activeSlide.contentBlocks.filter(
      (block) => block.animation && block.animation.type !== "none"
    ).length;
  }, [activeSlide]);

  const revealStepCount = useMemo(
    () => (activeSlide ? countRevealSteps(activeSlide.contentBlocks) : 0),
    [activeSlide]
  );

  const revealOrders = useMemo(() => {
    if (!activeSlide) return [] as number[];
    const values = new Set<number>();
    for (const block of activeSlide.contentBlocks) {
      if (block.animation && block.animation.type !== "none") {
        values.add(Math.max(1, Math.floor(block.animation.order)));
      }
    }
    return [...values].sort((a, b) => a - b);
  }, [activeSlide]);

  const updateKit = (partial: Partial<InstitutionKit>) => {
    setInstitutionKit({ ...(institutionKit ?? {}), ...partial });
  };

  const background = activeSlide?.cardBackground;
  const overlayType = background?.overlayType === "clear" ? "none" : background?.overlayType ?? "none";
  const imagePosition = IMAGE_POSITION_OPTIONS.some((opt) => opt.value === background?.imagePosition)
    ? (background?.imagePosition as NonNullable<CardBackground["imagePosition"]>)
    : "cover";
  const intensity = background?.overlayIntensity ?? 50;
  const effectiveTransition = activeSlide?.transition ?? transition;

  type BackgroundType = "solid" | "gradient" | "image";
  const derivedBgType: BackgroundType = background?.gradient
    ? "gradient"
    : background?.imageUrl
      ? "image"
      : "solid";
  const [bgType, setBgType] = useState<BackgroundType>(derivedBgType);

  // Sync bgType when active slide changes
  useEffect(() => {
    setBgType(
      background?.gradient
        ? "gradient"
        : background?.imageUrl
          ? "image"
          : "solid"
    );
  }, [activeSlide?.id, background?.gradient, background?.imageUrl]);

  const handleBgTypeChange = (type: BackgroundType) => {
    setBgType(type);
    if (!activeSlide) return;
    if (type === "solid") {
      updateCardBackground({ gradient: undefined, imageUrl: undefined });
    } else if (type === "gradient") {
      if (!background?.gradient) {
        const defaultGradient: GradientConfig = {
          type: "linear",
          angle: 135,
          stops: [
            { color: "#667EEA", position: 0 },
            { color: "#764BA2", position: 100 },
          ],
        };
        updateCardBackground({ gradient: defaultGradient, imageUrl: undefined });
      }
    } else if (type === "image") {
      updateCardBackground({ gradient: undefined });
    }
  };

  const updateCardBackground = (changes: Partial<CardBackground>) => {
    if (!activeSlide) return;
    const current = activeSlide.cardBackground ?? {};
    updateSlide(activeSlide.id, { cardBackground: { ...current, ...changes } });
  };

  const handleCustomHexChange = (value: string) => {
    setCustomHex(value);
    if (HEX_COLOR_PATTERN.test(value)) {
      updateCardBackground({ color: value });
    }
  };

  const selectedCount = selectedBlockIndices.size;
  const positionedSelection = useMemo(() => {
    if (!activeSlide) return [] as { index: number; position: BlockPosition }[];

    return [...selectedBlockIndices]
      .sort((a, b) => a - b)
      .map((index) => {
        const block = activeSlide.contentBlocks[index];
        if (!block?.position) return null;
        return { index, position: block.position };
      })
      .filter((entry): entry is { index: number; position: BlockPosition } => entry !== null);
  }, [activeSlide, selectedBlockIndices]);

  const applyPositionUpdates = (updates: Map<number, BlockPosition>) => {
    if (!activeSlide || updates.size === 0) return;
    const nextBlocks = [...activeSlide.contentBlocks];
    for (const [index, position] of updates.entries()) {
      const current = nextBlocks[index];
      if (!current) continue;
      nextBlocks[index] = {
        ...current,
        position: {
          x: Number(position.x.toFixed(4)),
          y: Number(position.y.toFixed(4)),
          width: Number(position.width.toFixed(4)),
          height: Number(position.height.toFixed(4)),
        },
      };
    }
    updateSlide(activeSlide.id, { contentBlocks: nextBlocks });
  };

  const alignSelectedBlockToCanvas = (
    axis: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) => {
    if (!activeSlide || selectedCount !== 1 || primarySelectedBlockIndex === null) return;
    const block = activeSlide.contentBlocks[primarySelectedBlockIndex];
    if (!block?.position) return;

    let nextX = block.position.x;
    let nextY = block.position.y;

    if (axis === "left") nextX = 0;
    if (axis === "center") nextX = 50 - block.position.width / 2;
    if (axis === "right") nextX = 100 - block.position.width;
    if (axis === "top") nextY = 0;
    if (axis === "middle") nextY = 50 - block.position.height / 2;
    if (axis === "bottom") nextY = 100 - block.position.height;

    const updates = new Map<number, BlockPosition>();
    updates.set(primarySelectedBlockIndex, {
      ...block.position,
      x: Math.max(0, Math.min(100 - block.position.width, nextX)),
      y: Math.max(0, Math.min(100 - block.position.height, nextY)),
    });

    applyPositionUpdates(updates);
  };

  const alignBlocks = (
    axis: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) => {
    if (positionedSelection.length < 2) return;

    const left = Math.min(...positionedSelection.map((item) => item.position.x));
    const right = Math.max(
      ...positionedSelection.map((item) => item.position.x + item.position.width)
    );
    const top = Math.min(...positionedSelection.map((item) => item.position.y));
    const bottom = Math.max(
      ...positionedSelection.map((item) => item.position.y + item.position.height)
    );
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    const updates = new Map<number, BlockPosition>();
    for (const item of positionedSelection) {
      let nextX = item.position.x;
      let nextY = item.position.y;

      if (axis === "left") nextX = left;
      if (axis === "center") nextX = centerX - item.position.width / 2;
      if (axis === "right") nextX = right - item.position.width;
      if (axis === "top") nextY = top;
      if (axis === "middle") nextY = centerY - item.position.height / 2;
      if (axis === "bottom") nextY = bottom - item.position.height;

      updates.set(item.index, {
        ...item.position,
        x: Math.max(0, Math.min(100 - item.position.width, nextX)),
        y: Math.max(0, Math.min(100 - item.position.height, nextY)),
      });
    }

    applyPositionUpdates(updates);
  };

  const distributeBlocks = (axis: "horizontal" | "vertical") => {
    if (positionedSelection.length < 3) return;

    const sorted = [...positionedSelection].sort((a, b) =>
      axis === "horizontal"
        ? a.position.x + a.position.width / 2 - (b.position.x + b.position.width / 2)
        : a.position.y + a.position.height / 2 - (b.position.y + b.position.height / 2)
    );

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (!first || !last) return;

    const firstCenter =
      axis === "horizontal"
        ? first.position.x + first.position.width / 2
        : first.position.y + first.position.height / 2;
    const lastCenter =
      axis === "horizontal"
        ? last.position.x + last.position.width / 2
        : last.position.y + last.position.height / 2;
    const step = (lastCenter - firstCenter) / (sorted.length - 1);

    const updates = new Map<number, BlockPosition>();
    sorted.forEach((item, idx) => {
      if (idx === 0 || idx === sorted.length - 1) return;
      const targetCenter = firstCenter + step * idx;
      if (axis === "horizontal") {
        const nextX = targetCenter - item.position.width / 2;
        updates.set(item.index, {
          ...item.position,
          x: Math.max(0, Math.min(100 - item.position.width, nextX)),
        });
      } else {
        const nextY = targetCenter - item.position.height / 2;
        updates.set(item.index, {
          ...item.position,
          y: Math.max(0, Math.min(100 - item.position.height, nextY)),
        });
      }
    });

    applyPositionUpdates(updates);
  };

  // Show block-specific editor when exactly one non-text block is selected
  const showBlockEditor =
    selectedCount === 1 &&
    selectedBlock !== null &&
    !["text", "bullets", "quote"].includes(selectedBlock.type);
  const canAlignSingleBlockToCanvas =
    selectedCount === 1 &&
    primarySelectedBlockIndex !== null &&
    Boolean(activeSlide?.contentBlocks[primarySelectedBlockIndex]?.position);
  const canTransformSingleBlock =
    selectedCount === 1 &&
    primarySelectedBlockIndex !== null &&
    selectedBlock !== null &&
    Boolean(activeSlide?.contentBlocks[primarySelectedBlockIndex]);
  const selectedRotation = selectedBlock?.rotation ?? 0;

  const updateSelectedBlockTransform = (
    partial: Pick<Partial<ContentBlock>, "rotation" | "scaleX" | "scaleY">
  ) => {
    if (!activeSlide || primarySelectedBlockIndex === null || !selectedBlock) return;
    const nextBlocks = [...activeSlide.contentBlocks];
    nextBlocks[primarySelectedBlockIndex] = {
      ...selectedBlock,
      ...partial,
    };
    updateSlide(activeSlide.id, { contentBlocks: nextBlocks });
  };

  const setRotation = (nextRotation: number) => {
    updateSelectedBlockTransform({ rotation: normalizeDegrees(nextRotation) });
  };

  const flipSelectedBlock = (axis: "horizontal" | "vertical") => {
    if (!selectedBlock) return;
    if (axis === "horizontal") {
      updateSelectedBlockTransform({ scaleX: flipScale(selectedBlock.scaleX) });
      return;
    }
    updateSelectedBlockTransform({ scaleY: flipScale(selectedBlock.scaleY) });
  };

  const applyPresetToSlide = () => {
    if (!activeSlide) return;
    const nextBlocks = applyAnimationPreset(activeSlide.contentBlocks, animationPreset);
    updateSlide(activeSlide.id, { contentBlocks: nextBlocks });
  };

  const clearAnimations = () => {
    if (!activeSlide) return;
    const nextBlocks = activeSlide.contentBlocks.map((block) => ({
      ...block,
      animation: undefined,
    }));
    updateSlide(activeSlide.id, { contentBlocks: nextBlocks });
  };

  return (
    <aside className="w-72 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto">
      <div className="p-4 space-y-5">
        <div className="inline-flex w-full rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setActiveTab("design")}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "design"
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("animation")}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "animation"
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Animation
          </button>
        </div>

        {activeTab === "design" && (
          <>
        {selectedCount > 1 && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Selection
            </h3>
            <div className="space-y-2 rounded-lg border border-border bg-surface-raised p-2.5">
              <p className="text-xs text-ink-muted">{selectedCount} blocks selected</p>
              <button
                type="button"
                onClick={deleteSelectedBlocks}
                className="w-full rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
              >
                Delete All
              </button>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Align
                </p>
                <div className="grid grid-cols-3 gap-1">
                  <button type="button" onClick={() => alignBlocks("left")} className="rounded border border-border px-1 py-1 text-[10px]">Left</button>
                  <button type="button" onClick={() => alignBlocks("center")} className="rounded border border-border px-1 py-1 text-[10px]">Center</button>
                  <button type="button" onClick={() => alignBlocks("right")} className="rounded border border-border px-1 py-1 text-[10px]">Right</button>
                  <button type="button" onClick={() => alignBlocks("top")} className="rounded border border-border px-1 py-1 text-[10px]">Top</button>
                  <button type="button" onClick={() => alignBlocks("middle")} className="rounded border border-border px-1 py-1 text-[10px]">Middle</button>
                  <button type="button" onClick={() => alignBlocks("bottom")} className="rounded border border-border px-1 py-1 text-[10px]">Bottom</button>
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Distribute
                </p>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    disabled={positionedSelection.length < 3}
                    onClick={() => distributeBlocks("horizontal")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Horizontal
                  </button>
                  <button
                    type="button"
                    disabled={positionedSelection.length < 3}
                    onClick={() => distributeBlocks("vertical")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Vertical
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCount === 1 && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Selection
            </h3>
            <div className="space-y-2 rounded-lg border border-border bg-surface-raised p-2.5">
              <p className="text-xs text-ink-muted">
                Align selected block to canvas
              </p>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Align
                </p>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    disabled={!canAlignSingleBlockToCanvas}
                    onClick={() => alignSelectedBlockToCanvas("left")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Left
                  </button>
                  <button
                    type="button"
                    disabled={!canAlignSingleBlockToCanvas}
                    onClick={() => alignSelectedBlockToCanvas("center")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Center
                  </button>
                  <button
                    type="button"
                    disabled={!canAlignSingleBlockToCanvas}
                    onClick={() => alignSelectedBlockToCanvas("right")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Right
                  </button>
                  <button
                    type="button"
                    disabled={!canAlignSingleBlockToCanvas}
                    onClick={() => alignSelectedBlockToCanvas("top")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Top
                  </button>
                  <button
                    type="button"
                    disabled={!canAlignSingleBlockToCanvas}
                    onClick={() => alignSelectedBlockToCanvas("middle")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Middle
                  </button>
                  <button
                    type="button"
                    disabled={!canAlignSingleBlockToCanvas}
                    onClick={() => alignSelectedBlockToCanvas("bottom")}
                    className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Bottom
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Rotation
                </p>
                <div className="space-y-1.5">
                  <input
                    type="number"
                    min={0}
                    max={360}
                    step={1}
                    value={Number(selectedRotation.toFixed(2))}
                    disabled={!canTransformSingleBlock}
                    onChange={(e) => {
                      const value = Number.parseFloat(e.target.value);
                      if (!Number.isFinite(value)) return;
                      setRotation(value);
                    }}
                    className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-ink disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Rotation in degrees"
                  />
                  <div className="grid grid-cols-4 gap-1">
                    {[0, 90, 180, 270].map((angle) => (
                      <button
                        key={angle}
                        type="button"
                        disabled={!canTransformSingleBlock}
                        onClick={() => setRotation(angle)}
                        className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {angle}°
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      disabled={!canTransformSingleBlock}
                      onClick={() => flipSelectedBlock("horizontal")}
                      className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Flip Horizontal
                    </button>
                    <button
                      type="button"
                      disabled={!canTransformSingleBlock}
                      onClick={() => flipSelectedBlock("vertical")}
                      className="rounded border border-border px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Flip Vertical
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Block Properties — shown when a non-text block is selected */}
        {showBlockEditor && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Block Properties
            </h3>
            <BlockPropertyEditor />
          </div>
        )}

        {/* Background */}
        {activeSlide && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Background
            </h3>
            <div className="space-y-3">
              {/* Background Type Toggle */}
              <div className="flex gap-1 rounded-lg border border-border p-0.5">
                {(["solid", "gradient", "image"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleBgTypeChange(t)}
                    className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                      bgType === t
                        ? "bg-brand/10 text-brand"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t === "solid" ? "Solid" : t === "gradient" ? "Gradient" : "Image"}
                  </button>
                ))}
              </div>

              {/* Solid color controls */}
              {bgType === "solid" && (
                <div>
                  <label className="text-[10px] text-ink-muted block mb-1">Color</label>
                  <div className="grid grid-cols-10 gap-1.5 mb-2">
                    {TEXT_COLOR_OPTIONS.map((colorValue) => (
                      <button
                        key={colorValue}
                        type="button"
                        onClick={() => {
                          setCustomHex(colorValue);
                          updateCardBackground({ color: colorValue });
                        }}
                        className={`h-5 w-5 rounded border ${
                          background?.color === colorValue ? "ring-2 ring-brand border-brand" : "border-border"
                        }`}
                        style={{ backgroundColor: colorValue }}
                        aria-label={`Select background color ${colorValue}`}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => handleCustomHexChange(e.target.value)}
                    placeholder="#RRGGBB"
                    className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
                  />
                </div>
              )}

              {/* Gradient controls */}
              {bgType === "gradient" && background?.gradient && (
                <GradientEditor
                  gradient={background.gradient}
                  onChange={(gradient) => updateCardBackground({ gradient })}
                  themeConfig={useSlidesStore.getState().themeConfig}
                />
              )}

              {/* Image controls */}
              {bgType === "image" && (
                <>
                  <div>
                    <label className="text-[10px] text-ink-muted block mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={background?.imageUrl ?? ""}
                      onChange={(e) =>
                        updateCardBackground({ imageUrl: e.target.value.trim() || undefined })
                      }
                      placeholder="https://..."
                      className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
                    />
                    {background?.imageUrl && (
                      <div className="mt-2 rounded border border-border overflow-hidden w-full h-16 bg-surface-raised">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={background.imageUrl} alt="Background preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] text-ink-muted block mb-0.5">Image Position</label>
                    <select
                      value={imagePosition}
                      onChange={(e) =>
                        updateCardBackground({
                          imagePosition: e.target.value as NonNullable<CardBackground["imagePosition"]>,
                        })
                      }
                      className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink focus:outline-none focus:border-brand"
                    >
                      {IMAGE_POSITION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Overlay (shared across all types) */}
              <div>
                <label className="text-[10px] text-ink-muted block mb-0.5">Overlay</label>
                <select
                  value={overlayType}
                  onChange={(e) =>
                    updateCardBackground({
                      overlayType: e.target.value as NonNullable<CardBackground["overlayType"]>,
                    })
                  }
                  className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink focus:outline-none focus:border-brand"
                >
                  {OVERLAY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {overlayType !== "none" && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-ink-muted">Intensity</label>
                      <span className="text-[10px] text-ink-muted">{intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={intensity}
                      onChange={(e) => updateCardBackground({ overlayIntensity: Number(e.target.value) })}
                      className="w-full accent-brand"
                    />
                    <div>
                      <label className="text-[10px] text-ink-muted block mb-0.5">Overlay Color</label>
                      <input
                        type="text"
                        value={background?.overlayColor ?? "#000000"}
                        onChange={(e) => updateCardBackground({ overlayColor: e.target.value })}
                        className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => updateSlide(activeSlide.id, { cardBackground: undefined })}
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md text-ink-muted hover:text-ink hover:border-brand/60 transition-colors"
              >
                Reset to Theme Default
              </button>
            </div>
          </div>
        )}

        {/* Theme */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Theme
          </h3>
          <ThemePicker
            activeKey={themeKey}
            onChange={(key: string, config: ThemeConfig) => setTheme(key, config)}
          />
        </div>

        {/* Branding (Institution Kit) */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Branding
          </h3>
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-ink-muted block mb-0.5">Institution Name</label>
              <input
                type="text"
                value={institutionKit?.name ?? ""}
                onChange={(e) => updateKit({ name: e.target.value })}
                placeholder="e.g. Harvard Medical School"
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted block mb-0.5">Footer Text</label>
              <input
                type="text"
                value={institutionKit?.footerText ?? ""}
                onChange={(e) => updateKit({ footerText: e.target.value })}
                placeholder="e.g. Confidential — Do Not Distribute"
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted block mb-0.5">Logo URL</label>
              <input
                type="text"
                value={institutionKit?.logoUrl ?? ""}
                onChange={(e) => updateKit({ logoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Layout
          </h3>
          <LayoutPicker
            active={activeSlide?.layout ?? "title_content"}
            onChange={(layout: SlideLayout) => {
              if (activeSlide) updateSlide(activeSlide.id, { layout });
            }}
          />
        </div>

        {/* Slide Master */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Slide Master
          </h3>
          <div className="space-y-2">
            <select
              value={activeSlide?.masterId ?? ""}
              onChange={(event) => {
                if (!activeSlide) return;
                const nextMasterId = event.target.value;
                if (!nextMasterId) {
                  updateSlide(activeSlide.id, { masterId: undefined });
                  return;
                }
                const selectedMaster = masters.find((master) => master.id === nextMasterId);
                updateSlide(activeSlide.id, {
                  masterId: nextMasterId,
                  ...(selectedMaster ? { layout: selectedMaster.layout } : {}),
                });
              }}
              className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink focus:outline-none focus:border-brand"
            >
              <option value="">No Master</option>
              {masters.map((master) => (
                <option key={master.id} value={master.id}>
                  {master.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowMasterEditor(true)}
              className="w-full rounded-md border border-border px-2 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-brand/60 transition-colors"
            >
              Edit Masters
            </button>
          </div>
        </div>

        {/* Transition */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Transition
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {TRANSITION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    if (!activeSlide) return;
                    updateSlide(activeSlide.id, { transition: opt.value });
                  }}
                  title={opt.tooltip}
                  className={`px-2.5 py-1.5 text-xs rounded-md border transition-colors ${
                    effectiveTransition === opt.value
                      ? "border-brand bg-brand/10 text-brand font-medium"
                      : "border-border text-ink-muted hover:border-brand/50 hover:text-ink"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!activeSlide}
              onClick={() => activeSlide && applyTransitionToAllSlides(activeSlide.transition ?? transition)}
              className="shrink-0 px-2.5 py-1.5 text-[11px] rounded-md border border-border text-ink-muted hover:border-brand/50 hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Apply to All Slides
            </button>
          </div>
          <p className="mt-1 text-[10px] text-ink-muted">
            Slides without a transition use the global default.
          </p>
        </div>

        {/* AI Tools */}
        {activeSlide && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              AI Tools
            </h3>
            <AiToolsDropdown
              title={activeSlide.title}
              subtitle={activeSlide.subtitle}
              contentBlocks={activeSlide.contentBlocks}
              speakerNotes={activeSlide.speakerNotes}
              onApply={(blocks: ContentBlock[], notes?: string) => {
                updateSlide(activeSlide.id, {
                  contentBlocks: blocks,
                  ...(notes && { speakerNotes: notes }),
                });
              }}
            />
          </div>
        )}

        {/* Coach */}
        {deckId && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Coach
            </h3>
            <CoachPanel
              deckId={deckId}
              audienceType={audienceType}
              slides={slides.map((s) => ({
                id: s.id,
                title: s.title,
                subtitle: s.subtitle,
                layout: s.layout,
                contentBlocks: s.contentBlocks,
                speakerNotes: s.speakerNotes,
              }))}
              onNavigateToSlide={setActiveSlide}
            />
          </div>
        )}
          </>
        )}

        {activeTab === "animation" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
                Slide Animation
              </h3>
              <div className="space-y-2 rounded-lg border border-border bg-surface-raised p-2.5">
                <div>
                  <label className="text-[10px] text-ink-muted block mb-0.5">Preset</label>
                  <select
                    value={animationPreset}
                    onChange={(e) => setAnimationPreset(e.target.value as AnimationPresetKey)}
                    className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink focus:outline-none focus:border-brand"
                  >
                    {ANIMATION_PRESET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={!activeSlide}
                    onClick={applyPresetToSlide}
                    className="rounded-md border border-border px-2 py-1.5 text-xs text-ink hover:border-brand/50 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Apply Preset
                  </button>
                  <button
                    type="button"
                    disabled={!activeSlide}
                    onClick={clearAnimations}
                    className="rounded-md border border-border px-2 py-1.5 text-xs text-ink-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
                Reveal Summary
              </h3>
              <div className="space-y-2 rounded-lg border border-border bg-surface-raised p-2.5 text-xs">
                <p className="text-ink-muted">
                  Animated blocks: <span className="font-medium text-ink">{animatedBlockCount}</span>
                </p>
                <p className="text-ink-muted">
                  Reveal steps: <span className="font-medium text-ink">{revealStepCount}</span>
                </p>
                <p className="text-ink-muted">
                  Orders:{" "}
                  <span className="font-medium text-ink">
                    {revealOrders.length > 0 ? revealOrders.join(", ") : "None"}
                  </span>
                </p>
                <p className="text-[11px] text-ink-muted/80">
                  Per-block timing is edited from block properties or the timeline under the canvas.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <MasterEditor
        isOpen={showMasterEditor}
        onClose={() => setShowMasterEditor(false)}
      />
    </aside>
  );
}
