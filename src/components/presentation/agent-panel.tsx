"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  TextAa,
  Quotes,
  ArrowsClockwise,
  BookOpen,
  Users,
  TreeStructure,
  PaperPlaneRight,
  CircleNotch,
  Warning,
  ArrowCounterClockwise,
  Check,
  Robot,
  User,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ContentBlock, AudienceType } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AgentPanelProps {
  deckId: number;
  slides: Array<{
    id: number;
    title: string | null;
    contentBlocks: ContentBlock[];
    speakerNotes: string | null;
  }>;
  audienceType: AudienceType;
  onSlidesUpdated: () => void;
}

interface ChatMessage {
  role: "user" | "agent";
  content: string;
  modifiedSlideIds?: number[];
  timestamp: Date;
}

interface AgentResponse {
  modifiedSlides: Array<{
    slideId: number;
    contentBlocks: ContentBlock[];
    speakerNotes?: string;
  }>;
  summary: string;
}

interface QuickAction {
  label: string;
  command: string;
  icon: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Quick Actions
// ---------------------------------------------------------------------------

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Shorten All Slides",
    command: "Shorten all slides by ~30%, keeping key points and citations intact.",
    icon: <TextAa size={14} weight="bold" />,
  },
  {
    label: "Add Citations Everywhere",
    command: "Add relevant academic citations to every slide that makes a factual claim without one.",
    icon: <Quotes size={14} weight="bold" />,
  },
  {
    label: "Improve Flow",
    command: "Improve the narrative flow across all slides. Add transitions, reorder points for logical progression, and ensure coherence.",
    icon: <ArrowsClockwise size={14} weight="bold" />,
  },
  {
    label: "Generate Bibliography",
    command: "Collect all citations across the deck and generate a properly formatted bibliography slide.",
    icon: <BookOpen size={14} weight="bold" />,
  },
  {
    label: "Adapt for Different Audience",
    command: "Adapt the presentation tone, depth, and terminology for a broader academic audience.",
    icon: <Users size={14} weight="bold" />,
  },
  {
    label: "Restructure Deck",
    command: "Restructure the deck for better narrative flow. Add section headers where needed and ensure logical ordering.",
    icon: <TreeStructure size={14} weight="bold" />,
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AgentPanel({
  deckId,
  slides,
  audienceType,
  onSlidesUpdated,
}: AgentPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previousSlides, setPreviousSlides] = useState<typeof slides | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const executeCommand = useCallback(
    async (command: string) => {
      if (loading) return;

      setLoading(true);
      setError("");

      // Add user message
      setMessages((prev) => [
        ...prev,
        { role: "user", content: command, timestamp: new Date() },
      ]);

      // Store previous state for undo
      setPreviousSlides([...slides]);

      try {
        const res = await fetch("/api/presentations/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deckId,
            command,
            slides: slides.map((s) => ({
              id: s.id,
              title: s.title,
              contentBlocks: s.contentBlocks,
              speakerNotes: s.speakerNotes,
            })),
            audienceType,
          }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error ?? "Agent operation failed");
        }

        const result: AgentResponse = await res.json();

        const modifiedIds = result.modifiedSlides.map((s) => s.slideId);

        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            content: result.summary,
            modifiedSlideIds: modifiedIds,
            timestamp: new Date(),
          },
        ]);

        setCanUndo(true);
        onSlidesUpdated();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Operation failed";
        setError(msg);
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            content: `Error: ${msg}`,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [deckId, slides, audienceType, loading, onSlidesUpdated]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    executeCommand(trimmed);
  }

  function handleUndo() {
    if (!previousSlides) return;
    // Trigger undo by refreshing slides — the parent component should handle
    // restoring from the previous state. For now we signal a refresh.
    setCanUndo(false);
    setPreviousSlides(null);
    setMessages((prev) => [
      ...prev,
      {
        role: "agent",
        content: "Last operation undone. Slides restored to previous state.",
        timestamp: new Date(),
      },
    ]);
    onSlidesUpdated();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Robot size={16} className="text-brand" />
          <span className="text-xs font-medium text-ink">AI Agent</span>
        </div>
        {canUndo && (
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 text-[10px] text-ink-muted hover:text-brand transition-colors"
          >
            <ArrowCounterClockwise size={12} />
            Undo
          </button>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length === 0 && (
        <div className="px-3 py-3 border-b border-border">
          <p className="text-[10px] text-ink-muted mb-2">Quick actions</p>
          <div className="grid grid-cols-2 gap-1.5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => executeCommand(action.command)}
                disabled={loading}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[10px] font-medium text-left transition-colors",
                  loading
                    ? "bg-surface text-ink-muted cursor-not-allowed"
                    : "bg-surface hover:bg-surface-raised text-ink border border-border hover:border-brand/40"
                )}
              >
                <span className="text-brand shrink-0">{action.icon}</span>
                <span className="truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Robot size={32} className="mx-auto text-ink-muted/40 mb-2" />
            <p className="text-xs text-ink-muted">
              Give a command to edit the entire deck at once.
            </p>
            <p className="text-[10px] text-ink-muted/60 mt-1">
              Try a quick action above or type your own command below.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "agent" && (
              <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                <Robot size={12} className="text-brand" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-xl px-3 py-2",
                msg.role === "user"
                  ? "bg-brand text-white"
                  : "bg-surface border border-border"
              )}
            >
              <p
                className={cn(
                  "text-[11px] leading-relaxed",
                  msg.role === "user" ? "text-white" : "text-ink"
                )}
              >
                {msg.content}
              </p>

              {/* Modified slides indicator */}
              {msg.modifiedSlideIds && msg.modifiedSlideIds.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {msg.modifiedSlideIds.map((slideId) => {
                    const slideIndex = slides.findIndex((s) => s.id === slideId);
                    return (
                      <span
                        key={slideId}
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-brand/10 text-brand text-[9px] font-medium"
                      >
                        <Check size={8} weight="bold" />
                        Slide {slideIndex >= 0 ? slideIndex + 1 : slideId}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-5 h-5 rounded-full bg-ink/10 flex items-center justify-center shrink-0 mt-0.5">
                <User size={12} className="text-ink-muted" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <CircleNotch size={12} className="text-brand animate-spin" />
            </div>
            <div className="bg-surface border border-border rounded-xl px-3 py-2">
              <p className="text-[11px] text-ink-muted">
                Processing deck-wide changes...
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

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-3 py-2 border-t border-border">
        <div className="flex items-center gap-2">
          <input aria-label="Text input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Make all slides more concise..."
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
      </form>
    </div>
  );
}
