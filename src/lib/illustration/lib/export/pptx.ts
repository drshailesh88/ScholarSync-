/**
 * PPTX Export Module
 *
 * Provides PowerPoint export functionality for scientific illustrations.
 * Uses pptxgenjs library (MIT license) for PPTX generation.
 *
 * @see pptxgenjs: https://github.com/gitbrent/PptxGenJS
 */

import PptxGenJS from 'pptxgenjs';
import type { Canvas as FabricCanvas } from 'fabric';

// ============================================================================
// Types
// ============================================================================

/**
 * Slide layout aspect ratio
 */
export type SlideLayout = '16x9' | '16x10' | '4x3' | 'custom';

/**
 * PPTX export options
 */
export interface PptxExportOptions {
  /** Slide layout aspect ratio */
  layout?: SlideLayout;
  /** Custom slide width in inches (only for 'custom' layout) */
  customWidth?: number;
  /** Custom slide height in inches (only for 'custom' layout) */
  customHeight?: number;
  /** Export resolution multiplier (1x, 2x, 4x) */
  multiplier?: number;
  /** Image quality (0-1) */
  quality?: number;
  /** Author name for metadata */
  author?: string;
  /** Title for metadata */
  title?: string;
  /** Subject for metadata */
  subject?: string;
  /** Company name for metadata */
  company?: string;
  /** Whether to center the image on the slide */
  centerImage?: boolean;
  /** Background color for the slide (hex color or 'transparent') */
  slideBackground?: string;
  /** Padding from slide edges in inches */
  padding?: number;
}

/**
 * Artboard definition for multi-slide export
 */
export interface Artboard {
  /** Artboard name (used as slide title) */
  name: string;
  /** Fabric canvas instance */
  canvas: FabricCanvas;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Standard slide dimensions in inches
 */
const SLIDE_DIMENSIONS: Record<Exclude<SlideLayout, 'custom'>, { width: number; height: number }> = {
  '16x9': { width: 10, height: 5.625 },
  '16x10': { width: 10, height: 6.25 },
  '4x3': { width: 10, height: 7.5 },
};

/**
 * Default export options
 */
const DEFAULT_OPTIONS: Required<PptxExportOptions> = {
  layout: '16x9',
  customWidth: 10,
  customHeight: 5.625,
  multiplier: 2,
  quality: 1,
  author: '',
  title: '',
  subject: 'Scientific Illustration',
  company: 'FINNISH',
  centerImage: true,
  slideBackground: 'FFFFFF',
  padding: 0.5,
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get slide dimensions based on layout
 */
function getSlideDimensions(
  layout: SlideLayout,
  customWidth?: number,
  customHeight?: number
): { width: number; height: number } {
  if (layout === 'custom') {
    return {
      width: customWidth || DEFAULT_OPTIONS.customWidth,
      height: customHeight || DEFAULT_OPTIONS.customHeight,
    };
  }
  return SLIDE_DIMENSIONS[layout];
}

/**
 * Convert Fabric canvas to high-resolution data URL
 */
function canvasToDataUrl(
  canvas: FabricCanvas,
  multiplier: number,
  quality: number
): string {
  return canvas.toDataURL({
    format: 'png',
    quality,
    multiplier,
  });
}

/**
 * Calculate image placement to fit within slide while maintaining aspect ratio
 */
function calculateImagePlacement(
  canvasWidth: number,
  canvasHeight: number,
  slideWidth: number,
  slideHeight: number,
  padding: number,
  centerImage: boolean
): { x: number; y: number; w: number; h: number } {
  const availableWidth = slideWidth - padding * 2;
  const availableHeight = slideHeight - padding * 2;

  const canvasAspectRatio = canvasWidth / canvasHeight;
  const slideAspectRatio = availableWidth / availableHeight;

  let imageWidth: number;
  let imageHeight: number;

  if (canvasAspectRatio > slideAspectRatio) {
    // Canvas is wider than slide area - fit to width
    imageWidth = availableWidth;
    imageHeight = availableWidth / canvasAspectRatio;
  } else {
    // Canvas is taller than slide area - fit to height
    imageHeight = availableHeight;
    imageWidth = availableHeight * canvasAspectRatio;
  }

  let x: number;
  let y: number;

  if (centerImage) {
    x = (slideWidth - imageWidth) / 2;
    y = (slideHeight - imageHeight) / 2;
  } else {
    x = padding;
    y = padding;
  }

  return { x, y, w: imageWidth, h: imageHeight };
}

/**
 * Normalize background color for pptxgenjs
 * Converts hex colors and handles transparency
 */
function normalizeBackgroundColor(color: string): string | undefined {
  if (!color || color === 'transparent') {
    return undefined;
  }
  // Remove # prefix if present
  return color.replace(/^#/, '').toUpperCase();
}

// ============================================================================
// Main Export Functions
// ============================================================================

/**
 * Export Fabric.js canvas as a PowerPoint presentation
 *
 * @param canvas - Fabric.js canvas instance
 * @param filename - Output filename (without extension)
 * @param options - Export options
 * @returns Promise that resolves when the file is saved
 *
 * @example
 * ```typescript
 * import { exportAsPptx } from '@/lib/export/pptx';
 *
 * const canvas = new FabricCanvas('canvas');
 * await exportAsPptx(canvas, 'my-illustration', {
 *   layout: '16x9',
 *   multiplier: 2,
 *   title: 'Cell Structure Diagram',
 *   author: 'Dr. Smith'
 * });
 * ```
 */
export async function exportAsPptx(
  canvas: FabricCanvas,
  filename: string,
  options: PptxExportOptions = {}
): Promise<void> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    layout,
    customWidth,
    customHeight,
    multiplier,
    quality,
    author,
    title,
    subject,
    company,
    centerImage,
    slideBackground,
    padding,
  } = mergedOptions;

  // Validate canvas
  if (!canvas) {
    throw new Error('Canvas is required for PPTX export');
  }

  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  if (!canvasWidth || !canvasHeight) {
    throw new Error('Canvas must have valid dimensions for PPTX export');
  }

  // Create PowerPoint presentation
  const pptx = new PptxGenJS();

  // Set metadata
  if (author) pptx.author = author;
  if (title) pptx.title = title;
  if (subject) pptx.subject = subject;
  if (company) pptx.company = company;

  // Set slide dimensions
  const slideDimensions = getSlideDimensions(layout, customWidth, customHeight);
  pptx.defineLayout({
    name: 'CUSTOM',
    width: slideDimensions.width,
    height: slideDimensions.height,
  });
  pptx.layout = 'CUSTOM';

  // Create slide
  const slide = pptx.addSlide();

  // Set slide background
  const bgColor = normalizeBackgroundColor(slideBackground);
  if (bgColor) {
    slide.background = { color: bgColor };
  }

  // Export canvas to data URL
  const dataUrl = canvasToDataUrl(canvas, multiplier, quality);

  // Calculate image placement
  const placement = calculateImagePlacement(
    canvasWidth,
    canvasHeight,
    slideDimensions.width,
    slideDimensions.height,
    padding,
    centerImage
  );

  // Add image to slide
  slide.addImage({
    data: dataUrl,
    x: placement.x,
    y: placement.y,
    w: placement.w,
    h: placement.h,
  });

  // Ensure filename has .pptx extension
  const outputFilename = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;

  // Save the file
  await pptx.writeFile({ fileName: outputFilename });
}

/**
 * Export multiple artboards/canvases as a multi-slide PowerPoint presentation
 *
 * @param artboards - Array of artboard definitions
 * @param filename - Output filename (without extension)
 * @param options - Export options
 * @returns Promise that resolves when the file is saved
 *
 * @example
 * ```typescript
 * import { exportMultipleAsPptx } from '@/lib/export/pptx';
 *
 * const artboards = [
 *   { name: 'Cell Membrane', canvas: canvas1 },
 *   { name: 'Nucleus', canvas: canvas2 },
 *   { name: 'Mitochondria', canvas: canvas3 },
 * ];
 *
 * await exportMultipleAsPptx(artboards, 'cell-components', {
 *   layout: '16x9',
 *   title: 'Cell Biology Illustrations'
 * });
 * ```
 */
export async function exportMultipleAsPptx(
  artboards: Artboard[],
  filename: string,
  options: PptxExportOptions = {}
): Promise<void> {
  if (!artboards || artboards.length === 0) {
    throw new Error('At least one artboard is required for multi-slide PPTX export');
  }

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    layout,
    customWidth,
    customHeight,
    multiplier,
    quality,
    author,
    title,
    subject,
    company,
    centerImage,
    slideBackground,
    padding,
  } = mergedOptions;

  // Create PowerPoint presentation
  const pptx = new PptxGenJS();

  // Set metadata
  if (author) pptx.author = author;
  if (title) pptx.title = title;
  if (subject) pptx.subject = subject;
  if (company) pptx.company = company;

  // Set slide dimensions
  const slideDimensions = getSlideDimensions(layout, customWidth, customHeight);
  pptx.defineLayout({
    name: 'CUSTOM',
    width: slideDimensions.width,
    height: slideDimensions.height,
  });
  pptx.layout = 'CUSTOM';

  // Process each artboard
  for (const artboard of artboards) {
    const { name, canvas } = artboard;

    if (!canvas) {
      console.warn(`Skipping artboard "${name}": canvas is undefined`);
      continue;
    }

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    if (!canvasWidth || !canvasHeight) {
      console.warn(`Skipping artboard "${name}": invalid canvas dimensions`);
      continue;
    }

    // Create slide
    const slide = pptx.addSlide();

    // Set slide background
    const bgColor = normalizeBackgroundColor(slideBackground);
    if (bgColor) {
      slide.background = { color: bgColor };
    }

    // Export canvas to data URL
    const dataUrl = canvasToDataUrl(canvas, multiplier, quality);

    // Calculate image placement
    const placement = calculateImagePlacement(
      canvasWidth,
      canvasHeight,
      slideDimensions.width,
      slideDimensions.height,
      padding,
      centerImage
    );

    // Add image to slide
    slide.addImage({
      data: dataUrl,
      x: placement.x,
      y: placement.y,
      w: placement.w,
      h: placement.h,
    });

    // Add artboard name as slide title (optional)
    if (name) {
      slide.addText(name, {
        x: 0.5,
        y: 0.2,
        w: slideDimensions.width - 1,
        h: 0.3,
        fontSize: 14,
        color: '666666',
        fontFace: 'Arial',
        align: 'center',
      });
    }
  }

  // Ensure filename has .pptx extension
  const outputFilename = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;

  // Save the file
  await pptx.writeFile({ fileName: outputFilename });
}

/**
 * Get PPTX blob for download without saving directly
 * Useful for custom download handling or server upload
 *
 * @param canvas - Fabric.js canvas instance
 * @param options - Export options
 * @returns Promise that resolves with the PPTX blob
 */
export async function getPptxBlob(
  canvas: FabricCanvas,
  options: PptxExportOptions = {}
): Promise<Blob> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    layout,
    customWidth,
    customHeight,
    multiplier,
    quality,
    author,
    title,
    subject,
    company,
    centerImage,
    slideBackground,
    padding,
  } = mergedOptions;

  // Validate canvas
  if (!canvas) {
    throw new Error('Canvas is required for PPTX export');
  }

  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  if (!canvasWidth || !canvasHeight) {
    throw new Error('Canvas must have valid dimensions for PPTX export');
  }

  // Create PowerPoint presentation
  const pptx = new PptxGenJS();

  // Set metadata
  if (author) pptx.author = author;
  if (title) pptx.title = title;
  if (subject) pptx.subject = subject;
  if (company) pptx.company = company;

  // Set slide dimensions
  const slideDimensions = getSlideDimensions(layout, customWidth, customHeight);
  pptx.defineLayout({
    name: 'CUSTOM',
    width: slideDimensions.width,
    height: slideDimensions.height,
  });
  pptx.layout = 'CUSTOM';

  // Create slide
  const slide = pptx.addSlide();

  // Set slide background
  const bgColor = normalizeBackgroundColor(slideBackground);
  if (bgColor) {
    slide.background = { color: bgColor };
  }

  // Export canvas to data URL
  const dataUrl = canvasToDataUrl(canvas, multiplier, quality);

  // Calculate image placement
  const placement = calculateImagePlacement(
    canvasWidth,
    canvasHeight,
    slideDimensions.width,
    slideDimensions.height,
    padding,
    centerImage
  );

  // Add image to slide
  slide.addImage({
    data: dataUrl,
    x: placement.x,
    y: placement.y,
    w: placement.w,
    h: placement.h,
  });

  // Get blob
  const blob = await pptx.write({ outputType: 'blob' });
  return blob as Blob;
}

/**
 * Get PPTX as base64 string
 * Useful for embedding or sending to APIs
 *
 * @param canvas - Fabric.js canvas instance
 * @param options - Export options
 * @returns Promise that resolves with the base64 string
 */
export async function getPptxBase64(
  canvas: FabricCanvas,
  options: PptxExportOptions = {}
): Promise<string> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    layout,
    customWidth,
    customHeight,
    multiplier,
    quality,
    author,
    title,
    subject,
    company,
    centerImage,
    slideBackground,
    padding,
  } = mergedOptions;

  // Validate canvas
  if (!canvas) {
    throw new Error('Canvas is required for PPTX export');
  }

  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  if (!canvasWidth || !canvasHeight) {
    throw new Error('Canvas must have valid dimensions for PPTX export');
  }

  // Create PowerPoint presentation
  const pptx = new PptxGenJS();

  // Set metadata
  if (author) pptx.author = author;
  if (title) pptx.title = title;
  if (subject) pptx.subject = subject;
  if (company) pptx.company = company;

  // Set slide dimensions
  const slideDimensions = getSlideDimensions(layout, customWidth, customHeight);
  pptx.defineLayout({
    name: 'CUSTOM',
    width: slideDimensions.width,
    height: slideDimensions.height,
  });
  pptx.layout = 'CUSTOM';

  // Create slide
  const slide = pptx.addSlide();

  // Set slide background
  const bgColor = normalizeBackgroundColor(slideBackground);
  if (bgColor) {
    slide.background = { color: bgColor };
  }

  // Export canvas to data URL
  const dataUrl = canvasToDataUrl(canvas, multiplier, quality);

  // Calculate image placement
  const placement = calculateImagePlacement(
    canvasWidth,
    canvasHeight,
    slideDimensions.width,
    slideDimensions.height,
    padding,
    centerImage
  );

  // Add image to slide
  slide.addImage({
    data: dataUrl,
    x: placement.x,
    y: placement.y,
    w: placement.w,
    h: placement.h,
  });

  // Get base64
  const base64 = await pptx.write({ outputType: 'base64' });
  return base64 as string;
}
