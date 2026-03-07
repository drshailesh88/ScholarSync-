import { Gradient } from 'fabric';
import { describe, expect, it } from 'vitest';
import {
  buildLinearGradientCoords,
  createDefaultGradientState,
  createFabricGradient,
  getFillEditorState,
  insertGradientStop,
  removeGradientStop,
  type GradientEditorState,
  type GradientStop,
} from '../gradient/gradient-utils';
import {
  sampleObjectFillColor,
  sampleCanvasBackgroundColor,
  sampleGradientAtPoint,
  type GradientFillLike,
} from '../canvas/eyedropper-utils';
import {
  getStrokeDashArrayForPreset,
  getStrokeDashPresetFromArray,
  applyStrokeDashPreset,
} from '@/components/illustration/PropertiesPanel';

// ---------------------------------------------------------------------------
// GRADIENT TESTS
// ---------------------------------------------------------------------------

describe('gradient editor', () => {
  it('creates a valid Fabric linear Gradient with 2 stops', () => {
    const state: GradientEditorState = {
      ...createDefaultGradientState('linear'),
      stops: [
        { id: 'a', offset: 0, color: '#ff0000' },
        { id: 'b', offset: 1, color: '#0000ff' },
      ],
      angle: 0,
    };

    const gradient = createFabricGradient(state, { width: 200, height: 100 });

    expect(gradient).toBeInstanceOf(Gradient);
    expect(gradient.type).toBe('linear');
    expect(gradient.colorStops).toHaveLength(2);
    expect(gradient.colorStops[0]?.offset).toBe(0);
    expect(gradient.colorStops[1]?.offset).toBe(1);
  });

  it('changing angle from 0 to 90 updates coords correctly', () => {
    const horizontal = buildLinearGradientCoords(0, 200, 100);
    const vertical = buildLinearGradientCoords(90, 200, 100);

    // At 0 degrees, y values are equal (horizontal gradient)
    expect(horizontal.y1).toBeCloseTo(horizontal.y2, 6);
    // At 90 degrees, x values are equal (vertical gradient)
    expect(vertical.x1).toBeCloseTo(vertical.x2, 6);
    // The y endpoints should differ for 90 degrees
    expect(Math.abs(vertical.y2 - vertical.y1)).toBeGreaterThan(0);
  });

  it('adds a 3rd stop at offset 0.5 between two existing stops', () => {
    const stops: GradientStop[] = [
      { id: 'start', offset: 0, color: '#ff0000' },
      { id: 'end', offset: 1, color: '#0000ff' },
    ];

    const next = insertGradientStop(stops, 0.5, '#00ff00');

    expect(next).toHaveLength(3);
    expect(next.map((s) => s.offset)).toEqual([0, 0.5, 1]);
    expect(next[1]?.color).toBe('#00ff00');
  });

  it('cannot remove a stop when only 2 remain', () => {
    const stops: GradientStop[] = [
      { id: 'first', offset: 0, color: '#000000' },
      { id: 'second', offset: 1, color: '#ffffff' },
    ];

    const next = removeGradientStop(stops, 'first');

    expect(next).toHaveLength(2);
    expect(next).toEqual(stops);
  });

  it('reads gradient fill from a selected object into editor state', () => {
    const gradient = new Gradient({
      type: 'linear',
      coords: { x1: 100, y1: 0, x2: 100, y2: 200 },
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
});

// ---------------------------------------------------------------------------
// EYEDROPPER TESTS
// ---------------------------------------------------------------------------

describe('eyedropper', () => {
  it('returns red when sampling a red-filled object', () => {
    const fakeRect = {
      fill: '#ff0000',
      width: 100,
      height: 100,
      left: 0,
      top: 0,
      getBoundingRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
    };

    const sampled = sampleObjectFillColor(
      fakeRect as unknown as import('fabric').FabricObject,
      { x: 50, y: 50 }
    );

    expect(sampled).toBe('#ff0000');
  });

  it('returns background color when sampling canvas background', () => {
    const bgColor = '#2d2d2d';
    const result = sampleCanvasBackgroundColor(
      bgColor,
      { x: 100, y: 100 },
      { width: 800, height: 600 }
    );

    expect(result).toBe('#2d2d2d');
  });

  it('samples approximate color from a gradient fill at a click point', () => {
    const gradient: GradientFillLike = {
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: 100, y2: 0 },
      colorStops: [
        { offset: 0, color: '#000000' },
        { offset: 1, color: '#ffffff' },
      ],
    };

    const colorAtStart = sampleGradientAtPoint(gradient, { x: 0, y: 0 });
    const colorAtEnd = sampleGradientAtPoint(gradient, { x: 100, y: 0 });

    expect(colorAtStart).toBe('#000000');
    expect(colorAtEnd).toBe('#ffffff');
  });
});

// ---------------------------------------------------------------------------
// STROKE CONTROLS TESTS
// ---------------------------------------------------------------------------

describe('stroke controls', () => {
  it('stroke dash "Dashed" applies [10,5]', () => {
    const pattern = getStrokeDashArrayForPreset('dashed');
    expect(pattern).toEqual([10, 5]);
  });

  it('stroke dash "Dotted" applies [2,4]', () => {
    const pattern = getStrokeDashArrayForPreset('dotted');
    expect(pattern).toEqual([2, 4]);
  });

  it('stroke dash "Solid" applies null', () => {
    const pattern = getStrokeDashArrayForPreset('solid');
    expect(pattern).toBeNull();
  });

  it('roundtrips dash array [10,5] back to "dashed" preset', () => {
    const preset = getStrokeDashPresetFromArray([10, 5]);
    expect(preset).toBe('dashed');
  });

  it('stroke line cap "round" sets strokeLineCap on object', () => {
    const fakeObj: Record<string, unknown> & { set: (key: string, value: unknown) => void } = {
      strokeLineCap: 'butt',
      strokeDashArray: null,
      set(key: string, value: unknown) {
        this[key] = value;
      },
    };

    applyStrokeDashPreset(
      fakeObj as unknown as Parameters<typeof applyStrokeDashPreset>[0],
      'dashed'
    );
    expect(fakeObj.strokeDashArray).toEqual([10, 5]);

    fakeObj.set('strokeLineCap', 'round');
    expect(fakeObj.strokeLineCap).toBe('round');
  });

  it('"dash-dot" pattern applies [10,5,2,5]', () => {
    const pattern = getStrokeDashArrayForPreset('dash-dot');
    expect(pattern).toEqual([10, 5, 2, 5]);
  });

  it('"long-dash" pattern applies [20,10]', () => {
    const pattern = getStrokeDashArrayForPreset('long-dash');
    expect(pattern).toEqual([20, 10]);
  });
});
