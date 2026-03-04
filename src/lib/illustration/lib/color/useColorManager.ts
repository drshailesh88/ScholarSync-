/**
 * useColorManager - React hook for advanced color management
 *
 * Provides easy access to color conversion, palette generation,
 * contrast checking, and canvas color picker integration.
 *
 * @example
 * const { convert, checkContrast, generatePalette } = useColorManager();
 * const oklch = convert('#ff6b6b', 'oklch');
 * const contrast = checkContrast('#000000', '#ffffff');
 */

import { useState, useCallback, useMemo } from 'react';
import {
  // Color space conversions
  convertColor,
  toRGB,
  toHSL,
  toLAB,
  toLCH,
  toOKLCH,
  toP3,
  toCMYK,
  toHex,
  parseColor,
  toCSSColor,
  // Contrast and accessibility
  checkContrast,
  checkWCAGCompliance,
  getBestForeground,
  suggestAccessibleColor,
  getLuminance,
  // Palette generation
  generatePalette,
  getComplementary,
  getAnalogous,
  getTriadic,
  getSplitComplementary,
  getTetradic,
  getSquare,
  getMonochromatic,
  // Color scales
  createColorScale,
  getSequentialScale,
  getDivergingScale,
  getQualitativeScale,
  // Color manipulation
  mixColors,
  mixColorsOKLCH,
  lighten,
  darken,
  saturate,
  desaturate,
  grayscale,
  invert,
  // Color comparison
  deltaE,
  areColorsSimilar,
  // Gamut handling
  isInGamut,
  toGamut,
  // Types
  type ColorSpace,
  type PaletteType,
  type RGBColor,
  type HSLColor,
  type LABColor,
  type LCHColor,
  type OKLCHColor,
  type P3Color,
  type CMYKColor,
  type ContrastResult,
} from './index';

/** Color format type for conversion */
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'lab' | 'lch' | 'oklch' | 'p3' | 'cmyk' | 'css';

/** Color state for the color picker */
export interface ColorState {
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
  lab: LABColor;
  lch: LCHColor;
  oklch: OKLCHColor;
  cmyk: CMYKColor;
}

/** Color manager hook options */
export interface UseColorManagerOptions {
  /** Initial color (hex string) */
  initialColor?: string;
  /** Preferred color space for operations */
  preferredSpace?: ColorSpace;
}

/** Color manager hook return type */
export interface UseColorManagerReturn {
  // Current color state
  color: string;
  colorState: ColorState;
  setColor: (color: string) => void;

  // Color space conversions
  convert: (color: string, toSpace: ColorSpace) => string;
  toFormat: (color: string, format: ColorFormat) => string | RGBColor | HSLColor | LABColor | LCHColor | OKLCHColor | P3Color | CMYKColor;

  // Contrast checking
  checkContrast: (foreground: string, background: string) => { ratio: number; aa: boolean; aaa: boolean; aaLarge: boolean };
  checkWCAG: (foreground: string, background: string) => ContrastResult;
  getBestText: (background: string) => string;
  suggestAccessible: (targetHue: number, background: string, minContrast?: number) => string;
  getLuminance: (color: string) => number;

  // Palette generation
  generatePalette: (baseColor: string, type: PaletteType) => string[];
  getComplementary: (color: string) => string;
  getAnalogous: (color: string, count?: number) => string[];
  getTriadic: (color: string) => string[];
  getSplitComplementary: (color: string) => string[];
  getTetradic: (color: string) => string[];
  getSquare: (color: string) => string[];
  getMonochromatic: (color: string, steps?: number) => string[];

  // Color scales
  createScale: (start: string, end: string, steps: number) => string[];
  getSequentialScale: (baseColor: string, steps?: number, reverse?: boolean) => string[];
  getDivergingScale: (lowColor: string, highColor: string, steps?: number) => string[];
  getQualitativeScale: (count: number, saturation?: number) => string[];

  // Color manipulation
  mix: (color1: string, color2: string, ratio?: number) => string;
  mixOKLCH: (color1: string, color2: string, ratio?: number) => string;
  lighten: (color: string, amount?: number) => string;
  darken: (color: string, amount?: number) => string;
  saturate: (color: string, amount?: number) => string;
  desaturate: (color: string, amount?: number) => string;
  grayscale: (color: string) => string;
  invert: (color: string) => string;

  // Color comparison
  deltaE: (color1: string, color2: string) => number;
  areSimilar: (color1: string, color2: string, threshold?: number) => boolean;

  // Gamut handling
  isInGamut: (color: string) => boolean;
  toGamut: (color: string) => string;

  // Utility
  parse: (color: string) => string;
  isValid: (color: string) => boolean;
}

/**
 * Build the complete color state from a hex color
 */
function buildColorState(hex: string): ColorState {
  return {
    hex,
    rgb: toRGB(hex),
    hsl: toHSL(hex),
    lab: toLAB(hex),
    lch: toLCH(hex),
    oklch: toOKLCH(hex),
    cmyk: toCMYK(hex),
  };
}

/**
 * useColorManager - React hook for advanced color management
 *
 * Provides comprehensive color manipulation, conversion, and accessibility
 * checking capabilities for use with canvas color pickers and other UI components.
 */
export function useColorManager(
  options: UseColorManagerOptions = {}
): UseColorManagerReturn {
  const { initialColor = '#000000' } = options;

  // Current color state
  const [color, setColorInternal] = useState<string>(parseColor(initialColor));

  // Memoized color state object with all formats
  const colorState = useMemo(() => buildColorState(color), [color]);

  // Set color with validation
  const setColor = useCallback((newColor: string) => {
    try {
      const parsed = parseColor(newColor);
      setColorInternal(parsed);
    } catch {
      // Invalid color, keep current
    }
  }, []);

  // Convert color to target space
  const convert = useCallback(
    (inputColor: string, toSpace: ColorSpace): string => {
      return convertColor(inputColor, toSpace);
    },
    []
  );

  // Convert to specific format
  const toFormat = useCallback(
    (inputColor: string, format: ColorFormat): string | RGBColor | HSLColor | LABColor | LCHColor | OKLCHColor | P3Color | CMYKColor => {
      switch (format) {
        case 'hex':
          return toHex(inputColor);
        case 'rgb':
          return toRGB(inputColor);
        case 'hsl':
          return toHSL(inputColor);
        case 'lab':
          return toLAB(inputColor);
        case 'lch':
          return toLCH(inputColor);
        case 'oklch':
          return toOKLCH(inputColor);
        case 'p3':
          return toP3(inputColor);
        case 'cmyk':
          return toCMYK(inputColor);
        case 'css':
          return toCSSColor(inputColor);
        default:
          return toHex(inputColor);
      }
    },
    []
  );

  // Validate color
  const isValid = useCallback((inputColor: string): boolean => {
    try {
      parseColor(inputColor);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    // Color state
    color,
    colorState,
    setColor,

    // Conversions
    convert,
    toFormat,

    // Contrast checking
    checkContrast,
    checkWCAG: checkWCAGCompliance,
    getBestText: getBestForeground,
    suggestAccessible: suggestAccessibleColor,
    getLuminance,

    // Palette generation
    generatePalette,
    getComplementary,
    getAnalogous,
    getTriadic,
    getSplitComplementary,
    getTetradic,
    getSquare,
    getMonochromatic,

    // Color scales
    createScale: createColorScale,
    getSequentialScale,
    getDivergingScale,
    getQualitativeScale,

    // Color manipulation
    mix: mixColors,
    mixOKLCH: mixColorsOKLCH,
    lighten,
    darken,
    saturate,
    desaturate,
    grayscale,
    invert,

    // Color comparison
    deltaE,
    areSimilar: areColorsSimilar,

    // Gamut handling
    isInGamut,
    toGamut,

    // Utility
    parse: parseColor,
    isValid,
  };
}

export default useColorManager;
