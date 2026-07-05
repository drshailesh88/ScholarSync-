"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CURRENT_REVIEWER_ID } from "@/lib/sr/fixtures";
import {
  deriveScreeningQueue,
  otherReviewerBlindState,
} from "@/lib/sr/screening-queue";
import type { TaVote } from "@/lib/sr/types";
import { useSrStore } from "@/stores/sr-store";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";
import { AiScreeningRail } from "./ai-screening-rail";
import { ReferenceCard } from "./reference-card";

const KEY_TO_VOTE: Record<string, TaVote> = {
  n: "no",
  m: "maybe",
  y: "yes",
};

/** Screen 3 — blinded dual-reviewer title & abstract screening. */
export function ScreeningScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const castTaVote = useSrStore((state) => state.castTaVote);
  const [cursor, setCursor] = useState(0);
  const [screenedToday, setScreenedToday] = useState(0);

  const queue = review
    ? deriveScreeningQueue(review, CURRENT_REVIEWER_ID)
    : null;
  const current = queue?.toScreen[cursor];

  const vote = useCallback(
    (choice: TaVote) => {
      if (!current) return;
      castTaVote(current.id, CURRENT_REVIEWER_ID, choice);
      setScreenedToday((count) => count + 1);
      // The voted study leaves the to-screen list, so the same cursor index
      // now points at the next study; clamp to the shrinking queue.
      setCursor((index) => Math.max(0, index));
    },
    [current, castTaVote],
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const choice = KEY_TO_VOTE[event.key.toLowerCase()];
      if (choice) {
        event.preventDefault();
        vote(choice);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [vote]);

  if (!review || !queue) return <SrStageSkeleton />;

  if (!current) {
    return (
      <div className="cv-inner narrow">
        <div className="eyebrow">SGLT2 meta-analysis · systematic review</div>
        <h1 className="h2stage">Title &amp; abstract screening</h1>
        <div className="stateblock">
          <h3>You&apos;re all caught up</h3>
          <p>
            Nothing left in your to-screen queue. Resolve conflicts or wait for
            the other reviewer&apos;s votes to reconcile.
          </p>
        </div>
      </div>
    );
  }

  const blind = otherReviewerBlindState(
    current,
    CURRENT_REVIEWER_ID,
    review.reviewers,
  );
  const own = current.ta.votes.find(
    (v) => v.reviewerId === CURRENT_REVIEWER_ID,
  );

  return (
    <div className="stage-rail-layout">
      <div className="stage-main">
        <div className="cv-inner narrow">
          <div className="eyebrow">SGLT2 meta-analysis · systematic review</div>
          <h1 className="h2stage">Title &amp; abstract screening</h1>
          <div className="srcpair">
            <span className="srcchip ai">
              <Sparkles size={10} aria-hidden /> AI
            </span>
          </div>
          <p className="lead">
            Two reviewers vote <b>No / Maybe / Yes</b> independently and blinded
            (Maybe is a positive vote — it advances). Keyboard-first. Inclusion
            terms highlight green, exclusion red. The AI pre-votes with an
            inclusion score and per-criterion reasoning — you confirm or
            override.
          </p>

          <div className="tabbar" role="tablist">
            <button type="button" className="tab on" role="tab" aria-selected>
              To screen <b>{queue.tabs.toScreen}</b>
            </button>
            <button type="button" className="tab conf" role="tab">
              Conflicts <b>{queue.tabs.conflicts}</b>
            </button>
            <button type="button" className="tab" role="tab">
              Awaiting other <b>{queue.tabs.awaitingOther}</b>
            </button>
            <button type="button" className="tab" role="tab">
              Irrelevant <b>{queue.tabs.irrelevant}</b>
            </button>
            <span className="kbd-hint">
              Blinded <span className="kbd">N</span>
              <span className="kbd">M</span>
              <span className="kbd">Y</span> · <span className="kbd">←</span>
              <span className="kbd">→</span>
            </span>
          </div>

          <div className="queuebar">
            <span className="pos">
              Study {cursor + 1} of {queue.tabs.toScreen} · to screen
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
                disabled={cursor >= queue.toScreen.length - 1}
                onClick={() =>
                  setCursor((index) =>
                    Math.min(queue.toScreen.length - 1, index + 1),
                  )
                }
              >
                <ChevronRight size={14} aria-hidden />
              </button>
            </div>
          </div>

          <ReferenceCard candidate={current} criteria={review.criteria} />
        </div>
      </div>

      <AiScreeningRail
        reasoning={current.aiReasoning}
        suggestion={current.aiSuggestion}
        selected={own?.vote}
        onVote={vote}
        blind={blind}
        screenedToday={screenedToday}
        remaining={queue.tabs.toScreen}
      />
    </div>
  );
}
