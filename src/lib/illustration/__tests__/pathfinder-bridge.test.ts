import { describe, expect, it } from 'vitest';
import { Ellipse, Rect } from 'fabric';
import { initializePathfinderPaperScope } from '../canvas/boolean-operations';
import { fabricToSvgPath, svgPathToPaper } from '../canvas/pathfinder-bridge';

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

describe('pathfinder bridge', () => {
  it('fabricToSvgPath converts a rectangle to the expected path string', () => {
    const rect = new Rect({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      strokeWidth: 0,
    });

    const path = fabricToSvgPath(rect);
    expect(path).toBe('M 0,0 L 100,0 L 100,100 L 0,100 Z');
  });

  it('fabricToSvgPath converts an ellipse to an arc-based path', () => {
    const ellipse = new Ellipse({
      left: 0,
      top: 0,
      rx: 50,
      ry: 30,
      strokeWidth: 0,
    });

    const path = fabricToSvgPath(ellipse);
    expect(path).toContain('A 50,30');
    expect(path).toBe('M 0,30 A 50,30 0 1 0 100,30 A 50,30 0 1 0 0,30 Z');
  });

  it('svgPathToPaper creates a Paper path with expected bounds', () => {
    const scope = initializePathfinderPaperScope(createMockCanvasElement());

    const path = svgPathToPaper('M 0,0 L 100,0 L 100,100 L 0,100 Z', scope);

    expect(path.bounds.x).toBeCloseTo(0);
    expect(path.bounds.y).toBeCloseTo(0);
    expect(path.bounds.width).toBeCloseTo(100);
    expect(path.bounds.height).toBeCloseTo(100);
  });
});
