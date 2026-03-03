// ---------------------------------------------------------------------------
// Predatory Journal / Publisher Detection
// Checks publisher and journal names against curated lists derived from
// Beall's List of potentially predatory publishers and standalone journals.
// ---------------------------------------------------------------------------

import predatoryPublishers from "./data/predatory-publishers.json";
import predatoryJournals from "./data/predatory-journals.json";
import type { PredatoryJournalInfo } from "./types";

// Normalize for case-insensitive matching
const normalizedPublishers = predatoryPublishers.map((p) => p.toLowerCase());
const normalizedJournals = predatoryJournals.map((j) => j.toLowerCase());

/**
 * Minimum length for the reverse-substring check (pred.includes(input)).
 * Short legitimate names like "Nature", "Science" must not false-match
 * against longer predatory entries containing that word as a substring.
 */
const MIN_REVERSE_MATCH_LENGTH = 12;

/**
 * Check if a publisher or journal name appears on Beall's List.
 * Uses case-insensitive substring matching with a length guard to
 * prevent false positives on short legitimate names.
 *
 * @returns PredatoryJournalInfo if a match is found, null otherwise
 */
export function checkPredatoryJournal(
  publisher?: string,
  journal?: string
): PredatoryJournalInfo | null {
  const pubLower = publisher?.toLowerCase().trim() ?? "";
  const journalLower = journal?.toLowerCase().trim() ?? "";

  // Check publisher against predatory publishers list
  for (const pred of normalizedPublishers) {
    if (!pubLower) continue;
    // Forward: input contains a known predatory name (always safe)
    // Reverse: predatory entry contains input — only if input is long enough
    //          to avoid false positives on short legitimate names
    const forwardMatch = pubLower.includes(pred);
    const reverseMatch =
      pubLower.length >= MIN_REVERSE_MATCH_LENGTH && pred.includes(pubLower);
    if (forwardMatch || reverseMatch) {
      return {
        publisher: publisher ?? "",
        journal: journal ?? "",
        listSource: "Beall's List",
      };
    }
  }

  // Check journal against predatory journals list
  for (const pred of normalizedJournals) {
    if (!journalLower) continue;
    const forwardMatch = journalLower.includes(pred);
    const reverseMatch =
      journalLower.length >= MIN_REVERSE_MATCH_LENGTH &&
      pred.includes(journalLower);
    if (forwardMatch || reverseMatch) {
      return {
        publisher: publisher ?? "",
        journal: journal ?? "",
        listSource: "Beall's List",
      };
    }
  }

  return null;
}
