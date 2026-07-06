"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { deriveExtractionGrid, resolveFinal } from "@/lib/sr/extraction";
import type { ExtractionField } from "@/lib/sr/types";
import { useSrStore } from "@/stores/sr-store";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

type Density = "comfortable" | "compact";

function FinalCell({
  field,
  onReveal,
  onResolve,
}: {
  field: ExtractionField;
  onReveal: (quote: string) => void;
  onResolve: (value: string) => void;
}) {
  const final = resolveFinal(field);

  if (final.kind === "conflict") {
    return (
      <span className="reqcell">
        <button
          type="button"
          className="pill con"
          onClick={() => onResolve(field.reviewer1)}
        >
          Decision required
        </button>
      </span>
    );
  }

  return (
    <>
      {final.value}
      {final.kind === "ai" && final.sourceQuote ? (
        <button
          type="button"
          className="vchip"
          title="AI · click to see source passage"
          aria-label="Show source passage"
          onClick={() => onReveal(final.sourceQuote)}
        >
          <Sparkles size={9} aria-hidden />
        </button>
      ) : null}
    </>
  );
}

function ReviewerCell({
  value,
  notReported,
}: {
  value: string;
  notReported?: boolean;
}) {
  if (notReported) {
    return <span className="nr">Not reported</span>;
  }
  return <>{value}</>;
}

/** Screen 7 — dual-reviewer data extraction consensus grid. */
export function ExtractionScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const resolveExtractionCell = useSrStore(
    (state) => state.resolveExtractionCell,
  );
  const [density, setDensity] = useState<Density>("compact");
  const [quote, setQuote] = useState<string | null>(null);
  const [resolving, setResolving] = useState<string | null>(null);

  if (!review) return <SrStageSkeleton />;

  const extraction = review.extractions[0];
  if (!extraction) {
    return (
      <div className="cv-inner narrow">
        <div className="eyebrow">Stage 6 · The funnel</div>
        <h1 className="h2stage">Data extraction</h1>
        <div className="stateblock">
          <h3>No extractions yet</h3>
          <p>Included studies appear here for dual data extraction.</p>
        </div>
      </div>
    );
  }

  const candidate = review.candidates.find(
    (c) => c.id === extraction.candidateId,
  );
  const grid = deriveExtractionGrid(extraction);

  const resolveField = (fieldId: string, value: string) => {
    resolveExtractionCell(extraction.candidateId, fieldId, value);
    setResolving(null);
  };

  return (
    <div className="exwrap">
      <div className="pdfpane">
        <div className="pdfdoc">
          <div className="pt">{candidate?.title}</div>
          <div className="pm">
            {candidate?.authors[0]}, {candidate?.journal} {candidate?.year} ·
            source for the Final column
          </div>
          {quote ? (
            <div className="pdfquote">
              <Sparkles size={11} aria-hidden /> {quote}
            </div>
          ) : (
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((line) => (
              <div
                key={line}
                className={line % 3 === 2 ? "ln hl" : line % 4 === 1 ? "ln s" : "ln"}
              />
            ))
          )}
        </div>
      </div>

      <div className="gridpane">
        <div className="gridhead">
          <span className="gt">Data extraction · consensus</span>
          {grid.conflictCount > 0 ? (
            <span className="cf">{grid.conflictCount} conflicts to resolve</span>
          ) : (
            <span className="pill inc">All fields reconciled</span>
          )}
          <div className="densitytoggle">
            <button
              type="button"
              className={density === "comfortable" ? "on" : ""}
              onClick={() => setDensity("comfortable")}
            >
              Comfortable
            </button>
            <button
              type="button"
              className={density === "compact" ? "on" : ""}
              onClick={() => setDensity("compact")}
            >
              Compact
            </button>
          </div>
        </div>

        <div className={density === "compact" ? "cgrid compact" : "cgrid"}>
          <div className="ctr head">
            <div>Field</div>
            <div>Final decision</div>
            <div>Reviewer 1 · Emma</div>
            <div>Reviewer 2 · Katherine</div>
          </div>
          {grid.sections.map((section) => (
            <div key={section.name}>
              <div className="secgroup">{section.name}</div>
              {section.fields.map((field) => {
                const final = resolveFinal(field);
                const isConflict = final.kind === "conflict";
                return (
                  <div
                    key={field.id}
                    className={isConflict ? "ctr conflict" : "ctr"}
                  >
                    <div className="field">{field.label}</div>
                    <div className="final">
                      {resolving === field.id ? (
                        <div className="pickrow">
                          <button
                            type="button"
                            className="btn sm"
                            onClick={() =>
                              resolveField(field.id, field.reviewer1)
                            }
                          >
                            {field.reviewer1}
                          </button>
                          {!field.reviewer2NotReported ? (
                            <button
                              type="button"
                              className="btn sm"
                              onClick={() =>
                                resolveField(field.id, field.reviewer2)
                              }
                            >
                              {field.reviewer2}
                            </button>
                          ) : null}
                        </div>
                      ) : (
                        <FinalCell
                          field={field}
                          onReveal={setQuote}
                          onResolve={() => setResolving(field.id)}
                        />
                      )}
                    </div>
                    <div className="rv">
                      <ReviewerCell value={field.reviewer1} />
                    </div>
                    <div className="rv">
                      <ReviewerCell
                        value={field.reviewer2}
                        notReported={field.reviewer2NotReported}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="gridfoot">
          <span className="foothint">
            <Sparkles size={11} aria-hidden /> Final column pre-filled by AI from
            the PDF · every value carries a source chip · reviewers verify
          </span>
          <div className="btnrow">
            <button type="button" className="btn sm">
              Save
            </button>
            <button type="button" className="btn pri sm">
              Complete consensus →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
