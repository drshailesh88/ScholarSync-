/**
 * Journal Preset Styles
 *
 * Publication-specific formatting presets for major scientific journals.
 * Each preset defines constraints for figure dimensions, fonts, and styling.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface JournalPreset {
  /** Journal identifier */
  id: string;
  /** Display name */
  name: string;
  /** Maximum figure width in mm (single column) */
  maxWidthMm: number;
  /** Maximum figure width in mm (double column, if applicable) */
  maxWidthDoubleMm?: number;
  /** Preferred font family */
  fontFamily?: string;
  /** Minimum font size in pt */
  minFontSizePt?: number;
  /** Maximum font size in pt for labels */
  maxFontSizePt?: number;
  /** Whether to prefer grayscale-friendly colors */
  grayscaleFriendly?: boolean;
  /** Recommended color palette */
  colorPalette?: string[];
  /** Line weight guidelines */
  lineWeightPt?: number;
  /** DPI for raster export */
  exportDpi?: number;
  /** Additional notes for the user */
  notes?: string;
}

// =============================================================================
// JOURNAL PRESETS
// =============================================================================

export const JOURNAL_PRESETS: Record<string, JournalPreset> = {
  nature: {
    id: 'nature',
    name: 'Nature',
    maxWidthMm: 89,
    maxWidthDoubleMm: 183,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 5,
    maxFontSizePt: 7,
    grayscaleFriendly: false,
    colorPalette: [
      '#E64B35', // red
      '#4DBBD5', // cyan
      '#00A087', // teal
      '#3C5488', // blue
      '#F39B7F', // salmon
      '#8491B4', // slate
      '#91D1C2', // mint
      '#DC9A6C', // tan
    ],
    lineWeightPt: 0.5,
    exportDpi: 300,
    notes: 'Single column: 89mm. Double column: 183mm. Min 5pt font. 300 DPI minimum.',
  },

  nejm: {
    id: 'nejm',
    name: 'New England Journal of Medicine',
    maxWidthMm: 86,
    maxWidthDoubleMm: 178,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 6,
    maxFontSizePt: 12,
    grayscaleFriendly: true,
    colorPalette: [
      '#BC3C29', // red
      '#0072B5', // blue
      '#E18727', // orange
      '#20854E', // green
      '#7876B1', // purple
      '#6F99AD', // steel
      '#FFDC91', // gold
      '#EE4C97', // pink
    ],
    lineWeightPt: 0.5,
    exportDpi: 300,
    notes: 'Grayscale-friendly recommended. Single column: 86mm. Annotations in Arial.',
  },

  jama: {
    id: 'jama',
    name: 'JAMA',
    maxWidthMm: 86,
    maxWidthDoubleMm: 178,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 6,
    maxFontSizePt: 10,
    grayscaleFriendly: true,
    colorPalette: [
      '#374E55', // dark teal
      '#DF8F44', // orange
      '#00A1D5', // blue
      '#B24745', // red
      '#79AF97', // sage
      '#6A6599', // purple
      '#80796B', // taupe
    ],
    lineWeightPt: 0.5,
    exportDpi: 300,
    notes: 'JAMA requires high-contrast figures. Grayscale-friendly preferred.',
  },

  cell: {
    id: 'cell',
    name: 'Cell',
    maxWidthMm: 85,
    maxWidthDoubleMm: 178,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 6,
    maxFontSizePt: 8,
    grayscaleFriendly: false,
    colorPalette: [
      '#3B4992', // blue
      '#EE0000', // red
      '#008B45', // green
      '#631879', // purple
      '#008280', // teal
      '#BB0021', // crimson
      '#5F559B', // indigo
      '#A20056', // magenta
    ],
    lineWeightPt: 0.75,
    exportDpi: 300,
    notes: 'Cell allows wide figures up to 178mm. Color is encouraged.',
  },

  science: {
    id: 'science',
    name: 'Science',
    maxWidthMm: 90,
    maxWidthDoubleMm: 180,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 6,
    maxFontSizePt: 8,
    grayscaleFriendly: false,
    colorPalette: [
      '#3B4992', // blue
      '#EE0000', // red
      '#008B45', // green
      '#631879', // purple
      '#008280', // teal
      '#BB0021', // crimson
      '#5F559B', // indigo
    ],
    lineWeightPt: 0.5,
    exportDpi: 300,
    notes: 'Single column: 90mm. Double column: 180mm. Vector preferred.',
  },

  lancet: {
    id: 'lancet',
    name: 'The Lancet',
    maxWidthMm: 89,
    maxWidthDoubleMm: 183,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 6,
    maxFontSizePt: 10,
    grayscaleFriendly: true,
    colorPalette: [
      '#00468B', // blue
      '#ED0000', // red
      '#42B540', // green
      '#0099B4', // teal
      '#925E9F', // purple
      '#FDAF91', // peach
      '#AD002A', // crimson
      '#ADB6B6', // gray
    ],
    lineWeightPt: 0.5,
    exportDpi: 300,
    notes: 'Single column: 89mm. Lancet prefers clean, high-contrast figures.',
  },

  plos: {
    id: 'plos',
    name: 'PLOS ONE',
    maxWidthMm: 83,
    maxWidthDoubleMm: 173,
    fontFamily: 'Arial, Helvetica, sans-serif',
    minFontSizePt: 8,
    maxFontSizePt: 12,
    grayscaleFriendly: false,
    colorPalette: [
      '#0073C2', // blue
      '#EFC000', // gold
      '#868686', // gray
      '#CD534C', // red
      '#7AA6DC', // light blue
      '#003C67', // dark blue
    ],
    lineWeightPt: 0.75,
    exportDpi: 300,
    notes: 'PLOS ONE requires 300 DPI minimum. Single column: 83mm.',
  },
};

/**
 * Get a journal preset by ID
 */
export function getJournalPreset(id: string): JournalPreset | undefined {
  return JOURNAL_PRESETS[id.toLowerCase()];
}

/**
 * Get all available journal preset IDs
 */
export function getAvailablePresets(): string[] {
  return Object.keys(JOURNAL_PRESETS);
}

/**
 * Get all presets as an array
 */
export function getAllPresets(): JournalPreset[] {
  return Object.values(JOURNAL_PRESETS);
}
