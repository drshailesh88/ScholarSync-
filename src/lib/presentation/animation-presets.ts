import type { BlockAnimation, AnimationPresetKey } from "@/types/presentation";

// =============================================================================
// Animation Presets for per-block reveal in presenter mode
// =============================================================================

export interface AnimationPreset {
  key: AnimationPresetKey;
  label: string;
  description: string;
  generate: (blockCount: number) => BlockAnimation[];
}

/** "Build" - reveals content one block at a time (great for academic talks) */
function sequentialBuild(blockCount: number): BlockAnimation[] {
  return Array.from({ length: blockCount }, (_, i) => ({
    type: "fadeIn" as const,
    delay: i * 0.5,
    duration: 0.4,
    order: i + 1,
  }));
}

/** "Fade All" - everything fades in simultaneously */
function fadeAll(blockCount: number): BlockAnimation[] {
  return Array.from({ length: blockCount }, () => ({
    type: "fadeIn" as const,
    delay: 0,
    duration: 0.6,
    order: 1,
  }));
}

/** "Stagger" - slight cascade effect */
function stagger(blockCount: number): BlockAnimation[] {
  return Array.from({ length: blockCount }, (_, i) => ({
    type: "slideUp" as const,
    delay: i * 0.15,
    duration: 0.4,
    order: i + 1,
  }));
}

/** "Results Reveal" - title first, then data blocks one by one (for results slides) */
function resultsReveal(blockCount: number): BlockAnimation[] {
  if (blockCount === 0) return [];
  // First block (title) appears immediately
  const animations: BlockAnimation[] = [
    { type: "fadeIn", delay: 0, duration: 0.3, order: 1 },
  ];
  // Remaining blocks reveal one by one with longer pauses
  for (let i = 1; i < blockCount; i++) {
    animations.push({
      type: "scaleIn",
      delay: 0.3 + (i - 1) * 0.7,
      duration: 0.5,
      order: i + 1,
    });
  }
  return animations;
}

/** "Slide Cascade" - slideRight with staggered delays */
function slideCascade(blockCount: number): BlockAnimation[] {
  return Array.from({ length: blockCount }, (_, i) => ({
    type: "slideRight" as const,
    delay: i * 0.2,
    duration: 0.5,
    order: i + 1,
  }));
}

/** "Zoom Focus" - first block zoomIn, rest fadeIn */
function zoomFocus(blockCount: number): BlockAnimation[] {
  if (blockCount === 0) return [];
  return Array.from({ length: blockCount }, (_, i) => ({
    type: (i === 0 ? "zoomIn" : "fadeIn") as BlockAnimation["type"],
    delay: i === 0 ? 0 : 0.3 + (i - 1) * 0.2,
    duration: i === 0 ? 0.6 : 0.4,
    order: i + 1,
  }));
}

/** "Dramatic Reveal" - wipeDown for even blocks (images/charts), dissolve for odd (text) */
function dramaticReveal(blockCount: number): BlockAnimation[] {
  return Array.from({ length: blockCount }, (_, i) => ({
    type: (i % 2 === 0 ? "wipeDown" : "dissolve") as BlockAnimation["type"],
    delay: i * 0.4,
    duration: 0.6,
    order: i + 1,
  }));
}

/** "None" - no animations */
function none(blockCount: number): BlockAnimation[] {
  return Array.from({ length: blockCount }, () => ({
    type: "none" as const,
    delay: 0,
    duration: 0,
    order: 0,
  }));
}

export const ANIMATION_PRESETS: AnimationPreset[] = [
  {
    key: "sequential_build",
    label: "Sequential Build",
    description: "Reveals content one block at a time",
    generate: sequentialBuild,
  },
  {
    key: "fade_all",
    label: "Fade All",
    description: "Everything fades in simultaneously",
    generate: fadeAll,
  },
  {
    key: "stagger",
    label: "Stagger",
    description: "Slight cascade effect top to bottom",
    generate: stagger,
  },
  {
    key: "results_reveal",
    label: "Results Reveal",
    description: "Title first, then data blocks one by one",
    generate: resultsReveal,
  },
  {
    key: "slide_cascade",
    label: "Slide Cascade",
    description: "Blocks slide in from the right with staggered delays",
    generate: slideCascade,
  },
  {
    key: "zoom_focus",
    label: "Zoom Focus",
    description: "First block zooms in, rest fade in",
    generate: zoomFocus,
  },
  {
    key: "dramatic_reveal",
    label: "Dramatic Reveal",
    description: "Alternating wipe and dissolve effects",
    generate: dramaticReveal,
  },
  {
    key: "none",
    label: "None",
    description: "No animations",
    generate: none,
  },
];

export const ANIMATION_PRESETS_MAP: Record<AnimationPresetKey, AnimationPreset> =
  Object.fromEntries(ANIMATION_PRESETS.map((p) => [p.key, p])) as Record<
    AnimationPresetKey,
    AnimationPreset
  >;

/**
 * Apply an animation preset to a list of content blocks (returns new blocks
 * with animation metadata attached). Does not mutate the originals.
 */
export function applyAnimationPreset<T extends { animation?: BlockAnimation }>(
  blocks: T[],
  presetKey: AnimationPresetKey,
): T[] {
  const preset = ANIMATION_PRESETS_MAP[presetKey];
  if (!preset) return blocks;
  const animations = preset.generate(blocks.length);
  return blocks.map((block, i) => ({
    ...block,
    animation: animations[i],
  }));
}

/**
 * Count how many distinct reveal steps a slide has (for the progress dots).
 * Blocks with order 0 or type "none" are always visible.
 */
export function countRevealSteps(blocks: { animation?: BlockAnimation }[]): number {
  const orders = new Set<number>();
  for (const b of blocks) {
    if (b.animation && b.animation.type !== "none" && b.animation.order > 0) {
      orders.add(b.animation.order);
    }
  }
  return orders.size;
}
