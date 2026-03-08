import { Shadow } from 'fabric';
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DROP_SHADOW_SETTINGS,
  applyBlendMode,
  applyDropShadowToObject,
  applyObjectOpacity,
  readEffectsStateFromObject,
  type EffectObjectLike,
} from '@/components/illustration/EffectsPanel';
import { DEFAULT_BLEND_MODE } from '@/components/illustration/EffectsPanel/BlendModeSelect';

class MockEffectObject implements EffectObjectLike {
  shadow: unknown = null;
  fill: unknown = '#22aa66';
  opacity = 1;
  globalCompositeOperation?: string = undefined;

  set(keyOrValues: string | Record<string, unknown>, value?: unknown) {
    if (typeof keyOrValues === 'string') {
      (this as unknown as Record<string, unknown>)[keyOrValues] = value;
      return this;
    }

    Object.assign(this, keyOrValues);
    return this;
  }
}

describe('Effects panel helpers', () => {
  it('Enabling drop shadow creates a Shadow instance on the object', () => {
    const object = new MockEffectObject();

    applyDropShadowToObject(object, true, DEFAULT_DROP_SHADOW_SETTINGS);

    expect(object.shadow).toBeInstanceOf(Shadow);
  });

  it('Setting blur=15 updates shadow.blur to 15', () => {
    const object = new MockEffectObject();

    applyDropShadowToObject(object, true, {
      ...DEFAULT_DROP_SHADOW_SETTINGS,
      blur: 15,
    });

    expect((object.shadow as Shadow).blur).toBe(15);
  });

  it('Setting offsetX=10 updates shadow.offsetX to 10', () => {
    const object = new MockEffectObject();

    applyDropShadowToObject(object, true, {
      ...DEFAULT_DROP_SHADOW_SETTINGS,
      offsetX: 10,
    });

    expect((object.shadow as Shadow).offsetX).toBe(10);
  });

  it('Disabling shadow sets object.shadow to null', () => {
    const object = new MockEffectObject();

    applyDropShadowToObject(object, true, DEFAULT_DROP_SHADOW_SETTINGS);
    applyDropShadowToObject(object, false, DEFAULT_DROP_SHADOW_SETTINGS);

    expect(object.shadow).toBeNull();
  });

  it('Reading an existing shadow populates all control values correctly', () => {
    const object = new MockEffectObject();
    object.shadow = new Shadow({
      color: 'rgba(10,20,30,0.4)',
      blur: 12,
      offsetX: 7,
      offsetY: -5,
    });
    object.opacity = 0.8;

    const state = readEffectsStateFromObject(object);

    expect(state.dropShadowEnabled).toBe(true);
    expect(state.shadowColor).toBe('rgba(10,20,30,0.4)');
    expect(state.shadowBlur).toBe(12);
    expect(state.shadowOffsetX).toBe(7);
    expect(state.shadowOffsetY).toBe(-5);
    expect(state.blurEnabled).toBe(false);
    expect(state.opacityPercent).toBe(80);
  });

  it('Opacity slider at 50 sets object.opacity to 0.5', () => {
    const object = new MockEffectObject();

    applyObjectOpacity(object, 50);

    expect(object.opacity).toBe(0.5);
  });

  it('Blend mode "multiply" sets globalCompositeOperation to "multiply"', () => {
    const object = new MockEffectObject();

    applyBlendMode(object, 'multiply');

    expect(object.globalCompositeOperation).toBe('multiply');
  });

  it('Default blend mode is "source-over"', () => {
    expect(DEFAULT_BLEND_MODE).toBe('source-over');

    const object = new MockEffectObject();
    const state = readEffectsStateFromObject(object);

    expect(state.blendMode).toBe('source-over');
  });

  it('Shadow with offset 10,10 and color black renders correctly', () => {
    const object = new MockEffectObject();

    applyDropShadowToObject(object, true, {
      color: 'rgba(0,0,0,1)',
      blur: 10,
      offsetX: 10,
      offsetY: 10,
    });

    const shadow = object.shadow as Shadow;
    expect(shadow).toBeInstanceOf(Shadow);
    expect(shadow.color).toBe('rgba(0,0,0,1)');
    expect(shadow.offsetX).toBe(10);
    expect(shadow.offsetY).toBe(10);
    expect(shadow.blur).toBe(10);
  });

  it('Reading existing blend mode from object populates state correctly', () => {
    const object = new MockEffectObject();
    object.globalCompositeOperation = 'screen';

    const state = readEffectsStateFromObject(object);

    expect(state.blendMode).toBe('screen');
  });
});
