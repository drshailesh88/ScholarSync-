import { describe, expect, it } from "vitest";
import type { BlockPosition } from "@/types/presentation";
import {
  computeAlignmentGuides,
  computeEqualSpacingGuides,
} from "../alignment-engine";

function block(position: BlockPosition): BlockPosition {
  return position;
}

describe("alignment-engine", () => {
  it("snaps to canvas center (50%)", () => {
    const moving = block({ x: 39.2, y: 10, width: 20, height: 20 });

    const result = computeAlignmentGuides(moving, [], 1000, 500);

    expect(result.snappedPosition.x).toBe(40);
    expect(result.guides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ axis: "vertical", position: 50, type: "canvas" }),
      ])
    );
  });

  it("snaps to another block's left edge", () => {
    const moving = block({ x: 28.9, y: 10, width: 10, height: 10 });
    const others = [block({ x: 30, y: 40, width: 10, height: 10 })];

    const result = computeAlignmentGuides(moving, others, 1000, 500);

    expect(result.snappedPosition.x).toBe(30);
    expect(result.guides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ axis: "vertical", position: 30, type: "edge" }),
      ])
    );
  });

  it("snaps to another block's center", () => {
    const moving = block({ x: 44, y: 10, width: 10, height: 10 });
    const others = [block({ x: 40, y: 30, width: 20, height: 20 })];

    const result = computeAlignmentGuides(moving, others, 1000, 500);

    expect(result.snappedPosition.x).toBe(45);
    expect(result.guides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ axis: "vertical", position: 50, type: "center" }),
      ])
    );
  });

  it("does not snap when outside threshold", () => {
    const moving = block({ x: 47, y: 10, width: 10, height: 10 });

    const result = computeAlignmentGuides(moving, [], 1000, 500);

    expect(result.snappedPosition.x).toBe(47);
  });

  it("detects equal spacing with three blocks in a row", () => {
    const moving = block({ x: 30, y: 20, width: 10, height: 10 });
    const others = [
      block({ x: 10, y: 20, width: 10, height: 10 }),
      block({ x: 50, y: 20, width: 10, height: 10 }),
    ];

    const guides = computeEqualSpacingGuides(moving, others);

    expect(guides.length).toBeGreaterThanOrEqual(2);
    expect(guides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ axis: "horizontal", gap: 10 }),
      ])
    );
  });

  it("generates horizontal and vertical guides", () => {
    const moving = block({ x: 21, y: 31, width: 10, height: 10 });
    const others = [block({ x: 20, y: 30, width: 10, height: 10 })];

    const result = computeAlignmentGuides(moving, others, 1000, 500);

    expect(result.guides.some((guide) => guide.axis === "vertical")).toBe(true);
    expect(result.guides.some((guide) => guide.axis === "horizontal")).toBe(true);
  });
});
