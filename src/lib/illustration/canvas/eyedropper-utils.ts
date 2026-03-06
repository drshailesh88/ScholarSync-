import type { FabricObject } from 'fabric';
import { getInterpolatedStopColor, normalizeColorToHex } from '@/lib/illustration/gradient/gradient-utils';

const FALLBACK_COLOR = '#ffffff';

export interface Point2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

interface GradientColorStop {
  offset: number;
  color: string;
  opacity?: number;
}

export interface GradientFillLike {
  type: 'linear' | 'radial';
  coords: Record<string, number | undefined>;
  colorStops: GradientColorStop[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeStops(stops: GradientColorStop[]): GradientColorStop[] {
  const normalized = stops
    .map((stop) => ({
      offset: clamp(toNumber(stop.offset, 0), 0, 1),
      color: normalizeColorToHex(stop.color, FALLBACK_COLOR),
      opacity: typeof stop.opacity === 'number' ? clamp(stop.opacity, 0, 1) : undefined,
    }))
    .sort((a, b) => a.offset - b.offset);

  if (normalized.length >= 2) {
    return normalized;
  }

  if (normalized.length === 1) {
    return [normalized[0], { ...normalized[0], offset: 1 }];
  }

  return [
    { offset: 0, color: FALLBACK_COLOR },
    { offset: 1, color: FALLBACK_COLOR },
  ];
}

export function isGradientFillLike(fill: unknown): fill is GradientFillLike {
  if (!fill || typeof fill !== 'object') {
    return false;
  }

  const candidate = fill as {
    type?: unknown;
    colorStops?: unknown;
    coords?: unknown;
  };

  if (candidate.type !== 'linear' && candidate.type !== 'radial') {
    return false;
  }

  return Array.isArray(candidate.colorStops) && typeof candidate.coords === 'object' && candidate.coords !== null;
}

export function sampleGradientAtPoint(gradient: GradientFillLike, point: Point2D): string {
  const stops = normalizeStops(gradient.colorStops);
  const coords = gradient.coords;

  let offset = 0;
  if (gradient.type === 'linear') {
    const x1 = toNumber(coords.x1, 0);
    const y1 = toNumber(coords.y1, 0);
    const x2 = toNumber(coords.x2, 1);
    const y2 = toNumber(coords.y2, 0);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSquared = dx * dx + dy * dy;

    offset = lengthSquared > 0
      ? ((point.x - x1) * dx + (point.y - y1) * dy) / lengthSquared
      : 0;
  } else {
    const x1 = toNumber(coords.x1, 0);
    const y1 = toNumber(coords.y1, 0);
    const r1 = Math.max(0, Math.abs(toNumber(coords.r1, 0)));
    const r2 = Math.max(r1 + 1e-6, Math.abs(toNumber(coords.r2, r1 + 1)));
    const distance = Math.hypot(point.x - x1, point.y - y1);

    offset = (distance - r1) / (r2 - r1);
  }

  const color = getInterpolatedStopColor(stops, clamp(offset, 0, 1));
  return normalizeColorToHex(color, FALLBACK_COLOR);
}

function getObjectDimensions(object: FabricObject, bounds: { width: number; height: number }): Size2D {
  const width = Math.max(
    toNumber(object.width, 0),
    toNumber((object as FabricObject & { getScaledWidth?: () => number }).getScaledWidth?.(), 0),
    toNumber(bounds.width, 1),
    1
  );
  const height = Math.max(
    toNumber(object.height, 0),
    toNumber((object as FabricObject & { getScaledHeight?: () => number }).getScaledHeight?.(), 0),
    toNumber(bounds.height, 1),
    1
  );

  return { width, height };
}

export function sampleObjectFillColor(
  object: FabricObject,
  pointer: Point2D,
  fallback: string = FALLBACK_COLOR
): string | null {
  const fill = object.fill;
  if (typeof fill === 'string') {
    return normalizeColorToHex(fill, fallback);
  }

  if (!isGradientFillLike(fill)) {
    return null;
  }

  const bounds = object.getBoundingRect();
  const dimensions = getObjectDimensions(object, bounds);
  const relativeX = clamp((pointer.x - bounds.left) / Math.max(bounds.width, 1), 0, 1);
  const relativeY = clamp((pointer.y - bounds.top) / Math.max(bounds.height, 1), 0, 1);
  const localPoint = {
    x: relativeX * dimensions.width,
    y: relativeY * dimensions.height,
  };

  return sampleGradientAtPoint(fill, localPoint);
}

export function sampleCanvasBackgroundColor(
  background: unknown,
  pointer: Point2D,
  dimensions: Size2D,
  fallback: string = FALLBACK_COLOR
): string {
  if (typeof background === 'string') {
    return normalizeColorToHex(background, fallback);
  }

  if (isGradientFillLike(background)) {
    const localPoint = {
      x: clamp(pointer.x, 0, Math.max(dimensions.width, 1)),
      y: clamp(pointer.y, 0, Math.max(dimensions.height, 1)),
    };

    return sampleGradientAtPoint(background, localPoint);
  }

  return normalizeColorToHex(fallback, FALLBACK_COLOR);
}

