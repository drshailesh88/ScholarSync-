/**
 * Freehand Canvas Bridge
 *
 * Bridges perfect-freehand stroke generation with Fabric.js Path objects.
 * Handles point collection during drawing and converts completed strokes
 * into Fabric.js Path objects for canvas integration.
 */

import { Path as FabricPath } from 'fabric';
import { getStrokePath, strokePresets } from '@/lib/illustration/lib/freehand/index';
import type { InputPoint } from '@/lib/illustration/lib/freehand/index';
import type { StrokeOptions } from 'perfect-freehand';

export type BrushPreset = keyof typeof strokePresets;

export interface FreehandDrawingState {
  points: InputPoint[];
  isDrawing: boolean;
  previewPath: FabricPath | null;
}

export interface FreehandSettings {
  preset: BrushPreset;
  size: number;
  thinning: number;
  smoothing: number;
  streamline: number;
  color: string;
  opacity: number;
}

export const defaultFreehandSettings: FreehandSettings = {
  preset: 'brush',
  size: 16,
  thinning: 0.8,
  smoothing: 0.7,
  streamline: 0.6,
  color: '#000000',
  opacity: 1,
};

export function getStrokeOptionsFromSettings(settings: FreehandSettings): Partial<StrokeOptions> {
  return {
    ...strokePresets[settings.preset],
    size: settings.size,
    thinning: settings.thinning,
    smoothing: settings.smoothing,
    streamline: settings.streamline,
  };
}

export function createFreehandState(): FreehandDrawingState {
  return {
    points: [],
    isDrawing: false,
    previewPath: null,
  };
}

export function addPoint(
  state: FreehandDrawingState,
  x: number,
  y: number,
  pressure?: number
): void {
  state.points.push({ x, y, pressure: pressure ?? 0.5 });
}

export function generatePreviewPath(
  state: FreehandDrawingState,
  settings: FreehandSettings
): FabricPath | null {
  if (state.points.length < 2) return null;

  const options = getStrokeOptionsFromSettings(settings);
  const pathData = getStrokePath(state.points, options);
  if (!pathData) return null;

  return new FabricPath(pathData, {
    fill: settings.color,
    stroke: 'transparent',
    strokeWidth: 0,
    opacity: settings.opacity,
    selectable: false,
    evented: false,
  });
}

export function finalizeFreehandStroke(
  state: FreehandDrawingState,
  settings: FreehandSettings
): FabricPath | null {
  if (state.points.length < 2) return null;

  const options = getStrokeOptionsFromSettings(settings);
  const pathData = getStrokePath(state.points, options);
  if (!pathData) return null;

  const path = new FabricPath(pathData, {
    fill: settings.color,
    stroke: 'transparent',
    strokeWidth: 0,
    opacity: settings.opacity,
    selectable: true,
    evented: true,
  });

  // Reset state
  state.points = [];
  state.isDrawing = false;
  state.previewPath = null;

  return path;
}

export function resetFreehandState(state: FreehandDrawingState): void {
  state.points = [];
  state.isDrawing = false;
  state.previewPath = null;
}
