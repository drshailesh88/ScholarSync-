import { describe, it, expect } from "vitest";
import { buildWaterfallData, describeArc } from "../chart-block";

// ---------------------------------------------------------------------------
// Waterfall data transformation
// ---------------------------------------------------------------------------
describe("buildWaterfallData", () => {
  it("produces correct base/value pairs for positive values", () => {
    const result = buildWaterfallData(["A", "B", "Total"], [10, 20, 0]);
    expect(result[0]).toEqual({ name: "A", base: 0, value: 10, total: 10, isTotal: false });
    expect(result[1]).toEqual({ name: "B", base: 10, value: 20, total: 30, isTotal: false });
    // Last item is total
    expect(result[2]).toMatchObject({ name: "Total", isTotal: true });
    expect(result[2].base).toBe(0);
  });

  it("handles negative values correctly", () => {
    const result = buildWaterfallData(["Revenue", "Cost", "Net"], [100, -40, 0]);
    expect(result[0]).toEqual({ name: "Revenue", base: 0, value: 100, total: 100, isTotal: false });
    // Negative: base = cumulative + value = 100 + (-40) = 60
    expect(result[1]).toEqual({ name: "Cost", base: 60, value: 40, total: 60, isTotal: false });
    expect(result[2]).toMatchObject({ name: "Net", base: 0, value: 60, isTotal: true });
  });

  it("handles single item as total", () => {
    const result = buildWaterfallData(["Total"], [50]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ name: "Total", base: 0, value: 50, total: 50, isTotal: true });
  });
});

// ---------------------------------------------------------------------------
// Gauge arc calculation
// ---------------------------------------------------------------------------
describe("describeArc", () => {
  it("returns an SVG arc path string", () => {
    const path = describeArc(150, 130, 100, 0, 180);
    expect(path).toContain("M ");
    expect(path).toContain(" A ");
    expect(path).toMatch(/^M [\d.-]+ [\d.-]+ A 100 100 0 [01] 1 [\d.-]+ [\d.-]+$/);
  });

  it("computes correct endpoints for 0 degrees (right)", () => {
    const path = describeArc(0, 0, 100, 0, 90);
    // At 0 degrees: x = cos(0)*100 = 100, y = sin(0)*100 = 0
    expect(path).toMatch(/^M 100(\.0+)? 0(\.0+)? /);
  });

  it("handles full 180 degree arc with largeArc flag", () => {
    const path = describeArc(150, 130, 100, 0, 180);
    // 180 degrees → should NOT set large arc flag (180 is not > 180)
    expect(path).toContain(" 0 1 ");
  });

  it("sets largeArc flag for arcs > 180 degrees", () => {
    const path = describeArc(150, 130, 100, 0, 270);
    expect(path).toContain(" 1 1 ");
  });

  it("computes 0% gauge (0 degree arc)", () => {
    // For gauge at 0%, we pass same start and end → degenerate arc
    const path = describeArc(150, 130, 100, 180, 180);
    expect(path).toBeDefined();
  });

  it("computes 50% gauge (90 degree arc)", () => {
    const path = describeArc(150, 130, 100, 90, 180);
    expect(path).toContain("A 100 100");
  });

  it("computes 100% gauge (180 degree arc)", () => {
    const path = describeArc(150, 130, 100, 0, 180);
    expect(path).toContain("A 100 100");
  });
});
