import type { CSSProperties } from 'react';

export type SerializedCanvasState = {
  objects?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

export type GridOverlayContext = Pick<
  CanvasRenderingContext2D,
  'save' | 'restore' | 'setTransform' | 'beginPath' | 'moveTo' | 'lineTo' | 'stroke'
> & {
  strokeStyle: string | CanvasGradient | CanvasPattern;
  lineWidth: number;
};

export type HistoryEventType = 'object:added' | 'object:modified' | 'shape:finalized' | 'explicit';

type GridOverlayCanvas<TContext extends GridOverlayContext> = {
  viewportTransform?: number[];
  getTopContext: () => TContext;
  clearContext: (context: TContext) => void;
  getZoom: () => number;
  getWidth: () => number;
  getHeight: () => number;
  on: (eventName: 'before:render' | 'after:render', handler: () => void) => void;
  off: (eventName: 'before:render' | 'after:render', handler: () => void) => void;
  requestRenderAll: () => void;
};

export const isGridObject = (obj: unknown): boolean => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const candidate = obj as Record<string, unknown>;
  return candidate.isGrid === true || candidate['data-type'] === 'grid';
};

export const filterGridFromSerializedState = (state: SerializedCanvasState): SerializedCanvasState => {
  if (!Array.isArray(state.objects)) {
    return state;
  }

  return {
    ...state,
    objects: state.objects.filter((obj) => !isGridObject(obj)),
  };
};

export const getCanvasWrapperStyle = (width: number, height: number): CSSProperties => ({
  width,
  height,
  position: 'relative',
  transform: 'none',
});

export const removeGridObjects = <T>(canvas: {
  getObjects: () => T[];
  remove: (...objects: T[]) => unknown;
}): number => {
  const staleGridObjects = canvas.getObjects().filter((object) => isGridObject(object));
  if (staleGridObjects.length > 0) {
    canvas.remove(...staleGridObjects);
  }
  return staleGridObjects.length;
};

export const registerGridOverlay = <T, TContext extends GridOverlayContext>(
  canvas: GridOverlayCanvas<TContext> & {
    getObjects: () => T[];
    remove: (...objects: T[]) => unknown;
  },
  options: {
    enabled: boolean;
    gridSize: number;
  }
) => {
  const clearOverlay = () => {
    canvas.clearContext(canvas.getTopContext());
  };

  const drawOverlay = () => {
    clearOverlay();

    if (!options.enabled) {
      return;
    }

    const viewportTransform = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
    drawGridOverlay(canvas.getTopContext(), {
      width: canvas.getWidth(),
      height: canvas.getHeight(),
      gridSize: options.gridSize,
      zoom: canvas.getZoom() || 1,
      translateX: viewportTransform[4],
      translateY: viewportTransform[5],
    });
  };

  removeGridObjects(canvas);
  canvas.on('before:render', clearOverlay);
  canvas.on('after:render', drawOverlay);
  canvas.requestRenderAll();

  return () => {
    canvas.off('before:render', clearOverlay);
    canvas.off('after:render', drawOverlay);
    clearOverlay();
  };
};

export const shouldPushHistoryForEvent = (event: HistoryEventType, isDrawing: boolean): boolean => {
  if (event === 'object:added') {
    return false;
  }

  if (event === 'object:modified') {
    return !isDrawing;
  }

  return true;
};

export const getConnectorPointer = <
  T extends {
    getPointer: (event: MouseEvent | TouchEvent) => { x: number; y: number };
  },
>(
  canvas: T,
  event: MouseEvent | TouchEvent
) => {
  return canvas.getPointer(event);
};

export const drawGridOverlay = (
  context: GridOverlayContext,
  params: {
    width: number;
    height: number;
    gridSize: number;
    zoom: number;
    translateX: number;
    translateY: number;
    color?: string;
  }
) => {
  const { width, height, gridSize, zoom, translateX, translateY, color = 'rgba(200, 200, 200, 0.3)' } = params;

  if (gridSize <= 0 || zoom <= 0) {
    return;
  }

  const spacing = gridSize * zoom;
  const offsetX = ((translateX % spacing) + spacing) % spacing;
  const offsetY = ((translateY % spacing) + spacing) % spacing;

  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 1;

  for (let x = offsetX; x <= width; x += spacing) {
    context.moveTo(Math.round(x) + 0.5, 0);
    context.lineTo(Math.round(x) + 0.5, height);
  }

  for (let y = offsetY; y <= height; y += spacing) {
    context.moveTo(0, Math.round(y) + 0.5);
    context.lineTo(width, Math.round(y) + 0.5);
  }

  context.stroke();
  context.restore();
};
