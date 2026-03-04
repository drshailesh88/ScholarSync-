/**
 * PNG Exporter
 * Exports Fabric.js canvas to PNG format with configurable DPI, quality, and transparency
 */

import type { Canvas as FabricCanvas } from 'fabric';
import type {
  Exporter,
  PNGExportOptions,
  ExportResult,
  ExportProgressCallback,
  DPI,
} from './types.js';
import { MIME_TYPES, FILE_EXTENSIONS } from './types.js';

/**
 * DPI scale factors relative to base 72 DPI
 */
const DPI_SCALE: Record<DPI, number> = {
  72: 1,
  150: 150 / 72,
  300: 300 / 72,
  600: 600 / 72,
};

/**
 * PNG Exporter class
 * Handles export of Fabric.js canvas to PNG format
 */
export class PNGExporter implements Exporter<PNGExportOptions> {
  readonly format = 'png' as const;

  /**
   * Get default export options
   */
  getDefaultOptions(): Omit<PNGExportOptions, 'format'> {
    return {
      dpi: 150,
      quality: 90,
      transparent: false,
      filename: 'illustration',
    };
  }

  /**
   * Validate export options
   */
  validateOptions(options?: Partial<PNGExportOptions>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (options?.quality !== undefined) {
      if (options.quality < 0 || options.quality > 100) {
        errors.push('Quality must be between 0 and 100');
      }
    }

    if (options?.dpi !== undefined) {
      if (![72, 150, 300, 600].includes(options.dpi)) {
        errors.push('DPI must be one of: 72, 150, 300, 600');
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Export canvas to PNG
   */
  async export(
    canvas: FabricCanvas,
    options?: Omit<PNGExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const opts = { ...this.getDefaultOptions(), ...options };

    onProgress?.(0, 'Preparing canvas for export...');

    // Validate options
    const validation = this.validateOptions({ ...opts, format: 'png' });
    if (!validation.valid) {
      throw new Error(`Invalid export options: ${validation.errors.join(', ')}`);
    }

    const dpi = opts.dpi ?? 150;
    const quality = opts.quality ?? 90;
    const transparent = opts.transparent ?? false;
    const scale = DPI_SCALE[dpi];

    onProgress?.(10, 'Capturing canvas state...');

    // Store original canvas state
    const originalBackgroundColor = canvas.backgroundColor;
    const originalZoom = canvas.getZoom();

    try {
      onProgress?.(20, 'Applying DPI scaling...');

      // Set background based on transparency option
      if (transparent) {
        canvas.backgroundColor = 'transparent';
      } else if (!canvas.backgroundColor) {
        canvas.backgroundColor = '#ffffff';
      }

      onProgress?.(40, 'Rendering to canvas...');

      // Generate the data URL with scaling
      // Fabric's toDataURL accepts a multiplier for resolution scaling
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: quality / 100,
        multiplier: scale,
        enableRetinaScaling: false,
      });

      onProgress?.(70, 'Converting to blob...');

      // Convert data URL to Blob
      const blob = await this.dataURLToBlob(dataURL);

      onProgress?.(90, 'Finalizing export...');

      // Generate filename
      const filename = `${opts.filename || 'illustration'}${FILE_EXTENSIONS.png}`;

      onProgress?.(100, 'Export complete');

      return {
        blob,
        filename,
        mimeType: MIME_TYPES.png,
        size: blob.size,
      };
    } finally {
      // Restore original canvas state
      canvas.backgroundColor = originalBackgroundColor;
      canvas.setZoom(originalZoom);
      canvas.renderAll();
    }
  }

  /**
   * Convert a data URL to a Blob
   */
  private async dataURLToBlob(dataURL: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Extract base64 data from data URL
        const parts = dataURL.split(',');
        if (parts.length !== 2) {
          throw new Error('Invalid data URL format');
        }

        const mimeMatch = parts[0].match(/:(.*?);/);
        if (!mimeMatch) {
          throw new Error('Could not extract MIME type from data URL');
        }

        const mimeType = mimeMatch[1];
        const base64Data = parts[1];

        // Decode base64
        const binaryString = atob(base64Data);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);

        for (let i = 0; i < length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        resolve(new Blob([bytes], { type: mimeType }));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Export with high DPI for print quality
   * Convenience method for print-ready exports
   */
  async exportForPrint(
    canvas: FabricCanvas,
    options?: Omit<PNGExportOptions, 'format' | 'dpi'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    return this.export(canvas, { ...options, dpi: 300 }, onProgress);
  }

  /**
   * Export optimized for web
   * Convenience method for web-optimized exports
   */
  async exportForWeb(
    canvas: FabricCanvas,
    options?: Omit<PNGExportOptions, 'format' | 'dpi' | 'quality'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    return this.export(canvas, { ...options, dpi: 72, quality: 85 }, onProgress);
  }

  /**
   * Get the estimated file size for given options
   * This is a rough estimate based on dimensions and quality
   */
  estimateFileSize(
    canvas: FabricCanvas,
    options?: Omit<PNGExportOptions, 'format'>
  ): { min: number; max: number; unit: string } {
    const opts = { ...this.getDefaultOptions(), ...options };
    const scale = DPI_SCALE[opts.dpi ?? 150];

    const width = canvas.getWidth() * scale;
    const height = canvas.getHeight() * scale;
    const pixels = width * height;

    // PNG compression ratio varies widely
    // Estimate based on typical compression ratios
    const bytesPerPixel = opts.transparent ? 4 : 3;
    const rawSize = pixels * bytesPerPixel;

    // PNG typically compresses to 10-50% of raw size
    const compressionRatio = (100 - (opts.quality ?? 90)) / 100 * 0.4 + 0.1;

    const estimatedMin = rawSize * 0.1;
    const estimatedMax = rawSize * (0.5 + compressionRatio);

    // Convert to appropriate unit
    if (estimatedMax > 1024 * 1024) {
      return {
        min: Math.round(estimatedMin / (1024 * 1024) * 10) / 10,
        max: Math.round(estimatedMax / (1024 * 1024) * 10) / 10,
        unit: 'MB',
      };
    }

    return {
      min: Math.round(estimatedMin / 1024),
      max: Math.round(estimatedMax / 1024),
      unit: 'KB',
    };
  }
}

export default PNGExporter;
