// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { getTextStyles, buildTextEffectStyles } from "../editable-text-block";
import type { ThemeConfig, TextEffects } from "@/types/presentation";

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

describe("buildTextEffectStyles", () => {
  it("returns empty object when no effects are provided", () => {
    expect(buildTextEffectStyles(undefined)).toEqual({});
    expect(buildTextEffectStyles({})).toEqual({});
  });

  it("generates correct textShadow CSS with different offsets and blur", () => {
    const effects: TextEffects = {
      textShadow: { offsetX: 2, offsetY: 3, blur: 4, color: "rgba(0,0,0,0.5)" },
    };
    const styles = buildTextEffectStyles(effects);
    expect(styles.textShadow).toBe("2px 3px 4px rgba(0,0,0,0.5)");
  });

  it("generates correct textShadow with negative offsets", () => {
    const effects: TextEffects = {
      textShadow: { offsetX: -5, offsetY: -3, blur: 10, color: "#ff0000" },
    };
    const styles = buildTextEffectStyles(effects);
    expect(styles.textShadow).toBe("-5px -3px 10px #ff0000");
  });

  it("generates correct textShadow with zero blur", () => {
    const effects: TextEffects = {
      textShadow: { offsetX: 1, offsetY: 1, blur: 0, color: "#000000" },
    };
    const styles = buildTextEffectStyles(effects);
    expect(styles.textShadow).toBe("1px 1px 0px #000000");
  });

  it("generates correct -webkit-text-stroke for textOutline", () => {
    const effects: TextEffects = {
      textOutline: { width: 1.5, color: "#ff0000" },
    };
    const styles = buildTextEffectStyles(effects);
    expect(styles.WebkitTextStroke).toBe("1.5px #ff0000");
  });

  it("generates correct -webkit-text-stroke with min width", () => {
    const effects: TextEffects = {
      textOutline: { width: 0.5, color: "#000000" },
    };
    const styles = buildTextEffectStyles(effects);
    expect(styles.WebkitTextStroke).toBe("0.5px #000000");
  });

  it("applies textTransform uppercase", () => {
    const styles = buildTextEffectStyles({ textTransform: "uppercase" });
    expect(styles.textTransform).toBe("uppercase");
  });

  it("applies textTransform lowercase", () => {
    const styles = buildTextEffectStyles({ textTransform: "lowercase" });
    expect(styles.textTransform).toBe("lowercase");
  });

  it("applies textTransform capitalize", () => {
    const styles = buildTextEffectStyles({ textTransform: "capitalize" });
    expect(styles.textTransform).toBe("capitalize");
  });

  it("applies correct letterSpacing em value", () => {
    const styles = buildTextEffectStyles({ letterSpacing: 0.15 });
    expect(styles.letterSpacing).toBe("0.15em");
  });

  it("applies negative letterSpacing", () => {
    const styles = buildTextEffectStyles({ letterSpacing: -0.05 });
    expect(styles.letterSpacing).toBe("-0.05em");
  });

  it("applies zero letterSpacing", () => {
    const styles = buildTextEffectStyles({ letterSpacing: 0 });
    expect(styles.letterSpacing).toBe("0em");
  });
});

describe("getTextStyles with effects", () => {
  it("applies shadow effects to title style", () => {
    const effects: TextEffects = {
      textShadow: { offsetX: 2, offsetY: 2, blur: 4, color: "rgba(0,0,0,0.3)" },
    };
    const styles = getTextStyles("title", THEME, undefined, effects);
    expect(styles.textShadow).toBe("2px 2px 4px rgba(0,0,0,0.3)");
    expect(styles.fontSize).toBe("1.3em");
    expect(styles.fontWeight).toBe(700);
  });

  it("applies outline effects to subtitle style", () => {
    const effects: TextEffects = {
      textOutline: { width: 1, color: "#000000" },
    };
    const styles = getTextStyles("subtitle", THEME, undefined, effects);
    expect(styles.WebkitTextStroke).toBe("1px #000000");
  });

  it("applies all effects together on body style", () => {
    const effects: TextEffects = {
      textShadow: { offsetX: 1, offsetY: 1, blur: 2, color: "#000000" },
      textOutline: { width: 2, color: "#ff0000" },
      textTransform: "uppercase",
      letterSpacing: 0.1,
    };
    const styles = getTextStyles("body", THEME, undefined, effects);
    expect(styles.textShadow).toBe("1px 1px 2px #000000");
    expect(styles.WebkitTextStroke).toBe("2px #ff0000");
    expect(styles.textTransform).toBe("uppercase");
    expect(styles.letterSpacing).toBe("0.1em");
  });

  it("does not add effect CSS when effects are undefined", () => {
    const styles = getTextStyles("body", THEME);
    expect(styles.textShadow).toBeUndefined();
    expect(styles.WebkitTextStroke).toBeUndefined();
    expect(styles.textTransform).toBeUndefined();
    expect(styles.letterSpacing).toBeUndefined();
  });

  it("does not add effect CSS when effects object has no properties set", () => {
    const styles = getTextStyles("body", THEME, undefined, {});
    expect(styles.textShadow).toBeUndefined();
    expect(styles.WebkitTextStroke).toBeUndefined();
    expect(styles.textTransform).toBeUndefined();
    expect(styles.letterSpacing).toBeUndefined();
  });

  it("shadow glow preset uses primary color pattern", () => {
    const primaryColor = "#4F46E5";
    const glowEffects: TextEffects = {
      textShadow: { offsetX: 0, offsetY: 0, blur: 8, color: `${primaryColor}80` },
    };
    const styles = getTextStyles("title", THEME, undefined, glowEffects);
    expect(styles.textShadow).toBe(`0px 0px 8px ${primaryColor}80`);
    expect(styles.textShadow).toContain(primaryColor);
  });

  it("effects apply to caption style", () => {
    const effects: TextEffects = {
      textTransform: "capitalize",
      letterSpacing: 0.2,
    };
    const styles = getTextStyles("caption", THEME, undefined, effects);
    expect(styles.textTransform).toBe("capitalize");
    expect(styles.letterSpacing).toBe("0.2em");
    expect(styles.fontSize).toBe("0.65em");
  });
});
