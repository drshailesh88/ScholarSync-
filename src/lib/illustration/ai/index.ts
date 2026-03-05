/**
 * AI Services Index
 * Export all AI diagram generation services
 *
 * This module provides the core AI capabilities for the FINNISH project,
 * including diagram generation, prompt parsing, and conversation management.
 */

// =============================================================================
// IMPORTS FOR INTERNAL USE
// =============================================================================

import { DiagramGenerator, diagramGenerator as _diagramGenerator } from './DiagramGenerator';
import { PromptParser, promptParser as _promptParser } from './PromptParser';
import { ConversationManager, conversationManager as _conversationManager } from './ConversationManager';
import { ContextBuilder, contextBuilder as _contextBuilder } from './ContextBuilder';
import { MermaidBackend, mermaidBackend as _mermaidBackend } from '@/lib/illustration/ai/backends/MermaidBackend';
import { SVGBackend, svgBackend as _svgBackend } from '@/lib/illustration/ai/backends/SVGBackend';

// =============================================================================
// CORE SERVICES
// =============================================================================

export { DiagramGenerator, diagramGenerator } from './DiagramGenerator';
export type {
  GenerateOptions,
  RefineOptions,
  ExtendedGenerationResult,
} from './DiagramGenerator';

export { PromptParser, promptParser } from './PromptParser';

export { ConversationManager, conversationManager } from './ConversationManager';
export type {
  ConversationTurn,
  ConversationContext,
  ConversationOptions,
} from './ConversationManager';

export { ContextBuilder, contextBuilder } from './ContextBuilder';
export type {
  GenerationContextOptions,
  RefinementContextOptions,
} from './ContextBuilder';

// =============================================================================
// BACKENDS
// =============================================================================

export { MermaidBackend, mermaidBackend } from '@/lib/illustration/ai/backends/MermaidBackend';
export { SVGBackend, svgBackend } from '@/lib/illustration/ai/backends/SVGBackend';

// =============================================================================
// PROMPTS
// =============================================================================

export {
  BASE_SYSTEM_PROMPT,
  MERMAID_SYSTEM_PROMPT,
  SVG_SYSTEM_PROMPT,
  DOMAIN_PROMPTS,
  TYPE_PROMPTS,
  FEW_SHOT_EXAMPLES,
  MODIFICATION_PROMPTS,
  buildPrompt,
  extractDSL,
  isValidDSL,
} from './prompts';
export type { FewShotExample } from './prompts';

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Request/Response types
  GenerationRequest,
  GenerationResult,
  GenerationMetadata,
  RequestMetadata,
  DiagramStyle,

  // Backend types
  AIBackend,
  ValidationResult,

  // Prompt parsing types
  ParsedPrompt,
  DiagramType,
  DiagramDomain,
  ExtractedEntities,
  AlternativeInterpretation,

  // Conversation types
  ConversationMessage,
  Conversation,
  DiagramVersion,
  ConversationMetadata,

  // Error types
  AIErrorCode,

  // Logging types
  LogLevel,
  Logger,
} from './types';

export { AIServiceError, createLogger } from './types';

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Quick diagram generation function
 * Creates a diagram from a prompt using default settings
 */
export async function generateDiagram(prompt: string): Promise<string> {
  const result = await _diagramGenerator.generate(prompt);
  return result.svg;
}

/**
 * Quick diagram refinement function
 * Refines an existing diagram based on a follow-up prompt
 */
export async function refineDiagram(
  existingSvg: string,
  refinementPrompt: string
): Promise<string> {
  const result = await _diagramGenerator.refine(existingSvg, refinementPrompt);
  return result.svg;
}

/**
 * Parse a prompt to understand diagram intent
 */
export function parsePrompt(prompt: string): {
  diagramType: string;
  domain: string;
  confidence: number;
  isModification: boolean;
} {
  const parsed = _promptParser.parse(prompt);
  return {
    diagramType: parsed.diagramType,
    domain: parsed.domain,
    confidence: parsed.confidence,
    isModification: parsed.isModification,
  };
}

/**
 * Get suggested backend for a prompt
 */
export function suggestBackend(prompt: string): string {
  const parsed = _promptParser.parse(prompt);
  return _promptParser.suggestBackend(parsed);
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default {
  DiagramGenerator,
  PromptParser,
  ConversationManager,
  ContextBuilder,
  MermaidBackend,
  SVGBackend,
  diagramGenerator: _diagramGenerator,
  promptParser: _promptParser,
  conversationManager: _conversationManager,
  contextBuilder: _contextBuilder,
  mermaidBackend: _mermaidBackend,
  svgBackend: _svgBackend,
  generateDiagram,
  refineDiagram,
  parsePrompt,
  suggestBackend,
};
