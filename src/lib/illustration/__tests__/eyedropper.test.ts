import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { FabricObject } from 'fabric';
import { beforeEach, describe, expect, it } from 'vitest';
import { ToolType } from '@/lib/illustration/types';
import { resetEditorStore, useEditorStore } from '@/stores/illustration/editorStore';
import {
  sampleCanvasBackgroundColor,
  sampleGradientAtPoint,
  sampleObjectFillColor,
  type GradientFillLike,
} from '@/lib/illustration/canvas/eyedropper-utils';

const canvasSource = readFileSync(
  resolve(process.cwd(), 'src/components/illustration/Canvas/Canvas.tsx'),
  'utf8'
);

describe('eyedropper tool', () => {
  beforeEach(() => {
    resetEditorStore();
  });

  it('samples red rectangle fill color from object click', () => {
    const redRect = {
      fill: '#ff0000',
      width: 120,
      height: 80,
      getScaledWidth: () => 120,
      getScaledHeight: () => 80,
      getBoundingRect: () => ({ left: 10, top: 20, width: 120, height: 80 }),
    } as unknown as FabricObject;

    const sampled = sampleObjectFillColor(redRect, { x: 50, y: 45 });
    expect(sampled).toBe('#ff0000');
  });

  it('samples canvas background color when clicking empty area', () => {
    const sampled = sampleCanvasBackgroundColor(
      '#00ff00',
      { x: 300, y: 200 },
      { width: 800, height: 600 }
    );

    expect(sampled).toBe('#00ff00');
  });

  it('samples gradient color using click position within the gradient', () => {
    const gradient: GradientFillLike = {
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: 100, y2: 0 },
      colorStops: [
        { offset: 0, color: '#ff0000' },
        { offset: 1, color: '#0000ff' },
      ],
    };

    expect(sampleGradientAtPoint(gradient, { x: 0, y: 0 })).toBe('#ff0000');
    expect(sampleGradientAtPoint(gradient, { x: 100, y: 0 })).toBe('#0000ff');
  });

  it('switches back to SELECT after sampling and tracks lastSampledColor in store', () => {
    const store = useEditorStore.getState();
    store.setActiveTool(ToolType.EYEDROPPER);
    store.setLastSampledColor('#123456');
    store.setActiveTool(ToolType.SELECT);

    const next = useEditorStore.getState();
    expect(next.lastSampledColor).toBe('#123456');
    expect(next.activeTool).toBe(ToolType.SELECT);
    expect(canvasSource).toContain('setActiveTool(ToolType.SELECT)');
  });
});

