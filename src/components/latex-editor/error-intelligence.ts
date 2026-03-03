// ---------------------------------------------------------------------------
// LaTeX Error Intelligence
// Pattern-matched error explanations and fix suggestions for common LaTeX errors.
// ---------------------------------------------------------------------------

export interface EnrichedDiagnostic {
  /** Original raw error message from the compiler */
  raw: string;
  /** Human-readable explanation */
  explanation: string;
  /** Suggested fix (code or instruction) */
  suggestion: string | null;
  /** Category for grouping */
  category: "syntax" | "package" | "math" | "reference" | "font" | "file" | "other";
}

interface ErrorPattern {
  /** Regex to match against the raw error message */
  pattern: RegExp;
  /** Human-readable explanation (can use $1, $2 etc. for capture groups) */
  explanation: string;
  /** Fix suggestion template */
  suggestion: string | null;
  category: EnrichedDiagnostic["category"];
}

const ERROR_PATTERNS: ErrorPattern[] = [
  // ---- Syntax errors ----
  {
    pattern: /Undefined control sequence.*\\(\w+)/,
    explanation: "The command \\$1 is not defined. It may be misspelled or require a package that isn't loaded.",
    suggestion: "Check the spelling of \\$1, or add the required \\usepackage{} in the preamble.",
    category: "syntax",
  },
  {
    pattern: /Undefined control sequence/,
    explanation: "A command was used that LaTeX doesn't recognize. It may be misspelled or need a package.",
    suggestion: "Check for typos in command names and ensure all required packages are loaded.",
    category: "syntax",
  },
  {
    pattern: /Missing \$ inserted/,
    explanation: "LaTeX found a math symbol (like _ or ^) outside of math mode. These characters require $ delimiters.",
    suggestion: "Wrap the expression in $...$ for inline math, or use \\textsubscript{}/\\textsuperscript{} for text.",
    category: "math",
  },
  {
    pattern: /Missing \\begin\{document\}/,
    explanation: "LaTeX reached content before the \\begin{document} command. All text must appear after it.",
    suggestion: "Move any text or commands that produce output to after \\begin{document}.",
    category: "syntax",
  },
  {
    pattern: /Missing { inserted|Missing } inserted/,
    explanation: "A brace is missing. LaTeX commands require matching { and } delimiters.",
    suggestion: "Check for unmatched braces near the error line. Count opening and closing braces to find the mismatch.",
    category: "syntax",
  },
  {
    pattern: /Extra }, or forgotten \\endgroup/,
    explanation: "There's an extra closing brace } without a matching opening brace, or a group was closed prematurely.",
    suggestion: "Remove the extra } or add the missing opening {.",
    category: "syntax",
  },
  {
    pattern: /Misplaced alignment tab character &/,
    explanation: "The & character is used for column alignment in tables/arrays. It was found where LaTeX didn't expect it.",
    suggestion: "Use \\& to print a literal ampersand in text, or ensure & is only used inside tabular/array environments.",
    category: "syntax",
  },
  {
    pattern: /\\begin\{(\w+)\} ended by \\end\{(\w+)\}/,
    explanation: "Environment mismatch: \\begin{$1} was closed with \\end{$2} instead of \\end{$1}.",
    suggestion: "Change \\end{$2} to \\end{$1}, or fix the \\begin command.",
    category: "syntax",
  },
  {
    pattern: /Environment (\w+) undefined/,
    explanation: "The environment '$1' is not defined. It may need a specific package.",
    suggestion: "Check the environment name for typos, or add the package that defines '$1'.",
    category: "syntax",
  },

  // ---- Package errors ----
  {
    pattern: /File `([^']+)' not found/,
    explanation: "LaTeX cannot find the file '$1'. It may not be installed or the path may be wrong.",
    suggestion: "Check that '$1' exists in the project or is installed. For packages, try \\usepackage without the .sty extension.",
    category: "file",
  },
  {
    pattern: /LaTeX Error: Unknown option `([^']+)' for package `([^']+)'/,
    explanation: "The option '$1' is not valid for the package '$2'.",
    suggestion: "Check the documentation for '$2' to see valid options, or remove the '$1' option.",
    category: "package",
  },
  {
    pattern: /Package ([^ ]+) Error: (.+)/,
    explanation: "The package '$1' reported an error: $2",
    suggestion: "Check the '$1' package documentation for this error.",
    category: "package",
  },
  {
    pattern: /Option clash for package (\w+)/,
    explanation: "The package '$1' was loaded with conflicting options. It may be loaded twice with different options.",
    suggestion: "Load '$1' only once. Use \\PassOptionsToPackage{options}{$1} before \\documentclass if needed.",
    category: "package",
  },

  // ---- Math errors ----
  {
    pattern: /Display math should end with \$\$/,
    explanation: "A display math block ($$) was opened but not properly closed.",
    suggestion: "Add the closing $$ or switch to \\[ ... \\] (preferred in LaTeX).",
    category: "math",
  },
  {
    pattern: /Double subscript|Double superscript/,
    explanation: "Two subscripts or superscripts were used on the same base without grouping.",
    suggestion: "Use braces to group: x_{a_b} instead of x_a_b.",
    category: "math",
  },
  {
    pattern: /Extra alignment tab/,
    explanation: "More columns (& separators) than defined in the table/array format.",
    suggestion: "Either reduce the number of & in this row or add more column specifiers to the format string.",
    category: "math",
  },

  // ---- Reference/citation errors ----
  {
    pattern: /Citation `([^']+)' on page \d+ undefined/,
    explanation: "The citation key '$1' was not found in any .bib file.",
    suggestion: "Check that '$1' exists in your .bib file. Run BibTeX/Biber, then compile twice.",
    category: "reference",
  },
  {
    pattern: /Reference `([^']+)' on page \d+ undefined/,
    explanation: "The label '$1' referenced by \\ref or \\eqref does not exist.",
    suggestion: "Add \\label{$1} to the target element, or fix the label name in \\ref{$1}.",
    category: "reference",
  },
  {
    pattern: /Label `([^']+)' multiply defined/,
    explanation: "The label '$1' is defined more than once. Labels must be unique.",
    suggestion: "Rename one of the duplicate \\label{$1} entries.",
    category: "reference",
  },
  {
    pattern: /There were undefined references/,
    explanation: "Some \\ref or \\cite commands point to labels or keys that don't exist.",
    suggestion: "Compile twice to resolve references, or check for typos in \\label and \\ref commands.",
    category: "reference",
  },

  // ---- Font errors ----
  {
    pattern: /Font .*not found|font.*unavailable/i,
    explanation: "A requested font is not available on this system.",
    suggestion: "Switch to a standard font or use a different compiler (XeLaTeX/LuaLaTeX for system fonts).",
    category: "font",
  },
  {
    pattern: /Encoding scheme.*unknown/,
    explanation: "The font encoding specified is not recognized.",
    suggestion: "Use standard encodings like T1 (\\usepackage[T1]{fontenc}) for European languages.",
    category: "font",
  },

  // ---- File errors ----
  {
    pattern: /I can't write on file/,
    explanation: "LaTeX cannot write to the output file. It may be open in another program or permissions may be wrong.",
    suggestion: "Close any PDF viewers that have the output file open, then recompile.",
    category: "file",
  },
  {
    pattern: /Emergency stop/,
    explanation: "LaTeX encountered a fatal error and stopped compilation. Check the error(s) above this message.",
    suggestion: "Fix the preceding errors first. This is usually caused by a missing file or severe syntax error.",
    category: "syntax",
  },

  // ---- Overfull/underfull ----
  {
    pattern: /Overfull \\hbox.*(\d+\.?\d*)pt/,
    explanation: "Content extends $1pt beyond the margin. Text or a figure is too wide for the page.",
    suggestion: "Rephrase the text, resize images, or allow LaTeX to break the line with \\sloppy.",
    category: "other",
  },
  {
    pattern: /Underfull \\hbox/,
    explanation: "A line has too much whitespace. LaTeX couldn't fill the line properly.",
    suggestion: "This is usually harmless. You can rephrase the text or ignore the warning.",
    category: "other",
  },
];

/**
 * Enrich a raw LaTeX error message with a human-readable explanation
 * and fix suggestion by matching against known patterns.
 */
export function enrichError(raw: string): EnrichedDiagnostic {
  for (const pat of ERROR_PATTERNS) {
    const match = raw.match(pat.pattern);
    if (match) {
      // Replace $1, $2 etc. with captured groups
      let explanation = pat.explanation;
      let suggestion = pat.suggestion;
      for (let i = 1; i < match.length; i++) {
        const token = `$${i}`;
        explanation = explanation.replaceAll(token, match[i] ?? "");
        if (suggestion) suggestion = suggestion.replaceAll(token, match[i] ?? "");
      }
      return { raw, explanation, suggestion, category: pat.category };
    }
  }

  // No pattern matched — return generic
  return {
    raw,
    explanation: raw,
    suggestion: null,
    category: "other",
  };
}

/**
 * Enrich an array of diagnostics at once.
 */
export function enrichDiagnostics(
  diagnostics: { line: number | null; message: string; severity: "error" | "warning" }[]
): (typeof diagnostics[number] & { enriched: EnrichedDiagnostic })[] {
  return diagnostics.map((d) => ({
    ...d,
    enriched: enrichError(d.message),
  }));
}
