import { convertEnvironments } from "./latex-environments";
/**
 * LaTeX-to-HTML converter for live preview.
 * Converts a subset of LaTeX to HTML for client-side rendering.
 * Math rendering is handled separately by KaTeX.
 */

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function latexToHtml(tex: string): string {
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

  // Footnotes — render inline as superscript (Overleaf parity)
  html = html.replace(
    /\\footnote\{([^}]*)\}/g,
    '<sup class="latex-footnote" title="$1">[*]</sup>'
  );

  // \textsc (small caps)
  html = html.replace(
    /\\textsc\{([^}]*)\}/g,
    '<span style="font-variant:small-caps">$1</span>'
  );

  // \href{url}{text}
  html = html.replace(
    /\\href\{([^}]*)\}\{([^}]*)\}/g,
    '<a href="$1" target="_blank" rel="noopener">$2</a>'
  );

  // \url{...}
  html = html.replace(
    /\\url\{([^}]*)\}/g,
    '<a href="$1" target="_blank" rel="noopener"><code>$1</code></a>'
  );

  // Convert environments (figure, table, verbatim, quote, center)
  html = convertEnvironments(html);
  // Remove remaining known commands that don't render (safely)
  html = html.replace(/\\(?:usepackage|documentclass|bibliographystyle|bibliography|label|ref|cite|includegraphics|input|include)\{[^}]*\}(?:\{[^}]*\})?/g, "");
  html = html.replace(/\\(?:usepackage|documentclass)\[[^\]]*\]\{[^}]*\}/g, "");

  // \newpage and \clearpage
  html = html.replace(/\\(?:newpage|clearpage|cleardoublepage)/g, '<hr class="latex-pagebreak" />');

  // \noindent — just remove
  html = html.replace(/\\noindent\s*/g, "");

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
