"use client";

import { useState, useCallback, useRef } from "react";
import { Plus, LinkSimple, FilePdf, X, CircleNotch, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { saveWebSourceFromUrl } from "@/lib/actions/web-sources";

type Tab = "url" | "pdf";
type Status = "idle" | "loading" | "success" | "error";

export function AddSourceButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
        bg-[var(--library-accent)] text-white hover:bg-[var(--library-accent-hover)]
        transition-colors"
    >
      <Plus size={16} weight="bold" />
      Add Source
    </button>
  );
}

export function AddSourceDialog({
  open,
  onClose,
  activeProjectId,
}: {
  open: boolean;
  onClose: () => void;
  activeProjectId?: number | null;
}) {
  const [tab, setTab] = useState<Tab>("url");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [savedTitle, setSavedTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setUrl("");
    setStatus("idle");
    setMessage("");
    setSavedTitle("");
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const handlePasteUrl = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("Saving and extracting content...");

    try {
      const result = await saveWebSourceFromUrl(trimmed);
      if (result.alreadySaved) {
        setStatus("success");
        setMessage("Already in your library");
        setSavedTitle(result.title);
      } else {
        setStatus("success");
        setMessage("Saved to Inbox — extracting content in background");
        setSavedTitle(result.title);
      }
      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to save URL");
    }
  }, [url, handleClose]);

  const handlePdfUpload = useCallback(async (file: File) => {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setMessage("Please select a PDF file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setStatus("error");
      setMessage("File too large (max 50 MB)");
      return;
    }

    setStatus("loading");
    setMessage("Uploading and processing PDF...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.pdf$/i, ""));
      if (activeProjectId) {
        formData.append("projectId", String(activeProjectId));
      }

      const response = await fetch("/api/library/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      setStatus("success");
      setMessage("PDF saved to Inbox — processing in background");
      setSavedTitle(data.title || file.name);

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to upload PDF");
    }
  }, [activeProjectId, handleClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && tab === "url" && url.trim() && status !== "loading") {
        handlePasteUrl();
      }
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [tab, url, status, handlePasteUrl, handleClose]
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
          w-[480px] max-w-[90vw] bg-[var(--surface)] rounded-xl shadow-xl
          border border-[var(--border-subtle)]"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)]">
          <h2 className="text-sm font-semibold text-ink">Add Source</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-[var(--surface-raised)] text-ink-muted transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 px-5 pt-3">
          <button
            onClick={() => { setTab("url"); resetState(); }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
              tab === "url"
                ? "bg-[var(--library-accent-tint)] text-[var(--library-accent)] font-medium"
                : "text-ink-muted hover:text-ink hover:bg-[var(--surface-raised)]"
            )}
          >
            <LinkSimple size={16} />
            Paste URL
          </button>
          <button
            onClick={() => { setTab("pdf"); resetState(); }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
              tab === "pdf"
                ? "bg-[var(--library-accent-tint)] text-[var(--library-accent)] font-medium"
                : "text-ink-muted hover:text-ink hover:bg-[var(--surface-raised)]"
            )}
          >
            <FilePdf size={16} />
            Upload PDF
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          {tab === "url" && (
            <div className="space-y-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="url"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setStatus("idle"); }}
                  placeholder="https://example.com/article"
                  className="w-full px-3 py-2.5 rounded-lg border border-[var(--border-subtle)]
                    bg-[var(--surface)] text-sm text-ink placeholder:text-ink-muted/50
                    focus:outline-none focus:ring-2 focus:ring-[var(--library-accent)]/30
                    focus:border-[var(--library-accent)]"
                  disabled={status === "loading"}
                  autoFocus
                />
              </div>
              <button
                onClick={handlePasteUrl}
                disabled={!url.trim() || status === "loading"}
                className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors
                  bg-[var(--library-accent)] text-white hover:bg-[var(--library-accent-hover)]
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <CircleNotch size={16} className="animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save to Library"
                )}
              </button>
            </div>
          )}

          {tab === "pdf" && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePdfUpload(file);
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={status === "loading"}
                className="w-full py-8 rounded-lg border-2 border-dashed border-[var(--border-subtle)]
                  hover:border-[var(--library-accent)]/50 hover:bg-[var(--library-accent-tint)]/30
                  transition-colors text-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex flex-col items-center gap-2 text-ink-muted">
                    <CircleNotch size={28} className="animate-spin text-[var(--library-accent)]" />
                    <span className="text-sm">Processing...</span>
                  </span>
                ) : (
                  <span className="flex flex-col items-center gap-2 text-ink-muted">
                    <FilePdf size={28} />
                    <span className="text-sm">Click to select a PDF file</span>
                    <span className="text-xs text-ink-muted/60">Max 50 MB</span>
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Status message */}
          {status !== "idle" && status !== "loading" && (
            <div
              className={cn(
                "mt-3 flex items-start gap-2 px-3 py-2.5 rounded-lg text-sm",
                status === "success" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
                status === "error" && "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
              )}
            >
              {status === "success" && <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0" />}
              {status === "error" && <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" />}
              <div>
                <p>{message}</p>
                {savedTitle && status === "success" && (
                  <p className="mt-0.5 text-xs opacity-70">{savedTitle}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
