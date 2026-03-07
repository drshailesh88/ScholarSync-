import { describe, it, expect } from "vitest";
import {
  ANIMATION_VARIANTS,
  EXIT_VARIANTS,
  EMPHASIS_VARIANTS,
  getAnimationVariant,
  getExitVariant,
  getEmphasisVariant,
  getFullSequenceDuration,
  type AnimationType,
} from "../animation-variants";
import type { ExitAnimationType, EmphasisAnimationType } from "@/types/presentation";

const ENTRANCE_TYPES: AnimationType[] = [
  "fadeIn",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
  "scaleIn",
  "scaleUp",
  "bounceIn",
  "flipInX",
  "flipInY",
  "rotateIn",
  "zoomIn",
  "dissolve",
  "wipeRight",
  "wipeDown",
];

const EXIT_TYPES: ExitAnimationType[] = [
  "fadeOut",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
  "scaleOut",
  "shrinkOut",
  "zoomOut",
  "dissolveOut",
];

const EMPHASIS_TYPES: EmphasisAnimationType[] = [
  "pulse",
  "bounce",
  "shake",
  "grow",
  "spin",
];

// =========================================================================
// Entrance variants (existing tests preserved)
// =========================================================================

describe("ANIMATION_VARIANTS", () => {
  it("has entries for all 15 entrance types plus typewriter and none", () => {
    const keys = Object.keys(ANIMATION_VARIANTS);
    for (const t of ENTRANCE_TYPES) {
      expect(keys).toContain(t);
    }
    expect(keys).toContain("typewriter");
    expect(keys).toContain("none");
  });

  it.each(ENTRANCE_TYPES)(
    "%s returns valid initial and animate objects",
    (type) => {
      const variant = ANIMATION_VARIANTS[type];
      expect(variant).not.toBeNull();
      expect(variant!.initial).toBeDefined();
      expect(variant!.animate).toBeDefined();
      expect(Object.keys(variant!.initial).length).toBeGreaterThan(0);
      expect(Object.keys(variant!.animate).length).toBeGreaterThan(0);
    },
  );

  it("typewriter and none are null (handled separately)", () => {
    expect(ANIMATION_VARIANTS.typewriter).toBeNull();
    expect(ANIMATION_VARIANTS.none).toBeNull();
  });
});

describe("getAnimationVariant", () => {
  it("returns identity transforms for 'none'", () => {
    const result = getAnimationVariant("none");
    expect(result.initial).toEqual({});
    expect(result.animate).toEqual({});
  });

  it("returns identity transforms for 'typewriter'", () => {
    const result = getAnimationVariant("typewriter");
    expect(result.initial).toEqual({});
    expect(result.animate).toEqual({});
  });

  it("falls back to fadeIn for unknown types", () => {
    const result = getAnimationVariant("unknown_animation");
    expect(result.initial).toEqual({ opacity: 0 });
    expect(result.animate).toEqual({ opacity: 1 });
  });

  it.each(ENTRANCE_TYPES)(
    "%s returns non-empty initial state",
    (type) => {
      const variant = getAnimationVariant(type);
      expect(Object.keys(variant.initial).length).toBeGreaterThan(0);
    },
  );

  it("bounceIn has spring transition", () => {
    const variant = getAnimationVariant("bounceIn");
    expect(variant.transition).toBeDefined();
    expect(variant.transition!.type).toBe("spring");
  });

  it("scaleUp has spring transition", () => {
    const variant = getAnimationVariant("scaleUp");
    expect(variant.transition).toBeDefined();
    expect(variant.transition!.type).toBe("spring");
  });

  it("dissolve uses filter blur in initial state", () => {
    const variant = getAnimationVariant("dissolve");
    expect(variant.initial.filter).toBe("blur(10px)");
    expect(variant.animate.filter).toBe("blur(0px)");
  });

  it("wipeRight uses clipPath", () => {
    const variant = getAnimationVariant("wipeRight");
    expect(variant.initial.clipPath).toBe("inset(0 100% 0 0)");
    expect(variant.animate.clipPath).toBe("inset(0 0% 0 0)");
  });

  it("wipeDown uses clipPath", () => {
    const variant = getAnimationVariant("wipeDown");
    expect(variant.initial.clipPath).toBe("inset(0 0 100% 0)");
    expect(variant.animate.clipPath).toBe("inset(0 0 0% 0)");
  });
});

// =========================================================================
// Exit variants
// =========================================================================

describe("EXIT_VARIANTS", () => {
  it("has entries for all 9 exit types plus none", () => {
    const keys = Object.keys(EXIT_VARIANTS);
    for (const t of EXIT_TYPES) {
      expect(keys).toContain(t);
    }
    expect(keys).toContain("none");
  });

  it.each(EXIT_TYPES)(
    "%s returns valid animate-to state",
    (type) => {
      const variant = EXIT_VARIANTS[type];
      expect(variant).not.toBeNull();
      expect(variant!.animate).toBeDefined();
      expect(Object.keys(variant!.animate).length).toBeGreaterThan(0);
    },
  );

  it("none is null", () => {
    expect(EXIT_VARIANTS.none).toBeNull();
  });

  it("exit variants are opposites of entrance variants", () => {
    // fadeOut goes to opacity 0 (opposite of fadeIn which starts at opacity 0)
    expect(EXIT_VARIANTS.fadeOut!.animate.opacity).toBe(0);
    expect(ANIMATION_VARIANTS.fadeIn!.initial.opacity).toBe(0);

    // slideUp exit goes to y:-40 (opposite of slideUp entrance which starts at y:40)
    expect(EXIT_VARIANTS.slideUp!.animate.y).toBe(-40);

    // scaleOut goes to scale 0 (opposite of scaleIn which starts at scale 0)
    expect(EXIT_VARIANTS.scaleOut!.animate.scale).toBe(0);
    expect(ANIMATION_VARIANTS.scaleIn!.initial.scale).toBe(0);

    // dissolveOut goes to blur (opposite of dissolve entrance)
    expect(EXIT_VARIANTS.dissolveOut!.animate.filter).toBe("blur(10px)");
    expect(ANIMATION_VARIANTS.dissolve!.initial.filter).toBe("blur(10px)");
  });
});

describe("getExitVariant", () => {
  it("returns identity for 'none'", () => {
    const result = getExitVariant("none");
    expect(result.animate).toEqual({});
  });

  it("falls back to fadeOut for unknown types", () => {
    const result = getExitVariant("unknown_exit");
    expect(result.animate).toEqual({ opacity: 0 });
  });

  it.each(EXIT_TYPES)(
    "%s returns non-empty animate state",
    (type) => {
      const variant = getExitVariant(type);
      expect(Object.keys(variant.animate).length).toBeGreaterThan(0);
    },
  );
});

// =========================================================================
// Emphasis variants
// =========================================================================

describe("EMPHASIS_VARIANTS", () => {
  it("has entries for all 5 emphasis types plus none", () => {
    const keys = Object.keys(EMPHASIS_VARIANTS);
    for (const t of EMPHASIS_TYPES) {
      expect(keys).toContain(t);
    }
    expect(keys).toContain("none");
  });

  it.each(EMPHASIS_TYPES)(
    "%s returns valid keyframe arrays",
    (type) => {
      const variant = EMPHASIS_VARIANTS[type];
      expect(variant).not.toBeNull();
      expect(variant!.keyframes).toBeDefined();
      const arrays = Object.values(variant!.keyframes);
      expect(arrays.length).toBeGreaterThan(0);
      for (const arr of arrays) {
        expect(Array.isArray(arr)).toBe(true);
        expect(arr.length).toBeGreaterThanOrEqual(2);
      }
    },
  );

  it("none is null", () => {
    expect(EMPHASIS_VARIANTS.none).toBeNull();
  });

  it("pulse uses scale keyframes", () => {
    expect(EMPHASIS_VARIANTS.pulse!.keyframes.scale).toEqual([1, 1.05, 1]);
  });

  it("bounce uses y keyframes with spring transition", () => {
    expect(EMPHASIS_VARIANTS.bounce!.keyframes.y).toEqual([0, -10, 0]);
    expect(EMPHASIS_VARIANTS.bounce!.transition?.type).toBe("spring");
  });

  it("shake uses x keyframes", () => {
    expect(EMPHASIS_VARIANTS.shake!.keyframes.x).toEqual([0, -5, 5, -5, 5, 0]);
  });

  it("grow uses scale keyframes", () => {
    expect(EMPHASIS_VARIANTS.grow!.keyframes.scale).toEqual([1, 1.1, 1]);
  });

  it("spin uses rotate keyframes", () => {
    expect(EMPHASIS_VARIANTS.spin!.keyframes.rotate).toEqual([0, 360]);
  });
});

describe("getEmphasisVariant", () => {
  it("returns empty keyframes for 'none'", () => {
    const result = getEmphasisVariant("none");
    expect(result.keyframes).toEqual({});
  });

  it("falls back to pulse for unknown types", () => {
    const result = getEmphasisVariant("unknown_emphasis");
    expect(result.keyframes.scale).toEqual([1, 1.05, 1]);
  });

  it.each(EMPHASIS_TYPES)(
    "%s returns non-empty keyframes",
    (type) => {
      const variant = getEmphasisVariant(type);
      expect(Object.keys(variant.keyframes).length).toBeGreaterThan(0);
    },
  );
});

// =========================================================================
// Full sequence duration
// =========================================================================

describe("getFullSequenceDuration", () => {
  it("returns entrance duration for simple animation", () => {
    const result = getFullSequenceDuration({
      type: "fadeIn",
      delay: 0,
      duration: 0.5,
      order: 1,
    });
    expect(result).toBe(0.5);
  });

  it("includes emphasis with repeat count", () => {
    const result = getFullSequenceDuration({
      type: "fadeIn",
      delay: 0,
      duration: 0.5,
      order: 1,
      emphasis: { type: "pulse", delay: 0.2, duration: 0.3, repeat: 3 },
    });
    // 0.5 + 0.2 + 0.3*3 = 1.6
    expect(result).toBeCloseTo(1.6);
  });

  it("includes exit timing", () => {
    const result = getFullSequenceDuration({
      type: "fadeIn",
      delay: 0,
      duration: 0.5,
      order: 1,
      exit: { type: "fadeOut", delay: 0.1, duration: 0.4 },
    });
    // 0.5 + 0.1 + 0.4 = 1.0
    expect(result).toBeCloseTo(1.0);
  });

  it("chains entrance → emphasis → exit", () => {
    const result = getFullSequenceDuration({
      type: "slideUp",
      delay: 0,
      duration: 0.4,
      order: 1,
      emphasis: { type: "bounce", delay: 0.1, duration: 0.3, repeat: 2 },
      exit: { type: "fadeOut", delay: 0.2, duration: 0.5 },
    });
    // 0.4 + 0.1 + 0.3*2 + 0.2 + 0.5 = 1.8
    expect(result).toBeCloseTo(1.8);
  });

  it("ignores emphasis with type none", () => {
    const result = getFullSequenceDuration({
      type: "fadeIn",
      delay: 0,
      duration: 0.5,
      order: 1,
      emphasis: { type: "none", delay: 0.5, duration: 0.5 },
    });
    expect(result).toBe(0.5);
  });

  it("ignores exit with type none", () => {
    const result = getFullSequenceDuration({
      type: "fadeIn",
      delay: 0,
      duration: 0.5,
      order: 1,
      exit: { type: "none", delay: 0.5, duration: 0.5 },
    });
    expect(result).toBe(0.5);
  });

  it("emphasis repeat defaults to 1 when not specified", () => {
    const result = getFullSequenceDuration({
      type: "fadeIn",
      delay: 0,
      duration: 0.5,
      order: 1,
      emphasis: { type: "pulse", delay: 0, duration: 0.3 },
    });
    // 0.5 + 0 + 0.3*1 = 0.8
    expect(result).toBeCloseTo(0.8);
  });
});
