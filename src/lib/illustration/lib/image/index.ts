/**
 * Image Processing Library
 * Browser-based image manipulation tools
 *
 * @module lib/image
 */

export {
  // Main functions
  removeImageBackground,
  removeBackgroundFromUrl,
  removeBackgroundFromBlob,

  // Utility functions
  isBackgroundRemovalSupported,
  createPreviewUrl,
  revokePreviewUrl,

  // Types
  type BackgroundRemovalStage,
  type ProgressCallback,
  type BackgroundRemovalOptions,
  type BackgroundRemovalResult,

  // Error class
  BackgroundRemovalError,
} from './background-removal';
