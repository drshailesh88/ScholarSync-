/**
 * DiagramGenerator.ts
 * Main diagram generation orchestrator
 *
 * This is the core AI service that converts natural language prompts into diagrams.
 * It analyzes prompts, routes to appropriate backends, and manages the generation lifecycle.
 */

import { PromptParser } from './PromptParser';
import { MermaidBackend } from './backends/MermaidBackend';
import { SVGBackend } from './backends/SVGBackend';
import { ContextBuilder } from './ContextBuilder';
import { ConversationManager } from './ConversationManager';
import type {
  AIBackend,
  GenerationRequest,
  GenerationResult,
  ParsedPrompt,
  DiagramType,
  DiagramDomain,
  Logger,
} from './types';
import { createLogger, AIServiceError } from './types';
import type { ConversationContext } from './ConversationManager';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Options for diagram generation
 */
export interface GenerateOptions {
  /** Preferred backend override */
  preferredBackend?: 'mermaid' | 'svg' | 'plotly' | 'tikz';
  /** Domain context for specialized prompts */
  domain?: DiagramDomain;
  /** Whether to use conversation context */
  useConversationContext?: boolean;
  /** Conversation ID for multi-turn generation */
  conversationId?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Options for diagram refinement
 */
export interface RefineOptions {
  /** Conversation context to use */
  conversationId?: string;
  /** Preserve specific elements during refinement */
  preserveElements?: string[];
  /** Refinement mode */
  mode?: 'modify' | 'enhance' | 'simplify' | 'restyle';
}

/**
 * Extended generation result with additional context
 */
export interface ExtendedGenerationResult extends GenerationResult {
  /** Parsed prompt information */
  parsedPrompt?: ParsedPrompt;
  /** Conversation ID for tracking */
  conversationId?: string;
  /** Suggested follow-up actions */
  suggestions?: string[];
}

// =============================================================================
// DIAGRAM GENERATOR CLASS
// =============================================================================

/**
 * DiagramGenerator orchestrates the conversion of natural language prompts
 * into diagram visualizations using various backends.
 */
export class DiagramGenerator {
  private readonly parser: PromptParser;
  private readonly contextBuilder: ContextBuilder;
  private readonly conversationManager: ConversationManager;
  private readonly backends: Map<string, AIBackend>;
  private readonly logger: Logger;
  private initialized = false;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('DiagramGenerator');
    this.parser = new PromptParser();
    this.contextBuilder = new ContextBuilder();
    this.conversationManager = new ConversationManager();
    this.backends = new Map<string, AIBackend>([
      ['mermaid', new MermaidBackend()],
      ['svg', new SVGBackend()],
    ]);
  }

  /**
   * Initialize all backends
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.logger.debug('Initializing DiagramGenerator');

    // Initialize backends that require it
    for (const [name, backend] of this.backends) {
      if ('initialize' in backend && typeof backend.initialize === 'function') {
        try {
          await backend.initialize();
          this.logger.debug(`Backend initialized: ${name}`);
        } catch (error) {
          this.logger.warn(`Failed to initialize backend: ${name}`, {
            error: (error as Error).message,
          });
        }
      }
    }

    this.initialized = true;
    this.logger.info('DiagramGenerator initialized');
  }

  /**
   * Generate a diagram from a natural language prompt
   *
   * @param prompt - Natural language description of the desired diagram
   * @param options - Generation options
   * @returns Promise resolving to the generation result
   */
  async generate(
    prompt: string,
    options: GenerateOptions = {}
  ): Promise<ExtendedGenerationResult> {
    await this.initialize();

    const startTime = Date.now();
    this.logger.info('Starting diagram generation', {
      promptLength: prompt.length,
      options,
    });

    try {
      // Validate prompt
      if (!prompt || prompt.trim().length === 0) {
        throw new AIServiceError(
          'Prompt cannot be empty',
          'INVALID_PROMPT'
        );
      }

      // Get conversation context if available
      const conversationContext = options.useConversationContext
        ? this.conversationManager.getContext(options.conversationId)
        : undefined;

      // Parse the prompt to determine intent
      const parsedPrompt = this.parser.parse(
        prompt,
        conversationContext?.summary
      );

      this.logger.debug('Prompt parsed', {
        diagramType: parsedPrompt.diagramType,
        domain: parsedPrompt.domain,
        confidence: parsedPrompt.confidence,
        isModification: parsedPrompt.isModification,
      });

      // Select the best backend
      const backendName = this.selectBackend(parsedPrompt, options);
      const backend = this.backends.get(backendName);

      if (!backend) {
        throw new AIServiceError(
          `Backend not available: ${backendName}`,
          'BACKEND_UNAVAILABLE'
        );
      }

      this.logger.debug(`Selected backend: ${backendName}`);

      // Build the generation request
      const request = this.buildRequest(
        prompt,
        parsedPrompt,
        options,
        conversationContext
      );

      // Generate the diagram
      const result = await backend.generate(request);

      // Record in conversation history
      const conversationId = this.conversationManager.addTurn(
        prompt,
        result,
        options.conversationId
      );

      // Build extended result
      const extendedResult: ExtendedGenerationResult = {
        ...result,
        parsedPrompt,
        conversationId,
        suggestions: this.generateSuggestions(parsedPrompt, result),
        metadata: {
          ...result.metadata,
          generationTimeMs: Date.now() - startTime,
        },
      };

      this.logger.info('Diagram generated successfully', {
        backend: result.backend,
        diagramType: parsedPrompt.diagramType,
        generationTimeMs: extendedResult.metadata.generationTimeMs,
        svgLength: result.svg.length,
      });

      return extendedResult;
    } catch (error) {
      this.logger.error('Generation failed', error as Error, {
        prompt: prompt.substring(0, 100),
      });

      if (error instanceof AIServiceError) {
        throw error;
      }

      throw new AIServiceError(
        `Diagram generation failed: ${(error as Error).message}`,
        'GENERATION_FAILED',
        { originalError: (error as Error).message }
      );
    }
  }

  /**
   * Refine an existing diagram based on a follow-up prompt
   *
   * @param existingSvg - The existing SVG content to refine
   * @param refinementPrompt - Natural language description of desired changes
   * @param options - Refinement options
   * @returns Promise resolving to the refined generation result
   */
  async refine(
    existingSvg: string,
    refinementPrompt: string,
    options: RefineOptions = {}
  ): Promise<ExtendedGenerationResult> {
    await this.initialize();

    const startTime = Date.now();
    this.logger.info('Starting diagram refinement', {
      promptLength: refinementPrompt.length,
      svgLength: existingSvg.length,
      mode: options.mode ?? 'modify',
    });

    try {
      // Validate inputs
      if (!existingSvg || existingSvg.trim().length === 0) {
        throw new AIServiceError(
          'Existing SVG cannot be empty',
          'INVALID_PROMPT'
        );
      }

      if (!refinementPrompt || refinementPrompt.trim().length === 0) {
        throw new AIServiceError(
          'Refinement prompt cannot be empty',
          'INVALID_PROMPT'
        );
      }

      // Get conversation context
      const conversationContext = this.conversationManager.getContext(
        options.conversationId
      );

      // Build refinement context
      const refinementContext = this.contextBuilder.buildRefinementPrompt(
        refinementPrompt,
        existingSvg,
        conversationContext,
        options
      );

      // Parse the refinement prompt
      const parsedPrompt = this.parser.parse(refinementPrompt, existingSvg);

      // Determine the backend based on the existing SVG
      const backendName = this.detectBackendFromSvg(existingSvg, parsedPrompt);
      const backend = this.backends.get(backendName);

      if (!backend) {
        throw new AIServiceError(
          `Backend not available: ${backendName}`,
          'BACKEND_UNAVAILABLE'
        );
      }

      // Build the refinement request
      const request: GenerationRequest = {
        prompt: refinementContext,
        existingDiagram: existingSvg,
        context: conversationContext?.summary,
        conversationId: options.conversationId,
        metadata: {
          isModification: true,
          style: conversationContext?.style,
        },
      };

      // Generate the refined diagram
      const result = await backend.generate(request);

      // Record in conversation history
      const conversationId = this.conversationManager.addTurn(
        refinementPrompt,
        result,
        options.conversationId
      );

      // Build extended result
      const extendedResult: ExtendedGenerationResult = {
        ...result,
        parsedPrompt,
        conversationId,
        suggestions: this.generateRefinementSuggestions(result, options.mode),
        metadata: {
          ...result.metadata,
          generationTimeMs: Date.now() - startTime,
          version: (conversationContext?.version ?? 0) + 1,
        },
      };

      this.logger.info('Diagram refined successfully', {
        backend: result.backend,
        generationTimeMs: extendedResult.metadata.generationTimeMs,
        version: extendedResult.metadata.version,
      });

      return extendedResult;
    } catch (error) {
      this.logger.error('Refinement failed', error as Error);

      if (error instanceof AIServiceError) {
        throw error;
      }

      throw new AIServiceError(
        `Diagram refinement failed: ${(error as Error).message}`,
        'GENERATION_FAILED',
        { originalError: (error as Error).message }
      );
    }
  }

  /**
   * Generate a diagram from a specific template
   *
   * @param templateType - The template type (consort, prisma, etc.)
   * @param data - Data to populate the template
   * @returns Promise resolving to the generation result
   */
  async generateFromTemplate(
    templateType: DiagramType,
    data?: Record<string, unknown>
  ): Promise<ExtendedGenerationResult> {
    const templatePrompt = this.buildTemplatePrompt(templateType, data);
    return this.generate(templatePrompt, {
      preferredBackend: 'mermaid',
      domain: this.getDomainForTemplate(templateType),
    });
  }

  /**
   * Validate a diagram without rendering
   *
   * @param content - The diagram content to validate
   * @param backend - The backend to use for validation
   * @returns Validation result
   */
  async validate(
    content: string,
    backend: 'mermaid' | 'svg' = 'mermaid'
  ): Promise<{ valid: boolean; error?: string; suggestions?: string[] }> {
    const backendInstance = this.backends.get(backend);

    if (!backendInstance?.validate) {
      return { valid: true }; // Skip validation if not supported
    }

    return backendInstance.validate(content);
  }

  /**
   * Get available backends
   */
  getAvailableBackends(): string[] {
    return Array.from(this.backends.keys());
  }

  /**
   * Get conversation history
   */
  getConversationHistory(conversationId?: string): ConversationContext | null {
    return this.conversationManager.getContext(conversationId);
  }

  /**
   * Clear conversation history
   */
  clearConversation(conversationId?: string): void {
    this.conversationManager.clear(conversationId);
    this.logger.debug('Conversation cleared', { conversationId });
  }

  /**
   * Get the last generated diagram
   */
  getLastDiagram(conversationId?: string): string | null {
    return this.conversationManager.getLastDiagram(conversationId);
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  /**
   * Select the best backend for the given prompt
   */
  private selectBackend(
    parsedPrompt: ParsedPrompt,
    options: GenerateOptions
  ): string {
    // User-specified preference takes priority
    if (options.preferredBackend) {
      if (this.backends.has(options.preferredBackend)) {
        return options.preferredBackend;
      }
      this.logger.warn(
        `Preferred backend not available: ${options.preferredBackend}, falling back`
      );
    }

    // Use parser's suggestion based on diagram type
    const suggested = this.parser.suggestBackend(parsedPrompt);

    // Check if suggested backend is available
    if (this.backends.has(suggested)) {
      return suggested;
    }

    // Fall back to Mermaid for most cases
    if (this.backends.has('mermaid')) {
      return 'mermaid';
    }

    // Last resort: first available backend
    const firstAvailable = this.backends.keys().next().value;
    if (!firstAvailable) {
      throw new AIServiceError(
        'No backends available',
        'BACKEND_UNAVAILABLE'
      );
    }

    return firstAvailable;
  }

  /**
   * Build a generation request from parsed prompt
   */
  private buildRequest(
    prompt: string,
    parsedPrompt: ParsedPrompt,
    options: GenerateOptions,
    context?: ConversationContext | null
  ): GenerationRequest {
    // Build enhanced prompt with context
    const enhancedPrompt = this.contextBuilder.buildGenerationPrompt(
      prompt,
      context ?? undefined,
      {
        diagramType: parsedPrompt.diagramType,
        domain: options.domain ?? parsedPrompt.domain,
        entities: parsedPrompt.entities,
      }
    );

    return {
      prompt: enhancedPrompt,
      context: context?.summary,
      preferredBackend: options.preferredBackend,
      conversationId: options.conversationId,
      metadata: {
        domain: options.domain ?? parsedPrompt.domain,
        isModification: parsedPrompt.isModification,
      },
    };
  }

  /**
   * Detect which backend was used to create the SVG
   */
  private detectBackendFromSvg(
    svg: string,
    parsedPrompt: ParsedPrompt
  ): string {
    // Check for Mermaid markers
    if (
      svg.includes('mermaid') ||
      svg.includes('flowchart') ||
      svg.includes('class="node')
    ) {
      return 'mermaid';
    }

    // Use parser suggestion for refinement
    return this.parser.suggestBackend(parsedPrompt);
  }

  /**
   * Generate follow-up suggestions based on the result
   */
  private generateSuggestions(
    parsedPrompt: ParsedPrompt,
    _result: GenerationResult
  ): string[] {
    const suggestions: string[] = [];

    // Suggest refinements based on diagram type
    switch (parsedPrompt.diagramType) {
      case 'flowchart':
        suggestions.push('Add more decision points');
        suggestions.push('Include error handling paths');
        suggestions.push('Add swimlanes for different actors');
        break;

      case 'consort':
        suggestions.push('Update sample sizes');
        suggestions.push('Add subgroup analysis');
        suggestions.push('Include per-protocol population');
        break;

      case 'prisma':
        suggestions.push('Add more database sources');
        suggestions.push('Detail exclusion criteria');
        suggestions.push('Include grey literature search');
        break;

      case 'sequence':
        suggestions.push('Add more participants');
        suggestions.push('Include alternative flows');
        suggestions.push('Add timing annotations');
        break;

      case 'pathway':
        suggestions.push('Add inhibitory pathways');
        suggestions.push('Include feedback loops');
        suggestions.push('Add cellular compartments');
        break;

      default:
        suggestions.push('Refine node labels');
        suggestions.push('Adjust layout orientation');
        suggestions.push('Add color coding');
    }

    // Add low confidence suggestion
    if (parsedPrompt.confidence < 0.7) {
      suggestions.unshift(
        'Clarify diagram type for better results'
      );
    }

    // Add alternative suggestions
    if (parsedPrompt.alternatives.length > 0) {
      const alt = parsedPrompt.alternatives[0];
      suggestions.push(
        `Try generating as ${alt.diagramType} instead`
      );
    }

    return suggestions.slice(0, 5);
  }

  /**
   * Generate suggestions specific to refinement
   */
  private generateRefinementSuggestions(
    result: GenerationResult,
    mode?: string
  ): string[] {
    const suggestions: string[] = [];

    switch (mode) {
      case 'simplify':
        suggestions.push('Remove additional elements');
        suggestions.push('Merge similar nodes');
        break;

      case 'enhance':
        suggestions.push('Add more detail');
        suggestions.push('Include annotations');
        break;

      case 'restyle':
        suggestions.push('Try a different color scheme');
        suggestions.push('Adjust font sizes');
        break;

      default:
        suggestions.push('Continue refining');
        suggestions.push('Undo last change');
        suggestions.push('Export current version');
    }

    if (result.warnings && result.warnings.length > 0) {
      suggestions.unshift('Address warnings in the diagram');
    }

    return suggestions.slice(0, 4);
  }

  /**
   * Build a prompt for template-based generation
   */
  private buildTemplatePrompt(
    templateType: DiagramType,
    data?: Record<string, unknown>
  ): string {
    const templateDescriptions: Partial<Record<DiagramType, string>> = {
      consort: 'Create a CONSORT flow diagram for a randomized controlled trial',
      prisma: 'Create a PRISMA flow diagram for a systematic review',
      'decision-tree': 'Create a clinical decision tree algorithm',
      'state-diagram': 'Create a state transition diagram',
      flowchart: 'Create a process flowchart',
      sequence: 'Create a sequence diagram',
      'forest-plot': 'Create a forest plot for meta-analysis',
      'kaplan-meier': 'Create a Kaplan-Meier survival curve',
      pathway: 'Create a signaling pathway diagram',
    };

    let prompt = templateDescriptions[templateType] ?? `Create a ${templateType} diagram`;

    // Add data context if provided
    if (data) {
      const dataContext = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      prompt += ` with the following data: ${dataContext}`;
    }

    return prompt;
  }

  /**
   * Get domain for template type
   */
  private getDomainForTemplate(templateType: DiagramType): DiagramDomain {
    const domainMap: Partial<Record<DiagramType, DiagramDomain>> = {
      consort: 'medicine',
      prisma: 'medicine',
      'decision-tree': 'medicine',
      'forest-plot': 'statistics',
      'kaplan-meier': 'statistics',
      'roc-curve': 'statistics',
      pathway: 'biology',
      anatomical: 'biology',
      molecular: 'chemistry',
      cell: 'biology',
    };

    return domainMap[templateType] ?? 'general';
  }
}

// Export singleton instance
export const diagramGenerator = new DiagramGenerator();
export default diagramGenerator;
