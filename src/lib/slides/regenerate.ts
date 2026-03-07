export const REGENERATE_TONE_OPTIONS = [
  {
    value: "keep_similar",
    label: "Keep similar",
    prompt: "Preserve the current level of detail, framing, and overall angle unless the user explicitly asks otherwise.",
  },
  {
    value: "more_detailed",
    label: "More detailed",
    prompt: "Add more depth, specificity, supporting detail, and explanatory structure than the current slide.",
  },
  {
    value: "more_concise",
    label: "More concise",
    prompt: "Make the slide tighter and easier to scan while preserving the essential message.",
  },
  {
    value: "different_approach",
    label: "Different approach",
    prompt: "Reframe the slide with a meaningfully different narrative or presentation approach while staying aligned with the deck.",
  },
] as const;

export type RegenerateTone = (typeof REGENERATE_TONE_OPTIONS)[number]["value"];

export function getRegenerateTonePrompt(tone: string): string {
  return (
    REGENERATE_TONE_OPTIONS.find((option) => option.value === tone)?.prompt ??
    REGENERATE_TONE_OPTIONS[0].prompt
  );
}

