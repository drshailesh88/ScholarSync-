/**
 * AI Module Index
 *
 * Exports AI-related functionality including image generation.
 *
 * @module lib/ai
 */

// Image generation using fal.ai FLUX
export {
  // Main functions
  generateImage,
  generateScientificDiagram,
  generateVariations,

  // Configuration
  configureFalClient,
  isClientConfigured,

  // Utilities
  downloadImageAsBlob,
  imageToDataUrl,
  estimateCost,
  getModelInfo,

  // Types
  type ImageSize,
  type FluxModel,
  type IllustrationStyle,
  type GenerationOptions,
  type GeneratedImage,
  type GenerationResult,
  type AIProgressCallback,

  // Error class
  ImageGenerationError,
} from './image-generation';
