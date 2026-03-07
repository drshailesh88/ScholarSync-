import { describe, expect, it } from "vitest";
import {
  BLOCK_ANIMATION_CLASS_BY_TYPE,
  BLOCK_ANIMATION_KEYFRAME_BY_TYPE,
  buildBlockAnimationStylesheet,
  getBlockAnimationPlaybackProps,
} from "../block-animations";

describe("block animation CSS", () => {
  it("generates classes with matching keyframes", () => {
    const stylesheet = buildBlockAnimationStylesheet();

    expect(stylesheet).toContain(`@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.fadeIn}`);
    expect(stylesheet).toContain(`@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.slideUp}`);
    expect(stylesheet).toContain(`@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.slideLeft}`);
    expect(stylesheet).toContain(`@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.scaleIn}`);
    expect(stylesheet).toContain(`@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.typewriter}`);

    expect(stylesheet).toContain(`.${BLOCK_ANIMATION_CLASS_BY_TYPE.fadeIn}`);
    expect(stylesheet).toContain(`.${BLOCK_ANIMATION_CLASS_BY_TYPE.slideUp}`);
    expect(stylesheet).toContain(`.${BLOCK_ANIMATION_CLASS_BY_TYPE.slideLeft}`);
    expect(stylesheet).toContain(`.${BLOCK_ANIMATION_CLASS_BY_TYPE.scaleIn}`);
    expect(stylesheet).toContain(`.${BLOCK_ANIMATION_CLASS_BY_TYPE.typewriter}`);

    expect(stylesheet).toContain("translateY(20px)");
    expect(stylesheet).toContain("translateX(-24px)");
    expect(stylesheet).toContain("scale(0.88)");
    expect(stylesheet).toContain("max-width: 0");
  });

  it("keeps blocks without animation immediately visible", () => {
    const hidden = getBlockAnimationPlaybackProps(undefined, { state: "hidden" });
    const animated = getBlockAnimationPlaybackProps(undefined, { state: "animate" });

    expect(hidden.style).toEqual({});
    expect(animated.style).toEqual({});
    expect(hidden.className).toBeUndefined();
    expect(animated.className).toBeUndefined();
  });
});
