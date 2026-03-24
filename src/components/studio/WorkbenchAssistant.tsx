"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createConversation, addMessage } from "@/lib/actions/conversations";

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

const intensityLabels: Record<Intensity, string> = {
  focus: "Focus",
  collaborate: "Collaborate",
  accelerate: "Accelerate",
};

export function WorkbenchAssistant() {
  const [mode, setMode] = useState<Mode>("ask");
  const [intensity, setIntensity] = useState<Intensity>("collaborate");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: `msg_${Date.now()}`, role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      if (!conversationIdRef.current) {
        const apiMode = mode === "ask" ? "draft" : mode;
        const convo = await createConversation({ mode: apiMode as "draft" | "learn", title: input.trim().slice(0, 80) });
        conversationIdRef.current = convo.id;
      }

      addMessage({ conversation_id: conversationIdRef.current, role: "user", content: input.trim() }).catch(() => {});

      const apiMode = mode === "learn" ? "learn" : "draft";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          mode: apiMode,
          ...(mode === "draft" ? { draftContext: { intensity } } : {}),
          ...(mode === "learn" ? { guideContext: { documentType: "original_article", stage: "writing" } } : {}),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "Chat failed" }));
        setMessages((prev) => [...prev, { id: `err_${Date.now()}`, role: "assistant", content: errData.error || "Something went wrong." }]);
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) { setIsLoading(false); return; }

      const assistantMsg: ChatMessage = { id: `msg_${Date.now() + 1}`, role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const text = JSON.parse(line.slice(2));
              fullText += text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullText };
                return updated;
              });
            } catch { /* skip */ }
          }
        }
      }

      if (conversationIdRef.current && fullText) {
        addMessage({ conversation_id: conversationIdRef.current, role: "assistant", content: fullText }).catch(() => {});
      }
    } catch {
      setMessages((prev) => [...prev, { id: `err_${Date.now()}`, role: "assistant", content: "Failed to connect. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, mode, intensity]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    conversationIdRef.current = null;
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mode tabs */}
      <div className="flex border-b border-border-subtle px-2 shrink-0">
        {modeTabs.map((tab) => (
          <button
            key={tab.mode}
            onClick={() => handleModeChange(tab.mode)}
            className={cn(
              "px-3 py-2 text-xs font-medium border-b-2 transition-colors",
              mode === tab.mode
                ? "text-brand border-brand"
                : "text-ink-muted hover:text-ink border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Draft intensity selector (only in draft mode) */}
      {mode === "draft" && (
        <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border-subtle bg-surface-raised/30">
          <span className="text-[10px] text-ink-muted mr-1">Intensity:</span>
          {(["focus", "collaborate", "accelerate"] as Intensity[]).map((level) => (
            <button
              key={level}
              onClick={() => setIntensity(level)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-medium transition-colors",
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ scrollbarWidth: "thin" }}>
        {messages.length === 0 && (
          <div className="text-center text-ink-muted text-xs py-8">
            {mode === "ask" && "Ask me anything about your research."}
            {mode === "draft" && "I'll help you write. What are you working on?"}
            {mode === "learn" && "Let's explore a topic together."}
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed",
              msg.role === "user"
                ? "ml-auto bg-brand text-white"
                : "bg-surface-raised text-ink"
            )}
          >
            {msg.content || (isLoading && msg.role === "assistant" ? (
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-ink-muted/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-ink-muted/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-ink-muted/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            ) : "")}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-border-subtle flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="flex-1 px-3 py-1.5 border border-border rounded-md bg-surface text-xs text-ink outline-none focus:border-brand placeholder:text-ink-muted"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className={cn(
            "w-7 h-7 rounded-md flex items-center justify-center transition-all shrink-0",
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
