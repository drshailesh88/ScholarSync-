/**
 * Export Pipeline Service
 * Factory and unified interface for exporting Fabric.js canvas to various formats
 */

import type { Canvas as FabricCanvas } from 'fabric';
import {
  type ExportFormat,
  type ExportOptions,
  type ExportResult,
  type ExportProgressCallback,
  type Exporter,
  type PNGExportOptions,
  type SVGExportOptions,
  type PDFExportOptions,
  type TikZExportOptions,
  MIME_TYPES,
  FILE_EXTENSIONS,
} from './types';
import { PNGExporter } from './PNGExporter';
import { SVGExporter } from './SVGExporter';
import { PDFExporter } from './PDFExporter';
import { TikZExporter } from './TikZExporter';

// Re-export types
export * from './types';

// Re-export individual exporters
export { PNGExporter } from './PNGExporter';
export { SVGExporter } from './SVGExporter';
export { PDFExporter } from './PDFExporter';
export { TikZExporter } from './TikZExporter';

/**
 * Exporter factory function
 * Creates an appropriate exporter instance based on format
 */
export function createExporter(format: 'png'): PNGExporter;
export function createExporter(format: 'svg'): SVGExporter;
export function createExporter(format: 'pdf'): PDFExporter;
export function createExporter(format: 'tikz'): TikZExporter;
export function createExporter(format: ExportFormat): Exporter;
export function createExporter(format: ExportFormat): Exporter {
  switch (format) {
    case 'png':
      return new PNGExporter();
    case 'svg':
      return new SVGExporter();
    case 'pdf':
      return new PDFExporter();
    case 'tikz':
      return new TikZExporter();
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
}

/**
 * Export Service class
 * Provides a unified interface for all export operations
 */
export class ExportService {
  private exporters: Map<ExportFormat, Exporter> = new Map();

  constructor() {
    // Pre-create all exporters for reuse
    this.exporters.set('png', new PNGExporter());
    this.exporters.set('svg', new SVGExporter());
    this.exporters.set('pdf', new PDFExporter());
    this.exporters.set('tikz', new TikZExporter());
  }

  /**
   * Get an exporter for a specific format
   */
  getExporter(format: ExportFormat): Exporter {
    const exporter = this.exporters.get(format);
    if (!exporter) {
      throw new Error(`Unknown export format: ${format}`);
    }
    return exporter;
  }

  /**
   * Export canvas to specified format
   */
  async export(
    canvas: FabricCanvas,
    options: ExportOptions,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const exporter = this.getExporter(options.format);

    // Remove format from options before passing to exporter
    const { format, ...exportOptions } = options;

    return exporter.export(canvas, exportOptions, onProgress);
  }

  /**
   * Export to PNG format
   */
  async exportPNG(
    canvas: FabricCanvas,
    options?: Omit<PNGExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const exporter = this.exporters.get('png') as PNGExporter;
    return exporter.export(canvas, options, onProgress);
  }

  /**
   * Export to SVG format
   */
  async exportSVG(
    canvas: FabricCanvas,
    options?: Omit<SVGExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const exporter = this.exporters.get('svg') as SVGExporter;
    return exporter.export(canvas, options, onProgress);
  }

  /**
   * Export to PDF format
   */
  async exportPDF(
    canvas: FabricCanvas,
    options?: Omit<PDFExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const exporter = this.exporters.get('pdf') as PDFExporter;
    return exporter.export(canvas, options, onProgress);
  }

  /**
   * Export to TikZ format
   */
  async exportTikZ(
    canvas: FabricCanvas,
    options?: Omit<TikZExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const exporter = this.exporters.get('tikz') as TikZExporter;
    return exporter.export(canvas, options, onProgress);
  }

  /**
   * Get supported export formats
   */
  getSupportedFormats(): ExportFormat[] {
    return Array.from(this.exporters.keys());
  }

  /**
   * Get MIME type for a format
   */
  getMimeType(format: ExportFormat): string {
    return MIME_TYPES[format];
  }

  /**
   * Get file extension for a format
   */
  getFileExtension(format: ExportFormat): string {
    return FILE_EXTENSIONS[format];
  }

  /**
   * Validate export options for a specific format
   */
  validateOptions(options: ExportOptions): { valid: boolean; errors: string[] } {
    const exporter = this.getExporter(options.format);
    return exporter.validateOptions(options);
  }

  /**
   * Get default options for a format
   */
  getDefaultOptions(format: 'png'): Omit<PNGExportOptions, 'format'>;
  getDefaultOptions(format: 'svg'): Omit<SVGExportOptions, 'format'>;
  getDefaultOptions(format: 'pdf'): Omit<PDFExportOptions, 'format'>;
  getDefaultOptions(format: 'tikz'): Omit<TikZExportOptions, 'format'>;
  getDefaultOptions(format: ExportFormat): Record<string, unknown>;
  getDefaultOptions(format: ExportFormat): Record<string, unknown> {
    const exporter = this.getExporter(format);
    return exporter.getDefaultOptions();
  }

  /**
   * Get format display information
   */
  getFormatInfo(format: ExportFormat): {
    name: string;
    description: string;
    extension: string;
    mimeType: string;
    isVector: boolean;
  } {
    const formatInfo: Record<ExportFormat, {
      name: string;
      description: string;
      isVector: boolean;
    }> = {
      png: {
        name: 'PNG Image',
        description: 'Portable Network Graphics - best for web and screen display',
        isVector: false,
      },
      svg: {
        name: 'SVG Vector',
        description: 'Scalable Vector Graphics - editable vector format',
        isVector: true,
      },
      pdf: {
        name: 'PDF Document',
        description: 'Portable Document Format - ideal for printing and sharing',
        isVector: true,
      },
      tikz: {
        name: 'LaTeX/TikZ',
        description: 'TikZ code for LaTeX documents - perfect for academic papers',
        isVector: true,
      },
    };

    const info = formatInfo[format];
    return {
      ...info,
      extension: FILE_EXTENSIONS[format],
      mimeType: MIME_TYPES[format],
    };
  }
}

/**
 * Singleton export service instance
 */
let exportServiceInstance: ExportService | null = null;

/**
 * Get the singleton export service instance
 */
export function getExportService(): ExportService {
  if (!exportServiceInstance) {
    exportServiceInstance = new ExportService();
  }
  return exportServiceInstance;
}

/**
 * Quick export function for simple use cases
 */
export async function quickExport(
  canvas: FabricCanvas,
  format: ExportFormat,
  filename?: string,
  onProgress?: ExportProgressCallback
): Promise<ExportResult> {
  const service = getExportService();
  const options = { ...service.getDefaultOptions(format), format, filename } as ExportOptions;
  return service.export(canvas, options, onProgress);
}

export default ExportService;
