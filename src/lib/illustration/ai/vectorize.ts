/**
 * vectorize.ts
 *
 * PNG to SVG vectorization service
 *
 * Converts PNG images to clean, editable SVG using imagetracerjs.
 * Optimized for scientific diagrams with flat colors and clear outlines.
 *
 * Features:
 * - Image preprocessing with sharp (resize, normalize)
 * - Configurable vectorization parameters
 * - SVG cleanup and validation
 * - Color palette extraction
 * - Path counting for complexity analysis
 */

import sharp from 'sharp';
import * as ImageTracer from 'imagetracerjs';

// =============================================================================
// TYPES
// =============================================================================

export interface VectorizeOptions {
  /** Number of colors to extract (fewer = simpler SVG) */
  colorCount?: number;
  /** Minimum color ratio for inclusion */
  minColorRatio?: number;
  /** Remove speckles smaller than this (pixels) */
  filterSpeckle?: number;
  /** Simplify paths for cleaner output */
  simplify?: boolean;
}

export interface VectorizeResult {
  /** Generated SVG string */
  svg: string;
  /** Number of paths in the SVG */
  pathCount: number;
  /** Unique colors found (hex codes) */
  colorPalette: string[];
  /** Whether the SVG was vectorized */
  vectorized: true;
}

// =============================================================================
// DEFAULT OPTIONS
// =============================================================================

const DEFAULT_OPTIONS: Required<VectorizeOptions> = {
  colorCount: 16,
  minColorRatio: 0.02,
  filterSpeckle: 4,
  simplify: true,
};

// =============================================================================
// MAIN VECTORIZATION FUNCTION
// =============================================================================

/**
 * Convert a PNG buffer to clean SVG string
 *
 * @param pngBuffer - Raw PNG bytes
 * @param options - Vectorization options
 * @returns Promise with SVG string
 */
export async function vectorizePNG(
  pngBuffer: Buffer,
  options: VectorizeOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Preprocess image with sharp
  const { data, info } = await preprocessPNG(pngBuffer);

  // Vectorize with imagetracerjs
  const svg = ImageTracer.imagedataToSVG(data, info.width, info.height, buildImageTracerOptions(opts));

  // Clean up SVG
  return cleanSVG(svg);
}

/**
 * Convert PNG to editable SVG with metadata
 *
 * @param pngBuffer - Raw PNG bytes
 * @param options - Vectorization options
 * @returns Promise with SVG and metadata
 */
export async function pngToEditableSVG(
  pngBuffer: Buffer,
  options: VectorizeOptions = {}
): Promise<VectorizeResult> {
  const svg = await vectorizePNG(pngBuffer, options);

  // Extract metadata
  const pathCount = countPaths(svg);
  const colorPalette = extractColors(svg);

  return {
    svg,
    pathCount,
    colorPalette,
    vectorized: true,
  };
}

// =============================================================================
// IMAGE PREPROCESSING
// =============================================================================

interface PreprocessedData {
  data: Uint8ClampedArray;
  info: { width: number; height: number; channels: number };
}

async function preprocessPNG(pngBuffer: Buffer): Promise<PreprocessedData> {
  // Get image metadata
  const metadata = await sharp(pngBuffer).metadata();

  // Determine if resize is needed (max 1024x1024 for faster vectorization)
  const maxDimension = 1024;
  const needsResize =
    metadata.width && metadata.width > maxDimension &&
    metadata.height && metadata.height > maxDimension;

  // Process image
  let pipeline = sharp(pngBuffer);

  if (needsResize) {
    pipeline = pipeline.resize(maxDimension, maxDimension, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Ensure PNG format and get raw pixel data
  const { data, info } = await pipeline
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    data: new Uint8ClampedArray(data as Buffer),
    info: {
      width: info.width || 1024,
      height: info.height || 1024,
      channels: info.channels || 4,
    },
  };
}

// =============================================================================
// IMAGETRACER OPTIONS
// =============================================================================

interface ImageTracerOptions {
  ltrees: number;
  qtres: number;
  scale: number;
  strokewidth: number;
  numberofcolors: number;
  mincolorratio: number;
  colorquantcycles: number;
  blurradius: number;
  blurdelta: number;
  linefilter: boolean;
  pathomit: number;
  rightangleenhance: boolean;
  desc: boolean;
  viewbox: boolean;
  scolor: string;
  strokewidths: number[];
}

function buildImageTracerOptions(opts: Required<VectorizeOptions>): ImageTracerOptions {
  return {
    // Tree options - balance between quality and speed
    ltrees: 0, // 0 = automatic tree depth
    qtres: 1, // Quality of path tracing (higher = more detail)

    // Output options
    scale: 1,
    strokewidth: 0, // No stroke (filled shapes)

    // Color options
    numberofcolors: opts.colorCount,
    mincolorratio: opts.minColorRatio,
    colorquantcycles: 3, // Iterations for color quantization

    // Blur options - keep edges sharp for diagrams
    blurradius: 0, // No blur (keep sharp edges)
    blurdelta: 20,

    // Filtering
    linefilter: true,
    pathomit: opts.filterSpeckle, // Remove small paths (speckles)

    // Enhancement
    rightangleenhance: true, // Enhance right angles (better for diagrams)

    // SVG options
    desc: false, // No description text
    viewbox: true, // Include viewBox for scalability
    scolor: '', // No stroke color

    // Stroke widths per layer (not used with strokewidth=0)
    strokewidths: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  };
}

// =============================================================================
// SVG CLEANUP
// =============================================================================

function cleanSVG(svg: string): string {
  // Add XMLNS if missing
  if (!svg.includes('xmlns=')) {
    svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Remove empty paths
  svg = svg.replace(/<path\s+d=""\s*\/>/g, '');

  // Ensure viewBox exists
  if (!svg.includes('viewBox=') && svg.includes('width=') && svg.includes('height=')) {
    const widthMatch = svg.match(/width="(\d+)"/);
    const heightMatch = svg.match(/height="(\d+)"/);
    if (widthMatch && heightMatch) {
      svg = svg.replace('<svg', `<svg viewBox="0 0 ${widthMatch[1]} ${heightMatch[1]}"`);
    }
  }

  // Add vectorization marker
  svg = svg.replace('<svg', '<svg data-vectorized="true"');

  // Format for readability (basic pretty-print)
  svg = svg.replace(/></g, '>\n<');

  return svg;
}

// =============================================================================
// METADATA EXTRACTION
// =============================================================================

function countPaths(svg: string): number {
  const pathMatches = svg.match(/<path\s/g);
  return pathMatches ? pathMatches.length : 0;
}

function extractColors(svg: string): string[] {
  const colorSet = new Set<string>();

  // Extract fill colors
  const fillMatches = svg.matchAll(/fill="([^"]+)"/g);
  for (const match of fillMatches) {
    const color = match[1];
    if (color && color !== 'none' && !color.startsWith('url(')) {
      colorSet.add(color);
    }
  }

  // Extract stroke colors
  const strokeMatches = svg.matchAll(/stroke="([^"]+)"/g);
  for (const match of strokeMatches) {
    const color = match[1];
    if (color && color !== 'none' && !color.startsWith('url(')) {
      colorSet.add(color);
    }
  }

  return Array.from(colorSet).sort();
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get optimized options for icon generation (fewer colors, more filtering)
 */
export function getIconOptions(): VectorizeOptions {
  return {
    colorCount: 4, // Icons should be mostly one color
    minColorRatio: 0.05,
    filterSpeckle: 8, // Remove more noise
    simplify: true,
  };
}

/**
 * Get optimized options for detailed diagrams
 */
export function getDetailedOptions(): VectorizeOptions {
  return {
    colorCount: 32, // More colors for detail
    minColorRatio: 0.01,
    filterSpeckle: 2, // Keep more detail
    simplify: false,
  };
}

/**
 * Get optimized options for flat/schematic diagrams
 */
export function getFlatOptions(): VectorizeOptions {
  return {
    colorCount: 16, // Balanced for flat diagrams
    minColorRatio: 0.02,
    filterSpeckle: 4, // Standard filtering
    simplify: true,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export const vectorizeService = {
  vectorizePNG,
  pngToEditableSVG,
  getIconOptions,
  getDetailedOptions,
  getFlatOptions,
};

export default vectorizeService;
