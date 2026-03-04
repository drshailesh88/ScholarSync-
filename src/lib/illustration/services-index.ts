/**
 * FINNISH Services
 * External integrations, API clients, and background services
 */

// =============================================================================
// LAYER MANAGEMENT
// =============================================================================

export {
  LayerManager,
  layerManager,
  LayerError,
} from './LayerManager';

export type {
  Layer,
  LayerEventType,
  LayerEvent,
  LayerEventCallback,
  LayerErrorCode,
} from './LayerManager';

// =============================================================================
// AI SERVICES
// =============================================================================

export {
  // Core services
  DiagramGenerator,
  diagramGenerator,
  PromptParser,
  promptParser,
  ConversationManager,
  conversationManager,
  ContextBuilder,
  contextBuilder,

  // Backends
  MermaidBackend,
  mermaidBackend,
  SVGBackend,
  svgBackend,

  // Convenience functions
  generateDiagram,
  refineDiagram,
  parsePrompt,
  suggestBackend,

  // Prompts
  buildPrompt,
  extractDSL,
  isValidDSL,

  // Error class
  AIServiceError,
  createLogger,
} from './ai';

export type {
  // Generator types
  GenerateOptions,
  RefineOptions,
  ExtendedGenerationResult,

  // Conversation types
  ConversationTurn,
  ConversationContext,
  ConversationOptions,

  // Context types
  GenerationContextOptions,
  RefinementContextOptions,

  // AI types
  GenerationRequest,
  GenerationResult,
  GenerationMetadata,
  RequestMetadata,
  DiagramStyle,
  AIBackend,
  ValidationResult,
  ParsedPrompt,
  DiagramType,
  DiagramDomain,
  ExtractedEntities,
  AlternativeInterpretation,
  ConversationMessage,
  Conversation,
  DiagramVersion,
  ConversationMetadata,
  AIErrorCode,
  LogLevel,
  Logger,
  FewShotExample,
} from './ai';
