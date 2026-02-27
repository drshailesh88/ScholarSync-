"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  PaperPlaneRight,
  CircleNotch,
  Sparkle,
  MagnifyingGlass,
  BookOpen,
  CaretRight,
  BookmarkSimple,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useLatexEditorStore } from "@/stores/latex-editor-store";
import {
  LATEX_CONCEPTS,
  LATEX_CATEGORIES,
  getConceptsByCategory,
  getConceptById,
  type LatexConcept,
} from "@/data/latex-concepts";

// ---------------------------------------------------------------------------
// Draft Tab — Streaming chat with Claude Sonnet
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function DraftTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const documentContent = useLatexEditorStore((s) => s.documentContent);

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
      // Smart context windowing: extract current section + outline
      const outline = extractOutline(documentContent);
      const currentSection = extractCurrentSection(documentContent);

      const res = await fetch("/api/latex/draft-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          currentSection,
          documentOutline: outline,
          intensity: "collaborate",
        }),
      });

      if (!res.ok) {
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setIsLoading(false);
        return;
      }

      const assistantMsg: ChatMessage = { id: `msg_${Date.now() + 1}`, role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMsg.content += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: assistantMsg.content } : m))
        );
      }
    } catch {
      // Silent failure
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, documentContent]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <Sparkle size={24} className="text-brand mx-auto mb-2" />
            <p className="text-xs text-ink-muted">
              Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "assistant" && (
              <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkle size={10} className="text-brand" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[90%] px-2.5 py-1.5 rounded-lg text-[11px] leading-relaxed",
                msg.role === "user" ? "bg-surface-raised text-ink" : "bg-brand/5 text-ink"
              )}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
              <Sparkle size={10} className="text-brand animate-spin" />
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-brand/5">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-brand/40 animate-bounce" />
                <span className="w-1 h-1 rounded-full bg-brand/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1 h-1 rounded-full bg-brand/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="px-3 py-2 border-t border-border-subtle"
      >
        <div className="flex gap-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Help me strengthen my methods section..."
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-[11px] focus:outline-none focus:ring-1 focus:ring-brand/40"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-1.5 rounded-lg bg-brand text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            <PaperPlaneRight size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Learn Tab — Static concept display from data file
// ---------------------------------------------------------------------------

function LearnTab() {
  const [selectedCategory, setSelectedCategory] = useState<LatexConcept["category"] | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<LatexConcept | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, []);

  // Concept detail view
  if (selectedConcept) {
    return (
      <div className="flex flex-col h-full overflow-y-auto px-3 py-3">
        <button
          onClick={() => setSelectedConcept(null)}
          className="flex items-center gap-1 text-[10px] text-ink-muted hover:text-ink mb-3"
        >
          <CaretRight size={10} className="rotate-180" />
          Back to concepts
        </button>

        <h3 className="text-sm font-semibold text-ink mb-2">{selectedConcept.title}</h3>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">{selectedConcept.explanation}</p>

        <div className="relative">
          <div className="rounded-lg bg-surface-raised border border-border-subtle p-3 font-mono text-[10px] text-ink leading-relaxed whitespace-pre overflow-x-auto">
            {selectedConcept.code}
          </div>
          <button
            onClick={() => handleCopyCode(selectedConcept.code)}
            className="absolute top-2 right-2 p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised/80 transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          </button>
        </div>

        {selectedConcept.nextConcept && (
          <button
            onClick={() => {
              const next = getConceptById(selectedConcept.nextConcept!);
              if (next) setSelectedConcept(next);
            }}
            className="flex items-center gap-1 mt-3 text-[10px] text-brand hover:text-brand-hover"
          >
            Next: {getConceptById(selectedConcept.nextConcept)?.title}
            <ArrowRight size={10} />
          </button>
        )}
      </div>
    );
  }

  // Category list or search results
  const filteredConcepts = searchQuery
    ? LATEX_CONCEPTS.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.explanation.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
      ? getConceptsByCategory(selectedCategory)
      : null;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-3 py-3">
      {/* Search */}
      <div className="relative mb-3">
        <MagnifyingGlass size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setSelectedCategory(null);
          }}
          placeholder="Search concepts..."
          className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-surface-raised border border-border text-[11px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40"
        />
      </div>

      {filteredConcepts ? (
        <>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1 text-[10px] text-ink-muted hover:text-ink mb-2"
            >
              <CaretRight size={10} className="rotate-180" />
              All categories
            </button>
          )}
          <div className="space-y-1">
            {filteredConcepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept)}
                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-surface-raised transition-colors group"
              >
                <p className="text-xs font-medium text-ink group-hover:text-brand transition-colors">
                  {concept.title}
                </p>
                <p className="text-[10px] text-ink-muted truncate mt-0.5">
                  {concept.explanation.slice(0, 80)}...
                </p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-brand" />
            <span className="text-xs font-medium text-ink">LaTeX Concepts</span>
            <span className="text-[9px] text-ink-muted">({LATEX_CONCEPTS.length})</span>
          </div>
          <div className="space-y-1.5">
            {(Object.entries(LATEX_CATEGORIES) as [LatexConcept["category"], { label: string; color: string }][]).map(
              ([key, { label, color }]) => {
                const count = getConceptsByCategory(key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg hover:bg-surface-raised transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${color}-500`} />
                      <span className="text-xs font-medium text-ink">{label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-ink-muted">{count}</span>
                      <CaretRight size={10} className="text-ink-muted group-hover:text-ink transition-colors" />
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cite Tab — Uses existing PubMed/S2 search infrastructure
// ---------------------------------------------------------------------------

interface SearchResult {
  id: string;
  title: string;
  authors: string;
  year: string;
  journal: string;
  doi?: string;
}

function CiteTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("/api/search/unified", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), sources: ["pubmed", "semantic_scholar"], limit: 10 }),
      });

      if (res.ok) {
        const data = await res.json();
        const papers = (data.results || []).map((r: Record<string, unknown>) => ({
          id: String(r.id || r.paperId || ""),
          title: String(r.title || "Untitled"),
          authors: Array.isArray(r.authors)
            ? (r.authors as Array<{ name?: string }>).slice(0, 3).map((a) => a.name || "").join(", ")
            : String(r.authors || "Unknown"),
          year: String(r.year || r.publicationDate || ""),
          journal: String(r.journal || r.venue || ""),
          doi: r.doi ? String(r.doi) : undefined,
        }));
        setResults(papers);
      }
    } catch {
      // Silent failure
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleCiteKey = useCallback((result: SearchResult) => {
    const firstAuthor = result.authors.split(",")[0].split(" ").pop() || "unknown";
    const year = result.year.slice(0, 4);
    const key = `${firstAuthor.toLowerCase()}${year}`;
    const bibtex = `@article{${key},\n  author  = {${result.authors}},\n  title   = {${result.title}},\n  journal = {${result.journal}},\n  year    = {${year}},${result.doi ? `\n  doi     = {${result.doi}},` : ""}\n}`;

    navigator.clipboard.writeText(`\\cite{${key}}`);
    setCopiedId(result.id);
    setTimeout(() => setCopiedId(null), 2000);

    // Also dispatch an event for the workspace to handle BibTeX insertion
    window.dispatchEvent(new CustomEvent("latex:insert-bibtex", { detail: { bibtex, citeKey: key } }));
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border-subtle">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex gap-1.5"
        >
          <div className="relative flex-1">
            <MagnifyingGlass size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers..."
              className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-surface-raised border border-border text-[11px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-2.5 py-1.5 rounded-lg bg-brand text-white text-[10px] font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            {loading ? <CircleNotch size={12} className="animate-spin" /> : "Search"}
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
        {results.length === 0 && !loading && (
          <div className="text-center py-6">
            <BookmarkSimple size={20} className="text-ink-muted/40 mx-auto mb-2" />
            <p className="text-[10px] text-ink-muted">
              Search PubMed & Semantic Scholar, then click to insert \\cite&#123;key&#125;
            </p>
          </div>
        )}
        {results.map((r) => (
          <button
            key={r.id}
            onClick={() => handleCiteKey(r)}
            className="w-full text-left p-2.5 rounded-lg hover:bg-surface-raised transition-colors group"
          >
            <p className="text-[11px] font-medium text-ink leading-snug line-clamp-2">{r.title}</p>
            <p className="text-[9px] text-ink-muted mt-1">
              {r.authors} {r.year && `(${r.year.slice(0, 4)})`} {r.journal && `• ${r.journal}`}
            </p>
            <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedId === r.id ? (
                <span className="text-[9px] text-emerald-500 flex items-center gap-0.5">
                  <Check size={10} />
                  Copied \\cite&#123;key&#125;
                </span>
              ) : (
                <span className="text-[9px] text-brand">Click to copy citation</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Check Tab — Wraps existing integrity check + LaTeX-specific checks
// ---------------------------------------------------------------------------

function CheckTab() {
  const documentContent = useLatexEditorStore((s) => s.documentContent);
  const [checks, setChecks] = useState<{ label: string; status: "pass" | "warn" | "error" | "pending"; detail: string }[]>([]);
  const [running, setRunning] = useState(false);

  const runChecks = useCallback(() => {
    setRunning(true);
    const results: typeof checks = [];

    // LaTeX-specific checks (no AI needed)
    const content = documentContent;

    // 1. Unused labels
    const labels = [...content.matchAll(/\\label\{([^}]+)\}/g)].map((m) => m[1]);
    const refs = [...content.matchAll(/\\ref\{([^}]+)\}/g)].map((m) => m[1]);
    const unusedLabels = labels.filter((l) => !refs.includes(l));
    results.push({
      label: "Unused labels",
      status: unusedLabels.length > 0 ? "warn" : "pass",
      detail: unusedLabels.length > 0 ? `${unusedLabels.length} unused: ${unusedLabels.join(", ")}` : "All labels referenced",
    });

    // 2. Undefined references
    const undefinedRefs = refs.filter((r) => !labels.includes(r));
    results.push({
      label: "Undefined references",
      status: undefinedRefs.length > 0 ? "error" : "pass",
      detail: undefinedRefs.length > 0 ? `${undefinedRefs.length} undefined: ${undefinedRefs.join(", ")}` : "All references defined",
    });

    // 3. Unused citations
    const bibKeys = [...content.matchAll(/@\w+\{([^,]+),/g)].map((m) => m[1].trim());
    const cites = [...content.matchAll(/\\cite[tp]?\{([^}]+)\}/g)].flatMap((m) =>
      m[1].split(",").map((s) => s.trim())
    );
    const unusedBib = bibKeys.filter((k) => !cites.includes(k));
    results.push({
      label: "Unused bibliography entries",
      status: unusedBib.length > 0 ? "warn" : "pass",
      detail: unusedBib.length > 0 ? `${unusedBib.length} unused: ${unusedBib.join(", ")}` : "All entries cited",
    });

    // 4. Missing \\label after sections
    const sectionsWithoutLabels = [...content.matchAll(/\\(section|subsection)\{[^}]+\}/g)]
      .filter((m) => {
        const idx = m.index ?? 0;
        const after = content.slice(idx, idx + m[0].length + 30);
        return !after.includes("\\label{");
      });
    results.push({
      label: "Sections without labels",
      status: sectionsWithoutLabels.length > 0 ? "warn" : "pass",
      detail: sectionsWithoutLabels.length > 0
        ? `${sectionsWithoutLabels.length} section(s) missing \\label{}`
        : "All sections labeled",
    });

    // 5. Package conflicts (common ones)
    const packages = [...content.matchAll(/\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/g)].map((m) => m[1]);
    const conflicts: string[] = [];
    if (packages.includes("subfigure") && packages.includes("subcaption")) {
      conflicts.push("subfigure + subcaption conflict");
    }
    if (packages.includes("cite") && packages.includes("natbib")) {
      conflicts.push("cite + natbib conflict");
    }
    results.push({
      label: "Package conflicts",
      status: conflicts.length > 0 ? "error" : "pass",
      detail: conflicts.length > 0 ? conflicts.join("; ") : "No known conflicts",
    });

    // 6. Mismatched begin/end environments
    const begins = [...content.matchAll(/\\begin\{([^}]+)\}/g)].map((m) => m[1]);
    const ends = [...content.matchAll(/\\end\{([^}]+)\}/g)].map((m) => m[1]);
    const mismatch = begins.length !== ends.length;
    results.push({
      label: "Environment matching",
      status: mismatch ? "error" : "pass",
      detail: mismatch
        ? `Mismatch: ${begins.length} \\begin vs ${ends.length} \\end`
        : `${begins.length} environments balanced`,
    });

    setChecks(results);
    setRunning(false);
  }, [documentContent]);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-3 py-3">
      <button
        onClick={runChecks}
        disabled={running}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-brand/10 border border-brand/20 text-brand text-[11px] font-medium hover:bg-brand/15 transition-colors disabled:opacity-50 mb-3"
      >
        {running ? <CircleNotch size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
        Run LaTeX Checks
      </button>

      {checks.length === 0 ? (
        <div className="text-center py-6">
          <ShieldCheck size={20} className="text-ink-muted/40 mx-auto mb-2" />
          <p className="text-[10px] text-ink-muted">
            Check for unused refs, missing labels, package conflicts, and more.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {checks.map((check, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-raised/50"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full mt-1 shrink-0",
                  check.status === "pass" && "bg-emerald-500",
                  check.status === "warn" && "bg-amber-400",
                  check.status === "error" && "bg-red-400",
                  check.status === "pending" && "bg-ink-muted/30"
                )}
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-ink">{check.label}</p>
                <p className="text-[9px] text-ink-muted mt-0.5">{check.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Agent Panel
// ---------------------------------------------------------------------------

export function AgentPanel() {
  const agentTab = useLatexEditorStore((s) => s.agentTab);
  const setAgentTab = useLatexEditorStore((s) => s.setAgentTab);

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="px-3 py-2 border-b border-border-subtle">
        <div className="flex p-0.5 bg-surface-raised rounded-lg">
          {(["draft", "learn", "cite", "check"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setAgentTab(tab)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-[10px] font-medium capitalize transition-all",
                agentTab === tab
                  ? "bg-brand text-white"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {agentTab === "draft" && <DraftTab />}
        {agentTab === "learn" && <LearnTab />}
        {agentTab === "cite" && <CiteTab />}
        {agentTab === "check" && <CheckTab />}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractOutline(tex: string): string {
  const lines = tex.split("\n");
  const outline: string[] = [];
  for (const line of lines) {
    const match = line.match(/\\(section|subsection|subsubsection)\*?\{([^}]*)\}/);
    if (match) {
      const indent = match[1] === "section" ? "" : match[1] === "subsection" ? "  " : "    ";
      outline.push(`${indent}${match[2]}`);
    }
  }
  return outline.join("\n");
}

function extractCurrentSection(tex: string): string {
  // Get the last section's content (up to 2000 chars)
  const sections = tex.split(/\\section\*?\{/);
  if (sections.length < 2) return tex.slice(0, 2000);
  const lastSection = sections[sections.length - 1];
  return lastSection.slice(0, 2000);
}
