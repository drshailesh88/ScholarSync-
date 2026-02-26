"use client";

import { useState, useCallback } from "react";
import {
  ShieldCheck,
  CircleNotch,
  Warning,
  ArrowClockwise,
  CaretDown,
  CaretRight,
  LinkSimple,
  TextAa,
  Quotes,
  Robot,
  MagnifyingGlass,
  BookmarkSimple,
  CheckCircle,
  XCircle,
  Lock,
} from "@phosphor-icons/react";
import { CircularGauge } from "@/components/ui/circular-gauge";
import type { IntegrityCheckResult } from "@/lib/integrity/types";

// ── Types ───────────────────────────────────────────────────────

type CheckStatus = "idle" | "running" | "done" | "error";

interface IntegrityPanelProps {
  /** Function to get the current editor text */
  getEditorText: () => string;
  /** Optional: structured sources from the document */
  sources?: Array<{
    title?: string;
    doi?: string;
    pmid?: string;
    authors?: string[];
    year?: number;
  }>;
}

// ── Main Component ──────────────────────────────────────────────

export function IntegrityPanel({ getEditorText, sources }: IntegrityPanelProps) {
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [result, setResult] = useState<IntegrityCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["ai", "plagiarism", "citations", "quality"]),
  );

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const runCheck = useCallback(async () => {
    const text = getEditorText();
    if (!text || text.trim().length < 50) {
      setError("Document must have at least 50 characters to check.");
      return;
    }

    setStatus("running");
    setError(null);

    try {
      const res = await fetch("/api/integrity-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.slice(0, 50000),
          sources,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Check failed (${res.status})`);
      }

      const data: IntegrityCheckResult = await res.json();
      setResult(data);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Integrity check failed");
      setStatus("error");
    }
  }, [getEditorText, sources]);

  // ── Idle State ──────────────────────────────────────────────
  if (status === "idle" && !result) {
    return (
      <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
          <ShieldCheck size={24} className="text-brand" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink mb-1">Integrity Check</h3>
          <p className="text-xs text-ink-muted max-w-[200px]">
            Detect AI content, check plagiarism against scholarly literature, and verify citations.
          </p>
        </div>
        <button
          onClick={runCheck}
          className="px-4 py-2 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand-hover transition-colors"
        >
          Run Integrity Check
        </button>
      </div>
    );
  }

  // ── Running State ───────────────────────────────────────────
  if (status === "running") {
    return (
      <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center text-center gap-3">
        <CircleNotch size={32} className="text-brand animate-spin" />
        <div>
          <h3 className="text-sm font-semibold text-ink mb-1">Analyzing Document...</h3>
          <p className="text-xs text-ink-muted">
            Running AI detection, plagiarism scan, and citation verification.
          </p>
        </div>
      </div>
    );
  }

  // ── Error State ─────────────────────────────────────────────
  if (status === "error") {
    return (
      <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center text-center gap-3">
        <Warning size={28} className="text-red-400" />
        <p className="text-xs text-red-400">{error}</p>
        <button
          onClick={runCheck}
          className="px-3 py-1.5 rounded-lg bg-surface-raised text-ink text-xs font-medium hover:bg-surface-raised/80 transition-colors flex items-center gap-1"
        >
          <ArrowClockwise size={12} />
          Retry
        </button>
      </div>
    );
  }

  // ── Results State ───────────────────────────────────────────
  if (!result) return null;

  const ai = result.aiDetection;
  const plag = result.plagiarism;
  const cit = result.citationAudit;
  const qual = result.writingQuality;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header with score + re-run */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">
            Integrity Report
          </span>
          <button
            onClick={runCheck}
            className="text-[10px] text-brand hover:text-brand-hover flex items-center gap-1 transition-colors"
          >
            <ArrowClockwise size={10} />
            Re-run
          </button>
        </div>
        <div className="flex items-center justify-center">
          <CircularGauge value={ai.humanScore} label="Human Score" size={90} />
        </div>
        {result.tier === "free" && (
          <div className="mt-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
            <Lock size={12} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-amber-600 dark:text-amber-400">
              Free tier — AI detection only. Upgrade for plagiarism scanning and citation verification.
            </p>
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="divide-y divide-border">
        {/* AI Detection */}
        <CollapsibleSection
          title="AI Detection"
          icon={<Robot size={14} className={ai.humanScore >= 80 ? "text-emerald-500" : ai.humanScore >= 50 ? "text-amber-500" : "text-red-400"} />}
          summary={`${ai.humanScore}% human · ${ai.overallRisk} risk${ai.engine === "binoculars" ? " · Binoculars" : ""}`}
          expanded={expandedSections.has("ai")}
          onToggle={() => toggleSection("ai")}
        >
          <div className="space-y-2">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Avg. Sentence" value={`${ai.stats.avgSentenceLength.toFixed(1)} words`} />
              <StatCard label="Burstiness" value={ai.stats.sentenceLengthStdDev.toFixed(1)} />
              <StatCard label="Vocabulary" value={`${(ai.stats.typeTokenRatio * 100).toFixed(0)}%`} />
              <StatCard label="Hedging Phrases" value={String(ai.stats.hedgingPhraseCount)} />
            </div>

            {/* Per-paragraph flags */}
            {ai.paragraphs.filter((p) => p.flags.length > 0).length > 0 && (
              <div className="space-y-1.5 mt-2">
                <span className="text-[10px] font-medium text-ink-muted uppercase">Flagged Paragraphs</span>
                {ai.paragraphs
                  .filter((p) => p.flags.length > 0)
                  .slice(0, 5)
                  .map((p) => (
                    <div key={p.paragraphIndex} className="p-2 rounded bg-surface-raised">
                      <p className="text-[10px] text-ink-muted mb-1 truncate">
                        ¶{p.paragraphIndex + 1}: &quot;{p.excerpt}&quot;
                      </p>
                      <div className="flex items-center gap-1 mb-1">
                        <span
                          className={`text-[10px] font-semibold ${
                            p.humanProbability >= 70
                              ? "text-emerald-500"
                              : p.humanProbability >= 40
                                ? "text-amber-500"
                                : "text-red-400"
                          }`}
                        >
                          {p.humanProbability}% human
                        </span>
                      </div>
                      {p.flags.map((flag, i) => (
                        <p key={i} className="text-[10px] text-ink-muted">
                          • {flag}
                        </p>
                      ))}
                      {p.suggestion && (
                        <p className="text-[10px] text-brand mt-1">→ {p.suggestion}</p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Plagiarism */}
        <CollapsibleSection
          title="Plagiarism"
          icon={<MagnifyingGlass size={14} className={plag ? (plag.similarityScore < 15 ? "text-emerald-500" : plag.similarityScore < 30 ? "text-amber-500" : "text-red-400") : "text-ink-muted"} />}
          summary={plag ? `${plag.similarityScore}% similar · ${plag.matches.length} sources` : "Paid feature"}
          expanded={expandedSections.has("plagiarism")}
          onToggle={() => toggleSection("plagiarism")}
          locked={!plag}
        >
          {plag ? (
            <div className="space-y-2">
              <p className="text-[10px] text-ink-muted">
                Scanned {plag.sourcesScanned} scholarly sources
              </p>
              {plag.matches.length === 0 ? (
                <div className="flex items-center gap-1.5 p-2 rounded bg-emerald-500/10">
                  <CheckCircle size={12} className="text-emerald-500" />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">No significant matches found</span>
                </div>
              ) : (
                plag.matches.slice(0, 5).map((m, i) => (
                  <div key={i} className="p-2 rounded bg-surface-raised">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-semibold ${
                        m.severity === "high" ? "text-red-400" : m.severity === "medium" ? "text-amber-500" : "text-emerald-500"
                      }`}>
                        {(m.similarity * 100).toFixed(0)}% similar
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        m.severity === "high" ? "bg-red-500/10 text-red-400" : m.severity === "medium" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {m.severity}
                      </span>
                    </div>
                    <p className="text-[10px] text-ink-muted mb-1 line-clamp-2">&quot;{m.excerpt}&quot;</p>
                    <p className="text-[10px] text-ink truncate">
                      <LinkSimple size={10} className="inline mr-1" />
                      {m.source.title}
                      {m.source.year ? ` (${m.source.year})` : ""}
                    </p>
                    {m.source.doi && (
                      <a
                        href={`https://doi.org/${m.source.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] text-brand hover:underline"
                      >
                        DOI: {m.source.doi}
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : null}
        </CollapsibleSection>

        {/* Citation Audit */}
        <CollapsibleSection
          title="Citations"
          icon={<BookmarkSimple size={14} className={cit ? (cit.issues.length === 0 ? "text-emerald-500" : "text-amber-500") : "text-ink-muted"} />}
          summary={
            cit
              ? `${cit.verifiedCitations}/${cit.totalCitations} verified · ${cit.issues.length} issues`
              : "Paid feature"
          }
          expanded={expandedSections.has("citations")}
          onToggle={() => toggleSection("citations")}
          locked={!cit}
        >
          {cit ? (
            <div className="space-y-2">
              {cit.issues.length === 0 ? (
                <div className="flex items-center gap-1.5 p-2 rounded bg-emerald-500/10">
                  <CheckCircle size={12} className="text-emerald-500" />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">All citations verified</span>
                </div>
              ) : (
                cit.issues.slice(0, 8).map((issue, i) => (
                  <div key={i} className="flex items-start gap-1.5 p-2 rounded bg-surface-raised">
                    {issue.severity === "error" ? (
                      <XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                    ) : issue.severity === "warning" ? (
                      <Warning size={12} className="text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle size={12} className="text-blue-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-[10px] text-ink">{issue.message}</p>
                      {issue.reference && (
                        <p className="text-[9px] text-ink-muted mt-0.5">Ref: {issue.reference}</p>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Verified references list */}
              {cit.verifiedReferences.length > 0 && (
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] font-medium text-ink-muted uppercase">Verified References</span>
                  {cit.verifiedReferences.slice(0, 10).map((ref) => (
                    <div key={ref.index} className="flex items-center gap-1.5 text-[10px]">
                      {ref.verified ? (
                        <CheckCircle size={10} className="text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle size={10} className="text-red-400 shrink-0" />
                      )}
                      <span className="text-ink-muted truncate">
                        [{ref.index}] {ref.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </CollapsibleSection>

        {/* Writing Quality */}
        <CollapsibleSection
          title="Writing Quality"
          icon={<TextAa size={14} className="text-blue-400" />}
          summary={`Grade ${qual.readabilityGrade.toFixed(1)} · ${qual.passiveVoiceCount} passive`}
          expanded={expandedSections.has("quality")}
          onToggle={() => toggleSection("quality")}
        >
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Readability" value={`Grade ${qual.readabilityGrade.toFixed(1)}`} />
              <StatCard label="Avg Sentence" value={`${qual.averageSentenceLength.toFixed(1)} words`} />
              <StatCard label="Passive Voice" value={`${qual.passiveVoiceCount} instances`} />
            </div>
            {qual.suggestions.length > 0 && (
              <div className="space-y-1 mt-2">
                <span className="text-[10px] font-medium text-ink-muted uppercase">Suggestions</span>
                {qual.suggestions.map((s, i) => (
                  <p key={i} className="text-[10px] text-ink-muted flex items-start gap-1">
                    <Quotes size={10} className="text-brand shrink-0 mt-0.5" />
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}

// ── Sub-Components ──────────────────────────────────────────────

function CollapsibleSection({
  title,
  icon,
  summary,
  expanded,
  onToggle,
  locked,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  summary: string;
  expanded: boolean;
  onToggle: () => void;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-surface-raised/50 transition-colors"
      >
        {expanded ? <CaretDown size={10} className="text-ink-muted" /> : <CaretRight size={10} className="text-ink-muted" />}
        {icon}
        <span className="text-xs font-medium text-ink flex-1 text-left">{title}</span>
        {locked ? (
          <Lock size={10} className="text-ink-muted" />
        ) : (
          <span className="text-[10px] text-ink-muted">{summary}</span>
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-3">
          {locked ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-raised">
              <Lock size={14} className="text-ink-muted" />
              <div>
                <p className="text-[10px] text-ink-muted">Available on paid plans</p>
                <p className="text-[10px] text-brand">Upgrade to unlock →</p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 rounded bg-surface-raised text-center">
      <p className="text-[10px] text-ink-muted">{label}</p>
      <p className="text-xs font-semibold text-ink">{value}</p>
    </div>
  );
}
