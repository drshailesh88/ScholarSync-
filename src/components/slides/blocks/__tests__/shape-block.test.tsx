import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ShapeBlock } from "../shape-block";
import type { ThemeConfig, ShapeData } from "@/types/presentation";
import { createDefaultBlock } from "../index";

const THEME: ThemeConfig = {
  name: "Test Theme",
  primaryColor: "#3366ff",
  secondaryColor: "#222222",
  backgroundColor: "#ffffff",
  textColor: "#111111",
  accentColor: "#ff8800",
};

const SHAPE_TYPES: ShapeData["shapeType"][] = [
  "rectangle",
  "rounded_rectangle",
  "circle",
  "ellipse",
  "triangle",
  "arrow",
  "line",
  "star",
  "diamond",
  "pentagon",
  "hexagon",
];

describe("ShapeBlock", () => {
  it("renders valid SVG for all 11 shape types", () => {
    for (const shapeType of SHAPE_TYPES) {
      const html = renderToStaticMarkup(
        <ShapeBlock
          data={{ shapeType }}
          theme={THEME}
        />
      );
      expect(html).toContain("<svg");
      expect(html).toContain(`data-shape-type=\"${shapeType}\"`);
    }
  });

  it("applies fill color correctly", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{ shapeType: "rectangle", fillColor: "#ff0000" }}
        theme={THEME}
      />
    );

    expect(html).toContain("fill=\"#ff0000\"");
  });

  it("renders stroke with configured width", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{
          shapeType: "rectangle",
          fillColor: "#cccccc",
          strokeColor: "#00aa00",
          strokeWidth: 4,
        }}
        theme={THEME}
      />
    );

    expect(html).toContain("stroke=\"#00aa00\"");
    expect(html).toContain("stroke-width=\"4\"");
  });

  it("renders text inside shape using foreignObject", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{ shapeType: "diamond", text: "Inside shape", textAlign: "center" }}
        theme={THEME}
      />
    );

    expect(html).toContain("<foreignObject");
    expect(html).toContain("Inside shape");
  });

  it("applies opacity correctly", () => {
    const html = renderToStaticMarkup(
      <ShapeBlock
        data={{ shapeType: "ellipse", opacity: 42 }}
        theme={THEME}
      />
    );

    expect(html).toContain("opacity:0.42");
  });

  it("block registry creates shape with expected defaults", () => {
    const block = createDefaultBlock("shape");
    expect(block.type).toBe("shape");
    expect(block.data).toHaveProperty("shapeType", "rectangle");
    expect(block.data).toHaveProperty("strokeWidth", 0);
  });
});
