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
      if (s.openAccessPdfUrl || s.fullTextUrl) lines.push(`UR  - ${s.openAccessPdfUrl || s.fullTextUrl}`);
      else if (s.doi) lines.push(`UR  - https://doi.org/${s.doi}`);
      lines.push(`ER  - `);
      return lines.join("\n");
    })
    .join("\n\n");
}

// ── Markdown to simple HTML (for PDF export) ─────────────────────
function markdownToSimpleHTML(md: string): string {
  const lines = md.split("\n");
  const htmlParts: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    if (line === "") continue;

    // Headings
    if (line.startsWith("#### ")) {
      htmlParts.push(`<h4>${escapeHTML(line.slice(5))}</h4>`);
    } else if (line.startsWith("### ")) {
      htmlParts.push(`<h3>${escapeHTML(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      htmlParts.push(`<h2>${escapeHTML(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      htmlParts.push(`<h1>${escapeHTML(line.slice(2))}</h1>`);
    } else if (/^---+$/.test(line) || /^\*\*\*+$/.test(line)) {
      // Horizontal rule — skip, the PDF doesn't need it
    } else if (line.startsWith("> ")) {
      // Blockquote — render as italic paragraph
      htmlParts.push(`<p>${escapeHTML(line.slice(2))}</p>`);
    } else if (/^[-*]\s/.test(line)) {
      // List item — render as indented paragraph with bullet
      htmlParts.push(`<p>\u2022 ${escapeHTML(line.replace(/^[-*]\s+/, ""))}</p>`);
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered list — keep the number
      htmlParts.push(`<p>${escapeHTML(line)}</p>`);
    } else if (line.startsWith("|")) {
      // Table row — collect all table rows and render as text
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      // Skip separator rows (|---|---|)
      if (cells.every((c) => /^[-:]+$/.test(c))) continue;
      htmlParts.push(`<p>${escapeHTML(cells.join("  |  "))}</p>`);
    } else {
      htmlParts.push(`<p>${escapeHTML(line)}</p>`);
    }
  }

  return htmlParts.join("\n");
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Inline formatting (bold, italic, citation superscripts) ─────
function applyInlineFormatting(text: string, supStyle: string): string {
  let result = escapeHTML(text);
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text* (not inside bold markers)
  result = result.replace(
    /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g,
    "<em>$1</em>",
  );
  // Citation markers: [N] → styled superscript
  result = result.replace(
    /\[(\d+)\]/g,
    `<sup style="${supStyle}">[$1]</sup>`,
  );
  return result;
}

// ── Markdown → rich HTML with inline styles (for clipboard) ─────
// Google Docs / Word ignore CSS classes — only inline styles work.
function markdownToRichHTML(
  md: string,
  sources: DeepResearchSource[],
): string {
  const S = {
    h1: "font-size:24px;font-weight:bold;margin:24px 0 12px 0;color:#1a1a1a;",
    h2: "font-size:20px;font-weight:bold;margin:20px 0 10px 0;color:#1a1a1a;",
    h3: "font-size:16px;font-weight:bold;margin:16px 0 8px 0;color:#1a1a1a;",
    h4: "font-size:14px;font-weight:bold;font-style:italic;margin:12px 0 6px 0;color:#1a1a1a;",
    p: "margin:8px 0;line-height:1.6;color:#333;",
    table: "border-collapse:collapse;margin:12px 0;width:100%;",
    th: "border:1px solid #ccc;padding:8px 12px;background:#f5f5f5;font-weight:bold;text-align:left;",
    td: "border:1px solid #ccc;padding:8px 12px;text-align:left;",
    blockquote:
      "border-left:3px solid #ccc;padding:8px 16px;margin:12px 0;color:#555;font-style:italic;",
    sup: "font-size:10px;color:#2563eb;vertical-align:super;text-decoration:none;",
    hr: "border:none;border-top:1px solid #e5e5e5;margin:16px 0;",
    li: "margin:4px 0;line-height:1.6;color:#333;",
  };

  const fmt = (text: string) => applyInlineFormatting(text, S.sup);

  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    // Blank line — skip
    if (line === "") {
      i++;
      continue;
    }

    // Headings (order matters: #### before ### before ## before #)
    if (line.startsWith("#### ")) {
      out.push(`<h4 style="${S.h4}">${fmt(line.slice(5))}</h4>`);
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(`<h3 style="${S.h3}">${fmt(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(`<h2 style="${S.h2}">${fmt(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      out.push(`<h1 style="${S.h1}">${fmt(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line) || /^\*\*\*+$/.test(line)) {
      out.push(`<hr style="${S.hr}" />`);
      i++;
      continue;
    }

    // Blockquote — collect consecutive > lines
    if (line.startsWith("> ")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("> ")) {
        parts.push(lines[i].trimEnd().slice(2));
        i++;
      }
      out.push(
        `<blockquote style="${S.blockquote}">${fmt(parts.join(" "))}</blockquote>`,
      );
      continue;
    }

    // Table — collect all | rows, render as <table>
    if (line.startsWith("|")) {
      const tableRows: string[][] = [];
      let hasSeparator = false;
      while (i < lines.length && lines[i].trimEnd().startsWith("|")) {
        const raw = lines[i].trimEnd();
        const cells = raw
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim());
        // Detect separator row (|---|---|)
        if (cells.every((c) => /^[-:]+$/.test(c))) {
          hasSeparator = true;
          i++;
          continue;
        }
        tableRows.push(cells);
        i++;
      }
      if (tableRows.length > 0) {
        out.push(`<table style="${S.table}">`);
        const headerRow = hasSeparator ? tableRows[0] : null;
        const bodyStart = hasSeparator ? 1 : 0;
        if (headerRow) {
          out.push("<thead><tr>");
          for (const cell of headerRow) {
            out.push(`<th style="${S.th}">${fmt(cell)}</th>`);
          }
          out.push("</tr></thead>");
        }
        out.push("<tbody>");
        for (let r = bodyStart; r < tableRows.length; r++) {
          out.push("<tr>");
          for (const cell of tableRows[r]) {
            out.push(`<td style="${S.td}">${fmt(cell)}</td>`);
          }
          out.push("</tr>");
        }
        out.push("</tbody></table>");
      }
      continue;
    }

    // Unordered list — collect consecutive - or * items
    if (/^[-*]\s/.test(line)) {
      out.push("<ul>");
      while (i < lines.length && /^[-*]\s/.test(lines[i].trimEnd())) {
        const text = lines[i].trimEnd().replace(/^[-*]\s+/, "");
        out.push(`<li style="${S.li}">${fmt(text)}</li>`);
        i++;
      }
      out.push("</ul>");
      continue;
    }

    // Ordered list — collect consecutive numbered items
    if (/^\d+\.\s/.test(line)) {
      out.push("<ol>");
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimEnd())) {
        const text = lines[i].trimEnd().replace(/^\d+\.\s+/, "");
        out.push(`<li style="${S.li}">${fmt(text)}</li>`);
        i++;
      }
      out.push("</ol>");
      continue;
    }

    // Default: paragraph
    out.push(`<p style="${S.p}">${fmt(line)}</p>`);
    i++;
  }

  // ── References section from sources ──────────────────────────────
  if (sources.length > 0) {
    out.push(`<h2 style="${S.h2}">References</h2>`);
    out.push("<ol>");
    for (const s of sources) {
      const authorsText =
        s.authors.length > 3
          ? `${s.authors.slice(0, 3).join(", ")} et al.`
          : s.authors.join(", ");
      let citation = `${escapeHTML(authorsText)}. ${escapeHTML(s.title)}.`;
      if (s.journal) citation += ` <em>${escapeHTML(s.journal)}</em>`;
      if (s.year) citation += ` (${s.year})`;
      citation += ".";
      if (s.doi) citation += ` DOI: ${escapeHTML(s.doi)}`;
      out.push(`<li style="${S.li}">${citation}</li>`);
    }
    out.push("</ol>");
  }

  return out.join("\n");
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
  const [studioError, setStudioError] = useState<string | null>(null);

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

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleExportPDF = useCallback(async () => {
    setPdfLoading(true);
    setPdfError(null);
    try {
      // Convert markdown to simple HTML block elements for the PDF generator
      const htmlContent = markdownToSimpleHTML(markdownReport);

      // Build citation strings for the references section
      const citations = sources.map((s, idx) => {
        const authorsText =
          s.authors.length > 3
            ? `${s.authors.slice(0, 3).join(", ")} et al.`
            : s.authors.join(", ");
        let citation = `[${idx + 1}] ${authorsText}. ${s.title}.`;
        if (s.journal) citation += ` ${s.journal}`;
        if (s.year) citation += ` (${s.year})`;
        citation += ".";
        if (s.doi) citation += ` DOI: ${s.doi}`;
        return citation;
      });

      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: topic,
          content: htmlContent,
          citations: citations.length > 0 ? citations : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `PDF generation failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF export failed:", err);
      const message = err instanceof Error ? err.message : "PDF export failed";
      setPdfError(message);
      setTimeout(() => setPdfError(null), 5000);
    } finally {
      setPdfLoading(false);
    }
  }, [markdownReport, topic, sources]);

  const handleCopyClipboard = useCallback(async () => {
    try {
      const html = markdownToRichHTML(markdownReport, sources);

      // Modern browsers: write both HTML and plain text
      if (
        typeof ClipboardItem !== "undefined" &&
        navigator.clipboard?.write
      ) {
        const item = new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([markdownReport], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
      } else {
        // Fallback: plain text only
        await navigator.clipboard.writeText(markdownReport);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last-resort fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = markdownReport;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [markdownReport, sources]);

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
    setStudioError(null);
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
      const message = err instanceof Error ? err.message : "Failed to open in studio";
      setStudioError(message);
      setStudioLoading(false);
      // Auto-clear error after 5 seconds
      setTimeout(() => setStudioError(null), 5000);
    }
  }, [topic, mode, markdownReport, sources, keyFindings, gaps, router]);

  return (
    <div className="flex items-center gap-1.5 print:hidden">
      <button
        onClick={handleExportMarkdown}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white transition-colors"
        title="Download as Markdown"
      >
        <Download size={14} />
        <span className="hidden sm:inline">.md</span>
      </button>
      <div className="relative">
        <button
          onClick={handleExportPDF}
          disabled={pdfLoading}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
            pdfError
              ? "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50"
              : "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
          }`}
          title={pdfError || "Download as PDF"}
        >
          {pdfLoading ? <Loader2 size={14} className="animate-spin" /> : <Printer size={14} />}
          <span className="hidden sm:inline">{pdfLoading ? "..." : pdfError ? "Failed" : "PDF"}</span>
        </button>
        {pdfError && (
          <div className="absolute top-full left-0 mt-1 px-2 py-1 text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700/50 rounded-md whitespace-nowrap z-10">
            {pdfError}
          </div>
        )}
      </div>
      <button
        onClick={handleCopyClipboard}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white transition-colors"
        title="Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
      <div className="w-px h-5 bg-gray-300 dark:bg-gray-700/50 mx-0.5" />
      <div className="relative">
        <button
          onClick={handleOpenInStudio}
          disabled={studioLoading}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
            studioError
              ? "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50"
              : "text-blue-700 dark:text-gray-300 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 hover:text-blue-800 dark:hover:text-white"
          }`}
          title={studioError || "Open in Studio editor"}
        >
          {studioLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <PenLine size={14} />
          )}
          <span className="hidden sm:inline">
            {studioLoading ? "Opening..." : studioError ? "Failed" : "Open in Studio"}
          </span>
        </button>
        {studioError && (
          <div className="absolute top-full right-0 mt-1 px-2 py-1 text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700/50 rounded-md whitespace-nowrap z-10">
            {studioError}
          </div>
        )}
      </div>
      {sources.length > 0 && (
        <>
          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700/50 mx-0.5" />
          <button
            onClick={handleExportBibTeX}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Download references as BibTeX"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">.bib</span>
          </button>
          <button
            onClick={handleExportRIS}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white transition-colors"
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
