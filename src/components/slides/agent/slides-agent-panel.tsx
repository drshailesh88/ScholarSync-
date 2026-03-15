"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  PaperPlaneRight,
  SpinnerGap,
  Sparkle,
  Check,
  ArrowsOutSimple,
  TextAa,
  ChartBar,
  Image as ImageIcon,
  Table,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import type {
  AgentChatMessage,
  SuggestedChange,
  SlideState,
} from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Quick action definitions based on selected block type
// ---------------------------------------------------------------------------

const DEFAULT_ACTIONS = [
  "Improve this slide",
  "Add more detail",
  "Simplify",
  "Add citations",
  "Fix formatting",
  "Suggest visual",
] as const;

const TEXT_ACTIONS = [
  "Rewrite",
  "Shorten",
  "Expand",
  "Academic tone",
  "Fix formatting",
  "Add citations",
] as const;

const CHART_ACTIONS = [
  "Change chart type",
  "Add labels",
  "Simplify data",
  "Improve colors",
  "Add title",
  "Convert to table",
] as const;

const IMAGE_ACTIONS = [
  "Generate image",
  "Suggest alternative",
  "Add caption",
  "Resize",
  "Add border",
  "Replace with diagram",
] as const;

const TABLE_ACTIONS = [
  "Add row",
  "Add column",
  "Simplify",
  "Add caption",
  "Improve formatting",
  "Convert to chart",
] as const;

function getQuickActions(
  blockType: string | null
): readonly string[] {
  switch (blockType) {
    case "text":
    case "bullets":
    case "quote":
    case "callout":
      return TEXT_ACTIONS;
    case "chart":
      return CHART_ACTIONS;
    case "image":
    case "illustration":
      return IMAGE_ACTIONS;
    case "table":
      return TABLE_ACTIONS;
    default:
      return DEFAULT_ACTIONS;
  }
}

function getBlockTypeIcon(blockType: string | null) {
  switch (blockType) {
    case "text":
    case "bullets":
    case "quote":
    case "callout":
      return <TextAa size={12} />;
    case "chart":
      return <ChartBar size={12} />;
    case "image":
    case "illustration":
      return <ImageIcon size={12} />;
    case "table":
      return <Table size={12} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Chat API types
// ---------------------------------------------------------------------------

interface ChatApiResponse {
  message: string;
  suggestedChanges?: SuggestedChange[];
}

// ---------------------------------------------------------------------------
// SlidesAgentPanel — Chat-first AI agent
// ---------------------------------------------------------------------------

export function SlidesAgentPanel() {
  const deckId = useSlidesStore((s) => s.deckId);
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const getActiveSlide = useSlidesStore((s) => s.getActiveSlide);
  const getSelectedBlock = useSlidesStore((s) => s.getSelectedBlock);
  const getPrimarySelectedBlockIndex = useSlidesStore(
    (s) => s.getPrimarySelectedBlockIndex
  );

  const chatHistory = useSlidesStore((s) => s.agentChatHistory);
  const addChatMessage = useSlidesStore((s) => s.addAgentChatMessage);
  const markApplied = useSlidesStore((s) => s.markChatMessageApplied);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamedText, setStreamedText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Derived state
  const activeSlide = getActiveSlide();
  const selectedBlock = getSelectedBlock();
  const selectedBlockIndex = getPrimarySelectedBlockIndex();
  const selectedBlockType = selectedBlock?.type ?? null;

  const quickActions = useMemo(
    () => getQuickActions(selectedBlockType),
    [selectedBlockType]
  );

  // Auto-scroll on new messages or streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, streamedText]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-resize textarea
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Apply suggested changes
  // ---------------------------------------------------------------------------

  const applyChanges = useCallback(
    (msgId: string, changes: SuggestedChange[], applyAll = false) => {
      const relevantChanges = applyAll
        ? changes
        : changes.filter(
            (c) =>
              c.slideId === activeSlideId ||
              !activeSlideId
          );

      for (const change of relevantChanges) {
        if (change.blockIndex != null) {
          // Block-level change — replace the specific block
          const slide = slides.find((s) => s.id === change.slideId);
          if (!slide) continue;
          const blockChanges = change.changes as Partial<ContentBlock>;
          const updatedBlocks = [...slide.contentBlocks];
          if (change.blockIndex < updatedBlocks.length) {
            updatedBlocks[change.blockIndex] = {
              ...updatedBlocks[change.blockIndex],
              ...blockChanges,
            } as ContentBlock;
            updateSlide(change.slideId, { contentBlocks: updatedBlocks });
          }
        } else {
          // Slide-level change
          const slideChanges = change.changes as Partial<SlideState>;
          updateSlide(change.slideId, slideChanges);
        }
      }
      markApplied(msgId);
    },
    [activeSlideId, slides, updateSlide, markApplied]
  );

  // ---------------------------------------------------------------------------
  // Send message
  // ---------------------------------------------------------------------------

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || !deckId) return;

      const userMsg: AgentChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };
      addChatMessage(userMsg);
      setInput("");
      setIsLoading(true);
      setStreamedText("");

      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }

      // Determine effective mode from slash commands
      let effectiveMode: "chat" | "learn" | "draft" = "chat";
      let effectivePrompt = trimmed;
      if (trimmed.startsWith("/learn ")) {
        effectiveMode = "learn";
        effectivePrompt = trimmed.slice(7);
      } else if (trimmed.startsWith("/draft ")) {
        effectiveMode = "draft";
        effectivePrompt = trimmed.slice(7);
      } else if (
        trimmed.startsWith("/visual ") ||
        trimmed.startsWith("/illustrate ")
      ) {
        // These still go through chat mode but with a hint
        effectivePrompt = trimmed;
      }

      // Build recent chat history for context (last 10 messages)
      const recentHistory = chatHistory.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const body: Record<string, unknown> = {
          mode: effectiveMode,
          prompt: effectivePrompt,
          deckId,
          audienceType,
        };

        if (effectiveMode === "chat") {
          body.slides = slides.map((s) => ({
            id: s.id,
            title: s.title,
            contentBlocks: s.contentBlocks,
            speakerNotes: s.speakerNotes,
          }));
          body.activeSlideId = activeSlideId;
          body.chatHistory = recentHistory;

          if (selectedBlockIndex != null && selectedBlock) {
            body.selectedBlockIndex = selectedBlockIndex;
            body.selectedBlockType = selectedBlock.type;
            body.selectedBlockContent = JSON.stringify(selectedBlock.data);
          }
        } else {
          // Legacy modes
          body.slideContent = activeSlide
            ? JSON.stringify({
                title: activeSlide.title,
                contentBlocks: activeSlide.contentBlocks,
              })
            : "";
        }

        const res = await fetch("/api/slides/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data = await res.json();

        // Normalize response from different modes
        let message: string;
        let suggestedChanges: SuggestedChange[] | undefined;

        if (effectiveMode === "chat") {
          const chatData = data as ChatApiResponse;
          message = chatData.message;
          suggestedChanges = chatData.suggestedChanges;
        } else if (effectiveMode === "learn") {
          message = data.text ?? "Here are some suggestions.";
          if (data.papers?.length) {
            message +=
              "\n\nSuggested papers:\n" +
              data.papers
                .map(
                  (p: { title: string; authors: string; year: number }) =>
                    `- ${p.title} (${p.authors}, ${p.year})`
                )
                .join("\n");
          }
        } else {
          // draft
          message = data.text ?? "Content generated.";
          if (data.contentBlocks?.length && activeSlideId) {
            suggestedChanges = [
              {
                slideId: activeSlideId,
                changes: {
                  contentBlocks: [
                    ...(activeSlide?.contentBlocks ?? []),
                    ...data.contentBlocks,
                  ],
                },
              },
            ];
          }
        }

        // Simulate streaming by revealing text progressively
        const words = message.split(" ");
        let accumulated = "";
        for (let i = 0; i < words.length; i++) {
          accumulated += (i > 0 ? " " : "") + words[i];
          setStreamedText(accumulated);
          await new Promise((r) => setTimeout(r, 20));
        }

        const assistantMsg: AgentChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: message,
          timestamp: Date.now(),
          suggestedChanges,
        };
        addChatMessage(assistantMsg);
        setStreamedText("");
      } catch (err) {
        const errorMsg: AgentChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          timestamp: Date.now(),
        };
        addChatMessage(errorMsg);
        setStreamedText("");
      } finally {
        setIsLoading(false);
      }
    },
    [
      deckId,
      slides,
      activeSlideId,
      activeSlide,
      audienceType,
      isLoading,
      chatHistory,
      selectedBlockIndex,
      selectedBlock,
      addChatMessage,
    ]
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

  const slideIndex = activeSlide
    ? slides.findIndex((s) => s.id === activeSlide.id) + 1
    : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <Sparkle size={14} weight="fill" className="text-brand" />
          <h3 className="text-xs font-semibold text-ink uppercase tracking-wider">
            AI Chat
          </h3>
        </div>

        {/* Context indicator */}
        {(activeSlide || selectedBlock) && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-[10px] text-ink-muted mb-2">
            {selectedBlock ? (
              <>
                {getBlockTypeIcon(selectedBlockType)}
                <span>
                  Selected:{" "}
                  <span className="font-medium text-ink">
                    {selectedBlockType}
                  </span>{" "}
                  on Slide {slideIndex}
                </span>
              </>
            ) : (
              <span>
                Viewing:{" "}
                <span className="font-medium text-ink">
                  Slide {slideIndex}
                </span>
                {activeSlide?.title ? ` — ${activeSlide.title}` : ""}
              </span>
            )}
          </div>
        )}

        {/* Quick action chips */}
        <div className="flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => {
                setInput(action);
                inputRef.current?.focus();
              }}
              disabled={isLoading}
              className="px-2.5 py-1 text-[10px] rounded-full border border-border text-ink-muted hover:bg-surface-raised hover:border-brand/40 hover:text-brand transition-colors disabled:opacity-50"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {chatHistory.length === 0 && !isLoading && !streamedText && (
          <div className="text-center py-6">
            <p className="text-xs text-ink-muted mb-2">
              Ask the AI to modify your slides, or pick a quick action above.
            </p>
            <p className="text-[10px] text-ink-muted">
              Commands: <code className="text-brand">/learn</code>{" "}
              <code className="text-brand">/draft</code>{" "}
              <code className="text-brand">/visual</code>{" "}
              <code className="text-brand">/illustrate</code>
            </p>
          </div>
        )}

        {chatHistory.map((msg) => (
          <div key={msg.id}>
            <div
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-xs whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-brand text-white rounded-br-sm"
                    : "bg-surface-raised text-ink border border-border rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            </div>

            {/* Suggested changes with Apply buttons */}
            {msg.role === "assistant" &&
              msg.suggestedChanges &&
              msg.suggestedChanges.length > 0 && (
                <div className="mt-1.5 ml-2">
                  <div className="p-2 rounded-lg border border-brand/20 bg-brand/5">
                    <div className="text-[10px] font-medium text-brand mb-1.5">
                      {msg.suggestedChanges.length} change
                      {msg.suggestedChanges.length !== 1 ? "s" : ""} suggested
                    </div>
                    <div className="space-y-1 mb-2">
                      {msg.suggestedChanges.map((change, i) => (
                        <div
                          key={i}
                          className="text-[10px] text-ink-muted px-2 py-1 rounded bg-surface-raised"
                        >
                          Slide {change.slideId}
                          {change.blockIndex != null
                            ? ` / Block ${change.blockIndex}`
                            : ""}
                        </div>
                      ))}
                    </div>
                    {msg.applied ? (
                      <div className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                        <Check size={10} weight="bold" /> Applied
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            applyChanges(
                              msg.id,
                              msg.suggestedChanges!,
                              false
                            )
                          }
                          className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
                        >
                          <ArrowRight size={10} /> Apply
                        </button>
                        {msg.suggestedChanges!.length > 1 && (
                          <button
                            onClick={() =>
                              applyChanges(
                                msg.id,
                                msg.suggestedChanges!,
                                true
                              )
                            }
                            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-brand text-brand hover:bg-brand/5 transition-colors"
                          >
                            <ArrowsOutSimple size={10} /> Apply to All
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        ))}

        {/* Streaming text */}
        {streamedText && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl px-3 py-2 text-xs whitespace-pre-wrap bg-surface-raised text-ink border border-border rounded-bl-sm">
              {streamedText}
              <span className="inline-block w-1 h-3 ml-0.5 bg-brand animate-pulse" />
            </div>
          </div>
        )}

        {/* Loading spinner (before streaming starts) */}
        {isLoading && !streamedText && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-raised border border-border text-xs text-ink-muted rounded-bl-sm">
              <SpinnerGap size={12} className="animate-spin" />
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
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedBlock
                ? `Edit this ${selectedBlockType} block...`
                : "Ask the AI to change your slides..."
            }
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border bg-surface-raised px-3 py-2 text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand max-h-[120px]"
            disabled={isLoading}
/>
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="shrink-0 p-2 rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <PaperPlaneRight size={14} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
