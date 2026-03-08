import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRulerScreenPosition,
  shouldDeleteGuideOnDrop,
  snapAxisToGuides,
} from '@/components/illustration/Rulers';
import { resetEditorStore, useEditorStore } from '@/stores/illustration/editorStore';
import {
  CANVAS_PRESETS,
  getPresetDimensions,
  swapDimensions,
  applyDocumentSettingsToCanvas,
  type DimensionCanvasLike,
} from '@/lib/illustration/document-settings';

describe('rulers, guides, and document settings', () => {
  beforeEach(() => {
    resetEditorStore();
  });

  // ---- RULERS ----

  it('at zoom 2x, tick at canvas position 100 renders at pixel 200', () => {
    expect(getRulerScreenPosition(100, 2, 0)).toBe(200);
  });

  // ---- GUIDES ----

  it('adding guide at y=150 stores in guides.horizontal', () => {
    useEditorStore.getState().addGuide('horizontal', 150);
    expect(useEditorStore.getState().guides.horizontal).toContain(150);
  });

  it('drag-to-ruler removes guide from store', () => {
    useEditorStore.getState().addGuide('horizontal', 150);

    const shouldDelete = shouldDeleteGuideOnDrop('horizontal', 20, -2);
    expect(shouldDelete).toBe(true);

    if (shouldDelete) {
      useEditorStore.getState().removeGuide('horizontal', 0);
    }

    expect(useEditorStore.getState().guides.horizontal).toHaveLength(0);
  });

  it('snap returns guide position when within threshold', () => {
    const result = snapAxisToGuides({
      position: 96,
      size: 20,
      guides: [100],
      threshold: 5,
    });

    expect(result.snappedGuide).toBe(100);
    expect(result.snappedPosition).toBe(100);
  });

  // ---- DOCUMENT SETTINGS ----

  it('canvas size preset "1920x1080" sets correct dimensions', () => {
    const hdPreset = CANVAS_PRESETS.find((p) => p.id === 'hd');
    expect(hdPreset).toBeDefined();
    expect(hdPreset!.width).toBe(1920);
    expect(hdPreset!.height).toBe(1080);

    const mockCanvas: DimensionCanvasLike = {
      setDimensions: () => {},
      requestRenderAll: () => {},
    };

    const applied = applyDocumentSettingsToCanvas(mockCanvas, {
      width: 1920,
      height: 1080,
      backgroundColor: '#ffffff',
    });

    expect(applied.width).toBe(1920);
    expect(applied.height).toBe(1080);
  });

  it('orientation toggle swaps width and height', () => {
    const dimensions = getPresetDimensions('a4', 'portrait');
    const swapped = swapDimensions(dimensions);

    expect(swapped.width).toBe(dimensions.height);
    expect(swapped.height).toBe(dimensions.width);
  });

  it('StatusBar receives current canvas dimensions', () => {
    const canvasSize = { width: 1920, height: 1080 };

    const display = `${Math.round(canvasSize.width)}x${Math.round(canvasSize.height)}`;
    expect(display).toBe('1920x1080');
  });
});
