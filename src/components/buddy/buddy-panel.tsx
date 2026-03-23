"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, PaperPlaneRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createConversation, addMessage } from "@/lib/actions/conversations";

// Types
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type BuddyMode = "chat" | "draft" | "learn";
type DraftIntensity = "focus" | "collaborate" | "accelerate";

// Mode tab config
const modeTabs: { mode: BuddyMode; label: string; color: string; borderColor: string; bgTint: string; icon: React.ReactNode }[] = [
  {
    mode: "chat",
    label: "Chat",
    color: "#6D28D9",
    borderColor: "#6D28D9",
    bgTint: "",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
        <path d="M3 4h10v7H6.5L3 14V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    mode: "draft",
    label: "Draft",
    color: "#0891B2",
    borderColor: "#0891B2",
    bgTint: "#F0FDFA",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
        <path d="M11 2l3 3-8.5 8.5H2.5v-3L11 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    mode: "learn",
    label: "Learn",
    color: "#15803D",
    borderColor: "#15803D",
    bgTint: "#F0FDF4",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
        <path d="M8 2.5C6.5 2.5 5 4 5 6c0 1.5 1 2.2 1.5 2.8.4.5.5 1 .5 1.7h2c0-.7.1-1.2.5-1.7C10 8.2 11 7.5 11 6c0-2-1.5-3.5-3-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6.5 12.5h3M7 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Gear icon SVG
const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z" />
  </svg>
);

interface BuddyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
}

export function BuddyFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[200] w-[52px] h-[52px] rounded-full shadow-lg hover:shadow-xl hover:scale-[1.08] transition-all overflow-hidden cursor-pointer"
      title="Open Buddy"
    >
      <Image src="/buddy-icon.png" alt="Buddy" width={52} height={52} className="w-full h-full object-cover" />
    </button>
  );
}

export function BuddyPanel({ isOpen, onClose, width = 360 }: BuddyPanelProps) {
  const [mode, setMode] = useState<BuddyMode>("chat");
  const [intensity, setIntensity] = useState<DraftIntensity>("collaborate");
  const [gearOpen, setGearOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<number | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close gear when clicking outside
  useEffect(() => {
    const handler = () => setGearOpen(false);
    if (gearOpen) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [gearOpen]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: `msg_${Date.now()}`, role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Create conversation if first message
      if (!conversationIdRef.current) {
        const apiMode = mode === "chat" ? "draft" : mode;
        const convo = await createConversation({ mode: apiMode as "draft" | "learn", title: input.trim().slice(0, 80) });
        conversationIdRef.current = convo.id;
      }

      // Persist user message
      addMessage({ conversation_id: conversationIdRef.current, role: "user", content: input.trim() }).catch(() => {});

      // Determine API mode
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

      // Stream the response
      const reader = res.body?.getReader();
      if (!reader) {
        setIsLoading(false);
        return;
      }

      const assistantMsg: ChatMessage = { id: `msg_${Date.now() + 1}`, role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Handle Vercel AI SDK streaming format
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
            } catch {
              // Skip non-JSON lines
            }
          }
        }
      }

      // Persist assistant message
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

  const activeTab = modeTabs.find((t) => t.mode === mode)!;

  if (!isOpen) return null;

  return (
    <div
      className="shrink-0 flex flex-col border-l h-screen transition-colors duration-300"
      style={{
        width,
        borderColor: "var(--border-color, #e2e8f0)",
        background: activeTab.bgTint || "var(--surface, #fff)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 relative">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] overflow-hidden shadow-sm">
            <Image src="/buddy-icon.png" alt="Buddy" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white">
            Buddy
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); setGearOpen(!gearOpen); }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
            title="Settings"
          >
            <span className={cn("transition-transform", gearOpen && "animate-spin")} style={{ animationDuration: "2s" }}>
              <GearIcon />
            </span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Gear popover */}
        {gearOpen && (
          <div
            className="absolute right-4 top-14 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg w-[240px] p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Intensity</div>
            {(["focus", "collaborate", "accelerate"] as DraftIntensity[]).map((level) => (
              <button
                key={level}
                onClick={() => { setIntensity(level); setGearOpen(false); }}
                className="flex items-start gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className={cn(
                  "w-3.5 h-3.5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0",
                  intensity === level ? "border-violet-600" : "border-gray-300 dark:border-gray-600"
                )}>
                  {intensity === level && <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />}
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-medium text-gray-900 dark:text-white capitalize">{level}</div>
                  <div className="text-[11px] text-gray-400 leading-tight">
                    {level === "focus" && "Responds only when asked"}
                    {level === "collaborate" && "Balanced suggestions and feedback"}
                    {level === "accelerate" && "Proactive rewrites and comprehensive feedback"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mode tabs — Superhuman card style */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-gray-200 dark:border-white/10">
        {modeTabs.map((tab) => (
          <button
            key={tab.mode}
            onClick={() => { setMode(tab.mode); conversationIdRef.current = null; setMessages([]); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] text-[13px] font-medium transition-all border-[1.5px]",
              mode === tab.mode
                ? "bg-white dark:bg-slate-800 shadow-sm"
                : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-white/5 hover:-translate-y-px"
            )}
            style={{
              borderColor: mode === tab.mode ? tab.borderColor : "transparent",
              color: mode === tab.mode ? tab.color : undefined,
              fontWeight: mode === tab.mode ? 600 : 500,
            }}
          >
            <div
              className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center text-white shrink-0 transition-transform"
              style={{ background: tab.color }}
            >
              {tab.icon}
            </div>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "thin" }}>
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">
            {mode === "chat" && "Ask me anything."}
            {mode === "draft" && "I'll help you write. What are you working on?"}
            {mode === "learn" && "Let's explore a topic together. What do you want to understand?"}
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[85%] px-3.5 py-2.5 rounded-lg text-[13px] leading-relaxed",
              msg.role === "user"
                ? "ml-auto bg-violet-600 text-white"
                : "bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-gray-100"
            )}
          >
            {msg.content || (isLoading && msg.role === "assistant" ? (
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            ) : "")}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Buddy anything..."
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 text-[13px] text-gray-900 dark:text-white outline-none focus:border-violet-500 placeholder:text-gray-400"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0",
            input.trim() && !isLoading
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : "bg-gray-100 dark:bg-white/5 text-gray-300"
          )}
        >
          <PaperPlaneRight size={16} weight="fill" />
        </button>
      </div>
    </div>
  );
}
