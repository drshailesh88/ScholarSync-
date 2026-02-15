"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { AcademicEditor } from "@/components/editor/AcademicEditor";
import { ExportDialog } from "@/components/export/ExportDialog";
import { useEditorStore } from "@/stores/editor-store";
import { generateTemplateContent } from "@/lib/editor/section-templates";
import {
  ArrowLeft,
  DownloadSimple,
  DotsThree,
  CaretDown,
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
    setDocumentTitle,
    documentType,
    setDocumentType,
  } = useEditorStore();

  const [showExport, setShowExport] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [currentContent, setCurrentContent] = useState<JSONContent | null>(
    null
  );

  // Load saved content or generate template
  const initialContent = useMemo(() => {
    if (typeof window === "undefined") return null;

    // Try to load from localStorage
    try {
      const saved = localStorage.getItem(`scholarsync_doc_${documentId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) setDocumentTitle(parsed.title);
        if (parsed.documentType) setDocumentType(parsed.documentType);
        return parsed.content as JSONContent;
      }
    } catch {
      // Ignore
    }

    // Generate template for new documents
    if (documentId === "new") {
      return generateTemplateContent(documentType);
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  const handleUpdate = useCallback(
    (data: {
      editor_content: JSONContent;
      plain_text_content: string;
      word_count: number;
    }) => {
      setCurrentContent(data.editor_content);

      // Save to localStorage
      try {
        localStorage.setItem(
          `scholarsync_doc_${documentId}`,
          JSON.stringify({
            content: data.editor_content,
            plainText: data.plain_text_content,
            wordCount: data.word_count,
            title: documentTitle,
            documentType,
            timestamp: Date.now(),
          })
        );
      } catch {
        // localStorage may be full
      }
    },
    [documentId, documentTitle, documentType]
  );

  const handleDocumentTypeChange = useCallback(
    (type: string) => {
      setDocumentType(type);
      setShowTypeDropdown(false);
    },
    [setDocumentType]
  );

  const currentTypeLabel =
    DOCUMENT_TYPES.find((t) => t.value === documentType)?.label ||
    "Original Article";

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
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-sm font-semibold text-ink bg-transparent focus:outline-none border-b border-transparent focus:border-brand transition-colors max-w-[300px]"
              placeholder="Untitled Manuscript"
            />

            {/* Document type selector */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-ink-muted rounded-md bg-surface-raised hover:bg-surface-raised/80 transition-colors"
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
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border rounded-lg transition-colors"
          >
            <DownloadSimple size={14} />
            Export
          </button>
          <button className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <DotsThree size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden bg-surface">
        <AcademicEditor
          content={initialContent}
          documentType={documentType}
          onUpdate={handleUpdate}
          debounceMs={2000}
        />
      </div>

      {/* Export dialog */}
      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        content={currentContent || initialContent || { type: "doc", content: [] }}
        title={documentTitle}
      />
    </div>
  );
}
