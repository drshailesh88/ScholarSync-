/**
 * Properties Panel Component
 *
 * Displays and edits properties of currently selected canvas objects.
 * Supports different object types with type-specific controls.
 *
 * @module components/PropertiesPanel
 */

/* eslint-disable react/no-children-prop */
 

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Rect,
  Line,
  Group,
  FabricObject,
  Image as FabricImage,
} from 'fabric';
import { useCanvas } from '@/components/illustration/Canvas/CanvasContext';
import {
  CharacterPanel,
  isCharacterTextObject,
  type CharacterProperty,
  type CharacterTextLike,
} from '@/components/illustration/CharacterPanel';
import { EffectsPanel } from '@/components/illustration/EffectsPanel';
import { GradientEditor } from '@/components/illustration/GradientEditor';
import { toggleObjectFlip, type FlippableObjectLike } from '@/components/illustration/objectTransforms';
import { useToast } from '@/components/illustration/Toast/useToast';
import {
  alignBottom,
  alignCenterH,
  alignCenterV,
  alignLeft,
  alignRight,
  alignTop,
  distributeH,
  distributeV,
  type AlignmentObjectId,
  type AlignmentPosition,
} from '@/lib/illustration/canvas/align-operations';
import {
  applyBooleanOperationToCanvas,
  isEmptyResultError,
  type PathfinderOperation,
} from '@/lib/illustration/canvas/boolean-operations';
import { isClippingMaskGroup } from '@/lib/illustration/canvas/clipping-mask';
import { isCompoundPath } from '@/lib/illustration/canvas/compound-path';
import {
  createFabricGradient,
  createDefaultGradientState,
  getFillEditorState,
  normalizeColorToHex,
  toFabricObjectDimensions,
  type FillStyleMode,
  type GradientEditorState,
} from '@/lib/illustration/gradient/gradient-utils';
import { useActiveTool } from '@/stores/illustration/editorStore';
import { ToolType } from '@/lib/illustration/types';
import { strokePresets } from '@/lib/illustration/lib/freehand/index';
import type { BrushPreset, FreehandSettings } from '@/lib/illustration/canvas/freehand-canvas';
import { defaultFreehandSettings } from '@/lib/illustration/canvas/freehand-canvas';

// ============================================================================
// TYPES
// ============================================================================

export interface PropertiesPanelProps {
  selectedObjects?: FabricObject[];
  freehandSettings?: FreehandSettings;
  onFreehandSettingsChange?: (settings: FreehandSettings) => void;
}

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
}

interface PropertyRowProps {
  label: string;
  children: React.ReactNode;
}

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
}

export type TransformField = 'x' | 'y' | 'w' | 'h' | 'r' | 'o';

export interface TransformObjectLike {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
  opacity?: number;
  set: (key: string, value: unknown) => unknown;
  setCoords?: () => void;
  getScaledWidth?: () => number;
  getScaledHeight?: () => number;
}

export interface TransformFieldValue {
  value: number | null;
  mixed: boolean;
}

export interface TransformPanelValues {
  x: TransformFieldValue;
  y: TransformFieldValue;
  w: TransformFieldValue;
  h: TransformFieldValue;
  r: TransformFieldValue;
  o: TransformFieldValue;
}

export interface CanvasEventSourceLike {
  on: (eventName: string, handler: (event?: unknown) => void) => unknown;
  off: (eventName: string, handler: (event?: unknown) => void) => unknown;
}

export const TRANSFORM_SYNC_EVENTS = [
  'selection:created',
  'selection:updated',
  'selection:cleared',
  'object:moving',
  'object:scaling',
  'object:rotating',
  'object:modified',
] as const;

const DECIMAL_PRECISION = 1;
const MIXED_VALUE = '—';
const EMPTY_TRANSFORM_VALUES: TransformPanelValues = {
  x: { value: null, mixed: false },
  y: { value: null, mixed: false },
  w: { value: null, mixed: false },
  h: { value: null, mixed: false },
  r: { value: null, mixed: false },
  o: { value: null, mixed: false },
};

function roundToPrecision(value: number, digits = DECIMAL_PRECISION): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function getScaledDimension(
  base: number | undefined,
  scale: number | undefined,
  fallback: (() => number) | undefined
): number {
  const safeBase = typeof base === 'number' ? Math.abs(base) : 0;
  const safeScale = typeof scale === 'number' ? Math.abs(scale) : 1;
  const fromBase = safeBase > 0 ? safeBase * safeScale : 0;

  if (fromBase > 0) {
    return fromBase;
  }

  return fallback ? Math.abs(fallback()) : 0;
}

function getObjectTransformMetrics(object: TransformObjectLike): Record<TransformField, number> {
  const width = getScaledDimension(object.width, object.scaleX, object.getScaledWidth);
  const height = getScaledDimension(object.height, object.scaleY, object.getScaledHeight);

  return {
    x: object.left ?? 0,
    y: object.top ?? 0,
    w: width,
    h: height,
    r: object.angle ?? 0,
    o: Math.max(0, Math.min(100, (object.opacity ?? 1) * 100)),
  };
}

function getCommonValue(values: number[]): TransformFieldValue {
  if (values.length === 0) {
    return { value: null, mixed: false };
  }

  const rounded = values.map((value) => roundToPrecision(value));
  const first = rounded[0];
  const isMixed = rounded.some((value) => value !== first);

  return {
    value: isMixed ? null : first,
    mixed: isMixed,
  };
}

export function computeMixedTransformValues(objects: TransformObjectLike[]): TransformPanelValues {
  const fieldValues: Record<TransformField, number[]> = {
    x: [],
    y: [],
    w: [],
    h: [],
    r: [],
    o: [],
  };

  objects.forEach((object) => {
    const metrics = getObjectTransformMetrics(object);
    fieldValues.x.push(metrics.x);
    fieldValues.y.push(metrics.y);
    fieldValues.w.push(metrics.w);
    fieldValues.h.push(metrics.h);
    fieldValues.r.push(metrics.r);
    fieldValues.o.push(metrics.o);
  });

  return {
    x: getCommonValue(fieldValues.x),
    y: getCommonValue(fieldValues.y),
    w: getCommonValue(fieldValues.w),
    h: getCommonValue(fieldValues.h),
    r: getCommonValue(fieldValues.r),
    o: getCommonValue(fieldValues.o),
  };
}

function getIntrinsicDimension(
  dimension: number | undefined,
  scaledDimension: number,
  scale: number | undefined
): number {
  const safeDimension = typeof dimension === 'number' ? Math.abs(dimension) : 0;
  if (safeDimension > 0) {
    return safeDimension;
  }

  const safeScale = Math.abs(scale ?? 1) || 1;
  return scaledDimension / safeScale;
}

function setScaledDimensions(
  object: TransformObjectLike,
  nextWidth: number | null,
  nextHeight: number | null
): void {
  if (nextWidth !== null) {
    const currentScaleX = object.scaleX ?? 1;
    const currentWidth = getScaledDimension(object.width, object.scaleX, object.getScaledWidth);
    const intrinsicWidth = getIntrinsicDimension(object.width, currentWidth, currentScaleX);
    if (intrinsicWidth > 0) {
      const signX = currentScaleX < 0 ? -1 : 1;
      object.set('scaleX', signX * (nextWidth / intrinsicWidth));
    }
  }

  if (nextHeight !== null) {
    const currentScaleY = object.scaleY ?? 1;
    const currentHeight = getScaledDimension(object.height, object.scaleY, object.getScaledHeight);
    const intrinsicHeight = getIntrinsicDimension(object.height, currentHeight, currentScaleY);
    if (intrinsicHeight > 0) {
      const signY = currentScaleY < 0 ? -1 : 1;
      object.set('scaleY', signY * (nextHeight / intrinsicHeight));
    }
  }
}

export function applyTransformChange(
  objects: TransformObjectLike[],
  field: TransformField,
  value: number,
  lockAspectRatio: boolean
): void {
  objects.forEach((object) => {
    const metrics = getObjectTransformMetrics(object);

    if (field === 'x') {
      object.set('left', value);
    } else if (field === 'y') {
      object.set('top', value);
    } else if (field === 'r') {
      object.set('angle', value);
    } else if (field === 'o') {
      object.set('opacity', Math.max(0, Math.min(1, value / 100)));
    } else if (field === 'w') {
      let nextHeight: number | null = null;
      if (lockAspectRatio && metrics.h > 0) {
        const aspectRatio = metrics.w / metrics.h;
        if (aspectRatio > 0) {
          nextHeight = value / aspectRatio;
        }
      }
      setScaledDimensions(object, value, nextHeight);
    } else if (field === 'h') {
      let nextWidth: number | null = null;
      if (lockAspectRatio && metrics.h > 0) {
        const aspectRatio = metrics.w / metrics.h;
        if (aspectRatio > 0) {
          nextWidth = value * aspectRatio;
        }
      }
      setScaledDimensions(object, nextWidth, value);
    }

    object.setCoords?.();
  });
}

export function formatTransformDisplayValue(fieldValue: TransformFieldValue): string {
  if (fieldValue.mixed) {
    return MIXED_VALUE;
  }
  if (fieldValue.value === null) {
    return '';
  }
  return roundToPrecision(fieldValue.value).toFixed(DECIMAL_PRECISION);
}

export function subscribeToTransformEvents(
  source: CanvasEventSourceLike,
  onSync: () => void
): () => void {
  const handler = () => onSync();
  TRANSFORM_SYNC_EVENTS.forEach((eventName) => {
    source.on(eventName, handler);
  });

  return () => {
    TRANSFORM_SYNC_EVENTS.forEach((eventName) => {
      source.off(eventName, handler);
    });
  };
}

export type StrokeDashPreset = 'solid' | 'dashed' | 'dotted' | 'dash-dot' | 'long-dash';

const STROKE_DASH_PATTERNS: Record<StrokeDashPreset, number[] | null> = {
  solid: null,
  dashed: [10, 5],
  dotted: [2, 4],
  'dash-dot': [10, 5, 2, 5],
  'long-dash': [20, 10],
};

interface MutableFabricObjectLike {
  set: (keyOrValues: string | Record<string, unknown>, value?: unknown) => unknown;
  setCoords?: () => void;
}

interface RectCornerLike extends MutableFabricObjectLike {
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  getScaledWidth?: () => number;
  getScaledHeight?: () => number;
}

export function getStrokeDashArrayForPreset(preset: StrokeDashPreset): number[] | null {
  const value = STROKE_DASH_PATTERNS[preset];
  return value ? [...value] : null;
}

export function getStrokeDashPresetFromArray(
  strokeDashArray: number[] | null | undefined
): StrokeDashPreset {
  if (!strokeDashArray || strokeDashArray.length === 0) {
    return 'solid';
  }

  const signature = strokeDashArray.join(',');
  for (const [preset, pattern] of Object.entries(STROKE_DASH_PATTERNS)) {
    if (!pattern) continue;
    if (pattern.join(',') === signature) {
      return preset as StrokeDashPreset;
    }
  }

  return 'solid';
}

export function applyStrokeDashPreset(
  object: MutableFabricObjectLike,
  preset: StrokeDashPreset
): void {
  object.set('strokeDashArray', getStrokeDashArrayForPreset(preset));
}

export function getRectCornerRadiusMax(rect: RectCornerLike): number {
  const width = getScaledDimension(rect.width, rect.scaleX, rect.getScaledWidth);
  const height = getScaledDimension(rect.height, rect.scaleY, rect.getScaledHeight);
  return Math.max(0, Math.min(width, height) / 2);
}

export function applyUniformCornerRadius(rect: MutableFabricObjectLike, value: number): void {
  const objectType = (rect as { type?: string }).type;
  if (objectType && objectType !== 'rect') {
    return;
  }

  const nextValue = Math.max(0, value);
  rect.set({ rx: nextValue, ry: nextValue });
}

export { toggleObjectFlip };

export function setObjectAspectLock(object: MutableFabricObjectLike, lock: boolean): void {
  object.set({ lockUniScaling: lock });
}

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    height: '100%',
    overflowY: 'auto' as const,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    marginBottom: '12px',
    opacity: 0.4,
  },
  emptyText: {
    fontSize: '12px',
    lineHeight: 1.5,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  transformSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '10px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary)',
  },
  transformRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  transformTwoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
  },
  transformSizeRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 24px 1fr',
    gap: '6px',
    alignItems: 'end',
  },
  transformActionsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '6px',
  },
  transformField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  transformLabel: {
    fontSize: '10px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    lineHeight: 1,
  },
  transformInput: {
    width: '100%',
    height: '24px',
    padding: '2px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '11px',
    lineHeight: 1,
    minWidth: 0,
  },
  transformEmptyCell: {
    width: '100%',
    height: '24px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    opacity: 0.6,
  },
  aspectLockButton: {
    width: '24px',
    height: '24px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '11px',
    lineHeight: 1,
    padding: 0,
  },
  aspectLockButtonActive: {
    color: 'var(--text-primary)',
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'var(--bg-hover)',
  },
  aspectLockIcon: {
    width: '14px',
    height: '14px',
  },
  alignSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '10px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary)',
  },
  pathfinderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '6px',
  },
  alignRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  alignGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '6px',
  },
  distributeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '6px',
  },
  alignButton: {
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    padding: 0,
  },
  alignButtonHover: {
    backgroundColor: 'var(--bg-hover)',
    borderColor: 'var(--accent-primary)',
  },
  alignIcon: {
    width: '16px',
    height: '16px',
    opacity: 0.95,
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rowLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    minWidth: '60px',
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  input: {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    minWidth: 0,
  },
  numberInput: {
    width: '60px',
    padding: '4px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: '4px',
  },
  colorInput: {
    width: '32px',
    height: '28px',
    padding: '0',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  select: {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
  button: {
    padding: '6px 12px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  buttonHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  actionButtonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '6px',
    marginTop: '8px',
  },
  toggleButton: {
    padding: '4px 8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    cursor: 'pointer',
  },
  toggleButtonActive: {
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    borderColor: 'var(--accent-primary)',
  },
  fillEditorContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  fillModeButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '4px',
  },
  fillModeButton: {
    height: '26px',
    padding: '0 8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    cursor: 'pointer',
  },
  fillModeButtonActive: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text-primary)',
  },
  helperText: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  },
  compactNumberGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '6px',
    width: '100%',
  },
  compactNumberField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  compactNumberLabel: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
};

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

function PropertySection({ title, children }: PropertySectionProps): JSX.Element {
  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function PropertyRow({ label, children }: PropertyRowProps): JSX.Element {
  return (
    <div style={styles.row}>
      <div style={styles.rowLabel}>{label}</div>
      <div style={styles.rowContent}>{children}</div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
}: NumberInputProps): JSX.Element {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      style={styles.numberInput}
    />
  );
}

function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderProps): JSX.Element {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      style={styles.slider}
    />
  );
}

function ColorInput({
  value,
  onChange,
  disabled = false,
}: { value: string; onChange: (value: string) => void; disabled?: boolean }): JSX.Element {
  return (
    <input
      type="color"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={styles.colorInput}
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  disabled = false,
}: SelectProps): JSX.Element {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={styles.select}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

interface TransformInputProps {
  label: string;
  value: string;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
}

function TransformInput({
  label,
  value,
  onFocus,
  onBlur,
  onChange,
}: TransformInputProps): JSX.Element {
  return (
    <label style={styles.transformField}>
      <span style={styles.transformLabel}>{label}</span>
      <input
        type="text"
        value={value}
        inputMode="decimal"
        aria-label={label}
        data-testid={`transform-${label.toLowerCase()}-input`}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        style={styles.transformInput}
      />
    </label>
  );
}

interface AlignIconButtonProps {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

function AlignIconButton({ title, onClick, children }: AlignIconButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.alignButton,
        ...(isHovered ? styles.alignButtonHover : {}),
      }}
    >
      {children}
    </button>
  );
}

function AlignLeftIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4v16" />
      <rect x="7" y="6" width="10" height="3" />
      <rect x="7" y="11" width="8" height="3" />
      <rect x="7" y="16" width="12" height="3" />
    </svg>
  );
}

function AlignCenterHIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 4v16" />
      <rect x="7" y="6" width="10" height="3" />
      <rect x="8" y="11" width="8" height="3" />
      <rect x="6" y="16" width="12" height="3" />
    </svg>
  );
}

function AlignRightIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20 4v16" />
      <rect x="7" y="6" width="10" height="3" />
      <rect x="9" y="11" width="8" height="3" />
      <rect x="5" y="16" width="12" height="3" />
    </svg>
  );
}

function AlignTopIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4h16" />
      <rect x="6" y="7" width="3" height="10" />
      <rect x="11" y="7" width="3" height="8" />
      <rect x="16" y="7" width="3" height="12" />
    </svg>
  );
}

function AlignCenterVIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 12h16" />
      <rect x="6" y="7" width="3" height="10" />
      <rect x="11" y="8" width="3" height="8" />
      <rect x="16" y="6" width="3" height="12" />
    </svg>
  );
}

function AlignBottomIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 20h16" />
      <rect x="6" y="7" width="3" height="10" />
      <rect x="11" y="9" width="3" height="8" />
      <rect x="16" y="5" width="3" height="12" />
    </svg>
  );
}

function DistributeHIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 5v14M20 5v14" />
      <rect x="7" y="9" width="3" height="6" />
      <rect x="14" y="9" width="3" height="6" />
    </svg>
  );
}

function DistributeVIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 4h14M5 20h14" />
      <rect x="9" y="7" width="6" height="3" />
      <rect x="9" y="14" width="6" height="3" />
    </svg>
  );
}

function PathfinderUniteIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  );
}

function PathfinderSubtractIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="6" width="10" height="12" />
      <path d="M10 6h10v12H10" />
      <path d="M10 6v12" />
    </svg>
  );
}

function PathfinderIntersectIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12a5 5 0 0 1 5-5h1v10H9a5 5 0 0 1-5-5z" />
      <path d="M20 12a5 5 0 0 0-5-5h-1v10h1a5 5 0 0 0 5-5z" />
      <rect x="10" y="7" width="4" height="10" />
    </svg>
  );
}

function PathfinderExcludeIcon(): JSX.Element {
  return (
    <svg style={styles.alignIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M10 7v10M14 7v10" />
    </svg>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PropertiesPanel({
  selectedObjects = [],
  freehandSettings: externalFreehandSettings,
  onFreehandSettingsChange,
}: PropertiesPanelProps): JSX.Element {
  const { canvas, subscribeToCanvasEvents } = useCanvas();
  const toast = useToast();
  const activeTool = useActiveTool();
  const activeObject = selectedObjects[0] ?? null;
  const [localFreehandSettings, setLocalFreehandSettings] = useState<FreehandSettings>({ ...defaultFreehandSettings });
  const freehandSettings = externalFreehandSettings ?? localFreehandSettings;

  const updateFreehandSetting = useCallback(<K extends keyof FreehandSettings>(key: K, value: FreehandSettings[K]) => {
    const updated = { ...freehandSettings, [key]: value };
    if (key === 'preset') {
      const preset = strokePresets[value as BrushPreset];
      if (preset) {
        updated.size = preset.size ?? updated.size;
        updated.thinning = preset.thinning ?? updated.thinning;
        updated.smoothing = preset.smoothing ?? updated.smoothing;
        updated.streamline = preset.streamline ?? updated.streamline;
      }
    }
    if (onFreehandSettingsChange) {
      onFreehandSettingsChange(updated);
    } else {
      setLocalFreehandSettings(updated);
    }
  }, [freehandSettings, onFreehandSettingsChange]);
  const objectType = activeObject?.type;
  const isMultiple = selectedObjects.length > 1;
  const [isAspectLocked, setIsAspectLocked] = useState(false);
  const [transformValues, setTransformValues] = useState<TransformPanelValues>(EMPTY_TRANSFORM_VALUES);
  const [inputDrafts, setInputDrafts] = useState<Partial<Record<TransformField, string>>>({});
  const [fillMode, setFillMode] = useState<FillStyleMode>('solid');
  const [solidFillColor, setSolidFillColor] = useState<string>('#000000');
  const [gradientState, setGradientState] = useState<GradientEditorState>(
    createDefaultGradientState('linear')
  );
  const [, setTextSyncTick] = useState(0);
  const transformSyncTimeoutRef = useRef<number | null>(null);

  const transformTargets = useMemo(
    () => selectedObjects as unknown as TransformObjectLike[],
    [selectedObjects]
  );

  const syncTransformValues = useCallback(() => {
    setTransformValues(computeMixedTransformValues(transformTargets));
  }, [transformTargets]);

  const scheduleTransformSync = useCallback(() => {
    if (typeof window === 'undefined') {
      syncTransformValues();
      return;
    }

    if (transformSyncTimeoutRef.current !== null) {
      window.clearTimeout(transformSyncTimeoutRef.current);
    }

    transformSyncTimeoutRef.current = window.setTimeout(() => {
      transformSyncTimeoutRef.current = null;
      syncTransformValues();
    }, 40);
  }, [syncTransformValues]);

  useEffect(() => {
    setInputDrafts({});
    syncTransformValues();
  }, [syncTransformValues]);

  useEffect(() => {
    return () => {
      if (transformSyncTimeoutRef.current !== null && typeof window !== 'undefined') {
        window.clearTimeout(transformSyncTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    if (subscribeToCanvasEvents) {
      return subscribeToCanvasEvents([...TRANSFORM_SYNC_EVENTS], scheduleTransformSync);
    }

    return subscribeToTransformEvents(canvas as unknown as CanvasEventSourceLike, scheduleTransformSync);
  }, [canvas, scheduleTransformSync, subscribeToCanvasEvents]);

  const syncTextPanel = useCallback(() => {
    if (!activeObject || !isCharacterTextObject(activeObject)) return;
    setTextSyncTick((version) => version + 1);
  }, [activeObject]);

  useEffect(() => {
    if (!canvas || !activeObject || !isCharacterTextObject(activeObject)) {
      return;
    }

    const textEvents = [
      'text:changed',
      'text:selection:changed',
      'selection:created',
      'selection:updated',
      'object:modified',
    ];

    if (subscribeToCanvasEvents) {
      return subscribeToCanvasEvents(textEvents, syncTextPanel);
    }

    textEvents.forEach((eventName) => {
      canvas.on(eventName as never, syncTextPanel as never);
    });

    return () => {
      textEvents.forEach((eventName) => {
        canvas.off(eventName as never, syncTextPanel as never);
      });
    };
  }, [activeObject, canvas, subscribeToCanvasEvents, syncTextPanel]);

  useEffect(() => {
    if (!activeObject || selectedObjects.length !== 1) {
      return;
    }

    const fillValue = (activeObject as FabricObject & { fill?: unknown }).fill;
    const nextFillState = getFillEditorState(
      fillValue,
      toFabricObjectDimensions(activeObject),
      '#000000'
    );

    setFillMode(nextFillState.mode);
    setSolidFillColor(nextFillState.solidColor);
    setGradientState(nextFillState.gradient);
  }, [activeObject, selectedObjects.length]);

  useEffect(() => {
    if (selectedObjects.length === 0) {
      setIsAspectLocked(false);
      return;
    }

    const firstValue = Boolean((selectedObjects[0] as FabricObject & { lockUniScaling?: boolean }).lockUniScaling);
    const allEqual = selectedObjects.every(
      (object) =>
        Boolean((object as FabricObject & { lockUniScaling?: boolean }).lockUniScaling) === firstValue
    );

    setIsAspectLocked(allEqual ? firstValue : false);
  }, [selectedObjects]);

  // ============================================================================
  // PROPERTY CHANGE HANDLERS
  // ============================================================================

  const updateProperty = useCallback(
    (property: string, value: unknown) => {
      if (!canvas || !activeObject) return;

      activeObject.set(property as any, value);
      activeObject.setCoords();
      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: activeObject });
    },
    [canvas, activeObject]
  );

  const updateMultipleProperties = useCallback(
    (updates: Record<string, unknown>) => {
      if (!canvas) return;

      for (const obj of selectedObjects) {
        for (const [prop, value] of Object.entries(updates)) {
          obj.set(prop as any, value);
        }
        obj.setCoords();
      }
      canvas.requestRenderAll();
    },
    [canvas, selectedObjects]
  );

  const toggleAspectLock = useCallback(() => {
    const nextLockState = !isAspectLocked;
    setIsAspectLocked(nextLockState);

    selectedObjects.forEach((object) => {
      setObjectAspectLock(object as unknown as MutableFabricObjectLike, nextLockState);
      object.setCoords();
    });

    if (canvas && selectedObjects.length > 0) {
      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: selectedObjects[0] });
    }
  }, [canvas, isAspectLocked, selectedObjects]);

  const flipSelectedObjects = useCallback(
    (direction: 'horizontal' | 'vertical') => {
      if (!canvas || selectedObjects.length === 0) return;

      selectedObjects.forEach((object) => {
        toggleObjectFlip(object as unknown as FlippableObjectLike, direction);
        object.setCoords();
      });

      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: selectedObjects[0] });
    },
    [canvas, selectedObjects]
  );

  const applyGradientFill = useCallback(
    (nextGradientState: GradientEditorState) => {
      if (!activeObject) return;

      const gradient = createFabricGradient(nextGradientState, toFabricObjectDimensions(activeObject));
      updateProperty('fill', gradient);
    },
    [activeObject, updateProperty]
  );

  const handleFillModeChange = useCallback(
    (nextMode: FillStyleMode) => {
      setFillMode(nextMode);

      if (nextMode === 'solid') {
        updateProperty('fill', solidFillColor);
        return;
      }

      const nextGradientState: GradientEditorState = {
        ...gradientState,
        type: nextMode,
      };
      setGradientState(nextGradientState);
      applyGradientFill(nextGradientState);
    },
    [solidFillColor, gradientState, updateProperty, applyGradientFill]
  );

  const handleSolidFillChange = useCallback(
    (nextColor: string) => {
      const normalized = normalizeColorToHex(nextColor, '#000000');
      setSolidFillColor(normalized);

      if (fillMode === 'solid') {
        updateProperty('fill', normalized);
      }
    },
    [fillMode, updateProperty]
  );

  const handleGradientChange = useCallback(
    (nextGradientState: GradientEditorState) => {
      setGradientState(nextGradientState);

      if (fillMode !== 'solid') {
        applyGradientFill(nextGradientState);
      }
    },
    [fillMode, applyGradientFill]
  );

  const applyTransformField = useCallback(
    (field: TransformField, value: number) => {
      if (!canvas || selectedObjects.length === 0 || Number.isNaN(value)) return;

      applyTransformChange(transformTargets, field, value, isAspectLocked);
      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: selectedObjects[0] });
      syncTransformValues();
    },
    [canvas, selectedObjects, transformTargets, isAspectLocked, syncTransformValues]
  );

  const resolveObjectId = useCallback((object: FabricObject, index: number): AlignmentObjectId => {
    const idFromGetter = object.get('id');
    if (typeof idFromGetter === 'string' || typeof idFromGetter === 'number') {
      return idFromGetter;
    }

    const idFromObject = (object as FabricObject & { id?: unknown }).id;
    if (typeof idFromObject === 'string' || typeof idFromObject === 'number') {
      return idFromObject;
    }

    return `object-${index}`;
  }, []);

  const applyAlignmentOperation = useCallback(
    (operation: (objects: FabricObject[]) => AlignmentPosition[]) => {
      if (!canvas) return;

      const activeObjects = canvas.getActiveObjects() as FabricObject[];
      if (activeObjects.length < 2) return;

      const positions = operation(activeObjects);
      const positionMap = new Map<AlignmentObjectId, AlignmentPosition>(
        positions.map((position) => [position.id, position])
      );

      activeObjects.forEach((object, index) => {
        const id = resolveObjectId(object, index);
        const nextPosition = positionMap.get(id);
        if (!nextPosition) return;
        object.set('left', nextPosition.left);
        object.set('top', nextPosition.top);
        object.setCoords();
      });

      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: activeObjects[0] });
      syncTransformValues();
    },
    [canvas, resolveObjectId, syncTransformValues]
  );

  const clearDraftValue = useCallback((field: TransformField) => {
    setInputDrafts((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const getInputValue = useCallback(
    (field: TransformField): string => {
      const draft = inputDrafts[field];
      if (draft !== undefined) {
        return draft;
      }
      return formatTransformDisplayValue(transformValues[field]);
    },
    [inputDrafts, transformValues]
  );

  const handleTransformInputFocus = useCallback(
    (field: TransformField) => {
      if (!transformValues[field].mixed) return;
      setInputDrafts((prev) => {
        if (prev[field] !== undefined) return prev;
        return { ...prev, [field]: '' };
      });
    },
    [transformValues]
  );

  const handleTransformInputChange = useCallback(
    (field: TransformField, nextValue: string) => {
      setInputDrafts((prev) => ({ ...prev, [field]: nextValue }));
      if (nextValue.trim() === '') return;

      const parsed = Number(nextValue);
      if (Number.isNaN(parsed)) return;
      applyTransformField(field, parsed);
    },
    [applyTransformField]
  );

  const renderTransformSection = () => (
    <div style={styles.transformSection}>
      <div style={styles.sectionTitle}>Transform</div>
      <div style={styles.transformRows}>
        <div style={styles.transformTwoCol}>
          <TransformInput
            label="X"
            value={getInputValue('x')}
            onFocus={() => handleTransformInputFocus('x')}
            onBlur={() => clearDraftValue('x')}
            onChange={(value) => handleTransformInputChange('x', value)}
          />
          <TransformInput
            label="Y"
            value={getInputValue('y')}
            onFocus={() => handleTransformInputFocus('y')}
            onBlur={() => clearDraftValue('y')}
            onChange={(value) => handleTransformInputChange('y', value)}
          />
        </div>

        <div style={styles.transformSizeRow}>
          <TransformInput
            label="W"
            value={getInputValue('w')}
            onFocus={() => handleTransformInputFocus('w')}
            onBlur={() => clearDraftValue('w')}
            onChange={(value) => handleTransformInputChange('w', value)}
          />
          <button
            type="button"
            style={{
              ...styles.aspectLockButton,
              ...(isAspectLocked ? styles.aspectLockButtonActive : {}),
            }}
            aria-label={isAspectLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
            title={isAspectLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
            onClick={toggleAspectLock}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={styles.aspectLockIcon}
              aria-hidden="true"
            >
              <path d="M9 8H7a4 4 0 0 0 0 8h2" />
              <path d="M15 8h2a4 4 0 0 1 0 8h-2" />
              <path d="M8 12h8" />
            </svg>
          </button>
          <TransformInput
            label="H"
            value={getInputValue('h')}
            onFocus={() => handleTransformInputFocus('h')}
            onBlur={() => clearDraftValue('h')}
            onChange={(value) => handleTransformInputChange('h', value)}
          />
        </div>

        <div style={styles.transformTwoCol}>
          <TransformInput
            label="Rotation"
            value={getInputValue('r')}
            onFocus={() => handleTransformInputFocus('r')}
            onBlur={() => clearDraftValue('r')}
            onChange={(value) => handleTransformInputChange('r', value)}
          />
          <TransformInput
            label="Opacity"
            value={getInputValue('o')}
            onFocus={() => handleTransformInputFocus('o')}
            onBlur={() => clearDraftValue('o')}
            onChange={(value) => handleTransformInputChange('o', value)}
          />
        </div>

        <div style={styles.transformActionsRow}>
          <button
            type="button"
            style={styles.button}
            onClick={() => flipSelectedObjects('horizontal')}
          >
            Flip H
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => flipSelectedObjects('vertical')}
          >
            Flip V
          </button>
        </div>
      </div>
    </div>
  );

  const renderAlignSection = () => {
    if (selectedObjects.length < 2) {
      return null;
    }

    return (
      <div style={styles.alignSection}>
        <div style={styles.sectionTitle}>Align</div>
        <div style={styles.alignRows}>
          <div style={styles.alignGrid}>
            <AlignIconButton title="Align Left" onClick={() => applyAlignmentOperation(alignLeft)}>
              <AlignLeftIcon />
            </AlignIconButton>
            <AlignIconButton title="Align Center Horizontal" onClick={() => applyAlignmentOperation(alignCenterH)}>
              <AlignCenterHIcon />
            </AlignIconButton>
            <AlignIconButton title="Align Right" onClick={() => applyAlignmentOperation(alignRight)}>
              <AlignRightIcon />
            </AlignIconButton>
            <AlignIconButton title="Align Top" onClick={() => applyAlignmentOperation(alignTop)}>
              <AlignTopIcon />
            </AlignIconButton>
            <AlignIconButton title="Align Center Vertical" onClick={() => applyAlignmentOperation(alignCenterV)}>
              <AlignCenterVIcon />
            </AlignIconButton>
            <AlignIconButton title="Align Bottom" onClick={() => applyAlignmentOperation(alignBottom)}>
              <AlignBottomIcon />
            </AlignIconButton>
          </div>

          {selectedObjects.length >= 3 && (
            <div style={styles.distributeGrid}>
              <AlignIconButton title="Distribute Horizontally" onClick={() => applyAlignmentOperation(distributeH)}>
                <DistributeHIcon />
              </AlignIconButton>
              <AlignIconButton title="Distribute Vertically" onClick={() => applyAlignmentOperation(distributeV)}>
                <DistributeVIcon />
              </AlignIconButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  const runPathfinderOperation = useCallback(
    (operation: PathfinderOperation) => {
      if (!canvas) return;

      const canvasSelection = canvas.getActiveObjects() as FabricObject[];
      const targetObjects =
        canvasSelection.length >= 2 ? canvasSelection : (selectedObjects as FabricObject[]);

      if (targetObjects.length < 2) {
        toast.warning('Select at least 2 objects for pathfinder operations');
        return;
      }

      try {
        applyBooleanOperationToCanvas(canvas, targetObjects, operation);
        syncTransformValues();
      } catch (error) {
        if (isEmptyResultError(error)) {
          toast.error('Operation produced no result');
          return;
        }

        const message = error instanceof Error ? error.message : '';
        if (
          /convert|unsupported object type|path-compatible children|invalid radius/i.test(message)
        ) {
          toast.error('Unable to convert one or more selected objects for pathfinder');
          return;
        }

        toast.error(message || 'Pathfinder operation failed');
      }
    },
    [canvas, selectedObjects, syncTransformValues, toast]
  );

  const renderPathfinderSection = () => {
    if (selectedObjects.length < 2) {
      return null;
    }

    return (
      <div style={styles.alignSection}>
        <div style={styles.sectionTitle}>Pathfinder</div>
        <div style={styles.pathfinderGrid}>
          <AlignIconButton title="Unite" onClick={() => runPathfinderOperation('unite')}>
            <PathfinderUniteIcon />
          </AlignIconButton>
          <AlignIconButton title="Subtract" onClick={() => runPathfinderOperation('subtract')}>
            <PathfinderSubtractIcon />
          </AlignIconButton>
          <AlignIconButton title="Intersect" onClick={() => runPathfinderOperation('intersect')}>
            <PathfinderIntersectIcon />
          </AlignIconButton>
          <AlignIconButton title="Exclude" onClick={() => runPathfinderOperation('exclude')}>
            <PathfinderExcludeIcon />
          </AlignIconButton>
        </div>
      </div>
    );
  };

  const renderEffectsSection = () => (
    <EffectsPanel
      selectedObjects={selectedObjects}
      canvas={canvas as any}
    />
  );

  // Empty state
  if (selectedObjects.length === 0 || !activeObject) {
    return (
      <div style={styles.emptyState}>
        <svg
          style={styles.emptyIcon}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <div style={styles.emptyText}>Select an object to edit its properties</div>
      </div>
    );
  }

  // ============================================================================
  // COMMON PROPERTIES (shown for all objects)
  // ============================================================================

  const renderCommonProperties = () => {
    if (!activeObject) return null;

    const isLocked = activeObject.lockMovementX && activeObject.lockMovementY;
    const showClippingMaskIndicator = isClippingMaskGroup(activeObject);
    const showCompoundPathIndicator = isCompoundPath(activeObject);

    return (
      <>
        {showClippingMaskIndicator && (
          <PropertySection title="Clipping">
            <div style={styles.helperText}>Clipping Mask</div>
          </PropertySection>
        )}
        {showCompoundPathIndicator && (
          <PropertySection title="Compound">
            <div style={styles.helperText}>Compound Path (Even-Odd Fill)</div>
          </PropertySection>
        )}
        <PropertySection title="Actions">
          <button
            style={{
              ...styles.button,
              ...(isLocked ? styles.toggleButtonActive : {}),
            }}
            onClick={() => {
              const newLockState = !isLocked;
              updateMultipleProperties({
                lockMovementX: newLockState,
                lockMovementY: newLockState,
                lockRotation: newLockState,
                lockScalingX: newLockState,
                lockScalingY: newLockState,
              });
            }}
          >
            {isLocked ? '🔒 Unlock' : '🔓 Lock'}
          </button>
        </PropertySection>
      </>
    );
  };

  // ============================================================================
  // SHAPE-SPECIFIC PROPERTIES
  // ============================================================================

  const renderFillEditor = () => (
    <div style={styles.fillEditorContainer}>
      <div style={styles.fillModeButtons}>
        {(['solid', 'linear', 'radial'] as const).map((mode) => {
          const label = mode === 'solid' ? 'Solid' : mode === 'linear' ? 'Linear' : 'Radial';
          return (
            <button
              key={mode}
              type="button"
              onClick={() => handleFillModeChange(mode)}
              style={{
                ...styles.fillModeButton,
                ...(fillMode === mode ? styles.fillModeButtonActive : {}),
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {fillMode === 'solid' ? (
        <ColorInput value={solidFillColor} onChange={handleSolidFillChange} />
      ) : (
        <GradientEditor
          value={{
            ...gradientState,
            type: fillMode,
          }}
          onChange={handleGradientChange}
        />
      )}
    </div>
  );

  const renderShapeProperties = () => {
    const stroke = (activeObject as FabricObject & { stroke?: unknown }).stroke;
    const strokeWidth = Math.max(1, Number((activeObject as FabricObject & { strokeWidth?: number }).strokeWidth) || 1);
    const strokeDashArray = (activeObject as FabricObject & { strokeDashArray?: number[] | null }).strokeDashArray;
    const strokeDashPreset = getStrokeDashPresetFromArray(strokeDashArray);
    const strokeLineCap = ((activeObject as FabricObject & { strokeLineCap?: string }).strokeLineCap || 'butt');
    const strokeLineJoin = ((activeObject as FabricObject & { strokeLineJoin?: string }).strokeLineJoin || 'miter');

    const updateStrokeWidth = (value: number) => {
      updateProperty('strokeWidth', Math.min(20, Math.max(1, value)));
    };

    return (
      <>
        <PropertySection title="Appearance">
          <PropertyRow
            label="Fill"
            children={renderFillEditor()}
          />
          <PropertyRow
            label="Stroke"
            children={<ColorInput value={typeof stroke === 'string' ? stroke : '#000000'} onChange={(v) => updateProperty('stroke', v)} />}
          />
        </PropertySection>

        <PropertySection title="Stroke">
          <PropertyRow
            label="Width"
            children={
              <>
                <SliderInput
                  value={strokeWidth}
                  min={1}
                  max={20}
                  step={1}
                  onChange={updateStrokeWidth}
                />
                <NumberInput value={Math.round(strokeWidth)} min={1} max={20} step={1} onChange={updateStrokeWidth} />
              </>
            }
          />
          <PropertyRow
            label="Dash"
            children={
              <SelectInput
                value={strokeDashPreset}
                onChange={(value) => {
                  applyStrokeDashPreset(
                    activeObject as unknown as MutableFabricObjectLike,
                    value as StrokeDashPreset
                  );
                  canvas?.requestRenderAll();
                }}
                options={[
                  { value: 'solid', label: 'Solid' },
                  { value: 'dashed', label: 'Dashed' },
                  { value: 'dotted', label: 'Dotted' },
                  { value: 'dash-dot', label: 'Dash-Dot' },
                  { value: 'long-dash', label: 'Long Dash' },
                ]}
              />
            }
          />
          <PropertyRow
            label="Line Cap"
            children={
              <SelectInput
                value={strokeLineCap}
                onChange={(value) => updateProperty('strokeLineCap', value)}
                options={[
                  { value: 'butt', label: 'butt' },
                  { value: 'round', label: 'round' },
                  { value: 'square', label: 'square' },
                ]}
              />
            }
          />
          <PropertyRow
            label="Line Join"
            children={
              <SelectInput
                value={strokeLineJoin}
                onChange={(value) => updateProperty('strokeLineJoin', value)}
                options={[
                  { value: 'miter', label: 'miter' },
                  { value: 'round', label: 'round' },
                  { value: 'bevel', label: 'bevel' },
                ]}
              />
            }
          />
        </PropertySection>

        {activeObject instanceof Rect && (
          <PropertySection title="Corner Radius">
            {(() => {
              const rectObject = activeObject as Rect;
              const radius = Math.max(rectObject.rx || 0, rectObject.ry || 0);
              const maxRadius = getRectCornerRadiusMax(
                rectObject as unknown as RectCornerLike
              );
              const safeMax = Math.max(0, maxRadius);
              const clampedRadius = Math.min(radius, safeMax);
              const handleCornerRadiusChange = (value: number) => {
                const clamped = Math.min(Math.max(value, 0), safeMax);
                applyUniformCornerRadius(
                  rectObject as unknown as MutableFabricObjectLike,
                  clamped
                );
                rectObject.setCoords();
                canvas?.requestRenderAll();
                canvas?.fire('object:modified', { target: rectObject });
              };

              return (
                <>
                  <PropertyRow
                    label="Radius"
                    children={
                      <>
                        <SliderInput
                          value={clampedRadius}
                          min={0}
                          max={safeMax}
                          step={1}
                          onChange={handleCornerRadiusChange}
                        />
                        <NumberInput
                          value={Math.round(clampedRadius)}
                          min={0}
                          max={Math.round(safeMax)}
                          step={1}
                          onChange={handleCornerRadiusChange}
                        />
                      </>
                    }
                  />
                  <PropertyRow
                    label="Corners"
                    children={
                      <div style={styles.compactNumberGrid}>
                        {['Top Left', 'Top Right', 'Bottom Right', 'Bottom Left'].map((label) => (
                          <label key={label} style={styles.compactNumberField}>
                            <span style={styles.compactNumberLabel}>{label}</span>
                            <NumberInput
                              value={Math.round(clampedRadius)}
                              min={0}
                              max={Math.round(safeMax)}
                              step={1}
                              onChange={handleCornerRadiusChange}
                            />
                          </label>
                        ))}
                      </div>
                    }
                  />
                  <div style={styles.helperText}>
                    Fabric.js rectangles support uniform corner rounding only (`rx`/`ry`).
                  </div>
                </>
              );
            })()}
          </PropertySection>
        )}
      </>
    );
  };

  // ============================================================================
  // LINE PROPERTIES
  // ============================================================================

  const renderLineProperties = () => {
    if (!(activeObject instanceof Line)) return null;

    const stroke = (activeObject as Line).stroke || '#000000';
    const strokeWidth = Math.max(1, Number((activeObject as Line).strokeWidth) || 1);
    const strokeDashArray = (activeObject as Line).strokeDashArray as number[] | null | undefined;
    const strokeDashPreset = getStrokeDashPresetFromArray(strokeDashArray);
    const strokeLineCap = ((activeObject as Line).strokeLineCap as string) || 'butt';
    const strokeLineJoin = ((activeObject as Line).strokeLineJoin as string) || 'miter';
    const updateStrokeWidth = (value: number) => {
      updateProperty('strokeWidth', Math.min(20, Math.max(1, value)));
    };

    return (
      <>
        <PropertySection title="Appearance">
          <PropertyRow
            label="Color"
            children={<ColorInput value={typeof stroke === 'string' ? stroke : '#000000'} onChange={(v) => updateProperty('stroke', v)} />}
          />
        </PropertySection>

        <PropertySection title="Stroke">
          <PropertyRow
            label="Width"
            children={
              <>
                <SliderInput
                  value={strokeWidth}
                  min={1}
                  max={20}
                  step={1}
                  onChange={updateStrokeWidth}
                />
                <NumberInput value={Math.round(strokeWidth)} min={1} max={20} step={1} onChange={updateStrokeWidth} />
              </>
            }
          />
          <PropertyRow
            label="Dash"
            children={
              <SelectInput
                value={strokeDashPreset}
                onChange={(value) => {
                  applyStrokeDashPreset(
                    activeObject as unknown as MutableFabricObjectLike,
                    value as StrokeDashPreset
                  );
                  canvas?.requestRenderAll();
                }}
                options={[
                  { value: 'solid', label: 'Solid' },
                  { value: 'dashed', label: 'Dashed' },
                  { value: 'dotted', label: 'Dotted' },
                  { value: 'dash-dot', label: 'Dash-Dot' },
                  { value: 'long-dash', label: 'Long Dash' },
                ]}
              />
            }
          />
          <PropertyRow
            label="Line Cap"
            children={
              <SelectInput
                value={strokeLineCap}
                onChange={(value) => updateProperty('strokeLineCap', value)}
                options={[
                  { value: 'butt', label: 'butt' },
                  { value: 'round', label: 'round' },
                  { value: 'square', label: 'square' },
                ]}
              />
            }
          />
          <PropertyRow
            label="Line Join"
            children={
              <SelectInput
                value={strokeLineJoin}
                onChange={(value) => updateProperty('strokeLineJoin', value)}
                options={[
                  { value: 'miter', label: 'miter' },
                  { value: 'round', label: 'round' },
                  { value: 'bevel', label: 'bevel' },
                ]}
              />
            }
          />
        </PropertySection>
      </>
    );
  };

  // ============================================================================
  // TEXT PROPERTIES
  // ============================================================================

  const renderTextProperties = () => {
    if (!activeObject || !isCharacterTextObject(activeObject)) return null;

    return (
      <CharacterPanel
        textObject={activeObject as CharacterTextLike}
        onChange={(property: CharacterProperty, value) => updateProperty(property, value)}
      />
    );
  };

  // ============================================================================
  // GROUP PROPERTIES
  // ============================================================================

  const renderGroupProperties = () => {
    if (!(activeObject instanceof Group)) return null;

    return (
      <PropertySection title="Group">
        <button
          style={styles.button}
          onClick={() => {
            if (!canvas) return;
            const items = (activeObject as Group).getObjects();
            canvas.discardActiveObject();
            canvas.remove(activeObject);

            items.forEach((item: FabricObject) => {
              canvas.add(item);
            });

            canvas.requestRenderAll();
          }}
        >
          Ungroup
        </button>
      </PropertySection>
    );
  };

  // ============================================================================
  // IMAGE PROPERTIES
  // ============================================================================

  const renderImageProperties = () => {
    if (!(activeObject instanceof FabricImage)) return null;

    const bound = activeObject.getBoundingRect();

    return (
      <PropertySection title="Image">
        <PropertyRow
          label="Width"
          children={<span style={{ fontSize: '12px' }}>{Math.round(bound.width)}px</span>}
        />
        <PropertyRow
          label="Height"
          children={<span style={{ fontSize: '12px' }}>{Math.round(bound.height)}px</span>}
        />
        <PropertyRow
          label="Aspect"
          children={
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {(bound.width / bound.height).toFixed(2)}
            </span>
          }
        />
      </PropertySection>
    );
  };

  // ============================================================================
  // BRUSH SETTINGS
  // ============================================================================

  const renderBrushSettings = () => {
    if (activeTool !== ToolType.BRUSH) return null;

    const presetOptions = [
      { value: 'pen', label: 'Pen' },
      { value: 'marker', label: 'Marker' },
      { value: 'highlighter', label: 'Highlighter' },
      { value: 'brush', label: 'Brush' },
      { value: 'calligraphy', label: 'Calligraphy' },
    ];

    return (
      <PropertySection title="Brush Settings">
        <PropertyRow label="Preset">
          <SelectInput
            value={freehandSettings.preset}
            onChange={(v) => updateFreehandSetting('preset', v as BrushPreset)}
            options={presetOptions}
          />
        </PropertyRow>
        <PropertyRow label="Size">
          <NumberInput
            value={freehandSettings.size}
            onChange={(v) => updateFreehandSetting('size', v)}
            min={1}
            max={100}
            step={1}
          />
        </PropertyRow>
        <PropertyRow label="Thinning">
          <SliderInput
            value={freehandSettings.thinning}
            onChange={(v) => updateFreehandSetting('thinning', v)}
            min={0}
            max={1}
            step={0.05}
          />
        </PropertyRow>
        <PropertyRow label="Smoothing">
          <SliderInput
            value={freehandSettings.smoothing}
            onChange={(v) => updateFreehandSetting('smoothing', v)}
            min={0}
            max={1}
            step={0.05}
          />
        </PropertyRow>
        <PropertyRow label="Streamline">
          <SliderInput
            value={freehandSettings.streamline}
            onChange={(v) => updateFreehandSetting('streamline', v)}
            min={0}
            max={1}
            step={0.05}
          />
        </PropertyRow>
        <PropertyRow label="Color">
          <ColorInput
            value={freehandSettings.color}
            onChange={(v) => updateFreehandSetting('color', v)}
          />
        </PropertyRow>
        <PropertyRow label="Opacity">
          <SliderInput
            value={freehandSettings.opacity}
            onChange={(v) => updateFreehandSetting('opacity', v)}
            min={0}
            max={1}
            step={0.05}
          />
        </PropertyRow>
      </PropertySection>
    );
  };

  // ============================================================================
  // RENDER CONTENT
  // ============================================================================

  const renderContent = () => {
    if (isMultiple) {
      return (
        <>
          {renderTransformSection()}
          {renderAlignSection()}
          {renderPathfinderSection()}
          {renderEffectsSection()}
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>
              {selectedObjects.length} objects selected
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Mixed values are shown as {MIXED_VALUE}
            </p>
          </div>
          {renderCommonProperties()}
        </>
      );
    }

    switch (objectType) {
      case 'rect':
      case 'ellipse':
      case 'polygon':
        return (
          <>
            {renderTransformSection()}
            {renderAlignSection()}
            {renderPathfinderSection()}
            {renderEffectsSection()}
            {renderCommonProperties()}
            {renderShapeProperties()}
          </>
        );
      case 'line':
        return (
          <>
            {renderTransformSection()}
            {renderAlignSection()}
            {renderPathfinderSection()}
            {renderEffectsSection()}
            {renderCommonProperties()}
            {renderLineProperties()}
          </>
        );
      case 'i-text':
      case 'textbox':
        return (
          <>
            {renderTransformSection()}
            {renderAlignSection()}
            {renderPathfinderSection()}
            {renderEffectsSection()}
            {renderCommonProperties()}
            {renderTextProperties()}
          </>
        );
      case 'group':
        return (
          <>
            {renderTransformSection()}
            {renderAlignSection()}
            {renderPathfinderSection()}
            {renderEffectsSection()}
            {renderCommonProperties()}
            {renderGroupProperties()}
          </>
        );
      case 'image':
        return (
          <>
            {renderTransformSection()}
            {renderAlignSection()}
            {renderPathfinderSection()}
            {renderEffectsSection()}
            {renderCommonProperties()}
            {renderImageProperties()}
          </>
        );
      default:
        return (
          <>
            {renderTransformSection()}
            {renderAlignSection()}
            {renderPathfinderSection()}
            {renderEffectsSection()}
            {renderCommonProperties()}
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>
                No editable properties for this object type
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.panel}>
      {renderBrushSettings()}
      {renderContent()}
    </div>
  );
}
