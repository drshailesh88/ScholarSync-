import {
  Ellipse,
  FabricObject,
  Group,
  Path as FabricPath,
  Polygon,
  Rect,
  util,
} from 'fabric';
import paper from 'paper';

export interface FabricPathStyle {
  fill?: string | null;
  stroke?: string | null;
  strokeWidth?: number;
  strokeLineCap?: CanvasLineCap;
  strokeLineJoin?: CanvasLineJoin;
  strokeDashArray?: number[] | null;
  opacity?: number;
}

function formatNumber(value: number): string {
  const rounded = Math.abs(value) < 1e-6 ? 0 : Number(value.toFixed(4));
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function formatPoint(x: number, y: number): string {
  return `${formatNumber(x)},${formatNumber(y)}`;
}

function toPathStyle(object: FabricObject): FabricPathStyle {
  const strokeLineCap = object.strokeLineCap as CanvasLineCap | undefined;
  const strokeLineJoin = object.strokeLineJoin as CanvasLineJoin | undefined;

  return {
    fill: typeof object.fill === 'string' ? object.fill : null,
    stroke: typeof object.stroke === 'string' ? object.stroke : null,
    strokeWidth: typeof object.strokeWidth === 'number' ? object.strokeWidth : 0,
    strokeLineCap,
    strokeLineJoin,
    strokeDashArray: Array.isArray(object.strokeDashArray)
      ? [...object.strokeDashArray]
      : null,
    opacity: typeof object.opacity === 'number' ? object.opacity : 1,
  };
}

function rectToSvgPath(rect: Rect): string {
  const width = Math.max(0, rect.width ?? 0);
  const height = Math.max(0, rect.height ?? 0);
  const matrix = rect.calcTransformMatrix();

  const corners = [
    util.transformPoint({ x: -width / 2, y: -height / 2 }, matrix),
    util.transformPoint({ x: width / 2, y: -height / 2 }, matrix),
    util.transformPoint({ x: width / 2, y: height / 2 }, matrix),
    util.transformPoint({ x: -width / 2, y: height / 2 }, matrix),
  ];

  return [
    `M ${formatPoint(corners[0].x, corners[0].y)}`,
    `L ${formatPoint(corners[1].x, corners[1].y)}`,
    `L ${formatPoint(corners[2].x, corners[2].y)}`,
    `L ${formatPoint(corners[3].x, corners[3].y)}`,
    'Z',
  ].join(' ');
}

function ellipseToSvgPath(ellipse: Ellipse): string {
  const center = ellipse.getCenterPoint();
  const rx = Math.abs((ellipse.rx ?? (ellipse.width ?? 0) / 2) * (ellipse.scaleX ?? 1));
  const ry = Math.abs((ellipse.ry ?? (ellipse.height ?? 0) / 2) * (ellipse.scaleY ?? 1));

  if (rx <= 0 || ry <= 0) {
    throw new Error('Ellipse has invalid radius for path conversion');
  }

  const startX = center.x - rx;
  const endX = center.x + rx;

  return [
    `M ${formatPoint(startX, center.y)}`,
    `A ${formatNumber(rx)},${formatNumber(ry)} 0 1 0 ${formatPoint(endX, center.y)}`,
    `A ${formatNumber(rx)},${formatNumber(ry)} 0 1 0 ${formatPoint(startX, center.y)}`,
    'Z',
  ].join(' ');
}

function polygonToSvgPath(polygon: Polygon): string {
  const points = polygon.points;
  if (!points || points.length === 0) {
    throw new Error('Polygon has no points to convert');
  }

  const matrix = polygon.calcTransformMatrix();
  const offsetX = polygon.pathOffset?.x ?? 0;
  const offsetY = polygon.pathOffset?.y ?? 0;

  const transformed = points.map((point) =>
    util.transformPoint({ x: point.x - offsetX, y: point.y - offsetY }, matrix)
  );

  const head = `M ${formatPoint(transformed[0].x, transformed[0].y)}`;
  const lines = transformed
    .slice(1)
    .map((point) => `L ${formatPoint(point.x, point.y)}`)
    .join(' ');

  return `${head} ${lines} Z`.trim();
}

function fabricPathToSvgPath(path: FabricPath): string {
  if (!Array.isArray(path.path) || path.path.length === 0) {
    throw new Error('Path has no path commands to convert');
  }

  const transformed = util.transformPath(path.path, path.calcTransformMatrix(), path.pathOffset);
  return util.joinPath(transformed);
}

function groupToSvgPath(group: Group): string {
  const childPaths = group
    .getObjects()
    .map((child) => fabricToSvgPath(child as FabricObject));

  if (childPaths.length === 0) {
    throw new Error('Group has no path-compatible children');
  }

  return childPaths.join(' ');
}

export function fabricToSvgPath(object: FabricObject): string {
  if (object instanceof Rect) {
    return rectToSvgPath(object);
  }

  if (object instanceof Ellipse) {
    return ellipseToSvgPath(object);
  }

  if (object instanceof Polygon) {
    return polygonToSvgPath(object);
  }

  if (object instanceof FabricPath) {
    return fabricPathToSvgPath(object);
  }

  if (object instanceof Group) {
    return groupToSvgPath(object);
  }

  throw new Error(`Unsupported object type for path conversion: ${object.type}`);
}

// Backward-compatible alias for the sprint typo in requirement text.
export const fabricToSvgPct = fabricToSvgPath;

export function svgPathToPaper(
  svgPathData: string,
  scope: paper.PaperScope | typeof paper = paper
): paper.Path {
  const path = new scope.Path(svgPathData);
  return path;
}

export function paperToFabricPath(
  paperPath: paper.PathItem,
  style: FabricPathStyle = {}
): FabricPath {
  const pathData = paperPath.pathData;

  return new FabricPath(pathData, {
    fill: style.fill ?? '#000000',
    stroke: style.stroke ?? null,
    strokeWidth: style.strokeWidth ?? 0,
    strokeLineCap: style.strokeLineCap,
    strokeLineJoin: style.strokeLineJoin,
    strokeDashArray: style.strokeDashArray ?? undefined,
    opacity: style.opacity ?? 1,
    selectable: true,
    evented: true,
  });
}

export function extractFabricPathStyle(object: FabricObject): FabricPathStyle {
  return toPathStyle(object);
}
