import { describe, expect, it } from 'vitest';
import {
  generatePolygonPoints,
  generateStarPoints,
  type Point,
} from '../canvas/shape-generators';
import {
  applyUniformCornerRadius,
  getRectCornerRadiusMax,
} from '@/components/illustration/PropertiesPanel';

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const distanceToCenter = (p: Point, cx: number, cy: number) => Math.hypot(p.x - cx, p.y - cy);

describe('shape generators', () => {
  it('generatePolygonPoints with sides=4 produces a square', () => {
    const points = generatePolygonPoints(0, 0, 10, 4);
    expect(points).toHaveLength(4);

    const edgeLengths = points.map((point, index) => {
      const next = points[(index + 1) % points.length];
      return distance(point, next);
    });

    edgeLengths.forEach((edge) => {
      expect(edge).toBeCloseTo(edgeLengths[0], 6);
    });
  });

  it('generatePolygonPoints with sides=6 keeps all points at radius distance', () => {
    const points = generatePolygonPoints(12, -8, 24, 6);
    expect(points).toHaveLength(6);

    points.forEach((point) => {
      expect(distanceToCenter(point, 12, -8)).toBeCloseTo(24, 6);
    });
  });

  it('generateStarPoints with points=5 produces 10 alternating points', () => {
    const points = generateStarPoints(0, 0, 20, 10, 5);
    expect(points).toHaveLength(10);
  });

  it('generateStarPoints alternates outer and inner radii', () => {
    const points = generateStarPoints(5, 7, 20, 10, 5);

    points.forEach((point, index) => {
      const expected = index % 2 === 0 ? 20 : 10;
      expect(distanceToCenter(point, 5, 7)).toBeCloseTo(expected, 6);
    });
  });

  it('generateStarPoints outer radius is always greater than inner radius', () => {
    const outerR = 30;
    const innerR = 15;
    const points = generateStarPoints(0, 0, outerR, innerR, 6);

    const outerPoints = points.filter((_, i) => i % 2 === 0);
    const innerPoints = points.filter((_, i) => i % 2 === 1);

    outerPoints.forEach((p) => {
      expect(distanceToCenter(p, 0, 0)).toBeCloseTo(outerR, 6);
    });
    innerPoints.forEach((p) => {
      expect(distanceToCenter(p, 0, 0)).toBeCloseTo(innerR, 6);
    });

    expect(outerR).toBeGreaterThan(innerR);
  });

  it('generated arrays are closed conceptually via last-to-first edge', () => {
    const polygon = generatePolygonPoints(0, 0, 12, 6);
    const star = generateStarPoints(0, 0, 12, 6, 5);

    [polygon, star].forEach((shape) => {
      const first = shape[0];
      const last = shape[shape.length - 1];
      expect(distance(first, last)).toBeGreaterThan(0);

      const closingEdge = distance(last, first);
      expect(closingEdge).toBeGreaterThan(0);
    });
  });
});

describe('corner radius', () => {
  it('setting corner radius 10 on rect sets rx=10 and ry=10', () => {
    const values: Record<string, unknown> = {};
    const fakeRect = {
      type: 'rect',
      set: (keyOrValues: string | Record<string, unknown>, value?: unknown) => {
        if (typeof keyOrValues === 'string') {
          values[keyOrValues] = value;
        } else {
          Object.assign(values, keyOrValues);
        }
      },
    };

    applyUniformCornerRadius(fakeRect, 10);
    expect(values.rx).toBe(10);
    expect(values.ry).toBe(10);
  });

  it('corner radius 0 produces sharp corners (rx=0, ry=0)', () => {
    const values: Record<string, unknown> = {};
    const fakeRect = {
      type: 'rect',
      set: (keyOrValues: string | Record<string, unknown>, value?: unknown) => {
        if (typeof keyOrValues === 'string') {
          values[keyOrValues] = value;
        } else {
          Object.assign(values, keyOrValues);
        }
      },
    };

    applyUniformCornerRadius(fakeRect, 0);
    expect(values.rx).toBe(0);
    expect(values.ry).toBe(0);
  });

  it('corner radius max equals min(width, height) / 2', () => {
    const fakeRect = {
      width: 200,
      height: 100,
      scaleX: 1,
      scaleY: 1,
      set: () => {},
    };

    const max = getRectCornerRadiusMax(fakeRect);
    expect(max).toBe(50); // min(200, 100) / 2
  });
});
