/**
 * SVG Exporter
 * Exports Fabric.js canvas to clean, optimized SVG format
 */

import type { Canvas as FabricCanvas } from 'fabric';
import type {
  Exporter,
  SVGExportOptions,
  ExportResult,
  ExportProgressCallback,
} from './types.js';
import { MIME_TYPES, FILE_EXTENSIONS } from './types.js';

/**
 * SVG attributes that can be safely removed for optimization
 */
const REMOVABLE_ATTRIBUTES = [
  'data-fabric-hiddentextarea',
  'xmlns:xlink',
  'xml:space',
];

/**
 * Default namespace declarations for SVG
 */
const SVG_NAMESPACES = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
};

/**
 * SVG Exporter class
 * Handles export of Fabric.js canvas to SVG format
 */
export class SVGExporter implements Exporter<SVGExportOptions> {
  readonly format = 'svg' as const;

  /**
   * Get default export options
   */
  getDefaultOptions(): Omit<SVGExportOptions, 'format'> {
    return {
      optimize: true,
      embedFonts: false,
      preserveViewBox: true,
      minify: false,
      filename: 'illustration',
    };
  }

  /**
   * Validate export options
   */
  validateOptions(_options?: Partial<SVGExportOptions>): { valid: boolean; errors: string[] } {
    // SVG options don't have strict validation requirements
    return { valid: true, errors: [] };
  }

  /**
   * Export canvas to SVG
   */
  async export(
    canvas: FabricCanvas,
    options?: Omit<SVGExportOptions, 'format'>,
    onProgress?: ExportProgressCallback
  ): Promise<ExportResult> {
    const opts = { ...this.getDefaultOptions(), ...options };

    onProgress?.(0, 'Preparing SVG export...');

    // Get raw SVG from Fabric.js
    onProgress?.(20, 'Generating SVG from canvas...');
    let svgContent = canvas.toSVG({
      suppressPreamble: false,
      viewBox: opts.preserveViewBox
        ? {
            x: 0,
            y: 0,
            width: canvas.getWidth(),
            height: canvas.getHeight(),
          }
        : undefined,
      encoding: 'UTF-8',
    });

    // Apply optimizations if requested
    if (opts.optimize) {
      onProgress?.(40, 'Optimizing SVG...');
      svgContent = this.optimizeSVG(svgContent);
    }

    // Embed fonts if requested
    if (opts.embedFonts) {
      onProgress?.(60, 'Embedding fonts...');
      svgContent = await this.embedFonts(svgContent, canvas);
    }

    // Ensure proper namespace declarations
    onProgress?.(70, 'Finalizing SVG...');
    svgContent = this.ensureNamespaces(svgContent);

    // Minify if requested
    if (opts.minify) {
      onProgress?.(80, 'Minifying SVG...');
      svgContent = this.minifySVG(svgContent);
    }

    // Add XML declaration if not present
    if (!svgContent.startsWith('<?xml')) {
      svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgContent;
    }

    onProgress?.(90, 'Creating blob...');

    // Create blob
    const blob = new Blob([svgContent], { type: MIME_TYPES.svg });
    const filename = `${opts.filename || 'illustration'}${FILE_EXTENSIONS.svg}`;

    onProgress?.(100, 'Export complete');

    return {
      blob,
      filename,
      mimeType: MIME_TYPES.svg,
      size: blob.size,
    };
  }

  /**
   * Optimize SVG by removing unnecessary attributes and elements
   */
  private optimizeSVG(svg: string): string {
    let optimized = svg;

    // Remove comments
    optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');

    // Remove empty groups
    optimized = optimized.replace(/<g[^>]*>\s*<\/g>/g, '');

    // Remove unnecessary whitespace in attributes
    optimized = optimized.replace(/\s+=/g, '=');
    optimized = optimized.replace(/=\s+/g, '=');

    // Remove data-* attributes from Fabric.js
    optimized = optimized.replace(/\s*data-[a-z-]+="[^"]*"/gi, '');

    // Remove empty style attributes
    optimized = optimized.replace(/\s*style=""/g, '');

    // Remove empty class attributes
    optimized = optimized.replace(/\s*class=""/g, '');

    // Clean up unnecessary decimals (more than 2 decimal places)
    optimized = optimized.replace(/(\d+\.\d{2})\d+/g, '$1');

    // Remove default attribute values
    optimized = optimized.replace(/\s*opacity="1"/g, '');
    optimized = optimized.replace(/\s*fill-opacity="1"/g, '');
    optimized = optimized.replace(/\s*stroke-opacity="1"/g, '');

    // Remove specific removable attributes
    REMOVABLE_ATTRIBUTES.forEach((attr) => {
      const regex = new RegExp(`\\s*${attr}="[^"]*"`, 'gi');
      optimized = optimized.replace(regex, '');
    });

    // Normalize whitespace
    optimized = optimized.replace(/\n\s*\n/g, '\n');
    optimized = optimized.replace(/>\s+</g, '>\n<');

    return optimized.trim();
  }

  /**
   * Minify SVG by removing all unnecessary whitespace
   */
  private minifySVG(svg: string): string {
    return svg
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/\t/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  /**
   * Ensure proper SVG namespace declarations
   */
  private ensureNamespaces(svg: string): string {
    // Check if xmlns is present
    if (!svg.includes('xmlns=')) {
      svg = svg.replace('<svg', `<svg xmlns="${SVG_NAMESPACES.xmlns}"`);
    }

    return svg;
  }

  /**
   * Embed fonts as SVG paths or base64 encoded font data
   */
  private async embedFonts(svg: string, canvas: FabricCanvas): Promise<string> {
    // Collect unique font families used in the canvas
    const fontFamilies = new Set<string>();
    const objects = canvas.getObjects();

    objects.forEach((obj) => {
      if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
        const textObj = obj as { fontFamily?: string };
        if (textObj.fontFamily) {
          fontFamilies.add(textObj.fontFamily);
        }
      }
    });

    if (fontFamilies.size === 0) {
      return svg;
    }

    // Generate font-face declarations for common web fonts
    const fontFaceDeclarations = this.generateFontFaceDeclarations(Array.from(fontFamilies));

    if (!fontFaceDeclarations) {
      return svg;
    }

    // Insert style block with font-face declarations after opening svg tag
    const styleBlock = `<defs><style type="text/css">\n${fontFaceDeclarations}\n</style></defs>`;

    // Find position after <svg ...> tag
    const svgTagEnd = svg.indexOf('>');
    if (svgTagEnd !== -1) {
      svg = svg.slice(0, svgTagEnd + 1) + '\n' + styleBlock + svg.slice(svgTagEnd + 1);
    }

    return svg;
  }

  /**
   * Generate @font-face declarations for fonts
   * Note: For full font embedding, you'd need access to the font files
   */
  private generateFontFaceDeclarations(fontFamilies: string[]): string {
    // Generate generic font-face declarations
    // In a production environment, you'd want to load actual font data
    const declarations = fontFamilies.map((family) => {
      // Fallback to system fonts for common families
      const fallbacks = this.getFontFallbacks(family);
      return `/* Font: ${family} - Using system fallbacks: ${fallbacks} */`;
    });

    return declarations.join('\n');
  }

  /**
   * Get fallback fonts for a given font family
   */
  private getFontFallbacks(fontFamily: string): string {
    const fallbackMap: Record<string, string> = {
      Arial: 'Helvetica, sans-serif',
      Helvetica: 'Arial, sans-serif',
      'Times New Roman': 'Times, serif',
      Georgia: 'serif',
      Verdana: 'Geneva, sans-serif',
      'Courier New': 'Courier, monospace',
      'Comic Sans MS': 'cursive',
      Impact: 'sans-serif',
      'Trebuchet MS': 'sans-serif',
      'Palatino Linotype': 'Palatino, serif',
    };

    return fallbackMap[fontFamily] || 'sans-serif';
  }

  /**
   * Get SVG as a string (without blob)
   */
  async exportAsString(
    canvas: FabricCanvas,
    options?: Omit<SVGExportOptions, 'format'>
  ): Promise<string> {
    const opts = { ...this.getDefaultOptions(), ...options };

    let svgContent = canvas.toSVG({
      suppressPreamble: false,
      viewBox: opts.preserveViewBox
        ? {
            x: 0,
            y: 0,
            width: canvas.getWidth(),
            height: canvas.getHeight(),
          }
        : undefined,
      encoding: 'UTF-8',
    });

    if (opts.optimize) {
      svgContent = this.optimizeSVG(svgContent);
    }

    if (opts.embedFonts) {
      svgContent = await this.embedFonts(svgContent, canvas);
    }

    svgContent = this.ensureNamespaces(svgContent);

    if (opts.minify) {
      svgContent = this.minifySVG(svgContent);
    }

    if (!svgContent.startsWith('<?xml')) {
      svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgContent;
    }

    return svgContent;
  }

  /**
   * Export as data URL for embedding in HTML
   */
  async exportAsDataURL(
    canvas: FabricCanvas,
    options?: Omit<SVGExportOptions, 'format'>
  ): Promise<string> {
    const svgString = await this.exportAsString(canvas, { ...options, minify: true });
    const encoded = encodeURIComponent(svgString);
    return `data:image/svg+xml,${encoded}`;
  }

  /**
   * Export as base64 data URL
   */
  async exportAsBase64DataURL(
    canvas: FabricCanvas,
    options?: Omit<SVGExportOptions, 'format'>
  ): Promise<string> {
    const svgString = await this.exportAsString(canvas, options);
    const base64 = btoa(unescape(encodeURIComponent(svgString)));
    return `data:image/svg+xml;base64,${base64}`;
  }
}

export default SVGExporter;
