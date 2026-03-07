import type { FabricCanvas } from '@/lib/illustration/types';
import type { Tool, ToolMouseEvent } from './ToolRegistry';

export interface MeasurePoint {
  x: number;
  y: number;
}

export interface Measurement {
  start: MeasurePoint;
  end: MeasurePoint;
  distance: number;
  angle: number;
  deltaX: number;
  deltaY: number;
  displayLabel: string;
}

function toPointer(canvas: FabricCanvas | null, event: ToolMouseEvent): MeasurePoint {
  if (event.pointer) {
    return { x: event.pointer.x, y: event.pointer.y };
  }

  if (canvas) {
    const pointer = canvas.getPointer(event.e);
    return { x: pointer.x, y: pointer.y };
  }

  return { x: event.e.clientX, y: event.e.clientY };
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function calculateMeasurement(start: MeasurePoint, end: MeasurePoint): Measurement {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.hypot(deltaX, deltaY);
  const angle = toDegrees(Math.atan2(deltaY, deltaX));

  return {
    start,
    end,
    distance,
    angle,
    deltaX,
    deltaY,
    displayLabel: `${distance.toFixed(1)} px | ${angle.toFixed(1)}°`,
  };
}

export class MeasureTool implements Tool {
  readonly name = 'measure';
  readonly icon = 'ruler';
  readonly cursor = 'crosshair';
  readonly shortcut = 'm';
  readonly category = 'utility';

  private canvas: FabricCanvas | null = null;
  private isActive = false;
  private measuring = false;
  private startPoint: MeasurePoint | null = null;
  private currentPoint: MeasurePoint | null = null;
  private measurement: Measurement | null = null;

  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;

    canvas.selection = false;
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;

    canvas.forEachObject((object: any) => {
      object.selectable = false;
      object.evented = false;
    });
  }

  deactivate(_canvas: FabricCanvas): void {
    this.clear();
    this.canvas = null;
    this.isActive = false;
  }

  onMouseDown(event: ToolMouseEvent): void {
    if (!this.isActive) return;

    const pointer = toPointer(this.canvas, event);
    this.startPoint = pointer;
    this.currentPoint = pointer;
    this.measuring = true;
    this.measurement = calculateMeasurement(pointer, pointer);
  }

  onMouseMove(event: ToolMouseEvent): void {
    if (!this.isActive || !this.measuring || !this.startPoint) return;

    this.currentPoint = toPointer(this.canvas, event);
    this.measurement = calculateMeasurement(this.startPoint, this.currentPoint);
  }

  onMouseUp(event: ToolMouseEvent): void {
    if (!this.isActive || !this.startPoint) return;

    this.currentPoint = toPointer(this.canvas, event);
    this.measurement = calculateMeasurement(this.startPoint, this.currentPoint);
    this.measuring = false;
  }

  getMeasurement(): Measurement | null {
    return this.measurement;
  }

  isMeasuring(): boolean {
    return this.measuring;
  }

  clear(): void {
    this.measuring = false;
    this.startPoint = null;
    this.currentPoint = null;
    this.measurement = null;
  }
}

export default MeasureTool;
