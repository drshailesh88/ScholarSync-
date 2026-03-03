import { describe, it, expect } from "vitest";
import { getThemeCSSVars, isDarkTheme } from "../theme-engine";
import type { ThemeConfig } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeTheme(overrides: Partial<ThemeConfig> = {}): ThemeConfig {
  return {
    name: "test",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    backgroundColor: "#FFFFFF",
    textColor: "#1A1A2E",
    accentColor: "#F59E0B",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("theme-engine", () => {
  // -----------------------------------------------------------------------
  // getThemeCSSVars
  // -----------------------------------------------------------------------
  describe("getThemeCSSVars", () => {
    it("maps core colors to CSS variables", () => {
      const vars = getThemeCSSVars(makeTheme());
      expect(vars["--slide-primary" as keyof typeof vars]).toBe("#3B82F6");
      expect(vars["--slide-secondary" as keyof typeof vars]).toBe("#8B5CF6");
      expect(vars["--slide-bg" as keyof typeof vars]).toBe("#FFFFFF");
      expect(vars["--slide-text" as keyof typeof vars]).toBe("#1A1A2E");
      expect(vars["--slide-accent" as keyof typeof vars]).toBe("#F59E0B");
    });

    it("uses backgroundColor as fallback for surfaceColor", () => {
      const vars = getThemeCSSVars(makeTheme({ surfaceColor: undefined }));
      expect(vars["--slide-surface" as keyof typeof vars]).toBe("#FFFFFF");
    });

    it("uses provided surfaceColor when available", () => {
      const vars = getThemeCSSVars(makeTheme({ surfaceColor: "#F0F0F0" }));
      expect(vars["--slide-surface" as keyof typeof vars]).toBe("#F0F0F0");
    });

    it("generates border color from text color when not provided", () => {
      const vars = getThemeCSSVars(makeTheme());
      expect(vars["--slide-border" as keyof typeof vars]).toBe("#1A1A2E20");
    });

    it("uses provided borderColor", () => {
      const vars = getThemeCSSVars(makeTheme({ borderColor: "#CCCCCC" }));
      expect(vars["--slide-border" as keyof typeof vars]).toBe("#CCCCCC");
    });

    it("uses default code background when not provided", () => {
      const vars = getThemeCSSVars(makeTheme());
      expect(vars["--slide-code-bg" as keyof typeof vars]).toBe("#1E1E2E");
    });

    it("uses provided codeBackground", () => {
      const vars = getThemeCSSVars(makeTheme({ codeBackground: "#2D2D2D" }));
      expect(vars["--slide-code-bg" as keyof typeof vars]).toBe("#2D2D2D");
    });

    it("uses default font when not provided", () => {
      const vars = getThemeCSSVars(makeTheme());
      expect(vars["--slide-font" as keyof typeof vars]).toBe("Inter, sans-serif");
      expect(vars["--slide-heading-font" as keyof typeof vars]).toBe("Inter, sans-serif");
    });

    it("uses provided fontFamily", () => {
      const vars = getThemeCSSVars(
        makeTheme({ fontFamily: "Georgia, serif", headingFontFamily: "Playfair Display, serif" })
      );
      expect(vars["--slide-font" as keyof typeof vars]).toBe("Georgia, serif");
      expect(vars["--slide-heading-font" as keyof typeof vars]).toBe("Playfair Display, serif");
    });

    it("falls back heading font to body font", () => {
      const vars = getThemeCSSVars(makeTheme({ fontFamily: "Georgia, serif" }));
      expect(vars["--slide-heading-font" as keyof typeof vars]).toBe("Georgia, serif");
    });

    it("uses primary/secondary as gradient fallbacks", () => {
      const vars = getThemeCSSVars(makeTheme());
      expect(vars["--slide-gradient-from" as keyof typeof vars]).toBe("#3B82F6");
      expect(vars["--slide-gradient-to" as keyof typeof vars]).toBe("#8B5CF6");
    });

    it("uses provided gradient colors", () => {
      const vars = getThemeCSSVars(makeTheme({ gradientFrom: "#FF0000", gradientTo: "#00FF00" }));
      expect(vars["--slide-gradient-from" as keyof typeof vars]).toBe("#FF0000");
      expect(vars["--slide-gradient-to" as keyof typeof vars]).toBe("#00FF00");
    });
  });

  // -----------------------------------------------------------------------
  // isDarkTheme
  // -----------------------------------------------------------------------
  describe("isDarkTheme", () => {
    it("detects white background as light", () => {
      expect(isDarkTheme(makeTheme({ backgroundColor: "#FFFFFF" }))).toBe(false);
    });

    it("detects black background as dark", () => {
      expect(isDarkTheme(makeTheme({ backgroundColor: "#000000" }))).toBe(true);
    });

    it("detects dark navy as dark", () => {
      expect(isDarkTheme(makeTheme({ backgroundColor: "#0A0A1A" }))).toBe(true);
    });

    it("detects light gray as light", () => {
      expect(isDarkTheme(makeTheme({ backgroundColor: "#F5F5F5" }))).toBe(false);
    });

    it("detects mid-dark gray as dark", () => {
      // RGB(50,50,50) → luminance ~0.20 < 0.5 → dark
      expect(isDarkTheme(makeTheme({ backgroundColor: "#323232" }))).toBe(true);
    });

    it("detects mid-light gray as light", () => {
      // RGB(200,200,200) → luminance ~0.78 > 0.5 → light
      expect(isDarkTheme(makeTheme({ backgroundColor: "#C8C8C8" }))).toBe(false);
    });
  });
});
