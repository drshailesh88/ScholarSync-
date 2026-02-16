export interface TemplateSection {
  heading: string;
  placeholder: string;
  wordCountGuide?: string;
}

export interface JournalTemplate {
  id: string;
  name: string;
  category: "research" | "review" | "case_report" | "letter" | "meta_analysis";
  description: string;
  citationStyle: string;
  sections: TemplateSection[];
  wordLimit?: number;
}

export const journalTemplates: JournalTemplate[] = [
  {
    id: "imrad",
    name: "IMRaD (Standard Research Article)",
    category: "research",
    description:
      "The most common format for original research articles. Used by most biomedical and science journals.",
    citationStyle: "vancouver",
    wordLimit: 4000,
    sections: [
      {
        heading: "Abstract",
        placeholder:
          "Structured abstract: Background, Methods, Results, Conclusions (250 words max)",
        wordCountGuide: "150-250 words",
      },
      {
        heading: "Introduction",
        placeholder:
          "State the problem, provide context from existing literature, and clearly state your research question or hypothesis.",
        wordCountGuide: "500-800 words",
      },
      {
        heading: "Methods",
        placeholder:
          "Describe study design, participants, interventions, data collection, and statistical analysis. Enough detail for reproducibility.",
        wordCountGuide: "800-1200 words",
      },
      {
        heading: "Results",
        placeholder:
          "Present findings systematically. Use tables and figures. Report primary outcomes first, then secondary.",
        wordCountGuide: "600-1000 words",
      },
      {
        heading: "Discussion",
        placeholder:
          "Interpret findings in context of existing evidence. Address limitations. Suggest implications and future research.",
        wordCountGuide: "800-1200 words",
      },
      {
        heading: "Conclusion",
        placeholder:
          "Briefly summarize key findings and their clinical or scientific significance.",
        wordCountGuide: "100-200 words",
      },
      {
        heading: "References",
        placeholder: "List all cited sources in Vancouver style.",
      },
    ],
  },
  {
    id: "case-report",
    name: "Case Report",
    category: "case_report",
    description:
      "For presenting unusual clinical cases, novel treatments, or rare conditions. Follows CARE guidelines.",
    citationStyle: "vancouver",
    wordLimit: 2500,
    sections: [
      {
        heading: "Abstract",
        placeholder:
          "Unstructured abstract: Brief summary of the case and its significance.",
        wordCountGuide: "150-200 words",
      },
      {
        heading: "Introduction",
        placeholder:
          "Provide brief background. Why is this case worth reporting? What does it add to existing literature?",
        wordCountGuide: "200-400 words",
      },
      {
        heading: "Case Presentation",
        placeholder:
          "Patient demographics, history, examination findings, diagnostic workup, treatment, and outcome. Use timeline format.",
        wordCountGuide: "800-1200 words",
      },
      {
        heading: "Discussion",
        placeholder:
          "Compare with similar published cases. Discuss pathophysiology, diagnostic challenges, and treatment rationale.",
        wordCountGuide: "500-800 words",
      },
      {
        heading: "Conclusion",
        placeholder: "Key learning points from this case.",
        wordCountGuide: "100-150 words",
      },
      {
        heading: "Patient Consent",
        placeholder: "Statement confirming informed consent was obtained.",
      },
      {
        heading: "References",
        placeholder: "Typically 15-20 references.",
      },
    ],
  },
  {
    id: "systematic-review",
    name: "Systematic Review",
    category: "review",
    description:
      "For systematic reviews following PRISMA guidelines. Comprehensive synthesis of available evidence.",
    citationStyle: "vancouver",
    wordLimit: 6000,
    sections: [
      {
        heading: "Abstract",
        placeholder:
          "Structured abstract: Background, Objectives, Search Strategy, Selection Criteria, Data Collection, Main Results, Conclusions.",
        wordCountGuide: "250-350 words",
      },
      {
        heading: "Introduction",
        placeholder:
          "Describe the health condition, existing reviews, rationale for this review, and specific objectives.",
        wordCountGuide: "600-800 words",
      },
      {
        heading: "Methods",
        placeholder:
          "Protocol registration (PROSPERO), eligibility criteria (PICO), information sources, search strategy, study selection, data extraction, risk of bias assessment, synthesis methods.",
        wordCountGuide: "1200-1800 words",
      },
      {
        heading: "Results",
        placeholder:
          "PRISMA flow diagram, study characteristics, risk of bias, synthesis results, certainty of evidence (GRADE).",
        wordCountGuide: "1200-1800 words",
      },
      {
        heading: "Discussion",
        placeholder:
          "Summary of evidence, limitations (study and review level), agreements/disagreements with other reviews, implications.",
        wordCountGuide: "800-1200 words",
      },
      {
        heading: "Conclusion",
        placeholder:
          "Interpretation of results, implications for practice and research.",
        wordCountGuide: "200-300 words",
      },
      {
        heading: "References",
        placeholder: "All included and excluded studies with reasons.",
      },
    ],
  },
  {
    id: "letter-to-editor",
    name: "Letter to the Editor",
    category: "letter",
    description:
      "Short communication responding to a published article or presenting preliminary findings.",
    citationStyle: "vancouver",
    wordLimit: 800,
    sections: [
      {
        heading: "Dear Editor",
        placeholder:
          "Open with reference to the original article. State your agreement or disagreement clearly.",
        wordCountGuide: "100-200 words",
      },
      {
        heading: "Body",
        placeholder:
          "Present your argument, evidence, or preliminary data. Be concise and focused.",
        wordCountGuide: "300-500 words",
      },
      {
        heading: "Conclusion",
        placeholder: "Summarize your point in 1-2 sentences.",
        wordCountGuide: "50-100 words",
      },
      {
        heading: "References",
        placeholder: "Maximum 5-10 references.",
      },
    ],
  },
  {
    id: "meta-analysis",
    name: "Meta-Analysis",
    category: "meta_analysis",
    description:
      "Quantitative synthesis of data from multiple studies. Follows PRISMA and MOOSE guidelines.",
    citationStyle: "vancouver",
    wordLimit: 5000,
    sections: [
      {
        heading: "Abstract",
        placeholder:
          "Structured abstract with specific effect sizes and confidence intervals.",
        wordCountGuide: "250-350 words",
      },
      {
        heading: "Introduction",
        placeholder:
          "Clinical question, prior reviews, why quantitative synthesis is needed.",
        wordCountGuide: "500-700 words",
      },
      {
        heading: "Methods",
        placeholder:
          "Search strategy, inclusion/exclusion criteria, data extraction, statistical methods (fixed/random effects), heterogeneity assessment (I², Q), sensitivity analysis, publication bias assessment.",
        wordCountGuide: "1200-1500 words",
      },
      {
        heading: "Results",
        placeholder:
          "PRISMA flow, pooled estimates with forest plots, heterogeneity results, subgroup analyses, sensitivity analyses, funnel plot.",
        wordCountGuide: "1000-1500 words",
      },
      {
        heading: "Discussion",
        placeholder:
          "Interpret pooled estimates, compare to prior meta-analyses, discuss heterogeneity sources, limitations (GRADE).",
        wordCountGuide: "800-1000 words",
      },
      {
        heading: "Conclusion",
        placeholder:
          "Clinical implications with strength of evidence statement.",
        wordCountGuide: "150-250 words",
      },
      {
        heading: "References",
        placeholder: "All included studies plus relevant methodological references.",
      },
    ],
  },
];

export function getTemplateById(id: string): JournalTemplate | undefined {
  return journalTemplates.find((t) => t.id === id);
}

export function getTemplatesByCategory(
  category: JournalTemplate["category"]
): JournalTemplate[] {
  return journalTemplates.filter((t) => t.category === category);
}
