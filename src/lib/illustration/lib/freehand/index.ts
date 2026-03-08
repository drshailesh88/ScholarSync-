/**
 * Perfect Freehand Integration Module
 *
 * Perfect Freehand is a library for drawing perfect pressure-sensitive
 * freehand strokes. Ideal for annotations, handwriting, and organic shapes.
 *
 * @see https://github.com/steveruizok/perfect-freehand
 */

import { getStroke, getStrokeOutlinePoints, getStrokePoints } from 'perfect-freehand';
import type { StrokeOptions, StrokePoint } from 'perfect-freehand';

// TODO: Create FreehandCanvas component
// - Handle mouse/touch/pen input events
// - Support pressure sensitivity from stylus devices
// - Provide real-time stroke preview
// - Smooth stroke rendering

// TODO: Implement stroke post-processing
// - Stroke smoothing algorithms
// - Stroke simplification for file size optimization
// - Stroke to bezier curve conversion
// - Stroke intersection detection

// TODO: Create annotation tools
// - Highlighter effect with transparency
// - Pen with variable width
// - Marker with consistent width
// - Eraser tool integration

// TODO: Add gesture recognition
// - Circle gesture for shape creation
// - Arrow gesture for connector creation
// - Scratch-out gesture for deletion
// - Custom gesture definitions

// TODO: Implement undo/redo for strokes
// - Stroke-level undo history
// - Partial stroke undo
// - Stroke modification tracking

/**
 * Default stroke options for natural drawing
 */
export const defaultStrokeOptions: StrokeOptions = {
  size: 8,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
};

/**
 * Preset stroke options for different tools
 */
export const strokePresets = {
  pen: {
    size: 4,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
    start: { taper: 0, cap: true },
    end: { taper: 0, cap: true },
  } as StrokeOptions,

  marker: {
    size: 12,
    thinning: 0,
    smoothing: 0.3,
    streamline: 0.3,
    start: { taper: 0, cap: false },
    end: { taper: 0, cap: false },
  } as StrokeOptions,

  highlighter: {
    size: 24,
    thinning: 0,
    smoothing: 0.5,
    streamline: 0.5,
    start: { taper: 0, cap: false },
    end: { taper: 0, cap: false },
  } as StrokeOptions,

  brush: {
    size: 16,
    thinning: 0.8,
    smoothing: 0.7,
    streamline: 0.6,
    start: { taper: 100, cap: true },
    end: { taper: 100, cap: true },
  } as StrokeOptions,

  calligraphy: {
    size: 8,
    thinning: 0.9,
    smoothing: 0.4,
    streamline: 0.4,
    start: { taper: 50, cap: true },
    end: { taper: 50, cap: true },
  } as StrokeOptions,
};

/**
 * Input point with optional pressure
 */
export interface InputPoint {
  x: number;
  y: number;
  pressure?: number;
}

/**
 * Convert input points to stroke outline SVG path
 */
export function getStrokePath(points: InputPoint[], options?: Partial<StrokeOptions>): string {
  const strokePoints = points.map(p => [p.x, p.y, p.pressure ?? 0.5]);
  const outlinePoints = getStroke(strokePoints, { ...defaultStrokeOptions, ...options });

  if (outlinePoints.length === 0) return '';

  const d = outlinePoints.reduce(
    (acc, [x, y], i, arr) => {
      if (i === 0) return `M ${x} ${y}`;
      const [cx, cy] = arr[(i + 1) % arr.length];
      return `${acc} Q ${x} ${y} ${(x + cx) / 2} ${(y + cy) / 2}`;
    },
    ''
  );

  return `${d} Z`;
}

/**
 * Get stroke points for analysis or modification
 */
export function analyzeStroke(points: InputPoint[], options?: Partial<StrokeOptions>): StrokePoint[] {
  const strokePoints = points.map(p => [p.x, p.y, p.pressure ?? 0.5]);
  return getStrokePoints(strokePoints, { ...defaultStrokeOptions, ...options });
}

/**
 * Get outline points for custom rendering
 */
export function getOutlinePoints(points: InputPoint[], options?: Partial<StrokeOptions>): number[][] {
  const strokePoints = points.map(p => [p.x, p.y, p.pressure ?? 0.5] as const);
  return getStrokeOutlinePoints(strokePoints as any, { ...defaultStrokeOptions, ...options });
}

export { getStroke, getStrokeOutlinePoints, getStrokePoints };
export type { StrokeOptions, StrokePoint };
