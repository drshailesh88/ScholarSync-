/**
 * Color Manipulation Module
 *
 * Provides color conversion, manipulation, and palette generation
 * using the 'color' library for immutable color operations and
 * Color.js for advanced color space support (OKLCH, P3, CMYK).
 *
 * Features:
 * - Color space conversions (RGB, HSL, LAB, LCH, OKLCH, P3)
 * - WCAG contrast ratio calculation (AA/AAA compliance)
 * - Palette generation (complementary, analogous, triadic, etc.)
 * - Scientific domain color schemes
 * - CMYK conversion for print workflows
 * - Perceptually uniform color scales
 *
 * @see https://github.com/Qix-/color
 * @see https://colorjs.io/
 */

import Color from 'color';
import ColorJS from 'colorjs.io';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/** RGB color representation */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

/** HSL color representation */
export interface HSLColor {
  h: number;
  s: number;
  l: number;
  alpha?: number;
}

/** LAB color representation (CIE L*a*b*) */
export interface LABColor {
  l: number;
  a: number;
  b: number;
  alpha?: number;
}

/** LCH color representation (CIE LCH) */
export interface LCHColor {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

/** OKLCH color representation (perceptually uniform) */
export interface OKLCHColor {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

/** Display P3 color representation (wide gamut) */
export interface P3Color {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

/** CMYK color representation (for print) */
export interface CMYKColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

/** Color space types supported by Color.js */
export type ColorSpace = 'srgb' | 'lab' | 'lch' | 'oklch' | 'p3' | 'hsl' | 'hwb' | 'oklab';

/** Palette type for generation */
export type PaletteType = 'complementary' | 'triadic' | 'analogous' | 'split-complementary' | 'tetradic' | 'square';

/** WCAG compliance levels */
export type WCAGLevel = 'AAA' | 'AA' | 'AA-large' | 'fail';

/** Contrast check result */
export interface ContrastResult {
  ratio: number;
  level: WCAGLevel;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
}

/** Palette generation options */
export interface PaletteOptions {
  count?: number;
  includeBase?: boolean;
}

// ============================================================================
// COLOR SPACE CONVERSIONS
// ============================================================================

/**
 * Convert any color input to RGB
 */
export function toRGB(input: string | number | object): RGBColor {
  const c = Color(input);
  const rgb = c.rgb().object();
  return {
    r: Math.round(rgb.r),
    g: Math.round(rgb.g),
    b: Math.round(rgb.b),
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to HSL
 */
export function toHSL(input: string | number | object): HSLColor {
  const c = Color(input);
  const hsl = c.hsl().object();
  return {
    h: Math.round(hsl.h),
    s: Math.round(hsl.s),
    l: Math.round(hsl.l),
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to LAB (CIE L*a*b*)
 * LAB is perceptually uniform, ideal for scientific color comparisons
 */
export function toLAB(input: string | number | object): LABColor {
  const c = Color(input);
  const lab = c.lab().object();
  return {
    l: lab.l,
    a: lab.a,
    b: lab.b,
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to LCH (CIE LCH)
 * LCH is the cylindrical representation of LAB, useful for perceptual hue shifts
 */
export function toLCH(input: string | number | object): LCHColor {
  const c = Color(input);
  const lch = c.lch().object();
  return {
    l: lch.l,
    c: lch.c,
    h: lch.h,
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to HEX string
 */
export function toHex(input: string | number | object): string {
  return Color(input).hex();
}

/**
 * Create a color from RGB values
 */
export function fromRGB(r: number, g: number, b: number, alpha?: number): string {
  const c = Color.rgb(r, g, b);
  return alpha !== undefined ? c.alpha(alpha).hexa() : c.hex();
}

/**
 * Create a color from HSL values
 */
export function fromHSL(h: number, s: number, l: number, alpha?: number): string {
  const c = Color.hsl(h, s, l);
  return alpha !== undefined ? c.alpha(alpha).hexa() : c.hex();
}

/**
 * Create a color from LAB values
 */
export function fromLAB(l: number, a: number, b: number, alpha?: number): string {
  const c = Color.lab(l, a, b);
  return alpha !== undefined ? c.alpha(alpha).hexa() : c.hex();
}

/**
 * Create a color from LCH values
 */
export function fromLCH(l: number, c: number, h: number, alpha?: number): string {
  const color = Color.lch(l, c, h);
  return alpha !== undefined ? color.alpha(alpha).hexa() : color.hex();
}

// ============================================================================
// WCAG CONTRAST RATIO CALCULATION
// ============================================================================

/**
 * Calculate WCAG contrast ratio between two colors
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function getContrastRatio(foreground: string, background: string): number {
  const fg = Color(foreground);
  const bg = Color(background);
  return fg.contrast(bg);
}

/**
 * Check WCAG compliance level for a color pair
 * - AAA: 7:1 contrast (highest, for body text)
 * - AA: 4.5:1 contrast (minimum for body text)
 * - AA-large: 3:1 contrast (minimum for large text, 18pt+)
 */
export function checkWCAGCompliance(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  let level: WCAGLevel = 'fail';
  if (ratio >= 7) {
    level = 'AAA';
  } else if (ratio >= 4.5) {
    level = 'AA';
  } else if (ratio >= 3) {
    level = 'AA-large';
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    passesAALarge: ratio >= 3,
  };
}

/**
 * Find the best foreground color (black or white) for a given background
 */
export function getBestForeground(background: string): string {
  const bg = Color(background);
  const whiteContrast = Color('#FFFFFF').contrast(bg);
  const blackContrast = Color('#000000').contrast(bg);
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
}

/**
 * Suggest an accessible color based on a target hue
 * Adjusts lightness to meet minimum contrast requirements
 */
export function suggestAccessibleColor(
  targetHue: number,
  background: string,
  minContrast: number = 4.5
): string {
  const bg = Color(background);
  const bgIsLight = bg.isLight();

  // Start with target hue at medium saturation
  let testColor = Color.hsl(targetHue, 70, bgIsLight ? 35 : 65);
  let contrast = testColor.contrast(bg);

  // Adjust lightness until we meet contrast requirement
  let iterations = 0;
  while (contrast < minContrast && iterations < 50) {
    if (bgIsLight) {
      testColor = testColor.darken(0.05);
    } else {
      testColor = testColor.lighten(0.05);
    }
    contrast = testColor.contrast(bg);
    iterations++;
  }

  return testColor.hex();
}

// TODO: Create ColorPicker component
// - Color wheel interface
// - HSL/RGB/HEX input modes
// - Alpha channel support
// - Eyedropper tool integration

// TODO: Add color blindness simulation
// - Protanopia, deuteranopia, tritanopia filters
// - Preview modes for accessibility testing

// TODO: Create gradient tools
// - Linear gradient builder
// - Radial gradient builder
// - Gradient presets for scientific viz
// - Export gradients to CSS/SVG

/**
 * Scientific domain color palettes
 */
export const domainPalettes = {
  biology: {
    cell: '#E8F5E9',
    membrane: '#81C784',
    nucleus: '#4CAF50',
    protein: '#FF9800',
    dna: '#2196F3',
    rna: '#9C27B0',
    mitochondria: '#F44336',
    chloroplast: '#8BC34A',
  },

  chemistry: {
    carbon: '#333333',
    oxygen: '#F44336',
    nitrogen: '#2196F3',
    hydrogen: '#FFFFFF',
    sulfur: '#FFEB3B',
    phosphorus: '#FF9800',
    chlorine: '#4CAF50',
    bond: '#9E9E9E',
  },

  physics: {
    positive: '#F44336',
    negative: '#2196F3',
    neutral: '#9E9E9E',
    field: '#9C27B0',
    wave: '#00BCD4',
    energy: '#FFEB3B',
    force: '#FF5722',
  },

  medical: {
    artery: '#F44336',
    vein: '#3F51B5',
    nerve: '#FFEB3B',
    bone: '#EFEBE9',
    muscle: '#D32F2F',
    organ: '#FF8A80',
    tissue: '#FFCCBC',
  },
};

/** Color instance type */
type ColorInstance = ReturnType<typeof Color>;

/**
 * Create a Color instance from various formats
 */
export function createColor(input: string | number | object): ColorInstance {
  return Color(input);
}

/**
 * Generate a complementary color
 */
export function getComplementary(color: string): string {
  return Color(color).rotate(180).hex();
}

/**
 * Generate analogous colors
 */
export function getAnalogous(color: string, count: number = 3): string[] {
  const base = Color(color);
  const step = 30;
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i - Math.floor(count / 2)) * step;
    colors.push(base.rotate(angle).hex());
  }

  return colors;
}

/**
 * Generate triadic colors (3 colors evenly spaced on the color wheel)
 */
export function getTriadic(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(120).hex(),
    base.rotate(240).hex(),
  ];
}

/**
 * Generate split-complementary colors
 * Base color + two colors adjacent to its complement
 */
export function getSplitComplementary(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(150).hex(),
    base.rotate(210).hex(),
  ];
}

/**
 * Generate tetradic (rectangular) colors
 * Two complementary pairs
 */
export function getTetradic(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(60).hex(),
    base.rotate(180).hex(),
    base.rotate(240).hex(),
  ];
}

/**
 * Generate square colors (4 colors evenly spaced on the color wheel)
 */
export function getSquare(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(90).hex(),
    base.rotate(180).hex(),
    base.rotate(270).hex(),
  ];
}

/**
 * Generate a monochromatic scale
 */
export function getMonochromatic(color: string, steps: number = 5): string[] {
  const base = Color(color);
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    const lightness = 20 + (60 * i / (steps - 1));
    colors.push(base.lightness(lightness).hex());
  }

  return colors;
}

/**
 * Mix two colors
 */
export function mixColors(color1: string, color2: string, weight: number = 0.5): string {
  return Color(color1).mix(Color(color2), weight).hex();
}

/**
 * Adjust color for better contrast against background
 */
export function ensureContrast(foreground: string, background: string, minContrast: number = 4.5): string {
  let fg = Color(foreground);
  const bg = Color(background);

  let contrast = fg.contrast(bg);

  // Darken or lighten until we meet minimum contrast
  while (contrast < minContrast) {
    if (bg.isLight()) {
      fg = fg.darken(0.1);
    } else {
      fg = fg.lighten(0.1);
    }
    contrast = fg.contrast(bg);

    // Prevent infinite loop
    if (fg.lightness() <= 0 || fg.lightness() >= 100) break;
  }

  return fg.hex();
}

/**
 * Convert color to print-friendly CMYK approximation
 */
export function toPrintSafe(color: string): string {
  // Reduce saturation slightly for print compatibility
  return Color(color).saturate(-0.1).hex();
}

// ============================================================================
// SCIENTIFIC COLOR SCHEMES
// ============================================================================

/**
 * Generate a sequential color scale (good for data visualization)
 * Uses LAB color space for perceptually uniform lightness steps
 */
export function getSequentialScale(
  baseColor: string,
  steps: number = 5,
  reverse: boolean = false
): string[] {
  const base = Color(baseColor);
  const lab = base.lab().object();
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    // Vary lightness from 95 (light) to 25 (dark)
    const lightness = 95 - (70 * i / (steps - 1));
    colors.push(Color.lab(lightness, lab.a, lab.b).hex());
  }

  return reverse ? colors.reverse() : colors;
}

/**
 * Generate a diverging color scale (good for showing positive/negative values)
 * Two hues diverging from a neutral center
 */
export function getDivergingScale(
  lowColor: string,
  highColor: string,
  steps: number = 9
): string[] {
  const low = Color(lowColor);
  const high = Color(highColor);
  const colors: string[] = [];
  const midpoint = Math.floor(steps / 2);

  for (let i = 0; i < steps; i++) {
    if (i < midpoint) {
      // Low to white
      const t = i / midpoint;
      colors.push(low.lightness(low.lightness() + (95 - low.lightness()) * t).hex());
    } else if (i === midpoint) {
      // Neutral center
      colors.push('#F5F5F5');
    } else {
      // White to high
      const t = (i - midpoint) / (steps - 1 - midpoint);
      colors.push(high.lightness(95 - (95 - high.lightness()) * t).hex());
    }
  }

  return colors;
}

/**
 * Generate a qualitative color palette (good for categorical data)
 * Uses LCH color space for perceptually distinct colors
 */
export function getQualitativeScale(count: number, saturation: number = 70): string[] {
  const colors: string[] = [];
  const lightness = 55;

  for (let i = 0; i < count; i++) {
    const hue = (i * 360 / count + 30) % 360; // Offset to avoid starting at red
    colors.push(Color.lch(lightness, saturation, hue).hex());
  }

  return colors;
}

/**
 * Calculate perceptual color difference (Delta E)
 * Uses CIE LAB color space for accurate color comparison
 * @returns Delta E value (0 = identical, >2.3 = noticeable difference)
 */
export function getColorDifference(color1: string, color2: string): number {
  const lab1 = toLAB(color1);
  const lab2 = toLAB(color2);

  // CIE76 Delta E formula
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

/**
 * Check if two colors are perceptually similar
 * @param threshold Delta E threshold (default 2.3 = just noticeable difference)
 */
export function areColorsSimilar(
  color1: string,
  color2: string,
  threshold: number = 2.3
): boolean {
  return getColorDifference(color1, color2) < threshold;
}

/**
 * Lighten a color by a percentage
 */
export function lighten(color: string, amount: number = 0.1): string {
  return Color(color).lighten(amount).hex();
}

/**
 * Darken a color by a percentage
 */
export function darken(color: string, amount: number = 0.1): string {
  return Color(color).darken(amount).hex();
}

/**
 * Saturate a color by a percentage
 */
export function saturate(color: string, amount: number = 0.1): string {
  return Color(color).saturate(amount).hex();
}

/**
 * Desaturate a color by a percentage
 */
export function desaturate(color: string, amount: number = 0.1): string {
  return Color(color).desaturate(amount).hex();
}

/**
 * Get the grayscale version of a color
 */
export function grayscale(color: string): string {
  return Color(color).grayscale().hex();
}

/**
 * Invert a color
 */
export function invert(color: string): string {
  return Color(color).negate().hex();
}

// ============================================================================
// COLOR.JS ADVANCED COLOR SPACE SUPPORT
// ============================================================================

/**
 * Convert a color to a specified color space using Color.js
 * Supports wide gamut spaces like P3 and perceptually uniform OKLCH
 *
 * @param color - Input color string (hex, rgb, hsl, etc.)
 * @param toSpace - Target color space
 * @returns Color string in the target space
 */
export function convertColor(
  color: string,
  toSpace: ColorSpace
): string {
  try {
    const c = new ColorJS(color);
    const converted = c.to(toSpace);
    return converted.toString({ format: 'hex' });
  } catch {
    // Fallback to original color if conversion fails
    return color;
  }
}

/**
 * Convert a color to OKLCH color space
 * OKLCH provides perceptually uniform lightness, chroma, and hue
 *
 * @param color - Input color string
 * @returns OKLCH color components
 */
export function toOKLCH(color: string): OKLCHColor {
  const c = new ColorJS(color);
  const oklch = c.to('oklch');
  const coords = oklch.coords;
  return {
    l: coords[0] ?? 0,
    c: coords[1] ?? 0,
    h: coords[2] ?? 0,
    alpha: oklch.alpha,
  };
}

/**
 * Create a color from OKLCH values
 *
 * @param l - Lightness (0-1)
 * @param c - Chroma (0-0.4 typical)
 * @param h - Hue (0-360)
 * @param alpha - Optional alpha (0-1)
 * @returns Hex color string
 */
export function fromOKLCH(l: number, c: number, h: number, alpha?: number): string {
  const color = new ColorJS('oklch', [l, c, h], alpha);
  return color.to('srgb').toString({ format: 'hex' });
}

/**
 * Convert a color to Display P3 color space (wide gamut)
 *
 * @param color - Input color string
 * @returns P3 color components
 */
export function toP3(color: string): P3Color {
  const c = new ColorJS(color);
  const p3 = c.to('p3');
  const coords = p3.coords;
  return {
    r: coords[0] ?? 0,
    g: coords[1] ?? 0,
    b: coords[2] ?? 0,
    alpha: p3.alpha,
  };
}

/**
 * Convert a color to CMYK for print workflows
 * Uses a simple conversion algorithm (not ICC profile based)
 *
 * @param color - Input color string
 * @returns CMYK color components (0-100 scale)
 */
export function toCMYK(color: string): CMYKColor {
  const rgb = toRGB(color);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Create a color from CMYK values
 *
 * @param c - Cyan (0-100)
 * @param m - Magenta (0-100)
 * @param y - Yellow (0-100)
 * @param k - Key/Black (0-100)
 * @returns Hex color string
 */
export function fromCMYK(c: number, m: number, y: number, k: number): string {
  const cyan = c / 100;
  const magenta = m / 100;
  const yellow = y / 100;
  const key = k / 100;

  const r = Math.round(255 * (1 - cyan) * (1 - key));
  const g = Math.round(255 * (1 - magenta) * (1 - key));
  const b = Math.round(255 * (1 - yellow) * (1 - key));

  return fromRGB(r, g, b);
}

/**
 * Generate an accessible color palette using Color.js
 *
 * @param baseColor - Base color for palette generation
 * @param type - Type of color harmony
 * @returns Array of hex color strings
 */
export function generatePalette(
  baseColor: string,
  type: PaletteType
): string[] {
  switch (type) {
    case 'complementary':
      return [baseColor, getComplementary(baseColor)];
    case 'triadic':
      return getTriadic(baseColor);
    case 'analogous':
      return getAnalogous(baseColor, 5);
    case 'split-complementary':
      return getSplitComplementary(baseColor);
    case 'tetradic':
      return getTetradic(baseColor);
    case 'square':
      return getSquare(baseColor);
    default:
      return [baseColor];
  }
}

/**
 * Check WCAG contrast ratio using Color.js
 * Provides more accurate contrast calculation
 *
 * @param foreground - Foreground color
 * @param background - Background color
 * @returns Contrast result with ratio and compliance levels
 */
export function checkContrast(
  foreground: string,
  background: string
): { ratio: number; aa: boolean; aaa: boolean; aaLarge: boolean } {
  try {
    const fg = new ColorJS(foreground);
    const bg = new ColorJS(background);
    const ratio = fg.contrast(bg, 'WCAG21');

    return {
      ratio: Math.round(ratio * 100) / 100,
      aa: ratio >= 4.5,
      aaa: ratio >= 7,
      aaLarge: ratio >= 3,
    };
  } catch {
    // Fallback to basic contrast check
    const result = checkWCAGCompliance(foreground, background);
    return {
      ratio: result.ratio,
      aa: result.passesAA,
      aaa: result.passesAAA,
      aaLarge: result.passesAALarge,
    };
  }
}

/**
 * Mix two colors using Color.js interpolation
 * Uses OKLCH color space for perceptually uniform mixing
 *
 * @param color1 - First color
 * @param color2 - Second color
 * @param ratio - Mix ratio (0 = color1, 1 = color2, 0.5 = equal mix)
 * @returns Mixed color as hex string
 */
export function mixColorsOKLCH(
  color1: string,
  color2: string,
  ratio: number = 0.5
): string {
  try {
    const c1 = new ColorJS(color1);
    const c2 = new ColorJS(color2);
    const mixed = c1.mix(c2, ratio, { space: 'oklch' });
    return mixed.to('srgb').toString({ format: 'hex' });
  } catch {
    // Fallback to basic mixing
    return mixColors(color1, color2, ratio);
  }
}

/**
 * Create a perceptually uniform color scale using OKLCH
 * Ideal for data visualization where each step should look equally different
 *
 * @param start - Start color
 * @param end - End color
 * @param steps - Number of colors in the scale
 * @returns Array of hex color strings
 */
export function createColorScale(
  start: string,
  end: string,
  steps: number
): string[] {
  if (steps < 2) return [start];

  try {
    const c1 = new ColorJS(start);
    const c2 = new ColorJS(end);
    const colors: string[] = [];

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const interpolated = c1.mix(c2, t, { space: 'oklch' });
      colors.push(interpolated.to('srgb').toString({ format: 'hex' }));
    }

    return colors;
  } catch {
    // Fallback to basic interpolation
    return getDivergingScale(start, end, steps);
  }
}

/**
 * Check if a color is within the sRGB gamut
 *
 * @param color - Color string to check
 * @returns True if color is within sRGB gamut
 */
export function isInGamut(color: string): boolean {
  try {
    const c = new ColorJS(color);
    return c.inGamut('srgb');
  } catch {
    return true;
  }
}

/**
 * Clamp a color to the sRGB gamut
 * Useful when working with wide gamut colors that need to display on standard monitors
 *
 * @param color - Color string to clamp
 * @returns Gamut-mapped color as hex string
 */
export function toGamut(color: string): string {
  try {
    const c = new ColorJS(color);
    const gamutMapped = c.toGamut('srgb');
    return gamutMapped.toString({ format: 'hex' });
  } catch {
    return color;
  }
}

/**
 * Calculate Delta E (color difference) using OKLCH
 * More accurate than CIE76 for perceptual color difference
 *
 * @param color1 - First color
 * @param color2 - Second color
 * @returns Delta E value (0 = identical)
 */
export function deltaE(color1: string, color2: string): number {
  try {
    const c1 = new ColorJS(color1);
    const c2 = new ColorJS(color2);
    return c1.deltaE(c2, 'OK');
  } catch {
    return getColorDifference(color1, color2);
  }
}

/**
 * Get color in CSS format for the specified color space
 *
 * @param color - Input color string
 * @param space - Target color space
 * @returns CSS color string
 */
export function toCSSColor(color: string, space: ColorSpace = 'srgb'): string {
  try {
    const c = new ColorJS(color);
    const converted = c.to(space);
    return converted.toString();
  } catch {
    return color;
  }
}

/**
 * Parse any color format and return normalized hex
 *
 * @param color - Input color in any format
 * @returns Normalized hex color string
 */
export function parseColor(color: string): string {
  try {
    const c = new ColorJS(color);
    return c.to('srgb').toString({ format: 'hex' });
  } catch {
    return toHex(color);
  }
}

/**
 * Get the relative luminance of a color (0-1)
 * Used for WCAG contrast calculations
 *
 * @param color - Input color string
 * @returns Relative luminance value
 */
export function getLuminance(color: string): number {
  try {
    const c = new ColorJS(color);
    return c.luminance;
  } catch {
    const rgb = toRGB(color);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const toLinear = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }
}

// Export Color.js for direct use
export { Color, ColorJS };
