"use client";

import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Editor } from "@tiptap/react";
import {
  CircleNotch,
  Warning,
  DotsThree,
  List,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SaveIndicator } from "@/components/studio/SaveIndicator";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { KeyboardShortcutsDialog } from "@/components/editor/KeyboardShortcutsDialog";
import { CitationDialog } from "@/components/citations/citation-dialog";
import { useReferenceStore } from "@/stores/reference-store";
import { getProjectPapersForCitation } from "@/lib/actions/papers";
import { useStudioDocument } from "@/hooks/use-studio-document";
import { paperToReference } from "@/lib/citations/paper-to-reference";
import {
  cloneReference,
  extractReferencesFromContent,
} from "@/lib/citations/document-reference-hydration";
import { countSectionWords, getDocumentWordCount } from "@/lib/editor/word-counter";
import type { Reference } from "@/types/citation";
import { useResearchStore } from "@/stores/research-store";
import { Workbench } from "@/components/studio/Workbench";
import { useWorkbenchStore } from "@/stores/workbench-store";
import { BottomFormattingBar } from "@/components/editor/BottomFormattingBar";

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
  const workbench = useWorkbenchStore();

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showFormattingBar, setShowFormattingBar] = useState(false);
  const [citationNotice, setCitationNotice] = useState<string | null>(null);
  const [wordCountCard, setWordCountCard] = useState<{
    total: number;
    sections: { name: string; words: number }[];
  } | null>(null);
  const [pendingCitationNotice] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    const pending = sessionStorage.getItem("scholarsync_pending_citation");
    if (!pending) return null;

    sessionStorage.removeItem("scholarsync_pending_citation");
    try {
      const parsed = JSON.parse(pending) as { title?: string };
      const title = parsed.title?.trim();
      return title
        ? `Saved "${title}" to your library. Open Citation Dialog to cite it.`
        : "Paper saved to your library. Open Citation Dialog to cite it.";
    } catch {
      return "Paper saved to your library. Open Citation Dialog to cite it.";
    }
  });
  const editorRef = useRef<Editor | null>(null);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const citationSelectionRef = useRef<{ from: number; to: number } | null>(null);
  const citationNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  const wordCountCardRef = useRef<HTMLDivElement | null>(null);

  // Citation system state
  const citationDialogOpen = useReferenceStore((s) => s.citationDialogOpen);
  const openCitationDialog = useReferenceStore((s) => s.openCitationDialog);
  const closeCitationDialog = useReferenceStore((s) => s.closeCitationDialog);
  const references = useReferenceStore((s) => s.references);
  const addReferences = useReferenceStore((s) => s.addReferences);
  const clearReferences = useReferenceStore((s) => s.clearReferences);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);

  const showWordCountBreakdown = useCallback(() => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const doc = editor.state.doc;
    const totalWords = getDocumentWordCount(doc);
    const sectionCounts = countSectionWords(doc);
    const sections = Object.entries(sectionCounts).map(([key, words]) => ({
      name: key.split("__")[0] || "Untitled Section",
      words,
    }));

    setWordCountCard((current) => {
      if (
        current &&
        current.total === totalWords &&
        current.sections.length === sections.length &&
        current.sections.every(
          (section, index) =>
            section.name === sections[index]?.name &&
            section.words === sections[index]?.words
        )
      ) {
        return null;
      }

      return {
        total: totalWords,
        sections,
      };
    });
    setShowMoreMenu(false);
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

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setShowMoreMenu(false);
      }

      if (
        wordCountCardRef.current &&
        !wordCountCardRef.current.contains(target)
      ) {
        setWordCountCard(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMoreMenu(false);
        setWordCountCard(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Workbench keyboard shortcuts.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      const key = e.key.toLowerCase();

      if (!e.shiftKey && key === "l") {
        e.preventDefault();
        workbench.toggle("assistant");
        return;
      }

      if (e.shiftKey && key === "l") {
        e.preventDefault();
        workbench.setActiveSourcesTab("search");
        workbench.toggle("sources");
        return;
      }

      if (e.shiftKey && key === "r") {
        e.preventDefault();
        workbench.setActiveSourcesTab("cited");
        workbench.open("sources");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [workbench]);

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
          workbench.setActiveAssistantMode("ask");
          workbench.open("assistant");
          setTimeout(() => {
            document
              .querySelector<HTMLInputElement>('input[placeholder*="Ask"]')
              ?.focus();
          }, 0);
          return;
        case "summarize":
          prompt = `Summarize the following text concisely:\n\n${detail.context || ""}`;
          break;
        case "find-sources": {
          const researchStore = useResearchStore.getState();
          const contextSnippet = (detail.context || "").slice(0, 200).trim();
          if (contextSnippet) {
            researchStore.setQuery(contextSnippet);
          }
          workbench.setActiveSourcesTab("search");
          workbench.open("sources");
          return;
        }
        case "cite":
          prompt = "Help me add a citation from my library. What paper should I cite here?";
          break;
        case "integrity-check":
          workbench.setActiveReviewTab("integrity");
          workbench.open("review");
          return;
        default:
          return;
      }

      workbench.submitPrompt(prompt);
    };

    window.addEventListener("scholarsync:ai-action", handler);
    return () => window.removeEventListener("scholarsync:ai-action", handler);
  }, [workbench]);

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

        workbench.setActiveReviewTab("comments");
        workbench.open("review");

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
        workbench.setActiveReviewTab("comments");
        workbench.toggle("review");
        return;
      }

      if (detail.action === "toggle-reference-sidebar") {
        workbench.setActiveSourcesTab("cited");
        workbench.open("sources");
        return;
      }

      if (detail.action === "insert-citation") {
        openCitationDialogWithSelection();
      }
    };

    window.addEventListener("scholarsync:editor-action", handler);
    return () => window.removeEventListener("scholarsync:editor-action", handler);
  }, [
    showWordCountBreakdown,
    workbench,
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
    setEditorInstance(editor);
  }, []);

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
    setShowMoreMenu(false);
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
    setShowMoreMenu(false);
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
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center justify-between px-5 h-10 shrink-0 bg-background">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("scholarsync:toggle-sidebar"));
            }}
            className="p-1.5 rounded-md text-ink/30 hover:text-ink/70 transition-colors"
            title="Navigation"
            aria-label="Open navigation"
          >
            <List size={18} />
          </button>
          <SaveIndicator status={saveStatus} lastSavedAt={lastSavedAt} />
          {citationNotice && (
            <span className="text-[10px] font-medium text-emerald-500 shrink-0">
              {citationNotice}
            </span>
          )}
          <div className="relative" ref={wordCountCardRef}>
            <button
              onClick={showWordCountBreakdown}
              className="text-[11px] text-ink-muted hover:text-ink transition-colors"
              title="Click for section breakdown"
            >
              {editorInstance && !editorInstance.isDestroyed
                ? `${getDocumentWordCount(editorInstance.state.doc)} words`
                : ""}
            </button>
            {wordCountCard && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-surface border border-border shadow-xl z-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-ink">
                    Word Count
                  </span>
                  <button
                    onClick={() => setWordCountCard(null)}
                    className="text-ink-muted hover:text-ink transition-colors"
                    aria-label="Close word count"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="text-2xl font-bold text-ink mb-3 tabular-nums">
                  {wordCountCard.total.toLocaleString()}
                </div>
                {wordCountCard.sections.length > 0 && (
                  <div className="space-y-1.5 border-t border-border-subtle pt-2">
                    {wordCountCard.sections.map((section, index) => (
                      <div
                        key={`${section.name}-${index}`}
                        className="flex items-center justify-between"
                      >
                        <span className="text-[11px] text-ink-muted truncate mr-2">
                          {section.name}
                        </span>
                        <span className="text-[11px] font-medium text-ink tabular-nums">
                          {section.words}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              workbench.setActiveSourcesTab("search");
              workbench.toggle("sources");
              setShowMoreMenu(false);
            }}
            className={cn(
              "px-2.5 py-1.5 text-[11px] transition-colors",
              workbench.isOpen && workbench.activeTool === "sources"
                ? "text-ink"
                : "text-ink/40 hover:text-ink"
            )}
          >
            Sources
          </button>
          <button
            onClick={() => {
              workbench.setActiveAssistantMode("ask");
              workbench.toggle("assistant");
              setShowMoreMenu(false);
            }}
            className={cn(
              "px-2.5 py-1.5 text-[11px] transition-colors",
              workbench.isOpen && workbench.activeTool === "assistant"
                ? "text-ink"
                : "text-ink/40 hover:text-ink"
            )}
          >
            Assistant
          </button>
          <button
            onClick={() => {
              workbench.setActiveReviewTab("integrity");
              workbench.toggle("review");
              setShowMoreMenu(false);
            }}
            className={cn(
              "px-2.5 py-1.5 text-[11px] transition-colors",
              workbench.isOpen && workbench.activeTool === "review"
                ? "text-ink"
                : "text-ink/40 hover:text-ink"
            )}
          >
            Review
          </button>
          <button
            onClick={() => setShowFormattingBar((v) => !v)}
            className={cn(
              "px-2 py-1 transition-colors font-serif text-[13px]",
              showFormattingBar ? "text-ink" : "text-ink/30 hover:text-ink/80"
            )}
            title="Toggle formatting (Cmd+Shift+T)"
          >
            <span className="font-bold">B</span>
            <span className="italic mx-0.5">I</span>
            <span className="underline">U</span>
          </button>
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => {
                setShowMoreMenu((value) => !value);
                setWordCountCard(null);
              }}
              className="p-1.5 text-ink/40 hover:text-ink transition-colors"
              aria-label="More actions"
            >
              <DotsThree size={16} />
            </button>
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-surface border border-border shadow-lg z-50 py-1">
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    openCitationDialogWithSelection();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  Insert Citation
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  Export as PDF
                </button>
                <button
                  onClick={handleExportDocx}
                  className="w-full text-left px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  Export as Word
                </button>
                <div className="border-t border-border-subtle my-1" />
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowKeyboardShortcuts(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors"
                >
                  Keyboard Shortcuts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {pendingCitationNotice && (
        <div className="px-5 py-2 bg-blue-500/10 shrink-0">
          <span className="text-xs text-blue-700 dark:text-blue-300">
            {pendingCitationNotice}
          </span>
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        <main className="h-full overflow-y-auto ss-writing-surface bg-background">
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
            <>
              <div className="max-w-[720px] mx-auto pt-16 px-6">
                <input
                  aria-label="Document title"
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="Untitled document"
                  className="w-full text-[38px] font-bold leading-[1.2] tracking-[-0.02em] bg-transparent border-none outline-none placeholder:text-ink/25 caret-brand"
                  style={{ fontFamily: "var(--font-serif-family)" }}
                />
              </div>
              <TiptapEditor
                className="max-w-[720px] mx-auto"
                content={initialContent}
                contentKey={studioDoc?.id ?? null}
                onUpdate={handleEditorUpdate}
                onDirty={handleDirty}
                debounceMs={2000}
                onEditorReady={handleEditorReady}
                onOpenCitationDialog={openCitationDialogWithSelection}
                onToggleReferenceSidebar={() => {
                  workbench.setActiveSourcesTab("cited");
                  workbench.toggle("sources");
                }}
                referenceCount={references.size}
              />
            </>
          )}
          {showFormattingBar && editorInstance && (
            <div className="sticky bottom-0 z-20">
              <BottomFormattingBar editor={editorInstance} />
            </div>
          )}
        </main>

        <Workbench
          editor={editorInstance}
          documentId={studioDoc?.id ? String(studioDoc.id) : undefined}
          integritySources={integritySources}
          onOpenCitationDialog={openCitationDialogWithSelection}
          onInsertCitation={handleInsertCitation}
        />
      </div>

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
