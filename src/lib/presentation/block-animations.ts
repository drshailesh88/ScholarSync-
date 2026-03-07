import type { CSSProperties } from "react";
import type { BlockAnimation, ContentBlock } from "@/types/presentation";

export type BlockAnimationPlaybackState = "hidden" | "animate" | "visible";
export type RevealAnimationType = Exclude<BlockAnimation["type"], "none">;
export type RevealAnimation = Omit<BlockAnimation, "type"> & { type: RevealAnimationType };

export const BLOCK_ANIMATION_CLASS_BY_TYPE = {
  fadeIn: "slides-block-anim-fade-in",
  slideUp: "slides-block-anim-slide-up",
  slideLeft: "slides-block-anim-slide-left",
  scaleIn: "slides-block-anim-scale-in",
  typewriter: "slides-block-anim-typewriter",
} as const;

export const BLOCK_ANIMATION_KEYFRAME_BY_TYPE = {
  fadeIn: "slides-block-kf-fade-in",
  slideUp: "slides-block-kf-slide-up",
  slideLeft: "slides-block-kf-slide-left",
  scaleIn: "slides-block-kf-scale-in",
  typewriter: "slides-block-kf-typewriter",
} as const;

export const BLOCK_ANIMATION_KEYFRAME_DEFINITIONS = {
  fadeIn: "0% { opacity: 0; } 100% { opacity: 1; }",
  slideUp: "0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); }",
  slideLeft: "0% { opacity: 0; transform: translateX(-24px); } 100% { opacity: 1; transform: translateX(0); }",
  scaleIn: "0% { opacity: 0; transform: scale(0.88); } 100% { opacity: 1; transform: scale(1); }",
  typewriter: "0% { max-width: 0; opacity: 1; } 100% { max-width: 100%; opacity: 1; }",
} as const;

export function buildBlockAnimationStylesheet(): string {
  return `
@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.fadeIn} { ${BLOCK_ANIMATION_KEYFRAME_DEFINITIONS.fadeIn} }
@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.slideUp} { ${BLOCK_ANIMATION_KEYFRAME_DEFINITIONS.slideUp} }
@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.slideLeft} { ${BLOCK_ANIMATION_KEYFRAME_DEFINITIONS.slideLeft} }
@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.scaleIn} { ${BLOCK_ANIMATION_KEYFRAME_DEFINITIONS.scaleIn} }
@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.typewriter} { ${BLOCK_ANIMATION_KEYFRAME_DEFINITIONS.typewriter} }

.${BLOCK_ANIMATION_CLASS_BY_TYPE.fadeIn} {
  animation-name: ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.fadeIn};
}

.${BLOCK_ANIMATION_CLASS_BY_TYPE.slideUp} {
  animation-name: ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.slideUp};
}

.${BLOCK_ANIMATION_CLASS_BY_TYPE.slideLeft} {
  animation-name: ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.slideLeft};
}

.${BLOCK_ANIMATION_CLASS_BY_TYPE.scaleIn} {
  animation-name: ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.scaleIn};
}

.${BLOCK_ANIMATION_CLASS_BY_TYPE.typewriter} {
  animation-name: ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE.typewriter};
}

.${BLOCK_ANIMATION_CLASS_BY_TYPE.fadeIn},
.${BLOCK_ANIMATION_CLASS_BY_TYPE.slideUp},
.${BLOCK_ANIMATION_CLASS_BY_TYPE.slideLeft},
.${BLOCK_ANIMATION_CLASS_BY_TYPE.scaleIn},
.${BLOCK_ANIMATION_CLASS_BY_TYPE.typewriter} {
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}
`;
}

export function hasRevealAnimation(animation?: BlockAnimation): animation is RevealAnimation {
  return Boolean(animation && animation.type !== "none");
}

export function normalizeAnimationOrder(animation?: BlockAnimation): number {
  if (!hasRevealAnimation(animation)) return 0;
  const rawOrder = Number.isFinite(animation.order) ? Math.floor(animation.order) : 1;
  return Math.max(rawOrder, 1);
}

export function getRevealOrders(blocks: { animation?: BlockAnimation }[]): number[] {
  const orders = new Set<number>();
  for (const block of blocks) {
    const order = normalizeAnimationOrder(block.animation);
    if (order > 0) orders.add(order);
  }
  return [...orders].sort((a, b) => a - b);
}

export function getMaxRevealOrder(blocks: { animation?: BlockAnimation }[]): number {
  const orders = getRevealOrders(blocks);
  return orders.length > 0 ? orders[orders.length - 1] : 0;
}

function countCharacters(value: unknown): number {
  if (typeof value === "string") return value.length;
  if (typeof value === "number") return String(value).length;
  if (Array.isArray(value)) {
    return value.reduce((sum, entry) => sum + countCharacters(entry), 0);
  }
  if (value && typeof value === "object") {
    const entries = Object.values(value as Record<string, unknown>);
    return entries.reduce<number>((sum, entry) => sum + countCharacters(entry), 0);
  }
  return 0;
}

export function estimateBlockTypewriterSteps(block: ContentBlock): number {
  const chars = countCharacters(block.data);
  const clamped = Math.min(Math.max(chars, 12), 180);
  return Math.round(clamped);
}

function getAnimationDuration(animation: BlockAnimation): number {
  const duration = Number.isFinite(animation.duration) ? animation.duration : 0.4;
  return Math.max(duration, 0.05);
}

function getAnimationDelay(animation: BlockAnimation): number {
  const delay = Number.isFinite(animation.delay) ? animation.delay : 0;
  return Math.max(delay, 0);
}

export function getAnimationRunTimeSeconds(animation?: BlockAnimation): number {
  if (!hasRevealAnimation(animation)) return 0;
  return getAnimationDelay(animation) + getAnimationDuration(animation);
}

interface AnimationPlaybackOptions {
  state: BlockAnimationPlaybackState;
  typewriterSteps?: number;
}

export function getBlockAnimationPlaybackProps(
  animation: BlockAnimation | undefined,
  options: AnimationPlaybackOptions,
): { className?: string; style: CSSProperties } {
  const state = options.state;

  if (!hasRevealAnimation(animation)) {
    return {
      style: {},
    };
  }

  if (state === "hidden") {
    if (animation.type === "typewriter") {
      return {
        style: {
          opacity: 0,
          maxWidth: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
      };
    }

    return {
      style: {
        opacity: 0,
      },
    };
  }

  if (state === "visible") {
    if (animation.type === "typewriter") {
      return {
        style: {
          opacity: 1,
          maxWidth: "100%",
          overflow: "visible",
          whiteSpace: "normal",
        },
      };
    }

    return {
      style: {
        opacity: 1,
      },
    };
  }

  const className = BLOCK_ANIMATION_CLASS_BY_TYPE[animation.type];
  const steps = Math.max(8, options.typewriterSteps ?? 24);

  const style: CSSProperties = {
    animationDuration: `${getAnimationDuration(animation)}s`,
    animationDelay: `${getAnimationDelay(animation)}s`,
    animationFillMode: "both",
    willChange:
      animation.type === "fadeIn" ? "opacity" : "opacity, transform",
  };

  if (animation.type === "typewriter") {
    (style as CSSProperties & Record<string, string | number>)["--slides-typewriter-steps"] = steps;
    style.animationTimingFunction = `steps(${steps}, end)`;
    style.maxWidth = 0;
    style.opacity = 1;
    style.overflow = "hidden";
    style.whiteSpace = "nowrap";
  }

  return {
    className,
    style,
  };
}

export interface AnimatedBlockEntry {
  block: ContentBlock;
  blockIndex: number;
  animation: RevealAnimation;
  order: number;
}

export function getAnimatedBlockEntries(blocks: ContentBlock[]): AnimatedBlockEntry[] {
  return blocks
    .map((block, blockIndex) => {
      if (!hasRevealAnimation(block.animation)) return null;
      return {
        block,
        blockIndex,
        animation: block.animation,
        order: normalizeAnimationOrder(block.animation),
      };
    })
    .filter((entry): entry is AnimatedBlockEntry => entry !== null);
}
