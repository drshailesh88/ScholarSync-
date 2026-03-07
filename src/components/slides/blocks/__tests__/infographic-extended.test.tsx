import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { InfographicBlock } from "../infographic-block";
import type { ThemeConfig, InfographicData } from "@/types/presentation";

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#3366ff",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#111111",
  accentColor: "#ff8800",
};

// ---------------------------------------------------------------------------
// IconArray
// ---------------------------------------------------------------------------

describe("IconArray", () => {
  const data: InfographicData = {
    infographicType: "icon_array",
    title: "Response Rate",
    items: [
      { label: "Responded", value: "7", icon: "●" },
      { label: "Partial", value: "2", icon: "●" },
      { label: "None", value: "1", icon: "●" },
    ],
  };

  it("renders correct number of icons (sum of values)", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // Total icons = 7 + 2 + 1 = 10. Each icon is a <text> inside the grid.
    // Count occurrences of the icon character "●" in the SVG
    const iconMatches = html.match(/●/g);
    // 10 grid icons + 3 legend icons (the legend shows labels not ●)
    // Actually legend doesn't show ●, it shows label text. Grid shows ●.
    expect(iconMatches).not.toBeNull();
    expect(iconMatches!.length).toBe(10);
  });

  it("assigns correct colors for 3 categories", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // The 3 categories should use the first 3 theme colors
    expect(html).toContain(THEME.primaryColor);
    expect(html).toContain(THEME.accentColor);
    expect(html).toContain(THEME.secondaryColor);
  });

  it("renders valid SVG", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<svg");
  });
});

// ---------------------------------------------------------------------------
// Pictograph
// ---------------------------------------------------------------------------

describe("Pictograph", () => {
  const data: InfographicData = {
    infographicType: "pictograph",
    title: "Enrollment",
    items: [
      { label: "Site A", value: "4", icon: "👤" },
      { label: "Site B", value: "3.5", icon: "👤" },
      { label: "Site C", value: "2", icon: "👤" },
    ],
  };

  it("renders one row per item", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // Each item label should appear
    expect(html).toContain("Site A");
    expect(html).toContain("Site B");
    expect(html).toContain("Site C");
  });

  it("handles partial icon for value 3.5", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // Partial icon uses clip-path
    expect(html).toContain("picto-half");
  });

  it("renders valid SVG", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<svg");
  });
});

// ---------------------------------------------------------------------------
// WordCloud
// ---------------------------------------------------------------------------

describe("WordCloud", () => {
  const data: InfographicData = {
    infographicType: "word_cloud",
    title: "Research Themes",
    items: [
      { label: "Machine Learning", value: "10" },
      { label: "Neural Networks", value: "8" },
      { label: "Data Mining", value: "6" },
      { label: "NLP", value: "3" },
      { label: "Robotics", value: "1" },
    ],
    colorScheme: "rainbow",
  };

  it("scales font sizes with value", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // The largest item (Machine Learning, value=10) should have font-size=48
    expect(html).toContain('font-size="48"');
    // The smallest item (Robotics, value=1) should have font-size=10
    expect(html).toContain('font-size="10"');
  });

  it("largest item gets biggest font", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // Extract font sizes associated with labels
    const mlMatch = html.match(/font-size="(\d+)"[^>]*>Machine Learning/);
    const roboticsMatch = html.match(/font-size="(\d+)"[^>]*>Robotics/);
    expect(mlMatch).not.toBeNull();
    expect(roboticsMatch).not.toBeNull();
    expect(Number(mlMatch![1])).toBeGreaterThan(Number(roboticsMatch![1]));
  });

  it("positions are within viewBox bounds", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    // All text elements should have x and y values within 0-800 and 0-500
    const xMatches = Array.from(html.matchAll(/<text[^>]* x="([^"]+)"/g));
    const yMatches = Array.from(html.matchAll(/<text[^>]* y="([^"]+)"/g));
    for (const m of xMatches) {
      const x = Number(m[1]);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(800);
    }
    for (const m of yMatches) {
      const y = Number(m[1]);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(500);
    }
  });

  it("renders valid SVG", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<svg");
  });
});

// ---------------------------------------------------------------------------
// All 3 new types render valid SVG
// ---------------------------------------------------------------------------

describe("All new infographic types render valid SVG", () => {
  const types = ["icon_array", "pictograph", "word_cloud"] as const;

  it.each(types)("%s renders an <svg> element", (infographicType) => {
    const data: InfographicData = {
      infographicType,
      items: [
        { label: "Item 1", value: "5", icon: "●" },
        { label: "Item 2", value: "3", icon: "●" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<svg");
  });
});
