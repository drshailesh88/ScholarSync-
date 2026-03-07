"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Lock, LockOpen } from "@phosphor-icons/react";
import type { ContentBlock, BlockShadow, BlockBorder } from "@/types/presentation";
import { useSlidesStore } from "@/stores/slides-store";
import { ColorPicker } from "@/components/slides/shared/color-picker";
import { hexToRGBA, parseHexColor } from "@/lib/utils/color-utils";

const SHADOW_PRESETS: { label: string; value: BlockShadow | undefined }[] = [
  { label: "None", value: undefined },
  { label: "Subtle", value: { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: "rgba(0,0,0,0.1)" } },
  { label: "Medium", value: { offsetX: 0, offsetY: 4, blur: 12, spread: 0, color: "rgba(0,0,0,0.15)" } },
  { label: "Large", value: { offsetX: 0, offsetY: 8, blur: 24, spread: 0, color: "rgba(0,0,0,0.2)" } },
  { label: "Dramatic", value: { offsetX: 0, offsetY: 12, blur: 36, spread: 0, color: "rgba(0,0,0,0.3)" } },
];

interface BlockStyleControlsProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

function useDebouncedUpdate(onUpdate: (block: ContentBlock) => void, delay = 200) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestBlock = useRef<ContentBlock | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(
    (block: ContentBlock) => {
      latestBlock.current = block;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (latestBlock.current) onUpdate(latestBlock.current);
      }, delay);
    },
    [onUpdate, delay]
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
      {children}
    </label>
  );
}

export function BlockStyleControls({ block, onUpdate }: BlockStyleControlsProps) {
  const debouncedUpdate = useDebouncedUpdate(onUpdate);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const themeColors = [
    themeConfig.primaryColor,
    themeConfig.secondaryColor,
    themeConfig.accentColor,
    themeConfig.textColor,
    themeConfig.backgroundColor,
  ];

  const [localOpacity, setLocalOpacity] = useState(block.opacity ?? 100);
  const [shadowEnabled, setShadowEnabled] = useState(!!block.shadow);
  const [localShadow, setLocalShadow] = useState<BlockShadow>(
    block.shadow ?? { offsetX: 0, offsetY: 4, blur: 12, spread: 0, color: "rgba(0,0,0,0.15)" }
  );
  const [borderEnabled, setBorderEnabled] = useState(!!block.border);
  const [localBorder, setLocalBorder] = useState<BlockBorder>(
    block.border ?? { width: 1, color: "#000000", style: "solid", radius: 0 }
  );

  // Sync when block changes externally (React-recommended render-time state adjustment)
  const [prevBlockStyle, setPrevBlockStyle] = useState({
    opacity: block.opacity,
    shadow: block.shadow,
    border: block.border,
  });
  if (
    prevBlockStyle.opacity !== block.opacity ||
    prevBlockStyle.shadow !== block.shadow ||
    prevBlockStyle.border !== block.border
  ) {
    setPrevBlockStyle({ opacity: block.opacity, shadow: block.shadow, border: block.border });
    setLocalOpacity(block.opacity ?? 100);
    setShadowEnabled(!!block.shadow);
    if (block.shadow) setLocalShadow(block.shadow);
    setBorderEnabled(!!block.border);
    if (block.border) setLocalBorder(block.border);
  }

  const updateOpacity = useCallback(
    (value: number) => {
      setLocalOpacity(value);
      debouncedUpdate({ ...block, opacity: value });
    },
    [block, debouncedUpdate]
  );

  const toggleLock = useCallback(() => {
    onUpdate({ ...block, locked: !block.locked });
  }, [block, onUpdate]);

  const updateShadow = useCallback(
    (shadow: BlockShadow | undefined) => {
      if (shadow) setLocalShadow(shadow);
      setShadowEnabled(!!shadow);
      debouncedUpdate({ ...block, shadow });
    },
    [block, debouncedUpdate]
  );

  const updateShadowField = useCallback(
    (field: keyof BlockShadow, value: number | string) => {
      const next = { ...localShadow, [field]: value };
      setLocalShadow(next);
      debouncedUpdate({ ...block, shadow: next });
    },
    [block, debouncedUpdate, localShadow]
  );

  const updateBorder = useCallback(
    (border: BlockBorder | undefined) => {
      if (border) setLocalBorder(border);
      setBorderEnabled(!!border);
      debouncedUpdate({ ...block, border });
    },
    [block, debouncedUpdate]
  );

  const updateBorderField = useCallback(
    (field: keyof BlockBorder, value: number | string) => {
      const next = { ...localBorder, [field]: value };
      setLocalBorder(next);
      debouncedUpdate({ ...block, border: next });
    },
    [block, debouncedUpdate, localBorder]
  );

  return (
    <div className="space-y-3 border-t border-border px-3 py-3">
      <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
        Style
      </div>

      {/* Lock Toggle */}
      <div className="flex items-center justify-between">
        <SectionLabel>Lock</SectionLabel>
        <button
          type="button"
          onClick={toggleLock}
          className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs hover:bg-surface-raised"
          data-testid="lock-toggle"
        >
          {block.locked ? <Lock size={14} /> : <LockOpen size={14} />}
          {block.locked ? "Locked" : "Unlocked"}
        </button>
      </div>

      {/* Opacity */}
      <div>
        <SectionLabel>Opacity</SectionLabel>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={localOpacity}
            onChange={(e) => updateOpacity(Number(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            min={0}
            max={100}
            step={5}
            value={localOpacity}
            onChange={(e) => updateOpacity(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="w-12 rounded border border-border bg-surface px-1 py-0.5 text-xs text-center"
          />
        </div>
      </div>

      {/* Shadow */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <SectionLabel>Shadow</SectionLabel>
          <label className="flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={shadowEnabled}
              onChange={(e) => {
                if (e.target.checked) {
                  updateShadow(localShadow);
                } else {
                  updateShadow(undefined);
                }
              }}
              className="rounded"
            />
          </label>
        </div>

        {shadowEnabled && (
          <div className="space-y-2 pl-1">
            <div>
              <select
                value=""
                onChange={(e) => {
                  const preset = SHADOW_PRESETS.find((p) => p.label === e.target.value);
                  if (preset?.value) {
                    updateShadow(preset.value);
                  } else if (preset && !preset.value) {
                    updateShadow(undefined);
                  }
                }}
                className="w-full rounded border border-border bg-surface px-2 py-1 text-xs"
              >
                <option value="" disabled>Presets…</option>
                {SHADOW_PRESETS.map((p) => (
                  <option key={p.label} value={p.label}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-8 text-[10px] text-ink-muted">X</span>
              <input type="range" min={-20} max={20} value={localShadow.offsetX}
                onChange={(e) => updateShadowField("offsetX", Number(e.target.value))}
                className="w-full" />
              <span className="w-8 text-right text-[10px] text-ink-muted">{localShadow.offsetX}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 text-[10px] text-ink-muted">Y</span>
              <input type="range" min={-20} max={20} value={localShadow.offsetY}
                onChange={(e) => updateShadowField("offsetY", Number(e.target.value))}
                className="w-full" />
              <span className="w-8 text-right text-[10px] text-ink-muted">{localShadow.offsetY}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 text-[10px] text-ink-muted">Blur</span>
              <input type="range" min={0} max={40} value={localShadow.blur}
                onChange={(e) => updateShadowField("blur", Number(e.target.value))}
                className="w-full" />
              <span className="w-8 text-right text-[10px] text-ink-muted">{localShadow.blur}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 text-[10px] text-ink-muted">Sprd</span>
              <input type="range" min={0} max={20} value={localShadow.spread ?? 0}
                onChange={(e) => updateShadowField("spread", Number(e.target.value))}
                className="w-full" />
              <span className="w-8 text-right text-[10px] text-ink-muted">{localShadow.spread ?? 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 text-[10px] text-ink-muted">Color</span>
              <div className="flex-1">
                <ColorPicker
                  value={localShadow.color}
                  onChange={(color) => {
                    const parsed = parseHexColor(color);
                    updateShadowField("color", hexToRGBA(parsed.hex, parsed.alpha));
                  }}
                  showAlpha
                  themeColors={themeColors}
                  placement="right"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Border */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <SectionLabel>Border</SectionLabel>
          <label className="flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={borderEnabled}
              onChange={(e) => {
                if (e.target.checked) {
                  updateBorder(localBorder);
                } else {
                  updateBorder(undefined);
                }
              }}
              className="rounded"
            />
          </label>
        </div>

        {borderEnabled && (
          <div className="space-y-2 pl-1">
            <div className="flex items-center gap-2">
              <span className="w-10 text-[10px] text-ink-muted">Width</span>
              <input type="range" min={1} max={8} value={localBorder.width}
                onChange={(e) => updateBorderField("width", Number(e.target.value))}
                className="w-full" />
              <span className="w-8 text-right text-[10px] text-ink-muted">{localBorder.width}px</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-[10px] text-ink-muted">Color</span>
              <div className="flex-1">
                <ColorPicker
                  value={localBorder.color}
                  onChange={(color) => updateBorderField("color", color)}
                  themeColors={themeColors}
                  placement="right"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-[10px] text-ink-muted">Style</span>
              <select
                value={localBorder.style}
                onChange={(e) => updateBorderField("style", e.target.value)}
                className="w-full rounded border border-border bg-surface px-2 py-1 text-xs"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-[10px] text-ink-muted">Radius</span>
              <input type="range" min={0} max={24} value={localBorder.radius}
                onChange={(e) => updateBorderField("radius", Number(e.target.value))}
                className="w-full" />
              <span className="w-8 text-right text-[10px] text-ink-muted">{localBorder.radius}px</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
