/**
 * ContextBuilder.ts
 * Builds context for AI prompts
 *
 * Constructs rich context for generation and refinement prompts by
 * combining user input with conversation history, domain knowledge,
 * and diagram-specific guidance.
 */

import type {
  DiagramType,
  DiagramDomain,
  ExtractedEntities,
  Logger,
} from './types';
import { createLogger } from './types';
import type { ConversationContext } from './ConversationManager';
import type { RefineOptions } from './DiagramGenerator';
import {
  DOMAIN_PROMPTS,
  TYPE_PROMPTS,
  MODIFICATION_PROMPTS,
} from './prompts';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Options for building generation context
 */
export interface GenerationContextOptions {
  /** Detected or specified diagram type */
  diagramType?: DiagramType;
  /** Domain context */
  domain?: DiagramDomain;
  /** Extracted entities from the prompt */
  entities?: ExtractedEntities;
  /** Include few-shot examples */
  includeFewShot?: boolean;
  /** Maximum context length (in characters) */
  maxLength?: number;
  /** Verbosity level */
  verbosity?: 'minimal' | 'standard' | 'detailed';
}

/**
 * Options for building refinement context
 */
export interface RefinementContextOptions extends RefineOptions {
  /** Include diff from previous version */
  includeDiff?: boolean;
  /** Highlight elements to preserve */
  highlightPreserved?: boolean;
}

// =============================================================================
// CONTEXT BUILDER CLASS
// =============================================================================

/**
 * ContextBuilder creates rich prompts for AI diagram generation
 */
export class ContextBuilder {
  private readonly logger: Logger;
  private readonly defaultMaxLength = 8000;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('ContextBuilder');
  }

  /**
   * Build a generation prompt with full context
   *
   * @param userPrompt - The user's original prompt
   * @param context - Conversation context (if available)
   * @param options - Context building options
   * @returns Enhanced prompt string
   */
  buildGenerationPrompt(
    userPrompt: string,
    context?: ConversationContext,
    options: GenerationContextOptions = {}
  ): string {
    const {
      diagramType,
      domain = 'general',
      entities,
      includeFewShot: _includeFewShot = true,
      maxLength = this.defaultMaxLength,
      verbosity = 'standard',
    } = options;

    const parts: string[] = [];

    // Add system context based on verbosity
    if (verbosity !== 'minimal') {
      parts.push(this.buildSystemContext(diagramType, domain));
    }

    // Add conversation context if available
    if (context && context.turns.length > 0) {
      const conversationSection = this.buildConversationSection(context, verbosity);
      if (conversationSection) {
        parts.push(conversationSection);
      }
    }

    // Add entity context if available
    if (entities && Object.keys(entities).length > 0) {
      const entitySection = this.buildEntitySection(entities);
      if (entitySection) {
        parts.push(entitySection);
      }
    }

    // Add the user's prompt
    parts.push(`\n## User Request\n${userPrompt}`);

    // Add generation instructions
    parts.push(this.buildGenerationInstructions(diagramType, verbosity));

    // Combine and trim to max length
    let result = parts.join('\n\n');
    if (result.length > maxLength) {
      result = this.trimToLength(result, maxLength);
    }

    this.logger.debug('Generation prompt built', {
      promptLength: result.length,
      hasContext: !!context,
      verbosity,
    });

    return result;
  }

  /**
   * Build a refinement prompt for modifying existing diagrams
   *
   * @param userPrompt - The refinement request
   * @param existingSvg - The current SVG content
   * @param context - Conversation context
   * @param options - Refinement options
   * @returns Enhanced refinement prompt
   */
  buildRefinementPrompt(
    userPrompt: string,
    existingSvg: string,
    context?: ConversationContext | null,
    options: RefinementContextOptions = {}
  ): string {
    const {
      mode = 'modify',
      preserveElements = [],
      includeDiff = false,
      highlightPreserved = true,
    } = options;

    const parts: string[] = [];

    // Add refinement mode context
    parts.push(this.buildRefinementModeContext(mode));

    // Add existing diagram context
    parts.push(this.buildExistingDiagramContext(existingSvg));

    // Add preservation instructions
    if (preserveElements.length > 0 && highlightPreserved) {
      parts.push(this.buildPreservationInstructions(preserveElements));
    }

    // Add conversation context for continuity
    if (context && context.turns.length > 0) {
      parts.push(this.buildRefinementHistory(context));
    }

    // Add diff context if available and requested
    if (includeDiff && context && context.diagramHistory.length > 1) {
      const diffSection = this.buildDiffContext(context);
      if (diffSection) {
        parts.push(diffSection);
      }
    }

    // Add the user's refinement request
    parts.push(`\n## Refinement Request\n${userPrompt}`);

    // Add refinement instructions
    parts.push(this.buildRefinementInstructions(mode));

    const result = parts.join('\n\n');

    this.logger.debug('Refinement prompt built', {
      promptLength: result.length,
      mode,
      hasPreserveElements: preserveElements.length > 0,
    });

    return result;
  }

  /**
   * Extract diagram type from a prompt
   *
   * @param prompt - The user's prompt
   * @returns Detected diagram type
   */
  extractDiagramType(prompt: string): DiagramType {
    const normalizedPrompt = prompt.toLowerCase();

    // Check for specific diagram type keywords
    const typePatterns: Array<{ type: DiagramType; patterns: RegExp[] }> = [
      {
        type: 'consort',
        patterns: [/consort/i, /randomized\s+(?:controlled\s+)?trial/i, /rct\s+flow/i],
      },
      {
        type: 'prisma',
        patterns: [/prisma/i, /systematic\s+review/i, /literature\s+review/i],
      },
      {
        type: 'decision-tree',
        patterns: [/decision\s+tree/i, /clinical\s+algorithm/i, /diagnostic\s+algorithm/i],
      },
      {
        type: 'flowchart',
        patterns: [/flowchart/i, /flow\s+chart/i, /process\s+flow/i, /workflow/i],
      },
      {
        type: 'sequence',
        patterns: [/sequence\s+diagram/i, /interaction/i, /message\s+flow/i],
      },
      {
        type: 'state-diagram',
        patterns: [/state\s+diagram/i, /state\s+machine/i, /transition/i],
      },
      {
        type: 'forest-plot',
        patterns: [/forest\s+plot/i, /meta.?analysis/i],
      },
      {
        type: 'kaplan-meier',
        patterns: [/kaplan.?meier/i, /survival\s+curve/i],
      },
      {
        type: 'pathway',
        patterns: [/pathway/i, /signaling/i, /cascade/i],
      },
      {
        type: 'anatomical',
        patterns: [/anatomy/i, /anatomical/i, /organ/i],
      },
      {
        type: 'molecular',
        patterns: [/molecular/i, /molecule/i, /chemical\s+structure/i],
      },
      {
        type: 'cell',
        patterns: [/cell\s+diagram/i, /cellular/i, /organelle/i],
      },
    ];

    for (const { type, patterns } of typePatterns) {
      for (const pattern of patterns) {
        if (pattern.test(normalizedPrompt)) {
          return type;
        }
      }
    }

    return 'generic';
  }

  /**
   * Extract domain from a prompt
   *
   * @param prompt - The user's prompt
   * @returns Detected domain
   */
  extractDomain(prompt: string): DiagramDomain {
    const normalizedPrompt = prompt.toLowerCase();

    const domainPatterns: Array<{ domain: DiagramDomain; keywords: string[] }> = [
      {
        domain: 'medicine',
        keywords: ['clinical', 'patient', 'treatment', 'diagnosis', 'medical', 'trial', 'drug'],
      },
      {
        domain: 'biology',
        keywords: ['cell', 'gene', 'protein', 'enzyme', 'organism', 'biological'],
      },
      {
        domain: 'chemistry',
        keywords: ['reaction', 'compound', 'molecule', 'chemical', 'synthesis'],
      },
      {
        domain: 'physics',
        keywords: ['force', 'energy', 'wave', 'particle', 'quantum'],
      },
      {
        domain: 'engineering',
        keywords: ['system', 'circuit', 'mechanical', 'design', 'architecture'],
      },
      {
        domain: 'computer-science',
        keywords: ['algorithm', 'data', 'software', 'code', 'api', 'database'],
      },
      {
        domain: 'statistics',
        keywords: ['data', 'regression', 'correlation', 'sample', 'probability'],
      },
    ];

    let bestMatch: DiagramDomain = 'general';
    let bestScore = 0;

    for (const { domain, keywords } of domainPatterns) {
      let score = 0;
      for (const keyword of keywords) {
        if (normalizedPrompt.includes(keyword)) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = domain;
      }
    }

    return bestMatch;
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  /**
   * Build system context section
   */
  private buildSystemContext(
    diagramType?: DiagramType,
    domain: DiagramDomain = 'general'
  ): string {
    const parts: string[] = [];

    parts.push('## Context');
    parts.push('You are generating a scientific diagram.');

    // Add domain context
    const domainContext = DOMAIN_PROMPTS[domain];
    if (domainContext) {
      parts.push(domainContext.trim());
    }

    // Add type-specific context
    if (diagramType && TYPE_PROMPTS[diagramType]) {
      parts.push(TYPE_PROMPTS[diagramType]!.trim());
    }

    return parts.join('\n');
  }

  /**
   * Build conversation history section
   */
  private buildConversationSection(
    context: ConversationContext,
    verbosity: 'minimal' | 'standard' | 'detailed'
  ): string | null {
    if (context.turns.length === 0) {
      return null;
    }

    const parts: string[] = [];
    parts.push('## Conversation History');

    // Determine how many turns to include
    const turnCount = verbosity === 'detailed' ? 5 : verbosity === 'standard' ? 3 : 1;
    const recentTurns = context.turns.slice(-turnCount);

    for (const turn of recentTurns) {
      const truncatedPrompt =
        turn.prompt.length > 150
          ? turn.prompt.substring(0, 150) + '...'
          : turn.prompt;
      parts.push(`- Turn ${turn.turnNumber}: ${truncatedPrompt}`);
    }

    if (context.diagramType) {
      parts.push(`\nCurrent diagram type: ${context.diagramType}`);
    }

    parts.push(`Current version: ${context.version}`);

    return parts.join('\n');
  }

  /**
   * Build entity section
   */
  private buildEntitySection(entities: ExtractedEntities): string | null {
    const parts: string[] = [];

    if (entities.nodes && entities.nodes.length > 0) {
      parts.push(`Detected nodes: ${entities.nodes.join(', ')}`);
    }

    if (entities.connections && entities.connections.length > 0) {
      parts.push(`Detected connections: ${entities.connections.join('; ')}`);
    }

    if (entities.numbers && entities.numbers.length > 0) {
      parts.push(`Detected numbers: ${entities.numbers.join(', ')}`);
    }

    if (entities.namedEntities && entities.namedEntities.length > 0) {
      parts.push(`Named entities: ${entities.namedEntities.join(', ')}`);
    }

    if (parts.length === 0) {
      return null;
    }

    return '## Extracted Information\n' + parts.join('\n');
  }

  /**
   * Build generation instructions
   */
  private buildGenerationInstructions(
    diagramType?: DiagramType,
    verbosity: 'minimal' | 'standard' | 'detailed' = 'standard'
  ): string {
    const parts: string[] = [];
    parts.push('## Instructions');

    if (verbosity === 'minimal') {
      parts.push('Generate the diagram code.');
    } else {
      parts.push('Generate a clean, well-structured diagram.');
      parts.push('Use appropriate visual hierarchy.');
      parts.push('Ensure all labels are readable.');

      if (diagramType && verbosity === 'detailed') {
        parts.push(`Follow ${diagramType} conventions.`);
        parts.push('Include all necessary elements for this diagram type.');
      }
    }

    return parts.join('\n');
  }

  /**
   * Build refinement mode context
   */
  private buildRefinementModeContext(mode: string): string {
    const modeDescriptions: Record<string, string> = {
      modify: 'Apply specific changes while preserving overall structure.',
      enhance: 'Add more detail and complexity to the diagram.',
      simplify: 'Reduce complexity while maintaining key information.',
      restyle: 'Change visual appearance without altering content.',
    };

    const description = modeDescriptions[mode] ?? modeDescriptions.modify;
    return `## Refinement Mode: ${mode}\n${description}`;
  }

  /**
   * Build existing diagram context
   */
  private buildExistingDiagramContext(existingSvg: string): string {
    // For DSL, include directly; for SVG, summarize
    const isDsl = !existingSvg.trim().startsWith('<');

    if (isDsl) {
      return `## Existing Diagram (DSL)\n\`\`\`\n${existingSvg}\n\`\`\``;
    }

    // Summarize SVG structure
    const elementCounts = this.countSvgElements(existingSvg);
    const summary = Object.entries(elementCounts)
      .map(([el, count]) => `${el}: ${count}`)
      .join(', ');

    return `## Existing Diagram\nSVG with: ${summary}\n(Full content provided for reference)`;
  }

  /**
   * Count SVG elements for summary
   */
  private countSvgElements(svg: string): Record<string, number> {
    const elements = ['rect', 'circle', 'path', 'text', 'line', 'g', 'polygon'];
    const counts: Record<string, number> = {};

    for (const el of elements) {
      const regex = new RegExp(`<${el}[\\s>]`, 'gi');
      const matches = svg.match(regex);
      if (matches && matches.length > 0) {
        counts[el] = matches.length;
      }
    }

    return counts;
  }

  /**
   * Build preservation instructions
   */
  private buildPreservationInstructions(elements: string[]): string {
    return (
      '## Elements to Preserve\n' +
      'Do not modify the following elements:\n' +
      elements.map((e) => `- ${e}`).join('\n')
    );
  }

  /**
   * Build refinement history section
   */
  private buildRefinementHistory(context: ConversationContext): string {
    const recentTurns = context.turns.slice(-2);

    if (recentTurns.length === 0) {
      return '';
    }

    const history = recentTurns
      .map((turn) => {
        const shortPrompt =
          turn.prompt.length > 80
            ? turn.prompt.substring(0, 80) + '...'
            : turn.prompt;
        return `- v${turn.result.metadata.version ?? turn.turnNumber}: ${shortPrompt}`;
      })
      .join('\n');

    return `## Recent Changes\n${history}`;
  }

  /**
   * Build diff context between versions
   */
  private buildDiffContext(context: ConversationContext): string | null {
    if (context.diagramHistory.length < 2) {
      return null;
    }

    const previous = context.diagramHistory[context.diagramHistory.length - 2];
    const current = context.diagramHistory[context.diagramHistory.length - 1];

    return (
      `## Version Diff\n` +
      `Previous (v${previous.version}): ${previous.prompt.substring(0, 50)}...\n` +
      `Current (v${current.version}): ${current.prompt.substring(0, 50)}...`
    );
  }

  /**
   * Build refinement instructions
   */
  private buildRefinementInstructions(mode: string): string {
    const instructions = MODIFICATION_PROMPTS;

    const modeInstructions: Record<string, string> = {
      modify: instructions.updateLabel ?? 'Apply the requested modifications.',
      enhance: 'Add detail and visual elements to improve the diagram.',
      simplify: 'Remove unnecessary elements and streamline the diagram.',
      restyle: instructions.changeStyle ?? 'Update visual styling.',
    };

    return (
      '## Refinement Instructions\n' +
      (modeInstructions[mode] ?? modeInstructions.modify) +
      '\nOutput the complete updated diagram code.'
    );
  }

  /**
   * Trim content to maximum length
   */
  private trimToLength(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
      return content;
    }

    // Try to trim at a section boundary
    const sections = content.split('\n##');
    let result = '';

    for (let i = 0; i < sections.length; i++) {
      const section = (i === 0 ? '' : '##') + sections[i];
      if (result.length + section.length > maxLength) {
        break;
      }
      result += section;
    }

    // If still too long, hard truncate
    if (result.length > maxLength) {
      result = content.substring(0, maxLength - 20) + '\n\n[truncated]';
    }

    this.logger.warn('Context trimmed', {
      originalLength: content.length,
      trimmedLength: result.length,
      maxLength,
    });

    return result;
  }
}

// Export singleton instance
export const contextBuilder = new ContextBuilder();
export default contextBuilder;
