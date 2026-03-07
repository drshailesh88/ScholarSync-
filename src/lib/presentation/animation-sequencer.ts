import type { BlockAnimation, AnimationTrigger } from "@/types/presentation";
import { getFullSequenceDuration } from "./animation-variants";

// ---------------------------------------------------------------------------
// Animation Sequencer — computes step-based playback from trigger metadata
// ---------------------------------------------------------------------------

export interface AnimationStep {
  blockIndices: number[];   // which blocks animate in this step
  startTime: number;        // seconds from slide entry (for auto steps)
  isClickTriggered: boolean; // needs user click to start
}

/**
 * Resolve the effective trigger for a block animation.
 * Defaults to "onClick" when trigger is undefined.
 */
function resolveTrigger(animation?: BlockAnimation): AnimationTrigger {
  if (!animation || animation.type === "none") return "onClick";
  return animation.trigger ?? "onClick";
}

/**
 * Get the full animation duration of a block (entrance + emphasis + exit).
 */
function getBlockFullDuration(animation?: BlockAnimation): number {
  if (!animation || animation.type === "none") return 0;
  return getFullSequenceDuration(animation);
}

/**
 * Compute the animation step sequence for a slide's blocks.
 *
 * Blocks are processed in their natural array order. Each block's `trigger`
 * determines how it groups into steps:
 *
 * - "onClick" (default): creates a new click-triggered step
 * - "withPrevious": joins the most recent step (same startTime, same trigger type)
 * - "afterPrevious": creates a new auto-triggered step after the previous step ends
 * - "auto": creates a new auto-triggered step at its delay time from slide entry
 *
 * Blocks with type "none" or no animation are skipped.
 */
export function computeAnimationSequence(
  blocks: { animation?: BlockAnimation }[],
): AnimationStep[] {
  const steps: AnimationStep[] = [];
  let prevStepEndTime = 0;

  for (let i = 0; i < blocks.length; i++) {
    const anim = blocks[i].animation;
    if (!anim || anim.type === "none") continue;

    const trigger = resolveTrigger(anim);

    switch (trigger) {
      case "onClick": {
        const step: AnimationStep = {
          blockIndices: [i],
          startTime: 0,
          isClickTriggered: true,
        };
        steps.push(step);
        prevStepEndTime = getBlockFullDuration(anim);
        break;
      }

      case "withPrevious": {
        if (steps.length === 0) {
          // No previous step — treat as a new click-triggered step
          const step: AnimationStep = {
            blockIndices: [i],
            startTime: 0,
            isClickTriggered: true,
          };
          steps.push(step);
          prevStepEndTime = getBlockFullDuration(anim);
        } else {
          const lastStep = steps[steps.length - 1];
          lastStep.blockIndices.push(i);
          // Update end time to the max of existing end and this block's duration
          const thisEndTime = lastStep.startTime + getBlockFullDuration(anim);
          prevStepEndTime = Math.max(prevStepEndTime, thisEndTime);
        }
        break;
      }

      case "afterPrevious": {
        const delay = Number.isFinite(anim.delay) ? Math.max(anim.delay, 0) : 0;
        const startTime = prevStepEndTime + delay;
        const step: AnimationStep = {
          blockIndices: [i],
          startTime,
          isClickTriggered: false,
        };
        steps.push(step);
        prevStepEndTime = startTime + getBlockFullDuration(anim);
        break;
      }

      case "auto": {
        const delay = Number.isFinite(anim.delay) ? Math.max(anim.delay, 0) : 0;
        const step: AnimationStep = {
          blockIndices: [i],
          startTime: delay,
          isClickTriggered: false,
        };
        steps.push(step);
        prevStepEndTime = delay + getBlockFullDuration(anim);
        break;
      }
    }
  }

  return steps;
}

/**
 * Count how many click-triggered steps exist in a sequence.
 */
export function countClickSteps(steps: AnimationStep[]): number {
  return steps.filter((s) => s.isClickTriggered).length;
}

/**
 * Get the total number of steps in a sequence.
 */
export function countTotalSteps(steps: AnimationStep[]): number {
  return steps.length;
}
