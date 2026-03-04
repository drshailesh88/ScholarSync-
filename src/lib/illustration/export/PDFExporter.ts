/**
 * PDF Exporter
 * Exports Fabric.js canvas to PDF format using pdf-lib
 */

import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import type { Canvas as FabricCanvas, FabricObject } from 'fabric';
import type {
  Exporter,
  PDFExportOptions,
  ExportResult,
  ExportProgressCallback,
} from './types.js';
import { MIME_TYPES, FILE_EXTENSIONS, PAGE_SIZES } from './types.js';

/**
 * PDF Exporter class
 * Handles export of Fabric.js canvas to PDF format
 */
export class PDFExporter implements Exporter<PDFExportOptions> {
  readonly format = 'pdf' as const;

  /**
   * Get default export options
   */
  getDefaultOptions(): Omit<PDFExportOptions, 'format'> {
    return {
      pageSize: 'letter',
      orientation: 'portrait',
      margin: 36, // 0.5 inch margin
      filename: 'illustration',
      title: 'FINNISH Illustration',
      author: '',
      subject: '',
    };
  }

  /**
   * Validate export options
   */
  validateOptions(options?: Partial<PDFExportOptions>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (options?.pageSize === 'custom') {
      if (!options.customWidth || options.customWidth <= 0) {
        errors.push('Custom width must be a positive number');
      }
      if (!options.customHeight || options.customHeight <= 0) {
        errors.push('Custom height must be a positive number');
      }
    }

    if (options?.margin !== undefined && options.margin < 0) {
      errors.push('Margin cannot be negative');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Get page dimensions based on options
   */
  private getPageDimensions(
    options: Omit<PDFExportOptions, 'format'>
  ): { width: number; height: number } {
    let { width, height } = PAGE_SIZES[options.pageSize || 'letter'];

    if (options.pageSize === 'custom') {
      width = options.customWidth || width;
      height = options.customHeight || height;
    }

    // Swap dimensions for landscape
    if (options.orientation === 'landscape') {
      return { width: height, height: width };
    }

    return { width, height };
  }

  /**
   * Export canvas to PDF
   */
  async export(
    canvas: FabricCanvas,
    options?: Omit<PDFExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const opts = { ...this.getDefaultOptions(), ...options };

    onProgress?.(0, 'Initializing PDF document...');

    // Validate options
    const validation = this.validateOptions({ ...opts, format: 'pdf' });
    if (!validation.valid) {
      throw new Error(`Invalid export options: ${validation.errors.join(', ')}`);
    }

    // Create PDF document
    const pdfDoc = await PDFDocument.create();

    // Set metadata
    onProgress?.(10, 'Setting document metadata...');
    pdfDoc.setTitle(opts.title || 'FINNISH Illustration');
    if (opts.author) pdfDoc.setAuthor(opts.author);
    if (opts.subject) pdfDoc.setSubject(opts.subject);
    pdfDoc.setCreator('FINNISH - Scientific Illustration Tool');
    pdfDoc.setProducer('FINNISH Export Pipeline');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    // Get page dimensions
    const { width: pageWidth, height: pageHeight } = this.getPageDimensions(opts);
    const margin = opts.margin ?? 36;

    // Add page
    onProgress?.(20, 'Creating PDF page...');
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate content area
    const contentWidth = pageWidth - 2 * margin;
    const contentHeight = pageHeight - 2 * margin;

    // Get canvas dimensions
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    // Calculate scale to fit content in page
    const scaleX = contentWidth / canvasWidth;
    const scaleY = contentHeight / canvasHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

    // Calculate centered position
    const scaledWidth = canvasWidth * scale;
    const scaledHeight = canvasHeight * scale;
    const offsetX = margin + (contentWidth - scaledWidth) / 2;
    const offsetY = margin + (contentHeight - scaledHeight) / 2;

    onProgress?.(30, 'Rendering canvas to PNG...');

    // Render canvas as high-quality PNG for embedding
    const pngDataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // 2x resolution for better quality
      enableRetinaScaling: false,
    });

    onProgress?.(50, 'Embedding image in PDF...');

    // Embed the PNG in the PDF
    const pngImageBytes = await this.dataURLToBytes(pngDataURL);
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // Draw the image on the page
    // PDF coordinates start from bottom-left, so we need to flip Y
    page.drawImage(pngImage, {
      x: offsetX,
      y: pageHeight - offsetY - scaledHeight, // Flip Y coordinate
      width: scaledWidth,
      height: scaledHeight,
    });

    onProgress?.(80, 'Saving PDF document...');

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    onProgress?.(95, 'Creating blob...');

    // Create blob
    const blob = new Blob([pdfBytes as BlobPart], { type: MIME_TYPES.pdf });
    const filename = `${opts.filename || 'illustration'}${FILE_EXTENSIONS.pdf}`;

    onProgress?.(100, 'Export complete');

    return {
      blob,
      filename,
      mimeType: MIME_TYPES.pdf,
      size: blob.size,
    };
  }

  /**
   * Convert data URL to Uint8Array
   */
  private async dataURLToBytes(dataURL: string): Promise<Uint8Array> {
    const parts = dataURL.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid data URL format');
    }

    const base64Data = parts[1];
    const binaryString = atob(base64Data);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

  /**
   * Export canvas as vector PDF
   * Note: This is a more complex implementation that converts Fabric.js objects to PDF primitives
   */
  async exportAsVector(
    canvas: FabricCanvas,
    options?: Omit<PDFExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const opts = { ...this.getDefaultOptions(), ...options };

    onProgress?.(0, 'Initializing vector PDF export...');

    const pdfDoc = await PDFDocument.create();

    // Set metadata
    pdfDoc.setTitle(opts.title || 'FINNISH Illustration');
    if (opts.author) pdfDoc.setAuthor(opts.author);
    if (opts.subject) pdfDoc.setSubject(opts.subject);
    pdfDoc.setCreator('FINNISH - Scientific Illustration Tool');
    pdfDoc.setProducer('FINNISH Export Pipeline (Vector)');
    pdfDoc.setCreationDate(new Date());

    // Get page dimensions
    const { width: pageWidth, height: pageHeight } = this.getPageDimensions(opts);
    const margin = opts.margin ?? 36;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate content area and scaling
    const contentWidth = pageWidth - 2 * margin;
    const contentHeight = pageHeight - 2 * margin;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const scaleX = contentWidth / canvasWidth;
    const scaleY = contentHeight / canvasHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    const scaledWidth = canvasWidth * scale;
    const scaledHeight = canvasHeight * scale;
    const offsetX = margin + (contentWidth - scaledWidth) / 2;
    const offsetY = margin + (contentHeight - scaledHeight) / 2;

    onProgress?.(20, 'Drawing background...');

    // Draw background if set
    if (canvas.backgroundColor && canvas.backgroundColor !== 'transparent') {
      const bgColor = this.parseColor(canvas.backgroundColor as string);
      page.drawRectangle({
        x: offsetX,
        y: pageHeight - offsetY - scaledHeight,
        width: scaledWidth,
        height: scaledHeight,
        color: bgColor,
      });
    }

    onProgress?.(30, 'Converting objects to PDF...');

    // Get all objects and draw them
    const objects = canvas.getObjects();
    const totalObjects = objects.length;

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      const progress = 30 + (i / totalObjects) * 50;
      onProgress?.(progress, `Drawing object ${i + 1} of ${totalObjects}...`);

      await this.drawObjectToPDF(page, obj, {
        scale,
        offsetX,
        offsetY,
        pageHeight,
        canvasHeight,
        pdfDoc,
      });
    }

    onProgress?.(85, 'Saving PDF document...');

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as BlobPart], { type: MIME_TYPES.pdf });
    const filename = `${opts.filename || 'illustration'}${FILE_EXTENSIONS.pdf}`;

    onProgress?.(100, 'Export complete');

    return {
      blob,
      filename,
      mimeType: MIME_TYPES.pdf,
      size: blob.size,
    };
  }

  /**
   * Draw a Fabric.js object to PDF page
   */
  private async drawObjectToPDF(
    page: PDFPage,
    obj: FabricObject,
    ctx: {
      scale: number;
      offsetX: number;
      offsetY: number;
      pageHeight: number;
      canvasHeight: number;
      pdfDoc: PDFDocument;
    }
  ): Promise<void> {
    const { scale, offsetX, offsetY, pageHeight, canvasHeight } = ctx;

    // Transform coordinates from canvas space to PDF space
    const transformX = (x: number) => offsetX + x * scale;
    const transformY = (y: number) => pageHeight - offsetY - (canvasHeight - y) * scale;

    // Get object properties with defaults
    const left = (obj.left || 0);
    const top = (obj.top || 0);
    const scaleObjX = obj.scaleX || 1;
    const scaleObjY = obj.scaleY || 1;
    const fillColor = obj.fill ? this.parseColor(obj.fill as string) : undefined;
    const strokeColor = obj.stroke ? this.parseColor(obj.stroke as string) : undefined;
    const strokeWidth = (obj.strokeWidth || 0) * scale;
    const opacity = obj.opacity ?? 1;

    switch (obj.type) {
      case 'rect': {
        const rectObj = obj as FabricObject & { width: number; height: number; rx?: number; ry?: number };
        const width = (rectObj.width || 0) * scaleObjX * scale;
        const height = (rectObj.height || 0) * scaleObjY * scale;
        const x = transformX(left);
        const y = transformY(top + rectObj.height * scaleObjY);

        if (fillColor) {
          page.drawRectangle({
            x,
            y,
            width,
            height,
            color: fillColor,
            opacity,
          });
        }

        if (strokeColor && strokeWidth > 0) {
          page.drawRectangle({
            x,
            y,
            width,
            height,
            borderColor: strokeColor,
            borderWidth: strokeWidth,
            opacity,
          });
        }
        break;
      }

      case 'circle': {
        const circleObj = obj as FabricObject & { radius: number };
        const radius = (circleObj.radius || 0) * Math.max(scaleObjX, scaleObjY) * scale;
        const x = transformX(left);
        const y = transformY(top);

        if (fillColor) {
          page.drawCircle({
            x,
            y,
            size: radius,
            color: fillColor,
            opacity,
          });
        }

        if (strokeColor && strokeWidth > 0) {
          page.drawCircle({
            x,
            y,
            size: radius,
            borderColor: strokeColor,
            borderWidth: strokeWidth,
            opacity,
          });
        }
        break;
      }

      case 'ellipse': {
        const ellipseObj = obj as FabricObject & { rx: number; ry: number };
        const rx = (ellipseObj.rx || 0) * scaleObjX * scale;
        const ry = (ellipseObj.ry || 0) * scaleObjY * scale;
        const x = transformX(left);
        const y = transformY(top);

        if (fillColor) {
          page.drawEllipse({
            x,
            y,
            xScale: rx,
            yScale: ry,
            color: fillColor,
            opacity,
          });
        }

        if (strokeColor && strokeWidth > 0) {
          page.drawEllipse({
            x,
            y,
            xScale: rx,
            yScale: ry,
            borderColor: strokeColor,
            borderWidth: strokeWidth,
            opacity,
          });
        }
        break;
      }

      case 'line': {
        const lineObj = obj as FabricObject & { x1: number; y1: number; x2: number; y2: number };
        const x1 = transformX(left + (lineObj.x1 || 0) * scaleObjX);
        const y1 = transformY(top + (lineObj.y1 || 0) * scaleObjY);
        const x2 = transformX(left + (lineObj.x2 || 0) * scaleObjX);
        const y2 = transformY(top + (lineObj.y2 || 0) * scaleObjY);

        if (strokeColor && strokeWidth > 0) {
          page.drawLine({
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 },
            color: strokeColor,
            thickness: strokeWidth,
            opacity,
          });
        }
        break;
      }

      case 'text':
      case 'i-text':
      case 'textbox': {
        const textObj = obj as FabricObject & {
          text: string;
          fontSize: number;
          fontFamily: string;
        };

        // Get standard font (pdf-lib only supports standard fonts without embedding)
        const font = await ctx.pdfDoc.embedFont(StandardFonts.Helvetica);

        const fontSize = (textObj.fontSize || 16) * scale;
        const x = transformX(left);
        const y = transformY(top);

        if (fillColor && textObj.text) {
          page.drawText(textObj.text, {
            x,
            y,
            size: fontSize,
            font,
            color: fillColor,
            opacity,
          });
        }
        break;
      }

      default:
        // For complex objects (paths, groups, images), fall back to rasterization
        // This would require more complex handling
        console.warn(`Unsupported object type for vector PDF: ${obj.type}`);
        break;
    }
  }

  /**
   * Parse a color string to pdf-lib RGB color
   */
  private parseColor(color: string): ReturnType<typeof rgb> {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      let r: number, g: number, b: number;

      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16) / 255;
        g = parseInt(hex[1] + hex[1], 16) / 255;
        b = parseInt(hex[2] + hex[2], 16) / 255;
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16) / 255;
        g = parseInt(hex.slice(2, 4), 16) / 255;
        b = parseInt(hex.slice(4, 6), 16) / 255;
      } else {
        return rgb(0, 0, 0);
      }

      return rgb(r, g, b);
    }

    // Handle rgb/rgba colors
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      return rgb(
        parseInt(rgbMatch[1]) / 255,
        parseInt(rgbMatch[2]) / 255,
        parseInt(rgbMatch[3]) / 255
      );
    }

    // Handle named colors (basic set)
    const namedColors: Record<string, [number, number, number]> = {
      black: [0, 0, 0],
      white: [1, 1, 1],
      red: [1, 0, 0],
      green: [0, 0.5, 0],
      blue: [0, 0, 1],
      yellow: [1, 1, 0],
      cyan: [0, 1, 1],
      magenta: [1, 0, 1],
      gray: [0.5, 0.5, 0.5],
      grey: [0.5, 0.5, 0.5],
      transparent: [0, 0, 0],
    };

    const named = namedColors[color.toLowerCase()];
    if (named) {
      return rgb(named[0], named[1], named[2]);
    }

    // Default to black
    return rgb(0, 0, 0);
  }

  /**
   * Get estimated page count for multi-page export
   */
  estimatePageCount(
    _canvas: FabricCanvas,
    _options?: Omit<PDFExportOptions, 'format'>
  ): number {
    // Currently we only support single-page export
    // This could be extended to support tiling large canvases across multiple pages
    return 1;
  }
}

export default PDFExporter;
