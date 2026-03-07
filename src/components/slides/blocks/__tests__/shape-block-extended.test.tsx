import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ShapeBlock } from "../shape-block";
import type { ThemeConfig, ShapeData } from "@/types/presentation";
import {
  SHAPE_TYPE_OPTIONS,
  SHAPE_CATEGORIES,
  getShapesByCategory,
  isConnectorShape,
  isLineShape,
} from "../shape-utils";

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#3366ff",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#111111",
  accentColor: "#ff8800",
};

// ---- Flowchart shapes ----

const FLOWCHART_SHAPES: ShapeData["shapeType"][] = [
  "flowchart_process",
  "flowchart_decision",
  "flowchart_data",
  "flowchart_document",
  "flowchart_start_end",
  "flowchart_predefined",
  "flowchart_manual_input",
  "flowchart_preparation",
];

describe("Flowchart shapes", () => {
  it.each(FLOWCHART_SHAPES)("renders valid SVG for %s", (shapeType) => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType }} theme={THEME} />
    );
    expect(html).toContain("<svg");
    expect(html).toContain(`data-shape-type="${shapeType}"`);
  });

  it("flowchart_process renders a rect element", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "flowchart_process" }} theme={THEME} />
    );
    expect(html).toContain("<rect");
  });

  it("flowchart_decision renders a polygon (diamond)", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "flowchart_decision" }} theme={THEME} />
    );
    expect(html).toContain("<polygon");
  });

  it("flowchart_data renders a parallelogram path/polygon", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "flowchart_data" }} theme={THEME} />
    );
    expect(html).toContain("<polygon");
  });

  it("flowchart_document renders a path with wavy bottom", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "flowchart_document" }} theme={THEME} />
    );
    expect(html).toContain("<path");
  });

  it("flowchart_start_end renders a stadium/pill shape (rect with large rx)", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "flowchart_start_end" }} theme={THEME} />
    );
    expect(html).toContain("<rect");
    expect(html).toContain('rx="25"');
  });
});

// ---- Connector shapes ----

const CONNECTOR_SHAPES: ShapeData["shapeType"][] = [
  "connector_straight",
  "connector_elbow",
  "connector_curved",
];

describe("Connector shapes", () => {
  it.each(CONNECTOR_SHAPES)("renders valid SVG for %s", (shapeType) => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType }} theme={THEME} />
    );
    expect(html).toContain("<svg");
    expect(html).toContain(`data-shape-type="${shapeType}"`);
  });

  it("connector_straight renders with default arrow end marker", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "connector_straight" }} theme={THEME} />
    );
    // Default arrowEnd is "arrow" for connectors
    expect(html).toContain("marker-end");
  });

  it("connector_elbow renders a path with right angles", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "connector_elbow" }} theme={THEME} />
    );
    expect(html).toContain("<path");
    // Contains H (horizontal) and V (vertical) commands
    expect(html).toMatch(/[HV]/);
  });

  it("connector_curved renders a bezier curve path", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "connector_curved" }} theme={THEME} />
    );
    expect(html).toContain("<path");
    expect(html).toContain("C"); // Cubic bezier
  });

  it("renders with arrowStart=circle and arrowEnd=diamond", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{
          shapeType: "connector_straight",
          arrowStart: "circle",
          arrowEnd: "diamond",
        }}
        theme={THEME}
      />
    );
    expect(html).toContain("marker-start");
    expect(html).toContain("marker-end");
    // circle marker has <circle> element
    expect(html).toContain("<circle");
  });

  it("renders with arrowEnd=none (no marker)", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{
          shapeType: "connector_straight",
          arrowEnd: "none",
        }}
        theme={THEME}
      />
    );
    expect(html).not.toContain("marker-end");
  });

  it("connector endpoints position correctly with custom start/end", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{
          shapeType: "connector_straight",
          connectorStart: { x: 5, y: 20 },
          connectorEnd: { x: 95, y: 80 },
          arrowEnd: "none",
        }}
        theme={THEME}
      />
    );
    expect(html).toContain('x1="5"');
    expect(html).toContain('y1="20"');
    expect(html).toContain('x2="95"');
    expect(html).toContain('y2="80"');
  });
});

// ---- Callout shapes ----

const CALLOUT_SHAPES: ShapeData["shapeType"][] = [
  "callout_rect",
  "callout_rounded",
  "callout_cloud",
];

describe("Callout shapes", () => {
  it.each(CALLOUT_SHAPES)("renders valid SVG for %s", (shapeType) => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType }} theme={THEME} />
    );
    expect(html).toContain("<svg");
    expect(html).toContain(`data-shape-type="${shapeType}"`);
  });

  it("callout_rect renders a path with pointer triangle", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "callout_rect" }} theme={THEME} />
    );
    expect(html).toContain("<path");
    // The path contains the pointer (L30,88 = pointer tip)
    expect(html).toContain("88");
  });

  it("callout_rounded renders a path with rounded corners and pointer", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "callout_rounded" }} theme={THEME} />
    );
    expect(html).toContain("<path");
    expect(html).toContain("Q"); // Quadratic curves for rounding
  });

  it("callout_cloud renders with cloud bubbles", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType: "callout_cloud" }} theme={THEME} />
    );
    expect(html).toContain("<path");
    expect(html).toContain("<ellipse"); // Small thought bubbles
  });
});

// ---- Arrow shapes ----

const ARROW_SHAPES: ShapeData["shapeType"][] = [
  "arrow_right",
  "arrow_left",
  "arrow_up",
  "arrow_down",
  "arrow_double",
  "arrow_curved",
  "chevron",
];

describe("Arrow shapes", () => {
  it.each(ARROW_SHAPES)("renders valid SVG for %s", (shapeType) => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType }} theme={THEME} />
    );
    expect(html).toContain("<svg");
    expect(html).toContain(`data-shape-type="${shapeType}"`);
    expect(html).toContain("<path");
  });
});

// ---- Bracket / Brace shapes ----

const BRACKET_SHAPES: ShapeData["shapeType"][] = [
  "bracket_left",
  "bracket_right",
  "brace_left",
  "brace_right",
];

describe("Bracket / Brace shapes", () => {
  it.each(BRACKET_SHAPES)("renders valid SVG for %s", (shapeType) => {
    const html = renderToStaticMarkup(
      <ShapeBlock data={{ shapeType }} theme={THEME} />
    );
    expect(html).toContain("<svg");
    expect(html).toContain(`data-shape-type="${shapeType}"`);
    expect(html).toContain("<path");
  });
});

// ---- Text inside new shapes ----

describe("Text rendering in new shape types", () => {
  const SHAPES_WITH_TEXT: ShapeData["shapeType"][] = [
    "flowchart_process",
    "flowchart_decision",
    "callout_rect",
    "arrow_right",
    "chevron",
  ];

  it.each(SHAPES_WITH_TEXT)("renders text inside %s via foreignObject", (shapeType) => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{ shapeType, text: "Test label" }}
        theme={THEME}
      />
    );
    expect(html).toContain("<foreignObject");
    expect(html).toContain("Test label");
  });
});

// ---- Shape category grouping ----

describe("Shape category grouping", () => {
  it("returns all expected categories", () => {
    const groups = getShapesByCategory();
    expect(Object.keys(groups)).toEqual(
      expect.arrayContaining(["Basic", "Flowchart", "Connectors", "Callouts", "Arrows", "Brackets"])
    );
  });

  it("Basic category contains the original 11 shapes", () => {
    const groups = getShapesByCategory();
    expect(groups.Basic).toHaveLength(11);
    const types = groups.Basic.map((s) => s.type);
    expect(types).toContain("rectangle");
    expect(types).toContain("hexagon");
  });

  it("Flowchart category contains 8 shapes", () => {
    const groups = getShapesByCategory();
    expect(groups.Flowchart).toHaveLength(8);
  });

  it("Connectors category contains 3 shapes", () => {
    const groups = getShapesByCategory();
    expect(groups.Connectors).toHaveLength(3);
  });

  it("Callouts category contains 3 shapes", () => {
    const groups = getShapesByCategory();
    expect(groups.Callouts).toHaveLength(3);
  });

  it("Arrows category contains 7 shapes", () => {
    const groups = getShapesByCategory();
    expect(groups.Arrows).toHaveLength(7);
  });

  it("Brackets category contains 4 shapes", () => {
    const groups = getShapesByCategory();
    expect(groups.Brackets).toHaveLength(4);
  });

  it("total shapes across all categories equals SHAPE_TYPE_OPTIONS length", () => {
    const groups = getShapesByCategory();
    const total = Object.values(groups).reduce((sum, arr) => sum + arr.length, 0);
    expect(total).toBe(SHAPE_TYPE_OPTIONS.length);
  });

  it("SHAPE_CATEGORIES has correct order", () => {
    expect(SHAPE_CATEGORIES).toEqual([
      "Basic",
      "Flowchart",
      "Connectors",
      "Callouts",
      "Arrows",
      "Brackets",
    ]);
  });
});

// ---- Utility function tests ----

describe("isConnectorShape", () => {
  it("returns true for connector types", () => {
    expect(isConnectorShape("connector_straight")).toBe(true);
    expect(isConnectorShape("connector_elbow")).toBe(true);
    expect(isConnectorShape("connector_curved")).toBe(true);
  });

  it("returns false for non-connector types", () => {
    expect(isConnectorShape("rectangle")).toBe(false);
    expect(isConnectorShape("flowchart_process")).toBe(false);
  });
});

describe("isLineShape", () => {
  it("returns true for line and connector types", () => {
    expect(isLineShape("line")).toBe(true);
    expect(isLineShape("connector_straight")).toBe(true);
  });

  it("returns false for filled shapes", () => {
    expect(isLineShape("rectangle")).toBe(false);
    expect(isLineShape("callout_rect")).toBe(false);
  });
});
