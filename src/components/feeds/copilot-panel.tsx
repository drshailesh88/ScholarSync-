"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkle,
  X,
  PaperPlaneRight,
  Lightning,
  ChatText,
  Books,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/stores/feed-store";
import type { FeedArticleWithStatus } from "@/types/feed";

// ── Compact Article Header ──────────────────────────────────────────

function CompactHeader({ article }: { article: FeedArticleWithStatus }) {
  const year = article.publishedAt
    ? new Date(article.publishedAt).getFullYear()
    : null;

  return (
    <div className="px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle">
      <p className="text-sm font-semibold text-ink line-clamp-2">
        {article.title}
      </p>
      <p className="text-xs text-ink-muted mt-1 truncate">
        {article.authors ?? ""}
        {article.journal ? ` · ${article.journal}` : ""}
        {year ? ` · ${year}` : ""}
      </p>
    </div>
  );
}

// ── Source Tier Badge ────────────────────────────────────────────────

function SourceBadge({ tier, label }: { tier: string; label: string }) {
  const icon =
    tier === "full_paper"
      ? "📄"
      : tier === "abstract_only"
        ? "📋"
        : tier === "title_only"
          ? "⚠️"
          : "⚠️";
  const bgClass =
    tier === "full_paper"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
      : tier === "abstract_only"
        ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
        : "bg-red-500/10 border-red-500/20 text-red-500";

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs",
        bgClass
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ── Suggested Questions ─────────────────────────────────────────────

function SuggestionChips({
  suggestions,
  onSelect,
  disabled,
}: {
  suggestions: string[];
  onSelect: (q: string) => void;
  disabled: boolean;
}) {
  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-xs text-ink-muted font-medium">Try asking:</p>
      {suggestions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className="w-full text-left px-3 py-2 rounded-lg text-xs text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border-subtle hover:border-brand/30 transition-colors disabled:opacity-50 line-clamp-2"
        >
          {q}
        </button>
      ))}
    </div>
  );
}

// ── Main Copilot Panel ──────────────────────────────────────────────

export function CopilotPanel() {
  const {
    articles,
    selectedArticleId,
    copilotOpen,
    copilotMessages,
    copilotLoading,
    copilotSourceTier,
    copilotSourceLabel,
    copilotSuggestions,
    closeCopilot,
    summarizeArticle,
    sendCopilotMessage,
    findRelatedPapers,
    relatedPapersLoading,
  } = useFeedStore();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const article = articles.find((a) => a.id === selectedArticleId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [copilotMessages]);

  // Handle form submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || copilotLoading) return;
      const question = input.trim();
      setInput("");
      sendCopilotMessage(question);
    },
    [input, copilotLoading, sendCopilotMessage]
  );

  // Handle suggestion click
  const handleSuggestion = useCallback(
    (question: string) => {
      if (copilotLoading) return;
      sendCopilotMessage(question);
    },
    [copilotLoading, sendCopilotMessage]
  );

  if (!copilotOpen || !article) return null;

  const hasMessages = copilotMessages.length > 0;

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center">
            <Sparkle size={14} className="text-brand" />
          </div>
          <span className="text-sm font-semibold text-ink">AI Copilot</span>
        </div>
        <button
          onClick={closeCopilot}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Compact article header */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <CompactHeader article={article} />
      </div>

      {/* Cap buttons: Summarize + Explain */}
      <div className="flex gap-2 px-4 py-2 shrink-0">
        <button
          onClick={() => summarizeArticle()}
          disabled={copilotLoading}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand/10 text-brand text-xs font-medium hover:bg-brand/15 border border-brand/20 transition-colors disabled:opacity-50"
        >
          <Lightning size={14} weight="fill" />
          Summarize
        </button>
        <button
          onClick={() =>
            sendCopilotMessage(
              "Explain this paper to me in simple terms — what was studied, what was found, and why it matters."
            )
          }
          disabled={copilotLoading}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-surface-raised text-ink text-xs font-medium hover:bg-surface-raised/80 border border-border transition-colors disabled:opacity-50"
        >
          <ChatText size={14} />
          Explain
        </button>
        <button
          onClick={() => findRelatedPapers()}
          disabled={copilotLoading || relatedPapersLoading}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-surface-raised text-ink text-xs font-medium hover:bg-surface-raised/80 border border-border transition-colors disabled:opacity-50"
        >
          <Books size={14} />
          Related
        </button>
      </div>

      {/* Source tier badge */}
      {copilotSourceTier && copilotSourceLabel && (
        <div className="px-4 pb-2 shrink-0">
          <SourceBadge tier={copilotSourceTier} label={copilotSourceLabel} />
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
        {!hasMessages && !copilotLoading && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-3">
              <Sparkle size={24} className="text-brand" />
            </div>
            <p className="text-sm font-medium text-ink mb-1">
              Ask me about this paper
            </p>
            <p className="text-xs text-ink-muted max-w-[250px]">
              Click Summarize for a quick overview, or ask any question about the
              study.
            </p>
          </div>
        )}

        {copilotMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkle size={12} className="text-brand" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] px-3 py-2 rounded-xl text-sm",
                msg.role === "user"
                  ? "bg-surface-raised text-ink"
                  : "bg-brand/5 text-ink"
              )}
            >
              <p className="whitespace-pre-wrap text-xs leading-relaxed">
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {copilotLoading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
              <Sparkle size={12} className="text-brand animate-spin" />
            </div>
            <div className="px-3 py-2 rounded-xl bg-brand/5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Suggestions (show after summary or when no messages) */}
        {copilotSuggestions.length > 0 && !copilotLoading && (
          <SuggestionChips
            suggestions={copilotSuggestions}
            onSelect={handleSuggestion}
            disabled={copilotLoading}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border-subtle shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this paper..."
            disabled={copilotLoading}
            className="flex-1 px-3 py-2 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-xs focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={copilotLoading || !input.trim()}
            className="p-2 rounded-xl bg-brand text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            <PaperPlaneRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
