import type { JSONContent } from "@tiptap/core";

export interface DocumentTemplate {
  type: string;
  label: string;
  sections: TemplateSectionDef[];
}

interface TemplateSectionDef {
  heading: string;
  level: number;
  placeholder: string;
  subsections?: TemplateSectionDef[];
}

export const DOCUMENT_TEMPLATES: Record<string, DocumentTemplate> = {
  "original-article": {
    type: "original-article",
    label: "Original Article",
    sections: [
      {
        heading: "Introduction",
        level: 2,
        placeholder:
          "State your hypothesis and objectives. Provide background context for your research question...",
      },
      {
        heading: "Methods",
        level: 2,
        placeholder:
          "Describe your study design, participants, and procedures...",
        subsections: [
          {
            heading: "Study Design",
            level: 3,
            placeholder: "Describe the type of study and its design...",
          },
          {
            heading: "Participants",
            level: 3,
            placeholder:
              "Describe inclusion/exclusion criteria and recruitment...",
          },
          {
            heading: "Outcomes",
            level: 3,
            placeholder: "Define primary and secondary outcomes...",
          },
          {
            heading: "Statistical Analysis",
            level: 3,
            placeholder:
              "Describe statistical methods and software used...",
          },
        ],
      },
      {
        heading: "Results",
        level: 2,
        placeholder: "Present your findings systematically...",
        subsections: [
          {
            heading: "Primary Outcome",
            level: 3,
            placeholder: "Report the primary outcome with effect sizes and confidence intervals...",
          },
          {
            heading: "Secondary Outcomes",
            level: 3,
            placeholder: "Report secondary outcomes...",
          },
        ],
      },
      {
        heading: "Discussion",
        level: 2,
        placeholder:
          "Interpret your findings in context of existing literature...",
      },
      {
        heading: "Conclusion",
        level: 2,
        placeholder:
          "Summarize the key findings and their implications...",
      },
      {
        heading: "References",
        level: 2,
        placeholder: "References will auto-populate as you add citations...",
      },
    ],
  },
  "case-report": {
    type: "case-report",
    label: "Case Report",
    sections: [
      {
        heading: "Introduction",
        level: 2,
        placeholder:
          "Briefly introduce the condition and why this case is noteworthy...",
      },
      {
        heading: "Case Presentation",
        level: 2,
        placeholder:
          "Describe the clinical presentation, history, and examination findings...",
        subsections: [
          {
            heading: "History",
            level: 3,
            placeholder: "Present the patient's history and chief complaint...",
          },
          {
            heading: "Examination",
            level: 3,
            placeholder: "Describe physical examination findings...",
          },
          {
            heading: "Investigations",
            level: 3,
            placeholder: "Report laboratory and imaging findings...",
          },
          {
            heading: "Treatment",
            level: 3,
            placeholder: "Describe the treatment plan and interventions...",
          },
          {
            heading: "Outcome",
            level: 3,
            placeholder: "Report the clinical outcome and follow-up...",
          },
        ],
      },
      {
        heading: "Discussion",
        level: 2,
        placeholder:
          "Discuss the case in the context of existing literature...",
      },
      {
        heading: "Conclusion",
        level: 2,
        placeholder: "Summarize the key learning points from this case...",
      },
      {
        heading: "References",
        level: 2,
        placeholder: "References will auto-populate as you add citations...",
      },
    ],
  },
  "review-article": {
    type: "review-article",
    label: "Review Article",
    sections: [
      {
        heading: "Introduction",
        level: 2,
        placeholder:
          "Define the scope of your review and the questions you aim to address...",
      },
      {
        heading: "Search Strategy",
        level: 2,
        placeholder:
          "Describe databases searched, keywords, and inclusion/exclusion criteria...",
      },
      {
        heading: "Findings",
        level: 2,
        placeholder: "Synthesize the key findings from the literature...",
      },
      {
        heading: "Discussion",
        level: 2,
        placeholder:
          "Discuss implications, limitations, and gaps in the evidence...",
      },
      {
        heading: "Conclusion",
        level: 2,
        placeholder: "Summarize the state of evidence and future directions...",
      },
      {
        heading: "References",
        level: 2,
        placeholder: "References will auto-populate as you add citations...",
      },
    ],
  },
  "meta-analysis": {
    type: "meta-analysis",
    label: "Meta-Analysis",
    sections: [
      {
        heading: "Introduction",
        level: 2,
        placeholder:
          "State the rationale for the meta-analysis and the research question...",
      },
      {
        heading: "Methods",
        level: 2,
        placeholder: "Describe your systematic search and analysis methods...",
        subsections: [
          {
            heading: "Search Strategy",
            level: 3,
            placeholder:
              "Detail databases, search terms, and date ranges...",
          },
          {
            heading: "Study Selection",
            level: 3,
            placeholder:
              "Describe inclusion and exclusion criteria for studies...",
          },
          {
            heading: "Data Extraction",
            level: 3,
            placeholder: "Describe what data was extracted and by whom...",
          },
          {
            heading: "Statistical Analysis",
            level: 3,
            placeholder:
              "Describe the meta-analytic approach, heterogeneity assessment, and software...",
          },
        ],
      },
      {
        heading: "Results",
        level: 2,
        placeholder: "Present pooled results with forest plots...",
      },
      {
        heading: "Discussion",
        level: 2,
        placeholder: "Interpret findings, discuss heterogeneity and limitations...",
      },
      {
        heading: "Conclusion",
        level: 2,
        placeholder: "Summarize the evidence and clinical implications...",
      },
      {
        heading: "References",
        level: 2,
        placeholder: "References will auto-populate as you add citations...",
      },
    ],
  },
};

/**
 * Build placeholder lookup based on the section context.
 * Maps section heading text to placeholder text for child paragraphs.
 */
export function buildPlaceholderMap(
  documentType: string
): Record<string, string> {
  const template = DOCUMENT_TEMPLATES[documentType];
  if (!template) return {};

  const map: Record<string, string> = {};

  function walk(sections: TemplateSectionDef[]) {
    for (const section of sections) {
      map[section.heading.toLowerCase()] = section.placeholder;
      if (section.subsections) walk(section.subsections);
    }
  }

  walk(template.sections);
  return map;
}

/**
 * Generate the initial Tiptap JSON content for a document template.
 */
export function generateTemplateContent(
  documentType: string,
  title?: string
): JSONContent {
  const template = DOCUMENT_TEMPLATES[documentType];
  if (!template) {
    return {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: title
            ? [{ type: "text", text: title }]
            : undefined,
        },
        { type: "paragraph" },
      ],
    };
  }

  const content: JSONContent[] = [
    {
      type: "heading",
      attrs: { level: 1 },
      content: title ? [{ type: "text", text: title }] : undefined,
    },
  ];

  function addSections(sections: TemplateSectionDef[]) {
    for (const section of sections) {
      content.push({
        type: "heading",
        attrs: { level: section.level },
        content: [{ type: "text", text: section.heading }],
      });
      // Empty paragraph for content
      content.push({ type: "paragraph" });
      if (section.subsections) {
        addSections(section.subsections);
      }
    }
  }

  addSections(template.sections);
  return { type: "doc", content };
}
