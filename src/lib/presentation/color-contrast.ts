// ---------------------------------------------------------------------------
// WCAG 2.1 Color Contrast Utilities
// ---------------------------------------------------------------------------

/**
 * Parse a hex color string (#RGB or #RRGGBB) into [r, g, b] in 0-255 range.
 */
function parseHex(hex: string): [number, number, number] {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const num = parseInt(h, 16);
  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
}

/**
 * Convert an sRGB channel value (0-255) to linear light.
 */
function sRGBtoLinear(channel: number): number {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * WCAG 2.1 relative luminance of a hex color.
 * Returns a value between 0 (black) and 1 (white).
 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return (
    0.2126 * sRGBtoLinear(r) +
    0.7152 * sRGBtoLinear(g) +
    0.0722 * sRGBtoLinear(b)
  );
}

/**
 * WCAG 2.1 contrast ratio between two hex colors.
 * Returns a value >= 1 (e.g. 4.5, 7.0, 21.0).
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if foreground on background meets WCAG AA.
 * Normal text: 4.5:1, large text (>=18pt or >=14pt bold): 3:1.
 */
export function meetsWCAG_AA(
  foreground: string,
  background: string,
  isLargeText = false,
): boolean {
  const ratio = contrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if foreground on background meets WCAG AAA.
 * Normal text: 7:1, large text: 4.5:1.
 */
export function meetsWCAG_AAA(
  foreground: string,
  background: string,
  isLargeText = false,
): boolean {
  const ratio = contrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Convert hex to HSL. Returns [h (0-360), s (0-1), l (0-1)].
 */
function hexToHSL(hex: string): [number, number, number] {
  const [r, g, b] = parseHex(hex).map((c) => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return [h * 360, s, l];
}

/**
 * Convert HSL to hex. h: 0-360, s: 0-1, l: 0-1.
 */
function hslToHex(h: number, s: number, l: number): string {
  const hNorm = h / 360;

  function hue2rgb(p: number, q: number, t: number): number {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  }

  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, hNorm + 1 / 3);
    g = hue2rgb(p, q, hNorm);
    b = hue2rgb(p, q, hNorm - 1 / 3);
  }

  const toHex = (c: number) =>
    Math.round(Math.max(0, Math.min(1, c)) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Suggest an adjusted foreground color that meets WCAG AA against the given
 * background. Keeps the hue and saturation, adjusts lightness.
 */
export function suggestAccessibleColor(
  foreground: string,
  background: string,
): string {
  if (meetsWCAG_AA(foreground, background)) return foreground;

  const [h, s] = hexToHSL(foreground);
  const bgLum = relativeLuminance(background);

  // Decide whether to darken or lighten based on background luminance
  const shouldDarken = bgLum > 0.5;

  // Binary search for a lightness that meets AA (4.5:1)
  let lo = shouldDarken ? 0 : 0.5;
  let hi = shouldDarken ? 0.5 : 1;

  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const candidate = hslToHex(h, s, mid);
    const ratio = contrastRatio(candidate, background);
    if (ratio >= 4.5) {
      if (shouldDarken) lo = mid;
      else hi = mid;
    } else {
      if (shouldDarken) hi = mid;
      else lo = mid;
    }
  }

  const finalL = shouldDarken ? lo : hi;
  return hslToHex(h, s, finalL);
}
