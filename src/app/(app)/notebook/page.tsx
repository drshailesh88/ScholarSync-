"use client";

import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import {
  ArrowLeft,
  FileText,
  LinkSimple,
  PaperPlaneRight,
  Paperclip,
  X,
  Sparkle,
  ArrowClockwise,
  BookOpen,
  CaretDown,
  CaretUp,
  Table,
  CheckCircle,
  CircleNotch,
  ShieldCheck,
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { getUserPapers, savePaper } from "@/lib/actions/papers";
import { getExtractionForPaper, verifyExtraction } from "@/lib/actions/extraction";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceMetadata[];
}

interface SourceMetadata {
  sourceIndex: number;
  paperId: number;
  paperTitle: string;
  paperAuthors: unknown[];
  pageNumber: number | null;
  sectionType: string | null;
  chunkId: number;
}

interface SourceFile {
  id: string;
  name: string;
  size: string;
  selected: boolean;
  paperId?: number;
  status?: "ready" | "processing" | "error" | "embed_failed";
  isExtracted?: boolean;
}

interface ExtractionData {
  id: number;
  population: string | null;
  intervention: string | null;
  comparison: string | null;
  outcome: string | null;
  sample_size: number | null;
  study_design: string | null;
  effect_size: string | null;
  p_value: string | null;
  confidence_interval: string | null;
  risk_of_bias: string | null;
  evidence_level: string | null;
  human_verified: boolean | null;
  custom_extractions: Record<string, string | undefined> | null;
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

function renderCitedText(
  text: string,
  sources: SourceMetadata[],
  onHighlight: (idx: number) => void
): React.ReactNode {
  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(\d+)\]/);
    if (match) {
      const sourceIdx = parseInt(match[1], 10);
      const source = sources[sourceIdx - 1];
      return (
        <button
          key={i}
          onClick={() => onHighlight(sourceIdx)}
          className="text-brand text-[10px] align-super font-medium hover:underline cursor-pointer"
          title={source?.paperTitle || `Source ${sourceIdx}`}
        >
          [{sourceIdx}]
        </button>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function ExtractionCard({
  extraction,
  onVerify,
}: {
  extraction: ExtractionData;
  onVerify: () => void;
}): React.ReactElement {
  const fields: { label: string; value: string | number | null | undefined }[] = [
    { label: "Population", value: extraction.population },
    { label: "Intervention", value: extraction.intervention },
    { label: "Comparison", value: extraction.comparison },
    { label: "Outcome", value: extraction.outcome },
    { label: "Sample Size", value: extraction.sample_size?.toLocaleString() },
    { label: "Study Design", value: extraction.study_design },
    { label: "Effect Size", value: extraction.effect_size },
    { label: "P-value", value: extraction.p_value },
    { label: "95% CI", value: extraction.confidence_interval },
    { label: "Risk of Bias", value: extraction.risk_of_bias },
    { label: "Evidence", value: extraction.evidence_level ? `Level ${extraction.evidence_level}` : null },
  ];

  const filledFields = fields.filter((f) => f.value);

  if (filledFields.length === 0) {
    return (
      <div className="px-3 py-2 text-xs text-ink-muted">
        No structured data could be extracted.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-semibold text-ink flex items-center gap-1.5">
          <Table size={14} className="text-brand" />
          Structured Extraction
        </h4>
        {extraction.human_verified ? (
          <span className="flex items-center gap-1 text-[10px] text-green-500 font-medium">
            <ShieldCheck size={12} />
            Verified
          </span>
        ) : (
          <button
            onClick={onVerify}
            className="flex items-center gap-1 text-[10px] text-ink-muted hover:text-brand transition-colors"
          >
            <CheckCircle size={12} />
            Verify
          </button>
        )}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        {filledFields.map((field) => (
          <Fragment key={field.label}>
            <span className="text-[11px] font-medium text-brand">{field.label}</span>
            <span className="text-[11px] text-ink">{field.value}</span>
          </Fragment>
        ))}
      </div>
      {extraction.custom_extractions?.key_findings && (
        <div className="pt-1 border-t border-border-subtle">
          <span className="text-[10px] font-medium text-ink-muted">Key Findings:</span>
          <p className="text-[11px] text-ink mt-0.5">{extraction.custom_extractions.key_findings}</p>
        </div>
      )}
      {extraction.custom_extractions?.limitations && (
        <div className="pt-1 border-t border-border-subtle">
          <span className="text-[10px] font-medium text-ink-muted">Limitations:</span>
          <p className="text-[11px] text-ink mt-0.5">{extraction.custom_extractions.limitations}</p>
        </div>
      )}
    </div>
  );
}

export default function NotebookPage(): React.ReactElement {
  const [files, setFiles] = useState<SourceFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [highlightedSource, setHighlightedSource] = useState<number | null>(null);
  const [showSourcesPanel, setShowSourcesPanel] = useState(false);
  const [currentSources, setCurrentSources] = useState<SourceMetadata[]>([]);
  const [extractingPapers, setExtractingPapers] = useState<Set<number>>(new Set());
  const [extractions, setExtractions] = useState<Map<number, ExtractionData>>(new Map());
  const [expandedExtraction, setExpandedExtraction] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const conversationIdRef = useRef<number | null>(null);

  // Load user's papers from library on mount
  useEffect(() => {
    getUserPapers()
      .then((papers) => {
        const sources: SourceFile[] = papers.map((p) => ({
          id: `paper_${p.id}`,
          name: p.title,
          size: "Library",
          selected: true,
          paperId: p.id,
          status: "ready" as const,
          isExtracted: !!p.is_extracted,
        }));
        setFiles(sources);

        // Load existing extractions for papers that have them
        for (const p of papers) {
          if (p.is_extracted) {
            getExtractionForPaper(p.id)
              .then((ext) => {
                if (ext) {
                  setExtractions((prev) => {
                    const next = new Map(prev);
                    next.set(p.id, ext as unknown as ExtractionData);
                    return next;
                  });
                }
              })
              .catch(() => {});
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleExtractFacts = useCallback(async (paperId: number) => {
    setExtractingPapers((prev) => new Set(prev).add(paperId));
    try {
      const res = await fetch("/api/extract-facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperId }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Extraction failed:", err);
        return;
      }

      const data = await res.json();

      // Fetch the full extraction record
      const extraction = await getExtractionForPaper(paperId);
      if (extraction) {
        setExtractions((prev) => {
          const next = new Map(prev);
          next.set(paperId, extraction as unknown as ExtractionData);
          return next;
        });
        setExpandedExtraction(paperId);
      }

      // Mark file as extracted
      setFiles((prev) =>
        prev.map((f) =>
          f.paperId === paperId ? { ...f, isExtracted: true } : f
        )
      );
    } catch (err) {
      console.error("Extract facts error:", err);
    } finally {
      setExtractingPapers((prev) => {
        const next = new Set(prev);
        next.delete(paperId);
        return next;
      });
    }
  }, []);

  const handleVerifyExtraction = useCallback(async (paperId: number, extractionId: number) => {
    try {
      await verifyExtraction(extractionId);
      setExtractions((prev) => {
        const next = new Map(prev);
        const existing = next.get(paperId);
        if (existing) {
          next.set(paperId, { ...existing, human_verified: true });
        }
        return next;
      });
    } catch (err) {
      console.error("Verify error:", err);
    }
  }, []);

  const retryEmbed = useCallback(async (paperId: number) => {
    const fileId = `paper_${paperId}`;
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "processing" } : f))
    );
    try {
      const embedRes = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperId }),
      });
      if (!embedRes.ok) {
        console.error("Embedding retry failed");
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, status: "embed_failed" } : f))
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, status: "ready" } : f))
        );
      }
    } catch {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "embed_failed" } : f))
      );
    }
  }, []);

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
          { id: `err_${Date.now()}`, role: "assistant", content: "Unable to connect to AI. Please check your AI provider API key configuration." },
        ]);
        setIsLoading(false);
        return;
      }

      // Parse source metadata from headers
      let sources: SourceMetadata[] = [];
      const sourcesHeader = res.headers.get("X-RAG-Sources");
      if (sourcesHeader) {
        try {
          sources = JSON.parse(sourcesHeader) as SourceMetadata[];
          setCurrentSources(sources);
          if (sources.length > 0) setShowSourcesPanel(true);
        } catch {
          // Ignore parse errors
        }
      }

      const reader = res.body?.getReader();
      if (!reader) { setIsLoading(false); return; }

      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: "assistant",
        content: "",
        sources,
      };
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
  }, [input, isLoading, messages, files]);

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

        // Save as a paper in the library
        const paperId = await savePaper({
          title: extractData.info?.title || file.name.replace(/\.pdf$/i, ""),
          authors: extractData.info?.author ? [extractData.info.author] : [],
          source: "user_upload",
        });

        // Update file entry with real paper ID
        setFiles((prev) =>
          prev.map((f) =>
            f.id === tempId
              ? { ...f, paperId, status: "processing", size: `${extractData.pages} pages` }
              : f
          )
        );

        // Store raw PDF for later viewing
        const pdfFormData = new FormData();
        pdfFormData.append("file", file);
        fetch(`/api/papers/${paperId}/pdf`, {
          method: "POST",
          body: pdfFormData,
        }).catch((err) => console.error("PDF storage failed:", err));

        // Trigger embedding generation with proper error handling
        try {
          const embedRes = await fetch("/api/embed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paperId }),
          });
          if (!embedRes.ok) {
            console.error("Embedding failed:", await embedRes.text());
            setFiles((prev) =>
              prev.map((f) => (f.id === tempId ? { ...f, status: "embed_failed" } : f))
            );
          } else {
            setFiles((prev) =>
              prev.map((f) => (f.id === tempId ? { ...f, status: "ready" } : f))
            );
          }
        } catch {
          setFiles((prev) =>
            prev.map((f) => (f.id === tempId ? { ...f, status: "embed_failed" } : f))
          );
        }
      } catch {
        setFiles((prev) => prev.map((f) => f.id === tempId ? { ...f, status: "error" } : f));
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const addUrl = (): void => {
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
            <div key={file.id}>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-raised/50 group transition-colors">
                <input
                  type="checkbox"
                  checked={file.selected}
                  onChange={() => setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, selected: !f.selected } : f)))}
                  className="rounded border-border accent-brand"
                />
                <FileText size={16} className={cn("shrink-0", file.status === "error" || file.status === "embed_failed" ? "text-red-400" : file.status === "processing" ? "text-amber-400 animate-pulse" : "text-ink-muted")} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink truncate">{file.name}</p>
                  <p className="text-[10px] text-ink-muted">
                    {file.status === "processing" ? "Processing..." : file.status === "error" ? "Failed" : file.status === "embed_failed" ? "Embedding failed" : file.size}
                  </p>
                  {file.status === "embed_failed" && file.paperId && (
                    <button
                      onClick={() => retryEmbed(file.paperId!)}
                      className="flex items-center gap-1 text-[10px] text-amber-500 hover:text-amber-400 mt-0.5"
                    >
                      <ArrowClockwise size={10} />
                      Click to retry
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {/* Extract Facts button */}
                  {file.paperId && file.status === "ready" && (
                    <>
                      {file.isExtracted || extractions.has(file.paperId) ? (
                        <button
                          onClick={() => setExpandedExtraction(expandedExtraction === file.paperId ? null : (file.paperId ?? null))}
                          className="p-1 rounded text-green-500 hover:bg-green-500/10 transition-colors"
                          title="View extraction"
                        >
                          <CheckCircle size={14} />
                        </button>
                      ) : extractingPapers.has(file.paperId) ? (
                        <span className="p-1">
                          <CircleNotch size={14} className="text-brand animate-spin" />
                        </span>
                      ) : (
                        <button
                          onClick={() => handleExtractFacts(file.paperId!)}
                          className="p-1 rounded text-ink-muted hover:text-brand opacity-0 group-hover:opacity-100 transition-all"
                          title="Extract PICO data"
                        >
                          <Table size={14} />
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
                    className="p-1 rounded text-ink-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
              {/* Extraction card expanded inline */}
              {file.paperId && expandedExtraction === file.paperId && extractions.has(file.paperId) && (
                <div className="ml-6 mr-2 mb-1">
                  <ExtractionCard
                    extraction={extractions.get(file.paperId)!}
                    onVerify={() => handleVerifyExtraction(file.paperId!, extractions.get(file.paperId!)!.id)}
                  />
                </div>
              )}
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
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.role === "assistant" && msg.sources && msg.sources.length > 0
                    ? renderCitedText(msg.content, msg.sources, setHighlightedSource)
                    : msg.content}
                </p>
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

        {/* Sources Panel */}
        {currentSources.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setShowSourcesPanel((v) => !v)}
              className="flex items-center gap-2 text-xs text-ink-muted hover:text-ink transition-colors mb-1"
            >
              <BookOpen size={14} />
              <span>Sources cited ({currentSources.length})</span>
              {showSourcesPanel ? <CaretUp size={12} /> : <CaretDown size={12} />}
            </button>
            {showSourcesPanel && (
              <div className="space-y-1 mb-2 max-h-40 overflow-y-auto">
                {currentSources.map((src) => (
                  <div
                    key={src.chunkId}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs transition-colors",
                      highlightedSource === src.sourceIndex
                        ? "bg-brand/10 border border-brand/30"
                        : "bg-surface-raised/50"
                    )}
                  >
                    <span className="font-medium text-brand">[{src.sourceIndex}]</span>{" "}
                    <span className="text-ink">{src.paperTitle}</span>
                    {src.pageNumber && (
                      <span className="text-ink-muted"> — Page {src.pageNumber}</span>
                    )}
                    {src.sectionType && (
                      <span className="text-ink-muted">, {src.sectionType}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="mt-2">
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
