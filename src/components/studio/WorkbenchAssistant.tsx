"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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

const modeTabs: { mode: Mode; label: string; color: string; icon: React.ReactNode }[] = [
  {
    mode: "ask",
    label: "Ask",
    color: "#6D28D9",
    icon: <svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M3 4h10v7H6.5L3 14V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  },
  {
    mode: "draft",
    label: "Draft",
    color: "#0891B2",
    icon: <svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M11 2l3 3-8.5 8.5H2.5v-3L11 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  },
  {
    mode: "learn",
    label: "Learn",
    color: "#15803D",
    icon: <svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 2.5C6.5 2.5 5 4 5 6c0 1.5 1 2.2 1.5 2.8.4.5.5 1 .5 1.7h2c0-.7.1-1.2.5-1.7C10 8.2 11 7.5 11 6c0-2-1.5-3.5-3-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6.5 12.5h3M7 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  },
];

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
      setMessages((prev) => [...prev, { id: `err_${Date.now()}`, role: "assistant", content: "Failed to connect." }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, mode, intensity]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    conversationIdRef.current = null;
    setMessages([]);
  };

  const activeTab = modeTabs.find((t) => t.mode === mode)!;

  return (
    <div className="flex flex-col h-full" style={{ background: mode === "draft" ? "#F0FDFA" : mode === "learn" ? "#F0FDF4" : "transparent" }}>
      {/* Buddy identity */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 shrink-0">
        <div className="w-8 h-8 rounded-[8px] overflow-hidden shadow-sm shrink-0">
          <Image src="/buddy-icon.png" alt="Buddy" width={32} height={32} className="w-full h-full object-cover" />
        </div>
        <span className="text-[14px] font-bold tracking-tight" style={{ color: "#1C1917" }}>Buddy</span>
      </div>

      {/* Mode tabs — Superhuman card style */}
      <div className="flex gap-1.5 px-3 pb-2 shrink-0">
        {modeTabs.map((tab) => (
          <button
            key={tab.mode}
            onClick={() => handleModeChange(tab.mode)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-[7px] rounded-[8px] text-[12px] font-medium transition-all",
              mode === tab.mode ? "bg-white shadow-sm" : "hover:bg-black/[0.03] hover:-translate-y-px"
            )}
            style={{
              border: mode === tab.mode ? `1.5px solid ${tab.color}` : "1.5px solid transparent",
              color: mode === tab.mode ? tab.color : "#A8A29E",
              fontWeight: mode === tab.mode ? 600 : 500,
            }}
          >
            <div className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center text-white shrink-0" style={{ background: tab.color }}>
              {tab.icon}
            </div>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Draft intensity */}
      {mode === "draft" && (
        <div className="flex items-center gap-1 px-4 pb-2 shrink-0">
          <span className="text-[10px] mr-1" style={{ color: "#A8A29E" }}>Intensity:</span>
          {(["focus", "collaborate", "accelerate"] as Intensity[]).map((level) => (
            <button
              key={level}
              onClick={() => setIntensity(level)}
              className="px-2 py-0.5 rounded text-[10px] font-medium transition-colors"
              style={{
                background: intensity === level ? "rgba(8,145,178,0.08)" : "transparent",
                color: intensity === level ? "#0891B2" : "#A8A29E",
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="mx-3" style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "thin" }}>
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-10 h-10 rounded-[10px] overflow-hidden shadow-sm mx-auto mb-3">
              <Image src="/buddy-icon.png" alt="Buddy" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <p className="text-[13px]" style={{ color: "#78716C" }}>
              {mode === "ask" && "Ask me anything about your research."}
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
              msg.role === "user" ? "ml-auto rounded-[12px] rounded-br-[4px]" : "rounded-[12px] rounded-bl-[4px]"
            )}
            style={{
              background: msg.role === "user" ? activeTab.color : "rgba(0,0,0,0.03)",
              color: msg.role === "user" ? "#fff" : "#1C1917",
            }}
          >
            {msg.content || (isLoading && msg.role === "assistant" ? (
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#A8A29E" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#A8A29E", animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#A8A29E", animationDelay: "300ms" }} />
              </span>
            ) : "")}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 shrink-0" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Buddy anything..."
            className="flex-1 px-3 py-2 rounded-[8px] text-[13px] outline-none"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", color: "#1C1917" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = activeTab.color; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center transition-all shrink-0"
            style={{
              background: input.trim() && !isLoading ? activeTab.color : "rgba(0,0,0,0.04)",
              color: input.trim() && !isLoading ? "#fff" : "#D4D4D4",
            }}
          >
            <PaperPlaneRight size={14} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
