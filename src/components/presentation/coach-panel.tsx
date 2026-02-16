"use client";

import { useState } from "react";
import {
  Sparkle,
  CircleNotch,
  Warning,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type {
  CoachEvaluation,
  CoachSuggestion,
  ContentBlock,
  AudienceType,
} from "@/types/presentation";

interface CoachPanelProps {
  deckId: number;
  audienceType: AudienceType;
  slides: {
    id: number;
    title?: string | null;
    subtitle?: string | null;
    layout?: string | null;
    contentBlocks?: ContentBlock[];
    speakerNotes?: string | null;
  }[];
  onNavigateToSlide: (slideId: number) => void;
}

const DIMENSION_LABELS: Record<string, string> = {
  structureScore: "Structure",
  evidenceScore: "Evidence",
  narrativeScore: "Narrative",
  designScore: "Design",
  audienceFitScore: "Audience Fit",
};

const DIMENSION_COLORS: Record<string, string> = {
  structureScore: "#4F46E5",
  evidenceScore: "#06B6D4",
  narrativeScore: "#10B981",
  designScore: "#F59E0B",
  audienceFitScore: "#EF4444",
};

export function CoachPanel({
  deckId,
  audienceType,
  slides,
  onNavigateToSlide,
}: CoachPanelProps) {
  const [evaluation, setEvaluation] = useState<CoachEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runCoach() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/presentations/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckId,
          audienceType,
          slides: slides.map((s) => ({
            title: s.title,
            subtitle: s.subtitle,
            layout: s.layout,
            contentBlocks: s.contentBlocks,
            speakerNotes: s.speakerNotes,
          })),
        }),
      });

      if (!res.ok) throw new Error("Coach evaluation failed");

      const result = await res.json();
      setEvaluation(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Evaluation failed");
    } finally {
      setLoading(false);
    }
  }

  if (!evaluation) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-ink-muted">
          Get AI feedback on your presentation&apos;s structure, evidence, and
          audience fit.
        </p>
        <button
          onClick={runCoach}
          disabled={loading || slides.length === 0}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-colors",
            loading || slides.length === 0
              ? "bg-surface-raised text-ink-muted cursor-not-allowed"
              : "bg-brand text-white hover:bg-brand/90"
          )}
        >
          {loading ? (
            <>
              <CircleNotch size={14} className="animate-spin" /> Evaluating...
            </>
          ) : (
            <>
              <Sparkle size={14} /> Run Coach
            </>
          )}
        </button>
        {error && (
          <p className="text-[10px] text-red-500 flex items-center gap-1">
            <Warning size={12} /> {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="text-center">
        <div className="text-3xl font-bold text-brand">
          {evaluation.overallScore.toFixed(1)}
        </div>
        <p className="text-[10px] text-ink-muted">Overall Score / 10</p>
      </div>

      {/* Radar Chart (CSS-based) */}
      <div className="space-y-2">
        {(["structureScore", "evidenceScore", "narrativeScore", "designScore", "audienceFitScore"] as const).map(
          (key) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-[10px] text-ink-muted w-20 shrink-0">
                {DIMENSION_LABELS[key]}
              </span>
              <div className="flex-1 h-2 rounded-full bg-surface-raised overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(evaluation[key] / 10) * 100}%`,
                    backgroundColor: DIMENSION_COLORS[key],
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-ink w-6 text-right">
                {evaluation[key].toFixed(1)}
              </span>
            </div>
          )
        )}
      </div>

      {/* Top Suggestions */}
      {evaluation.suggestions.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-ink mb-2">Suggestions</h4>
          <div className="space-y-1.5">
            {evaluation.suggestions
              .sort((a, b) => {
                const pri = { high: 0, medium: 1, low: 2 };
                return pri[a.priority] - pri[b.priority];
              })
              .slice(0, 5)
              .map((sug, i) => (
                <SuggestionItem
                  key={i}
                  suggestion={sug}
                  slides={slides}
                  onNavigate={onNavigateToSlide}
                />
              ))}
          </div>
        </div>
      )}

      {/* Per-Slide Insights */}
      {evaluation.slideInsights.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-ink mb-2">
            Slide Insights
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {evaluation.slideInsights.map((insight, i) => (
              <button
                key={i}
                onClick={() => {
                  if (slides[insight.slideIndex]) {
                    onNavigateToSlide(slides[insight.slideIndex].id);
                  }
                }}
                className="w-full text-left p-2 rounded-lg border border-border hover:border-brand/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-medium text-ink">
                    #{insight.slideIndex + 1} {insight.slideTitle}
                  </span>
                  <ArrowRight size={10} className="text-ink-muted ml-auto" />
                </div>
                {insight.issues.length > 0 && (
                  <p className="text-[10px] text-red-500 truncate">
                    {insight.issues[0]}
                  </p>
                )}
                {insight.strengths.length > 0 && (
                  <p className="text-[10px] text-green-600 truncate">
                    {insight.strengths[0]}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Re-run */}
      <button
        onClick={runCoach}
        disabled={loading}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-medium text-ink-muted border border-border hover:bg-surface-raised transition-colors"
      >
        {loading ? (
          <CircleNotch size={12} className="animate-spin" />
        ) : (
          <Sparkle size={12} />
        )}
        Re-evaluate
      </button>
    </div>
  );
}

function SuggestionItem({
  suggestion,
  slides,
  onNavigate,
}: {
  suggestion: CoachSuggestion;
  slides: { id: number }[];
  onNavigate: (id: number) => void;
}) {
  const priorityColors = {
    high: "border-red-500/30 bg-red-500/5",
    medium: "border-yellow-500/30 bg-yellow-500/5",
    low: "border-green-500/30 bg-green-500/5",
  };

  return (
    <div
      className={cn(
        "p-2 rounded-lg border cursor-default",
        priorityColors[suggestion.priority]
      )}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="text-[9px] uppercase font-medium opacity-60">
          {suggestion.category}
        </span>
        <span
          className={cn(
            "text-[8px] px-1 py-0.5 rounded font-medium",
            suggestion.priority === "high" && "bg-red-500/20 text-red-600",
            suggestion.priority === "medium" && "bg-yellow-500/20 text-yellow-700",
            suggestion.priority === "low" && "bg-green-500/20 text-green-700"
          )}
        >
          {suggestion.priority}
        </span>
        {suggestion.slideIndex != null && slides[suggestion.slideIndex] && (
          <button
            onClick={() => onNavigate(slides[suggestion.slideIndex!].id)}
            className="ml-auto text-[9px] text-brand hover:underline"
          >
            Slide {suggestion.slideIndex + 1}
          </button>
        )}
      </div>
      <p className="text-[10px] text-ink leading-relaxed">
        {suggestion.text}
      </p>
    </div>
  );
}
