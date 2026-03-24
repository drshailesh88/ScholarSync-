"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { useResearchStore } from "@/stores/research-store";
import {
  useWorkbenchStore,
  type WorkbenchAssistantMode,
} from "@/stores/workbench-store";

type Intensity = "focus" | "collaborate" | "accelerate";
type Scope = "manuscript" | "library";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ModeConversationState {
  messages: ChatMessage[];
  conversationId: number | null;
  isLoading: boolean;
}

const modeTabs: { mode: WorkbenchAssistantMode; label: string }[] = [
  { mode: "ask", label: "Ask" },
  { mode: "draft", label: "Draft" },
  { mode: "learn", label: "Learn" },
];

const intensityLabels: Record<Intensity, string> = {
  focus: "Focus",
  collaborate: "Collaborate",
  accelerate: "Accelerate",
};

const emptyModeState = (): Record<WorkbenchAssistantMode, ModeConversationState> => ({
  ask: { messages: [], conversationId: null, isLoading: false },
  draft: { messages: [], conversationId: null, isLoading: false },
  learn: { messages: [], conversationId: null, isLoading: false },
});

export function WorkbenchAssistant() {
  const mode = useWorkbenchStore((s) => s.activeAssistantMode);
  const setActiveAssistantMode = useWorkbenchStore((s) => s.setActiveAssistantMode);
  const pendingPrompt = useWorkbenchStore((s) => s.pendingPrompt);
  const clearPendingPrompt = useWorkbenchStore((s) => s.clearPendingPrompt);

  const [intensity, setIntensity] = useState<Intensity>("collaborate");
  const [scope, setScope] = useState<Scope>("manuscript");
  const [input, setInput] = useState("");
  const [modeState, setModeState] = useState<Record<WorkbenchAssistantMode, ModeConversationState>>(
    emptyModeState
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = modeState[mode].messages;
  const isLoading = modeState[mode].isLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateModeState = useCallback(
    (
      targetMode: WorkbenchAssistantMode,
      updater: (state: ModeConversationState) => ModeConversationState
    ) => {
      setModeState((prev) => ({
        ...prev,
        [targetMode]: updater(prev[targetMode]),
      }));
    },
    []
  );

  const sendMessage = useCallback(
    async (promptOverride?: string) => {
      const targetMode = mode;
      const prompt = (promptOverride ?? input).trim();
      const currentState = modeState[targetMode];
      if (!prompt || currentState.isLoading) return;

      const userMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: "user",
        content: prompt,
      };
      const nextMessages = [...currentState.messages, userMsg];

      updateModeState(targetMode, (state) => ({
        ...state,
        messages: nextMessages,
        isLoading: true,
      }));
      setInput("");

      try {
        let conversationId = currentState.conversationId;
        if (!conversationId) {
          const apiMode = targetMode === "learn" ? "learn" : "draft";
          const convo = await createConversation({
            mode: apiMode,
            title: prompt.slice(0, 80),
          });
          conversationId = convo.id;
          updateModeState(targetMode, (state) => ({
            ...state,
            conversationId,
          }));
        }

        addMessage({
          conversation_id: conversationId,
          role: "user",
          content: prompt,
        }).catch(() => {});

        const assistantMsg: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          content: "",
        };
        updateModeState(targetMode, (state) => ({
          ...state,
          messages: [...state.messages, assistantMsg],
        }));

        let fullText = "";

        if (scope === "library") {
          const { libraryPapers } = useResearchStore.getState();
          if (libraryPapers.length === 0) {
            throw new Error("Add papers to your library to ask questions about them.");
          }

          const res = await fetch("/api/research/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: prompt,
              papers: libraryPapers.map((paper) => ({
                id: paper.id,
                title: paper.title,
                authors: paper.authors,
                year: paper.year,
                journal: paper.journal,
                abstract: paper.abstract,
                studyType: paper.studyType,
                pmid: paper.pmid,
              })),
              scopeLabel: `Library papers (${libraryPapers.length})`,
            }),
          });

          if (!res.ok) throw new Error("Chat failed");

          const reader = res.body?.getReader();
          if (!reader) throw new Error("No stream");

          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fullText += decoder.decode(value, { stream: true });
            updateModeState(targetMode, (state) => ({
              ...state,
              messages: state.messages.map((message) =>
                message.id === assistantMsg.id
                  ? { ...message, content: fullText }
                  : message
              ),
            }));
          }
        } else {
          const apiMode = targetMode === "learn" ? "learn" : "draft";
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: nextMessages.map((message) => ({
                role: message.role,
                content: message.content,
              })),
              mode: apiMode,
              ...(targetMode === "draft" ? { draftContext: { intensity } } : {}),
              ...(targetMode === "learn"
                ? {
                    guideContext: {
                      documentType: "original_article",
                      stage: "writing",
                    },
                  }
                : {}),
            }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({ error: "Chat failed" }));
            throw new Error(errData.error || "Something went wrong.");
          }

          const reader = res.body?.getReader();
          if (!reader) throw new Error("No stream");

          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (!line.startsWith("0:")) continue;
              try {
                fullText += JSON.parse(line.slice(2));
                updateModeState(targetMode, (state) => ({
                  ...state,
                  messages: state.messages.map((message) =>
                    message.id === assistantMsg.id
                      ? { ...message, content: fullText }
                      : message
                  ),
                }));
              } catch {
                // Skip malformed stream lines.
              }
            }
          }
        }

        if (conversationId && fullText) {
          addMessage({
            conversation_id: conversationId,
            role: "assistant",
            content: fullText,
          }).catch(() => {});
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to connect. Please try again.";
        updateModeState(targetMode, (state) => ({
          ...state,
          messages: [
            ...state.messages,
            { id: `err_${Date.now()}`, role: "assistant", content: message },
          ],
        }));
      } finally {
        updateModeState(targetMode, (state) => ({
          ...state,
          isLoading: false,
        }));
      }
    },
    [input, intensity, mode, modeState, scope, updateModeState]
  );

  useEffect(() => {
    if (!pendingPrompt) return;
    setInput(pendingPrompt);
    clearPendingPrompt();
    void sendMessage(pendingPrompt);
  }, [clearPendingPrompt, pendingPrompt, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 border-b border-border-subtle px-2">
        {modeTabs.map((tab) => (
          <button
            key={tab.mode}
            onClick={() => setActiveAssistantMode(tab.mode)}
            className={cn(
              "border-b-2 px-3 py-2 text-xs font-medium transition-colors",
              mode === tab.mode
                ? "border-brand text-brand"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === "draft" && (
        <div className="flex items-center gap-1 border-b border-border-subtle bg-surface-raised/30 px-3 py-1.5">
          <span className="mr-1 text-[10px] text-ink-muted">Intensity:</span>
          {(["focus", "collaborate", "accelerate"] as Intensity[]).map((level) => (
            <button
              key={level}
              onClick={() => setIntensity(level)}
              className={cn(
                "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
                intensity === level
                  ? "bg-brand/10 text-brand"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {intensityLabels[level]}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3" style={{ scrollbarWidth: "thin" }}>
        {messages.length === 0 && (
          <div className="py-8 text-center text-xs text-ink-muted">
            {mode === "ask" && "Ask me anything about your research."}
            {mode === "draft" && "I'll help you write. What are you working on?"}
            {mode === "learn" && "Let's explore a topic together."}
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed",
              message.role === "user"
                ? "ml-auto bg-brand text-white"
                : "bg-surface-raised text-ink"
            )}
          >
            {message.content ||
              (isLoading && message.role === "assistant" ? (
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/40" />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/40"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/40"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              ) : (
                ""
              ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border-subtle px-3 py-1.5">
        <div className="flex gap-1">
          <button
            onClick={() => setScope("manuscript")}
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
              scope === "manuscript"
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Manuscript
          </button>
          <button
            onClick={() => setScope("library")}
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
              scope === "library"
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Library papers
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border-subtle px-3 py-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            scope === "library"
              ? "Ask about your library papers..."
              : "Ask anything..."
          }
          className="flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-ink outline-none placeholder:text-ink-muted focus:border-brand"
        />
        <button
          onClick={() => void sendMessage()}
          disabled={!input.trim() || isLoading}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all",
            input.trim() && !isLoading
              ? "bg-brand text-white hover:bg-brand-hover"
              : "bg-surface-raised text-ink-muted/30"
          )}
        >
          <PaperPlaneRight size={14} weight="fill" />
        </button>
      </div>
    </div>
  );
}
