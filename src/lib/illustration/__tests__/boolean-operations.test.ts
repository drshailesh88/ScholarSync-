import { describe, expect, it } from 'vitest';
import { Path as FabricPath, Rect, util } from 'fabric';
import type paper from 'paper';
import {
  booleanExclude,
  booleanIntersect,
  booleanSubtract,
  booleanUnite,
  initializePathfinderPaperScope,
} from '../canvas/boolean-operations';

interface MockCanvasContext {
  canvas: unknown;
  save: () => void;
  restore: () => void;
  beginPath: () => void;
  closePath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  bezierCurveTo: (
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) => void;
  quadraticCurveTo: (cpx: number, cpy: number, x: number, y: number) => void;
  arc: (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean
  ) => void;
  rect: (x: number, y: number, width: number, height: number) => void;
  clearRect: (x: number, y: number, width: number, height: number) => void;
  fill: () => void;
  stroke: () => void;
  clip: () => void;
  translate: (x: number, y: number) => void;
  rotate: (angle: number) => void;
  scale: (x: number, y: number) => void;
  transform: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => void;
  setTransform: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => void;
  drawImage: (...args: unknown[]) => void;
  fillText: (text: string, x: number, y: number) => void;
  strokeText: (text: string, x: number, y: number) => void;
  measureText: (text: string) => { width: number };
  createLinearGradient: (...args: number[]) => { addColorStop: (offset: number, color: string) => void };
  createRadialGradient: (...args: number[]) => { addColorStop: (offset: number, color: string) => void };
  createPattern: (...args: unknown[]) => object;
  setLineDash: (segments: number[]) => void;
  getLineDash: () => number[];
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  miterLimit: number;
  globalAlpha: number;
  globalCompositeOperation: GlobalCompositeOperation;
  strokeStyle: string;
  fillStyle: string;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
}

function createMockCanvasElement(): HTMLCanvasElement {
  const context: MockCanvasContext = {
    canvas: null,
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    closePath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    bezierCurveTo: () => {},
    quadraticCurveTo: () => {},
    arc: () => {},
    rect: () => {},
    clearRect: () => {},
    fill: () => {},
    stroke: () => {},
    clip: () => {},
    translate: () => {},
    rotate: () => {},
    scale: () => {},
    transform: () => {},
    setTransform: () => {},
    drawImage: () => {},
    fillText: () => {},
    strokeText: () => {},
    measureText: () => ({ width: 0 }),
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    createPattern: () => ({}),
    setLineDash: () => {},
    getLineDash: () => [],
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    strokeStyle: '#000000',
    fillStyle: '#000000',
    font: '10px sans-serif',
    textAlign: 'left',
    textBaseline: 'alphabetic',
  };

  const canvas = {
    width: 1024,
    height: 1024,
    getContext: () => context,
  } as unknown as HTMLCanvasElement;

  context.canvas = canvas;
  return canvas;
}

function createRect(left: number, top: number, width: number, height: number): Rect {
  return new Rect({
    left,
    top,
    width,
    height,
    strokeWidth: 0,
    fill: '#000000',
  });
}

function pathDataOf(path: FabricPath): string {
  return util.joinPath(path.path);
}

function moveCount(pathData: string): number {
  return (pathData.match(/M\s/gi) ?? []).length;
}

function paperArea(scope: paper.PaperScope, pathData: string): number {
  const compound = new scope.CompoundPath(pathData);
  const area = Math.abs(compound.area);
  compound.remove();
  return area;
}

function attachZOrder<T extends Rect>(orderedBackToFront: T[]): void {
  const mockCanvas = {
    getObjects: () => orderedBackToFront,
  };

  orderedBackToFront.forEach((object) => {
    (object as unknown as { canvas?: unknown }).canvas = mockCanvas;
  });
}

describe('boolean operations', () => {
  it('booleanUnite of two overlapping rects produces a larger single result area', () => {
    const scope = initializePathfinderPaperScope(createMockCanvasElement());
    const a = createRect(0, 0, 100, 100);
    const b = createRect(50, 0, 100, 100);

    const result = booleanUnite([a, b]);
    const area = paperArea(scope, pathDataOf(result));

    expect(area).toBeGreaterThan(10000);
    expect(area).toBeCloseTo(15000, 3);
  });

  it('booleanSubtract of overlapping rects produces a notched result', () => {
    const scope = initializePathfinderPaperScope(createMockCanvasElement());
    const front = createRect(40, 20, 80, 60);
    const back = createRect(0, 0, 140, 100);
    attachZOrder([back, front]);

    const result = booleanSubtract([front, back]);
    const data = pathDataOf(result);
    const area = paperArea(scope, data);

    expect(area).toBeCloseTo(9200, 3);
    expect(moveCount(data)).toBeGreaterThanOrEqual(2);
  });

  it('booleanIntersect of two overlapping rects produces a smaller overlap area', () => {
    const scope = initializePathfinderPaperScope(createMockCanvasElement());
    const a = createRect(0, 0, 100, 100);
    const b = createRect(50, 0, 100, 100);

    const result = booleanIntersect([a, b]);
    const area = paperArea(scope, pathDataOf(result));

    expect(area).toBeGreaterThan(0);
    expect(area).toBeLessThan(10000);
    expect(area).toBeCloseTo(5000, 3);
  });

  it('booleanExclude of two overlapping rects produces an XOR region', () => {
    const scope = initializePathfinderPaperScope(createMockCanvasElement());
    const a = createRect(0, 0, 100, 100);
    const b = createRect(50, 0, 100, 100);

    const result = booleanExclude([a, b]);
    const data = pathDataOf(result);
    const area = paperArea(scope, data);

    expect(area).toBeCloseTo(10000, 3);
    expect(moveCount(data)).toBeGreaterThanOrEqual(2);
  });

  it('operating on non-overlapping objects returns a valid compound path', () => {
    const scope = initializePathfinderPaperScope(createMockCanvasElement());
    const a = createRect(0, 0, 100, 100);
    const b = createRect(250, 0, 100, 100);

    const result = booleanUnite([a, b]);
    const data = pathDataOf(result);
    const area = paperArea(scope, data);

    expect(area).toBeCloseTo(20000, 3);
    expect(moveCount(data)).toBeGreaterThanOrEqual(2);
  });
});
