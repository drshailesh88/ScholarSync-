/**
 * RALPH LaTeX Test Suite
 *
 * Tests the LaTeX editor's pure logic modules:
 * - latexToHtml converter (live preview)
 * - Error parser (compilation diagnostics)
 * - LaTeX checks (static quality checks)
 * - Outline extraction
 * - Template validation
 *
 * Run: npx vitest run src/lib/latex/__tests__/ralph-latex/runner.test.ts
 */

import { describe, it, expect } from "vitest";
import { latexToHtml, escapeHtml } from "../../latex-to-html";
import {
  parseCompilationErrors,
  humanizeError,
  diagnosticsSummary,
} from "../../error-parser";
import {
  extractLabels,
  extractRefs,
  extractCiteKeys,
  extractBibKeys,
  extractPackages,
  extractBeginEnvs,
  extractEndEnvs,
  runLatexChecks,
} from "../../latex-checks";
import { extractOutline, outlineToText, findSectionAtLine } from "../../outline";
import { validateTemplate } from "../../template-validator";
import { LATEX_TEMPLATES, getTemplate } from "@/data/latex-templates";

// ═══════════════════════════════════════════════════════════════
// Cycle 1: latexToHtml converter
// ═══════════════════════════════════════════════════════════════

describe("latexToHtml", () => {
  it("converts sections to headings", () => {
    const html = latexToHtml("\\section{Introduction}\n\nText here.");
    expect(html).toContain('<h2 class="latex-section">Introduction</h2>');
  });

  it("converts subsections", () => {
    const html = latexToHtml("\\subsection{Methods}");
    expect(html).toContain('<h3 class="latex-subsection">Methods</h3>');
  });

  it("converts subsubsections", () => {
    const html = latexToHtml("\\subsubsection{Details}");
    expect(html).toContain('<h4 class="latex-subsubsection">Details</h4>');
  });

  it("handles starred sections", () => {
    const html = latexToHtml("\\section*{Acknowledgements}");
    expect(html).toContain('<h2 class="latex-section">Acknowledgements</h2>');
  });

  it("converts bold text", () => {
    const html = latexToHtml("\\textbf{important}");
    expect(html).toContain("<strong>important</strong>");
  });

  it("converts italic text", () => {
    const html = latexToHtml("\\textit{emphasis}");
    expect(html).toContain("<em>emphasis</em>");
  });

  it("converts emph", () => {
    const html = latexToHtml("\\emph{key point}");
    expect(html).toContain("<em>key point</em>");
  });

  it("converts underline", () => {
    const html = latexToHtml("\\underline{underlined}");
    expect(html).toContain("<u>underlined</u>");
  });

  it("converts typewriter text", () => {
    const html = latexToHtml("\\texttt{code}");
    expect(html).toContain("<code>code</code>");
  });

  it("converts itemize to unordered list", () => {
    const html = latexToHtml("\\begin{itemize}\n\\item First\n\\item Second\n\\end{itemize}");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>");
    expect(html).toContain("</ul>");
  });

  it("converts enumerate to ordered list", () => {
    const html = latexToHtml("\\begin{enumerate}\n\\item One\n\\item Two\n\\end{enumerate}");
    expect(html).toContain("<ol>");
    expect(html).toContain("</ol>");
  });

  it("strips preamble content", () => {
    const tex = `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
Hello world
\\end{document}`;
    const html = latexToHtml(tex);
    expect(html).not.toContain("documentclass");
    expect(html).not.toContain("usepackage");
    expect(html).toContain("Hello world");
  });

  it("removes comments", () => {
    const html = latexToHtml("Text here. % This is a comment\nMore text.");
    expect(html).not.toContain("This is a comment");
    expect(html).toContain("Text here.");
    expect(html).toContain("More text.");
  });

  it("renders abstract block", () => {
    const html = latexToHtml("\\begin{abstract}\nTest abstract content.\n\\end{abstract}");
    expect(html).toContain('class="latex-abstract"');
    expect(html).toContain("Test abstract content.");
  });

  it("handles maketitle with title/author/date", () => {
    const tex = `\\title{My Paper}
\\author{John Doe}
\\date{2024}
\\begin{document}
\\maketitle
\\end{document}`;
    const html = latexToHtml(tex);
    expect(html).toContain('class="latex-title"');
    expect(html).toContain("My Paper");
    expect(html).toContain("John Doe");
    expect(html).toContain("2024");
  });

  it("converts hrule to hr", () => {
    const html = latexToHtml("Before\\hruleAfter");
    expect(html).toContain("<hr />");
  });

  it("converts linebreaks", () => {
    const html = latexToHtml("Line one\\\\Line two");
    expect(html).toContain("<br />");
  });

  it("strips non-rendering commands (label, ref, cite)", () => {
    const html = latexToHtml("See \\ref{fig:1} and \\cite{smith2024}");
    expect(html).not.toContain("\\ref");
    expect(html).not.toContain("\\cite");
  });

  it("converts footnotes to superscripts", () => {
    const html = latexToHtml("Text\\footnote{A footnote.} continues.");
    expect(html).toContain("latex-footnote");
    expect(html).toContain("[*]");
  });

  it("converts textsc to small caps", () => {
    const html = latexToHtml("\\textsc{Small Caps}");
    expect(html).toContain("font-variant:small-caps");
    expect(html).toContain("Small Caps");
  });

  it("converts href to anchor", () => {
    const html = latexToHtml('\\href{https://example.com}{Click here}');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain("Click here");
  });

  it("converts url to anchor with code", () => {
    const html = latexToHtml("\\url{https://example.com}");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain("<code>https://example.com</code>");
  });

  it("converts newpage to pagebreak hr", () => {
    const html = latexToHtml("Before\\newpageAfter");
    expect(html).toContain("latex-pagebreak");
  });

  it("strips noindent", () => {
    const html = latexToHtml("\\noindent Text continues");
    expect(html).not.toContain("noindent");
    expect(html).toContain("Text continues");
  });

  it("creates paragraph breaks from double newlines", () => {
    const html = latexToHtml("Paragraph one.\n\nParagraph two.");
    expect(html).toContain("</p><p>");
  });

  it("removes empty paragraphs", () => {
    const html = latexToHtml("Text\n\n\n\nMore text");
    expect(html).not.toMatch(/<p>\s*<\/p>/);
  });
});

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("A & B")).toBe("A &amp; B");
  });
  it("escapes angle brackets", () => {
    expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 1: Error parser
// ═══════════════════════════════════════════════════════════════

describe("parseCompilationErrors", () => {
  it("parses basic TeX error", () => {
    const log = "! Undefined control sequence.\nl.42 \\badcommand";
    const errors = parseCompilationErrors(log);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].severity).toBe("error");
    expect(errors[0].line).toBe(42);
  });

  it("parses LaTeX warning", () => {
    const log = "LaTeX Warning: Reference `fig:missing' on input line 15 undefined.";
    const errors = parseCompilationErrors(log);
    expect(errors.some((e) => e.severity === "warning")).toBe(true);
    expect(errors.some((e) => e.line === 15)).toBe(true);
  });

  it("parses overfull hbox warning", () => {
    const log = "Overfull \\hbox (12.3pt too wide) at line 30";
    const errors = parseCompilationErrors(log);
    expect(errors.length).toBe(1);
    expect(errors[0].severity).toBe("warning");
    expect(errors[0].line).toBe(30);
  });

  it("parses underfull hbox warning", () => {
    const log = "Underfull \\hbox (badness 10000) at line 50";
    const errors = parseCompilationErrors(log);
    expect(errors.length).toBe(1);
    expect(errors[0].severity).toBe("warning");
  });

  it("parses multiple errors", () => {
    const log = `! Missing $ inserted.
l.10 x^2
! Undefined control sequence.
l.20 \\badcmd`;
    const errors = parseCompilationErrors(log);
    const errorEntries = errors.filter((e) => e.severity === "error");
    expect(errorEntries.length).toBe(2);
    expect(errorEntries[0].line).toBe(10);
    expect(errorEntries[1].line).toBe(20);
  });

  it("handles empty log", () => {
    expect(parseCompilationErrors("")).toEqual([]);
  });

  it("handles log with no errors", () => {
    const log = "This is pdfTeX, Version 3.14159265\nOutput written on main.pdf";
    expect(parseCompilationErrors(log)).toEqual([]);
  });

  it("parses package warnings", () => {
    const log = "Package hyperref Warning: Token not allowed on input line 25";
    const errors = parseCompilationErrors(log);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].severity).toBe("warning");
  });
});

describe("humanizeError", () => {
  it("humanizes undefined control sequence", () => {
    const result = humanizeError("Undefined control sequence.");
    expect(result).toContain("Unknown command");
    expect(result).toContain("typos");
  });

  it("humanizes missing dollar", () => {
    const result = humanizeError("Missing $ inserted.");
    expect(result).toContain("Math mode");
  });

  it("humanizes missing begin document", () => {
    const result = humanizeError("Missing \\begin{document}.");
    expect(result).toContain("\\begin{document}");
  });

  it("passes through unknown errors", () => {
    const result = humanizeError("Some unknown error XYZ");
    expect(result).toBe("Some unknown error XYZ");
  });

  it("humanizes too many braces", () => {
    const result = humanizeError("Too many }'s.");
    expect(result).toContain("Extra closing brace");
  });

  it("humanizes misplaced alignment tab", () => {
    const result = humanizeError("Misplaced alignment tab character &.");
    expect(result).toContain("Stray &");
  });
});

describe("diagnosticsSummary", () => {
  it("counts errors and warnings", () => {
    const diags = [
      { line: 1, message: "err", severity: "error" as const },
      { line: 2, message: "warn", severity: "warning" as const },
      { line: 3, message: "err2", severity: "error" as const },
    ];
    const summary = diagnosticsSummary(diags);
    expect(summary.errorCount).toBe(2);
    expect(summary.warningCount).toBe(1);
    expect(summary.firstError?.line).toBe(1);
  });

  it("handles empty diagnostics", () => {
    const summary = diagnosticsSummary([]);
    expect(summary.errorCount).toBe(0);
    expect(summary.warningCount).toBe(0);
    expect(summary.firstError).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 1: LaTeX static checks
// ═══════════════════════════════════════════════════════════════

describe("LaTeX checks - extractors", () => {
  it("extracts labels", () => {
    expect(extractLabels("\\label{fig:1}\n\\label{tab:data}")).toEqual(["fig:1", "tab:data"]);
  });

  it("extracts refs", () => {
    expect(extractRefs("See \\ref{fig:1} and \\eqref{eq:1}")).toEqual(["fig:1", "eq:1"]);
  });

  it("extracts autoref and cref", () => {
    const refs = extractRefs("\\autoref{sec:intro} and \\cref{fig:1}");
    expect(refs).toContain("sec:intro");
    expect(refs).toContain("fig:1");
  });

  it("extracts cite keys", () => {
    expect(extractCiteKeys("\\cite{smith2024}")).toEqual(["smith2024"]);
  });

  it("extracts multiple cite keys from one cite", () => {
    expect(extractCiteKeys("\\cite{a, b, c}")).toEqual(["a", "b", "c"]);
  });

  it("extracts citep and citet", () => {
    const keys = extractCiteKeys("\\citep{x} and \\citet{y}");
    expect(keys).toContain("x");
    expect(keys).toContain("y");
  });

  it("extracts bib keys", () => {
    const bib = `@article{smith2024,\n  author = {Smith},\n}\n@book{doe2023,\n  title = {Book},\n}`;
    expect(extractBibKeys(bib)).toEqual(["smith2024", "doe2023"]);
  });

  it("extracts packages", () => {
    const preamble = "\\usepackage{amsmath}\n\\usepackage[utf8]{inputenc}\n\\usepackage{graphicx}";
    expect(extractPackages(preamble)).toEqual(["amsmath", "inputenc", "graphicx"]);
  });

  it("extracts comma-separated packages", () => {
    expect(extractPackages("\\usepackage{amsmath,amssymb}")).toEqual(["amsmath", "amssymb"]);
  });

  it("extracts begin/end envs", () => {
    const tex = "\\begin{document}\n\\begin{equation}\n\\end{equation}\n\\end{document}";
    expect(extractBeginEnvs(tex)).toEqual(["document", "equation"]);
    expect(extractEndEnvs(tex)).toEqual(["equation", "document"]);
  });
});

describe("runLatexChecks", () => {
  it("detects unused labels", () => {
    const tex = "\\section{Intro}\n\\label{sec:intro}\nNo refs here.";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Unused labels");
    expect(check?.status).toBe("warn");
    expect(check?.detail).toContain("sec:intro");
  });

  it("passes when all labels are referenced", () => {
    const tex = "\\label{sec:intro}\nSee \\ref{sec:intro}.";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Unused labels");
    expect(check?.status).toBe("pass");
  });

  it("detects undefined references", () => {
    const tex = "See \\ref{fig:missing}.";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Undefined references");
    expect(check?.status).toBe("error");
    expect(check?.detail).toContain("fig:missing");
  });

  it("detects package conflicts", () => {
    const tex = "\\usepackage{subfigure}\n\\usepackage{subcaption}";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Package conflicts");
    expect(check?.status).toBe("error");
    expect(check?.detail).toContain("subfigure");
  });

  it("passes with no package conflicts", () => {
    const tex = "\\usepackage{amsmath}\n\\usepackage{graphicx}";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Package conflicts");
    expect(check?.status).toBe("pass");
  });

  it("detects environment mismatch", () => {
    const tex = "\\begin{document}\n\\begin{equation}\n\\end{document}";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Environment matching");
    expect(check?.status).toBe("error");
  });

  it("detects environment order mismatch", () => {
    const tex = "\\begin{figure}\\begin{center}\\end{figure}\\end{center}";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Environment order");
    expect(check?.status).toBe("error");
    expect(check?.detail).toContain("Expected \\end{center}");
  });

  it("passes with balanced environments", () => {
    const tex = "\\begin{document}\n\\begin{equation}\nx = 1\n\\end{equation}\n\\end{document}";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Environment matching");
    expect(check?.status).toBe("pass");
  });

  it("detects missing bibliographystyle", () => {
    const tex = "\\bibliography{refs}";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Missing bibliography style");
    expect(check?.status).toBe("warn");
  });

  it("detects sections without labels", () => {
    const tex = "\\section{Introduction}\nSome text.\n\\section{Methods}\n\\label{sec:methods}\nMore text.";
    const checks = runLatexChecks(tex);
    const check = checks.find((c) => c.label === "Sections without labels");
    expect(check?.status).toBe("warn");
    expect(check?.detail).toContain("1 section(s)");
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 1: Outline extraction
// ═══════════════════════════════════════════════════════════════

describe("extractOutline", () => {
  it("extracts sections", () => {
    const tex = "\\section{Intro}\nText\n\\section{Methods}\nMore text";
    const outline = extractOutline(tex);
    expect(outline.length).toBe(2);
    expect(outline[0].title).toBe("Intro");
    expect(outline[0].level).toBe(1);
    expect(outline[0].line).toBe(1);
    expect(outline[1].title).toBe("Methods");
    expect(outline[1].line).toBe(3);
  });

  it("extracts mixed levels", () => {
    const tex = "\\section{A}\n\\subsection{B}\n\\subsubsection{C}";
    const outline = extractOutline(tex);
    expect(outline[0].level).toBe(1);
    expect(outline[1].level).toBe(2);
    expect(outline[2].level).toBe(3);
  });

  it("handles starred sections", () => {
    const tex = "\\section*{Acknowledgements}";
    const outline = extractOutline(tex);
    expect(outline.length).toBe(1);
    expect(outline[0].title).toBe("Acknowledgements");
  });

  it("extracts chapters", () => {
    const tex = "\\chapter{Introduction}";
    const outline = extractOutline(tex);
    expect(outline.length).toBe(1);
    expect(outline[0].level).toBe(0);
    expect(outline[0].title).toBe("Introduction");
  });

  it("returns empty for no sections", () => {
    expect(extractOutline("Just plain text.")).toEqual([]);
  });
});

describe("outlineToText", () => {
  it("formats outline as indented text", () => {
    const outline = [
      { level: 1, title: "Intro", line: 1 },
      { level: 2, title: "Background", line: 5 },
      { level: 1, title: "Methods", line: 10 },
    ];
    const text = outlineToText(outline);
    expect(text).toContain("  Intro");
    expect(text).toContain("    Background");
    expect(text).toContain("  Methods");
  });
});

describe("findSectionAtLine", () => {
  it("finds the section for a given line", () => {
    const outline = [
      { level: 1, title: "Intro", line: 1 },
      { level: 1, title: "Methods", line: 20 },
      { level: 1, title: "Results", line: 40 },
    ];
    expect(findSectionAtLine(outline, 15)?.title).toBe("Intro");
    expect(findSectionAtLine(outline, 25)?.title).toBe("Methods");
    expect(findSectionAtLine(outline, 50)?.title).toBe("Results");
  });

  it("returns null for line before any section", () => {
    const outline = [{ level: 1, title: "Intro", line: 10 }];
    expect(findSectionAtLine(outline, 5)).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 1: Template validation
// ═══════════════════════════════════════════════════════════════

describe("validateTemplate", () => {
  it("validates all built-in templates", () => {
    for (const [id, template] of Object.entries(LATEX_TEMPLATES)) {
      const result = validateTemplate(template);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
      // Check no critical warnings
      expect(result.templateId).toBe(id);
    }
  });

  it("rejects template with no files", () => {
    const result = validateTemplate({
      id: "empty",
      label: "Empty",
      description: "test",
      compiler: "pdflatex",
      files: [],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Template has no files");
  });

  it("rejects template with no main file", () => {
    const result = validateTemplate({
      id: "nomain",
      label: "No Main",
      description: "test",
      compiler: "pdflatex",
      files: [{ path: "aux.tex", content: "\\documentclass{article}", isMain: false }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Template has no main file");
  });

  it("rejects template missing documentclass", () => {
    const result = validateTemplate({
      id: "noclass",
      label: "No Class",
      description: "test",
      compiler: "pdflatex",
      files: [{ path: "main.tex", content: "\\begin{document}\\end{document}", isMain: true }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Main file missing \\documentclass");
  });

  it("warns when no TITLE placeholder", () => {
    const result = validateTemplate({
      id: "notitle",
      label: "No Title",
      description: "test",
      compiler: "pdflatex",
      files: [{
        path: "main.tex",
        content: "\\documentclass{article}\n\\begin{document}\nHello\n\\end{document}",
        isMain: true,
      }],
    });
    expect(result.warnings).toContain("No __TITLE__ placeholder found — title substitution will not work");
  });

  it("getTemplate returns null for unknown", () => {
    expect(getTemplate("nonexistent")).toBeNull();
  });

  it("getTemplate returns valid templates", () => {
    for (const id of ["blank", "ieee", "nature", "thesis"]) {
      const tmpl = getTemplate(id);
      expect(tmpl).not.toBeNull();
      expect(tmpl!.id).toBe(id);
    }
  });
});
