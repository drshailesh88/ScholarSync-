// ---------------------------------------------------------------------------
// ScholarSync Draft Mode — Types
// ---------------------------------------------------------------------------

/** Mode intensity dial — controls AI aggressiveness across all layers */
export type DraftModeIntensity = "focus" | "collaborate" | "accelerate";

/** Human-readable labels for mode intensity */
export const DRAFT_MODE_LABELS: Record<DraftModeIntensity, string> = {
  focus: "Focus",
  collaborate: "Collaborate",
  accelerate: "Accelerate",
};

/** Descriptions for each mode intensity */
export const DRAFT_MODE_DESCRIPTIONS: Record<DraftModeIntensity, string> = {
  focus: "AI is quiet — only responds when you ask",
  collaborate: "AI assists with completions and suggestions",
  accelerate: "AI is proactive — full suggestions and sidebar",
};

/** Precision Edit action types */
export type PrecisionEditAction =
  | "rephrase"
  | "shorten"
  | "expand"
  | "make_academic"
  | "active_voice"
  | "simplify"
  | "strengthen_claim"
  | "add_transition"
  | "split_paragraph"
  | "merge_paragraphs"
  | "reorder"
  | "add_citation"
  | "flag_unsupported"
  | "check_guidelines";

/** Human-readable labels for precision edit actions */
export const PRECISION_EDIT_LABELS: Record<PrecisionEditAction, string> = {
  rephrase: "Rephrase",
  shorten: "Shorten",
  expand: "Expand",
  make_academic: "Make Academic",
  active_voice: "Active Voice",
  simplify: "Simplify",
  strengthen_claim: "Strengthen Claim",
  add_transition: "Add Transition",
  split_paragraph: "Split Paragraph",
  merge_paragraphs: "Merge Paragraphs",
  reorder: "Reorder",
  add_citation: "Add Citation",
  flag_unsupported: "Flag Unsupported",
  check_guidelines: "Check Guidelines",
};

/** Suggestion severity levels */
export type SuggestionSeverity = "error" | "improvement" | "polish";

/** Suggestion categories for the sidebar */
export type SuggestionCategory = "language" | "consistency" | "structure";

/**
 * ScholarRules — project-level AI configuration
 * Analog of Cursor's .cursorrules for academic writing
 */
export interface ScholarRules {
  document_type?: string;
  target_journal?: string;
  reporting_guideline?: string;
  citation_style?: string;
  dialect?: "British_English" | "American_English";

  /** Voice and tense rules */
  voice?: "first_person_plural" | "first_person_singular" | "third_person" | "passive";
  tense?: {
    introduction?: string;
    methods?: string;
    results?: string;
    discussion?: string;
    case_presentation?: string;
  };

  /** Sentence-level rules */
  max_sentence_length?: number;
  max_paragraph_length?: number;

  /** Term preferences */
  avoid_terms?: string[];
  prefer_terms?: Array<{ use: string; instead_of: string }>;

  /** Custom rules (natural language, interpreted by AI) */
  custom_rules?: string[];

  /** Flow Assist tuning */
  ghost_text?: {
    enabled?: boolean;
    pause_delay_ms?: number;
    max_length_sentences?: number;
    citation_prompts?: boolean;
  };
}

/** Context passed from the UI to the chat API for draft mode */
export interface DraftContext {
  intensity: DraftModeIntensity;
  documentType?: string;
  currentSection?: string;
  targetJournal?: string;
  projectTitle?: string;
  scholarRules?: ScholarRules;
  /** The section text surrounding the cursor for context */
  surroundingText?: string;
}

/** Request body for precision edit API */
export interface PrecisionEditRequest {
  action: PrecisionEditAction;
  selectedText: string;
  instruction?: string;
  surroundingContext?: string;
  documentType?: string;
  targetJournal?: string;
  scholarRules?: ScholarRules;
}

/** Response from precision edit API */
export interface PrecisionEditResponse {
  originalText: string;
  suggestedText: string;
  explanation: string;
  action: PrecisionEditAction;
}
