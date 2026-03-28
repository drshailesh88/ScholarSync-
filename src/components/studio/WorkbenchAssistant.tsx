"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaperPlaneRight, CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { useWorkbenchStore } from "@/stores/workbench-store";
import { useReferenceStore } from "@/stores/reference-store";
import { getUserPapers } from "@/lib/actions/papers";

type Mode = "ask" | "draft" | "learn";
type Intensity = "focus" | "collaborate" | "accelerate";
type Scope = "open" | "papers" | "library";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Provenance: how many papers grounded the response */
  groundedIn?: number;
  /** Provenance: scope used for this response */
  responseScope?: Scope;
  /** Whether RAG found no support */
  noSupport?: boolean;
}

const modeTabs: { mode: Mode; label: string }[] = [
  { mode: "ask", label: "Ask" },
  { mode: "draft", label: "Draft" },
  { mode: "learn", label: "Learn" },
];

const scopeLabels: Record<Scope, string> = {
  open: "Open",
  papers: "Papers",
  library: "Library",
};

const scopeDescriptions: Record<Scope, string> = {
  open: "General research assistant",
  papers: "Cited papers in this document",
  library: "All imported papers",
};

/** Extract numeric paper IDs from reference store (refs created via paperToReference have id = "ref-paper-{id}") */
function extractPaperIds(references: Map<string, unknown>): number[] {
  const ids: number[] = [];
  for (const refId of references.keys()) {
    const match = refId.match(/^ref-paper-(\d+)$/);
    if (match) {
      ids.push(Number(match[1]));
    }
  }
  return ids;
}

export function WorkbenchAssistant() {
  const mode = useWorkbenchStore((s) => s.activeAssistantMode);
  const pendingPrompt = useWorkbenchStore((s) => s.pendingPrompt);
  const clearPendingPrompt = useWorkbenchStore((s) => s.clearPendingPrompt);
  const setActiveAssistantMode = useWorkbenchStore(
    (s) => s.setActiveAssistantMode
  );
  const references = useReferenceStore((s) => s.references);
  const [intensity, setIntensity] = useState<Intensity>("collaborate");
  const [scope, setScope] = useState<Scope>("open");
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<number | null>(null);
  const previousModeRef = useRef<Mode>(mode);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (scopeRef.current && !scopeRef.current.contains(e.target as Node)) {
        setShowScopeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (previousModeRef.current === mode) return;

    previousModeRef.current = mode;
    conversationIdRef.current = null;
    setMessages([]);
    setInput("");
  }, [mode]);

  useEffect(() => {
    if (!pendingPrompt) return;

    setInput(pendingPrompt);
    clearPendingPrompt();

    setTimeout(() => {
      const form = document.querySelector('[aria-label="Send message"]');
      if (form instanceof HTMLButtonElement) form.click();
    }, 50);
  }, [pendingPrompt, clearPendingPrompt]);

  /** Resolve paper IDs based on current scope */
  const resolvePaperIds = useCallback(async (): Promise<number[]> => {
    if (scope === "papers") {
      return extractPaperIds(references);
    }
    if (scope === "library") {
      try {
        const allPapers = await getUserPapers();
        return allPapers.map((p) => p.id);
      } catch {
        return [];
      }
    }
    return [];
  }, [scope, references]);

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

    const currentScope = scope;

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

      let res: Response;

      if (currentScope === "open") {
        // Open scope — use /api/chat as before
        const apiMode = mode === "learn" ? "learn" : "draft";
        const domainId =
          typeof window !== "undefined"
            ? (new URLSearchParams(window.location.search).get("domain") ?? undefined)
            : undefined;
        res = await fetch("/api/chat", {
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
                    domainId,
                  },
                }
              : {}),
          }),
        });
      } else {
        // Papers or Library scope — use /api/rag-chat
        const paperIds = await resolvePaperIds();

        if (paperIds.length === 0) {
          // No papers available for this scope
          setMessages((prev) => [
            ...prev,
            {
              id: `err_${Date.now()}`,
              role: "assistant",
              content:
                currentScope === "papers"
                  ? "No cited papers found in this document. Add citations first, or switch to Library or Open scope."
                  : "No papers found in your library. Import papers first, or switch to Open scope.",
              noSupport: true,
              responseScope: currentScope,
            },
          ]);
          setIsLoading(false);
          return;
        }

        res = await fetch("/api/rag-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
            paperIds,
            mode: mode === "learn" ? "learn" : "notebook",
          }),
        });
      }

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

      // Parse provenance from RAG response headers
      let groundedCount = 0;
      if (currentScope !== "open") {
        try {
          const coverageHeader = res.headers.get("X-RAG-Coverage");
          if (coverageHeader) {
            const coverage = JSON.parse(coverageHeader);
            groundedCount = coverage.papersUsed ?? 0;
          }
        } catch {
          // Coverage header parsing failed — not critical
        }
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
        responseScope: currentScope,
        groundedIn: currentScope !== "open" ? groundedCount : undefined,
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

      // Check if RAG returned empty/no-support response
      if (currentScope !== "open" && groundedCount === 0 && fullText) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            noSupport: true,
          };
          return updated;
        });
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
  }, [input, intensity, isLoading, messages, mode, scope, resolvePaperIds]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const placeholders: Record<Mode, Record<Scope, string>> = {
    ask: {
      open: "Ask anything...",
      papers: "Ask about your cited papers...",
      library: "Search across your library...",
    },
    draft: {
      open: "Draft freely...",
      papers: "Draft from your cited papers...",
      library: "Draft from your library...",
    },
    learn: {
      open: "Explain a concept...",
      papers: "Teach from your cited papers...",
      library: "Explain using your library...",
    },
  };

  const emptyStates: Record<Mode, Record<Scope, string>> = {
    ask: {
      open: "Ask anything about your research.",
      papers: "Ask questions answered from your cited papers.",
      library: "Ask questions across your entire library.",
    },
    draft: {
      open: "I'll help you write. What are you working on?",
      papers: "I'll draft grounded in your cited papers.",
      library: "I'll draft using your full library.",
    },
    learn: {
      open: "Let's explore a topic together.",
      papers: "Let's learn from your cited papers.",
      library: "Let's explore using your full library.",
    },
  };

  /** Provenance badge for assistant messages */
  const ProvenanceBadge = ({ msg }: { msg: ChatMessage }) => {
    if (msg.role !== "assistant") return null;
    if (!msg.responseScope) return null;

    if (msg.responseScope === "open") {
      return (
        <span className="mb-1 inline-block text-[10px] text-ink/40">
          Open response
        </span>
      );
    }

    if (msg.noSupport) {
      return (
        <div className="mb-1.5">
          <span className="inline-block text-[10px] text-amber-600 dark:text-amber-400">
            No support found in {msg.responseScope === "papers" ? "cited papers" : "library"}
          </span>
          <div className="mt-1 flex gap-1.5">
            {msg.responseScope === "papers" && (
              <button
                onClick={() => setScope("library")}
                className="rounded-md bg-surface-raised px-2 py-0.5 text-[10px] text-ink/60 transition-colors hover:text-ink"
              >
                Search library
              </button>
            )}
            <button
              onClick={() => setScope("open")}
              className="rounded-md bg-surface-raised px-2 py-0.5 text-[10px] text-ink/60 transition-colors hover:text-ink"
            >
              Answer openly
            </button>
          </div>
        </div>
      );
    }

    if (msg.groundedIn && msg.groundedIn > 0) {
      return (
        <span className="mb-1 inline-block text-[10px] text-emerald-600 dark:text-emerald-400">
          Grounded in {msg.groundedIn} {msg.groundedIn === 1 ? "paper" : "papers"}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Mode tabs */}
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

      {/* Scope pill */}
      <div className="shrink-0 px-3 py-2" ref={scopeRef}>
        <div className="relative inline-block">
          <button
            onClick={() => setShowScopeDropdown((v) => !v)}
            className="flex items-center gap-1.5 rounded-full bg-surface-raised px-2.5 py-1 text-[11px] text-ink/60 transition-colors hover:text-ink/80"
          >
            <span className="text-ink/40">Using:</span>
            <span className="font-medium text-ink/70">{scopeLabels[scope]}</span>
            <CaretDown size={10} className="text-ink/40" />
          </button>
          {showScopeDropdown && (
            <div className="absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-border bg-surface py-1.5 shadow-lg">
              {(["open", "papers", "library"] as Scope[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setScope(s);
                    setShowScopeDropdown(false);
                  }}
                  className={cn(
                    "flex w-full flex-col px-3 py-2 text-left transition-colors hover:bg-surface-raised",
                    scope === s && "bg-surface-raised"
                  )}
                >
                  <span className={cn(
                    "text-xs font-medium",
                    scope === s ? "text-ink" : "text-ink/70"
                  )}>
                    {scopeLabels[s]}
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    {scopeDescriptions[s]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conversation area */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-ink-muted">
              {emptyStates[mode][scope]}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === "assistant" && <ProvenanceBadge msg={msg} />}
            <div
              className={cn(
                "max-w-[88%] px-3.5 py-2.5 text-[13px] leading-relaxed",
                msg.role === "user"
                  ? "ml-auto rounded-[12px] rounded-br-[4px] bg-brand text-white"
                  : "rounded-[12px] rounded-bl-[4px] bg-black/[0.03] dark:bg-white/[0.06] text-ink"
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
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer area */}
      <div className="shrink-0 border-t border-border-subtle">
        {/* Intensity — Draft mode only */}
        {mode === "draft" && (
          <div className="flex items-center gap-1 px-3 pt-2">
            {(["focus", "collaborate", "accelerate"] as Intensity[]).map(
              (level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] transition-colors",
                    intensity === level
                      ? "bg-black/[0.06] text-ink font-medium"
                      : "text-ink/40 hover:text-ink/70"
                  )}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              )
            )}
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[mode][scope]}
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
    </div>
  );
}
