/**
 * Alignment Guides and Snap-to-Grid
 *
 * Provides smart alignment guides and grid snapping for canvas objects.
 * Detects edges, centers, and spacing relationships to help users align objects.
 *
 * @module alignment-guides
 */

import {
  Canvas as FabricCanvas,
  FabricObject,
  Line,
  Rect,
  Group,
} from 'fabric';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Alignment guide line
 */
export interface AlignmentGuide {
  axis: 'horizontal' | 'vertical';
  position: number;
  type: 'edge' | 'center' | 'spacing';
  sourceObjects: string[]; // Object IDs that define this guide
}

/**
 * Snap point for an object
 */
export interface SnapPoint {
  x: number;
  y: number;
  type: 'edge' | 'center' | 'corner';
  axis: 'x' | 'y' | 'both';
}

/**
 * Grid configuration
 */
export interface GridConfig {
  enabled: boolean;
  size: number;
  snapToGrid: boolean;
  color: string;
  opacity: number;
  subdivisions: number;
}

/**
 * Alignment configuration
 */
export interface AlignmentConfig {
  enabled: boolean;
  snapToEdges: boolean;
  snapToCenters: boolean;
  snapToSpacing: boolean;
  snapThreshold: number;
  guideColor: string;
  guideWidth: number;
}

/**
 * Combined snap/align settings
 */
export interface SnapConfig {
  grid: GridConfig;
  alignment: AlignmentConfig;
}

// =============================================================================
// DEFAULTS
// =============================================================================

export const DEFAULT_GRID_CONFIG: GridConfig = {
  enabled: true,
  size: 20,
  snapToGrid: true,
  color: '#e5e7eb',
  opacity: 0.5,
  subdivisions: 4,
};

export const DEFAULT_ALIGNMENT_CONFIG: AlignmentConfig = {
  enabled: true,
  snapToEdges: true,
  snapToCenters: true,
  snapToSpacing: false,
  snapThreshold: 8,
  guideColor: '#6366f1',
  guideWidth: 1,
};

export const DEFAULT_SNAP_CONFIG: SnapConfig = {
  grid: { ...DEFAULT_GRID_CONFIG },
  alignment: { ...DEFAULT_ALIGNMENT_CONFIG },
};

// =============================================================================
// ALIGNMENT MANAGER
// =============================================================================

/**
 * Manages alignment guides and snapping for canvas objects
 */
export class AlignmentManager {
  private canvas: FabricCanvas;
  private config: SnapConfig;

  // Guide visual elements (lines shown during drag)
  private guideLines: Line[] = [];

  // Grid visual
  private gridGroup: Group | null = null;

  // State tracking
  private activeObject: FabricObject | null = null;
  private isDragging = false;

  constructor(canvas: FabricCanvas, config?: Partial<SnapConfig>) {
    this.canvas = canvas;
    this.config = {
      grid: { ...DEFAULT_GRID_CONFIG, ...config?.grid },
      alignment: { ...DEFAULT_ALIGNMENT_CONFIG, ...config?.alignment },
    };

    this.setupEventListeners();
  }

  // ===========================================================================
  // EVENT LISTENERS
  // ===========================================================================

  private setupEventListeners(): void {
    this.canvas.on('object:moving', this.handleObjectMoving.bind(this));
    this.canvas.on('object:modified', this.handleObjectModified.bind(this));
    this.canvas.on('selection:created', this.handleSelectionCreated.bind(this));
    this.canvas.on('selection:cleared', this.handleSelectionCleared.bind(this));
    this.canvas.on('selection:updated', this.handleSelectionUpdated.bind(this));
  }

  private handleObjectMoving(): void {
    if (!this.config.alignment.enabled) return;

    const activeObj = this.canvas.getActiveObject();
    if (!activeObj || activeObj.type === 'activeSelection') return;

    this.isDragging = true;
    this.activeObject = activeObj;

    // Calculate snap and apply
    this.snapToGuides(activeObj);
    this.updateAlignmentGuides(activeObj);
  }

  private handleObjectModified(): void {
    this.clearGuideLines();
    this.isDragging = false;
  }

  private handleSelectionCreated(): void {
    // Could show alignment indicators here
  }

  private handleSelectionCleared(): void {
    this.clearGuideLines();
    this.activeObject = null;
    this.isDragging = false;
  }

  private handleSelectionUpdated(): void {
    // Handle multiple selection
  }

  // ===========================================================================
  // SNAP CALCULATION
  // ===========================================================================

  /**
   * Snap an object to alignment guides and grid
   */
  private snapToGuides(obj: FabricObject): void {
    const snapThreshold = this.config.alignment.snapThreshold;
    if (snapThreshold <= 0) return;

    const bounds = obj.getBoundingRect();
    const center = obj.getCenterPoint();

    // Get all snap points from other objects
    const otherObjects = this.canvas.getObjects().filter(
      o => o !== obj && o.get('data-type') !== 'guide'
    );

    const snapPoints: Array<{ x: number; y: number; type: string }> = [];

    for (const other of otherObjects) {
      const otherBounds = other.getBoundingRect();
      const otherCenter = other.getCenterPoint();

      // Edges
      snapPoints.push(
        { x: otherBounds.left, y: 0, type: 'left-edge' },
        { x: otherBounds.left + otherBounds.width, y: 0, type: 'right-edge' },
        { x: 0, y: otherBounds.top, type: 'top-edge' },
        { x: 0, y: otherBounds.top + otherBounds.height, type: 'bottom-edge' }
      );

      // Center
      snapPoints.push(
        { x: otherCenter.x, y: 0, type: 'center-x' },
        { x: 0, y: otherCenter.y, type: 'center-y' }
      );
    }

    // Check for snap to edges
    if (this.config.alignment.snapToEdges) {
      // Snap left edge
      for (const point of snapPoints) {
        if (point.type.includes('edge') || point.type === 'center-x') {
          const diff = Math.abs(bounds.left - point.x);
          if (diff < snapThreshold) {
            obj.set({ left: obj.left! + (point.x - bounds.left) });
            obj.setCoords();
            break;
          }
        }
      }

      // Snap top edge
      for (const point of snapPoints) {
        if (point.type.includes('edge') || point.type === 'center-y') {
          const diff = Math.abs(bounds.top - point.y);
          if (diff < snapThreshold) {
            obj.set({ top: obj.top! + (point.y - bounds.top) });
            obj.setCoords();
            break;
          }
        }
      }

      // Snap right edge
      const newBounds = obj.getBoundingRect();
      for (const point of snapPoints) {
        if (point.type.includes('edge')) {
          const diff = Math.abs(
            (newBounds.left + newBounds.width) - point.x
          );
          if (diff < snapThreshold) {
            obj.set({ left: obj.left! + (point.x - (newBounds.left + newBounds.width)) });
            obj.setCoords();
            break;
          }
        }
      }

      // Snap bottom edge
      const updatedBounds = obj.getBoundingRect();
      for (const point of snapPoints) {
        if (point.type.includes('edge')) {
          const diff = Math.abs(
            (updatedBounds.top + updatedBounds.height) - point.y
          );
          if (diff < snapThreshold) {
            obj.set({ top: obj.top! + (point.y - (updatedBounds.top + updatedBounds.height)) });
            obj.setCoords();
            break;
          }
        }
      }
    }

    // Check for snap to centers
    if (this.config.alignment.snapToCenters) {
      const currentCenter = obj.getCenterPoint();

      // Snap horizontal center
      for (const point of snapPoints) {
        if (point.type === 'center-x') {
          const diff = Math.abs(currentCenter.x - point.x);
          if (diff < snapThreshold) {
            obj.set({ left: obj.left! + (point.x - currentCenter.x) });
            obj.setCoords();
            break;
          }
        }
      }

      // Snap vertical center
      const newCenter = obj.getCenterPoint();
      for (const point of snapPoints) {
        if (point.type === 'center-y') {
          const diff = Math.abs(newCenter.y - point.y);
          if (diff < snapThreshold) {
            obj.set({ top: obj.top! + (point.y - newCenter.y) });
            obj.setCoords();
            break;
          }
        }
      }
    }

    // Snap to grid
    if (this.config.grid.snapToGrid) {
      this.snapToGrid(obj);
    }
  }

  /**
   * Snap object to grid
   */
  private snapToGrid(obj: FabricObject): void {
    const gridSize = this.config.grid.size;
    if (gridSize <= 0) return;

    const bounds = obj.getBoundingRect();

    // Snap left to grid
    const snappedLeft = Math.round(bounds.left / gridSize) * gridSize;
    if (Math.abs(bounds.left - snappedLeft) < this.config.alignment.snapThreshold) {
      obj.set({ left: obj.left! + (snappedLeft - bounds.left) });
    }

    // Snap top to grid
    obj.setCoords();
    const newBounds = obj.getBoundingRect();
    const snappedTop = Math.round(newBounds.top / gridSize) * gridSize;
    if (Math.abs(newBounds.top - snappedTop) < this.config.alignment.snapThreshold) {
      obj.set({ top: obj.top! + (snappedTop - newBounds.top) });
    }

    obj.setCoords();
  }

  // ===========================================================================
  // ALIGNMENT GUIDE VISUALS
  // ===========================================================================

  /**
   * Update alignment guide visuals based on object position
   */
  private updateAlignmentGuides(obj: FabricObject): void {
    this.clearGuideLines();

    const bounds = obj.getBoundingRect();
    const center = obj.getCenterPoint();
    const threshold = this.config.alignment.snapThreshold * 2;

    const otherObjects = this.canvas.getObjects().filter(
      o => o !== obj && o.get('data-type') !== 'guide'
    );

    const guidesToAdd: Array<{ axis: 'h' | 'v'; position: number }> = [];

    for (const other of otherObjects) {
      const otherBounds = other.getBoundingRect();
      const otherCenter = other.getCenterPoint();

      // Check horizontal alignment
      if (Math.abs(center.y - otherCenter.y) < threshold) {
        guidesToAdd.push({ axis: 'v', position: otherCenter.x });
        guidesToAdd.push({ axis: 'v', position: center.x });
      }

      if (Math.abs(bounds.top - otherBounds.top) < threshold) {
        guidesToAdd.push({ axis: 'h', position: otherBounds.top });
      }

      if (Math.abs((bounds.top + bounds.height) - (otherBounds.top + otherBounds.height)) < threshold) {
        guidesToAdd.push({ axis: 'h', position: otherBounds.top + otherBounds.height });
      }

      // Check vertical alignment
      if (Math.abs(center.x - otherCenter.x) < threshold) {
        guidesToAdd.push({ axis: 'h', position: otherCenter.y });
        guidesToAdd.push({ axis: 'h', position: center.y });
      }

      if (Math.abs(bounds.left - otherBounds.left) < threshold) {
        guidesToAdd.push({ axis: 'v', position: otherBounds.left });
      }

      if (Math.abs((bounds.left + bounds.width) - (otherBounds.left + otherBounds.width)) < threshold) {
        guidesToAdd.push({ axis: 'v', position: otherBounds.left + otherBounds.width });
      }
    }

    // Create guide lines
    const canvasWidth = this.canvas.width || 800;
    const canvasHeight = this.canvas.height || 600;

    for (const guide of guidesToAdd) {
      const line = new Line(
        guide.axis === 'h'
          ? [0, guide.position, canvasWidth, guide.position]
          : [guide.position, 0, guide.position, canvasHeight],
        {
          stroke: this.config.alignment.guideColor,
          strokeWidth: this.config.alignment.guideWidth,
          selectable: false,
          evented: false,
          'data-type': 'guide',
        }
      );
      this.canvas.add(line);
      this.guideLines.push(line);
    }

    this.canvas.requestRenderAll();
  }

  /**
   * Clear all alignment guide lines
   */
  private clearGuideLines(): void {
    for (const line of this.guideLines) {
      this.canvas.remove(line);
    }
    this.guideLines = [];
  }

  // ===========================================================================
  // GRID VISUALIZATION
  // ===========================================================================

  /**
   * Draw grid on canvas
   */
  drawGrid(): void {
    if (!this.config.grid.enabled) {
      this.clearGrid();
      return;
    }

    const width = this.canvas.width || 800;
    const height = this.canvas.height || 600;
    const gridSize = this.config.grid.size;

    // Clear existing grid
    this.clearGrid();

    const gridLines: FabricObject[] = [];

    // Create grid pattern using individual lines
    for (let x = 0; x <= width; x += gridSize) {
      gridLines.push(
        new Line([x, 0, x, height], {
          stroke: this.config.grid.color,
          strokeWidth: x % (gridSize * this.config.grid.subdivisions) === 0 ? 1 : 0.5,
          opacity: this.config.grid.opacity,
          selectable: false,
          evented: false,
          'data-type': 'grid',
        })
      );
    }

    for (let y = 0; y <= height; y += gridSize) {
      gridLines.push(
        new Line([0, y, width, y], {
          stroke: this.config.grid.color,
          strokeWidth: y % (gridSize * this.config.grid.subdivisions) === 0 ? 1 : 0.5,
          opacity: this.config.grid.opacity,
          selectable: false,
          evented: false,
          'data-type': 'grid',
        })
      );
    }

    this.gridGroup = new Group(gridLines, {
      selectable: false,
      evented: false,
    });
    this.gridGroup.set('data-type', 'grid');

    this.canvas.add(this.gridGroup);
    this.canvas.sendObjectToBack(this.gridGroup);
    this.canvas.requestRenderAll();
  }

  /**
   * Clear grid from canvas
   */
  clearGrid(): void {
    if (this.gridGroup) {
      this.canvas.remove(this.gridGroup);
      this.gridGroup = null;
    }

    // Also remove any remaining grid lines
    const gridLines = this.canvas.getObjects().filter(
      obj => obj.get('data-type') === 'grid'
    );
    for (const line of gridLines) {
      this.canvas.remove(line);
    }

    this.canvas.requestRenderAll();
  }

  // ===========================================================================
  // CONFIGURATION
  // ===========================================================================

  /**
   * Update snap configuration
   */
  updateConfig(config: Partial<SnapConfig>): void {
    if (config.grid) {
      this.config.grid = { ...this.config.grid, ...config.grid };
    }
    if (config.alignment) {
      this.config.alignment = { ...this.config.alignment, ...config.alignment };
    }

    // Redraw grid if enabled
    if (config.grid) {
      this.drawGrid();
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): SnapConfig {
    return { ...this.config };
  }

  /**
   * Enable/disable grid
   */
  setGridEnabled(enabled: boolean): void {
    this.config.grid.enabled = enabled;
    if (enabled) {
      this.drawGrid();
    } else {
      this.clearGrid();
    }
  }

  /**
   * Enable/disable snap to grid
   */
  setSnapToGrid(enabled: boolean): void {
    this.config.grid.snapToGrid = enabled;
  }

  /**
   * Enable/disable alignment guides
   */
  setAlignmentEnabled(enabled: boolean): void {
    this.config.alignment.enabled = enabled;
    if (!enabled) {
      this.clearGuideLines();
    }
  }

  /**
   * Set grid size
   */
  setGridSize(size: number): void {
    this.config.grid.size = size;
    if (this.config.grid.enabled) {
      this.drawGrid();
    }
  }

  // ===========================================================================
  // UTILITY FUNCTIONS
  // ===========================================================================

  /**
   * Align selected objects
   */
  alignSelected(alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'): void {
    const active = this.canvas.getActiveObject();
    if (!active || active.type !== 'activeSelection') return;

    const objects = (active as any).getObjects();
    if (objects.length < 2) return;

    const bounds = objects.map((obj: FabricObject) => obj.getBoundingRect());

    switch (alignment) {
      case 'left': {
        const minX = Math.min(...bounds.map((b: { left: number }) => b.left));
        objects.forEach((obj: FabricObject) => {
          const objBounds = obj.getBoundingRect();
          obj.set({ left: obj.left! + (minX - objBounds.left) });
        });
        break;
      }
      case 'center': {
        const avgCenterX =
          bounds.reduce((sum: number, b: { left: number; width: number }) => sum + b.left + b.width / 2, 0) / bounds.length;
        objects.forEach((obj: FabricObject) => {
          const objCenter = obj.getCenterPoint();
          obj.set({ left: obj.left! + (avgCenterX - objCenter.x) });
        });
        break;
      }
      case 'right': {
        const maxX = Math.max(...bounds.map((b: { left: number; width: number }) => b.left + b.width));
        objects.forEach((obj: FabricObject) => {
          const objBounds = obj.getBoundingRect();
          obj.set({ left: obj.left! + (maxX - (objBounds.left + objBounds.width)) });
        });
        break;
      }
      case 'top': {
        const minY = Math.min(...bounds.map((b: { top: number }) => b.top));
        objects.forEach((obj: FabricObject) => {
          const objBounds = obj.getBoundingRect();
          obj.set({ top: obj.top! + (minY - objBounds.top) });
        });
        break;
      }
      case 'middle': {
        const avgCenterY =
          bounds.reduce((sum: number, b: { top: number; height: number }) => sum + b.top + b.height / 2, 0) / bounds.length;
        objects.forEach((obj: FabricObject) => {
          const objCenter = obj.getCenterPoint();
          obj.set({ top: obj.top! + (avgCenterY - objCenter.y) });
        });
        break;
      }
      case 'bottom': {
        const maxY = Math.max(...bounds.map((b: { top: number; height: number }) => b.top + b.height));
        objects.forEach((obj: FabricObject) => {
          const objBounds = obj.getBoundingRect();
          obj.set({ top: obj.top! + (maxY - (objBounds.top + objBounds.height)) });
        });
        break;
      }
    }

    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  /**
   * Distribute selected objects evenly
   */
  distributeSelected(distribution: 'horizontal' | 'vertical'): void {
    const active = this.canvas.getActiveObject();
    if (!active || active.type !== 'activeSelection') return;

    const objects = (active as any).getObjects();
    if (objects.length < 3) return;

    const sortedObjects = [...objects].sort((a: FabricObject, b: FabricObject) => {
      const aBounds = a.getBoundingRect();
      const bBounds = b.getBoundingRect();
      return distribution === 'horizontal'
        ? aBounds.left - bBounds.left
        : aBounds.top - bBounds.top;
    });

    if (distribution === 'horizontal') {
      const bounds = sortedObjects.map((obj: FabricObject) => obj.getBoundingRect());
      const totalWidth = bounds[bounds.length - 1].left + bounds[bounds.length - 1].width - bounds[0].left;
      const spacing = totalWidth / (bounds.length - 1);

      for (let i = 1; i < sortedObjects.length - 1; i++) {
        const targetX = bounds[0].left + spacing * i;
        const objBounds = sortedObjects[i].getBoundingRect();
        sortedObjects[i].set({ left: sortedObjects[i].left! + (targetX - objBounds.left) });
      }
    } else {
      const bounds = sortedObjects.map((obj: FabricObject) => obj.getBoundingRect());
      const totalHeight = bounds[bounds.length - 1].top + bounds[bounds.length - 1].height - bounds[0].top;
      const spacing = totalHeight / (bounds.length - 1);

      for (let i = 1; i < sortedObjects.length - 1; i++) {
        const targetY = bounds[0].top + spacing * i;
        const objBounds = sortedObjects[i].getBoundingRect();
        sortedObjects[i].set({ top: sortedObjects[i].top! + (targetY - objBounds.top) });
      }
    }

    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  /**
   * Clean up
   */
  destroy(): void {
    this.canvas.off('object:moving', this.handleObjectMoving);
    this.canvas.off('object:modified', this.handleObjectModified);
    this.canvas.off('selection:created', this.handleSelectionCreated);
    this.canvas.off('selection:cleared', this.handleSelectionCleared);
    this.canvas.off('selection:updated', this.handleSelectionUpdated);
    this.clearGuideLines();
    this.clearGrid();
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Create an alignment manager for a canvas
 */
export function createAlignmentManager(
  canvas: FabricCanvas,
  config?: Partial<SnapConfig>
): AlignmentManager {
  return new AlignmentManager(canvas, config);
}

/**
 * Calculate spacing between objects for even distribution
 */
export function calculateEvenSpacing(
  objects: FabricObject[],
  axis: 'x' | 'y'
): number {
  if (objects.length < 2) return 0;

  const bounds = objects.map(obj => obj.getBoundingRect());

  if (axis === 'x') {
    const minX = Math.min(...bounds.map((b: { left: number }) => b.left));
    const maxX = Math.max(...bounds.map((b: { left: number; width: number }) => b.left + b.width));
    return (maxX - minX) / (objects.length - 1);
  } else {
    const minY = Math.min(...bounds.map((b: { top: number }) => b.top));
    const maxY = Math.max(...bounds.map((b: { top: number; height: number }) => b.top + b.height));
    return (maxY - minY) / (objects.length - 1);
  }
}

/**
 * Find the nearest alignment point for an object
 */
export function findNearestAlignmentPoint(
  obj: FabricObject,
  otherObjects: FabricObject[],
  threshold: number = 8
): { x?: number; y?: number; type?: string } | null {
  const bounds = obj.getBoundingRect();
  const center = obj.getCenterPoint();
  const result: { x?: number; y?: number; type?: string } = {};

  let minDistX = threshold;
  let minDistY = threshold;

  for (const other of otherObjects) {
    const otherBounds = other.getBoundingRect();
    const otherCenter = other.getCenterPoint();

    // Check horizontal alignment
    const distToTop = Math.abs(bounds.top - otherBounds.top);
    const distToCenter = Math.abs(center.y - otherCenter.y);
    const distToBottom = Math.abs(
      bounds.top + bounds.height - (otherBounds.top + otherBounds.height)
    );

    if (distToTop < minDistY) {
      minDistY = distToTop;
      result.y = otherBounds.top;
      result.type = 'top-edge';
    }
    if (distToCenter < minDistY) {
      minDistY = distToCenter;
      result.y = otherCenter.y;
      result.type = 'center-y';
    }
    if (distToBottom < minDistY) {
      minDistY = distToBottom;
      result.y = otherBounds.top + otherBounds.height;
      result.type = 'bottom-edge';
    }

    // Check vertical alignment
    const distToLeft = Math.abs(bounds.left - otherBounds.left);
    const distToCenterX = Math.abs(center.x - otherCenter.x);
    const distToRight = Math.abs(
      bounds.left + bounds.width - (otherBounds.left + otherBounds.width)
    );

    if (distToLeft < minDistX) {
      minDistX = distToLeft;
      result.x = otherBounds.left;
      result.type = 'left-edge';
    }
    if (distToCenterX < minDistX) {
      minDistX = distToCenterX;
      result.x = otherCenter.x;
      result.type = 'center-x';
    }
    if (distToRight < minDistX) {
      minDistX = distToRight;
      result.x = otherBounds.left + otherBounds.width;
      result.type = 'right-edge';
    }
  }

  if (result.x !== undefined || result.y !== undefined) {
    return result;
  }

  return null;
}
