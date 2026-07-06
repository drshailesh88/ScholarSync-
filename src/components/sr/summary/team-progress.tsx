"use client";

import type {
  ReviewerContribution,
  ScreeningBreakdown,
} from "@/lib/sr/funnel";

interface TeamProgressProps {
  screening: ScreeningBreakdown;
  contributions: ReviewerContribution[];
}

const SEGMENTS = [
  { key: "done", label: "Done", color: "var(--inc)" },
  { key: "conflicts", label: "Conflicts", color: "var(--con)" },
  { key: "oneVote", label: "One vote", color: "var(--incbg)" },
  { key: "noVotes", label: "No votes", color: "var(--line)" },
] as const;

/** Team progress bar + counters + per-reviewer contribution rows. */
export function TeamProgress({ screening, contributions }: TeamProgressProps) {
  const total = Math.max(screening.total, 1);
  const maxScreened = Math.max(
    1,
    ...contributions.map((entry) => entry.screened),
  );

  return (
    <div className="fprogress">
      <div className="flabel">Team progress</div>
      <div className="pbar">
        {SEGMENTS.map((segment) => (
          <i
            key={segment.key}
            style={{
              width: `${(screening[segment.key] / total) * 100}%`,
              background: segment.color,
            }}
          />
        ))}
      </div>
      <div className="plegend">
        {SEGMENTS.map((segment) => (
          <span className="c" key={segment.key}>
            <span
              className="dot"
              style={{
                background: segment.color,
                border:
                  segment.key === "oneVote"
                    ? "1px solid var(--incln)"
                    : undefined,
              }}
            />
            <span className="n">{screening[segment.key]}</span>
            <span className="l">{segment.label}</span>
          </span>
        ))}
      </div>
      <div className="contrib">
        <div className="ch">Reviewer contribution</div>
        {contributions.map((entry) => (
          <div className="crow" key={entry.reviewerId}>
            <span className="cn">{entry.name}</span>
            <span className="cv">{entry.screened}</span>
            <span className="cbar">
              <i style={{ width: `${(entry.screened / maxScreened) * 100}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
