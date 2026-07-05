"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, FileText, StickyNote } from "lucide-react";
import { CURRENT_REVIEWER_ID } from "@/lib/sr/fixtures";
import { canRecordExclusion, deriveFullTextQueue } from "@/lib/sr/fulltext";
import type { Candidate } from "@/lib/sr/types";
import { useSrStore } from "@/stores/sr-store";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

function EligibilityCard({ candidate }: { candidate: Candidate }) {
  const items = [
    "Randomised controlled trial",
    "Adults with heart failure",
    "SGLT2-inhibitor intervention",
    "Reports CV mortality",
    "Full text available",
  ];
  return (
    <article className="refcard">
      <div className="refid">
        #{candidate.refId}
        {candidate.year ? ` · ${candidate.year}` : ""}
      </div>
      <h2 className="reftitle">{candidate.title}</h2>
      <div className="refauth">{candidate.authors.join("; ")}</div>
      <div className="refmeta">{candidate.journal}</div>
      <div className="btnrow" style={{ marginTop: 14 }}>
        <button type="button" className="btn sm">
          <FileText size={13} aria-hidden /> Add full text (PDF)
        </button>
        <button type="button" className="btn sm">
          <StickyNote size={13} aria-hidden /> Add a note
        </button>
      </div>
      <div className="crit">
        <div className="critbox inc eligck">
          <h4>Eligibility checklist</h4>
          <ul>
            {items.map((item) => (
              <li key={item}>
                <span className="ck" aria-hidden>
                  <Check size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

interface RailProps {
  reasons: { code: string; label: string }[];
  onInclude: () => void;
  onExclude: (reasonCode: string) => void;
}

function FullTextRail({ reasons, onInclude, onExclude }: RailProps) {
  const [reasonCode, setReasonCode] = useState("");

  return (
    <aside className="ctrlrail">
      <div className="railsec">Your decision</div>
      <div className="votes">
        <button
          type="button"
          className="vote yes"
          onClick={onInclude}
        >
          <span className="vlab">Include</span>
          <span className="vkey">I</span>
        </button>
        <button
          type="button"
          className="vote no"
          disabled={!canRecordExclusion(reasonCode)}
          aria-disabled={!canRecordExclusion(reasonCode)}
          onClick={() => onExclude(reasonCode)}
        >
          <span className="vlab">Exclude</span>
          <span className="vkey">E</span>
        </button>
      </div>

      <div className="reqblock">
        <div className="h">Exclude requires a reason</div>
        <select
          aria-label="Exclusion reason"
          value={reasonCode}
          onChange={(event) => setReasonCode(event.target.value)}
        >
          <option value="">Select a reason…</option>
          {reasons.map((reason) => (
            <option key={reason.code} value={reason.code}>
              {reason.label}
            </option>
          ))}
        </select>
      </div>
      <div
        className="railnote"
        style={{ textAlign: "left", marginTop: 14 }}
      >
        Reasons are configured in Settings → Criteria &amp; exclusion reasons,
        ordered into a hierarchy by the team.
      </div>
    </aside>
  );
}

/** Screen 5 — full-text review with a mandatory structured exclusion reason. */
export function FullTextScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const castFullTextVote = useSrStore((state) => state.castFullTextVote);
  const [cursor, setCursor] = useState(0);

  if (!review) return <SrStageSkeleton />;

  const queue = deriveFullTextQueue(review, CURRENT_REVIEWER_ID);
  const current = queue.toReview[cursor];

  const include = () => {
    if (!current) return;
    castFullTextVote(current.id, CURRENT_REVIEWER_ID, "include");
    setCursor((index) => Math.max(0, Math.min(index, queue.toReview.length - 2)));
  };
  const exclude = (reasonCode: string) => {
    if (!current || !canRecordExclusion(reasonCode)) return;
    castFullTextVote(current.id, CURRENT_REVIEWER_ID, "exclude", reasonCode);
    setCursor((index) => Math.max(0, Math.min(index, queue.toReview.length - 2)));
  };

  if (!current) {
    return (
      <div className="cv-inner narrow">
        <div className="eyebrow">Stage 4 · The funnel</div>
        <h1 className="h2stage">Full-text review</h1>
        <div className="stateblock">
          <h3>Full-text queue clear</h3>
          <p>Every retrieved full text has been assessed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stage-rail-layout">
      <div className="stage-main">
        <div className="cv-inner narrow">
          <div className="eyebrow">Stage 4 · The funnel</div>
          <h1 className="h2stage">Full-text review</h1>
          <p className="lead">
            Reviewers read the actual PDF and vote a binary{" "}
            <b>Include / Exclude</b>. Every exclusion <b>requires a structured
            reason</b> from a managed, hierarchical list — that is what makes
            the PRISMA &ldquo;excluded with reasons&rdquo; box real and
            auditable.
          </p>

          <div className="tabbar" role="tablist">
            <button type="button" className="tab on" role="tab" aria-selected>
              To screen <b>{queue.tabs.toReview}</b>
            </button>
            <button type="button" className="tab conf" role="tab">
              Resolve conflicts <b>{queue.tabs.conflicts}</b>
            </button>
            <button type="button" className="tab" role="tab">
              Awaiting other <b>{queue.tabs.awaitingOther}</b>
            </button>
            <button type="button" className="tab" role="tab">
              Excluded <b>{queue.tabs.excluded}</b>
            </button>
          </div>

          <div className="queuebar">
            <span className="pos">
              Study {cursor + 1} of {queue.tabs.toReview} · full text
            </span>
            <div className="nav">
              <button
                type="button"
                aria-label="Previous study"
                disabled={cursor === 0}
                onClick={() => setCursor((index) => Math.max(0, index - 1))}
              >
                <ChevronLeft size={14} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next study"
                disabled={cursor >= queue.toReview.length - 1}
                onClick={() =>
                  setCursor((index) =>
                    Math.min(queue.toReview.length - 1, index + 1),
                  )
                }
              >
                <ChevronRight size={14} aria-hidden />
              </button>
            </div>
          </div>

          <EligibilityCard candidate={current} />
        </div>
      </div>

      <FullTextRail
        reasons={review.exclusionReasons}
        onInclude={include}
        onExclude={exclude}
      />
    </div>
  );
}
