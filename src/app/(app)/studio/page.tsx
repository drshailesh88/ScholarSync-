"use client";

import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
import {
  FilePdf,
  Books,
  DownloadSimple,
  FileDoc,
  CircleNotch,
  Warning,
} from "@phosphor-icons/react";
import { SaveIndicator } from "@/components/studio/SaveIndicator";
import { IntegrityPanel } from "@/components/integrity/IntegrityPanel";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { CommentSidebar } from "@/components/editor/CommentSidebar";
import { KeyboardShortcutsDialog } from "@/components/editor/KeyboardShortcutsDialog";
import { CitationDialog } from "@/components/citations/citation-dialog";
import { ReferenceSidebar } from "@/components/citations/reference-sidebar";
import { useReferenceStore } from "@/stores/reference-store";
import { useEditorStore } from "@/stores/editor-store";
import { ResearchSidebar } from "@/components/research/ResearchSidebar";
import { useResearchStore } from "@/stores/research-store";
import { getUserUsageStats } from "@/lib/actions/user";
import { createConversation, addMessage } from "@/lib/actions/conversations";
import { getProjectPapersForCitation } from "@/lib/actions/papers";
import { useStudioDocument } from "@/hooks/use-studio-document";
import { paperToReference } from "@/lib/citations/paper-to-reference";
import {
  cloneReference,
  extractReferencesFromContent,
} from "@/lib/citations/document-reference-hydration";
import { countSectionWords, getDocumentWordCount } from "@/lib/editor/word-counter";
import type { Reference } from "@/types/citation";
import {
  type GuideDocumentType,
  type GuideStage,
} from "@/types/guide";
import {
  type DraftModeIntensity,
} from "@/types/draft";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ResearchCitationDetail {
  title: string;
  authors?: string[];
  year?: number | null;
  journal?: string;
  doi?: string;
  pmid?: string;
}

function toCitationAuthors(authors?: string[]) {
  if (!authors?.length) return [];

  return authors.map((author) => {
    const trimmed = author.trim();
    if (!trimmed) {
      return { family: "Unknown", given: "" };
    }

    if (trimmed.includes(",")) {
      const [family, given = ""] = trimmed.split(",").map((part) => part.trim());
      return { family: family || "Unknown", given };
    }

    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      return { family: parts[0], given: "" };
    }

    return {
      family: parts[parts.length - 1] || "Unknown",
      given: parts.slice(0, -1).join(" "),
    };
  });
}

function buildResearchReference(
  detail: ResearchCitationDetail,
  documentId: string
): Reference {
  const authors = toCitationAuthors(detail.authors);
  const stableKey =
    detail.doi?.trim() ||
    detail.pmid?.trim() ||
    detail.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = `ref-research-${stableKey}`;

  return {
    id,
    documentId,
    type: "article",
    title: detail.title,
    authors,
    year: detail.year || 0,
    journal: detail.journal || undefined,
    doi: detail.doi || undefined,
    pmid: detail.pmid || undefined,
    dateAdded: new Date().toISOString(),
    cslData: {
      id,
      type: "article-journal",
      title: detail.title,
      author: authors.map((author) => ({
        family: author.family,
        given: author.given,
      })),
      issued: detail.year ? { "date-parts": [[detail.year]] } : undefined,
      "container-title": detail.journal || undefined,
      DOI: detail.doi || undefined,
      PMID: detail.pmid || undefined,
    },
  };
}

export default function StudioPage() {
  return (
    <Suspense>
      <StudioContent />
    </Suspense>
  );
}

// ---------------------------------------------------------------------------
// Main Studio Content
// ---------------------------------------------------------------------------
function StudioContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("projectId");
  const initialProjectId = projectParam ? Number(projectParam) : null;

  const [isLearnMode, _setIsLearnMode] = useState(searchParams.get("mode") === "learn");
  const [aiTab, setAiTab] = useState("chat");
  const [_researchQuery, _setResearchQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [_usageStats, _setUsageStats] = useState<{ tokens_used: number; tokens_limit: number } | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showMark, setShowMark] = useState(false);
  const [markImportant, setMarkImportant] = useState(false);
  const [markNotes, setMarkNotes] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [citationNotice, setCitationNotice] = useState<string | null>(null);
  const [pendingCitationNotice, setPendingCitationNotice] = useState<string | null>(null);
  const conversationIdRef = useRef<number | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const citationSelectionRef = useRef<{ from: number; to: number } | null>(null);
  const citationNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Citation system state
  const citationDialogOpen = useReferenceStore((s) => s.citationDialogOpen);
  const openCitationDialog = useReferenceStore((s) => s.openCitationDialog);
  const closeCitationDialog = useReferenceStore((s) => s.closeCitationDialog);
  const sidebarOpen = useReferenceStore((s) => s.sidebarOpen);
  const toggleSidebar = useReferenceStore((s) => s.toggleSidebar);
  const setSidebarOpen = useReferenceStore((s) => s.setSidebarOpen);
  const references = useReferenceStore((s) => s.references);
  const addReferences = useReferenceStore((s) => s.addReferences);
  const clearReferences = useReferenceStore((s) => s.clearReferences);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);
  const commentSidebarOpen = useEditorStore((s) => s.commentSidebarOpen);
  const toggleCommentSidebar = useEditorStore((s) => s.toggleCommentSidebar);

  const submitAiPrompt = useCallback((prompt: string) => {
    setInput(prompt);
    setAiTab("chat");
    setTimeout(() => {
      setInput(prompt);
      const form = document.querySelector<HTMLFormElement>("form");
      form?.requestSubmit();
    }, 100);
  }, []);

  const showWordCountBreakdown = useCallback(() => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const doc = editor.state.doc;
    const totalWords = getDocumentWordCount(doc);
    const sectionCounts = countSectionWords(doc);
    const sectionLines = Object.entries(sectionCounts).map(([key, words]) => {
      const heading = key.split("__")[0] || "Untitled Section";
      return `${heading}: ${words} words`;
    });

    const content = sectionLines.length > 0
      ? `Section word counts:\n${sectionLines.join("\n")}\n\nTotal: ${totalWords} words`
      : `Document word count: ${totalWords} words`;

    setAiTab("chat");
    setMessages((prev) => [
      ...prev,
      {
        id: `word-count-${Date.now()}`,
        role: "assistant",
        content,
      },
    ]);
  }, []);

  // -----------------------------------------------------------------------
  // Real DB persistence via hook
  // -----------------------------------------------------------------------
  const {
    document: studioDoc,
    initialContent,
    docTitle,
    setDocTitle,
    markUnsaved,
    saveStatus,
    lastSavedAt,
    isLoading: docLoading,
    error: docError,
    handleEditorUpdate,
    projects: _userProjects,
    selectedProjectId: _selectedProjectId,
    selectProject: _selectProject,
  } = useStudioDocument(initialProjectId);

  // Guide mode context
  const [guideDocType, _setGuideDocType] = useState<GuideDocumentType | null>(null);
  const [guideStage, _setGuideStage] = useState<GuideStage>("understand");
  const [_showDocTypePicker, _setShowDocTypePicker] = useState(false);

  // Draft mode context
  const [draftIntensity, _setDraftIntensity] = useState<DraftModeIntensity>("collaborate");

  useEffect(() => {
    getUserUsageStats().then((stats) => {
      if (stats) _setUsageStats({ tokens_used: stats.tokens_used ?? 0, tokens_limit: stats.tokens_limit ?? 50000 });
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const pending = sessionStorage.getItem("scholarsync_pending_citation");
    if (!pending) return;
    sessionStorage.removeItem("scholarsync_pending_citation");
    try {
      const parsed = JSON.parse(pending) as { title?: string };
      const title = parsed.title?.trim();
      setPendingCitationNotice(
        title
          ? `Saved "${title}" to your library. Open Citation Dialog to cite it.`
          : "Paper saved to your library. Open Citation Dialog to cite it."
      );
    } catch {
      setPendingCitationNotice("Paper saved to your library. Open Citation Dialog to cite it.");
    }
  }, []);

  useEffect(() => {
    clearReferences();

    if (!studioDoc?.id) return;

    const documentId = String(studioDoc.id);
    const extractedReferences = extractReferencesFromContent(
      initialContent,
      documentId
    );

    if (extractedReferences.length > 0) {
      addReferences(extractedReferences);
    }

    if (!studioDoc.project_id) return;

    let canceled = false;

    getProjectPapersForCitation(studioDoc.project_id)
      .then((projectPapers) => {
        if (canceled || projectPapers.length === 0) return;

        addReferences(
          projectPapers.map((paper) => paperToReference(paper, documentId))
        );
      })
      .catch((err) => {
        console.error("Failed to load studio references:", err);
      });

    return () => {
      canceled = true;
    };
  }, [addReferences, clearReferences, initialContent, studioDoc]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openCitationDialogWithSelection = useCallback(() => {
    const editor = editorRef.current;
    if (editor && !editor.isDestroyed) {
      const { from, to } = editor.state.selection;
      citationSelectionRef.current = { from, to };
    }
    openCitationDialog();
  }, [openCitationDialog]);

  // Listen for citation dialog open event (from keyboard shortcut + slash command)
  useEffect(() => {
    const handler = () => openCitationDialogWithSelection();
    window.addEventListener("scholarsync:open-citation-dialog", handler);
    return () => window.removeEventListener("scholarsync:open-citation-dialog", handler);
  }, [openCitationDialogWithSelection]);

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
        case "outline-section":
          prompt = `Create a concise bullet outline for the current section based on this draft:\n\n${detail.context || ""}`;
          break;
        case "check-guidelines":
          prompt = `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n${detail.context || ""}`;
          break;
        case "precision-edit":
          prompt = `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n${detail.context || ""}`;
          break;
        case "ask":
          setAiTab("chat");
          setTimeout(() => {
            document
              .querySelector<HTMLInputElement>('input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]')
              ?.focus();
          }, 0);
          return;
        case "summarize":
          prompt = `Summarize the following text concisely:\n\n${detail.context || ""}`;
          break;
        case "find-sources": {
          // Open the research sidebar with context from the editor
          const researchStore = useResearchStore.getState();
          const contextSnippet = (detail.context || "").slice(0, 200).trim();
          if (contextSnippet) {
            researchStore.setQuery(contextSnippet);
          }
          researchStore.openSidebar();
          researchStore.setActiveTab("search");
          return;
        }
        case "cite":
          prompt = "Help me add a citation from my library. What paper should I cite here?";
          break;
        case "integrity-check":
          // Switch to the Checks tab — the IntegrityPanel handles the API call
          setAiTab("checks");
          return;
        default:
          return;
      }

      submitAiPrompt(prompt);
    };

    window.addEventListener("scholarsync:ai-action", handler);
    return () => window.removeEventListener("scholarsync:ai-action", handler);
  }, [submitAiPrompt, toggleSidebar]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { action?: string };
      if (!detail?.action) return;

      if (detail.action === "show-word-count") {
        showWordCountBreakdown();
        return;
      }

      if (detail.action === "add-comment" && editorRef.current) {
        const editor = editorRef.current;
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, " ");

        if (!commentSidebarOpen) {
          toggleCommentSidebar();
        }

        window.dispatchEvent(
          new CustomEvent("scholarsync:new-inline-comment", {
            detail: {
              textRangeStart: from,
              textRangeEnd: to,
              quotedText: selectedText,
            },
          })
        );
        return;
      }

      if (detail.action === "toggle-comment-sidebar") {
        toggleCommentSidebar();
        return;
      }

      if (detail.action === "insert-citation") {
        openCitationDialogWithSelection();
      }
    };

    window.addEventListener("scholarsync:editor-action", handler);
    return () => window.removeEventListener("scholarsync:editor-action", handler);
  }, [
    commentSidebarOpen,
    showWordCountBreakdown,
    toggleCommentSidebar,
    openCitationDialogWithSelection,
  ]);

  // Handle citation insertion from the dialog.
  // Uses requestAnimationFrame to ensure the modal overlay is fully removed
  // from the DOM before trying to focus the editor — otherwise focus() fails
  // silently because the dialog backdrop (z-index 100) intercepts it.
  const handleInsertCitation = useCallback((referenceIds: string[]) => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const savedSelection = citationSelectionRef.current;
    const referenceStore = useReferenceStore.getState();
    const referenceSnapshots = referenceIds
      .map((referenceId) => referenceStore.references.get(referenceId))
      .filter((reference): reference is Reference => Boolean(reference))
      .map((reference) => cloneReference(reference));

    requestAnimationFrame(() => {
      if (editor.isDestroyed) return;

      let chain = editor.chain().focus();

      if (savedSelection) {
        chain = chain.setTextSelection(savedSelection);
      }

      const inserted = chain.insertContent({
          type: "citation",
          attrs: {
            referenceIds,
            referenceSnapshots,
          },
        })
        .run();

      citationSelectionRef.current = null;
      if (!inserted) return;

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

      if (citationNoticeTimerRef.current) {
        clearTimeout(citationNoticeTimerRef.current);
      }

      setCitationNotice(
        referenceIds.length === 1
          ? "Citation inserted"
          : `${referenceIds.length} citations inserted`
      );

      citationNoticeTimerRef.current = setTimeout(() => {
        setCitationNotice(null);
      }, 2500);
    });
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ResearchCitationDetail>).detail;
      if (!detail?.title?.trim()) return;

      const reference = buildResearchReference(
        detail,
        String(studioDoc?.id ?? "studio")
      );

      addReferences([reference]);
      handleInsertCitation([reference.id]);
    };

    window.addEventListener("scholarsync:insert-citation", handler);
    return () =>
      window.removeEventListener("scholarsync:insert-citation", handler);
  }, [addReferences, handleInsertCitation, studioDoc?.id]);

  useEffect(() => {
    return () => {
      if (citationNoticeTimerRef.current) {
        clearTimeout(citationNoticeTimerRef.current);
      }
    };
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
        const mode = isLearnMode ? "learn" : ("draft" as const);
        const convo = await createConversation({ mode, title: input.trim().slice(0, 80) });
        conversationIdRef.current = convo.id;
      }

      addMessage({ conversation_id: conversationIdRef.current, role: "user", content: input.trim() }).catch(() => {});

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          mode: isLearnMode ? "learn" : "draft",
          ...(isLearnMode && guideDocType
            ? {
                guideContext: {
                  documentType: guideDocType,
                  stage: guideStage,
                  projectTitle: docTitle !== "Untitled Document" ? docTitle : undefined,
                },
              }
            : {}),
          ...(!isLearnMode
            ? {
                draftContext: {
                  intensity: draftIntensity,
                  projectTitle: docTitle !== "Untitled Document" ? docTitle : undefined,
                },
              }
            : {}),
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
  }, [input, isLoading, messages, isLearnMode, guideDocType, guideStage, docTitle, draftIntensity]);

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Mark status as unsaved immediately on keystroke (before debounce fires)
  const handleDirty = useCallback(() => {
    markUnsaved();

    // Save a localStorage draft as a fallback in case the DB save fails.
    const editor = editorRef.current;
    if (editor && !editor.isDestroyed) {
      try {
        localStorage.setItem(
          "scholarsync_studio_draft",
          JSON.stringify({
            content: editor.getJSON(),
            plainText: editor.getText(),
            wordCount: editor.getText().split(/\s+/).filter(Boolean).length,
            timestamp: Date.now(),
            title: docTitle,
          })
        );
      } catch {
        // localStorage may be full or unavailable
      }
    }
  }, [docTitle, markUnsaved]);

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

      const newWindow = window.open("", "_blank");
      if (!newWindow) return;

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("text/html")) {
        const html = await res.text();
        newWindow.document.write(html);
        newWindow.document.close();
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      newWindow.location.href = url;
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
  const _citedSourcesList = useMemo(() => {
    return Array.from(referenceNumberMap.entries())
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5)
      .map(([refId, num]) => {
        const ref = references.get(refId);
        return ref ? { num, title: ref.title, author: ref.authors[0]?.family || "Unknown" } : null;
      })
      .filter(Boolean) as { num: number; title: string; author: string }[];
  }, [referenceNumberMap, references]);

  const integritySources = useMemo(() => {
    return Array.from(referenceNumberMap.entries())
      .sort(([, a], [, b]) => a - b)
      .map(([refId]) => references.get(refId))
      .filter((ref): ref is NonNullable<typeof ref> => Boolean(ref))
      .map((ref) => ({
        title: ref.title,
        doi: ref.doi ?? undefined,
        pmid: ref.pmid ?? undefined,
        authors: ref.authors?.map((author) => {
          if (typeof author === "string") return author;
          return [author.given, author.family].filter(Boolean).join(" ").trim();
        }),
        year: ref.year ?? undefined,
      }));
  }, [referenceNumberMap, references]);

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] -m-6">
      {/* Clean toolbar — Title, Save, Cite, Audit, Export */}
      <div className="flex items-center justify-between px-5 h-11 border-b border-border-subtle shrink-0 bg-surface">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input aria-label="Text input"
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="text-sm font-medium text-ink bg-transparent focus:outline-none flex-1 min-w-0"
          />
          <SaveIndicator status={saveStatus} lastSavedAt={lastSavedAt} />
          {citationNotice && (
            <span className="text-[11px] font-medium text-emerald-500 shrink-0">{citationNotice}</span>
          )}
          <button
            onClick={showWordCountBreakdown}
            className="text-[11px] text-ink-muted hover:text-ink transition-colors cursor-pointer"
            title="Click for section breakdown"
          >
            {editorRef.current && !editorRef.current.isDestroyed
              ? `${getDocumentWordCount(editorRef.current.state.doc)} words`
              : ""}
          </button>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={openCitationDialogWithSelection}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <Books size={14} />
            Cite
            {references.size > 0 && (
              <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded-full font-semibold">{references.size}</span>
            )}
          </button>
          <button
            onClick={() => setAiTab("checks")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            Audit
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMark((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              Mark
              {(markImportant || markNotes) && (
                <span className="flex gap-0.5">
                  {markImportant && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                  {markNotes && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                </span>
              )}
            </button>
            {showMark && (
              <div className="absolute right-0 top-full mt-1 w-40 rounded-lg bg-surface border border-border shadow-lg z-50 py-1">
                <button
                  onClick={() => setMarkImportant((v) => !v)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Important</span>
                  {markImportant && <span className="text-brand font-bold">✓</span>}
                </button>
                <button
                  onClick={() => setMarkNotes((v) => !v)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Notes</span>
                  {markNotes && <span className="text-brand font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowExport((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              <DownloadSimple size={14} />
              Export
            </button>
            {showExport && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-lg bg-surface border border-border shadow-lg z-50 py-1">
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  <FilePdf size={14} className="text-red-400" />
                  Export as PDF
                </button>
                <button
                  onClick={handleExportDocx}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  <FileDoc size={14} className="text-blue-400" />
                  Export as Word
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pending citation notice */}
      {pendingCitationNotice && (
        <div className="px-5 py-2 bg-blue-500/10 border-b border-blue-500/20 shrink-0">
          <span className="text-xs text-blue-700 dark:text-blue-300">{pendingCitationNotice}</span>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor — distraction-free writing surface */}
        <main className="flex-1 overflow-y-auto bg-surface">
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
              className="max-w-[720px] mx-auto"
              content={initialContent}
              contentKey={studioDoc?.id ?? null}
              onUpdate={handleEditorUpdate}
              onDirty={handleDirty}
              debounceMs={2000}
              onEditorReady={handleEditorReady}
              onOpenCitationDialog={openCitationDialogWithSelection}
              onToggleReferenceSidebar={toggleSidebar}
              referenceCount={references.size}
            />
          )}
        </main>

        {/* Research Sidebar (toggleable) */}
        <ResearchSidebar />

        {/* Reference Sidebar OR Comment Sidebar OR Integrity Panel (toggleable, right side) */}
        {sidebarOpen && (
          <ReferenceSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onOpenCitationDialog={openCitationDialogWithSelection}
          />
        )}
        {!sidebarOpen && commentSidebarOpen && studioDoc?.id && editorRef.current && (
          <CommentSidebar
            documentId={String(studioDoc.id)}
            editor={editorRef.current}
            onClose={toggleCommentSidebar}
          />
        )}
        {!sidebarOpen && !commentSidebarOpen && aiTab === "checks" && (
          <aside className="w-80 shrink-0 border-l border-border flex flex-col bg-surface">
            <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
              <span className="text-xs font-semibold text-ink">Integrity Check</span>
              <button onClick={() => setAiTab("chat")} className="text-xs text-ink-muted hover:text-ink">Close</button>
            </div>
            <IntegrityPanel
              getEditorText={() =>
                editorRef.current?.view.dom.innerText?.trim() ||
                editorRef.current?.getText({ blockSeparator: "\n\n" }) ||
                ""
              }
              sources={integritySources}
            />
          </aside>
        )}
      </div>

      {/* Citation Dialog (modal overlay) — unchanged */}
      <CitationDialog
        open={citationDialogOpen}
        onClose={closeCitationDialog}
        onInsert={handleInsertCitation}
        documentId={studioDoc?.id ? String(studioDoc.id) : "default"}
      />
      <KeyboardShortcutsDialog
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
}
