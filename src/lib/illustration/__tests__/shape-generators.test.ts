import { describe, expect, it } from 'vitest';
import {
  generatePolygonPoints,
  generateStarPoints,
  type Point,
} from '../canvas/shape-generators';

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
