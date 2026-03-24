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
  CaretDown,
  Sparkle,
  ShieldCheck,
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

  const [showExport, setShowExport] = useState(false);
  const [showFormattingToolbar, setShowFormattingToolbar] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [citationNotice, setCitationNotice] = useState<string | null>(null);
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
    const sectionLines = Object.entries(sectionCounts).map(([key, words]) => {
      const heading = key.split("__")[0] || "Untitled Section";
      return `${heading}: ${words} words`;
    });

    const content = sectionLines.length > 0
      ? `Section word counts:\n${sectionLines.join("\n")}\n\nTotal: ${totalWords} words`
      : `Document word count: ${totalWords} words`;

    workbench.submitPrompt(content);
  }, [workbench]);

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
    <div className="flex flex-col h-screen" style={{ background: "var(--background)" }}>
      {/* Toolbar — warm surface, visual hierarchy */}
      <div className="flex items-center justify-between px-5 h-11 shrink-0" style={{ background: "var(--surface)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input aria-label="Text input"
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="ss-doc-title"
            style={{ fontSize: 15, fontFamily: "var(--font-sans-family)", fontWeight: 600, letterSpacing: "-0.01em" }}
            placeholder="Untitled"
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
            {editorInstance && !editorInstance.isDestroyed
              ? `${getDocumentWordCount(editorInstance.state.doc)} words`
              : ""}
          </button>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {/* Sources */}
          <button
            onClick={() => {
              workbench.setActiveSourcesTab("search");
              workbench.toggle("sources");
            }}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
              workbench.isOpen && workbench.activeTool === "sources"
                ? "text-brand bg-brand/5"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <Books size={14} />
            Sources
            {references.size > 0 && (
              <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded-full font-semibold">{references.size}</span>
            )}
          </button>
          {/* Buddy */}
          <button
            onClick={() => {
              workbench.setActiveAssistantMode("ask");
              workbench.toggle("assistant");
            }}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
              workbench.isOpen && workbench.activeTool === "assistant"
                ? "text-brand bg-brand/5"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <Sparkle size={14} />
            Buddy
          </button>
          {/* Review */}
          <button
            onClick={() => {
              workbench.setActiveReviewTab("integrity");
              workbench.toggle("review");
            }}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
              workbench.isOpen && workbench.activeTool === "review"
                ? "text-brand bg-brand/5"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <ShieldCheck size={14} />
            Review
          </button>
          {/* Cite — secondary action */}
          <button
            onClick={openCitationDialogWithSelection}
            className="ss-toolbar-secondary flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs hover:bg-black/[0.03] transition-colors"
          >
            Cite
          </button>
          {/* Export — secondary action */}
          <div className="relative">
            <button
              onClick={() => setShowExport((v) => !v)}
              className="ss-toolbar-secondary flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs hover:bg-black/[0.03] transition-colors"
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
          {/* Toolbar expand/collapse chevron */}
          <button
            onClick={() => setShowFormattingToolbar((v) => !v)}
            className="flex items-center justify-center w-7 h-7 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-all"
            title={showFormattingToolbar ? "Hide formatting toolbar" : "Show formatting toolbar"}
          >
            <CaretDown
              size={12}
              className="transition-transform"
              style={{ transform: showFormattingToolbar ? "rotate(180deg)" : "" }}
            />
          </button>
        </div>
      </div>

      {/* Pending citation notice */}
      {pendingCitationNotice && (
        <div className="px-5 py-2 bg-blue-500/10 border-b border-blue-500/20 shrink-0">
          <span className="text-xs text-blue-700 dark:text-blue-300">{pendingCitationNotice}</span>
        </div>
      )}

      {/* Main content area — editor + Workbench overlay */}
      <div className="flex-1 overflow-hidden relative">
        {/* Editor — white writing surface on warm background */}
        <main className="h-full overflow-y-auto ss-writing-surface" style={{ background: "var(--background)" }}>
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
              onToggleReferenceSidebar={() => {
                workbench.setActiveSourcesTab("cited");
                workbench.toggle("sources");
              }}
              referenceCount={references.size}
              showToolbar={showFormattingToolbar}
              onToggleToolbar={() => setShowFormattingToolbar(false)}
            />
          )}
        </main>

        {/* Workbench — overlays the right side */}
        <Workbench
          editor={editorInstance}
          documentId={studioDoc?.id ? String(studioDoc.id) : undefined}
          integritySources={integritySources}
          onOpenCitationDialog={openCitationDialogWithSelection}
          onInsertCitation={handleInsertCitation}
        />
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
