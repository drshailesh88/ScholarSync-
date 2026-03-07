import { describe, expect, it, expectTypeOf } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Canvas as FabricCanvasType } from 'fabric';
import type { FabricCanvas } from '@/lib/illustration/types';
import {
  isGridObject,
  filterGridFromSerializedState,
  drawGridOverlay,
  getCanvasWrapperStyle,
  getConnectorPointer,
  shouldPushHistoryForEvent,
} from '@/lib/illustration/canvas/editorBugfixUtils';

const canvasSource = readFileSync(
  resolve(process.cwd(), 'src/components/illustration/Canvas/Canvas.tsx'),
  'utf8'
);

describe('Editor bug fixes', () => {
  describe('Bug 1 - grid export contamination', () => {
    it('filters grid entries from serialized canvas state', () => {
      const state = {
        version: '6.9.1',
        objects: [
          { type: 'line', isGrid: true },
          { type: 'line', 'data-type': 'grid' },
          { type: 'rect', id: 'shape-1' },
        ],
      };

      const filtered = filterGridFromSerializedState(state);
      expect(filtered.objects).toEqual([{ type: 'rect', id: 'shape-1' }]);
    });

    it('uses after:render grid overlay and does not add grid lines as canvas objects', () => {
      expect(canvasSource).toContain("canvas.on('after:render'");
      expect(canvasSource).not.toContain('canvas.add(line)');
    });

    it('detects grid marker objects', () => {
      expect(isGridObject({ isGrid: true })).toBe(true);
      expect(isGridObject({ 'data-type': 'grid' })).toBe(true);
      expect(isGridObject({})).toBe(false);
    });
  });

  describe('Bug 2 - undo flood', () => {
    it('pushes exactly one history entry for rectangle draw lifecycle', () => {
      const lifecycle: Array<{ event: 'object:added' | 'object:modified' | 'shape:finalized'; isDrawing: boolean }> = [
        { event: 'object:added', isDrawing: true },
        { event: 'object:modified', isDrawing: true },
        { event: 'shape:finalized', isDrawing: false },
      ];

      const historyPushes = lifecycle.reduce((count, step) => {
        return count + (shouldPushHistoryForEvent(step.event, step.isDrawing) ? 1 : 0);
      }, 0);

      expect(historyPushes).toBe(1);
      expect(canvasSource).not.toContain("canvas.on('object:added'");
    });
  });

  describe('Bug 3 - double zoom', () => {
    it('canvas wrapper style has no CSS scale transform', () => {
      const style = getCanvasWrapperStyle(800, 600);
      expect(style.width).toBe(800);
      expect(style.height).toBe(600);
      expect(style.position).toBe('relative');
      expect('transform' in style).toBe(false);
    });
  });

  describe('Bug 4 - connector hit test pointer coordinates', () => {
    it('uses canvas.getPointer for connector target detection', () => {
      const pointer = { x: 120, y: 80 };
      const mockCanvas = {
        getPointer: (event: MouseEvent | TouchEvent) => {
          expect(event).toBeTruthy();
          return pointer;
        },
      };
      const mockEvent = { type: 'mouseup' } as unknown as MouseEvent;

      expect(getConnectorPointer(mockCanvas, mockEvent)).toEqual(pointer);
      expect(canvasSource).toContain('getConnectorPointer(canvas, e.e)');
    });
  });

  describe('Bug 5 - FabricCanvas type safety', () => {
    it('aliases FabricCanvas to fabric.Canvas', () => {
      expectTypeOf<FabricCanvas>().toEqualTypeOf<FabricCanvasType>();
    });

    it('draws grid overlay directly on rendering context', () => {
      const calls: string[] = [];
      const context = {
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

      drawGridOverlay(context, {
        width: 100,
        height: 100,
        gridSize: 20,
        zoom: 1,
        translateX: 0,
        translateY: 0,
      });

      expect(calls).toContain('stroke');
      expect(calls.filter((entry) => entry === 'moveTo').length).toBeGreaterThan(0);
      expect(calls.filter((entry) => entry === 'lineTo').length).toBeGreaterThan(0);
    });
  });
});
