/**
 * Export Pipeline Types
 * Type definitions for the FINNISH export system
 */

import type { Canvas as FabricCanvas } from 'fabric';

/** Supported export formats */
export type ExportFormat = 'png' | 'svg' | 'pdf' | 'tikz';

/** DPI options for raster exports */
export type DPI = 72 | 150 | 300 | 600;

/** Page size options for PDF export */
export type PageSize = 'a4' | 'letter' | 'custom';

/** Page orientation for PDF export */
export type PageOrientation = 'portrait' | 'landscape';

/**
 * Export options common to all formats
 */
export interface BaseExportOptions {
  /** Output filename (without extension) */
  filename?: string;
}

/**
 * PNG export options
 */
export interface PNGExportOptions extends BaseExportOptions {
  format: 'png';
  /** Resolution in dots per inch */
  dpi?: DPI;
  /** Quality setting (0-100) - affects compression */
  quality?: number;
  /** Whether to use transparent background */
  transparent?: boolean;
}

/**
 * SVG export options
 */
export interface SVGExportOptions extends BaseExportOptions {
  format: 'svg';
  /** Optimize SVG output (remove unnecessary attributes) */
  optimize?: boolean;
  /** Embed fonts as paths */
  embedFonts?: boolean;
  /** Include viewBox attribute */
  preserveViewBox?: boolean;
  /** Minify SVG output */
  minify?: boolean;
}

/**
 * PDF export options
 */
export interface PDFExportOptions extends BaseExportOptions {
  format: 'pdf';
  /** Page size preset or custom dimensions */
  pageSize?: PageSize;
  /** Custom page width in points (72 points = 1 inch) */
  customWidth?: number;
  /** Custom page height in points */
  customHeight?: number;
  /** Page orientation */
  orientation?: PageOrientation;
  /** Document title metadata */
  title?: string;
  /** Document author metadata */
  author?: string;
  /** Document subject metadata */
  subject?: string;
  /** Margin in points */
  margin?: number;
}

/**
 * TikZ/LaTeX export options
 */
export interface TikZExportOptions extends BaseExportOptions {
  format: 'tikz';
  /** Generate standalone compilable .tex file */
  standalone?: boolean;
  /** Include TikZ package imports in preamble */
  includePreamble?: boolean;
  /** Scale factor for coordinates */
  scale?: number;
  /** Unit for coordinates (cm, mm, pt, in) */
  unit?: 'cm' | 'mm' | 'pt' | 'in';
  /** Include comments in output */
  includeComments?: boolean;
}

/**
 * Union type of all export options
 */
export type ExportOptions =
  | PNGExportOptions
  | SVGExportOptions
  | PDFExportOptions
  | TikZExportOptions;

/**
 * Result of an export operation
 */
export interface ExportResult {
  /** The exported data as a Blob */
  blob: Blob;
  /** Suggested filename with extension */
  filename: string;
  /** MIME type of the exported data */
  mimeType: string;
  /** Size in bytes */
  size: number;
}

/**
 * Progress callback for export operations
 */
export type ExportProgressCallback = (progress: number, message?: string) => void;

/**
 * Base interface for all exporters
 */
export interface Exporter<T extends ExportOptions = ExportOptions> {
  /** The format this exporter handles */
  readonly format: ExportFormat;

  /** Export the canvas to the target format */
  export(
    canvas: FabricCanvas,
    options?: Omit<T, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult>;

  /** Validate options before export */
  validateOptions(options?: Partial<T>): { valid: boolean; errors: string[] };

  /** Get default options for this exporter */
  getDefaultOptions(): Omit<T, 'format'>;
}

/**
 * Fabric.js object types we handle in exports
 */
export type FabricObjectType =
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'line'
  | 'polyline'
  | 'polygon'
  | 'path'
  | 'text'
  | 'i-text'
  | 'textbox'
  | 'image'
  | 'group';

/**
 * Page size dimensions in points (72 points = 1 inch)
 */
export const PAGE_SIZES: Record<PageSize, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
  custom: { width: 612, height: 792 }, // Default to letter for custom
};

/**
 * MIME types for each export format
 */
export const MIME_TYPES: Record<ExportFormat, string> = {
  png: 'image/png',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  tikz: 'text/x-tex',
};

/**
 * File extensions for each export format
 */
export const FILE_EXTENSIONS: Record<ExportFormat, string> = {
  png: '.png',
  svg: '.svg',
  pdf: '.pdf',
  tikz: '.tex',
};
