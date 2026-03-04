/**
 * glfx.js Integration Module
 *
 * Provides WebGL-accelerated image processing with real-time filter preview.
 * Integrates seamlessly with Fabric.js canvas for the FINNISH editor.
 *
 * @see https://evanw.github.io/glfx.js/
 */

import type {
  GlfxModule,
  GlfxCanvas,
  GlfxTexture,
  AdjustmentParams,
  BlurParams,
  DistortionParams,
  VignetteParams,
  FilterPreset,
} from './types';

// Import glfx.js (uses CommonJS exports)
// @ts-expect-error - glfx.js doesn't have TypeScript definitions
import * as glfxLib from 'glfx';

// Cast to proper type
const glfx = glfxLib as unknown as GlfxModule;

// Re-export types
export type {
  GlfxModule,
  GlfxCanvas,
  GlfxTexture,
  AdjustmentParams,
  BlurParams,
  DistortionParams,
  VignetteParams,
  FilterPreset,
};

// Re-export filter functions
export {
  // Adjustment filters
  applyBrightness,
  applyContrast,
  applyBrightnessContrast,
  applyHue,
  applySaturation,
  applyHueSaturation,
  applyVibrance,
  applySepia,
  applyAdjustments,
  // Blur filters
  applyGaussianBlur,
  applyTriangleBlur,
  applyZoomBlur,
  applyTiltShift,
  applyLensBlur,
  applyBlur,
  // Distortion filters
  applySwirl,
  applyBulge,
  applyPinch,
  applyDistortion,
  // Effects
  applyVignette,
  applyVignetteParams,
  applyNoise,
  applyDenoise,
  applySharpen,
  applyInk,
  applyEdgeWork,
  applyDotScreen,
  applyHexagonalPixelate,
  // Presets
  filterPresets,
  applyPreset,
  getPresetNames,
  getPresetInfo,
} from './filters';

/**
 * Check if WebGL is supported in the current environment
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return gl !== null;
  } catch {
    return false;
  }
}

/**
 * Create a new glfx canvas for image processing
 * @throws Error if WebGL is not supported
 */
export function createGlfxCanvas(): GlfxCanvas {
  if (!isWebGLSupported()) {
    throw new Error('WebGL is not supported in this browser');
  }
  return glfx.canvas();
}

/**
 * Create a texture from an image element
 * @param canvas The glfx canvas
 * @param image The source image
 */
export function createTexture(
  canvas: GlfxCanvas,
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): GlfxTexture {
  return canvas.texture(image);
}

/**
 * Process an image with glfx filters
 *
 * @example
 * ```ts
 * const result = await processImage(imageElement, (canvas) => {
 *   return canvas
 *     .brightnessContrast(0.1, 0.2)
 *     .hueSaturation(0, 0.1)
 *     .vignette(0.5, 0.4);
 * });
 * ```
 */
export function processImage(
  source: HTMLImageElement | HTMLCanvasElement,
  filterFn: (canvas: GlfxCanvas) => GlfxCanvas
): HTMLCanvasElement {
  const glfxCanvas = createGlfxCanvas();
  const texture = glfxCanvas.texture(source);

  // Draw the texture and apply filters
  glfxCanvas.draw(texture);
  filterFn(glfxCanvas);
  glfxCanvas.update();

  // Create output canvas with processed result
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = source.width || (source as HTMLImageElement).naturalWidth;
  outputCanvas.height = source.height || (source as HTMLImageElement).naturalHeight;

  const ctx = outputCanvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(glfxCanvas, 0, 0);
  }

  // Clean up
  texture.destroy();

  return outputCanvas;
}

/**
 * Process an image and return a data URL
 */
export function processImageToDataURL(
  source: HTMLImageElement | HTMLCanvasElement,
  filterFn: (canvas: GlfxCanvas) => GlfxCanvas,
  mimeType: string = 'image/png',
  quality: number = 0.92
): string {
  const resultCanvas = processImage(source, filterFn);
  return resultCanvas.toDataURL(mimeType, quality);
}

/**
 * Load an image from a URL and process it
 */
export async function processImageFromURL(
  url: string,
  filterFn: (canvas: GlfxCanvas) => GlfxCanvas
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const result = processImage(img, filterFn);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image from URL: ${url}`));
    };

    img.src = url;
  });
}

// ============================================
// FABRIC.JS INTEGRATION
// ============================================

/**
 * Apply glfx filters to a Fabric.js canvas
 *
 * @example
 * ```ts
 * import { Canvas } from 'fabric';
 *
 * const fabricCanvas = new Canvas('canvas');
 * // ... add objects ...
 *
 * const processedCanvas = applyFiltersToFabricCanvas(fabricCanvas, (glfxCanvas) => {
 *   return glfxCanvas
 *     .brightnessContrast(0.1, 0.2)
 *     .hueSaturation(0, 0.1);
 * });
 * ```
 */
export function applyFiltersToFabricCanvas(
  fabricCanvas: { toCanvasElement: () => HTMLCanvasElement } | HTMLCanvasElement,
  filterFn: (canvas: GlfxCanvas) => GlfxCanvas
): HTMLCanvasElement {
  // Get the canvas element from Fabric.js or use directly if it's already a canvas
  const sourceCanvas =
    'toCanvasElement' in fabricCanvas
      ? fabricCanvas.toCanvasElement()
      : fabricCanvas;

  return processImage(sourceCanvas, filterFn);
}

/**
 * Create a live preview processor for real-time filter adjustments
 */
export function createFilterProcessor(
  source: HTMLImageElement | HTMLCanvasElement
): FilterProcessor {
  return new FilterProcessor(source);
}

/**
 * Class for managing real-time filter processing
 */
export class FilterProcessor {
  private glfxCanvas: GlfxCanvas;
  private texture: GlfxTexture;
  private source: HTMLImageElement | HTMLCanvasElement;

  constructor(source: HTMLImageElement | HTMLCanvasElement) {
    this.source = source;
    this.glfxCanvas = createGlfxCanvas();
    this.texture = this.glfxCanvas.texture(source);
  }

  /**
   * Apply filters and get the result
   */
  process(filterFn: (canvas: GlfxCanvas) => GlfxCanvas): GlfxCanvas {
    this.glfxCanvas.draw(this.texture);
    filterFn(this.glfxCanvas);
    this.glfxCanvas.update();
    return this.glfxCanvas;
  }

  /**
   * Reset to original image
   */
  reset(): void {
    this.glfxCanvas.draw(this.texture);
    this.glfxCanvas.update();
  }

  /**
   * Update the source image
   */
  updateSource(newSource: HTMLImageElement | HTMLCanvasElement): void {
    this.source = newSource;
    this.texture.loadContentsOf(newSource);
  }

  /**
   * Get the glfx canvas element for display
   */
  getCanvas(): GlfxCanvas {
    return this.glfxCanvas;
  }

  /**
   * Export the current state to a regular canvas
   */
  toCanvas(): HTMLCanvasElement {
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width =
      this.source.width || (this.source as HTMLImageElement).naturalWidth;
    outputCanvas.height =
      this.source.height || (this.source as HTMLImageElement).naturalHeight;

    const ctx = outputCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(this.glfxCanvas, 0, 0);
    }

    return outputCanvas;
  }

  /**
   * Export to data URL
   */
  toDataURL(mimeType: string = 'image/png', quality: number = 0.92): string {
    return this.glfxCanvas.toDataURL(mimeType, quality);
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.texture.destroy();
  }
}

// ============================================
// CONVENIENCE METHODS FOR COMMON OPERATIONS
// ============================================

/**
 * Quick brightness/contrast adjustment
 */
export function quickAdjust(
  source: HTMLImageElement | HTMLCanvasElement,
  brightness: number = 0,
  contrast: number = 0
): HTMLCanvasElement {
  return processImage(source, (canvas) =>
    canvas.brightnessContrast(brightness, contrast)
  );
}

/**
 * Quick blur
 */
export function quickBlur(
  source: HTMLImageElement | HTMLCanvasElement,
  radius: number = 5
): HTMLCanvasElement {
  return processImage(source, (canvas) => canvas.triangleBlur(radius));
}

/**
 * Quick sharpen
 */
export function quickSharpen(
  source: HTMLImageElement | HTMLCanvasElement,
  strength: number = 1
): HTMLCanvasElement {
  return processImage(source, (canvas) => canvas.unsharpMask(5, strength));
}

/**
 * Convert to grayscale
 */
export function toGrayscale(
  source: HTMLImageElement | HTMLCanvasElement
): HTMLCanvasElement {
  return processImage(source, (canvas) => canvas.hueSaturation(0, -1));
}

/**
 * Apply vintage effect
 */
export function applyVintageEffect(
  source: HTMLImageElement | HTMLCanvasElement
): HTMLCanvasElement {
  return processImage(source, (canvas) =>
    canvas
      .sepia(0.3)
      .brightnessContrast(0.05, 0.1)
      .vignette(0.5, 0.4)
  );
}

// Export the glfx module for advanced usage
export { glfx };
