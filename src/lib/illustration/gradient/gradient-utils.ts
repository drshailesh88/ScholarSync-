import type { FabricObject } from 'fabric';
import { Gradient } from 'fabric';
import { createColorScale, darken, lighten, mixColorsOKLCH, parseColor, toHex } from '@/lib/illustration/lib/color';

export type GradientFillType = 'linear' | 'radial';
export type FillStyleMode = 'solid' | GradientFillType;

export interface GradientStop {
  id: string;
  offset: number;
  color: string;
  opacity?: number;
}

export interface GradientEditorState {
  type: GradientFillType;
  stops: GradientStop[];
  angle: number;
  cx: number;
  cy: number;
}

export interface ObjectDimensions {
  width: number;
  height: number;
}

export interface GradientPreset {
  id: string;
  name: string;
  stops: Array<{ offset: number; color: string }>;
  angle?: number;
  cx?: number;
  cy?: number;
}

export interface FillEditorState {
  mode: FillStyleMode;
  solidColor: string;
  gradient: GradientEditorState;
}

const DEFAULT_SOLID_COLOR = '#000000';

let stopCounter = 0;

function nextStopId(): string {
  stopCounter += 1;
  return `stop-${stopCounter}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeAngle(angle: number): number {
  const normalized = ((angle % 360) + 360) % 360;
  return Number.isFinite(normalized) ? normalized : 0;
}

function fallbackStops(baseColor: string = DEFAULT_SOLID_COLOR): GradientStop[] {
  const start = normalizeColorToHex(baseColor);
  return [
    { id: nextStopId(), offset: 0, color: start },
    { id: nextStopId(), offset: 1, color: normalizeColorToHex(lighten(start, 0.25), '#ffffff') },
  ];
}

function stopsWithIds(
  stops: Array<Partial<GradientStop> & Pick<GradientStop, 'offset' | 'color'>>
): GradientStop[] {
  return stops.map((stop) => ({
    id: stop.id ?? nextStopId(),
    offset: clamp(Number.isFinite(stop.offset) ? stop.offset : 0, 0, 1),
    color: normalizeColorToHex(stop.color),
    opacity: typeof stop.opacity === 'number' ? clamp(stop.opacity, 0, 1) : undefined,
  }));
}

export function normalizeColorToHex(color: string, fallback: string = DEFAULT_SOLID_COLOR): string {
  const toLongHex = (hex: string): string => {
    const trimmed = hex.trim().toLowerCase();
    const shortMatch = /^#([0-9a-f]{3})$/i.exec(trimmed);
    if (shortMatch) {
      const [r, g, b] = shortMatch[1].split('');
      return `#${r}${r}${g}${g}${b}${b}`;
    }

    const longMatch = /^#([0-9a-f]{6})$/i.exec(trimmed);
    if (longMatch) {
      return `#${longMatch[1].toLowerCase()}`;
    }

    return trimmed;
  };

  try {
    return toLongHex(parseColor(color));
  } catch {
    try {
      return toLongHex(toHex(color));
    } catch {
      return toLongHex(fallback);
    }
  }
}

export function normalizeStops(
  stops: Array<Partial<GradientStop> & Pick<GradientStop, 'offset' | 'color'>>,
  fallbackColor: string = DEFAULT_SOLID_COLOR
): GradientStop[] {
  const normalized = stopsWithIds(stops)
    .sort((a, b) => a.offset - b.offset)
    .map((stop) => ({ ...stop, color: normalizeColorToHex(stop.color, fallbackColor) }));

  if (normalized.length >= 2) {
    return normalized;
  }

  return fallbackStops(fallbackColor);
}

export function createDefaultGradientState(type: GradientFillType = 'linear', baseColor: string = '#3b82f6'): GradientEditorState {
  return {
    type,
    stops: fallbackStops(baseColor),
    angle: 0,
    cx: 50,
    cy: 50,
  };
}

export function buildLinearGradientCoords(
  angle: number,
  width: number,
  height: number
): { x1: number; y1: number; x2: number; y2: number } {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const normalizedAngle = normalizeAngle(angle);
  const radians = (normalizedAngle * Math.PI) / 180;

  const centerX = safeWidth / 2;
  const centerY = safeHeight / 2;

  const dx = Math.cos(radians) * centerX;
  const dy = Math.sin(radians) * centerY;

  return {
    x1: centerX - dx,
    y1: centerY - dy,
    x2: centerX + dx,
    y2: centerY + dy,
  };
}

export function buildRadialGradientCoords(
  width: number,
  height: number,
  cx: number,
  cy: number
): { x1: number; y1: number; x2: number; y2: number; r1: number; r2: number } {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const centerX = safeWidth * (clamp(cx, 0, 100) / 100);
  const centerY = safeHeight * (clamp(cy, 0, 100) / 100);

  return {
    x1: centerX,
    y1: centerY,
    x2: centerX,
    y2: centerY,
    r1: 0,
    r2: Math.max(safeWidth, safeHeight) / 2,
  };
}

export function getInterpolatedStopColor(
  stops: Array<Partial<GradientStop> & Pick<GradientStop, 'offset' | 'color'>>,
  offset: number
): string {
  const ordered = [...normalizeStops(stops)]
    .sort((a, b) => a.offset - b.offset);
  const clampedOffset = clamp(offset, 0, 1);

  if (clampedOffset <= ordered[0].offset) {
    return ordered[0].color;
  }

  if (clampedOffset >= ordered[ordered.length - 1].offset) {
    return ordered[ordered.length - 1].color;
  }

  for (let i = 1; i < ordered.length; i += 1) {
    const prev = ordered[i - 1];
    const next = ordered[i];

    if (clampedOffset >= prev.offset && clampedOffset <= next.offset) {
      const distance = next.offset - prev.offset;
      if (distance === 0) {
        return prev.color;
      }
      const ratio = (clampedOffset - prev.offset) / distance;
      return normalizeColorToHex(mixColorsOKLCH(prev.color, next.color, ratio), prev.color);
    }
  }

  return ordered[0].color;
}

export function insertGradientStop(stops: GradientStop[], offset: number, color?: string): GradientStop[] {
  const clampedOffset = clamp(offset, 0, 1);
  const nextColor = color ? normalizeColorToHex(color) : getInterpolatedStopColor(stops, clampedOffset);

  const inserted = [
    ...stops,
    {
      id: nextStopId(),
      offset: clampedOffset,
      color: nextColor,
    },
  ];

  return normalizeStops(inserted);
}

export function removeGradientStop(stops: GradientStop[], stopId: string, minStops: number = 2): GradientStop[] {
  if (stops.length <= minStops) {
    return stops;
  }

  const next = stops.filter((stop) => stop.id !== stopId);
  if (next.length < minStops) {
    return stops;
  }

  return normalizeStops(next);
}

export function moveGradientStop(stops: GradientStop[], stopId: string, offset: number): GradientStop[] {
  const clampedOffset = clamp(offset, 0, 1);

  return normalizeStops(
    stops.map((stop) =>
      stop.id === stopId
        ? {
            ...stop,
            offset: clampedOffset,
          }
        : stop
    )
  );
}

export function updateGradientStopColor(stops: GradientStop[], stopId: string, color: string): GradientStop[] {
  const normalizedColor = normalizeColorToHex(color);

  return normalizeStops(
    stops.map((stop) =>
      stop.id === stopId
        ? {
            ...stop,
            color: normalizedColor,
          }
        : stop
    )
  );
}

function isGradientLike(fill: unknown): fill is {
  type: GradientFillType;
  colorStops: Array<{ offset: number; color: string; opacity?: number }>;
  coords: Record<string, number>;
} {
  if (!fill || typeof fill !== 'object') {
    return false;
  }

  const gradient = fill as {
    type?: unknown;
    colorStops?: unknown;
    coords?: unknown;
  };

  if (gradient.type !== 'linear' && gradient.type !== 'radial') {
    return false;
  }

  return Array.isArray(gradient.colorStops) && typeof gradient.coords === 'object' && gradient.coords !== null;
}

export function createFabricGradient(
  state: GradientEditorState,
  dimensions: ObjectDimensions
): Gradient<string, GradientFillType> {
  const normalizedState = {
    ...state,
    stops: normalizeStops(state.stops),
    angle: normalizeAngle(state.angle),
    cx: clamp(state.cx, 0, 100),
    cy: clamp(state.cy, 0, 100),
  };

  if (normalizedState.type === 'linear') {
    return new Gradient({
      type: 'linear',
      coords: buildLinearGradientCoords(normalizedState.angle, dimensions.width, dimensions.height),
      colorStops: normalizedState.stops.map((stop) => ({
        offset: stop.offset,
        color: stop.color,
        opacity: stop.opacity,
      })),
    });
  }

  return new Gradient({
    type: 'radial',
    coords: buildRadialGradientCoords(dimensions.width, dimensions.height, normalizedState.cx, normalizedState.cy),
    colorStops: normalizedState.stops.map((stop) => ({
      offset: stop.offset,
      color: stop.color,
      opacity: stop.opacity,
    })),
  });
}

function angleFromLinearCoords(coords: Record<string, number>): number {
  const x1 = typeof coords.x1 === 'number' ? coords.x1 : 0;
  const y1 = typeof coords.y1 === 'number' ? coords.y1 : 0;
  const x2 = typeof coords.x2 === 'number' ? coords.x2 : 0;
  const y2 = typeof coords.y2 === 'number' ? coords.y2 : 0;

  const radians = Math.atan2(y2 - y1, x2 - x1);
  return normalizeAngle((radians * 180) / Math.PI);
}

export function gradientToEditorState(
  fill: unknown,
  dimensions: ObjectDimensions,
  fallbackColor: string = DEFAULT_SOLID_COLOR
): GradientEditorState {
  if (!isGradientLike(fill)) {
    return createDefaultGradientState('linear', fallbackColor);
  }

  const stops = normalizeStops(fill.colorStops, fallbackColor);

  if (fill.type === 'linear') {
    return {
      type: 'linear',
      stops,
      angle: angleFromLinearCoords(fill.coords),
      cx: 50,
      cy: 50,
    };
  }

  const x = typeof fill.coords.x2 === 'number' ? fill.coords.x2 : (typeof fill.coords.x1 === 'number' ? fill.coords.x1 : dimensions.width / 2);
  const y = typeof fill.coords.y2 === 'number' ? fill.coords.y2 : (typeof fill.coords.y1 === 'number' ? fill.coords.y1 : dimensions.height / 2);

  return {
    type: 'radial',
    stops,
    angle: 0,
    cx: clamp((x / Math.max(dimensions.width, 1)) * 100, 0, 100),
    cy: clamp((y / Math.max(dimensions.height, 1)) * 100, 0, 100),
  };
}

export function getFillEditorState(
  fill: unknown,
  dimensions: ObjectDimensions,
  fallbackColor: string = DEFAULT_SOLID_COLOR
): FillEditorState {
  if (typeof fill === 'string') {
    const solidColor = normalizeColorToHex(fill, fallbackColor);
    return {
      mode: 'solid',
      solidColor,
      gradient: createDefaultGradientState('linear', solidColor),
    };
  }

  if (isGradientLike(fill)) {
    const gradientState = gradientToEditorState(fill, dimensions, fallbackColor);
    return {
      mode: fill.type,
      solidColor: gradientState.stops[0]?.color ?? fallbackColor,
      gradient: gradientState,
    };
  }

  const safeColor = normalizeColorToHex(fallbackColor);
  return {
    mode: 'solid',
    solidColor: safeColor,
    gradient: createDefaultGradientState('linear', safeColor),
  };
}

interface DimensionSource {
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  getScaledWidth?: () => number;
  getScaledHeight?: () => number;
}

export function getObjectDimensions(object: DimensionSource | null): ObjectDimensions {
  if (!object) {
    return { width: 100, height: 100 };
  }

  const fromGetterWidth = object.getScaledWidth?.();
  const fromGetterHeight = object.getScaledHeight?.();

  const scaleX = typeof object.scaleX === 'number' ? Math.abs(object.scaleX) : 1;
  const scaleY = typeof object.scaleY === 'number' ? Math.abs(object.scaleY) : 1;

  const widthFromProps = typeof object.width === 'number' ? Math.abs(object.width * scaleX) : 0;
  const heightFromProps = typeof object.height === 'number' ? Math.abs(object.height * scaleY) : 0;

  const width = Math.max(fromGetterWidth ?? 0, widthFromProps, 1);
  const height = Math.max(fromGetterHeight ?? 0, heightFromProps, 1);

  return { width, height };
}

const coolScale = createColorScale('#7c3aed', '#06b6d4', 3);
const warmScale = createColorScale('#dc2626', '#fb923c', 2);

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: 'ocean',
    name: 'Ocean',
    stops: [
      { offset: 0, color: normalizeColorToHex(toHex('#3b82f6')) },
      { offset: 1, color: normalizeColorToHex(darken('#1d4ed8', 0.35), '#1e40af') },
    ],
    angle: 0,
  },
  {
    id: 'sunset',
    name: 'Sunset',
    stops: [
      { offset: 0, color: normalizeColorToHex(toHex('#fb7185')) },
      { offset: 0.55, color: normalizeColorToHex(toHex('#f97316')) },
      { offset: 1, color: normalizeColorToHex(toHex('#facc15')) },
    ],
    angle: 35,
  },
  {
    id: 'forest',
    name: 'Forest',
    stops: [
      { offset: 0, color: normalizeColorToHex(darken('#2e7d32', 0.25), '#14532d') },
      { offset: 1, color: normalizeColorToHex(lighten('#4caf50', 0.2), '#86efac') },
    ],
    angle: 90,
  },
  {
    id: 'grayscale',
    name: 'Grayscale',
    stops: [
      { offset: 0, color: normalizeColorToHex(toHex('#000000')) },
      { offset: 1, color: normalizeColorToHex(toHex('#ffffff')) },
    ],
    angle: 0,
  },
  {
    id: 'cool',
    name: 'Cool',
    stops: [
      { offset: 0, color: normalizeColorToHex(coolScale[0] ?? '#7c3aed') },
      { offset: 0.5, color: normalizeColorToHex(coolScale[1] ?? '#3b82f6') },
      { offset: 1, color: normalizeColorToHex(coolScale[2] ?? '#06b6d4') },
    ],
    angle: 25,
  },
  {
    id: 'warm',
    name: 'Warm',
    stops: [
      { offset: 0, color: normalizeColorToHex(warmScale[0] ?? '#dc2626') },
      { offset: 1, color: normalizeColorToHex(warmScale[1] ?? '#fb923c') },
    ],
    angle: 0,
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    stops: [
      { offset: 0, color: '#ef4444' },
      { offset: 0.2, color: '#f59e0b' },
      { offset: 0.4, color: '#facc15' },
      { offset: 0.6, color: '#22c55e' },
      { offset: 0.8, color: '#3b82f6' },
      { offset: 1, color: '#8b5cf6' },
    ],
    angle: 0,
  },
  {
    id: 'custom',
    name: 'Custom',
    stops: [],
  },
];

export function applyGradientPreset(
  current: GradientEditorState,
  presetId: string,
  typeOverride?: GradientFillType
): GradientEditorState {
  const preset = GRADIENT_PRESETS.find((item) => item.id === presetId);
  const nextType = typeOverride ?? current.type;

  if (!preset || preset.id === 'custom' || preset.stops.length === 0) {
    return createDefaultGradientState(nextType, current.stops[0]?.color ?? '#3b82f6');
  }

  return {
    type: nextType,
    stops: normalizeStops(preset.stops),
    angle: typeof preset.angle === 'number' ? normalizeAngle(preset.angle) : current.angle,
    cx: typeof preset.cx === 'number' ? clamp(preset.cx, 0, 100) : current.cx,
    cy: typeof preset.cy === 'number' ? clamp(preset.cy, 0, 100) : current.cy,
  };
}

export function isFabricGradientFill(fill: unknown): boolean {
  return fill instanceof Gradient || isGradientLike(fill);
}

export function toFabricObjectDimensions(object: FabricObject | null): ObjectDimensions {
  return getObjectDimensions(object as DimensionSource | null);
}
