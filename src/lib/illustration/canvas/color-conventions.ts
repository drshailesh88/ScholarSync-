/**
 * ColorConventionManager
 *
 * Maps biological terms to standard scientific colors following
 * conventions used in biomedical illustration (BioRender-style).
 *
 * @module lib/illustration/canvas/color-conventions
 */

// ============================================================================
// Color Convention Mappings
// ============================================================================

export interface ColorConvention {
  term: string;
  aliases: string[];
  color: string;
  category: string;
}

export const COLOR_CONVENTIONS: ColorConvention[] = [
  // Cardiovascular
  { term: 'artery', aliases: ['arteries', 'arterial', 'oxygenated', 'oxygenated blood'], color: '#E74C3C', category: 'cardiovascular' },
  { term: 'vein', aliases: ['veins', 'venous', 'deoxygenated', 'deoxygenated blood'], color: '#3498DB', category: 'cardiovascular' },

  // Nervous system
  { term: 'nerve', aliases: ['nerves', 'neural', 'neuron', 'neurons', 'axon', 'axons'], color: '#F39C12', category: 'nervous' },

  // Musculoskeletal
  { term: 'muscle', aliases: ['muscles', 'muscular', 'skeletal muscle', 'myocyte'], color: '#C0392B', category: 'musculoskeletal' },
  { term: 'bone', aliases: ['bones', 'skeletal', 'osseous', 'periosteum'], color: '#ECF0F1', category: 'musculoskeletal' },

  // Molecular biology
  { term: 'dna', aliases: ['deoxyribonucleic acid', 'double helix', 'chromosome', 'chromosomes'], color: '#2980B9', category: 'molecular' },
  { term: 'rna', aliases: ['ribonucleic acid', 'mrna', 'trna', 'rrna', 'messenger rna'], color: '#27AE60', category: 'molecular' },

  // Cell biology
  { term: 'cell membrane', aliases: ['plasma membrane', 'phospholipid bilayer', 'membrane'], color: '#E67E22', category: 'cellular' },
];

// ============================================================================
// ColorConventionManager
// ============================================================================

export class ColorConventionManager {
  private conventions: ColorConvention[];
  private termIndex: Map<string, ColorConvention>;

  constructor(conventions: ColorConvention[] = COLOR_CONVENTIONS) {
    this.conventions = conventions;
    this.termIndex = new Map();
    this.buildIndex();
  }

  private buildIndex(): void {
    for (const conv of this.conventions) {
      this.termIndex.set(conv.term.toLowerCase(), conv);
      for (const alias of conv.aliases) {
        this.termIndex.set(alias.toLowerCase(), conv);
      }
    }
  }

  /**
   * Get the standard color for a biological term.
   * Returns null if no convention is found.
   */
  getColor(term: string): string | null {
    const convention = this.termIndex.get(term.toLowerCase().trim());
    return convention?.color ?? null;
  }

  /**
   * Get the full convention entry for a term.
   */
  getConvention(term: string): ColorConvention | null {
    return this.termIndex.get(term.toLowerCase().trim()) ?? null;
  }

  /**
   * Detect biological terms in a text string and return matching conventions.
   */
  detectTerms(text: string): Array<{ term: string; convention: ColorConvention; index: number }> {
    const lowerText = text.toLowerCase();
    const matches: Array<{ term: string; convention: ColorConvention; index: number }> = [];
    const seen = new Set<string>();

    // Sort keys by length (longest first) to match multi-word terms first
    const sortedKeys = Array.from(this.termIndex.keys()).sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
      const idx = lowerText.indexOf(key);
      if (idx !== -1) {
        const convention = this.termIndex.get(key)!;
        // Avoid duplicate conventions for the same underlying term
        if (!seen.has(convention.term)) {
          seen.add(convention.term);
          matches.push({ term: key, convention, index: idx });
        }
      }
    }

    return matches.sort((a, b) => a.index - b.index);
  }

  /**
   * Apply conventions to canvas objects that have text labels containing biological terms.
   * Returns the list of objects that were modified.
   */
  applyToCanvasObjects(objects: CanvasObjectLike[]): ApplyResult[] {
    const results: ApplyResult[] = [];

    for (const obj of objects) {
      const text = obj.text ?? obj.name ?? '';
      if (!text) continue;

      const detections = this.detectTerms(text);
      if (detections.length > 0) {
        // Use the first match's color
        const { convention } = detections[0];
        results.push({
          objectId: obj.id,
          term: convention.term,
          appliedColor: convention.color,
          previousColor: obj.fill ?? null,
        });
      }
    }

    return results;
  }

  /**
   * Get all registered conventions.
   */
  getAllConventions(): ColorConvention[] {
    return [...this.conventions];
  }

  /**
   * Get conventions by category.
   */
  getByCategory(category: string): ColorConvention[] {
    return this.conventions.filter(c => c.category === category);
  }
}

// ============================================================================
// Canvas Object Types (minimal interface for convention application)
// ============================================================================

export interface CanvasObjectLike {
  id?: string;
  text?: string;
  name?: string;
  fill?: string;
}

export interface ApplyResult {
  objectId?: string;
  term: string;
  appliedColor: string;
  previousColor: string | null;
}

// ============================================================================
// Accessibility: Color-blind simulation
// ============================================================================

/**
 * Color vision deficiency simulation matrices.
 * These approximate how colors appear to people with different types of color blindness.
 * Based on Machado et al. (2009) simulation model.
 */
export type ColorBlindType = 'deuteranopia' | 'protanopia' | 'tritanopia';

export interface ColorBlindMatrix {
  type: ColorBlindType;
  label: string;
  matrix: number[];
}

export const COLOR_BLIND_MATRICES: Record<ColorBlindType, ColorBlindMatrix> = {
  deuteranopia: {
    type: 'deuteranopia',
    label: 'Deuteranopia (green-blind)',
    matrix: [
      0.625, 0.375, 0, 0, 0,
      0.7,   0.3,   0, 0, 0,
      0,     0.3,   0.7, 0, 0,
      0,     0,     0, 1, 0,
    ],
  },
  protanopia: {
    type: 'protanopia',
    label: 'Protanopia (red-blind)',
    matrix: [
      0.567, 0.433, 0,   0, 0,
      0.558, 0.442, 0,   0, 0,
      0,     0.242, 0.758, 0, 0,
      0,     0,     0,   1, 0,
    ],
  },
  tritanopia: {
    type: 'tritanopia',
    label: 'Tritanopia (blue-blind)',
    matrix: [
      0.95, 0.05,  0,     0, 0,
      0,    0.433, 0.567, 0, 0,
      0,    0.475, 0.525, 0, 0,
      0,    0,     0,     1, 0,
    ],
  },
};

/**
 * Parse a hex color string to RGB values.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

/**
 * Convert RGB values to hex string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b].map(v => clamp(v).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Simulate how a color appears under a specific color vision deficiency.
 */
export function simulateColorBlind(hex: string, type: ColorBlindType): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const m = COLOR_BLIND_MATRICES[type].matrix;
  const r = rgb.r * m[0] + rgb.g * m[1] + rgb.b * m[2];
  const g = rgb.r * m[5] + rgb.g * m[6] + rgb.b * m[7];
  const b = rgb.r * m[10] + rgb.g * m[11] + rgb.b * m[12];

  return rgbToHex(r, g, b);
}

/**
 * Check if a set of colors is distinguishable (simple heuristic).
 * Returns warnings if colors are too similar after simulation.
 */
export function checkColorDistinguishability(
  colors: string[],
  type: ColorBlindType
): { distinguishable: boolean; warnings: string[] } {
  const warnings: string[] = [];
  const simulated = colors.map(c => ({ original: c, simulated: simulateColorBlind(c, type) }));

  for (let i = 0; i < simulated.length; i++) {
    for (let j = i + 1; j < simulated.length; j++) {
      const rgbA = hexToRgb(simulated[i].simulated);
      const rgbB = hexToRgb(simulated[j].simulated);
      if (!rgbA || !rgbB) continue;

      // Simple Euclidean distance in RGB space
      const dist = Math.sqrt(
        (rgbA.r - rgbB.r) ** 2 +
        (rgbA.g - rgbB.g) ** 2 +
        (rgbA.b - rgbB.b) ** 2
      );

      if (dist < 30) {
        warnings.push(
          `Colors ${simulated[i].original} and ${simulated[j].original} may be indistinguishable for ${COLOR_BLIND_MATRICES[type].label}`
        );
      }
    }
  }

  return { distinguishable: warnings.length === 0, warnings };
}

// ============================================================================
// Figure Label Utilities
// ============================================================================

export type FigureLabelStyle = 'fig-dot' | 'figure-space' | 'letter-paren' | 'letter-plain';

export interface FigureLabelOptions {
  style: FigureLabelStyle;
  number: number;
  panel?: string; // e.g., 'A', 'B', 'C'
}

/**
 * Generate a formatted figure label string.
 */
export function formatFigureLabel(options: FigureLabelOptions): string {
  const { style, number, panel } = options;
  const suffix = panel ? panel : '';

  switch (style) {
    case 'fig-dot':
      return `Fig. ${number}${suffix}`;
    case 'figure-space':
      return `Figure ${number}${suffix}`;
    case 'letter-paren':
      return `(${suffix.toLowerCase() || String.fromCharCode(96 + number)})`;
    case 'letter-plain':
      return suffix || String.fromCharCode(64 + number);
    default:
      return `Fig. ${number}${suffix}`;
  }
}

/**
 * Create a scale bar descriptor (line + label).
 */
export interface ScaleBarOptions {
  lengthValue: number;
  unit: string;
  barWidthPx: number;
  barHeightPx?: number;
}

export interface ScaleBarDescriptor {
  label: string;
  widthPx: number;
  heightPx: number;
}

export function createScaleBar(options: ScaleBarOptions): ScaleBarDescriptor {
  return {
    label: `${options.lengthValue} ${options.unit}`,
    widthPx: options.barWidthPx,
    heightPx: options.barHeightPx ?? 4,
  };
}

// Default singleton instance
export const colorConventionManager = new ColorConventionManager();
