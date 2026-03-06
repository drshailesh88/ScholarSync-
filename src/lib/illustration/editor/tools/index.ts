/**
 * FINNISH Tools Module
 * Export tool registry, tool classes, and default tool instances
 *
 * @module editor/tools
 */

// ============================================================================
// Core Exports
// ============================================================================

export {
  ToolRegistry,
  toolRegistry,
  type Tool,
  type ToolMouseEvent,
  type ToolKeyEvent,
  type Point,
  type ToolRegistrationOptions,
  type ToolRegistryEvents,
  type ToolRegistryEventCallback,
} from './ToolRegistry';

// ============================================================================
// Tool Class Exports
// ============================================================================

export {
  SelectTool,
  type SelectToolOptions,
  type SelectionChangedEvent,
} from './SelectTool';

export {
  DirectSelectTool,
  type DirectSelectToolOptions,
} from './DirectSelectTool';

export {
  ShapeTool,
  RectangleTool,
  EllipseTool,
  LineTool,
  ArrowTool,
  type ShapeStyle,
  type BoundingBox,
  type ShapeCreatedEvent,
  type ShapeToolOptions,
} from './ShapeTool';

export {
  TextTool,
  PenTool,
  type TextStyle,
  type TextCreatedEvent,
  type TextToolOptions,
} from './TextTool';

export {
  EraserTool,
  type EraserToolOptions,
  type RectBounds as EraserRectBounds,
} from './EraserTool';

export {
  ScissorsTool,
  type ScissorsToolOptions,
  type SplitLineResult,
} from './ScissorsTool';

export {
  MeasureTool,
  type Measurement,
  type MeasurePoint,
} from './MeasureTool';

// ============================================================================
// Tool Factory Functions
// ============================================================================

import { ToolRegistry, toolRegistry } from './ToolRegistry';
import { SelectTool } from './SelectTool';
import { DirectSelectTool } from './DirectSelectTool';
import { RectangleTool, EllipseTool, LineTool, ArrowTool } from './ShapeTool';
import { TextTool, PenTool } from './TextTool';
import { EraserTool } from './EraserTool';
import { ScissorsTool } from './ScissorsTool';
import { MeasureTool } from './MeasureTool';

/**
 * Create a SelectTool instance with default options
 */
export function createSelectTool(): SelectTool {
  return new SelectTool({
    enableTransforms: true,
    nudgeAmount: 1,
    shiftNudgeAmount: 10,
    enableMarquee: true,
  });
}

/**
 * Create a DirectSelectTool instance with default options
 */
export function createDirectSelectTool(): DirectSelectTool {
  return new DirectSelectTool();
}

/**
 * Create a RectangleTool instance with default options
 */
export function createRectangleTool(): RectangleTool {
  return new RectangleTool({
    fill: 'transparent',
    stroke: '#000000',
    strokeWidth: 2,
    minSize: 2,
  });
}

/**
 * Create an EllipseTool instance with default options
 */
export function createEllipseTool(): EllipseTool {
  return new EllipseTool({
    fill: 'transparent',
    stroke: '#000000',
    strokeWidth: 2,
    minSize: 2,
  });
}

/**
 * Create a LineTool instance with default options
 */
export function createLineTool(): LineTool {
  return new LineTool({
    stroke: '#000000',
    strokeWidth: 2,
    minSize: 2,
  });
}

/**
 * Create an ArrowTool instance with default options
 */
export function createArrowTool(): ArrowTool {
  return new ArrowTool({
    stroke: '#000000',
    strokeWidth: 2,
    minSize: 10,
  });
}

/**
 * Create a TextTool instance with default options
 */
export function createTextTool(): TextTool {
  return new TextTool({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: '#000000',
    placeholder: 'Text',
  });
}

/**
 * Create a PenTool instance with default options
 */
export function createPenTool(): PenTool {
  return new PenTool();
}

/**
 * Create an EraserTool instance with default options
 */
export function createEraserTool(): EraserTool {
  return new EraserTool({
    initialSize: 24,
    minSize: 4,
    maxSize: 256,
    step: 2,
  });
}

/**
 * Create a ScissorsTool instance with default options
 */
export function createScissorsTool(): ScissorsTool {
  return new ScissorsTool({
    hitThreshold: 8,
  });
}

/**
 * Create a MeasureTool instance with default options
 */
export function createMeasureTool(): MeasureTool {
  return new MeasureTool();
}

// ============================================================================
// Default Tool Instances
// ============================================================================

/**
 * Default SelectTool instance
 */
export const defaultSelectTool = createSelectTool();

/**
 * Default DirectSelectTool instance
 */
export const defaultDirectSelectTool = createDirectSelectTool();

/**
 * Default RectangleTool instance
 */
export const defaultRectangleTool = createRectangleTool();

/**
 * Default EllipseTool instance
 */
export const defaultEllipseTool = createEllipseTool();

/**
 * Default LineTool instance
 */
export const defaultLineTool = createLineTool();

/**
 * Default ArrowTool instance
 */
export const defaultArrowTool = createArrowTool();

/**
 * Default TextTool instance
 */
export const defaultTextTool = createTextTool();

/**
 * Default PenTool instance
 */
export const defaultPenTool = createPenTool();

/**
 * Default EraserTool instance
 */
export const defaultEraserTool = createEraserTool();

/**
 * Default ScissorsTool instance
 */
export const defaultScissorsTool = createScissorsTool();

/**
 * Default MeasureTool instance
 */
export const defaultMeasureTool = createMeasureTool();

/**
 * Array of all default tool instances
 */
export const defaultTools = [
  defaultSelectTool,
  defaultDirectSelectTool,
  defaultRectangleTool,
  defaultEllipseTool,
  defaultLineTool,
  defaultArrowTool,
  defaultTextTool,
  defaultPenTool,
  defaultEraserTool,
  defaultScissorsTool,
  defaultMeasureTool,
];

// ============================================================================
// Registry Initialization
// ============================================================================

/**
 * Initialize the global tool registry with all default tools
 *
 * @example
 * ```typescript
 * import { initializeToolRegistry, toolRegistry } from '@/editor/tools';
 *
 * // Initialize with default tools
 * initializeToolRegistry();
 *
 * // Now you can use the registry
 * toolRegistry.setActive('select', canvas);
 * ```
 */
export function initializeToolRegistry(): void {
  // Clear any existing tools
  toolRegistry.clear();

  // Register all default tools
  toolRegistry.registerAll(defaultTools);
}

/**
 * Create a new ToolRegistry with all default tools pre-registered
 *
 * @example
 * ```typescript
 * import { createToolRegistry } from '@/editor/tools';
 *
 * const registry = createToolRegistry();
 * registry.setCanvas(fabricCanvas);
 * registry.setActive('select');
 * ```
 */
export function createToolRegistry(): ToolRegistry {
  const registry = new ToolRegistry();

  // Create fresh tool instances for this registry
  registry.register(createSelectTool());
  registry.register(createDirectSelectTool());
  registry.register(createRectangleTool());
  registry.register(createEllipseTool());
  registry.register(createLineTool());
  registry.register(createArrowTool());
  registry.register(createTextTool());
  registry.register(createPenTool());
  registry.register(createEraserTool());
  registry.register(createScissorsTool());
  registry.register(createMeasureTool());

  return registry;
}

// ============================================================================
// Tool Name Constants
// ============================================================================

/**
 * Tool name constants for type-safe tool references
 */
export const TOOL_NAMES = {
  SELECT: 'select',
  DIRECT_SELECT: 'directSelect',
  RECTANGLE: 'rectangle',
  ELLIPSE: 'ellipse',
  LINE: 'line',
  ARROW: 'arrow',
  TEXT: 'text',
  PEN: 'pen',
  ERASER: 'eraser',
  SCISSORS: 'scissors',
  MEASURE: 'measure',
} as const;

export type ToolName = (typeof TOOL_NAMES)[keyof typeof TOOL_NAMES];

// ============================================================================
// Tool Categories
// ============================================================================

/**
 * Tool category definitions
 */
export const TOOL_CATEGORIES = {
  SELECTION: 'selection',
  SHAPES: 'shapes',
  DRAWING: 'drawing',
  TEXT: 'text',
  UTILITY: 'utility',
} as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[keyof typeof TOOL_CATEGORIES];

/**
 * Get tools grouped by category
 * @param registry - Tool registry to query (defaults to global registry)
 * @returns Object with categories as keys and tool arrays as values
 */
export function getToolsByCategory(
  registry: ToolRegistry = toolRegistry
): Record<ToolCategory, ReturnType<ToolRegistry['getAll']>> {
  return {
    [TOOL_CATEGORIES.SELECTION]: registry.getByCategory(TOOL_CATEGORIES.SELECTION),
    [TOOL_CATEGORIES.SHAPES]: registry.getByCategory(TOOL_CATEGORIES.SHAPES),
    [TOOL_CATEGORIES.DRAWING]: registry.getByCategory(TOOL_CATEGORIES.DRAWING),
    [TOOL_CATEGORIES.TEXT]: registry.getByCategory(TOOL_CATEGORIES.TEXT),
    [TOOL_CATEGORIES.UTILITY]: registry.getByCategory(TOOL_CATEGORIES.UTILITY),
  };
}

// ============================================================================
// Utility Exports
// ============================================================================

/**
 * Get tool metadata for UI rendering
 */
export interface ToolMetadata {
  name: string;
  icon: string;
  cursor: string;
  shortcut?: string;
  category?: string;
}

/**
 * Get metadata for all registered tools
 * @param registry - Tool registry to query (defaults to global registry)
 * @returns Array of tool metadata
 */
export function getAllToolMetadata(
  registry: ToolRegistry = toolRegistry
): ToolMetadata[] {
  return registry.getAll().map((tool) => ({
    name: tool.name,
    icon: tool.icon,
    cursor: tool.cursor,
    shortcut: tool.shortcut,
    category: tool.category,
  }));
}
