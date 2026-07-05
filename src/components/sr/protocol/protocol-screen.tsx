"use client";

import { Check, Lock, Plus, Sparkles } from "lucide-react";
import { PICO_FIELDS, SUGGESTED_CRITERIA } from "@/lib/sr/protocol";
import type { EligibilityCriterion } from "@/lib/sr/types";
import { useSrStore } from "@/stores/sr-store";
import { CriterionEditor } from "./criterion-editor";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

function AiChip() {
  return (
    <span className="srcchip ai">
      <Sparkles size={10} aria-hidden /> AI
    </span>
  );
}

function CriteriaColumn({
  title,
  kind,
  criteria,
}: {
  title: string;
  kind: "include" | "exclude";
  criteria: EligibilityCriterion[];
}) {
  const updateCriterion = useSrStore((s) => s.updateCriterion);
  const removeCriterion = useSrStore((s) => s.removeCriterion);
  const addCriterion = useSrStore((s) => s.addCriterion);
  const rows = criteria.filter((c) => c.kind === kind);
  const existing = new Set(criteria.map((c) => c.label));
  const suggestions = SUGGESTED_CRITERIA.filter(
    (c) => c.kind === kind && !existing.has(c.label),
  );

  return (
    <div className="critcol">
      <div className="critcol-h">{title}</div>
      {rows.map((criterion) => (
        <CriterionEditor
          key={criterion.id}
          criterion={criterion}
          onChange={(patch) => updateCriterion(criterion.id, patch)}
          onRemove={() => removeCriterion(criterion.id)}
        />
      ))}
      <div className="suggested">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            className="suggchip"
            onClick={() => addCriterion(suggestion)}
          >
            <Plus size={11} aria-hidden /> {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** SR1 — the review protocol / eligibility-criteria editor (Elicit-faithful). */
export function ProtocolScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const setResearchQuestion = useSrStore((s) => s.setResearchQuestion);
  const setPicoField = useSrStore((s) => s.setPicoField);
  const approveProtocol = useSrStore((s) => s.approveProtocol);

  if (!review) return <SrStageSkeleton />;

  const { protocol } = review;
  const approved = protocol.status === "approved";
  const isFirstRun = protocol.criteria.length === 0 && !protocol.researchQuestion;

  return (
    <div className="cv-inner narrow">
      <div className="eyebrow">Review settings · protocol</div>
      <h1 className="h2stage">Eligibility criteria</h1>
      <p className="lead">
        Your research question drives the whole review. The AI drafts your{" "}
        <b>PICO</b> and eligibility criteria as editable structured fields — you
        review, edit, and approve every one. Locked criteria drive the AI
        screening reasons and the PRISMA counts.
      </p>

      <div className="srcpair">
        <AiChip />
        {approved ? (
          <span className="pill inc">
            <Lock size={11} aria-hidden /> Approved
          </span>
        ) : (
          <span className="pill may">Uses AI — verify every field</span>
        )}
      </div>

      <div className="seclabel">
        Research question <span className="sp" />
      </div>
      <textarea
        className="rq-input"
        aria-label="Research question"
        rows={2}
        placeholder="e.g. In adults with heart failure, do SGLT2 inhibitors reduce…"
        value={protocol.researchQuestion}
        onChange={(event) => setResearchQuestion(event.target.value)}
      />
      {isFirstRun ? (
        <p className="railnote" style={{ textAlign: "left", marginTop: 8 }}>
          Enter a research question and the AI will draft your PICO and
          eligibility criteria to verify.
        </p>
      ) : null}

      <div className="seclabel">
        PICO <span className="sp" />
      </div>
      <div className="picogrid">
        {PICO_FIELDS.map((field) => (
          <label className="picofield" key={field.key}>
            <span className="picolabel">{field.label}</span>
            <input
              aria-label={field.label}
              value={protocol.pico[field.key]}
              placeholder={field.hint}
              onChange={(event) => setPicoField(field.key, event.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="seclabel">
        Eligibility criteria <span className="sp" />
      </div>
      <div className="critcols">
        <CriteriaColumn
          title="Inclusion"
          kind="include"
          criteria={protocol.criteria}
        />
        <CriteriaColumn
          title="Exclusion"
          kind="exclude"
          criteria={protocol.criteria}
        />
      </div>

      <div className="btnrow" style={{ marginTop: 24 }}>
        <button
          type="button"
          className="btn pri"
          onClick={approveProtocol}
          disabled={approved}
        >
          <Check size={13} aria-hidden />
          {approved ? "Approved & locked" : "Approve protocol"}
        </button>
      </div>
    </div>
  );
}
