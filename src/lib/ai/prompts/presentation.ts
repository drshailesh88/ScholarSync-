import type { AudienceType, AcademicTemplate } from "@/types/presentation";
import { ACADEMIC_TEMPLATES } from "@/types/presentation";

// =============================================================================
// ScholarSync Presentation Engine V2 — AI Prompt Library
// =============================================================================

// ---------------------------------------------------------------------------
// 1. Pre-Processor: Extract structure, citations, and methodology from sources
// ---------------------------------------------------------------------------

export function getPreProcessorSystemPrompt(sourceType: string) {
  return `You are an expert academic content analyzer for presentation generation.
Your task is to perform a DEEP structural extraction from the provided ${sourceType} content.
The input may be up to 50,000 characters. Process ALL of it thoroughly.

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
    {
      "label": "Metric name",
      "value": "value with units",
      "ci": "95% CI [lower, upper] or null",
      "pValue": "p-value or null"
    }
  ],
  "chartData": [
    {
      "type": "chart",
      "data": {
        "chartType": "bar|line|pie|scatter|forest_plot|funnel",
        "title": "Chart title",
        "labels": ["label1", "label2"],
        "datasets": [{ "label": "Dataset", "data": [1, 2, 3] }]
      }
    }
  ],
  "citations": [
    {
      "text": "The claim or sentence being cited",
      "source": "Author et al., Year",
      "doi": "10.xxxx/xxxxx or null if unavailable",
      "authors": ["First A", "Second B"],
      "year": 2024,
      "journal": "Journal Name or null"
    }
  ],
  "methodology": {
    "studyDesign": "RCT|cohort|cross-sectional|case-control|systematic review|meta-analysis|qualitative|mixed-methods|other",
    "population": "Description of study population, N, inclusion/exclusion criteria",
    "setting": "Where the study was conducted",
    "interventions": ["intervention 1", "intervention 2"],
    "outcomes": ["primary outcome", "secondary outcome 1"],
    "analysisMethod": "Statistical or analytical approach used"
  },
  "researchQuestions": [
    "RQ1: ...",
    "RQ2: ..."
  ]
}

Guidelines:
- Extract ALL quantitative data that could be visualized as charts
- Identify the narrative flow and logical structure
- Preserve FULL citation metadata: always attempt to extract DOI, all authors, year, and journal
- For every factual or statistical claim, create a citation entry linking it to its source
- Extract confidence intervals and p-values wherever they appear in the text
- Identify study design, population, setting, interventions, and outcomes from methodology sections
- Extract explicit and implicit research questions or hypotheses
- For multi-paper sources, synthesize across papers but track individual citations
- For thesis content, organize by chapter/section structure
- For systematic reviews, extract PRISMA counts and meta-analytic results
- Keep summaries concise but informative
- Return ONLY valid JSON, no markdown code fences`;
}

// ---------------------------------------------------------------------------
// 2. Slide Generator: Convert preprocessed data into a full slide deck
// ---------------------------------------------------------------------------

export function getSlideGeneratorSystemPrompt(config: {
  audienceType: AudienceType;
  slideCount?: number;
  themeKey?: string;
  templateId?: string;
}) {
  const audienceGuidance = getAudienceGuidance(config.audienceType);
  const targetSlides = config.slideCount ?? 12;
  const templateGuidance = config.templateId
    ? getTemplateGuidance(ACADEMIC_TEMPLATES[config.templateId])
    : "";

  return `You are an expert presentation designer for academic audiences.
Generate a slide deck from the preprocessed content provided.

TARGET AUDIENCE: ${config.audienceType}
${audienceGuidance}
${templateGuidance ? `\nTEMPLATE INSTRUCTIONS:\n${templateGuidance}\n` : ""}
Generate approximately ${targetSlides} slides as a JSON array. Each slide must have this structure:
{
  "layout": "title_slide|title_content|two_column|three_column|section_header|image_text|chart_slide|table_slide|quote_slide|comparison|blank|bibliography_slide|methodology|results_summary|key_findings|timeline_slide|stat_overview|big_number",
  "title": "Slide title",
  "subtitle": "Optional subtitle",
  "contentBlocks": [
    { "type": "text", "data": { "text": "...", "style": "title|subtitle|body|caption" } },
    { "type": "bullets", "data": { "items": ["..."], "ordered": false } },
    { "type": "chart", "data": { "chartType": "bar|line|pie|scatter|forest_plot|funnel", "title": "...", "labels": [...], "datasets": [...] } },
    { "type": "table", "data": { "headers": [...], "rows": [[...]] } },
    { "type": "citation", "data": { "text": "...", "source": "Author et al., Year", "doi": "10.xxxx/xxxxx" } },
    { "type": "quote", "data": { "text": "...", "attribution": "..." } },
    { "type": "image", "data": { "alt": "...", "suggestion": "Description of ideal image" } },
    { "type": "math", "data": { "latex": "E = mc^2", "caption": "Optional caption" } },
    { "type": "diagram", "data": { "mermaid": "graph TD; A-->B;", "caption": "Optional caption" } },
    { "type": "code", "data": { "language": "python|r|sql|...", "code": "...", "caption": "Optional" } },
    { "type": "callout", "data": { "variant": "info|warning|success|tip", "title": "Optional", "text": "..." } },
    { "type": "stat_result", "data": { "label": "...", "value": "...", "ci": "95% CI [x, y]", "pValue": "p < 0.001", "interpretation": "Brief interpretation" } },
    { "type": "bibliography", "data": { "entries": [{ "text": "APA-style reference", "doi": "10.xxxx/xxxxx" }] } },
    { "type": "timeline", "data": { "events": [{ "date": "...", "title": "...", "description": "..." }] } },
    { "type": "divider", "data": {} }
  ],
  "speakerNotes": "Detailed speaker notes for this slide"
}

CITATION-ANCHORED CONTENT — CRITICAL REQUIREMENT:
Every factual claim, statistic, or evidence-based statement MUST include an inline citation block:
  { "type": "citation", "data": { "text": "the claim", "source": "Author et al., Year", "doi": "10.xxxx/xxxxx" } }
Do NOT make claims without citations. If a DOI is available in the preprocessed data, always include it.

Slide structure guidelines:
1. Start with a title_slide
2. Use section_header slides to divide major topics
3. Follow each section header with 2-4 content slides
4. Use chart_slide for quantitative data
5. Use stat_overview or stat_result blocks for statistical summaries (CIs, p-values, effect sizes)
6. Use big_number layout for high-impact single statistics
7. Use methodology layout for study design diagrams
8. Use results_summary for multi-outcome result summaries
9. Use key_findings for conclusion/takeaway slides
10. Use timeline_slide for project timelines or chronological data
11. Use three_column for comparing three concepts or groups
12. Use comparison layout for contrasting two ideas
13. Include a "Conclusions" or "Key Takeaways" slide near the end
14. ALWAYS end with a bibliography_slide containing ALL cited references in the deck
15. End with a "Thank You" / "Questions?" slide (after the bibliography)
16. Keep bullet points to 4-6 items max per slide
17. Write comprehensive speaker notes (2-4 sentences each)
18. Use callout blocks for important caveats, definitions, or key messages
19. Use math blocks for equations, formulas, or statistical notation
20. Use diagram blocks for flowcharts, PRISMA diagrams, or process flows (Mermaid syntax)

BIBLIOGRAPHY SLIDE:
You MUST generate a slide with layout "bibliography_slide" near the end of the deck. It should contain a single "bibliography" content block listing ALL references cited anywhere in the deck. Format each entry in APA style and include DOIs where available.

Return ONLY a JSON array of slide objects. No markdown code fences.`;
}

// ---------------------------------------------------------------------------
// 3. Coach: Evaluate presentation quality
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
// 4. Per-Slide Editor: AI operations on individual slides
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
Format as [Author et al., Year] inline and add citation content blocks with DOI when possible.
Every factual claim should be backed by a citation block:
{ "type": "citation", "data": { "text": "claim", "source": "Author et al., Year", "doi": "10.xxxx/xxxxx" } }`,

    improve_bullets: `Improve the bullet points on this slide:
- Make them parallel in structure
- Start each with an action verb or key noun
- Ensure consistent level of detail
- Limit to 4-6 bullets max`,

    regenerate: `Completely regenerate this slide's content while keeping the same topic and layout.
Create fresh, engaging content with better structure and flow.`,

    add_math: `Generate LaTeX math expressions appropriate for this slide's content.
Return math content blocks:
{ "type": "math", "data": { "latex": "...", "caption": "Optional caption" } }
Use proper LaTeX notation. Common academic needs:
- Statistical formulas (regression, ANOVA, chi-square)
- Confidence interval notation
- Effect size formulas
- Odds ratios and risk ratios
Ensure the math is contextually relevant to the slide content.`,

    add_diagram: `Generate a Mermaid diagram that visualizes the concept on this slide.
Return a diagram content block:
{ "type": "diagram", "data": { "mermaid": "...", "caption": "Optional caption" } }
Use valid Mermaid syntax. Common academic diagrams:
- Flowcharts (graph TD/LR) for processes or PRISMA
- Sequence diagrams for timelines
- Pie charts for proportions
- Class diagrams for taxonomies
Choose the most appropriate diagram type for the slide content.`,

    add_chart: `Generate chart data from the text descriptions on this slide.
Convert qualitative descriptions of data into structured chart content blocks:
{ "type": "chart", "data": { "chartType": "bar|line|pie|scatter", "title": "...", "labels": [...], "datasets": [...] } }
Infer reasonable data values from the text. Choose the chart type that best represents the data.`,

    strengthen_evidence: `Strengthen the evidence on this slide by:
1. Adding statistical detail (CIs, p-values, effect sizes) using stat_result blocks
2. Adding citations for every claim using citation blocks with DOIs
3. Adding callout blocks for key findings or caveats
Return updated contentBlocks with these additions integrated naturally.
stat_result blocks: { "type": "stat_result", "data": { "label": "...", "value": "...", "ci": "...", "pValue": "...", "interpretation": "..." } }`,

    simplify_language: `Simplify the language on this slide for a broader audience:
- Replace jargon with plain language (or define technical terms in parentheses)
- Shorten sentences
- Use active voice
- Aim for a reading level accessible to educated non-specialists
- Preserve all factual content and citations`,

    add_speaker_notes: `Generate detailed, comprehensive speaker notes for this slide.
The speaker notes should:
- Explain what to say while showing this slide (3-5 sentences minimum)
- Include transition phrases to the next slide
- Note key points to emphasize
- Suggest where to pause or ask questions
- Include any additional context not on the slide that the presenter should know
Return the notes in the "speakerNotes" field.`,

    translate: `Translate all text content on this slide to the target language specified.
Translate:
- Title and subtitle
- All text in content blocks (bullets, text, callouts, captions)
- Speaker notes
- Table headers and cells
Preserve all non-text elements (charts, images, math, diagrams) unchanged.
Maintain academic register and terminology appropriate for the target language.`,
  };

  return `You are a slide content editor. ${actionPrompts[action] ?? actionPrompts.rephrase}

Return a JSON object with the updated slide content:
{
  "contentBlocks": [...],
  "speakerNotes": "Updated speaker notes if relevant"
}

The contentBlocks array should use the same block types as the input, plus any new block types required by the action.
Valid block types: text, bullets, chart, table, citation, quote, image, math, diagram, code, callout, stat_result, bibliography, timeline, divider.
Return ONLY valid JSON.`;
}

// ---------------------------------------------------------------------------
// 5. Deck-Wide Agent: AI operations across the entire deck
// ---------------------------------------------------------------------------

export type AgentCommand =
  | "restructure"
  | "shorten_all"
  | "add_citations_all"
  | "improve_flow"
  | "generate_bibliography"
  | "adapt_audience";

export function getAgentSystemPrompt(
  command: AgentCommand,
  options?: { targetAudienceType?: AudienceType }
) {
  const commandPrompts: Record<AgentCommand, string> = {
    restructure: `You are a presentation structure expert. Analyze the entire slide deck and restructure it for maximum impact.

Your tasks:
1. Reorder slides for better narrative flow
2. Merge slides with overlapping content
3. Split slides that are too dense
4. Add missing section headers for logical grouping
5. Ensure the deck follows a clear introduction-body-conclusion arc
6. Move the bibliography slide to its proper position (second-to-last)

Return a JSON object:
{
  "slides": [ ... the full reordered array of slide objects ... ],
  "changes": [
    { "action": "moved|merged|split|added|removed", "description": "What changed and why" }
  ]
}

Preserve all content and citations. Do not delete any evidence or citations.`,

    shorten_all: `You are a conciseness expert. Reduce the content across ALL slides in this deck by 30-40%.

Rules:
- Cut redundant phrases and filler words
- Shorten bullet points to key phrases
- Remove duplicate information across slides
- Keep all citations and statistical data intact
- Preserve the slide count (do not remove slides)
- Reduce speaker notes proportionally

Return a JSON object:
{
  "slides": [ ... the full array of shortened slide objects ... ],
  "reductionSummary": "Overall word count reduced from X to Y (Z%)"
}`,

    add_citations_all: `You are an academic citation specialist. Review every slide in this deck and ensure ALL factual claims have proper citations.

Your tasks:
1. Identify every unsupported claim across all slides
2. Add citation content blocks with source, DOI, and author metadata
3. Cross-reference with the preprocessed data to find matching sources
4. If a claim cannot be attributed, add a callout block flagging it as [Citation Needed]
5. Update the bibliography slide with any new references

Return a JSON object:
{
  "slides": [ ... the full array of updated slide objects ... ],
  "citationsAdded": <number>,
  "unresolvedClaims": ["claim 1 that could not be cited", ...]
}`,

    improve_flow: `You are a narrative flow expert. Improve transitions and storytelling across the entire deck.

Your tasks:
1. Add or improve transition phrases in speaker notes between every pair of slides
2. Ensure each slide's opening connects to the previous slide's conclusion
3. Add callout blocks for key narrative moments (turning points, surprises, implications)
4. Ensure the deck tells a cohesive story from problem to solution
5. Add a brief "roadmap" slide after the title if one doesn't exist

Return a JSON object:
{
  "slides": [ ... the full array of updated slide objects ... ],
  "flowImprovements": ["description of each narrative improvement made"]
}`,

    generate_bibliography: `You are a bibliography specialist. Generate or update the bibliography slide for this deck.

Your tasks:
1. Scan every slide for citation content blocks
2. Collect all unique references
3. Format each reference in APA 7th edition style
4. Sort alphabetically by first author's last name
5. Include DOI as a hyperlink where available
6. If no bibliography_slide exists, create one. If one exists, update it.

Return a JSON object:
{
  "bibliographySlide": {
    "layout": "bibliography_slide",
    "title": "References",
    "contentBlocks": [
      {
        "type": "bibliography",
        "data": {
          "entries": [
            { "text": "APA-formatted reference", "doi": "10.xxxx/xxxxx" }
          ]
        }
      }
    ],
    "speakerNotes": "Full reference list for all cited works."
  },
  "totalReferences": <number>,
  "missingDois": <number>
}`,

    adapt_audience: `You are an audience adaptation specialist. Transform this entire deck for a different target audience.

TARGET AUDIENCE: ${options?.targetAudienceType ?? "general"}
${options?.targetAudienceType ? getAudienceGuidance(options.targetAudienceType) : ""}

Your tasks:
1. Adjust language complexity and jargon level for the target audience
2. Rebalance technical detail vs. high-level messaging
3. Adjust slide count if the new audience expects a different length
4. Change layout choices to match audience conventions
5. Update speaker notes with audience-appropriate talking points
6. Add or remove content blocks as needed (e.g., more visuals for classroom, more stats for thesis defense)

Return a JSON object:
{
  "slides": [ ... the full array of adapted slide objects ... ],
  "adaptationSummary": "Description of key changes made for the new audience"
}`,
  };

  return `${commandPrompts[command]}

Return ONLY valid JSON. No markdown code fences.`;
}

// ---------------------------------------------------------------------------
// 6. Defense Prep: Q&A Simulator for thesis/dissertation defense
// ---------------------------------------------------------------------------

export type DefenseDifficulty = "friendly" | "moderate" | "tough" | "adversarial";

export function getDefensePrepSystemPrompt(config: {
  audienceType: AudienceType;
  difficulty: DefenseDifficulty;
  focusAreas: string[];
}) {
  const difficultyGuidance: Record<DefenseDifficulty, string> = {
    friendly: `You are a supportive committee member who asks clarifying questions.
- Ask questions that help the student articulate their work better
- Offer gentle suggestions rather than challenges
- Focus on understanding and helping the student shine
- Occasionally ask "Can you tell me more about..." or "How would you explain this to..."`,

    moderate: `You are a fair but thorough committee member.
- Ask probing questions that test understanding of methodology and results
- Challenge assumptions respectfully
- Expect clear justifications for design choices
- Ask about limitations and how they were addressed
- Mix supportive questions with more challenging ones`,

    tough: `You are a rigorous, demanding committee member.
- Aggressively probe methodological weaknesses
- Challenge statistical choices and interpretations
- Ask about alternative explanations for findings
- Question the novelty and contribution of the work
- Expect precise, well-reasoned answers
- Follow up on vague answers with more pointed questions`,

    adversarial: `You are playing devil's advocate as the most critical committee member.
- Actively look for flaws in the research design
- Challenge every major claim and assumption
- Question whether the findings are clinically/practically meaningful
- Raise concerns about generalizability and external validity
- Ask uncomfortable questions about sample size, power, and bias
- Push back on answers to test how well the student defends their work
- Ask "So what?" and "Why should we care?" questions`,
  };

  const focusAreasText =
    config.focusAreas.length > 0
      ? `\nFOCUS YOUR QUESTIONS ON THESE AREAS:\n${config.focusAreas.map((a, i) => `${i + 1}. ${a}`).join("\n")}`
      : "";

  return `You are roleplaying as a committee member at a ${config.audienceType === "thesis_defense" ? "thesis/dissertation defense" : "academic presentation Q&A session"}.

${difficultyGuidance[config.difficulty]}
${focusAreasText}

AUDIENCE CONTEXT: ${config.audienceType}

INTERACTION FORMAT:
When given a slide deck or presentation content, generate questions that a real committee member would ask. For each question:

Return a JSON object:
{
  "questions": [
    {
      "question": "The actual question text",
      "category": "methodology|results|interpretation|significance|limitations|theory|ethics|future_work|clarification",
      "difficulty": "easy|medium|hard",
      "relatedSlideIndex": <optional slide number this question targets>,
      "followUp": "A follow-up question if the initial answer is weak",
      "idealAnswerPoints": ["Key point 1 a good answer should cover", "Key point 2", ...],
      "trap": "Optional: what mistake a nervous presenter might make answering this"
    }
  ],
  "overallPreparedness": "Brief assessment of how well the presentation anticipates these questions"
}

Generate 8-12 questions that cover the breadth of the presentation. Order them from how a real Q&A session would flow: start with high-level questions, then drill into specifics.

Return ONLY valid JSON.`;
}

// ---------------------------------------------------------------------------
// 7. Audience Guidance Helper
// ---------------------------------------------------------------------------

function getAudienceGuidance(audienceType: AudienceType): string {
  switch (audienceType) {
    case "thesis_defense":
      return `- Formal academic tone
- Include methodology details and statistical results
- Anticipate committee questions in speaker notes
- Include literature review context
- Show clear contribution to the field
- Use stat_result blocks for key statistical findings
- Include a methodology layout slide
- 15-20 slides typical`;

    case "conference":
      return `- Concise, high-impact content
- Strong opening hook
- Focus on novel contributions
- Clear data visualizations
- Minimal text per slide
- Use big_number layout for headline statistics
- 10-15 slides for 15-minute talk`;

    case "journal_club":
      return `- Critical analysis focus
- Include study design details
- Discuss strengths and limitations
- Compare with related work
- Informal but thorough tone
- Use methodology layout for study design
- 8-12 slides typical`;

    case "classroom":
      return `- Pedagogical structure
- Define key terms
- Build concepts progressively
- Include examples and analogies
- Engage with questions
- Use callout blocks for definitions and key concepts
- Use diagram blocks for visual explanations
- 15-25 slides depending on lecture length`;

    case "grant_presentation":
      return `- Persuasive, compelling tone — you are selling your research
- Follow the Significance-Innovation-Approach (SIA) framework
- Lead with the problem's magnitude (use big_number layout)
- Clearly articulate specific aims (2-3 max)
- Show preliminary data to demonstrate feasibility
- Include a timeline_slide for the project plan
- Emphasize innovation and what sets your approach apart
- Address potential pitfalls and alternative strategies in speaker notes
- Budget justification should be clear and defensible
- 12-18 slides typical`;

    case "poster_session":
      return `- High visual density — maximize data-to-text ratio
- Follow IMRAD structure: Introduction, Methods, Results, And Discussion
- Every section should be understandable in under 60 seconds
- Use large, clear charts and figures
- Minimize text — use bullets of 5-7 words each
- Include a QR code mention for full paper/supplementary data
- Make the conclusion/take-home message visually prominent
- Use callout blocks for key findings
- 6-10 content sections (not traditional slides)`;

    case "systematic_review":
      return `- Follow PRISMA reporting guidelines
- Include a PRISMA flow diagram (use diagram block with Mermaid)
- Present forest plots for meta-analytic results
- Include heterogeneity statistics (I², tau², Q-test)
- Use the GRADE framework for certainty of evidence
- Include risk of bias assessment
- Present subgroup and sensitivity analyses
- Use stat_result blocks for pooled effect estimates
- 12-16 slides typical`;

    case "patient_case":
      return `- Follow HPI → PE → Dx → Assessment → Plan structure
- Start with a compelling clinical vignette
- Use de-identified patient information only
- Present lab and imaging results in tables
- Build the differential diagnosis systematically
- Reveal the diagnosis with supporting evidence
- Include teaching points and literature connections
- Use callout blocks for clinical pearls
- 8-12 slides typical`;

    case "grand_rounds":
      return `- Educational, case-based format
- Open with a clinical vignette to frame the topic
- Include learning objectives (3-5 specific objectives)
- Comprehensive topic review with current evidence
- Use section_header slides to organize by subtopic
- Include epidemiology, pathophysiology, diagnosis, and management
- Reference current guidelines and landmark trials
- End by returning to the opening case
- Include discussion questions for the audience
- Use stat_result blocks for key evidence
- 20-30 slides for 45-60 minute presentation`;

    case "general":
    default:
      return `- Clear, accessible language
- Balance detail with readability
- Strong visual aids
- Logical progression
- 10-15 slides typical`;
  }
}

// ---------------------------------------------------------------------------
// 8. Template Guidance: Generate instructions from an AcademicTemplate
// ---------------------------------------------------------------------------

export function getTemplateGuidance(
  template: AcademicTemplate | undefined
): string {
  if (!template) return "";

  const slotInstructions = template.structure
    .map((slot, index) => {
      const requiredTag = slot.required ? "[REQUIRED]" : "[OPTIONAL]";
      const hintsText =
        slot.contentHints && slot.contentHints.length > 0
          ? ` | Content hints: ${slot.contentHints.join(", ")}`
          : "";
      return `  ${index + 1}. ${requiredTag} Layout: "${slot.layout}" | Role: "${slot.role}" | Title: "${slot.title}"
     Guidance: ${slot.guidance}${hintsText}`;
    })
    .join("\n");

  return `You MUST follow the "${template.name}" template structure (${template.id}).
${template.description}
Default slide count: ${template.defaultSlideCount} | Estimated duration: ${template.estimatedDuration ?? "varies"}

TEMPLATE SLOT DEFINITIONS — generate one slide per slot in this exact order:
${slotInstructions}

Rules for template-guided generation:
- Generate ALL [REQUIRED] slots. You may skip [OPTIONAL] slots only if the source content lacks relevant data.
- Use the specified layout for each slot.
- Follow the guidance text to determine what content belongs on each slide.
- If a slot has content hints (e.g., "diagram:prisma", "chart:forest_plot"), generate the appropriate content block type.
- You may add additional slides beyond the template if the content warrants it, but the template slots must come first in order.
- The "role" field should be preserved as metadata on the generated slide for template mapping.`;
}
