/**
 * Template validation — ensures LaTeX templates are well-formed.
 */

import type { LatexTemplate } from "@/data/latex-templates";

export interface TemplateValidation {
  templateId: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a LaTeX template for correctness.
 */
export function validateTemplate(template: LatexTemplate): TemplateValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Must have at least one file
  if (template.files.length === 0) {
    errors.push("Template has no files");
  }

  // Must have exactly one main file
  const mainFiles = template.files.filter((f) => f.isMain);
  if (mainFiles.length === 0) {
    errors.push("Template has no main file");
  } else if (mainFiles.length > 1) {
    errors.push("Template has multiple main files");
  }

  // Main file must be .tex
  for (const main of mainFiles) {
    if (!main.path.endsWith(".tex")) {
      errors.push(`Main file "${main.path}" is not a .tex file`);
    }
  }

  // Main file must have \documentclass
  for (const main of mainFiles) {
    if (!main.content.includes("\\documentclass")) {
      errors.push("Main file missing \\documentclass");
    }
  }

  // Main file must have \begin{document} and \end{document}
  for (const main of mainFiles) {
    if (!main.content.includes("\\begin{document}")) {
      errors.push("Main file missing \\begin{document}");
    }
    if (!main.content.includes("\\end{document}")) {
      errors.push("Main file missing \\end{document}");
    }
  }

  // Check for __TITLE__ placeholder
  const hasPlaceholder = template.files.some((f) => f.content.includes("__TITLE__"));
  if (!hasPlaceholder) {
    warnings.push("No __TITLE__ placeholder found — title substitution will not work");
  }

  // Valid compiler
  const validCompilers = ["pdflatex", "xelatex", "lualatex"];
  if (!validCompilers.includes(template.compiler)) {
    errors.push(`Invalid compiler: ${template.compiler}`);
  }

  // No duplicate file paths
  const paths = template.files.map((f) => f.path);
  const uniquePaths = new Set(paths);
  if (uniquePaths.size !== paths.length) {
    errors.push("Duplicate file paths in template");
  }

  // Warn if no .bib file
  if (!template.files.some((f) => f.path.endsWith(".bib"))) {
    warnings.push("No .bib file — bibliography support won't work out of the box");
  }

  return {
    templateId: template.id,
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
