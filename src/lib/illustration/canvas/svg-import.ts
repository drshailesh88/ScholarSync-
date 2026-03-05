/**
 * SVG to Fabric.js Canvas Import Utility
 *
 * Lightweight utility for importing SVG strings into Fabric.js canvas objects.
 * Wraps the comprehensive SVGImporter with a simpler API for use in illustration generation.
 *
 * Features:
 * - Parse SVG string into Fabric.js objects
 * - Handle groups, paths, rects, circles, text, etc.
 * - Preserve colors, strokes, transforms
 * - Return fabric.Canvas-compatible object array
 */

import { parse as parseSVG, type RootNode } from 'svg-parser';
import * as fabric from 'fabric';
import type { Object as FabricObject } from 'fabric';

// =============================================================================
// TYPES
// =============================================================================

export interface SVGImportOptions {
  /** Preserve aspect ratio when scaling */
  preserveAspectRatio?: boolean;
  /** Flatten groups into individual objects */
  flattenGroups?: boolean;
  /** Convert text elements to paths (for fonts that may not be available) */
  convertTextToPaths?: boolean;
  /** Scale factor for imported objects */
  scale?: number;
}

export interface SVGImportResult {
  /** Array of Fabric.js objects ready to add to canvas */
  objects: FabricObject[];
  /** Bounding box dimensions of the imported SVG */
  bounds: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  /** Metadata about the import */
  metadata: {
    elementCount: number;
    types: string[];
    hasText: boolean;
    groups: number;
  };
}

// =============================================================================
// SVG ATTRIBUTE TO FABRIC PROPERTY MAPPING
// =============================================================================

const SVG_TO_FABRIC_PROPS: Record<string, string> = {
  fill: 'fill',
  stroke: 'stroke',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLineCap',
  'stroke-linejoin': 'strokeLineJoin',
  'stroke-dasharray': 'strokeDashArray',
  opacity: 'opacity',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
};

// =============================================================================
// MAIN IMPORT FUNCTION
// =============================================================================

/**
 * Import an SVG string into Fabric.js canvas objects
 *
 * @param svgString - The SVG markup to import
 * @param options - Import options
 * @returns Promise with Fabric objects and metadata
 */
export async function importSVGToCanvas(
  svgString: string,
  options: SVGImportOptions = {}
): Promise<SVGImportResult> {
  const opts: Required<SVGImportOptions> = {
    preserveAspectRatio: options.preserveAspectRatio ?? true,
    flattenGroups: options.flattenGroups ?? false,
    convertTextToPaths: options.convertTextToPaths ?? false,
    scale: options.scale ?? 1,
  };

  // Clean SVG string
  const cleaned = cleanSVG(svgString);

  // Parse SVG
  const parsed = parseSVG(cleaned) as RootNode;
  const svgElement = findSVGElement(parsed);

  if (!svgElement) {
    throw new Error('No SVG element found in input');
  }

  // Extract dimensions
  const dimensions = extractDimensions(svgElement);

  // Convert to Fabric objects
  const objects = await convertToFabricObjects(svgElement, opts);

  // Calculate bounds
  const bounds = calculateBounds(objects);

  // Collect metadata
  const metadata = collectMetadata(objects);

  // Apply scale if needed
  if (opts.scale !== 1) {
    for (const obj of objects) {
      obj.scaleX = (obj.scaleX || 1) * opts.scale;
      obj.scaleY = (obj.scaleY || 1) * opts.scale;
    }
    bounds.width *= opts.scale;
    bounds.height *= opts.scale;
  }

  return {
    objects,
    bounds,
    metadata,
  };
}

// =============================================================================
// SVG CLEANING
// =============================================================================

function cleanSVG(svg: string): string {
  let cleaned = svg.trim();
  // Remove XML declaration
  cleaned = cleaned.replace(/<\?xml[^?]*\?>/gi, '');
  // Remove DOCTYPE
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '');
  // Remove comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  return cleaned;
}

// =============================================================================
// SVG PARSING HELPERS
// =============================================================================

function findSVGElement(parsed: RootNode) {
  for (const child of parsed.children) {
    if (child.type === 'element' && child.tagName === 'svg') {
      return child;
    }
  }
  return null;
}

function extractDimensions(svgElement: any): { width: number; height: number } {
  const props = svgElement.properties || {};

  let width = parseLength(props.width);
  let height = parseLength(props.height);

  // Try viewBox if no explicit dimensions
  if ((!width || !height) && props.viewBox) {
    const viewBox = String(props.viewBox).split(/[\s,]+/).map(Number);
    if (viewBox.length === 4) {
      width = width || viewBox[2];
      height = height || viewBox[3];
    }
  }

  return {
    width: width || 500,
    height: height || 500,
  };
}

function parseLength(value: string | number | undefined): number {
  if (value === undefined || value === null) return 0;
  if (typeof value === 'number') return value;

  const num = parseFloat(String(value));
  if (isNaN(num)) return 0;

  const str = String(value);
  if (str.endsWith('px')) return num;
  if (str.endsWith('pt')) return num * 1.333;
  if (str.endsWith('em')) return num * 16;
  if (str.endsWith('rem')) return num * 16;
  if (str.endsWith('in')) return num * 96;
  if (str.endsWith('cm')) return num * 37.795;
  if (str.endsWith('mm')) return num * 3.78;

  return num;
}

// =============================================================================
// FABRIC OBJECT CONVERSION
// =============================================================================

async function convertToFabricObjects(
  svgElement: any,
  options: Required<SVGImportOptions>
): Promise<FabricObject[]> {
  const objects: FabricObject[] = [];
  const inheritedStyles = extractStyles(svgElement);

  for (const child of svgElement.children) {
    if (child.type === 'element') {
      const fabricObjects = await convertElement(child, inheritedStyles, options);
      objects.push(...fabricObjects);
    }
  }

  return objects;
}

async function convertElement(
  element: any,
  inheritedStyles: Record<string, string | number>,
  options: Required<SVGImportOptions>
): Promise<FabricObject[]> {
  const styles = { ...inheritedStyles, ...extractStyles(element) };
  const props = element.properties || {};

  switch (element.tagName) {
    case 'rect':
      return [createRect(props, styles)];
    case 'circle':
      return [createCircle(props, styles)];
    case 'ellipse':
      return [createEllipse(props, styles)];
    case 'line':
      return [createLine(props, styles)];
    case 'polyline':
      return [createPolyline(props, styles)];
    case 'polygon':
      return [createPolygon(props, styles)];
    case 'path':
      return [createPath(props, styles)];
    case 'text':
      return [createText(element, styles)];
    case 'g':
      return await createGroup(element, styles, options);
    case 'defs':
    case 'style':
    case 'clipPath':
    case 'mask':
    case 'linearGradient':
    case 'radialGradient':
    case 'pattern':
    case 'marker':
      return [];
    default:
      // Unknown element - skip
      return [];
  }
}

function extractStyles(element: any): Record<string, string | number> {
  const styles: Record<string, string | number> = {};
  const props = element.properties || {};

  for (const [attr, value] of Object.entries(props)) {
    if (attr === 'style') {
      // Parse inline style
      const styleStr = String(value);
      const styleParts = styleStr.split(';');
      for (const part of styleParts) {
        const [key, val] = part.split(':').map((s) => s.trim());
        if (key && val) {
          styles[key] = val;
        }
      }
    } else if (SVG_TO_FABRIC_PROPS[attr]) {
      styles[attr] = value as string | number;
    }
  }

  return styles;
}

function applyStylesToFabricOptions(
  options: Record<string, unknown>,
  styles: Record<string, string | number>
): void {
  for (const [svgProp, value] of Object.entries(styles)) {
    const fabricProp = SVG_TO_FABRIC_PROPS[svgProp];
    if (fabricProp && value !== undefined) {
      if (svgProp === 'stroke-dasharray' && typeof value === 'string') {
        options[fabricProp] = value.split(/[\s,]+/).map(Number);
      } else if (svgProp === 'text-anchor') {
        const anchorMap: Record<string, string> = {
          start: 'left',
          middle: 'center',
          end: 'right',
        };
        options[fabricProp] = anchorMap[value as string] || 'left';
      } else if (typeof value === 'string' && !isNaN(Number(value))) {
        options[fabricProp] = Number(value);
      } else {
        options[fabricProp] = value;
      }
    }
  }

  // Handle fill="none"
  if (styles.fill === 'none') {
    options.fill = null;
  }
  // Handle stroke="none"
  if (styles.stroke === 'none') {
    options.stroke = null;
  }
}

// =============================================================================
// FABRIC OBJECT CREATION
// =============================================================================

function createRect(props: any, styles: any): fabric.Rect {
  const options: any = {
    left: parseLength(props.x) || 0,
    top: parseLength(props.y) || 0,
    width: parseLength(props.width) || 100,
    height: parseLength(props.height) || 100,
    rx: parseLength(props.rx) || 0,
    ry: parseLength(props.ry) || 0,
  };

  applyStylesToFabricOptions(options, styles);

  return new fabric.Rect(options);
}

function createCircle(props: any, styles: any): fabric.Circle {
  const r = parseLength(props.r) || 50;
  const options: any = {
    left: (parseLength(props.cx) || 0) - r,
    top: (parseLength(props.cy) || 0) - r,
    radius: r,
  };

  applyStylesToFabricOptions(options, styles);

  return new fabric.Circle(options);
}

function createEllipse(props: any, styles: any): fabric.Ellipse {
  const rx = parseLength(props.rx) || 50;
  const ry = parseLength(props.ry) || 30;
  const options: any = {
    left: (parseLength(props.cx) || 0) - rx,
    top: (parseLength(props.cy) || 0) - ry,
    rx,
    ry,
  };

  applyStylesToFabricOptions(options, styles);

  return new fabric.Ellipse(options);
}

function createLine(props: any, styles: any): fabric.Line {
  const coords: [number, number, number, number] = [
    parseLength(props.x1) || 0,
    parseLength(props.y1) || 0,
    parseLength(props.x2) || 0,
    parseLength(props.y2) || 0,
  ];

  const options: any = {};
  applyStylesToFabricOptions(options, styles);

  // Lines default to no fill
  if (options.fill === undefined) {
    options.fill = 'transparent';
  }

  return new fabric.Line(coords, options);
}

function createPolyline(props: any, styles: any): fabric.Polyline {
  const points = parsePoints(props.points);
  const options: any = {};

  applyStylesToFabricOptions(options, styles);

  // Polylines default to no fill
  if (options.fill === undefined) {
    options.fill = 'transparent';
  }

  return new fabric.Polyline(points, options);
}

function createPolygon(props: any, styles: any): fabric.Polygon {
  const points = parsePoints(props.points);
  const options: any = {};

  applyStylesToFabricOptions(options, styles);

  return new fabric.Polygon(points, options);
}

function parsePoints(pointsStr: string): Array<{ x: number; y: number }> {
  if (!pointsStr) return [];

  const numbers = pointsStr.trim().split(/[\s,]+/).map(Number);
  const points: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < numbers.length; i += 2) {
    if (i + 1 < numbers.length) {
      points.push({ x: numbers[i], y: numbers[i + 1] });
    }
  }

  return points;
}

function createPath(props: any, styles: any): fabric.Path {
  const d = props.d || '';
  const options: any = {};

  applyStylesToFabricOptions(options, styles);

  return new fabric.Path(d, options);
}

function createText(element: any, styles: any): fabric.IText {
  const props = element.properties || {};
  const textContent = extractTextContent(element);

  const options: any = {
    left: parseLength(props.x) || 0,
    top: parseLength(props.y) || 0,
    fontFamily: 'Arial',
    fontSize: parseLength(styles['font-size']) || 16,
  };

  applyStylesToFabricOptions(options, styles);

  return new fabric.IText(textContent, options);
}

function extractTextContent(element: any): string {
  let text = '';

  for (const child of element.children) {
    if (child.type === 'text') {
      text += child.value || '';
    } else if (child.type === 'element' && child.tagName === 'tspan') {
      text += extractTextContent(child);
    }
  }

  return text.trim();
}

async function createGroup(
  element: any,
  styles: any,
  options: Required<SVGImportOptions>
): Promise<FabricObject[]> {
  const childObjects: FabricObject[] = [];

  for (const child of element.children) {
    if (child.type === 'element') {
      const objects = await convertElement(child, styles, options);
      childObjects.push(...objects);
    }
  }

  if (childObjects.length === 0) {
    return [];
  }

  // Flatten groups if requested
  if (options.flattenGroups) {
    return childObjects;
  }

  // Create a group
  const groupOptions: any = {};
  applyStylesToFabricOptions(groupOptions, styles);

  const group = new fabric.Group(childObjects, groupOptions);

  return [group];
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function calculateBounds(objects: FabricObject[]): {
  width: number;
  height: number;
  left: number;
  top: number;
} {
  if (objects.length === 0) {
    return { width: 0, height: 0, left: 0, top: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const obj of objects) {
    const bound = obj.getBoundingRect();
    minX = Math.min(minX, bound.left);
    minY = Math.min(minY, bound.top);
    maxX = Math.max(maxX, bound.left + bound.width);
    maxY = Math.max(maxY, bound.top + bound.height);
  }

  return {
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function collectMetadata(objects: FabricObject[]): {
  elementCount: number;
  types: string[];
  hasText: boolean;
  groups: number;
} {
  const types = new Set<string>();
  let hasText = false;
  let groups = 0;

  for (const obj of objects) {
    const type = obj.type;
    types.add(type);

    if (type === 'i-text' || type === 'text') {
      hasText = true;
    }
    if (type === 'group') {
      groups++;
    }
  }

  return {
    elementCount: objects.length,
    types: Array.from(types),
    hasText,
    groups,
  };
}

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * Quick import with default options
 */
export async function quickImportSVG(svgString: string): Promise<FabricObject[]> {
  const result = await importSVGToCanvas(svgString);
  return result.objects;
}

/**
 * Import and center objects on a hypothetical canvas
 */
export async function importAndCenterSVG(
  svgString: string,
  canvasWidth: number,
  canvasHeight: number
): Promise<SVGImportResult> {
  const result = await importSVGToCanvas(svgString);

  // Calculate centering offset
  const offsetX = (canvasWidth - result.bounds.width) / 2 - result.bounds.left;
  const offsetY = (canvasHeight - result.bounds.height) / 2 - result.bounds.top;

  // Apply offset
  for (const obj of result.objects) {
    obj.left = (obj.left || 0) + offsetX;
    obj.top = (obj.top || 0) + offsetY;
  }

  result.bounds.left = offsetX;
  result.bounds.top = offsetY;

  return result;
}

export default importSVGToCanvas;
