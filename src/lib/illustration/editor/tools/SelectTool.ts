/**
 * FINNISH Select Tool
 * Selection and transformation tool for canvas objects
 *
 * Features:
 * - Single object selection
 * - Multi-select with Shift key
 * - Transform controls (scale, rotate)
 * - Arrow key nudging
 * - Delete key to remove objects
 *
 * @module editor/tools/SelectTool
 */

import type { FabricCanvas } from '../../types/index.js';
import type { Tool, ToolMouseEvent, ToolKeyEvent } from './ToolRegistry.js';

// ============================================================================
// Types
// ============================================================================

/**
 * Selection changed event data
 */
export interface SelectionChangedEvent {
  objects: any[];
  previousObjects: any[];
}

/**
 * SelectTool configuration options
 */
export interface SelectToolOptions {
  /** Enable transform controls */
  enableTransforms?: boolean;
  /** Nudge amount in pixels (default: 1) */
  nudgeAmount?: number;
  /** Nudge amount with shift key (default: 10) */
  shiftNudgeAmount?: number;
  /** Enable marquee selection */
  enableMarquee?: boolean;
}

// ============================================================================
// Select Tool Implementation
// ============================================================================

/**
 * Select Tool - handles object selection, multi-select, and transformations
 *
 * @example
 * ```typescript
 * import { SelectTool, toolRegistry } from '@/editor/tools';
 *
 * const selectTool = new SelectTool({
 *   enableTransforms: true,
 *   nudgeAmount: 1,
 * });
 *
 * toolRegistry.register(selectTool);
 * toolRegistry.setActive('select', canvas);
 * ```
 */
export class SelectTool implements Tool {
  readonly name = 'select';
  readonly icon = 'cursor';
  readonly cursor = 'default';
  readonly shortcut = 'v';
  readonly category = 'selection';

  /** Canvas reference */
  private canvas: FabricCanvas | null = null;

  /** Currently selected objects */
  private selectedObjects: any[] = [];

  /** Whether the tool is active */
  private isActive = false;

  /** Configuration options */
  private options: Required<SelectToolOptions>;

  /** Selection changed callback */
  private onSelectionChange?: (event: SelectionChangedEvent) => void;

  constructor(options: SelectToolOptions = {}) {
    this.options = {
      enableTransforms: options.enableTransforms ?? true,
      nudgeAmount: options.nudgeAmount ?? 1,
      shiftNudgeAmount: options.shiftNudgeAmount ?? 10,
      enableMarquee: options.enableMarquee ?? true,
    };
  }

  // ==========================================================================
  // Lifecycle Methods
  // ==========================================================================

  /**
   * Activate the select tool
   * @param canvas - Fabric.js canvas instance
   */
  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;
    this.isActive = true;

    // Enable object selection on canvas
    canvas.selection = this.options.enableMarquee;

    // Make all objects selectable
    canvas.forEachObject((obj: any) => {
      obj.selectable = true;
      obj.evented = true;
    });

    // Configure transform controls
    if (this.options.enableTransforms) {
      canvas.preserveObjectStacking = true;
    }

    // Set cursor
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = 'move';
  }

  /**
   * Deactivate the select tool
   * @param canvas - Fabric.js canvas instance
   */
  deactivate(canvas: FabricCanvas): void {
    this.isActive = false;

    // Clear selection when switching tools
    canvas.discardActiveObject();
    canvas.requestRenderAll();

    this.selectedObjects = [];
  }

  // ==========================================================================
  // Mouse Event Handlers
  // ==========================================================================

  /**
   * Handle mouse down event
   * @param e - Mouse event data
   */
  onMouseDown(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    const target = e.target;
    const isShiftPressed = e.e.shiftKey;
    const previousObjects = [...this.selectedObjects];

    if (target) {
      // Clicked on an object
      if (!isShiftPressed) {
        // Single selection - replace current selection
        this.selectedObjects = [target];
      } else {
        // Multi-select with shift
        this.toggleObjectSelection(target);
      }
    } else if (!isShiftPressed) {
      // Clicked on empty space without shift - clear selection
      this.selectedObjects = [];
    }

    // Notify selection change
    this.emitSelectionChange(previousObjects);
  }

  /**
   * Handle mouse move event
   * @param e - Mouse event data
   */
  onMouseMove(e: ToolMouseEvent): void {
    if (!this.isActive || !this.canvas) return;

    // Update cursor based on target
    const target = this.canvas.findTarget(e.e, false);

    if (target) {
      if (this.isOverTransformControl(e)) {
        // Cursor is handled by Fabric for transform controls
      } else {
        this.canvas.defaultCursor = 'move';
      }
    } else {
      this.canvas.defaultCursor = this.cursor;
    }
  }

  /**
   * Handle mouse up event
   * @param e - Mouse event data
   */
  onMouseUp(_e: ToolMouseEvent): void {
    if (!this.isActive) return;

    // Request render to update selection visuals
    this.canvas?.requestRenderAll();
  }

  // ==========================================================================
  // Keyboard Event Handlers
  // ==========================================================================

  /**
   * Handle key down event
   * @param e - Keyboard event
   */
  onKeyDown(e: ToolKeyEvent): void {
    if (!this.isActive || !this.canvas) return;

    const activeObject = this.canvas.getActiveObject();

    // Handle delete/backspace
    if (e.key === 'Delete' || e.key === 'Backspace') {
      // Don't delete if editing text
      if (this.isEditingText(activeObject)) return;

      this.deleteSelected();
      e.preventDefault();
      return;
    }

    // Handle select all
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      this.selectAll();
      e.preventDefault();
      return;
    }

    // Handle escape to deselect
    if (e.key === 'Escape') {
      this.clearSelection();
      e.preventDefault();
      return;
    }

    // Handle arrow keys for nudging
    if (!activeObject) return;

    const nudgeAmount = e.shiftKey
      ? this.options.shiftNudgeAmount
      : this.options.nudgeAmount;

    let moved = false;

    switch (e.key) {
      case 'ArrowUp':
        activeObject.top -= nudgeAmount;
        moved = true;
        break;
      case 'ArrowDown':
        activeObject.top += nudgeAmount;
        moved = true;
        break;
      case 'ArrowLeft':
        activeObject.left -= nudgeAmount;
        moved = true;
        break;
      case 'ArrowRight':
        activeObject.left += nudgeAmount;
        moved = true;
        break;
    }

    if (moved) {
      activeObject.setCoords();
      this.canvas.requestRenderAll();
      e.preventDefault();
    }
  }

  /**
   * Handle key up event
   * @param _e - Keyboard event
   */
  onKeyUp(_e: ToolKeyEvent): void {
    // No special key up handling needed
  }

  // ==========================================================================
  // Selection Methods
  // ==========================================================================

  /**
   * Toggle an object's selection state
   * @param target - Object to toggle
   */
  private toggleObjectSelection(target: any): void {
    const index = this.selectedObjects.indexOf(target);

    if (index === -1) {
      // Add to selection
      this.selectedObjects.push(target);
    } else {
      // Remove from selection
      this.selectedObjects.splice(index, 1);
    }

    this.updateCanvasSelection();
  }

  /**
   * Update the canvas active selection to match selectedObjects
   */
  private updateCanvasSelection(): void {
    if (!this.canvas) return;

    if (this.selectedObjects.length === 0) {
      this.canvas.discardActiveObject();
    } else if (this.selectedObjects.length === 1) {
      this.canvas.setActiveObject(this.selectedObjects[0]);
    } else {
      // Create active selection for multiple objects
      const fabric = (window as any).fabric;
      if (fabric?.ActiveSelection) {
        const selection = new fabric.ActiveSelection(this.selectedObjects, {
          canvas: this.canvas,
        });
        this.canvas.setActiveObject(selection);
      }
    }

    this.canvas.requestRenderAll();
  }

  /**
   * Select all objects on the canvas
   */
  selectAll(): void {
    if (!this.canvas) return;

    const previousObjects = [...this.selectedObjects];
    const objects = this.canvas.getObjects();

    if (objects.length === 0) return;

    this.selectedObjects = [...objects];

    if (objects.length === 1) {
      this.canvas.setActiveObject(objects[0]);
    } else {
      const fabric = (window as any).fabric;
      if (fabric?.ActiveSelection) {
        const selection = new fabric.ActiveSelection(objects, {
          canvas: this.canvas,
        });
        this.canvas.setActiveObject(selection);
      }
    }

    this.canvas.requestRenderAll();
    this.emitSelectionChange(previousObjects);
  }

  /**
   * Clear current selection
   */
  clearSelection(): void {
    if (!this.canvas) return;

    const previousObjects = [...this.selectedObjects];
    this.selectedObjects = [];
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
    this.emitSelectionChange(previousObjects);
  }

  /**
   * Delete selected objects
   */
  deleteSelected(): void {
    if (!this.canvas) return;

    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    // Remove each object
    activeObjects.forEach((obj: any) => {
      this.canvas!.remove(obj);
    });

    // Clear selection state
    this.canvas.discardActiveObject();
    this.selectedObjects = [];
    this.canvas.requestRenderAll();
  }

  /**
   * Get the currently selected objects
   * @returns Array of selected objects
   */
  getSelectedObjects(): any[] {
    return [...this.selectedObjects];
  }

  /**
   * Get the number of selected objects
   * @returns Number of selected objects
   */
  getSelectionCount(): number {
    return this.selectedObjects.length;
  }

  /**
   * Check if any objects are selected
   * @returns true if objects are selected
   */
  hasSelection(): boolean {
    return this.selectedObjects.length > 0;
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  /**
   * Check if cursor is over a transform control
   * @param _e - Mouse event
   * @returns true if over transform control
   */
  private isOverTransformControl(_e: ToolMouseEvent): boolean {
    // Fabric.js handles this internally
    return false;
  }

  /**
   * Check if an object is being edited (text)
   * @param obj - Canvas object
   * @returns true if object is text in edit mode
   */
  private isEditingText(obj: any): boolean {
    if (!obj) return false;
    return (
      (obj.type === 'i-text' || obj.type === 'textbox') &&
      obj.isEditing === true
    );
  }

  /**
   * Emit selection change event
   * @param previousObjects - Previously selected objects
   */
  private emitSelectionChange(previousObjects: any[]): void {
    if (this.onSelectionChange) {
      this.onSelectionChange({
        objects: [...this.selectedObjects],
        previousObjects,
      });
    }
  }

  // ==========================================================================
  // Configuration Methods
  // ==========================================================================

  /**
   * Set selection change callback
   * @param callback - Callback function
   */
  setOnSelectionChange(callback: (event: SelectionChangedEvent) => void): void {
    this.onSelectionChange = callback;
  }

  /**
   * Update tool options
   * @param options - Partial options to update
   */
  setOptions(options: Partial<SelectToolOptions>): void {
    Object.assign(this.options, options);
  }
}

export default SelectTool;
