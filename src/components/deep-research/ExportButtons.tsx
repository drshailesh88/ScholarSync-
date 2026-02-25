"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Download, Printer, Copy, Check, FileText, PenLine, Loader2 } from "lucide-react";
import type { DeepResearchSource } from "./types";

// ── BibTeX generation ─────────────────────────────────────────────
function generateBibTeX(sources: DeepResearchSource[]): string {
  return sources
    .map((s, idx) => {
      // Build a citation key: firstAuthorLastName + year + first word of title
      const firstAuthor = s.authors[0] || "Unknown";
      const lastName = firstAuthor.split(/[,\s]+/)[0].replace(/[^a-zA-Z]/g, "");
      const titleWord = (s.title.split(/\s+/)[0] || "").replace(/[^a-zA-Z]/g, "");
      const key = `${lastName}${s.year || ""}${titleWord}`.toLowerCase() || `ref${idx + 1}`;

      const authors = s.authors.join(" and ");
      const lines = [
        `@article{${key},`,
        `  author    = {${authors}},`,
        `  title     = {${s.title}},`,
        `  journal   = {${s.journal || ""}},`,
        `  year      = {${s.year || ""}},`,
      ];
      if (s.doi) lines.push(`  doi       = {${s.doi}},`);
      if (s.pmid) lines.push(`  pmid      = {${s.pmid}},`);
      if (s.abstract) lines.push(`  abstract  = {${s.abstract.slice(0, 500)}},`);
      lines.push(`}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

// ── RIS generation ────────────────────────────────────────────────
function generateRIS(sources: DeepResearchSource[]): string {
  return sources
    .map((s) => {
      const lines = [
        `TY  - JOUR`,
        `TI  - ${s.title}`,
      ];
      for (const author of s.authors) {
        lines.push(`AU  - ${author}`);
      }
      if (s.journal) lines.push(`JO  - ${s.journal}`);
      if (s.year) lines.push(`PY  - ${s.year}`);
      if (s.doi) lines.push(`DO  - ${s.doi}`);
      if (s.pmid) lines.push(`AN  - PMID:${s.pmid}`);
      if (s.abstract) lines.push(`AB  - ${s.abstract.slice(0, 500)}`);
      if (s.pdfUrl) lines.push(`UR  - ${s.pdfUrl}`);
      else if (s.doi) lines.push(`UR  - https://doi.org/${s.doi}`);
      lines.push(`ER  - `);
      return lines.join("\n");
    })
    .join("\n\n");
}

interface ExportButtonsProps {
  markdownReport: string;
  topic: string;
  sources?: DeepResearchSource[];
  keyFindings?: string[];
  gaps?: string[];
  mode?: string;
}

export function ExportButtons({
  markdownReport,
  topic,
  sources = [],
  keyFindings = [],
  gaps = [],
  mode = "standard",
}: ExportButtonsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [studioLoading, setStudioLoading] = useState(false);

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

  const handleExportBibTeX = useCallback(() => {
    if (sources.length === 0) return;
    const bibtex = generateBibTeX(sources);
    const blob = new Blob([bibtex], { type: "application/x-bibtex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}_references.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sources, topic]);

  const handleExportRIS = useCallback(() => {
    if (sources.length === 0) return;
    const ris = generateRIS(sources);
    const blob = new Blob([ris], { type: "application/x-research-info-systems" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}_references.ris`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sources, topic]);

  const handleOpenInStudio = useCallback(async () => {
    setStudioLoading(true);
    try {
      const res = await fetch("/api/deep-research/open-in-studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          mode,
          markdownReport,
          sources,
          keyFindings,
          gaps,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to open in studio");
      }

      const { redirectUrl } = await res.json();
      router.push(redirectUrl);
    } catch (err) {
      console.error("Open in Studio failed:", err);
      setStudioLoading(false);
    }
  }, [topic, mode, markdownReport, sources, keyFindings, gaps, router]);

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
      <div className="w-px h-5 bg-gray-700/50 mx-0.5" />
      <button
        onClick={handleOpenInStudio}
        disabled={studioLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 hover:text-white transition-colors disabled:opacity-50"
        title="Open in Studio editor"
      >
        {studioLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <PenLine size={14} />
        )}
        <span className="hidden sm:inline">
          {studioLoading ? "Opening..." : "Open in Studio"}
        </span>
      </button>
      {sources.length > 0 && (
        <>
          <div className="w-px h-5 bg-gray-700/50 mx-0.5" />
          <button
            onClick={handleExportBibTeX}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/60 border border-gray-700/50 rounded-lg hover:bg-gray-700/60 hover:text-white transition-colors"
            title="Download references as BibTeX"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">.bib</span>
          </button>
          <button
            onClick={handleExportRIS}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800/60 border border-gray-700/50 rounded-lg hover:bg-gray-700/60 hover:text-white transition-colors"
            title="Download references as RIS (EndNote/Mendeley)"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">.ris</span>
          </button>
        </>
      )}
    </div>
  );
}
