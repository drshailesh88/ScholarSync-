/**
 * Image Import Service
 * Handles importing raster images (PNG, JPEG, GIF) into the canvas.
 *
 * Features:
 * - Handles PNG, JPEG, GIF formats
 * - Creates fabric.Image objects
 * - Optionally traces to vector using potrace
 * - Handles large images with automatic resizing
 * - Progress callbacks for long operations
 */

import * as fabric from 'fabric';
import type { Object as FabricObject } from 'fabric';
import {
  type ImportResult,
  type ImageImportOptions,
  type ImportProgressCallback,
  type ImportProgress,
  type ImportType,
  ImportError,
  DEFAULT_IMAGE_OPTIONS,
  MAX_FILE_SIZES,
  SUPPORTED_MIME_TYPES,
} from './types.js';
import { ImageTracer } from './ImageTracer.js';

/** Supported image MIME types */
const SUPPORTED_IMAGE_TYPES = [
  ...SUPPORTED_MIME_TYPES.png,
  ...SUPPORTED_MIME_TYPES.jpeg,
  ...SUPPORTED_MIME_TYPES.gif,
];

export class ImageImporter {
  private options: Required<ImageImportOptions>;
  private warnings: string[] = [];
  private progressCallback?: ImportProgressCallback;
  private imageTracer: ImageTracer;

  constructor(options: ImageImportOptions = {}) {
    this.options = { ...DEFAULT_IMAGE_OPTIONS, ...options };
    this.imageTracer = new ImageTracer(this.options.tracingOptions);
  }

  /**
   * Import image from a File object
   */
  async importFromFile(
    file: File,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    this.progressCallback = onProgress;
    this.reset();

    // Validate file type
    const imageType = this.getImageType(file);
    if (!imageType) {
      throw new ImportError(
        `Invalid file type: ${file.type}. Supported types: PNG, JPEG, GIF`,
        'INVALID_FILE_TYPE'
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZES.image) {
      throw new ImportError(
        `File too large: ${(file.size / 1024 / 1024).toFixed(2)} MB. Maximum allowed: ${MAX_FILE_SIZES.image / 1024 / 1024} MB`,
        'FILE_TOO_LARGE',
        undefined,
        { fileSize: file.size, maxSize: MAX_FILE_SIZES.image }
      );
    }

    this.reportProgress('reading', 10, 'Reading file...');

    try {
      const dataUrl = await this.readFileAsDataURL(file);
      const result = await this.importFromDataURL(dataUrl, imageType);
      result.fileName = file.name;
      result.fileSize = file.size;
      return result;
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to read image file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PARSE_ERROR',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Import image from a URL
   */
  async importFromURL(
    url: string,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    this.progressCallback = onProgress;
    this.reset();

    this.reportProgress('reading', 5, 'Fetching image from URL...');

    try {
      // Fetch the image to determine its type
      const response = await fetch(url);
      if (!response.ok) {
        throw new ImportError(
          `Failed to fetch image: ${response.status} ${response.statusText}`,
          'NETWORK_ERROR',
          undefined,
          { url, status: response.status }
        );
      }

      const contentType = response.headers.get('content-type') || '';
      const imageType = this.getMimeTypeAsImportType(contentType);
      if (!imageType) {
        throw new ImportError(
          `Unsupported image type: ${contentType}`,
          'UNSUPPORTED_FORMAT',
          undefined,
          { url, contentType }
        );
      }

      this.reportProgress('reading', 20, 'Loading image...');

      // Load the image directly
      const img = await this.loadImage(url);

      this.reportProgress('converting', 50, 'Processing image...');

      const result = await this.processImage(img, imageType);
      result.fileName = this.extractFileNameFromURL(url);
      return result;
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to fetch image from URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'NETWORK_ERROR',
        error instanceof Error ? error : undefined,
        { url }
      );
    }
  }

  /**
   * Import image from a data URL
   */
  async importFromDataURL(
    dataUrl: string,
    type?: ImportType,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    if (onProgress) {
      this.progressCallback = onProgress;
    }
    this.reset();

    // Determine type from data URL if not provided
    const imageType = type || this.getTypeFromDataURL(dataUrl);
    if (!imageType) {
      throw new ImportError(
        'Could not determine image type from data URL',
        'UNSUPPORTED_FORMAT'
      );
    }

    this.reportProgress('converting', 30, 'Loading image...');

    try {
      const img = await this.loadImage(dataUrl);
      return await this.processImage(img, imageType);
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'CONVERSION_ERROR',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Import image from a Blob
   */
  async importFromBlob(
    blob: Blob,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    this.progressCallback = onProgress;
    this.reset();

    const imageType = this.getMimeTypeAsImportType(blob.type);
    if (!imageType) {
      throw new ImportError(
        `Unsupported image type: ${blob.type}`,
        'UNSUPPORTED_FORMAT'
      );
    }

    this.reportProgress('reading', 10, 'Reading image data...');

    try {
      const dataUrl = await this.blobToDataURL(blob);
      return await this.importFromDataURL(dataUrl, imageType);
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to read image blob: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PARSE_ERROR',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Process a loaded image
   */
  private async processImage(
    img: HTMLImageElement,
    type: ImportType
  ): Promise<ImportResult> {
    const originalWidth = img.naturalWidth || img.width;
    const originalHeight = img.naturalHeight || img.height;
    const dimensions = { width: originalWidth, height: originalHeight };

    // Check if resizing is needed
    const needsResize = this.needsResize(originalWidth, originalHeight);
    let processedImg = img;

    if (needsResize) {
      this.reportProgress('converting', 60, 'Resizing large image...');
      processedImg = await this.resizeImage(img);
      this.warnings.push(
        `Image was resized from ${originalWidth}x${originalHeight} to ${processedImg.width}x${processedImg.height}`
      );
    }

    this.reportProgress('converting', 70, 'Creating canvas object...');

    let objects: FabricObject[];

    if (this.options.traceToVector) {
      this.reportProgress('tracing', 75, 'Tracing image to vector...');
      objects = await this.traceImage(processedImg);
    } else {
      objects = [await this.createFabricImage(processedImg)];
    }

    // Apply options
    objects = this.applyOptions(objects, dimensions);

    this.reportProgress('finalizing', 100, 'Import complete');

    return {
      type,
      objects,
      warnings: [...this.warnings],
      dimensions,
    };
  }

  /**
   * Create a Fabric.js Image object
   */
  private async createFabricImage(img: HTMLImageElement): Promise<fabric.FabricImage> {
    const options: Record<string, unknown> = {};

    // Set crossOrigin for images loaded from URLs
    if (img.crossOrigin) {
      options.crossOrigin = img.crossOrigin;
    }

    return new fabric.FabricImage(img, options as fabric.TOptions<fabric.ImageProps>);
  }

  /**
   * Trace image to vector paths using potrace
   */
  private async traceImage(img: HTMLImageElement): Promise<FabricObject[]> {
    try {
      const result = await this.imageTracer.trace(img, (progress) => {
        // Remap tracing progress to our overall progress (75-95%)
        const mappedPercent = 75 + (progress.percent * 0.2);
        this.reportProgress('tracing', mappedPercent, progress.message);
      });

      if (result.warnings.length > 0) {
        this.warnings.push(...result.warnings);
      }

      return result.objects;
    } catch (error) {
      this.warnings.push(
        `Tracing failed: ${error instanceof Error ? error.message : 'Unknown error'}. Falling back to raster image.`
      );
      return [await this.createFabricImage(img)];
    }
  }

  /**
   * Check if image needs resizing
   */
  private needsResize(width: number, height: number): boolean {
    const maxDim = this.options.maxDimension;
    return width > maxDim || height > maxDim;
  }

  /**
   * Resize image to fit within maxDimension
   */
  private async resizeImage(img: HTMLImageElement): Promise<HTMLImageElement> {
    const maxDim = this.options.maxDimension;
    const { width, height } = img;

    // Calculate new dimensions
    let newWidth: number;
    let newHeight: number;

    if (width > height) {
      newWidth = maxDim;
      newHeight = Math.round((height / width) * maxDim);
    } else {
      newHeight = maxDim;
      newWidth = Math.round((width / height) * maxDim);
    }

    // Create canvas for resizing
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new ImportError('Failed to get canvas context for resizing', 'CONVERSION_ERROR');
    }

    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw resized image
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // Convert back to image
    return new Promise((resolve, reject) => {
      const newImg = new Image();
      newImg.onload = () => resolve(newImg);
      newImg.onerror = () => reject(new Error('Failed to create resized image'));
      newImg.src = canvas.toDataURL('image/png', this.options.quality);
    });
  }

  /**
   * Apply import options to the created objects
   */
  private applyOptions(
    objects: FabricObject[],
    _dimensions: { width: number; height: number }
  ): FabricObject[] {
    if (objects.length === 0) {
      return objects;
    }

    // Apply scale
    if (this.options.scale !== 1) {
      for (const obj of objects) {
        obj.scaleX = (obj.scaleX || 1) * this.options.scale;
        obj.scaleY = (obj.scaleY || 1) * this.options.scale;
      }
    }

    // Apply position
    if (!this.options.centerOnCanvas && this.options.position) {
      const { x, y } = this.options.position;
      for (const obj of objects) {
        obj.left = x;
        obj.top = y;
      }
    }

    return objects;
  }

  /**
   * Reset internal state for a new import
   */
  private reset(): void {
    this.warnings = [];
  }

  /**
   * Report progress to callback if provided
   */
  private reportProgress(
    stage: ImportProgress['stage'],
    percent: number,
    message: string
  ): void {
    if (this.progressCallback) {
      this.progressCallback({ stage, percent, message });
    }
  }

  /**
   * Get the import type from a File
   */
  private getImageType(file: File): ImportType | null {
    const mimeType = file.type.toLowerCase();
    return this.getMimeTypeAsImportType(mimeType);
  }

  /**
   * Convert MIME type to ImportType
   */
  private getMimeTypeAsImportType(mimeType: string): ImportType | null {
    const normalized = mimeType.toLowerCase();

    if (SUPPORTED_MIME_TYPES.png.includes(normalized as 'image/png')) {
      return 'png';
    }
    if (SUPPORTED_MIME_TYPES.jpeg.includes(normalized as 'image/jpeg' | 'image/jpg')) {
      return 'jpeg';
    }
    if (SUPPORTED_MIME_TYPES.gif.includes(normalized as 'image/gif')) {
      return 'gif';
    }

    // Check by common variations
    if (normalized.includes('png')) return 'png';
    if (normalized.includes('jpeg') || normalized.includes('jpg')) return 'jpeg';
    if (normalized.includes('gif')) return 'gif';

    return null;
  }

  /**
   * Get import type from data URL
   */
  private getTypeFromDataURL(dataUrl: string): ImportType | null {
    const match = dataUrl.match(/^data:([^;,]+)/);
    if (!match) return null;
    return this.getMimeTypeAsImportType(match[1]);
  }

  /**
   * Read file as data URL
   */
  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Convert Blob to data URL
   */
  private blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read blob'));
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Load an image from URL or data URI
   */
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src.substring(0, 100)}...`));
      img.src = src;
    });
  }

  /**
   * Extract file name from URL
   */
  private extractFileNameFromURL(url: string): string {
    try {
      const pathname = new URL(url).pathname;
      const segments = pathname.split('/');
      return segments[segments.length - 1] || 'imported-image';
    } catch {
      return 'imported-image';
    }
  }

  /**
   * Check if a MIME type is supported
   */
  static isSupported(mimeType: string): boolean {
    return SUPPORTED_IMAGE_TYPES.includes(mimeType.toLowerCase() as typeof SUPPORTED_IMAGE_TYPES[number]);
  }

  /**
   * Get list of supported MIME types
   */
  static getSupportedTypes(): string[] {
    return [...SUPPORTED_IMAGE_TYPES];
  }
}

export default ImageImporter;
