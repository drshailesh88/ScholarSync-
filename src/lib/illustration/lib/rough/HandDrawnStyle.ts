/**
 * Hand-Drawn Style Converter
 *
 * Converts clean SVG elements to sketchy, hand-drawn style using Rough.js
 */

import rough from 'roughjs';
import type { Options as RoughOptions } from 'roughjs/bin/core';
import type { RoughSVG } from 'roughjs/bin/svg';
import { roughStylePresets, defaultRoughOptions } from './index';

export type StylePreset = 'whiteboard' | 'notebook' | 'chalkboard' | 'technical' | 'custom';

export interface HandDrawnStyleOptions {
  preset?: StylePreset;
  customOptions?: Partial<RoughOptions>;
  seed?: number; // For reproducible randomness
}

/**
 * Hand-drawn style manager for SVG elements
 */
export class HandDrawnStyle {
  private roughSvg: RoughSVG | null = null;
  private options: RoughOptions;
  private seed: number;

  constructor(options: HandDrawnStyleOptions = {}) {
    this.seed = options.seed || Math.floor(Math.random() * 2147483647);
    this.options = this.resolveOptions(options);
  }

  private resolveOptions(options: HandDrawnStyleOptions): RoughOptions {
    let baseOptions: RoughOptions = { ...defaultRoughOptions };

    if (options.preset && options.preset !== 'custom') {
      baseOptions = { ...baseOptions, ...roughStylePresets[options.preset] };
    }

    if (options.customOptions) {
      baseOptions = { ...baseOptions, ...options.customOptions };
    }

    return { ...baseOptions, seed: this.seed };
  }

  /**
   * Initialize with an SVG element
   */
  public init(svgElement: SVGSVGElement): void {
    this.roughSvg = rough.svg(svgElement);
  }

  /**
   * Convert a rectangle to hand-drawn style
   */
  public rectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    options?: Partial<RoughOptions>
  ): SVGGElement | null {
    if (!this.roughSvg) return null;
    return this.roughSvg.rectangle(x, y, width, height, {
      ...this.options,
      ...options,
    });
  }

  /**
   * Convert an ellipse to hand-drawn style
   */
  public ellipse(
    x: number,
    y: number,
    width: number,
    height: number,
    options?: Partial<RoughOptions>
  ): SVGGElement | null {
    if (!this.roughSvg) return null;
    return this.roughSvg.ellipse(x, y, width, height, {
      ...this.options,
      ...options,
    });
  }

  /**
   * Convert a circle to hand-drawn style
   */
  public circle(
    x: number,
    y: number,
    diameter: number,
    options?: Partial<RoughOptions>
  ): SVGGElement | null {
    if (!this.roughSvg) return null;
    return this.roughSvg.circle(x, y, diameter, {
      ...this.options,
      ...options,
    });
  }

  /**
   * Convert a line to hand-drawn style
   */
  public line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options?: Partial<RoughOptions>
  ): SVGGElement | null {
    if (!this.roughSvg) return null;
    return this.roughSvg.line(x1, y1, x2, y2, {
      ...this.options,
      ...options,
    });
  }

  /**
   * Convert an SVG path to hand-drawn style
   */
  public path(pathData: string, options?: Partial<RoughOptions>): SVGGElement | null {
    if (!this.roughSvg) return null;
    return this.roughSvg.path(pathData, {
      ...this.options,
      ...options,
    });
  }

  /**
   * Convert a polygon to hand-drawn style
   */
  public polygon(
    points: Array<[number, number]>,
    options?: Partial<RoughOptions>
  ): SVGGElement | null {
    if (!this.roughSvg) return null;
    return this.roughSvg.polygon(points, {
      ...this.options,
      ...options,
    });
  }

  /**
   * Draw an arrow with hand-drawn style
   */
  public arrow(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options?: Partial<RoughOptions> & { arrowSize?: number }
  ): SVGGElement | null {
    if (!this.roughSvg) return null;

    const arrowSize = options?.arrowSize || 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Create arrow group
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Main line
    const line = this.roughSvg.line(x1, y1, x2, y2, { ...this.options, ...options });
    if (line) group.appendChild(line);

    // Arrowhead
    const arrowAngle1 = angle + Math.PI * 0.85;
    const arrowAngle2 = angle - Math.PI * 0.85;

    const arrowLine1 = this.roughSvg.line(
      x2,
      y2,
      x2 + Math.cos(arrowAngle1) * arrowSize,
      y2 + Math.sin(arrowAngle1) * arrowSize,
      { ...this.options, ...options }
    );
    const arrowLine2 = this.roughSvg.line(
      x2,
      y2,
      x2 + Math.cos(arrowAngle2) * arrowSize,
      y2 + Math.sin(arrowAngle2) * arrowSize,
      { ...this.options, ...options }
    );

    if (arrowLine1) group.appendChild(arrowLine1);
    if (arrowLine2) group.appendChild(arrowLine2);

    return group;
  }

  /**
   * Update style options
   */
  public setOptions(options: Partial<RoughOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Change preset
   */
  public setPreset(preset: StylePreset, customOptions?: Partial<RoughOptions>): void {
    this.options = this.resolveOptions({ preset, customOptions });
  }

  /**
   * Get current options
   */
  public getOptions(): RoughOptions {
    return { ...this.options };
  }
}

/**
 * Convert existing SVG element to hand-drawn style
 */
export function convertToHandDrawn(
  svgElement: SVGSVGElement,
  options: HandDrawnStyleOptions = {}
): SVGSVGElement {
  const handDrawn = new HandDrawnStyle(options);
  handDrawn.init(svgElement);

  // Clone the SVG
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  const roughSvg = rough.svg(clonedSvg);
  const resolvedOptions = {
    ...defaultRoughOptions,
    ...(options.preset && options.preset !== 'custom' ? roughStylePresets[options.preset] : {}),
    ...options.customOptions,
  };

  // Process each shape in the SVG
  const shapes = clonedSvg.querySelectorAll('rect, circle, ellipse, line, path, polygon, polyline');

  shapes.forEach((shape) => {
    let roughElement: SVGGElement | null = null;
    const stroke = shape.getAttribute('stroke') || resolvedOptions.stroke;
    const fill = shape.getAttribute('fill') || resolvedOptions.fill;
    const strokeWidth = parseFloat(shape.getAttribute('stroke-width') || String(resolvedOptions.strokeWidth));

    const shapeOptions: RoughOptions = {
      ...resolvedOptions,
      stroke: stroke || undefined,
      fill: fill === 'none' ? undefined : fill || undefined,
      strokeWidth,
    };

    if (shape.tagName === 'rect') {
      const x = parseFloat(shape.getAttribute('x') || '0');
      const y = parseFloat(shape.getAttribute('y') || '0');
      const width = parseFloat(shape.getAttribute('width') || '0');
      const height = parseFloat(shape.getAttribute('height') || '0');
      roughElement = roughSvg.rectangle(x, y, width, height, shapeOptions);
    } else if (shape.tagName === 'circle') {
      const cx = parseFloat(shape.getAttribute('cx') || '0');
      const cy = parseFloat(shape.getAttribute('cy') || '0');
      const r = parseFloat(shape.getAttribute('r') || '0');
      roughElement = roughSvg.circle(cx, cy, r * 2, shapeOptions);
    } else if (shape.tagName === 'ellipse') {
      const cx = parseFloat(shape.getAttribute('cx') || '0');
      const cy = parseFloat(shape.getAttribute('cy') || '0');
      const rx = parseFloat(shape.getAttribute('rx') || '0');
      const ry = parseFloat(shape.getAttribute('ry') || '0');
      roughElement = roughSvg.ellipse(cx, cy, rx * 2, ry * 2, shapeOptions);
    } else if (shape.tagName === 'line') {
      const x1 = parseFloat(shape.getAttribute('x1') || '0');
      const y1 = parseFloat(shape.getAttribute('y1') || '0');
      const x2 = parseFloat(shape.getAttribute('x2') || '0');
      const y2 = parseFloat(shape.getAttribute('y2') || '0');
      roughElement = roughSvg.line(x1, y1, x2, y2, shapeOptions);
    } else if (shape.tagName === 'path') {
      const d = shape.getAttribute('d');
      if (d) {
        roughElement = roughSvg.path(d, shapeOptions);
      }
    } else if (shape.tagName === 'polygon') {
      const points = shape.getAttribute('points');
      if (points) {
        const pointsArray = points
          .trim()
          .split(/\s+|,/)
          .reduce((acc: Array<[number, number]>, val, i, arr) => {
            if (i % 2 === 0) {
              acc.push([parseFloat(val), parseFloat(arr[i + 1])]);
            }
            return acc;
          }, []);
        roughElement = roughSvg.polygon(pointsArray, shapeOptions);
      }
    }

    if (roughElement) {
      shape.parentNode?.replaceChild(roughElement, shape);
    }
  });

  return clonedSvg;
}

/**
 * Create a hand-drawn shape generator
 */
export function createHandDrawnGenerator(
  svgElement: SVGSVGElement,
  options: HandDrawnStyleOptions = {}
): HandDrawnStyle {
  const handDrawn = new HandDrawnStyle(options);
  handDrawn.init(svgElement);
  return handDrawn;
}

export default HandDrawnStyle;
