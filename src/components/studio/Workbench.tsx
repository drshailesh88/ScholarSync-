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
        "absolute top-2 right-2 bottom-2 z-30 flex flex-col rounded-xl bg-surface transition-all duration-300 ease-in-out overflow-hidden",
        isOpen
          ? "w-[380px] translate-x-0 opacity-100"
          : "w-0 translate-x-8 opacity-0 pointer-events-none"
      )}
      style={{
        boxShadow: isOpen
          ? "0 8px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)"
          : "none",
      }}
    >
      <button
        onClick={close}
        className="absolute top-2 right-2 z-10 p-1 rounded-md text-ink/30 hover:text-ink/60 transition-colors"
        title="Close (Esc)"
      >
        <X size={14} />
      </button>

      <div className="flex-1 overflow-hidden relative bg-surface">
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
