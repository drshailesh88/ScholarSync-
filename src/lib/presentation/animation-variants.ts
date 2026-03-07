import type { BlockAnimation, ExitAnimationType, EmphasisAnimationType } from "@/types/presentation";

export type AnimationType = BlockAnimation["type"];

export interface AnimationVariant {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

export interface ExitVariant {
  animate: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

export interface EmphasisVariant {
  keyframes: Record<string, unknown[]>;
  transition?: Record<string, unknown>;
}

export const ANIMATION_VARIANTS: Record<AnimationType, AnimationVariant | null> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  slideDown: {
    initial: { y: -40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  slideLeft: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  slideRight: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  scaleIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  scaleUp: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  bounceIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  flipInX: {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
  },
  flipInY: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
  },
  rotateIn: {
    initial: { rotate: -180, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
  },
  zoomIn: {
    initial: { scale: 3, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  dissolve: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  wipeRight: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
  },
  wipeDown: {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)" },
  },
  typewriter: null, // handled separately (character reveal)
  none: null,
};

/**
 * Get framer-motion animation variant for a given type.
 * Returns a safe fallback (fadeIn) for unknown types.
 */
export function getAnimationVariant(type: string): AnimationVariant {
  const variant = ANIMATION_VARIANTS[type as AnimationType];
  if (variant) return variant;
  // For typewriter, none, or unknown — return identity (no motion)
  if (type === "typewriter" || type === "none") {
    return { initial: {}, animate: {} };
  }
  // Unknown type — fallback to fadeIn
  return ANIMATION_VARIANTS.fadeIn!;
}

// ---------------------------------------------------------------------------
// Exit Variants — animate blocks OFF the slide
// ---------------------------------------------------------------------------

export const EXIT_VARIANTS: Record<ExitAnimationType, ExitVariant | null> = {
  fadeOut: {
    animate: { opacity: 0 },
  },
  slideUp: {
    animate: { y: -40, opacity: 0 },
  },
  slideDown: {
    animate: { y: 40, opacity: 0 },
  },
  slideLeft: {
    animate: { x: -60, opacity: 0 },
  },
  slideRight: {
    animate: { x: 60, opacity: 0 },
  },
  scaleOut: {
    animate: { scale: 0, opacity: 0 },
  },
  shrinkOut: {
    animate: { scale: 0.3, opacity: 0 },
  },
  zoomOut: {
    animate: { scale: 3, opacity: 0 },
  },
  dissolveOut: {
    animate: { opacity: 0, filter: "blur(10px)" },
  },
  none: null,
};

/**
 * Get framer-motion exit variant for a given exit type.
 * Returns a safe fallback (fadeOut) for unknown types.
 */
export function getExitVariant(type: string): ExitVariant {
  const variant = EXIT_VARIANTS[type as ExitAnimationType];
  if (variant) return variant;
  if (type === "none") return { animate: {} };
  return EXIT_VARIANTS.fadeOut!;
}

// ---------------------------------------------------------------------------
// Emphasis Variants — draw attention while block is visible
// ---------------------------------------------------------------------------

export const EMPHASIS_VARIANTS: Record<EmphasisAnimationType, EmphasisVariant | null> = {
  pulse: {
    keyframes: { scale: [1, 1.05, 1] },
  },
  bounce: {
    keyframes: { y: [0, -10, 0] },
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
  shake: {
    keyframes: { x: [0, -5, 5, -5, 5, 0] },
  },
  grow: {
    keyframes: { scale: [1, 1.1, 1] },
  },
  spin: {
    keyframes: { rotate: [0, 360] },
  },
  none: null,
};

/**
 * Get framer-motion emphasis variant for a given emphasis type.
 * Returns a safe fallback (pulse) for unknown types.
 */
export function getEmphasisVariant(type: string): EmphasisVariant {
  const variant = EMPHASIS_VARIANTS[type as EmphasisAnimationType];
  if (variant) return variant;
  if (type === "none") return { keyframes: {} };
  return EMPHASIS_VARIANTS.pulse!;
}

/**
 * Compute the total animation sequence duration for a block:
 * entrance.duration + emphasis.delay + emphasis.duration*repeat + exit.delay + exit.duration
 */
export function getFullSequenceDuration(animation: BlockAnimation): number {
  let total = (animation.duration ?? 0.4);

  if (animation.emphasis && animation.emphasis.type !== "none") {
    total += (animation.emphasis.delay ?? 0);
    total += (animation.emphasis.duration ?? 0.4) * (animation.emphasis.repeat ?? 1);
  }

  if (animation.exit && animation.exit.type !== "none") {
    total += (animation.exit.delay ?? 0);
    total += (animation.exit.duration ?? 0.4);
  }

  return total;
}
