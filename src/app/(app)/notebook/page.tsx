"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  FileText,
  LinkSimple,
  PaperPlaneRight,
  Paperclip,
  X,
  Sparkle,
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { getUserPapers, savePaper } from "@/lib/actions/papers";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface SourceFile {
  id: string;
  name: string;
  size: string;
  selected: boolean;
  paperId?: number; // Real DB paper ID for RAG
  status?: "ready" | "processing" | "error";
}

const suggestions = [
  "Summarize Key Themes",
  "Find Contradictions",
  "Compare Methodologies",
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export default function NotebookPage() {
  const [files, setFiles] = useState<SourceFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const conversationIdRef = useRef<number | null>(null);

  // Load user's papers from library on mount
  useEffect(() => {
    getUserPapers()
      .then((papers) => {
        const sources: SourceFile[] = papers.map((p: { id: number; title: string }) => ({
          id: `paper_${p.id}`,
          name: p.title,
          size: "Library",
          selected: true,
          paperId: p.id,
          status: "ready" as const,
        }));
        setFiles(sources);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;
    const userMsg: ChatMessage = { id: `msg_${Date.now()}`, role: "user", content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Create conversation on first message
      if (!conversationIdRef.current) {
        const convo = await createConversation({ mode: "notebook", title: msg.slice(0, 80) });
        conversationIdRef.current = convo.id;
      }

      // Persist user message
      addMessage({ conversation_id: conversationIdRef.current, role: "user", content: msg }).catch(() => {});

      // Collect paper IDs from selected sources for RAG retrieval
      const selectedPaperIds = files
        .filter((f) => f.selected && f.paperId)
        .map((f) => f.paperId as number);

      const res = await fetch(selectedPaperIds.length > 0 ? "/api/rag-chat" : "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          mode: "notebook",
          ...(selectedPaperIds.length > 0 ? { paperIds: selectedPaperIds } : {}),
        }),
      });

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { id: `err_${Date.now()}`, role: "assistant", content: "Unable to connect to AI. Please configure ANTHROPIC_API_KEY." },
        ]);
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) { setIsLoading(false); return; }

      const assistantMsg: ChatMessage = { id: `msg_${Date.now() + 1}`, role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMsg.content += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: assistantMsg.content } : m)));
      }

      // Persist assistant response
      if (conversationIdRef.current && assistantMsg.content) {
        addMessage({ conversation_id: conversationIdRef.current, role: "assistant", content: assistantMsg.content }).catch(() => {});
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `err_${Date.now()}`, role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    for (const file of Array.from(fileList)) {
      const tempId = `upload_${Date.now()}_${Math.random()}`;
      const newFile: SourceFile = {
        id: tempId,
        name: file.name,
        size: formatFileSize(file.size),
        selected: true,
        status: "processing",
      };
      setFiles((prev) => [...prev, newFile]);

      try {
        // Extract PDF text
        const formData = new FormData();
        formData.append("file", file);
        const extractRes = await fetch("/api/extract-pdf", { method: "POST", body: formData });
        const extractData = await extractRes.json();

        if (!extractRes.ok) {
          setFiles((prev) => prev.map((f) => f.id === tempId ? { ...f, status: "error" } : f));
          continue;
        }

        // Save as a paper in the library (returns paper ID directly)
        const paperId = await savePaper({
          title: extractData.info?.title || file.name.replace(/\.pdf$/i, ""),
          authors: extractData.info?.author ? [extractData.info.author] : [],
          source: "user_upload",
        });

        // Update file entry with real paper ID
        setFiles((prev) =>
          prev.map((f) =>
            f.id === tempId
              ? { ...f, paperId, status: "ready", size: `${extractData.pages} pages` }
              : f
          )
        );

        // Store raw PDF for later viewing
        const pdfFormData = new FormData();
        pdfFormData.append("file", file);
        fetch(`/api/papers/${paperId}/pdf`, {
          method: "POST",
          body: pdfFormData,
        }).catch(() => {});

        // Trigger embedding generation in background
        fetch("/api/embed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paperId }),
        }).catch(() => {});
      } catch {
        setFiles((prev) => prev.map((f) => f.id === tempId ? { ...f, status: "error" } : f));
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const addUrl = () => {
    if (!urlValue.trim()) return;
    setFiles((prev) => [
      ...prev,
      { id: `url_${Date.now()}`, name: urlValue.trim(), size: "URL", selected: true },
    ]);
    setUrlValue("");
    setShowUrlInput(false);
  };

  const selectedCount = files.filter((f) => f.selected).length;

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Sources Sidebar */}
      <aside className="w-80 shrink-0 glass-panel rounded-2xl p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/dashboard" className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-ink text-sm">Notebook Sources</h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-raised text-xs text-ink-muted">{files.length}</span>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-4 text-center mb-3 hover:border-brand/40 transition-colors"
        >
          <p className="text-xs text-ink-muted">Drag files here or click to upload</p>
          <p className="text-[10px] text-ink-muted mt-1">.pdf, .txt, .md</p>
        </button>
        <input ref={fileInputRef} type="file" accept=".pdf,.txt,.md" multiple className="hidden" onChange={handleFileUpload} />

        <div className="flex-1 overflow-y-auto space-y-1.5">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-raised/50 group transition-colors">
              <input
                type="checkbox"
                checked={file.selected}
                onChange={() => setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, selected: !f.selected } : f)))}
                className="rounded border-border accent-brand"
              />
              <FileText size={16} className={cn("shrink-0", file.status === "error" ? "text-red-400" : file.status === "processing" ? "text-amber-400 animate-pulse" : "text-ink-muted")} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ink truncate">{file.name}</p>
                <p className="text-[10px] text-ink-muted">
                  {file.status === "processing" ? "Processing..." : file.status === "error" ? "Failed" : file.size}
                </p>
              </div>
              <button
                onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
                className="p-1 rounded text-ink-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border-subtle">
          {showUrlInput ? (
            <div className="flex gap-2">
              <input
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && addUrl()}
                autoFocus
              />
              <button onClick={addUrl} className="text-xs text-brand font-medium">Add</button>
            </div>
          ) : (
            <button onClick={() => setShowUrlInput(true)} className="flex items-center gap-2 text-xs text-ink-muted hover:text-ink transition-colors">
              <LinkSimple size={14} />
              Add Link / URL
            </button>
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-lg font-semibold text-ink mb-4">Notebook Chat</h2>

        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.length === 0 && (
            <GlassPanel className="p-6 text-center">
              <p className="text-sm text-ink mb-4">
                Ready to analyze {selectedCount} source{selectedCount !== 1 ? "s" : ""}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand/10 text-brand hover:bg-brand/20 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </GlassPanel>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkle size={14} className="text-brand" />
                </div>
              )}
              <div className={cn("max-w-[75%] px-4 py-3 rounded-2xl text-sm", msg.role === "user" ? "bg-surface-raised text-ink" : "bg-brand/5 text-ink")}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                <Sparkle size={14} className="text-brand animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-brand/5">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand/40 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-brand/40 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-brand/40 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="mt-4">
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-surface border border-border">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-ink-muted hover:text-ink transition-colors">
              <Paperclip size={18} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your sources..."
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="p-2 rounded-xl bg-brand text-white hover:bg-brand-hover transition-colors disabled:opacity-50">
              <PaperPlaneRight size={18} />
            </button>
          </div>
          <p className="text-[10px] text-ink-muted text-center mt-2">AI can make mistakes. Check important info.</p>
        </form>
      </div>
    </div>
  );
}
