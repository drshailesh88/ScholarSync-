/**
 * FINNISH Shared TypeScript Types
 * Core type definitions used throughout the application
 *
 * @module types
 */

import type { Canvas } from 'fabric';

// Fabric.js Canvas type
export type FabricCanvas = Canvas;

// ============================================================================
// Tool Types
// ============================================================================

/**
 * Available drawing and editing tools in the FINNISH editor
 */
export enum ToolType {
  // Selection tools
  SELECT = 'select',
  DIRECT_SELECT = 'directSelect',

  // Drawing tools
  PEN = 'pen',
  PENCIL = 'pencil',
  BRUSH = 'brush',
  LINE = 'line',

  // Shape tools
  RECTANGLE = 'rectangle',
  ELLIPSE = 'ellipse',
  POLYGON = 'polygon',
  STAR = 'star',

  // Annotation tools
  ARROW = 'arrow',
  BRACKET = 'bracket',
  CALLOUT = 'callout',
  DIMENSION = 'dimension',
  CONNECTOR = 'connector',

  // Text tools
  TEXT = 'text',
  TEXT_ON_PATH = 'textOnPath',

  // Utility tools
  HAND = 'hand',
  ZOOM = 'zoom',
  EYEDROPPER = 'eyedropper',
  ERASER = 'eraser',
  SCISSORS = 'scissors',
  MEASURE = 'measure',
}

/**
 * Tool category groupings for UI organization
 */
export enum ToolCategory {
  SELECTION = 'selection',
  DRAWING = 'drawing',
  SHAPES = 'shapes',
  ANNOTATION = 'annotation',
  TEXT = 'text',
  UTILITY = 'utility',
}

/**
 * Tool metadata for UI rendering
 */
export interface ToolMetadata {
  type: ToolType;
  category: ToolCategory;
  name: string;
  shortcut?: string;
  icon?: string;
}

// ============================================================================
// Canvas & Editor Types
// ============================================================================

/**
 * Canvas object reference with unique ID
 */
export interface CanvasObject {
  id: string;
  type: string;
  name?: string;
  visible: boolean;
  locked: boolean;
  selectable: boolean;
}

/**
 * Pan position for canvas viewport
 */
export interface PanPosition {
  x: number;
  y: number;
}

/**
 * Viewport state for canvas display
 */
export interface ViewportState {
  zoom: number;
  pan: PanPosition;
}

export interface GuidesState {
  horizontal: number[];
  vertical: number[];
}

export interface GuideSnapIndicator {
  horizontal: number | null;
  vertical: number | null;
}

/**
 * History state for undo/redo operations
 */
export interface HistoryState {
  past: string[];
  future: string[];
}

/**
 * Grid configuration options
 */
export interface GridConfig {
  visible: boolean;
  size: number;
  snapEnabled: boolean;
  color: string;
  opacity: number;
}

/**
 * Selection state tracking
 */
export interface SelectionState {
  objectIds: string[];
  boundingBox?: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

// ============================================================================
// Layer Types
// ============================================================================

/**
 * Layer interface for organizing canvas objects
 */
export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  objectIds: string[];
  parentId?: string;
  expanded: boolean;
  color?: string; // Layer indicator color
}

/**
 * Supported blend modes for layers
 */
export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion';

// ============================================================================
// AI Conversation Types
// ============================================================================

/**
 * Role of a message in the conversation
 */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * Content types that can be in a message
 */
export type MessageContentType = 'text' | 'image' | 'diagram' | 'error';

/**
 * Message content block
 */
export interface MessageContent {
  type: MessageContentType;
  text?: string;
  imageUrl?: string;
  diagramId?: string;
}

/**
 * Chat message in the AI conversation
 */
export interface Message {
  id: string;
  role: MessageRole;
  content: MessageContent[];
  timestamp: number;
  metadata?: {
    model?: string;
    tokens?: number;
    processingTime?: number;
  };
}

/**
 * Diagram generation status
 */
export type DiagramStatus = 'pending' | 'generating' | 'completed' | 'error';

/**
 * Diagram type classifications
 */
export type DiagramType =
  | 'flowchart'
  | 'sequence'
  | 'class'
  | 'entity-relationship'
  | 'state'
  | 'gantt'
  | 'pie'
  | 'mindmap'
  | 'timeline'
  | 'scientific'
  | 'custom';

/**
 * Generated diagram representation
 */
export interface DiagramGeneration {
  id: string;
  prompt: string;
  type: DiagramType;
  status: DiagramStatus;
  svgContent?: string;
  mermaidCode?: string;
  tikzCode?: string;
  createdAt: number;
  updatedAt: number;
  error?: string;
  metadata?: {
    iterations?: number;
    refinements?: string[];
  };
}

/**
 * Conversation session state
 */
export interface ConversationSession {
  id: string;
  title: string;
  messages: Message[];
  diagrams: DiagramGeneration[];
  createdAt: number;
  updatedAt: number;
}

// ============================================================================
// Export Types
// ============================================================================

/**
 * Supported export formats
 */
export type ExportFormat = 'png' | 'svg' | 'pdf' | 'tikz';

/**
 * DPI options for raster exports
 */
export type ExportDPI = 72 | 150 | 300 | 600;

/**
 * Export quality settings
 */
export interface ExportQuality {
  value: number; // 0-100
  dpi: ExportDPI;
}

/**
 * Export progress state
 */
export interface ExportProgress {
  stage: ExportStage;
  percent: number;
  message?: string;
}

/**
 * Export processing stages
 */
export type ExportStage =
  | 'preparing'
  | 'rendering'
  | 'optimizing'
  | 'encoding'
  | 'complete'
  | 'error';

/**
 * Export configuration options
 */
export interface ExportConfig {
  format: ExportFormat;
  quality: number;
  dpi: ExportDPI;
  includeBackground: boolean;
  preserveAspectRatio: boolean;
  padding: number;
  filename?: string;
}

/**
 * Export result with file data
 */
export interface ExportResult {
  success: boolean;
  format: ExportFormat;
  data?: Blob | string;
  filename: string;
  size?: number;
  error?: string;
}

// ============================================================================
// Store State Types
// ============================================================================

/**
 * Editor store state interface
 */
export interface EditorState {
  // Canvas reference
  canvas: FabricCanvas | null;

  // Selection state
  selectedObjects: string[];

  // Active tool
  activeTool: ToolType;
  lastSampledColor: string | null;
  polygonSides: number;
  starPoints: number;

  // Viewport state
  zoom: number;
  pan: PanPosition;

  // Grid settings
  gridVisible: boolean;
  snapToGrid: boolean;
  gridSize: number;
  showRulers: boolean;
  showGuides: boolean;
  guides: GuidesState;
  guideSnapIndicator: GuideSnapIndicator;

  // History state
  history: HistoryState;

  // UI state
  isLoading: boolean;
}

/**
 * Editor store actions interface
 */
export interface EditorActions {
  // Canvas management
  setCanvas: (canvas: FabricCanvas | null) => void;

  // Tool management
  setActiveTool: (tool: ToolType) => void;
  setLastSampledColor: (color: string) => void;
  setPolygonSides: (sides: number) => void;
  setStarPoints: (points: number) => void;

  // Viewport management
  setZoom: (zoom: number) => void;
  setPan: (pan: PanPosition) => void;
  resetViewport: () => void;

  // Selection management
  selectObjects: (objectIds: string[]) => void;
  addToSelection: (objectId: string) => void;
  removeFromSelection: (objectId: string) => void;
  clearSelection: () => void;

  // Grid management
  toggleGrid: () => void;
  toggleSnap: () => void;
  setGridSize: (size: number) => void;
  toggleRulers: () => void;
  toggleGuides: () => void;
  addGuide: (orientation: 'horizontal' | 'vertical', position: number) => void;
  updateGuide: (orientation: 'horizontal' | 'vertical', index: number, position: number) => void;
  removeGuide: (orientation: 'horizontal' | 'vertical', index: number) => void;
  clearGuides: () => void;
  setGuideSnapIndicator: (indicator: GuideSnapIndicator) => void;

  // History management
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  pushHistory: (state: string) => void;
  clearHistory: () => void;

  // UI state
  setLoading: (loading: boolean) => void;
}

/**
 * Conversation store state interface
 */
export interface ConversationState {
  messages: Message[];
  currentDiagram: DiagramGeneration | null;
  diagramHistory: DiagramGeneration[];
  isGenerating: boolean;
  error: string | null;
}

/**
 * Conversation store actions interface
 */
export interface ConversationActions {
  // Message management
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;

  // Diagram management
  setCurrentDiagram: (diagram: DiagramGeneration | null) => void;
  updateCurrentDiagram: (updates: Partial<DiagramGeneration>) => void;
  addToHistory: (diagram: DiagramGeneration) => void;
  clearDiagramHistory: () => void;

  // Status management
  setGenerating: (generating: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * Export store state interface
 */
export interface ExportState {
  format: ExportFormat;
  quality: number;
  dpi: ExportDPI;
  isExporting: boolean;
  progress: number;
  stage: ExportStage;
  error: string | null;
}

/**
 * Export store actions interface
 */
export interface ExportActions {
  // Format settings
  setFormat: (format: ExportFormat) => void;
  setQuality: (quality: number) => void;
  setDPI: (dpi: ExportDPI) => void;

  // Export operations
  startExport: () => void;
  updateProgress: (progress: number, stage?: ExportStage) => void;
  finishExport: (success: boolean, error?: string) => void;
  resetExport: () => void;
}

// ============================================================================
// Combined Store Types
// ============================================================================

export type EditorStore = EditorState & EditorActions;
export type ConversationStore = ConversationState & ConversationActions;
export type ExportStore = ExportState & ExportActions;

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Deep partial type for nested object updates
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Action type for store mutations
 */
export type StoreAction<T> = (state: T) => Partial<T> | void;

/**
 * Subscriber callback type
 */
export type StoreSubscriber<T> = (state: T, prevState: T) => void;
