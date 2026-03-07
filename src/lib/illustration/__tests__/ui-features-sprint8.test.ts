import { describe, expect, it } from 'vitest';
import {
  applyStrokeDashPreset,
  applyUniformCornerRadius,
  setObjectAspectLock,
  toggleObjectFlip,
} from '@/components/illustration/PropertiesPanel';

class MockObject {
  rx = 0;
  ry = 0;
  flipX = false;
  flipY = false;
  lockUniScaling = false;
  strokeDashArray: number[] | null = null;

  set(keyOrValues: string | Record<string, unknown>, value?: unknown) {
    if (typeof keyOrValues === 'string') {
      (this as unknown as Record<string, unknown>)[keyOrValues] = value;
      return this;
    }

    Object.assign(this, keyOrValues);
    return this;
  }
}

describe('Sprint 8 UI features', () => {
  it('Setting corner radius 10 on a rect sets rx=10, ry=10', () => {
    const rect = new MockObject();

    applyUniformCornerRadius(rect, 10);

    expect(rect.rx).toBe(10);
    expect(rect.ry).toBe(10);
  });

  it('Setting dash "Dashed" applies strokeDashArray [10, 5]', () => {
    const obj = new MockObject();

    applyStrokeDashPreset(obj, 'dashed');

    expect(obj.strokeDashArray).toEqual([10, 5]);
  });

  it('Flip horizontal toggles flipX', () => {
    const obj = new MockObject();

    toggleObjectFlip(obj, 'horizontal');

    expect(obj.flipX).toBe(true);
  });

  it('Flip horizontal twice returns to original', () => {
    const obj = new MockObject();

    toggleObjectFlip(obj, 'horizontal');
    toggleObjectFlip(obj, 'horizontal');

    expect(obj.flipX).toBe(false);
  });

  it('Aspect lock sets lockUniScaling = true on object', () => {
    const obj = new MockObject();

    setObjectAspectLock(obj, true);

    expect(obj.lockUniScaling).toBe(true);
  });
});
