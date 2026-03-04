/**
 * Rough.js Integration Module
 *
 * Rough.js is a library that lets you draw in a sketchy, hand-drawn-like style.
 * Perfect for creating informal, approachable scientific illustrations.
 *
 * @see https://roughjs.com/
 */

import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import type { Options as RoughOptions } from 'roughjs/bin/core';

// TODO: Create RoughCanvas wrapper component
// - Initialize rough.js on canvas or SVG element
// - Provide React-friendly API for drawing shapes
// - Handle canvas/SVG switching seamlessly

// TODO: Implement hand-drawn shape presets
// - Organic cell shapes for biology diagrams
// - Rough circuit components for engineering
// - Sketchy arrows and connectors
// - Informal text boxes and callouts

// TODO: Create style presets for different use cases
// - "Whiteboard" style with bold strokes
// - "Notebook" style with fine lines
// - "Chalkboard" style with textured fills
// - Custom style builder

// TODO: Integrate with existing canvas tools
// - Add "rough" mode toggle to shape tools
// - Preserve rough style when editing shapes
// - Convert clean shapes to rough style

// TODO: Performance optimization
// - Cache rendered rough shapes
// - Implement lazy rendering for complex scenes
// - Batch updates for multiple shapes

/**
 * Default rough.js options for scientific illustrations
 */
export const defaultRoughOptions: RoughOptions = {
  roughness: 1,
  bowing: 1,
  stroke: '#000000',
  strokeWidth: 2,
  fill: 'transparent',
  fillStyle: 'hachure',
  fillWeight: 0.5,
  hachureAngle: -41,
  hachureGap: 4,
};

/**
 * Style presets for common illustration styles
 */
export const roughStylePresets = {
  whiteboard: {
    roughness: 1.5,
    bowing: 1,
    strokeWidth: 3,
    fillStyle: 'solid',
  } as RoughOptions,

  notebook: {
    roughness: 0.5,
    bowing: 0.5,
    strokeWidth: 1,
    fillStyle: 'hachure',
  } as RoughOptions,

  chalkboard: {
    roughness: 2,
    bowing: 1.5,
    strokeWidth: 2,
    fillStyle: 'cross-hatch',
    fillWeight: 1,
  } as RoughOptions,

  technical: {
    roughness: 0.2,
    bowing: 0.2,
    strokeWidth: 1.5,
    fillStyle: 'dots',
  } as RoughOptions,
};

/**
 * Create a rough.js canvas instance
 */
export function createRoughCanvas(canvas: HTMLCanvasElement): RoughCanvas {
  return rough.canvas(canvas);
}

/**
 * Create a rough.js SVG instance
 */
export function createRoughSVG(svg: SVGSVGElement): ReturnType<typeof rough.svg> {
  return rough.svg(svg);
}

/**
 * Merge user options with defaults
 */
export function mergeRoughOptions(options: Partial<RoughOptions>): RoughOptions {
  return { ...defaultRoughOptions, ...options };
}

// Export hand-drawn style converter
export { HandDrawnStyle, convertToHandDrawn, createHandDrawnGenerator } from './HandDrawnStyle';
export type { StylePreset, HandDrawnStyleOptions } from './HandDrawnStyle';

// Export React hook
export { useHandDrawnStyle } from './useHandDrawnStyle';
export type { UseHandDrawnStyleOptions, UseHandDrawnStyleReturn } from './useHandDrawnStyle';

export { rough };
export type { RoughCanvas, RoughOptions };
