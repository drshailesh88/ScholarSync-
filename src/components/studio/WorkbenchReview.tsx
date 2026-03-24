"use client";

import { useState, useEffect, type RefObject } from "react";
import type { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { CommentSidebar } from "@/components/editor/CommentSidebar";
import { IntegrityPanel } from "@/components/integrity/IntegrityPanel";

// Wrapper to safely access editor ref outside of render
function CommentsContent({
  documentId,
  editorRef,
  onClose,
}: {
  documentId?: string;
  editorRef: RefObject<Editor | null>;
  onClose: () => void;
}) {
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    setEditor(editorRef.current);
  }, [editorRef]);

  if (!documentId || !editor) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-ink-muted">Open a document to view comments.</p>
      </div>
    );
  }

  return (
    <CommentSidebar
      documentId={documentId}
      editor={editor}
      onClose={onClose}
    />
  );
}

type SubTab = "comments" | "integrity";

interface WorkbenchReviewProps {
  editorRef: RefObject<Editor | null>;
  documentId?: string;
  integritySources: {
    title: string;
    doi?: string;
    pmid?: string;
    authors?: string[];
    year?: number;
  }[];
}

export function WorkbenchReview({
  editorRef,
  documentId,
  integritySources,
}: WorkbenchReviewProps) {
  const [subTab, setSubTab] = useState<SubTab>("comments");

  const subTabs: { key: SubTab; label: string }[] = [
    { key: "comments", label: "Comments" },
    { key: "integrity", label: "Integrity" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tab switcher */}
      <div className="flex border-b border-border-subtle px-2 shrink-0">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSubTab(tab.key)}
            className={cn(
              "px-3 py-2 text-xs font-medium border-b-2 transition-colors",
              subTab === tab.key
                ? "text-brand border-brand"
                : "text-ink-muted hover:text-ink border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="flex-1 overflow-hidden">
        {subTab === "comments" && (
          <CommentsContent
            documentId={documentId}
            editorRef={editorRef}
            onClose={() => setSubTab("integrity")}
          />
        )}
        {subTab === "integrity" && (
          <IntegrityPanel
            getEditorText={() =>
              editorRef.current?.view.dom.innerText?.trim() ||
              editorRef.current?.getText({ blockSeparator: "\n\n" }) ||
              ""
            }
            sources={integritySources}
          />
        )}
      </div>
    </div>
  );
}
