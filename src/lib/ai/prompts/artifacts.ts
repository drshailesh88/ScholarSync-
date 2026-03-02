/**
 * Artifact Generation Prompts
 *
 * Specialized system prompt components for generating structured artifacts
 * (study guides, briefing docs, FAQs) from uploaded sources.
 * Appended to the base system prompt when artifact intent is detected.
 */

// ── Artifact type detection ──────────────────────────────────────

const STUDY_GUIDE_KEYWORDS = [
  "study guide",
  "review guide",
  "exam prep",
  "key concepts",
  "learning summary",
  "revision notes",
  "create a guide",
  "generate a guide",
  "help me study",
  "study material",
];

const BRIEFING_DOC_KEYWORDS = [
  "briefing",
  "executive summary",
  "brief me",
  "briefing document",
  "brief summary",
  "overview document",
  "one-pager",
];

const FAQ_KEYWORDS = [
  "faq",
  "frequently asked",
  "common questions",
  "generate questions and answers",
  "q&a",
  "questions and answers",
];

const TIMELINE_KEYWORDS = [
  "timeline",
  "chronological",
  "chronology",
  "sequence of events",
  "key dates",
  "history of",
];

const AUDIO_OVERVIEW_KEYWORDS = [
  "audio overview",
  "podcast",
  "audio summary",
  "deep dive",
  "discuss these papers",
  "talk through",
  "conversation about",
  "audio briefing",
];

export type ArtifactType = "study_guide" | "briefing_doc" | "faq" | "timeline" | "audio_overview" | null;

/**
 * Detect if a query is requesting a structured artifact.
 * Returns the artifact type or null if not an artifact request.
 */
export function detectArtifactType(query: string): ArtifactType {
  const lower = query.toLowerCase();
  if (STUDY_GUIDE_KEYWORDS.some((kw) => lower.includes(kw))) return "study_guide";
  if (BRIEFING_DOC_KEYWORDS.some((kw) => lower.includes(kw))) return "briefing_doc";
  if (FAQ_KEYWORDS.some((kw) => lower.includes(kw))) return "faq";
  if (TIMELINE_KEYWORDS.some((kw) => lower.includes(kw))) return "timeline";
  if (AUDIO_OVERVIEW_KEYWORDS.some((kw) => lower.includes(kw))) return "audio_overview";
  return null;
}

// ── Artifact prompts ─────────────────────────────────────────────

export const STUDY_GUIDE_PROMPT = `

STUDY GUIDE MODE — ACTIVE:
The user is asking you to create a study guide from their uploaded sources. Follow this exact structure:

## Key Concepts
List 4-6 key concepts or terms from the sources, each with a 1-2 sentence definition citing the relevant source [N].

## Main Findings
Summarize the primary results from each paper separately, with exact statistics and citations [N]. Use bullet points.

## Methodology Overview
Briefly describe the study design, population, and intervention for each paper with citations [N].

## Review Questions
Generate 3-4 review questions that are answerable from the sources. Do NOT provide answers — the student should find them.

## Key Takeaways
2-3 sentences synthesizing the overall evidence, with citations.

STUDY GUIDE RULES:
- EVERY factual statement must cite its source [N].
- Key Concepts must only define terms that appear in the sources.
- Review Questions must be answerable from the source content — do NOT ask about data not present.
- Do NOT fabricate statistics, outcomes, or trial details not in the sources.
- Use clear, student-friendly language while maintaining scientific accuracy.`;

export const BRIEFING_DOC_PROMPT = `

BRIEFING DOCUMENT MODE — ACTIVE:
The user is asking for an executive summary / briefing document. Follow this structure:

## Bottom Line
1-2 sentences with the key takeaway, citing sources.

## Evidence Summary
Per-paper findings with citations, formatted as bullet points.

## Implications
What this evidence means for practice or policy, grounded in the sources.

BRIEFING RULES:
- Be concise — this is for busy decision-makers.
- EVERY claim must cite its source [N].
- Do NOT fabricate implications not supported by the sources.`;

export const FAQ_PROMPT = `

FAQ MODE — ACTIVE:
Generate a Frequently Asked Questions document from the uploaded sources.

Format each Q&A as:
**Q: [Question]**
A: [Answer with citations [N]]

Generate 5-6 Q&A pairs covering different aspects of the sources.

FAQ RULES:
- Every answer must cite its source [N].
- Questions should be specific to the source content, not generic.
- Answers must be grounded — do NOT fabricate data.`;

export const AUDIO_OVERVIEW_PROMPT = `

AUDIO OVERVIEW MODE — ACTIVE:
Generate a conversational podcast-style script that discusses the uploaded sources. The script features two speakers:

**Host**: Introduces topics, asks probing questions, and guides the conversation.
**Expert**: Provides detailed answers grounded in the source material.

FORMAT:
**Host:** [dialogue]
**Expert:** [dialogue with inline citations [N]]

STRUCTURE:
1. Opening — Host introduces the topic and papers being discussed
2. Key Findings — Expert walks through major results from each paper, cited
3. Discussion — Host asks about implications, differences between trials, or limitations
4. Wrap-up — Host summarizes the key takeaways

AUDIO OVERVIEW RULES:
- EVERY factual claim by the Expert must cite its source [N].
- The Host should NOT make unsupported claims — only ask questions or summarize what the Expert said.
- Use conversational language but maintain scientific accuracy.
- Do NOT fabricate data, outcomes, or trial names not in the sources.
- Cover all papers in the sources — do not skip any.
- If evidence is conflicting, present it honestly — do not fabricate consensus.`;

/**
 * Get the artifact prompt for the detected type.
 */
export function getArtifactPrompt(type: ArtifactType): string {
  switch (type) {
    case "study_guide":
      return STUDY_GUIDE_PROMPT;
    case "briefing_doc":
      return BRIEFING_DOC_PROMPT;
    case "faq":
      return FAQ_PROMPT;
    case "timeline":
      return ""; // Timeline doesn't need a special prompt structure
    case "audio_overview":
      return AUDIO_OVERVIEW_PROMPT;
    default:
      return "";
  }
}
