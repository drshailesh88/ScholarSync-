"use client";

import { useState, useRef, useEffect, useCallback, Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
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
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { CircularGauge } from "@/components/ui/circular-gauge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { CitationDialog } from "@/components/citations/citation-dialog";
import { ReferenceSidebar } from "@/components/citations/reference-sidebar";
import { useReferenceStore } from "@/stores/reference-store";
import { getUserUsageStats } from "@/lib/actions/user";
import { createConversation, addMessage } from "@/lib/actions/conversations";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

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

function StudioContent() {
  const searchParams = useSearchParams();
  const [isLearnMode, setIsLearnMode] = useState(searchParams.get("mode") === "learn");
  const [docTitle, setDocTitle] = useState("Untitled Document");
  const [aiTab, setAiTab] = useState("chat");
  const [researchQuery, setResearchQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [usageStats, setUsageStats] = useState<{ tokens_used: number; tokens_limit: number } | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const conversationIdRef = useRef<number | null>(null);
  const editorRef = useRef<Editor | null>(null);

  // Citation system state
  const citationDialogOpen = useReferenceStore((s) => s.citationDialogOpen);
  const openCitationDialog = useReferenceStore((s) => s.openCitationDialog);
  const closeCitationDialog = useReferenceStore((s) => s.closeCitationDialog);
  const sidebarOpen = useReferenceStore((s) => s.sidebarOpen);
  const toggleSidebar = useReferenceStore((s) => s.toggleSidebar);
  const setSidebarOpen = useReferenceStore((s) => s.setSidebarOpen);
  const references = useReferenceStore((s) => s.references);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);

  useEffect(() => {
    getUserUsageStats().then((stats) => {
      if (stats) setUsageStats({ tokens_used: stats.tokens_used ?? 0, tokens_limit: stats.tokens_limit ?? 50000 });
    }).catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for citation dialog open event (from keyboard shortcut + slash command)
  useEffect(() => {
    const handler = () => openCitationDialog();
    window.addEventListener("scholarsync:open-citation-dialog", handler);
    return () => window.removeEventListener("scholarsync:open-citation-dialog", handler);
  }, [openCitationDialog]);

  // Listen for Cmd+Shift+R to toggle reference sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "R") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

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
        case "integrity-check":
          prompt = `Analyze the following text for potential integrity issues (AI-generated content, plagiarism risks, citation gaps):\n\n${detail.context || ""}`;
          break;
        default:
          return;
      }

      setInput(prompt);
      setAiTab("chat");
      setTimeout(() => {
        setInput(prompt);
        const form = document.querySelector<HTMLFormElement>("form");
        form?.requestSubmit();
      }, 100);
    };

    window.addEventListener("scholarsync:ai-action", handler);
    return () => window.removeEventListener("scholarsync:ai-action", handler);
  }, []);

  // Handle citation insertion from the dialog
  const handleInsertCitation = useCallback((referenceIds: string[]) => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    // Insert citation node at current cursor position
    editor
      .chain()
      .focus()
      .insertContent({
        type: "citation",
        attrs: { referenceIds },
      })
      .run();

    // Ensure bibliography exists at end of document
    let hasBibliography = false;
    editor.state.doc.descendants((node) => {
      if (node.type.name === "bibliography") {
        hasBibliography = true;
        return false;
      }
    });

    if (!hasBibliography) {
      editor.commands.insertContentAt(editor.state.doc.content.size, {
        type: "bibliography",
      });
    }
  }, []);

  const handleEditorReady = useCallback((editor: Editor) => {
    editorRef.current = editor;
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
      if (!conversationIdRef.current) {
        const mode = isLearnMode ? "learn" : ("chat" as const);
        const convo = await createConversation({ mode, title: input.trim().slice(0, 80) });
        conversationIdRef.current = convo.id;
      }

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

  const handleEditorUpdate = useCallback(
    (data: { editor_content: Record<string, unknown>; plain_text_content: string; word_count: number }) => {
      try {
        localStorage.setItem(
          "scholarsync_studio_draft",
          JSON.stringify({
            content: data.editor_content,
            plainText: data.plain_text_content,
            wordCount: data.word_count,
            timestamp: Date.now(),
            title: docTitle,
          })
        );
        setLastSaved(new Date());
      } catch {
        // localStorage may be full or unavailable
      }
    },
    [docTitle]
  );

  const savedContent = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("scholarsync_studio_draft");
      if (saved) {
        const parsed = JSON.parse(saved) as { content: Record<string, unknown>; title?: string };
        return parsed.content;
      }
    } catch {
      // Ignore
    }
    return null;
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

  // Cited sources from reference store (replaces hardcoded list)
  const citedSourcesList = useMemo(() => {
    return Array.from(referenceNumberMap.entries())
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5)
      .map(([refId, num]) => {
        const ref = references.get(refId);
        return ref ? { num, title: ref.title, author: ref.authors[0]?.family || "Unknown" } : null;
      })
      .filter(Boolean) as { num: number; title: string; author: string }[];
  }, [referenceNumberMap, references]);

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

        <div className="px-4 py-3 border-t border-border-subtle flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">
              References ({references.size})
            </span>
            <button onClick={openCitationDialog} className="text-brand hover:text-brand-hover">
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {citedSourcesList.length > 0 ? (
              citedSourcesList.map((src) => (
                <div key={src.num} className="flex items-start gap-2 p-2 rounded-lg bg-surface-raised/50">
                  <span className="text-[10px] font-mono font-bold text-blue-500 shrink-0 mt-0.5">
                    [{src.num}]
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-ink truncate">{src.title}</p>
                    <p className="text-[10px] text-ink-muted">{src.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[10px] text-ink-muted text-center py-2">
                Use Cmd+Shift+C to add citations
              </p>
            )}
            {references.size > 5 && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-full text-[10px] text-brand hover:text-brand-hover py-1"
              >
                View all {references.size} references
              </button>
            )}
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
          {lastSaved ? (
            <span className="flex items-center gap-1 text-[10px] text-ink-muted">
              <Check size={12} className="text-emerald-500" />
              Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          ) : (
            <span />
          )}
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
          <TiptapEditor
            className="max-w-3xl mx-auto"
            content={savedContent}
            onUpdate={handleEditorUpdate}
            debounceMs={2000}
            onEditorReady={handleEditorReady}
            onOpenCitationDialog={openCitationDialog}
            onToggleReferenceSidebar={toggleSidebar}
            referenceCount={references.size}
          />
        </div>
      </main>

      {/* Right: AI Panel or Reference Sidebar */}
      {sidebarOpen ? (
        <ReferenceSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenCitationDialog={openCitationDialog}
        />
      ) : (
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
      )}

      {/* Citation Dialog (modal overlay) */}
      <CitationDialog
        open={citationDialogOpen}
        onClose={closeCitationDialog}
        onInsert={handleInsertCitation}
      />
    </div>
  );
}
