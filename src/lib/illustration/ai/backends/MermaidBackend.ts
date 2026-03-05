/**
 * MermaidBackend.ts
 * Mermaid.js backend for diagram generation
 *
 * Generates Mermaid DSL from prompts and renders to SVG.
 * Handles flowcharts, sequence diagrams, state diagrams, and more.
 */

import mermaid from 'mermaid';
import type {
  AIBackend,
  GenerationRequest,
  GenerationResult,
  ValidationResult,
  Logger,
  DiagramType,
} from '../types';
import { createLogger, AIServiceError } from '../types';
import { FEW_SHOT_EXAMPLES } from '../prompts';

// =============================================================================
// MERMAID CONFIGURATION
// =============================================================================

/**
 * Design tokens for consistent theming
 */
const DESIGN_TOKENS = {
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    neutral: '#6b7280',
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#6b7280',
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
};

/**
 * Mermaid theme configuration
 */
const MERMAID_THEME_CONFIG = {
  theme: 'base' as const,
  themeVariables: {
    primaryColor: DESIGN_TOKENS.colors.primary,
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#1d4ed8',
    secondaryColor: DESIGN_TOKENS.colors.surface,
    secondaryTextColor: DESIGN_TOKENS.colors.text,
    secondaryBorderColor: DESIGN_TOKENS.colors.border,
    tertiaryColor: '#fef3c7',
    tertiaryTextColor: DESIGN_TOKENS.colors.text,
    tertiaryBorderColor: '#fbbf24',
    lineColor: DESIGN_TOKENS.colors.neutral,
    textColor: DESIGN_TOKENS.colors.text,
    mainBkg: DESIGN_TOKENS.colors.background,
    nodeBorder: DESIGN_TOKENS.colors.border,
    clusterBkg: DESIGN_TOKENS.colors.surface,
    clusterBorder: DESIGN_TOKENS.colors.border,
    fontFamily: DESIGN_TOKENS.fonts.primary,
    fontSize: '14px',
    labelColor: DESIGN_TOKENS.colors.text,
    actorBkg: DESIGN_TOKENS.colors.primary,
    actorBorder: '#1d4ed8',
    actorTextColor: '#ffffff',
    signalColor: DESIGN_TOKENS.colors.text,
    signalTextColor: DESIGN_TOKENS.colors.text,
    noteBkgColor: '#fef9c3',
    noteTextColor: DESIGN_TOKENS.colors.text,
    noteBorderColor: '#fbbf24',
  },
};

/**
 * Mermaid diagram type patterns
 */
const MERMAID_TYPE_PATTERNS: Record<string, RegExp> = {
  flowchart: /^flowchart\s+(TB|BT|LR|RL)/im,
  graph: /^graph\s+(TB|BT|LR|RL)/im,
  sequence: /^sequenceDiagram/im,
  class: /^classDiagram/im,
  state: /^stateDiagram/im,
  er: /^erDiagram/im,
  pie: /^pie\s+/im,
  gantt: /^gantt\s*/im,
  journey: /^journey\s*/im,
  git: /^gitGraph\s*/im,
  mindmap: /^mindmap\s*/im,
  timeline: /^timeline\s*/im,
  quadrant: /^quadrantChart\s*/im,
  requirement: /^requirementDiagram\s*/im,
  c4: /^C4Context\s*/im,
  sankey: /^sankey-beta\s*/im,
};

// =============================================================================
// MERMAID BACKEND CLASS
// =============================================================================

/**
 * MermaidBackend implements AIBackend for Mermaid.js diagram generation
 */
export class MermaidBackend implements AIBackend {
  readonly name = 'mermaid';
  private initialized = false;
  private renderCounter = 0;
  private readonly logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('MermaidBackend');
  }

  /**
   * Initialize Mermaid with configuration
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.logger.debug('Initializing Mermaid');

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      ...MERMAID_THEME_CONFIG,
    });

    this.initialized = true;
    this.logger.info('Mermaid initialized');
  }

  /**
   * Check if this backend can handle the given prompt
   */
  canHandle(prompt: string): boolean {
    const normalizedPrompt = prompt.toLowerCase();

    // Check if it's already Mermaid DSL
    if (this.isMermaidDSL(prompt)) {
      return true;
    }

    // Keywords that indicate Mermaid-suitable diagrams
    const mermaidKeywords = [
      'flowchart', 'flow chart', 'flow diagram', 'process flow', 'workflow',
      'sequence diagram', 'sequence', 'interaction',
      'state diagram', 'state machine', 'state transition',
      'decision tree', 'algorithm', 'branching',
      'consort', 'prisma', 'trial flow', 'systematic review',
      'class diagram', 'er diagram', 'entity relationship',
      'timeline', 'journey', 'gantt', 'mindmap',
    ];

    for (const keyword of mermaidKeywords) {
      if (normalizedPrompt.includes(keyword)) {
        return true;
      }
    }

    // Default to handling flowchart-like requests
    if (
      normalizedPrompt.includes('diagram') ||
      normalizedPrompt.includes('flow') ||
      normalizedPrompt.includes('process')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Generate a diagram from the request
   */
  async generate(request: GenerationRequest): Promise<GenerationResult> {
    const startTime = Date.now();
    await this.initialize();

    this.logger.info('Generating Mermaid diagram', { prompt: request.prompt.substring(0, 100) });

    try {
      let dsl: string;
      let promptTokens = 0;
      let completionTokens = 0;

      // Check if the prompt is already Mermaid DSL
      if (this.isMermaidDSL(request.prompt)) {
        dsl = request.prompt;
        this.logger.debug('Using provided Mermaid DSL');
      } else if (request.existingDiagram && this.isMermaidDSL(request.existingDiagram)) {
        // Modification request with existing diagram
        dsl = await this.handleModification(request);
        promptTokens = this.estimateTokens(request.prompt);
        completionTokens = this.estimateTokens(dsl);
      } else {
        // Generate DSL from natural language
        dsl = await this.generateFromPrompt(request);
        promptTokens = this.estimateTokens(request.prompt);
        completionTokens = this.estimateTokens(dsl);
      }

      // Validate the DSL
      const validation = await this.validate(dsl);
      if (!validation.valid) {
        // Try to fix common issues
        const fixedDsl = this.attemptDslFix(dsl, validation.error ?? '');
        const revalidation = await this.validate(fixedDsl);

        if (!revalidation.valid) {
          throw new AIServiceError(
            `Invalid Mermaid DSL: ${validation.error}`,
            'VALIDATION_FAILED',
            { dsl, error: validation.error }
          );
        }
        dsl = fixedDsl;
        this.logger.warn('DSL auto-fixed', { originalError: validation.error });
      }

      // Render to SVG
      const svg = await this.renderToSvg(dsl);
      const generationTimeMs = Date.now() - startTime;

      const result: GenerationResult = {
        svg,
        backend: this.name,
        dsl,
        metadata: {
          generatedAt: new Date(),
          promptTokens,
          completionTokens,
          generationTimeMs,
          diagramType: this.detectMermaidType(dsl),
          confidence: 0.9,
        },
      };

      this.logger.info('Diagram generated successfully', {
        generationTimeMs,
        svgLength: svg.length,
      });

      return result;
    } catch (error) {
      this.logger.error('Generation failed', error as Error);
      throw error instanceof AIServiceError
        ? error
        : new AIServiceError(
            `Mermaid generation failed: ${(error as Error).message}`,
            'GENERATION_FAILED',
            { originalError: (error as Error).message }
          );
    }
  }

  /**
   * Validate Mermaid DSL
   */
  async validate(dsl: string): Promise<ValidationResult> {
    await this.initialize();

    try {
      await mermaid.parse(dsl.trim());
      return { valid: true };
    } catch (error) {
      const message = (error as Error).message ?? String(error);
      const lineMatch = message.match(/line\s+(\d+)/i);

      return {
        valid: false,
        error: this.formatValidationError(message),
        line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
        suggestions: this.getSuggestions(message, dsl),
      };
    }
  }

  /**
   * Check if content is Mermaid DSL
   */
  private isMermaidDSL(content: string): boolean {
    const trimmed = content.trim();
    return Object.values(MERMAID_TYPE_PATTERNS).some((pattern) => pattern.test(trimmed));
  }

  /**
   * Detect the Mermaid diagram type from DSL
   */
  private detectMermaidType(dsl: string): DiagramType {
    const trimmed = dsl.trim();

    if (MERMAID_TYPE_PATTERNS.flowchart.test(trimmed) || MERMAID_TYPE_PATTERNS.graph.test(trimmed)) {
      // Check for specific templates
      if (/consort|enrollment|randomiz/i.test(trimmed)) {
        return 'consort';
      }
      if (/prisma|screening|eligibility|identification/i.test(trimmed)) {
        return 'prisma';
      }
      if (/decision|algorithm|yes.*no|true.*false/i.test(trimmed)) {
        return 'decision-tree';
      }
      return 'flowchart';
    }

    if (MERMAID_TYPE_PATTERNS.sequence.test(trimmed)) {
      return 'sequence';
    }

    if (MERMAID_TYPE_PATTERNS.state.test(trimmed)) {
      return 'state-diagram';
    }

    return 'generic';
  }

  /**
   * Generate Mermaid DSL from natural language prompt
   */
  private async generateFromPrompt(request: GenerationRequest): Promise<string> {
    const diagramType = this.inferDiagramType(request.prompt);

    // Check if we have a template for this type
    const templateDsl = this.getTemplateForType(diagramType);
    if (templateDsl) {
      this.logger.debug('Using template', { diagramType });
      return this.populateTemplate(templateDsl, request.prompt);
    }

    // Check for few-shot examples
    const examples = FEW_SHOT_EXAMPLES[diagramType];
    if (examples && examples.length > 0) {
      // Use the closest matching example as a starting point
      const bestExample = this.findBestExample(request.prompt, examples);
      if (bestExample) {
        this.logger.debug('Using few-shot example', { diagramType });
        return this.adaptExample(bestExample.output, request.prompt);
      }
    }

    // Generate basic flowchart from prompt
    return this.generateBasicFlowchart(request.prompt);
  }

  /**
   * Infer diagram type from prompt
   */
  private inferDiagramType(prompt: string): DiagramType {
    const normalizedPrompt = prompt.toLowerCase();

    if (/consort|randomized\s+trial|rct/i.test(normalizedPrompt)) {
      return 'consort';
    }
    if (/prisma|systematic\s+review/i.test(normalizedPrompt)) {
      return 'prisma';
    }
    if (/decision\s+tree|algorithm|diagnostic/i.test(normalizedPrompt)) {
      return 'decision-tree';
    }
    if (/state\s+(diagram|machine)|transition/i.test(normalizedPrompt)) {
      return 'state-diagram';
    }
    if (/sequence|journey|timeline/i.test(normalizedPrompt)) {
      return 'sequence';
    }

    return 'flowchart';
  }

  /**
   * Get a template DSL for a diagram type
   */
  private getTemplateForType(type: DiagramType): string | null {
    const templates: Partial<Record<DiagramType, string>> = {
      consort: this.getConsortTemplate(),
      prisma: this.getPrismaTemplate(),
      'decision-tree': this.getDecisionTreeTemplate(),
      'state-diagram': this.getStateDiagramTemplate(),
    };

    return templates[type] ?? null;
  }

  /**
   * CONSORT template
   */
  private getConsortTemplate(): string {
    return `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=N)"]
        excluded["Excluded (n=n)<br/>Not meeting criteria (n=n)<br/>Declined (n=n)<br/>Other (n=n)"]
    end

    randomized["Randomized<br/>(n=N)"]

    subgraph allocation["Allocation"]
        intervention["Allocated to intervention (n=n)<br/>Received intervention (n=n)<br/>Did not receive (n=n)"]
        control["Allocated to control (n=n)<br/>Received control (n=n)<br/>Did not receive (n=n)"]
    end

    subgraph followup["Follow-up"]
        fuIntervention["Lost to follow-up (n=n)<br/>Discontinued (n=n)"]
        fuControl["Lost to follow-up (n=n)<br/>Discontinued (n=n)"]
    end

    subgraph analysis["Analysis"]
        analysisIntervention["Analyzed (n=n)<br/>Excluded (n=n)"]
        analysisControl["Analyzed (n=n)<br/>Excluded (n=n)"]
    end

    assessed --> excluded
    assessed --> randomized
    randomized --> intervention
    randomized --> control
    intervention --> fuIntervention
    control --> fuControl
    fuIntervention --> analysisIntervention
    fuControl --> analysisControl`;
  }

  /**
   * PRISMA template
   */
  private getPrismaTemplate(): string {
    return `flowchart TB
    subgraph identification["Identification"]
        records["Records identified<br/>(n=N)"]
        duplicates["Duplicates removed<br/>(n=n)"]
    end

    subgraph screening["Screening"]
        screened["Records screened<br/>(n=n)"]
        excluded["Records excluded<br/>(n=n)"]
    end

    subgraph eligibility["Eligibility"]
        assessed["Full-text assessed<br/>(n=n)"]
        excludedFT["Excluded (n=n)<br/>Reason 1 (n=n)<br/>Reason 2 (n=n)"]
    end

    subgraph included["Included"]
        studies["Studies included<br/>(n=n)"]
    end

    records --> duplicates
    duplicates --> screened
    screened --> excluded
    screened --> assessed
    assessed --> excludedFT
    assessed --> studies`;
  }

  /**
   * Decision tree template
   */
  private getDecisionTreeTemplate(): string {
    return `flowchart TB
    start(["Start"])
    decision1{"Decision 1?"}
    decision2{"Decision 2?"}
    decision3{"Decision 3?"}
    outcome1(["Outcome 1"])
    outcome2(["Outcome 2"])
    outcome3(["Outcome 3"])
    outcome4(["Outcome 4"])

    start --> decision1
    decision1 -->|Yes| decision2
    decision1 -->|No| decision3
    decision2 -->|Yes| outcome1
    decision2 -->|No| outcome2
    decision3 -->|Yes| outcome3
    decision3 -->|No| outcome4`;
  }

  /**
   * State diagram template
   */
  private getStateDiagramTemplate(): string {
    return `stateDiagram-v2
    [*] --> Initial
    Initial --> State1: trigger1
    State1 --> State2: trigger2
    State2 --> State3: trigger3
    State2 --> State1: back
    State3 --> [*]: complete`;
  }

  /**
   * Populate a template with information from the prompt
   */
  private populateTemplate(template: string, prompt: string): string {
    // Extract numbers from prompt
    const numbers = prompt.match(/\d+/g)?.map(Number) ?? [];

    // Simple replacement - in production, would use more sophisticated NLP
    let result = template;

    // Replace sample sizes if numbers are found
    if (numbers.length > 0) {
      let numIndex = 0;
      result = result.replace(/n=N|n=n/g, () => {
        const value = numbers[numIndex] ?? '...';
        numIndex = (numIndex + 1) % numbers.length;
        return `n=${value}`;
      });
    }

    return result;
  }

  /**
   * Find the best matching few-shot example
   */
  private findBestExample(
    prompt: string,
    examples: Array<{ prompt: string; output: string }>
  ): { prompt: string; output: string } | null {
    const normalizedPrompt = prompt.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const example of examples) {
      const exampleWords = example.prompt.toLowerCase().split(/\s+/);
      let score = 0;

      for (const word of exampleWords) {
        if (normalizedPrompt.includes(word) && word.length > 3) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = example;
      }
    }

    return bestScore >= 2 ? bestMatch : null;
  }

  /**
   * Adapt an example to the user's prompt
   */
  private adaptExample(example: string, prompt: string): string {
    // Add a comment noting the source
    return `${example}

    %% Adapted from example
    %% Customize this diagram for: ${prompt.substring(0, 50)}...`;
  }

  /**
   * Generate a basic flowchart from natural language
   */
  private generateBasicFlowchart(prompt: string): string {
    // Extract capitalized words as potential nodes
    const words = prompt.split(/\s+/);
    const potentialNodes = words.filter(
      (w) =>
        w.length > 2 &&
        /^[A-Z]/.test(w) &&
        !['The', 'And', 'For', 'With', 'From', 'Into', 'Then', 'After'].includes(w)
    );

    if (potentialNodes.length < 2) {
      // Return a basic template
      return `flowchart TB
    A["Start"] --> B["Process"]
    B --> C["End"]

    %% Generated from: ${prompt.substring(0, 50)}...
    %% Please customize this diagram`;
    }

    // Build flowchart from nodes
    let dsl = 'flowchart TB\n';
    const nodeIds: string[] = [];

    for (let i = 0; i < Math.min(potentialNodes.length, 10); i++) {
      const id = String.fromCharCode(65 + i); // A, B, C, ...
      const label = potentialNodes[i];
      dsl += `    ${id}["${label}"]\n`;
      nodeIds.push(id);
    }

    dsl += '\n';

    // Connect nodes sequentially
    for (let i = 0; i < nodeIds.length - 1; i++) {
      dsl += `    ${nodeIds[i]} --> ${nodeIds[i + 1]}\n`;
    }

    dsl += `\n    %% Auto-generated from: ${prompt.substring(0, 50)}...\n`;
    dsl += '    %% Please refine this diagram';

    return dsl;
  }

  /**
   * Handle modification of existing diagram
   */
  private async handleModification(request: GenerationRequest): Promise<string> {
    const existingDsl = request.existingDiagram ?? '';
    const modification = request.prompt.toLowerCase();

    // Simple modification handlers
    if (/add\s+(a\s+)?node/i.test(modification)) {
      return this.addNodeToDsl(existingDsl, modification);
    }

    if (/remove\s+(a\s+)?node/i.test(modification)) {
      return this.removeNodeFromDsl(existingDsl, modification);
    }

    if (/change\s+(the\s+)?color/i.test(modification)) {
      return this.changeColorInDsl(existingDsl, modification);
    }

    // Default: return existing with comment about requested change
    return `${existingDsl}

    %% Requested modification: ${modification}
    %% Please apply this change manually`;
  }

  /**
   * Add a node to existing DSL
   */
  private addNodeToDsl(dsl: string, instruction: string): string {
    // Extract potential node name from instruction
    const nameMatch = instruction.match(/(?:called|named|labeled)\s+["']?(\w+)["']?/i);
    const newNodeName = nameMatch ? nameMatch[1] : 'NewNode';
    const newNodeId = `node${Date.now() % 1000}`;

    // Add the new node at the end
    return `${dsl}
    ${newNodeId}["${newNodeName}"]

    %% New node added. Connect it to existing nodes as needed.`;
  }

  /**
   * Remove a node from existing DSL
   */
  private removeNodeFromDsl(dsl: string, instruction: string): string {
    const nameMatch = instruction.match(/(?:called|named|labeled)\s+["']?(\w+)["']?/i);
    if (!nameMatch) {
      return dsl + '\n    %% Could not identify node to remove';
    }

    const nodeName = nameMatch[1];
    // Comment out lines containing the node
    const lines = dsl.split('\n');
    const modifiedLines = lines.map((line) => {
      if (line.includes(`"${nodeName}"`) || new RegExp(`\\b${nodeName}\\b`).test(line)) {
        return `%% REMOVED: ${line}`;
      }
      return line;
    });

    return modifiedLines.join('\n');
  }

  /**
   * Change colors in DSL
   */
  private changeColorInDsl(dsl: string, instruction: string): string {
    // Extract color if mentioned
    const colorMatch = instruction.match(
      /(red|blue|green|yellow|orange|purple|pink|gray|grey|black|white|#[0-9a-fA-F]{6})/i
    );
    const color = colorMatch ? colorMatch[1].toLowerCase() : '#2563eb';

    // Check if classDef already exists
    if (dsl.includes('classDef')) {
      // Modify existing classDef
      return dsl.replace(/fill:#[0-9a-fA-F]{6}/g, `fill:${color}`);
    }

    // Add new classDef
    return `${dsl}

    classDef customStyle fill:${color},stroke:#333,color:#fff
    %% Apply to nodes: class nodeId customStyle`;
  }

  /**
   * Render Mermaid DSL to SVG
   */
  private async renderToSvg(dsl: string): Promise<string> {
    const id = `mermaid-${++this.renderCounter}`;

    try {
      const { svg } = await mermaid.render(id, dsl.trim());
      return this.postProcessSvg(svg);
    } catch (error) {
      this.logger.error('Render failed', error as Error);
      throw new AIServiceError(
        `Mermaid render failed: ${(error as Error).message}`,
        'RENDER_FAILED'
      );
    }
  }

  /**
   * Post-process SVG for better compatibility
   */
  private postProcessSvg(svg: string): string {
    let processed = svg;

    // Remove background rect if present
    processed = processed.replace(
      /<rect[^>]*class="[^"]*background[^"]*"[^>]*><\/rect>/gi,
      ''
    );

    // Ensure viewBox is present
    if (!processed.includes('viewBox')) {
      const widthMatch = processed.match(/width="([^"]+)"/);
      const heightMatch = processed.match(/height="([^"]+)"/);

      if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        processed = processed.replace(/<svg/, `<svg viewBox="0 0 ${width} ${height}"`);
      }
    }

    // Clean up max-width
    processed = processed.replace(/max-width:\s*[^;]+;?/gi, '');

    // Add stroke styling
    processed = processed.replace(
      /<svg/,
      '<svg stroke-linecap="round" stroke-linejoin="round"'
    );

    // Add XML declaration if missing
    if (!processed.startsWith('<?xml')) {
      processed = '<?xml version="1.0" encoding="UTF-8"?>\n' + processed;
    }

    return processed;
  }

  /**
   * Format validation error for display
   */
  private formatValidationError(message: string): string {
    return message
      .replace(/Syntax error in text/i, 'Syntax error')
      .replace(/mermaid version .+?$/m, '')
      .trim();
  }

  /**
   * Get suggestions for fixing DSL errors
   */
  private getSuggestions(error: string, _dsl: string): string[] {
    const suggestions: string[] = [];

    if (error.includes('arrow')) {
      suggestions.push('Check arrow syntax. Use --> for solid arrows, -.-> for dashed.');
    }

    if (error.includes('quote') || error.includes('string')) {
      suggestions.push('Ensure all labels are properly quoted with double quotes.');
    }

    if (error.includes('subgraph')) {
      suggestions.push('Subgraph syntax: subgraph name["Title"]');
    }

    if (error.includes('flowchart') || error.includes('graph')) {
      suggestions.push('Start with: flowchart TB (or LR, BT, RL)');
    }

    if (suggestions.length === 0) {
      suggestions.push('Check Mermaid syntax at https://mermaid.js.org/');
    }

    return suggestions;
  }

  /**
   * Attempt to fix common DSL issues
   */
  private attemptDslFix(dsl: string, _error: string): string {
    let fixed = dsl;

    // Fix missing flowchart declaration
    if (!fixed.trim().match(/^(flowchart|graph|sequenceDiagram|stateDiagram)/i)) {
      fixed = 'flowchart TB\n' + fixed;
    }

    // Fix unquoted labels with special characters
    fixed = fixed.replace(/\[([^\]"]+)\]/g, (match, label) => {
      if (/[<>\/\(\):]/.test(label) && !label.startsWith('"')) {
        return `["${label}"]`;
      }
      return match;
    });

    // Fix broken arrows
    fixed = fixed.replace(/--+>/g, '-->');
    fixed = fixed.replace(/-\.+>/g, '-.->');

    return fixed;
  }

  /**
   * Estimate token count (simple approximation)
   */
  private estimateTokens(text: string): number {
    // Rough estimate: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
}

// Export singleton instance
export const mermaidBackend = new MermaidBackend();
export default mermaidBackend;
