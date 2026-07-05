import type { FunnelSummary } from "./funnel";

/** Rail entries: Review Summary plus the nine funnel stages. */
export type SrStageId =
  | "summary"
  | "import"
  | "screen"
  | "conflicts"
  | "fulltext"
  | "rob"
  | "extract"
  | "prisma"
  | "report"
  | "export";

export interface StageRailItem {
  id: SrStageId;
  /** Funnel position (1–9); absent for the summary entry. */
  n?: number;
  label: string;
  count?: string;
  /** Conflict count — rendered in the conflict (violet) colour. */
  conf?: boolean;
  done?: boolean;
  /** 0–100 team progress, shown under the active screening stage. */
  progress?: number;
  active: boolean;
  /** Absent while the stage is not yet built (rendered locked). */
  href?: string;
}

export interface StageRailOptions {
  reviewId: string;
  activeStage: SrStageId;
  enabledStages: readonly SrStageId[];
}

const STAGE_PATHS: Record<Exclude<SrStageId, "summary">, string> = {
  import: "import",
  screen: "screening",
  conflicts: "conflicts",
  fulltext: "full-text",
  rob: "risk-of-bias",
  extract: "extraction",
  prisma: "prisma",
  report: "report",
  export: "export",
};

export function stageHref(reviewId: string, stage: SrStageId): string {
  const base = `/systematic-review/${reviewId}`;
  return stage === "summary" ? base : `${base}/${STAGE_PATHS[stage]}`;
}

export function buildStageRail(
  summary: FunnelSummary,
  options: StageRailOptions,
): StageRailItem[] {
  const { reviewId, activeStage, enabledStages } = options;
  const { screening } = summary;
  const progress =
    screening.total === 0
      ? 0
      : Math.round((screening.done / screening.total) * 100);

  const stages: Array<Omit<StageRailItem, "active" | "href">> = [
    { id: "summary", label: "Review Summary" },
    {
      id: "import",
      n: 1,
      label: "Import",
      count:
        summary.imported > 0
          ? `${summary.imported} · ${summary.duplicatesRemoved} dup`
          : "0",
      done: summary.imported > 0,
    },
    {
      id: "screen",
      n: 2,
      label: "Title & abstract",
      count: String(screening.noVotes),
      progress,
    },
    {
      id: "conflicts",
      n: 3,
      label: "Resolve conflicts",
      count: String(screening.conflicts),
      conf: true,
    },
    {
      id: "fulltext",
      n: 4,
      label: "Full-text review",
      count: String(summary.fullText.toAssess),
    },
    { id: "rob", n: 5, label: "Risk of bias", count: "RoB 2" },
    { id: "extract", n: 6, label: "Data extraction" },
    { id: "prisma", n: 7, label: "PRISMA", count: "auto" },
    { id: "report", n: 8, label: "Report", count: "draft" },
    { id: "export", n: 9, label: "Export" },
  ];

  return stages.map((stage) => ({
    ...stage,
    active: stage.id === activeStage,
    href: enabledStages.includes(stage.id)
      ? stageHref(reviewId, stage.id)
      : undefined,
  }));
}
