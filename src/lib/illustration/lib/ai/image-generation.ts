/**
 * AI Image Generation using fal.ai FLUX
 * Cost: ~$0.008 per image with FLUX Turbo (Schnell)
 *
 * This library provides AI-powered image generation for scientific illustrations.
 * Uses fal.ai's FLUX models for high-quality, fast image generation.
 *
 * @module lib/ai/image-generation
 */

import * as fal from '@fal-ai/serverless-client';

// ============================================================================
// Types
// ============================================================================

/**
 * Available image sizes for generation
 */
export type ImageSize =
  | 'square_hd' // 1024x1024
  | 'square' // 512x512
  | 'landscape_4_3' // 1024x768
  | 'portrait_4_3' // 768x1024
  | 'landscape_16_9' // 1024x576
  | 'portrait_16_9'; // 576x1024

/**
 * FLUX model variants available on fal.ai
 */
export type FluxModel =
  | 'fal-ai/flux/schnell' // Fastest, cheapest (~$0.008/image)
  | 'fal-ai/flux/dev' // Better quality (~$0.012/image)
  | 'fal-ai/flux-pro'; // Best quality (~$0.03/image)

/**
 * Style presets for scientific illustrations
 */
export type IllustrationStyle =
  | 'clean' // Clean vector style, minimal details
  | 'detailed' // Detailed scientific illustration
  | 'sketch' // Hand-drawn sketch style
  | 'diagram' // Technical diagram style
  | 'photorealistic'; // Photorealistic rendering

/**
 * Options for image generation
 */
export interface GenerationOptions {
  /** The prompt describing the image to generate */
  prompt: string;
  /** Negative prompt - what to avoid in the image */
  negativePrompt?: string;
  /** Output image size */
  imageSize?: ImageSize;
  /** Number of images to generate (1-4) */
  numImages?: number;
  /** Seed for reproducible results (optional) */
  seed?: number;
  /** FLUX model to use */
  model?: FluxModel;
  /** Number of inference steps (higher = better quality, slower) */
  numInferenceSteps?: number;
  /** Guidance scale (how closely to follow the prompt) */
  guidanceScale?: number;
  /** Enable safety checker */
  enableSafetyChecker?: boolean;
}

/**
 * Generated image data
 */
export interface GeneratedImage {
  /** URL of the generated image (temporary, expires) */
  url: string;
  /** Width of the image */
  width: number;
  /** Height of the image */
  height: number;
  /** Content type (usually image/jpeg or image/png) */
  contentType?: string;
}

/**
 * Result of image generation
 */
export interface GenerationResult {
  /** Array of generated images */
  images: GeneratedImage[];
  /** Seed used for generation (for reproducibility) */
  seed: number;
  /** Timing information */
  timings: {
    /** Inference time in seconds */
    inference: number;
  };
  /** Whether NSFW content was detected */
  hasNsfw?: boolean;
}

/**
 * Error thrown during image generation
 */
export class ImageGenerationError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'ImageGenerationError';
  }
}

/**
 * Progress callback for long-running generation
 */
export type AIProgressCallback = (progress: number, status: string) => void;

// ============================================================================
// Configuration
// ============================================================================

let isConfigured = false;

/**
 * Configure the fal.ai client with API credentials
 *
 * @param apiKey - Your fal.ai API key
 *
 * @example
 * ```typescript
 * configureFalClient('your-api-key-here');
 * ```
 */
export function configureFalClient(apiKey: string): void {
  if (!apiKey) {
    throw new ImageGenerationError('API key is required to configure fal.ai client');
  }

  fal.config({
    credentials: apiKey,
  });

  isConfigured = true;
}

/**
 * Check if the fal.ai client is configured
 */
export function isClientConfigured(): boolean {
  return isConfigured;
}

// ============================================================================
// Style Presets
// ============================================================================

/**
 * Style-specific prompt prefixes for scientific illustrations
 */
const STYLE_PREFIXES: Record<IllustrationStyle, string> = {
  clean:
    'Clean vector illustration style, minimal details, flat colors, scientific accuracy, white background, ',
  detailed:
    'Detailed scientific illustration, precise anatomical accuracy, labeled diagram style, professional medical illustration, ',
  sketch:
    'Hand-drawn scientific sketch style, pencil drawing, rough lines, educational illustration, ',
  diagram:
    'Technical diagram style, schematic representation, clear lines, labeled components, engineering drawing style, ',
  photorealistic:
    'Photorealistic 3D rendering, accurate lighting, medical visualization quality, ',
};

/**
 * Style-specific negative prompts
 */
const STYLE_NEGATIVE_PROMPTS: Record<IllustrationStyle, string> = {
  clean: 'photorealistic, 3d render, shadows, gradients, complex textures, blurry, low quality',
  detailed: 'cartoon, anime, abstract, low quality, blurry, watermark',
  sketch: 'photorealistic, digital art, clean lines, perfect, polished',
  diagram: 'photorealistic, artistic, painterly, soft, blurry',
  photorealistic: 'cartoon, anime, sketch, drawing, illustration, flat colors',
};

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Generate an image using fal.ai FLUX models
 *
 * @param options - Generation options
 * @param onProgress - Optional progress callback
 * @returns Promise resolving to generation result
 *
 * @example
 * ```typescript
 * const result = await generateImage({
 *   prompt: 'A detailed illustration of the human heart',
 *   imageSize: 'square_hd',
 *   numImages: 1,
 * });
 *
 * console.log(result.images[0].url);
 * ```
 */
export async function generateImage(
  options: GenerationOptions,
  onProgress?: AIProgressCallback
): Promise<GenerationResult> {
  // Validate configuration
  if (!isConfigured) {
    throw new ImageGenerationError(
      'fal.ai client is not configured. Call configureFalClient(apiKey) first.',
      'NOT_CONFIGURED'
    );
  }

  // Validate prompt
  if (!options.prompt || options.prompt.trim().length === 0) {
    throw new ImageGenerationError('Prompt is required for image generation', 'INVALID_PROMPT');
  }

  const model = options.model || 'fal-ai/flux/schnell';

  try {
    // Report initial progress
    if (onProgress) {
      onProgress(0, 'Starting generation...');
    }

    // Build request payload
    const input: Record<string, unknown> = {
      prompt: options.prompt,
      image_size: options.imageSize || 'square_hd',
      num_images: Math.min(4, Math.max(1, options.numImages || 1)),
      enable_safety_checker: options.enableSafetyChecker ?? true,
    };

    // Add optional parameters
    if (options.negativePrompt) {
      input.negative_prompt = options.negativePrompt;
    }

    if (options.seed !== undefined) {
      input.seed = options.seed;
    }

    if (options.numInferenceSteps) {
      input.num_inference_steps = options.numInferenceSteps;
    }

    if (options.guidanceScale) {
      input.guidance_scale = options.guidanceScale;
    }

    // Report progress
    if (onProgress) {
      onProgress(0.2, 'Sending request to AI...');
    }

    // Call fal.ai API
    const result = await fal.subscribe(model, {
      input,
      logs: false,
      onQueueUpdate: (update) => {
        if (onProgress && update.status === 'IN_PROGRESS') {
          onProgress(0.5, 'Generating image...');
        }
      },
    });

    // Report completion
    if (onProgress) {
      onProgress(1, 'Complete!');
    }

    // Type the result
    const typedResult = result as {
      images: Array<{ url: string; width: number; height: number; content_type?: string }>;
      seed: number;
      timings?: { inference?: number };
      has_nsfw_concepts?: boolean[];
    };

    // Transform result
    return {
      images: typedResult.images.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        contentType: img.content_type,
      })),
      seed: typedResult.seed,
      timings: {
        inference: typedResult.timings?.inference || 0,
      },
      hasNsfw: typedResult.has_nsfw_concepts?.some((v) => v),
    };
  } catch (error) {
    // Handle specific error types
    if (error instanceof ImageGenerationError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);

    // Check for common error patterns
    if (message.includes('401') || message.includes('unauthorized')) {
      throw new ImageGenerationError(
        'Invalid API key. Please check your fal.ai credentials.',
        'UNAUTHORIZED',
        error instanceof Error ? error : undefined
      );
    }

    if (message.includes('429') || message.includes('rate limit')) {
      throw new ImageGenerationError(
        'Rate limit exceeded. Please wait before generating more images.',
        'RATE_LIMITED',
        error instanceof Error ? error : undefined
      );
    }

    if (message.includes('402') || message.includes('payment')) {
      throw new ImageGenerationError(
        'Insufficient credits. Please add funds to your fal.ai account.',
        'PAYMENT_REQUIRED',
        error instanceof Error ? error : undefined
      );
    }

    throw new ImageGenerationError(
      `Image generation failed: ${message}`,
      'GENERATION_FAILED',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Generate a scientific diagram with optimized prompts
 *
 * @param subject - The subject of the diagram (e.g., "EGFR signaling pathway")
 * @param style - Illustration style preset
 * @param additionalPrompt - Additional prompt text (optional)
 * @param onProgress - Progress callback (optional)
 * @returns Promise resolving to generation result
 *
 * @example
 * ```typescript
 * const result = await generateScientificDiagram(
 *   'human heart anatomy',
 *   'detailed',
 *   'with labeled chambers and valves'
 * );
 * ```
 */
export async function generateScientificDiagram(
  subject: string,
  style: IllustrationStyle = 'clean',
  additionalPrompt?: string,
  onProgress?: AIProgressCallback
): Promise<GenerationResult> {
  // Build optimized prompt
  const prefix = STYLE_PREFIXES[style];
  const negativePrompt = STYLE_NEGATIVE_PROMPTS[style];

  let prompt = `${prefix}${subject}`;

  if (additionalPrompt) {
    prompt += `, ${additionalPrompt}`;
  }

  // Add quality boosters
  prompt += ', high quality, professional, educational, scientifically accurate';

  return generateImage(
    {
      prompt,
      negativePrompt,
      imageSize: 'square_hd',
      numImages: 1,
      model: 'fal-ai/flux/schnell', // Use fastest/cheapest for scientific diagrams
    },
    onProgress
  );
}

/**
 * Generate multiple variations of an image
 *
 * @param options - Base generation options
 * @param numVariations - Number of variations to generate (2-4)
 * @param onProgress - Progress callback
 * @returns Promise resolving to generation result with multiple images
 */
export async function generateVariations(
  options: GenerationOptions,
  numVariations: number = 4,
  onProgress?: AIProgressCallback
): Promise<GenerationResult> {
  const variations = Math.min(4, Math.max(2, numVariations));

  return generateImage(
    {
      ...options,
      numImages: variations,
    },
    onProgress
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Download a generated image as a blob
 *
 * @param imageUrl - URL of the generated image
 * @returns Promise resolving to image blob
 */
export async function downloadImageAsBlob(imageUrl: string): Promise<Blob> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    return response.blob();
  } catch (error) {
    throw new ImageGenerationError(
      `Failed to download image: ${error instanceof Error ? error.message : String(error)}`,
      'DOWNLOAD_FAILED',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Convert a generated image to a data URL for embedding
 *
 * @param imageUrl - URL of the generated image
 * @returns Promise resolving to data URL
 */
export async function imageToDataUrl(imageUrl: string): Promise<string> {
  const blob = await downloadImageAsBlob(imageUrl);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to convert image to data URL'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Estimate cost for generation
 *
 * @param model - FLUX model variant
 * @param numImages - Number of images
 * @returns Estimated cost in USD
 */
export function estimateCost(model: FluxModel, numImages: number = 1): number {
  const costPerImage: Record<FluxModel, number> = {
    'fal-ai/flux/schnell': 0.008,
    'fal-ai/flux/dev': 0.012,
    'fal-ai/flux-pro': 0.03,
  };

  return (costPerImage[model] || 0.008) * numImages;
}

/**
 * Get human-readable model info
 */
export function getModelInfo(model: FluxModel): {
  name: string;
  description: string;
  costPerImage: number;
  averageTime: string;
} {
  const info: Record<FluxModel, { name: string; description: string; costPerImage: number; averageTime: string }> = {
    'fal-ai/flux/schnell': {
      name: 'FLUX Schnell',
      description: 'Fastest generation, good quality',
      costPerImage: 0.008,
      averageTime: '~4-6 seconds',
    },
    'fal-ai/flux/dev': {
      name: 'FLUX Dev',
      description: 'Better quality, moderate speed',
      costPerImage: 0.012,
      averageTime: '~8-12 seconds',
    },
    'fal-ai/flux-pro': {
      name: 'FLUX Pro',
      description: 'Best quality, production use',
      costPerImage: 0.03,
      averageTime: '~12-20 seconds',
    },
  };

  return info[model] || info['fal-ai/flux/schnell'];
}
