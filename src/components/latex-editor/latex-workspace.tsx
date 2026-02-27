"use client";

import { useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLatexEditorStore } from "@/stores/latex-editor-store";
import { updateLatexFile } from "@/lib/actions/latex";
import { TopBar } from "./top-bar";
import { SourceEditor } from "./source-editor";
import { PreviewPanel } from "./preview-panel";
import {
  SidebarSimple,
  ChatCircle,
} from "@phosphor-icons/react";

type LatexProject = {
  id: string;
  title: string;
  compiler: "pdflatex" | "xelatex" | "lualatex" | null;
};

type LatexFile = {
  id: string;
  latexProjectId: string;
  path: string;
  content: string | null;
  isMain: boolean | null;
};

interface LatexWorkspaceProps {
  project: LatexProject;
  initialFiles: LatexFile[];
}

export function LatexWorkspace({ project, initialFiles }: LatexWorkspaceProps) {
  const activeFileId = useLatexEditorStore((s) => s.activeFileId);
  const documentContent = useLatexEditorStore((s) => s.documentContent);
  const setDocumentContent = useLatexEditorStore((s) => s.setDocumentContent);
  const setSaveState = useLatexEditorStore((s) => s.setSaveState);
  const setLastSavedAt = useLatexEditorStore((s) => s.setLastSavedAt);
  const fileTreeOpen = useLatexEditorStore((s) => s.fileTreeOpen);
  const toggleFileTree = useLatexEditorStore((s) => s.toggleFileTree);
  const agentPanelOpen = useLatexEditorStore((s) => s.agentPanelOpen);
  const toggleAgentPanel = useLatexEditorStore((s) => s.toggleAgentPanel);
  const setCompileStatus = useLatexEditorStore((s) => s.setCompileStatus);
  const setCompileError = useLatexEditorStore((s) => s.setCompileError);
  const setCompiledPdfUrl = useLatexEditorStore((s) => s.setCompiledPdfUrl);
  const setPreviewMode = useLatexEditorStore((s) => s.setPreviewMode);

  // Get the main file content
  const mainFile = initialFiles.find((f) => f.isMain);
  const initialContent = mainFile?.content ?? "";

  // Debounced auto-save
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleEditorChange = useCallback(
    (content: string) => {
      setDocumentContent(content);
      setSaveState("unsaved");

      // Debounce save to DB
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        if (!activeFileId) return;
        setSaveState("saving");
        try {
          await updateLatexFile(activeFileId, { content });
          setSaveState("saved");
          setLastSavedAt(new Date());
        } catch {
          setSaveState("error");
        }
      }, 1500);
    },
    [activeFileId, setDocumentContent, setSaveState, setLastSavedAt]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd+S: save immediately
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (activeFileId && documentContent) {
          setSaveState("saving");
          updateLatexFile(activeFileId, { content: documentContent })
            .then(() => {
              setSaveState("saved");
              setLastSavedAt(new Date());
            })
            .catch(() => setSaveState("error"));
        }
      }
      // Cmd+Enter: compile
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleCompile();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFileId, documentContent]);

  const handleCompile = useCallback(async () => {
    setCompileStatus("compiling");
    setCompileError(null);
    try {
      const res = await fetch("/api/latex/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Compilation failed" }));
        setCompileStatus("error");
        setCompileError(data.error || "Compilation failed");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setCompiledPdfUrl(url);
      setCompileStatus("success");
      setPreviewMode("pdf");
    } catch {
      setCompileStatus("error");
      setCompileError("Network error — could not reach server");
    }
  }, [project.id, setCompileStatus, setCompileError, setCompiledPdfUrl, setPreviewMode]);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] -m-6 -mt-0">
      {/* Top Bar */}
      <TopBar projectId={project.id} onCompile={handleCompile} />

      {/* Main workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* File Tree Toggle Tab (left edge) */}
        <button
          onClick={toggleFileTree}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-r-lg border border-l-0 border-border-subtle transition-all",
            fileTreeOpen
              ? "bg-brand/10 text-brand"
              : "bg-surface-raised/80 text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
          title="Toggle file tree"
        >
          <SidebarSimple size={14} />
        </button>

        {/* File Tree Panel (collapsible) */}
        {fileTreeOpen && (
          <aside className="w-56 shrink-0 border-r border-border-subtle bg-surface/50 overflow-y-auto p-3">
            <div className="text-xs font-semibold text-ink-muted/60 tracking-wider uppercase mb-2 px-2">
              Project Files
            </div>
            <div className="space-y-0.5">
              {initialFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    useLatexEditorStore.getState().setActiveFileId(file.id);
                    setDocumentContent(file.content ?? "");
                  }}
                  className={cn(
                    "w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors",
                    file.id === activeFileId
                      ? "bg-brand/10 text-brand font-medium"
                      : "text-ink-muted hover:text-ink hover:bg-surface-raised"
                  )}
                >
                  {file.path}
                  {file.isMain && (
                    <span className="ml-1 text-[9px] text-brand/60">(main)</span>
                  )}
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Editor Panel */}
        <div className="flex-1 min-w-0 border-r border-border-subtle">
          <SourceEditor
            initialContent={initialContent}
            onChange={handleEditorChange}
          />
        </div>

        {/* Preview Panel */}
        <div className="flex-1 min-w-0 bg-white dark:bg-slate-950/50">
          <PreviewPanel />
        </div>

        {/* Agent Panel Toggle Tab (right edge) */}
        <button
          onClick={toggleAgentPanel}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-l-lg border border-r-0 border-border-subtle transition-all",
            agentPanelOpen
              ? "bg-brand/10 text-brand"
              : "bg-surface-raised/80 text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
          title="Toggle AI panel"
        >
          <ChatCircle size={14} />
        </button>

        {/* Agent Panel (collapsible) — Phase 4 shell */}
        {agentPanelOpen && (
          <aside className="w-72 shrink-0 border-l border-border-subtle bg-surface/50 overflow-y-auto p-4">
            <div className="text-xs font-semibold text-ink-muted/60 tracking-wider uppercase mb-3">
              AI Assistant
            </div>
            <div className="flex p-0.5 bg-surface-raised rounded-lg mb-4">
              {(["draft", "learn", "cite", "check"] as const).map((tab) => {
                const agentTab = useLatexEditorStore.getState().agentTab;
                return (
                  <button
                    key={tab}
                    onClick={() => useLatexEditorStore.getState().setAgentTab(tab)}
                    className={cn(
                      "flex-1 py-1.5 rounded-md text-[10px] font-medium capitalize transition-all",
                      agentTab === tab
                        ? "bg-brand text-white"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-ink-muted text-center py-8">
              Coming in Phase 4
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
