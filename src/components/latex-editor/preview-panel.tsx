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

const MAX_LATEX_LENGTH = 100_000;

// Simple LaTeX-to-HTML converter for live preview (no server needed)
function latexToHtml(tex: string): string {
  // Guard against excessively long input that could cause ReDoS
  if (tex.length > MAX_LATEX_LENGTH) {
    return '<div class="latex-math-error">Document too large for live preview. Please use PDF compilation instead.</div>';
  }

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

  // Sections
  html = html.replace(/\\section\*?\{([^}]*)\}/g, '<h2 class="latex-section">$1</h2>');
  html = html.replace(/\\subsection\*?\{([^}]*)\}/g, '<h3 class="latex-subsection">$1</h3>');
  html = html.replace(/\\subsubsection\*?\{([^}]*)\}/g, '<h4 class="latex-subsubsection">$1</h4>');

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

  // Remove remaining known commands that don't render (safely)
  html = html.replace(/\\(?:usepackage|documentclass|bibliographystyle|bibliography|label|ref|cite|includegraphics|input|include)\{[^}]*\}(?:\{[^}]*\})?/g, "");
  html = html.replace(/\\(?:usepackage|documentclass)\[[^\]]*\]\{[^}]*\}/g, "");

  // Line breaks
  html = html.replace(/\\\\/g, "<br />");

  // Convert double newlines to paragraph breaks
  html = html.replace(/\n\n+/g, "</p><p>");

  // Wrap in paragraphs
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

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

export function PreviewPanel() {
  const documentContent = useLatexEditorStore((s) => s.documentContent);
  const previewMode = useLatexEditorStore((s) => s.previewMode);
  const compiledPdfUrl = useLatexEditorStore((s) => s.compiledPdfUrl);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderedHtml, setRenderedHtml] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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
    <div className="h-full overflow-auto">
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
        /* KaTeX styles import */
        @import url('https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.css');
      `}</style>
    </div>
  );
}
