"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLatexEditorStore } from "@/stores/latex-editor-store";
import { updateLatexFile } from "@/lib/actions/latex";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TopBar } from "./top-bar";
import { SourceEditor, type SourceEditorHandle } from "./source-editor";
import { VisualEditor } from "./visual-editor";
import { PreviewPanel } from "./preview-panel";
import { AgentPanel } from "./agent-panel";
import { FileTree } from "./file-tree";
import { ImageBrowser } from "./image-browser";
import { ErrorGutterPanel, type CompilationDiagnostic } from "./error-gutter";
import { InlineAiBar } from "./inline-ai-bar";
import { SlashCommandMenu, type SlashCommand } from "./slash-command-menu";
import {
  SidebarSimple,
  ChatCircle,
  FolderOpen,
  Image as ImageIcon,
  X,
  Eye,
  Code,
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
  const viewMode = useLatexEditorStore((s) => s.viewMode);

  // Responsive hook
  const { isMobile, isTablet, minTouchTarget } = useMediaQuery();

  // Mobile preview toggle (show preview or editor)
  const [mobileShowPreview, setMobileShowPreview] = useState(false);

  // Ref to the CodeMirror editor (exposed via forwardRef)
  const editorRef = useRef<SourceEditorHandle>(null);

  // Managed file list (mutable after create/rename/delete)
  const [files, setFiles] = useState<LatexFile[]>(initialFiles);

  // Get the main file content
  const mainFile = files.find((f) => f.isMain);
  const initialContent = mainFile?.content ?? "";

  // Getter for .bib file content (used by citation autocompletion)
  const getBibContent = useCallback(() => {
    const bibFile = files.find((f) => f.path.endsWith(".bib"));
    return bibFile?.content ?? "";
  }, [files]);

  // Editor scroll position for preview sync
  const [editorTopLine, setEditorTopLine] = useState(1);

  // Sidebar tab state (files vs figures)
  const [sidebarTab, setSidebarTab] = useState<"files" | "figures">("files");

  // Error diagnostics from compilation
  const [diagnostics, setDiagnostics] = useState<CompilationDiagnostic[]>([]);

  // Inline AI bar state
  const [inlineAi, setInlineAi] = useState<{
    visible: boolean;
    selectedText: string;
    position: { top: number; left: number };
  }>({ visible: false, selectedText: "", position: { top: 0, left: 0 } });

  // Slash command menu state
  const [slashMenu, setSlashMenu] = useState<{
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

      // Also update the local file list so FileTree stays in sync
      const currentFileId = useLatexEditorStore.getState().activeFileId;
      if (currentFileId) {
        setFiles((prev) =>
          prev.map((f) => f.id === currentFileId ? { ...f, content } : f)
        );
      }

      // Debounce save to DB
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        const fileId = useLatexEditorStore.getState().activeFileId;
        if (!fileId) return;
        setSaveState("saving");
        try {
          await updateLatexFile(fileId, { content });
          setSaveState("saved");
          setLastSavedAt(new Date());
        } catch {
          setSaveState("error");
        }
      }, 1500);
    },
    [setDocumentContent, setSaveState, setLastSavedAt]
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
        const fileId = useLatexEditorStore.getState().activeFileId;
        const content = useLatexEditorStore.getState().documentContent;
        if (fileId && content) {
          setSaveState("saving");
          updateLatexFile(fileId, { content })
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
      // Cmd+K: toggle inline AI on selection (uses CodeMirror selection)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const cmSel = editorRef.current?.getSelection();
        if (cmSel && cmSel.text.trim()) {
          // Get position from DOM selection for positioning the bar
          const domSel = window.getSelection();
          const rect = domSel?.rangeCount
            ? domSel.getRangeAt(0).getBoundingClientRect()
            : null;
          setInlineAi({
            visible: true,
            selectedText: cmSel.text,
            position: {
              top: rect ? rect.bottom + 8 : 200,
              left: rect ? rect.left : 100,
            },
          });
        }
      }
      // Cmd+B: toggle file tree
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleFileTree();
      }
      // Cmd+J: toggle agent panel
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        e.preventDefault();
        toggleAgentPanel();
      }
      // Escape: dismiss panels
      if (e.key === "Escape") {
        if (inlineAi.visible) setInlineAi((s) => ({ ...s, visible: false }));
        if (slashMenu.visible) setSlashMenu((s) => ({ ...s, visible: false }));
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inlineAi.visible, slashMenu.visible]);

  const handleCompile = useCallback(async () => {
    // Save current file before compiling
    const fileId = useLatexEditorStore.getState().activeFileId;
    const content = useLatexEditorStore.getState().documentContent;
    if (fileId && content) {
      await updateLatexFile(fileId, { content }).catch(() => {});
    }

    setCompileStatus("compiling");
    setCompileError(null);
    setDiagnostics([]);
    editorRef.current?.clearDiagnostics();

    const MAX_RETRIES = 2;
    let lastError = "";

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch("/api/latex/compile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId: project.id }),
        });

        // Rate-limited — wait and retry
        if (res.status === 429 && attempt < MAX_RETRIES) {
          const retryAfter = parseInt(res.headers.get("Retry-After") || "3", 10);
          setCompileError(`Compiler busy — retrying in ${retryAfter}s (attempt ${attempt + 1}/${MAX_RETRIES})…`);
          await new Promise((r) => setTimeout(r, retryAfter * 1000));
          continue;
        }

        // Service unavailable — clear message
        if (res.status === 502 || res.status === 503 || res.status === 504) {
          if (attempt < MAX_RETRIES) {
            setCompileError(`Compiler service unavailable — retrying (attempt ${attempt + 1}/${MAX_RETRIES})…`);
            await new Promise((r) => setTimeout(r, 2000));
            continue;
          }
          setCompileStatus("error");
          setCompileError(
            "The LaTeX compiler service is currently unavailable. Your document is saved — " +
            "you can use the live preview or try compiling again in a moment."
          );
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: "Compilation failed" }));
          setCompileStatus("error");
          setCompileError(data.error || "Compilation failed");
          if (data.errors) {
            const errors = data.errors as CompilationDiagnostic[];
            setDiagnostics(errors);
            editorRef.current?.setDiagnostics(
              errors
                .filter((e) => e.line != null)
                .map((e) => ({
                  line: e.line!,
                  message: e.message,
                  severity: e.severity,
                }))
            );
          }
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setCompiledPdfUrl(url);
        setCompileStatus("success");
        setPreviewMode("pdf");
        return; // success — exit retry loop
      } catch {
        lastError = "Network error — could not reach the compilation server";
        if (attempt < MAX_RETRIES) {
          setCompileError(`Connection failed — retrying (attempt ${attempt + 1}/${MAX_RETRIES})…`);
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }
      }
    }

    // All retries exhausted
    setCompileStatus("error");
    setCompileError(
      lastError ||
      "Unable to compile after multiple attempts. Check your connection and try again."
    );
  }, [project.id, setCompileStatus, setCompileError, setCompiledPdfUrl, setPreviewMode]);

  // Export handlers
  const handleExportPdf = useCallback(() => {
    const pdfUrl = useLatexEditorStore.getState().compiledPdfUrl;
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${project.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    a.click();
  }, [project.title]);

  const handleExportTex = useCallback(() => {
    const content = useLatexEditorStore.getState().documentContent;
    const blob = new Blob([content], { type: "text/x-tex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "main.tex";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleExportZip = useCallback(async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    const projectName = project.title.replace(/[^a-zA-Z0-9]/g, "_");

    // Add all project files to the ZIP
    for (const file of files) {
      if (file.content != null) {
        zip.file(file.path, file.content);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }, [project.title, files]);

  // Handle inline AI apply — replace the selected text in the editor
  const handleInlineAiApply = useCallback((newText: string) => {
    const view = editorRef.current?.getView();
    if (view) {
      const { from, to } = view.state.selection.main;
      view.dispatch({
        changes: { from, to, insert: newText },
        selection: { anchor: from + newText.length },
      });
      view.focus();
    }
    setInlineAi({ visible: false, selectedText: "", position: { top: 0, left: 0 } });
  }, []);

  // Slash command templates for non-AI commands
  const SLASH_TEMPLATES: Record<string, string> = {
    template: "\\section{}\n\n",
    bib: "\\bibliography{references}\n\\bibliographystyle{plain}\n",
  };

  // Handle slash command selection
  const handleSlashCommand = useCallback(async (command: SlashCommand) => {
    setSlashMenu({ visible: false, filter: "", position: { top: 0, left: 0 } });

    if (command.id === "cite") {
      // Remove the slash text, then open the Cite tab
      editorRef.current?.insertAtCursor("");
      useLatexEditorStore.getState().setAgentPanelOpen(true);
      useLatexEditorStore.getState().setAgentTab("cite");
      return;
    }

    if (command.id === "fix") {
      // Remove the slash text, then trigger compile
      editorRef.current?.insertAtCursor("");
      handleCompile();
      return;
    }

    // Non-AI commands: insert template directly
    if (command.aiModel === "none" && SLASH_TEMPLATES[command.id]) {
      editorRef.current?.insertAtCursor(SLASH_TEMPLATES[command.id]);
      return;
    }

    // AI commands (table, figure, equation, tikz): open Draft tab with pre-filled prompt
    if (command.aiModel !== "none") {
      editorRef.current?.insertAtCursor("");
      useLatexEditorStore.getState().setAgentPanelOpen(true);
      useLatexEditorStore.getState().setAgentTab("draft");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleCompile]);

  // Handle AI fix for compilation errors — replace the error line(s) in the editor
  const handleFixError = useCallback(async (diagnostic: CompilationDiagnostic) => {
    if (!diagnostic.line) return;

    const content = useLatexEditorStore.getState().documentContent;
    const lines = content.split("\n");
    const errorLineIdx = diagnostic.line - 1; // 0-based
    const contextStart = Math.max(0, errorLineIdx - 2);
    const contextEnd = Math.min(lines.length, errorLineIdx + 3);
    const context = lines.slice(contextStart, contextEnd).join("\n");

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
        // Replace the context lines in the editor
        const view = editorRef.current?.getView();
        if (view) {
          const fromLine = view.state.doc.line(contextStart + 1);
          const toLine = view.state.doc.line(contextEnd);
          view.dispatch({
            changes: { from: fromLine.from, to: toLine.to, insert: fixed.trim() },
          });
          view.focus();
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(fixed);
        }
      }
    } catch {
      // Silent failure
    }
  }, []);

  // Handle BibTeX insertion from Cite tab
  useEffect(() => {
    const handler = async (e: Event) => {
      const detail = (e as CustomEvent).detail as { bibtex: string; citeKey: string };
      if (!detail?.bibtex) return;

      const bibFile = files.find((f) => f.path.endsWith(".bib"));

      // Auto-create .bib file if it doesn't exist
      if (!bibFile) {
        try {
          const { createLatexFile } = await import("@/lib/actions/latex");
          const newBib = await createLatexFile({
            latexProjectId: project.id,
            path: "references.bib",
            content: detail.bibtex,
            isMain: false,
          });
          if (newBib) {
            setFiles((prev) => [...prev, newBib as LatexFile]);
          }
        } catch {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(detail.bibtex);
        }
      } else {
        // Append to existing .bib file
        const newContent = (bibFile.content || "") + "\n\n" + detail.bibtex;
        updateLatexFile(bibFile.id, { content: newContent }).catch(() => {});
        setFiles((prev) =>
          prev.map((f) => f.id === bibFile!.id ? { ...f, content: newContent } : f)
        );
      }

      // Insert \cite{key} at cursor in the editor
      if (detail.citeKey) {
        editorRef.current?.insertAtCursor(`\\cite{${detail.citeKey}}`);
      }
    };
    window.addEventListener("latex:insert-bibtex", handler);
    return () => window.removeEventListener("latex:insert-bibtex", handler);
  }, [files, project.id]);

  // Jump-to-line handler for outline clicks
  const handleJumpToLine = useCallback((line: number) => {
    editorRef.current?.scrollToLine(line);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] -m-6 -mt-0">
      {/* Top Bar */}
      <TopBar
        projectId={project.id}
        onCompile={handleCompile}
        onExportPdf={handleExportPdf}
        onExportTex={handleExportTex}
        onExportZip={handleExportZip}
      />

      {/* Mobile toggle bar - show editor/preview switcher */}
      {isMobile && (
        <div className="flex border-b border-border-subtle bg-surface/50">
          <button
            onClick={() => setMobileShowPreview(false)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors",
              !mobileShowPreview
                ? "text-brand border-b-2 border-brand -mb-px bg-brand/5"
                : "text-ink-muted hover:text-ink"
            )}
            style={{ minHeight: minTouchTarget }}
          >
            <Code size={16} />
            Editor
          </button>
          <button
            onClick={() => setMobileShowPreview(true)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors",
              mobileShowPreview
                ? "text-brand border-b-2 border-brand -mb-px bg-brand/5"
                : "text-ink-muted hover:text-ink"
            )}
            style={{ minHeight: minTouchTarget }}
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      )}

      {/* Main workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* File Tree Toggle Tab (left edge) - hidden on mobile */}
        {!isMobile && (
          <button
            onClick={toggleFileTree}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-r-lg border border-l-0 border-border-subtle transition-all",
              fileTreeOpen
                ? "bg-brand/10 text-brand"
                : "bg-surface-raised/80 text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
            style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
            title="Toggle file tree (Cmd+B)"
          >
            <SidebarSimple size={14} />
          </button>
        )}

        {/* Mobile File Tree Button */}
        {isMobile && !fileTreeOpen && (
          <button
            onClick={toggleFileTree}
            className="absolute left-2 top-2 z-20 p-2 rounded-lg bg-surface-raised/90 border border-border-subtle shadow-sm"
            style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
            title="Toggle file tree"
          >
            <FolderOpen size={18} />
          </button>
        )}

        {/* Mobile Agent Panel Button */}
        {isMobile && !agentPanelOpen && (
          <button
            onClick={toggleAgentPanel}
            className="absolute right-2 top-2 z-20 p-2 rounded-lg bg-surface-raised/90 border border-border-subtle shadow-sm"
            style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
            title="Toggle AI panel"
          >
            <ChatCircle size={18} />
          </button>
        )}

        {/* File Tree Panel - Mobile Overlay / Desktop Sidebar */}
        {fileTreeOpen && (
          <aside
            className={cn(
              "shrink-0 border-r border-border-subtle bg-surface/50 overflow-hidden flex flex-col",
              isMobile
                ? "fixed inset-0 z-50 w-full h-full"
                : "w-56"
            )}
          >
            {/* Mobile header with close button */}
            {isMobile && (
              <div className="flex items-center justify-between p-2 border-b border-border-subtle">
                <span className="text-sm font-medium">Files</span>
                <button
                  onClick={toggleFileTree}
                  className="p-2 rounded-lg hover:bg-surface-raised"
                  style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Tab bar for Files / Figures */}
            <div className="flex border-b border-border-subtle">
              <button
                onClick={() => setSidebarTab("files")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] font-medium transition-colors",
                  sidebarTab === "files"
                    ? "text-brand border-b-2 border-brand -mb-px"
                    : "text-ink-muted hover:text-ink"
                )}
                style={{ minHeight: isMobile ? minTouchTarget : undefined }}
              >
                <FolderOpen size={12} />
                Files
              </button>
              <button
                onClick={() => setSidebarTab("figures")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] font-medium transition-colors",
                  sidebarTab === "figures"
                    ? "text-brand border-b-2 border-brand -mb-px"
                    : "text-ink-muted hover:text-ink"
                )}
                style={{ minHeight: isMobile ? minTouchTarget : undefined }}
              >
                <ImageIcon size={12} />
                Figures
              </button>
            </div>

            {/* Tab content */}
            {sidebarTab === "files" ? (
              <FileTree
                projectId={project.id}
                files={files}
                onFilesChange={setFiles}
                onJumpToLine={(line) => {
                  handleJumpToLine(line);
                  if (isMobile) toggleFileTree(); // Close on mobile after selection
                }}
                onFileSelect={(file) => {
                  editorRef.current?.setContent(file.content ?? "");
                  if (isMobile) toggleFileTree(); // Close on mobile after selection
                }}
                onDraftSection={(title) => {
                  useLatexEditorStore.getState().setAgentPanelOpen(true);
                  useLatexEditorStore.getState().setAgentTab("draft");
                  window.dispatchEvent(
                    new CustomEvent("latex:draft-section", { detail: { sectionTitle: title } })
                  );
                }}
              />
            ) : (
              <ImageBrowser
                projectId={project.id}
                onInsertImage={(latexCode) => {
                  editorRef.current?.insertAtCursor(latexCode);
                  if (isMobile) toggleFileTree(); // Close on mobile after insertion
                }}
              />
            )}
          </aside>
        )}

        {/* Editor Panel - Hidden on mobile when showing preview */}
        <div
          className={cn(
            "flex-1 min-w-0 flex flex-col border-r border-border-subtle",
            isMobile && mobileShowPreview && "hidden"
          )}
        >
          <div className="flex-1 overflow-hidden">
            {viewMode === "visual" ? (
              <VisualEditor
                initialContent={initialContent}
                onChange={handleEditorChange}
              />
            ) : (
              <SourceEditor
                ref={editorRef}
                initialContent={initialContent}
                onChange={handleEditorChange}
                getBibContent={getBibContent}
                onSlashTrigger={(pos, filter) =>
                  setSlashMenu({ visible: true, filter, position: pos })
                }
                onSlashDismiss={() =>
                  setSlashMenu({ visible: false, filter: "", position: { top: 0, left: 0 } })
                }
                onScrollLine={setEditorTopLine}
              />
            )}
          </div>
          {/* Error gutter below editor */}
          <ErrorGutterPanel
            diagnostics={diagnostics}
            onFixError={handleFixError}
            onGoToLine={(line) => editorRef.current?.scrollToLine(line)}
          />
        </div>

        {/* Preview Panel - Full width on mobile when active */}
        <div
          className={cn(
            "bg-white dark:bg-slate-950/50",
            isMobile
              ? mobileShowPreview
                ? "absolute inset-0 z-10"
                : "hidden"
              : "flex-1 min-w-0"
          )}
        >
          {/* Mobile close button for preview */}
          {isMobile && mobileShowPreview && (
            <button
              onClick={() => setMobileShowPreview(false)}
              className="absolute right-2 top-2 z-20 p-2 rounded-lg bg-surface-raised/90 border border-border-subtle shadow-sm"
              style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
              title="Back to editor"
            >
              <X size={18} />
            </button>
          )}
          <PreviewPanel editorTopLine={editorTopLine} />
        </div>

        {/* Agent Panel Toggle Tab (right edge) - hidden on mobile/tablet */}
        {!isMobile && !isTablet && (
          <button
            onClick={toggleAgentPanel}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-l-lg border border-r-0 border-border-subtle transition-all",
              agentPanelOpen
                ? "bg-brand/10 text-brand"
                : "bg-surface-raised/80 text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
            style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
            title="Toggle AI panel (Cmd+J)"
          >
            <ChatCircle size={14} />
          </button>
        )}

        {/* Agent Panel - Mobile Overlay / Desktop Sidebar */}
        {agentPanelOpen && (
          <aside
            className={cn(
              "shrink-0 border-l border-border-subtle bg-surface/50 overflow-hidden flex flex-col",
              isMobile
                ? "fixed inset-0 z-50 w-full h-full"
                : isTablet
                  ? "w-64"
                  : "w-72"
            )}
          >
            {/* Mobile header with close button */}
            {isMobile && (
              <div className="flex items-center justify-between p-2 border-b border-border-subtle">
                <span className="text-sm font-medium">AI Assistant</span>
                <button
                  onClick={toggleAgentPanel}
                  className="p-2 rounded-lg hover:bg-surface-raised"
                  style={{ minHeight: minTouchTarget, minWidth: minTouchTarget }}
                >
                  <X size={18} />
                </button>
              </div>
            )}
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

      {slashMenu.visible && (
        <SlashCommandMenu
          position={slashMenu.position}
          filter={slashMenu.filter}
          onSelect={handleSlashCommand}
          onDismiss={() => setSlashMenu({ visible: false, filter: "", position: { top: 0, left: 0 } })}
        />
      )}
    </div>
  );
}
