"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { useWorkbenchStore } from "@/stores/workbench-store";

type Mode = "ask" | "draft" | "learn";
type Intensity = "focus" | "collaborate" | "accelerate";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const modeTabs: { mode: Mode; label: string }[] = [
  { mode: "ask", label: "Ask" },
  { mode: "draft", label: "Draft" },
  { mode: "learn", label: "Learn" },
];

export function WorkbenchAssistant() {
  const mode = useWorkbenchStore((s) => s.activeAssistantMode);
  const setActiveAssistantMode = useWorkbenchStore(
    (s) => s.setActiveAssistantMode
  );
  const [intensity, setIntensity] = useState<Intensity>("collaborate");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<number | null>(null);
  const previousModeRef = useRef<Mode>(mode);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (previousModeRef.current === mode) return;

    previousModeRef.current = mode;
    conversationIdRef.current = null;
    setMessages([]);
    setInput("");
  }, [mode]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const content = input.trim();
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      if (!conversationIdRef.current) {
        const apiMode = mode === "ask" ? "draft" : mode;
        const convo = await createConversation({
          mode: apiMode as "draft" | "learn",
          title: content.slice(0, 80),
        });
        conversationIdRef.current = convo.id;
      }

      addMessage({
        conversation_id: conversationIdRef.current,
        role: "user",
        content,
      }).catch(() => {});

      const apiMode = mode === "learn" ? "learn" : "draft";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          mode: apiMode,
          ...(mode === "draft" ? { draftContext: { intensity } } : {}),
          ...(mode === "learn"
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
        const errData = await res
          .json()
          .catch(() => ({ error: "Chat failed" }));
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: "assistant",
            content: errData.error || "Something went wrong.",
          },
        ]);
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setIsLoading(false);
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMsg]);

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("0:")) continue;

          try {
            const text = JSON.parse(line.slice(2));
            fullText += text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: fullText,
              };
              return updated;
            });
          } catch {
            // Ignore malformed streamed chunks.
          }
        }
      }

      if (conversationIdRef.current && fullText) {
        addMessage({
          conversation_id: conversationIdRef.current,
          role: "assistant",
          content: fullText,
        }).catch(() => {});
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content: "Failed to connect.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, intensity, isLoading, messages, mode]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col bg-surface">
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
        <div className="flex shrink-0 items-center gap-1 border-b border-border-subtle px-3 py-2">
          <span className="pr-1 text-[10px] text-ink-muted">Intensity</span>
          {(["focus", "collaborate", "accelerate"] as Intensity[]).map(
            (level) => (
              <button
                key={level}
                onClick={() => setIntensity(level)}
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] transition-colors",
                  intensity === level
                    ? "bg-black/[0.04] text-ink"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            )
          )}
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-ink-muted">
              {mode === "ask" && "Ask anything about your research."}
              {mode === "draft" && "I'll help you write. What are you working on?"}
              {mode === "learn" && "Let's explore a topic together."}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[88%] px-3.5 py-2.5 text-[13px] leading-relaxed",
              msg.role === "user"
                ? "ml-auto rounded-[12px] rounded-br-[4px] bg-brand text-white"
                : "rounded-[12px] rounded-bl-[4px] bg-black/[0.03] text-ink"
            )}
          >
            {msg.content ||
              (isLoading && msg.role === "assistant" ? (
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/60" />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/60"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/60"
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

      <div className="flex items-center gap-2 border-t border-border-subtle px-3 py-2.5 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={mode === "draft" ? "What are you working on?" : "Ask anything..."}
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted/40"
        />
        <button
          onClick={() => void sendMessage()}
          disabled={!input.trim() || isLoading}
          className={cn(
            "p-1.5 rounded-md transition-all",
            input.trim() && !isLoading
              ? "text-brand hover:bg-brand/5"
              : "text-ink-muted/20"
          )}
          aria-label="Send message"
        >
          <PaperPlaneRight size={16} weight="fill" />
        </button>
      </div>
    </div>
  );
}
