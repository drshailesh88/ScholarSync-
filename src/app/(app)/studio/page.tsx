"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FilePdf,
  GlobeSimple,
  Plus,
  PaperPlaneRight,
  GlobeHemisphereWest,
  Books,
  MagnifyingGlass,
  ShieldCheck,
  Sparkle,
  DownloadSimple,
  FileDoc,
  Check,
  CircleNotch,
  CloudCheck,
  Warning,
  CaretDown,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { CircularGauge } from "@/components/ui/circular-gauge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { getUserUsageStats } from "@/lib/actions/user";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { useStudioDocument, type SaveStatus } from "@/hooks/use-studio-document";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const citedSources = [
  { type: "pdf" as const, title: "CRISPR-Cas9 Gene Editing for Sickle Cell...", author: "Frangoul, H." },
  { type: "web" as const, title: "Base editing: precision chemistry on the...", author: "Rees, H.A." },
  { type: "pdf" as const, title: "Prime editing: A new era of precise genome...", author: "Anzalone, A.V." },
];

const aiPanelTabs = [
  { key: "chat", label: "Chat & Learn" },
  { key: "research", label: "Research" },
  { key: "checks", label: "Checks" },
];

export default function StudioPage() {
  return (
    <Suspense>
      <StudioContent />
    </Suspense>
  );
}

// ---------------------------------------------------------------------------
// Save Status Indicator
// ---------------------------------------------------------------------------
function SaveIndicator({
  status,
  lastSavedAt,
}: {
  status: SaveStatus;
  lastSavedAt: Date | null;
}) {
  switch (status) {
    case "saving":
      return (
        <span className="flex items-center gap-1 text-[10px] text-ink-muted">
          <CircleNotch size={12} className="text-brand animate-spin" />
          Saving...
        </span>
      );
    case "saved":
      return (
        <span className="flex items-center gap-1 text-[10px] text-ink-muted">
          <CloudCheck size={12} className="text-emerald-500" />
          Saved{" "}
          {lastSavedAt
            ? lastSavedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </span>
      );
    case "unsaved":
      return (
        <span className="flex items-center gap-1 text-[10px] text-amber-400">
          <CircleNotch size={12} />
          Unsaved changes
        </span>
      );
    case "error":
      return (
        <span className="flex items-center gap-1 text-[10px] text-red-400">
          <Warning size={12} />
          Save failed
        </span>
      );
    default:
      // idle / first load -- show last saved if available, otherwise nothing
      if (lastSavedAt) {
        return (
          <span className="flex items-center gap-1 text-[10px] text-ink-muted">
            <Check size={12} className="text-emerald-500" />
            Saved{" "}
            {lastSavedAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      }
      return <span />;
  }
}

// ---------------------------------------------------------------------------
// Project Selector Dropdown
// ---------------------------------------------------------------------------
function ProjectSelector({
  projects,
  selectedId,
  onSelect,
}: {
  projects: { id: number; title: string }[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = projects.find((p) => p.id === selectedId);

  if (projects.length <= 1) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-ink-muted hover:text-ink bg-surface-raised/50 hover:bg-surface-raised border border-border-subtle transition-colors max-w-[180px]"
      >
        <span className="truncate">{selected?.title ?? "Select project"}</span>
        <CaretDown size={10} className="shrink-0" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 rounded-lg glass-panel border border-border shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelect(p.id);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-xs transition-colors",
                p.id === selectedId
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-ink hover:bg-surface-raised"
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Studio Content
// ---------------------------------------------------------------------------
function StudioContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("projectId");
  const initialProjectId = projectParam ? Number(projectParam) : null;

  const [isLearnMode, setIsLearnMode] = useState(searchParams.get("mode") === "learn");
  const [aiTab, setAiTab] = useState("chat");
  const [researchQuery, setResearchQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [usageStats, setUsageStats] = useState<{ tokens_used: number; tokens_limit: number } | null>(null);
  const [showExport, setShowExport] = useState(false);
  const conversationIdRef = useRef<number | null>(null);

  // -----------------------------------------------------------------------
  // Real DB persistence via hook
  // -----------------------------------------------------------------------
  const {
    document: studioDoc,
    initialContent,
    docTitle,
    setDocTitle,
    saveStatus,
    lastSavedAt,
    isLoading: docLoading,
    error: docError,
    handleEditorUpdate,
    projects: userProjects,
    selectedProjectId,
    selectProject,
  } = useStudioDocument(initialProjectId);

  useEffect(() => {
    getUserUsageStats().then((stats) => {
      if (stats) setUsageStats({ tokens_used: stats.tokens_used ?? 0, tokens_limit: stats.tokens_limit ?? 50000 });
    }).catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle slash command AI events from the editor
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { action: string; context?: string };
      if (!detail?.action) return;

      let prompt = "";
      switch (detail.action) {
        case "continue":
          prompt = `Continue writing from where the user left off. Here is the current text:\n\n${detail.context || ""}`;
          break;
        case "summarize":
          prompt = `Summarize the following text concisely:\n\n${detail.context || ""}`;
          break;
        case "find-sources":
          prompt = `Find and suggest relevant academic sources for the following text:\n\n${detail.context || ""}`;
          break;
        case "cite":
          prompt = "Help me add a citation from my library. What paper should I cite here?";
          break;
        case "integrity-check":
          prompt = `Analyze the following text for potential integrity issues (AI-generated content, plagiarism risks, citation gaps):\n\n${detail.context || ""}`;
          break;
        default:
          return;
      }

      setInput(prompt);
      setAiTab("chat");
      // Auto-send after a tick
      setTimeout(() => {
        setInput(prompt);
        const form = document.querySelector<HTMLFormElement>("form");
        form?.requestSubmit();
      }, 100);
    };

    window.addEventListener("scholarsync:ai-action", handler);
    return () => window.removeEventListener("scholarsync:ai-action", handler);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: `msg_${Date.now()}`, role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setChatError(null);

    try {
      // Create conversation on first message
      if (!conversationIdRef.current) {
        const mode = isLearnMode ? "learn" : ("chat" as const);
        const convo = await createConversation({ mode, title: input.trim().slice(0, 80) });
        conversationIdRef.current = convo.id;
      }

      // Persist user message
      addMessage({ conversation_id: conversationIdRef.current, role: "user", content: input.trim() }).catch(() => {});

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          mode: isLearnMode ? "learn" : "write",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Chat failed" }));
        setChatError(data.error || "Chat failed");
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setChatError("No response stream");
        setIsLoading(false);
        return;
      }

      const assistantMsg: ChatMessage = { id: `msg_${Date.now() + 1}`, role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        assistantMsg.content += text;
        setMessages((prev) => prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: assistantMsg.content } : m)));
      }

      // Persist assistant response
      if (conversationIdRef.current && assistantMsg.content) {
        addMessage({ conversation_id: conversationIdRef.current, role: "assistant", content: assistantMsg.content }).catch(() => {});
      }
    } catch {
      setChatError("Failed to send message. Check your API key.");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, isLearnMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Mark status as unsaved immediately on keystroke (before debounce fires)
  const handleDirty = useCallback(() => {
    // The hook's handleEditorUpdate will transition to "saving" once the debounce fires.
    // We want to show "unsaved" right away on keystroke.
    // We achieve this through the hook -- but as a lightweight approach, we don't
    // need extra state here: the hook already transitions idle -> saving -> saved.
    // The onDirty callback gives us a chance to set unsaved if needed.
  }, []);

  const getEditorContent = (): string => {
    const el = document.querySelector(".ProseMirror");
    return el?.innerHTML ?? "";
  };

  const handleExportPDF = async () => {
    setShowExport(false);
    const content = getEditorContent();
    if (!content) return;

    try {
      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: docTitle, content }),
      });

      if (!res.ok) return;

      const html = await res.text();
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(html);
        newWindow.document.close();
      }
    } catch (err) {
      console.error("PDF export failed:", err);
    }
  };

  const handleExportDocx = async () => {
    setShowExport(false);
    const content = getEditorContent();
    if (!content) return;

    try {
      const res = await fetch("/api/export/docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: docTitle, content }),
      });

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, "_")}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("DOCX export failed:", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 -mt-0">
      {/* Left Sidebar */}
      <aside className="w-64 shrink-0 glass-panel border-r border-border flex flex-col">
        <div className="px-4 py-4 border-b border-border-subtle">
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="w-full text-sm font-semibold text-ink bg-transparent focus:outline-none"
          />
          <div className="flex mt-3 p-0.5 bg-surface-raised rounded-lg">
            <button
              onClick={() => setIsLearnMode(false)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-xs font-medium transition-all",
                !isLearnMode ? "bg-brand text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              Write
            </button>
            <button
              onClick={() => setIsLearnMode(true)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-xs font-medium transition-all",
                isLearnMode ? "bg-emerald-500 text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              Learn
            </button>
          </div>

          {/* Project selector */}
          {userProjects.length > 1 && (
            <div className="mt-3">
              <ProjectSelector
                projects={userProjects}
                selectedId={selectedProjectId}
                onSelect={selectProject}
              />
            </div>
          )}
        </div>

        <nav className="px-3 py-3 space-y-0.5">
          <div className="px-3 py-2 rounded-lg bg-surface-raised text-ink text-sm font-medium">
            Current Draft
          </div>
          <Link href="/library" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-raised/50 transition-colors">
            <Books size={16} />
            My Library
          </Link>
          <Link href="/research" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-raised/50 transition-colors">
            <GlobeHemisphereWest size={16} />
            Deep Research
          </Link>
        </nav>

        <div className="px-4 py-3 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">Cited Sources</span>
            <button className="text-brand hover:text-brand-hover">
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {citedSources.map((src, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-surface-raised/50">
                {src.type === "pdf" ? (
                  <FilePdf size={14} className="text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <GlobeSimple size={14} className="text-sky-400 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="text-xs text-ink truncate">{src.title}</p>
                  <p className="text-[10px] text-ink-muted">{src.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto px-4 py-4 border-t border-border-subtle">
          <ProgressBar
            value={usageStats?.tokens_used ?? 0}
            max={usageStats?.tokens_limit ?? 50000}
            label="AI Credits"
            color="var(--brand)"
          />
        </div>
      </aside>

      {/* Center Editor */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {isLearnMode && (
          <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-center">
            <p className="text-xs font-medium text-emerald-500">
              Learn Mode — I won&apos;t write for you — I&apos;ll help you think
            </p>
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-surface">
          <SaveIndicator status={saveStatus} lastSavedAt={lastSavedAt} />
          <div className="relative">
            <button
              onClick={() => setShowExport((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border transition-colors"
            >
              <DownloadSimple size={14} />
              Export
            </button>
            {showExport && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg glass-panel border border-border shadow-lg z-50">
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised rounded-t-lg transition-colors"
                >
                  <FilePdf size={14} className="text-red-400" />
                  Export as PDF
                </button>
                <button
                  onClick={handleExportDocx}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised rounded-b-lg transition-colors"
                >
                  <FileDoc size={14} className="text-blue-400" />
                  Export as Word
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-surface">
          {docLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <CircleNotch size={28} className="text-brand animate-spin" />
                <p className="text-sm text-ink-muted">Loading document...</p>
              </div>
            </div>
          ) : docError ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-center px-8">
                <Warning size={28} className="text-red-400" />
                <p className="text-sm text-red-400">{docError}</p>
              </div>
            </div>
          ) : (
            <TiptapEditor
              className="max-w-3xl mx-auto"
              content={initialContent}
              contentKey={studioDoc?.id ?? null}
              onUpdate={handleEditorUpdate}
              onDirty={handleDirty}
              debounceMs={2000}
            />
          )}
        </div>
      </main>

      {/* Right AI Panel */}
      <aside className="w-80 shrink-0 glass-panel border-l border-border flex flex-col">
        <div className="px-4 py-3 border-b border-border-subtle">
          <Tabs tabs={aiPanelTabs} activeTab={aiTab} onChange={setAiTab} />
        </div>

        {aiTab === "chat" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {chatError && (
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs">
                  {chatError}
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
                    <p className="whitespace-pre-wrap text-xs leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
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
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border-subtle">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLearnMode ? "Ask me to challenge your thinking..." : "Ask your AI research assistant..."}
                  className="flex-1 px-3 py-2 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-xs focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-xl bg-brand text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
                >
                  <PaperPlaneRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {aiTab === "research" && (
          <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  placeholder="Search PubMed..."
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-xs focus:outline-none"
                />
              </div>
              <Link
                href={`/research${researchQuery ? `?q=${encodeURIComponent(researchQuery)}` : ""}`}
                className="px-3 py-2 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand-hover transition-colors"
              >
                Search
              </Link>
            </div>
            <div className="text-center py-8 text-xs text-ink-muted">
              Search for papers to add to your draft
            </div>
          </div>
        )}

        {aiTab === "checks" && (
          <div className="flex-1 px-4 py-3 space-y-4 overflow-y-auto">
            <div className="flex flex-col items-center py-4">
              <CircularGauge value={92} label="Human Score" size={100} />
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface-raised">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-xs font-medium text-ink">AI Detection</span>
                </div>
                <p className="text-xs text-ink-muted">92% human-written confidence</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-raised">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-amber-500" />
                  <span className="text-xs font-medium text-ink">Plagiarism</span>
                </div>
                <p className="text-xs text-ink-muted">2 matches found</p>
                <Link
                  href="/compliance"
                  className="text-xs text-brand hover:text-brand-hover mt-1 inline-block"
                >
                  Review Matches →
                </Link>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
