"use client";

import { useEffect, useCallback } from "react";
import type { Editor } from "@tiptap/react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useWorkbenchStore } from "@/stores/workbench-store";
import { WorkbenchSources } from "./WorkbenchSources";
import { WorkbenchAssistant } from "./WorkbenchAssistant";
import { WorkbenchReview } from "./WorkbenchReview";

interface WorkbenchProps {
  editor: Editor | null;
  documentId?: string;
  integritySources: {
    title: string;
    doi?: string;
    pmid?: string;
    authors?: string[];
    year?: number;
  }[];
  onOpenCitationDialog: () => void;
  onInsertCitation: (referenceIds: string[]) => void;
}

const toolLabels = {
  sources: "Sources",
  assistant: "Buddy",
  review: "Review",
};

export function Workbench({
  editor,
  documentId,
  integritySources,
  onOpenCitationDialog,
  onInsertCitation,
}: WorkbenchProps) {
  const { isOpen, activeTool, close } = useWorkbenchStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    },
    [isOpen, close]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className={cn(
        "absolute top-0 right-0 bottom-0 z-30 flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "w-[380px] translate-x-0" : "w-0 translate-x-full overflow-hidden"
      )}
      style={{
        background: "#FAFAF9",
        boxShadow: isOpen ? "-8px 0 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Minimal header — just the tool name + close */}
      <div className="flex items-center justify-between h-10 px-4 shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <span className="text-[13px] font-semibold tracking-tight" style={{ color: "#1C1917" }}>
          {toolLabels[activeTool]}
        </span>
        <button
          onClick={close}
          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors"
          style={{ color: "#A8A29E" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#1C1917"; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#A8A29E"; e.currentTarget.style.background = "transparent"; }}
          title="Close (Esc)"
        >
          <X size={12} weight="bold" />
        </button>
      </div>

      {/* Tool content — all mounted, visibility toggled to preserve state */}
      <div className="flex-1 overflow-hidden relative">
        <div className={cn("absolute inset-0 flex flex-col", activeTool !== "sources" && "invisible")}>
          <WorkbenchSources
            onOpenCitationDialog={onOpenCitationDialog}
            onInsertCitation={onInsertCitation}
          />
        </div>
        <div className={cn("absolute inset-0 flex flex-col", activeTool !== "assistant" && "invisible")}>
          <WorkbenchAssistant />
        </div>
        <div className={cn("absolute inset-0 flex flex-col", activeTool !== "review" && "invisible")}>
          <WorkbenchReview
            editor={editor}
            documentId={documentId}
            integritySources={integritySources}
          />
        </div>
      </div>
    </div>
  );
}
