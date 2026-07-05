import type { EligibilityCriterion, Protocol } from "./types";

export interface PicoField {
  key: keyof Protocol["pico"];
  label: string;
  hint: string;
}

/** The five PICO(S) fields, AI-drafted from the research question. */
export const PICO_FIELDS: PicoField[] = [
  { key: "population", label: "Population", hint: "Who is studied" },
  { key: "intervention", label: "Intervention", hint: "What is done" },
  { key: "comparator", label: "Comparator", hint: "Compared against" },
  { key: "outcome", label: "Outcome", hint: "What is measured" },
  {
    key: "studyDesign",
    label: "Study design",
    hint: "Eligible designs",
  },
];

/**
 * Collapse the structured protocol criteria into the plain inclusion/exclusion
 * labels the screening & full-text criteria panels read. The protocol is the
 * single source; the screening panel derives from it.
 */
export function deriveScreeningCriteria(protocol: Protocol): {
  inclusion: string[];
  exclusion: string[];
} {
  return {
    inclusion: protocol.criteria
      .filter((c) => c.kind === "include")
      .map((c) => c.label),
    exclusion: protocol.criteria
      .filter((c) => c.kind === "exclude")
      .map((c) => c.label),
  };
}

/** Elicit-style suggested criteria the reviewer can add with one tap. */
export const SUGGESTED_CRITERIA: Array<
  Omit<EligibilityCriterion, "id">
> = [
  {
    kind: "include",
    label: "Human participants",
    instruction: "Include studies conducted in human participants only.",
    answerStructure: "yes_no_maybe",
  },
  {
    kind: "include",
    label: "Peer-reviewed full text available",
    instruction:
      "Include studies published in a peer-reviewed journal with a retrievable full text.",
    answerStructure: "yes_no_maybe",
  },
  {
    kind: "exclude",
    label: "Follow-up under 12 weeks",
    instruction: "Exclude studies with a follow-up period shorter than 12 weeks.",
    answerStructure: "yes_no_maybe",
  },
  {
    kind: "exclude",
    label: "No comparator arm",
    instruction: "Exclude single-arm studies with no comparator or control group.",
    answerStructure: "yes_no_maybe",
  },
];
