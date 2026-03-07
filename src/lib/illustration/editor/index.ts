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
  EraserTool,
  ScissorsTool,
  MeasureTool,

  // Factory functions
  createSelectTool,
  createRectangleTool,
  createEllipseTool,
  createLineTool,
  createArrowTool,
  createTextTool,
  createPenTool,
  createEraserTool,
  createScissorsTool,
  createMeasureTool,

  // Default tool instances
  defaultSelectTool,
  defaultRectangleTool,
  defaultEllipseTool,
  defaultLineTool,
  defaultArrowTool,
  defaultTextTool,
  defaultPenTool,
  defaultEraserTool,
  defaultScissorsTool,
  defaultMeasureTool,
  defaultTools,

  // Constants
  TOOL_NAMES,
  TOOL_CATEGORIES,

  // Utility functions
  getToolsByCategory,
  getAllToolMetadata,
} from './tools/index';

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
  EraserToolOptions,
  ScissorsToolOptions,
  SplitLineResult,
  Measurement,
  MeasurePoint,
} from './tools/index';
