/**
 * Poster Size Presets
 *
 * Professional poster sizes for scientific presentations and conferences.
 * Matches BioRender's Poster Builder functionality.
 */

// ============================================================================
// Types
// ============================================================================

export interface PosterSize {
  id: string;
  name: string;
  description: string;
  width: number;  // in mm
  height: number; // in mm
  widthPx: number;  // at 300 DPI
  heightPx: number; // at 300 DPI
  orientation: 'portrait' | 'landscape';
  category: 'standard' | 'conference' | 'custom';
}

export interface PosterTemplate {
  id: string;
  name: string;
  description: string;
  sizeId: string;
  sections: PosterSection[];
  theme: PosterTheme;
}

export interface PosterSection {
  id: string;
  type: 'title' | 'authors' | 'abstract' | 'introduction' | 'methods' | 'results' | 'conclusion' | 'references' | 'figure' | 'acknowledgments' | 'contact' | 'custom';
  label: string;
  x: number;      // percentage of width (0-100)
  y: number;      // percentage of height (0-100)
  width: number;  // percentage of width
  height: number; // percentage of height
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
}

export interface PosterTheme {
  id: string;
  name: string;
  backgroundColor: string;
  headerColor: string;
  sectionColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  fontFamily: string;
}

// ============================================================================
// Standard Poster Sizes
// ============================================================================

export const posterSizes: PosterSize[] = [
  // ISO A Series (Standard)
  {
    id: 'a0-portrait',
    name: 'A0 Portrait',
    description: 'Standard large poster (841 x 1189 mm)',
    width: 841,
    height: 1189,
    widthPx: 9933,
    heightPx: 14043,
    orientation: 'portrait',
    category: 'standard'
  },
  {
    id: 'a0-landscape',
    name: 'A0 Landscape',
    description: 'Standard large poster rotated (1189 x 841 mm)',
    width: 1189,
    height: 841,
    widthPx: 14043,
    heightPx: 9933,
    orientation: 'landscape',
    category: 'standard'
  },
  {
    id: 'a1-portrait',
    name: 'A1 Portrait',
    description: 'Medium poster (594 x 841 mm)',
    width: 594,
    height: 841,
    widthPx: 7016,
    heightPx: 9933,
    orientation: 'portrait',
    category: 'standard'
  },
  {
    id: 'a1-landscape',
    name: 'A1 Landscape',
    description: 'Medium poster rotated (841 x 594 mm)',
    width: 841,
    height: 594,
    widthPx: 9933,
    heightPx: 7016,
    orientation: 'landscape',
    category: 'standard'
  },
  {
    id: 'a2-portrait',
    name: 'A2 Portrait',
    description: 'Small poster (420 x 594 mm)',
    width: 420,
    height: 594,
    widthPx: 4961,
    heightPx: 7016,
    orientation: 'portrait',
    category: 'standard'
  },
  {
    id: 'a3-portrait',
    name: 'A3 Portrait',
    description: 'Mini poster (297 x 420 mm)',
    width: 297,
    height: 420,
    widthPx: 3508,
    heightPx: 4961,
    orientation: 'portrait',
    category: 'standard'
  },

  // US Standard Sizes
  {
    id: 'us-poster-36x48',
    name: '36" x 48" US Standard',
    description: 'Common US conference poster',
    width: 914,  // 36 inches
    height: 1219, // 48 inches
    widthPx: 10800,
    heightPx: 14400,
    orientation: 'portrait',
    category: 'conference'
  },
  {
    id: 'us-poster-48x36',
    name: '48" x 36" US Standard',
    description: 'Common US conference poster (landscape)',
    width: 1219,
    height: 914,
    widthPx: 14400,
    heightPx: 10800,
    orientation: 'landscape',
    category: 'conference'
  },
  {
    id: 'us-poster-42x56',
    name: '42" x 56" Large',
    description: 'Large US conference poster',
    width: 1067,
    height: 1422,
    widthPx: 12600,
    heightPx: 16800,
    orientation: 'portrait',
    category: 'conference'
  },

  // Conference-Specific Sizes
  {
    id: 'sfn-landscape',
    name: 'SfN Standard',
    description: 'Society for Neuroscience (45" x 45")',
    width: 1143,
    height: 1143,
    widthPx: 13500,
    heightPx: 13500,
    orientation: 'landscape',
    category: 'conference'
  },
  {
    id: 'agu-landscape',
    name: 'AGU Standard',
    description: 'American Geophysical Union (48" x 36")',
    width: 1219,
    height: 914,
    widthPx: 14400,
    heightPx: 10800,
    orientation: 'landscape',
    category: 'conference'
  }
];

// ============================================================================
// Poster Themes
// ============================================================================

export const posterThemes: PosterTheme[] = [
  {
    id: 'academic-blue',
    name: 'Academic Blue',
    backgroundColor: '#FFFFFF',
    headerColor: '#1E3A5F',
    sectionColor: '#F8FAFC',
    textColor: '#1E293B',
    accentColor: '#3B82F6',
    borderColor: '#E2E8F0',
    fontFamily: 'Arial, sans-serif'
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    backgroundColor: '#1E293B',
    headerColor: '#0F172A',
    sectionColor: '#334155',
    textColor: '#F8FAFC',
    accentColor: '#22D3EE',
    borderColor: '#475569',
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'nature-green',
    name: 'Nature Green',
    backgroundColor: '#FFFFFF',
    headerColor: '#14532D',
    sectionColor: '#F0FDF4',
    textColor: '#1E293B',
    accentColor: '#22C55E',
    borderColor: '#BBF7D0',
    fontFamily: 'Georgia, serif'
  },
  {
    id: 'medical-red',
    name: 'Medical Red',
    backgroundColor: '#FFFFFF',
    headerColor: '#7F1D1D',
    sectionColor: '#FEF2F2',
    textColor: '#1E293B',
    accentColor: '#EF4444',
    borderColor: '#FECACA',
    fontFamily: 'Arial, sans-serif'
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    backgroundColor: '#FFFFFF',
    headerColor: '#18181B',
    sectionColor: '#FAFAFA',
    textColor: '#27272A',
    accentColor: '#71717A',
    borderColor: '#E4E4E7',
    fontFamily: 'Helvetica, sans-serif'
  },
  {
    id: 'chemistry-purple',
    name: 'Chemistry Purple',
    backgroundColor: '#FFFFFF',
    headerColor: '#581C87',
    sectionColor: '#FAF5FF',
    textColor: '#1E293B',
    accentColor: '#A855F7',
    borderColor: '#E9D5FF',
    fontFamily: 'Arial, sans-serif'
  }
];

// ============================================================================
// Poster Templates
// ============================================================================

export const posterTemplates: PosterTemplate[] = [
  {
    id: 'classic-three-column',
    name: 'Classic Three Column',
    description: 'Traditional scientific poster with three columns',
    sizeId: 'a0-portrait',
    theme: posterThemes[0],
    sections: [
      { id: 'title', type: 'title', label: 'Title', x: 5, y: 2, width: 90, height: 6, fontSize: 72, fontWeight: 'bold', textAlign: 'center' },
      { id: 'authors', type: 'authors', label: 'Authors & Affiliations', x: 5, y: 8, width: 90, height: 4, fontSize: 28, textAlign: 'center' },

      // Column 1
      { id: 'abstract', type: 'abstract', label: 'Abstract', x: 2, y: 14, width: 30, height: 18 },
      { id: 'introduction', type: 'introduction', label: 'Introduction', x: 2, y: 34, width: 30, height: 22 },
      { id: 'methods', type: 'methods', label: 'Methods', x: 2, y: 58, width: 30, height: 28 },

      // Column 2
      { id: 'results-1', type: 'results', label: 'Results', x: 35, y: 14, width: 30, height: 45 },
      { id: 'figure-1', type: 'figure', label: 'Figure 1', x: 35, y: 61, width: 30, height: 25 },

      // Column 3
      { id: 'results-2', type: 'results', label: 'Results (cont.)', x: 68, y: 14, width: 30, height: 30 },
      { id: 'conclusion', type: 'conclusion', label: 'Conclusions', x: 68, y: 46, width: 30, height: 18 },
      { id: 'references', type: 'references', label: 'References', x: 68, y: 66, width: 30, height: 12 },
      { id: 'acknowledgments', type: 'acknowledgments', label: 'Acknowledgments', x: 68, y: 80, width: 30, height: 8 },

      // Footer
      { id: 'contact', type: 'contact', label: 'Contact', x: 2, y: 90, width: 96, height: 6 }
    ]
  },
  {
    id: 'modern-two-column',
    name: 'Modern Two Column',
    description: 'Clean, modern design with two columns',
    sizeId: 'a0-landscape',
    theme: posterThemes[1],
    sections: [
      { id: 'title', type: 'title', label: 'Title', x: 3, y: 2, width: 94, height: 8, fontSize: 64, fontWeight: 'bold', textAlign: 'center' },
      { id: 'authors', type: 'authors', label: 'Authors', x: 3, y: 10, width: 94, height: 5, fontSize: 24, textAlign: 'center' },

      // Left Column
      { id: 'abstract', type: 'abstract', label: 'Abstract', x: 2, y: 17, width: 46, height: 12 },
      { id: 'introduction', type: 'introduction', label: 'Background', x: 2, y: 31, width: 46, height: 15 },
      { id: 'methods', type: 'methods', label: 'Methods', x: 2, y: 48, width: 46, height: 20 },
      { id: 'references', type: 'references', label: 'References', x: 2, y: 70, width: 46, height: 15 },

      // Right Column
      { id: 'results', type: 'results', label: 'Results', x: 52, y: 17, width: 46, height: 38 },
      { id: 'conclusion', type: 'conclusion', label: 'Conclusions', x: 52, y: 57, width: 46, height: 15 },
      { id: 'acknowledgments', type: 'acknowledgments', label: 'Acknowledgments', x: 52, y: 74, width: 46, height: 11 },

      // Footer
      { id: 'contact', type: 'contact', label: 'Contact & QR Code', x: 2, y: 88, width: 96, height: 10 }
    ]
  },
  {
    id: 'figure-heavy',
    name: 'Figure-Heavy Layout',
    description: 'Emphasizes visual results with large figure panels',
    sizeId: 'us-poster-48x36',
    theme: posterThemes[4],
    sections: [
      { id: 'title', type: 'title', label: 'Title', x: 2, y: 2, width: 96, height: 10, fontSize: 56, fontWeight: 'bold', textAlign: 'center' },
      { id: 'authors', type: 'authors', label: 'Authors', x: 2, y: 12, width: 96, height: 4, fontSize: 20, textAlign: 'center' },

      // Small text sections on left
      { id: 'abstract', type: 'abstract', label: 'Abstract', x: 2, y: 18, width: 22, height: 24 },
      { id: 'methods', type: 'methods', label: 'Methods', x: 2, y: 44, width: 22, height: 24 },
      { id: 'references', type: 'references', label: 'References', x: 2, y: 70, width: 22, height: 18 },

      // Large figure panels
      { id: 'figure-1', type: 'figure', label: 'Figure 1', x: 26, y: 18, width: 35, height: 35 },
      { id: 'figure-2', type: 'figure', label: 'Figure 2', x: 63, y: 18, width: 35, height: 35 },
      { id: 'figure-3', type: 'figure', label: 'Figure 3', x: 26, y: 55, width: 35, height: 25 },
      { id: 'conclusion', type: 'conclusion', label: 'Conclusions', x: 63, y: 55, width: 35, height: 25 },

      // Footer
      { id: 'contact', type: 'contact', label: 'Contact', x: 2, y: 90, width: 96, height: 8 }
    ]
  }
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get poster size by ID
 */
export function getPosterSize(id: string): PosterSize | undefined {
  return posterSizes.find(size => size.id === id);
}

/**
 * Get poster theme by ID
 */
export function getPosterTheme(id: string): PosterTheme | undefined {
  return posterThemes.find(theme => theme.id === id);
}

/**
 * Get poster template by ID
 */
export function getPosterTemplate(id: string): PosterTemplate | undefined {
  return posterTemplates.find(template => template.id === id);
}

/**
 * Filter poster sizes by category
 */
export function getPosterSizesByCategory(category: PosterSize['category']): PosterSize[] {
  return posterSizes.filter(size => size.category === category);
}

/**
 * Convert mm to pixels at given DPI
 */
export function mmToPixels(mm: number, dpi: number = 300): number {
  return Math.round((mm / 25.4) * dpi);
}

/**
 * Convert pixels to mm at given DPI
 */
export function pixelsToMm(pixels: number, dpi: number = 300): number {
  return (pixels / dpi) * 25.4;
}

/**
 * Get recommended DPI for poster size
 */
export function getRecommendedDpi(size: PosterSize): number {
  // Larger posters can use lower DPI since they're viewed from farther away
  if (size.width > 1000 || size.height > 1000) {
    return 150; // A0 and larger
  } else if (size.width > 600 || size.height > 600) {
    return 200; // A1
  }
  return 300; // A2 and smaller
}

/**
 * Generate CSS for poster sections
 */
export function generateSectionStyle(section: PosterSection, theme: PosterTheme): Record<string, string> {
  return {
    position: 'absolute',
    left: `${section.x}%`,
    top: `${section.y}%`,
    width: `${section.width}%`,
    height: `${section.height}%`,
    backgroundColor: section.type === 'title' ? theme.headerColor : theme.sectionColor,
    color: section.type === 'title' ? '#FFFFFF' : theme.textColor,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '8px',
    padding: '16px',
    fontFamily: theme.fontFamily,
    fontSize: section.fontSize ? `${section.fontSize}px` : '14px',
    fontWeight: section.fontWeight || 'normal',
    textAlign: section.textAlign || 'left',
    overflow: 'hidden'
  };
}

// ============================================================================
// Export
// ============================================================================

const posterPresets = {
  sizes: posterSizes,
  themes: posterThemes,
  templates: posterTemplates,
  getPosterSize,
  getPosterTheme,
  getPosterTemplate,
  getPosterSizesByCategory,
  mmToPixels,
  pixelsToMm,
  getRecommendedDpi,
  generateSectionStyle
};

export default posterPresets;
