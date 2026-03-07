import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { InfographicBlock, getColors } from "../infographic-block";
import { getChartColor } from "../chart-block";
import type { ThemeConfig, InfographicData, InstitutionKit } from "@/types/presentation";

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#3366ff",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#111111",
  accentColor: "#ff8800",
};

const INSTITUTION_KIT: Partial<InstitutionKit> = {
  primaryColor: "#AA0000",
  secondaryColor: "#00BB00",
  accentColor: "#0000CC",
  fontFamily: "Georgia, serif",
};

// ---------------------------------------------------------------------------
// getColors — brand scheme
// ---------------------------------------------------------------------------

describe("getColors with brand scheme", () => {
  it("uses institutionKit colors when scheme is 'brand'", () => {
    const colors = getColors("brand", THEME, INSTITUTION_KIT);
    expect(colors[0]).toBe("#AA0000");
    expect(colors[1]).toBe("#00BB00");
    expect(colors[2]).toBe("#0000CC");
    expect(colors[3]).toBe("#AA0000CC");
    expect(colors[4]).toBe("#00BB00CC");
    expect(colors[5]).toBe("#0000CCCC");
  });

  it("uses institutionKit colors when scheme is 'theme' and kit is available", () => {
    const colors = getColors("theme", THEME, INSTITUTION_KIT);
    expect(colors[0]).toBe("#AA0000");
    expect(colors[1]).toBe("#00BB00");
    expect(colors[2]).toBe("#0000CC");
  });

  it("falls back to theme colors when kit is null", () => {
    const colors = getColors("brand", THEME, null);
    expect(colors[0]).toBe(THEME.primaryColor);
    expect(colors[1]).toBe(THEME.accentColor);
    expect(colors[2]).toBe(THEME.secondaryColor);
  });

  it("falls back to theme colors when kit is undefined", () => {
    const colors = getColors("brand", THEME);
    expect(colors[0]).toBe(THEME.primaryColor);
  });

  it("named schemes still work normally", () => {
    const colors = getColors("blue", THEME, INSTITUTION_KIT);
    expect(colors[0]).toBe("#2563EB");
  });
});

// ---------------------------------------------------------------------------
// getChartColor — institutional colors
// ---------------------------------------------------------------------------

describe("getChartColor with institutionKit", () => {
  it("uses institutional primary as first color when kit is set", () => {
    expect(getChartColor(0, THEME, INSTITUTION_KIT)).toBe("#AA0000");
  });

  it("uses institutional secondary as second color", () => {
    expect(getChartColor(1, THEME, INSTITUTION_KIT)).toBe("#00BB00");
  });

  it("uses institutional accent as third color", () => {
    expect(getChartColor(2, THEME, INSTITUTION_KIT)).toBe("#0000CC");
  });

  it("falls back to palette for index >= 3", () => {
    const color = getChartColor(3, THEME, INSTITUTION_KIT);
    expect(color).not.toBe("#AA0000");
    expect(color).toBeTruthy();
  });

  it("uses theme colors when kit is null", () => {
    expect(getChartColor(0, THEME, null)).toBe(THEME.primaryColor);
    expect(getChartColor(1, THEME, null)).toBe(THEME.accentColor);
  });
});

// ---------------------------------------------------------------------------
// InfographicBlock — brand colors rendered
// ---------------------------------------------------------------------------

describe("InfographicBlock with brand colors", () => {
  const data: InfographicData = {
    infographicType: "stats_row",
    colorScheme: "brand",
    items: [
      { label: "Metric A", value: "42" },
      { label: "Metric B", value: "99" },
    ],
  };

  it("renders institutional primary color when scheme is brand", () => {
    const html = renderToStaticMarkup(
      <InfographicBlock data={data} theme={THEME} institutionKit={INSTITUTION_KIT} />
    );
    expect(html).toContain("#AA0000");
  });

  it("does not use institutional colors without kit", () => {
    const html = renderToStaticMarkup(
      <InfographicBlock data={data} theme={THEME} />
    );
    // Should fall back to theme colors since kit is not provided
    expect(html).toContain(THEME.primaryColor);
    expect(html).not.toContain("#AA0000");
  });
});

// ---------------------------------------------------------------------------
// Brand font applies to SVG text
// ---------------------------------------------------------------------------

describe("Brand font in infographic", () => {
  it("applies institutional font to SVG text elements", () => {
    const data: InfographicData = {
      infographicType: "process_flow",
      items: [{ label: "Step 1" }, { label: "Step 2" }],
    };
    const html = renderToStaticMarkup(
      <InfographicBlock data={data} theme={THEME} institutionKit={INSTITUTION_KIT} />
    );
    expect(html).toContain("Georgia, serif");
  });

  it("falls back to Inter when no institutional font", () => {
    const data: InfographicData = {
      infographicType: "process_flow",
      items: [{ label: "Step 1" }],
    };
    const html = renderToStaticMarkup(
      <InfographicBlock data={data} theme={THEME} institutionKit={{ primaryColor: "#AA0000" }} />
    );
    expect(html).toContain("Inter, sans-serif");
  });
});

// ---------------------------------------------------------------------------
// Auto-default to brand scheme
// ---------------------------------------------------------------------------

describe("Auto-default to brand scheme", () => {
  it("theme scheme uses kit colors when kit is active", () => {
    const data: InfographicData = {
      infographicType: "stats_row",
      colorScheme: "theme",
      items: [{ label: "A", value: "1" }],
    };
    const html = renderToStaticMarkup(
      <InfographicBlock data={data} theme={THEME} institutionKit={INSTITUTION_KIT} />
    );
    expect(html).toContain("#AA0000");
  });
});
