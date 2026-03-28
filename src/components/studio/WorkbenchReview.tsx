"use client";

import type { Editor } from "@tiptap/react";
import { CommentSidebar } from "@/components/editor/CommentSidebar";
import { IntegrityPanel } from "@/components/integrity/IntegrityPanel";
import { useWorkbenchStore, type WorkbenchReviewTab } from "@/stores/workbench-store";

interface WorkbenchReviewProps {
  editor: Editor | null;
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
  editor,
  documentId,
  integritySources,
}: WorkbenchReviewProps) {
  const activeReviewTab = useWorkbenchStore((s) => s.activeReviewTab);
  const setActiveReviewTab = useWorkbenchStore((s) => s.setActiveReviewTab);
  const closeWorkbench = useWorkbenchStore((s) => s.close);

  const subTabs: { key: WorkbenchReviewTab; label: string }[] = [
    { key: "comments", label: "Comments" },
    { key: "integrity", label: "Integrity" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1 px-3 py-1.5 shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        {!subTabs.length ? null : subTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveReviewTab(tab.key)}
            className="px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors"
            style={{
              background: activeReviewTab === tab.key ? "rgba(109,40,217,0.06)" : "transparent",
              color: activeReviewTab === tab.key ? "#6D28D9" : "#A8A29E",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeReviewTab === "comments" ? (
          !documentId ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-xs text-ink-muted">Open a document to view comments.</p>
            </div>
          ) : editor ? (
            <CommentSidebar
              documentId={documentId}
              editor={editor}
              onClose={() => closeWorkbench()}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-xs text-ink-muted">Loading editor...</p>
            </div>
          )
        ) : (
          <IntegrityPanel
            getEditorText={() =>
              editor?.view.dom.innerText?.trim() ||
              editor?.getText({ blockSeparator: "\n\n" }) ||
              ""
            }
            sources={integritySources}
          />
        )}
      </div>
    </div>
  );
}
