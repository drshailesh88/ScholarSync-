export const FONT_SIZE_OPTIONS = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96] as const;

export const FONT_FAMILY_OPTIONS = [
  "Inter",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Palatino",
  "Garamond",
] as const;

export const TEXT_COLOR_OPTIONS = [
  "#000000",
  "#374151",
  "#6B7280",
  "#D1D5DB",
  "#FFFFFF",
  "#FF0000",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#7F1D1D",
  "#8B5A2B",
  "#14532D",
  "#1E3A8A",
  "#7C3AED",
  "#EC4899",
  "#D946EF",
  "#0D9488",
  "#FF7F50",
  "#4F46E5",
] as const;

export function getPrimaryFontFamily(fontFamily?: string | null): string | null {
  if (!fontFamily) return null;
  const primary = fontFamily.split(",")[0]?.trim().replace(/^['"]|['"]$/g, "");
  return primary || null;
}
