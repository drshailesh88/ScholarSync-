/**
 * SVGBackend.ts
 * Direct SVG generation backend for custom diagrams
 *
 * Generates SVG code directly for diagrams that don't fit standard DSL patterns.
 * Good for custom scientific diagrams, anatomical illustrations, and unique layouts.
 */

import type {
  AIBackend,
  GenerationRequest,
  GenerationResult,
  ValidationResult,
  Logger,
  DiagramType,
} from '../types';
import { createLogger, AIServiceError } from '../types';

// =============================================================================
// SVG CONFIGURATION
// =============================================================================

/**
 * Default SVG dimensions and styling
 */
const DEFAULT_CONFIG = {
  width: 800,
  height: 600,
  padding: 40,
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    background: '#ffffff',
    stroke: '#374151',
    text: '#111827',
    textMuted: '#6b7280',
    gridLine: '#e5e7eb',
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    size: {
      title: 18,
      label: 14,
      small: 11,
    },
  },
  shapes: {
    nodeWidth: 150,
    nodeHeight: 60,
    nodeRadius: 8,
    arrowSize: 8,
    lineWidth: 2,
  },
};

/**
 * SVG element builder helpers
 */
const svg = {
  /**
   * Create an SVG document wrapper
   */
  document(
    content: string,
    options: { width?: number; height?: number; viewBox?: string } = {}
  ): string {
    const { width = DEFAULT_CONFIG.width, height = DEFAULT_CONFIG.height } = options;
    const viewBox = options.viewBox ?? `0 0 ${width} ${height}`;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="${viewBox}"
     stroke-linecap="round"
     stroke-linejoin="round">
  <defs>
    ${this.standardDefs()}
  </defs>
  ${content}
</svg>`;
  },

  /**
   * Standard SVG definitions (markers, patterns, gradients)
   */
  standardDefs(): string {
    return `
    <!-- Arrow marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${DEFAULT_CONFIG.colors.stroke}"/>
    </marker>
    <marker id="arrowhead-primary" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${DEFAULT_CONFIG.colors.primary}"/>
    </marker>

    <!-- Grid pattern -->
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${DEFAULT_CONFIG.colors.gridLine}" stroke-width="0.5"/>
    </pattern>

    <!-- Drop shadow filter -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>

    <!-- Glow effect -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`;
  },

  /**
   * Create a rectangle
   */
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    options: {
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
      rx?: number;
      ry?: number;
      className?: string;
      filter?: string;
    } = {}
  ): string {
    const {
      fill = DEFAULT_CONFIG.colors.background,
      stroke = DEFAULT_CONFIG.colors.stroke,
      strokeWidth = 1,
      rx = DEFAULT_CONFIG.shapes.nodeRadius,
      ry = rx,
      className,
      filter,
    } = options;

    const attrs = [
      `x="${x}"`,
      `y="${y}"`,
      `width="${width}"`,
      `height="${height}"`,
      `fill="${fill}"`,
      `stroke="${stroke}"`,
      `stroke-width="${strokeWidth}"`,
      `rx="${rx}"`,
      `ry="${ry}"`,
      className ? `class="${className}"` : '',
      filter ? `filter="url(#${filter})"` : '',
    ].filter(Boolean);

    return `<rect ${attrs.join(' ')}/>`;
  },

  /**
   * Create a circle
   */
  circle(
    cx: number,
    cy: number,
    r: number,
    options: { fill?: string; stroke?: string; strokeWidth?: number } = {}
  ): string {
    const {
      fill = DEFAULT_CONFIG.colors.primary,
      stroke = 'none',
      strokeWidth = 0,
    } = options;

    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
  },

  /**
   * Create a line
   */
  line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options: { stroke?: string; strokeWidth?: number; marker?: boolean; dashed?: boolean } = {}
  ): string {
    const {
      stroke = DEFAULT_CONFIG.colors.stroke,
      strokeWidth = DEFAULT_CONFIG.shapes.lineWidth,
      marker = false,
      dashed = false,
    } = options;

    const attrs = [
      `x1="${x1}"`,
      `y1="${y1}"`,
      `x2="${x2}"`,
      `y2="${y2}"`,
      `stroke="${stroke}"`,
      `stroke-width="${strokeWidth}"`,
      marker ? 'marker-end="url(#arrowhead)"' : '',
      dashed ? 'stroke-dasharray="5,5"' : '',
    ].filter(Boolean);

    return `<line ${attrs.join(' ')}/>`;
  },

  /**
   * Create a path
   */
  path(
    d: string,
    options: { fill?: string; stroke?: string; strokeWidth?: number; marker?: boolean } = {}
  ): string {
    const {
      fill = 'none',
      stroke = DEFAULT_CONFIG.colors.stroke,
      strokeWidth = DEFAULT_CONFIG.shapes.lineWidth,
      marker = false,
    } = options;

    return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${marker ? ' marker-end="url(#arrowhead)"' : ''}/>`;
  },

  /**
   * Create text
   */
  text(
    x: number,
    y: number,
    content: string,
    options: {
      anchor?: 'start' | 'middle' | 'end';
      fontSize?: number;
      fontWeight?: string;
      fill?: string;
      fontFamily?: string;
    } = {}
  ): string {
    const {
      anchor = 'middle',
      fontSize = DEFAULT_CONFIG.fonts.size.label,
      fontWeight = 'normal',
      fill = DEFAULT_CONFIG.colors.text,
      fontFamily = DEFAULT_CONFIG.fonts.primary,
    } = options;

    const escapedContent = this.escapeText(content);

    return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" font-family="${fontFamily}">${escapedContent}</text>`;
  },

  /**
   * Create multiline text
   */
  multilineText(
    x: number,
    y: number,
    lines: string[],
    options: {
      anchor?: 'start' | 'middle' | 'end';
      fontSize?: number;
      lineHeight?: number;
      fill?: string;
    } = {}
  ): string {
    const {
      anchor = 'middle',
      fontSize = DEFAULT_CONFIG.fonts.size.label,
      lineHeight = 1.2,
      fill = DEFAULT_CONFIG.colors.text,
    } = options;

    const tspans = lines
      .map(
        (line, i) =>
          `<tspan x="${x}" dy="${i === 0 ? 0 : fontSize * lineHeight}">${this.escapeText(line)}</tspan>`
      )
      .join('');

    return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fontSize}" fill="${fill}" font-family="${DEFAULT_CONFIG.fonts.primary}">${tspans}</text>`;
  },

  /**
   * Create a group
   */
  group(content: string, options: { transform?: string; id?: string; className?: string } = {}): string {
    const { transform, id, className } = options;

    const attrs = [
      id ? `id="${id}"` : '',
      className ? `class="${className}"` : '',
      transform ? `transform="${transform}"` : '',
    ].filter(Boolean);

    return `<g ${attrs.join(' ')}>${content}</g>`;
  },

  /**
   * Escape text for SVG
   */
  escapeText(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
};

// =============================================================================
// SVG BACKEND CLASS
// =============================================================================

/**
 * SVGBackend implements AIBackend for direct SVG generation
 */
export class SVGBackend implements AIBackend {
  readonly name = 'svg';
  private readonly logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('SVGBackend');
  }

  /**
   * Check if this backend can handle the given prompt
   */
  canHandle(prompt: string): boolean {
    const normalizedPrompt = prompt.toLowerCase();

    // Keywords that indicate direct SVG is appropriate
    const svgKeywords = [
      'custom diagram',
      'anatomical',
      'anatomy',
      'pathway',
      'signaling',
      'molecular',
      'cell',
      'cellular',
      'organ',
      'tissue',
      'icon',
      'logo',
      'simple shape',
      'geometric',
      'illustration',
    ];

    for (const keyword of svgKeywords) {
      if (normalizedPrompt.includes(keyword)) {
        return true;
      }
    }

    // Check if explicitly requesting SVG
    if (normalizedPrompt.includes('svg') || normalizedPrompt.includes('vector')) {
      return true;
    }

    // Check if it's already SVG
    if (prompt.trim().startsWith('<svg')) {
      return true;
    }

    return false;
  }

  /**
   * Generate a diagram from the request
   */
  async generate(request: GenerationRequest): Promise<GenerationResult> {
    const startTime = Date.now();

    this.logger.info('Generating SVG diagram', {
      prompt: request.prompt.substring(0, 100),
    });

    try {
      let generatedSvg: string;
      let diagramType: DiagramType = 'generic';

      // Check if it's already SVG
      if (request.prompt.trim().startsWith('<svg')) {
        generatedSvg = this.processExistingSvg(request.prompt);
      } else if (request.existingDiagram?.trim().startsWith('<svg')) {
        // Modification of existing SVG
        generatedSvg = await this.modifySvg(request.existingDiagram, request.prompt);
      } else {
        // Generate from prompt
        const result = this.generateFromPrompt(request.prompt);
        generatedSvg = result.svg;
        diagramType = result.type;
      }

      // Validate the SVG
      const validation = this.validateSvg(generatedSvg);
      if (!validation.valid) {
        throw new AIServiceError(
          `Invalid SVG: ${validation.error}`,
          'VALIDATION_FAILED'
        );
      }

      const generationTimeMs = Date.now() - startTime;

      const result: GenerationResult = {
        svg: generatedSvg,
        backend: this.name,
        metadata: {
          generatedAt: new Date(),
          promptTokens: this.estimateTokens(request.prompt),
          completionTokens: this.estimateTokens(generatedSvg),
          generationTimeMs,
          diagramType,
          confidence: 0.8,
        },
      };

      this.logger.info('SVG generated successfully', {
        generationTimeMs,
        svgLength: generatedSvg.length,
      });

      return result;
    } catch (error) {
      this.logger.error('SVG generation failed', error as Error);
      throw error instanceof AIServiceError
        ? error
        : new AIServiceError(
            `SVG generation failed: ${(error as Error).message}`,
            'GENERATION_FAILED'
          );
    }
  }

  /**
   * Validate SVG
   */
  async validate(content: string): Promise<ValidationResult> {
    return this.validateSvg(content);
  }

  /**
   * Synchronous SVG validation
   */
  private validateSvg(content: string): ValidationResult {
    const trimmed = content.trim();

    // Check basic structure
    if (!trimmed.startsWith('<?xml') && !trimmed.startsWith('<svg')) {
      return {
        valid: false,
        error: 'Content does not appear to be valid SVG',
      };
    }

    // Check for closing tag
    if (!trimmed.endsWith('</svg>')) {
      return {
        valid: false,
        error: 'SVG is missing closing </svg> tag',
      };
    }

    // Check for xmlns
    if (!trimmed.includes('xmlns')) {
      return {
        valid: false,
        error: 'SVG is missing xmlns attribute',
        suggestions: ['Add xmlns="http://www.w3.org/2000/svg" to the <svg> element'],
      };
    }

    // Basic well-formedness check
    const tagPattern = /<(\/?[\w:-]+)[^>]*>/g;
    const openTags: string[] = [];
    let match;

    while ((match = tagPattern.exec(trimmed)) !== null) {
      const tag = match[1];

      // Skip self-closing indicators and special tags
      if (match[0].endsWith('/>') || tag.startsWith('?') || tag.startsWith('!')) {
        continue;
      }

      if (tag.startsWith('/')) {
        const tagName = tag.slice(1);
        const lastOpen = openTags.pop();
        if (lastOpen !== tagName) {
          return {
            valid: false,
            error: `Mismatched tags: expected </${lastOpen}> but found </${tagName}>`,
          };
        }
      } else {
        // Skip void elements
        if (!['rect', 'circle', 'line', 'path', 'polygon', 'polyline', 'ellipse', 'use', 'image'].includes(tag)) {
          openTags.push(tag);
        }
      }
    }

    if (openTags.length > 0) {
      return {
        valid: false,
        error: `Unclosed tags: ${openTags.join(', ')}`,
      };
    }

    return { valid: true };
  }

  /**
   * Process existing SVG (add standard features)
   */
  private processExistingSvg(content: string): string {
    let processed = content;

    // Add XML declaration if missing
    if (!processed.startsWith('<?xml')) {
      processed = '<?xml version="1.0" encoding="UTF-8"?>\n' + processed;
    }

    // Add xmlns if missing
    if (!processed.includes('xmlns=')) {
      processed = processed.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    return processed;
  }

  /**
   * Modify existing SVG based on prompt
   */
  private async modifySvg(existingSvg: string, prompt: string): Promise<string> {
    const normalizedPrompt = prompt.toLowerCase();

    // Simple modification handlers
    if (/change\s+(the\s+)?color/i.test(normalizedPrompt)) {
      const colorMatch = prompt.match(
        /(red|blue|green|yellow|orange|purple|pink|gray|black|white|#[0-9a-fA-F]{6})/i
      );
      if (colorMatch) {
        return this.changeColors(existingSvg, colorMatch[1]);
      }
    }

    if (/make\s+(it\s+)?(bigger|larger)/i.test(normalizedPrompt)) {
      return this.scaleSvg(existingSvg, 1.5);
    }

    if (/make\s+(it\s+)?(smaller)/i.test(normalizedPrompt)) {
      return this.scaleSvg(existingSvg, 0.75);
    }

    // Return with comment about requested modification
    return existingSvg.replace(
      '</svg>',
      `<!-- Requested modification: ${prompt} -->\n</svg>`
    );
  }

  /**
   * Change colors in SVG
   */
  private changeColors(svgContent: string, newColor: string): string {
    // Replace fill colors (except white and transparent)
    let modified = svgContent.replace(
      /fill="(?!#fff|#ffffff|white|none|transparent)([^"]+)"/gi,
      `fill="${newColor}"`
    );

    // Replace stroke colors
    modified = modified.replace(
      /stroke="(?!none)([^"]+)"/gi,
      `stroke="${newColor}"`
    );

    return modified;
  }

  /**
   * Scale SVG dimensions
   */
  private scaleSvg(svgContent: string, scale: number): string {
    let modified = svgContent;

    // Scale width
    modified = modified.replace(/width="(\d+)"/, (_match, w) => {
      return `width="${Math.round(parseInt(w) * scale)}"`;
    });

    // Scale height
    modified = modified.replace(/height="(\d+)"/, (_match, h) => {
      return `height="${Math.round(parseInt(h) * scale)}"`;
    });

    return modified;
  }

  /**
   * Generate SVG from natural language prompt
   */
  private generateFromPrompt(prompt: string): { svg: string; type: DiagramType } {
    const normalizedPrompt = prompt.toLowerCase();

    // Pathway diagram
    if (
      normalizedPrompt.includes('pathway') ||
      normalizedPrompt.includes('signaling') ||
      normalizedPrompt.includes('cascade')
    ) {
      return {
        svg: this.generatePathwayDiagram(prompt),
        type: 'pathway',
      };
    }

    // Simple flowchart/process
    if (
      normalizedPrompt.includes('flow') ||
      normalizedPrompt.includes('process') ||
      normalizedPrompt.includes('step')
    ) {
      return {
        svg: this.generateSimpleFlow(prompt),
        type: 'flowchart',
      };
    }

    // Anatomical/body diagram placeholder
    if (
      normalizedPrompt.includes('anatomy') ||
      normalizedPrompt.includes('organ') ||
      normalizedPrompt.includes('body')
    ) {
      return {
        svg: this.generateAnatomicalPlaceholder(prompt),
        type: 'anatomical',
      };
    }

    // Cell diagram placeholder
    if (normalizedPrompt.includes('cell') || normalizedPrompt.includes('organelle')) {
      return {
        svg: this.generateCellPlaceholder(prompt),
        type: 'cell',
      };
    }

    // Default: simple labeled diagram
    return {
      svg: this.generateGenericDiagram(prompt),
      type: 'generic',
    };
  }

  /**
   * Generate a pathway diagram
   */
  private generatePathwayDiagram(prompt: string): string {
    const elements: string[] = [];

    // Background
    elements.push(
      svg.rect(0, 0, 800, 500, {
        fill: '#fafafa',
        stroke: 'none',
      })
    );

    // Title
    elements.push(
      svg.text(400, 40, 'Signaling Pathway', {
        fontSize: 20,
        fontWeight: 'bold',
      })
    );

    // Pathway nodes
    const nodes = [
      { id: 'receptor', label: 'Receptor', x: 400, y: 100, color: '#2563eb' },
      { id: 'signal', label: 'Signal', x: 400, y: 180, color: '#7c3aed' },
      { id: 'cascade', label: 'Cascade', x: 400, y: 260, color: '#059669' },
      { id: 'effector1', label: 'Effector 1', x: 280, y: 340, color: '#d97706' },
      { id: 'effector2', label: 'Effector 2', x: 520, y: 340, color: '#d97706' },
      { id: 'response', label: 'Response', x: 400, y: 420, color: '#dc2626' },
    ];

    // Draw connections
    elements.push(svg.line(400, 130, 400, 150, { marker: true, stroke: '#6b7280' }));
    elements.push(svg.line(400, 210, 400, 230, { marker: true, stroke: '#6b7280' }));
    elements.push(svg.line(370, 290, 310, 310, { marker: true, stroke: '#6b7280' }));
    elements.push(svg.line(430, 290, 490, 310, { marker: true, stroke: '#6b7280' }));
    elements.push(svg.line(310, 370, 370, 390, { marker: true, stroke: '#6b7280' }));
    elements.push(svg.line(490, 370, 430, 390, { marker: true, stroke: '#6b7280' }));

    // Draw nodes
    for (const node of nodes) {
      elements.push(
        svg.rect(node.x - 60, node.y - 20, 120, 40, {
          fill: node.color,
          stroke: 'none',
          rx: 20,
          filter: 'shadow',
        })
      );
      elements.push(
        svg.text(node.x, node.y + 5, node.label, {
          fill: '#ffffff',
          fontWeight: '600',
        })
      );
    }

    // Caption
    elements.push(
      svg.text(400, 480, `Generated from: ${prompt.substring(0, 60)}...`, {
        fontSize: 10,
        fill: '#9ca3af',
      })
    );

    return svg.document(elements.join('\n'), { width: 800, height: 500 });
  }

  /**
   * Generate a simple flow diagram
   */
  private generateSimpleFlow(prompt: string): string {
    const elements: string[] = [];

    // Background
    elements.push(svg.rect(0, 0, 600, 400, { fill: '#ffffff', stroke: 'none' }));

    // Title
    elements.push(
      svg.text(300, 35, 'Process Flow', {
        fontSize: 18,
        fontWeight: 'bold',
      })
    );

    // Extract potential steps from prompt
    const words = prompt.split(/\s+/);
    const steps = words
      .filter((w) => w.length > 3 && /^[A-Z]/.test(w))
      .slice(0, 5);

    const stepLabels =
      steps.length >= 3
        ? steps
        : ['Start', 'Process', 'Decision', 'Action', 'End'];

    const stepCount = Math.min(stepLabels.length, 5);
    const startY = 80;
    const stepHeight = 60;
    const stepWidth = 140;
    const centerX = 300;

    // Draw steps and connections
    for (let i = 0; i < stepCount; i++) {
      const y = startY + i * (stepHeight + 20);
      const isDecision = stepLabels[i].toLowerCase().includes('decision') || i === 2;

      if (isDecision) {
        // Diamond for decision
        const points = [
          `${centerX},${y}`,
          `${centerX + 50},${y + 30}`,
          `${centerX},${y + 60}`,
          `${centerX - 50},${y + 30}`,
        ].join(' ');
        elements.push(
          `<polygon points="${points}" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>`
        );
        elements.push(svg.text(centerX, y + 35, stepLabels[i], { fontSize: 12 }));
      } else {
        // Rectangle for process
        const fill = i === 0 || i === stepCount - 1 ? '#d1fae5' : '#dbeafe';
        const stroke = i === 0 || i === stepCount - 1 ? '#059669' : '#2563eb';
        elements.push(
          svg.rect(centerX - stepWidth / 2, y, stepWidth, stepHeight, {
            fill,
            stroke,
            strokeWidth: 2,
            rx: i === 0 || i === stepCount - 1 ? 30 : 8,
          })
        );
        elements.push(svg.text(centerX, y + stepHeight / 2 + 5, stepLabels[i]));
      }

      // Connection arrow
      if (i < stepCount - 1) {
        const arrowY = isDecision ? y + 60 : y + stepHeight;
        elements.push(svg.line(centerX, arrowY + 5, centerX, arrowY + 15, { marker: true }));
      }
    }

    return svg.document(elements.join('\n'), { width: 600, height: 400 });
  }

  /**
   * Generate anatomical diagram placeholder
   */
  private generateAnatomicalPlaceholder(prompt: string): string {
    const elements: string[] = [];

    // Background with grid
    elements.push(svg.rect(0, 0, 600, 500, { fill: 'url(#grid)', stroke: '#e5e7eb' }));

    // Placeholder body outline
    elements.push(
      `<ellipse cx="300" cy="100" rx="50" ry="60" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>`
    );
    elements.push(
      svg.rect(250, 150, 100, 150, { fill: '#fef3c7', stroke: '#d97706', rx: 10 })
    );
    elements.push(
      svg.rect(210, 160, 40, 100, { fill: '#dbeafe', stroke: '#2563eb', rx: 5 })
    );
    elements.push(
      svg.rect(350, 160, 40, 100, { fill: '#dbeafe', stroke: '#2563eb', rx: 5 })
    );
    elements.push(
      svg.rect(260, 300, 35, 120, { fill: '#d1fae5', stroke: '#059669', rx: 5 })
    );
    elements.push(
      svg.rect(305, 300, 35, 120, { fill: '#d1fae5', stroke: '#059669', rx: 5 })
    );

    // Labels
    elements.push(svg.text(300, 60, 'Anatomical Diagram', { fontSize: 18, fontWeight: 'bold' }));
    elements.push(
      svg.text(300, 460, 'Placeholder - Replace with specific anatomical illustration', {
        fontSize: 12,
        fill: '#6b7280',
      })
    );
    elements.push(
      svg.text(300, 480, `Request: ${prompt.substring(0, 50)}...`, {
        fontSize: 10,
        fill: '#9ca3af',
      })
    );

    return svg.document(elements.join('\n'), { width: 600, height: 500 });
  }

  /**
   * Generate cell diagram placeholder
   */
  private generateCellPlaceholder(prompt: string): string {
    const elements: string[] = [];

    // Background
    elements.push(svg.rect(0, 0, 500, 500, { fill: '#f8fafc', stroke: 'none' }));

    // Cell membrane
    elements.push(
      `<ellipse cx="250" cy="250" rx="200" ry="180" fill="#fef9c3" stroke="#ca8a04" stroke-width="4"/>`
    );

    // Nucleus
    elements.push(
      `<ellipse cx="250" cy="240" rx="70" ry="60" fill="#ddd6fe" stroke="#7c3aed" stroke-width="2"/>`
    );
    elements.push(svg.text(250, 245, 'Nucleus', { fontSize: 12, fill: '#4c1d95' }));

    // Organelles (simplified)
    // Mitochondria
    elements.push(
      `<ellipse cx="380" cy="200" rx="30" ry="15" fill="#fecaca" stroke="#dc2626" stroke-width="1.5"/>`
    );
    elements.push(svg.text(380, 205, 'Mito', { fontSize: 9, fill: '#7f1d1d' }));

    // ER
    elements.push(
      svg.path('M 120 300 Q 150 280 180 300 Q 210 320 240 300', {
        stroke: '#0284c7',
        fill: 'none',
        strokeWidth: 3,
      })
    );
    elements.push(svg.text(180, 340, 'ER', { fontSize: 10, fill: '#0c4a6e' }));

    // Golgi
    elements.push(
      `<ellipse cx="350" cy="320" rx="35" ry="10" fill="#a7f3d0" stroke="#059669" stroke-width="1.5"/>`
    );
    elements.push(
      `<ellipse cx="350" cy="335" rx="30" ry="8" fill="#a7f3d0" stroke="#059669" stroke-width="1.5"/>`
    );
    elements.push(svg.text(350, 365, 'Golgi', { fontSize: 10, fill: '#064e3b' }));

    // Ribosomes (dots)
    for (let i = 0; i < 8; i++) {
      const x = 150 + Math.random() * 200;
      const y = 150 + Math.random() * 200;
      elements.push(svg.circle(x, y, 4, { fill: '#374151' }));
    }

    // Title and caption
    elements.push(svg.text(250, 40, 'Cell Diagram', { fontSize: 18, fontWeight: 'bold' }));
    elements.push(
      svg.text(250, 470, `Request: ${prompt.substring(0, 40)}...`, {
        fontSize: 10,
        fill: '#9ca3af',
      })
    );

    return svg.document(elements.join('\n'), { width: 500, height: 500 });
  }

  /**
   * Generate a generic diagram
   */
  private generateGenericDiagram(prompt: string): string {
    const elements: string[] = [];

    elements.push(svg.rect(0, 0, 600, 400, { fill: '#ffffff', stroke: '#e5e7eb' }));

    elements.push(
      svg.text(300, 40, 'Custom Diagram', {
        fontSize: 20,
        fontWeight: 'bold',
      })
    );

    // Central element
    elements.push(
      svg.rect(200, 150, 200, 100, {
        fill: '#dbeafe',
        stroke: '#2563eb',
        strokeWidth: 2,
        filter: 'shadow',
      })
    );

    elements.push(
      svg.multilineText(300, 190, ['Your diagram content', 'goes here'], {
        fontSize: 14,
      })
    );

    // Surrounding elements
    const positions = [
      { x: 100, y: 100 },
      { x: 500, y: 100 },
      { x: 100, y: 300 },
      { x: 500, y: 300 },
    ];

    for (let i = 0; i < positions.length; i++) {
      elements.push(
        svg.circle(positions[i].x, positions[i].y, 30, {
          fill: '#f3f4f6',
          stroke: '#6b7280',
          strokeWidth: 2,
        })
      );
      elements.push(
        svg.text(positions[i].x, positions[i].y + 5, `${i + 1}`, {
          fontSize: 16,
          fontWeight: 'bold',
          fill: '#374151',
        })
      );

      // Connection to center
      const cx = 300 + (i % 2 === 0 ? -100 : 100);
      const cy = 200 + (i < 2 ? -50 : 50);
      elements.push(
        svg.line(positions[i].x, positions[i].y, cx, cy, {
          stroke: '#9ca3af',
          strokeWidth: 1,
          dashed: true,
        })
      );
    }

    elements.push(
      svg.text(300, 380, `Generated from: "${prompt.substring(0, 50)}..."`, {
        fontSize: 11,
        fill: '#9ca3af',
      })
    );

    return svg.document(elements.join('\n'), { width: 600, height: 400 });
  }

  /**
   * Estimate token count
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}

// Export singleton instance
export const svgBackend = new SVGBackend();
export default svgBackend;
