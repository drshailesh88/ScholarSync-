import { Gradient } from 'fabric';
import { describe, expect, it } from 'vitest';
import {
  GRADIENT_PRESETS,
  applyGradientPreset,
  buildLinearGradientCoords,
  createDefaultGradientState,
  createFabricGradient,
  getFillEditorState,
  insertGradientStop,
  removeGradientStop,
  type GradientEditorState,
  type GradientStop,
} from '../gradient/gradient-utils';

describe('gradient editor utils', () => {
  it('creates a valid Fabric linear Gradient object with 2 stops', () => {
    const state: GradientEditorState = {
      ...createDefaultGradientState('linear'),
      stops: [
        { id: 'a', offset: 0, color: '#ff0000' },
        { id: 'b', offset: 1, color: '#0000ff' },
      ],
      angle: 0,
    };

    const gradient = createFabricGradient(state, { width: 240, height: 120 });

    expect(gradient).toBeInstanceOf(Gradient);
    expect(gradient.type).toBe('linear');
    expect(gradient.colorStops).toHaveLength(2);
    expect(gradient.colorStops[0]?.offset).toBe(0);
    expect(gradient.colorStops[1]?.offset).toBe(1);
  });

  it('angle 90 degrees generates vertical coordinates', () => {
    const horizontal = buildLinearGradientCoords(0, 200, 100);
    const vertical = buildLinearGradientCoords(90, 200, 100);

    expect(horizontal.y1).toBeCloseTo(horizontal.y2, 6);
    expect(vertical.x1).toBeCloseTo(vertical.x2, 6);
  });

  it('inserts a 3rd stop at offset 0.5 between 0 and 1', () => {
    const stops: GradientStop[] = [
      { id: 'start', offset: 0, color: '#ff0000' },
      { id: 'end', offset: 1, color: '#0000ff' },
    ];

    const next = insertGradientStop(stops, 0.5, '#00ff00');

    expect(next).toHaveLength(3);
    expect(next.map((stop) => stop.offset)).toEqual([0, 0.5, 1]);
    expect(next[1]?.color).toBe('#00ff00');
  });

  it('prevents removing a stop when only 2 exist', () => {
    const stops: GradientStop[] = [
      { id: 'first', offset: 0, color: '#000000' },
      { id: 'second', offset: 1, color: '#ffffff' },
    ];

    const next = removeGradientStop(stops, 'first');

    expect(next).toHaveLength(2);
    expect(next).toEqual(stops);
  });

  it('reads gradient fill from selected object into editor state', () => {
    const gradient = new Gradient({
      type: 'linear',
      coords: {
        x1: 100,
        y1: 0,
        x2: 100,
        y2: 200,
      },
      colorStops: [
        { offset: 0, color: '#0ea5e9' },
        { offset: 1, color: '#1e3a8a' },
      ],
    });

    const fillState = getFillEditorState(gradient, { width: 200, height: 200 }, '#000000');

    expect(fillState.mode).toBe('linear');
    expect(fillState.gradient.type).toBe('linear');
    expect(fillState.gradient.stops).toHaveLength(2);
    expect(Math.round(fillState.gradient.angle)).toBe(90);
    expect(fillState.gradient.stops[0]?.color).toBe('#0ea5e9');
  });

  it('applies Ocean preset with correct blue stops', () => {
    const ocean = GRADIENT_PRESETS.find((preset) => preset.id === 'ocean');
    expect(ocean).toBeDefined();

    const next = applyGradientPreset(createDefaultGradientState('linear'), 'ocean', 'linear');

    expect(next.type).toBe('linear');
    expect(next.stops[0]?.color).toBe(ocean?.stops[0]?.color);
    expect(next.stops[next.stops.length - 1]?.color).toBe(ocean?.stops[ocean.stops.length - 1]?.color);
  });

  it('applies radial center offset to gradient coordinates', () => {
    const state: GradientEditorState = {
      ...createDefaultGradientState('radial'),
      type: 'radial',
      cx: 20,
      cy: 80,
      stops: [
        { id: 'a', offset: 0, color: '#ffffff' },
        { id: 'b', offset: 1, color: '#111111' },
      ],
    };

    const gradient = createFabricGradient(state, { width: 100, height: 200 });

    expect(gradient.type).toBe('radial');
    expect(gradient.coords.x1).toBeCloseTo(20, 6);
    expect(gradient.coords.x2).toBeCloseTo(20, 6);
    expect(gradient.coords.y1).toBeCloseTo(160, 6);
    expect(gradient.coords.y2).toBeCloseTo(160, 6);
  });
});
