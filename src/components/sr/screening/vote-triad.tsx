"use client";

import type { TaVote } from "@/lib/sr/types";

interface VoteTriadProps {
  /** AI-suggested vote — ringed, never pre-selected. */
  suggestion?: TaVote;
  /** The reviewer's own committed vote. */
  selected?: TaVote;
  onVote: (vote: TaVote) => void;
}

const OPTIONS: Array<{ vote: TaVote; label: string; key: string }> = [
  { vote: "no", label: "No", key: "N" },
  { vote: "maybe", label: "Maybe", key: "M" },
  { vote: "yes", label: "Yes", key: "Y" },
];

/** No / Maybe / Yes — the one place saturated colour lives (design.md §6). */
export function VoteTriad({ suggestion, selected, onVote }: VoteTriadProps) {
  return (
    <div className="votes">
      {OPTIONS.map((option) => {
        const className = [
          "vote",
          option.vote,
          suggestion === option.vote ? "suggested" : "",
          selected === option.vote ? "sel" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <button
            key={option.vote}
            type="button"
            className={className}
            aria-pressed={selected === option.vote}
            onClick={() => onVote(option.vote)}
          >
            <span className="vlab">{option.label}</span>
            {suggestion === option.vote ? (
              <span className="vsug">AI suggests</span>
            ) : null}
            <span className="vkey">{option.key}</span>
          </button>
        );
      })}
    </div>
  );
}
