import { describe, expect, it } from 'vitest';
import {
  applyTransformChange,
  computeMixedTransformValues,
  formatTransformDisplayValue,
  setObjectAspectLock,
  subscribeToTransformEvents,
  toggleObjectFlip,
  type CanvasEventSourceLike,
  type TransformObjectLike,
} from '@/components/illustration/PropertiesPanel';

class MockTransformObject implements TransformObjectLike {
  left = 0;
  top = 0;
  width = 100;
  height = 50;
  scaleX = 1;
  scaleY = 1;
  angle = 0;
  opacity = 1;
  flipX = false;
  flipY = false;
  lockUniScaling = false;

  constructor(overrides: Partial<MockTransformObject> = {}) {
    Object.assign(this, overrides);
  }

  set(keyOrValues: string | Record<string, unknown>, value?: unknown) {
    if (typeof keyOrValues === 'string') {
      (this as unknown as Record<string, unknown>)[keyOrValues] = value;
      return this;
    }

    Object.assign(this, keyOrValues);
    return this;
  }

  setCoords() {
    return undefined;
  }

  getScaledWidth() {
    return Math.abs(this.width * this.scaleX);
  }

  getScaledHeight() {
    return Math.abs(this.height * this.scaleY);
  }
}

class MockCanvasEventSource implements CanvasEventSourceLike {
  private handlers = new Map<string, Set<(event?: unknown) => void>>();

  on(eventName: string, handler: (event?: unknown) => void) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }
    this.handlers.get(eventName)?.add(handler);
  }

  off(eventName: string, handler: (event?: unknown) => void) {
    this.handlers.get(eventName)?.delete(handler);
  }

  emit(eventName: string, event?: unknown) {
    this.handlers.get(eventName)?.forEach((handler) => handler(event));
  }
}

describe('Transform panel helpers', () => {
  it('Setting X=100 on a selected rect updates rect.left to 100', () => {
    const rect = new MockTransformObject({ left: 12 });

    applyTransformChange([rect], 'x', 100, false);

    expect(rect.left).toBe(100);
  });

  it('Setting W=200 with aspect lock OFF only changes width', () => {
    const rect = new MockTransformObject({ width: 100, height: 50, scaleX: 1, scaleY: 1 });

    applyTransformChange([rect], 'w', 200, false);

    expect(rect.getScaledWidth()).toBe(200);
    expect(rect.getScaledHeight()).toBe(50);
    expect(rect.scaleY).toBe(1);
  });

  it('Setting W=200 with aspect lock ON changes both W and H proportionally', () => {
    const rect = new MockTransformObject({ width: 100, height: 50, scaleX: 1, scaleY: 1 });

    applyTransformChange([rect], 'w', 200, true);

    expect(rect.getScaledWidth()).toBe(200);
    expect(rect.getScaledHeight()).toBe(100);
  });

  it('Rotating to 45° sets object.angle to 45', () => {
    const rect = new MockTransformObject({ angle: 0 });

    applyTransformChange([rect], 'r', 45, false);

    expect(rect.angle).toBe(45);
  });

  it('Setting opacity to 50 updates object.opacity to 0.5', () => {
    const rect = new MockTransformObject({ opacity: 1 });

    applyTransformChange([rect], 'o', 50, false);

    expect(rect.opacity).toBe(0.5);
  });

  it('Flip horizontal toggles flipX and a second flip restores it', () => {
    const rect = new MockTransformObject({ flipX: false });

    toggleObjectFlip(rect, 'horizontal');
    expect(rect.flipX).toBe(true);

    toggleObjectFlip(rect, 'horizontal');
    expect(rect.flipX).toBe(false);
  });

  it('Aspect lock helper sets lockUniScaling to true', () => {
    const rect = new MockTransformObject({ lockUniScaling: false });

    setObjectAspectLock(rect, true);

    expect(rect.lockUniScaling).toBe(true);
  });

  it('Selecting 2 objects with different X shows "—"', () => {
    const objA = new MockTransformObject({ left: 10, top: 20 });
    const objB = new MockTransformObject({ left: 30, top: 20 });

    const values = computeMixedTransformValues([objA, objB]);

    expect(values.x.mixed).toBe(true);
    expect(formatTransformDisplayValue(values.x)).toBe('—');
  });

  it('Selecting 2 objects with same Y shows the value', () => {
    const objA = new MockTransformObject({ left: 10, top: 20 });
    const objB = new MockTransformObject({ left: 30, top: 20 });

    const values = computeMixedTransformValues([objA, objB]);

    expect(values.y.mixed).toBe(false);
    expect(formatTransformDisplayValue(values.y)).toBe('20.0');
  });

  it('Selecting 2 objects with different opacity shows "—"', () => {
    const objA = new MockTransformObject({ opacity: 1 });
    const objB = new MockTransformObject({ opacity: 0.6 });

    const values = computeMixedTransformValues([objA, objB]);

    expect(values.o.mixed).toBe(true);
    expect(formatTransformDisplayValue(values.o)).toBe('—');
  });

  it('Dragging object on canvas updates X/Y fields in real-time', () => {
    const canvas = new MockCanvasEventSource();
    const obj = new MockTransformObject({ left: 5, top: 6 });
    let values = computeMixedTransformValues([obj]);

    const unsubscribe = subscribeToTransformEvents(canvas, () => {
      values = computeMixedTransformValues([obj]);
    });

    obj.left = 90;
    obj.top = 120;
    canvas.emit('object:moving', { target: obj });

    expect(formatTransformDisplayValue(values.x)).toBe('90.0');
    expect(formatTransformDisplayValue(values.y)).toBe('120.0');

    unsubscribe();
  });
});
