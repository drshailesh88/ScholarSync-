import type { AudienceType } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Pre-Processor: Extract structure from documents/papers
// ---------------------------------------------------------------------------
export function getPreProcessorSystemPrompt(sourceType: string) {
  return `You are an expert academic content analyzer for presentation generation.
Your task is to extract a structured outline from the provided ${sourceType} content.

Extract and return a JSON object with this exact structure:
{
  "title": "A concise, compelling presentation title",
  "sections": [
    {
      "heading": "Section heading",
      "summary": "1-2 sentence summary",
      "keyPoints": ["point 1", "point 2", ...],
      "citations": ["Author et al., Year"]
    }
  ],
  "keyFindings": ["finding 1", "finding 2", ...],
  "statistics": [
    { "label": "Metric name", "value": "value with units" }
  ],
  "chartData": [
    {
      "type": "chart",
      "data": {
        "chartType": "bar|line|pie",
        "title": "Chart title",
        "labels": ["label1", "label2"],
        "datasets": [{ "label": "Dataset", "data": [1, 2, 3] }]
      }
    }
  ]
}

Guidelines:
- Extract ALL quantitative data that could be visualized as charts
- Identify the narrative flow and logical structure
- Preserve citations and attributions
- Keep summaries concise but informative
- For multi-paper sources, synthesize across papers rather than treating each independently
- For thesis content, organize by chapter/section structure
- Return ONLY valid JSON, no markdown code fences`;
}

// ---------------------------------------------------------------------------
// Slide Generator: Convert preprocessed data to slides
// ---------------------------------------------------------------------------
export function getSlideGeneratorSystemPrompt(config: {
  audienceType: AudienceType;
  slideCount?: number;
  themeKey?: string;
}) {
  const audienceGuidance = getAudienceGuidance(config.audienceType);
  const targetSlides = config.slideCount ?? 12;

  return `You are an expert presentation designer for academic audiences.
Generate a slide deck from the preprocessed content provided.

TARGET AUDIENCE: ${config.audienceType}
${audienceGuidance}

Generate approximately ${targetSlides} slides as a JSON array. Each slide must have this structure:
{
  "layout": "title_slide|title_content|two_column|section_header|image_text|chart_slide|table_slide|quote_slide|comparison|blank",
  "title": "Slide title",
  "subtitle": "Optional subtitle",
  "contentBlocks": [
    { "type": "text", "data": { "text": "...", "style": "title|subtitle|body|caption" } },
    { "type": "bullets", "data": { "items": ["..."], "ordered": false } },
    { "type": "chart", "data": { "chartType": "bar|line|pie", "title": "...", "labels": [...], "datasets": [...] } },
    { "type": "table", "data": { "headers": [...], "rows": [[...]] } },
    { "type": "citation", "data": { "text": "...", "source": "..." } },
    { "type": "quote", "data": { "text": "...", "attribution": "..." } },
    { "type": "image", "data": { "alt": "...", "suggestion": "Description of ideal image" } }
  ],
  "speakerNotes": "Detailed speaker notes for this slide"
}

Slide structure guidelines:
1. Start with a title_slide
2. Use section_header slides to divide major topics
3. Follow each section header with 2-4 content slides
4. Use chart_slide for quantitative data
5. Use comparison layout for contrasting ideas
6. Include a "Conclusions" or "Key Takeaways" slide near the end
7. End with a "Thank You" / "Questions?" slide
8. Keep bullet points to 4-6 items max per slide
9. Write comprehensive speaker notes (2-4 sentences each)
10. Include citations where academic rigor demands it

Return ONLY a JSON array of slide objects. No markdown code fences.`;
}

// ---------------------------------------------------------------------------
// Coach: Evaluate presentation quality
// ---------------------------------------------------------------------------
export function getCoachSystemPrompt(audienceType: AudienceType) {
  return `You are an expert presentation coach specializing in academic presentations.
Evaluate the provided slide deck on 5 dimensions, each scored 1-10.

AUDIENCE CONTEXT: ${audienceType}

Return a JSON object:
{
  "structureScore": <1-10>,
  "evidenceScore": <1-10>,
  "narrativeScore": <1-10>,
  "designScore": <1-10>,
  "audienceFitScore": <1-10>,
  "overallScore": <1-10 weighted average>,
  "slideInsights": [
    {
      "slideIndex": 0,
      "slideTitle": "...",
      "issues": ["issue description"],
      "strengths": ["strength description"]
    }
  ],
  "suggestions": [
    {
      "category": "structure|evidence|narrative|design|audience",
      "priority": "high|medium|low",
      "text": "Actionable suggestion",
      "slideIndex": <optional slide number>,
      "autoFixAvailable": true|false
    }
  ]
}

Scoring criteria:
- Structure (1-10): Logical flow, clear sections, appropriate slide count, smooth transitions
- Evidence (1-10): Citation quality, data visualization, supporting statistics, source diversity
- Narrative (1-10): Storytelling, engagement hooks, clear takeaways, audience connection
- Design (1-10): Content density per slide, layout variety, visual balance, readability
- Audience Fit (1-10): Appropriate depth, terminology, formality for ${audienceType}

Return ONLY valid JSON.`;
}

// ---------------------------------------------------------------------------
// Per-Slide Editor: AI operations on individual slides
// ---------------------------------------------------------------------------
export function getSlideEditorSystemPrompt(action: string) {
  const actionPrompts: Record<string, string> = {
    shorten: `Shorten the content on this slide. Reduce text by 30-50% while preserving key information.
Make bullet points more concise. Remove redundant phrases.`,

    expand: `Expand the content on this slide. Add more detail, examples, or supporting evidence.
Turn brief points into fuller explanations. Add context where helpful.`,

    rephrase: `Rephrase the content on this slide for clarity and impact.
Use more engaging language. Improve academic tone. Vary sentence structure.`,

    suggest_image: `Suggest appropriate images for this slide. For each image suggestion, provide:
- A descriptive "suggestion" field explaining what image would work
- An appropriate "alt" text
Do NOT provide URLs. Just describe what images would enhance this slide.`,

    add_citations: `Add appropriate academic citations to support the claims on this slide.
Format as [Author et al., Year] inline and add citation content blocks.`,

    improve_bullets: `Improve the bullet points on this slide:
- Make them parallel in structure
- Start each with an action verb or key noun
- Ensure consistent level of detail
- Limit to 4-6 bullets max`,

    regenerate: `Completely regenerate this slide's content while keeping the same topic and layout.
Create fresh, engaging content with better structure and flow.`,
  };

  return `You are a slide content editor. ${actionPrompts[action] ?? actionPrompts.rephrase}

Return a JSON object with the updated slide content:
{
  "contentBlocks": [...],
  "speakerNotes": "Updated speaker notes if relevant"
}

The contentBlocks array should use the same block types as the input.
Return ONLY valid JSON.`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getAudienceGuidance(audienceType: AudienceType): string {
  switch (audienceType) {
    case "thesis_defense":
      return `- Formal academic tone
- Include methodology details and statistical results
- Anticipate committee questions in speaker notes
- Include literature review context
- Show clear contribution to the field
- 15-20 slides typical`;

    case "conference":
      return `- Concise, high-impact content
- Strong opening hook
- Focus on novel contributions
- Clear data visualizations
- Minimal text per slide
- 10-15 slides for 15-minute talk`;

    case "journal_club":
      return `- Critical analysis focus
- Include study design details
- Discuss strengths and limitations
- Compare with related work
- Informal but thorough tone
- 8-12 slides typical`;

    case "classroom":
      return `- Pedagogical structure
- Define key terms
- Build concepts progressively
- Include examples and analogies
- Engage with questions
- 15-25 slides depending on lecture length`;

    case "general":
    default:
      return `- Clear, accessible language
- Balance detail with readability
- Strong visual aids
- Logical progression
- 10-15 slides typical`;
  }
}
