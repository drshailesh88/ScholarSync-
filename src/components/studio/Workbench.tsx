"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import type { Editor } from "@tiptap/react";
import {
  X,
  MagnifyingGlass,
  Robot,
  CheckCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useWorkbenchStore } from "@/stores/workbench-store";
import { WorkbenchSources } from "./WorkbenchSources";
import { WorkbenchAssistant } from "./WorkbenchAssistant";
import { WorkbenchReview } from "./WorkbenchReview";

const WORKBENCH_MIN = 320;
const WORKBENCH_MAX = 560;
const WORKBENCH_DEFAULT = 380;

const TOOL_TABS = [
  { key: "sources" as const, label: "Sources", icon: MagnifyingGlass },
  { key: "assistant" as const, label: "Assistant", icon: Robot },
  { key: "review" as const, label: "Review", icon: CheckCircle },
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
  const [panelWidth, setPanelWidth] = useState(WORKBENCH_DEFAULT);
  const resizing = useRef(false);
  const lastX = useRef(0);

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

  // Resize handle drag
  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizing.current = true;
    lastX.current = e.clientX;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (ev: MouseEvent) => {
      if (!resizing.current) return;
      const delta = lastX.current - ev.clientX; // dragging left = wider
      lastX.current = ev.clientX;
      setPanelWidth((w) => Math.min(WORKBENCH_MAX, Math.max(WORKBENCH_MIN, w + delta)));
    };

    const onMouseUp = () => {
      resizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div
      className={cn(
        "absolute top-0 right-0 bottom-0 z-30 flex flex-col bg-surface border-l border-border transition-all duration-200 ease-in-out overflow-hidden",
        isOpen
          ? "translate-x-0 opacity-100"
          : "w-0 translate-x-4 opacity-0 pointer-events-none"
      )}
      style={{ width: isOpen ? panelWidth : 0 }}
    >
      {/* Resize handle — left edge (5px hit area for discoverability) */}
      <div
        onMouseDown={onResizeStart}
        className="absolute left-0 top-0 bottom-0 w-[5px] cursor-col-resize z-40 group"
        style={{ marginLeft: -3 }}
      >
        <div className="absolute left-[1px] top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-brand/40 group-active:bg-brand transition-colors" />
      </div>

      {/* VSCode-style tab bar */}
      <div className="flex items-center justify-between px-1 h-9 border-b border-border shrink-0">
        <div className="flex items-center gap-0.5">
          {!TOOL_TABS.length ? null : TOOL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTool === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setTool(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors relative",
                  isActive
                    ? "text-ink font-medium"
                    : "text-ink-muted hover:text-ink hover:bg-surface-raised/50 rounded-md"
                )}
              >
                <Icon size={13} weight={isActive ? "bold" : "regular"} />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-brand rounded-full" />
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={close}
          className="p-1 rounded-md text-ink-muted/50 hover:text-ink-muted transition-colors"
          title="Close (Esc)"
        >
          <X size={13} />
        </button>
      </div>

      {/* Panel content */}
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
