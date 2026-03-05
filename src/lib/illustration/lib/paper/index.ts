/**
 * Paper.js Integration Module
 *
 * Paper.js is an open source vector graphics scripting framework
 * that runs on top of the HTML5 Canvas.
 *
 * @see https://paperjs.org/
 */

import paper from 'paper';

// Export pen tool with bezier curve support
export { PenTool, pathToFabricSvg, getSvgPathData } from './PenTool';
export type { PenToolOptions, PenToolState } from './PenTool';

// Export React hook for pen tool
export { usePenTool } from './usePenTool';
export type { UsePenToolOptions, UsePenToolReturn } from './usePenTool';

/**
 * Initialize a new Paper.js scope on a canvas element
 */
export function initializePaperScope(canvas: HTMLCanvasElement): paper.PaperScope {
  const scope = new paper.PaperScope();
  scope.setup(canvas);
  return scope;
}

/**
 * Create a basic path from points
 */
export function createPathFromPoints(
  points: Array<{ x: number; y: number }>,
  options?: { closed?: boolean; smooth?: boolean }
): paper.Path {
  const path = new paper.Path();
  points.forEach((point, index) => {
    if (index === 0) {
      path.moveTo(new paper.Point(point.x, point.y));
    } else {
      path.lineTo(new paper.Point(point.x, point.y));
    }
  });

  if (options?.closed) {
    path.closePath();
  }

  if (options?.smooth) {
    path.smooth();
  }

  return path;
}

/**
 * Create a bezier curve path from control points
 */
export function createBezierPath(
  start: { x: number; y: number },
  cp1: { x: number; y: number },
  cp2: { x: number; y: number },
  end: { x: number; y: number }
): paper.Path {
  const path = new paper.Path();
  path.moveTo(new paper.Point(start.x, start.y));
  path.cubicCurveTo(
    new paper.Point(cp1.x, cp1.y),
    new paper.Point(cp2.x, cp2.y),
    new paper.Point(end.x, end.y)
  );
  return path;
}

/**
 * Export Paper.js path to SVG path data
 */
export function pathToSvgData(path: paper.Path): string {
  return path.pathData;
}

/**
 * Simplify a path by removing unnecessary points
 */
export function simplifyPath(path: paper.Path, tolerance: number = 2.5): paper.Path {
  path.simplify(tolerance);
  return path;
}

/**
 * Smooth a path to create curved segments
 */
export function smoothPath(path: paper.Path): paper.Path {
  path.smooth();
  return path;
}

/**
 * Flatten a path to only contain straight line segments
 */
export function flattenPath(path: paper.Path, tolerance: number = 2.5): paper.Path {
  path.flatten(tolerance);
  return path;
}

/**
 * Boolean operation: Unite two paths
 */
export function unitePaths(path1: paper.PathItem, path2: paper.PathItem): paper.PathItem | null {
  return path1.unite(path2);
}

/**
 * Boolean operation: Intersect two paths
 */
export function intersectPaths(path1: paper.PathItem, path2: paper.PathItem): paper.PathItem | null {
  return path1.intersect(path2);
}

/**
 * Boolean operation: Subtract path2 from path1
 */
export function subtractPaths(path1: paper.PathItem, path2: paper.PathItem): paper.PathItem | null {
  return path1.subtract(path2);
}

/**
 * Convert SVG path data to Paper.js path
 */
export function svgDataToPath(svgPathData: string): paper.Path {
  const path = new paper.Path(svgPathData);
  return path;
}

/**
 * Get all segment points from a path
 */
export function getPathPoints(path: paper.Path): Array<{
  point: { x: number; y: number };
  handleIn: { x: number; y: number };
  handleOut: { x: number; y: number };
}> {
  return path.segments.map((segment) => ({
    point: { x: segment.point.x, y: segment.point.y },
    handleIn: { x: segment.handleIn.x, y: segment.handleIn.y },
    handleOut: { x: segment.handleOut.x, y: segment.handleOut.y },
  }));
}

/**
 * Create SVG element from Paper.js path
 */
export function pathToSvgElement(
  path: paper.Path,
  options?: { width?: number; height?: number }
): string {
  const bounds = path.bounds;
  const width = options?.width || bounds.width + 20;
  const height = options?.height || bounds.height + 20;

  // Translate path to start from padding offset
  const translateX = -bounds.x + 10;
  const translateY = -bounds.y + 10;

  const strokeColor = path.strokeColor?.toCSS(true) || '#000000';
  const strokeWidth = path.strokeWidth || 1;
  const fillColor = path.fillColor?.toCSS(true) || 'none';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <path d="${path.pathData}"
        transform="translate(${translateX}, ${translateY})"
        stroke="${strokeColor}"
        stroke-width="${strokeWidth}"
        fill="${fillColor}"
        stroke-linecap="round"
        stroke-linejoin="round"/>
</svg>`;
}

export { paper };
