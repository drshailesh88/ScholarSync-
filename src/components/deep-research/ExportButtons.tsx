"use client";

import { useState, useCallback } from "react";
import { Download, Printer, Copy, Check } from "lucide-react";

interface ExportButtonsProps {
  markdownReport: string;
  topic: string;
}

export function ExportButtons({ markdownReport, topic }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleExportMarkdown = useCallback(() => {
    const blob = new Blob([markdownReport], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}_report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdownReport, topic]);

  const handleExportPDF = useCallback(() => {
    window.print();
  }, []);

  const handleCopyClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdownReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = markdownReport;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [markdownReport]);

  return (
    <div className="flex items-center gap-1.5 print:hidden">
      <button
        onClick={handleExportMarkdown}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/60 border border-gray-700/50 rounded-lg hover:bg-gray-700/60 hover:text-white transition-colors"
        title="Download as Markdown"
      >
        <Download size={14} />
        <span className="hidden sm:inline">.md</span>
      </button>
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/60 border border-gray-700/50 rounded-lg hover:bg-gray-700/60 hover:text-white transition-colors"
        title="Print / Save as PDF"
      >
        <Printer size={14} />
        <span className="hidden sm:inline">PDF</span>
      </button>
      <button
        onClick={handleCopyClipboard}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/60 border border-gray-700/50 rounded-lg hover:bg-gray-700/60 hover:text-white transition-colors"
        title="Copy to clipboard"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
