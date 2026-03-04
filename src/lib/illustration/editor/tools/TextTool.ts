/**
 * FINNISH Text Tool
 * Add and edit text on the canvas
 *
 * Features:
 * - Click to create new text
 * - Double-click to edit existing text
 * - Configurable font family, size, and color
 * - Text styling (bold, italic, underline)
 * - Text alignment
 *
 * @module editor/tools/TextTool
 */

import type { FabricCanvas } from '../../types/index.js';
import type { Tool, ToolMouseEvent, ToolKeyEvent, Point } from './ToolRegistry.js';

// ============================================================================
// Types
// ============================================================================

/**
 * Text style configuration
 */
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fill: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  underline: boolean;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
}

/**
 * Text created event data
 */
export interface TextCreatedEvent {
  text: any;
  isNew: boolean;
}

/**
 * Text tool configuration options
 */
export interface TextToolOptions {
  /** Default font family */
  fontFamily?: string;
  /** Default font size */
  fontSize?: number;
  /** Default text color */
  fill?: string;
  /** Default placeholder text */
  placeholder?: string;
}

// ============================================================================
// Text Tool Implementation
// ============================================================================

/**
 * Text Tool - handles text creation and editing
 *
 * @example
 * ```typescript
 * import { TextTool, toolRegistry } from '@/editor/tools';
 *
 * const textTool = new TextTool({
 *   fontFamily: 'Arial',
 *   fontSize: 24,
 *   fill: '#000000',
 * });
 *
 * toolRegistry.register(textTool);
 * toolRegistry.setActive('text', canvas);
 * ```
 */
export class TextTool implements Tool {
  readonly name = 'text';
  readonly icon = 'type';
  readonly cursor = 'text';
  readonly shortcut = 't';
  readonly category = 'text';

  /** Canvas reference */
  private canvas: FabricCanvas | null = null;

  /** Currently active/editing text object */
  private currentText: any = null;

  /** Whether the tool is active */
  private isActive = false;

  /** Whether currently in text editing mode */
  private isEditing = false;

  /** Default text styles */
  private style: TextStyle;

  /** Configuration options */
  private options: Required<TextToolOptions>;

  /** Text created callback */
  private onTextCreated?: (event: TextCreatedEvent) => void;

  /** Text editing started callback */
  private onEditStart?: (text: any) => void;

  /** Text editing ended callback */
  private onEditEnd?: (text: any) => void;

  constructor(options: TextToolOptions = {}) {
    this.options = {
      fontFamily: options.fontFamily ?? 'Arial',
      fontSize: options.fontSize ?? 24,
      fill: options.fill ?? '#000000',
      placeholder: options.placeholder ?? 'Text',
    };

    this.style = {
      fontFamily: this.options.fontFamily,
      fontSize: this.options.fontSize,
      fill: this.options.fill,
      fontWeight: 'normal',
      fontStyle: 'normal',
      underline: false,
      textAlign: 'left',
      lineHeight: 1.2,
    };
  }

  // ==========================================================================
  // Lifecycle Methods
  // ==========================================================================

  /**
   * Activate the text tool
   * @param canvas - Fabric.js canvas instance
   */
  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;

    // Disable marquee selection
    canvas.selection = false;

    // Allow clicking on text objects to edit them
    canvas.forEachObject((obj: any) => {
      const isText = obj.type === 'i-text' || obj.type === 'textbox';
      obj.selectable = isText;
      obj.evented = isText;
    });

    // Set cursor
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;
  }

  /**
   * Deactivate the text tool
   * @param _canvas - Fabric.js canvas instance
   */
  deactivate(_canvas: FabricCanvas): void {
    this.isActive = false;

    // Exit text editing mode if active
    if (this.currentText && this.isEditing) {
      this.exitEditMode();
    }

    this.currentText = null;
    this.isEditing = false;
  }

  // ==========================================================================
  // Mouse Event Handlers
  // ==========================================================================

  /**
   * Handle mouse down - create or select text
   * @param e - Mouse event data
   */
  onMouseDown(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    const target = e.target;
    const point = this.getPointer(e);

    // Check if clicking on existing text
    if (target && (target.type === 'i-text' || target.type === 'textbox')) {
      // Select existing text but don't enter edit mode yet
      // (Double-click will enter edit mode)
      this.currentText = target;
      this.canvas.setActiveObject(target);
    } else if (!this.isEditing) {
      // Clicked on empty space - create new text
      this.createText(point);
    }
  }

  /**
   * Handle mouse move
   * @param _e - Mouse event data
   */
  onMouseMove(_e: ToolMouseEvent): void {
    // No special behavior during mouse move for text tool
  }

  /**
   * Handle mouse up
   * @param _e - Mouse event data
   */
  onMouseUp(_e: ToolMouseEvent): void {
    // No special behavior during mouse up for text tool
  }

  /**
   * Handle double click - enter edit mode
   * @param e - Mouse event data
   */
  onDoubleClick(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    const target = e.target;

    if (target && (target.type === 'i-text' || target.type === 'textbox')) {
      // Double-clicked on text - enter edit mode
      this.currentText = target;
      this.enterEditMode();
    }
  }

  // ==========================================================================
  // Keyboard Event Handlers
  // ==========================================================================

  /**
   * Handle key down
   * @param e - Keyboard event
   */
  onKeyDown(e: ToolKeyEvent): void {
    if (!this.isActive) return;

    // Escape to exit editing
    if (e.key === 'Escape') {
      if (this.currentText && this.isEditing) {
        this.exitEditMode();
        e.preventDefault();
      }
    }

    // Enter to confirm and exit (when not in multi-line mode)
    // Note: In IText, Enter creates a new line by default
  }

  /**
   * Handle key up
   * @param _e - Keyboard event
   */
  onKeyUp(_e: ToolKeyEvent): void {
    // No special key up handling needed
  }

  // ==========================================================================
  // Text Creation Methods
  // ==========================================================================

  /**
   * Create new text at position
   * @param position - Position to create text
   */
  createText(position: Point): void {
    if (!this.canvas) return;

    const fabric = (window as any).fabric;
    if (!fabric?.IText) return;

    // Create an IText object (interactive text)
    this.currentText = new fabric.IText(this.options.placeholder, {
      left: position.x,
      top: position.y,
      fontFamily: this.style.fontFamily,
      fontSize: this.style.fontSize,
      fill: this.style.fill,
      fontWeight: this.style.fontWeight,
      fontStyle: this.style.fontStyle,
      underline: this.style.underline,
      textAlign: this.style.textAlign,
      lineHeight: this.style.lineHeight,
      selectable: true,
      evented: true,
      editable: true,
    });

    this.canvas.add(this.currentText);

    // Enter edit mode immediately
    this.enterEditMode();

    // Select all text for easy replacement
    this.currentText.selectAll();

    // Emit text created event
    if (this.onTextCreated) {
      this.onTextCreated({
        text: this.currentText,
        isNew: true,
      });
    }
  }

  /**
   * Create a text box with text wrapping
   * @param position - Position to create textbox
   * @param width - Box width
   * @returns Created textbox object
   */
  createTextbox(position: Point, width = 200): any {
    if (!this.canvas) return null;

    const fabric = (window as any).fabric;
    if (!fabric?.Textbox) return null;

    const textbox = new fabric.Textbox(this.options.placeholder, {
      left: position.x,
      top: position.y,
      width,
      fontFamily: this.style.fontFamily,
      fontSize: this.style.fontSize,
      fill: this.style.fill,
      fontWeight: this.style.fontWeight,
      fontStyle: this.style.fontStyle,
      underline: this.style.underline,
      textAlign: this.style.textAlign,
      lineHeight: this.style.lineHeight,
      selectable: true,
      evented: true,
      editable: true,
    });

    this.canvas.add(textbox);
    this.canvas.setActiveObject(textbox);

    textbox.enterEditing();
    textbox.selectAll();

    this.currentText = textbox;
    this.isEditing = true;

    if (this.onTextCreated) {
      this.onTextCreated({
        text: textbox,
        isNew: true,
      });
    }

    return textbox;
  }

  // ==========================================================================
  // Edit Mode Methods
  // ==========================================================================

  /**
   * Enter text editing mode
   */
  enterEditMode(): void {
    if (!this.currentText || !this.canvas) return;

    this.isEditing = true;
    this.canvas.setActiveObject(this.currentText);
    this.currentText.enterEditing();

    if (this.onEditStart) {
      this.onEditStart(this.currentText);
    }
  }

  /**
   * Exit text editing mode
   */
  exitEditMode(): void {
    if (!this.currentText) return;

    this.currentText.exitEditing();
    this.isEditing = false;

    // Remove empty text objects
    const text = this.currentText.text?.trim();
    if (!text || text === this.options.placeholder) {
      this.canvas?.remove(this.currentText);
    } else {
      this.currentText.setCoords();

      if (this.onEditEnd) {
        this.onEditEnd(this.currentText);
      }
    }

    this.canvas?.requestRenderAll();
  }

  /**
   * Check if currently editing text
   * @returns true if in edit mode
   */
  isInEditMode(): boolean {
    return this.isEditing;
  }

  /**
   * Get the currently active text object
   * @returns Current text object or null
   */
  getCurrentText(): any {
    return this.currentText;
  }

  // ==========================================================================
  // Style Methods
  // ==========================================================================

  /**
   * Get current text style
   * @returns Current text style
   */
  getStyle(): TextStyle {
    return { ...this.style };
  }

  /**
   * Set text style
   * @param style - Partial style to merge
   */
  setStyle(style: Partial<TextStyle>): void {
    Object.assign(this.style, style);

    // Apply to current text if editing
    if (this.currentText && this.isEditing) {
      this.applyStyleToCurrentText(style);
    }
  }

  /**
   * Set font family
   * @param fontFamily - Font family name
   */
  setFontFamily(fontFamily: string): void {
    this.style.fontFamily = fontFamily;
    if (this.currentText && this.isEditing) {
      this.currentText.set('fontFamily', fontFamily);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Set font size
   * @param fontSize - Font size in pixels
   */
  setFontSize(fontSize: number): void {
    this.style.fontSize = Math.max(1, fontSize);
    if (this.currentText && this.isEditing) {
      this.currentText.set('fontSize', this.style.fontSize);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Set text color
   * @param color - CSS color string
   */
  setFill(color: string): void {
    this.style.fill = color;
    if (this.currentText && this.isEditing) {
      this.currentText.set('fill', color);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Toggle bold
   * @returns New bold state
   */
  toggleBold(): boolean {
    const isBold = this.style.fontWeight === 'bold';
    this.style.fontWeight = isBold ? 'normal' : 'bold';

    if (this.currentText) {
      this.currentText.set('fontWeight', this.style.fontWeight);
      this.canvas?.requestRenderAll();
    }

    return !isBold;
  }

  /**
   * Toggle italic
   * @returns New italic state
   */
  toggleItalic(): boolean {
    const isItalic = this.style.fontStyle === 'italic';
    this.style.fontStyle = isItalic ? 'normal' : 'italic';

    if (this.currentText) {
      this.currentText.set('fontStyle', this.style.fontStyle);
      this.canvas?.requestRenderAll();
    }

    return !isItalic;
  }

  /**
   * Toggle underline
   * @returns New underline state
   */
  toggleUnderline(): boolean {
    this.style.underline = !this.style.underline;

    if (this.currentText) {
      this.currentText.set('underline', this.style.underline);
      this.canvas?.requestRenderAll();
    }

    return this.style.underline;
  }

  /**
   * Set text alignment
   * @param align - Text alignment
   */
  setTextAlign(align: 'left' | 'center' | 'right' | 'justify'): void {
    this.style.textAlign = align;

    if (this.currentText) {
      this.currentText.set('textAlign', align);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Apply style object to current text
   * @param style - Style properties to apply
   */
  private applyStyleToCurrentText(style: Partial<TextStyle>): void {
    if (!this.currentText || !this.canvas) return;

    Object.entries(style).forEach(([key, value]) => {
      this.currentText.set(key, value);
    });

    this.canvas.requestRenderAll();
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  /**
   * Get pointer coordinates from event
   * @param e - Tool mouse event
   * @returns Point coordinates
   */
  private getPointer(e: ToolMouseEvent): Point {
    if (this.canvas) {
      return this.canvas.getPointer(e.e) as Point;
    }
    return { x: e.e.clientX, y: e.e.clientY };
  }

  // ==========================================================================
  // Event Callbacks
  // ==========================================================================

  /**
   * Set text created callback
   * @param callback - Callback function
   */
  setOnTextCreated(callback: (event: TextCreatedEvent) => void): void {
    this.onTextCreated = callback;
  }

  /**
   * Set edit start callback
   * @param callback - Callback function
   */
  setOnEditStart(callback: (text: any) => void): void {
    this.onEditStart = callback;
  }

  /**
   * Set edit end callback
   * @param callback - Callback function
   */
  setOnEditEnd(callback: (text: any) => void): void {
    this.onEditEnd = callback;
  }
}

// ============================================================================
// Pen Tool (for path drawing)
// ============================================================================

/**
 * Pen Tool - draws Bezier paths point by point
 */
export class PenTool implements Tool {
  readonly name = 'pen';
  readonly icon = 'pen-tool';
  readonly cursor = 'crosshair';
  readonly shortcut = 'p';
  readonly category = 'drawing';

  /** Canvas reference */
  private canvas: FabricCanvas | null = null;

  /** Whether the tool is active */
  private isActive = false;

  /** Path data as SVG commands */
  private pathData: (string | number)[][] = [];

  /** Current path object on canvas */
  private currentPath: any = null;

  /** Preview line for next segment */
  private previewLine: any = null;

  /** Point markers for visualization */
  private pointMarkers: any[] = [];

  /** Last anchor point */
  private lastPoint: Point | null = null;

  /** Last control point for smooth curves */
  private lastControlPoint: Point | null = null;

  /** Whether currently dragging to create curve */
  private isDrawingCurve = false;

  /** Whether currently dragging */
  private isDragging = false;

  /** Mouse start position */
  private startPoint: Point | null = null;

  /** Current mouse position */
  private currentPoint: Point | null = null;

  /** Stroke style */
  private stroke = '#000000';

  /** Stroke width */
  private strokeWidth = 2;

  // ==========================================================================
  // Lifecycle Methods
  // ==========================================================================

  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;

    canvas.selection = false;
    canvas.forEachObject((obj: any) => {
      obj.selectable = false;
      obj.evented = false;
    });

    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;
  }

  deactivate(_canvas: FabricCanvas): void {
    this.finishPath();
    this.clearPreview();
    this.isActive = false;
  }

  // ==========================================================================
  // Mouse Event Handlers
  // ==========================================================================

  onMouseDown(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    this.isDragging = true;
    this.startPoint = this.getPointer(e);
    this.currentPoint = { ...this.startPoint };

    // Check if clicking near first point to close path
    if (this.pathData.length > 0 && this.isNearFirstPoint(this.startPoint)) {
      this.closePath();
      return;
    }

    // Check for double-click to finish open path
    if ((e.e as any).detail === 2 && this.pathData.length > 0) {
      this.finishPath();
      return;
    }

    this.isDrawingCurve = false;
  }

  onMouseMove(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    this.currentPoint = this.getPointer(e);

    if (this.isDragging && this.startPoint) {
      // Dragging after click - creating curve
      this.isDrawingCurve = true;
      this.updateCurvePreview(this.currentPoint);
    } else if (this.lastPoint) {
      // Just moving - update preview line
      this.updatePreviewLine(this.currentPoint);
    }
  }

  onMouseUp(e: ToolMouseEvent): void {
    if (!this.isActive || !this.startPoint) return;

    this.currentPoint = this.getPointer(e);

    if (this.isDrawingCurve) {
      this.addCurvePoint(this.startPoint, this.currentPoint);
    } else {
      this.addPoint(this.startPoint);
    }

    this.isDragging = false;
    this.isDrawingCurve = false;
  }

  onKeyDown(e: ToolKeyEvent): void {
    if (!this.isActive) return;

    // Enter or Escape to finish path
    if ((e.key === 'Enter' || e.key === 'Escape') && this.pathData.length > 0) {
      this.finishPath();
      e.preventDefault();
    }

    // Backspace to remove last point
    if (e.key === 'Backspace' && this.pathData.length > 0) {
      this.removeLastPoint();
      e.preventDefault();
    }
  }

  onKeyUp(_e: ToolKeyEvent): void {
    // No special handling needed
  }

  // ==========================================================================
  // Path Building Methods
  // ==========================================================================

  /**
   * Add a straight line point
   */
  private addPoint(point: Point): void {
    if (this.pathData.length === 0) {
      this.pathData.push(['M', point.x, point.y]);
    } else {
      this.pathData.push(['L', point.x, point.y]);
    }

    this.lastPoint = point;
    this.lastControlPoint = null;

    this.addPointMarker(point);
    this.updatePath();
  }

  /**
   * Add a curve point with control handles
   */
  private addCurvePoint(anchor: Point, control: Point): void {
    const dx = control.x - anchor.x;
    const dy = control.y - anchor.y;
    const reflectedControl = {
      x: anchor.x - dx,
      y: anchor.y - dy,
    };

    if (this.pathData.length === 0) {
      this.pathData.push(['M', anchor.x, anchor.y]);
    } else if (this.lastControlPoint) {
      this.pathData.push([
        'C',
        this.lastControlPoint.x,
        this.lastControlPoint.y,
        reflectedControl.x,
        reflectedControl.y,
        anchor.x,
        anchor.y,
      ]);
    } else if (this.lastPoint) {
      this.pathData.push([
        'C',
        this.lastPoint.x,
        this.lastPoint.y,
        reflectedControl.x,
        reflectedControl.y,
        anchor.x,
        anchor.y,
      ]);
    }

    this.lastPoint = anchor;
    this.lastControlPoint = control;

    this.addPointMarker(anchor);
    this.updatePath();
  }

  /**
   * Remove the last point
   */
  private removeLastPoint(): void {
    if (this.pathData.length <= 1) {
      this.pathData = [];
      this.lastPoint = null;
      this.lastControlPoint = null;
    } else {
      this.pathData.pop();
      const lastCmd = this.pathData[this.pathData.length - 1];
      this.lastPoint = this.getPointFromCommand(lastCmd);
      this.lastControlPoint = null;
    }

    if (this.pointMarkers.length > 0) {
      const marker = this.pointMarkers.pop();
      this.canvas?.remove(marker);
    }

    this.updatePath();
  }

  /**
   * Close the path
   */
  private closePath(): void {
    if (this.pathData.length < 2) return;

    this.pathData.push(['Z']);
    this.finishPath(true);
  }

  /**
   * Finish and commit the path
   */
  private finishPath(_closed = false): void {
    if (this.pathData.length < 2) {
      this.clearPath();
      return;
    }

    if (this.currentPath) {
      this.currentPath.set({
        selectable: true,
        evented: true,
      });
      this.currentPath.setCoords();
    }

    this.clearPath();
  }

  /**
   * Clear current path state
   */
  private clearPath(): void {
    this.pathData = [];
    this.currentPath = null;
    this.lastPoint = null;
    this.lastControlPoint = null;
    this.clearPreview();
    this.clearMarkers();
    this.canvas?.requestRenderAll();
  }

  /**
   * Update the visual path on canvas
   */
  private updatePath(): void {
    if (!this.canvas) return;

    if (this.currentPath) {
      this.canvas.remove(this.currentPath);
    }

    if (this.pathData.length < 1) return;

    const fabric = (window as any).fabric;
    if (!fabric?.Path) return;

    const pathString = this.pathData.map((cmd) => cmd.join(' ')).join(' ');

    this.currentPath = new fabric.Path(pathString, {
      fill: 'transparent',
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      strokeUniform: true,
      selectable: false,
      evented: false,
    });

    this.canvas.add(this.currentPath);
    this.canvas.requestRenderAll();
  }

  // ==========================================================================
  // Preview Methods
  // ==========================================================================

  private updatePreviewLine(point: Point): void {
    if (!this.canvas || !this.lastPoint) return;

    const fabric = (window as any).fabric;
    if (!fabric?.Line) return;

    if (this.previewLine) {
      this.canvas.remove(this.previewLine);
    }

    this.previewLine = new fabric.Line(
      [this.lastPoint.x, this.lastPoint.y, point.x, point.y],
      {
        stroke: '#666666',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
      }
    );

    this.canvas.add(this.previewLine);
    this.canvas.requestRenderAll();
  }

  private updateCurvePreview(controlPoint: Point): void {
    if (!this.canvas || !this.startPoint) return;

    const fabric = (window as any).fabric;
    if (!fabric) return;

    this.clearPreview();

    const reflected = {
      x: 2 * this.startPoint.x - controlPoint.x,
      y: 2 * this.startPoint.y - controlPoint.y,
    };

    const handleLine = new fabric.Line(
      [reflected.x, reflected.y, controlPoint.x, controlPoint.y],
      {
        stroke: '#0066ff',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      }
    );

    this.canvas.add(handleLine);
    this.previewLine = handleLine;
    this.canvas.requestRenderAll();
  }

  private addPointMarker(point: Point): void {
    if (!this.canvas) return;

    const fabric = (window as any).fabric;
    if (!fabric?.Circle) return;

    const marker = new fabric.Circle({
      left: point.x,
      top: point.y,
      radius: 4,
      fill: '#ffffff',
      stroke: '#0066ff',
      strokeWidth: 2,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    });

    this.canvas.add(marker);
    this.pointMarkers.push(marker);
  }

  private clearPreview(): void {
    if (!this.canvas) return;

    if (this.previewLine) {
      this.canvas.remove(this.previewLine);
      this.previewLine = null;
    }
  }

  private clearMarkers(): void {
    if (!this.canvas) return;

    this.pointMarkers.forEach((marker) => {
      this.canvas!.remove(marker);
    });
    this.pointMarkers = [];
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  private getPointer(e: ToolMouseEvent): Point {
    if (this.canvas) {
      return this.canvas.getPointer(e.e) as Point;
    }
    return { x: e.e.clientX, y: e.e.clientY };
  }

  private isNearFirstPoint(point: Point): boolean {
    if (this.pathData.length < 2) return false;

    const firstCmd = this.pathData[0];
    const firstPoint = { x: firstCmd[1] as number, y: firstCmd[2] as number };
    const distance = Math.hypot(point.x - firstPoint.x, point.y - firstPoint.y);

    return distance < 10;
  }

  private getPointFromCommand(cmd: (string | number)[]): Point | null {
    const type = cmd[0];
    switch (type) {
      case 'M':
      case 'L':
        return { x: cmd[1] as number, y: cmd[2] as number };
      case 'C':
        return { x: cmd[5] as number, y: cmd[6] as number };
      case 'Q':
        return { x: cmd[3] as number, y: cmd[4] as number };
      default:
        return null;
    }
  }

  // ==========================================================================
  // Style Methods
  // ==========================================================================

  setStroke(stroke: string): void {
    this.stroke = stroke;
  }

  setStrokeWidth(width: number): void {
    this.strokeWidth = Math.max(1, width);
  }
}

export default TextTool;
