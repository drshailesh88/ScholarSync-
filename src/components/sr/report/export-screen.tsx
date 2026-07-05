"use client";

import { FileSpreadsheet, FileText, GitMerge } from "lucide-react";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

const TARGETS = [
  {
    icon: FileSpreadsheet,
    title: "CSV / Excel",
    meta: "one row per study · all extracted fields + RoB",
  },
  {
    icon: GitMerge,
    title: "RevMan 5",
    meta: "Cochrane meta-analysis & forest plots",
  },
  {
    icon: FileText,
    title: "Word / DOCX",
    meta: "characteristics tables + PRISMA figure",
  },
];

/** Screen 9b — export to the formats the field uses; no in-app stats engine. */
export function ExportScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  if (!review) return <SrStageSkeleton />;

  return (
    <div className="cv-inner wide">
      <div className="eyebrow">Stage 9 · The funnel</div>
      <h1 className="h2stage">Export</h1>
      <p className="lead">
        Final consensus data and quality assessments export to the formats the
        field actually uses. Statistical synthesis (meta-analysis / forest
        plots) happens in <b>RevMan or R</b>, not here: ScholarSync exports, it
        doesn&apos;t invent a stats engine.
      </p>

      <div className="exgrid">
        {TARGETS.map((target) => {
          const Icon = target.icon;
          return (
            <button type="button" className="excard" key={target.title}>
              <span className="ic" aria-hidden>
                <Icon size={24} />
              </span>
              <span className="t">{target.title}</span>
              <span className="m">{target.meta}</span>
            </button>
          );
        })}
      </div>

      <div className="note">
        <b>Why no forest plot here?</b>
        <p>
          Statistical synthesis (meta-analysis / forest plots) happens in{" "}
          <b>RevMan or R</b> — ScholarSync exports cleanly to the tools
          methodologists already trust, rather than reinventing a stats engine.
        </p>
      </div>
    </div>
  );
}
