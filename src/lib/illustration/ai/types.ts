/**
 * types.ts
 * Type definitions for the AI diagram generation service
 *
 * Defines interfaces for generation requests, results, and backends
 * to ensure type safety across the AI service layer.
 */

// =============================================================================
// GENERATION REQUEST/RESPONSE TYPES
// =============================================================================

/**
 * Request payload for diagram generation
 */
export interface GenerationRequest {
  /** Natural language prompt describing the desired diagram */
  prompt: string;
  /** Previous conversation context for refinement requests */
  context?: string;
  /** Preferred backend for generation */
  preferredBackend?: 'mermaid' | 'svg' | 'plotly' | 'tikz';
  /** Optional existing diagram to modify */
  existingDiagram?: string;
  /** Conversation ID for tracking refinements */
  conversationId?: string;
  /** Additional metadata for the request */
  metadata?: RequestMetadata;
}

/**
 * Additional metadata for generation requests
 */
export interface RequestMetadata {
  /** Domain context (medicine, biology, engineering, etc.) */
  domain?: string;
  /** Target audience (academic, clinical, general) */
  audience?: string;
  /** Style preferences */
  style?: DiagramStyle;
  /** Whether this is a modification of an existing diagram */
  isModification?: boolean;
}

/**
 * Style configuration for generated diagrams
 */
export interface DiagramStyle {
  /** Color scheme */
  colorScheme?: 'default' | 'scientific' | 'clinical' | 'minimal' | 'vibrant';
  /** Primary color override */
  primaryColor?: string;
  /** Font family */
  fontFamily?: string;
  /** Overall diagram orientation */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Result of a diagram generation operation
 */
export interface GenerationResult {
  /** Generated SVG content */
  svg: string;
  /** Backend that generated the diagram */
  backend: string;
  /** Generation metadata */
  metadata: GenerationMetadata;
  /** Original DSL or intermediate representation (if applicable) */
  dsl?: string;
  /** Warnings or suggestions for improvement */
  warnings?: string[];
}

/**
 * Metadata about the generation process
 */
export interface GenerationMetadata {
  /** When the diagram was generated */
  generatedAt: Date;
  /** Number of tokens in the prompt (for AI backends) */
  promptTokens: number;
  /** Number of tokens in the completion (for AI backends) */
  completionTokens: number;
  /** Time taken for generation in milliseconds */
  generationTimeMs?: number;
  /** Detected diagram type */
  diagramType?: DiagramType;
  /** Confidence score for type detection (0-1) */
  confidence?: number;
  /** Version number for this diagram iteration */
  version?: number;
}

// =============================================================================
// BACKEND TYPES
// =============================================================================

/**
 * Interface that all diagram generation backends must implement
 */
export interface AIBackend {
  /** Unique name identifier for this backend */
  name: string;

  /**
   * Determines if this backend can handle the given prompt
   * @param prompt - The user's prompt
   * @returns true if this backend can handle the prompt
   */
  canHandle(prompt: string): boolean;

  /**
   * Generates a diagram from the given request
   * @param request - The generation request
   * @returns Promise resolving to the generation result
   */
  generate(request: GenerationRequest): Promise<GenerationResult>;

  /**
   * Optional method to validate DSL before rendering
   * @param dsl - The DSL string to validate
   * @returns Validation result
   */
  validate?(dsl: string): Promise<ValidationResult>;
}

/**
 * Result of DSL validation
 */
export interface ValidationResult {
  /** Whether the DSL is valid */
  valid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Line number where error occurred */
  line?: number;
  /** Suggestions for fixing the error */
  suggestions?: string[];
}

// =============================================================================
// PROMPT PARSING TYPES
// =============================================================================

/**
 * Supported diagram types
 */
export type DiagramType =
  | 'flowchart'
  | 'consort'
  | 'prisma'
  | 'decision-tree'
  | 'state-diagram'
  | 'sequence'
  | 'study-design'
  | 'forest-plot'
  | 'scatter-plot'
  | 'bar-chart'
  | 'box-plot'
  | 'kaplan-meier'
  | 'roc-curve'
  | 'funnel-plot'
  | 'pathway'
  | 'anatomical'
  | 'molecular'
  | 'cell'
  | 'generic';

/**
 * Domain categories for scientific diagrams
 */
export type DiagramDomain =
  | 'medicine'
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'engineering'
  | 'computer-science'
  | 'statistics'
  | 'general';

/**
 * Result of parsing a user prompt
 */
export interface ParsedPrompt {
  /** Detected diagram type */
  diagramType: DiagramType;
  /** Detected domain */
  domain: DiagramDomain;
  /** Confidence score for detection (0-1) */
  confidence: number;
  /** Matched keywords that led to detection */
  matchedKeywords: string[];
  /** Whether this is a modification request */
  isModification: boolean;
  /** Detected template match (CONSORT, PRISMA, etc.) */
  template?: string;
  /** Extracted entities from the prompt */
  entities: ExtractedEntities;
  /** Alternative interpretations */
  alternatives: AlternativeInterpretation[];
}

/**
 * Entities extracted from the prompt
 */
export interface ExtractedEntities {
  /** Node/box labels */
  nodes?: string[];
  /** Connection/relationship descriptions */
  connections?: string[];
  /** Numeric values mentioned */
  numbers?: number[];
  /** Named entities (people, organizations, etc.) */
  namedEntities?: string[];
}

/**
 * Alternative interpretation of the prompt
 */
export interface AlternativeInterpretation {
  /** Alternative diagram type */
  diagramType: DiagramType;
  /** Confidence for this interpretation */
  confidence: number;
  /** Backend that would handle this */
  backend: string;
}

// =============================================================================
// CONVERSATION TYPES
// =============================================================================

/**
 * A single message in the conversation
 */
export interface ConversationMessage {
  /** Unique message ID */
  id: string;
  /** Role of the message sender */
  role: 'user' | 'assistant' | 'system';
  /** Message content */
  content: string;
  /** When the message was sent */
  timestamp: Date;
  /** Associated diagram version (if any) */
  diagramVersion?: number;
}

/**
 * A conversation session for iterative diagram refinement
 */
export interface Conversation {
  /** Unique conversation ID */
  id: string;
  /** Ordered list of messages */
  messages: ConversationMessage[];
  /** History of diagram versions */
  diagramHistory: DiagramVersion[];
  /** When the conversation started */
  createdAt: Date;
  /** When the conversation was last updated */
  updatedAt: Date;
  /** Current diagram (latest version) */
  currentDiagram?: string;
  /** Metadata about the conversation */
  metadata: ConversationMetadata;
}

/**
 * A version of the diagram in the conversation history
 */
export interface DiagramVersion {
  /** Version number */
  version: number;
  /** SVG content */
  svg: string;
  /** DSL that generated this version (if applicable) */
  dsl?: string;
  /** Backend used */
  backend: string;
  /** Prompt that generated this version */
  prompt: string;
  /** When this version was created */
  createdAt: Date;
}

/**
 * Metadata about a conversation
 */
export interface ConversationMetadata {
  /** Primary diagram type being worked on */
  diagramType?: DiagramType;
  /** Domain context */
  domain?: DiagramDomain;
  /** Total number of refinement iterations */
  iterations: number;
  /** Primary backend being used */
  primaryBackend?: string;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

/**
 * Custom error for AI service failures
 */
export class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: AIErrorCode,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

/**
 * Error codes for AI service failures
 */
export type AIErrorCode =
  | 'INVALID_PROMPT'
  | 'BACKEND_UNAVAILABLE'
  | 'GENERATION_FAILED'
  | 'VALIDATION_FAILED'
  | 'RENDER_FAILED'
  | 'CONVERSATION_NOT_FOUND'
  | 'RATE_LIMITED'
  | 'UNKNOWN';

// =============================================================================
// LOGGING TYPES
// =============================================================================

/**
 * Log levels for the AI service
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Logger interface for the AI service
 */
export interface Logger {
  debug(message: string, data?: Record<string, unknown>): void;
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, error?: Error, data?: Record<string, unknown>): void;
}

/**
 * Default console logger implementation
 */
export const createLogger = (prefix: string): Logger => ({
  debug: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${prefix}] ${message}`, data ?? '');
    }
  },
  info: (message: string, data?: Record<string, unknown>) => {
    console.info(`[${prefix}] ${message}`, data ?? '');
  },
  warn: (message: string, data?: Record<string, unknown>) => {
    console.warn(`[${prefix}] ${message}`, data ?? '');
  },
  error: (message: string, error?: Error, data?: Record<string, unknown>) => {
    console.error(`[${prefix}] ${message}`, error, data ?? '');
  },
});
