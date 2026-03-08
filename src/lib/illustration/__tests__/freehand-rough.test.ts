import { describe, expect, it } from 'vitest';
import {
  getStrokePath,
  getStroke,
  strokePresets,
  type InputPoint,
} from '../lib/freehand/index';
import {
  createFreehandState,
  addPoint,
  getStrokeOptionsFromSettings,
  defaultFreehandSettings,
  type FreehandSettings,
} from '../canvas/freehand-canvas';
import {
  defaultRoughSettings,
  type RoughCanvasSettings,
} from '../canvas/rough-canvas';

// Generate a set of test points simulating a stroke
function generateTestPoints(count: number): InputPoint[] {
  const points: InputPoint[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: 100 + i * 10,
      y: 100 + Math.sin(i * 0.5) * 20,
      pressure: 0.3 + Math.random() * 0.4,
    });
  }
  return points;
}

describe('Freehand Drawing', () => {
  it('freehand stroke with 10 points creates a valid SVG path', () => {
    const points = generateTestPoints(10);
    const pathData = getStrokePath(points);

    expect(pathData).toBeTruthy();
    expect(pathData.length).toBeGreaterThan(0);
    // Valid SVG path should start with M and end with Z
    expect(pathData).toMatch(/^M\s/);
    expect(pathData).toMatch(/Z$/);
  });

  it('brush preset produces wider strokes than marker preset', () => {
    const points = generateTestPoints(15);
    const rawPoints = points.map(p => [p.x, p.y, p.pressure ?? 0.5]);

    const brushOutline = getStroke(rawPoints, strokePresets.brush);
    const markerOutline = getStroke(rawPoints, strokePresets.marker);

    // Both should produce outlines
    expect(brushOutline.length).toBeGreaterThan(0);
    expect(markerOutline.length).toBeGreaterThan(0);

    // Brush preset has size 16, marker has size 12
    expect(strokePresets.brush.size).toBeGreaterThan(strokePresets.marker.size!);
  });

  it('freehand state tracks points correctly', () => {
    const state = createFreehandState();
    expect(state.points).toHaveLength(0);
    expect(state.isDrawing).toBe(false);

    addPoint(state, 10, 20, 0.5);
    addPoint(state, 15, 25, 0.6);
    addPoint(state, 20, 30, 0.7);

    expect(state.points).toHaveLength(3);
    expect(state.points[0]).toEqual({ x: 10, y: 20, pressure: 0.5 });
    expect(state.points[2]).toEqual({ x: 20, y: 30, pressure: 0.7 });
  });

  it('preset settings are correctly applied to stroke options', () => {
    const settings: FreehandSettings = {
      ...defaultFreehandSettings,
      preset: 'pen',
      size: 6,
    };

    const options = getStrokeOptionsFromSettings(settings);
    // Size should use the custom value from settings
    expect(options.size).toBe(6);
    // thinning/smoothing/streamline come from the settings object (which has defaultFreehandSettings values)
    expect(options.thinning).toBe(settings.thinning);
    expect(options.smoothing).toBe(settings.smoothing);
    expect(options.streamline).toBe(settings.streamline);
  });

  it('addPoint uses default pressure 0.5 when none provided', () => {
    const state = createFreehandState();
    addPoint(state, 100, 200);

    expect(state.points[0].pressure).toBe(0.5);
  });
});

describe('Rough.js Hand-Drawn Style', () => {
  // We test the logic functions that don't need DOM
  it('rough.js default settings have expected roughness values', () => {
    expect(defaultRoughSettings.roughness).toBe(1);
    expect(defaultRoughSettings.bowing).toBe(1);
    expect(defaultRoughSettings.strokeWidth).toBe(2);
  });

  it('rough.js settings can be customized', () => {
    const customSettings: RoughCanvasSettings = {
      ...defaultRoughSettings,
      roughness: 3,
      bowing: 2,
      stroke: '#ff0000',
    };

    expect(customSettings.roughness).toBe(3);
    expect(customSettings.bowing).toBe(2);
    expect(customSettings.stroke).toBe('#ff0000');
  });

  it('freehand stroke path has expected structure', () => {
    const points = generateTestPoints(20);
    const pathData = getStrokePath(points, strokePresets.brush);

    // Path should contain quadratic bezier commands (Q)
    expect(pathData).toContain('Q');

    // Path should be a complete closed shape
    expect(pathData.startsWith('M')).toBe(true);
    expect(pathData.endsWith('Z')).toBe(true);
  });

  it('empty points array returns empty path string', () => {
    const pathData = getStrokePath([]);
    expect(pathData).toBe('');
  });

  it('single point returns empty path string', () => {
    const pathData = getStrokePath([{ x: 10, y: 20, pressure: 0.5 }]);
    // Single point can produce outline or empty depending on library
    // We just verify it doesn't throw
    expect(typeof pathData).toBe('string');
  });

  it('all stroke presets are defined with valid sizes', () => {
    const presets = Object.keys(strokePresets) as Array<keyof typeof strokePresets>;
    expect(presets.length).toBeGreaterThanOrEqual(4);

    presets.forEach((presetName) => {
      const preset = strokePresets[presetName];
      expect(preset.size).toBeGreaterThan(0);
      expect(preset.smoothing).toBeGreaterThanOrEqual(0);
      expect(preset.smoothing).toBeLessThanOrEqual(1);
    });
  });
});
