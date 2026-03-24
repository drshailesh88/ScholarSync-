"use client";

import { useEffect, useCallback } from "react";
import type { Editor } from "@tiptap/react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useWorkbenchStore, type WorkbenchTool } from "@/stores/workbench-store";
import { WorkbenchSources } from "./WorkbenchSources";
import { WorkbenchAssistant } from "./WorkbenchAssistant";
import { WorkbenchReview } from "./WorkbenchReview";

const tools: { key: WorkbenchTool; label: string }[] = [
  { key: "sources", label: "Sources" },
  { key: "assistant", label: "Assistant" },
  { key: "review", label: "Review" },
];

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
  const { isOpen, activeTool, setTool, close } = useWorkbenchStore();

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
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
        "absolute top-0 right-0 bottom-0 z-30 flex flex-col bg-surface border-l border-border transition-all duration-300 ease-in-out",
        "shadow-[-4px_0_16px_rgba(0,0,0,0.08)]",
        isOpen ? "w-[380px] translate-x-0" : "w-0 translate-x-full overflow-hidden"
      )}
    >
      {/* Tool switcher header */}
      <div className="flex items-center h-11 px-3 border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-1 flex-1">
          {tools.map((tool) => (
            <button
              key={tool.key}
              onClick={() => setTool(tool.key)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                activeTool === tool.key
                  ? "text-brand bg-brand/5"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised"
              )}
            >
              {tool.label}
            </button>
          ))}
        </div>
        <button
          onClick={close}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="Close (Esc)"
        >
          <X size={14} />
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
