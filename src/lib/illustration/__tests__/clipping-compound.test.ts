import { describe, expect, it } from 'vitest';
import { Ellipse, FabricObject, Group, Path as FabricPath, Rect, util, type Canvas as FabricCanvas } from 'fabric';
import { makeClippingMask, releaseClippingMask } from '../canvas/clipping-mask';
import { makeCompoundPath, releaseCompoundPath, isCompoundPath } from '../canvas/compound-path';

class MockCanvas {
  private objects: FabricObject[] = [];
  private activeObjects: FabricObject[] = [];

  constructor(initialObjects: FabricObject[] = []) {
    this.add(...initialObjects);
  }

  getObjects(): FabricObject[] {
    return this.objects;
  }

  getActiveObjects(): FabricObject[] {
    return this.activeObjects;
  }

  getActiveObject(): FabricObject | null {
    return this.activeObjects[0] ?? null;
  }

  setActiveObjects(objects: FabricObject[]): void {
    this.activeObjects = [...objects];
  }

  setActiveObject(object: FabricObject): this {
    this.activeObjects = [object];
    return this;
  }

  discardActiveObject(): this {
    this.activeObjects = [];
    return this;
  }

  add(...objects: FabricObject[]): number {
    objects.forEach((object) => {
      if (!this.objects.includes(object)) {
        this.objects.push(object);
      }
      (object as FabricObject & { canvas?: unknown }).canvas = this as unknown as FabricCanvas;
    });
    return this.objects.length;
  }

  insertAt(index: number, ...objects: FabricObject[]): number {
    const safeIndex = Math.max(0, Math.min(index, this.objects.length));
    this.objects.splice(safeIndex, 0, ...objects);
    objects.forEach((object) => {
      (object as FabricObject & { canvas?: unknown }).canvas = this as unknown as FabricCanvas;
    });
    return this.objects.length;
  }

  remove(...objects: FabricObject[]): FabricObject[] {
    objects.forEach((object) => {
      const index = this.objects.indexOf(object);
      if (index >= 0) {
        this.objects.splice(index, 1);
      }

      this.activeObjects = this.activeObjects.filter((activeObject) => activeObject !== object);
      (object as FabricObject & { canvas?: unknown }).canvas = undefined;
    });

    return objects;
  }

  requestRenderAll(): void {
    // no-op for tests
  }
}

function asFabricCanvas(canvas: MockCanvas): FabricCanvas {
  return canvas as unknown as FabricCanvas;
}

// ============================================================================
// Clipping Mask Tests
// ============================================================================

describe('clipping mask operations', () => {
  it('creates a group with the ellipse clipped by the topmost rect', async () => {
    const ellipse = new Ellipse({ left: 80, top: 120, rx: 60, ry: 40, fill: '#00a3ff' });
    const clipRect = new Rect({ left: 110, top: 120, width: 90, height: 90, fill: '#000000' });
    const canvas = new MockCanvas([ellipse, clipRect]);
    canvas.setActiveObjects([ellipse, clipRect]);

    const result = await makeClippingMask(asFabricCanvas(canvas));

    expect(result.success).toBe(true);
    expect(canvas.getObjects()).toHaveLength(1);

    const clippedGroup = canvas.getObjects()[0] as Group;
    expect(clippedGroup.type).toBe('group');

    const [clippedObject] = clippedGroup.getObjects();
    expect(clippedObject).toBe(ellipse);
    expect(clippedObject.clipPath).toBeTruthy();
    expect(clippedObject.clipPath?.type).toBe('rect');
  });

  it('releases a clipped group restoring both objects without clipPath', async () => {
    const ellipse = new Ellipse({ left: 60, top: 100, rx: 50, ry: 35, fill: '#ff8c00' });
    const clipRect = new Rect({ left: 90, top: 100, width: 80, height: 70, fill: '#111111' });
    const canvas = new MockCanvas([ellipse, clipRect]);
    canvas.setActiveObjects([ellipse, clipRect]);

    await makeClippingMask(asFabricCanvas(canvas));

    const clippedGroup = canvas.getObjects()[0];
    canvas.setActiveObject(clippedGroup);

    const result = await releaseClippingMask(asFabricCanvas(canvas));

    expect(result.success).toBe(true);
    expect(canvas.getObjects()).toHaveLength(2);
    expect(ellipse.clipPath).toBeUndefined();
    expect(canvas.getObjects().some((object) => object.type === 'rect')).toBe(true);
  });

  it('positions clip path relative to each clipped object center preserving global location', async () => {
    const targetA = new Ellipse({ left: 80, top: 140, rx: 45, ry: 30, fill: '#4f46e5' });
    const targetB = new Rect({ left: 220, top: 100, width: 110, height: 80, fill: '#0ea5e9' });
    const clipRect = new Rect({ left: 140, top: 120, width: 90, height: 90, fill: '#000000' });
    const canvas = new MockCanvas([targetA, targetB, clipRect]);
    canvas.setActiveObjects([targetA, targetB, clipRect]);
    const originalClipCenter = clipRect.getCenterPoint();

    const result = await makeClippingMask(asFabricCanvas(canvas));

    expect(result.success).toBe(true);
    const clippedGroup = canvas.getObjects()[0] as Group;
    const clippedObjects = clippedGroup.getObjects();
    expect(clippedObjects).toHaveLength(2);

    clippedObjects.forEach((object) => {
      expect(object.clipPath).toBeTruthy();
      const clipPathCenterInCanvas = util.sendPointToPlane(
        object.clipPath!.getCenterPoint(),
        object.calcTransformMatrix(),
        undefined
      );

      expect(clipPathCenterInCanvas.x).toBeCloseTo(originalClipCenter.x, 5);
      expect(clipPathCenterInCanvas.y).toBeCloseTo(originalClipCenter.y, 5);
    });
  });

  it('exports SVG with clipPath element for clipped objects', async () => {
    const ellipse = new Ellipse({ left: 70, top: 100, rx: 55, ry: 38, fill: '#ef4444' });
    const clipRect = new Rect({ left: 85, top: 95, width: 80, height: 80, fill: '#111111' });
    const canvas = new MockCanvas([ellipse, clipRect]);
    canvas.setActiveObjects([ellipse, clipRect]);

    await makeClippingMask(asFabricCanvas(canvas));
    const clippedGroup = canvas.getObjects()[0] as Group;
    const clippedObject = clippedGroup.getObjects()[0];
    const svg = clippedObject.toSVG();

    expect(svg).toContain('<clipPath');
    expect(svg).toContain('clip-path="url(#CLIPPATH_');
  });
});

// ============================================================================
// Compound Path Tests
// ============================================================================

describe('compound path operations', () => {
  it('merges 2 overlapping paths into a single path with evenodd fill rule', () => {
    const pathA = new FabricPath('M 0 0 L 100 0 L 100 100 L 0 100 Z', {
      left: 50,
      top: 50,
      fill: '#ff0000',
    });
    const pathB = new FabricPath('M 25 25 L 75 25 L 75 75 L 25 75 Z', {
      left: 70,
      top: 70,
      fill: '#0000ff',
    });
    const canvas = new MockCanvas([pathA, pathB]);
    canvas.setActiveObjects([pathA, pathB]);

    const result = makeCompoundPath(asFabricCanvas(canvas));

    expect(result.success).toBe(true);
    expect(result.compoundPath).toBeTruthy();
    expect(canvas.getObjects()).toHaveLength(1);

    const compound = canvas.getObjects()[0] as FabricPath;
    expect(compound.type).toBe('path');
    expect(compound.fillRule).toBe('evenodd');
    expect(isCompoundPath(compound)).toBe(true);
  });

  it('releases a compound path back into 2 individual paths', () => {
    const pathA = new FabricPath('M 0 0 L 100 0 L 100 100 L 0 100 Z', {
      left: 50,
      top: 50,
      fill: '#ff0000',
    });
    const pathB = new FabricPath('M 25 25 L 75 25 L 75 75 L 25 75 Z', {
      left: 70,
      top: 70,
      fill: '#0000ff',
    });
    const canvas = new MockCanvas([pathA, pathB]);
    canvas.setActiveObjects([pathA, pathB]);

    makeCompoundPath(asFabricCanvas(canvas));
    const compound = canvas.getObjects()[0];
    canvas.setActiveObject(compound);

    const result = releaseCompoundPath(asFabricCanvas(canvas));

    expect(result.success).toBe(true);
    expect(result.releasedPaths).toBeTruthy();
    expect(result.releasedPaths!.length).toBe(2);
    expect(canvas.getObjects()).toHaveLength(2);

    canvas.getObjects().forEach((object) => {
      expect(object.type).toBe('path');
      expect(isCompoundPath(object)).toBe(false);
    });
  });

  it('rejects compound path creation with fewer than 2 objects', () => {
    const pathA = new FabricPath('M 0 0 L 50 50', { left: 10, top: 10 });
    const canvas = new MockCanvas([pathA]);
    canvas.setActiveObjects([pathA]);

    const result = makeCompoundPath(asFabricCanvas(canvas));

    expect(result.success).toBe(false);
    expect(result.reason).toContain('at least 2');
  });

  it('rejects release on a non-compound-path object', () => {
    const rect = new Rect({ left: 0, top: 0, width: 50, height: 50 });
    const canvas = new MockCanvas([rect]);
    canvas.setActiveObject(rect);

    const result = releaseCompoundPath(asFabricCanvas(canvas));

    expect(result.success).toBe(false);
    expect(result.reason).toContain('not a compound path');
  });
});
