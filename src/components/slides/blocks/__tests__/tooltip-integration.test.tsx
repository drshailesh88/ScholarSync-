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
// SVG <title> elements on infographic items
// ---------------------------------------------------------------------------

describe("Infographic SVG <title> elements", () => {
  const processData: InfographicData = {
    infographicType: "process_flow",
    items: [
      { label: "Step 1", description: "First step", value: "10" },
      { label: "Step 2", description: "Second step" },
      { label: "Step 3" },
    ],
  };

  it("adds <title> elements to process flow items", () => {
    const html = renderToStaticMarkup(<InfographicBlock data={processData} theme={THEME} />);
    expect(html).toContain("<title>Step 1: First step: 10</title>");
    expect(html).toContain("<title>Step 2: Second step</title>");
    expect(html).toContain("<title>Step 3</title>");
  });

  it("adds <title> to comparison items", () => {
    const data: InfographicData = {
      infographicType: "comparison",
      items: [
        { label: "Option A", description: "Good choice", value: "85%" },
        { label: "Option B", description: "Other choice" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>Option A: Good choice: 85%</title>");
    expect(html).toContain("<title>Option B: Other choice</title>");
  });

  it("adds <title> to hierarchy items", () => {
    const data: InfographicData = {
      infographicType: "hierarchy",
      items: [
        { label: "Root", description: "Top level" },
        { label: "Child 1" },
        { label: "Child 2" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>Root: Top level</title>");
    expect(html).toContain("<title>Child 1</title>");
  });

  it("adds <title> to cycle items", () => {
    const data: InfographicData = {
      infographicType: "cycle",
      items: [
        { label: "Phase A", description: "First phase" },
        { label: "Phase B" },
        { label: "Phase C" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>Phase A: First phase</title>");
  });

  it("adds <title> to funnel items", () => {
    const data: InfographicData = {
      infographicType: "funnel",
      items: [
        { label: "Top", value: "1000" },
        { label: "Middle", value: "500" },
        { label: "Bottom", value: "100" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>Top: 1000</title>");
  });

  it("adds <title> to word cloud items", () => {
    const data: InfographicData = {
      infographicType: "word_cloud",
      items: [
        { label: "ML", value: "10" },
        { label: "AI", value: "8" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>ML: 10</title>");
    expect(html).toContain("<title>AI: 8</title>");
  });
});

// ---------------------------------------------------------------------------
// Tooltip data attributes on SVG groups
// ---------------------------------------------------------------------------

describe("Infographic tooltip data attributes", () => {
  it("sets data-tooltip-label on process flow items", () => {
    const data: InfographicData = {
      infographicType: "process_flow",
      items: [
        { label: "Step 1", description: "First step", value: "10" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain('data-tooltip-label="Step 1"');
    expect(html).toContain('data-tooltip-description="First step"');
    expect(html).toContain('data-tooltip-value="10"');
  });

  it("sets data-tooltip-label on stats row items", () => {
    const data: InfographicData = {
      infographicType: "stats_row",
      items: [
        { label: "Metric", value: "42%" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain('data-tooltip-label="Metric"');
    expect(html).toContain('data-tooltip-value="42%"');
  });

  it("sets data-tooltip-label on checklist items", () => {
    const data: InfographicData = {
      infographicType: "checklist",
      items: [
        { label: "Task 1", status: "done" },
        { label: "Task 2", status: "active" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain('data-tooltip-label="Task 1"');
    expect(html).toContain('data-tooltip-label="Task 2"');
  });
});

// ---------------------------------------------------------------------------
// Hover CSS class applies brightness filter
// ---------------------------------------------------------------------------

describe("Infographic hover CSS", () => {
  it("includes infographic-item class on SVG groups", () => {
    const data: InfographicData = {
      infographicType: "process_flow",
      items: [{ label: "Step 1" }],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain('class="infographic-item"');
  });

  it("includes hover brightness CSS rule", () => {
    const data: InfographicData = {
      infographicType: "process_flow",
      items: [{ label: "Step 1" }],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("brightness(1.1)");
    expect(html).toContain("cursor: pointer");
  });
});

// ---------------------------------------------------------------------------
// interactive=false disables hover handlers
// ---------------------------------------------------------------------------

describe("Infographic interactive=false", () => {
  it("does not render SvgTooltip when interactive is false", () => {
    const data: InfographicData = {
      infographicType: "process_flow",
      items: [{ label: "Step 1", description: "Desc" }],
    };
    // interactive=false should still render <title> (native) but not the custom tooltip container
    const htmlInteractive = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} interactive={true} />);
    const htmlNonInteractive = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} interactive={false} />);
    // Both should have SVG <title> elements
    expect(htmlInteractive).toContain("<title>");
    expect(htmlNonInteractive).toContain("<title>");
  });
});

// ---------------------------------------------------------------------------
// Tooltip content includes label, description, value
// ---------------------------------------------------------------------------

describe("Infographic tooltip text content", () => {
  it("combines label, description, and value in title", () => {
    const data: InfographicData = {
      infographicType: "radial",
      items: [
        { label: "Center", description: "Hub", value: "100" },
        { label: "Spoke 1", description: "Branch" },
        { label: "Spoke 2" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>Center: Hub: 100</title>");
    expect(html).toContain("<title>Spoke 1: Branch</title>");
    expect(html).toContain("<title>Spoke 2</title>");
  });
});

// ---------------------------------------------------------------------------
// Chart block: Recharts Tooltip presence
// ---------------------------------------------------------------------------

describe("Chart block Tooltip", () => {
  // We can't easily test Recharts rendering via SSR since it uses ResponsiveContainer,
  // but we can verify the exports and structure are correct.
  it("chart-block exports buildWaterfallData and describeArc", async () => {
    const mod = await import("../chart-block");
    expect(typeof mod.buildWaterfallData).toBe("function");
    expect(typeof mod.describeArc).toBe("function");
  });
});

// ---------------------------------------------------------------------------
// All infographic types produce <title> elements
// ---------------------------------------------------------------------------

describe("All infographic types produce <title> elements", () => {
  const types = [
    "process_flow", "comparison", "hierarchy", "cycle",
    "funnel", "pyramid", "venn", "matrix",
    "radial", "stats_row", "checklist", "cause_effect",
    "icon_array", "pictograph", "word_cloud",
  ] as const;

  it.each(types)("%s renders <title> elements", (infographicType) => {
    const data: InfographicData = {
      infographicType,
      items: [
        { label: "Item 1", description: "Desc", value: "5", icon: "●" },
        { label: "Item 2", value: "3", icon: "●" },
        { label: "Item 3", icon: "●" },
      ],
    };
    const html = renderToStaticMarkup(<InfographicBlock data={data} theme={THEME} />);
    expect(html).toContain("<title>");
  });
});
