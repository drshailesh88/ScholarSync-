/**
 * Post-Processing Module
 *
 * Publication-quality post-processing pipeline for agent-generated diagrams.
 */

export { PublicationPolishProcessor, polishSvg } from './publication-polish';
export type { PublicationPolishOptions } from './publication-polish';

export {
  JOURNAL_PRESETS,
  getJournalPreset,
  getAvailablePresets,
  getAllPresets,
} from './journal-presets';
export type { JournalPreset } from './journal-presets';
