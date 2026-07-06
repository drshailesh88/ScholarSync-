"use client";

import { useState } from "react";
import { ArrowRight, Copy, Download } from "lucide-react";
import {
  deriveExclusionReasonCounts,
  derivePrismaCounts,
} from "@/lib/sr/prisma";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

function Box({
  value,
  label,
  included,
}: {
  value: number;
  label: string;
  included?: boolean;
}) {
  return (
    <div className={included ? "pbox inc" : "pbox"}>
      <b>{value.toLocaleString()}</b>
      <span>{label}</span>
    </div>
  );
}

/** Screen 8 — PRISMA 2020 flow, auto-generated from live counts. */
export function PrismaScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const [showReasons, setShowReasons] = useState(false);

  if (!review) return <SrStageSkeleton />;

  const counts = derivePrismaCounts(review);
  const reasons = deriveExclusionReasonCounts(review);

  return (
    <div className="cv-inner wide">
      <div className="eyebrow">Stage 7 · The funnel</div>
      <h1 className="h2stage">PRISMA 2020 flow diagram</h1>
      <p className="lead">
        Auto-generated from your live review counts — no manual diagramming.
        Drill into &ldquo;excluded ▸ show reasons&rdquo; (the reasons captured
        at full-text) and &ldquo;▸ show sources&rdquo;. Downloads as a
        PRISMA-2020-compliant Word figure — a trust artifact you can put
        straight into a manuscript.
      </p>

      <div className="btnrow" style={{ marginTop: 14 }}>
        <button type="button" className="btn pri">
          <Download size={13} aria-hidden /> Download DOCX (PRISMA 2020)
        </button>
        <button type="button" className="btn">
          <Copy size={13} aria-hidden /> Copy figure
        </button>
      </div>

      <div className="prisma">
        <div className="pcol">
          <Box value={counts.identified} label="studies imported for screening" />
          <div className="parrow" />
          <Box
            value={counts.screened}
            label="studies screened (title & abstract)"
          />
          <div className="parrow" />
          <Box
            value={counts.fullTextAssessed}
            label="full-text studies assessed for eligibility"
          />
          <div className="parrow" />
          <Box value={counts.included} label="studies included in synthesis" included />
        </div>

        <div className="pside">
          <div className="harrow">
            <span className="ha" aria-hidden>
              <ArrowRight size={16} />
            </span>
            <div className="psbox">
              <b>{counts.duplicatesRemoved}</b> duplicates removed before
              screening
            </div>
          </div>
          <div className="harrow" style={{ marginTop: 24 }}>
            <span className="ha" aria-hidden>
              <ArrowRight size={16} />
            </span>
            <div className="psbox">
              <b>{counts.irrelevantAtScreening}</b> studies irrelevant at title
              &amp; abstract
            </div>
          </div>
          <div className="harrow" style={{ marginTop: 22 }}>
            <span className="ha" aria-hidden>
              <ArrowRight size={16} />
            </span>
            <div className="psbox">
              <b>{counts.fullTextExcluded}</b> full-text studies excluded
              <button
                type="button"
                className="sr-link"
                aria-expanded={showReasons}
                onClick={() => setShowReasons((value) => !value)}
              >
                ▸ Show reasons
              </button>
              {showReasons ? (
                <div className="reasonlist">
                  {reasons.map((reason) => (
                    <div className="reasonrow" key={reason.code}>
                      <span>{reason.label}</span>
                      <span className="rc">{reason.count}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          {counts.ongoing > 0 ? (
            <div className="harrow" style={{ marginTop: 22 }}>
              <span className="ha" aria-hidden>
                <ArrowRight size={16} />
              </span>
              <div className="psbox">
                <b>{counts.ongoing}</b> studies ongoing / awaiting classification
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
