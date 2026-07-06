"use client";

import { Trash2 } from "lucide-react";
import type { AnswerStructure, EligibilityCriterion } from "@/lib/sr/types";

const ANSWER_STRUCTURES: Array<{ value: AnswerStructure; label: string }> = [
  { value: "any", label: "Any answer" },
  { value: "specified", label: "Specified" },
  { value: "yes_no_maybe", label: "Yes / No / Maybe" },
];

interface CriterionEditorProps {
  criterion: EligibilityCriterion;
  onChange: (patch: Partial<Omit<EligibilityCriterion, "id">>) => void;
  onRemove: () => void;
}

/** Elicit's "column-as-a-question": name + instruction + answer structure. */
export function CriterionEditor({
  criterion,
  onChange,
  onRemove,
}: CriterionEditorProps) {
  return (
    <div className="critedit">
      <div className="critedit-head">
        <input
          className="crit-name"
          aria-label="Criterion name"
          value={criterion.label}
          onChange={(event) => onChange({ label: event.target.value })}
        />
        <button
          type="button"
          className="crit-remove"
          aria-label="Remove criterion"
          onClick={onRemove}
        >
          <Trash2 size={13} aria-hidden />
        </button>
      </div>
      <textarea
        className="crit-instruction"
        aria-label="Criterion instruction"
        rows={2}
        placeholder="Describe what the AI should look for…"
        value={criterion.instruction}
        onChange={(event) => onChange({ instruction: event.target.value })}
      />
      <div className="crit-answer">
        <span className="crit-answer-label">Answer structure</span>
        <div className="segmented">
          {ANSWER_STRUCTURES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                criterion.answerStructure === option.value ? "seg on" : "seg"
              }
              onClick={() => onChange({ answerStructure: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
