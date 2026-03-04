/**
 * LaTeX Spell Check Module
 *
 * Provides spell checking for LaTeX documents with:
 * - Medical/scientific word dictionary
 * - LaTeX command filtering (skips \commands)
 * - Prose-only checking (inside {} and paragraph text)
 */

import nspell from "nspell";

// Medical and scientific terms allowlist
const MEDICAL_TERMS = [
  // Anatomy
  "anatomy", "physiology", "histology", "pathology", "etiology",
  "epidemiology", "morphology", "histopathology", "cytology",
  // Diseases
  "Alzheimer", "Parkinson", "Huntington", "amyloidosis", "atherosclerosis",
  "carcinoma", "sarcoma", "lymphoma", "leukemia", "melanoma",
  "fibrosis", "cirrhosis", "necrosis", "sclerosis", "osteoporosis",
  "arthritis", "osteomyelitis", "endocarditis", "pericarditis",
  "meningitis", "encephalitis", "neuritis", "neuropathy",
  // Medical terms
  "diagnosis", "prognosis", "symptomatology", "therapeutics",
  "pharmacology", "pharmacokinetics", "pharmacodynamics",
  "bioavailability", "metabolism", "contraindication",
  // Research terms
  "longitudinal", "cross-sectional", "retrospective", "prospective",
  "randomized", "placebo-controlled", "double-blind", "multicenter",
  "cohort", "prevalence", "incidence", "mortality", "morbidity",
  // Statistical terms
  "correlation", "regression", "significance", "confidence",
  "heterogeneity", "homogeneity", "variance", "covariance",
  // Scientific terms
  "hypothesis", "methodology", "replication", "validation",
  "calibration", "quantification", "characterization",
  // Latin terms common in medical writing
  "in vitro", "in vivo", "ex vivo", "in situ", "de novo",
  "a priori", "post hoc", "ad hoc", "per se", "inter alia",
  "versus", "via", "etc", "i.e", "e.g",
  "vitro", "vivo", "situ",
];

// Scientific abbreviations
const SCIENTIFIC_ABBREVIATIONS = [
  "DNA", "RNA", "mRNA", "tRNA", "siRNA", "miRNA", "lncRNA",
  "PCR", "RT-PCR", "qPCR", "ELISA", "Western", "Northern", "Southern",
  "SDS-PAGE", "HPLC", "GC-MS", "LC-MS", "NMR", "MRI", "CT", "PET",
  "ANOVA", "MANOVA", "t-test", "Chi-square", "Kaplan-Meier",
  "WHO", "CDC", "FDA", "EMA", "NIH", "NSF",
  "kg", "mg", "μg", "ng", "pg", "mL", "μL", "mM", "μM", "nM",
  "p53", "TGF-β", "TNF-α", "IL-1", "IL-6", "IFN-γ",
];

// Build a personal dictionary
function buildPersonalDict(): string {
  const allTerms = [...MEDICAL_TERMS, ...SCIENTIFIC_ABBREVIATIONS];
  return allTerms.map((term) => `${term}\n`).join("");
}

let spellInstance: ReturnType<typeof nspell> | null = null;

/**
 * Initialize the spell checker with English dictionary and medical terms.
 */
async function getSpellChecker(): Promise<ReturnType<typeof nspell>> {
  if (spellInstance) return spellInstance;

  // Dynamic import for dictionary-en (ESM)
  const dictionary = await import("dictionary-en");
  const dict = dictionary.default || dictionary;

  // Convert Uint8Array to Buffer if needed
  const aff = Buffer.isBuffer(dict.aff) ? dict.aff : Buffer.from(dict.aff);
  const dic = Buffer.isBuffer(dict.dic) ? dict.dic : Buffer.from(dict.dic);

  // Create spell checker with base English dictionary
  spellInstance = nspell(aff, dic);

  // Add medical/scientific terms
  const personalDict = buildPersonalDict();
  spellInstance.personal(personalDict);

  return spellInstance;
}

/**
 * Result of a spell check operation.
 */
export interface SpellError {
  word: string;
  line: number;
  column: number;
  suggestions: string[];
}

/**
 * Extract prose text from LaTeX, returning text with position mappings.
 * Skips LaTeX commands and only checks actual content.
 */
function extractProseFromLatex(
  content: string
): { text: string; positions: Map<number, { line: number; column: number }> } {
  const positions = new Map<number, { line: number; column: number }>();
  const prose: string[] = [];

  let inCommand = false;
  let inMath = false;
  let inComment = false;
  let _braceDepth = 0; // Track brace nesting (unused but kept for future use)
  let proseIndex = 0;

  const lines = content.split("\n");

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    let col = 0;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      // Track comment state
      if (char === "%" && !inMath) {
        inComment = true;
        continue;
      }

      // Skip comments (rest of line after %)
      if (inComment) continue;

      // Track math mode
      if (char === "$" && nextChar !== "$") {
        inMath = !inMath;
        continue;
      }
      if (char === "$" && nextChar === "$") {
        inMath = !inMath;
        i++; // Skip next $
        continue;
      }

      // Skip math content
      if (inMath) continue;

      // Track LaTeX commands
      if (char === "\\") {
        inCommand = true;
        continue;
      }

      // Track braces (command arguments)
      if (char === "{") {
        _braceDepth++;
        inCommand = false; // Command name ends at opening brace
        continue;
      }
      if (char === "}") {
        _braceDepth--;
        continue;
      }

      // Skip command names (letters immediately after \)
      if (inCommand && /[a-zA-Z]/.test(char)) {
        continue;
      }

      // End command when we hit a non-letter
      if (inCommand && !/[a-zA-Z]/.test(char)) {
        inCommand = false;
      }

      // Add to prose if we're not in a command name
      // Content inside braces IS checked (it's the actual text)
      if (!inCommand) {
        prose.push(char);
        positions.set(proseIndex, { line: lineNum + 1, column: col + 1 });
        proseIndex++;
      }

      col++;
    }

    // Reset comment at end of line
    inComment = false;

    // Add newline to prose for position tracking
    prose.push("\n");
    proseIndex++;
  }

  return { text: prose.join(""), positions };
}

/**
 * Extract words from text.
 */
function extractWords(text: string): Array<{ word: string; start: number; end: number }> {
  const words: Array<{ word: string; start: number; end: number }> = [];
  const wordRegex = /\b[a-zA-Z]+\b/g;
  let match;

  while ((match = wordRegex.exec(text)) !== null) {
    words.push({
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return words;
}

/**
 * Check spelling in LaTeX content.
 * Returns array of misspelled words with suggestions.
 */
export async function checkLatexSpelling(content: string): Promise<SpellError[]> {
  const spell = await getSpellChecker();
  const errors: SpellError[] = [];

  // Extract prose from LaTeX
  const { text, positions } = extractProseFromLatex(content);

  // Find all words
  const words = extractWords(text);

  // Check each word
  for (const { word, start } of words) {
    // Skip very short words (initials, etc.)
    if (word.length < 2) continue;

    // Skip words that are all caps (acronyms)
    if (word === word.toUpperCase() && word.length > 1) continue;

    // Check if correct
    const isCorrect = spell.correct(word);
    if (!isCorrect) {
      // Get suggestions
      const suggestions = spell.suggest(word).slice(0, 5);

      // Find position
      const pos = positions.get(start) || { line: 1, column: 1 };

      errors.push({
        word,
        line: pos.line,
        column: pos.column,
        suggestions,
      });
    }
  }

  return errors;
}

/**
 * Get spelling suggestions for a specific word.
 */
export async function getSuggestions(word: string): Promise<string[]> {
  const spell = await getSpellChecker();
  return spell.suggest(word);
}

/**
 * Add a word to the personal dictionary.
 */
export function addWordToDictionary(word: string): void {
  if (spellInstance) {
    spellInstance.personal(word);
  }
}

/**
 * Clear the spell checker cache (for testing).
 */
export function clearSpellCheckerCache(): void {
  spellInstance = null;
}
