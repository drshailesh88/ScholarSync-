 

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FabricObject, Shadow } from 'fabric';
import ShadowControls from './ShadowControls';
import BlendModeSelect, { DEFAULT_BLEND_MODE, type BlendModeValue } from './BlendModeSelect';

export interface DropShadowSettings {
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface EffectsState {
  dropShadowEnabled: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  blurEnabled: boolean;
  blurAmount: number;
  opacityPercent: number;
  blendMode: BlendModeValue;
}

export interface EffectObjectLike {
  shadow?: unknown;
  fill?: unknown;
  opacity?: number;
  globalCompositeOperation?: string;
  set: (keyOrValues: string | Record<string, unknown>, value?: unknown) => unknown;
  setCoords?: () => void;
}

export interface EffectsPanelCanvasLike {
  requestRenderAll: () => void;
  fire: (eventName: string, payload?: unknown) => void;
}

export interface EffectsPanelProps {
  selectedObjects: FabricObject[];
  canvas: EffectsPanelCanvasLike | null;
}

export const DEFAULT_DROP_SHADOW_SETTINGS: DropShadowSettings = {
  color: 'rgba(0,0,0,0.3)',
  blur: 10,
  offsetX: 4,
  offsetY: 4,
};

export const DEFAULT_BLUR_AMOUNT = 8;
export const DEFAULT_OPACITY_PERCENT = 100;

const HEX_COLOR_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const RGB_COLOR_RE = /^rgba?\(([^)]+)\)$/i;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeHex(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toLowerCase();
  }

  return hex.toLowerCase();
}

function toHexByte(value: number): string {
  const clamped = clamp(Math.round(value), 0, 255);
  return clamped.toString(16).padStart(2, '0');
}

export function colorToHex(color: string, fallback = '#000000'): string {
  const trimmed = color.trim();
  if (HEX_COLOR_RE.test(trimmed)) {
    return normalizeHex(trimmed);
  }

  const rgbMatch = trimmed.match(RGB_COLOR_RE);
  if (!rgbMatch) {
    return fallback;
  }

  const channels = rgbMatch[1]
    .split(',')
    .slice(0, 3)
    .map((part) => Number(part.trim()));

  if (channels.length !== 3 || channels.some((channel) => !Number.isFinite(channel))) {
    return fallback;
  }

  return `#${toHexByte(channels[0])}${toHexByte(channels[1])}${toHexByte(channels[2])}`;
}

export function createDropShadow(settings: DropShadowSettings): Shadow {
  return new Shadow({
    color: settings.color,
    blur: clamp(settings.blur, 0, 50),
    offsetX: clamp(settings.offsetX, -50, 50),
    offsetY: clamp(settings.offsetY, -50, 50),
  });
}

export function applyDropShadowToObject(
  object: EffectObjectLike,
  enabled: boolean,
  settings: DropShadowSettings
): void {
  object.set('shadow', enabled ? createDropShadow(settings) : null);
}

export function resolveObjectFillColor(object: Pick<EffectObjectLike, 'fill'>): string {
  if (typeof object.fill === 'string' && object.fill.trim().length > 0) {
    return object.fill;
  }

  return '#000000';
}

export function applyVectorBlurToObject(
  object: EffectObjectLike,
  enabled: boolean,
  blurAmount: number
): void {
  if (!enabled) {
    object.set('shadow', null);
    return;
  }

  // Approximation for vector blur: Fabric.js does not provide true SVG filter blur for vector objects.
  object.set(
    'shadow',
    new Shadow({
      color: resolveObjectFillColor(object),
      blur: clamp(blurAmount, 0, 20),
      offsetX: 0,
      offsetY: 0,
    })
  );
}

export function applyObjectOpacity(object: EffectObjectLike, opacityPercent: number): void {
  object.set({ opacity: clamp(opacityPercent, 0, 100) / 100 });
}

export function applyBlendMode(object: EffectObjectLike, mode: BlendModeValue): void {
  object.set({ globalCompositeOperation: mode });
}

function getShadowInstance(shadowValue: unknown): Shadow | null {
  if (!shadowValue) {
    return null;
  }

  if (shadowValue instanceof Shadow) {
    return shadowValue;
  }

  if (typeof shadowValue === 'object') {
    return new Shadow(shadowValue as any);
  }

  return null;
}

function normalizeColorSignature(color: string): string {
  return color.replace(/\s+/g, '').toLowerCase();
}

function readBlendMode(object: EffectObjectLike | null): BlendModeValue {
  if (!object || !object.globalCompositeOperation) {
    return DEFAULT_BLEND_MODE;
  }
  return object.globalCompositeOperation as BlendModeValue;
}

export function readEffectsStateFromObject(object: EffectObjectLike | null): EffectsState {
  const opacityPercent = clamp(
    Math.round(toNumber(object?.opacity, 1) * 100),
    0,
    100
  );
  const blendMode = readBlendMode(object);

  if (!object) {
    return {
      dropShadowEnabled: false,
      shadowColor: DEFAULT_DROP_SHADOW_SETTINGS.color,
      shadowBlur: DEFAULT_DROP_SHADOW_SETTINGS.blur,
      shadowOffsetX: DEFAULT_DROP_SHADOW_SETTINGS.offsetX,
      shadowOffsetY: DEFAULT_DROP_SHADOW_SETTINGS.offsetY,
      blurEnabled: false,
      blurAmount: DEFAULT_BLUR_AMOUNT,
      opacityPercent,
      blendMode,
    };
  }

  const shadow = getShadowInstance(object.shadow);

  if (!shadow) {
    return {
      dropShadowEnabled: false,
      shadowColor: DEFAULT_DROP_SHADOW_SETTINGS.color,
      shadowBlur: DEFAULT_DROP_SHADOW_SETTINGS.blur,
      shadowOffsetX: DEFAULT_DROP_SHADOW_SETTINGS.offsetX,
      shadowOffsetY: DEFAULT_DROP_SHADOW_SETTINGS.offsetY,
      blurEnabled: false,
      blurAmount: DEFAULT_BLUR_AMOUNT,
      opacityPercent,
      blendMode,
    };
  }

  const color = typeof shadow.color === 'string' ? shadow.color : DEFAULT_DROP_SHADOW_SETTINGS.color;
  const blur = clamp(toNumber((shadow as any).blur, DEFAULT_DROP_SHADOW_SETTINGS.blur), 0, 50);
  const offsetX = clamp(toNumber((shadow as any).offsetX, DEFAULT_DROP_SHADOW_SETTINGS.offsetX), -50, 50);
  const offsetY = clamp(toNumber((shadow as any).offsetY, DEFAULT_DROP_SHADOW_SETTINGS.offsetY), -50, 50);
  const fillColor = resolveObjectFillColor(object);
  const isVectorBlur =
    offsetX === 0 &&
    offsetY === 0 &&
    normalizeColorSignature(color) === normalizeColorSignature(fillColor);

  return {
    dropShadowEnabled: !isVectorBlur,
    shadowColor: color,
    shadowBlur: blur,
    shadowOffsetX: offsetX,
    shadowOffsetY: offsetY,
    blurEnabled: isVectorBlur,
    blurAmount: isVectorBlur ? clamp(blur, 0, 20) : DEFAULT_BLUR_AMOUNT,
    opacityPercent,
    blendMode,
  };
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '10px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary)',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
  },
  groupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  toggleLabel: {
    fontSize: '12px',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  toggleInput: {
    width: '14px',
    height: '14px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rowLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    minWidth: '54px',
    flexShrink: 0,
  },
  slider: {
    flex: 1,
    height: '4px',
  },
  numberInput: {
    width: '58px',
    padding: '4px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    textAlign: 'center',
  },
  helperText: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: 1.35,
  },
  opacityValue: {
    minWidth: '40px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'right',
  },
};

function parseRangeValue(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseNumberInputValue(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function EffectsPanel({ selectedObjects, canvas }: EffectsPanelProps): JSX.Element | null {
  const activeObject = selectedObjects[0] ?? null;
  const [dropShadowEnabled, setDropShadowEnabled] = useState(false);
  const [shadowColor, setShadowColor] = useState(DEFAULT_DROP_SHADOW_SETTINGS.color);
  const [shadowBlur, setShadowBlur] = useState(DEFAULT_DROP_SHADOW_SETTINGS.blur);
  const [shadowOffsetX, setShadowOffsetX] = useState(DEFAULT_DROP_SHADOW_SETTINGS.offsetX);
  const [shadowOffsetY, setShadowOffsetY] = useState(DEFAULT_DROP_SHADOW_SETTINGS.offsetY);
  const [blurEnabled, setBlurEnabled] = useState(false);
  const [blurAmount, setBlurAmount] = useState(DEFAULT_BLUR_AMOUNT);
  const [opacityPercent, setOpacityPercent] = useState(DEFAULT_OPACITY_PERCENT);
  const [blendMode, setBlendMode] = useState<BlendModeValue>(DEFAULT_BLEND_MODE);

  const currentShadowSettings = useMemo<DropShadowSettings>(
    () => ({
      color: shadowColor,
      blur: shadowBlur,
      offsetX: shadowOffsetX,
      offsetY: shadowOffsetY,
    }),
    [shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY]
  );

  useEffect(() => {
    const nextState = readEffectsStateFromObject(
      activeObject as unknown as EffectObjectLike | null
    );
    setDropShadowEnabled(nextState.dropShadowEnabled);
    setShadowColor(nextState.shadowColor);
    setShadowBlur(nextState.shadowBlur);
    setShadowOffsetX(nextState.shadowOffsetX);
    setShadowOffsetY(nextState.shadowOffsetY);
    setBlurEnabled(nextState.blurEnabled);
    setBlurAmount(nextState.blurAmount);
    setOpacityPercent(nextState.opacityPercent);
    setBlendMode(nextState.blendMode);
  }, [activeObject]);

  const commitToSelection = useCallback(
    (updater: (object: EffectObjectLike) => void) => {
      if (selectedObjects.length === 0) {
        return;
      }

      selectedObjects.forEach((object) => {
        const mutableObject = object as unknown as EffectObjectLike;
        updater(mutableObject);
        object.setCoords();
      });

      if (canvas) {
        canvas.requestRenderAll();
        canvas.fire('object:modified', { target: selectedObjects[0] });
      }
    },
    [canvas, selectedObjects]
  );

  const handleDropShadowToggle = useCallback(
    (enabled: boolean) => {
      setDropShadowEnabled(enabled);

      if (enabled) {
        setBlurEnabled(false);
        commitToSelection((object) => applyDropShadowToObject(object, true, currentShadowSettings));
        return;
      }

      commitToSelection((object) => applyDropShadowToObject(object, false, currentShadowSettings));
    },
    [commitToSelection, currentShadowSettings]
  );

  const handleShadowColorChange = useCallback(
    (nextColor: string) => {
      setShadowColor(nextColor);
      if (!dropShadowEnabled) {
        return;
      }

      commitToSelection((object) =>
        applyDropShadowToObject(object, true, {
          ...currentShadowSettings,
          color: nextColor,
        })
      );
    },
    [commitToSelection, currentShadowSettings, dropShadowEnabled]
  );

  const handleShadowBlurChange = useCallback(
    (nextBlur: number) => {
      const clamped = clamp(nextBlur, 0, 50);
      setShadowBlur(clamped);
      if (!dropShadowEnabled) {
        return;
      }

      commitToSelection((object) =>
        applyDropShadowToObject(object, true, {
          ...currentShadowSettings,
          blur: clamped,
        })
      );
    },
    [commitToSelection, currentShadowSettings, dropShadowEnabled]
  );

  const handleShadowOffsetXChange = useCallback(
    (nextOffsetX: number) => {
      const clamped = clamp(nextOffsetX, -50, 50);
      setShadowOffsetX(clamped);
      if (!dropShadowEnabled) {
        return;
      }

      commitToSelection((object) =>
        applyDropShadowToObject(object, true, {
          ...currentShadowSettings,
          offsetX: clamped,
        })
      );
    },
    [commitToSelection, currentShadowSettings, dropShadowEnabled]
  );

  const handleShadowOffsetYChange = useCallback(
    (nextOffsetY: number) => {
      const clamped = clamp(nextOffsetY, -50, 50);
      setShadowOffsetY(clamped);
      if (!dropShadowEnabled) {
        return;
      }

      commitToSelection((object) =>
        applyDropShadowToObject(object, true, {
          ...currentShadowSettings,
          offsetY: clamped,
        })
      );
    },
    [commitToSelection, currentShadowSettings, dropShadowEnabled]
  );

  const handleBlurToggle = useCallback(
    (enabled: boolean) => {
      setBlurEnabled(enabled);

      if (enabled) {
        setDropShadowEnabled(false);
        commitToSelection((object) => applyVectorBlurToObject(object, true, blurAmount));
        return;
      }

      commitToSelection((object) => applyVectorBlurToObject(object, false, blurAmount));
    },
    [blurAmount, commitToSelection]
  );

  const handleBlurAmountChange = useCallback(
    (nextBlurAmount: number) => {
      const clamped = clamp(nextBlurAmount, 0, 20);
      setBlurAmount(clamped);
      if (!blurEnabled) {
        return;
      }

      commitToSelection((object) => applyVectorBlurToObject(object, true, clamped));
    },
    [blurEnabled, commitToSelection]
  );

  const handleOpacityChange = useCallback(
    (nextOpacityPercent: number) => {
      const clamped = clamp(nextOpacityPercent, 0, 100);
      setOpacityPercent(clamped);
      commitToSelection((object) => applyObjectOpacity(object, clamped));
    },
    [commitToSelection]
  );

  const handleBlendModeChange = useCallback(
    (nextMode: BlendModeValue) => {
      setBlendMode(nextMode);
      commitToSelection((object) => applyBlendMode(object, nextMode));
    },
    [commitToSelection]
  );

  if (!activeObject) {
    return null;
  }

  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>Effects</div>

      <ShadowControls
        enabled={dropShadowEnabled}
        color={shadowColor}
        pickerColor={colorToHex(shadowColor)}
        blur={shadowBlur}
        offsetX={shadowOffsetX}
        offsetY={shadowOffsetY}
        onToggle={handleDropShadowToggle}
        onColorChange={handleShadowColorChange}
        onBlurChange={handleShadowBlurChange}
        onOffsetXChange={handleShadowOffsetXChange}
        onOffsetYChange={handleShadowOffsetYChange}
      />

      <div style={styles.controlGroup}>
        <div style={styles.groupHeader}>
          <span style={styles.toggleLabel}>Blur</span>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={blurEnabled}
            onChange={(event) => handleBlurToggle(event.target.checked)}
            style={styles.toggleInput}
          />
        </div>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Amount</span>
          <input aria-label="Range slider"
            type="range"
            min={0}
            max={20}
            step={1}
            value={blurAmount}
            disabled={!blurEnabled}
            onChange={(event) => handleBlurAmountChange(parseRangeValue(event.target.value))}
            style={styles.slider}
          />
          <input aria-label="Number input"
            type="number"
            min={0}
            max={20}
            step={1}
            value={blurAmount}
            disabled={!blurEnabled}
            onChange={(event) => handleBlurAmountChange(parseNumberInputValue(event.target.value))}
            style={styles.numberInput}
          />
        </div>
        <div style={styles.helperText}>
          Vector blur is approximated using a zero-offset shadow.
        </div>
      </div>

      <div style={styles.controlGroup}>
        <div style={styles.groupHeader}>
          <span style={styles.toggleLabel}>Opacity</span>
          <span style={styles.opacityValue}>{opacityPercent}%</span>
        </div>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Value</span>
          <input aria-label="Range slider"
            type="range"
            min={0}
            max={100}
            step={1}
            value={opacityPercent}
            onChange={(event) => handleOpacityChange(parseRangeValue(event.target.value))}
            style={styles.slider}
          />
          <input aria-label="Number input"
            type="number"
            min={0}
            max={100}
            step={1}
            value={opacityPercent}
            onChange={(event) => handleOpacityChange(parseNumberInputValue(event.target.value))}
            style={styles.numberInput}
          />
        </div>
      </div>

      <BlendModeSelect value={blendMode} onChange={handleBlendModeChange} />
    </div>
  );
}
