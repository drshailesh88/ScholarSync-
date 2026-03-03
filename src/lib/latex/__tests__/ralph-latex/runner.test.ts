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
    const tex = "\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nHello world\n\\end{document}";
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
    const tex = "\\title{My Paper}\n\\author{John Doe}\n\\date{2024}\n\\begin{document}\n\\maketitle\n\\end{document}";
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
    const html = latexToHtml("\\href{https://example.com}{Click here}");
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
    const log = "LaTeX Warning: Reference \`fig:missing' on input line 15 undefined.";
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
    const log = "! Missing \$ inserted.\nl.10 x^2\n! Undefined control sequence.\nl.20 \\badcmd";
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
    const result = humanizeError("Missing \$ inserted.");
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
    const bib = "@article{smith2024,\n  author = {Smith},\n}\n@book{doe2023,\n  title = {Book},\n}";
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
    expect(result.warnings).toContain("No __TITLE__ placeholder found \u2014 title substitution will not work");
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

// ═══════════════════════════════════════════════════════════════
// Cycle 2: Environment rendering in latexToHtml
// ═══════════════════════════════════════════════════════════════

describe("Cycle 2: Template helpers", () => {
  it("has at least 4 templates", () => {
    const ids = Object.keys(LATEX_TEMPLATES);
    expect(ids.length).toBeGreaterThanOrEqual(4);
    expect(ids).toContain("blank");
    expect(ids).toContain("ieee");
  });

  it("all templates have unique ids", () => {
    const ids = Object.keys(LATEX_TEMPLATES);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("all templates have non-empty descriptions", () => {
    for (const tmpl of Object.values(LATEX_TEMPLATES)) {
      expect(tmpl.description.length).toBeGreaterThan(0);
    }
  });

  it("all templates validate successfully", () => {
    for (const tmpl of Object.values(LATEX_TEMPLATES)) {
      const result = validateTemplate(tmpl);
      expect(result.valid).toBe(true);
    }
  });
});

describe("Cycle 2: latexToHtml environment rendering", () => {
  it("converts figure environment with caption", () => {
    const tex = "\\begin{figure}[h]\n\\includegraphics{img.png}\n\\caption{My figure}\n\\end{figure}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-figure");
    expect(html).toContain("My figure");
    expect(html).toContain("img.png");
  });

  it("converts table environment with caption and tabular", () => {
    const tex = "\\begin{table}[h]\n\\caption{Results}\n\\begin{tabular}{|l|r|}\n\\hline\nName & Score \\\\\n\\hline\nAlice & 95 \\\\\nBob & 87 \\\\\n\\hline\n\\end{tabular}\n\\end{table}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-table");
    expect(html).toContain("Results");
    expect(html).toContain("Alice");
  });

  it("converts standalone tabular", () => {
    const tex = "\\begin{tabular}{cc}\nA & B \\\\\nC & D \\\\\n\\end{tabular}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-tabular");
    expect(html).toContain("<th>");
    expect(html).toContain("<td>");
  });

  it("converts verbatim environment", () => {
    const tex = "\\begin{verbatim}\nsome code here\n\\end{verbatim}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-verbatim");
    expect(html).toContain("some code here");
  });

  it("converts quote environment", () => {
    const tex = "\\begin{quote}\nA famous quote.\n\\end{quote}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-quote");
    expect(html).toContain("A famous quote.");
  });

  it("converts quotation environment", () => {
    const tex = "\\begin{quotation}\nLong quotation here.\n\\end{quotation}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-quote");
  });

  it("converts center environment", () => {
    const tex = "\\begin{center}\nCentered text\n\\end{center}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-center");
    expect(html).toContain("text-align:center");
  });

  it("handles figure without caption", () => {
    const tex = "\\begin{figure}\n\\includegraphics{plot.pdf}\n\\end{figure}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-figure");
    expect(html).toContain("plot.pdf");
    expect(html).not.toContain("figcaption");
  });

  it("handles figure without includegraphics", () => {
    const tex = "\\begin{figure}\n\\caption{Empty figure}\n\\end{figure}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-figure");
    expect(html).toContain("Empty figure");
  });

  it("handles nested environments in document", () => {
    const tex = "\\begin{document}\n\\section{Results}\n\\begin{figure}[h]\n\\includegraphics{res.png}\n\\caption{Results plot}\n\\end{figure}\n\\begin{quote}\nImportant quote.\n\\end{quote}\n\\end{document}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-figure");
    expect(html).toContain("latex-quote");
    expect(html).toContain("Results plot");
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 3: Additional formatting + more environments
// ═══════════════════════════════════════════════════════════════

describe("Cycle 3: Additional text formatting", () => {
  it("converts textsuperscript", () => {
    const html = latexToHtml("x\\textsuperscript{2}");
    expect(html).toContain("<sup>2</sup>");
  });

  it("converts textsubscript", () => {
    const html = latexToHtml("H\\textsubscript{2}O");
    expect(html).toContain("<sub>2</sub>");
  });

  it("converts LaTeX logo", () => {
    const html = latexToHtml("Written in \\LaTeX");
    expect(html).toContain("latex-logo");
    expect(html).toContain("L<sup>A</sup>T<sub>E</sub>X");
  });

  it("converts TeX logo", () => {
    const html = latexToHtml("Powered by \\TeX");
    expect(html).toContain("latex-logo");
    expect(html).toContain("T<sub>E</sub>X");
  });

  it("strips centering command", () => {
    const html = latexToHtml("\\centering Some text");
    expect(html).not.toContain("centering");
    expect(html).toContain("Some text");
  });
});

describe("Cycle 3: Additional environments", () => {
  it("converts lstlisting to code block", () => {
    const html = latexToHtml("\\begin{lstlisting}\ndef hello():\n    print('hi')\n\\end{lstlisting}");
    expect(html).toContain("latex-listing");
    expect(html).toContain("<code>");
    expect(html).toContain("def hello()");
  });

  it("converts lstlisting with options", () => {
    const html = latexToHtml("\\begin{lstlisting}[language=Python]\nprint('hello')\n\\end{lstlisting}");
    expect(html).toContain("latex-listing");
    expect(html).toContain("print");
  });

  it("converts flushleft environment", () => {
    const html = latexToHtml("\\begin{flushleft}\nLeft-aligned text\n\\end{flushleft}");
    expect(html).toContain("latex-flushleft");
    expect(html).toContain("text-align:left");
  });

  it("converts flushright environment", () => {
    const html = latexToHtml("\\begin{flushright}\nRight-aligned text\n\\end{flushright}");
    expect(html).toContain("latex-flushright");
    expect(html).toContain("text-align:right");
  });

  it("converts minipage environment", () => {
    const html = latexToHtml("\\begin{minipage}{0.5\\textwidth}\nMinipage content\n\\end{minipage}");
    expect(html).toContain("latex-minipage");
    expect(html).toContain("Minipage content");
  });

  it("converts description list", () => {
    const html = latexToHtml("\\begin{description}\n\\item[Term] Definition here\n\\end{description}");
    expect(html).toContain("latex-description");
    expect(html).toContain("<dt>Term</dt>");
    expect(html).toContain("<dd>");
  });

  it("handles multiple description items", () => {
    const html = latexToHtml("\\begin{description}\n\\item[Alpha] First\n\\item[Beta] Second\n\\end{description}");
    expect(html).toContain("<dt>Alpha</dt>");
    expect(html).toContain("<dt>Beta</dt>");
  });
});

describe("Cycle 3: Edge cases", () => {
  it("handles empty verbatim", () => {
    const html = latexToHtml("\\begin{verbatim}\n\\end{verbatim}");
    expect(html).toContain("latex-verbatim");
  });

  it("handles table without tabular", () => {
    const html = latexToHtml("\\begin{table}[h]\n\\caption{Empty table}\n\\end{table}");
    expect(html).toContain("latex-table");
    expect(html).toContain("Empty table");
  });

  it("handles multiple figures", () => {
    const tex = "\\begin{figure}\n\\caption{Fig 1}\n\\end{figure}\n\\begin{figure}\n\\caption{Fig 2}\n\\end{figure}";
    const html = latexToHtml(tex);
    expect(html).toContain("Fig 1");
    expect(html).toContain("Fig 2");
  });

  it("handles nested bold in section", () => {
    const html = latexToHtml("\\section{Introduction to \\textbf{LaTeX}}");
    expect(html).toContain("latex-section");
  });

  it("handles deeply nested formatting", () => {
    const html = latexToHtml("\\textbf{bold \\textit{and italic}}");
    expect(html).toContain("<strong>");
    expect(html).toContain("<em>");
  });

  it("preserves content between environments", () => {
    const tex = "Before\n\\begin{quote}\nQuoted\n\\end{quote}\nAfter";
    const html = latexToHtml(tex);
    expect(html).toContain("Before");
    expect(html).toContain("Quoted");
    expect(html).toContain("After");
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 4: Math mode preservation + more headings + theorem envs
// ═══════════════════════════════════════════════════════════════

describe("Cycle 4: Math mode preservation", () => {
  it("preserves inline math $...$", () => {
    const html = latexToHtml("The equation $E = mc^2$ is famous.");
    expect(html).toContain("$E = mc^2$");
  });

  it("preserves display math \\[...\\]", () => {
    const html = latexToHtml("Consider:\n\\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]");
    expect(html).toContain("\\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]");
  });

  it("preserves inline math \\(...\\)", () => {
    const html = latexToHtml("We have \\(a + b = c\\) as given.");
    expect(html).toContain("\\(a + b = c\\)");
  });

  it("preserves equation environment", () => {
    const html = latexToHtml("\\begin{equation}\nx^2 + y^2 = z^2\n\\end{equation}");
    expect(html).toContain("\\begin{equation}");
    expect(html).toContain("x^2 + y^2 = z^2");
    expect(html).toContain("\\end{equation}");
  });

  it("preserves align environment", () => {
    const html = latexToHtml("\\begin{align}\na &= b + c \\\\\nd &= e + f\n\\end{align}");
    expect(html).toContain("\\begin{align}");
    expect(html).toContain("\\end{align}");
  });

  it("preserves equation* environment", () => {
    const html = latexToHtml("\\begin{equation*}\nE = mc^2\n\\end{equation*}");
    expect(html).toContain("\\begin{equation*}");
    expect(html).toContain("\\end{equation*}");
  });

  it("preserves gather environment", () => {
    const html = latexToHtml("\\begin{gather}\nx = 1 \\\\\ny = 2\n\\end{gather}");
    expect(html).toContain("\\begin{gather}");
  });

  it("preserves $$...$$ display math", () => {
    const html = latexToHtml("Result: $$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$$");
    expect(html).toContain("$$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$$");
  });

  it("does not mangle math commands inside math mode", () => {
    const html = latexToHtml("$\\textbf{x}$ outside \\textbf{bold}");
    // Math content should be preserved; outside textbf should be converted
    expect(html).toContain("<strong>bold</strong>");
  });
});

describe("Cycle 4: Chapter, part, paragraph headings", () => {
  it("converts chapter to h1", () => {
    const html = latexToHtml("\\chapter{Introduction}");
    expect(html).toContain('<h1 class="latex-chapter">Introduction</h1>');
  });

  it("converts chapter* (starred)", () => {
    const html = latexToHtml("\\chapter*{Preface}");
    expect(html).toContain('<h1 class="latex-chapter">Preface</h1>');
  });

  it("converts part to large heading", () => {
    const html = latexToHtml("\\part{Theoretical Framework}");
    expect(html).toContain("latex-part");
    expect(html).toContain("Theoretical Framework");
  });

  it("converts paragraph to bold run-in heading", () => {
    const html = latexToHtml("\\paragraph{Note.} Some text follows.");
    expect(html).toContain("latex-paragraph");
    expect(html).toContain("Note.");
  });

  it("converts subparagraph", () => {
    const html = latexToHtml("\\subparagraph{Detail.} More specifics.");
    expect(html).toContain("latex-subparagraph");
    expect(html).toContain("Detail.");
  });
});

describe("Cycle 4: Theorem-like environments", () => {
  it("renders theorem environment", () => {
    const html = latexToHtml("\\begin{theorem}\nEvery even number greater than 2 is the sum of two primes.\n\\end{theorem}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Theorem");
    expect(html).toContain("sum of two primes");
  });

  it("renders lemma environment", () => {
    const html = latexToHtml("\\begin{lemma}\nIf $p$ divides $ab$, then $p$ divides $a$ or $b$.\n\\end{lemma}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Lemma");
  });

  it("renders definition environment", () => {
    const html = latexToHtml("\\begin{definition}\nA prime number is a natural number greater than 1.\n\\end{definition}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Definition");
  });

  it("renders corollary environment", () => {
    const html = latexToHtml("\\begin{corollary}\nThe result follows immediately.\n\\end{corollary}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Corollary");
  });

  it("renders proposition environment", () => {
    const html = latexToHtml("\\begin{proposition}\nFor all n, f(n) > 0.\n\\end{proposition}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Proposition");
  });

  it("renders remark environment", () => {
    const html = latexToHtml("\\begin{remark}\nThis is worth noting.\n\\end{remark}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Remark");
  });

  it("renders example environment", () => {
    const html = latexToHtml("\\begin{example}\nConsider x = 5.\n\\end{example}");
    expect(html).toContain("latex-theorem");
    expect(html).toContain("Example");
  });

  it("renders proof environment with QED", () => {
    const html = latexToHtml("\\begin{proof}\nBy induction on n.\n\\end{proof}");
    expect(html).toContain("latex-proof");
    expect(html).toContain("Proof");
    expect(html).toContain("∎");
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 5: Text color/sizing + spacing + bibliography + more
// ═══════════════════════════════════════════════════════════════

describe("Cycle 5: Text color and sizing", () => {
  it("converts textcolor command", () => {
    const html = latexToHtml("\\textcolor{red}{Important text}");
    expect(html).toContain("color:red");
    expect(html).toContain("Important text");
  });

  it("converts colorbox command", () => {
    const html = latexToHtml("\\colorbox{yellow}{Highlighted}");
    expect(html).toContain("background-color:yellow");
    expect(html).toContain("Highlighted");
  });

  it("converts font size commands", () => {
    const tiny = latexToHtml("{\\tiny Small text}");
    expect(tiny).toContain("font-size");
    expect(tiny).toContain("Small text");
  });

  it("converts large/Large/LARGE/huge/Huge", () => {
    const large = latexToHtml("{\\Large Big text}");
    expect(large).toContain("font-size");
    expect(large).toContain("Big text");
  });
});

describe("Cycle 5: Spacing commands", () => {
  it("converts vspace to margin", () => {
    const html = latexToHtml("Before\\vspace{1cm}After");
    expect(html).toContain("margin");
    expect(html).not.toContain("\\vspace");
  });

  it("converts hspace to inline spacing", () => {
    const html = latexToHtml("Word\\hspace{2em}Word");
    expect(html).toContain("margin-left");
    expect(html).not.toContain("\\hspace");
  });

  it("strips vfill", () => {
    const html = latexToHtml("Top\\vfill Bottom");
    expect(html).not.toContain("\\vfill");
    expect(html).toContain("Top");
    expect(html).toContain("Bottom");
  });

  it("strips hfill", () => {
    const html = latexToHtml("Left\\hfill Right");
    expect(html).not.toContain("\\hfill");
  });
});

describe("Cycle 5: Bibliography and titlepage", () => {
  it("converts thebibliography environment", () => {
    const tex = "\\begin{thebibliography}{9}\n\\bibitem{smith2024} Smith, J. (2024). A paper.\n\\bibitem{doe2023} Doe, A. (2023). Another paper.\n\\end{thebibliography}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-bibliography");
    expect(html).toContain("Smith");
    expect(html).toContain("Doe");
  });

  it("converts titlepage environment", () => {
    const tex = "\\begin{titlepage}\n\\centering\n{\\Large My Title}\n\\end{titlepage}";
    const html = latexToHtml(tex);
    expect(html).toContain("latex-titlepage");
    expect(html).toContain("My Title");
  });

  it("renders tableofcontents placeholder", () => {
    const html = latexToHtml("\\tableofcontents");
    expect(html).toContain("Table of Contents");
  });

  it("renders listoffigures placeholder", () => {
    const html = latexToHtml("\\listoffigures");
    expect(html).toContain("List of Figures");
  });

  it("renders listoftables placeholder", () => {
    const html = latexToHtml("\\listoftables");
    expect(html).toContain("List of Tables");
  });
});

describe("Cycle 5: Special characters and commands", () => {
  it("converts tilde to non-breaking space", () => {
    const html = latexToHtml("Figure~1");
    expect(html).toContain("Figure\u00a0" + "1");
  });

  it("converts dashes correctly", () => {
    const html = latexToHtml("pages 1--10 and --- em dash");
    expect(html).toContain("–"); // en-dash
    expect(html).toContain("—"); // em-dash
  });

  it("converts smart quotes", () => {
    const html = latexToHtml("``Hello'' and \`single'");
    expect(html).toContain("\u201c"); // left double quote
    expect(html).toContain("\u201d"); // right double quote
  });

  it("converts special LaTeX chars", () => {
    const html = latexToHtml("Cost is \\$10 and 100\\% done");
    expect(html).toContain("$10");
    expect(html).toContain("100%");
  });
});

// ═══════════════════════════════════════════════════════════════
// Cycle 6: Robustness, edge cases, and template expansion
// ═══════════════════════════════════════════════════════════════

describe("Cycle 6: Robustness - complex documents", () => {
  it("handles full academic paper structure", () => {
    const tex = `\\documentclass{article}
\\usepackage{amsmath}
\\title{Test Paper}
\\author{Author}
\\date{2024}
\\begin{document}
\\maketitle
\\begin{abstract}
This is an abstract.
\\end{abstract}
\\section{Introduction}
Some text with \\textbf{bold} and \\textit{italic}.
\\subsection{Background}
See \\cite{ref1}.
\\section{Methods}
\\begin{enumerate}
\\item Step one
\\item Step two
\\end{enumerate}
\\section{Results}
\\begin{figure}[h]
\\includegraphics{fig.png}
\\caption{A figure}
\\end{figure}
\\begin{table}[h]
\\caption{Data}
\\begin{tabular}{ll}
A & B \\\\
C & D \\\\
\\end{tabular}
\\end{table}
\\section{Conclusion}
Final remarks.
\\end{document}`;
    const html = latexToHtml(tex);
    expect(html).toContain("latex-title");
    expect(html).toContain("latex-abstract");
    expect(html).toContain("latex-section");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
    expect(html).toContain("<ol>");
    expect(html).toContain("latex-figure");
    expect(html).toContain("latex-table");
    expect(html).toContain("Final remarks");
    expect(html).not.toContain("\\documentclass");
    expect(html).not.toContain("\\usepackage");
  });

  it("handles thesis-style document with chapters", () => {
    const tex = `\\begin{document}
\\chapter{Introduction}
\\section{Motivation}
The motivation is clear.
\\chapter{Background}
\\section{Prior Work}
Prior work is extensive.
\\end{document}`;
    const html = latexToHtml(tex);
    expect(html).toContain("latex-chapter");
    expect(html).toContain("Introduction");
    expect(html).toContain("Background");
    expect(html).toContain("latex-section");
  });

  it("handles document with theorem and proof", () => {
    const tex = `\\begin{theorem}
For all n, the sum is n(n+1)/2.
\\end{theorem}
\\begin{proof}
By induction on n.
\\end{proof}`;
    const html = latexToHtml(tex);
    expect(html).toContain("latex-theorem");
    expect(html).toContain("latex-proof");
  });

  it("handles mixed environments in sequence", () => {
    const tex = `\\begin{quote}
A quote.
\\end{quote}
\\begin{center}
Centered.
\\end{center}
\\begin{verbatim}
code
\\end{verbatim}`;
    const html = latexToHtml(tex);
    expect(html).toContain("latex-quote");
    expect(html).toContain("latex-center");
    expect(html).toContain("latex-verbatim");
  });
});

describe("Cycle 6: Edge cases - empty and malformed inputs", () => {
  it("handles empty string", () => {
    expect(latexToHtml("")).toBeDefined();
  });

  it("handles only whitespace", () => {
    expect(latexToHtml("   \n\n   ")).toBeDefined();
  });

  it("handles unknown commands gracefully", () => {
    expect(latexToHtml("\\unknowncommand{something}")).toBeDefined();
  });

  it("handles unclosed braces gracefully", () => {
    expect(latexToHtml("\\textbf{unclosed")).toBeDefined();
  });

  it("handles deeply nested braces", () => {
    const html = latexToHtml("\\textbf{\\textit{\\underline{deep}}}");
    expect(html).toContain("<strong>");
    expect(html).toContain("<em>");
    expect(html).toContain("<u>deep</u>");
  });

  it("preserves plain text", () => {
    const html = latexToHtml("Just plain text here.");
    expect(html).toContain("Just plain text here.");
  });

  it("handles consecutive commands", () => {
    const html = latexToHtml("\\textbf{A}\\textit{B}\\underline{C}");
    expect(html).toContain("<strong>A</strong>");
    expect(html).toContain("<em>B</em>");
    expect(html).toContain("<u>C</u>");
  });
});

describe("Cycle 6: Outline with chapters and parts", () => {
  it("extracts parts from outline", () => {
    const outline = extractOutline("\\part{Part One}\n\\chapter{Ch1}\n\\section{Sec1}");
    expect(outline.length).toBe(3);
    expect(outline[0].level).toBe(-1);
    expect(outline[0].title).toBe("Part One");
  });

  it("generates correct indentation for full hierarchy", () => {
    const outline = [
      { level: -1, title: "Part", line: 1 },
      { level: 0, title: "Chapter", line: 5 },
      { level: 1, title: "Section", line: 10 },
      { level: 2, title: "Subsection", line: 15 },
    ];
    const text = outlineToText(outline);
    expect(text).toContain("Part");
    expect(text).toContain("Chapter");
    expect(text).toContain("  Section");
    expect(text).toContain("    Subsection");
  });
});
