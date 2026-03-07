import { describe, expect, it } from 'vitest';
import type { TSimplePathData } from 'fabric';
import {
  addAnchorPointOnSegment,
  deleteAnchorPoints,
  moveAnchorPoint,
  moveBezierHandle,
  parsePathAnchors,
} from '../canvas/path-editing';

describe('path editing', () => {
  it('parses M/L/Z path into 3 anchor points', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['L', 100, 0],
      ['L', 100, 100],
      ['Z'],
    ];

    const parsed = parsePathAnchors(path);

    expect(parsed.anchors).toHaveLength(3);
    expect(parsed.closed).toBe(true);
    expect(parsed.anchors[0]).toMatchObject({ x: 0, y: 0 });
    expect(parsed.anchors[1]).toMatchObject({ x: 100, y: 0 });
    expect(parsed.anchors[2]).toMatchObject({ x: 100, y: 100 });
  });

  it('parses cubic path into 2 anchors with bezier handles', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['C', 25, 0, 75, 100, 100, 100],
    ];

    const parsed = parsePathAnchors(path);

    expect(parsed.anchors).toHaveLength(2);
    expect(parsed.anchors[0].handleOut).toMatchObject({ x: 25, y: 0 });
    expect(parsed.anchors[1].handleIn).toMatchObject({ x: 75, y: 100 });
  });

  it('moves anchor 0 and updates path data', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['L', 100, 0],
      ['L', 100, 100],
    ];

    const nextPath = moveAnchorPoint(path, 0, { x: 10, y: 20 });

    expect(nextPath[0]).toEqual(['M', 10, 20]);
    expect(nextPath[1]).toEqual(['L', 100, 0]);
    expect(nextPath[2]).toEqual(['L', 100, 100]);
  });

  it('mirrors opposite handle when moving a bezier handle in smooth mode', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['C', 30, 0, 70, 100, 100, 100],
      ['C', 130, 100, 170, 0, 200, 0],
    ];

    const nextPath = moveBezierHandle(path, 1, 'out', { x: 140, y: 120 });

    expect(nextPath[2]).toEqual(['C', 140, 120, 170, 0, 200, 0]);
    expect(nextPath[1]).toEqual(['C', 30, 0, 60, 80, 100, 100]);
  });

  it('keeps handles independent when breakMirror is enabled (Alt behavior)', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['C', 30, 0, 70, 100, 100, 100],
      ['C', 130, 100, 170, 0, 200, 0],
    ];

    const nextPath = moveBezierHandle(path, 1, 'out', { x: 140, y: 120 }, { breakMirror: true });

    expect(nextPath[2]).toEqual(['C', 140, 120, 170, 0, 200, 0]);
    expect(nextPath[1]).toEqual(['C', 30, 0, 70, 100, 100, 100]);
  });

  it('deletes one point from 4-point closed path and keeps a valid 3-point path', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['L', 100, 0],
      ['L', 100, 100],
      ['L', 0, 100],
      ['Z'],
    ];

    const nextPath = deleteAnchorPoints(path, [1]);
    const parsed = parsePathAnchors(nextPath);

    expect(parsed.anchors).toHaveLength(3);
    expect(parsed.closed).toBe(true);
    expect(nextPath.at(-1)).toEqual(['Z']);
  });

  it('adds a point on a line segment between two existing points', () => {
    const path: TSimplePathData = [
      ['M', 0, 0],
      ['L', 100, 0],
      ['L', 100, 100],
    ];

    const result = addAnchorPointOnSegment(path, 0, 0.5);
    const parsed = parsePathAnchors(result.pathData);

    expect(result.anchorIndex).toBe(1);
    expect(parsed.anchors).toHaveLength(4);
    expect(parsed.anchors[1]).toMatchObject({ x: 50, y: 0 });
    expect(parsed.anchors[2]).toMatchObject({ x: 100, y: 0 });
  });
});
