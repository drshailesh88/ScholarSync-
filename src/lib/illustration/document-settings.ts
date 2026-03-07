export type CanvasOrientation = 'portrait' | 'landscape';

export interface CanvasDimensions {
  width: number;
  height: number;
}

export interface CanvasPreset {
  id: 'a4' | 'a3' | 'letter' | 'instagram' | 'hd' | 'custom';
  label: string;
  width: number;
  height: number;
}

export interface DocumentSettingsValue extends CanvasDimensions {
  backgroundColor: string;
}

export interface DimensionCanvasLike {
  setDimensions: (dimensions: CanvasDimensions) => void;
  backgroundColor?: unknown;
  requestRenderAll?: () => void;
  renderAll?: () => void;
}

export const CANVAS_PRESETS: readonly CanvasPreset[] = [
  { id: 'a4', label: 'A4', width: 2480, height: 3508 },
  { id: 'a3', label: 'A3', width: 3508, height: 4960 },
  { id: 'letter', label: 'Letter', width: 2550, height: 3300 },
  { id: 'instagram', label: '1080 x 1080 (Instagram)', width: 1080, height: 1080 },
  { id: 'hd', label: '1920 x 1080 (HD)', width: 1920, height: 1080 },
  { id: 'custom', label: 'Custom', width: 0, height: 0 },
] as const;

export const DEFAULT_CANVAS_BACKGROUND = '#ffffff';

export function clampCanvasDimension(value: number, fallback = 1): number {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.round(value));
}

export function getPresetById(id: CanvasPreset['id']): CanvasPreset | undefined {
  return CANVAS_PRESETS.find((preset) => preset.id === id);
}

export function getPresetDimensions(
  presetId: Exclude<CanvasPreset['id'], 'custom'>,
  orientation: CanvasOrientation = 'portrait'
): CanvasDimensions {
  const preset = getPresetById(presetId);

  if (!preset) {
    throw new Error(`Unknown canvas preset: ${presetId}`);
  }

  return orientation === 'landscape'
    ? { width: preset.height, height: preset.width }
    : { width: preset.width, height: preset.height };
}

export function swapDimensions(dimensions: CanvasDimensions): CanvasDimensions {
  return {
    width: clampCanvasDimension(dimensions.height),
    height: clampCanvasDimension(dimensions.width),
  };
}

export function applyDocumentSettingsToCanvas(
  canvas: DimensionCanvasLike,
  settings: DocumentSettingsValue
): DocumentSettingsValue {
  const width = clampCanvasDimension(settings.width, 800);
  const height = clampCanvasDimension(settings.height, 600);
  const backgroundColor = settings.backgroundColor || DEFAULT_CANVAS_BACKGROUND;

  canvas.setDimensions({ width, height });
  canvas.backgroundColor = backgroundColor;

  if (typeof canvas.requestRenderAll === 'function') {
    canvas.requestRenderAll();
  } else if (typeof canvas.renderAll === 'function') {
    canvas.renderAll();
  }

  return { width, height, backgroundColor };
}
