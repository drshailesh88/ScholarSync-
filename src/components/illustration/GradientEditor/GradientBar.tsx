import React, { useMemo, useRef } from 'react';
import type { GradientStop } from '@/lib/illustration/gradient/gradient-utils';

interface GradientBarProps {
  stops: GradientStop[];
  selectedStopId: string | null;
  onSelectStop: (stopId: string) => void;
  onAddStop: (offset: number) => void;
  onMoveStop: (stopId: string, offset: number) => void;
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'relative',
    paddingBottom: '18px',
  },
  bar: {
    position: 'relative',
    width: '100%',
    height: '18px',
    borderRadius: '4px',
    border: '1px solid var(--border-primary)',
    cursor: 'crosshair',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-tertiary)',
  },
  stopButton: {
    position: 'absolute',
    top: '100%',
    transform: 'translateX(-50%)',
    width: '18px',
    height: '14px',
    border: 'none',
    background: 'transparent',
    padding: 0,
    cursor: 'ew-resize',
  },
  stopTriangle: {
    width: 0,
    height: 0,
    margin: '0 auto',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '8px solid var(--text-muted)',
    transition: 'border-top-color 150ms ease, transform 150ms ease',
  },
  stopTriangleSelected: {
    borderTopColor: 'var(--accent-primary)',
    transform: 'translateY(1px)',
  },
};

function clampOffset(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function GradientBar({
  stops,
  selectedStopId,
  onSelectStop,
  onAddStop,
  onMoveStop,
}: GradientBarProps): JSX.Element {
  const barRef = useRef<HTMLDivElement | null>(null);
  const dragStopId = useRef<string | null>(null);
  const movedDuringDrag = useRef(false);

  const orderedStops = useMemo(() => [...stops].sort((a, b) => a.offset - b.offset), [stops]);

  const gradientBackground = useMemo(() => {
    const stopsString = orderedStops
      /* empty state: renders nothing when no data */
      .map((stop) => `${stop.color} ${(stop.offset * 100).toFixed(2)}%`)
      .join(', ');

    return {
      backgroundImage: [
        `linear-gradient(90deg, ${stopsString})`,
        'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
        'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      ].join(', '),
      backgroundSize: '100% 100%, 12px 12px, 12px 12px',
      backgroundPosition: '0 0, 0 0, 6px 6px',
    } as React.CSSProperties;
  }, [orderedStops]);

  const getOffsetFromClientX = (clientX: number): number => {
    const barRect = barRef.current?.getBoundingClientRect();
    if (!barRect || barRect.width <= 0) {
      return 0;
    }

    return clampOffset((clientX - barRect.left) / barRect.width);
  };

  const handleBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (movedDuringDrag.current) {
      movedDuringDrag.current = false;
      return;
    }

    onAddStop(getOffsetFromClientX(event.clientX));
  };

  const startDrag = (event: React.MouseEvent<HTMLButtonElement>, stopId: string) => {
    event.preventDefault();
    event.stopPropagation();

    onSelectStop(stopId);
    dragStopId.current = stopId;
    movedDuringDrag.current = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStopId.current) {
        return;
      }

      movedDuringDrag.current = true;
      onMoveStop(dragStopId.current, getOffsetFromClientX(moveEvent.clientX));
    };

    const handleMouseUp = () => {
      dragStopId.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.setTimeout(() => {
        movedDuringDrag.current = false;
      }, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div style={styles.root}>
      <div
        ref={barRef}
        style={{
          ...styles.bar,
          ...gradientBackground,
        }}
        onClick={handleBarClick}
      >
        {orderedStops.map((stop) => {
          const isSelected = selectedStopId === stop.id;
          return (
            <button
              key={stop.id}
              type="button"
              aria-label={`Gradient stop ${(stop.offset * 100).toFixed(0)}%`}
              title={`${(stop.offset * 100).toFixed(0)}%`}
              style={{
                ...styles.stopButton,
                left: `${(stop.offset * 100).toFixed(2)}%`,
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelectStop(stop.id);
              }}
              onMouseDown={(e) => startDrag(e, stop.id)}
            >
              <span
                style={{
                  ...styles.stopTriangle,
                  borderTopColor: stop.color,
                  ...(isSelected ? styles.stopTriangleSelected : {}),
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GradientBar;
