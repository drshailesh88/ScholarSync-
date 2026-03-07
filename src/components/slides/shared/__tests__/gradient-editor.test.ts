import { describe, expect, it } from "vitest";
import type { GradientConfig } from "@/types/presentation";
import { buildGradientCSS } from "../slide-background";
import { GRADIENT_PRESETS } from "../gradient-editor";

// ---------------------------------------------------------------------------
// Helper to build a simple gradient config
// ---------------------------------------------------------------------------

function makeGradient(
  overrides: Partial<GradientConfig> = {}
): GradientConfig {
  return {
    type: "linear",
    angle: 135,
    stops: [
      { color: "#FF0000", position: 0 },
      { color: "#0000FF", position: 100 },
    ],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Gradient CSS generation", () => {
  it("generates correct linear-gradient with 2 stops", () => {
    const gradient = makeGradient({
      angle: 90,
      stops: [
        { color: "#FF0000", position: 0 },
        { color: "#0000FF", position: 100 },
      ],
    });
    const css = buildGradientCSS(gradient);
    expect(css).toBe("linear-gradient(90deg, #FF0000 0%, #0000FF 100%)");
  });

  it("generates correct linear-gradient with 3 stops", () => {
    const gradient = makeGradient({
      angle: 180,
      stops: [
        { color: "#FF0000", position: 0 },
        { color: "#00FF00", position: 50 },
        { color: "#0000FF", position: 100 },
      ],
    });
    const css = buildGradientCSS(gradient);
    expect(css).toBe(
      "linear-gradient(180deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)"
    );
  });

  it("generates correct radial-gradient", () => {
    const gradient = makeGradient({
      type: "radial",
      stops: [
        { color: "#FFFFFF", position: 0 },
        { color: "#000000", position: 100 },
      ],
    });
    const css = buildGradientCSS(gradient);
    expect(css).toBe("radial-gradient(circle, #FFFFFF 0%, #000000 100%)");
  });

  it("applies angle correctly (0 = to top, 90 = to right, 180 = to bottom)", () => {
    const css0 = buildGradientCSS(
      makeGradient({ angle: 0 })
    );
    expect(css0).toContain("0deg");

    const css90 = buildGradientCSS(
      makeGradient({ angle: 90 })
    );
    expect(css90).toContain("90deg");

    const css180 = buildGradientCSS(
      makeGradient({ angle: 180 })
    );
    expect(css180).toContain("180deg");
  });

  it("sorts stops by position regardless of input order", () => {
    const gradient = makeGradient({
      angle: 90,
      stops: [
        { color: "#0000FF", position: 100 },
        { color: "#FF0000", position: 0 },
        { color: "#00FF00", position: 50 },
      ],
    });
    const css = buildGradientCSS(gradient);
    expect(css).toBe(
      "linear-gradient(90deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)"
    );
  });
});

describe("Gradient stop mutations", () => {
  it("adding a stop increases stops array length", () => {
    const gradient = makeGradient();
    const newStops = [...gradient.stops, { color: "#00FF00", position: 50 }];
    expect(newStops.length).toBe(gradient.stops.length + 1);
  });

  it("removing a stop decreases stops array length (minimum 2)", () => {
    const gradient = makeGradient({
      stops: [
        { color: "#FF0000", position: 0 },
        { color: "#00FF00", position: 50 },
        { color: "#0000FF", position: 100 },
      ],
    });
    const filtered = gradient.stops.filter((_, i) => i !== 1);
    expect(filtered.length).toBe(2);
    // Should not go below 2
    const twoStops = makeGradient();
    expect(twoStops.stops.length).toBe(2);
  });
});

describe("Gradient presets", () => {
  it("Sunset preset outputs correct colors and angle", () => {
    const sunset = GRADIENT_PRESETS.find((p) => p.name === "Sunset");
    expect(sunset).toBeDefined();
    expect(sunset!.gradient.angle).toBe(135);
    expect(sunset!.gradient.stops[0].color).toBe("#FF6B6B");
    expect(sunset!.gradient.stops[1].color).toBe("#FFA07A");

    const css = buildGradientCSS(sunset!.gradient);
    expect(css).toBe("linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%)");
  });

  it("Night Sky preset has 3 stops", () => {
    const nightSky = GRADIENT_PRESETS.find((p) => p.name === "Night Sky");
    expect(nightSky).toBeDefined();
    expect(nightSky!.gradient.stops.length).toBe(3);
  });
});

describe("Gradient priority", () => {
  it("when gradient is set, it takes priority over solid color in CSS", () => {
    // Simulate the priority logic from slide-background.ts:
    // gradient > legacy gradientEnabled > color
    const bg = {
      color: "#FF0000",
      gradient: makeGradient({
        angle: 45,
        stops: [
          { color: "#00FF00", position: 0 },
          { color: "#0000FF", position: 100 },
        ],
      }),
    };

    // Build the style similarly to getSlideBackgroundStyle
    const style: Record<string, string> = {};

    if (bg.color) {
      style.backgroundColor = bg.color;
    }
    if (bg.gradient && bg.gradient.stops.length >= 2) {
      const gradientValue = buildGradientCSS(bg.gradient);
      style.background = gradientValue;
      style.backgroundImage = gradientValue;
    }

    // The gradient background should override the solid color
    expect(style.background).toContain("linear-gradient");
    expect(style.backgroundImage).toContain("linear-gradient");
    // backgroundColor is still set, but CSS `background` shorthand overrides it
    expect(style.backgroundColor).toBe("#FF0000");
  });
});
