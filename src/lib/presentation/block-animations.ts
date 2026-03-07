import type { CSSProperties } from "react";
import type { BlockAnimation, ContentBlock } from "@/types/presentation";

export type BlockAnimationPlaybackState = "hidden" | "animate" | "visible";
export type RevealAnimationType = Exclude<BlockAnimation["type"], "none">;
export type RevealAnimation = Omit<BlockAnimation, "type"> & { type: RevealAnimationType };

export const BLOCK_ANIMATION_CLASS_BY_TYPE: Record<string, string> = {
  fadeIn: "slides-block-anim-fade-in",
  slideUp: "slides-block-anim-slide-up",
  slideDown: "slides-block-anim-slide-down",
  slideLeft: "slides-block-anim-slide-left",
  slideRight: "slides-block-anim-slide-right",
  scaleIn: "slides-block-anim-scale-in",
  scaleUp: "slides-block-anim-scale-up",
  bounceIn: "slides-block-anim-bounce-in",
  flipInX: "slides-block-anim-flip-in-x",
  flipInY: "slides-block-anim-flip-in-y",
  rotateIn: "slides-block-anim-rotate-in",
  zoomIn: "slides-block-anim-zoom-in",
  dissolve: "slides-block-anim-dissolve",
  wipeRight: "slides-block-anim-wipe-right",
  wipeDown: "slides-block-anim-wipe-down",
  typewriter: "slides-block-anim-typewriter",
};

export const BLOCK_ANIMATION_KEYFRAME_BY_TYPE: Record<string, string> = {
  fadeIn: "slides-block-kf-fade-in",
  slideUp: "slides-block-kf-slide-up",
  slideDown: "slides-block-kf-slide-down",
  slideLeft: "slides-block-kf-slide-left",
  slideRight: "slides-block-kf-slide-right",
  scaleIn: "slides-block-kf-scale-in",
  scaleUp: "slides-block-kf-scale-up",
  bounceIn: "slides-block-kf-bounce-in",
  flipInX: "slides-block-kf-flip-in-x",
  flipInY: "slides-block-kf-flip-in-y",
  rotateIn: "slides-block-kf-rotate-in",
  zoomIn: "slides-block-kf-zoom-in",
  dissolve: "slides-block-kf-dissolve",
  wipeRight: "slides-block-kf-wipe-right",
  wipeDown: "slides-block-kf-wipe-down",
  typewriter: "slides-block-kf-typewriter",
};

export const BLOCK_ANIMATION_KEYFRAME_DEFINITIONS: Record<string, string> = {
  fadeIn: "0% { opacity: 0; } 100% { opacity: 1; }",
  slideUp: "0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); }",
  slideDown: "0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); }",
  slideLeft: "0% { opacity: 0; transform: translateX(-24px); } 100% { opacity: 1; transform: translateX(0); }",
  slideRight: "0% { opacity: 0; transform: translateX(24px); } 100% { opacity: 1; transform: translateX(0); }",
  scaleIn: "0% { opacity: 0; transform: scale(0); } 100% { opacity: 1; transform: scale(1); }",
  scaleUp: "0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); }",
  bounceIn: "0% { opacity: 0; transform: scale(0); } 50% { transform: scale(1.15); } 70% { transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); }",
  flipInX: "0% { opacity: 0; transform: perspective(400px) rotateX(90deg); } 100% { opacity: 1; transform: perspective(400px) rotateX(0); }",
  flipInY: "0% { opacity: 0; transform: perspective(400px) rotateY(90deg); } 100% { opacity: 1; transform: perspective(400px) rotateY(0); }",
  rotateIn: "0% { opacity: 0; transform: rotate(-180deg) scale(0); } 100% { opacity: 1; transform: rotate(0) scale(1); }",
  zoomIn: "0% { opacity: 0; transform: scale(3); } 100% { opacity: 1; transform: scale(1); }",
  dissolve: "0% { opacity: 0; filter: blur(10px); } 100% { opacity: 1; filter: blur(0px); }",
  wipeRight: "0% { clip-path: inset(0 100% 0 0); } 100% { clip-path: inset(0 0% 0 0); }",
  wipeDown: "0% { clip-path: inset(0 0 100% 0); } 100% { clip-path: inset(0 0 0% 0); }",
  typewriter: "0% { max-width: 0; opacity: 1; } 100% { max-width: 100%; opacity: 1; }",
};

export function buildBlockAnimationStylesheet(): string {
  const types = Object.keys(BLOCK_ANIMATION_KEYFRAME_DEFINITIONS);

  const keyframes = types
    .map((t) => `@keyframes ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE[t]} { ${BLOCK_ANIMATION_KEYFRAME_DEFINITIONS[t]} }`)
    .join("\n");

  const classRules = types
    .map((t) => `.${BLOCK_ANIMATION_CLASS_BY_TYPE[t]} { animation-name: ${BLOCK_ANIMATION_KEYFRAME_BY_TYPE[t]}; }`)
    .join("\n");

  const allClasses = types.map((t) => `.${BLOCK_ANIMATION_CLASS_BY_TYPE[t]}`).join(",\n");

  return `
${keyframes}

${classRules}

${allClasses} {
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

  const isWipe = animation.type === "wipeRight" || animation.type === "wipeDown";

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

    if (isWipe) {
      return {
        style: {
          clipPath: animation.type === "wipeRight" ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)",
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

    if (isWipe) {
      return {
        style: {
          clipPath: "inset(0 0 0 0)",
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

  const willChange = isWipe
    ? "clip-path"
    : animation.type === "dissolve"
      ? "opacity, filter"
      : animation.type === "fadeIn"
        ? "opacity"
        : "opacity, transform";

  const style: CSSProperties = {
    animationDuration: `${getAnimationDuration(animation)}s`,
    animationDelay: `${getAnimationDelay(animation)}s`,
    animationFillMode: "both",
    willChange,
  };

  if (animation.type === "typewriter") {
    (style as CSSProperties & Record<string, string | number>)["--slides-typewriter-steps"] = steps;
    style.animationTimingFunction = `steps(${steps}, end)`;
    style.maxWidth = 0;
    style.opacity = 1;
    style.overflow = "hidden";
    style.whiteSpace = "nowrap";
  }

  if (animation.type === "bounceIn") {
    style.animationTimingFunction = "ease-in-out";
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
