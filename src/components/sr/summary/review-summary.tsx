"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import type { FunnelSummary, YourWork } from "@/lib/sr/funnel";
import type { SrStageId } from "@/lib/sr/stage-rail";
import { FunnelStageCard } from "./funnel-stage-card";
import { StageButton, StageLink } from "./stage-link";
import { TeamProgress } from "./team-progress";

interface ReviewSummaryProps {
  reviewId: string;
  reviewTitle: string;
  summary: FunnelSummary;
  yourWork: YourWork;
  youFirstName: string;
  enabledStages: readonly SrStageId[];
}

function AiChip() {
  return (
    <span className="srcchip ai">
      <Sparkles size={10} aria-hidden /> AI
    </span>
  );
}

function FirstRunGuidance(props: ReviewSummaryProps) {
  const { reviewId, enabledStages } = props;
  return (
    <div className="stateblock">
      <AiChip />
      <h3>No references yet</h3>
      <p>
        Import your search results (RIS / EndNote / PubMed / CSV) to start
        screening. ScholarSync deduplicates automatically and keeps a
        reversible import ledger for PRISMA.
      </p>
      <div className="actions">
        <StageButton
          reviewId={reviewId}
          stage="import"
          enabledStages={enabledStages}
          primary
        >
          Import references
        </StageButton>
      </div>
    </div>
  );
}

/** Screen 1 — the funnel home: live counts and per-stage calls to action. */
export function ReviewSummary(props: ReviewSummaryProps) {
  const { reviewId, reviewTitle, summary, yourWork, youFirstName } = props;
  const { enabledStages } = props;
  const { screening, fullText } = summary;

  return (
    <div className="cv-inner wide">
      <div className="eyebrow">{reviewTitle} · systematic review</div>
      <h1 className="display">Review Summary</h1>
      <div className="srcpair">
        <AiChip />
      </div>
      <p className="lead">
        The review home is a four-stage funnel with live counts and per-stage
        calls to action. The human vote is always the <b>system of record</b>;
        the AI gives every reviewer a running head-start.
      </p>

      {summary.imported === 0 ? (
        <FirstRunGuidance {...props} />
      ) : (
        <>
          <div className="aistrip">
            <span className="tag">
              <AiChip />
            </span>
            <span>
              <b>AI pre-screened {summary.ai.preScreened} studies</b> ·
              suggested <b>{summary.ai.suggestedInclude} to include</b> with
              per-criterion reasoning. You confirm.
            </span>
            <span className="sysrec">Human vote = system of record</span>
          </div>

          <div
            className="funnelviz"
            role="img"
            aria-label="Review funnel — imported narrowing to included"
          >
            {[
              { l: "Imported", n: summary.imported },
              { l: "Deduplicated", n: summary.imported - summary.duplicatesRemoved },
              { l: "Full-text", n: fullText.toAssess },
              { l: "Included", n: summary.ai.suggestedInclude, inc: true },
            ].map((s) => (
              <div
                key={s.l}
                className={s.inc ? "fbar included" : "fbar"}
                style={{
                  width: `${Math.max(
                    32,
                    Math.round((s.n / (summary.imported || 1)) * 100),
                  )}%`,
                }}
              >
                <span className="fbar-n">{s.n.toLocaleString()}</span>
                <span className="fbar-l">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="funnel">
            <FunnelStageCard
              name="Import references"
              meta={`${summary.imported} imported`}
              links={
                <>
                  <StageLink
                    reviewId={reviewId}
                    stage="import"
                    enabledStages={enabledStages}
                  >
                    {summary.duplicatesRemoved} duplicates removed
                  </StageLink>
                  <StageLink
                    reviewId={reviewId}
                    stage="import"
                    enabledStages={enabledStages}
                  >
                    Import more →
                  </StageLink>
                </>
              }
            />

            <FunnelStageCard
              name="Title & abstract screening"
              defaultOpen
              links={
                <>
                  <StageLink
                    reviewId={reviewId}
                    stage="screen"
                    enabledStages={enabledStages}
                  >
                    {screening.noVotes} to screen
                  </StageLink>
                  <StageLink
                    reviewId={reviewId}
                    stage="screen"
                    enabledStages={enabledStages}
                  >
                    Continue →
                  </StageLink>
                </>
              }
            >
              <TeamProgress
                screening={screening}
                contributions={summary.contributions}
              />
              <div className="fcta">
                <div className="you">{youFirstName}, you can still</div>
                <div className="pair">
                  <div className="stat">
                    <div className="big">{yourWork.toResolve}</div>
                    <div className="sm">Resolve</div>
                  </div>
                  <div className="stat">
                    <div className="big">{yourWork.toScreen}</div>
                    <div className="sm">Screen</div>
                  </div>
                </div>
                <div className="btnrow">
                  <StageButton
                    reviewId={reviewId}
                    stage="conflicts"
                    enabledStages={enabledStages}
                  >
                    Resolve conflicts
                  </StageButton>
                  <StageButton
                    reviewId={reviewId}
                    stage="screen"
                    enabledStages={enabledStages}
                    primary
                  >
                    Continue screening
                  </StageButton>
                </div>
                <div className="since">
                  <span className="spark" aria-hidden>
                    <TrendingUp size={12} />
                  </span>
                  You&apos;ve screened {yourWork.screenedSoFar} studies so far
                </div>
              </div>
            </FunnelStageCard>

            <FunnelStageCard
              name="Full-text review"
              meta={`${fullText.toAssess} to assess`}
              links={
                <StageLink
                  reviewId={reviewId}
                  stage="fulltext"
                  enabledStages={enabledStages}
                >
                  {fullText.toAssess} to screen →
                </StageLink>
              }
            />

            <FunnelStageCard
              name="Extraction & quality assessment"
              meta="0 extracted"
              links={
                <StageLink
                  reviewId={reviewId}
                  stage="extract"
                  enabledStages={enabledStages}
                >
                  0 extracted
                </StageLink>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
