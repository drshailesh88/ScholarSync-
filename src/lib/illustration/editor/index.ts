/**
 * FINNISH Editor Module
 * Canvas management and drawing tools powered by Fabric.js
 *
 * @module editor
 */

// ============================================================================
// Tool Registry and Management
// ============================================================================

export {
  // Core registry
  ToolRegistry,
  toolRegistry,
  initializeToolRegistry,
  createToolRegistry,

  // Tool classes
  SelectTool,
  ShapeTool,
  RectangleTool,
  EllipseTool,
  LineTool,
  ArrowTool,
  TextTool,
  PenTool,

  // Factory functions
  createSelectTool,
  createRectangleTool,
  createEllipseTool,
  createLineTool,
  createArrowTool,
  createTextTool,
  createPenTool,

  // Default tool instances
  defaultSelectTool,
  defaultRectangleTool,
  defaultEllipseTool,
  defaultLineTool,
  defaultArrowTool,
  defaultTextTool,
  defaultPenTool,
  defaultTools,

  // Constants
  TOOL_NAMES,
  TOOL_CATEGORIES,

  // Utility functions
  getToolsByCategory,
  getAllToolMetadata,
} from './tools/index.js';

// Export types
export type {
  Tool,
  ToolMouseEvent,
  ToolKeyEvent,
  Point,
  ToolRegistrationOptions,
  ToolRegistryEvents,
  ToolRegistryEventCallback,
  ToolName,
  ToolCategory,
  ToolMetadata,
  SelectToolOptions,
  SelectionChangedEvent,
  ShapeStyle,
  BoundingBox,
  ShapeCreatedEvent,
  ShapeToolOptions,
  TextStyle,
  TextCreatedEvent,
  TextToolOptions,
} from './tools/index.js';
