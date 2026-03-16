"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import { AcademicEditor } from "@/components/editor/AcademicEditor";
import { EditorErrorBoundary } from "@/components/editor/EditorErrorBoundary";
import { ExportDialog } from "@/components/export/ExportDialog";
import { VersionHistory } from "@/components/editor/VersionHistory";
import { CitationDialog } from "@/components/citations/citation-dialog";
import { ReferenceSidebar } from "@/components/citations/reference-sidebar";
import { useEditorStore } from "@/stores/editor-store";
import { useReferenceStore } from "@/stores/reference-store";
import { generateTemplateContent } from "@/lib/editor/section-templates";
import { consumePendingCitationNotice } from "@/lib/editor/pending-citation-notice";
import { useEditorDocument } from "@/hooks/use-editor-document";
import { getProjectPapersForCitation } from "@/lib/actions/papers";
import { paperToReference } from "@/lib/citations/paper-to-reference";
import {
  cloneReference,
  extractReferencesFromContent,
} from "@/lib/citations/document-reference-hydration";
import {
  ArrowLeft,
  DownloadSimple,
  DotsThree,
  CaretDown,
  CheckCircle,
  Spinner,
  Warning,
  WifiSlash,
  ClockCounterClockwise,
  CloudArrowUp,
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DOCUMENT_TYPES = [
  { value: "original-article", label: "Original Article" },
  { value: "case-report", label: "Case Report" },
  { value: "review-article", label: "Review Article" },
  { value: "meta-analysis", label: "Meta-Analysis" },
];

export default function EditorPage() {
  const params = useParams();
  const urlDocumentId = params.id as string;
  const editorRef = useRef<Editor | null>(null);

  const {
    documentTitle,
    setDocumentTitle: setStoreTitle,
    documentType,
    setDocumentType,
    referenceSidebarOpen: editorReferenceSidebarOpen,
    setReferenceSidebarOpen: setEditorReferenceSidebarOpen,
  } = useEditorStore();

  const {
    content: dbContent,
    isLoading,
    error,
    dbDocumentId,
    sectionId,
    projectId,
    saveStatus,
    lastSavedAt,
    handleEditorUpdate,
    setTitle,
    retrySave,
  } = useEditorDocument(urlDocumentId, documentType);

  const citationDialogOpen = useReferenceStore((s) => s.citationDialogOpen);
  const openCitationDialog = useReferenceStore((s) => s.openCitationDialog);
  const closeCitationDialog = useReferenceStore((s) => s.closeCitationDialog);
  const referenceSidebarOpen = useReferenceStore((s) => s.sidebarOpen);
  const setReferenceSidebarOpen = useReferenceStore((s) => s.setSidebarOpen);
  const references = useReferenceStore((s) => s.references);
  const addReferences = useReferenceStore((s) => s.addReferences);
  const clearReferences = useReferenceStore((s) => s.clearReferences);

  const [showExport, setShowExport] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [restoredContent, setRestoredContent] = useState<JSONContent | null>(null);
  const [contentKey, setContentKey] = useState(0);
  const [pendingCitationNotice, setPendingCitationNotice] = useState<string | null>(null);
  const titleSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInsertCitation = useCallback((referenceIds: string[]) => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const referenceStore = useReferenceStore.getState();
    /* empty state: no data, no results, nothing here */
    const referenceSnapshots = referenceIds
      .map((referenceId) => referenceStore.references.get(referenceId))
      .filter((reference): reference is NonNullable<typeof reference> =>
        Boolean(reference)
      )
      .map((reference) => cloneReference(reference));

    editor
      .chain()
      .focus()
      .insertContent({
        type: "citation",
        attrs: {
          referenceIds,
          referenceSnapshots,
        },
      })
      .run();

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

  const sidebarOpen = editorReferenceSidebarOpen || referenceSidebarOpen;

  const handleSetReferenceSidebarOpen = useCallback(
    (open: boolean) => {
      setEditorReferenceSidebarOpen(open);
      setReferenceSidebarOpen(open);
    },
    [setEditorReferenceSidebarOpen, setReferenceSidebarOpen]
  );

  const handleToggleReferenceSidebar = useCallback(() => {
    handleSetReferenceSidebarOpen(!sidebarOpen);
  }, [handleSetReferenceSidebarOpen, sidebarOpen]);

  const syncPendingCitationNotice = useCallback(() => {
    const notice = consumePendingCitationNotice();
    if (!notice) return;
    setPendingCitationNotice(notice);
  }, []);

  useEffect(() => {
    const handler = () => openCitationDialog();
    window.addEventListener("scholarsync:open-citation-dialog", handler);
    return () =>
      window.removeEventListener("scholarsync:open-citation-dialog", handler);
  }, [openCitationDialog]);

  useEffect(() => {
    if (editorReferenceSidebarOpen === referenceSidebarOpen) return;
    handleSetReferenceSidebarOpen(editorReferenceSidebarOpen || referenceSidebarOpen);
  }, [
    editorReferenceSidebarOpen,
    handleSetReferenceSidebarOpen,
    referenceSidebarOpen,
  ]);

  useEffect(() => {
    const initialSync = setTimeout(syncPendingCitationNotice, 0);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncPendingCitationNotice();
      }
    };

    window.addEventListener("focus", syncPendingCitationNotice);
    window.addEventListener("pageshow", syncPendingCitationNotice);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearTimeout(initialSync);
      window.removeEventListener("focus", syncPendingCitationNotice);
      window.removeEventListener("pageshow", syncPendingCitationNotice);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncPendingCitationNotice]);

  useEffect(() => {
    if (!pendingCitationNotice) return;
    const timer = setTimeout(() => setPendingCitationNotice(null), 5000);
    return () => clearTimeout(timer);
  }, [pendingCitationNotice]);

  // Reset reference state when switching documents or projects.
  useEffect(() => {
    clearReferences();
  }, [clearReferences, dbDocumentId, projectId]);

  // Rehydrate references embedded in the current document content.
  useEffect(() => {
    if (!dbDocumentId) return;
    const extractedReferences = extractReferencesFromContent(
      dbContent,
      String(dbDocumentId)
    );
    if (extractedReferences.length > 0) {
      addReferences(extractedReferences);
    }
  }, [addReferences, dbContent, dbDocumentId]);

  // Load project library references when the backing project changes.
  useEffect(() => {
    if (!projectId || !dbDocumentId) return;

    let canceled = false;
    getProjectPapersForCitation(projectId)
      .then((projectPapers) => {
        if (canceled || projectPapers.length === 0) return;
        const refs = projectPapers.map((paper) =>
          paperToReference(paper, String(dbDocumentId))
        );
        addReferences(refs);
      })
      .catch((err) => {
        console.error("Failed to load project references:", err);
      });

    return () => {
      canceled = true;
    };
  }, [addReferences, dbDocumentId, projectId]);

  // Add beforeunload protection to prevent data loss
  useEffect(() => {
    if (saveStatus !== "unsaved" && saveStatus !== "saving") {
      return;
    }

    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [saveStatus]);

  // Handle title changes with debounced save
  const handleTitleChange = (newTitle: string) => {
    setStoreTitle(newTitle);
    if (titleSaveTimeoutRef.current) {
      clearTimeout(titleSaveTimeoutRef.current);
    }

    titleSaveTimeoutRef.current = setTimeout(() => {
      setTitle(newTitle);
      titleSaveTimeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (titleSaveTimeoutRef.current) {
        clearTimeout(titleSaveTimeoutRef.current);
      }
    };
  }, []);

  const handleDocumentTypeChange = (type: string) => {
    setDocumentType(type);
    setShowTypeDropdown(false);
  };

  const currentTypeLabel =
    DOCUMENT_TYPES.find((t) => t.value === documentType)?.label ||
    "Original Article";

  // Combine DB content with template for new documents
  const editorContent = useMemo(() => {
    if (dbContent) {
      return dbContent;
    }
    // If no content from DB, generate template
    return generateTemplateContent(documentType);
  }, [dbContent, documentType]);
  const canOpenVersionHistory =
    !isLoading &&
    Boolean(editorContent) &&
    dbDocumentId !== null &&
    sectionId !== null;

  return (
    <EditorErrorBoundary documentId={urlDocumentId}>
      <div className="flex flex-col h-[calc(100vh-4rem)] -mx-6 -mt-0">
      {/* Document header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border shrink-0">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>

          <div className="flex items-center gap-2">
            <input aria-label="Text input"
              type="text"
              value={documentTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-sm font-semibold text-ink bg-transparent focus:outline-none border-b border-transparent focus:border-brand transition-colors max-w-[300px]"
              placeholder="Untitled Manuscript"
              disabled={isLoading}
            />

            {/* Document type selector */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-ink-muted rounded-md bg-surface-raised hover:bg-surface-raised/80 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {currentTypeLabel}
                <CaretDown size={10} />
              </button>
              {showTypeDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowTypeDropdown(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
                    {DOCUMENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleDocumentTypeChange(type.value)}
                        className={cn(
                          "w-full text-left px-3 py-1.5 text-sm hover:bg-surface-raised transition-colors",
                          documentType === type.value
                            ? "text-brand font-medium"
                            : "text-ink"
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Save status indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-raised border border-border">
            {saveStatus === "saving" && (
              <>
                <CloudArrowUp size={14} className="animate-pulse text-ink-muted" />
                <span className="text-xs text-ink-muted">Saving...</span>
              </>
            )}
            {saveStatus === "saved" && lastSavedAt && (
              <>
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-xs text-ink-muted">
                  Saved{" "}
                  {lastSavedAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <CloudArrowUp size={14} className="text-amber-500" />
                <span className="text-xs text-ink-muted">Unsaved changes</span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <Warning size={14} className="text-red-500" />
                <span className="text-xs text-ink-muted">Save failed</span>
                <button
                  onClick={() => retrySave()}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors"
                >
                  Retry save
                </button>
              </>
            )}
            {saveStatus === "offline" && (
              <>
                <WifiSlash size={14} className="text-red-500" />
                <span className="text-xs text-ink-muted">Offline</span>
              </>
            )}
            {saveStatus === "local" && (
              <>
                <WifiSlash size={14} className="text-red-500" />
                <span className="text-xs text-ink-muted">Saved locally</span>
              </>
            )}
          </div>

          <button
            onClick={() => setShowVersionHistory(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border rounded-lg transition-colors"
            disabled={!canOpenVersionHistory}
          >
            <ClockCounterClockwise size={14} />
            Version History
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border rounded-lg transition-colors"
            disabled={isLoading || !editorContent}
          >
            <DownloadSimple size={14} />
            Export
          </button>
          <button className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <DotsThree size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 shrink-0">
          <div className="flex items-center gap-2">
            <Warning size={16} className="text-amber-500" />
            <span className="text-sm text-amber-700 dark:text-amber-300">{error}</span>
          </div>
          {saveStatus === "error" && (
            <button
              onClick={() => retrySave()}
              className="px-3 py-1 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {pendingCitationNotice && (
        <div className="px-4 py-2 bg-blue-500/10 border-b border-blue-500/20 shrink-0">
          <span className="text-sm text-blue-700 dark:text-blue-300">
            {pendingCitationNotice}
          </span>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center bg-surface">
          <div className="text-center">
            <Spinner size={32} className="animate-spin text-brand mx-auto mb-3" />
            <p className="text-sm text-ink-muted">Loading document...</p>
          </div>
        </div>
      )}

      {/* Editor */}
      {!isLoading && (
        <div className="flex-1 flex overflow-hidden bg-surface">
          <div className="flex-1 overflow-hidden">
            <AcademicEditor
              key={contentKey}
              content={restoredContent || editorContent}
              documentType={documentType}
              documentId={String(dbDocumentId || urlDocumentId)}
              onUpdate={handleEditorUpdate}
              onEditorReady={(editor) => {
                editorRef.current = editor;
              }}
              onOpenCitationDialog={openCitationDialog}
              onToggleReferenceSidebar={handleToggleReferenceSidebar}
              referenceCount={references.size}
              debounceMs={2000}
            />
          </div>

          {sidebarOpen && (
            <div className="w-80 border-l border-border bg-surface shrink-0 overflow-hidden">
              <ReferenceSidebar
                open={sidebarOpen}
                onClose={() => handleSetReferenceSidebarOpen(false)}
                onOpenCitationDialog={openCitationDialog}
              />
            </div>
          )}
        </div>
      )}

      <CitationDialog
        open={citationDialogOpen}
        onClose={closeCitationDialog}
        onInsert={handleInsertCitation}
        documentId={String(dbDocumentId || "default")}
      />

      {/* Export dialog */}
      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        content={dbContent || editorContent || { type: "doc", content: [] }}
        title={documentTitle}
      />

      {/* Version history panel */}
      {showVersionHistory && dbDocumentId && sectionId !== null && (
        <VersionHistory
          documentId={dbDocumentId}
          sectionId={sectionId}
          currentContent={dbContent || restoredContent || editorContent}
          onRestore={(content) => {
            setRestoredContent(content);
            setContentKey((k) => k + 1);
            setShowVersionHistory(false);
          }}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
      </div>
    </EditorErrorBoundary>
  );
}
