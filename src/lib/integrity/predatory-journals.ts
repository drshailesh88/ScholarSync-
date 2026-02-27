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
 * Check if a publisher or journal name appears on Beall's List.
 * Uses case-insensitive substring matching.
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
    if (pubLower && (pubLower.includes(pred) || pred.includes(pubLower))) {
      return {
        publisher: publisher ?? "",
        journal: journal ?? "",
        listSource: "Beall's List",
      };
    }
  }

  // Check journal against predatory journals list
  for (const pred of normalizedJournals) {
    if (
      journalLower &&
      (journalLower.includes(pred) || pred.includes(journalLower))
    ) {
      return {
        publisher: publisher ?? "",
        journal: journal ?? "",
        listSource: "Beall's List",
      };
    }
  }

  return null;
}
