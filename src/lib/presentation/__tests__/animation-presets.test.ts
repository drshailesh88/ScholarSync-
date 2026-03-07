/**
 * Tests for animation presets
 *
 * Tests animation preset definitions and application functions
 */

import { describe, it, expect } from "vitest";
import {
  ANIMATION_PRESETS,
  ANIMATION_PRESETS_MAP,
  applyAnimationPreset,
  countRevealSteps,
} from "../animation-presets";
import type { AnimationPresetKey, ContentBlock, BlockAnimation } from "@/types/presentation";

describe("ANIMATION_PRESETS", () => {
  it("has all expected preset keys", () => {
    const keys = ANIMATION_PRESETS.map((p) => p.key);
    expect(keys).toContain("sequential_build");
    expect(keys).toContain("fade_all");
    expect(keys).toContain("stagger");
    expect(keys).toContain("results_reveal");
    expect(keys).toContain("slide_cascade");
    expect(keys).toContain("zoom_focus");
    expect(keys).toContain("dramatic_reveal");
    expect(keys).toContain("none");
  });

  it("has 8 presets total", () => {
    expect(ANIMATION_PRESETS).toHaveLength(8);
  });

  describe("each preset", () => {
    ANIMATION_PRESETS.forEach((preset) => {
      describe(`${preset.key}`, () => {
        it("has required fields", () => {
          expect(preset.key).toBeTruthy();
          expect(preset.label).toBeTruthy();
          expect(preset.description).toBeTruthy();
          expect(typeof preset.generate).toBe("function");
        });

        it("generate returns array of BlockAnimations", () => {
          const result = preset.generate(3);
          expect(Array.isArray(result)).toBe(true);
          expect(result).toHaveLength(3);
        });

        it("each BlockAnimation has required properties", () => {
          const result = preset.generate(1);
          const anim = result[0];
          expect(anim).toHaveProperty("type");
          expect(anim).toHaveProperty("delay");
          expect(anim).toHaveProperty("duration");
          expect(anim).toHaveProperty("order");
          expect(typeof anim.delay).toBe("number");
          expect(typeof anim.duration).toBe("number");
          expect(typeof anim.order).toBe("number");
        });
      });
    });
  });

  describe("sequential_build", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "sequential_build")!;

    it("assigns sequential delays (0.5s apart)", () => {
      const result = preset.generate(3);
      expect(result[0].delay).toBe(0);
      expect(result[1].delay).toBe(0.5);
      expect(result[2].delay).toBe(1.0);
    });

    it("assigns sequential orders", () => {
      const result = preset.generate(3);
      expect(result[0].order).toBe(1);
      expect(result[1].order).toBe(2);
      expect(result[2].order).toBe(3);
    });

    it("uses fadeIn type", () => {
      const result = preset.generate(1);
      expect(result[0].type).toBe("fadeIn");
    });

    it("has 0.4s duration", () => {
      const result = preset.generate(1);
      expect(result[0].duration).toBe(0.4);
    });
  });

  describe("fade_all", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "fade_all")!;

    it("assigns zero delay to all blocks", () => {
      const result = preset.generate(5);
      result.forEach((anim) => {
        expect(anim.delay).toBe(0);
      });
    });

    it("assigns same order to all blocks", () => {
      const result = preset.generate(3);
      result.forEach((anim) => {
        expect(anim.order).toBe(1);
      });
    });

    it("has 0.6s duration", () => {
      const result = preset.generate(1);
      expect(result[0].duration).toBe(0.6);
    });
  });

  describe("stagger", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "stagger")!;

    it("assigns cascading delays (0.15s apart)", () => {
      const result = preset.generate(3);
      expect(result[0].delay).toBe(0);
      expect(result[1].delay).toBe(0.15);
      expect(result[2].delay).toBe(0.30);
    });

    it("uses slideUp type", () => {
      const result = preset.generate(1);
      expect(result[0].type).toBe("slideUp");
    });
  });

  describe("results_reveal", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "results_reveal")!;

    it("first block appears immediately", () => {
      const result = preset.generate(3);
      expect(result[0].delay).toBe(0);
      expect(result[0].duration).toBe(0.3);
      expect(result[0].order).toBe(1);
    });

    it("subsequent blocks have longer pauses (0.7s apart)", () => {
      const result = preset.generate(3);
      expect(result[1].delay).toBe(0.3);
      expect(result[2].delay).toBe(1.0);
    });

    it("uses scaleIn for subsequent blocks", () => {
      const result = preset.generate(2);
      expect(result[0].type).toBe("fadeIn");
      expect(result[1].type).toBe("scaleIn");
    });

    it("handles empty block count", () => {
      const result = preset.generate(0);
      expect(result).toHaveLength(0);
    });
  });

  describe("slide_cascade", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "slide_cascade")!;

    it("uses slideRight type", () => {
      const result = preset.generate(3);
      result.forEach((anim) => expect(anim.type).toBe("slideRight"));
    });

    it("assigns staggered delays (0.2s apart)", () => {
      const result = preset.generate(3);
      expect(result[0].delay).toBe(0);
      expect(result[1].delay).toBeCloseTo(0.2);
      expect(result[2].delay).toBeCloseTo(0.4);
    });

    it("assigns sequential orders", () => {
      const result = preset.generate(3);
      expect(result[0].order).toBe(1);
      expect(result[1].order).toBe(2);
      expect(result[2].order).toBe(3);
    });
  });

  describe("zoom_focus", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "zoom_focus")!;

    it("first block uses zoomIn, rest use fadeIn", () => {
      const result = preset.generate(3);
      expect(result[0].type).toBe("zoomIn");
      expect(result[1].type).toBe("fadeIn");
      expect(result[2].type).toBe("fadeIn");
    });

    it("first block has longer duration", () => {
      const result = preset.generate(2);
      expect(result[0].duration).toBe(0.6);
      expect(result[1].duration).toBe(0.4);
    });

    it("handles empty block count", () => {
      const result = preset.generate(0);
      expect(result).toHaveLength(0);
    });
  });

  describe("dramatic_reveal", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "dramatic_reveal")!;

    it("alternates between wipeDown and dissolve", () => {
      const result = preset.generate(4);
      expect(result[0].type).toBe("wipeDown");
      expect(result[1].type).toBe("dissolve");
      expect(result[2].type).toBe("wipeDown");
      expect(result[3].type).toBe("dissolve");
    });

    it("assigns staggered delays (0.4s apart)", () => {
      const result = preset.generate(3);
      expect(result[0].delay).toBe(0);
      expect(result[1].delay).toBeCloseTo(0.4);
      expect(result[2].delay).toBeCloseTo(0.8);
    });
  });

  describe("none", () => {
    const preset = ANIMATION_PRESETS.find((p) => p.key === "none")!;

    it("assigns zero delay and duration", () => {
      const result = preset.generate(5);
      result.forEach((anim) => {
        expect(anim.delay).toBe(0);
        expect(anim.duration).toBe(0);
      });
    });

    it("assigns order 0 to all blocks", () => {
      const result = preset.generate(3);
      result.forEach((anim) => {
        expect(anim.order).toBe(0);
      });
    });

    it("uses none type", () => {
      const result = preset.generate(1);
      expect(result[0].type).toBe("none");
    });
  });
});

describe("ANIMATION_PRESETS_MAP", () => {
  it("maps all preset keys to presets", () => {
    const keys = Object.keys(ANIMATION_PRESETS_MAP) as AnimationPresetKey[];
    expect(keys).toContain("sequential_build");
    expect(keys).toContain("fade_all");
    expect(keys).toContain("stagger");
    expect(keys).toContain("results_reveal");
    expect(keys).toContain("slide_cascade");
    expect(keys).toContain("zoom_focus");
    expect(keys).toContain("dramatic_reveal");
    expect(keys).toContain("none");
  });

  it("provides lookup by key", () => {
    expect(ANIMATION_PRESETS_MAP.sequential_build).toBeDefined();
    expect(ANIMATION_PRESETS_MAP.sequential_build.key).toBe("sequential_build");
  });
});

describe("applyAnimationPreset", () => {
  const createBlock = (): ContentBlock => ({
    type: "text",
    data: { text: "test" },
  });

  it("applies sequential_build preset to blocks", () => {
    const blocks = [createBlock(), createBlock(), createBlock()];
    const result = applyAnimationPreset(blocks, "sequential_build");

    expect(result[0].animation?.order).toBe(1);
    expect(result[1].animation?.order).toBe(2);
    expect(result[2].animation?.order).toBe(3);
  });

  it("returns unchanged blocks for invalid preset", () => {
    const blocks = [createBlock(), createBlock()];
    const result = applyAnimationPreset(blocks, "invalid" as AnimationPresetKey);

    expect(result).toBe(blocks);
  });

  it("does not mutate original blocks", () => {
    const blocks = [createBlock()];
    const result = applyAnimationPreset(blocks, "fade_all");

    expect(blocks[0].animation).toBeUndefined();
    expect(result[0].animation).toBeDefined();
  });

  it("applies fade_all preset (all order 1)", () => {
    const blocks = [createBlock(), createBlock()];
    const result = applyAnimationPreset(blocks, "fade_all");

    expect(result[0].animation?.order).toBe(1);
    expect(result[1].animation?.order).toBe(1);
  });

  it("applies none preset (all order 0)", () => {
    const blocks = [createBlock(), createBlock()];
    const result = applyAnimationPreset(blocks, "none");

    expect(result[0].animation?.order).toBe(0);
    expect(result[1].animation?.order).toBe(0);
  });

  it("handles empty blocks array", () => {
    const result = applyAnimationPreset([], "sequential_build");
    expect(result).toHaveLength(0);
  });
});

describe("countRevealSteps", () => {
  const createBlock = (animation: { type: string; order: number; duration: number; delay: number } | undefined): ContentBlock => ({
    type: "text",
    data: { text: "test" },
    animation: animation as BlockAnimation | undefined,
  });

  it("counts distinct reveal steps (order > 0, type != none)", () => {
    const blocks = [
      createBlock({ type: "fadeIn", order: 1, duration: 0.4, delay: 0 }),
      createBlock({ type: "fadeIn", order: 2, duration: 0.4, delay: 0.2 }),
      createBlock({ type: "fadeIn", order: 2, duration: 0.4, delay: 0 }),
      createBlock({ type: "fadeIn", order: 3, duration: 0.4, delay: 0.4 }),
    ];
    expect(countRevealSteps(blocks)).toBe(3);
  });

  it("ignores blocks with order 0", () => {
    const blocks = [
      createBlock({ type: "fadeIn", order: 0, duration: 0, delay: 0 }),
      createBlock({ type: "fadeIn", order: 1, duration: 0.4, delay: 0 }),
    ];
    expect(countRevealSteps(blocks)).toBe(1);
  });

  it("ignores blocks with none type", () => {
    const blocks = [
      createBlock({ type: "none", order: 1, duration: 0, delay: 0 }),
      createBlock({ type: "fadeIn", order: 1, duration: 0.4, delay: 0 }),
    ];
    expect(countRevealSteps(blocks)).toBe(1);
  });

  it("handles blocks without animation", () => {
    const blocks = [
      createBlock(undefined),
      createBlock(undefined),
    ];
    expect(countRevealSteps(blocks)).toBe(0);
  });

  it("handles empty array", () => {
    expect(countRevealSteps([])).toBe(0);
  });

  it("counts correctly for results_reveal preset", () => {
    const blocks = [
      createBlock({ type: "fadeIn", order: 1, duration: 0.3, delay: 0 }),
      createBlock({ type: "scaleIn", order: 2, duration: 0.5, delay: 0.3 }),
      createBlock({ type: "scaleIn", order: 3, duration: 0.5, delay: 0.8 }),
    ];
    expect(countRevealSteps(blocks)).toBe(3);
  });
});
