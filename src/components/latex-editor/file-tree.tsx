"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  FileCode,
  FileText,
  Image,
  FolderSimple,
  FolderOpen,
  Plus,
  Trash,
  PencilSimple,
  DotsThree,
  CaretRight,
  ListBullets,
  ArrowLineDown,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useLatexEditorStore } from "@/stores/latex-editor-store";
import { createLatexFile, updateLatexFile, deleteLatexFile } from "@/lib/actions/latex";

interface FileItem {
  id: string;
  latexProjectId: string;
  path: string;
  content: string | null;
  isMain: boolean | null;
}

interface OutlineItem {
  level: number;
  title: string;
  line: number;
}

interface FileTreeProps {
  projectId: string;
  files: FileItem[];
  onFilesChange: (files: FileItem[]) => void;
  onJumpToLine?: (line: number) => void;
  onFileSelect?: (file: FileItem) => void;
}

function getFileIcon(path: string) {
  if (path.endsWith(".tex")) return FileText;
  if (path.endsWith(".bib")) return FileCode;
  if (path.endsWith(".sty") || path.endsWith(".cls")) return FileCode;
  if (path.match(/\.(png|jpg|jpeg|gif|svg|pdf)$/i)) return Image;
  return FileText;
}

function getFileColor(path: string) {
  if (path.endsWith(".tex")) return "text-emerald-500";
  if (path.endsWith(".bib")) return "text-amber-500";
  if (path.endsWith(".sty") || path.endsWith(".cls")) return "text-violet-500";
  if (path.match(/\.(png|jpg|jpeg|gif|svg|pdf)$/i)) return "text-sky-500";
  return "text-ink-muted";
}

/** Extract document outline from LaTeX source */
function extractOutline(content: string): OutlineItem[] {
  const lines = content.split("\n");
  const outline: OutlineItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/\\(section|subsection|subsubsection)\*?\{([^}]*)\}/);
    if (match) {
      const level = match[1] === "section" ? 0 : match[1] === "subsection" ? 1 : 2;
      outline.push({ level, title: match[2], line: i + 1 });
    }
  }

  return outline;
}

/** Group files into a folder tree */
function buildFolderTree(files: FileItem[]): { folders: Record<string, FileItem[]>; rootFiles: FileItem[] } {
  const folders: Record<string, FileItem[]> = {};
  const rootFiles: FileItem[] = [];

  for (const file of files) {
    const slashIdx = file.path.indexOf("/");
    if (slashIdx !== -1) {
      const folder = file.path.slice(0, slashIdx);
      if (!folders[folder]) folders[folder] = [];
      folders[folder].push(file);
    } else {
      rootFiles.push(file);
    }
  }

  return { folders, rootFiles };
}

export function FileTree({ projectId, files, onFilesChange, onJumpToLine, onFileSelect }: FileTreeProps) {
  const activeFileId = useLatexEditorStore((s) => s.activeFileId);
  const setActiveFileId = useLatexEditorStore((s) => s.setActiveFileId);
  const setDocumentContent = useLatexEditorStore((s) => s.setDocumentContent);
  const documentContent = useLatexEditorStore((s) => s.documentContent);

  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [showOutline, setShowOutline] = useState(true);

  const newFileInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showNewFile && newFileInputRef.current) {
      newFileInputRef.current.focus();
    }
  }, [showNewFile]);

  useEffect(() => {
    if (renamingId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingId]);

  // Close context menu on outside click
  useEffect(() => {
    const handler = () => setContextMenuId(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelectFile = useCallback((file: FileItem) => {
    setActiveFileId(file.id);
    setDocumentContent(file.content ?? "");
    onFileSelect?.(file);
  }, [setActiveFileId, setDocumentContent, onFileSelect]);

  const handleCreateFile = useCallback(async () => {
    const name = newFileName.trim();
    if (!name) return;

    const newFile = await createLatexFile({
      latexProjectId: projectId,
      path: name,
      content: name.endsWith(".bib") ? "% Add references here\n" : "",
      isMain: false,
    });

    onFilesChange([...files, newFile as FileItem]);
    setShowNewFile(false);
    setNewFileName("");
    handleSelectFile(newFile as FileItem);
  }, [newFileName, projectId, files, onFilesChange, handleSelectFile]);

  const handleRename = useCallback(async (file: FileItem) => {
    const newPath = renameValue.trim();
    if (!newPath || newPath === file.path) {
      setRenamingId(null);
      return;
    }

    await updateLatexFile(file.id, { path: newPath });
    const updated = files.map((f) => f.id === file.id ? { ...f, path: newPath } : f);
    onFilesChange(updated);
    setRenamingId(null);
  }, [renameValue, files, onFilesChange]);

  const handleDelete = useCallback(async (file: FileItem) => {
    if (file.isMain) return; // Can't delete main file

    await deleteLatexFile(file.id);
    const updated = files.filter((f) => f.id !== file.id);
    onFilesChange(updated);

    // If we deleted the active file, switch to main
    if (file.id === activeFileId) {
      const main = updated.find((f) => f.isMain);
      if (main) handleSelectFile(main);
    }
  }, [files, onFilesChange, activeFileId, handleSelectFile]);

  const toggleFolder = useCallback((folder: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folder)) next.delete(folder);
      else next.add(folder);
      return next;
    });
  }, []);

  // Build outline from current active file content
  const outline = extractOutline(documentContent);
  const { folders, rootFiles } = buildFolderTree(files);

  const renderFile = (file: FileItem) => {
    const Icon = getFileIcon(file.path);
    const color = getFileColor(file.path);
    const fileName = file.path.includes("/") ? file.path.split("/").pop()! : file.path;

    return (
      <div key={file.id} className="group relative">
        {renamingId === file.id ? (
          <div className="px-2 py-1">
            <input
              ref={renameInputRef}
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={() => handleRename(file)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename(file);
                if (e.key === "Escape") setRenamingId(null);
              }}
              className="w-full px-1.5 py-0.5 rounded text-[11px] bg-surface-raised border border-brand text-ink focus:outline-none"
            />
          </div>
        ) : (
          <button
            onClick={() => handleSelectFile(file)}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] transition-colors",
              file.id === activeFileId
                ? "bg-brand/10 text-brand font-medium"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <Icon size={14} className={cn(color, "shrink-0")} />
            <span className="truncate">{fileName}</span>
            {file.isMain && (
              <span className="ml-auto text-[8px] font-medium px-1 py-0.5 rounded bg-brand/10 text-brand shrink-0">
                main
              </span>
            )}

            {/* Context menu trigger */}
            {!file.isMain && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setContextMenuId(contextMenuId === file.id ? null : file.id);
                }}
                className="ml-auto p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-surface-raised/80 transition-opacity shrink-0"
              >
                <DotsThree size={12} />
              </button>
            )}
          </button>
        )}

        {/* Context menu dropdown */}
        {contextMenuId === file.id && (
          <div className="absolute right-2 top-full z-20 w-32 rounded-lg glass-panel border border-border shadow-lg py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRenamingId(file.id);
                setRenameValue(file.path);
                setContextMenuId(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 text-[10px] text-ink hover:bg-surface-raised transition-colors"
            >
              <PencilSimple size={12} />
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(file);
                setContextMenuId(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 text-[10px] text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash size={12} />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle">
        <span className="text-[10px] font-semibold text-ink-muted/60 tracking-wider uppercase">
          Files
        </span>
        <button
          onClick={() => setShowNewFile(true)}
          className="p-1 rounded-md text-ink-muted hover:text-brand hover:bg-brand/10 transition-colors"
          title="New file"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-0.5">
        {/* New file input */}
        {showNewFile && (
          <div className="px-1 py-1">
            <input
              ref={newFileInputRef}
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onBlur={() => { if (!newFileName.trim()) setShowNewFile(false); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateFile();
                if (e.key === "Escape") { setShowNewFile(false); setNewFileName(""); }
              }}
              placeholder="filename.tex"
              className="w-full px-2 py-1 rounded text-[11px] bg-surface-raised border border-brand text-ink placeholder:text-ink-muted focus:outline-none"
            />
          </div>
        )}

        {/* Root files */}
        {rootFiles.map(renderFile)}

        {/* Folders */}
        {Object.entries(folders).map(([folder, folderFiles]) => (
          <div key={folder}>
            <button
              onClick={() => toggleFolder(folder)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              <CaretRight
                size={10}
                className={cn(
                  "transition-transform shrink-0",
                  expandedFolders.has(folder) && "rotate-90"
                )}
              />
              {expandedFolders.has(folder) ? (
                <FolderOpen size={14} className="text-amber-500 shrink-0" />
              ) : (
                <FolderSimple size={14} className="text-amber-500 shrink-0" />
              )}
              <span className="truncate">{folder}/</span>
            </button>
            {expandedFolders.has(folder) && (
              <div className="pl-4 space-y-0.5">
                {folderFiles.map(renderFile)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Document Outline */}
      <div className="border-t border-border-subtle">
        <button
          onClick={() => setShowOutline(!showOutline)}
          className="w-full flex items-center justify-between px-3 py-2"
        >
          <div className="flex items-center gap-1.5">
            <ListBullets size={12} className="text-ink-muted" />
            <span className="text-[10px] font-semibold text-ink-muted/60 tracking-wider uppercase">
              Outline
            </span>
          </div>
          <CaretRight
            size={10}
            className={cn(
              "text-ink-muted transition-transform",
              showOutline && "rotate-90"
            )}
          />
        </button>

        {showOutline && (
          <div className="px-2 pb-2 max-h-48 overflow-y-auto space-y-0.5">
            {outline.length === 0 ? (
              <p className="text-[9px] text-ink-muted/40 text-center py-2">
                No sections found
              </p>
            ) : (
              outline.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onJumpToLine?.(item.line)}
                  className="w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-left text-[10px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
                  style={{ paddingLeft: `${8 + item.level * 12}px` }}
                >
                  <ArrowLineDown size={9} className="shrink-0 opacity-50" />
                  <span className="truncate">{item.title}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
