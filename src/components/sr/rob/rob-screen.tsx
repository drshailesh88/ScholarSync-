"use client";

import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import {
  deriveRobStudyList,
  ROB2_DOMAINS,
  ROB_JUDGMENT_LABEL,
  ROB_JUDGMENT_TOKEN,
  type RobStudy,
} from "@/lib/sr/rob";
import type { RobDomainAssessment, RobSignalAnswer } from "@/lib/sr/types";
import { useSrStore } from "@/stores/sr-store";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

const SIGNAL_OPTIONS: Array<{ value: RobSignalAnswer; label: string }> = [
  { value: "yes", label: "Yes" },
  { value: "probably_yes", label: "Probably yes" },
  { value: "probably_no", label: "Probably no" },
  { value: "no", label: "No" },
];

function DomainAccordion({
  domain,
  assessment,
  open,
  onToggle,
  onAnswer,
}: {
  domain: (typeof ROB2_DOMAINS)[number];
  assessment?: RobDomainAssessment;
  open: boolean;
  onToggle: () => void;
  onAnswer: (questionKey: string, answer: RobSignalAnswer) => void;
}) {
  const judgment = assessment?.judgment;
  const token = judgment ? ROB_JUDGMENT_TOKEN[judgment] : "var(--line)";

  return (
    <div className={open ? "robdomain open" : "robdomain"}>
      <button type="button" className="robhead" onClick={onToggle}>
        <span className="light" style={{ background: token }} aria-hidden />
        <span className="nm">{domain.name}</span>
        <span className="j" style={{ color: judgment ? token : "var(--muted)" }}>
          {judgment ? ROB_JUDGMENT_LABEL[judgment] : "Not assessed"}
          <span className="chev" aria-hidden>
            <ChevronRight size={11} />
          </span>
        </span>
      </button>
      {open ? (
        <div className="robbody">
          {domain.signalling.map((question, index) => {
            const key = String(index);
            const answer = assessment?.signallingAnswers[key];
            return (
              <div className="robq" key={key}>
                <div className="qt">{question}</div>
                <div className="opts">
                  {SIGNAL_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={answer === option.value ? "opt sel" : "opt"}
                      onClick={() => onAnswer(key, option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {assessment?.aiJustification ? (
            <div className="robjust">
              <b>
                <Sparkles
                  size={11}
                  aria-hidden
                  style={{ display: "inline", verticalAlign: "-1px" }}
                />{" "}
                Justification.
              </b>{" "}
              {assessment.aiJustification}{" "}
              <span className="pend">
                AI suggested this from the methods text — you confirm.
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function StudyListRail({
  studies,
  activeId,
  onSelect,
}: {
  studies: RobStudy[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="ctrlrail">
      <div className="railsec">Studies to assess · RoB 2</div>
      <div className="studylist">
        {studies.map((study) => {
          const token = ROB_JUDGMENT_TOKEN[study.overall];
          return (
            <button
              key={study.candidate.id}
              type="button"
              className={
                study.candidate.id === activeId ? "sl on" : "sl"
              }
              onClick={() => onSelect(study.candidate.id)}
            >
              <span
                className="lt"
                style={{ background: token }}
                aria-hidden
              />
              <span>
                <span className="st">{study.label}</span>
                <span className="sy">{study.sublabel}</span>
              </span>
              <span className="ov" style={{ color: token }}>
                {ROB_JUDGMENT_LABEL[study.overall]}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className="railnote"
        style={{ textAlign: "left", marginTop: 6 }}
      >
        Each study is assessed by two reviewers, then reconciled — like
        extraction.
      </div>
    </aside>
  );
}

/** Screen 6 — Risk of bias (RoB 2) domain assessment with AI justification. */
export function RobScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const answerRobSignal = useSrStore((state) => state.answerRobSignal);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openDomain, setOpenDomain] = useState("randomisation");

  if (!review) return <SrStageSkeleton />;

  const studies = deriveRobStudyList(review);
  const active =
    studies.find((s) => s.candidate.id === activeId) ?? studies[0];

  if (!active) {
    return (
      <div className="cv-inner narrow">
        <div className="eyebrow">Stage 5 · The funnel</div>
        <h1 className="h2stage">Risk of bias</h1>
        <div className="stateblock">
          <h3>No studies to assess yet</h3>
          <p>Included studies appear here for RoB 2 appraisal.</p>
        </div>
      </div>
    );
  }

  const token = ROB_JUDGMENT_TOKEN[active.overall];

  return (
    <div className="stage-rail-layout">
      <div className="stage-main">
        <div className="cv-inner narrow">
          <div className="eyebrow">Stage 5 · The funnel</div>
          <h1 className="h2stage">Risk of bias</h1>
          <p className="lead">
            A structured, domain-by-domain quality instrument with per-domain
            judgement and a justification comment, dual-assessed and reconciled.{" "}
            <b>ScholarSync ships RoB 2 first-class</b>. The AI suggests the
            justification from the methods text; you confirm.
          </p>

          <div className="robhdr">
            <span className="nm">
              {active.label} · {active.sublabel}
            </span>
            <span
              className="pill"
              style={{
                marginLeft: "auto",
                background: "var(--maybg)",
                color: token,
              }}
            >
              Overall: {ROB_JUDGMENT_LABEL[active.overall]}
            </span>
          </div>

          {ROB2_DOMAINS.map((domain) => (
            <DomainAccordion
              key={domain.id}
              domain={domain}
              assessment={active.domains.find(
                (d) => d.domainId === domain.id,
              )}
              open={openDomain === domain.id}
              onToggle={() =>
                setOpenDomain((current) =>
                  current === domain.id ? "" : domain.id,
                )
              }
              onAnswer={(questionKey, answer) =>
                answerRobSignal(
                  active.candidate.id,
                  domain.id,
                  questionKey,
                  answer,
                )
              }
            />
          ))}
        </div>
      </div>

      <StudyListRail
        studies={studies}
        activeId={active.candidate.id}
        onSelect={setActiveId}
      />
    </div>
  );
}
