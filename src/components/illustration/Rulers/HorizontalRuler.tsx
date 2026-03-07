import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

export type RulerUnit = 'px' | 'pt';

export const RULER_STRIP_SIZE = 24;

export function getRulerScreenPosition(value: number, zoom: number, pan: number): number {
  return value * zoom + pan;
}

function formatRulerLabel(value: number, unit: RulerUnit): string {
  if (unit === 'pt') {
    return String(Math.round((value * 72) / 96));
  }
  return String(Math.round(value));
}

export interface HorizontalRulerProps {
  width: number;
  zoom: number;
  panX: number;
  unit: RulerUnit;
  onStartGuideDrag?: (event: ReactPointerEvent<HTMLDivElement>) => void;
}

export function HorizontalRuler({ width, zoom, panX, unit, onStartGuideDrag }: HorizontalRulerProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0 || zoom <= 0) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.floor(RULER_STRIP_SIZE * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${RULER_STRIP_SIZE}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rootStyles = getComputedStyle(document.documentElement);
    const background = rootStyles.getPropertyValue('--bg-secondary').trim() || '#1f1f1f';
    const tickColor = rootStyles.getPropertyValue('--text-muted').trim() || '#8f8f8f';
    const borderColor = rootStyles.getPropertyValue('--border-primary').trim() || '#2e2e2e';

    context.clearRect(0, 0, width, RULER_STRIP_SIZE);
    context.fillStyle = background;
    context.fillRect(0, 0, width, RULER_STRIP_SIZE);

    context.strokeStyle = borderColor;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, RULER_STRIP_SIZE - 0.5);
    context.lineTo(width, RULER_STRIP_SIZE - 0.5);
    context.stroke();

    context.strokeStyle = tickColor;
    context.fillStyle = tickColor;
    context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
    context.textAlign = 'center';
    context.textBaseline = 'top';

    const tickStep = 10;
    const worldStart = Math.floor((0 - panX) / (tickStep * zoom)) * tickStep - tickStep;
    const worldEnd = Math.ceil((width - panX) / (tickStep * zoom)) * tickStep + tickStep;

    for (let value = worldStart; value <= worldEnd; value += tickStep) {
      const x = getRulerScreenPosition(value, zoom, panX);
      if (x < -1 || x > width + 1) {
        continue;
      }

      let tickHeight = 6;
      if (value % 100 === 0) {
        tickHeight = 14;
      } else if (value % 50 === 0) {
        tickHeight = 10;
      }

      const crispX = Math.round(x) + 0.5;
      context.beginPath();
      context.moveTo(crispX, RULER_STRIP_SIZE - 0.5);
      context.lineTo(crispX, RULER_STRIP_SIZE - tickHeight - 0.5);
      context.stroke();

      if (value % 100 === 0) {
        context.fillText(formatRulerLabel(value, unit), x, 3);
      }
    }
  }, [panX, unit, width, zoom]);

  return (
    <div
      role="presentation"
      onPointerDown={onStartGuideDrag}
      style={{
        width,
        height: RULER_STRIP_SIZE,
        cursor: 'ns-resize',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default HorizontalRuler;
