/**
 * FINNISH Tool Registry
 * Tool registration and management system for the editor
 *
 * @module editor/tools/ToolRegistry
 */

import type { FabricCanvas, ToolType } from '@/lib/illustration/types';

// ============================================================================
// Types
// ============================================================================

/**
 * Point coordinates for mouse events
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Mouse event data passed to tool handlers
 */
export interface ToolMouseEvent {
  /** Original DOM event */
  e: MouseEvent;
  /** Target canvas object if any */
  target?: any;
  /** Transformed pointer coordinates */
  pointer?: Point;
  /** Absolute pointer coordinates */
  absolutePointer?: Point;
}

/**
 * Keyboard event data passed to tool handlers
 */
export interface ToolKeyEvent extends KeyboardEvent {}

/**
 * Tool interface - all tools must implement this interface
 */
export interface Tool {
  /** Unique tool identifier */
  readonly name: string;

  /** Tool icon identifier or SVG path */
  readonly icon: string;

  /** CSS cursor style for this tool */
  readonly cursor: string;

  /** Keyboard shortcut (single lowercase letter) */
  readonly shortcut?: string;

  /** Tool category for UI grouping */
  readonly category?: string;

  /**
   * Called when the tool becomes active
   * @param canvas - Fabric.js canvas instance
   */
  activate(canvas: FabricCanvas): void;

  /**
   * Called when the tool is deactivated
   * @param canvas - Fabric.js canvas instance
   */
  deactivate(canvas: FabricCanvas): void;

  /**
   * Handle mouse down event
   * @param e - Mouse event data
   */
  onMouseDown?(e: ToolMouseEvent): void;

  /**
   * Handle mouse move event
   * @param e - Mouse event data
   */
  onMouseMove?(e: ToolMouseEvent): void;

  /**
   * Handle mouse up event
   * @param e - Mouse event data
   */
  onMouseUp?(e: ToolMouseEvent): void;

  /**
   * Handle key down event
   * @param e - Keyboard event
   */
  onKeyDown?(e: ToolKeyEvent): void;

  /**
   * Handle key up event
   * @param e - Keyboard event
   */
  onKeyUp?(e: ToolKeyEvent): void;

  /**
   * Handle double click event
   * @param e - Mouse event data
   */
  onDoubleClick?(e: ToolMouseEvent): void;
}

/**
 * Tool registration options
 */
export interface ToolRegistrationOptions {
  /** Override existing tool with same name */
  override?: boolean;
}

/**
 * Event types emitted by the registry
 */
export interface ToolRegistryEvents {
  'tool:registered': { tool: Tool };
  'tool:unregistered': { name: string };
  'tool:activated': { tool: Tool; previousTool: Tool | null };
  'tool:deactivated': { tool: Tool };
}

/**
 * Event callback type
 */
export type ToolRegistryEventCallback<K extends keyof ToolRegistryEvents> = (
  data: ToolRegistryEvents[K]
) => void;

// ============================================================================
// Tool Registry Implementation
// ============================================================================

/**
 * Tool Registry - manages tool registration and lifecycle
 *
 * @example
 * ```typescript
 * import { ToolRegistry, SelectTool, RectangleTool } from '@/editor/tools';
 *
 * const registry = new ToolRegistry();
 * registry.register(new SelectTool());
 * registry.register(new RectangleTool());
 *
 * registry.setActive('select', canvas);
 * console.log(registry.getActive()?.name); // 'select'
 * ```
 */
export class ToolRegistry {
  /** Map of registered tools by name */
  private tools: Map<string, Tool> = new Map();

  /** Currently active tool */
  private activeTool: Tool | null = null;

  /** Current canvas reference */
  private canvas: FabricCanvas | null = null;

  /** Event listeners */
  private listeners: Map<string, Set<Function>> = new Map();

  /** Bound event handlers for canvas */
  private boundHandlers: {
    mouseDown?: (e: any) => void;
    mouseMove?: (e: any) => void;
    mouseUp?: (e: any) => void;
    mouseDblClick?: (e: any) => void;
  } = {};

  // ==========================================================================
  // Registration Methods
  // ==========================================================================

  /**
   * Register a tool with the registry
   * @param tool - Tool instance to register
   * @param options - Registration options
   * @throws Error if tool with same name exists and override is false
   */
  register(tool: Tool, options: ToolRegistrationOptions = {}): void {
    const { override = false } = options;

    if (this.tools.has(tool.name) && !override) {
      throw new Error(
        `Tool "${tool.name}" is already registered. Use override option to replace.`
      );
    }

    this.tools.set(tool.name, tool);
    this.emit('tool:registered', { tool });
  }

  /**
   * Register multiple tools at once
   * @param tools - Array of tools to register
   * @param options - Registration options applied to all
   */
  registerAll(tools: Tool[], options: ToolRegistrationOptions = {}): void {
    tools.forEach((tool) => this.register(tool, options));
  }

  /**
   * Unregister a tool by name
   * @param name - Name of the tool to unregister
   * @returns true if tool was unregistered, false if not found
   */
  unregister(name: string): boolean {
    // Deactivate if this tool is currently active
    if (this.activeTool?.name === name) {
      this.deactivateCurrentTool();
    }

    const existed = this.tools.delete(name);
    if (existed) {
      this.emit('tool:unregistered', { name });
    }
    return existed;
  }

  // ==========================================================================
  // Query Methods
  // ==========================================================================

  /**
   * Get a tool by name
   * @param name - Tool name to look up
   * @returns Tool instance or undefined if not found
   */
  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  /**
   * Get a tool by its keyboard shortcut
   * @param shortcut - Shortcut key (single character)
   * @returns Tool instance or undefined if not found
   */
  getByShortcut(shortcut: string): Tool | undefined {
    const lowerShortcut = shortcut.toLowerCase();
    for (const tool of this.tools.values()) {
      if (tool.shortcut?.toLowerCase() === lowerShortcut) {
        return tool;
      }
    }
    return undefined;
  }

  /**
   * Get all registered tools
   * @returns Array of all registered tools
   */
  getAll(): Tool[] {
    return Array.from(this.tools.values());
  }

  /**
   * Get tools filtered by category
   * @param category - Category to filter by
   * @returns Array of tools in the specified category
   */
  getByCategory(category: string): Tool[] {
    return this.getAll().filter((tool) => tool.category === category);
  }

  /**
   * Get all tool names
   * @returns Array of registered tool names
   */
  getNames(): string[] {
    return Array.from(this.tools.keys());
  }

  /**
   * Check if a tool is registered
   * @param name - Tool name to check
   * @returns true if tool is registered
   */
  has(name: string): boolean {
    return this.tools.has(name);
  }

  /**
   * Get the number of registered tools
   */
  get size(): number {
    return this.tools.size;
  }

  // ==========================================================================
  // Activation Methods
  // ==========================================================================

  /**
   * Set the canvas reference for tool operations
   * @param canvas - Fabric.js canvas instance
   */
  setCanvas(canvas: FabricCanvas | null): void {
    // Remove handlers from old canvas
    if (this.canvas) {
      this.removeCanvasHandlers();
    }

    this.canvas = canvas;

    // Add handlers to new canvas
    if (canvas) {
      this.setupCanvasHandlers();
    }

    // Reactivate current tool with new canvas
    if (this.activeTool && canvas) {
      this.activeTool.activate(canvas);
    }
  }

  /**
   * Set the active tool by name
   * @param name - Name of the tool to activate
   * @param canvas - Optional canvas reference (uses stored canvas if not provided)
   * @returns true if tool was activated, false if tool not found
   */
  setActive(name: string, canvas?: FabricCanvas): boolean {
    const tool = this.tools.get(name);
    if (!tool) {
      console.warn(`Tool "${name}" not found in registry`);
      return false;
    }

    // Use provided canvas or stored canvas
    const targetCanvas = canvas || this.canvas;
    if (canvas) {
      this.canvas = canvas;
    }

    if (!targetCanvas) {
      console.warn('No canvas available for tool activation');
      return false;
    }

    // Deactivate current tool
    const previousTool = this.activeTool;
    this.deactivateCurrentTool();

    // Activate new tool
    this.activeTool = tool;
    tool.activate(targetCanvas);

    // Update canvas cursor
    targetCanvas.defaultCursor = tool.cursor;
    targetCanvas.hoverCursor = tool.cursor;

    this.emit('tool:activated', { tool, previousTool });
    return true;
  }

  /**
   * Set active tool by ToolType enum value
   * @param toolType - ToolType enum value
   * @param canvas - Optional canvas reference
   * @returns true if tool was activated
   */
  setActiveByType(toolType: ToolType, canvas?: FabricCanvas): boolean {
    return this.setActive(toolType as string, canvas);
  }

  /**
   * Get the currently active tool
   * @returns Active tool or null if none active
   */
  getActive(): Tool | null {
    return this.activeTool;
  }

  /**
   * Check if a specific tool is currently active
   * @param name - Tool name to check
   * @returns true if the specified tool is active
   */
  isActive(name: string): boolean {
    return this.activeTool?.name === name;
  }

  /**
   * Deactivate the current tool
   */
  deactivateCurrentTool(): void {
    if (this.activeTool && this.canvas) {
      this.activeTool.deactivate(this.canvas);
      this.emit('tool:deactivated', { tool: this.activeTool });
    }
  }

  // ==========================================================================
  // Canvas Event Handlers
  // ==========================================================================

  /**
   * Setup event handlers on the canvas
   */
  private setupCanvasHandlers(): void {
    if (!this.canvas) return;

    this.boundHandlers.mouseDown = (e: any) => {
      this.activeTool?.onMouseDown?.(e);
    };

    this.boundHandlers.mouseMove = (e: any) => {
      this.activeTool?.onMouseMove?.(e);
    };

    this.boundHandlers.mouseUp = (e: any) => {
      this.activeTool?.onMouseUp?.(e);
    };

    this.boundHandlers.mouseDblClick = (e: any) => {
      this.activeTool?.onDoubleClick?.(e);
    };

    this.canvas.on('mouse:down', this.boundHandlers.mouseDown);
    this.canvas.on('mouse:move', this.boundHandlers.mouseMove);
    this.canvas.on('mouse:up', this.boundHandlers.mouseUp);
    this.canvas.on('mouse:dblclick', this.boundHandlers.mouseDblClick);
  }

  /**
   * Remove event handlers from the canvas
   */
  private removeCanvasHandlers(): void {
    if (!this.canvas) return;

    if (this.boundHandlers.mouseDown) {
      this.canvas.off('mouse:down', this.boundHandlers.mouseDown);
    }
    if (this.boundHandlers.mouseMove) {
      this.canvas.off('mouse:move', this.boundHandlers.mouseMove);
    }
    if (this.boundHandlers.mouseUp) {
      this.canvas.off('mouse:up', this.boundHandlers.mouseUp);
    }
    if (this.boundHandlers.mouseDblClick) {
      this.canvas.off('mouse:dblclick', this.boundHandlers.mouseDblClick);
    }
  }

  /**
   * Handle keyboard events - call this from your keyboard event handler
   * @param e - Keyboard event
   * @param type - Event type ('keydown' or 'keyup')
   */
  handleKeyEvent(e: KeyboardEvent, type: 'keydown' | 'keyup'): void {
    if (type === 'keydown') {
      this.activeTool?.onKeyDown?.(e);
    } else {
      this.activeTool?.onKeyUp?.(e);
    }
  }

  // ==========================================================================
  // Event Emitter Methods
  // ==========================================================================

  /**
   * Subscribe to registry events
   * @param event - Event name
   * @param callback - Event handler
   * @returns Unsubscribe function
   */
  on<K extends keyof ToolRegistryEvents>(
    event: K,
    callback: ToolRegistryEventCallback<K>
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit an event
   * @param event - Event name
   * @param data - Event data
   */
  private emit<K extends keyof ToolRegistryEvents>(
    event: K,
    data: ToolRegistryEvents[K]
  ): void {
    this.listeners.get(event)?.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  // ==========================================================================
  // Lifecycle Methods
  // ==========================================================================

  /**
   * Clear all registered tools and reset state
   */
  clear(): void {
    this.deactivateCurrentTool();
    this.activeTool = null;
    this.tools.clear();
    this.removeCanvasHandlers();
    this.canvas = null;
    this.listeners.clear();
  }

  /**
   * Dispose of the registry and clean up resources
   */
  dispose(): void {
    this.clear();
    this.boundHandlers = {};
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

/**
 * Default global tool registry instance
 */
export const toolRegistry = new ToolRegistry();

export default ToolRegistry;
