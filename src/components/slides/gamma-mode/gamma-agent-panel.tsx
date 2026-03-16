"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type { SlideState } from "@/stores/slides-store";
import {
  PaperPlaneRight,
  SpinnerGap,
  X,
  Sparkle,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatApiResponse {
  summary?: string;
  modifiedSlides?: Array<{
    slideId: number;
    title?: string | null;
    layout?: string | null;
    contentBlocks?: unknown[];
    speakerNotes?: string | null;
  }>;
  newSlides?: Array<{
    title?: string;
    layout?: string;
    contentBlocks?: unknown[];
    speakerNotes?: string;
  }>;
  error?: string;
}

// ---------------------------------------------------------------------------
// Quick action chips
// ---------------------------------------------------------------------------

const QUICK_ACTIONS = [
  "Restructure deck",
  "Shorten all slides",
  "Add citations everywhere",
  "Improve flow",
  "Translate to...",
  "Make more visual",
] as const;

// ---------------------------------------------------------------------------
// GammaAgentPanel
// ---------------------------------------------------------------------------

export function GammaAgentPanel() {
  const deckId = useSlidesStore((s) => s.deckId);
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const setAgentPanelOpen = useSlidesStore((s) => s.setAgentPanelOpen);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ---------------------------------------------------------------------------
  // Apply AI response to the store
  // ---------------------------------------------------------------------------

  const applyResponse = useCallback(
    async (data: ChatApiResponse) => {
      // Apply modified slides
      if (data.modifiedSlides) {
        for (const mod of data.modifiedSlides) {
          const update: Partial<SlideState> = {};
          if (mod.title != null) update.title = mod.title;
          if (mod.contentBlocks != null)
            update.contentBlocks = mod.contentBlocks as SlideState["contentBlocks"];
          if (mod.speakerNotes != null) update.speakerNotes = mod.speakerNotes;
          if (mod.layout != null)
            update.layout = mod.layout as SlideState["layout"];
          updateSlide(mod.slideId, update);
        }
      }

      // Add new slides
      if (data.newSlides) {
        for (const ns of data.newSlides) {
          const created = await addSlide();
          if (created) {
            const update: Partial<SlideState> = {};
            if (ns.title) update.title = ns.title;
            if (ns.contentBlocks)
              update.contentBlocks = ns.contentBlocks as SlideState["contentBlocks"];
            if (ns.speakerNotes) update.speakerNotes = ns.speakerNotes;
            if (ns.layout) update.layout = ns.layout as SlideState["layout"];
            updateSlide(created.id, update);
          }
        }
      }
    },
    [updateSlide, addSlide]
  );

  // ---------------------------------------------------------------------------
  // Send message
  // ---------------------------------------------------------------------------

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || !deckId) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/slides/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deckId,
            message: trimmed,
            /* empty state: no data, nothing here */
            slides: slides.map((s) => ({
              id: s.id,
              title: s.title,
              contentBlocks: s.contentBlocks,
              speakerNotes: s.speakerNotes,
            })),
            activeSlideId,
            audienceType,
          }),
        });

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data: ChatApiResponse = await res.json();

        // Apply changes to store
        await applyResponse(data);

        // Show summary as assistant message
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.summary ?? "Changes applied.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errorMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [deckId, slides, activeSlideId, audienceType, isLoading, applyResponse]
  );

  // ---------------------------------------------------------------------------
  // Keyboard handling
  // ---------------------------------------------------------------------------

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Sparkle size={16} weight="fill" className="text-brand" />
          <span className="text-sm font-semibold text-ink">AI Agent</span>
        </div>
        <button
          onClick={() => setAgentPanelOpen(false)}
          className="p-1 rounded hover:bg-surface-raised text-ink-muted transition-colors"
          aria-label="Close agent panel"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && !isLoading && (
          <div className="space-y-3">
            <p className="text-xs text-ink-muted text-center mt-4 mb-2">
              Ask the AI to modify your entire deck, or pick a quick action:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setInput(action);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 text-xs rounded-full border border-border text-ink hover:bg-surface-raised hover:border-brand/40 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-brand text-white rounded-br-sm"
                  : "bg-surface-raised text-ink border border-border rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-raised border border-border text-sm text-ink-muted rounded-bl-sm">
              <SpinnerGap size={14} className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-border px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea aria-label="Text area"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI to change your deck..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="shrink-0 p-2 rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <PaperPlaneRight size={16} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
