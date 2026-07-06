"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { useDomain } from "@/components/providers/domain-provider";
import { getReviewById, MOCK_REVIEW_ID } from "@/lib/sr/fixtures";
import { deriveFunnelSummary } from "@/lib/sr/funnel";
import "@/components/sr/sr.css";

/**
 * Systematic Review hub — lists the reviews available to this workspace.
 * While the module runs on mock data, that's the one seeded review; "New
 * review" opens the [projectId] first-run flow at the `new-review` id.
 */
export default function SystematicReviewHubPage() {
  const router = useRouter();
  const domain = useDomain();

  if (domain?.features.systematicReview === false) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-12">
        <h1 className="text-2xl font-semibold text-ink">
          Systematic Review is not available for {domain.label}
        </h1>
        <p className="text-sm text-ink-muted">
          This workspace is configured for a research domain that does not yet
          include the systematic review module.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex w-fit items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  const review = getReviewById(MOCK_REVIEW_ID);
  const summary = deriveFunnelSummary(review);

  return (
    <div className="sr-module" style={{ display: "block", height: "auto", margin: 0 }}>
      <div className="cv-inner wide">
        <div className="eyebrow">Systematic review</div>
        <h1 className="display">Systematic Reviews</h1>
        <p className="lead">
          PRISMA 2020-compliant systematic review pipeline with{" "}
          <b>AI-powered screening</b>, data extraction, and risk-of-bias
          assessment. The human vote is always the system of record.
        </p>

        <div className="btnrow" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="btn pri"
            onClick={() => router.push("/systematic-review/new-review")}
          >
            <Plus size={15} aria-hidden />
            New review
          </button>
        </div>

        <div className="seclabel" style={{ marginTop: 30 }}>
          Your reviews
          <span className="sp" />
        </div>

        <div className="funnel">
          <div className="fstage">
            <Link href={`/systematic-review/${review.id}`} className="top">
              <span className="fname">{review.shortTitle}</span>
              <span className="fmeta">
                {summary.imported.toLocaleString()} references ·{" "}
                {review.reviewers.length} reviewers
              </span>
              <span className="flinks">
                <span className="srcchip ai">
                  <Sparkles size={10} aria-hidden /> AI
                </span>
                <span>
                  Open review{" "}
                  <ArrowRight
                    size={13}
                    aria-hidden
                    style={{ display: "inline", verticalAlign: -2 }}
                  />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
