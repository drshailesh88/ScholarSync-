import {
  ActiveSelection,
  Line,
  Path as FabricPath,
  util,
  type TSimplePathData,
} from 'fabric';
import type { FabricCanvas } from '@/lib/illustration/types';
import {
  addAnchorPointOnSegment,
  findNearestPathSegment,
  parsePathAnchors,
  serializePathAnchors,
  type EditableAnchor,
} from '@/lib/illustration/canvas/path-editing';
import type { Tool, ToolMouseEvent } from './ToolRegistry';

export interface ScissorsToolOptions {
  hitThreshold?: number;
  onSplit?: (objects: any[]) => void;
}

interface Point {
  x: number;
  y: number;
}

const SPLIT_EDGE_EPSILON = 1e-4;

function toPointer(canvas: FabricCanvas | null, event: ToolMouseEvent): Point {
  if (event.pointer) {
    return { x: event.pointer.x, y: event.pointer.y };
  }

  if (canvas) {
    const pointer = canvas.getPointer(event.e);
    return { x: pointer.x, y: pointer.y };
  }

  return { x: event.e.clientX, y: event.e.clientY };
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function projectionOnSegment(start: Point, end: Point, point: Point): {
  t: number;
  projected: Point;
  distance: number;
} {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lenSq = dx * dx + dy * dy;

  if (lenSq <= SPLIT_EDGE_EPSILON) {
    const distance = Math.hypot(point.x - start.x, point.y - start.y);
    return { t: 0, projected: start, distance };
  }

  const t = clamp01(((point.x - start.x) * dx + (point.y - start.y) * dy) / lenSq);
  const projected = {
    x: start.x + dx * t,
    y: start.y + dy * t,
  };

  return {
    t,
    projected,
    distance: Math.hypot(point.x - projected.x, point.y - projected.y),
  };
}

function cloneShapeStyle(source: any): Record<string, unknown> {
  return {
    fill: source.fill,
    stroke: source.stroke,
    strokeWidth: source.strokeWidth,
    strokeLineCap: source.strokeLineCap,
    strokeLineJoin: source.strokeLineJoin,
    strokeDashArray: Array.isArray(source.strokeDashArray) ? [...source.strokeDashArray] : undefined,
    strokeMiterLimit: source.strokeMiterLimit,
    strokeUniform: source.strokeUniform,
    opacity: source.opacity,
    globalCompositeOperation: source.globalCompositeOperation,
    selectable: true,
    evented: true,
  };
}

function cloneAnchors(anchors: EditableAnchor[]): EditableAnchor[] {
  return anchors.map((anchor, index) => ({
    index,
    x: anchor.x,
    y: anchor.y,
    handleIn: anchor.handleIn ? { ...anchor.handleIn } : null,
    handleOut: anchor.handleOut ? { ...anchor.handleOut } : null,
    smooth: anchor.smooth,
  }));
}

function splitOpenPathAtAnchor(pathData: TSimplePathData, anchorIndex: number): {
  first: TSimplePathData;
  second: TSimplePathData;
} | null {
  const parsed = parsePathAnchors(pathData);

  if (parsed.closed || parsed.anchors.length < 3) {
    return null;
  }

  if (anchorIndex <= 0 || anchorIndex >= parsed.anchors.length - 1) {
    return null;
  }

  const firstAnchors = cloneAnchors(parsed.anchors.slice(0, anchorIndex + 1));
  const secondAnchors = cloneAnchors(parsed.anchors.slice(anchorIndex));

  if (firstAnchors.length < 2 || secondAnchors.length < 2) {
    return null;
  }

  return {
    first: serializePathAnchors({ anchors: firstAnchors, closed: false }),
    second: serializePathAnchors({ anchors: secondAnchors, closed: false }),
  };
}

export interface SplitLineResult {
  first: [number, number, number, number];
  second: [number, number, number, number];
  point: Point;
}

export function splitLineAtPoint(
  line: { x1?: number; y1?: number; x2?: number; y2?: number },
  point: Point,
  threshold = 6
): SplitLineResult | null {
  const x1 = Number(line.x1 ?? 0);
  const y1 = Number(line.y1 ?? 0);
  const x2 = Number(line.x2 ?? 0);
  const y2 = Number(line.y2 ?? 0);

  const hit = projectionOnSegment({ x: x1, y: y1 }, { x: x2, y: y2 }, point);

  if (hit.distance > threshold) {
    return null;
  }

  if (hit.t <= SPLIT_EDGE_EPSILON || hit.t >= 1 - SPLIT_EDGE_EPSILON) {
    return null;
  }

  return {
    first: [x1, y1, hit.projected.x, hit.projected.y],
    second: [hit.projected.x, hit.projected.y, x2, y2],
    point: hit.projected,
  };
}

export class ScissorsTool implements Tool {
  readonly name = 'scissors';
  readonly icon = 'scissors';
  readonly cursor = 'crosshair';
  readonly shortcut = 'c';
  readonly category = 'utility';

  private canvas: FabricCanvas | null = null;
  private isActive = false;
  private options: Required<Omit<ScissorsToolOptions, 'onSplit'>> & {
    onSplit?: (objects: any[]) => void;
  };

  constructor(options: ScissorsToolOptions = {}) {
    this.options = {
      hitThreshold: options.hitThreshold ?? 8,
      onSplit: options.onSplit,
    };
  }

  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;

    canvas.selection = false;
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;

    canvas.forEachObject((object: any) => {
      object.selectable = false;
      object.evented = true;
    });
  }

  deactivate(_canvas: FabricCanvas): void {
    this.canvas = null;
    this.isActive = false;
  }

  onMouseDown(event: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas || !event.target) {
      return;
    }

    const pointer = toPointer(this.canvas, event);

    if (event.target instanceof Line) {
      this.splitLine(event.target, pointer);
      return;
    }

    if (event.target instanceof FabricPath) {
      this.splitPath(event.target, pointer);
    }
  }

  private splitLine(line: Line, pointer: Point): void {
    if (!this.canvas) return;

    const zoom = Math.max(this.canvas.getZoom() || 1, 1e-6);
    const threshold = this.options.hitThreshold / zoom;
    const split = splitLineAtPoint(line, pointer, threshold);

    if (!split) {
      return;
    }

    const style = cloneShapeStyle(line);
    const firstLine = new Line(split.first, style);
    const secondLine = new Line(split.second, style);

    this.canvas.remove(line);
    this.canvas.add(firstLine);
    this.canvas.add(secondLine);

    this.selectSplitObjects([firstLine, secondLine]);
  }

  private splitPath(path: FabricPath, pointer: Point): void {
    if (!this.canvas) return;

    const transformedPath = util.transformPath(
      path.path,
      path.calcTransformMatrix(),
      path.pathOffset
    ) as TSimplePathData;

    const hit = findNearestPathSegment(transformedPath, pointer);

    if (!hit) {
      return;
    }

    const zoom = Math.max(this.canvas.getZoom() || 1, 1e-6);
    const threshold = this.options.hitThreshold / zoom;

    if (hit.distance > threshold) {
      return;
    }

    const withSplitAnchor = addAnchorPointOnSegment(transformedPath, hit.segmentIndex, hit.t);
    const splitData = splitOpenPathAtAnchor(withSplitAnchor.pathData, withSplitAnchor.anchorIndex);

    if (!splitData) {
      return;
    }

    const style = cloneShapeStyle(path);
    const firstPath = new FabricPath(splitData.first, style);
    const secondPath = new FabricPath(splitData.second, style);

    this.canvas.remove(path);
    this.canvas.add(firstPath);
    this.canvas.add(secondPath);

    this.selectSplitObjects([firstPath, secondPath]);
  }

  private selectSplitObjects(objects: any[]): void {
    if (!this.canvas || objects.length === 0) return;

    const selection = new ActiveSelection(objects, { canvas: this.canvas });
    this.canvas.setActiveObject(selection);
    this.canvas.requestRenderAll();
    this.canvas.fire('object:modified', { target: objects[0] });
    this.options.onSplit?.(objects);
  }
}

export default ScissorsTool;
