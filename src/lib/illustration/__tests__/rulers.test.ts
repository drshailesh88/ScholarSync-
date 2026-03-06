import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRulerScreenPosition,
  shouldDeleteGuideOnDrop,
  snapAxisToGuides,
} from '@/components/illustration/Rulers';
import { resetEditorStore, useEditorStore } from '@/stores/illustration/editorStore';

describe('rulers and guides', () => {
  beforeEach(() => {
    resetEditorStore();
  });

  it('renders tick at doubled pixel position when zoom is 2x', () => {
    expect(getRulerScreenPosition(100, 2, 0)).toBe(200);
  });

  it('stores a new horizontal guide at y=150', () => {
    useEditorStore.getState().addGuide('horizontal', 150);
    expect(useEditorStore.getState().guides.horizontal).toContain(150);
  });

  it('removes a guide when dragged back to ruler area', () => {
    useEditorStore.getState().addGuide('horizontal', 150);

    const shouldDelete = shouldDeleteGuideOnDrop('horizontal', 20, -2);
    expect(shouldDelete).toBe(true);

    if (shouldDelete) {
      useEditorStore.getState().removeGuide('horizontal', 0);
    }

    expect(useEditorStore.getState().guides.horizontal).toHaveLength(0);
  });

  it('snaps to a guide when object edge is within threshold', () => {
    const result = snapAxisToGuides({
      position: 96,
      size: 20,
      guides: [100],
      threshold: 5,
    });

    expect(result.snappedGuide).toBe(100);
    expect(result.snappedPosition).toBe(100);
  });

  it('returns original position when no guide is within threshold', () => {
    const result = snapAxisToGuides({
      position: 40,
      size: 20,
      guides: [100, 160],
      threshold: 5,
    });

    expect(result.snappedGuide).toBeNull();
    expect(result.snappedPosition).toBe(40);
  });
});
