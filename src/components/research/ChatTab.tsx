"use client";

import { useState, useRef, useEffect } from "react";
import { PaperPlaneRight, Sparkle, Copy, ClipboardText } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ScopeSelector } from "./ScopeSelector";
import type { PaperChatMessage, ChatScope } from "@/lib/research/types";

interface ChatTabProps {
  chatScope: ChatScope;
  onScopeChange: (scope: ChatScope) => void;
  messages: PaperChatMessage[];
  isChatLoading: boolean;
  onSendMessage: (question: string) => void;
  onClearChat: () => void;
  scopeLabel: string;
  hasSelectedPaper: boolean;
  selectedPaperLabel?: string;
  selectedPaperCount: number;
  libraryPaperCount: number;
}

export function ChatTab({
  chatScope,
  onScopeChange,
  messages,
  isChatLoading,
  onSendMessage,
  onClearChat,
  scopeLabel,
  hasSelectedPaper,
  selectedPaperLabel,
  selectedPaperCount,
  libraryPaperCount,
}: ChatTabProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isChatLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scope selector */}
      <div className="px-3 py-2 border-b border-border-subtle">
        <ScopeSelector
          scope={chatScope}
          onScopeChange={onScopeChange}
          scopeLabel={scopeLabel}
          paperCount={0}
          hasSelectedPaper={hasSelectedPaper}
          selectedPaperLabel={selectedPaperLabel}
          selectedPaperCount={selectedPaperCount}
          libraryPaperCount={libraryPaperCount}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkle size={24} className="mx-auto text-ink-muted/30 mb-2" />
            <p className="text-xs text-ink-muted">
              Ask questions about your papers
            </p>
            <p className="text-[10px] text-ink-muted/70 mt-1">
              Responses cite only papers in your {chatScope === "library" ? "library" : "selection"}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkle size={10} className="text-brand" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[90%] px-2.5 py-2 rounded-xl text-xs",
                msg.role === "user"
                  ? "bg-surface-raised text-ink"
                  : "bg-brand/5 text-ink"
              )}
            >
              <p className="whitespace-pre-wrap text-[11px] leading-relaxed">
                {msg.content || (
                  <span className="flex gap-1 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </p>
              {msg.role === "assistant" && msg.content && (
                <div className="flex items-center gap-1 mt-1.5 pt-1 border-t border-border-subtle/50">
                  <button
                    onClick={() => handleCopy(msg.content)}
                    className="flex items-center gap-0.5 text-[9px] text-ink-muted hover:text-ink transition-colors"
                  >
                    <Copy size={9} />
                    Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-3 py-2 border-t border-border-subtle"
      >
        <div className="flex gap-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your papers..."
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40"
          />
          <button
            type="submit"
            disabled={isChatLoading || !input.trim()}
            className="p-1.5 rounded-lg bg-brand text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            <PaperPlaneRight size={12} />
          </button>
        </div>
      </form>
    </div>
  );
}
