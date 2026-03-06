import type { FabricCanvas } from '@/lib/illustration/types';
import type { Tool, ToolKeyEvent, ToolMouseEvent, Point } from './ToolRegistry';

export interface EraserToolOptions {
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  step?: number;
  onObjectsErased?: (objects: any[]) => void;
}

export interface RectBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function intersectsCircleWithRect(
  center: Point,
  radius: number,
  rect: RectBounds
): boolean {
  const nearestX = Math.max(rect.left, Math.min(center.x, rect.left + rect.width));
  const nearestY = Math.max(rect.top, Math.min(center.y, rect.top + rect.height));
  const dx = center.x - nearestX;
  const dy = center.y - nearestY;
  return dx * dx + dy * dy <= radius * radius;
}

function getPointer(canvas: FabricCanvas | null, event: ToolMouseEvent): Point {
  if (event.pointer) {
    return { x: event.pointer.x, y: event.pointer.y };
  }

  if (canvas) {
    const pointer = canvas.getPointer(event.e);
    return { x: pointer.x, y: pointer.y };
  }

  return { x: event.e.clientX, y: event.e.clientY };
}

function isErasableObject(object: any): boolean {
  if (!object || object.excludeFromExport || object.isGrid || object.get?.('isGrid')) {
    return false;
  }

  const dataType = object.get?.('data-type');
  return dataType !== 'grid';
}

export class EraserTool implements Tool {
  readonly name = 'eraser';
  readonly icon = 'eraser';
  readonly cursor = 'none';
  readonly category = 'utility';

  private canvas: FabricCanvas | null = null;
  private isActive = false;
  private isDragging = false;
  private lastPointer: Point | null = null;
  private erasedInGesture: Set<any> = new Set();

  private options: Required<Omit<EraserToolOptions, 'onObjectsErased'>> & {
    onObjectsErased?: (objects: any[]) => void;
  };

  private size: number;

  constructor(options: EraserToolOptions = {}) {
    this.options = {
      initialSize: options.initialSize ?? 24,
      minSize: options.minSize ?? 4,
      maxSize: options.maxSize ?? 256,
      step: options.step ?? 2,
      onObjectsErased: options.onObjectsErased,
    };

    this.size = this.options.initialSize;
  }

  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;
    this.isDragging = false;
    this.lastPointer = null;

    canvas.selection = false;
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;

    canvas.forEachObject((obj: any) => {
      obj.selectable = false;
      obj.evented = true;
    });
  }

  deactivate(_canvas: FabricCanvas): void {
    this.isActive = false;
    this.isDragging = false;
    this.lastPointer = null;
    this.erasedInGesture.clear();
    this.canvas = null;
  }

  onMouseDown(event: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    this.isDragging = true;
    this.erasedInGesture.clear();

    const pointer = getPointer(this.canvas, event);
    this.lastPointer = pointer;

    if (event.target && isErasableObject(event.target)) {
      this.eraseObject(event.target);
    } else {
      this.eraseAtPoint(pointer);
    }

    this.canvas.requestRenderAll();
  }

  onMouseMove(event: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    const pointer = getPointer(this.canvas, event);

    if (this.isDragging && this.lastPointer) {
      this.eraseAlongSegment(this.lastPointer, pointer);
      this.canvas.requestRenderAll();
    }

    this.lastPointer = pointer;
  }

  onMouseUp(_event: ToolMouseEvent): void {
    if (!this.isActive) return;

    this.isDragging = false;
    this.lastPointer = null;

    if (this.erasedInGesture.size > 0) {
      this.options.onObjectsErased?.(Array.from(this.erasedInGesture));
    }

    this.erasedInGesture.clear();
  }

  onKeyDown(event: ToolKeyEvent): void {
    if (!this.isActive) return;

    if (event.key === '[') {
      this.decreaseSize();
      event.preventDefault();
    }

    if (event.key === ']') {
      this.increaseSize();
      event.preventDefault();
    }
  }

  getSize(): number {
    return this.size;
  }

  setSize(nextSize: number): number {
    const clamped = Math.min(this.options.maxSize, Math.max(this.options.minSize, nextSize));
    this.size = clamped;
    return this.size;
  }

  increaseSize(): number {
    return this.setSize(this.size + this.options.step);
  }

  decreaseSize(): number {
    return this.setSize(this.size - this.options.step);
  }

  private eraseAlongSegment(start: Point, end: Point): void {
    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const step = Math.max(1, this.size / 3);
    const samples = Math.max(1, Math.ceil(distance / step));

    for (let index = 0; index <= samples; index += 1) {
      const t = index / samples;
      this.eraseAtPoint({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
      });
    }
  }

  private eraseAtPoint(point: Point): void {
    if (!this.canvas) return;

    const radius = this.size / 2;

    const candidates = this.canvas
      .getObjects()
      .filter((object: any) => isErasableObject(object));

    candidates.forEach((object: any) => {
      const bounds = object.getBoundingRect?.();
      if (!bounds) return;

      if (
        intersectsCircleWithRect(point, radius, {
          left: bounds.left,
          top: bounds.top,
          width: bounds.width,
          height: bounds.height,
        })
      ) {
        this.eraseObject(object);
      }
    });
  }

  private eraseObject(object: any): void {
    if (!this.canvas || this.erasedInGesture.has(object)) return;

    this.erasedInGesture.add(object);
    this.canvas.remove(object);
  }
}

export default EraserTool;
