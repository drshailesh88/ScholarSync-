/**
 * Canvas Utilities and Presets
 *
 * This module provides canvas-related utilities including poster presets,
 * canvas size management, and export configurations.
 */

export {
  // Poster sizes and presets
  posterSizes,
  posterThemes,
  posterTemplates,
  getPosterSize,
  getPosterTheme,
  getPosterTemplate,
  getPosterSizesByCategory,
  mmToPixels,
  pixelsToMm,
  getRecommendedDpi,
  generateSectionStyle,

  // Types
  type PosterSize,
  type PosterTemplate,
  type PosterSection,
  type PosterTheme
} from './poster-presets';

// Re-export default for convenience
export { default as posterPresets } from './poster-presets';
