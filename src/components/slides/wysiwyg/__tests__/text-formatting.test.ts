// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  TEXT_COLOR_OPTIONS,
} from "../text-formatting-options";
import {
  getDefaultLineHeight,
  getParagraphSpacingCss,
  getTextStyles,
} from "../editable-text-block";
import type { ThemeConfig } from "@/types/presentation";

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#111111",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  accentColor: "#444444",
  fontFamily: "Inter",
  headingFontFamily: "Inter",
};

describe("text formatting options", () => {
  it("includes all expected font sizes", () => {
    expect([...FONT_SIZE_OPTIONS]).toEqual([
      10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96,
    ]);
  });

  it("includes all 20 palette colors", () => {
    expect(TEXT_COLOR_OPTIONS).toEqual([
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
    ]);
  });

  it("includes all expected font families", () => {
    expect(FONT_FAMILY_OPTIONS).toEqual([
      "Inter",
      "Arial",
      "Helvetica",
      "Times New Roman",
      "Georgia",
      "Courier New",
      "Palatino",
      "Garamond",
    ]);
  });

  it("applies custom line height to text styles", () => {
    const style = getTextStyles("body", THEME, 2);
    expect(style.lineHeight).toBe(2);
  });

  it("creates paragraph spacing CSS for paragraph margins", () => {
    expect(getParagraphSpacingCss(12)).toBe(".ProseMirror p + p { margin-top: 12px; }");
  });

  it("uses default spacing values when not provided", () => {
    const defaultStyle = getTextStyles("body", THEME);
    expect(defaultStyle.lineHeight).toBe(getDefaultLineHeight("body"));
    expect(getParagraphSpacingCss()).toBe(".ProseMirror p + p { margin-top: 0px; }");
  });
});
