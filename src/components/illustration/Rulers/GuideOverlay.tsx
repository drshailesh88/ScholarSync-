import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type GuideOrientation = 'horizontal' | 'vertical';

export interface GuidesState {
  horizontal: number[];
  vertical: number[];
}

export interface GuideSnapResult {
  snappedPosition: number;
  snappedGuide: number | null;
}

export function snapAxisToGuides(params: {
  position: number;
  size: number;
  guides: number[];
  threshold?: number;
}): GuideSnapResult {
  const { position, size, guides, threshold = 5 } = params;

  let bestDelta = Number.POSITIVE_INFINITY;
  let snappedGuide: number | null = null;

  const edges = [position, position + size / 2, position + size];

  for (const guide of guides) {
    for (const edge of edges) {
      const delta = guide - edge;
      const absDelta = Math.abs(delta);
      if (absDelta <= threshold && absDelta < Math.abs(bestDelta)) {
        bestDelta = delta;
        snappedGuide = guide;
      }
    }
  }

  if (snappedGuide === null || !Number.isFinite(bestDelta)) {
    return {
      snappedPosition: position,
      snappedGuide: null,
    };
  }

  return {
    snappedPosition: position + bestDelta,
    snappedGuide,
  };
}

export function shouldDeleteGuideOnDrop(
  orientation: GuideOrientation,
  localX: number,
  localY: number
): boolean {
  if (orientation === 'horizontal') {
    return localY < 0;
  }
  return localX < 0;
}

interface ActiveGuideDrag {
  orientation: GuideOrientation;
  isNew: boolean;
  index: number;
  position: number;
}

export interface CreateGuideRequest {
  id: number;
  orientation: GuideOrientation;
  clientX: number;
  clientY: number;
}

export interface GuideOverlayProps {
  width: number;
  height: number;
  zoom: number;
  pan: { x: number; y: number };
  guides: GuidesState;
  showGuides: boolean;
  snapIndicator?: { horizontal: number | null; vertical: number | null };
  createGuideRequest?: CreateGuideRequest | null;
  onAddGuide: (orientation: GuideOrientation, position: number) => void;
  onUpdateGuide: (orientation: GuideOrientation, index: number, position: number) => void;
  onRemoveGuide: (orientation: GuideOrientation, index: number) => void;
}

const GUIDE_COLOR = 'rgba(0, 212, 255, 0.7)';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function GuideOverlay({
  width,
  height,
  zoom,
  pan,
  guides,
  showGuides,
  snapIndicator,
  createGuideRequest,
  onAddGuide,
  onUpdateGuide,
  onRemoveGuide,
}: GuideOverlayProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDrag, setActiveDrag] = useState<ActiveGuideDrag | null>(null);

  const getPositionFromClient = useCallback(
    (orientation: GuideOrientation, clientX: number, clientY: number): number | null => {
      if (!containerRef.current || zoom <= 0) {
        return null;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      if (orientation === 'horizontal') {
        return (localY - pan.y) / zoom;
      }

      return (localX - pan.x) / zoom;
    },
    [pan.x, pan.y, zoom]
  );

  const toScreenPosition = useCallback(
    (orientation: GuideOrientation, position: number): number => {
      if (orientation === 'horizontal') {
        return position * zoom + pan.y;
      }
      return position * zoom + pan.x;
    },
    [pan.x, pan.y, zoom]
  );

  const finalizeDrag = useCallback(
    (event: PointerEvent, drag: ActiveGuideDrag) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const isDelete = shouldDeleteGuideOnDrop(drag.orientation, localX, localY);

      if (isDelete) {
        if (!drag.isNew) {
          onRemoveGuide(drag.orientation, drag.index);
        }
        return;
      }

      const rawPosition = getPositionFromClient(drag.orientation, event.clientX, event.clientY);
      if (rawPosition === null) {
        return;
      }

      const maxValue = drag.orientation === 'horizontal' ? height : width;
      const clamped = clamp(rawPosition, 0, maxValue);

      if (drag.isNew) {
        onAddGuide(drag.orientation, clamped);
      } else {
        onUpdateGuide(drag.orientation, drag.index, clamped);
      }
    },
    [getPositionFromClient, height, onAddGuide, onRemoveGuide, onUpdateGuide, width]
  );

  useEffect(() => {
    if (!activeDrag) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nextPosition = getPositionFromClient(activeDrag.orientation, event.clientX, event.clientY);
      if (nextPosition === null) {
        return;
      }

      setActiveDrag((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          position: nextPosition,
        };
      });
    };

    const handlePointerUp = (event: PointerEvent) => {
      finalizeDrag(event, activeDrag);
      setActiveDrag(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [activeDrag, finalizeDrag, getPositionFromClient]);

  useEffect(() => {
    if (!createGuideRequest) {
      return;
    }

    const position = getPositionFromClient(
      createGuideRequest.orientation,
      createGuideRequest.clientX,
      createGuideRequest.clientY
    );

    if (position === null) {
      return;
    }

    setActiveDrag({
      orientation: createGuideRequest.orientation,
      isNew: true,
      index: -1,
      position,
    });
  }, [createGuideRequest, getPositionFromClient]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    if (!showGuides) {
      return;
    }

    context.strokeStyle = GUIDE_COLOR;
    context.lineWidth = 1;

    const drawHorizontal = (y: number) => {
      const screenY = toScreenPosition('horizontal', y);
      if (screenY < -1 || screenY > height + 1) {
        return;
      }
      context.beginPath();
      context.moveTo(0, Math.round(screenY) + 0.5);
      context.lineTo(width, Math.round(screenY) + 0.5);
      context.stroke();
    };

    const drawVertical = (x: number) => {
      const screenX = toScreenPosition('vertical', x);
      if (screenX < -1 || screenX > width + 1) {
        return;
      }
      context.beginPath();
      context.moveTo(Math.round(screenX) + 0.5, 0);
      context.lineTo(Math.round(screenX) + 0.5, height);
      context.stroke();
    };

    guides.horizontal.forEach(drawHorizontal);
    guides.vertical.forEach(drawVertical);

    if (activeDrag) {
      if (activeDrag.orientation === 'horizontal') {
        drawHorizontal(activeDrag.position);
      } else {
        drawVertical(activeDrag.position);
      }
    }

    if (snapIndicator?.horizontal !== null && snapIndicator?.horizontal !== undefined) {
      context.save();
      context.strokeStyle = 'rgba(0, 212, 255, 1)';
      context.lineWidth = 1;
      context.setLineDash([4, 4]);
      drawHorizontal(snapIndicator.horizontal);
      context.restore();
    }

    if (snapIndicator?.vertical !== null && snapIndicator?.vertical !== undefined) {
      context.save();
      context.strokeStyle = 'rgba(0, 212, 255, 1)';
      context.lineWidth = 1;
      context.setLineDash([4, 4]);
      drawVertical(snapIndicator.vertical);
      context.restore();
    }
  }, [
    activeDrag,
    guides.horizontal,
    guides.vertical,
    height,
    showGuides,
    snapIndicator?.horizontal,
    snapIndicator?.vertical,
    toScreenPosition,
    width,
  ]);

  const renderedGuides = useMemo(
    () => ({
      horizontal:
        showGuides
          ? guides.horizontal.map((position, index) => ({
              index,
              position,
              screen: toScreenPosition('horizontal', position),
            }))
          : [],
      vertical:
        showGuides
          ? guides.vertical.map((position, index) => ({
              index,
              position,
              screen: toScreenPosition('vertical', position),
            }))
          : [],
    }),
    [guides.horizontal, guides.vertical, showGuides, toScreenPosition]
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {renderedGuides.horizontal.map((guide) => (
          <div
            key={`h-${guide.index}`}
            onPointerDown={(event) => {
              event.preventDefault();
              const position = getPositionFromClient('horizontal', event.clientX, event.clientY);
              if (position === null) {
                return;
              }
              setActiveDrag({
                orientation: 'horizontal',
                isNew: false,
                index: guide.index,
                position,
              });
            }}
            onDoubleClick={() => {
              const next = window.prompt('Set horizontal guide position (px)', String(Math.round(guide.position)));
              if (!next) {
                return;
              }
              const parsed = Number(next);
              if (!Number.isFinite(parsed)) {
                return;
              }
              onUpdateGuide('horizontal', guide.index, clamp(parsed, 0, height));
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: Math.round(guide.screen) - 4,
              width: '100%',
              height: 8,
              pointerEvents: 'auto',
              cursor: 'ns-resize',
            }}
          />
        ))}

        {renderedGuides.vertical.map((guide) => (
          <div
            key={`v-${guide.index}`}
            onPointerDown={(event) => {
              event.preventDefault();
              const position = getPositionFromClient('vertical', event.clientX, event.clientY);
              if (position === null) {
                return;
              }
              setActiveDrag({
                orientation: 'vertical',
                isNew: false,
                index: guide.index,
                position,
              });
            }}
            onDoubleClick={() => {
              const next = window.prompt('Set vertical guide position (px)', String(Math.round(guide.position)));
              if (!next) {
                return;
              }
              const parsed = Number(next);
              if (!Number.isFinite(parsed)) {
                return;
              }
              onUpdateGuide('vertical', guide.index, clamp(parsed, 0, width));
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: Math.round(guide.screen) - 4,
              width: 8,
              height: '100%',
              pointerEvents: 'auto',
              cursor: 'ew-resize',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GuideOverlay;
