import { describe, expect, it } from "vitest";
import { rectsIntersect, toBoundsRect } from "../selection-utils";

describe("selection-utils", () => {
  it("computes normalized bounds from drag points", () => {
    expect(
      toBoundsRect({ startX: 120, startY: 80, currentX: 40, currentY: 20 })
    ).toEqual({ left: 40, top: 20, right: 120, bottom: 80 });
  });

  it("returns true when rectangles intersect", () => {
    const a = { left: 10, top: 10, right: 50, bottom: 50 };
    const b = { left: 40, top: 40, right: 80, bottom: 80 };
    expect(rectsIntersect(a, b)).toBe(true);
  });

  it("returns false when rectangles do not intersect", () => {
    const a = { left: 10, top: 10, right: 20, bottom: 20 };
    const b = { left: 30, top: 30, right: 40, bottom: 40 };
    expect(rectsIntersect(a, b)).toBe(false);
  });
});
