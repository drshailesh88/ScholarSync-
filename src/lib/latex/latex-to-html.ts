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

  // Remove comments (but preserve escaped \%)
  html = html.replace(/\\%/g, "\x00PCNT\x00");
  html = html.replace(/%.*$/gm, "");
  html = html.replace(/\x00PCNT\x00/g, "%");

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

  // Sectioning (full LaTeX hierarchy)
  html = html.replace(/\\part\*?\{([^}]*)\}/g, '<h1 class="latex-part" style="text-align:center;font-size:1.8em">$1</h1>');
  html = html.replace(/\\chapter\*?\{([^}]*)\}/g, '<h1 class="latex-chapter">$1</h1>');
  html = html.replace(/\\section\*?\{([^}]*)\}/g, '<h2 class="latex-section">$1</h2>');
  html = html.replace(/\\subsection\*?\{([^}]*)\}/g, '<h3 class="latex-subsection">$1</h3>');
  html = html.replace(/\\subsubsection\*?\{([^}]*)\}/g, '<h4 class="latex-subsubsection">$1</h4>');
  html = html.replace(/\\paragraph\*?\{([^}]*)\}/g, '<strong class="latex-paragraph">$1</strong> ');
  html = html.replace(/\\subparagraph\*?\{([^}]*)\}/g, '<strong class="latex-subparagraph">$1</strong> ');

  // Bold, italic, underline (loop to handle nesting — [^{}]* matches innermost first)
  for (let pass = 0; pass < 4; pass++) {
    html = html.replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>");
    html = html.replace(/\\textit\{([^{}]*)\}/g, "<em>$1</em>");
    html = html.replace(/\\underline\{([^{}]*)\}/g, "<u>$1</u>");
    html = html.replace(/\\emph\{([^{}]*)\}/g, "<em>$1</em>");
  }

  // Typewriter

  // Superscript and subscript
  html = html.replace(/\\textsuperscript\{([^}]*)\}/g, "<sup>$1</sup>");
  html = html.replace(/\\textsubscript\{([^}]*)\}/g, "<sub>$1</sub>");

  // LaTeX logo
  html = html.replace(/\\LaTeX\b/g, '<span class="latex-logo">L<sup>A</sup>T<sub>E</sub>X</span>');
  html = html.replace(/\\TeX\b/g, '<span class="latex-logo">T<sub>E</sub>X</span>');
  html = html.replace(/\\texttt\{([^}]*)\}/g, "<code>$1</code>");

  // Lists
  html = html.replace(/\\begin\{itemize\}/g, "<ul>");
  html = html.replace(/\\end\{itemize\}/g, "</ul>");
  html = html.replace(/\\begin\{enumerate\}/g, "<ol>");
  html = html.replace(/\\end\{enumerate\}/g, "</ol>");
  // Description list (must come before generic \\item)
  html = html.replace(/\\begin\{description\}/g, '<dl class="latex-description">');
  html = html.replace(/\\end\{description\}/g, "</dl>");
  html = html.replace(/\\item\[([^\]]*)\]\s*/g, "<dt>$1</dt><dd>");
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

  // \textcolor{color}{text}
  html = html.replace(
    /\\textcolor\{([^}]*)\}\{([^}]*)\}/g,
    '<span style="color:$1">$2</span>'
  );

  // \colorbox{color}{text}
  html = html.replace(
    /\\colorbox\{([^}]*)\}\{([^}]*)\}/g,
    '<span style="background-color:$1;padding:0.1em 0.3em">$2</span>'
  );

  // Font size commands: {\tiny text} etc.
  const fontSizes: [string, string][] = [
    ["tiny", "0.6em"], ["scriptsize", "0.7em"], ["footnotesize", "0.8em"],
    ["small", "0.9em"], ["normalsize", "1em"], ["large", "1.2em"],
    ["Large", "1.4em"], ["LARGE", "1.7em"], ["huge", "2em"], ["Huge", "2.5em"],
  ];
  for (const [cmd, size] of fontSizes) {
    html = html.replace(
      new RegExp(`\\{\\\\${cmd}\\s+([^}]*)\\}`, "g"),
      `<span style="font-size:${size}">$1</span>`,
    );
  }

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

  // \centering — just remove (handled by parent environment)
  html = html.replace(/\\centering\s*/g, "");

  // \vspace and \hspace
  html = html.replace(/\\vspace\*?\{([^}]*)\}/g, '<div style="margin-top:$1"></div>');
  html = html.replace(/\\hspace\*?\{([^}]*)\}/g, '<span style="margin-left:$1"></span>');

  // \vfill and \hfill — just strip
  html = html.replace(/\\vfill/g, "");
  html = html.replace(/\\hfill/g, "");

  // \tableofcontents, \listoffigures, \listoftables — placeholders
  html = html.replace(/\\tableofcontents/g, '<nav class="latex-toc"><em>Table of Contents</em></nav>');
  html = html.replace(/\\listoffigures/g, '<nav class="latex-lof"><em>List of Figures</em></nav>');
  html = html.replace(/\\listoftables/g, '<nav class="latex-lot"><em>List of Tables</em></nav>');

  // Special LaTeX characters: \$ \% \& \# \_ \{ \}
  html = html.replace(/\\\$/g, "$");
  // \\% already handled above (before comment stripping)
  html = html.replace(/\\&/g, "&amp;");
  html = html.replace(/\\#/g, "#");
  html = html.replace(/\\_/g, "_");
  html = html.replace(/\\\{/g, "{");
  html = html.replace(/\\\}/g, "}");

  // Tilde as non-breaking space (unescaped ~ in LaTeX)
  html = html.replace(/~/g, "\u00a0");

  // Smart quotes: ``...'' → "..." and `...' → '...'
  html = html.replace(/``/g, "\u201c");
  html = html.replace(/''/g, "\u201d");
  html = html.replace(/`/g, "\u2018");
  html = html.replace(/'/g, "\u2019");

  // Em-dash (---) and en-dash (--)  — must come before line break conversion
  html = html.replace(/---/g, "\u2014");
  html = html.replace(/--/g, "\u2013");

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
