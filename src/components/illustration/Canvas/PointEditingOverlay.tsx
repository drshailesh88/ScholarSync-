import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Path as FabricPath, util, type Canvas as FabricCanvas, type TSimplePathData } from 'fabric';
import {
  addAnchorPointOnSegment,
  deleteAnchorPoints,
  findNearestPathSegment,
  moveBezierHandle,
  parsePathAnchors,
  toggleAnchorSmooth,
  translateAnchorPoints,
  type EditableAnchor,
  type PathPoint,
} from '@/lib/illustration/canvas/path-editing';

type HandleKind = 'in' | 'out';

type DragState =
  | {
      type: 'anchor';
      startPathData: TSimplePathData;
      startLocalPointer: PathPoint;
      selectedAnchorIndexes: number[];
      changed: boolean;
    }
  | {
      type: 'handle';
      startPathData: TSimplePathData;
      anchorIndex: number;
      handle: HandleKind;
      changed: boolean;
    };

interface AnchorVisual {
  index: number;
  x: number;
  y: number;
  handleIn: PathPoint | null;
  handleOut: PathPoint | null;
}

export interface PointEditingOverlayProps {
  fabricCanvas: FabricCanvas | null;
  pathObject: FabricPath | null;
  isActive: boolean;
  width: number;
  height: number;
  onExit: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'auto',
    zIndex: 20,
  },
  guideLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  anchor: {
    position: 'absolute',
    width: 6,
    height: 6,
    marginLeft: -3,
    marginTop: -3,
    border: '1px solid #0f172a',
    backgroundColor: '#ffffff',
    cursor: 'move',
    boxSizing: 'border-box',
  },
  anchorActive: {
    backgroundColor: '#1d4ed8',
    border: '1px solid #1d4ed8',
  },
  handle: {
    position: 'absolute',
    width: 4,
    height: 4,
    marginLeft: -2,
    marginTop: -2,
    borderRadius: '50%',
    border: '1px solid #0284c7',
    backgroundColor: '#bae6fd',
    cursor: 'crosshair',
    boxSizing: 'border-box',
  },
};

function clonePathData(pathData: TSimplePathData): TSimplePathData {
  return pathData.map((command) => [...command]) as TSimplePathData;
}

function mapPointToScreen(canvas: FabricCanvas, point: PathPoint): PathPoint {
  const viewportTransform = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
  const transformed = util.transformPoint(point, viewportTransform);
  return { x: transformed.x, y: transformed.y };
}

function sceneToLocal(pathObject: FabricPath, point: PathPoint): PathPoint {
  const matrix = pathObject.calcTransformMatrix();
  const inverse = util.invertTransform(matrix);
  const transformed = util.transformPoint(point, inverse);
  const offsetX = pathObject.pathOffset?.x ?? 0;
  const offsetY = pathObject.pathOffset?.y ?? 0;

  return {
    x: transformed.x + offsetX,
    y: transformed.y + offsetY,
  };
}

function getScenePointer(canvas: FabricCanvas, event: MouseEvent | PointerEvent): PathPoint {
  const pointer = canvas.getPointer(event as MouseEvent);
  return {
    x: pointer.x,
    y: pointer.y,
  };
}

function remapSmoothMapAfterInsert(smoothMap: Record<number, boolean>, index: number): Record<number, boolean> {
  const next: Record<number, boolean> = {};

  for (const [rawIndex, value] of Object.entries(smoothMap)) {
    const current = Number(rawIndex);
    next[current >= index ? current + 1 : current] = value;
  }

  return next;
}

function remapSmoothMapAfterDelete(
  smoothMap: Record<number, boolean>,
  deletedIndexes: number[]
): Record<number, boolean> {
  const deleted = new Set(deletedIndexes);
  const next: Record<number, boolean> = {};

  for (const [rawIndex, value] of Object.entries(smoothMap)) {
    const current = Number(rawIndex);
    if (deleted.has(current)) {
      continue;
    }

    const shift = deletedIndexes.filter((candidate) => candidate < current).length;
    next[current - shift] = value;
  }

  return next;
}

function isEditablePath(pathObject: FabricPath | null, canvas: FabricCanvas | null): pathObject is FabricPath {
  if (!pathObject || !canvas) {
    return false;
  }

  return canvas.getObjects().includes(pathObject);
}

function getSmoothMap(pathObject: FabricPath): Record<number, boolean> {
  const raw = (pathObject as FabricPath & { directSelectSmoothMap?: unknown }).directSelectSmoothMap;
  if (!raw || typeof raw !== 'object') {
    return {};
  }

  return raw as Record<number, boolean>;
}

function setSmoothMapOnPathObject(pathObject: FabricPath, smoothMap: Record<number, boolean>): void {
  (pathObject as FabricPath & { directSelectSmoothMap?: Record<number, boolean> }).directSelectSmoothMap = smoothMap;
}

export function PointEditingOverlay({
  fabricCanvas,
  pathObject,
  isActive,
  width,
  height,
  onExit,
}: PointEditingOverlayProps): JSX.Element | null {
  const [selectedAnchorIndexes, setSelectedAnchorIndexes] = useState<Set<number>>(new Set());
  const [smoothMap, setSmoothMapState] = useState<Record<number, boolean>>({});
  const [, forceUpdate] = useState(0);
  const dragRef = useRef<DragState | null>(null);

  const setSmoothMap = useCallback((nextMap: Record<number, boolean>) => {
    setSmoothMapState(nextMap);
    if (pathObject) {
      setSmoothMapOnPathObject(pathObject, nextMap);
    }
  }, [pathObject]);

  useEffect(() => {
    if (!pathObject) {
      setSelectedAnchorIndexes(new Set());
      setSmoothMapState({});
      return;
    }

    setSmoothMapState(getSmoothMap(pathObject));
  }, [pathObject]);

  const localParsed = useMemo(() => {
    if (!pathObject) {
      return null;
    }

    return parsePathAnchors(pathObject.path);
  }, [pathObject, smoothMap]);

  const isAnchorSmooth = useCallback((anchorIndex: number, sourcePathData?: TSimplePathData): boolean => {
    const mapped = smoothMap[anchorIndex];
    if (typeof mapped === 'boolean') {
      return mapped;
    }

    if (sourcePathData) {
      const parsed = parsePathAnchors(sourcePathData);
      return parsed.anchors[anchorIndex]?.smooth ?? true;
    }

    return localParsed?.anchors[anchorIndex]?.smooth ?? true;
  }, [localParsed, smoothMap]);

  useEffect(() => {
    if (!fabricCanvas || !isActive) {
      return;
    }

    const rerender = () => {
      forceUpdate((value) => value + 1);
    };

    fabricCanvas.on('after:render', rerender);
    fabricCanvas.on('object:modified', rerender);

    return () => {
      fabricCanvas.off('after:render', rerender);
      fabricCanvas.off('object:modified', rerender);
    };
  }, [fabricCanvas, isActive]);

  useEffect(() => {
    if (!isActive || !pathObject || !fabricCanvas) {
      dragRef.current = null;
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      const scenePointer = getScenePointer(fabricCanvas, event);

      if (drag.type === 'anchor') {
        const localPointer = sceneToLocal(pathObject, scenePointer);
        const delta = {
          x: localPointer.x - drag.startLocalPointer.x,
          y: localPointer.y - drag.startLocalPointer.y,
        };

        const nextPath = translateAnchorPoints(
          drag.startPathData,
          drag.selectedAnchorIndexes,
          delta
        );

        pathObject.set({ path: nextPath });
        pathObject.setCoords();
        fabricCanvas.requestRenderAll();

        if (Math.abs(delta.x) > 1e-6 || Math.abs(delta.y) > 1e-6) {
          drag.changed = true;
        }
        return;
      }

      const localPointer = sceneToLocal(pathObject, scenePointer);
      const isSmooth = isAnchorSmooth(drag.anchorIndex, drag.startPathData);
      const nextPath = moveBezierHandle(
        drag.startPathData,
        drag.anchorIndex,
        drag.handle,
        localPointer,
        {
          mirrorOpposite: isSmooth && !event.altKey,
          breakMirror: event.altKey,
        }
      );

      if (event.altKey && isSmooth) {
        setSmoothMap({
          ...smoothMap,
          [drag.anchorIndex]: false,
        });
      }

      pathObject.set({ path: nextPath });
      pathObject.setCoords();
      fabricCanvas.requestRenderAll();
      drag.changed = true;
    };

    const handlePointerUp = () => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      if (drag.changed) {
        fabricCanvas.fire('object:modified', { target: pathObject });
      }

      dragRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [fabricCanvas, isActive, isAnchorSmooth, pathObject, setSmoothMap, smoothMap]);

  useEffect(() => {
    if (!isActive || !fabricCanvas || !pathObject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }

      if (event.key !== 'Delete' && event.key !== 'Backspace') {
        return;
      }

      if (selectedAnchorIndexes.size === 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const indexes = [...selectedAnchorIndexes].sort((a, b) => a - b);
      const nextPath = deleteAnchorPoints(pathObject.path, indexes);
      pathObject.set({ path: nextPath });
      pathObject.setCoords();
      fabricCanvas.requestRenderAll();
      fabricCanvas.fire('object:modified', { target: pathObject });
      setSelectedAnchorIndexes(new Set());
      setSmoothMap(remapSmoothMapAfterDelete(smoothMap, indexes));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fabricCanvas, isActive, pathObject, selectedAnchorIndexes, setSmoothMap, smoothMap]);

  const visuals = useMemo(() => {
    if (!fabricCanvas || !pathObject) {
      return [] as AnchorVisual[];
    }

    const scenePath = util.transformPath(
      pathObject.path,
      pathObject.calcTransformMatrix(),
      pathObject.pathOffset
    ) as TSimplePathData;

    const sceneAnchors = parsePathAnchors(scenePath).anchors;

    return sceneAnchors.map((anchor: EditableAnchor) => ({
      index: anchor.index,
      ...mapPointToScreen(fabricCanvas, { x: anchor.x, y: anchor.y }),
      handleIn: anchor.handleIn ? mapPointToScreen(fabricCanvas, anchor.handleIn) : null,
      handleOut: anchor.handleOut ? mapPointToScreen(fabricCanvas, anchor.handleOut) : null,
    }));
  }, [fabricCanvas, pathObject, smoothMap]);

  const beginAnchorDrag = useCallback((event: React.PointerEvent<HTMLDivElement>, anchorIndex: number) => {
    if (!pathObject || !fabricCanvas) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    setSelectedAnchorIndexes((previous) => {
      const next = new Set(previous);
      if (event.shiftKey) {
        if (next.has(anchorIndex)) {
          next.delete(anchorIndex);
        } else {
          next.add(anchorIndex);
        }
      } else {
        next.clear();
        next.add(anchorIndex);
      }
      return next;
    });

    const pointer = getScenePointer(fabricCanvas, event.nativeEvent);
    const startLocalPointer = sceneToLocal(pathObject, pointer);
    const activeSelection = event.shiftKey
      ? (() => {
          const current = new Set(selectedAnchorIndexes);
          if (current.has(anchorIndex)) {
            current.delete(anchorIndex);
          } else {
            current.add(anchorIndex);
          }
          return [...current];
        })()
      : [anchorIndex];

    dragRef.current = {
      type: 'anchor',
      startPathData: clonePathData(pathObject.path),
      startLocalPointer,
      selectedAnchorIndexes: activeSelection,
      changed: false,
    };
  }, [fabricCanvas, pathObject, selectedAnchorIndexes]);

  const beginHandleDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, anchorIndex: number, handle: HandleKind) => {
      if (!pathObject) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setSelectedAnchorIndexes(new Set([anchorIndex]));

      dragRef.current = {
        type: 'handle',
        startPathData: clonePathData(pathObject.path),
        anchorIndex,
        handle,
        changed: false,
      };
    },
    [pathObject]
  );

  const handleAnchorDoubleClick = useCallback((event: React.MouseEvent<HTMLDivElement>, anchorIndex: number) => {
    if (!pathObject || !fabricCanvas) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const currentSmooth = isAnchorSmooth(anchorIndex);
    const nextSmooth = !currentSmooth;
    const nextPath = toggleAnchorSmooth(pathObject.path, anchorIndex, nextSmooth);

    pathObject.set({ path: nextPath });
    pathObject.setCoords();
    fabricCanvas.requestRenderAll();
    fabricCanvas.fire('object:modified', { target: pathObject });

    setSmoothMap({
      ...smoothMap,
      [anchorIndex]: nextSmooth,
    });
  }, [fabricCanvas, isAnchorSmooth, pathObject, setSmoothMap, smoothMap]);

  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!pathObject || !fabricCanvas || event.target !== event.currentTarget) {
      return;
    }

    const pointer = getScenePointer(fabricCanvas, event.nativeEvent);
    const transformed = util.transformPath(
      pathObject.path,
      pathObject.calcTransformMatrix(),
      pathObject.pathOffset
    ) as TSimplePathData;
    const hit = findNearestPathSegment(transformed, pointer);

    const threshold = 8 / Math.max(fabricCanvas.getZoom(), 0.0001);

    if (hit && hit.distance <= threshold) {
      const result = addAnchorPointOnSegment(pathObject.path, hit.segmentIndex, hit.t);
      if (result.anchorIndex >= 0) {
        pathObject.set({ path: result.pathData });
        pathObject.setCoords();
        fabricCanvas.requestRenderAll();
        fabricCanvas.fire('object:modified', { target: pathObject });
        setSelectedAnchorIndexes(new Set([result.anchorIndex]));
        setSmoothMap(remapSmoothMapAfterInsert(smoothMap, result.anchorIndex));
      }
      return;
    }

    if (!event.shiftKey) {
      setSelectedAnchorIndexes(new Set());
    }
  }, [fabricCanvas, pathObject, setSmoothMap, smoothMap]);

  const handleOverlayDoubleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onExit();
  }, [onExit]);

  useEffect(() => {
    if (!isActive) {
      setSelectedAnchorIndexes(new Set());
      return;
    }

    if (!isEditablePath(pathObject, fabricCanvas)) {
      onExit();
    }
  }, [fabricCanvas, isActive, onExit, pathObject]);

  if (!isActive || !pathObject || !fabricCanvas || !localParsed) {
    return null;
  }

  return (
    <div
      style={{
        ...styles.root,
        width,
        height,
      }}
      onClick={handleOverlayClick}
      onDoubleClick={handleOverlayDoubleClick}
    >
      <svg style={styles.guideLayer} width={width} height={height}>
        {visuals.map((anchor) => (
          <g key={`guides-${anchor.index}`}>
            {anchor.handleIn && (
              <line
                x1={anchor.x}
                y1={anchor.y}
                x2={anchor.handleIn.x}
                y2={anchor.handleIn.y}
                stroke="#94a3b8"
                strokeWidth={1}
              />
            )}
            {anchor.handleOut && (
              <line
                x1={anchor.x}
                y1={anchor.y}
                x2={anchor.handleOut.x}
                y2={anchor.handleOut.y}
                stroke="#94a3b8"
                strokeWidth={1}
              />
            )}
          </g>
        ))}
      </svg>

      {visuals.map((anchor) => (
        <div key={`handles-${anchor.index}`}>
          {anchor.handleIn && (
            <div
              style={{
                ...styles.handle,
                left: anchor.handleIn.x,
                top: anchor.handleIn.y,
              }}
              onPointerDown={(event) => beginHandleDrag(event, anchor.index, 'in')}
            />
          )}
          {anchor.handleOut && (
            <div
              style={{
                ...styles.handle,
                left: anchor.handleOut.x,
                top: anchor.handleOut.y,
              }}
              onPointerDown={(event) => beginHandleDrag(event, anchor.index, 'out')}
            />
          )}
          <div
            style={{
              ...styles.anchor,
              ...(selectedAnchorIndexes.has(anchor.index) ? styles.anchorActive : {}),
              left: anchor.x,
              top: anchor.y,
            }}
            onPointerDown={(event) => beginAnchorDrag(event, anchor.index)}
            onDoubleClick={(event) => handleAnchorDoubleClick(event, anchor.index)}
          />
        </div>
      ))}
    </div>
  );
}

export default PointEditingOverlay;
