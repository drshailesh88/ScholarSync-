import type { SrStageId } from "./stage-rail";

/**
 * Stages that exist as routes. Grows one vertical slice at a time; rail
 * entries and CTAs for anything not listed here render locked.
 */
export const BUILT_STAGES: readonly SrStageId[] = [
  "summary",
  "import",
  "screen",
  "conflicts",
  "fulltext",
];
