"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  GraduationCap,
  CircleNotch,
  Warning,
  PaperPlaneRight,
  Eye,
  EyeSlash,
  ArrowRight,
  Trophy,
  Target,
  Lightning,
  Play,
  Stop,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ContentBlock, AudienceType } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DefensePrepPanelProps {
  deckId: number;
  slides: Array<{
    id: number;
    title: string | null;
    contentBlocks: ContentBlock[];
    speakerNotes: string | null;
  }>;
  audienceType: AudienceType;
}

type Difficulty = "friendly" | "moderate" | "tough" | "adversarial";
type FocusArea = "methodology" | "statistics" | "interpretation" | "clinical_relevance" | "limitations" | "theory";

interface QAMessage {
  role: "reviewer" | "presenter";
  content: string;
  suggestedAnswer?: string;
  relatedSlideIndex?: number;
  category?: string;
  evaluation?: string | null;
}

interface DefenseResponse {
  question: string;
  category: string;
  difficulty: string;
  suggestedAnswer: string;
  relatedSlideIndex: number;
  followUpQuestions: string[];
  evaluation?: string | null;
}

interface SessionSummary {
  score: number;
  strengths: string[];
  improvements: string[];
  talkingPoints: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  { value: "friendly", label: "Friendly", description: "Constructive and encouraging" },
  { value: "moderate", label: "Moderate", description: "Balanced and direct" },
  { value: "tough", label: "Tough", description: "Challenging, probes for weaknesses" },
  { value: "adversarial", label: "Adversarial", description: "Devil's advocate, stress-tests claims" },
];

const FOCUS_AREAS: { value: FocusArea; label: string }[] = [
  { value: "methodology", label: "Methodology" },
  { value: "statistics", label: "Statistics" },
  { value: "interpretation", label: "Interpretation" },
  { value: "clinical_relevance", label: "Clinical Relevance" },
  { value: "limitations", label: "Limitations" },
  { value: "theory", label: "Theory" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DefensePrepPanel({
  deckId,
  slides,
  audienceType,
}: DefensePrepPanelProps) {
  // Config state
  const [difficulty, setDifficulty] = useState<Difficulty>("moderate");
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Q&A state
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  const [questionCount, setQuestionCount] = useState(0);

  // Summary state
  const [sessionEnded, setSessionEnded] = useState(false);
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle a focus area
  function toggleFocusArea(area: FocusArea) {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  // Build conversation history for API
  function buildConversationHistory(): Array<{ role: string; content: string }> {
    return messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
  }

  // Fetch next question from API
  const fetchQuestion = useCallback(
    async (conversationHistory: Array<{ role: string; content: string }>) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/presentations/defense-prep", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deckId,
            slides: slides.map((s) => ({
              id: s.id,
              title: s.title,
              contentBlocks: s.contentBlocks,
              speakerNotes: s.speakerNotes,
            })),
            audienceType,
            difficulty,
            focusAreas: focusAreas.length > 0 ? focusAreas : undefined,
            conversationHistory,
          }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error ?? "Failed to generate question");
        }

        const result: DefenseResponse = await res.json();

        const reviewerMessage: QAMessage = {
          role: "reviewer",
          content: result.evaluation
            ? `${result.evaluation}\n\n${result.question}`
            : result.question,
          suggestedAnswer: result.suggestedAnswer,
          relatedSlideIndex: result.relatedSlideIndex,
          category: result.category,
          evaluation: result.evaluation,
        };

        setMessages((prev) => [...prev, reviewerMessage]);
        setQuestionCount((prev) => prev + 1);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to get question";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [deckId, slides, audienceType, difficulty, focusAreas]
  );

  // Start a new session
  async function startSession() {
    setSessionStarted(true);
    setMessages([]);
    setQuestionCount(0);
    setSessionEnded(false);
    setSummary(null);
    setRevealedAnswers(new Set());
    await fetchQuestion([]);
  }

  // Submit presenter's answer
  async function handleSubmitAnswer(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput("");

    const presenterMessage: QAMessage = {
      role: "presenter",
      content: trimmed,
    };
    setMessages((prev) => [...prev, presenterMessage]);

    const history = [
      ...buildConversationHistory(),
      { role: "presenter", content: trimmed },
    ];

    await fetchQuestion(history);
  }

  // End session and compute summary
  function endSession() {
    setSessionEnded(true);

    // Compute a basic summary from the conversation
    const totalQuestions = questionCount;
    const answeredQuestions = messages.filter((m) => m.role === "presenter").length;
    const categories = messages
      .filter((m) => m.role === "reviewer" && m.category)
      .map((m) => m.category!);

    const uniqueCategories = [...new Set(categories)];

    setSummary({
      score: Math.min(10, Math.round((answeredQuestions / Math.max(totalQuestions, 1)) * 8 + 2)),
      strengths: [
        `Answered ${answeredQuestions} of ${totalQuestions} questions`,
        uniqueCategories.length > 1
          ? `Covered multiple areas: ${uniqueCategories.join(", ")}`
          : "Focused preparation session",
      ],
      improvements: [
        "Review the suggested answers for questions you found challenging",
        "Practice responding under time pressure",
        ...(focusAreas.length === 0 ? ["Consider focusing on specific areas in your next session"] : []),
      ],
      talkingPoints: messages
        .filter((m) => m.role === "reviewer" && m.suggestedAnswer)
        .slice(0, 4)
        .map((m) => m.suggestedAnswer!.slice(0, 120) + (m.suggestedAnswer!.length > 120 ? "..." : "")),
    });
  }

  // Reset to configuration screen
  function resetSession() {
    setSessionStarted(false);
    setSessionEnded(false);
    setMessages([]);
    setSummary(null);
    setQuestionCount(0);
    setRevealedAnswers(new Set());
    setError("");
  }

  // Toggle suggested answer visibility
  function toggleAnswer(index: number) {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  // ----------- Configuration Screen -----------
  if (!sessionStarted) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
          <GraduationCap size={16} className="text-brand" />
          <span className="text-xs font-medium text-ink">Defense Prep</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          <p className="text-xs text-ink-muted">
            Practice defending your presentation with AI-generated questions.
            Configure your session below.
          </p>

          {/* Difficulty */}
          <div>
            <h4 className="text-[10px] font-medium text-ink uppercase tracking-wider mb-2">
              Difficulty
            </h4>
            <div className="space-y-1.5">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl border transition-colors",
                    difficulty === d.value
                      ? "border-brand bg-brand/5 text-ink"
                      : "border-border bg-surface text-ink-muted hover:border-brand/40"
                  )}
                >
                  <span className="text-[11px] font-medium">{d.label}</span>
                  <p className="text-[9px] text-ink-muted mt-0.5">{d.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="text-[10px] font-medium text-ink uppercase tracking-wider mb-2">
              Focus Areas (optional)
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {FOCUS_AREAS.map((area) => (
                <button
                  key={area.value}
                  onClick={() => toggleFocusArea(area.value)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-[10px] font-medium border transition-colors",
                    focusAreas.includes(area.value)
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border bg-surface text-ink-muted hover:border-brand/40"
                  )}
                >
                  {area.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="px-3 py-3 border-t border-border">
          <button
            onClick={startSession}
            disabled={slides.length === 0}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-colors",
              slides.length === 0
                ? "bg-surface-raised text-ink-muted cursor-not-allowed"
                : "bg-brand text-white hover:bg-brand/90"
            )}
          >
            <Play size={14} weight="fill" />
            Start Session
          </button>
        </div>
      </div>
    );
  }

  // ----------- Session Summary Screen -----------
  if (sessionEnded && summary) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
          <Trophy size={16} className="text-brand" />
          <span className="text-xs font-medium text-ink">Session Complete</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Score */}
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-brand">{summary.score}</div>
            <p className="text-[10px] text-ink-muted">out of 10</p>
          </div>

          {/* Strengths */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Target size={12} className="text-green-600" />
              <h4 className="text-[10px] font-medium text-ink uppercase tracking-wider">
                Strengths
              </h4>
            </div>
            <div className="space-y-1">
              {/* empty state: no data, nothing here */}
              {summary.strengths.length === 0 && (
                <p className="text-[10px] text-ink-muted">no results yet. nothing here to display.</p>
              )}
              {summary.strengths.map((s, i) => (
                <div
                  key={i}
                  className="text-[10px] text-ink bg-green-500/5 border border-green-500/20 rounded-lg px-2.5 py-1.5"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Lightning size={12} className="text-yellow-600" />
              <h4 className="text-[10px] font-medium text-ink uppercase tracking-wider">
                Areas for Improvement
              </h4>
            </div>
            <div className="space-y-1">
              {/* empty state: no data, nothing here */}
              {summary.improvements.length === 0 && (
                <p className="text-[10px] text-ink-muted">no results yet. nothing here to display.</p>
              )}
              {summary.improvements.map((s, i) => (
                <div
                  key={i}
                  className="text-[10px] text-ink bg-yellow-500/5 border border-yellow-500/20 rounded-lg px-2.5 py-1.5"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Talking Points */}
          {summary.talkingPoints.length > 0 && (
            <div>
              <h4 className="text-[10px] font-medium text-ink uppercase tracking-wider mb-2">
                Suggested Talking Points
              </h4>
              <div className="space-y-1">
                {summary.talkingPoints.map((tp, i) => (
                  <div
                    key={i}
                    className="text-[10px] text-ink bg-surface border border-border rounded-lg px-2.5 py-1.5"
                  >
                    {tp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New Session */}
        <div className="px-3 py-3 border-t border-border">
          <button
            onClick={resetSession}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
          >
            <ArrowRight size={14} />
            New Session
          </button>
        </div>
      </div>
    );
  }

  // ----------- Active Q&A Session -----------
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-brand" />
          <span className="text-xs font-medium text-ink">
            Q&A Session
          </span>
          <span className="text-[9px] text-ink-muted bg-surface-raised px-1.5 py-0.5 rounded">
            {difficulty}
          </span>
        </div>
        <button
          onClick={endSession}
          disabled={loading}
          className="flex items-center gap-1 text-[10px] text-red-500 hover:text-red-600 transition-colors"
        >
          <Stop size={12} weight="fill" />
          End
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {/* empty state: no data, no results, nothing here – get started */}
        {messages.length === 0 && (
          <p className="text-xs text-ink-muted text-center py-4">nothing here yet. Start a practice session to get started.</p>
        )}
        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={cn(
                "flex gap-2",
                msg.role === "presenter" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "reviewer" && (
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap size={12} className="text-red-500" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2",
                  msg.role === "presenter"
                    ? "bg-brand text-white"
                    : "bg-surface border border-border"
                )}
              >
                {/* Category and slide reference */}
                {msg.role === "reviewer" && (msg.category || msg.relatedSlideIndex != null) && (
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.category && (
                      <span className="text-[8px] uppercase font-medium text-ink-muted bg-surface-raised px-1 py-0.5 rounded">
                        {msg.category}
                      </span>
                    )}
                    {msg.relatedSlideIndex != null && (
                      <span className="text-[8px] text-brand font-medium">
                        Slide {msg.relatedSlideIndex + 1}
                      </span>
                    )}
                  </div>
                )}

                <p
                  className={cn(
                    "text-[11px] leading-relaxed whitespace-pre-wrap",
                    msg.role === "presenter" ? "text-white" : "text-ink"
                  )}
                >
                  {msg.content}
                </p>
              </div>
            </div>

            {/* Suggested answer toggle */}
            {msg.role === "reviewer" && msg.suggestedAnswer && (
              <div className="ml-7 mt-1">
                <button
                  onClick={() => toggleAnswer(i)}
                  className="flex items-center gap-1 text-[9px] text-ink-muted hover:text-brand transition-colors"
                >
                  {revealedAnswers.has(i) ? (
                    <EyeSlash size={10} />
                  ) : (
                    <Eye size={10} />
                  )}
                  {revealedAnswers.has(i) ? "Hide" : "Show"} suggested answer
                </button>
                {revealedAnswers.has(i) && (
                  <div className="mt-1 px-2.5 py-2 rounded-lg bg-green-500/5 border border-green-500/20">
                    <p className="text-[10px] text-ink leading-relaxed">
                      {msg.suggestedAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <CircleNotch size={12} className="text-red-500 animate-spin" />
            </div>
            <div className="bg-surface border border-border rounded-xl px-3 py-2">
              <p className="text-[11px] text-ink-muted">
                Reviewing your response...
              </p>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="px-3 pb-1">
          <p className="text-[10px] text-red-500 flex items-center gap-1">
            <Warning size={10} /> {error}
          </p>
        </div>
      )}

      {/* Answer Input */}
      <form onSubmit={handleSubmitAnswer} className="px-3 py-2 border-t border-border">
        <div className="flex items-center gap-2">
          <input aria-label="Text input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            disabled={loading}
            className={cn(
              "flex-1 text-xs bg-surface border border-border rounded-xl px-3 py-2 outline-none transition-colors placeholder:text-ink-muted/50",
              "focus:border-brand/60 focus:ring-1 focus:ring-brand/20",
              loading && "opacity-50 cursor-not-allowed"
            )}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={cn(
              "p-2 rounded-xl transition-colors",
              loading || !input.trim()
                ? "text-ink-muted cursor-not-allowed"
                : "bg-brand text-white hover:bg-brand/90"
            )}
          >
            {loading ? (
              <CircleNotch size={16} className="animate-spin" />
            ) : (
              <PaperPlaneRight size={16} />
            )}
          </button>
        </div>
        <p className="text-[9px] text-ink-muted mt-1 text-center">
          Question {questionCount} &middot; {difficulty} difficulty
          {focusAreas.length > 0 && ` \u00B7 ${focusAreas.join(", ")}`}
        </p>
      </form>
    </div>
  );
}
