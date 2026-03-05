/**
 * SVG Import Service
 * Parses SVG files and converts them to Fabric.js objects.
 *
 * Features:
 * - Parses SVG string or file
 * - Converts SVG elements to Fabric.js objects
 * - Preserves groups and layers
 * - Handles text elements (keeps editable when possible)
 * - Handles missing fonts gracefully
 * - Uses svg-parser for initial parsing
 */

import { parse as parseSVG, type RootNode, type ElementNode, type TextNode } from 'svg-parser';
import * as fabric from 'fabric';
import type { Object as FabricObject } from 'fabric';
import {
  type ImportResult,
  type SVGImportOptions,
  type ImportProgressCallback,
  type ImportProgress,
  ImportError,
  DEFAULT_SVG_OPTIONS,
  MAX_FILE_SIZES,
  SUPPORTED_MIME_TYPES,
} from './types';

/** System fonts available for fallback */
const SYSTEM_FONTS = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'monospace',
  'sans-serif',
  'serif',
];

/** Default fallback font */
const DEFAULT_FALLBACK_FONT = 'Arial';

/** SVG attribute to Fabric.js property mapping */
const SVG_TO_FABRIC_PROPS: Record<string, string> = {
  'fill': 'fill',
  'stroke': 'stroke',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLineCap',
  'stroke-linejoin': 'strokeLineJoin',
  'stroke-dasharray': 'strokeDashArray',
  'stroke-dashoffset': 'strokeDashOffset',
  'stroke-miterlimit': 'strokeMiterLimit',
  'opacity': 'opacity',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
  'text-anchor': 'textAlign',
  'text-decoration': 'textDecoration',
};

export class SVGImporter {
  private options: Required<SVGImportOptions>;
  private warnings: string[] = [];
  private usedFonts: Set<string> = new Set();
  private missingFonts: Set<string> = new Set();
  private progressCallback?: ImportProgressCallback;

  constructor(options: SVGImportOptions = {}) {
    this.options = { ...DEFAULT_SVG_OPTIONS, ...options };
  }

  /**
   * Import SVG from a File object
   */
  async importFromFile(
    file: File,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    this.progressCallback = onProgress;
    this.reset();

    // Validate file type
    if (!this.isValidSVGFile(file)) {
      throw new ImportError(
        `Invalid file type: ${file.type}. Expected SVG file.`,
        'INVALID_FILE_TYPE'
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZES.svg) {
      throw new ImportError(
        `File too large: ${(file.size / 1024 / 1024).toFixed(2)} MB. Maximum allowed: ${MAX_FILE_SIZES.svg / 1024 / 1024} MB`,
        'FILE_TOO_LARGE',
        undefined,
        { fileSize: file.size, maxSize: MAX_FILE_SIZES.svg }
      );
    }

    this.reportProgress('reading', 10, 'Reading file...');

    try {
      const svgString = await this.readFileAsText(file);
      const result = await this.importFromString(svgString);
      result.fileName = file.name;
      result.fileSize = file.size;
      return result;
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to read SVG file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PARSE_ERROR',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Import SVG from a URL
   */
  async importFromURL(
    url: string,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    this.progressCallback = onProgress;
    this.reset();

    this.reportProgress('reading', 5, 'Fetching SVG from URL...');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new ImportError(
          `Failed to fetch SVG: ${response.status} ${response.statusText}`,
          'NETWORK_ERROR',
          undefined,
          { url, status: response.status }
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('svg') && !contentType.includes('xml')) {
        this.warnings.push(`Unexpected content type: ${contentType}. Attempting to parse as SVG anyway.`);
      }

      this.reportProgress('reading', 20, 'Reading response...');
      const svgString = await response.text();

      const result = await this.importFromString(svgString);
      result.fileName = this.extractFileNameFromURL(url);
      return result;
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to fetch SVG from URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'NETWORK_ERROR',
        error instanceof Error ? error : undefined,
        { url }
      );
    }
  }

  /**
   * Import SVG from a string
   */
  async importFromString(
    svgString: string,
    onProgress?: ImportProgressCallback
  ): Promise<ImportResult> {
    if (onProgress) {
      this.progressCallback = onProgress;
    }
    this.reset();

    this.reportProgress('parsing', 30, 'Parsing SVG...');

    // Clean and validate SVG string
    const cleanedSVG = this.cleanSVGString(svgString);
    if (!this.isValidSVGString(cleanedSVG)) {
      throw new ImportError(
        'Invalid SVG content: No valid SVG element found',
        'PARSE_ERROR'
      );
    }

    try {
      // Parse SVG using svg-parser
      const parsed = parseSVG(cleanedSVG) as RootNode;

      this.reportProgress('converting', 50, 'Converting to Fabric objects...');

      // Extract dimensions
      const dimensions = this.extractDimensions(parsed);

      // Convert to Fabric.js objects
      const objects = await this.convertToFabricObjects(parsed);

      this.reportProgress('finalizing', 90, 'Finalizing import...');

      // Apply options
      const processedObjects = this.applyOptions(objects, dimensions);

      // Add font warnings
      if (this.missingFonts.size > 0) {
        this.warnings.push(
          `Missing fonts replaced with fallback: ${Array.from(this.missingFonts).join(', ')}`
        );
      }

      this.reportProgress('finalizing', 100, 'Import complete');

      return {
        type: 'svg',
        objects: processedObjects,
        warnings: [...this.warnings],
        dimensions,
      };
    } catch (error) {
      if (error instanceof ImportError) {
        throw error;
      }
      throw new ImportError(
        `Failed to parse SVG: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PARSE_ERROR',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Reset internal state for a new import
   */
  private reset(): void {
    this.warnings = [];
    this.usedFonts.clear();
    this.missingFonts.clear();
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
   * Validate if file is a valid SVG file
   */
  private isValidSVGFile(file: File): boolean {
    const validTypes = SUPPORTED_MIME_TYPES.svg;
    if (validTypes.includes(file.type as 'image/svg+xml')) {
      return true;
    }
    // Also check by extension for files with incorrect MIME type
    return file.name.toLowerCase().endsWith('.svg') || file.name.toLowerCase().endsWith('.svgz');
  }

  /**
   * Validate if string contains valid SVG
   */
  private isValidSVGString(str: string): boolean {
    return /<svg[^>]*>/i.test(str);
  }

  /**
   * Clean SVG string for parsing
   */
  private cleanSVGString(svg: string): string {
    // Remove XML declaration if present
    let cleaned = svg.replace(/<\?xml[^?]*\?>/gi, '');
    // Remove DOCTYPE if present
    cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '');
    // Remove comments
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
    // Trim whitespace
    cleaned = cleaned.trim();
    return cleaned;
  }

  /**
   * Read file as text
   */
  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Extract file name from URL
   */
  private extractFileNameFromURL(url: string): string {
    try {
      const pathname = new URL(url).pathname;
      const segments = pathname.split('/');
      return segments[segments.length - 1] || 'imported.svg';
    } catch {
      return 'imported.svg';
    }
  }

  /**
   * Extract dimensions from parsed SVG
   */
  private extractDimensions(parsed: RootNode): { width: number; height: number } {
    const svgElement = this.findSVGElement(parsed);
    if (!svgElement) {
      return { width: 100, height: 100 };
    }

    const props = svgElement.properties || {};

    // Try to get from width/height attributes
    let width = this.parseLength(props.width as string | number | undefined);
    let height = this.parseLength(props.height as string | number | undefined);

    // Try to get from viewBox
    if ((!width || !height) && props.viewBox) {
      const viewBox = String(props.viewBox).split(/[\s,]+/).map(Number);
      if (viewBox.length === 4) {
        width = width || viewBox[2];
        height = height || viewBox[3];
      }
    }

    return {
      width: width || 100,
      height: height || 100,
    };
  }

  /**
   * Parse length value (handles units)
   */
  private parseLength(value: string | number | undefined): number {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;

    const num = parseFloat(value);
    if (isNaN(num)) return 0;

    // Handle different units
    if (value.endsWith('px')) return num;
    if (value.endsWith('pt')) return num * 1.333333;
    if (value.endsWith('em')) return num * 16;
    if (value.endsWith('rem')) return num * 16;
    if (value.endsWith('in')) return num * 96;
    if (value.endsWith('cm')) return num * 37.795275591;
    if (value.endsWith('mm')) return num * 3.7795275591;
    if (value.endsWith('%')) return num; // Percentage handling depends on context

    return num;
  }

  /**
   * Find the SVG element in parsed tree
   */
  private findSVGElement(parsed: RootNode): ElementNode | null {
    for (const child of parsed.children) {
      if (child.type === 'element' && child.tagName === 'svg') {
        return child;
      }
    }
    return null;
  }

  /**
   * Convert parsed SVG to Fabric.js objects
   */
  private async convertToFabricObjects(parsed: RootNode): Promise<FabricObject[]> {
    const svgElement = this.findSVGElement(parsed);
    if (!svgElement) {
      throw new ImportError('No SVG element found', 'PARSE_ERROR');
    }

    const objects: FabricObject[] = [];
    const inheritedStyles = this.extractStyles(svgElement);

    for (const child of svgElement.children) {
      if (child.type === 'element') {
        const fabricObjects = await this.convertElement(child, inheritedStyles);
        objects.push(...fabricObjects);
      }
    }

    return objects;
  }

  /**
   * Convert a single SVG element to Fabric.js object(s)
   */
  private async convertElement(
    element: ElementNode,
    inheritedStyles: Record<string, string | number>
  ): Promise<FabricObject[]> {
    const styles = { ...inheritedStyles, ...this.extractStyles(element) };
    const props = element.properties || {};

    switch (element.tagName) {
      case 'rect':
        return [this.createRect(props, styles)];
      case 'circle':
        return [this.createCircle(props, styles)];
      case 'ellipse':
        return [this.createEllipse(props, styles)];
      case 'line':
        return [this.createLine(props, styles)];
      case 'polyline':
        return [this.createPolyline(props, styles)];
      case 'polygon':
        return [this.createPolygon(props, styles)];
      case 'path':
        return [this.createPath(props, styles)];
      case 'text':
        return [this.createText(element, styles)];
      case 'image':
        return [await this.createImage(props, styles)];
      case 'g':
        return this.createGroup(element, styles);
      case 'defs':
      case 'style':
      case 'clipPath':
      case 'mask':
      case 'linearGradient':
      case 'radialGradient':
      case 'pattern':
        // Skip definitions - they are referenced elsewhere
        return [];
      case 'use':
        this.warnings.push('SVG <use> elements are not fully supported and may not render correctly');
        return [];
      default:
        this.warnings.push(`Unsupported SVG element: <${element.tagName}>`);
        return [];
    }
  }

  /**
   * Extract styles from SVG element
   */
  private extractStyles(element: ElementNode): Record<string, string | number> {
    const styles: Record<string, string | number> = {};
    const props = element.properties || {};

    // Extract from attributes
    for (const [attr, value] of Object.entries(props)) {
      if (attr === 'style') {
        // Parse inline style
        const styleStr = String(value);
        const styleParts = styleStr.split(';');
        for (const part of styleParts) {
          const [key, val] = part.split(':').map(s => s.trim());
          if (key && val) {
            styles[key] = val;
          }
        }
      } else if (SVG_TO_FABRIC_PROPS[attr]) {
        styles[attr] = value as string | number;
      }
    }

    return styles;
  }

  /**
   * Apply styles to Fabric.js object options
   */
  private applyStyles(
    options: Record<string, unknown>,
    styles: Record<string, string | number>
  ): void {
    for (const [svgProp, value] of Object.entries(styles)) {
      const fabricProp = SVG_TO_FABRIC_PROPS[svgProp];
      if (fabricProp && value !== undefined) {
        if (svgProp === 'stroke-dasharray' && typeof value === 'string') {
          options[fabricProp] = value.split(/[\s,]+/).map(Number);
        } else if (svgProp === 'text-anchor') {
          // Convert SVG text-anchor to Fabric.js textAlign
          const anchorMap: Record<string, string> = {
            'start': 'left',
            'middle': 'center',
            'end': 'right',
          };
          options[fabricProp] = anchorMap[value as string] || 'left';
        } else if (svgProp === 'font-family') {
          options[fabricProp] = this.processFontFamily(String(value));
        } else if (typeof value === 'string' && !isNaN(Number(value))) {
          options[fabricProp] = Number(value);
        } else {
          options[fabricProp] = value;
        }
      }
    }

    // Handle fill="none"
    if (styles.fill === 'none') {
      options.fill = null;
    }
    // Handle stroke="none"
    if (styles.stroke === 'none') {
      options.stroke = null;
    }
  }

  /**
   * Process font family and handle missing fonts
   */
  private processFontFamily(fontFamily: string): string {
    // Split font stack
    const fonts = fontFamily.split(',').map(f => f.trim().replace(/['"]/g, ''));

    for (const font of fonts) {
      this.usedFonts.add(font);

      // Check if font is a system font or generic family
      if (SYSTEM_FONTS.some(sf => sf.toLowerCase() === font.toLowerCase())) {
        return font;
      }
    }

    // Use font replacement if available
    for (const font of fonts) {
      if (this.options.fontReplacements[font]) {
        return this.options.fontReplacements[font];
      }
    }

    // Mark as missing and use fallback
    this.missingFonts.add(fonts[0]);
    return DEFAULT_FALLBACK_FONT;
  }

  /**
   * Create a Fabric.js Rect
   */
  private createRect(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Rect {
    const options: Record<string, unknown> = {
      left: this.parseLength(props.x as string | number),
      top: this.parseLength(props.y as string | number),
      width: this.parseLength(props.width as string | number) || 100,
      height: this.parseLength(props.height as string | number) || 100,
      rx: this.parseLength(props.rx as string | number) || 0,
      ry: this.parseLength(props.ry as string | number) || 0,
    };

    this.applyStyles(options, styles);

    return new fabric.Rect(options as fabric.TOptions<fabric.RectProps>);
  }

  /**
   * Create a Fabric.js Circle
   */
  private createCircle(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Circle {
    const r = this.parseLength(props.r as string | number) || 50;
    const options: Record<string, unknown> = {
      left: this.parseLength(props.cx as string | number) - r,
      top: this.parseLength(props.cy as string | number) - r,
      radius: r,
    };

    this.applyStyles(options, styles);

    return new fabric.Circle(options as fabric.TOptions<fabric.CircleProps>);
  }

  /**
   * Create a Fabric.js Ellipse
   */
  private createEllipse(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Ellipse {
    const rx = this.parseLength(props.rx as string | number) || 50;
    const ry = this.parseLength(props.ry as string | number) || 30;
    const options: Record<string, unknown> = {
      left: this.parseLength(props.cx as string | number) - rx,
      top: this.parseLength(props.cy as string | number) - ry,
      rx,
      ry,
    };

    this.applyStyles(options, styles);

    return new fabric.Ellipse(options as fabric.TOptions<fabric.EllipseProps>);
  }

  /**
   * Create a Fabric.js Line
   */
  private createLine(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Line {
    const coords: [number, number, number, number] = [
      this.parseLength(props.x1 as string | number),
      this.parseLength(props.y1 as string | number),
      this.parseLength(props.x2 as string | number),
      this.parseLength(props.y2 as string | number),
    ];

    const options: Record<string, unknown> = {};
    this.applyStyles(options, styles);

    // Lines default to no fill
    if (options.fill === undefined) {
      options.fill = null;
    }

    return new fabric.Line(coords, options as fabric.TOptions<fabric.FabricObjectProps>);
  }

  /**
   * Create a Fabric.js Polyline
   */
  private createPolyline(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Polyline {
    const points = this.parsePoints(props.points as string);
    const options: Record<string, unknown> = {};

    this.applyStyles(options, styles);

    // Polylines default to no fill
    if (options.fill === undefined) {
      options.fill = null;
    }

    return new fabric.Polyline(points, options as fabric.TOptions<fabric.FabricObjectProps>);
  }

  /**
   * Create a Fabric.js Polygon
   */
  private createPolygon(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Polygon {
    const points = this.parsePoints(props.points as string);
    const options: Record<string, unknown> = {};

    this.applyStyles(options, styles);

    return new fabric.Polygon(points, options as fabric.TOptions<fabric.FabricObjectProps>);
  }

  /**
   * Parse SVG points string to array of Point objects
   */
  private parsePoints(pointsStr: string): Array<{ x: number; y: number }> {
    if (!pointsStr) return [];

    const numbers = pointsStr.trim().split(/[\s,]+/).map(Number);
    const points: Array<{ x: number; y: number }> = [];

    for (let i = 0; i < numbers.length; i += 2) {
      if (i + 1 < numbers.length) {
        points.push({ x: numbers[i], y: numbers[i + 1] });
      }
    }

    return points;
  }

  /**
   * Create a Fabric.js Path
   */
  private createPath(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): fabric.Path {
    const d = (props.d as string) || '';
    const options: Record<string, unknown> = {};

    this.applyStyles(options, styles);

    return new fabric.Path(d, options as fabric.TOptions<fabric.PathProps>);
  }

  /**
   * Create a Fabric.js Text object
   */
  private createText(
    element: ElementNode,
    styles: Record<string, string | number>
  ): fabric.IText {
    const props = element.properties || {};
    const textContent = this.extractTextContent(element);

    const options: Record<string, unknown> = {
      left: this.parseLength(props.x as string | number),
      top: this.parseLength(props.y as string | number),
      fontFamily: DEFAULT_FALLBACK_FONT,
      fontSize: 16,
    };

    this.applyStyles(options, styles);

    // Convert text to editable IText
    return new fabric.IText(textContent, options as fabric.TOptions<fabric.ITextProps>);
  }

  /**
   * Extract text content from text element (including tspan children)
   */
  private extractTextContent(element: ElementNode): string {
    let text = '';

    for (const child of element.children) {
      if (child.type === 'text') {
        text += (child as TextNode).value || '';
      } else if (child.type === 'element' && child.tagName === 'tspan') {
        text += this.extractTextContent(child);
      }
    }

    return text.trim();
  }

  /**
   * Create a Fabric.js Image
   */
  private async createImage(
    props: Record<string, unknown>,
    styles: Record<string, string | number>
  ): Promise<fabric.FabricImage> {
    const href = (props.href || props['xlink:href']) as string;

    if (!href) {
      this.warnings.push('Image element without href/xlink:href attribute');
      // Return a placeholder rectangle
      return new fabric.FabricImage(new Image(), {
        left: this.parseLength(props.x as string | number),
        top: this.parseLength(props.y as string | number),
        width: this.parseLength(props.width as string | number) || 100,
        height: this.parseLength(props.height as string | number) || 100,
      });
    }

    try {
      const img = await this.loadImage(href);
      const options: Record<string, unknown> = {
        left: this.parseLength(props.x as string | number),
        top: this.parseLength(props.y as string | number),
      };

      const width = this.parseLength(props.width as string | number);
      const height = this.parseLength(props.height as string | number);

      if (width) options.width = width;
      if (height) options.height = height;

      this.applyStyles(options, styles);

      return new fabric.FabricImage(img, options as fabric.TOptions<fabric.ImageProps>);
    } catch {
      this.warnings.push(`Failed to load image: ${href}`);
      // Return a placeholder
      return new fabric.FabricImage(new Image(), {
        left: this.parseLength(props.x as string | number),
        top: this.parseLength(props.y as string | number),
        width: this.parseLength(props.width as string | number) || 100,
        height: this.parseLength(props.height as string | number) || 100,
      });
    }
  }

  /**
   * Load an image from URL or data URI
   */
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  /**
   * Create a Fabric.js Group
   */
  private async createGroup(
    element: ElementNode,
    styles: Record<string, string | number>
  ): Promise<FabricObject[]> {
    const childObjects: FabricObject[] = [];

    for (const child of element.children) {
      if (child.type === 'element') {
        const objects = await this.convertElement(child, styles);
        childObjects.push(...objects);
      }
    }

    if (childObjects.length === 0) {
      return [];
    }

    if (!this.options.preserveGroups || this.options.flattenGroups) {
      return childObjects;
    }

    const props = element.properties || {};
    const options: Record<string, unknown> = {};

    // Apply transform if present
    if (props.transform) {
      options.transformMatrix = this.parseTransform(props.transform as string);
    }

    this.applyStyles(options, styles);

    const group = new fabric.Group(childObjects, options as fabric.TOptions<fabric.GroupProps>);

    // Preserve group ID if present
    if (props.id) {
      (group as FabricObject & { id?: string }).id = props.id as string;
    }

    return [group];
  }

  /**
   * Parse SVG transform attribute
   */
  private parseTransform(transform: string): number[] | undefined {
    // Basic transform parsing - returns matrix if possible
    // For complex transforms, Fabric.js handles them differently
    const matrixMatch = transform.match(/matrix\(([^)]+)\)/);
    if (matrixMatch) {
      return matrixMatch[1].split(/[\s,]+/).map(Number);
    }

    // For other transforms, let Fabric.js handle them
    return undefined;
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

    // Apply position or center
    if (this.options.centerOnCanvas) {
      // Objects will be centered by the canvas after import
      // Just ensure they're grouped properly
    } else if (this.options.position) {
      const { x, y } = this.options.position;
      const bounds = this.calculateBounds(objects);
      const offsetX = x - bounds.left;
      const offsetY = y - bounds.top;

      for (const obj of objects) {
        obj.left = (obj.left || 0) + offsetX;
        obj.top = (obj.top || 0) + offsetY;
      }
    }

    return objects;
  }

  /**
   * Calculate bounding box of multiple objects
   */
  private calculateBounds(objects: FabricObject[]): {
    left: number;
    top: number;
    width: number;
    height: number;
  } {
    if (objects.length === 0) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const obj of objects) {
      const bound = obj.getBoundingRect();
      minX = Math.min(minX, bound.left);
      minY = Math.min(minY, bound.top);
      maxX = Math.max(maxX, bound.left + bound.width);
      maxY = Math.max(maxY, bound.top + bound.height);
    }

    return {
      left: minX,
      top: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  /**
   * Get the list of fonts used in the import
   */
  getUsedFonts(): string[] {
    return Array.from(this.usedFonts);
  }

  /**
   * Get the list of missing fonts
   */
  getMissingFonts(): string[] {
    return Array.from(this.missingFonts);
  }
}

export default SVGImporter;
