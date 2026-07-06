"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { CURRENT_REVIEWER_ID } from "@/lib/sr/fixtures";
import { deriveConflictQueue } from "@/lib/sr/conflicts";
import type { ConflictItem } from "@/lib/sr/conflicts";
import type { TaVote } from "@/lib/sr/types";
import { useSrStore } from "@/stores/sr-store";
import { ReferenceCard } from "../screening/reference-card";
import { VoteTriad } from "../screening/vote-triad";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

type ConflictTab = "decision" | "reason";

function ConflictRail({
  item,
  onResolve,
}: {
  item: ConflictItem;
  onResolve: (decision: TaVote) => void;
}) {
  return (
    <aside className="ctrlrail">
      <div className="railsec">Why this is a conflict</div>
      {item.voters.map((voter) => (
        <div className="blindstat" key={voter.id}>
          <span className="av">{voter.initials}</span>
          <div>
            <b>{voter.name}</b>
            <br />
            <span className="hidden">voted · hidden</span>
          </div>
        </div>
      ))}
      <div
        className="railnote"
        style={{ textAlign: "left", margin: "2px 2px 18px" }}
      >
        You see who voted, never what — so their decision can&apos;t anchor
        yours.
      </div>

      <div className="railsec">Agreed final decision</div>
      <VoteTriad onVote={onResolve} />

      <div className="blindstat" style={{ marginTop: 6 }}>
        <span
          className="av"
          style={{
            background: "var(--paper)",
            borderColor: "var(--line)",
            color: "var(--ink3)",
          }}
        >
          <Flag size={11} aria-hidden />
        </span>
        <div>
          Resolver permission: <b>1st or 2nd reviewer only</b>
          <br />
          <span className="pend">
            set in Team settings · a 3rd reviewer breaks genuine deadlock
          </span>
        </div>
      </div>
    </aside>
  );
}

/** Screen 4 — blinded conflict adjudication with a κ readout. */
export function ConflictsScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const resolveConflict = useSrStore((state) => state.resolveConflict);
  const [tab, setTab] = useState<ConflictTab>("decision");
  const [cursor, setCursor] = useState(0);

  if (!review) return <SrStageSkeleton />;

  const queue = deriveConflictQueue(review);
  const items = queue[tab];
  const current = items[cursor];

  const resolve = (decision: TaVote) => {
    if (!current) return;
    resolveConflict(current.candidate.id, CURRENT_REVIEWER_ID, decision);
    setCursor((index) => Math.max(0, Math.min(index, items.length - 2)));
  };

  const kappaText =
    queue.kappa.value === null
      ? "κ — not enough data"
      : `κ ${queue.kappa.value.toFixed(2)} · ${queue.kappa.label}`;

  return (
    <div className="stage-rail-layout">
      <div className="stage-main">
        <div className="cv-inner narrow">
          <div className="eyebrow">Stage 3 · The funnel</div>
          <h1 className="h2stage">Resolve conflicts</h1>
          <p className="lead">
            When two reviewers disagree (one positive vs one No) the study lands
            here. Resolution stays <b>blinded</b>: you see <b>who</b> voted, not{" "}
            <b>what</b> — to avoid anchoring bias — then record the agreed final
            decision.
          </p>

          <div className="tabbar" role="tablist">
            <button
              type="button"
              className={tab === "decision" ? "tab conf on" : "tab conf"}
              role="tab"
              aria-selected={tab === "decision"}
              onClick={() => {
                setTab("decision");
                setCursor(0);
              }}
            >
              Decision conflicts <b>{queue.decision.length}</b>
            </button>
            <button
              type="button"
              className={tab === "reason" ? "tab conf on" : "tab conf"}
              role="tab"
              aria-selected={tab === "reason"}
              onClick={() => {
                setTab("reason");
                setCursor(0);
              }}
            >
              Reason conflicts <b>{queue.reason.length}</b>
            </button>
            <span className="kbd-hint">
              <span className="pill con">{kappaText}</span>
            </span>
          </div>

          {current ? (
            <>
              <div className="queuebar">
                <span className="pos">
                  Conflict {cursor + 1} of {items.length} ·{" "}
                  {tab === "decision" ? "decision" : "reason"} conflict
                </span>
                <div className="nav">
                  <button
                    type="button"
                    aria-label="Previous conflict"
                    disabled={cursor === 0}
                    onClick={() =>
                      setCursor((index) => Math.max(0, index - 1))
                    }
                  >
                    <ChevronLeft size={14} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Next conflict"
                    disabled={cursor >= items.length - 1}
                    onClick={() =>
                      setCursor((index) =>
                        Math.min(items.length - 1, index + 1),
                      )
                    }
                  >
                    <ChevronRight size={14} aria-hidden />
                  </button>
                </div>
              </div>
              <ReferenceCard
                candidate={current.candidate}
                criteria={review.criteria}
                showCriteria={false}
              />
            </>
          ) : (
            <div className="stateblock">
              <h3>No conflicts to resolve</h3>
              <p>
                Every disagreement in this queue has been reconciled. Inter-rater
                agreement: {kappaText}.
              </p>
            </div>
          )}
        </div>
      </div>

      {current ? <ConflictRail item={current} onResolve={resolve} /> : null}
    </div>
  );
}
