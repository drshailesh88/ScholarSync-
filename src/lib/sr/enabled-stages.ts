import type { SrStageId } from "./stage-rail";

/**
 * Stages that exist as routes. All nine funnel screens are built; rail entries
 * and CTAs for anything not listed here would render locked.
 */
export const BUILT_STAGES: readonly SrStageId[] = [
  "summary",
  "import",
  "screen",
  "conflicts",
  "fulltext",
  "rob",
  "extract",
  "prisma",
  "report",
  "export",
];
