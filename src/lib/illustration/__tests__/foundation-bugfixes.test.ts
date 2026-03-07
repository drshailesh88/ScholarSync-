import { describe, expect, expectTypeOf, it } from 'vitest';
import type { Canvas as FabricCanvasType } from 'fabric';
import type { FabricCanvas } from '@/lib/illustration/types';
import {
  isGridObject,
  registerGridOverlay,
  shouldPushHistoryForEvent,
} from '@/lib/illustration/canvas/editorBugfixUtils';

type GridObjectLike = {
  id: string;
  isGrid?: boolean;
  'data-type'?: string;
};

function createMockGridContext() {
  const calls: string[] = [];

  return {
    calls,
    strokeStyle: '',
    lineWidth: 0,
    save: () => calls.push('save'),
    restore: () => calls.push('restore'),
    setTransform: () => calls.push('setTransform'),
    beginPath: () => calls.push('beginPath'),
    moveTo: () => calls.push('moveTo'),
    lineTo: () => calls.push('lineTo'),
    stroke: () => calls.push('stroke'),
  };
}

function createMockGridCanvas(initialObjects: GridObjectLike[]) {
  const objects = [...initialObjects];
  const context = createMockGridContext();
  const listeners: Record<'before:render' | 'after:render', Array<() => void>> = {
    'before:render': [],
    'after:render': [],
  };

  return {
    viewportTransform: [1, 0, 0, 1, 15, 10],
    getObjects: () => objects,
    remove: (...removedObjects: GridObjectLike[]) => {
      removedObjects.forEach((object) => {
        const index = objects.indexOf(object);
        if (index >= 0) {
          objects.splice(index, 1);
        }
      });
    },
    getTopContext: () => context,
    clearContext: () => {
      context.calls.push('clearContext');
    },
    getZoom: () => 1,
    getWidth: () => 200,
    getHeight: () => 120,
    on: (eventName: 'before:render' | 'after:render', handler: () => void) => {
      listeners[eventName].push(handler);
    },
    off: (eventName: 'before:render' | 'after:render', handler: () => void) => {
      listeners[eventName] = listeners[eventName].filter((candidate) => candidate !== handler);
    },
    requestRenderAll: () => {
      listeners['before:render'].forEach((handler) => handler());
      listeners['after:render'].forEach((handler) => handler());
    },
    context,
  };
}

describe('Illustration foundation bugfixes', () => {
  it('keeps grid rendering out of canvas objects after overlay render', () => {
    const canvas = createMockGridCanvas([
      { id: 'grid-1', 'data-type': 'grid' },
      { id: 'shape-1' },
    ]);

    const cleanup = registerGridOverlay(canvas, {
      enabled: true,
      gridSize: 20,
    });

    expect(canvas.getObjects().filter((object) => isGridObject(object)).length).toBe(0);
    expect(canvas.context.calls).toContain('stroke');

    cleanup();
  });

  it('records exactly one history entry for a rectangle draw lifecycle', () => {
    const lifecycle: Array<{
      event: 'object:added' | 'object:modified' | 'shape:finalized';
      isDrawing: boolean;
    }> = [
      { event: 'object:added', isDrawing: true },
      { event: 'object:modified', isDrawing: true },
      { event: 'shape:finalized', isDrawing: false },
    ];

    const historyEntries = lifecycle.filter((step) => shouldPushHistoryForEvent(step.event, step.isDrawing));
    expect(historyEntries).toHaveLength(1);
    expect(historyEntries[0]?.event).toBe('shape:finalized');
  });

  it('keeps FabricCanvas aligned with fabric.Canvas typing', () => {
    expectTypeOf<FabricCanvas>().toEqualTypeOf<FabricCanvasType>();
  });
});
