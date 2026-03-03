/**
 * Static LaTeX quality checks — no AI, no server calls.
 * These run client-side to catch common issues before compilation.
 */

export interface CheckResult {
  label: string;
  status: "pass" | "warn" | "error";
  detail: string;
}

/** Find labels defined via \label{} */
export function extractLabels(content: string): string[] {
  return [...content.matchAll(/\\label\{([^}]+)\}/g)].map((m) => m[1]);
}

/** Find references via \ref{} */
export function extractRefs(content: string): string[] {
  return [...content.matchAll(/\\(?:ref|eqref|pageref|autoref|cref|Cref)\{([^}]+)\}/g)].map((m) => m[1]);
}

/** Find citation keys used via \cite{} */
export function extractCiteKeys(content: string): string[] {
  return [...content.matchAll(/\\cite[tp]?\{([^}]+)\}/g)].flatMap((m) =>
    m[1].split(",").map((s) => s.trim())
  );
}

/** Find bibliography entry keys defined in BibTeX */
export function extractBibKeys(content: string): string[] {
  return [...content.matchAll(/@\w+\{([^,]+),/g)].map((m) => m[1].trim());
}

/** Extract packages loaded via \usepackage */
export function extractPackages(content: string): string[] {
  return [...content.matchAll(/\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/g)].flatMap((m) =>
    m[1].split(",").map((s) => s.trim())
  );
}

/** Extract \begin{env} environment names */
export function extractBeginEnvs(content: string): string[] {
  return [...content.matchAll(/\\begin\{([^}]+)\}/g)].map((m) => m[1]);
}

/** Extract \end{env} environment names */
export function extractEndEnvs(content: string): string[] {
  return [...content.matchAll(/\\end\{([^}]+)\}/g)].map((m) => m[1]);
}

/** Known package conflicts */
const PACKAGE_CONFLICTS: [string, string, string][] = [
  ["subfigure", "subcaption", "subfigure is deprecated; use subcaption instead"],
  ["cite", "natbib", "cite and natbib both redefine \\cite — pick one"],
  ["times", "mathptmx", "both set Times font — use mathptmx (includes math)"],
  ["subfig", "subcaption", "subfig and subcaption conflict — use subcaption"],
  ["color", "xcolor", "xcolor supersedes color — use xcolor alone"],
];

/**
 * Run all static LaTeX checks.
 */
export function runLatexChecks(content: string): CheckResult[] {
  const results: CheckResult[] = [];

  // 1. Unused labels
  const labels = extractLabels(content);
  const refs = extractRefs(content);
  const unusedLabels = labels.filter((l) => !refs.includes(l));
  results.push({
    label: "Unused labels",
    status: unusedLabels.length > 0 ? "warn" : "pass",
    detail: unusedLabels.length > 0
      ? `${unusedLabels.length} unused: ${unusedLabels.join(", ")}`
      : "All labels referenced",
  });

  // 2. Undefined references
  const undefinedRefs = refs.filter((r) => !labels.includes(r));
  results.push({
    label: "Undefined references",
    status: undefinedRefs.length > 0 ? "error" : "pass",
    detail: undefinedRefs.length > 0
      ? `${undefinedRefs.length} undefined: ${undefinedRefs.join(", ")}`
      : "All references defined",
  });

  // 3. Unused citations
  const bibKeys = extractBibKeys(content);
  const citeKeys = extractCiteKeys(content);
  const unusedBib = bibKeys.filter((k) => !citeKeys.includes(k));
  results.push({
    label: "Unused bibliography entries",
    status: unusedBib.length > 0 ? "warn" : "pass",
    detail: unusedBib.length > 0
      ? `${unusedBib.length} unused: ${unusedBib.join(", ")}`
      : "All entries cited",
  });

  // 4. Missing \label after sections
  const sectionsWithoutLabels = [...content.matchAll(/\\(section|subsection)\*?\{[^}]+\}/g)]
    .filter((m) => {
      const idx = m.index ?? 0;
      const after = content.slice(idx, idx + m[0].length + 30);
      return !after.includes("\\label{");
    });
  results.push({
    label: "Sections without labels",
    status: sectionsWithoutLabels.length > 0 ? "warn" : "pass",
    detail: sectionsWithoutLabels.length > 0
      ? `${sectionsWithoutLabels.length} section(s) missing \\label{}`
      : "All sections labeled",
  });

  // 5. Package conflicts
  const packages = extractPackages(content);
  const conflicts: string[] = [];
  for (const [pkg1, pkg2, reason] of PACKAGE_CONFLICTS) {
    if (packages.includes(pkg1) && packages.includes(pkg2)) {
      conflicts.push(reason);
    }
  }
  results.push({
    label: "Package conflicts",
    status: conflicts.length > 0 ? "error" : "pass",
    detail: conflicts.length > 0 ? conflicts.join("; ") : "No known conflicts",
  });

  // 6. Mismatched begin/end environments
  const begins = extractBeginEnvs(content);
  const ends = extractEndEnvs(content);
  const mismatch = begins.length !== ends.length;
  results.push({
    label: "Environment matching",
    status: mismatch ? "error" : "pass",
    detail: mismatch
      ? `Mismatch: ${begins.length} \\begin vs ${ends.length} \\end`
      : `${begins.length} environments balanced`,
  });

  // 7. Check for specific environment mismatches (not just count)
  const envStack: string[] = [];
  const envErrors: string[] = [];
  const envRegex = /\\(begin|end)\{([^}]+)\}/g;
  let envMatch;
  while ((envMatch = envRegex.exec(content)) !== null) {
    if (envMatch[1] === "begin") {
      envStack.push(envMatch[2]);
    } else {
      const expected = envStack.pop();
      if (expected !== envMatch[2]) {
        envErrors.push(`Expected \\end{${expected}} but found \\end{${envMatch[2]}}`);
      }
    }
  }
  if (envErrors.length > 0) {
    results.push({
      label: "Environment order",
      status: "error",
      detail: envErrors.join("; "),
    });
  }

  // 8. Missing \bibliographystyle when \bibliography is present
  if (content.includes("\\bibliography{") && !content.includes("\\bibliographystyle{")) {
    results.push({
      label: "Missing bibliography style",
      status: "warn",
      detail: "\\bibliography used without \\bibliographystyle — add \\bibliographystyle{plain} or similar",
    });
  }

  return results;
}
