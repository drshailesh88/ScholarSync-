/**
 * Smart Connector Data Model and Path Calculation
 *
 * Provides data structures and utility functions for creating intelligent
 * connectors between objects on the canvas. Connectors automatically update
 * their paths when connected objects move.
 *
 * @module SmartConnector
 */

import {
  FabricObject,
  Line,
  Triangle,
  Circle,
  Rect,
  Group,
  Point,
  Path as FabricPath,
} from 'fabric';

// =============================================================================
// TYPES
// =============================================================================

/**
 * A port on an object where a connector can attach
 */
export interface ConnectorPort {
  /** Fabric object ID of the connected node */
  objectId: string;
  /** Which side of the object to connect to */
  side: 'top' | 'right' | 'bottom' | 'left' | 'center' | 'auto';
}

/**
 * Visual styling options for a connector
 */
export interface ConnectorStyle {
  /** Line stroke pattern */
  lineType: 'solid' | 'dashed' | 'dotted';
  /** Line color (hex or named color) */
  lineColor: string;
  /** Line width in pixels */
  lineWidth: number;
  /** Arrowhead style at the start of the line */
  startArrow: 'none' | 'arrow' | 'tbar' | 'circle' | 'diamond';
  /** Arrowhead style at the end of the line */
  endArrow: 'none' | 'arrow' | 'tbar' | 'circle' | 'diamond';
  /** Path routing style */
  curveType: 'straight' | 'elbow' | 'curved';
  /** Optional label text on the connector */
  label?: string;
  /** Position of label along the line (0 to 1) */
  labelPosition?: number;
}

/**
 * Complete data for a smart connector
 */
export interface SmartConnectorData {
  /** Unique identifier for this connector */
  id: string;
  /** Source port information */
  source: ConnectorPort;
  /** Target port information */
  target: ConnectorPort;
  /** Visual styling */
  style: ConnectorStyle;
  /** Optional intermediate waypoints for manual routing */
  waypoints?: Array<{ x: number; y: number }>;
}

/**
 * Default connector styling
 */
export const DEFAULT_CONNECTOR_STYLE: ConnectorStyle = {
  lineType: 'solid',
  lineColor: '#374151',
  lineWidth: 2,
  startArrow: 'none',
  endArrow: 'arrow',
  curveType: 'straight',
  label: undefined,
  labelPosition: 0.5,
};

// =============================================================================
// CONNECTION POINT CALCULATION
// =============================================================================

/**
 * Get the center point of a Fabric object
 */
function getObjectCenter(obj: FabricObject): Point {
  const center = obj.getCenterPoint();
  return center;
}

/**
 * Get the bounding box of an object, accounting for stroke
 */
function getBoundingBox(obj: FabricObject): {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
} {
  const bound = obj.getBoundingRect(); // Fabric.js v6: no arguments
  return {
    left: bound.left,
    top: bound.top,
    right: bound.left + bound.width,
    bottom: bound.top + bound.height,
    width: bound.width,
    height: bound.height,
    centerX: bound.left + bound.width / 2,
    centerY: bound.top + bound.height / 2,
  };
}

/**
 * Calculate the angle from one point to another in radians
 */
function calculateAngle(from: Point, to: Point): number {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

/**
 * Determine the best side for connection based on angle toward target
 */
function getBestSideFromAngle(angle: number): ConnectorPort['side'] {
  // Normalize angle to 0-2π
  let normalizedAngle = angle;
  if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;

  // Convert to degrees for easier thinking
  const degrees = (normalizedAngle * 180) / Math.PI;

  // Divide into 8 sectors (45 degrees each)
  // -22.5 to 22.5: right (0°)
  // 22.5 to 67.5: bottom-right (45°)
  // 67.5 to 112.5: bottom (90°)
  // 112.5 to 157.5: bottom-left (135°)
  // 157.5 to 202.5: left (180°)
  // 202.5 to 247.5: top-left (225°)
  // 247.5 to 292.5: top (270°)
  // 292.5 to 337.5: top-right (315°)

  if (degrees >= 337.5 || degrees < 22.5) return 'right';
  if (degrees >= 22.5 && degrees < 67.5) return 'bottom';
  if (degrees >= 67.5 && degrees < 112.5) return 'bottom';
  if (degrees >= 112.5 && degrees < 157.5) return 'left';
  if (degrees >= 157.5 && degrees < 202.5) return 'left';
  if (degrees >= 202.5 && degrees < 247.5) return 'left';
  if (degrees >= 247.5 && degrees < 292.5) return 'top';
  if (degrees >= 292.5 && degrees < 337.5) return 'top';

  return 'right'; // fallback
}

/**
 * Calculate the connection point on an object's bounding box
 *
 * @param object - The Fabric object to connect to
 * @param targetCenter - The center point of the target object (for auto-side detection)
 * @param preferredSide - The specific side to use, or 'auto' to detect automatically
 * @returns The connection point coordinates
 */
export function getConnectionPoint(
  object: FabricObject,
  targetCenter: Point,
  preferredSide: ConnectorPort['side']
): Point {
  const bbox = getBoundingBox(object);
  const objCenter = new Point(bbox.centerX, bbox.centerY);

  // If side is 'auto', determine based on angle to target
  let side = preferredSide;
  if (side === 'auto') {
    const angle = calculateAngle(objCenter, targetCenter);
    side = getBestSideFromAngle(angle);
  }

  // Return the midpoint of the selected side
  switch (side) {
    case 'top':
      return new Point(bbox.centerX, bbox.top);
    case 'right':
      return new Point(bbox.right, bbox.centerY);
    case 'bottom':
      return new Point(bbox.centerX, bbox.bottom);
    case 'left':
      return new Point(bbox.left, bbox.centerY);
    case 'center':
      return objCenter;
    default:
      return objCenter;
  }
}

// =============================================================================
// PATH CALCULATION
// =============================================================================

/**
 * Calculate path points for a connector between two points
 *
 * @param sourcePoint - Starting point
 * @param targetPoint - Ending point
 * @param curveType - Type of path (straight, elbow, or curved)
 * @param waypoints - Optional intermediate waypoints
 * @returns Array of points defining the path
 */
export function calculateConnectorPath(
  sourcePoint: Point,
  targetPoint: Point,
  curveType: ConnectorStyle['curveType'],
  waypoints?: Array<{ x: number; y: number }>
): Array<{ x: number; y: number }> {
  // If waypoints are provided, use them directly
  if (waypoints && waypoints.length > 0) {
    return [{ x: sourcePoint.x, y: sourcePoint.y }, ...waypoints, { x: targetPoint.x, y: targetPoint.y }];
  }

  switch (curveType) {
    case 'straight':
      return [{ x: sourcePoint.x, y: sourcePoint.y }, { x: targetPoint.x, y: targetPoint.y }];

    case 'elbow':
      return calculateElbowPath(sourcePoint, targetPoint);

    case 'curved':
      // For curved, we return the two endpoints plus a control point
      // The actual bezier rendering will be done elsewhere
      return [
        { x: sourcePoint.x, y: sourcePoint.y },
        calculateBezierControlPoint(sourcePoint, targetPoint),
        { x: targetPoint.x, y: targetPoint.y },
      ];

    default:
      return [{ x: sourcePoint.x, y: sourcePoint.y }, { x: targetPoint.x, y: targetPoint.y }];
  }
}

/**
 * Calculate an orthogonal (elbow) path between two points
 * Uses a 3-segment route with a midpoint bend
 */
function calculateElbowPath(
  source: Point,
  target: Point
): Array<{ x: number; y: number }> {
  // If same Y (horizontal line)
  if (Math.abs(source.y - target.y) < 1) {
    return [
      { x: source.x, y: source.y },
      { x: target.x, y: target.y },
    ];
  }

  // If same X (vertical line)
  if (Math.abs(source.x - target.x) < 1) {
    return [
      { x: source.x, y: source.y },
      { x: target.x, y: target.y },
    ];
  }

  // Calculate midpoint X for a clean 3-segment orthogonal path
  const midX = (source.x + target.x) / 2;

  return [
    { x: source.x, y: source.y },
    { x: midX, y: source.y },
    { x: midX, y: target.y },
    { x: target.x, y: target.y },
  ];
}

/**
 * Calculate a control point for a quadratic bezier curve
 * Creates a smooth curve that bows away from the straight line
 */
function calculateBezierControlPoint(source: Point, target: Point): { x: number; y: number } {
  // Calculate midpoint
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;

  // Calculate perpendicular offset for curvature
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Offset is proportional to distance (creates smoother curve for longer lines)
  const offsetAmount = Math.min(distance * 0.2, 50);

  // Perpendicular direction (normalized)
  const perpX = -dy / distance;
  const perpY = dx / distance;

  return {
    x: midX + perpX * offsetAmount,
    y: midY + perpY * offsetAmount,
  };
}

// =============================================================================
// ARROWHEAD CREATION
// =============================================================================

/**
 * Stroke dash array for different line types
 */
function getStrokeDashArray(lineType: ConnectorStyle['lineType']): number[] | undefined {
  switch (lineType) {
    case 'dashed':
      return [8, 4];
    case 'dotted':
      return [2, 2];
    case 'solid':
    default:
      return undefined;
  }
}

/**
 * Create an arrowhead shape at a given point and angle
 *
 * @param point - Position for the arrowhead
 * @param angle - Rotation angle in radians
 * @param type - Arrowhead style
 * @param color - Fill/stroke color
 * @param size - Size of the arrowhead (default based on line width)
 * @returns Fabric.js object for the arrowhead, or null for 'none'
 */
export function createArrowhead(
  point: Point,
  angle: number,
  type: 'none' | 'arrow' | 'tbar' | 'circle' | 'diamond',
  color: string,
  size?: number
): FabricObject | null {
  const arrowSize = size ?? 10;

  if (type === 'none') {
    return null;
  }

  if (type === 'arrow') {
    // Classic triangle arrowhead
    const triangle = new Triangle({
      width: arrowSize,
      height: arrowSize,
      fill: color,
      stroke: color,
      strokeWidth: 1,
      left: point.x,
      top: point.y,
      originX: 'center',
      originY: 'center',
      angle: (angle * 180) / Math.PI + 90, // Fabric uses degrees, +90 to point along line
    });
    return triangle;
  }

  if (type === 'tbar') {
    // Perpendicular line (T-bar)
    const tbar = new Line([0, 0, 0, arrowSize], {
      stroke: color,
      strokeWidth: 2,
      left: point.x,
      top: point.y,
      originX: 'center',
      originY: 'center',
      angle: (angle * 180) / Math.PI,
    });
    return tbar;
  }

  if (type === 'circle') {
    // Hollow circle endpoint
    const circle = new Circle({
      radius: arrowSize / 2,
      fill: 'transparent',
      stroke: color,
      strokeWidth: 2,
      left: point.x,
      top: point.y,
      originX: 'center',
      originY: 'center',
    });
    return circle;
  }

  if (type === 'diamond') {
    // Diamond shape (rotated square)
    const diamond = new Rect({
      width: arrowSize * 0.8,
      height: arrowSize * 0.8,
      fill: color,
      stroke: color,
      strokeWidth: 1,
      left: point.x,
      top: point.y,
      originX: 'center',
      originY: 'center',
      angle: 45, // Fixed 45° rotation for diamond shape
    });
    return diamond;
  }

  return null;
}

/**
 * Calculate the angle from a point along a path direction
 */
function getAngleAlongPath(from: Point, to: Point): number {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

// =============================================================================
// VISUAL CREATION
// =============================================================================

/**
 * Create the visual representation of a connector on the canvas
 *
 * @param data - Connector data including ports and style
 * @param sourceObject - Fabric object for the source
 * @param targetObject - Fabric object for the target
 * @returns A Group containing the connector visual elements
 */
export function createConnectorVisual(
  data: SmartConnectorData,
  sourceObject: FabricObject,
  targetObject: FabricObject
): Group {
  const { style, id, source, target } = data;

  // Get connection points
  const sourceCenter = getObjectCenter(targetObject);
  const targetCenter = getObjectCenter(sourceObject); // Note: reversed for endpoint calculation

  const startPoint = getConnectionPoint(sourceObject, targetCenter, source.side);
  const endPoint = getConnectionPoint(targetObject, sourceCenter, target.side);

  // Calculate path points (waypoints come from data, not style)
  const pathPoints = calculateConnectorPath(startPoint, endPoint, style.curveType, data.waypoints);

  const objects: FabricObject[] = [];

  // Create the main line path
  if (style.curveType === 'curved' && pathPoints.length === 3) {
    // Quadratic bezier curve
    const [p0, p1, p2] = pathPoints;
    const pathData = `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`;
    const curve = new FabricPath(pathData, {
      stroke: style.lineColor,
      strokeWidth: style.lineWidth,
      strokeDashArray: getStrokeDashArray(style.lineType),
      fill: '',
      selectable: false,
      evented: false,
    });
    objects.push(curve);
  } else if (style.curveType === 'elbow' && pathPoints.length > 2) {
    // Polyline for elbow routing
    const pathData = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const polyline = new FabricPath(pathData, {
      stroke: style.lineColor,
      strokeWidth: style.lineWidth,
      strokeDashArray: getStrokeDashArray(style.lineType),
      fill: '',
      selectable: false,
      evented: false,
    });
    objects.push(polyline);
  } else {
    // Simple straight line
    const line = new Line(
      [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
      {
        stroke: style.lineColor,
        strokeWidth: style.lineWidth,
        strokeDashArray: getStrokeDashArray(style.lineType),
        selectable: false,
        evented: false,
      }
    );
    objects.push(line);
  }

  // Add start arrowhead
  if (style.startArrow !== 'none') {
    const p1 = pathPoints[1] || endPoint;
    const angle = getAngleAlongPath(new Point(p1.x, p1.y), startPoint);
    const startArrow = createArrowhead(startPoint, angle, style.startArrow, style.lineColor);
    if (startArrow) {
      objects.push(startArrow);
    }
  }

  // Add end arrowhead
  if (style.endArrow !== 'none') {
    // For angle calculation, look at the last segment
    const lastIdx = pathPoints.length - 1;
    const prevIdx = lastIdx - 1;
    const pPrev = pathPoints[prevIdx] || startPoint;
    const pLast = pathPoints[lastIdx] || endPoint;
    const angle = getAngleAlongPath(new Point(pPrev.x, pPrev.y), new Point(pLast.x, pLast.y));
    const endArrow = createArrowhead(endPoint, angle, style.endArrow, style.lineColor);
    if (endArrow) {
      objects.push(endArrow);
    }
  }

  // Add label if specified
  if (style.label) {
    // Calculate label position
    const labelPos = style.labelPosition ?? 0.5;
    let labelX: number;
    let labelY: number;

    if (style.curveType === 'curved' && pathPoints.length === 3) {
      // For bezier, evaluate at t (0 to 1)
      const t = labelPos;
      const [p0, p1, p2] = pathPoints;
      // Quadratic bezier formula: (1-t)²*p0 + 2*(1-t)*t*p1 + t²*p2
      labelX = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
      labelY = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
    } else if (pathPoints.length > 2) {
      // For elbow, find the segment containing our position
      const totalLength = calculatePathLength(pathPoints);
      const targetLength = totalLength * labelPos;
      let currentLength = 0;
      for (let i = 0; i < pathPoints.length - 1; i++) {
        const segmentLength = distance(pathPoints[i], pathPoints[i + 1]);
        if (currentLength + segmentLength >= targetLength) {
          // Label is on this segment
          const segmentProgress = (targetLength - currentLength) / segmentLength;
          labelX =
            pathPoints[i].x + (pathPoints[i + 1].x - pathPoints[i].x) * segmentProgress;
          labelY =
            pathPoints[i].y + (pathPoints[i + 1].y - pathPoints[i].y) * segmentProgress;
          break;
        }
        currentLength += segmentLength;
      }
      // Fallback to midpoint
      labelX = (startPoint.x + endPoint.x) / 2;
      labelY = (startPoint.y + endPoint.y) / 2;
    } else {
      // Simple straight line
      labelX = startPoint.x + (endPoint.x - startPoint.x) * labelPos;
      labelY = startPoint.y + (endPoint.y - startPoint.y) * labelPos;
    }

    // Create label background (white rect with border)
    // Note: In production, would use IText but keeping simple for now
    const labelText = new Rect({
      width: style.label.length * 7 + 8, // Approximate width
      height: 16,
      fill: 'white',
      stroke: style.lineColor,
      strokeWidth: 1,
      left: labelX,
      top: labelY,
      originX: 'center',
      originY: 'center',
      rx: 3,
      ry: 3,
      selectable: false,
      evented: false,
      data: { type: 'label', text: style.label },
    });
    objects.push(labelText);
  }

  // Create group with all elements
  const group = new Group(objects, {
    selectable: true,
    evented: true,
    subTargetCheck: false,
  });

  // Set custom data attributes using set method
  group.set('data-connector-id', id);
  group.set('data-source-id', source.objectId);
  group.set('data-target-id', target.objectId);
  group.set('data-type', 'connector');

  return group;
}

/**
 * Calculate the total length of a path defined by points
 */
function calculatePathLength(points: Array<{ x: number; y: number }>): number {
  let length = 0;
  for (let i = 0; i < points.length - 1; i++) {
    length += distance(points[i], points[i + 1]);
  }
  return length;
}

/**
 * Euclidean distance between two points
 */
function distance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

/**
 * Update an existing connector visual with new positions
 * Used when connected objects move
 *
 * @param visual - The existing connector Group
 * @param sourceObject - Current source object
 * @param targetObject - Current target object
 * @param style - Current connector style
 * @returns A new Group to replace the old one
 */
export function updateConnectorVisual(
  visual: Group,
  sourceObject: FabricObject,
  targetObject: FabricObject,
  style: ConnectorStyle
): Group {
  const connectorId = visual.get('data-connector-id') as string;
  const sourceId = visual.get('data-source-id') as string;
  const targetId = visual.get('data-target-id') as string;

  // Create new visual with updated positions
  const data: SmartConnectorData = {
    id: connectorId,
    source: { objectId: sourceId, side: 'auto' },
    target: { objectId: targetId, side: 'auto' },
    style,
  };

  const newVisual = createConnectorVisual(data, sourceObject, targetObject);

  // Copy position and other properties from old visual
  newVisual.set({
    left: visual.left,
    top: visual.top,
    scaleX: visual.scaleX,
    scaleY: visual.scaleY,
    angle: visual.angle,
  });

  return newVisual;
}

/**
 * Generate a unique connector ID
 */
export function generateConnectorId(): string {
  return `connector_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
