/**
 * LaTeX-specific autocompletion sources for CodeMirror 6.
 *
 * Four completion sources:
 * 1. Command completions — after `\`
 * 2. Environment completions — after `\begin{`
 * 3. Citation key completions — after `\cite{`, `\citep{`, `\citet{`
 * 4. Label/ref completions — after `\ref{`, `\eqref{`, `\pageref{`
 *
 * All client-side, zero server round-trips.
 */

import type { CompletionContext, CompletionResult, Completion } from "@codemirror/autocomplete";

// ─── Command Completions ──────────────────────────────────────────────────────

type CmdEntry = { label: string; insert: string; detail?: string; boost?: number };

const LATEX_COMMANDS: CmdEntry[] = [
  // Sectioning (highest frequency for papers)
  { label: "\\section", insert: "\\section{}", detail: "Section heading", boost: 99 },
  { label: "\\subsection", insert: "\\subsection{}", detail: "Subsection heading", boost: 98 },
  { label: "\\subsubsection", insert: "\\subsubsection{}", detail: "Subsubsection heading", boost: 97 },
  { label: "\\paragraph", insert: "\\paragraph{}", detail: "Paragraph heading", boost: 50 },

  // Text formatting
  { label: "\\textbf", insert: "\\textbf{}", detail: "Bold text", boost: 95 },
  { label: "\\textit", insert: "\\textit{}", detail: "Italic text", boost: 94 },
  { label: "\\emph", insert: "\\emph{}", detail: "Emphasis", boost: 93 },
  { label: "\\underline", insert: "\\underline{}", detail: "Underline text", boost: 70 },
  { label: "\\texttt", insert: "\\texttt{}", detail: "Monospace text", boost: 60 },
  { label: "\\textsc", insert: "\\textsc{}", detail: "Small caps", boost: 40 },

  // Environments
  { label: "\\begin", insert: "\\begin{}", detail: "Begin environment", boost: 96 },
  { label: "\\end", insert: "\\end{}", detail: "End environment", boost: 80 },

  // References & citations
  { label: "\\cite", insert: "\\cite{}", detail: "Citation", boost: 92 },
  { label: "\\citep", insert: "\\citep{}", detail: "Parenthetical citation", boost: 85 },
  { label: "\\citet", insert: "\\citet{}", detail: "Textual citation", boost: 84 },
  { label: "\\ref", insert: "\\ref{}", detail: "Cross-reference", boost: 91 },
  { label: "\\eqref", insert: "\\eqref{}", detail: "Equation reference", boost: 75 },
  { label: "\\pageref", insert: "\\pageref{}", detail: "Page reference", boost: 50 },
  { label: "\\label", insert: "\\label{}", detail: "Label", boost: 90 },

  // Figures & tables
  { label: "\\includegraphics", insert: "\\includegraphics[width=0.8\\textwidth]{}", detail: "Include image", boost: 88 },
  { label: "\\caption", insert: "\\caption{}", detail: "Caption", boost: 87 },
  { label: "\\centering", insert: "\\centering", detail: "Center content", boost: 70 },
  { label: "\\hline", insert: "\\hline", detail: "Horizontal line", boost: 65 },
  { label: "\\multicolumn", insert: "\\multicolumn{1}{c}{}", detail: "Span columns", boost: 60 },

  // Document structure
  { label: "\\title", insert: "\\title{}", detail: "Document title", boost: 80 },
  { label: "\\author", insert: "\\author{}", detail: "Author name", boost: 79 },
  { label: "\\date", insert: "\\date{}", detail: "Date", boost: 70 },
  { label: "\\maketitle", insert: "\\maketitle", detail: "Render title", boost: 75 },
  { label: "\\tableofcontents", insert: "\\tableofcontents", detail: "Table of contents", boost: 50 },
  { label: "\\usepackage", insert: "\\usepackage{}", detail: "Import package", boost: 85 },
  { label: "\\documentclass", insert: "\\documentclass{}", detail: "Document class", boost: 50 },

  // Math commands
  { label: "\\frac", insert: "\\frac{}{}", detail: "Fraction", boost: 86 },
  { label: "\\sqrt", insert: "\\sqrt{}", detail: "Square root", boost: 80 },
  { label: "\\sum", insert: "\\sum_{i=1}^{n}", detail: "Summation", boost: 75 },
  { label: "\\int", insert: "\\int_{a}^{b}", detail: "Integral", boost: 74 },
  { label: "\\prod", insert: "\\prod_{i=1}^{n}", detail: "Product", boost: 60 },
  { label: "\\lim", insert: "\\lim_{x \\to \\infty}", detail: "Limit", boost: 60 },
  { label: "\\partial", insert: "\\partial", detail: "Partial derivative", boost: 55 },
  { label: "\\nabla", insert: "\\nabla", detail: "Nabla/gradient", boost: 50 },
  { label: "\\infty", insert: "\\infty", detail: "Infinity symbol", boost: 70 },
  { label: "\\cdot", insert: "\\cdot", detail: "Center dot", boost: 65 },
  { label: "\\times", insert: "\\times", detail: "Multiplication sign", boost: 65 },
  { label: "\\leq", insert: "\\leq", detail: "Less than or equal", boost: 60 },
  { label: "\\geq", insert: "\\geq", detail: "Greater than or equal", boost: 60 },
  { label: "\\neq", insert: "\\neq", detail: "Not equal", boost: 55 },
  { label: "\\approx", insert: "\\approx", detail: "Approximately equal", boost: 55 },
  { label: "\\pm", insert: "\\pm", detail: "Plus-minus sign", boost: 70 },
  { label: "\\overline", insert: "\\overline{}", detail: "Overline/bar", boost: 50 },
  { label: "\\hat", insert: "\\hat{}", detail: "Hat accent", boost: 45 },
  { label: "\\vec", insert: "\\vec{}", detail: "Vector arrow", boost: 45 },
  { label: "\\left", insert: "\\left", detail: "Left delimiter", boost: 60 },
  { label: "\\right", insert: "\\right", detail: "Right delimiter", boost: 60 },
  { label: "\\text", insert: "\\text{}", detail: "Text in math mode", boost: 70 },
  { label: "\\mathrm", insert: "\\mathrm{}", detail: "Roman font in math", boost: 55 },
  { label: "\\mathbf", insert: "\\mathbf{}", detail: "Bold math", boost: 55 },

  // Greek letters (common in medical/stats papers)
  { label: "\\alpha", insert: "\\alpha", detail: "\u03B1", boost: 50 },
  { label: "\\beta", insert: "\\beta", detail: "\u03B2", boost: 50 },
  { label: "\\gamma", insert: "\\gamma", detail: "\u03B3", boost: 45 },
  { label: "\\delta", insert: "\\delta", detail: "\u03B4", boost: 45 },
  { label: "\\epsilon", insert: "\\epsilon", detail: "\u03B5", boost: 40 },
  { label: "\\lambda", insert: "\\lambda", detail: "\u03BB", boost: 40 },
  { label: "\\mu", insert: "\\mu", detail: "\u03BC", boost: 45 },
  { label: "\\sigma", insert: "\\sigma", detail: "\u03C3", boost: 45 },
  { label: "\\chi", insert: "\\chi", detail: "\u03C7 (chi-squared)", boost: 50 },
  { label: "\\omega", insert: "\\omega", detail: "\u03C9", boost: 40 },
  { label: "\\pi", insert: "\\pi", detail: "\u03C0", boost: 45 },
  { label: "\\theta", insert: "\\theta", detail: "\u03B8", boost: 40 },
  { label: "\\phi", insert: "\\phi", detail: "\u03C6", boost: 40 },

  // Miscellaneous
  { label: "\\footnote", insert: "\\footnote{}", detail: "Footnote", boost: 70 },
  { label: "\\href", insert: "\\href{url}{}", detail: "Hyperlink", boost: 55 },
  { label: "\\url", insert: "\\url{}", detail: "URL", boost: 50 },
  { label: "\\item", insert: "\\item ", detail: "List item", boost: 80 },
  { label: "\\newcommand", insert: "\\newcommand{\\}{}", detail: "Define command", boost: 40 },
  { label: "\\input", insert: "\\input{}", detail: "Include file", boost: 55 },
  { label: "\\bibliography", insert: "\\bibliography{}", detail: "Bibliography file", boost: 60 },
  { label: "\\bibliographystyle", insert: "\\bibliographystyle{}", detail: "Bib style", boost: 55 },
  { label: "\\newpage", insert: "\\newpage", detail: "Page break", boost: 40 },
  { label: "\\vspace", insert: "\\vspace{}", detail: "Vertical space", boost: 35 },
  { label: "\\hspace", insert: "\\hspace{}", detail: "Horizontal space", boost: 35 },
  { label: "\\noindent", insert: "\\noindent", detail: "No paragraph indent", boost: 40 },
];

/**
 * Completes LaTeX commands after `\`.
 * The insert text uses a convention: commands ending with {} will have
 * the cursor placed inside the braces via a custom apply function.
 */
export function latexCommandCompletion(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/\\[a-zA-Z]*/);
  if (!word) return null;
  if (word.text === "\\" && !context.explicit) return null;

  const typed = word.text.slice(1).toLowerCase();

  const options: Completion[] = LATEX_COMMANDS
    .filter((cmd) => cmd.label.slice(1).toLowerCase().includes(typed))
    .map((cmd) => ({
      label: cmd.label,
      detail: cmd.detail,
      boost: cmd.boost ?? 0,
      apply: (view: import("@codemirror/view").EditorView, _completion: Completion, from: number, to: number) => {
        const text = cmd.insert;
        // Place cursor inside first empty {} pair
        const emptyBrace = text.indexOf("{}");
        const cursorPos = emptyBrace >= 0 ? from + emptyBrace + 1 : from + text.length;
        view.dispatch({
          changes: { from, to, insert: text },
          selection: { anchor: cursorPos },
        });
      },
    }));

  if (options.length === 0) return null;

  return {
    from: word.from,
    options,
    validFor: /^\\[a-zA-Z]*$/,
  };
}

// ─── Environment Completions ──────────────────────────────────────────────────

type EnvEntry = { name: string; detail: string; snippet: string; boost?: number };

const LATEX_ENVIRONMENTS: EnvEntry[] = [
  { name: "figure", detail: "Float figure", boost: 95,
    snippet: "figure}[htbp]\n  \\centering\n  \n  \\caption{}\n  \\label{fig:}\n\\end{figure" },
  { name: "table", detail: "Float table", boost: 94,
    snippet: "table}[htbp]\n  \\centering\n  \\caption{}\n  \\label{tab:}\n  \\begin{tabular}{lcc}\n    \\hline\n    \n    \\hline\n  \\end{tabular}\n\\end{table" },
  { name: "tabular", detail: "Table content", boost: 90,
    snippet: "tabular}{lcc}\n  \\hline\n  \n  \\hline\n\\end{tabular" },
  { name: "equation", detail: "Numbered equation", boost: 93,
    snippet: "equation}\n  \n\\end{equation" },
  { name: "align", detail: "Aligned equations", boost: 88,
    snippet: "align}\n  \n\\end{align" },
  { name: "equation*", detail: "Unnumbered equation", boost: 80,
    snippet: "equation*}\n  \n\\end{equation*" },
  { name: "align*", detail: "Unnumbered aligned eqs", boost: 78,
    snippet: "align*}\n  \n\\end{align*" },
  { name: "itemize", detail: "Bullet list", boost: 92,
    snippet: "itemize}\n  \\item \n\\end{itemize" },
  { name: "enumerate", detail: "Numbered list", boost: 91,
    snippet: "enumerate}\n  \\item \n\\end{enumerate" },
  { name: "abstract", detail: "Abstract block", boost: 85,
    snippet: "abstract}\n  \n\\end{abstract" },
  { name: "document", detail: "Document body", boost: 50,
    snippet: "document}\n\n\\end{document" },
  { name: "center", detail: "Centered content", boost: 60,
    snippet: "center}\n  \n\\end{center" },
  { name: "minipage", detail: "Minipage box", boost: 55,
    snippet: "minipage}{0.45\\textwidth}\n  \n\\end{minipage" },
  { name: "verbatim", detail: "Verbatim text", boost: 40,
    snippet: "verbatim}\n\n\\end{verbatim" },
  { name: "cases", detail: "Piecewise function", boost: 65,
    snippet: "cases}\n   & \\text{if } \\\\\n   & \\text{otherwise}\n\\end{cases" },
  { name: "matrix", detail: "Matrix (no delimiters)", boost: 55,
    snippet: "matrix}\n   &  \\\\\n   & \n\\end{matrix" },
  { name: "pmatrix", detail: "Matrix with ( )", boost: 60,
    snippet: "pmatrix}\n   &  \\\\\n   & \n\\end{pmatrix" },
  { name: "bmatrix", detail: "Matrix with [ ]", boost: 58,
    snippet: "bmatrix}\n   &  \\\\\n   & \n\\end{bmatrix" },
  { name: "thebibliography", detail: "Manual bibliography", boost: 40,
    snippet: "thebibliography}{99}\n  \\bibitem{} \n\\end{thebibliography" },
  { name: "tikzpicture", detail: "TikZ drawing", boost: 45,
    snippet: "tikzpicture}\n  \n\\end{tikzpicture" },
  { name: "description", detail: "Description list", boost: 50,
    snippet: "description}\n  \\item[] \n\\end{description" },
  { name: "quote", detail: "Block quote", boost: 45,
    snippet: "quote}\n  \n\\end{quote" },
];

/**
 * Completes environment names after `\begin{`.
 * Inserts the full environment (with matching \end{}).
 */
export function latexEnvironmentCompletion(context: CompletionContext): CompletionResult | null {
  const match = context.matchBefore(/\\begin\{[a-zA-Z*]*/);
  if (!match) return null;

  const prefix = match.text.replace(/^\\begin\{/, "");
  const from = match.from + "\\begin{".length;

  const options: Completion[] = LATEX_ENVIRONMENTS
    .filter((env) => env.name.toLowerCase().startsWith(prefix.toLowerCase()))
    .map((env) => ({
      label: env.name,
      detail: env.detail,
      boost: env.boost ?? 0,
      apply: (view: import("@codemirror/view").EditorView, _completion: Completion, _from: number, to: number) => {
        const insert = env.snippet;
        view.dispatch({
          changes: { from, to, insert },
        });
        // Place cursor on the first line that is empty or has only whitespace inside the env
        const lines = insert.split("\n");
        let offset = 0;
        for (let i = 0; i < lines.length; i++) {
          if (i > 0 && lines[i].trim() === "") {
            // Place cursor at end of the indentation on this empty line
            offset += lines[i].length;
            break;
          }
          offset += lines[i].length + 1;
        }
        view.dispatch({
          selection: { anchor: from + offset },
        });
      },
    }));

  if (options.length === 0) return null;

  return {
    from,
    options,
    validFor: /^[a-zA-Z*]*$/,
  };
}

// ─── Citation Key Completions ─────────────────────────────────────────────────

/**
 * Extract citation keys and metadata from BibTeX content.
 */
export function parseBibKeys(bibContent: string): { key: string; title: string; author: string; year: string }[] {
  const entries: { key: string; title: string; author: string; year: string }[] = [];
  const headerRegex = /@\w+\s*\{([^,]+),/g;
  const headers = [...bibContent.matchAll(headerRegex)];

  for (let index = 0; index < headers.length; index += 1) {
    const headerMatch = headers[index];
    const start = headerMatch.index;
    if (start == null) continue;
    const end = headers[index + 1]?.index ?? bibContent.length;
    const key = headerMatch[1].trim();
    const body = bibContent.slice(start + headerMatch[0].length, end);
    const title = body.match(/title\s*=\s*[{"]([^}"]+)[}"]/i)?.[1] ?? "";
    const author = body.match(/author\s*=\s*[{"]([^}"]+)[}"]/i)?.[1] ?? "";
    const year = body.match(/year\s*=\s*[{"]?(\d{4})[}"]?/i)?.[1] ?? "";
    entries.push({ key, title, author, year });
  }
  return entries;
}

/**
 * Creates a citation key completion source that reads from the project's .bib files.
 */
export function createCitationCompletion(getBibContent: () => string) {
  return function citationCompletion(context: CompletionContext): CompletionResult | null {
    const match = context.matchBefore(/\\cite[tp]?\{[^}]*/);
    if (!match) return null;

    // Support multi-cite: \cite{a,b,c} — complete after last comma or opening brace
    const braceIdx = match.text.lastIndexOf("{");
    const commaIdx = match.text.lastIndexOf(",");
    const startIdx = Math.max(braceIdx, commaIdx);
    if (startIdx < 0) return null;

    const from = match.from + startIdx + 1;
    const prefix = match.text.slice(startIdx + 1).trim().toLowerCase();

    const bibContent = getBibContent();
    if (!bibContent) return null;

    const entries = parseBibKeys(bibContent);

    const options: Completion[] = entries
      .filter((e) =>
        e.key.toLowerCase().includes(prefix) ||
        e.title.toLowerCase().includes(prefix) ||
        e.author.toLowerCase().includes(prefix)
      )
      .map((e) => ({
        label: e.key,
        detail: e.year ? `(${e.year})` : undefined,
        info: e.title
          ? `${e.author ? e.author.split(" and ")[0] + " — " : ""}${e.title}`
          : undefined,
        boost: 0,
      }));

    if (options.length === 0) return null;

    return {
      from,
      options,
      validFor: /^[a-zA-Z0-9_:-]*$/,
    };
  };
}

// ─── Label/Ref Completions ────────────────────────────────────────────────────

/**
 * Extract labels from LaTeX content.
 */
export function parseLabels(texContent: string): { key: string; context: string }[] {
  const labels: { key: string; context: string }[] = [];
  const lines = texContent.split("\n");
  let lastSection = "";

  for (const line of lines) {
    const secMatch = line.match(/\\(?:sub)*section\*?\{([^}]+)\}/);
    if (secMatch) lastSection = secMatch[1];

    const labelMatch = line.match(/\\label\{([^}]+)\}/);
    if (labelMatch) {
      labels.push({
        key: labelMatch[1],
        context: lastSection || "Document",
      });
    }
  }
  return labels;
}

/**
 * Creates a label/ref completion source that scans the current document.
 */
export function createRefCompletion(getTexContent: () => string) {
  return function refCompletion(context: CompletionContext): CompletionResult | null {
    const match = context.matchBefore(/\\(?:eq|page|auto|c)?ref\{[^}]*/);
    if (!match) return null;

    const braceIdx = match.text.indexOf("{");
    if (braceIdx < 0) return null;

    const from = match.from + braceIdx + 1;
    const prefix = match.text.slice(braceIdx + 1).toLowerCase();

    const content = getTexContent();
    const labels = parseLabels(content);

    const options: Completion[] = labels
      .filter((l) => l.key.toLowerCase().includes(prefix))
      .map((l) => ({
        label: l.key,
        detail: l.context,
        boost: 0,
      }));

    if (options.length === 0) return null;

    return {
      from,
      options,
      validFor: /^[a-zA-Z0-9_:-]*$/,
    };
  };
}
