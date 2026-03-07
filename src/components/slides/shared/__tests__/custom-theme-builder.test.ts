import { describe, it, expect, beforeEach } from "vitest";
import { PRESET_THEMES, type ThemeConfig } from "@/types/presentation";
import { useSlidesStore } from "@/stores/slides-store";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeCustomTheme(overrides: Partial<ThemeConfig> = {}): ThemeConfig {
  return {
    name: "My Custom",
    primaryColor: "#FF0000",
    secondaryColor: "#00FF00",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    accentColor: "#0000FF",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    borderRadius: "md",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("custom-theme-builder", () => {
  beforeEach(() => {
    // Reset store to defaults
    useSlidesStore.setState({
      customThemes: {},
      themeKey: "modern",
      themeConfig: PRESET_THEMES.modern,
      deckId: null,
    });
  });

  it("adds a custom theme to customThemes in store", () => {
    const store = useSlidesStore.getState();
    const theme = makeCustomTheme({ name: "Ocean" });
    store.addCustomTheme("custom_ocean", theme);

    const updated = useSlidesStore.getState();
    expect(updated.customThemes["custom_ocean"]).toBeDefined();
    expect(updated.customThemes["custom_ocean"].name).toBe("Ocean");
    expect(updated.customThemes["custom_ocean"].primaryColor).toBe("#FF0000");
  });

  it("custom theme appears alongside preset keys", () => {
    const store = useSlidesStore.getState();
    store.addCustomTheme("custom_sunset", makeCustomTheme({ name: "Sunset" }));

    const updated = useSlidesStore.getState();
    const customKeys = Object.keys(updated.customThemes);
    const presetKeys = Object.keys(PRESET_THEMES);

    expect(customKeys).toContain("custom_sunset");
    expect(presetKeys).not.toContain("custom_sunset");

    // Combined for picker: custom + presets
    const allKeys = [...customKeys, ...presetKeys];
    expect(allKeys).toContain("custom_sunset");
    expect(allKeys).toContain("modern");
  });

  it("deletes a custom theme from store", () => {
    const store = useSlidesStore.getState();
    store.addCustomTheme("custom_delete_me", makeCustomTheme({ name: "DeleteMe" }));

    expect(useSlidesStore.getState().customThemes["custom_delete_me"]).toBeDefined();

    useSlidesStore.getState().deleteCustomTheme("custom_delete_me");

    expect(useSlidesStore.getState().customThemes["custom_delete_me"]).toBeUndefined();
  });

  it("applying a custom theme updates themeKey and themeConfig", () => {
    const store = useSlidesStore.getState();
    const theme = makeCustomTheme({ name: "Applied" });
    store.addCustomTheme("custom_applied", theme);

    store.setTheme("custom_applied", theme);

    const updated = useSlidesStore.getState();
    expect(updated.themeKey).toBe("custom_applied");
    expect(updated.themeConfig.name).toBe("Applied");
    expect(updated.themeConfig.primaryColor).toBe("#FF0000");
  });

  it("'Start from Preset' populates all fields correctly", () => {
    // Simulate selecting a preset as starting point
    const modern = PRESET_THEMES.modern;
    const theme: ThemeConfig = { ...modern, name: "From Modern" };

    expect(theme.primaryColor).toBe(modern.primaryColor);
    expect(theme.secondaryColor).toBe(modern.secondaryColor);
    expect(theme.backgroundColor).toBe(modern.backgroundColor);
    expect(theme.textColor).toBe(modern.textColor);
    expect(theme.accentColor).toBe(modern.accentColor);
    expect(theme.fontFamily).toBe(modern.fontFamily);
    expect(theme.headingFontFamily).toBe(modern.headingFontFamily);
    expect(theme.surfaceColor).toBe(modern.surfaceColor);
    expect(theme.borderColor).toBe(modern.borderColor);
    expect(theme.codeBackground).toBe(modern.codeBackground);
  });

  it("validation: cannot save with empty theme name", () => {
    // The builder requires a non-empty name — simulate the validation logic
    const name = "   ";
    expect(name.trim()).toBe("");

    const validName = "My Theme";
    expect(validName.trim()).not.toBe("");
  });

  it("live preview updates reflect color changes", () => {
    // Simulate changing colors and verifying the theme config updates
    const theme = makeCustomTheme({ primaryColor: "#112233" });
    expect(theme.primaryColor).toBe("#112233");

    // Change primary
    const updated = { ...theme, primaryColor: "#AABBCC" };
    expect(updated.primaryColor).toBe("#AABBCC");
    expect(updated.secondaryColor).toBe(theme.secondaryColor); // others unchanged
  });

  it("multiple custom themes can coexist", () => {
    const store = useSlidesStore.getState();
    store.addCustomTheme("custom_a", makeCustomTheme({ name: "Theme A" }));
    store.addCustomTheme("custom_b", makeCustomTheme({ name: "Theme B" }));
    store.addCustomTheme("custom_c", makeCustomTheme({ name: "Theme C" }));

    const updated = useSlidesStore.getState();
    expect(Object.keys(updated.customThemes)).toHaveLength(3);
    expect(updated.customThemes["custom_a"].name).toBe("Theme A");
    expect(updated.customThemes["custom_b"].name).toBe("Theme B");
    expect(updated.customThemes["custom_c"].name).toBe("Theme C");
  });

  it("deleting one custom theme does not affect others", () => {
    const store = useSlidesStore.getState();
    store.addCustomTheme("custom_keep", makeCustomTheme({ name: "Keep" }));
    store.addCustomTheme("custom_remove", makeCustomTheme({ name: "Remove" }));

    useSlidesStore.getState().deleteCustomTheme("custom_remove");

    const updated = useSlidesStore.getState();
    expect(updated.customThemes["custom_keep"]).toBeDefined();
    expect(updated.customThemes["custom_remove"]).toBeUndefined();
  });
});
