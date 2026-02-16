"use client";

import { useState, useCallback } from "react";
import type { JSONContent } from "@tiptap/core";
import {
  X,
  FileDoc,
  FilePdf,
  DownloadSimple,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { tiptapToDocx } from "./tiptap-to-docx";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: JSONContent;
  title: string;
}

type ExportFormat = "docx" | "pdf";

export function ExportDialog({
  isOpen,
  onClose,
  content,
  title,
}: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>("docx");
  const [doubleSpaced, setDoubleSpaced] = useState(true);
  const [includePageNumbers, setIncludePageNumbers] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    setIsExporting(true);

    try {
      if (format === "docx") {
        const buffer = await tiptapToDocx(content, {
          title,
          doubleSpaced,
          includePageNumbers,
        });

        const blob = new Blob([buffer as BlobPart], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // PDF: use browser print for now
        window.print();
      }

      onClose();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [format, content, title, doubleSpaced, includePageNumbers, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-surface border border-border rounded-xl shadow-xl z-50">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-ink">
            Export Manuscript
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Format selection */}
          <div>
            <label className="text-xs font-medium text-ink-muted uppercase tracking-wider">
              Format
            </label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setFormat("docx")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors",
                  format === "docx"
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border text-ink-muted hover:border-ink-muted"
                )}
              >
                <FileDoc size={20} />
                <span className="text-sm font-medium">DOCX</span>
              </button>
              <button
                onClick={() => setFormat("pdf")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors",
                  format === "pdf"
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border text-ink-muted hover:border-ink-muted"
                )}
              >
                <FilePdf size={20} />
                <span className="text-sm font-medium">PDF</span>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includePageNumbers}
                onChange={(e) => setIncludePageNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-border text-brand focus:ring-brand"
              />
              <span className="text-sm text-ink">Include page numbers</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={doubleSpaced}
                onChange={(e) => setDoubleSpaced(e.target.checked)}
                className="w-4 h-4 rounded border-border text-brand focus:ring-brand"
              />
              <span className="text-sm text-ink">Double-spaced</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-ink-muted hover:text-ink rounded-lg hover:bg-surface-raised transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-hover rounded-lg transition-colors disabled:opacity-50"
          >
            <DownloadSimple size={16} />
            {isExporting ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>
    </>
  );
}
