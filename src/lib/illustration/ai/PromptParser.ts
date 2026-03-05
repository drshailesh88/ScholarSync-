/**
 * PromptParser.ts
 * Natural language prompt parsing for diagram generation
 *
 * Analyzes user prompts to detect:
 * - Diagram type (flowchart, chart, pathway, etc.)
 * - Domain (medicine, biology, etc.)
 * - Specific template matches (CONSORT, PRISMA, etc.)
 * - Modification intent (if refining existing diagram)
 */

import type {
  ParsedPrompt,
  DiagramType,
  DiagramDomain,
  ExtractedEntities,
  AlternativeInterpretation,
  Logger,
} from './types';
import { createLogger } from './types';

// =============================================================================
// KEYWORD DEFINITIONS
// =============================================================================

/**
 * Keywords for detecting diagram types
 */
const DIAGRAM_TYPE_KEYWORDS: Record<DiagramType, { keywords: string[]; weight: number }> = {
  flowchart: {
    keywords: ['flowchart', 'flow chart', 'flow diagram', 'process flow', 'workflow', 'pipeline', 'process diagram'],
    weight: 0.8,
  },
  consort: {
    keywords: ['consort', 'randomized trial', 'rct flow', 'trial flow', 'participant flow', 'enrollment flow', 'clinical trial diagram'],
    weight: 0.95,
  },
  prisma: {
    keywords: ['prisma', 'systematic review', 'literature review', 'screening flow', 'study selection', 'meta-analysis flow', 'prisma 2020'],
    weight: 0.95,
  },
  'decision-tree': {
    keywords: ['decision tree', 'decision diagram', 'algorithm', 'clinical algorithm', 'diagnostic algorithm', 'treatment algorithm', 'branching logic'],
    weight: 0.9,
  },
  'state-diagram': {
    keywords: ['state diagram', 'state machine', 'state transition', 'disease states', 'markov', 'health states', 'status flow'],
    weight: 0.85,
  },
  sequence: {
    keywords: ['sequence diagram', 'patient journey', 'timeline', 'care pathway', 'treatment sequence', 'interaction diagram', 'message flow'],
    weight: 0.85,
  },
  'study-design': {
    keywords: ['study design', 'methodology', 'research design', 'protocol flow', 'methods diagram', 'study protocol'],
    weight: 0.8,
  },
  'forest-plot': {
    keywords: ['forest plot', 'meta-analysis', 'effect size', 'odds ratio', 'risk ratio', 'hazard ratio', 'pooled effect'],
    weight: 0.95,
  },
  'scatter-plot': {
    keywords: ['scatter plot', 'scatter diagram', 'correlation', 'regression plot', 'xy plot', 'correlation plot'],
    weight: 0.85,
  },
  'bar-chart': {
    keywords: ['bar chart', 'bar graph', 'histogram', 'frequency', 'distribution chart', 'column chart'],
    weight: 0.8,
  },
  'box-plot': {
    keywords: ['box plot', 'boxplot', 'box and whisker', 'quartile', 'median comparison', 'distribution comparison'],
    weight: 0.9,
  },
  'kaplan-meier': {
    keywords: ['kaplan meier', 'survival curve', 'survival analysis', 'time to event', 'km curve', 'survival plot'],
    weight: 0.95,
  },
  'roc-curve': {
    keywords: ['roc curve', 'receiver operating', 'auc', 'sensitivity specificity', 'diagnostic accuracy'],
    weight: 0.95,
  },
  'funnel-plot': {
    keywords: ['funnel plot', 'publication bias', 'egger', 'begg', 'asymmetry plot'],
    weight: 0.95,
  },
  pathway: {
    keywords: ['pathway', 'signaling pathway', 'metabolic pathway', 'biochemical pathway', 'cascade', 'signal transduction'],
    weight: 0.85,
  },
  anatomical: {
    keywords: ['anatomy', 'anatomical', 'body diagram', 'organ', 'tissue diagram', 'physiological'],
    weight: 0.8,
  },
  molecular: {
    keywords: ['molecular', 'chemical structure', 'compound', 'molecule', 'molecular structure'],
    weight: 0.85,
  },
  cell: {
    keywords: ['cell diagram', 'cellular', 'organelle', 'membrane', 'cytoplasm', 'cell structure'],
    weight: 0.85,
  },
  generic: {
    keywords: ['diagram', 'chart', 'illustration', 'figure', 'visual'],
    weight: 0.3,
  },
};

/**
 * Keywords for detecting domains
 */
const DOMAIN_KEYWORDS: Record<DiagramDomain, string[]> = {
  medicine: [
    'clinical', 'patient', 'treatment', 'diagnosis', 'therapy', 'medical', 'hospital',
    'disease', 'symptoms', 'drug', 'medication', 'surgery', 'healthcare', 'physician',
    'nurse', 'consort', 'trial', 'randomized', 'placebo', 'intervention', 'control group',
  ],
  biology: [
    'cell', 'organism', 'species', 'gene', 'protein', 'dna', 'rna', 'enzyme',
    'biological', 'evolution', 'ecology', 'genetics', 'molecular', 'tissue',
    'membrane', 'organelle', 'metabolism', 'photosynthesis', 'respiration',
  ],
  chemistry: [
    'reaction', 'compound', 'element', 'bond', 'molecule', 'atom', 'chemical',
    'synthesis', 'catalyst', 'equilibrium', 'oxidation', 'reduction', 'acid', 'base',
  ],
  physics: [
    'force', 'energy', 'momentum', 'velocity', 'acceleration', 'wave', 'particle',
    'quantum', 'relativity', 'electromagnetic', 'thermodynamic', 'optics',
  ],
  engineering: [
    'system', 'component', 'design', 'architecture', 'circuit', 'mechanical',
    'electrical', 'structural', 'process', 'manufacturing', 'control system',
  ],
  'computer-science': [
    'algorithm', 'data structure', 'software', 'code', 'program', 'database',
    'network', 'api', 'class', 'object', 'function', 'module', 'interface',
  ],
  statistics: [
    'data', 'analysis', 'regression', 'correlation', 'distribution', 'sample',
    'population', 'hypothesis', 'p-value', 'confidence', 'variance', 'mean',
    'median', 'standard deviation', 'statistical', 'probability',
  ],
  general: [],
};

/**
 * Keywords for detecting modification intent
 */
const MODIFICATION_KEYWORDS = [
  'modify', 'change', 'update', 'edit', 'revise', 'alter', 'adjust',
  'add', 'remove', 'delete', 'insert', 'replace', 'swap',
  'make it', 'can you', 'please', 'now', 'instead', 'also',
  'more', 'less', 'bigger', 'smaller', 'different',
  'fix', 'correct', 'improve', 'enhance', 'refine',
];

/**
 * Template patterns for specific scientific diagrams
 */
const TEMPLATE_PATTERNS: Record<string, RegExp[]> = {
  consort: [
    /consort/i,
    /randomized\s+(?:controlled\s+)?trial/i,
    /rct\s+flow/i,
    /participant\s+flow/i,
    /enrollment.*allocation.*follow.?up.*analysis/i,
  ],
  prisma: [
    /prisma/i,
    /systematic\s+review/i,
    /identification.*screening.*eligibility.*included/i,
    /literature\s+(?:search|review)/i,
  ],
  'forest-plot': [
    /forest\s+plot/i,
    /meta.?analysis.*(?:effect|result)/i,
    /pooled\s+(?:effect|estimate)/i,
  ],
  'kaplan-meier': [
    /kaplan.?meier/i,
    /survival\s+(?:curve|analysis|plot)/i,
    /time.?to.?event/i,
  ],
  strobe: [
    /strobe/i,
    /observational\s+study/i,
    /cohort\s+(?:study|diagram)/i,
  ],
};

// =============================================================================
// PROMPT PARSER CLASS
// =============================================================================

/**
 * PromptParser analyzes natural language prompts to extract diagram intent
 */
export class PromptParser {
  private readonly logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('PromptParser');
  }

  /**
   * Parse a user prompt to extract diagram generation parameters
   * @param prompt - The user's natural language prompt
   * @param context - Optional context from previous conversation
   * @returns Parsed prompt information
   */
  parse(prompt: string, context?: string): ParsedPrompt {
    const normalizedPrompt = this.normalizePrompt(prompt);
    const normalizedContext = context ? this.normalizePrompt(context) : undefined;

    this.logger.debug('Parsing prompt', { prompt: normalizedPrompt });

    // Detect diagram type
    const typeResult = this.detectDiagramType(normalizedPrompt, normalizedContext);

    // Detect domain
    const domain = this.detectDomain(normalizedPrompt);

    // Check for template match
    const template = this.detectTemplate(normalizedPrompt);

    // Check for modification intent
    const isModification = this.detectModificationIntent(normalizedPrompt, !!context);

    // Extract entities
    const entities = this.extractEntities(normalizedPrompt);

    // Build alternatives
    const alternatives = this.buildAlternatives(typeResult.allMatches);

    const result: ParsedPrompt = {
      diagramType: typeResult.type,
      domain,
      confidence: typeResult.confidence,
      matchedKeywords: typeResult.matchedKeywords,
      isModification,
      template: template ?? undefined,
      entities,
      alternatives,
    };

    this.logger.info('Prompt parsed', {
      type: result.diagramType,
      domain: result.domain,
      confidence: result.confidence,
      isModification: result.isModification,
    });

    return result;
  }

  /**
   * Normalize prompt for consistent processing
   */
  private normalizePrompt(prompt: string): string {
    return prompt
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/['']/g, "'")
      .replace(/[""]/g, '"');
  }

  /**
   * Detect the diagram type from the prompt
   */
  private detectDiagramType(
    prompt: string,
    context?: string
  ): {
    type: DiagramType;
    confidence: number;
    matchedKeywords: string[];
    allMatches: Array<{ type: DiagramType; score: number; keywords: string[] }>;
  } {
    const allMatches: Array<{ type: DiagramType; score: number; keywords: string[] }> = [];
    const textToSearch = context ? `${context} ${prompt}` : prompt;

    for (const [type, config] of Object.entries(DIAGRAM_TYPE_KEYWORDS)) {
      const matchedKeywords: string[] = [];
      let score = 0;

      for (const keyword of config.keywords) {
        if (textToSearch.includes(keyword.toLowerCase())) {
          matchedKeywords.push(keyword);
          // Exact phrase match gets higher score
          if (textToSearch === keyword.toLowerCase()) {
            score += 2;
          } else {
            score += 1;
          }
        }
      }

      if (score > 0) {
        const confidence = Math.min(
          (score / config.keywords.length) * config.weight,
          1.0
        );
        allMatches.push({
          type: type as DiagramType,
          score: confidence,
          keywords: matchedKeywords,
        });
      }
    }

    // Sort by score descending
    allMatches.sort((a, b) => b.score - a.score);

    if (allMatches.length === 0) {
      return {
        type: 'generic',
        confidence: 0.3,
        matchedKeywords: [],
        allMatches: [],
      };
    }

    const best = allMatches[0];
    return {
      type: best.type,
      confidence: best.score,
      matchedKeywords: best.keywords,
      allMatches,
    };
  }

  /**
   * Detect the domain from the prompt
   */
  private detectDomain(prompt: string): DiagramDomain {
    const scores: Record<DiagramDomain, number> = {
      medicine: 0,
      biology: 0,
      chemistry: 0,
      physics: 0,
      engineering: 0,
      'computer-science': 0,
      statistics: 0,
      general: 0,
    };

    for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
      for (const keyword of keywords) {
        if (prompt.includes(keyword.toLowerCase())) {
          scores[domain as DiagramDomain]++;
        }
      }
    }

    const maxDomain = Object.entries(scores).reduce(
      (max, [domain, score]) => (score > max.score ? { domain: domain as DiagramDomain, score } : max),
      { domain: 'general' as DiagramDomain, score: 0 }
    );

    return maxDomain.score > 0 ? maxDomain.domain : 'general';
  }

  /**
   * Detect if this is a known template type
   */
  private detectTemplate(prompt: string): string | null {
    for (const [template, patterns] of Object.entries(TEMPLATE_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(prompt)) {
          return template;
        }
      }
    }
    return null;
  }

  /**
   * Detect if the prompt is requesting modifications to an existing diagram
   */
  private detectModificationIntent(prompt: string, hasContext: boolean): boolean {
    // If there's context, more likely to be a modification
    if (hasContext) {
      for (const keyword of MODIFICATION_KEYWORDS) {
        if (prompt.includes(keyword)) {
          return true;
        }
      }
    }

    // Strong modification indicators even without context
    const strongModificationPatterns = [
      /^(modify|change|update|edit|add|remove|delete)/i,
      /^(can you|please|could you)\s+(modify|change|update|add|remove)/i,
      /make\s+it\s+(bigger|smaller|different|more|less)/i,
      /change\s+the\s+\w+\s+to/i,
      /add\s+(a|an|the)\s+\w+/i,
      /remove\s+(a|an|the)\s+\w+/i,
    ];

    for (const pattern of strongModificationPatterns) {
      if (pattern.test(prompt)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Extract entities from the prompt
   */
  private extractEntities(prompt: string): ExtractedEntities {
    const entities: ExtractedEntities = {};

    // Extract potential node labels (capitalized words/phrases)
    const nodePattern = /(?:^|[.!?]\s*)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
    const nodes: string[] = [];
    let match;
    while ((match = nodePattern.exec(prompt)) !== null) {
      const node = match[1];
      if (!['The', 'A', 'An', 'And', 'Or', 'But', 'For', 'With', 'From'].includes(node)) {
        nodes.push(node);
      }
    }
    if (nodes.length > 0) {
      entities.nodes = nodes;
    }

    // Extract numbers
    const numberPattern = /\b(\d+(?:\.\d+)?)\b/g;
    const numbers: number[] = [];
    while ((match = numberPattern.exec(prompt)) !== null) {
      numbers.push(parseFloat(match[1]));
    }
    if (numbers.length > 0) {
      entities.numbers = numbers;
    }

    // Extract connection descriptions
    const connectionPatterns = [
      /(\w+)\s+(?:leads?\s+to|connects?\s+to|flows?\s+to|goes?\s+to|links?\s+to)\s+(\w+)/gi,
      /from\s+(\w+)\s+to\s+(\w+)/gi,
      /(\w+)\s*(?:->|-->|=>)\s*(\w+)/g,
    ];

    const connections: string[] = [];
    for (const pattern of connectionPatterns) {
      while ((match = pattern.exec(prompt)) !== null) {
        connections.push(`${match[1]} -> ${match[2]}`);
      }
    }
    if (connections.length > 0) {
      entities.connections = connections;
    }

    // Extract quoted named entities
    const quotedPattern = /["']([^"']+)["']/g;
    const namedEntities: string[] = [];
    while ((match = quotedPattern.exec(prompt)) !== null) {
      namedEntities.push(match[1]);
    }
    if (namedEntities.length > 0) {
      entities.namedEntities = namedEntities;
    }

    return entities;
  }

  /**
   * Build alternative interpretations from match results
   */
  private buildAlternatives(
    allMatches: Array<{ type: DiagramType; score: number; keywords: string[] }>
  ): AlternativeInterpretation[] {
    return allMatches.slice(1, 4).map((match) => ({
      diagramType: match.type,
      confidence: match.score,
      backend: this.getBackendForType(match.type),
    }));
  }

  /**
   * Get the appropriate backend for a diagram type
   */
  private getBackendForType(type: DiagramType): string {
    const mermaidTypes: DiagramType[] = [
      'flowchart', 'consort', 'prisma', 'decision-tree', 'state-diagram',
      'sequence', 'study-design', 'generic',
    ];

    const plotlyTypes: DiagramType[] = [
      'forest-plot', 'scatter-plot', 'bar-chart', 'box-plot',
      'kaplan-meier', 'roc-curve', 'funnel-plot',
    ];

    const svgTypes: DiagramType[] = [
      'pathway', 'anatomical', 'molecular', 'cell',
    ];

    if (mermaidTypes.includes(type)) {
      return 'mermaid';
    }
    if (plotlyTypes.includes(type)) {
      return 'plotly';
    }
    if (svgTypes.includes(type)) {
      return 'svg';
    }

    return 'mermaid'; // Default
  }

  /**
   * Suggest the best backend for the parsed prompt
   */
  suggestBackend(parsed: ParsedPrompt): 'mermaid' | 'svg' | 'plotly' | 'tikz' {
    return this.getBackendForType(parsed.diagramType) as 'mermaid' | 'svg' | 'plotly' | 'tikz';
  }

  /**
   * Check if the prompt explicitly requests a specific format
   */
  detectExplicitFormat(prompt: string): 'mermaid' | 'svg' | 'plotly' | 'tikz' | null {
    const normalizedPrompt = prompt.toLowerCase();

    if (normalizedPrompt.includes('mermaid')) {
      return 'mermaid';
    }
    if (normalizedPrompt.includes('svg') || normalizedPrompt.includes('vector')) {
      return 'svg';
    }
    if (normalizedPrompt.includes('plotly') || normalizedPrompt.includes('interactive chart')) {
      return 'plotly';
    }
    if (normalizedPrompt.includes('tikz') || normalizedPrompt.includes('latex')) {
      return 'tikz';
    }

    return null;
  }
}

// Export singleton instance
export const promptParser = new PromptParser();
export default promptParser;
