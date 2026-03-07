import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { RULER_STRIP_SIZE, type RulerUnit, getRulerScreenPosition } from './HorizontalRuler';

function formatRulerLabel(value: number, unit: RulerUnit): string {
  if (unit === 'pt') {
    return String(Math.round((value * 72) / 96));
  }
  return String(Math.round(value));
}

export interface VerticalRulerProps {
  height: number;
  zoom: number;
  panY: number;
  unit: RulerUnit;
  onStartGuideDrag?: (event: ReactPointerEvent<HTMLDivElement>) => void;
}

export function VerticalRuler({ height, zoom, panY, unit, onStartGuideDrag }: VerticalRulerProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || height <= 0 || zoom <= 0) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(RULER_STRIP_SIZE * dpr);
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${RULER_STRIP_SIZE}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rootStyles = getComputedStyle(document.documentElement);
    const background = rootStyles.getPropertyValue('--bg-secondary').trim() || '#1f1f1f';
    const tickColor = rootStyles.getPropertyValue('--text-muted').trim() || '#8f8f8f';
    const borderColor = rootStyles.getPropertyValue('--border-primary').trim() || '#2e2e2e';

    context.clearRect(0, 0, RULER_STRIP_SIZE, height);
    context.fillStyle = background;
    context.fillRect(0, 0, RULER_STRIP_SIZE, height);

    context.strokeStyle = borderColor;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(RULER_STRIP_SIZE - 0.5, 0);
    context.lineTo(RULER_STRIP_SIZE - 0.5, height);
    context.stroke();

    context.strokeStyle = tickColor;
    context.fillStyle = tickColor;
    context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
    context.textAlign = 'left';
    context.textBaseline = 'middle';

    const tickStep = 10;
    const worldStart = Math.floor((0 - panY) / (tickStep * zoom)) * tickStep - tickStep;
    const worldEnd = Math.ceil((height - panY) / (tickStep * zoom)) * tickStep + tickStep;

    for (let value = worldStart; value <= worldEnd; value += tickStep) {
      const y = getRulerScreenPosition(value, zoom, panY);
      if (y < -1 || y > height + 1) {
        continue;
      }

      let tickWidth = 6;
      if (value % 100 === 0) {
        tickWidth = 14;
      } else if (value % 50 === 0) {
        tickWidth = 10;
      }

      const crispY = Math.round(y) + 0.5;
      context.beginPath();
      context.moveTo(RULER_STRIP_SIZE - 0.5, crispY);
      context.lineTo(RULER_STRIP_SIZE - tickWidth - 0.5, crispY);
      context.stroke();

      if (value % 100 === 0) {
        context.fillText(formatRulerLabel(value, unit), 2, y);
      }
    }
  }, [height, panY, unit, zoom]);

  return (
    <div
      role="presentation"
      onPointerDown={onStartGuideDrag}
      style={{
        width: RULER_STRIP_SIZE,
        height,
        cursor: 'ew-resize',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default VerticalRuler;
