"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { AcademicEditor } from "@/components/editor/AcademicEditor";
import { ExportDialog } from "@/components/export/ExportDialog";
import { VersionHistory } from "@/components/editor/VersionHistory";
import { useEditorStore } from "@/stores/editor-store";
import { generateTemplateContent } from "@/lib/editor/section-templates";
import { useEditorDocument } from "@/hooks/use-editor-document";
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
  const documentId = params.id as string;

  const {
    documentTitle,
    setDocumentTitle: setStoreTitle,
    documentType,
    setDocumentType,
  } = useEditorStore();

  const {
    content: dbContent,
    isLoading,
    error,
    dbDocumentId,
    saveStatus,
    lastSavedAt,
    handleEditorUpdate,
    setTitle,
    retrySave,
  } = useEditorDocument(documentId, documentType);

  const [showExport, setShowExport] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [restoredContent, setRestoredContent] = useState<JSONContent | null>(null);
  const [contentKey, setContentKey] = useState(0);

  // Handle title changes with debounced save
  const handleTitleChange = (newTitle: string) => {
    setStoreTitle(newTitle);
    // Debounced title save
    const timeoutId = setTimeout(() => {
      setTitle(newTitle);
    }, 1000);
    return () => clearTimeout(timeoutId);
  };

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

  return (
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
            <input
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
                <Spinner size={14} className="animate-spin text-ink-muted" />
                <span className="text-xs text-ink-muted">Saving...</span>
              </>
            )}
            {saveStatus === "saved" && lastSavedAt && (
              <>
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-xs text-ink-muted">
                  Saved {formatRelativeTime(lastSavedAt)}
                </span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <Warning size={14} className="text-amber-500" />
                <span className="text-xs text-ink-muted">Unsaved changes...</span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <Warning size={14} className="text-red-500" />
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
                <WifiSlash size={14} className="text-amber-500" />
                <span className="text-xs text-ink-muted">Saved locally</span>
              </>
            )}
          </div>

          <button
            onClick={() => setShowVersionHistory(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border rounded-lg transition-colors"
            disabled={isLoading || !editorContent}
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
        <div className="flex-1 overflow-hidden bg-surface">
          <AcademicEditor
            key={contentKey}
            content={restoredContent || editorContent}
            documentType={documentType}
            documentId={dbDocumentId?.toString() || documentId}
            onUpdate={handleEditorUpdate}
            debounceMs={2000}
          />
        </div>
      )}

      {/* Export dialog */}
      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        content={dbContent || editorContent || { type: "doc", content: [] }}
        title={documentTitle}
      />

      {/* Version history panel */}
      {showVersionHistory && dbDocumentId && (
        <VersionHistory
          documentId={dbDocumentId}
          sectionId={0}
          currentContent={currentContent || restoredContent || editorContent}
          onRestore={(content) => {
            setRestoredContent(content);
            setContentKey((k) => k + 1);
            setShowVersionHistory(false);
          }}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
    </div>
  );
}

// Helper function for relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
