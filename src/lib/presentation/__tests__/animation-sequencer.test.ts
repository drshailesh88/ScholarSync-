import { describe, it, expect } from "vitest";
import {
  computeAnimationSequence,
  countClickSteps,
  countTotalSteps,
} from "../animation-sequencer";
import type { BlockAnimation } from "@/types/presentation";

function makeBlock(
  overrides: Partial<BlockAnimation> = {},
): { animation: BlockAnimation } {
  return {
    animation: {
      type: "fadeIn",
      delay: 0,
      duration: 0.4,
      order: 1,
      ...overrides,
    },
  };
}

// =========================================================================
// Empty / edge cases
// =========================================================================

describe("computeAnimationSequence — edge cases", () => {
  it("returns empty sequence for empty blocks array", () => {
    const result = computeAnimationSequence([]);
    expect(result).toEqual([]);
  });

  it("skips blocks with no animation", () => {
    const result = computeAnimationSequence([
      { animation: undefined },
      { animation: undefined },
    ]);
    expect(result).toEqual([]);
  });

  it("skips blocks with type none", () => {
    const result = computeAnimationSequence([
      makeBlock({ type: "none" }),
    ]);
    expect(result).toEqual([]);
  });
});

// =========================================================================
// onClick trigger (default)
// =========================================================================

describe("computeAnimationSequence — onClick", () => {
  it("all onClick blocks create separate steps", () => {
    const blocks = [
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "onClick" }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      blockIndices: [0],
      startTime: 0,
      isClickTriggered: true,
    });
    expect(result[1]).toEqual({
      blockIndices: [1],
      startTime: 0,
      isClickTriggered: true,
    });
    expect(result[2]).toEqual({
      blockIndices: [2],
      startTime: 0,
      isClickTriggered: true,
    });
  });

  it("default trigger (undefined) is treated as onClick", () => {
    const blocks = [
      makeBlock(), // no trigger field
      makeBlock(), // no trigger field
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(2);
    expect(result[0].isClickTriggered).toBe(true);
    expect(result[1].isClickTriggered).toBe(true);
    expect(result[0].blockIndices).toEqual([0]);
    expect(result[1].blockIndices).toEqual([1]);
  });
});

// =========================================================================
// withPrevious trigger
// =========================================================================

describe("computeAnimationSequence — withPrevious", () => {
  it("withPrevious joins the previous step", () => {
    const blocks = [
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "withPrevious" }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(1);
    expect(result[0].blockIndices).toEqual([0, 1]);
    expect(result[0].isClickTriggered).toBe(true);
  });

  it("multiple withPrevious all join the same step", () => {
    const blocks = [
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "withPrevious" }),
      makeBlock({ trigger: "withPrevious" }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(1);
    expect(result[0].blockIndices).toEqual([0, 1, 2]);
  });

  it("withPrevious as first block creates a click step", () => {
    const blocks = [
      makeBlock({ trigger: "withPrevious" }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(1);
    expect(result[0].blockIndices).toEqual([0]);
    expect(result[0].isClickTriggered).toBe(true);
  });

  it("withPrevious joins auto step too", () => {
    const blocks = [
      makeBlock({ trigger: "auto", delay: 1 }),
      makeBlock({ trigger: "withPrevious" }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(1);
    expect(result[0].blockIndices).toEqual([0, 1]);
    expect(result[0].isClickTriggered).toBe(false);
    expect(result[0].startTime).toBe(1);
  });
});

// =========================================================================
// afterPrevious trigger
// =========================================================================

describe("computeAnimationSequence — afterPrevious", () => {
  it("afterPrevious creates auto step with correct start time", () => {
    const blocks = [
      makeBlock({ trigger: "onClick", duration: 0.5 }),
      makeBlock({ trigger: "afterPrevious", delay: 0.2, duration: 0.3 }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(2);
    expect(result[0].isClickTriggered).toBe(true);
    expect(result[1].isClickTriggered).toBe(false);
    // startTime = prev end (0.5) + delay (0.2)
    expect(result[1].startTime).toBeCloseTo(0.7);
  });

  it("afterPrevious chains correctly", () => {
    const blocks = [
      makeBlock({ trigger: "onClick", duration: 0.4 }),
      makeBlock({ trigger: "afterPrevious", delay: 0, duration: 0.3 }),
      makeBlock({ trigger: "afterPrevious", delay: 0.1, duration: 0.2 }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(3);
    // Step 0: click, ends at 0.4
    expect(result[0].isClickTriggered).toBe(true);
    // Step 1: after prev, starts at 0.4 + 0 = 0.4, ends at 0.4 + 0.3 = 0.7
    expect(result[1].startTime).toBeCloseTo(0.4);
    expect(result[1].isClickTriggered).toBe(false);
    // Step 2: after prev, starts at 0.7 + 0.1 = 0.8
    expect(result[2].startTime).toBeCloseTo(0.8);
    expect(result[2].isClickTriggered).toBe(false);
  });

  it("afterPrevious as first block starts at delay from 0", () => {
    const blocks = [
      makeBlock({ trigger: "afterPrevious", delay: 0.5, duration: 0.3 }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(1);
    // prevStepEndTime is 0 initially, so startTime = 0 + 0.5
    expect(result[0].startTime).toBeCloseTo(0.5);
    expect(result[0].isClickTriggered).toBe(false);
  });
});

// =========================================================================
// auto trigger
// =========================================================================

describe("computeAnimationSequence — auto", () => {
  it("single block with auto trigger uses delay as startTime", () => {
    const blocks = [
      makeBlock({ trigger: "auto", delay: 2.0, duration: 0.5 }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(1);
    expect(result[0].blockIndices).toEqual([0]);
    expect(result[0].startTime).toBe(2.0);
    expect(result[0].isClickTriggered).toBe(false);
  });

  it("auto with zero delay starts at 0", () => {
    const blocks = [
      makeBlock({ trigger: "auto", delay: 0 }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result[0].startTime).toBe(0);
    expect(result[0].isClickTriggered).toBe(false);
  });
});

// =========================================================================
// Mixed triggers
// =========================================================================

describe("computeAnimationSequence — mixed triggers", () => {
  it("mixed triggers produce correct sequence", () => {
    const blocks = [
      makeBlock({ trigger: "onClick", duration: 0.4 }),           // Step 0: click
      makeBlock({ trigger: "withPrevious", duration: 0.3 }),      // Joins step 0
      makeBlock({ trigger: "afterPrevious", delay: 0, duration: 0.2 }), // Step 1: auto after step 0
      makeBlock({ trigger: "onClick", duration: 0.5 }),           // Step 2: click
      makeBlock({ trigger: "auto", delay: 1.0, duration: 0.3 }), // Step 3: auto at 1.0s
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(4);

    // Step 0: onClick + withPrevious
    expect(result[0].blockIndices).toEqual([0, 1]);
    expect(result[0].isClickTriggered).toBe(true);

    // Step 1: afterPrevious — starts after step 0 ends
    // Step 0 end = max(0.4, 0.3) = 0.4
    expect(result[1].blockIndices).toEqual([2]);
    expect(result[1].isClickTriggered).toBe(false);
    expect(result[1].startTime).toBeCloseTo(0.4);

    // Step 2: onClick
    expect(result[2].blockIndices).toEqual([3]);
    expect(result[2].isClickTriggered).toBe(true);

    // Step 3: auto at 1.0s
    expect(result[3].blockIndices).toEqual([4]);
    expect(result[3].isClickTriggered).toBe(false);
    expect(result[3].startTime).toBe(1.0);
  });

  it("onClick followed by multiple afterPrevious chains", () => {
    const blocks = [
      makeBlock({ trigger: "onClick", duration: 1.0 }),
      makeBlock({ trigger: "afterPrevious", delay: 0.5, duration: 0.5 }),
      makeBlock({ trigger: "afterPrevious", delay: 0, duration: 0.3 }),
    ];
    const result = computeAnimationSequence(blocks);

    expect(result).toHaveLength(3);
    // Step 0: click, ends at 1.0
    expect(result[0].isClickTriggered).toBe(true);
    // Step 1: starts at 1.0 + 0.5 = 1.5, ends at 1.5 + 0.5 = 2.0
    expect(result[1].startTime).toBeCloseTo(1.5);
    // Step 2: starts at 2.0 + 0 = 2.0
    expect(result[2].startTime).toBeCloseTo(2.0);
  });
});

// =========================================================================
// Emphasis / exit affect afterPrevious timing
// =========================================================================

describe("computeAnimationSequence — full duration with emphasis/exit", () => {
  it("afterPrevious accounts for emphasis and exit duration", () => {
    const blocks = [
      makeBlock({
        trigger: "onClick",
        duration: 0.4,
        emphasis: { type: "pulse", delay: 0, duration: 0.3, repeat: 2 },
        exit: { type: "fadeOut", delay: 0, duration: 0.2 },
      }),
      makeBlock({ trigger: "afterPrevious", delay: 0, duration: 0.3 }),
    ];
    const result = computeAnimationSequence(blocks);

    // Full duration of block 0: 0.4 + 0 + 0.3*2 + 0 + 0.2 = 1.2
    expect(result[1].startTime).toBeCloseTo(1.2);
  });
});

// =========================================================================
// Helper functions
// =========================================================================

describe("countClickSteps", () => {
  it("counts only click-triggered steps", () => {
    const steps = computeAnimationSequence([
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "afterPrevious" }),
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "auto", delay: 1 }),
    ]);

    expect(countClickSteps(steps)).toBe(2);
  });

  it("returns 0 for empty sequence", () => {
    expect(countClickSteps([])).toBe(0);
  });
});

describe("countTotalSteps", () => {
  it("counts all steps", () => {
    const steps = computeAnimationSequence([
      makeBlock({ trigger: "onClick" }),
      makeBlock({ trigger: "withPrevious" }),
      makeBlock({ trigger: "afterPrevious" }),
      makeBlock({ trigger: "onClick" }),
    ]);

    // 3 steps: [onClick+withPrevious], [afterPrevious], [onClick]
    expect(countTotalSteps(steps)).toBe(3);
  });
});
