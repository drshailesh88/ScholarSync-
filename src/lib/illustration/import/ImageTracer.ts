/**
 * Image Tracer Service
 * Converts raster images to vector paths using potrace.
 *
 * Features:
 * - Convert raster image to SVG paths
 * - Options for detail level
 * - Color extraction for multi-color traces
 * - Progress callbacks for long operations
 */

import * as fabric from 'fabric';
import type { Object as FabricObject } from 'fabric';
import {
  type TracingOptions,
  type ImportProgressCallback,
  type ImportProgress,
  ImportError,
  DEFAULT_TRACING_OPTIONS,
} from './types';

/**
 * Potrace parameters mapped from our detail levels
 */
const DETAIL_PRESETS: Record<string, Partial<TracingOptions>> = {
  low: {
    turdSize: 10,
    alphaMax: 1.3,
    optTolerance: 1.0,
  },
  medium: {
    turdSize: 4,
    alphaMax: 1.0,
    optTolerance: 0.4,
  },
  high: {
    turdSize: 2,
    alphaMax: 0.8,
    optTolerance: 0.2,
  },
  ultra: {
    turdSize: 0,
    alphaMax: 0.5,
    optTolerance: 0.1,
  },
};

/**
 * Result of a tracing operation
 */
export interface TracingResult {
  /** Fabric.js path objects created from tracing */
  objects: FabricObject[];
  /** SVG path data string */
  svgPath: string;
  /** Any warnings during tracing */
  warnings: string[];
  /** Colors extracted from the image */
  colors?: string[];
}

/**
 * Color quantization result
 */
interface ColorCluster {
  color: [number, number, number];
  count: number;
  pixels: Array<[number, number]>;
}

export class ImageTracer {
  private options: Required<TracingOptions>;
  private warnings: string[] = [];
  private progressCallback?: ImportProgressCallback;

  constructor(options: Partial<TracingOptions> = {}) {
    this.options = { ...DEFAULT_TRACING_OPTIONS, ...options };

    // Apply detail level preset
    if (this.options.detailLevel && DETAIL_PRESETS[this.options.detailLevel]) {
      this.options = {
        ...this.options,
        ...DETAIL_PRESETS[this.options.detailLevel],
      };
    }
  }

  /**
   * Trace an image to vector paths
   */
  async trace(
    source: HTMLImageElement | HTMLCanvasElement | ImageData,
    onProgress?: ImportProgressCallback
  ): Promise<TracingResult> {
    this.progressCallback = onProgress;
    this.warnings = [];

    this.reportProgress('tracing', 10, 'Preparing image for tracing...');

    try {
      // Get ImageData from the source
      const imageData = this.getImageData(source);

      if (this.options.colorCount > 2) {
        // Multi-color tracing
        return await this.traceMultiColor(imageData);
      } else {
        // Black and white tracing
        return await this.traceBlackWhite(imageData);
      }
    } catch (error) {
      throw new ImportError(
        `Tracing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'TRACING_ERROR',
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Trace image as black and white
   */
  private async traceBlackWhite(imageData: ImageData): Promise<TracingResult> {
    this.reportProgress('tracing', 30, 'Converting to black and white...');

    // Convert to binary (black/white) image
    const binaryData = this.thresholdImage(imageData, this.options.threshold);

    this.reportProgress('tracing', 50, 'Tracing paths...');

    // Trace the binary image using our pure JavaScript implementation
    const pathData = await this.traceBinaryImage(binaryData, imageData.width, imageData.height);

    this.reportProgress('tracing', 80, 'Creating vector objects...');

    // Create Fabric.js path
    const path = new fabric.Path(pathData, {
      fill: '#000000',
      stroke: null,
      strokeWidth: 0,
    });

    this.reportProgress('tracing', 100, 'Tracing complete');

    return {
      objects: [path],
      svgPath: pathData,
      warnings: this.warnings,
    };
  }

  /**
   * Trace image with multiple colors
   */
  private async traceMultiColor(imageData: ImageData): Promise<TracingResult> {
    this.reportProgress('tracing', 20, 'Extracting colors...');

    // Quantize colors
    const colorClusters = this.quantizeColors(imageData, this.options.colorCount);
    const objects: FabricObject[] = [];
    const pathDataParts: string[] = [];
    const colors: string[] = [];

    this.reportProgress('tracing', 40, 'Tracing color layers...');

    // Create a layer for each color
    for (let i = 0; i < colorClusters.length; i++) {
      const cluster = colorClusters[i];
      const progress = 40 + ((i / colorClusters.length) * 50);

      this.reportProgress('tracing', progress, `Tracing color ${i + 1} of ${colorClusters.length}...`);

      // Create binary image for this color
      const binaryData = this.createColorMask(imageData, cluster);

      // Trace this color layer
      const pathData = await this.traceBinaryImage(binaryData, imageData.width, imageData.height);

      if (pathData && pathData.trim()) {
        const color = this.rgbToHex(cluster.color[0], cluster.color[1], cluster.color[2]);
        colors.push(color);

        const path = new fabric.Path(pathData, {
          fill: color,
          stroke: null,
          strokeWidth: 0,
        });

        objects.push(path);
        pathDataParts.push(pathData);
      }
    }

    this.reportProgress('tracing', 100, 'Tracing complete');

    return {
      objects,
      svgPath: pathDataParts.join(' '),
      warnings: this.warnings,
      colors,
    };
  }

  /**
   * Get ImageData from various sources
   */
  private getImageData(source: HTMLImageElement | HTMLCanvasElement | ImageData): ImageData {
    if (source instanceof ImageData) {
      return source;
    }

    const canvas = document.createElement('canvas');
    let width: number;
    let height: number;

    if (source instanceof HTMLImageElement) {
      width = source.naturalWidth || source.width;
      height = source.naturalHeight || source.height;
    } else {
      width = source.width;
      height = source.height;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    ctx.drawImage(source, 0, 0);
    return ctx.getImageData(0, 0, width, height);
  }

  /**
   * Convert image to binary using threshold
   */
  private thresholdImage(imageData: ImageData, threshold: number): Uint8Array {
    const { data, width, height } = imageData;
    const binary = new Uint8Array(width * height);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Convert to grayscale using luminance formula
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      // Apply threshold (considering alpha)
      const idx = i / 4;
      binary[idx] = (a > 127 && gray < threshold) ? 1 : 0;
    }

    return binary;
  }

  /**
   * Create a binary mask for a specific color cluster
   */
  private createColorMask(imageData: ImageData, cluster: ColorCluster): Uint8Array {
    const { data, width, height } = imageData;
    const binary = new Uint8Array(width * height);
    const [cr, cg, cb] = cluster.color;
    const tolerance = 30; // Color matching tolerance

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Check if pixel matches this color cluster
      const dist = Math.sqrt(
        Math.pow(r - cr, 2) +
        Math.pow(g - cg, 2) +
        Math.pow(b - cb, 2)
      );

      const idx = i / 4;
      binary[idx] = (a > 127 && dist < tolerance) ? 1 : 0;
    }

    return binary;
  }

  /**
   * Quantize image colors using k-means clustering
   */
  private quantizeColors(imageData: ImageData, numColors: number): ColorCluster[] {
    const { data, width, height } = imageData;
    const pixels: Array<[number, number, number, number, number]> = []; // [r, g, b, x, y]

    // Sample pixels (skip transparent ones)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const a = data[i + 3];
        if (a > 127) {
          pixels.push([data[i], data[i + 1], data[i + 2], x, y]);
        }
      }
    }

    if (pixels.length === 0) {
      return [];
    }

    // Initialize clusters with random pixels
    const clusters: ColorCluster[] = [];
    const step = Math.max(1, Math.floor(pixels.length / numColors));

    for (let i = 0; i < numColors && i * step < pixels.length; i++) {
      const p = pixels[i * step];
      clusters.push({
        color: [p[0], p[1], p[2]],
        count: 0,
        pixels: [],
      });
    }

    // K-means iteration
    const maxIterations = 10;
    for (let iter = 0; iter < maxIterations; iter++) {
      // Reset clusters
      for (const cluster of clusters) {
        cluster.count = 0;
        cluster.pixels = [];
      }

      // Assign pixels to nearest cluster
      for (const pixel of pixels) {
        let minDist = Infinity;
        let nearestCluster = clusters[0];

        for (const cluster of clusters) {
          const dist =
            Math.pow(pixel[0] - cluster.color[0], 2) +
            Math.pow(pixel[1] - cluster.color[1], 2) +
            Math.pow(pixel[2] - cluster.color[2], 2);

          if (dist < minDist) {
            minDist = dist;
            nearestCluster = cluster;
          }
        }

        nearestCluster.count++;
        nearestCluster.pixels.push([pixel[3], pixel[4]]);
      }

      // Update cluster centers
      for (const cluster of clusters) {
        if (cluster.count > 0) {
          let sumR = 0, sumG = 0, sumB = 0;

          for (const [x, y] of cluster.pixels) {
            const i = (y * width + x) * 4;
            sumR += data[i];
            sumG += data[i + 1];
            sumB += data[i + 2];
          }

          cluster.color = [
            Math.round(sumR / cluster.count),
            Math.round(sumG / cluster.count),
            Math.round(sumB / cluster.count),
          ];
        }
      }
    }

    // Sort by count (most common colors first) and filter empty clusters
    return clusters
      .filter(c => c.count > 0)
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Trace a binary image to SVG path data
   * This is a simplified implementation of the Potrace algorithm
   */
  private async traceBinaryImage(
    binary: Uint8Array,
    width: number,
    height: number
  ): Promise<string> {
    // Find contours using a simple boundary following algorithm
    const contours = this.findContours(binary, width, height);

    if (contours.length === 0) {
      return '';
    }

    // Convert contours to SVG path data
    const paths: string[] = [];

    for (const contour of contours) {
      if (contour.length < 3) continue;

      // Simplify contour using Douglas-Peucker algorithm
      const simplified = this.simplifyContour(contour, this.options.optTolerance);

      // Convert to path data
      const pathData = this.contourToPath(simplified, this.options.optCurve);
      if (pathData) {
        paths.push(pathData);
      }
    }

    return paths.join(' ');
  }

  /**
   * Find contours in a binary image
   */
  private findContours(
    binary: Uint8Array,
    width: number,
    height: number
  ): Array<Array<[number, number]>> {
    const visited = new Uint8Array(width * height);
    const contours: Array<Array<[number, number]>> = [];

    // Direction vectors for 8-connectivity
    const dx = [1, 1, 0, -1, -1, -1, 0, 1];
    const dy = [0, 1, 1, 1, 0, -1, -1, -1];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;

        // Check if this is a boundary pixel (black pixel with white neighbor)
        if (binary[idx] === 1 && !visited[idx]) {
          // Check if it's on the boundary
          let isBoundary = false;
          for (let d = 0; d < 8; d++) {
            const nx = x + dx[d];
            const ny = y + dy[d];
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
              isBoundary = true;
              break;
            }
            if (binary[ny * width + nx] === 0) {
              isBoundary = true;
              break;
            }
          }

          if (isBoundary) {
            // Trace contour
            const contour = this.traceContour(binary, visited, width, height, x, y);
            if (contour.length >= 3) {
              contours.push(contour);
            }
          }
        }
      }
    }

    return contours;
  }

  /**
   * Trace a single contour starting from a point
   */
  private traceContour(
    binary: Uint8Array,
    visited: Uint8Array,
    width: number,
    height: number,
    startX: number,
    startY: number
  ): Array<[number, number]> {
    const contour: Array<[number, number]> = [];
    const dx = [1, 1, 0, -1, -1, -1, 0, 1];
    const dy = [0, 1, 1, 1, 0, -1, -1, -1];

    let x = startX;
    let y = startY;
    let dir = 0;

    const maxSteps = width * height;
    let steps = 0;

    do {
      contour.push([x, y]);
      visited[y * width + x] = 1;

      // Find next boundary pixel
      let found = false;
      for (let i = 0; i < 8; i++) {
        const d = (dir + 6 + i) % 8; // Start searching from dir - 2
        const nx = x + dx[d];
        const ny = y + dy[d];

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          if (binary[ny * width + nx] === 1 && !visited[ny * width + nx]) {
            // Check if it's still a boundary pixel
            let isBoundary = false;
            for (let j = 0; j < 8; j++) {
              const nnx = nx + dx[j];
              const nny = ny + dy[j];
              if (nnx < 0 || nnx >= width || nny < 0 || nny >= height) {
                isBoundary = true;
                break;
              }
              if (binary[nny * width + nnx] === 0) {
                isBoundary = true;
                break;
              }
            }

            if (isBoundary) {
              x = nx;
              y = ny;
              dir = d;
              found = true;
              break;
            }
          }
        }
      }

      if (!found) break;
      steps++;
    } while ((x !== startX || y !== startY) && steps < maxSteps);

    return contour;
  }

  /**
   * Simplify contour using Douglas-Peucker algorithm
   */
  private simplifyContour(
    contour: Array<[number, number]>,
    tolerance: number
  ): Array<[number, number]> {
    if (contour.length <= 2) return contour;

    // Find the point with maximum distance
    let maxDist = 0;
    let maxIdx = 0;
    const start = contour[0];
    const end = contour[contour.length - 1];

    for (let i = 1; i < contour.length - 1; i++) {
      const dist = this.perpendicularDistance(contour[i], start, end);
      if (dist > maxDist) {
        maxDist = dist;
        maxIdx = i;
      }
    }

    // If max distance is greater than tolerance, recursively simplify
    if (maxDist > tolerance) {
      const left = this.simplifyContour(contour.slice(0, maxIdx + 1), tolerance);
      const right = this.simplifyContour(contour.slice(maxIdx), tolerance);
      return [...left.slice(0, -1), ...right];
    }

    return [start, end];
  }

  /**
   * Calculate perpendicular distance from point to line
   */
  private perpendicularDistance(
    point: [number, number],
    lineStart: [number, number],
    lineEnd: [number, number]
  ): number {
    const [x, y] = point;
    const [x1, y1] = lineStart;
    const [x2, y2] = lineEnd;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);

    if (len === 0) {
      return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
    }

    return Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1) / len;
  }

  /**
   * Convert contour to SVG path data
   */
  private contourToPath(
    contour: Array<[number, number]>,
    useCurves: boolean
  ): string {
    if (contour.length < 2) return '';

    const parts: string[] = [];
    parts.push(`M ${contour[0][0]} ${contour[0][1]}`);

    if (useCurves && contour.length > 2) {
      // Use quadratic curves for smoother paths
      for (let i = 1; i < contour.length - 1; i++) {
        const curr = contour[i];
        const next = contour[i + 1];
        const midX = (curr[0] + next[0]) / 2;
        const midY = (curr[1] + next[1]) / 2;
        parts.push(`Q ${curr[0]} ${curr[1]} ${midX} ${midY}`);
      }
      // Close to starting point
      const last = contour[contour.length - 1];
      parts.push(`Q ${last[0]} ${last[1]} ${contour[0][0]} ${contour[0][1]}`);
    } else {
      // Use straight lines
      for (let i = 1; i < contour.length; i++) {
        parts.push(`L ${contour[i][0]} ${contour[i][1]}`);
      }
    }

    parts.push('Z');
    return parts.join(' ');
  }

  /**
   * Convert RGB to hex color
   */
  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
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
   * Update tracing options
   */
  setOptions(options: Partial<TracingOptions>): void {
    this.options = { ...this.options, ...options };

    // Apply detail level preset if changed
    if (options.detailLevel && DETAIL_PRESETS[options.detailLevel]) {
      this.options = {
        ...this.options,
        ...DETAIL_PRESETS[options.detailLevel],
      };
    }
  }

  /**
   * Get current options
   */
  getOptions(): Required<TracingOptions> {
    return { ...this.options };
  }
}

export default ImageTracer;
