import { describe, expect, it } from 'vitest';
import { EraserTool } from '@/lib/illustration/editor/tools/EraserTool';
import { MeasureTool, calculateMeasurement } from '@/lib/illustration/editor/tools/MeasureTool';
import {
  importImageToCanvas,
  scaleImageToCanvasWidth,
  isSupportedImageFile,
} from '@/lib/illustration/image-import';
import type { CanvasLike, ImportedImageLike, FabricImageLoader } from '@/lib/illustration/image-import';

// ============================================================================
// Mock helpers
// ============================================================================

interface MockObject {
  id: string;
  getBoundingRect: () => { left: number; top: number; width: number; height: number };
  get: (key: string) => unknown;
  selectable?: boolean;
  evented?: boolean;
}

function createMockObject(id: string, bounds: { left: number; top: number; width: number; height: number }): MockObject {
  return {
    id,
    getBoundingRect: () => bounds,
    get: (_key: string) => undefined,
  };
}

interface MockCanvasState {
  objects: MockObject[];
  selection: boolean;
  defaultCursor: string;
  hoverCursor: string;
}

function createMockCanvas(initialObjects: MockObject[] = []) {
  const state: MockCanvasState = {
    objects: [...initialObjects],
    selection: true,
    defaultCursor: 'default',
    hoverCursor: 'default',
  };

  return {
    get objects() { return state.objects; },
    get selection() { return state.selection; },
    set selection(v: boolean) { state.selection = v; },
    get defaultCursor() { return state.defaultCursor; },
    set defaultCursor(v: string) { state.defaultCursor = v; },
    get hoverCursor() { return state.hoverCursor; },
    set hoverCursor(v: string) { state.hoverCursor = v; },
    getZoom: () => 1,
    getObjects: () => state.objects,
    add: (object: MockObject) => { state.objects.push(object); },
    remove: (object: MockObject) => {
      state.objects = state.objects.filter((o) => o !== object);
    },
    setActiveObject: (_object: unknown) => {},
    requestRenderAll: () => {},
    renderAll: () => {},
    fire: (_eventName: string, _payload?: unknown) => {},
    forEachObject: (callback: (object: MockObject) => void) => {
      state.objects.forEach(callback);
    },
    getPointer: () => ({ x: 0, y: 0 }),
  };
}

// ============================================================================
// Image Import Tests
// ============================================================================

describe('Image Import', () => {
  it('image drop creates FabricImage on canvas', async () => {
    const mockCanvas: CanvasLike = {
      width: 800,
      height: 600,
      add: function () {},
      setActiveObject: function () {},
      requestRenderAll: function () {},
      fire: function () {},
    };

    let addedObject: ImportedImageLike | null = null;
    mockCanvas.add = (obj: ImportedImageLike) => { addedObject = obj; };

    const fakeImage: ImportedImageLike = {
      width: 200,
      set: () => {},
      scaleToWidth: () => {},
    };

    const loader: FabricImageLoader = async () => fakeImage;

    await importImageToCanvas(mockCanvas as any, 'data:image/png;base64,fake', {}, loader);

    expect(addedObject).not.toBeNull();
    expect(addedObject).toBe(fakeImage);
  });

  it('oversized image scaled to <= 50% canvas width', () => {
    let scaledWidth: number | undefined;
    const image: Pick<ImportedImageLike, 'width' | 'scaleToWidth' | 'scale'> = {
      width: 1200,
      scaleToWidth: (value: number) => { scaledWidth = value; },
    };

    const canvasWidth = 800;
    const result = scaleImageToCanvasWidth(image, canvasWidth, 0.5);

    expect(result).toBeLessThanOrEqual(canvasWidth * 0.5);
    expect(scaledWidth).toBe(400);
  });

  it('supports PNG, JPG, and SVG file types', () => {
    expect(isSupportedImageFile({ type: 'image/png', name: 'test.png' })).toBe(true);
    expect(isSupportedImageFile({ type: 'image/jpeg', name: 'test.jpg' })).toBe(true);
    expect(isSupportedImageFile({ type: 'image/svg+xml', name: 'test.svg' })).toBe(true);
    expect(isSupportedImageFile({ type: 'application/pdf', name: 'test.pdf' })).toBe(false);
  });
});

// ============================================================================
// Eraser Tool Tests
// ============================================================================

describe('Eraser Tool', () => {
  it('eraser click removes targeted object', () => {
    const target = createMockObject('rect1', { left: 10, top: 10, width: 40, height: 40 });
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

  it('eraser drag removes intersected objects', () => {
    const obj1 = createMockObject('obj1', { left: 0, top: 0, width: 20, height: 20 });
    const obj2 = createMockObject('obj2', { left: 50, top: 0, width: 20, height: 20 });
    const obj3 = createMockObject('obj3', { left: 200, top: 200, width: 20, height: 20 });
    const canvas = createMockCanvas([obj1, obj2, obj3]);

    const tool = new EraserTool({ initialSize: 30 });
    tool.activate(canvas as any);

    // Mouse down at obj1
    tool.onMouseDown({
      e: { clientX: 10, clientY: 10 } as MouseEvent,
      pointer: { x: 10, y: 10 },
    });

    // Drag across to obj2
    tool.onMouseMove({
      e: { clientX: 60, clientY: 10 } as MouseEvent,
      pointer: { x: 60, y: 10 },
    });

    tool.onMouseUp({
      e: { clientX: 60, clientY: 10 } as MouseEvent,
      pointer: { x: 60, y: 10 },
    });

    // obj1 and obj2 should be removed, obj3 should remain (far away)
    const remaining = canvas.getObjects();
    expect(remaining).toHaveLength(1);
    expect(remaining[0]).toBe(obj3);
  });
});

// ============================================================================
// Measure Tool Tests
// ============================================================================

describe('Measure Tool', () => {
  it('(0,0) -> (100,0) shows distance=100, angle=0°', () => {
    const measurement = calculateMeasurement({ x: 0, y: 0 }, { x: 100, y: 0 });

    expect(measurement.distance).toBeCloseTo(100, 4);
    expect(measurement.angle).toBeCloseTo(0, 4);
    expect(measurement.deltaX).toBeCloseTo(100, 4);
    expect(measurement.deltaY).toBeCloseTo(0, 4);
    expect(measurement.displayLabel).toContain('100.0 px');
    expect(measurement.displayLabel).toContain('0.0');
  });

  it('(0,0) -> (100,100) shows distance~141.4, angle=45°', () => {
    const measurement = calculateMeasurement({ x: 0, y: 0 }, { x: 100, y: 100 });

    expect(measurement.distance).toBeCloseTo(141.421356, 3);
    expect(measurement.angle).toBeCloseTo(45, 4);
    expect(measurement.deltaX).toBeCloseTo(100, 4);
    expect(measurement.deltaY).toBeCloseTo(100, 4);
    expect(measurement.displayLabel).toContain('141.4');
    expect(measurement.displayLabel).toContain('45.0');
  });

  it('measure tool creates no permanent canvas objects', () => {
    const canvas = createMockCanvas([]);
    const tool = new MeasureTool();

    tool.activate(canvas as any);

    const initialCount = canvas.getObjects().length;

    tool.onMouseDown({
      e: { clientX: 0, clientY: 0 } as MouseEvent,
      pointer: { x: 0, y: 0 },
    });

    tool.onMouseMove({
      e: { clientX: 100, clientY: 100 } as MouseEvent,
      pointer: { x: 100, y: 100 },
    });

    tool.onMouseUp({
      e: { clientX: 100, clientY: 100 } as MouseEvent,
      pointer: { x: 100, y: 100 },
    });

    // No objects should have been added to the canvas
    expect(canvas.getObjects().length).toBe(initialCount);

    // But measurement data should be available
    const measurement = tool.getMeasurement();
    expect(measurement).not.toBeNull();
    expect(measurement!.distance).toBeGreaterThan(0);
  });
});
