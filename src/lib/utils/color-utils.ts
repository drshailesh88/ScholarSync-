export interface HSBColor {
  h: number;
  s: number;
  b: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface ParsedHexColor {
  hex: string;
  rgb: RGBColor;
  alpha: number;
  hasAlpha: boolean;
}

const HEX_PATTERN = /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toByte(value: number): number {
  return clamp(Math.round(value), 0, 255);
}

function toHexPair(value: number): string {
  return toByte(value).toString(16).padStart(2, "0").toUpperCase();
}

function normalizeAlphaValue(alpha: number): number {
  if (!Number.isFinite(alpha)) return 1;
  if (alpha > 1) return clamp(alpha / 100, 0, 1);
  return clamp(alpha, 0, 1);
}

function expandShortHex(hex: string): string {
  return hex
    .split("")
    .map((char) => `${char}${char}`)
    .join("");
}

export function isValidHex(hex: string): boolean {
  return HEX_PATTERN.test(hex.trim());
}

export function normalizeHex(hex: string): string | null {
  const trimmed = hex.trim();
  if (!isValidHex(trimmed)) return null;

  const raw = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  const expanded = raw.length === 3 || raw.length === 4 ? expandShortHex(raw) : raw;
  return `#${expanded.toUpperCase()}`;
}

export function parseHexColor(hex: string): ParsedHexColor {
  const normalized = normalizeHex(hex) ?? "#000000";
  const raw = normalized.slice(1);
  const hasAlpha = raw.length === 8;
  const base = hasAlpha ? raw.slice(0, 6) : raw;
  const rgb = {
    r: Number.parseInt(base.slice(0, 2), 16),
    g: Number.parseInt(base.slice(2, 4), 16),
    b: Number.parseInt(base.slice(4, 6), 16),
  };

  return {
    hex: normalized,
    rgb,
    alpha: hasAlpha ? Number.parseInt(raw.slice(6, 8), 16) / 255 : 1,
    hasAlpha,
  };
}

export function hexToRGB(hex: string): RGBColor {
  return parseHexColor(hex).rgb;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`;
}

export function hexToHSB(hex: string): HSBColor {
  const { r, g, b } = hexToRGB(hex);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === red) {
      hue = 60 * (((green - blue) / delta) % 6);
    } else if (max === green) {
      hue = 60 * ((blue - red) / delta + 2);
    } else {
      hue = 60 * ((red - green) / delta + 4);
    }
  }

  if (hue < 0) hue += 360;

  const saturation = max === 0 ? 0 : (delta / max) * 100;
  const brightness = max * 100;

  return {
    h: Math.round(hue),
    s: Math.round(saturation),
    b: Math.round(brightness),
  };
}

export function hsbToHex(h: number, s: number, b: number): string {
  const hue = ((h % 360) + 360) % 360;
  const saturation = clamp(s, 0, 100) / 100;
  const brightness = clamp(b, 0, 100) / 100;

  const chroma = brightness * saturation;
  const segment = hue / 60;
  const x = chroma * (1 - Math.abs((segment % 2) - 1));
  const match = brightness - chroma;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (segment >= 0 && segment < 1) {
    red = chroma;
    green = x;
  } else if (segment < 2) {
    red = x;
    green = chroma;
  } else if (segment < 3) {
    green = chroma;
    blue = x;
  } else if (segment < 4) {
    green = x;
    blue = chroma;
  } else if (segment < 5) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  return rgbToHex(
    (red + match) * 255,
    (green + match) * 255,
    (blue + match) * 255,
  );
}

export function withHexAlpha(hex: string, alpha: number): string {
  const parsed = parseHexColor(hex);
  const normalizedAlpha = normalizeAlphaValue(alpha);
  if (normalizedAlpha >= 1) return rgbToHex(parsed.rgb.r, parsed.rgb.g, parsed.rgb.b);
  return `${rgbToHex(parsed.rgb.r, parsed.rgb.g, parsed.rgb.b)}${toHexPair(normalizedAlpha * 255)}`;
}

function formatAlpha(alpha: number): string {
  const rounded = Math.round(normalizeAlphaValue(alpha) * 1000) / 1000;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toString();
}

export function hexToRGBA(hex: string, alpha: number): string {
  const { r, g, b } = hexToRGB(hex);
  return `rgba(${r}, ${g}, ${b}, ${formatAlpha(alpha)})`;
}

export function colorStringToHex(color: string, fallback = "#000000"): string {
  const trimmed = color.trim();
  const normalizedHex = normalizeHex(trimmed);
  if (normalizedHex) return normalizedHex;

  const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (!rgbMatch) return fallback;

  const parts = rgbMatch[1]
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 3) return fallback;

  const r = Number(parts[0]);
  const g = Number(parts[1]);
  const b = Number(parts[2]);
  if (![r, g, b].every(Number.isFinite)) return fallback;

  const base = rgbToHex(r, g, b);
  if (parts.length < 4) return base;

  const alpha = Number(parts[3]);
  if (!Number.isFinite(alpha)) return base;
  return withHexAlpha(base, alpha);
}
