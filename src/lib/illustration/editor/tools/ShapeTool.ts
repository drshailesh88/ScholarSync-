/**
 * FINNISH Shape Tool
 * Base class for shape drawing tools (Rectangle, Ellipse, Line, Arrow)
 *
 * Features:
 * - Common draw start/drag/end lifecycle
 * - Shift key constraint (square, circle, 45-degree angles)
 * - Escape to cancel
 * - Configurable default styles
 *
 * @module editor/tools/ShapeTool
 */

import type { FabricCanvas } from '@/lib/illustration/types';
import type { Tool, ToolMouseEvent, ToolKeyEvent, Point } from './ToolRegistry';

// ============================================================================
// Types
// ============================================================================

/**
 * Shape style configuration
 */
export interface ShapeStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeUniform: boolean;
  opacity: number;
}

/**
 * Bounding box for shapes
 */
export interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Shape creation event data
 */
export interface ShapeCreatedEvent {
  type: string;
  object: any;
}

/**
 * Shape tool configuration options
 */
export interface ShapeToolOptions {
  /** Default fill color */
  fill?: string;
  /** Default stroke color */
  stroke?: string;
  /** Default stroke width */
  strokeWidth?: number;
  /** Minimum size to create shape (pixels) */
  minSize?: number;
}

// ============================================================================
// Abstract Shape Tool
// ============================================================================

/**
 * Abstract base class for shape drawing tools
 *
 * Subclasses must implement:
 * - createShape(): Create the shape object during drag
 * - updateShape(): Update shape dimensions during drag
 * - finalizeShape(): Finalize the shape on mouse up
 *
 * @example
 * ```typescript
 * class RectangleTool extends ShapeTool {
 *   readonly name = 'rectangle';
 *   readonly icon = 'square';
 *
 *   protected createShape(start: Point): any {
 *     // Create Fabric.js Rect
 *   }
 *
 *   protected updateShape(shape: any, start: Point, current: Point): void {
 *     // Update rect dimensions
 *   }
 * }
 * ```
 */
export abstract class ShapeTool implements Tool {
  abstract readonly name: string;
  abstract readonly icon: string;
  readonly cursor = 'crosshair';
  readonly category = 'shapes';
  abstract readonly shortcut?: string;

  /** Canvas reference */
  protected canvas: FabricCanvas | null = null;

  /** Current shape being drawn */
  protected currentShape: any = null;

  /** Whether the tool is active */
  protected isActive = false;

  /** Whether currently dragging to draw */
  protected isDragging = false;

  /** Mouse start position */
  protected startPoint: Point | null = null;

  /** Current mouse position */
  protected currentPoint: Point | null = null;

  /** Whether shift key is held (for constraints) */
  protected isShiftHeld = false;

  /** Default shape styles */
  protected style: ShapeStyle;

  /** Configuration options */
  protected options: Required<ShapeToolOptions>;

  /** Shape created callback */
  protected onShapeCreated?: (event: ShapeCreatedEvent) => void;

  constructor(options: ShapeToolOptions = {}) {
    this.options = {
      fill: options.fill ?? 'transparent',
      stroke: options.stroke ?? '#000000',
      strokeWidth: options.strokeWidth ?? 2,
      minSize: options.minSize ?? 2,
    };

    this.style = {
      fill: this.options.fill,
      stroke: this.options.stroke,
      strokeWidth: this.options.strokeWidth,
      strokeUniform: true,
      opacity: 1,
    };
  }

  // ==========================================================================
  // Abstract Methods - Must be implemented by subclasses
  // ==========================================================================

  /**
   * Create the initial shape object
   * @param start - Starting point
   * @returns Fabric.js shape object
   */
  protected abstract createShape(start: Point): any;

  /**
   * Update the shape during drag
   * @param shape - Current shape object
   * @param start - Starting point
   * @param current - Current mouse position
   * @param isConstrained - Whether shift is held for constraints
   */
  protected abstract updateShape(
    shape: any,
    start: Point,
    current: Point,
    isConstrained: boolean
  ): void;

  /**
   * Check if the shape meets minimum size requirements
   * @param shape - Shape object to check
   * @returns true if shape is large enough to keep
   */
  protected abstract isValidSize(shape: any): boolean;

  // ==========================================================================
  // Lifecycle Methods
  // ==========================================================================

  /**
   * Activate the shape tool
   * @param canvas - Fabric.js canvas instance
   */
  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;

    // Disable object selection while drawing
    canvas.selection = false;

    // Disable object interaction
    canvas.forEachObject((obj: any) => {
      obj.selectable = false;
      obj.evented = false;
    });

    // Set cursor
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;
  }

  /**
   * Deactivate the shape tool
   * @param canvas - Fabric.js canvas instance
   */
  deactivate(canvas: FabricCanvas): void {
    this.isActive = false;

    // Clean up any in-progress shape
    if (this.currentShape) {
      canvas.remove(this.currentShape);
      this.currentShape = null;
    }

    this.isDragging = false;
    this.startPoint = null;
    this.currentPoint = null;
    this.isShiftHeld = false;
  }

  // ==========================================================================
  // Mouse Event Handlers
  // ==========================================================================

  /**
   * Handle mouse down - start drawing
   * @param e - Mouse event data
   */
  onMouseDown(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    this.isDragging = true;
    this.startPoint = this.getPointer(e);
    this.currentPoint = { ...this.startPoint };
    this.isShiftHeld = e.e.shiftKey;

    // Create initial shape
    this.currentShape = this.createShape(this.startPoint);

    if (this.currentShape) {
      // Mark as non-selectable during creation
      this.currentShape.set({
        selectable: false,
        evented: false,
      });

      this.canvas.add(this.currentShape);
    }
  }

  /**
   * Handle mouse move - update shape during drag
   * @param e - Mouse event data
   */
  onMouseMove(e: ToolMouseEvent): void {
    if (!this.isActive || !this.isDragging || !this.currentShape) return;

    this.currentPoint = this.getPointer(e);

    // Update shape dimensions
    this.updateShape(
      this.currentShape,
      this.startPoint!,
      this.currentPoint,
      this.isShiftHeld
    );

    this.canvas?.requestRenderAll();
  }

  /**
   * Handle mouse up - finalize shape
   * @param e - Mouse event data
   */
  onMouseUp(e: ToolMouseEvent): void {
    if (!this.isActive || !this.currentShape) return;

    this.isDragging = false;
    this.currentPoint = this.getPointer(e);

    // Check if shape meets minimum size requirements
    if (!this.isValidSize(this.currentShape)) {
      // Remove undersized shape
      this.canvas?.remove(this.currentShape);
    } else {
      // Finalize shape - make it selectable
      this.currentShape.set({
        selectable: true,
        evented: true,
      });
      this.currentShape.setCoords();

      // Emit shape created event
      if (this.onShapeCreated) {
        this.onShapeCreated({
          type: this.name,
          object: this.currentShape,
        });
      }
    }

    // Reset state
    this.currentShape = null;
    this.startPoint = null;
    this.currentPoint = null;

    this.canvas?.requestRenderAll();
  }

  // ==========================================================================
  // Keyboard Event Handlers
  // ==========================================================================

  /**
   * Handle key down
   * @param e - Keyboard event
   */
  onKeyDown(e: ToolKeyEvent): void {
    // Track shift key for constraints
    if (e.key === 'Shift') {
      this.isShiftHeld = true;

      // Update shape if currently drawing
      if (this.isDragging && this.currentShape && this.startPoint && this.currentPoint) {
        this.updateShape(this.currentShape, this.startPoint, this.currentPoint, true);
        this.canvas?.requestRenderAll();
      }
    }

    // Escape to cancel
    if (e.key === 'Escape' && this.currentShape) {
      this.canvas?.remove(this.currentShape);
      this.currentShape = null;
      this.isDragging = false;
      this.startPoint = null;
      this.currentPoint = null;
      this.canvas?.requestRenderAll();
      e.preventDefault();
    }
  }

  /**
   * Handle key up
   * @param e - Keyboard event
   */
  onKeyUp(e: ToolKeyEvent): void {
    // Track shift key release
    if (e.key === 'Shift') {
      this.isShiftHeld = false;

      // Update shape if currently drawing
      if (this.isDragging && this.currentShape && this.startPoint && this.currentPoint) {
        this.updateShape(this.currentShape, this.startPoint, this.currentPoint, false);
        this.canvas?.requestRenderAll();
      }
    }
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  /**
   * Get pointer coordinates from event
   * @param e - Tool mouse event
   * @returns Point coordinates
   */
  protected getPointer(e: ToolMouseEvent): Point {
    if (this.canvas) {
      return this.canvas.getPointer(e.e) as Point;
    }
    return { x: e.e.clientX, y: e.e.clientY };
  }

  /**
   * Calculate bounding box from two points (handles negative dimensions)
   * @param start - Start point
   * @param end - End point
   * @returns Bounding box with positive dimensions
   */
  protected getBoundingBox(start: Point, end: Point): BoundingBox {
    const left = Math.min(start.x, end.x);
    const top = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    return { left, top, width, height };
  }

  /**
   * Calculate constrained (square) dimensions
   * @param start - Start point
   * @param end - End point
   * @returns Constrained bounding box
   */
  protected getConstrainedBox(start: Point, end: Point): BoundingBox {
    let width = end.x - start.x;
    let height = end.y - start.y;

    const size = Math.max(Math.abs(width), Math.abs(height));

    width = width < 0 ? -size : size;
    height = height < 0 ? -size : size;

    const left = width < 0 ? start.x + width : start.x;
    const top = height < 0 ? start.y + height : start.y;

    return {
      left,
      top,
      width: Math.abs(width),
      height: Math.abs(height),
    };
  }

  // ==========================================================================
  // Configuration Methods
  // ==========================================================================

  /**
   * Set shape created callback
   * @param callback - Callback function
   */
  setOnShapeCreated(callback: (event: ShapeCreatedEvent) => void): void {
    this.onShapeCreated = callback;
  }

  /**
   * Get current style settings
   * @returns Current shape style
   */
  getStyle(): ShapeStyle {
    return { ...this.style };
  }

  /**
   * Set style settings
   * @param style - Partial style to merge
   */
  setStyle(style: Partial<ShapeStyle>): void {
    Object.assign(this.style, style);
  }

  /**
   * Set fill color
   * @param fill - Fill color (CSS color string or 'transparent')
   */
  setFill(fill: string): void {
    this.style.fill = fill;
  }

  /**
   * Set stroke color
   * @param stroke - Stroke color (CSS color string)
   */
  setStroke(stroke: string): void {
    this.style.stroke = stroke;
  }

  /**
   * Set stroke width
   * @param width - Stroke width in pixels
   */
  setStrokeWidth(width: number): void {
    this.style.strokeWidth = Math.max(0, width);
  }
}

// ============================================================================
// Concrete Shape Tools
// ============================================================================

/**
 * Rectangle Tool - draws rectangles and squares
 */
export class RectangleTool extends ShapeTool {
  readonly name = 'rectangle';
  readonly icon = 'square';
  readonly shortcut = 'r';

  protected createShape(start: Point): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Rect) return null;

    return new fabric.Rect({
      left: start.x,
      top: start.y,
      width: 0,
      height: 0,
      fill: this.style.fill,
      stroke: this.style.stroke,
      strokeWidth: this.style.strokeWidth,
      strokeUniform: this.style.strokeUniform,
      originX: 'left',
      originY: 'top',
    });
  }

  protected updateShape(
    shape: any,
    start: Point,
    current: Point,
    isConstrained: boolean
  ): void {
    const box = isConstrained
      ? this.getConstrainedBox(start, current)
      : this.getBoundingBox(start, current);

    shape.set({
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
    });
  }

  protected isValidSize(shape: any): boolean {
    return shape.width >= this.options.minSize || shape.height >= this.options.minSize;
  }

  /**
   * Programmatically create a rectangle
   * @param x - X position
   * @param y - Y position
   * @param width - Width
   * @param height - Height
   * @param options - Additional options
   * @returns Created rectangle object
   */
  createRect(
    x: number,
    y: number,
    width: number,
    height: number,
    options: Partial<ShapeStyle> = {}
  ): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Rect || !this.canvas) return null;

    const rect = new fabric.Rect({
      left: x,
      top: y,
      width,
      height,
      fill: options.fill ?? this.style.fill,
      stroke: options.stroke ?? this.style.stroke,
      strokeWidth: options.strokeWidth ?? this.style.strokeWidth,
      strokeUniform: true,
    });

    this.canvas.add(rect);
    this.canvas.requestRenderAll();

    return rect;
  }
}

/**
 * Ellipse Tool - draws ellipses and circles
 */
export class EllipseTool extends ShapeTool {
  readonly name = 'ellipse';
  readonly icon = 'circle';
  readonly shortcut = 'e';

  protected createShape(start: Point): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Ellipse) return null;

    return new fabric.Ellipse({
      left: start.x,
      top: start.y,
      rx: 0,
      ry: 0,
      fill: this.style.fill,
      stroke: this.style.stroke,
      strokeWidth: this.style.strokeWidth,
      strokeUniform: this.style.strokeUniform,
      originX: 'center',
      originY: 'center',
    });
  }

  protected updateShape(
    shape: any,
    start: Point,
    current: Point,
    isConstrained: boolean
  ): void {
    let rx = Math.abs(current.x - start.x);
    let ry = Math.abs(current.y - start.y);

    if (isConstrained) {
      const radius = Math.max(rx, ry);
      rx = radius;
      ry = radius;
    }

    shape.set({
      left: start.x,
      top: start.y,
      rx,
      ry,
    });
  }

  protected isValidSize(shape: any): boolean {
    return shape.rx >= this.options.minSize || shape.ry >= this.options.minSize;
  }

  /**
   * Programmatically create an ellipse
   * @param cx - Center X
   * @param cy - Center Y
   * @param rx - Horizontal radius
   * @param ry - Vertical radius
   * @param options - Additional options
   * @returns Created ellipse object
   */
  createEllipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    options: Partial<ShapeStyle> = {}
  ): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Ellipse || !this.canvas) return null;

    const ellipse = new fabric.Ellipse({
      left: cx,
      top: cy,
      rx,
      ry,
      fill: options.fill ?? this.style.fill,
      stroke: options.stroke ?? this.style.stroke,
      strokeWidth: options.strokeWidth ?? this.style.strokeWidth,
      strokeUniform: true,
      originX: 'center',
      originY: 'center',
    });

    this.canvas.add(ellipse);
    this.canvas.requestRenderAll();

    return ellipse;
  }

  /**
   * Programmatically create a circle
   * @param cx - Center X
   * @param cy - Center Y
   * @param radius - Radius
   * @param options - Additional options
   * @returns Created circle object
   */
  createCircle(
    cx: number,
    cy: number,
    radius: number,
    options: Partial<ShapeStyle> = {}
  ): any {
    return this.createEllipse(cx, cy, radius, radius, options);
  }
}

/**
 * Line Tool - draws straight lines
 */
export class LineTool extends ShapeTool {
  readonly name = 'line';
  readonly icon = 'minus';
  readonly shortcut = 'l';

  protected createShape(start: Point): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Line) return null;

    return new fabric.Line([start.x, start.y, start.x, start.y], {
      stroke: this.style.stroke,
      strokeWidth: this.style.strokeWidth,
      strokeUniform: this.style.strokeUniform,
      originX: 'center',
      originY: 'center',
    });
  }

  protected updateShape(
    shape: any,
    start: Point,
    current: Point,
    isConstrained: boolean
  ): void {
    let endPoint = current;

    if (isConstrained) {
      endPoint = this.getConstrainedEndpoint(start, current);
    }

    shape.set({
      x2: endPoint.x,
      y2: endPoint.y,
    });
  }

  protected isValidSize(shape: any): boolean {
    const length = Math.hypot(shape.x2 - shape.x1, shape.y2 - shape.y1);
    return length >= this.options.minSize;
  }

  /**
   * Calculate endpoint constrained to 45-degree angles
   * @param start - Start point
   * @param current - Current point
   * @returns Constrained endpoint
   */
  private getConstrainedEndpoint(start: Point, current: Point): Point {
    const dx = current.x - start.x;
    const dy = current.y - start.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.hypot(dx, dy);

    // Snap to nearest 45-degree angle
    const snapAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);

    return {
      x: start.x + length * Math.cos(snapAngle),
      y: start.y + length * Math.sin(snapAngle),
    };
  }

  /**
   * Programmatically create a line
   * @param x1 - Start X
   * @param y1 - Start Y
   * @param x2 - End X
   * @param y2 - End Y
   * @param options - Additional options
   * @returns Created line object
   */
  createLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options: Partial<ShapeStyle> = {}
  ): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Line || !this.canvas) return null;

    const line = new fabric.Line([x1, y1, x2, y2], {
      stroke: options.stroke ?? this.style.stroke,
      strokeWidth: options.strokeWidth ?? this.style.strokeWidth,
      strokeUniform: true,
    });

    this.canvas.add(line);
    this.canvas.requestRenderAll();

    return line;
  }
}

/**
 * Arrow Tool - draws arrows with arrowheads
 */
export class ArrowTool extends ShapeTool {
  readonly name = 'arrow';
  readonly icon = 'arrow-right';
  readonly shortcut = 'a';

  /** Arrow head size in pixels */
  private arrowHeadSize = 15;

  /** Whether arrow is double-headed */
  private doubleHeaded = false;

  protected createShape(start: Point): any {
    return this.createArrowGroup(start, start);
  }

  protected updateShape(
    shape: any,
    start: Point,
    current: Point,
    isConstrained: boolean
  ): void {
    let endPoint = current;

    if (isConstrained) {
      endPoint = this.getConstrainedEndpoint(start, current);
    }

    // Remove old group and create new one
    if (this.canvas) {
      this.canvas.remove(shape);
      this.currentShape = this.createArrowGroup(start, endPoint);
      this.currentShape.set({
        selectable: false,
        evented: false,
      });
      this.canvas.add(this.currentShape);
    }
  }

  protected isValidSize(shape: any): boolean {
    const data = shape.arrowData;
    if (!data) return false;

    const length = Math.hypot(data.end.x - data.start.x, data.end.y - data.start.y);
    return length >= 10;
  }

  /**
   * Create arrow as a group (line + arrowheads)
   * @param start - Start point
   * @param end - End point
   * @returns Fabric.js Group object
   */
  private createArrowGroup(start: Point, end: Point): any {
    const fabric = (window as any).fabric;
    if (!fabric) return null;

    const elements: any[] = [];

    // Main line
    const line = new fabric.Line([start.x, start.y, end.x, end.y], {
      stroke: this.style.stroke,
      strokeWidth: this.style.strokeWidth,
      strokeUniform: true,
    });
    elements.push(line);

    // Calculate arrow direction
    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    // End arrow head
    const endHead = this.createArrowHead(end, angle);
    if (endHead) elements.push(endHead);

    // Start arrow head (if double-headed)
    if (this.doubleHeaded) {
      const startHead = this.createArrowHead(start, angle + Math.PI);
      if (startHead) elements.push(startHead);
    }

    // Create group
    const group = new fabric.Group(elements, {
      selectable: false,
      evented: false,
    });

    // Store arrow metadata for later use
    group.arrowData = {
      start: { ...start },
      end: { ...end },
      doubleHeaded: this.doubleHeaded,
      headSize: this.arrowHeadSize,
    };

    return group;
  }

  /**
   * Create an arrow head polygon
   * @param tip - Arrow tip position
   * @param angle - Direction angle in radians
   * @returns Fabric.js Polygon object
   */
  private createArrowHead(tip: Point, angle: number): any {
    const fabric = (window as any).fabric;
    if (!fabric?.Polygon) return null;

    const size = this.arrowHeadSize;
    const headAngle = Math.PI / 6; // 30 degrees

    const points = [
      { x: tip.x, y: tip.y },
      {
        x: tip.x - size * Math.cos(angle - headAngle),
        y: tip.y - size * Math.sin(angle - headAngle),
      },
      {
        x: tip.x - size * Math.cos(angle + headAngle),
        y: tip.y - size * Math.sin(angle + headAngle),
      },
    ];

    return new fabric.Polygon(points, {
      fill: this.style.stroke,
      stroke: this.style.stroke,
      strokeWidth: 1,
    });
  }

  /**
   * Calculate endpoint constrained to 45-degree angles
   * @param start - Start point
   * @param current - Current point
   * @returns Constrained endpoint
   */
  private getConstrainedEndpoint(start: Point, current: Point): Point {
    const dx = current.x - start.x;
    const dy = current.y - start.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.hypot(dx, dy);

    const snapAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);

    return {
      x: start.x + length * Math.cos(snapAngle),
      y: start.y + length * Math.sin(snapAngle),
    };
  }

  /**
   * Set arrow head size
   * @param size - Size in pixels
   */
  setArrowHeadSize(size: number): void {
    this.arrowHeadSize = Math.max(5, Math.min(50, size));
  }

  /**
   * Set double-headed mode
   * @param enabled - Whether arrow is double-headed
   */
  setDoubleHeaded(enabled: boolean): void {
    this.doubleHeaded = enabled;
  }

  /**
   * Programmatically create an arrow
   * @param start - Start point
   * @param end - End point
   * @param options - Arrow options
   * @returns Created arrow group
   */
  createArrow(
    start: Point,
    end: Point,
    options: { doubleHeaded?: boolean; headSize?: number } = {}
  ): any {
    if (!this.canvas) return null;

    const prevDoubleHeaded = this.doubleHeaded;
    const prevHeadSize = this.arrowHeadSize;

    if (options.doubleHeaded !== undefined) {
      this.doubleHeaded = options.doubleHeaded;
    }
    if (options.headSize !== undefined) {
      this.arrowHeadSize = options.headSize;
    }

    const arrow = this.createArrowGroup(start, end);
    if (arrow) {
      arrow.set({
        selectable: true,
        evented: true,
      });
      this.canvas.add(arrow);
      this.canvas.requestRenderAll();
    }

    this.doubleHeaded = prevDoubleHeaded;
    this.arrowHeadSize = prevHeadSize;

    return arrow;
  }
}

// ============================================================================
// Default Export
// ============================================================================

export default ShapeTool;
