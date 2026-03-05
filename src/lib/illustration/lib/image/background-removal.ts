/**
 * Background Removal Library
 * Browser-based background removal using MediaPipe Image Segmenter (Apache 2.0)
 *
 * This library runs entirely in the browser with no API costs.
 * Uses Google's MediaPipe for ML-based background removal.
 *
 * License: Apache 2.0 - Commercially safe for all use cases
 *
 * @module lib/image/background-removal
 */

import {
  ImageSegmenter,
  FilesetResolver,
  type ImageSegmenterResult,
} from '@mediapipe/tasks-vision';

// ============================================================================
// Types
// ============================================================================

/**
 * Progress stages during background removal
 */
export type BackgroundRemovalStage =
  | 'loading-model'
  | 'processing'
  | 'encoding'
  | 'complete';

/**
 * Progress callback function signature
 */
export type ProgressCallback = (
  progress: number,
  stage?: BackgroundRemovalStage
) => void;

/**
 * Options for background removal
 */
export interface BackgroundRemovalOptions {
  /** Progress callback for UI feedback */
  onProgress?: ProgressCallback;
  /** Output format */
  output?: {
    /** Output format type */
    format?: 'image/png' | 'image/webp' | 'image/jpeg';
    /** Quality for lossy formats (0-1) */
    quality?: number;
  };
  /** Edge feathering amount in pixels (0 = hard edge, higher = softer) */
  featherAmount?: number;
}

/**
 * Result of background removal operation
 */
export interface BackgroundRemovalResult {
  /** The processed image blob */
  blob: Blob;
  /** Width of the processed image */
  width: number;
  /** Height of the processed image */
  height: number;
  /** Processing time in milliseconds */
  processingTime: number;
}

/**
 * Error thrown during background removal
 */
export class BackgroundRemovalError extends Error {
  constructor(
    message: string,
    public readonly stage?: BackgroundRemovalStage,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'BackgroundRemovalError';
  }
}

// ============================================================================
// Singleton Image Segmenter
// ============================================================================

let imageSegmenter: ImageSegmenter | null = null;
let isModelLoading = false;
let modelLoadPromise: Promise<ImageSegmenter> | null = null;

/**
 * Get or create the Image Segmenter singleton
 */
async function getImageSegmenter(
  onProgress?: ProgressCallback
): Promise<ImageSegmenter> {
  if (imageSegmenter) {
    return imageSegmenter;
  }

  if (isModelLoading && modelLoadPromise) {
    return modelLoadPromise;
  }

  isModelLoading = true;

  modelLoadPromise = (async () => {
    try {
      if (onProgress) {
        onProgress(0.1, 'loading-model');
      }

      // Load the MediaPipe vision WASM
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      if (onProgress) {
        onProgress(0.3, 'loading-model');
      }

      // Create the Image Segmenter with the selfie segmentation model
      // This model segments person (foreground) vs background
      imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',
          delegate: 'GPU',
        },
        runningMode: 'IMAGE',
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      });

      if (onProgress) {
        onProgress(0.5, 'loading-model');
      }

      isModelLoading = false;
      return imageSegmenter;
    } catch (error) {
      isModelLoading = false;
      modelLoadPromise = null;
      throw new BackgroundRemovalError(
        `Failed to load segmentation model: ${error instanceof Error ? error.message : String(error)}`,
        'loading-model',
        error instanceof Error ? error : undefined
      );
    }
  })();

  return modelLoadPromise;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get image dimensions from a blob
 */
async function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for dimension detection'));
    };

    img.src = url;
  });
}

/**
 * Load an image file/blob as HTMLImageElement
 */
async function loadImageElement(source: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(source);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Fetch an image from URL and return as Blob
 */
async function fetchImageAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new BackgroundRemovalError(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.startsWith('image/')) {
    throw new BackgroundRemovalError(
      `URL does not point to an image. Content-Type: ${contentType}`
    );
  }

  return response.blob();
}

/**
 * Apply the segmentation mask to remove the background
 */
function applyMask(
  imageElement: HTMLImageElement,
  segmentationResult: ImageSegmenterResult,
  featherAmount: number = 0
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new BackgroundRemovalError('Failed to get canvas context', 'processing');
  }

  const width = imageElement.naturalWidth || imageElement.width;
  const height = imageElement.naturalHeight || imageElement.height;

  canvas.width = width;
  canvas.height = height;

  // Draw the original image
  ctx.drawImage(imageElement, 0, 0);

  // Get the category mask (person = 1, background = 0)
  const categoryMask = segmentationResult.categoryMask;
  if (!categoryMask) {
    throw new BackgroundRemovalError('No segmentation mask returned', 'processing');
  }

  // Get the mask data
  const maskData = categoryMask.getAsUint8Array();

  // Get the image data
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // Apply the mask to remove background
  // The selfie segmenter returns: 0 = background, 1 = person/foreground
  for (let i = 0; i < maskData.length; i++) {
    const maskValue = maskData[i];
    const pixelIndex = i * 4;

    if (maskValue === 0) {
      // Background pixel - make transparent
      pixels[pixelIndex + 3] = 0;
    } else if (featherAmount > 0) {
      // Optional: soft edges with feathering
      // For now, keep fully opaque for foreground
      pixels[pixelIndex + 3] = 255;
    }
  }

  // Apply optional feathering for smoother edges
  if (featherAmount > 0) {
    applyFeathering(pixels, width, height, featherAmount);
  }

  // Put the modified data back
  ctx.putImageData(imageData, 0, 0);

  // Close the mask to free resources
  categoryMask.close();

  return canvas;
}

/**
 * Apply feathering to edges for smoother transitions
 */
function applyFeathering(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  amount: number
): void {
  // Simple box blur on alpha channel for edge softening
  const radius = Math.min(amount, 5);
  const tempAlpha = new Uint8ClampedArray(width * height);

  // Copy alpha values
  for (let i = 0; i < width * height; i++) {
    tempAlpha[i] = pixels[i * 4 + 3];
  }

  // Apply blur
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            sum += tempAlpha[ny * width + nx];
            count++;
          }
        }
      }

      const idx = (y * width + x) * 4 + 3;
      pixels[idx] = Math.round(sum / count);
    }
  }
}

/**
 * Convert canvas to blob
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string = 'image/png',
  quality: number = 1
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      },
      format,
      quality
    );
  });
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Remove background from an image file
 *
 * @param imageFile - The image file to process
 * @param options - Processing options
 * @returns Promise resolving to the processed image result
 *
 * @example
 * ```typescript
 * const result = await removeImageBackground(file, {
 *   onProgress: (progress, stage) => {
 *     console.log(`${stage}: ${Math.round(progress * 100)}%`);
 *   }
 * });
 *
 * // Use the result
 * const imageUrl = URL.createObjectURL(result.blob);
 * ```
 */
export async function removeImageBackground(
  imageFile: File,
  options: BackgroundRemovalOptions = {}
): Promise<BackgroundRemovalResult> {
  const startTime = performance.now();

  // Validate input
  if (!imageFile) {
    throw new BackgroundRemovalError('No image file provided');
  }

  if (!imageFile.type.startsWith('image/')) {
    throw new BackgroundRemovalError(
      `Invalid file type: ${imageFile.type}. Expected an image file.`
    );
  }

  try {
    // Load the segmenter (may be cached)
    const segmenter = await getImageSegmenter(options.onProgress);

    if (options.onProgress) {
      options.onProgress(0.6, 'processing');
    }

    // Load the image as an HTMLImageElement
    const imageElement = await loadImageElement(imageFile);

    // Perform segmentation
    const segmentationResult = segmenter.segment(imageElement);

    if (options.onProgress) {
      options.onProgress(0.8, 'encoding');
    }

    // Apply the mask to remove background
    const resultCanvas = applyMask(
      imageElement,
      segmentationResult,
      options.featherAmount ?? 1
    );

    // Convert to blob
    const outputFormat = options.output?.format ?? 'image/png';
    const outputQuality = options.output?.quality ?? 1;
    const resultBlob = await canvasToBlob(resultCanvas, outputFormat, outputQuality);

    // Get dimensions
    const dimensions = await getImageDimensions(resultBlob);

    // Final progress callback
    if (options.onProgress) {
      options.onProgress(1, 'complete');
    }

    return {
      blob: resultBlob,
      width: dimensions.width,
      height: dimensions.height,
      processingTime: performance.now() - startTime,
    };
  } catch (error) {
    if (error instanceof BackgroundRemovalError) {
      throw error;
    }

    throw new BackgroundRemovalError(
      `Background removal failed: ${error instanceof Error ? error.message : String(error)}`,
      'processing',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Remove background from an image URL
 *
 * @param imageUrl - URL of the image to process
 * @param options - Processing options
 * @returns Promise resolving to the processed image result
 *
 * @example
 * ```typescript
 * const result = await removeBackgroundFromUrl(
 *   'https://example.com/image.jpg',
 *   { onProgress: (p) => console.log(`Progress: ${p * 100}%`) }
 * );
 * ```
 */
export async function removeBackgroundFromUrl(
  imageUrl: string,
  options: BackgroundRemovalOptions = {}
): Promise<BackgroundRemovalResult> {
  // Validate URL
  if (!imageUrl) {
    throw new BackgroundRemovalError('No image URL provided');
  }

  try {
    new URL(imageUrl);
  } catch {
    throw new BackgroundRemovalError(`Invalid URL: ${imageUrl}`);
  }

  try {
    // Report initial progress for fetching
    if (options.onProgress) {
      options.onProgress(0, 'loading-model');
    }

    // Fetch the image
    const imageBlob = await fetchImageAsBlob(imageUrl);

    // Convert blob to file for processing
    const file = new File([imageBlob], 'image', { type: imageBlob.type });

    // Process with background removal
    return removeImageBackground(file, options);
  } catch (error) {
    if (error instanceof BackgroundRemovalError) {
      throw error;
    }

    throw new BackgroundRemovalError(
      `Failed to process image from URL: ${error instanceof Error ? error.message : String(error)}`,
      'loading-model',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Remove background from a Blob
 *
 * @param imageBlob - The image blob to process
 * @param options - Processing options
 * @returns Promise resolving to the processed image result
 */
export async function removeBackgroundFromBlob(
  imageBlob: Blob,
  options: BackgroundRemovalOptions = {}
): Promise<BackgroundRemovalResult> {
  if (!imageBlob) {
    throw new BackgroundRemovalError('No image blob provided');
  }

  // Determine mime type
  const mimeType = imageBlob.type || 'image/png';

  // Convert blob to file
  const file = new File([imageBlob], `image.${mimeType.split('/')[1]}`, {
    type: mimeType
  });

  return removeImageBackground(file, options);
}

/**
 * Check if background removal is supported in the current environment
 */
export function isBackgroundRemovalSupported(): boolean {
  // Check for required APIs
  const hasWebAssembly = typeof WebAssembly !== 'undefined';
  const hasCanvas = typeof HTMLCanvasElement !== 'undefined';
  const hasBlob = typeof Blob !== 'undefined';
  const hasURL = typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function';

  return hasWebAssembly && hasCanvas && hasBlob && hasURL;
}

/**
 * Preload the segmentation model for faster first use
 * Call this during app initialization for better UX
 */
export async function preloadModel(): Promise<void> {
  await getImageSegmenter();
}

/**
 * Create an object URL from the result blob for preview
 */
export function createPreviewUrl(result: BackgroundRemovalResult): string {
  return URL.createObjectURL(result.blob);
}

/**
 * Clean up a preview URL when no longer needed
 */
export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}

/**
 * Clean up the image segmenter to free resources
 * Call this when background removal is no longer needed
 */
export function dispose(): void {
  if (imageSegmenter) {
    imageSegmenter.close();
    imageSegmenter = null;
    modelLoadPromise = null;
  }
}
