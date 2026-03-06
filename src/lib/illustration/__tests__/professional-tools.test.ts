import { describe, expect, it } from 'vitest';
import { Line, Path as FabricPath, type TSimplePathData } from 'fabric';
import { EraserTool } from '@/lib/illustration/editor/tools/EraserTool';
import { ScissorsTool } from '@/lib/illustration/editor/tools/ScissorsTool';
import { calculateMeasurement } from '@/lib/illustration/editor/tools/MeasureTool';
import { offsetPathData } from '@/lib/illustration/canvas/path-offset';
import { parsePathAnchors } from '@/lib/illustration/canvas/path-editing';

interface MockCanvasLike {
  objects: any[];
  selection: boolean;
  defaultCursor: string;
  hoverCursor: string;
  getZoom: () => number;
  getObjects: () => any[];
  add: (object: any) => void;
  remove: (object: any) => void;
  setActiveObject: (object: any) => void;
  requestRenderAll: () => void;
  fire: (_eventName: string, _payload?: unknown) => void;
  forEachObject: (callback: (object: any) => void) => void;
}

function createMockCanvas(initialObjects: any[] = []): MockCanvasLike {
  const state = {
    objects: [...initialObjects],
    selection: true,
    defaultCursor: 'default',
    hoverCursor: 'default',
  };

  return {
    ...state,
    getZoom: () => 1,
    getObjects: () => state.objects,
    add: (object: any) => {
      state.objects.push(object);
    },
    remove: (object: any) => {
      state.objects = state.objects.filter((candidate) => candidate !== object);
    },
    setActiveObject: (_object: any) => {},
    requestRenderAll: () => {},
    fire: (_eventName: string, _payload?: unknown) => {},
    forEachObject: (callback: (object: any) => void) => {
      state.objects.forEach((object) => callback(object));
    },
  };
}

function boundsOfPath(pathData: TSimplePathData): { width: number; height: number } {
  const anchors = parsePathAnchors(pathData).anchors;
  const minX = Math.min(...anchors.map((anchor) => anchor.x));
  const maxX = Math.max(...anchors.map((anchor) => anchor.x));
  const minY = Math.min(...anchors.map((anchor) => anchor.y));
  const maxY = Math.max(...anchors.map((anchor) => anchor.y));

  return {
    width: maxX - minX,
    height: maxY - minY,
  };
}

describe('professional illustration tools', () => {
  it('eraser click on object removes it from canvas', () => {
    const target = {
      getBoundingRect: () => ({ left: 10, top: 10, width: 40, height: 40 }),
      get: (_key: string) => undefined,
    };

    const canvas = createMockCanvas([target]);
    const tool = new EraserTool({ initialSize: 24 });
    tool.activate(canvas as any);

    tool.onMouseDown({
      e: { clientX: 20, clientY: 20 } as MouseEvent,
      target,
      pointer: { x: 20, y: 20 },
    });

    expect(canvas.getObjects()).toHaveLength(0);
  });

  it('scissors on a straight line at midpoint creates 2 half-length lines', () => {
    const line = new Line([0, 0, 100, 0], { stroke: '#111111', strokeWidth: 2 });
    const canvas = createMockCanvas([line]);
    const tool = new ScissorsTool({ hitThreshold: 10 });
    tool.activate(canvas as any);

    tool.onMouseDown({
      e: { clientX: 50, clientY: 0 } as MouseEvent,
      target: line,
      pointer: { x: 50, y: 0 },
    });

    const lines = canvas.getObjects().filter((object) => object instanceof Line) as Line[];
    expect(lines).toHaveLength(2);

    const lengths = lines
      .map((candidate) => Math.hypot((candidate.x2 ?? 0) - (candidate.x1 ?? 0), (candidate.y2 ?? 0) - (candidate.y1 ?? 0)))
      .sort((a, b) => a - b);

    expect(lengths[0]).toBeCloseTo(50, 3);
    expect(lengths[1]).toBeCloseTo(50, 3);
  });

  it('scissors on a curve splits at approximately the click point', () => {
    const curve = new FabricPath([
      ['M', 0, 0],
      ['C', 40, 0, 60, 100, 100, 100],
    ]);

    const canvas = createMockCanvas([curve]);
    const tool = new ScissorsTool({ hitThreshold: 12 });
    tool.activate(canvas as any);

    const clickPoint = { x: 50, y: 50 };

    tool.onMouseDown({
      e: { clientX: clickPoint.x, clientY: clickPoint.y } as MouseEvent,
      target: curve,
      pointer: clickPoint,
    });

    const paths = canvas.getObjects().filter((object) => object instanceof FabricPath) as FabricPath[];
    expect(paths).toHaveLength(2);

    const firstAnchors = parsePathAnchors(paths[0].path).anchors;
    const secondAnchors = parsePathAnchors(paths[1].path).anchors;

    const firstEnd = firstAnchors[firstAnchors.length - 1];
    const secondStart = secondAnchors[0];

    expect(Math.hypot(firstEnd.x - secondStart.x, firstEnd.y - secondStart.y)).toBeLessThan(1e-4);
    expect(Math.hypot(firstEnd.x - clickPoint.x, firstEnd.y - clickPoint.y)).toBeLessThan(15);
  });

  it('path offset of square by 10 produces a larger square-ish path', () => {
    const square: TSimplePathData = [
      ['M', 0, 0],
      ['L', 100, 0],
      ['L', 100, 100],
      ['L', 0, 100],
      ['Z'],
    ];

    const offset = offsetPathData(square, 10);
    expect(offset).not.toBeNull();

    const baseBounds = boundsOfPath(square);
    const offsetBounds = boundsOfPath(offset!);

    expect(offsetBounds.width).toBeGreaterThan(baseBounds.width);
    expect(offsetBounds.height).toBeGreaterThan(baseBounds.height);
  });

  it('path offset by -5 produces a smaller path', () => {
    const square: TSimplePathData = [
      ['M', 0, 0],
      ['L', 100, 0],
      ['L', 100, 100],
      ['L', 0, 100],
      ['Z'],
    ];

    const offset = offsetPathData(square, -5);
    expect(offset).not.toBeNull();

    const baseBounds = boundsOfPath(square);
    const offsetBounds = boundsOfPath(offset!);

    expect(offsetBounds.width).toBeLessThan(baseBounds.width);
    expect(offsetBounds.height).toBeLessThan(baseBounds.height);
  });

  it('measure between (0,0) and (100,0) shows distance=100, angle=0°', () => {
    const measurement = calculateMeasurement({ x: 0, y: 0 }, { x: 100, y: 0 });

    expect(measurement.distance).toBeCloseTo(100, 4);
    expect(measurement.angle).toBeCloseTo(0, 4);
    expect(measurement.deltaX).toBeCloseTo(100, 4);
    expect(measurement.deltaY).toBeCloseTo(0, 4);
  });

  it('measure between (0,0) and (100,100) shows distance≈141.4, angle=45°', () => {
    const measurement = calculateMeasurement({ x: 0, y: 0 }, { x: 100, y: 100 });

    expect(measurement.distance).toBeCloseTo(141.421356, 3);
    expect(measurement.angle).toBeCloseTo(45, 4);
    expect(measurement.deltaX).toBeCloseTo(100, 4);
    expect(measurement.deltaY).toBeCloseTo(100, 4);
  });
});
