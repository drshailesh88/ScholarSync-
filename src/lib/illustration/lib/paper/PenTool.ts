/**
 * Professional Pen Tool with Bezier Curve Support
 *
 * Features:
 * - Click to add anchor points
 * - Drag to create bezier curve handles
 * - Hold Shift for constrained angles
 * - Double-click to close path
 * - ESC to finish open path
 */

import paper from 'paper';

export interface PenToolOptions {
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string | null;
  smoothing?: boolean;
  onPathComplete?: (path: paper.Path, svgData: string) => void;
  onPathUpdate?: (path: paper.Path) => void;
}

export interface PenToolState {
  isDrawing: boolean;
  currentPath: paper.Path | null;
  currentSegment: paper.Segment | null;
  handleIn: paper.Point | null;
  handleOut: paper.Point | null;
}

export class PenTool {
  private tool: paper.Tool;
  private options: Required<PenToolOptions>;
  private state: PenToolState;
  private guideLines: paper.Group;
  private handleVisuals: paper.Group;

  constructor(_scope: paper.PaperScope, options: PenToolOptions = {}) {
    this.options = {
      strokeColor: options.strokeColor || '#000000',
      strokeWidth: options.strokeWidth || 2,
      fillColor: options.fillColor ?? null,
      smoothing: options.smoothing ?? false,
      onPathComplete: options.onPathComplete || (() => {}),
      onPathUpdate: options.onPathUpdate || (() => {}),
    };

    this.state = {
      isDrawing: false,
      currentPath: null,
      currentSegment: null,
      handleIn: null,
      handleOut: null,
    };

    // Create groups for visual guides
    this.guideLines = new paper.Group();
    this.handleVisuals = new paper.Group();

    // Create the Paper.js tool
    this.tool = new paper.Tool();
    this.setupToolEvents();
  }

  private setupToolEvents(): void {
    this.tool.onMouseDown = this.handleMouseDown.bind(this);
    this.tool.onMouseDrag = this.handleMouseDrag.bind(this);
    this.tool.onMouseUp = this.handleMouseUp.bind(this);
    this.tool.onMouseMove = this.handleMouseMove.bind(this);
    this.tool.onKeyDown = this.handleKeyDown.bind(this);
  }

  private handleMouseDown(event: paper.ToolEvent): void {
    const point = event.point;
    // Check for double-click by examining count property
    const isDoubleClick = event.count === 2;

    // Check if clicking near the start point to close the path
    if (this.state.currentPath && this.state.currentPath.segments.length > 1) {
      const firstPoint = this.state.currentPath.firstSegment.point;
      if (point.getDistance(firstPoint) < 10) {
        this.closePath();
        return;
      }
    }

    if (isDoubleClick && this.state.currentPath) {
      this.completePath();
      return;
    }

    if (!this.state.currentPath) {
      // Start a new path
      this.state.currentPath = new paper.Path({
        strokeColor: this.options.strokeColor,
        strokeWidth: this.options.strokeWidth,
        fillColor: this.options.fillColor,
      });
      this.state.isDrawing = true;
    }

    // Add a new segment
    const result = this.state.currentPath.add(point);
    // Handle both single segment and array returns
    this.state.currentSegment = Array.isArray(result) ? result[0] : result;
    this.state.handleIn = null;
    this.state.handleOut = null;
  }

  private handleMouseDrag(event: paper.ToolEvent): void {
    if (!this.state.currentSegment || !this.state.currentPath) return;

    const point = event.point;
    let delta = point.subtract(this.state.currentSegment.point);

    // Constrain to 45-degree angles if Shift is held
    if (event.modifiers.shift) {
      delta = this.constrainAngle(delta);
    }

    // Set handle out (direction of curve leaving this point)
    this.state.currentSegment.handleOut = delta;

    // Set handle in (opposite direction for smooth curve)
    this.state.currentSegment.handleIn = delta.multiply(-1);

    this.updateHandleVisuals();
    this.options.onPathUpdate(this.state.currentPath);
  }

  private handleMouseUp(_event: paper.ToolEvent): void {
    this.clearHandleVisuals();

    if (this.state.currentPath) {
      this.options.onPathUpdate(this.state.currentPath);
    }
  }

  private handleMouseMove(event: paper.ToolEvent): void {
    if (!this.state.currentPath || this.state.currentPath.segments.length === 0) return;

    this.clearGuideLines();

    // Draw preview line to cursor
    const lastPoint = this.state.currentPath.lastSegment.point;
    const guideLine = new paper.Path.Line({
      from: lastPoint,
      to: event.point,
      strokeColor: '#0066FF',
      strokeWidth: 1,
      dashArray: [4, 4],
    });
    this.guideLines.addChild(guideLine);

    // Show close indicator when near start point
    if (this.state.currentPath.segments.length > 1) {
      const firstPoint = this.state.currentPath.firstSegment.point;
      if (event.point.getDistance(firstPoint) < 10) {
        const closeIndicator = new paper.Shape.Circle({
          center: firstPoint,
          radius: 8,
          strokeColor: '#0066FF',
          strokeWidth: 2,
          fillColor: null,
        });
        this.guideLines.addChild(closeIndicator);
      }
    }
  }

  private handleKeyDown(event: paper.KeyEvent): void {
    if (event.key === 'escape') {
      if (this.state.currentPath && this.state.currentPath.segments.length > 0) {
        this.completePath();
      } else {
        this.cancelPath();
      }
    } else if (event.key === 'backspace' || event.key === 'delete') {
      this.removeLastSegment();
    } else if (event.key === 'enter') {
      if (this.state.currentPath) {
        this.completePath();
      }
    }
  }

  private constrainAngle(delta: paper.Point): paper.Point {
    const angle = Math.atan2(delta.y, delta.x);
    const snapAngles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, -Math.PI / 4, -Math.PI / 2, -(3 * Math.PI) / 4];

    let closestAngle = snapAngles[0];
    let minDiff = Math.abs(angle - snapAngles[0]);

    for (const snapAngle of snapAngles) {
      const diff = Math.abs(angle - snapAngle);
      if (diff < minDiff) {
        minDiff = diff;
        closestAngle = snapAngle;
      }
    }

    const length = delta.length;
    return new paper.Point(Math.cos(closestAngle) * length, Math.sin(closestAngle) * length);
  }

  private updateHandleVisuals(): void {
    this.clearHandleVisuals();

    if (!this.state.currentSegment) return;

    const segmentPoint = this.state.currentSegment.point;
    const handleIn = this.state.currentSegment.handleIn;
    const handleOut = this.state.currentSegment.handleOut;

    // Draw handle lines
    if (handleIn && handleIn.length > 0) {
      const handleInLine = new paper.Path.Line({
        from: segmentPoint,
        to: segmentPoint.add(handleIn),
        strokeColor: '#FF6600',
        strokeWidth: 1,
      });
      this.handleVisuals.addChild(handleInLine);

      const handleInCircle = new paper.Shape.Circle({
        center: segmentPoint.add(handleIn),
        radius: 4,
        fillColor: '#FF6600',
        strokeColor: '#FFFFFF',
        strokeWidth: 1,
      });
      this.handleVisuals.addChild(handleInCircle);
    }

    if (handleOut && handleOut.length > 0) {
      const handleOutLine = new paper.Path.Line({
        from: segmentPoint,
        to: segmentPoint.add(handleOut),
        strokeColor: '#FF6600',
        strokeWidth: 1,
      });
      this.handleVisuals.addChild(handleOutLine);

      const handleOutCircle = new paper.Shape.Circle({
        center: segmentPoint.add(handleOut),
        radius: 4,
        fillColor: '#FF6600',
        strokeColor: '#FFFFFF',
        strokeWidth: 1,
      });
      this.handleVisuals.addChild(handleOutCircle);
    }

    // Draw anchor point
    const anchorCircle = new paper.Shape.Circle({
      center: segmentPoint,
      radius: 5,
      fillColor: '#0066FF',
      strokeColor: '#FFFFFF',
      strokeWidth: 1,
    });
    this.handleVisuals.addChild(anchorCircle);
  }

  private clearGuideLines(): void {
    this.guideLines.removeChildren();
  }

  private clearHandleVisuals(): void {
    this.handleVisuals.removeChildren();
  }

  private closePath(): void {
    if (!this.state.currentPath) return;
    this.state.currentPath.closePath();
    this.completePath();
  }

  private completePath(): void {
    if (!this.state.currentPath) return;

    this.clearGuideLines();
    this.clearHandleVisuals();

    if (this.options.smoothing) {
      this.state.currentPath.smooth();
    }

    const svgData = this.state.currentPath.pathData;
    this.options.onPathComplete(this.state.currentPath, svgData);

    this.resetState();
  }

  private cancelPath(): void {
    if (this.state.currentPath) {
      this.state.currentPath.remove();
    }
    this.clearGuideLines();
    this.clearHandleVisuals();
    this.resetState();
  }

  private removeLastSegment(): void {
    if (!this.state.currentPath || this.state.currentPath.segments.length === 0) return;

    this.state.currentPath.lastSegment.remove();

    if (this.state.currentPath.segments.length === 0) {
      this.cancelPath();
    } else {
      this.state.currentSegment = this.state.currentPath.lastSegment;
    }
  }

  private resetState(): void {
    this.state = {
      isDrawing: false,
      currentPath: null,
      currentSegment: null,
      handleIn: null,
      handleOut: null,
    };
  }

  /**
   * Activate this tool
   */
  public activate(): void {
    this.tool.activate();
  }

  /**
   * Deactivate and clean up
   */
  public deactivate(): void {
    this.clearGuideLines();
    this.clearHandleVisuals();
    if (this.state.currentPath) {
      this.completePath();
    }
  }

  /**
   * Update tool options
   */
  public setOptions(options: Partial<PenToolOptions>): void {
    Object.assign(this.options, options);
  }

  /**
   * Get the current path being drawn
   */
  public getCurrentPath(): paper.Path | null {
    return this.state.currentPath;
  }

  /**
   * Check if tool is currently drawing
   */
  public isDrawing(): boolean {
    return this.state.isDrawing;
  }
}

/**
 * Utility: Convert Paper.js path to Fabric.js compatible SVG
 */
export function pathToFabricSvg(path: paper.Path): string {
  const pathData = path.pathData;
  const strokeColor = path.strokeColor?.toCSS(true) || '#000000';
  const strokeWidth = path.strokeWidth || 1;
  const fillColor = path.fillColor?.toCSS(true) || 'none';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${path.bounds.width} ${path.bounds.height}">
    <path d="${pathData}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}"/>
  </svg>`;
}

/**
 * Utility: Get SVG path data string from Paper.js path
 */
export function getSvgPathData(path: paper.Path): string {
  return path.pathData;
}

export default PenTool;
