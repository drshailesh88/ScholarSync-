"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLatexEditorStore } from "@/stores/latex-editor-store";

/**
 * Live Preview Panel — renders LaTeX content client-side using KaTeX + basic LaTeX parsing.
 * Zero server cost. Updates as you type.
 *
 * For Phase 1, we use KaTeX for math and a lightweight LaTeX-to-HTML parser
 * for document structure (sections, paragraphs, basic formatting).
 * LaTeX.js integration can be enhanced in later phases.
 */

// Simple LaTeX-to-HTML converter for live preview (no server needed)
function latexToHtml(tex: string): string {
  let html = tex;

  // Remove preamble (everything before \begin{document})
  const docStart = html.indexOf("\\begin{document}");
  const docEnd = html.indexOf("\\end{document}");
  if (docStart !== -1) {
    html = html.slice(docStart + "\\begin{document}".length);
  }
  if (docEnd !== -1) {
    html = html.slice(0, html.indexOf("\\end{document}"));
  }

  // Remove comments
  html = html.replace(/%.*$/gm, "");

  // Extract \title, \author, \date from preamble
  const titleMatch = tex.match(/\\title\{([^}]*)\}/);
  const authorMatch = tex.match(/\\author\{([^}]*)\}/);
  const dateMatch = tex.match(/\\date\{([^}]*)\}/);

  let titleBlock = "";
  // \maketitle
  if (html.includes("\\maketitle")) {
    titleBlock = '<div class="latex-title-block">';
    if (titleMatch) titleBlock += `<h1 class="latex-title">${escapeHtml(titleMatch[1])}</h1>`;
    if (authorMatch) titleBlock += `<p class="latex-author">${escapeHtml(authorMatch[1])}</p>`;
    if (dateMatch) {
      const dateStr = dateMatch[1] === "\\today"
        ? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : dateMatch[1];
      titleBlock += `<p class="latex-date">${escapeHtml(dateStr)}</p>`;
    }
    titleBlock += "</div>";
    html = html.replace("\\maketitle", titleBlock);
  }

  // Abstract
  html = html.replace(
    /\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/g,
    '<div class="latex-abstract"><h3>Abstract</h3><p>$1</p></div>'
  );

  // Sections — track line numbers for scroll sync
  // We count the original line number in the tex source for each section
  const texLines = tex.split("\n");
  const sectionLineMap: Record<string, number> = {};
  texLines.forEach((line, idx) => {
    const secMatch = line.match(/\\((?:sub)*section)\*?\{([^}]*)\}/);
    if (secMatch) {
      const key = `${secMatch[1]}-${secMatch[2]}`;
      sectionLineMap[key] = idx + 1;
    }
  });

  html = html.replace(/\\section\*?\{([^}]*)\}/g, (_m, title: string) => {
    const lineNum = sectionLineMap[`section-${title}`] ?? 0;
    return `<h2 class="latex-section" data-line="${lineNum}">${title}</h2>`;
  });
  html = html.replace(/\\subsection\*?\{([^}]*)\}/g, (_m, title: string) => {
    const lineNum = sectionLineMap[`subsection-${title}`] ?? 0;
    return `<h3 class="latex-subsection" data-line="${lineNum}">${title}</h3>`;
  });
  html = html.replace(/\\subsubsection\*?\{([^}]*)\}/g, (_m, title: string) => {
    const lineNum = sectionLineMap[`subsubsection-${title}`] ?? 0;
    return `<h4 class="latex-subsubsection" data-line="${lineNum}">${title}</h4>`;
  });

  // Bold, italic, underline
  html = html.replace(/\\textbf\{([^}]*)\}/g, "<strong>$1</strong>");
  html = html.replace(/\\textit\{([^}]*)\}/g, "<em>$1</em>");
  html = html.replace(/\\underline\{([^}]*)\}/g, '<u>$1</u>');
  html = html.replace(/\\emph\{([^}]*)\}/g, "<em>$1</em>");

  // Typewriter
  html = html.replace(/\\texttt\{([^}]*)\}/g, "<code>$1</code>");

  // Lists
  html = html.replace(/\\begin\{itemize\}/g, "<ul>");
  html = html.replace(/\\end\{itemize\}/g, "</ul>");
  html = html.replace(/\\begin\{enumerate\}/g, "<ol>");
  html = html.replace(/\\end\{enumerate\}/g, "</ol>");
  html = html.replace(/\\item\s*/g, "<li>");

  // Horizontal rule
  html = html.replace(/\\hrule/g, "<hr />");

  // ── Table rendering ──────────────────────────────────────────────────────
  // Process \begin{table}...\end{table} wrappers (extract caption, label)
  html = html.replace(
    /\\begin\{table\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{table\}/g,
    (_match, inner: string) => {
      const captionMatch = inner.match(/\\caption\{([^}]*)\}/);
      const caption = captionMatch ? captionMatch[1] : "";
      // Remove \caption, \label, \centering from inner — the tabular will be processed next
      const cleaned = inner
        .replace(/\\caption\{[^}]*\}/g, "")
        .replace(/\\label\{[^}]*\}/g, "")
        .replace(/\\centering/g, "");
      return `<div class="latex-table-wrapper">${cleaned}${caption ? `<p class="latex-table-caption">${escapeHtml(caption)}</p>` : ""}</div>`;
    }
  );

  // Process \begin{tabular}{cols}...\end{tabular} → HTML table
  html = html.replace(
    /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
    (_match, inner: string) => {
      const rows = inner
        .split("\\\\")
        .map((r: string) => r.trim())
        .filter((r: string) => r.length > 0 && r !== "\\hline" && r !== "\\toprule" && r !== "\\midrule" && r !== "\\bottomrule");

      let tableHtml = '<table class="latex-tabular">';
      let isFirstRow = true;
      for (const row of rows) {
        // Skip pure rule lines
        const cleanRow = row.replace(/\\(?:hline|toprule|midrule|bottomrule)/g, "").trim();
        if (!cleanRow) continue;

        const cells = cleanRow.split("&").map((c: string) => c.trim());
        const tag = isFirstRow ? "th" : "td";
        tableHtml += "<tr>";
        for (const cell of cells) {
          // Handle \multicolumn{n}{align}{content}
          const multiMatch = cell.match(/\\multicolumn\{(\d+)\}\{[^}]*\}\{([^}]*)\}/);
          if (multiMatch) {
            tableHtml += `<${tag} colspan="${multiMatch[1]}">${multiMatch[2]}</${tag}>`;
          } else {
            tableHtml += `<${tag}>${cell}</${tag}>`;
          }
        }
        tableHtml += "</tr>";
        if (isFirstRow) isFirstRow = false;
      }
      tableHtml += "</table>";
      return tableHtml;
    }
  );

  // ── Citation rendering ───────────────────────────────────────────────────
  // Track citation order for numbered references
  const citeOrder: string[] = [];
  // \cite{key} or \cite{key1,key2}
  html = html.replace(/\\cite[tp]?\{([^}]+)\}/g, (_match, keys: string) => {
    const keyList = keys.split(",").map((k: string) => k.trim());
    const nums = keyList.map((k: string) => {
      let idx = citeOrder.indexOf(k);
      if (idx === -1) {
        citeOrder.push(k);
        idx = citeOrder.length - 1;
      }
      return idx + 1;
    });
    return `<span class="latex-cite">[${nums.join(",")}]</span>`;
  });

  // ── Figure placeholder ───────────────────────────────────────────────────
  html = html.replace(
    /\\begin\{figure\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{figure\}/g,
    (_match, inner: string) => {
      const captionMatch = inner.match(/\\caption\{([^}]*)\}/);
      const caption = captionMatch ? captionMatch[1] : "";
      const imgMatch = inner.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/);
      const imgFile = imgMatch ? imgMatch[1] : "";
      return `<div class="latex-figure-placeholder"><div class="latex-figure-box">[Figure${imgFile ? `: ${escapeHtml(imgFile)}` : ""}]</div>${caption ? `<p class="latex-figure-caption">${escapeHtml(caption)}</p>` : ""}</div>`;
    }
  );

  // ── Ref rendering ────────────────────────────────────────────────────────
  html = html.replace(/\\ref\{([^}]*)\}/g, '<span class="latex-ref">[$1]</span>');
  html = html.replace(/\\eqref\{([^}]*)\}/g, '<span class="latex-ref">($1)</span>');

  // ── Footnote rendering ───────────────────────────────────────────────────
  let footnoteCounter = 0;
  const footnotes: string[] = [];
  html = html.replace(/\\footnote\{([^}]*)\}/g, (_match, text: string) => {
    footnoteCounter++;
    footnotes.push(text);
    return `<sup class="latex-footnote-mark">${footnoteCounter}</sup>`;
  });

  // Remove remaining known commands that don't render (safely)
  html = html.replace(/\\(?:usepackage|documentclass|bibliographystyle|bibliography|label|includegraphics|input|include)\{[^}]*\}(?:\{[^}]*\})?/g, "");
  html = html.replace(/\\(?:usepackage|documentclass)\[[^\]]*\]\{[^}]*\}/g, "");
  html = html.replace(/\\centering/g, "");

  // Line breaks (must be after table processing which uses \\ as row separator)
  html = html.replace(/\\\\/g, "<br />");

  // Convert double newlines to paragraph breaks
  html = html.replace(/\n\n+/g, "</p><p>");

  // Wrap in paragraphs
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Append footnotes section
  if (footnotes.length > 0) {
    html += '<div class="latex-footnotes"><hr />';
    footnotes.forEach((fn, i) => {
      html += `<p class="latex-footnote"><sup>${i + 1}</sup> ${escapeHtml(fn)}</p>`;
    });
    html += "</div>";
  }

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Render math using KaTeX (loaded dynamically)
async function renderMath(container: HTMLElement) {
  try {
    const katex = (await import("katex")).default;

    // Display math: $$ ... $$ and \[ ... \]
    const displayMathRegex = /\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]/g;
    container.innerHTML = container.innerHTML.replace(
      displayMathRegex,
      (_match, p1, p2) => {
        const math = p1 || p2;
        try {
          return katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
            trust: true,
          });
        } catch {
          return `<span class="latex-math-error">${escapeHtml(math)}</span>`;
        }
      }
    );

    // Inline math: $ ... $ (not $$) and \( ... \)
    const inlineMathRegex = /(?<!\$)\$(?!\$)(.*?)\$(?!\$)|\\\(([\s\S]*?)\\\)/g;
    container.innerHTML = container.innerHTML.replace(
      inlineMathRegex,
      (_match, p1, p2) => {
        const math = p1 || p2;
        try {
          return katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
            trust: true,
          });
        } catch {
          return `<span class="latex-math-error">${escapeHtml(math)}</span>`;
        }
      }
    );

    // equation environment
    const equationRegex = /\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g;
    container.innerHTML = container.innerHTML.replace(
      equationRegex,
      (_match, math) => {
        try {
          return `<div class="latex-equation">${katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
            trust: true,
          })}</div>`;
        } catch {
          return `<div class="latex-math-error">${escapeHtml(math)}</div>`;
        }
      }
    );

    // align environment
    const alignRegex = /\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g;
    container.innerHTML = container.innerHTML.replace(
      alignRegex,
      (_match, math) => {
        try {
          return `<div class="latex-equation">${katex.renderToString(
            `\\begin{aligned}${math.trim()}\\end{aligned}`,
            { displayMode: true, throwOnError: false, trust: true }
          )}</div>`;
        } catch {
          return `<div class="latex-math-error">${escapeHtml(math)}</div>`;
        }
      }
    );
  } catch {
    // KaTeX not available — skip math rendering
  }
}

interface PreviewPanelProps {
  /** Current editor top visible line (for scroll sync) */
  editorTopLine?: number;
}

export function PreviewPanel({ editorTopLine }: PreviewPanelProps) {
  const documentContent = useLatexEditorStore((s) => s.documentContent);
  const previewMode = useLatexEditorStore((s) => s.previewMode);
  const compiledPdfUrl = useLatexEditorStore((s) => s.compiledPdfUrl);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [renderedHtml, setRenderedHtml] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isSyncing = useRef(false);

  // Debounced LaTeX -> HTML conversion
  const updatePreview = useCallback((content: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const html = latexToHtml(content);
      setRenderedHtml(html);
    }, 150);
  }, []);

  useEffect(() => {
    updatePreview(documentContent);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [documentContent, updatePreview]);

  // Render math after HTML is set
  useEffect(() => {
    if (containerRef.current && renderedHtml) {
      renderMath(containerRef.current);
    }
  }, [renderedHtml]);

  // Scroll sync: editor line → preview position
  useEffect(() => {
    if (!editorTopLine || !containerRef.current || !scrollContainerRef.current) return;
    if (isSyncing.current) return;

    // Find the nearest heading with data-line <= editorTopLine
    const headings = containerRef.current.querySelectorAll("[data-line]");
    let target: Element | null = null;
    for (const heading of headings) {
      const line = parseInt(heading.getAttribute("data-line") ?? "0", 10);
      if (line > 0 && line <= editorTopLine) {
        target = heading;
      } else if (line > editorTopLine) {
        break;
      }
    }

    if (target) {
      isSyncing.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isSyncing.current = false; }, 200);
    }
  }, [editorTopLine]);

  if (previewMode === "pdf" && compiledPdfUrl) {
    return (
      <div className="h-full w-full">
        <iframe
          src={compiledPdfUrl}
          className="w-full h-full border-0"
          title="Compiled PDF"
        />
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className="h-full overflow-auto">
      {/* Content is generated from user's own LaTeX source — not untrusted external input */}
      <div
        ref={containerRef}
        className="latex-preview max-w-none px-10 py-8"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
      <style jsx global>{`
        .latex-preview {
          font-family: 'Computer Modern Serif', 'Latin Modern Roman', 'Times New Roman', serif;
          font-size: 11pt;
          line-height: 1.6;
          color: var(--color-ink);
        }
        .latex-title-block {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .latex-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--color-ink);
        }
        .latex-author {
          font-size: 1rem;
          color: var(--color-ink-muted);
          margin-bottom: 0.25rem;
        }
        .latex-date {
          font-size: 0.9rem;
          color: var(--color-ink-muted);
        }
        .latex-abstract {
          margin: 1.5rem 2rem;
          padding: 1rem;
          border-left: 3px solid var(--color-brand);
          background: var(--color-brand)05;
          border-radius: 0 8px 8px 0;
        }
        .latex-abstract h3 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          color: var(--color-ink);
        }
        .latex-section {
          font-size: 1.3rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--color-ink);
        }
        .latex-subsection {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--color-ink);
        }
        .latex-subsubsection {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--color-ink);
        }
        .latex-preview p {
          margin-bottom: 0.75rem;
          text-align: justify;
        }
        .latex-preview ul, .latex-preview ol {
          margin: 0.75rem 0;
          padding-left: 2rem;
        }
        .latex-preview li {
          margin-bottom: 0.25rem;
        }
        .latex-equation {
          margin: 1rem 0;
          text-align: center;
          overflow-x: auto;
        }
        .latex-math-error {
          color: #ef4444;
          background: #ef444415;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85em;
        }
        .latex-preview code {
          background: var(--color-surface-raised);
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 0.9em;
        }
        .latex-preview hr {
          border: none;
          border-top: 1px solid var(--color-border-subtle);
          margin: 1.5rem 0;
        }
        /* Table styles — booktabs-inspired (thick top/bottom, thin mid, no verticals) */
        .latex-table-wrapper {
          margin: 1.5rem auto;
          text-align: center;
        }
        .latex-table-caption {
          font-size: 0.85rem;
          color: var(--color-ink-muted);
          margin-top: 0.5rem;
          text-align: center;
          font-style: normal;
        }
        .latex-tabular {
          margin: 0 auto;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .latex-tabular th,
        .latex-tabular td {
          padding: 6px 12px;
          text-align: left;
        }
        .latex-tabular th {
          font-weight: 600;
          border-top: 2px solid var(--color-ink);
          border-bottom: 1px solid var(--color-ink-muted);
        }
        .latex-tabular tr:last-child td {
          border-bottom: 2px solid var(--color-ink);
        }
        /* Citation styles */
        .latex-cite {
          color: var(--color-brand);
          font-weight: 500;
          cursor: default;
        }
        /* Ref styles */
        .latex-ref {
          color: var(--color-brand);
          font-weight: 500;
        }
        /* Figure placeholder */
        .latex-figure-placeholder {
          margin: 1.5rem auto;
          text-align: center;
        }
        .latex-figure-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60%;
          min-height: 80px;
          border: 2px dashed var(--color-border);
          border-radius: 8px;
          color: var(--color-ink-muted);
          font-size: 0.85rem;
          background: var(--color-surface-raised);
        }
        .latex-figure-caption {
          font-size: 0.85rem;
          color: var(--color-ink-muted);
          margin-top: 0.5rem;
          font-style: normal;
        }
        /* Footnotes */
        .latex-footnotes {
          margin-top: 2rem;
          font-size: 0.8rem;
          color: var(--color-ink-muted);
        }
        .latex-footnote {
          margin-bottom: 0.25rem;
        }
        .latex-footnote-mark {
          color: var(--color-brand);
          font-size: 0.7em;
          cursor: default;
        }
        /* KaTeX styles import */
        @import url('https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.css');
      `}</style>
    </div>
  );
}
