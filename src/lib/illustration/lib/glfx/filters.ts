/**
 * glfx.js Filter Functions
 *
 * This module provides high-level filter application functions
 * for WebGL-accelerated image processing.
 */

import type {
  GlfxCanvas,
  AdjustmentParams,
  BlurParams,
  DistortionParams,
  VignetteParams,
  FilterPreset,
} from './types';

// ============================================
// ADJUSTMENT FILTERS
// ============================================

/**
 * Apply brightness adjustment
 * @param canvas The glfx canvas
 * @param value -1 to 1 (0 = no change)
 */
export function applyBrightness(canvas: GlfxCanvas, value: number): GlfxCanvas {
  return canvas.brightnessContrast(Math.max(-1, Math.min(1, value)), 0);
}

/**
 * Apply contrast adjustment
 * @param canvas The glfx canvas
 * @param value -1 to 1 (0 = no change)
 */
export function applyContrast(canvas: GlfxCanvas, value: number): GlfxCanvas {
  return canvas.brightnessContrast(0, Math.max(-1, Math.min(1, value)));
}

/**
 * Apply combined brightness and contrast adjustment
 * @param canvas The glfx canvas
 * @param brightness -1 to 1 (0 = no change)
 * @param contrast -1 to 1 (0 = no change)
 */
export function applyBrightnessContrast(
  canvas: GlfxCanvas,
  brightness: number,
  contrast: number
): GlfxCanvas {
  return canvas.brightnessContrast(
    Math.max(-1, Math.min(1, brightness)),
    Math.max(-1, Math.min(1, contrast))
  );
}

/**
 * Apply hue rotation
 * @param canvas The glfx canvas
 * @param value -1 to 1 (rotates hue, -1 = -180deg, 1 = 180deg)
 */
export function applyHue(canvas: GlfxCanvas, value: number): GlfxCanvas {
  return canvas.hueSaturation(Math.max(-1, Math.min(1, value)), 0);
}

/**
 * Apply saturation adjustment
 * @param canvas The glfx canvas
 * @param value -1 to 1 (-1 = grayscale, 0 = no change)
 */
export function applySaturation(canvas: GlfxCanvas, value: number): GlfxCanvas {
  return canvas.hueSaturation(0, Math.max(-1, Math.min(1, value)));
}

/**
 * Apply combined hue and saturation adjustment
 * @param canvas The glfx canvas
 * @param hue -1 to 1
 * @param saturation -1 to 1
 */
export function applyHueSaturation(
  canvas: GlfxCanvas,
  hue: number,
  saturation: number
): GlfxCanvas {
  return canvas.hueSaturation(
    Math.max(-1, Math.min(1, hue)),
    Math.max(-1, Math.min(1, saturation))
  );
}

/**
 * Apply vibrance (smart saturation that preserves skin tones)
 * @param canvas The glfx canvas
 * @param value -1 to 1
 */
export function applyVibrance(canvas: GlfxCanvas, value: number): GlfxCanvas {
  return canvas.vibrance(Math.max(-1, Math.min(1, value)));
}

/**
 * Apply sepia tone effect
 * @param canvas The glfx canvas
 * @param amount 0 to 1
 */
export function applySepia(canvas: GlfxCanvas, amount: number): GlfxCanvas {
  return canvas.sepia(Math.max(0, Math.min(1, amount)));
}

/**
 * Apply all adjustment filters at once
 * @param canvas The glfx canvas
 * @param params Adjustment parameters
 */
export function applyAdjustments(canvas: GlfxCanvas, params: AdjustmentParams): GlfxCanvas {
  let result = canvas;

  if (params.brightness !== undefined || params.contrast !== undefined) {
    result = result.brightnessContrast(
      params.brightness ?? 0,
      params.contrast ?? 0
    );
  }

  if (params.hue !== undefined || params.saturation !== undefined) {
    result = result.hueSaturation(
      params.hue ?? 0,
      params.saturation ?? 0
    );
  }

  if (params.vibrance !== undefined) {
    result = result.vibrance(params.vibrance);
  }

  if (params.sepia !== undefined && params.sepia > 0) {
    result = result.sepia(params.sepia);
  }

  return result;
}

// ============================================
// BLUR FILTERS
// ============================================

/**
 * Apply gaussian-like blur using triangle blur
 * @param canvas The glfx canvas
 * @param radius Blur radius in pixels
 */
export function applyGaussianBlur(canvas: GlfxCanvas, radius: number): GlfxCanvas {
  // Apply multiple passes for smoother result (simulates gaussian)
  const passes = Math.min(3, Math.ceil(radius / 20));
  let result = canvas;
  const passRadius = radius / passes;

  for (let i = 0; i < passes; i++) {
    result = result.triangleBlur(passRadius);
  }

  return result;
}

/**
 * Apply simple triangle blur
 * @param canvas The glfx canvas
 * @param radius Blur radius in pixels
 */
export function applyTriangleBlur(canvas: GlfxCanvas, radius: number): GlfxCanvas {
  return canvas.triangleBlur(Math.max(0, radius));
}

/**
 * Apply zoom blur effect
 * @param canvas The glfx canvas
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param strength Blur strength (0-1)
 */
export function applyZoomBlur(
  canvas: GlfxCanvas,
  centerX: number = 0.5,
  centerY: number = 0.5,
  strength: number = 0.3
): GlfxCanvas {
  return canvas.zoomBlur(centerX, centerY, Math.max(0, Math.min(1, strength)));
}

/**
 * Apply tilt-shift miniature effect
 * @param canvas The glfx canvas
 * @param startY Top of focused area (0-1)
 * @param endY Bottom of focused area (0-1)
 * @param blurRadius Maximum blur radius
 * @param gradientRadius Gradient transition size
 */
export function applyTiltShift(
  canvas: GlfxCanvas,
  startY: number = 0.3,
  endY: number = 0.7,
  blurRadius: number = 15,
  gradientRadius: number = 200
): GlfxCanvas {
  return canvas.tiltShift(startY, endY, blurRadius, gradientRadius);
}

/**
 * Apply lens blur with hexagonal bokeh
 * @param canvas The glfx canvas
 * @param radius Blur radius
 * @param brightness Brightness adjustment for bokeh
 * @param angle Angle of hexagonal bokeh
 */
export function applyLensBlur(
  canvas: GlfxCanvas,
  radius: number = 10,
  brightness: number = 0,
  angle: number = 0
): GlfxCanvas {
  return canvas.lensBlur(radius, brightness, angle);
}

/**
 * Apply blur based on parameters
 * @param canvas The glfx canvas
 * @param params Blur parameters
 */
export function applyBlur(canvas: GlfxCanvas, params: BlurParams): GlfxCanvas {
  switch (params.type) {
    case 'triangle':
      return applyTriangleBlur(canvas, params.radius ?? 5);

    case 'zoom':
      return applyZoomBlur(
        canvas,
        params.centerX ?? 0.5,
        params.centerY ?? 0.5,
        params.strength ?? 0.3
      );

    case 'tiltShift':
      return applyTiltShift(
        canvas,
        params.startY ?? 0.3,
        params.endY ?? 0.7,
        params.radius ?? 15,
        params.gradientRadius ?? 200
      );

    case 'lens':
      return applyLensBlur(
        canvas,
        params.radius ?? 10,
        params.brightness ?? 0,
        params.angle ?? 0
      );

    default:
      return canvas;
  }
}

// ============================================
// DISTORTION FILTERS
// ============================================

/**
 * Apply swirl distortion effect
 * @param canvas The glfx canvas
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param radius Effect radius
 * @param angle Swirl angle in radians
 */
export function applySwirl(
  canvas: GlfxCanvas,
  centerX: number = 0.5,
  centerY: number = 0.5,
  radius: number = 200,
  angle: number = 3
): GlfxCanvas {
  return canvas.swirl(centerX, centerY, radius, angle);
}

/**
 * Apply bulge distortion effect (outward)
 * @param canvas The glfx canvas
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param radius Effect radius
 * @param strength Bulge strength (0-1)
 */
export function applyBulge(
  canvas: GlfxCanvas,
  centerX: number = 0.5,
  centerY: number = 0.5,
  radius: number = 200,
  strength: number = 0.5
): GlfxCanvas {
  return canvas.bulgePinch(centerX, centerY, radius, Math.max(0, Math.min(1, strength)));
}

/**
 * Apply pinch distortion effect (inward)
 * @param canvas The glfx canvas
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param radius Effect radius
 * @param strength Pinch strength (0-1)
 */
export function applyPinch(
  canvas: GlfxCanvas,
  centerX: number = 0.5,
  centerY: number = 0.5,
  radius: number = 200,
  strength: number = 0.5
): GlfxCanvas {
  return canvas.bulgePinch(centerX, centerY, radius, -Math.max(0, Math.min(1, strength)));
}

/**
 * Apply distortion based on parameters
 * @param canvas The glfx canvas
 * @param params Distortion parameters
 */
export function applyDistortion(canvas: GlfxCanvas, params: DistortionParams): GlfxCanvas {
  switch (params.type) {
    case 'swirl':
      return applySwirl(
        canvas,
        params.centerX,
        params.centerY,
        params.radius,
        params.angle ?? 3
      );

    case 'bulgePinch':
      return canvas.bulgePinch(
        params.centerX,
        params.centerY,
        params.radius,
        params.strength ?? 0.5
      );

    default:
      return canvas;
  }
}

// ============================================
// VIGNETTE & EFFECTS
// ============================================

/**
 * Apply vignette effect (darkening around edges)
 * @param canvas The glfx canvas
 * @param size Proportion of image that will be darkened (0-1)
 * @param amount Darkness amount (0-1)
 */
export function applyVignette(
  canvas: GlfxCanvas,
  size: number = 0.5,
  amount: number = 0.5
): GlfxCanvas {
  return canvas.vignette(
    Math.max(0, Math.min(1, size)),
    Math.max(0, Math.min(1, amount))
  );
}

/**
 * Apply vignette from parameters object
 */
export function applyVignetteParams(canvas: GlfxCanvas, params: VignetteParams): GlfxCanvas {
  return applyVignette(canvas, params.size, params.amount);
}

/**
 * Apply noise to the image
 * @param canvas The glfx canvas
 * @param amount Noise amount (0-1)
 */
export function applyNoise(canvas: GlfxCanvas, amount: number): GlfxCanvas {
  return canvas.noise(Math.max(0, Math.min(1, amount)));
}

/**
 * Apply denoise effect
 * @param canvas The glfx canvas
 * @param strength Denoise strength (0-1)
 */
export function applyDenoise(canvas: GlfxCanvas, strength: number): GlfxCanvas {
  return canvas.denoise(Math.max(0, Math.min(1, strength)));
}

/**
 * Apply unsharp mask for sharpening
 * @param canvas The glfx canvas
 * @param radius Blur radius for mask
 * @param strength Sharpening strength
 */
export function applySharpen(
  canvas: GlfxCanvas,
  radius: number = 5,
  strength: number = 1
): GlfxCanvas {
  return canvas.unsharpMask(radius, strength);
}

/**
 * Apply ink sketch effect
 * @param canvas The glfx canvas
 * @param strength Effect strength (0-1)
 */
export function applyInk(canvas: GlfxCanvas, strength: number = 0.25): GlfxCanvas {
  return canvas.ink(Math.max(0, Math.min(1, strength)));
}

/**
 * Apply edge detection
 * @param canvas The glfx canvas
 * @param radius Edge detection radius
 */
export function applyEdgeWork(canvas: GlfxCanvas, radius: number = 10): GlfxCanvas {
  return canvas.edgeWork(radius);
}

/**
 * Apply dot screen halftone effect
 * @param canvas The glfx canvas
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param angle Angle in radians
 * @param size Dot size
 */
export function applyDotScreen(
  canvas: GlfxCanvas,
  centerX: number = 0.5,
  centerY: number = 0.5,
  angle: number = 1.1,
  size: number = 3
): GlfxCanvas {
  return canvas.dotScreen(centerX, centerY, angle, size);
}

/**
 * Apply hexagonal pixelation
 * @param canvas The glfx canvas
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param scale Pixel scale
 */
export function applyHexagonalPixelate(
  canvas: GlfxCanvas,
  centerX: number = 0.5,
  centerY: number = 0.5,
  scale: number = 10
): GlfxCanvas {
  return canvas.hexagonalPixelate(centerX, centerY, scale);
}

// ============================================
// FILTER PRESETS
// ============================================

/**
 * Pre-defined filter presets for common effects
 */
export const filterPresets: Record<string, FilterPreset> = {
  // Scientific illustration presets
  highContrast: {
    name: 'High Contrast',
    description: 'Increases contrast for clearer scientific images',
    apply: (canvas) => canvas.brightnessContrast(0, 0.4),
  },

  grayscale: {
    name: 'Grayscale',
    description: 'Converts to grayscale for publications',
    apply: (canvas) => canvas.hueSaturation(0, -1),
  },

  sharpen: {
    name: 'Sharpen',
    description: 'Sharpens image details',
    apply: (canvas) => canvas.unsharpMask(5, 1.5),
  },

  denoise: {
    name: 'Denoise',
    description: 'Reduces noise in microscopy images',
    apply: (canvas) => canvas.denoise(50),
  },

  // Artistic presets
  vintage: {
    name: 'Vintage',
    description: 'Applies a warm vintage look',
    apply: (canvas) =>
      canvas
        .sepia(0.3)
        .brightnessContrast(0.05, 0.1)
        .vignette(0.5, 0.4),
  },

  dramatic: {
    name: 'Dramatic',
    description: 'High contrast with vignette',
    apply: (canvas) =>
      canvas
        .brightnessContrast(0, 0.3)
        .vibrance(0.2)
        .vignette(0.3, 0.5),
  },

  soft: {
    name: 'Soft',
    description: 'Soft, dreamy effect',
    apply: (canvas) =>
      canvas
        .triangleBlur(2)
        .brightnessContrast(0.1, -0.1),
  },

  sketch: {
    name: 'Sketch',
    description: 'Ink sketch effect',
    apply: (canvas) => canvas.ink(0.25),
  },

  // Focus presets
  tiltShiftMiniature: {
    name: 'Tilt-Shift',
    description: 'Miniature/toy effect',
    apply: (canvas) =>
      canvas
        .tiltShift(0.3, 0.7, 15, 200)
        .brightnessContrast(0.05, 0.1)
        .vibrance(0.2),
  },

  radialBlur: {
    name: 'Radial Blur',
    description: 'Blur radiating from center',
    apply: (canvas) => canvas.zoomBlur(0.5, 0.5, 0.1),
  },

  // Clean-up presets
  cleanPublication: {
    name: 'Publication Ready',
    description: 'Clean, high-contrast for papers',
    apply: (canvas) =>
      canvas
        .brightnessContrast(0, 0.2)
        .unsharpMask(3, 0.8),
  },

  posterize: {
    name: 'Posterize',
    description: 'Reduces colors for clear diagrams',
    apply: (canvas) =>
      canvas
        .brightnessContrast(0.1, 0.3)
        .vibrance(0.3),
  },
};

/**
 * Apply a preset by name
 * @param canvas The glfx canvas
 * @param presetName Name of the preset
 */
export function applyPreset(canvas: GlfxCanvas, presetName: string): GlfxCanvas {
  const preset = filterPresets[presetName];
  if (preset) {
    return preset.apply(canvas);
  }
  console.warn(`Filter preset "${presetName}" not found`);
  return canvas;
}

/**
 * Get all available preset names
 */
export function getPresetNames(): string[] {
  return Object.keys(filterPresets);
}

/**
 * Get preset info by name
 */
export function getPresetInfo(presetName: string): FilterPreset | undefined {
  return filterPresets[presetName];
}
