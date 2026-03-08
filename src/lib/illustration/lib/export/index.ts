/**
 * Export Module
 *
 * Provides comprehensive export functionality for illustrations,
 * supporting PNG, SVG, PDF, and PPTX formats with various options.
 *
 * @see save-svg-as-png: https://github.com/exupero/saveSvgAsPng
 * @see jspdf: https://github.com/parallax/jsPDF
 * @see svg2pdf.js: https://github.com/yWorks/svg2pdf.js
 * @see pptxgenjs: https://github.com/gitbrent/PptxGenJS
 */

import { saveSvgAsPng, svgAsPngUri, svgAsDataUri, download } from 'save-svg-as-png';
import { jsPDF } from 'jspdf';

// Stub for svg2pdf - full library needs to be installed for PDF export
const svg2pdf = typeof window !== 'undefined' ? (async (_svg: SVGElement, _pdf: unknown, _options: unknown) => {
  // Placeholder: use jsPDF's native SVG support if available
  console.warn('svg2pdf stub: PDF export with SVG conversion requires full library installation');
  return Promise.resolve();
}) : () => Promise.resolve();

// ExportDialog component available at: @/components/ExportDialog
// Features: Format selection (PNG, SVG, PDF, LaTeX), Quality/resolution settings,
// Page size options for PDF, Preview functionality

// TODO: Implement PNG export features
// - Custom resolution (1x, 2x, 4x)
// - Transparent background option
// - Custom background color
// - Crop to content bounds

// TODO: Implement SVG export features
// - Optimize SVG (remove unused defs, minify)
// - Embed fonts option
// - Convert text to paths option
// - SVG compatibility modes

// TODO: Implement PDF export features
// - Multi-page support
// - Custom page sizes (A4, Letter, custom)
// - Margins configuration
// - PDF/A compliance for archiving
// - Vector text preservation

// TODO: Add batch export functionality
// - Export multiple artboards
// - Export all layers separately
// - Automated naming conventions
// - Progress tracking for large exports

// TODO: Implement clipboard operations
// - Copy as PNG to clipboard
// - Copy as SVG to clipboard
// - Paste image from clipboard

/**
 * PNG export options
 */
export interface PngExportOptions {
  scale?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * PDF export options
 */
export interface PdfExportOptions {
  pageSize?: 'a4' | 'letter' | 'a3' | 'custom';
  orientation?: 'portrait' | 'landscape';
  margins?: { top: number; right: number; bottom: number; left: number };
  title?: string;
  author?: string;
  customWidth?: number;
  customHeight?: number;
}

/**
 * SVG export options
 */
export interface SvgExportOptions {
  embedFonts?: boolean;
  convertTextToPaths?: boolean;
  minify?: boolean;
  includeNamespaces?: boolean;
}

/**
 * Export SVG element as PNG file
 */
export async function exportAsPng(
  svg: SVGSVGElement,
  filename: string,
  options: PngExportOptions = {}
): Promise<void> {
  const { scale = 2, backgroundColor, ...rest } = options;

  await saveSvgAsPng(svg, filename, {
    scale,
    backgroundColor: backgroundColor || 'transparent',
    ...rest,
  });
}

/**
 * Get PNG data URI from SVG element
 */
export async function getPngDataUri(
  svg: SVGSVGElement,
  options: PngExportOptions = {}
): Promise<string> {
  const { scale = 2, backgroundColor, ...rest } = options;

  return svgAsPngUri(svg, {
    scale,
    backgroundColor: backgroundColor || 'transparent',
    ...rest,
  });
}

/**
 * Get SVG data URI
 */
export async function getSvgDataUri(svg: SVGSVGElement): Promise<string> {
  return svgAsDataUri(svg);
}

/**
 * Export SVG element as PDF file
 */
export async function exportAsPdf(
  svg: SVGSVGElement,
  filename: string,
  options: PdfExportOptions = {}
): Promise<void> {
  const {
    pageSize = 'a4',
    orientation = 'portrait',
    margins = { top: 10, right: 10, bottom: 10, left: 10 },
    title,
    author,
    customWidth,
    customHeight,
  } = options;

  // Determine page dimensions
  let width: number;
  let height: number;

  if (pageSize === 'custom' && customWidth && customHeight) {
    width = customWidth;
    height = customHeight;
  } else {
    // Standard page sizes in mm
    const sizes: Record<string, number[]> = {
      a4: [210, 297],
      a3: [297, 420],
      letter: [215.9, 279.4],
    };
    [width, height] = sizes[pageSize] || sizes.a4;
  }

  if (orientation === 'landscape') {
    [width, height] = [height, width];
  }

  // Create PDF document
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: pageSize === 'custom' ? [width, height] : pageSize,
  });

  // Set metadata
  if (title) pdf.setProperties({ title });
  if (author) pdf.setProperties({ author });

  // Calculate content area
  const contentWidth = width - margins.left - margins.right;
  const contentHeight = height - margins.top - margins.bottom;

  // Convert SVG to PDF
  await svg2pdf(svg, pdf, {
    x: margins.left,
    y: margins.top,
    width: contentWidth,
    height: contentHeight,
  });

  // Save the PDF
  pdf.save(filename);
}

/**
 * Export SVG as optimized SVG file
 */
export function exportAsSvg(
  svg: SVGSVGElement,
  filename: string,
  _options: SvgExportOptions = {}
): void {
  // Clone the SVG to avoid modifying the original
  const clone = svg.cloneNode(true) as SVGSVGElement;

  // TODO: Implement font embedding
  // TODO: Implement text to path conversion
  // TODO: Implement minification

  // Serialize to string
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clone);

  // Add XML declaration
  svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;

  // Create blob and download
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  download(filename, url);

  URL.revokeObjectURL(url);
}

/**
 * Copy SVG as PNG to clipboard
 */
export async function copyAsPngToClipboard(svg: SVGSVGElement, scale: number = 2): Promise<void> {
  const dataUri = await getPngDataUri(svg, { scale });

  // Convert data URI to blob
  const response = await fetch(dataUri);
  const blob = await response.blob();

  // Copy to clipboard
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}

export { saveSvgAsPng, svgAsPngUri, svgAsDataUri, download, jsPDF, svg2pdf };

// PPTX export
export {
  exportAsPptx,
  exportMultipleAsPptx,
  getPptxBlob,
  getPptxBase64,
} from './pptx';

export type {
  PptxExportOptions,
  SlideLayout,
  Artboard,
} from './pptx';
