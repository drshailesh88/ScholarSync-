"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLatexEditorStore } from "@/stores/latex-editor-store";
import { updateLatexFile } from "@/lib/actions/latex";
import { TopBar } from "./top-bar";
import { SourceEditor } from "./source-editor";
import { PreviewPanel } from "./preview-panel";
import { AgentPanel } from "./agent-panel";
import { ErrorGutterPanel, type CompilationDiagnostic } from "./error-gutter";
import { InlineAiBar } from "./inline-ai-bar";
import { SlashCommandMenu, type SlashCommand } from "./slash-command-menu";
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

  // Error diagnostics from compilation
  const [diagnostics, setDiagnostics] = useState<CompilationDiagnostic[]>([]);

  // Inline AI bar state
  const [inlineAi, setInlineAi] = useState<{
    visible: boolean;
    selectedText: string;
    position: { top: number; left: number };
  }>({ visible: false, selectedText: "", position: { top: 0, left: 0 } });

  // Slash command menu state
  const [_slashMenu, setSlashMenu] = useState<{
    visible: boolean;
    filter: string;
    position: { top: number; left: number };
  }>({ visible: false, filter: "", position: { top: 0, left: 0 } });

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
      // Cmd+K: toggle inline AI on selection
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const sel = window.getSelection();
        if (sel && sel.toString().trim()) {
          const range = sel.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setInlineAi({
            visible: true,
            selectedText: sel.toString(),
            position: { top: rect.bottom + 8, left: rect.left },
          });
        }
      }
      // Escape: dismiss panels
      if (e.key === "Escape") {
        if (inlineAi.visible) setInlineAi((s) => ({ ...s, visible: false }));
        if (_slashMenu.visible) setSlashMenu((s) => ({ ...s, visible: false }));
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFileId, documentContent, inlineAi.visible, _slashMenu.visible]);

  const handleCompile = useCallback(async () => {
    setCompileStatus("compiling");
    setCompileError(null);
    setDiagnostics([]);
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
        if (data.errors) {
          setDiagnostics(data.errors as CompilationDiagnostic[]);
        }
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

  // Handle inline AI apply
  const handleInlineAiApply = useCallback((_newText: string) => {
    navigator.clipboard.writeText(_newText);
    setInlineAi({ visible: false, selectedText: "", position: { top: 0, left: 0 } });
  }, []);

  // Handle slash command selection
  const handleSlashCommand = useCallback(async (command: SlashCommand) => {
    setSlashMenu({ visible: false, filter: "", position: { top: 0, left: 0 } });

    if (command.id === "cite") {
      useLatexEditorStore.getState().setAgentPanelOpen(true);
      useLatexEditorStore.getState().setAgentTab("cite");
      return;
    }

    if (command.aiModel !== "none") {
      useLatexEditorStore.getState().setAgentPanelOpen(true);
      useLatexEditorStore.getState().setAgentTab("draft");
    }
  }, []);

  // Handle AI fix for compilation errors
  const handleFixError = useCallback(async (diagnostic: CompilationDiagnostic) => {
    if (!diagnostic.line) return;

    const lines = documentContent.split("\n");
    const context = lines.slice(Math.max(0, diagnostic.line - 3), diagnostic.line + 2).join("\n");

    try {
      const res = await fetch("/api/latex/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: "fix",
          description: context,
          errorMessage: diagnostic.message,
        }),
      });

      if (res.ok) {
        const reader = res.body?.getReader();
        if (!reader) return;
        const decoder = new TextDecoder();
        let fixed = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fixed += decoder.decode(value, { stream: true });
        }
        navigator.clipboard.writeText(fixed);
      }
    } catch {
      // Silent failure
    }
  }, [documentContent]);

  // Handle BibTeX insertion from Cite tab
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { bibtex: string; citeKey: string };
      if (!detail?.bibtex) return;
      const bibFile = initialFiles.find((f) => f.path.endsWith(".bib"));
      if (bibFile) {
        const newContent = (bibFile.content || "") + "\n\n" + detail.bibtex;
        updateLatexFile(bibFile.id, { content: newContent }).catch(() => {});
      }
    };
    window.addEventListener("latex:insert-bibtex", handler);
    return () => window.removeEventListener("latex:insert-bibtex", handler);
  }, [initialFiles]);

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
          title="Toggle file tree (Cmd+B)"
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
        <div className="flex-1 min-w-0 flex flex-col border-r border-border-subtle">
          <div className="flex-1 overflow-hidden">
            <SourceEditor
              initialContent={initialContent}
              onChange={handleEditorChange}
            />
          </div>
          {/* Error gutter below editor */}
          <ErrorGutterPanel
            diagnostics={diagnostics}
            onFixError={handleFixError}
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
          title="Toggle AI panel (Cmd+J)"
        >
          <ChatCircle size={14} />
        </button>

        {/* Agent Panel (collapsible) */}
        {agentPanelOpen && (
          <aside className="w-72 shrink-0 border-l border-border-subtle bg-surface/50">
            <AgentPanel />
          </aside>
        )}
      </div>

      {/* Floating overlays */}
      {inlineAi.visible && (
        <InlineAiBar
          selectedText={inlineAi.selectedText}
          position={inlineAi.position}
          onApply={handleInlineAiApply}
          onDismiss={() => setInlineAi({ visible: false, selectedText: "", position: { top: 0, left: 0 } })}
        />
      )}

      {_slashMenu.visible && (
        <SlashCommandMenu
          position={_slashMenu.position}
          filter={_slashMenu.filter}
          onSelect={handleSlashCommand}
          onDismiss={() => setSlashMenu({ visible: false, filter: "", position: { top: 0, left: 0 } })}
        />
      )}
    </div>
  );
}
