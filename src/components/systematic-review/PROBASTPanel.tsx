"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  CaretDown,
  CaretRight,
  CircleNotch,
  CheckCircle,
  FloppyDisk,
  Export,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  PROBAST_DOMAINS,
  inferDomainJudgment,
  computeOverallPROBAST,
  exportPROBASTSummaryCSV,
} from "@/lib/systematic-review/probast-assessment";
import type {
  PROBASTJudgment,
  PROBASTSignalingAnswer,
  PROBASTDomainAssessment,
  FullPROBASTAssessment,
} from "@/lib/systematic-review/probast-assessment";

interface PROBASTPanelProps {
  projectId: number;
}

interface ImportedPaper {
  ppId: number;
  paperId: number;
  title: string;
  authors: unknown;
  year: number | null;
  abstract: string | null;
  screeningDecision: string | null;
}

const SIGNALING_ANSWERS: PROBASTSignalingAnswer[] = [
  "Yes",
  "Probably Yes",
  "No",
  "Probably No",
  "No Information",
];

const JUDGMENTS: PROBASTJudgment[] = ["Low", "High", "Unclear"];

const JUDGMENT_BADGE: Record<PROBASTJudgment, string> = {
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Unclear: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

function judgmentEmoji(judgment: PROBASTJudgment): string {
  if (judgment === "Low") return "🟢";
  if (judgment === "High") return "🔴";
  return "🟡";
}

interface DomainFormState {
  answers: Record<number, PROBASTSignalingAnswer>;
  applicabilityConcern: PROBASTJudgment | null;
  rationale: string;
}

type PaperFormState = {
  modelName: string;
  domains: Record<string, DomainFormState>;
  expandedDomains: Set<string>;
};

function paperLabel(p: ImportedPaper): string {
  const authorStr =
    Array.isArray(p.authors) && p.authors.length > 0
      ? String(p.authors[0])
      : "";
  const yearStr = p.year ? ` (${p.year})` : "";
  if (authorStr) return `${authorStr}${yearStr}`;
  return p.title?.slice(0, 60) || `Paper #${p.paperId}`;
}

function buildDomainAssessments(
  formState: PaperFormState
): PROBASTDomainAssessment[] {
  return PROBAST_DOMAINS.map((domDef) => {
    const domForm = formState.domains[domDef.domain] || {
      answers: {},
      applicabilityConcern: domDef.hasApplicability ? "Unclear" : null,
      rationale: "",
    };

    const answers = domDef.signalingQuestions.map(
      (_, idx) => domForm.answers[idx] || "No Information"
    );

    const riskOfBias = inferDomainJudgment(answers);

    return {
      domain: domDef.domain,
      domainName: domDef.name,
      riskOfBias,
      applicabilityConcern: domDef.hasApplicability
        ? domForm.applicabilityConcern ?? "Unclear"
        : null,
      signalingQuestions: domDef.signalingQuestions.map((q, idx) => ({
        question: q,
        answer: domForm.answers[idx] || "No Information",
      })),
      rationale: domForm.rationale,
    };
  });
}

function createEmptyFormState(): PaperFormState {
  const domains: Record<string, DomainFormState> = {};
  for (const domDef of PROBAST_DOMAINS) {
    domains[domDef.domain] = {
      answers: {},
      applicabilityConcern: domDef.hasApplicability ? "Unclear" : null,
      rationale: "",
    };
  }
  return {
    modelName: "",
    domains,
    expandedDomains: new Set(),
  };
}

export function PROBASTPanel({ projectId }: PROBASTPanelProps) {
  const [papers, setPapers] = useState<ImportedPaper[]>([]);
  const [assessments, setAssessments] = useState<
    Record<string, FullPROBASTAssessment>
  >({});
  const [formStates, setFormStates] = useState<Record<string, PaperFormState>>(
    {}
  );
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null);
  const [savingPaper, setSavingPaper] = useState<number | null>(null);
  const [loadingPapers, setLoadingPapers] = useState(false);
  const [loadingAssessments, setLoadingAssessments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPapers = useCallback(async () => {
    setLoadingPapers(true);
    try {
      const res = await fetch(
        `/api/systematic-review/import?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load papers");
      const data = await res.json();
      const allPapers: ImportedPaper[] = data.papers ?? data;
      setPapers(
        allPapers.filter(
          (p) =>
            p.screeningDecision === "include" ||
            p.screeningDecision === "included"
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load papers");
    } finally {
      setLoadingPapers(false);
    }
  }, [projectId]);

  const fetchAssessments = useCallback(async () => {
    setLoadingAssessments(true);
    try {
      const res = await fetch(
        `/api/systematic-review/probast?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load assessments");
      const data: (FullPROBASTAssessment & { paperId: number })[] =
        await res.json();
      const map: Record<string, FullPROBASTAssessment> = {};
      const forms: Record<string, PaperFormState> = {};

      for (const a of data) {
        const key = String(a.paperId ?? a.studyId);
        map[key] = a;

        const formState = createEmptyFormState();
        formState.modelName = a.modelName;

        for (const domAssessment of a.domains) {
          const domForm: DomainFormState = {
            answers: {},
            applicabilityConcern: domAssessment.applicabilityConcern,
            rationale: domAssessment.rationale,
          };
          for (let i = 0; i < domAssessment.signalingQuestions.length; i++) {
            domForm.answers[i] = domAssessment.signalingQuestions[i].answer;
          }
          formState.domains[domAssessment.domain] = domForm;
        }

        forms[key] = formState;
      }

      setAssessments(map);
      setFormStates((prev) => ({ ...prev, ...forms }));
    } catch {
      // Assessments may not exist yet
    } finally {
      setLoadingAssessments(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchPapers();
    fetchAssessments();
  }, [fetchPapers, fetchAssessments]);

  function getFormState(paperId: number): PaperFormState {
    return formStates[String(paperId)] || createEmptyFormState();
  }

  function updateFormState(paperId: number, updater: (prev: PaperFormState) => PaperFormState) {
    setFormStates((prev) => ({
      ...prev,
      [String(paperId)]: updater(prev[String(paperId)] || createEmptyFormState()),
    }));
  }

  function setAnswer(
    paperId: number,
    domain: string,
    questionIdx: number,
    answer: PROBASTSignalingAnswer
  ) {
    updateFormState(paperId, (prev) => ({
      ...prev,
      domains: {
        ...prev.domains,
        [domain]: {
          ...prev.domains[domain],
          answers: {
            ...prev.domains[domain].answers,
            [questionIdx]: answer,
          },
        },
      },
    }));
  }

  function setApplicability(
    paperId: number,
    domain: string,
    value: PROBASTJudgment
  ) {
    updateFormState(paperId, (prev) => ({
      ...prev,
      domains: {
        ...prev.domains,
        [domain]: {
          ...prev.domains[domain],
          applicabilityConcern: value,
        },
      },
    }));
  }

  function setRationale(paperId: number, domain: string, value: string) {
    updateFormState(paperId, (prev) => ({
      ...prev,
      domains: {
        ...prev.domains,
        [domain]: {
          ...prev.domains[domain],
          rationale: value,
        },
      },
    }));
  }

  function setModelName(paperId: number, value: string) {
    updateFormState(paperId, (prev) => ({
      ...prev,
      modelName: value,
    }));
  }

  function toggleDomain(paperId: number, domain: string) {
    updateFormState(paperId, (prev) => {
      const next = new Set(prev.expandedDomains);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return { ...prev, expandedDomains: next };
    });
  }

  function computeLiveOverall(paperId: number) {
    const form = getFormState(paperId);
    if (!form.modelName) return null;
    const domains = buildDomainAssessments(form);
    return computeOverallPROBAST(domains);
  }

  function countAnswered(paperId: number): number {
    const form = getFormState(paperId);
    let count = 0;
    for (const domDef of PROBAST_DOMAINS) {
      const domForm = form.domains[domDef.domain];
      if (!domForm) continue;
      count += Object.keys(domForm.answers).length;
    }
    return count;
  }

  function totalQuestions(): number {
    return PROBAST_DOMAINS.reduce(
      (sum, d) => sum + d.signalingQuestions.length,
      0
    );
  }

  async function saveAssessment(paperId: number) {
    const form = getFormState(paperId);
    if (!form.modelName) return;

    const domains = buildDomainAssessments(form);

    setSavingPaper(paperId);
    setError(null);
    try {
      const res = await fetch("/api/systematic-review/probast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          paperId,
          modelName: form.modelName,
          domains,
        }),
      });
      if (!res.ok) throw new Error("Failed to save assessment");
      const result: FullPROBASTAssessment = await res.json();
      setAssessments((prev) => ({ ...prev, [String(paperId)]: result }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save assessment"
      );
    } finally {
      setSavingPaper(null);
    }
  }

  function handleExportCSV() {
    const allAssessments = Object.values(assessments);
    if (allAssessments.length === 0) return;
    const csv = exportPROBASTSummaryCSV(allAssessments);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `probast-summary-project-${projectId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const assessedPapers = papers.filter((p) => assessments[String(p.paperId)]);
  const isLoading = loadingPapers || loadingAssessments;

  return (
    <GlassPanel className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck weight="duotone" className="h-6 w-6 text-brand" />
          <div>
            <h2 className="sr-panel-title mb-0">PROBAST</h2>
            <p className="text-sm text-ink-muted">
              Prediction model Risk Of Bias ASsessment Tool. Assess risk of bias
              and applicability of prediction model studies across 4 domains.
            </p>
          </div>
        </div>

        {assessedPapers.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg bg-surface-raised px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-raised/80 border border-border transition-colors"
          >
            <Export weight="bold" className="h-4 w-4" />
            Export CSV
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {assessedPapers.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-raised text-ink-muted border-b border-border">
                <th className="text-left px-4 py-2 font-medium">Paper</th>
                <th className="text-left px-3 py-2 font-medium">Model</th>
                <th className="text-center px-3 py-2 font-medium">
                  Participants
                </th>
                <th className="text-center px-3 py-2 font-medium">
                  Predictors
                </th>
                <th className="text-center px-3 py-2 font-medium">Outcome</th>
                <th className="text-center px-3 py-2 font-medium">Analysis</th>
                <th className="text-center px-3 py-2 font-medium">
                  Overall RoB
                </th>
                <th className="text-center px-3 py-2 font-medium">
                  Applicability
                </th>
              </tr>
            </thead>
            <tbody>
              {assessedPapers.map((p) => {
                const a = assessments[String(p.paperId)];
                if (!a) return null;
                return (
                  <tr
                    key={p.paperId}
                    className="border-b border-border/50 hover:bg-surface-raised/40 transition-colors"
                  >
                    <td className="px-4 py-2 text-ink truncate max-w-[180px]">
                      {paperLabel(p)}
                    </td>
                    <td className="px-3 py-2 text-ink-muted text-xs truncate max-w-[120px]">
                      {a.modelName}
                    </td>
                    {["participants", "predictors", "outcome", "analysis"].map(
                      (domKey) => {
                        const dom = a.domains.find((d) => d.domain === domKey);
                        const j = dom?.riskOfBias || "Unclear";
                        return (
                          <td key={domKey} className="text-center px-3 py-2">
                        <span
                          className={cn(
                            "inline-block rounded-full border px-2 py-0.5 text-xs font-semibold",
                            JUDGMENT_BADGE[j]
                          )}
                        >
                              {judgmentEmoji(j)} {j}
                        </span>
                          </td>
                        );
                      }
                    )}
                    <td className="text-center px-3 py-2">
                      <span
                        className={cn(
                          "inline-block rounded-full border px-2 py-0.5 text-xs font-semibold",
                          JUDGMENT_BADGE[a.overallRoB]
                        )}
                      >
                        {judgmentEmoji(a.overallRoB)} {a.overallRoB}
                      </span>
                    </td>
                    <td className="text-center px-3 py-2">
                      <span
                        className={cn(
                          "inline-block rounded-full border px-2 py-0.5 text-xs font-semibold",
                          JUDGMENT_BADGE[a.overallApplicability]
                        )}
                      >
                        {judgmentEmoji(a.overallApplicability)} {a.overallApplicability}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-8 text-ink-muted">
          <CircleNotch className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      )}

      {!isLoading && papers.length === 0 && (
        <div className="text-center py-8 text-ink-muted text-sm">
          No included papers found. Import and screen papers first.
        </div>
      )}

      {!isLoading && papers.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-ink-muted">
            Included papers ({papers.length})
          </h3>
          <div className="space-y-1">
            {papers.map((paper) => {
              const isExpanded = expandedPaper === paper.paperId;
              const savedAssessment = assessments[String(paper.paperId)];
              const form = getFormState(paper.paperId);
              const answered = countAnswered(paper.paperId);
              const total = totalQuestions();
              const isSaving = savingPaper === paper.paperId;
              const liveOverall = computeLiveOverall(paper.paperId);
              const savedOverall = savedAssessment
                ? computeOverallPROBAST(savedAssessment.domains)
                : null;

              return (
                <div
                  key={paper.paperId}
                  className="rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedPaper(isExpanded ? null : paper.paperId)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-raised/40 transition-colors"
                  >
                    {isExpanded ? (
                      <CaretDown
                        weight="bold"
                        className="h-4 w-4 text-ink-muted shrink-0"
                      />
                    ) : (
                      <CaretRight
                        weight="bold"
                        className="h-4 w-4 text-ink-muted shrink-0"
                      />
                    )}
                    <span className="text-sm text-ink truncate flex-1">
                      {paperLabel(paper)}
                    </span>
                    {savedAssessment && (
                      <div className="flex items-center gap-2 shrink-0">
                        <CheckCircle
                          weight="fill"
                          className="h-4 w-4 text-emerald-400"
                        />
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-semibold",
                            JUDGMENT_BADGE[savedOverall!.overallRoB]
                          )}
                        >
                          {judgmentEmoji(savedOverall!.overallRoB)} RoB: {savedOverall!.overallRoB}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-semibold",
                            JUDGMENT_BADGE[savedOverall!.overallApplicability]
                          )}
                        >
                          {judgmentEmoji(savedOverall!.overallApplicability)} App: {savedOverall!.overallApplicability}
                        </span>
                      </div>
                    )}
                    {!savedAssessment && answered > 0 && (
                      <span className="text-xs text-ink-muted shrink-0">
                        {answered}/{total} questions
                      </span>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border bg-surface-raised/20 px-4 py-4 space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-ink">
                          Model / Score Name
                        </label>
                        <input
                          type="text"
                          value={form.modelName}
                          onChange={(e) =>
                            setModelName(paper.paperId, e.target.value)
                          }
                          placeholder="e.g., Framingham Risk Score, QRISK3..."
                          className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>

                      {liveOverall && (
                        <div className="flex items-center gap-4 rounded-lg bg-surface-raised px-4 py-2 border border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-ink-muted">Overall RoB:</span>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs font-semibold",
                                JUDGMENT_BADGE[liveOverall.overallRoB]
                              )}
                            >
                              {judgmentEmoji(liveOverall.overallRoB)} {liveOverall.overallRoB}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-ink-muted">
                              Applicability:
                            </span>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs font-semibold",
                                JUDGMENT_BADGE[liveOverall.overallApplicability]
                              )}
                            >
                              {judgmentEmoji(liveOverall.overallApplicability)} {liveOverall.overallApplicability}
                            </span>
                          </div>
                          <span className="ml-auto text-xs text-ink-muted">
                            {answered}/{total} answered
                          </span>
                        </div>
                      )}

                      {PROBAST_DOMAINS.map((domDef) => {
                        const domForm = form.domains[domDef.domain] || {
                          answers: {},
                          applicabilityConcern: domDef.hasApplicability
                            ? "Unclear"
                            : null,
                          rationale: "",
                        };
                        const isDomExpanded = form.expandedDomains.has(
                          domDef.domain
                        );
                        const domAnswers = domDef.signalingQuestions.map(
                          (_, idx) =>
                            domForm.answers[idx] || "No Information"
                        );
                        const domJudgment = inferDomainJudgment(domAnswers);
                        const domAnswered = Object.keys(
                          domForm.answers
                        ).length;

                        return (
                          <div
                            key={domDef.domain}
                            className="rounded-lg border border-border overflow-hidden"
                          >
                            <button
                              onClick={() =>
                                toggleDomain(paper.paperId, domDef.domain)
                              }
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-raised/40 transition-colors"
                            >
                              {isDomExpanded ? (
                                <CaretDown
                                  weight="bold"
                                  className="h-3.5 w-3.5 text-ink-muted shrink-0"
                                />
                              ) : (
                                <CaretRight
                                  weight="bold"
                                  className="h-3.5 w-3.5 text-ink-muted shrink-0"
                                />
                              )}
                              <span className="text-sm font-medium text-ink flex-1">
                                {domDef.name}
                              </span>
                              <span className="text-xs text-ink-muted mr-2">
                                {domAnswered}/
                                {domDef.signalingQuestions.length}
                              </span>
                              <span className="text-base leading-none">
                                {judgmentEmoji(domJudgment)}
                              </span>
                              <span
                                className={cn(
                                  "rounded-full border px-2 py-0.5 text-xs font-semibold",
                                  JUDGMENT_BADGE[domJudgment]
                                )}
                              >
                                {domJudgment}
                              </span>
                            </button>

                            {isDomExpanded && (
                              <div className="border-t border-border px-4 py-3 space-y-4 bg-surface-raised/10">
                                {domDef.signalingQuestions.map((q, qIdx) => (
                                  <div key={qIdx} className="space-y-1.5">
                                    <p className="text-sm text-ink">
                                      <span className="font-medium text-brand">
                                        {qIdx + 1}.
                                      </span>{" "}
                                      {q}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pl-4">
                                      {SIGNALING_ANSWERS.map((ans) => (
                                        <label
                                          key={ans}
                                          className={cn(
                                            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 cursor-pointer text-xs transition-colors",
                                            domForm.answers[qIdx] === ans
                                              ? "bg-brand/10 border border-brand/30 text-ink"
                                              : "hover:bg-surface-raised/60 border border-transparent text-ink-muted"
                                          )}
                                        >
                                          <input
                                            type="radio"
                                            name={`probast-${paper.paperId}-${domDef.domain}-${qIdx}`}
                                            checked={
                                              domForm.answers[qIdx] === ans
                                            }
                                            onChange={() =>
                                              setAnswer(
                                                paper.paperId,
                                                domDef.domain,
                                                qIdx,
                                                ans
                                              )
                                            }
                                            className="sr-only"
                                          />
                                          {ans}
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ))}

                                {domDef.hasApplicability && (
                                  <div className="space-y-1.5 pt-2 border-t border-border/50">
                                    <p className="text-sm text-ink-muted">
                                      {domDef.applicabilityQuestion}
                                    </p>
                                    <div className="flex gap-1.5 pl-4">
                                      {JUDGMENTS.map((j) => (
                                        <label
                                          key={j}
                                          className={cn(
                                            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 cursor-pointer text-xs transition-colors",
                                            domForm.applicabilityConcern === j
                                              ? "bg-brand/10 border border-brand/30 text-ink"
                                              : "hover:bg-surface-raised/60 border border-transparent text-ink-muted"
                                          )}
                                        >
                                          <input
                                            type="radio"
                                            name={`probast-app-${paper.paperId}-${domDef.domain}`}
                                            checked={
                                              domForm.applicabilityConcern === j
                                            }
                                            onChange={() =>
                                              setApplicability(
                                                paper.paperId,
                                                domDef.domain,
                                                j
                                              )
                                            }
                                            className="sr-only"
                                          />
                                          {j}
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-1">
                                  <label className="text-xs font-medium text-ink-muted">
                                    Supporting text (optional)
                                  </label>
                                  <textarea
                                    value={domForm.rationale}
                                    onChange={(e) =>
                                      setRationale(
                                        paper.paperId,
                                        domDef.domain,
                                        e.target.value
                                      )
                                    }
                                    rows={2}
                                    placeholder="Supporting judgment notes..."
                                    className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand resize-y"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <div className="flex justify-end">
                        <button
                          onClick={() => saveAssessment(paper.paperId)}
                          disabled={!form.modelName || answered === 0 || isSaving}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                            !form.modelName || answered === 0
                              ? "bg-surface-raised text-ink-muted cursor-not-allowed border border-border"
                              : "bg-brand text-white hover:bg-brand/90"
                          )}
                        >
                          {isSaving ? (
                            <CircleNotch className="h-4 w-4 animate-spin" />
                          ) : (
                            <FloppyDisk weight="bold" className="h-4 w-4" />
                          )}
                          {isSaving ? "Saving..." : "Save Assessment"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </GlassPanel>
  );
}
