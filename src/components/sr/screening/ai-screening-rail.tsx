"use client";

import { Check, Sparkles } from "lucide-react";
import type { BlindState } from "@/lib/sr/screening-queue";
import type { ScoreTally } from "@/lib/sr/score-threshold";
import type { AiReasoning, TaVote } from "@/lib/sr/types";
import { VoteTriad } from "./vote-triad";

interface AiScreeningRailProps {
  reasoning?: AiReasoning;
  suggestion?: TaVote;
  selected?: TaVote;
  onVote: (vote: TaVote) => void;
  blind: BlindState;
  screenedToday: number;
  remaining: number;
  threshold: number;
  tally: ScoreTally;
  onThresholdChange: (value: number) => void;
}

function ScoreThreshold({
  threshold,
  tally,
  onThresholdChange,
}: {
  threshold: number;
  tally: ScoreTally;
  onThresholdChange: (value: number) => void;
}) {
  return (
    <div className="scorethresh">
      <div className="railsec" style={{ margin: "0 2px 8px" }}>
        AI triage · score threshold
      </div>
      <div className="threshval">{threshold.toFixed(1)}</div>
      <input
        type="range"
        min={0}
        max={5}
        step={0.1}
        value={threshold}
        aria-label="Score threshold"
        onChange={(event) => onThresholdChange(Number(event.target.value))}
      />
      <div className="threshnote">
        Papers the AI scores at or above this value are suggested for inclusion.
      </div>
      <div className="threshtally">
        <span>
          <b>{tally.evaluated}</b> evaluated
        </span>
        <span className="inc">
          <b>{tally.aiInclude}</b> included
        </span>
        <span className="exc">
          <b>{tally.aiExclude}</b> excluded
        </span>
      </div>
    </div>
  );
}

function verdictLabel(verdict: TaVote): string {
  if (verdict === "yes") return "Include";
  if (verdict === "maybe") return "Maybe";
  return "Exclude";
}

/** The right control rail: AI reasoning, the vote triad, blinded partner. */
export function AiScreeningRail({
  reasoning,
  suggestion,
  selected,
  onVote,
  blind,
  screenedToday,
  remaining,
  threshold,
  tally,
  onThresholdChange,
}: AiScreeningRailProps) {
  const total = screenedToday + remaining;
  const pct = total === 0 ? 0 : Math.round((screenedToday / total) * 100);

  return (
    <aside className="ctrlrail">
      <div className="railsec">AI screening</div>
      <ScoreThreshold
        threshold={threshold}
        tally={tally}
        onThresholdChange={onThresholdChange}
      />
      {reasoning ? (
        <div className="aibox">
          <div className="h">
            <span className="lab">
              <Sparkles size={11} aria-hidden /> AI
            </span>
            <span className="score">{reasoning.score.toFixed(1)} / 5</span>
          </div>
          <div className={reasoning.verdict === "no" ? "verdict exc" : "verdict"}>
            Suggests: {verdictLabel(reasoning.verdict)}
          </div>
          <div className="crlist">
            {reasoning.criteria.map((criterion) => (
              <div className="cr" key={criterion.label}>
                <span className="tick" aria-hidden>
                  <Check size={12} />
                </span>
                <span>
                  <b>{criterion.label}</b> — {criterion.detail}
                </span>
              </div>
            ))}
          </div>
          <div className="sysrule">
            Your vote is the <b>system of record</b>. The AI suggestion never
            advances a study on its own.
          </div>
        </div>
      ) : null}

      <div className="railsec">Your vote</div>
      <VoteTriad suggestion={suggestion} selected={selected} onVote={onVote} />

      {blind.other ? (
        <div className="blindstat">
          <span className="av">{blind.other.initials}</span>
          <div>
            <b>Reviewer 2 · {blind.other.name}</b>
            <br />
            <span className="pend">
              vote pending — blinded until both submit
            </span>
          </div>
        </div>
      ) : null}
      <div className="railnote">
        Maybe is a positive vote — it advances the study.
      </div>

      <div className="todaybar">
        <div className="railsec" style={{ marginBottom: 0 }}>
          Your progress today
        </div>
        <div className="tb">
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="tl">
          <span>{screenedToday} screened today</span>
          <span>{remaining} remaining</span>
        </div>
      </div>
    </aside>
  );
}
