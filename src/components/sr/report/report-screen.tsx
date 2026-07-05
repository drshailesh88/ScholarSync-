"use client";

import { Check, Clock, Download, PenLine, Sparkles } from "lucide-react";
import { deriveReport } from "@/lib/sr/report";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

function Cite({ n }: { n: string }) {
  return <span className="ci">{n}</span>;
}

function VChip() {
  return (
    <span className="vchip" title="Source">
      <Sparkles size={9} aria-hidden />
    </span>
  );
}

function StatusRail() {
  const steps = [
    { label: "Gather", detail: "412 papers", done: true },
    { label: "Screen", detail: "124 included", done: true },
    { label: "Extract", detail: "consensus data", done: true },
    { label: "Generate", detail: "draft ready to verify", done: false },
  ];
  return (
    <aside className="ctrlrail">
      <div className="railsec">Report status</div>
      <div className="aibox" style={{ padding: 14 }}>
        <div className="crlist">
          {steps.map((step) => (
            <div className="cr" key={step.label}>
              <span
                className="tick"
                style={{ color: step.done ? "var(--inc)" : "var(--may)" }}
                aria-hidden
              >
                {step.done ? <Check size={12} /> : <Clock size={12} />}
              </span>
              <span>
                <b>{step.label}</b> — {step.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="railsec">Sources &amp; export</div>
      <div className="btnrow" style={{ flexDirection: "column", gap: 8 }}>
        <button type="button" className="btn" style={{ justifyContent: "flex-start" }}>
          <Download size={13} aria-hidden /> BibTeX
        </button>
        <button type="button" className="btn" style={{ justifyContent: "flex-start" }}>
          <Download size={13} aria-hidden /> RIS
        </button>
        <button type="button" className="btn" style={{ justifyContent: "flex-start" }}>
          <Download size={13} aria-hidden /> Save PDF
        </button>
        <button type="button" className="btn pri" style={{ justifyContent: "flex-start" }}>
          <PenLine size={13} aria-hidden /> Send to manuscript
        </button>
      </div>
      <div className="railnote" style={{ textAlign: "left", marginTop: 14 }}>
        Every figure carries a source chip back to the included study. &ldquo;Not
        reported&rdquo; is shown where a paper is silent — never invented.
      </div>
    </aside>
  );
}

/** Screen 9a — auto-drafted narrative report with traceable figures. */
export function ReportScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  if (!review) return <SrStageSkeleton />;

  const report = deriveReport(review);

  return (
    <div className="stage-rail-layout">
      <div className="stage-main">
        <div className="cv-inner narrow">
          <div className="report">
            <div className="eyebrow">
              <Sparkles size={10} aria-hidden style={{ verticalAlign: "-1px" }} />{" "}
              AI · AUTO-DRAFTED NARRATIVE
            </div>
            <h1 className="rtitle">
              Effect of SGLT2 inhibitors on heart-failure outcomes across the
              ejection-fraction spectrum
            </h1>
            <div className="rmeta">
              {report.includedCount} included studies · {report.criteriaCount}{" "}
              screening criteria · drafted from your consensus data
            </div>
            <div className="rlead">
              <span className="lb">Abstract.</span> SGLT2 inhibitors reduce
              heart-failure hospitalisation by 21–30% across the
              ejection-fraction spectrum, with consistent benefits in both
              HFpEF<Cite n="1,3" /> and HFrEF<Cite n="2,5" />. Mortality
              benefits diverge by EF: in HFrEF, SGLT2 inhibitors reduce CV death
              by 14–27%<Cite n="2" />, while in HFpEF CV mortality shows no
              significant reduction (HR 0.88–0.96)<Cite n="3,6" />.
            </div>

            <div className="rh">Characteristics of included studies</div>
            <div className="rtbl">
              <div className="rtr h">
                <div>Study</div>
                <div>Type</div>
                <div>Intervention</div>
                <div>n</div>
                <div>EF category</div>
              </div>
              {report.characteristics.map((study) => (
                <div className="rtr" key={study.study}>
                  <div>
                    {study.study} <VChip />
                  </div>
                  <div>{study.type}</div>
                  <div>{study.intervention}</div>
                  <div className="mono">{study.n}</div>
                  <div>
                    {study.efCategoryNotReported ? (
                      <span className="nr">Not reported</span>
                    ) : (
                      study.efCategory
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rh">Effects on heart-failure hospitalisation</div>
            <div className="rp">
              In patients with HFpEF, SGLT2 inhibitors consistently reduced HF
              hospitalisations by 21–27%. EMPEROR-Preserved showed a 27%
              reduction with empagliflozin (HR 0.73, 95% CI 0.61–0.88)
              <Cite n="1" />, while DELIVER showed a 21% reduction with
              dapagliflozin (HR 0.79, 0.69–0.91)<Cite n="3" />.
            </div>
          </div>
        </div>
      </div>
      <StatusRail />
    </div>
  );
}
