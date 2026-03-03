/**
 * LaTeX compilation error/warning parser.
 * Parses Tectonic/pdflatex log output into structured diagnostics.
 */

export interface CompilationDiagnostic {
  line: number | null;
  message: string;
  severity: "error" | "warning";
}

/**
 * Human-readable error messages for common LaTeX errors.
 * UX improvement over Overleaf: instead of raw TeX errors, we show plain English.
 */
const HUMAN_READABLE_ERRORS: [RegExp, string][] = [
  [/Undefined control sequence/i, "Unknown command — check for typos or missing \\usepackage"],
  [/Missing \$ inserted/i, "Math mode needed — wrap math expressions in $..$ or \\[..\\]"],
  [/Missing \\begin\{document\}/i, "No \\begin{document} found — add it after the preamble"],
  [/Environment .+ undefined/i, "Unknown environment — check spelling or add the required package"],
  [/Too many }'s/i, "Extra closing brace } — check for mismatched braces"],
  [/File .+ not found/i, "File not found — check the filename and path"],
  [/LaTeX Error: \\begin\{(.+)\} on input line (\d+) ended by \\end\{(.+)\}/i, "Mismatched environments — \\begin and \\end don't match"],
  [/Package .+ Error/i, "Package error — check package options and compatibility"],
  [/Misplaced alignment tab character/i, "Stray & character — only use & inside tables or align environments"],
  [/Extra alignment tab/i, "Too many & characters in this table row"],
  [/Illegal unit of measure/i, "Invalid measurement — use pt, cm, mm, in, em, or ex"],
  [/Missing number, treated as zero/i, "Expected a number — check command arguments"],
];

/**
 * Convert a raw LaTeX error message to a human-readable version.
 */
export function humanizeError(rawMessage: string): string {
  for (const [pattern, humanMessage] of HUMAN_READABLE_ERRORS) {
    if (pattern.test(rawMessage)) {
      return `${humanMessage} — ${rawMessage}`;
    }
  }
  return rawMessage;
}

/**
 * Parse a LaTeX compilation log into structured diagnostics.
 */
export function parseCompilationErrors(log: string): CompilationDiagnostic[] {
  const errors: CompilationDiagnostic[] = [];
  const lines = log.split("\n");

  for (const line of lines) {
    // TeX errors start with !
    if (line.startsWith("!")) {
      const rawMessage = line.slice(1).trim();
      errors.push({
        line: null,
        message: humanizeError(rawMessage),
        severity: "error",
      });
    }

    // Line number reference (l.42 ...)
    const lineMatch = line.match(/^l\.(\d+)/);
    if (lineMatch && errors.length > 0) {
      const lastError = errors[errors.length - 1];
      if (lastError.line === null) {
        lastError.line = parseInt(lineMatch[1], 10);
      }
    }

    // LaTeX warnings
    if (line.includes("LaTeX Warning:")) {
      const warnMatch = line.match(/LaTeX Warning:\s*(.+)/);
      if (warnMatch) {
        const lineNumMatch = warnMatch[1].match(/on input line (\d+)/);
        errors.push({
          line: lineNumMatch ? parseInt(lineNumMatch[1], 10) : null,
          message: warnMatch[1],
          severity: "warning",
        });
      }
    }

    // Overfull/underfull box warnings
    if (line.match(/^(Over|Under)full \\[hv]box/)) {
      const lineNumMatch = line.match(/at lines? (\d+)/);
      errors.push({
        line: lineNumMatch ? parseInt(lineNumMatch[1], 10) : null,
        message: line.trim(),
        severity: "warning",
      });
    }

    // Package warnings
    if (line.match(/^Package \w+ Warning:/)) {
      const warnMatch = line.match(/^Package \w+ Warning:\s*(.+)/);
      if (warnMatch) {
        const lineNumMatch = warnMatch[1].match(/on input line (\d+)/);
        errors.push({
          line: lineNumMatch ? parseInt(lineNumMatch[1], 10) : null,
          message: warnMatch[1],
          severity: "warning",
        });
      }
    }
  }

  return errors;
}

/**
 * Get a severity-ranked summary of diagnostics.
 */
export function diagnosticsSummary(diagnostics: CompilationDiagnostic[]): {
  errorCount: number;
  warningCount: number;
  firstError: CompilationDiagnostic | null;
} {
  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");
  return {
    errorCount: errors.length,
    warningCount: warnings.length,
    firstError: errors[0] ?? null,
  };
}
