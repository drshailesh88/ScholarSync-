/**
 * GeminiImageBackend.ts
 *
 * Nano Banana Pro / Nano Banana 2 image generation backend
 *
 * Uses Google Gemini's image generation models:
 * - gemini-3-pro-image-preview (Nano Banana Pro) - High quality, slower
 * - gemini-3.1-flash-image-preview (Nano Banana 2) - Fast, cost-effective
 *
 * Generates PNG images for scientific illustrations, designed to be
 * vectorized via imagetracerjs for editable SVG output.
 */

import GoogleGenerativeAI from '@google/genai';
import { CARDIOLOGY_DOMAIN_PROMPT } from '../prompts/cardiology-prompts';
import { NEUROSCIENCE_DOMAIN_PROMPT } from '../prompts/neuroscience-prompts';
import { BIOLOGY_DOMAIN_PROMPT } from '../prompts/biology-prompts';
import { CHEMISTRY_DOMAIN_PROMPT } from '../prompts/chemistry-prompts';
import { PHYSICS_DOMAIN_PROMPT } from '../prompts/physics-prompts';

// =============================================================================
// TYPES
// =============================================================================

export interface GeminiImageResult {
  /** Raw PNG bytes */
  pngBuffer: Buffer;
  /** MIME type */
  mimeType: string;
  /** The enhanced prompt used */
  prompt: string;
  /** Which model was used */
  model: string;
  /** Generation timestamp */
  generatedAt: Date;
}

export interface GeminiImageOptions {
  /** Domain context for specialized prompts */
  domain?: string;
  /** Style for vectorization-friendly output */
  style?: 'flat' | 'detailed' | 'schematic' | 'photorealistic';
  /** Model selection: 'pro' for high quality, 'flash' for speed */
  model?: 'pro' | 'flash';
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export class GeminiBackendError extends Error {
  constructor(
    message: string,
    public readonly code: 'MISSING_API_KEY' | 'GENERATION_FAILED' | 'NO_IMAGE' | 'API_ERROR',
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'GeminiBackendError';
  }
}

// =============================================================================
// DOMAIN PROMPT MAPPING
// =============================================================================

const DOMAIN_PROMPT_MAP: Record<string, string> = {
  cardiology: CARDIOLOGY_DOMAIN_PROMPT,
  neuroscience: NEUROSCIENCE_DOMAIN_PROMPT,
  neurology: NEUROSCIENCE_DOMAIN_PROMPT,
  biology: BIOLOGY_DOMAIN_PROMPT,
  chemistry: CHEMISTRY_DOMAIN_PROMPT,
  physics: PHYSICS_DOMAIN_PROMPT,
  // Add more domain mappings as needed from the 46 domain prompt files
};

function getDomainPrompt(domain?: string): string {
  if (!domain) return '';
  const normalizedDomain = domain.toLowerCase().replace(/[^a-z]/g, '');
  return DOMAIN_PROMPT_MAP[normalizedDomain] || '';
}

// =============================================================================
// VECTORIZATION-FRIENDLY STYLE PROMPTS
// =============================================================================

const STYLE_PREFIXES: Record<string, string> = {
  flat: `Create a clean, flat scientific illustration. Use distinct solid colors for each element. White background. No gradients, no shadows, no textures. Clear outlines with consistent stroke width. Simplified geometric shapes. Flat vector illustration style suitable for a scientific diagram. No text labels (labels will be added separately).`,

  schematic: `Create a technical schematic diagram. Use high contrast colors with distinct separation between elements. White or very light gray background. Bold black outlines for all shapes. Use standard scientific notation symbols. Clean, precise lines. No text labels. No gradients. Flat colors with good visibility for vectorization.`,

  detailed: `Create a detailed scientific illustration with clear visual hierarchy. Use a limited color palette with good contrast. White or light background. Minimal gradients. Clear outlines. Publication-quality scientific style. Maintain clean edges suitable for vectorization. No text labels.`,

  photorealistic: '', // No prefix - pass user's prompt directly
};

// =============================================================================
// MODEL CONFIGURATION
// =============================================================================

const MODEL_MAP = {
  pro: 'gemini-3-pro-image-preview',
  flash: 'gemini-3.1-flash-image-preview',
} as const;

// =============================================================================
// MAIN GENERATION FUNCTION
// =============================================================================

/**
 * Generate an image using Gemini/Nano Banana models
 *
 * @param prompt - User's natural language description
 * @param options - Generation options
 * @returns Promise with PNG buffer and metadata
 */
export async function generateImage(
  prompt: string,
  options: GeminiImageOptions = {}
): Promise<GeminiImageResult> {
  const {
    domain,
    style = 'flat',
    model = 'flash', // Default to flash for speed
  } = options;

  // Get API key from environment
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiBackendError(
      'GEMINI_API_KEY environment variable is not set',
      'MISSING_API_KEY'
    );
  }

  // Build enhanced prompt
  const enhancedPrompt = buildEnhancedPrompt(prompt, { domain, style });

  try {
    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);
    const selectedModel = MODEL_MAP[model];
    const generativeModel = genAI.getGenerativeModel({ model: selectedModel });

    // Generate image
    const startTime = Date.now();
    const response = await generativeModel.generateContent(enhancedPrompt);
    const generationTimeMs = Date.now() - startTime;

    // Extract image from response
    const imagePart = response.response.candidates?.[0]?.content?.parts?.find(
      part => part.inlineData !== undefined
    );

    if (!imagePart?.inlineData?.data) {
      throw new GeminiBackendError(
        'No image data in generation response',
        'NO_IMAGE',
        { response: JSON.stringify(response.response).slice(0, 500) }
      );
    }

    // Convert base64 to Buffer
    const pngBuffer = Buffer.from(imagePart.inlineData.data, 'base64');

    return {
      pngBuffer,
      mimeType: imagePart.inlineData.mimeType || 'image/png',
      prompt: enhancedPrompt,
      model: selectedModel,
      generatedAt: new Date(),
    };

  } catch (error) {
    if (error instanceof GeminiBackendError) {
      throw error;
    }

    throw new GeminiBackendError(
      `Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'API_ERROR',
      { originalError: error instanceof Error ? error.message : String(error) }
    );
  }
}

// =============================================================================
// PROMPT BUILDING
// =============================================================================

interface EnhancedPromptOptions {
  domain?: string;
  style: 'flat' | 'detailed' | 'schematic' | 'photorealistic';
}

function buildEnhancedPrompt(
  userPrompt: string,
  options: EnhancedPromptOptions
): string {
  const { domain, style } = options;

  // Start with style prefix (empty for photorealistic)
  let enhanced = STYLE_PREFIXES[style] || '';

  // Add domain-specific instructions if provided
  const domainPrompt = getDomainPrompt(domain);
  if (domainPrompt) {
    enhanced += '\n\n' + domainPrompt.trim();
  }

  // Add user's prompt
  enhanced += '\n\n' + userPrompt.trim();

  return enhanced;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Check if Gemini backend is available (API key configured)
 */
export function isGeminiAvailable(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

/**
 * Get the model name that will be used for a given model option
 */
export function getModelName(model?: 'pro' | 'flash'): string {
  return MODEL_MAP[model || 'flash'];
}

/**
 * Estimate generation time based on model selection
 */
export function estimateGenerationTime(model?: 'pro' | 'flash'): number {
  // Rough estimates in milliseconds
  return model === 'pro' ? 8000 : 3000;
}

// =============================================================================
// EXPORTS
// =============================================================================

export const geminiImageBackend = {
  generate: generateImage,
  isAvailable: isGeminiAvailable,
  getModelName,
  estimateGenerationTime,
  name: 'gemini',
};

export default geminiImageBackend;
