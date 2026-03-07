import { Line, Path as FabricPath, util, type TSimplePathData } from 'fabric';
import {
  parsePathAnchors,
  serializePathAnchors,
  type EditableAnchor,
  type PathPoint,
} from '@/lib/illustration/canvas/path-editing';

interface OffsetStyle {
  fill?: unknown;
  stroke?: unknown;
  strokeWidth?: unknown;
  strokeLineCap?: unknown;
  strokeLineJoin?: unknown;
  strokeDashArray?: unknown;
  strokeMiterLimit?: unknown;
  strokeUniform?: unknown;
  opacity?: unknown;
  globalCompositeOperation?: unknown;
}

function clonePathData(pathData: TSimplePathData): TSimplePathData {
  return pathData.map((command) => [...command]) as TSimplePathData;
}

function polygonSignedArea(points: PathPoint[]): number {
  if (points.length < 3) {
    return 0;
  }

  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return area / 2;
}

function intersectLines(
  p1: PathPoint,
  p2: PathPoint,
  p3: PathPoint,
  p4: PathPoint
): PathPoint | null {
  const x1 = p1.x;
  const y1 = p1.y;
  const x2 = p2.x;
  const y2 = p2.y;
  const x3 = p3.x;
  const y3 = p3.y;
  const x4 = p4.x;
  const y4 = p4.y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 1e-9) {
    return null;
  }

  const determinant1 = x1 * y2 - y1 * x2;
  const determinant2 = x3 * y4 - y3 * x4;

  const px = (determinant1 * (x3 - x4) - (x1 - x2) * determinant2) / denominator;
  const py = (determinant1 * (y3 - y4) - (y1 - y2) * determinant2) / denominator;

  return { x: px, y: py };
}

function offsetPolygon(points: PathPoint[], distance: number): PathPoint[] {
  const count = points.length;
  if (count < 3 || Math.abs(distance) < 1e-9) {
    return points.map((point) => ({ ...point }));
  }

  const area = polygonSignedArea(points);
  const outwardSign = area >= 0 ? 1 : -1;

  const shiftedSegments: Array<{ start: PathPoint; end: PathPoint }> = [];

  for (let index = 0; index < count; index += 1) {
    const start = points[index];
    const end = points[(index + 1) % count];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);

    if (length < 1e-9) {
      shiftedSegments.push({ start: { ...start }, end: { ...end } });
      continue;
    }

    const normalX = (outwardSign * dy) / length;
    const normalY = (-outwardSign * dx) / length;

    shiftedSegments.push({
      start: {
        x: start.x + normalX * distance,
        y: start.y + normalY * distance,
      },
      end: {
        x: end.x + normalX * distance,
        y: end.y + normalY * distance,
      },
    });
  }

  const result: PathPoint[] = [];

  for (let index = 0; index < count; index += 1) {
    const previous = shiftedSegments[(index - 1 + count) % count];
    const current = shiftedSegments[index];

    const intersection = intersectLines(
      previous.start,
      previous.end,
      current.start,
      current.end
    );

    result.push(intersection ?? { ...current.start });
  }

  return result;
}

function centroid(points: PathPoint[]): PathPoint {
  if (points.length === 0) {
    return { x: 0, y: 0 };
  }

  const sum = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / points.length,
    y: sum.y / points.length,
  };
}

function radialOffset(point: PathPoint, origin: PathPoint, distance: number): PathPoint {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const length = Math.hypot(dx, dy);

  if (length < 1e-9) {
    return { ...point };
  }

  return {
    x: point.x + (dx / length) * distance,
    y: point.y + (dy / length) * distance,
  };
}

function hasBezierHandles(anchors: EditableAnchor[]): boolean {
  return anchors.some((anchor) => anchor.handleIn || anchor.handleOut);
}

function cloneStyle(object: OffsetStyle): Record<string, unknown> {
  return {
    fill: object.fill,
    stroke: object.stroke,
    strokeWidth: object.strokeWidth,
    strokeLineCap: object.strokeLineCap,
    strokeLineJoin: object.strokeLineJoin,
    strokeDashArray: Array.isArray(object.strokeDashArray)
      ? [...(object.strokeDashArray as number[])]
      : undefined,
    strokeMiterLimit: object.strokeMiterLimit,
    strokeUniform: object.strokeUniform,
    opacity: object.opacity,
    globalCompositeOperation: object.globalCompositeOperation,
    selectable: true,
    evented: true,
  };
}

export function offsetPathData(pathData: TSimplePathData, distance: number): TSimplePathData | null {
  if (!Number.isFinite(distance)) {
    return null;
  }

  if (Math.abs(distance) < 1e-9) {
    return clonePathData(pathData);
  }

  const parsed = parsePathAnchors(pathData);
  if (parsed.anchors.length < 2) {
    return null;
  }

  const polygonEligible = parsed.closed && !hasBezierHandles(parsed.anchors);

  if (polygonEligible) {
    const basePoints = parsed.anchors.map((anchor) => ({ x: anchor.x, y: anchor.y }));
    const offsetPoints = offsetPolygon(basePoints, distance);

    const nextAnchors: EditableAnchor[] = offsetPoints.map((point, index) => ({
      index,
      x: point.x,
      y: point.y,
      handleIn: null,
      handleOut: null,
      smooth: false,
    }));

    return serializePathAnchors({ anchors: nextAnchors, closed: true });
  }

  const center = centroid(parsed.anchors.map((anchor) => ({ x: anchor.x, y: anchor.y })));

  const nextAnchors: EditableAnchor[] = parsed.anchors.map((anchor, index) => ({
    index,
    ...radialOffset({ x: anchor.x, y: anchor.y }, center, distance),
    handleIn: anchor.handleIn ? radialOffset(anchor.handleIn, center, distance) : null,
    handleOut: anchor.handleOut ? radialOffset(anchor.handleOut, center, distance) : null,
    smooth: anchor.smooth,
  }));

  return serializePathAnchors({ anchors: nextAnchors, closed: parsed.closed });
}

export function createOffsetPath(pathObject: FabricPath, distance: number): FabricPath | null {
  const transformedPath = util.transformPath(
    pathObject.path,
    pathObject.calcTransformMatrix(),
    pathObject.pathOffset
  ) as TSimplePathData;

  const offsetData = offsetPathData(transformedPath, distance);
  if (!offsetData) {
    return null;
  }

  return new FabricPath(offsetData, cloneStyle(pathObject));
}

export function createOffsetLine(lineObject: Line, distance: number): Line | null {
  const x1 = Number(lineObject.x1 ?? 0);
  const y1 = Number(lineObject.y1 ?? 0);
  const x2 = Number(lineObject.x2 ?? 0);
  const y2 = Number(lineObject.y2 ?? 0);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);

  if (length < 1e-9 || !Number.isFinite(distance)) {
    return null;
  }

  const normalX = -dy / length;
  const normalY = dx / length;

  return new Line(
    [
      x1 + normalX * distance,
      y1 + normalY * distance,
      x2 + normalX * distance,
      y2 + normalY * distance,
    ],
    cloneStyle(lineObject)
  );
}

export default offsetPathData;
