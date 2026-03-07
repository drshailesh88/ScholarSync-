import { describe, expect, it } from 'vitest';
import { FabricObject } from 'fabric';
import {
  alignCenterH,
  alignLeft,
  alignRight,
  alignTop,
  distributeH,
  distributeV,
} from '../canvas/align-operations';

class MockFabricObject {
  public id: string;
  public left: number;
  public top: number;
  public width: number;
  public height: number;
  public scaleX = 1;
  public scaleY = 1;
  private customData: Record<string, unknown> = {};

  constructor(
    id: string,
    left: number,
    top: number,
    width: number,
    height: number
  ) {
    this.id = id;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  get(key: string): unknown {
    if (key === 'id') return this.id;
    return this.customData[key];
  }

  set(key: string, value: unknown): this {
    this.customData[key] = value;
    return this;
  }

  getBoundingRect() {
    return {
      left: this.left,
      top: this.top,
      width: this.width * this.scaleX,
      height: this.height * this.scaleY,
    };
  }
}

function asFabricObjects(objects: MockFabricObject[]): FabricObject[] {
  return objects as unknown as FabricObject[];
}

function positionsById(
  positions: Array<{ id: string | number; left: number; top: number }>
): Record<string, { left: number; top: number }> {
  return positions.reduce<Record<string, { left: number; top: number }>>((acc, pos) => {
    acc[String(pos.id)] = { left: pos.left, top: pos.top };
    return acc;
  }, {});
}

describe('align operations', () => {
  it('alignLeft with 3 rects at x=[50,100,200] aligns all to left=50', () => {
    const objects = asFabricObjects([
      new MockFabricObject('a', 50, 10, 40, 40),
      new MockFabricObject('b', 100, 20, 40, 40),
      new MockFabricObject('c', 200, 30, 40, 40),
    ]);

    const positions = alignLeft(objects);
    const byId = positionsById(positions);

    expect(byId.a.left).toBe(50);
    expect(byId.b.left).toBe(50);
    expect(byId.c.left).toBe(50);
  });

  it('alignRight with different widths aligns all right edges to rightmost edge', () => {
    const rawObjects = [
      new MockFabricObject('a', 50, 10, 20, 40),
      new MockFabricObject('b', 100, 20, 60, 40),
      new MockFabricObject('c', 200, 30, 30, 40),
    ];
    const objects = asFabricObjects(rawObjects);

    const positions = alignRight(objects);
    const byId = positionsById(positions);
    const rightA = byId.a.left + rawObjects[0].width;
    const rightB = byId.b.left + rawObjects[1].width;
    const rightC = byId.c.left + rawObjects[2].width;

    expect(rightA).toBe(230);
    expect(rightB).toBe(230);
    expect(rightC).toBe(230);
  });

  it('alignCenterH aligns centers to average center', () => {
    const rawObjects = [
      new MockFabricObject('a', 0, 10, 20, 20),
      new MockFabricObject('b', 100, 20, 40, 20),
      new MockFabricObject('c', 200, 30, 60, 20),
    ];
    const objects = asFabricObjects(rawObjects);

    const positions = alignCenterH(objects);
    const byId = positionsById(positions);
    const centerA = byId.a.left + rawObjects[0].width / 2;
    const centerB = byId.b.left + rawObjects[1].width / 2;
    const centerC = byId.c.left + rawObjects[2].width / 2;

    expect(centerA).toBeCloseTo(120);
    expect(centerB).toBeCloseTo(120);
    expect(centerC).toBeCloseTo(120);
  });

  it('alignTop aligns all objects to the minimum top value', () => {
    const objects = asFabricObjects([
      new MockFabricObject('a', 10, 50, 20, 20),
      new MockFabricObject('b', 30, 100, 20, 20),
      new MockFabricObject('c', 50, 200, 20, 20),
    ]);

    const positions = alignTop(objects);
    const byId = positionsById(positions);

    expect(byId.a.top).toBe(50);
    expect(byId.b.top).toBe(50);
    expect(byId.c.top).toBe(50);
  });

  it('distributeH with 3 rects creates equal horizontal spacing', () => {
    const rawObjects = [
      new MockFabricObject('a', 0, 10, 20, 20),
      new MockFabricObject('b', 100, 20, 20, 20),
      new MockFabricObject('c', 260, 30, 20, 20),
    ];
    const objects = asFabricObjects(rawObjects);

    const positions = distributeH(objects);
    const byId = positionsById(positions);
    const gapAB = byId.b.left - (byId.a.left + rawObjects[0].width);
    const gapBC = byId.c.left - (byId.b.left + rawObjects[1].width);

    expect(gapAB).toBeCloseTo(gapBC);
    expect(byId.a.left).toBe(0);
    expect(byId.c.left).toBe(260);
  });

  it('distributeV with 3 rects at y=[10,100,300] creates equal vertical gaps', () => {
    const rawObjects = [
      new MockFabricObject('a', 10, 10, 20, 20),
      new MockFabricObject('b', 30, 100, 20, 20),
      new MockFabricObject('c', 50, 300, 20, 20),
    ];
    const objects = asFabricObjects(rawObjects);

    const positions = distributeV(objects);
    const byId = positionsById(positions);
    const gapAB = byId.b.top - (byId.a.top + rawObjects[0].height);
    const gapBC = byId.c.top - (byId.b.top + rawObjects[1].height);

    expect(gapAB).toBeCloseTo(gapBC);
    expect(byId.a.top).toBe(10);
    expect(byId.c.top).toBe(300);
  });

  it('distributeH with only 2 objects is a no-op', () => {
    const rawObjects = [
      new MockFabricObject('a', 50, 10, 20, 20),
      new MockFabricObject('b', 200, 10, 20, 20),
    ];
    const objects = asFabricObjects(rawObjects);

    const positions = distributeH(objects);
    const byId = positionsById(positions);

    expect(byId.a.left).toBe(50);
    expect(byId.b.left).toBe(200);
  });

  it('alignLeft with a single object is a no-op', () => {
    const objects = asFabricObjects([
      new MockFabricObject('solo', 75, 125, 30, 40),
    ]);

    const positions = alignLeft(objects);
    const byId = positionsById(positions);

    expect(byId.solo.left).toBe(75);
    expect(byId.solo.top).toBe(125);
  });
});
