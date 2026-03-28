// ============================================================================
// Poster Types — Academic conference poster generation system
// Reuses ContentBlock, ThemeConfig, InstitutionKit from presentation.ts
// ============================================================================

import type { ContentBlock, ThemeConfig, InstitutionKit } from "./presentation";
import type { DomainConfig, DomainId } from "@/lib/search/domains/types";

// ---------------------------------------------------------------------------
// Poster Sizes — standard academic conference poster dimensions
// ---------------------------------------------------------------------------

export type PosterSize =
  | "a0_portrait"
  | "a0_landscape"
  | "a1_portrait"
  | "a1_landscape"
  | "48x36"
  | "36x24";

export const POSTER_SIZES: Record<
  PosterSize,
  { width: number; height: number; unit: string; label: string; pdfPoints: { width: number; height: number } }
> = {
  a0_portrait: {
    width: 841,
    height: 1189,
    unit: "mm",
    label: "A0 Portrait (841 x 1189 mm)",
    pdfPoints: { width: 2384, height: 3370 },
  },
  a0_landscape: {
    width: 1189,
    height: 841,
    unit: "mm",
    label: "A0 Landscape (1189 x 841 mm)",
    pdfPoints: { width: 3370, height: 2384 },
  },
  a1_portrait: {
    width: 594,
    height: 841,
    unit: "mm",
    label: "A1 Portrait (594 x 841 mm)",
    pdfPoints: { width: 1684, height: 2384 },
  },
  a1_landscape: {
    width: 841,
    height: 594,
    unit: "mm",
    label: "A1 Landscape (841 x 594 mm)",
    pdfPoints: { width: 2384, height: 1684 },
  },
  "48x36": {
    width: 48,
    height: 36,
    unit: "in",
    label: "48 x 36 inches (US Standard)",
    pdfPoints: { width: 3456, height: 2592 },
  },
  "36x24": {
    width: 36,
    height: 24,
    unit: "in",
    label: "36 x 24 inches (Small)",
    pdfPoints: { width: 2592, height: 1728 },
  },
};

// ---------------------------------------------------------------------------
// Poster Grid Layouts
// ---------------------------------------------------------------------------

export type PosterGridLayout =
  | "three_column"
  | "two_column_wide"
  | "four_column"
  | "two_plus_one";

export const POSTER_GRID_LAYOUTS: Record<
  PosterGridLayout,
  { label: string; columns: number; description: string }
> = {
  three_column: {
    label: "Three Column",
    columns: 3,
    description: "Classic 3-column academic poster layout",
  },
  two_column_wide: {
    label: "Two Column (Wide)",
    columns: 2,
    description: "Two wide columns for text-heavy posters",
  },
  four_column: {
    label: "Four Column",
    columns: 4,
    description: "Four narrow columns for data-dense posters",
  },
  two_plus_one: {
    label: "2 + 1 Split",
    columns: 3,
    description: "Two narrow columns + one wide results column",
  },
};

// ---------------------------------------------------------------------------
// Poster Section — a content region within the poster grid
// ---------------------------------------------------------------------------

export interface PosterSection {
  id: string;
  title: string;
  column: number;
  row: number;
  colSpan?: number;
  contentBlocks: ContentBlock[];
}

// ---------------------------------------------------------------------------
// PosterData — full poster state
// ---------------------------------------------------------------------------

export interface PosterData {
  id: string;
  deckId: number;
  title: string;
  authors: string[];
  affiliations: string[];
  size: PosterSize;
  gridLayout: PosterGridLayout;
  sections: PosterSection[];
  themeConfig: ThemeConfig;
  institutionKit?: InstitutionKit;
  qrCodeUrl?: string;
}

// ---------------------------------------------------------------------------
// Poster Templates
// ---------------------------------------------------------------------------

export interface PosterTemplateSection {
  title: string;
  column: number;
  row: number;
  colSpan?: number;
  guidance: string;
}

export interface PosterTemplate {
  name: string;
  description: string;
  domains: DomainId[];
  gridLayout: PosterGridLayout;
  sections: PosterTemplateSection[];
}

export const POSTER_TEMPLATES: Record<string, PosterTemplate> = {
  clinical_research: {
    name: "Clinical Research",
    description: "Standard IMRAD poster for clinical studies with emphasis on results",
    domains: ["medicine", "biology"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, institutional logos" },
      { title: "Introduction", column: 0, row: 1, guidance: "Background, significance, and rationale (3-5 sentences)" },
      { title: "Objectives", column: 0, row: 2, guidance: "Primary and secondary objectives as numbered list" },
      { title: "Methods", column: 0, row: 3, guidance: "Study design, population, setting, interventions, analysis" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Key findings with charts, tables, and statistical results" },
      { title: "Discussion", column: 1, row: 2, guidance: "Interpretation, comparison with prior work, clinical significance" },
      { title: "Conclusions", column: 2, row: 2, guidance: "3-5 bullet points of take-home messages" },
      { title: "References", column: 1, row: 3, guidance: "Key references in Vancouver style" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, conflicts of interest, QR code" },
    ],
  },
  basic_science: {
    name: "Basic Science",
    description: "Lab research poster with detailed methodology and data visualization",
    domains: ["medicine", "biology", "physics", "chemistry", "environmental"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, lab logo" },
      { title: "Background", column: 0, row: 1, guidance: "Scientific context and knowledge gap" },
      { title: "Hypothesis", column: 0, row: 2, guidance: "Research hypothesis and specific aims" },
      { title: "Materials & Methods", column: 0, row: 3, guidance: "Experimental design, reagents, protocols, analysis" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Figures, quantification, statistical analysis" },
      { title: "Discussion", column: 1, row: 2, guidance: "Interpretation, mechanism, limitations" },
      { title: "Conclusions & Future Directions", column: 2, row: 2, guidance: "Summary and planned next experiments" },
      { title: "References", column: 1, row: 3, guidance: "Key references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding sources, contributors" },
    ],
  },
  systematic_review: {
    name: "Systematic Review",
    description: "PRISMA-compliant poster for systematic reviews and meta-analyses",
    domains: ["medicine", "biology", "psychology"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, PROSPERO registration number" },
      { title: "Background", column: 0, row: 1, guidance: "Clinical question, rationale for the review" },
      { title: "Methods", column: 0, row: 2, guidance: "Search strategy, databases, inclusion/exclusion criteria" },
      { title: "PRISMA Flow", column: 0, row: 3, guidance: "PRISMA flow diagram showing study selection" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Forest plots, pooled estimates, heterogeneity statistics" },
      { title: "Risk of Bias", column: 1, row: 2, guidance: "Risk of bias assessment summary" },
      { title: "Conclusions", column: 2, row: 2, guidance: "Key findings, GRADE certainty, clinical implications" },
      { title: "References", column: 1, row: 3, guidance: "Key references from included studies" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, QR code to full publication" },
    ],
  },
  engineering: {
    name: "Engineering / CS",
    description: "Technical poster for engineering and computer science research",
    domains: ["engineering", "computer_science", "mathematics"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, lab/group logos" },
      { title: "Problem Statement", column: 0, row: 1, guidance: "Problem definition, motivation, current limitations" },
      { title: "Proposed Approach", column: 0, row: 2, guidance: "Architecture, algorithm, or system design with diagrams" },
      { title: "Implementation", column: 0, row: 3, guidance: "Technical details, code snippets, tools used" },
      { title: "Results & Evaluation", column: 1, row: 1, guidance: "Benchmarks, performance charts, comparison tables" },
      { title: "Analysis", column: 1, row: 2, guidance: "Discussion of results, ablation studies, limitations" },
      { title: "Conclusions & Future Work", column: 1, row: 3, guidance: "Summary, contributions, planned extensions" },
      { title: "References", column: 0, row: 4, guidance: "Key citations" },
      { title: "Acknowledgments", column: 1, row: 4, guidance: "Funding, acknowledgments, QR code to repo/paper" },
    ],
  },
  theoretical_analysis: {
    name: "Theoretical Analysis",
    description: "Poster for theorem-driven, conceptual, or formal theoretical work",
    domains: ["physics", "mathematics", "economics", "humanities"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and concise framing subtitle" },
      { title: "Motivation", column: 0, row: 1, guidance: "Problem importance, prior gap, and main question" },
      { title: "Framework", column: 0, row: 2, guidance: "Core assumptions, notation, or conceptual framework" },
      { title: "Main Derivation / Argument", column: 1, row: 1, colSpan: 2, guidance: "Key equations, propositions, or interpretive argument structure" },
      { title: "Core Results", column: 1, row: 2, guidance: "Main theorems, propositions, or conceptual claims" },
      { title: "Implications", column: 2, row: 2, guidance: "How the result changes the field, debate, or application space" },
      { title: "References", column: 1, row: 3, guidance: "Canonical citations and recent related work" },
      { title: "Contact / QR", column: 2, row: 3, guidance: "QR code to manuscript, preprint, or supporting appendix" },
    ],
  },
  experimental_results: {
    name: "Experimental Results",
    description: "Poster optimized for physics or lab science experiments with measurement-heavy results",
    domains: ["physics"],
    gridLayout: "two_plus_one",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, experiment or beamline/facility" },
      { title: "Research Question", column: 0, row: 1, guidance: "Phenomenon studied and hypothesis or target measurement" },
      { title: "Experimental Setup", column: 0, row: 2, guidance: "Apparatus, detector, sample, and operating conditions" },
      { title: "Methods & Calibration", column: 1, row: 1, guidance: "Acquisition, calibration, controls, and uncertainty handling" },
      { title: "Results", column: 2, row: 1, guidance: "Primary plots, spectra, images, and quantitative outcomes" },
      { title: "Comparison with Theory", column: 2, row: 2, guidance: "Reference curves, simulations, or expected benchmarks" },
      { title: "Conclusion", column: 1, row: 2, guidance: "Take-home message, limitations, and next experiment" },
      { title: "References", column: 0, row: 3, colSpan: 2, guidance: "Relevant prior experiments and methods references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, facility access, collaboration credits, and QR code" },
    ],
  },
  computational_study: {
    name: "Computational Study",
    description: "Poster for simulation-heavy work in physics, chemistry, or computational science",
    domains: ["physics"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and code or cluster reference" },
      { title: "Problem & System", column: 0, row: 1, guidance: "System studied, governing equations, or computational objective" },
      { title: "Model & Numerical Method", column: 0, row: 2, guidance: "Discretization, solver, hyperparameters, or basis set choices" },
      { title: "Validation", column: 0, row: 3, guidance: "Benchmarks against theory, experiment, or prior simulation" },
      { title: "Simulation Results", column: 1, row: 1, guidance: "Main output figures, convergence, parameter sweeps, and visualizations" },
      { title: "Interpretation", column: 1, row: 2, guidance: "Mechanistic explanation and sensitivity analysis" },
      { title: "Conclusions & Compute Notes", column: 1, row: 3, guidance: "Main conclusion, computational cost, reproducibility, and next steps" },
      { title: "References", column: 0, row: 4, guidance: "Methodological and domain-specific references" },
      { title: "Artifacts", column: 1, row: 4, guidance: "QR code to repository, dataset, or supplementary notebook" },
    ],
  },
  molecular_biology: {
    name: "Molecular Biology",
    description: "Poster for gene, pathway, cell-state, and mechanism-focused biology work",
    domains: ["biology"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and model organism or cell system" },
      { title: "Biological Question", column: 0, row: 1, guidance: "Knowledge gap, pathway, or mechanistic hypothesis" },
      { title: "Experimental Design", column: 0, row: 2, guidance: "Perturbation, controls, assays, and sample processing" },
      { title: "Methods", column: 0, row: 3, guidance: "Sequencing, imaging, proteomics, or molecular assays with analysis pipeline" },
      { title: "Key Results", column: 1, row: 1, colSpan: 2, guidance: "Main figures: expression changes, images, pathway effects, quantification" },
      { title: "Mechanistic Model", column: 1, row: 2, guidance: "Proposed pathway diagram or causal interpretation" },
      { title: "Conclusion & Future Experiments", column: 2, row: 2, guidance: "Main biological insight and strongest follow-up test" },
      { title: "References", column: 1, row: 3, guidance: "Key primary papers and methods citations" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, collaborators, core facilities, and QR code" },
    ],
  },
  synthetic_chemistry: {
    name: "Synthetic Chemistry",
    description: "Poster for synthesis, reaction development, and mechanistic chemistry",
    domains: ["chemistry"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and reaction class" },
      { title: "Target & Rationale", column: 0, row: 1, guidance: "Target scaffold, application, and unmet synthetic challenge" },
      { title: "Reaction Design", column: 0, row: 2, guidance: "Catalyst, substrate scope, and optimization strategy" },
      { title: "Mechanistic Hypothesis", column: 0, row: 3, guidance: "Proposed pathway, intermediates, and selectivity rationale" },
      { title: "Scope & Yields", column: 1, row: 1, colSpan: 2, guidance: "Reaction scheme table with yields, selectivity, and substrate scope" },
      { title: "Characterization", column: 1, row: 2, guidance: "NMR, MS, X-ray, or other structural confirmation" },
      { title: "Conclusions", column: 2, row: 2, guidance: "Synthetic value, limitations, and next chemistry step" },
      { title: "References", column: 1, row: 3, guidance: "Prior synthesis methods and mechanistic precedents" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, instrument access, and QR code" },
    ],
  },
  analytical_chemistry: {
    name: "Analytical Chemistry",
    description: "Poster for assay development, spectroscopy, and measurement validation",
    domains: ["chemistry"],
    gridLayout: "two_plus_one",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and analytical platform" },
      { title: "Problem & Analyte", column: 0, row: 1, guidance: "Why the analyte or matrix matters and current detection gap" },
      { title: "Platform Design", column: 0, row: 2, guidance: "Sensor, workflow, calibration curve, and materials" },
      { title: "Validation", column: 1, row: 1, guidance: "LOD, LOQ, selectivity, reproducibility, and comparison to gold standard" },
      { title: "Representative Data", column: 2, row: 1, guidance: "Spectra, chromatograms, signal plots, and sample results" },
      { title: "Application", column: 2, row: 2, guidance: "Real sample performance and deployment context" },
      { title: "Conclusion", column: 1, row: 2, guidance: "Main performance claim, caveats, and next validation step" },
      { title: "References", column: 0, row: 3, colSpan: 2, guidance: "Relevant analytical methods and benchmark assays" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, facility support, and QR code" },
    ],
  },
  materials_characterization: {
    name: "Materials Characterization",
    description: "Poster for structure-property analysis in chemistry and materials science",
    domains: ["chemistry"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and material system" },
      { title: "Material & Motivation", column: 0, row: 1, guidance: "Composition, target property, and application context" },
      { title: "Synthesis / Fabrication", column: 0, row: 2, guidance: "Preparation route, processing conditions, and controls" },
      { title: "Characterization Methods", column: 0, row: 3, guidance: "XRD, SEM, TEM, Raman, electrochemistry, or thermal analysis" },
      { title: "Structure & Morphology", column: 1, row: 1, guidance: "Images, diffraction patterns, and phase analysis" },
      { title: "Properties & Performance", column: 2, row: 1, guidance: "Key mechanical, optical, catalytic, or electrochemical data" },
      { title: "Structure-Property Relationship", column: 1, row: 2, colSpan: 2, guidance: "Interpret how structure explains performance trends" },
      { title: "References", column: 1, row: 3, guidance: "Core materials and method references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, instrument facilities, and QR code" },
    ],
  },
  ml_benchmark: {
    name: "ML Benchmark",
    description: "Poster for machine learning model comparison and evaluation-heavy work",
    domains: ["computer_science"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, model family, and benchmark suite" },
      { title: "Task & Motivation", column: 0, row: 1, guidance: "Problem definition, use case, and evaluation stakes" },
      { title: "Methods", column: 0, row: 2, guidance: "Models, datasets, baselines, compute setting, and tuning protocol" },
      { title: "Experimental Setup", column: 0, row: 3, guidance: "Splits, metrics, hardware, and reproducibility notes" },
      { title: "Leaderboard / Main Results", column: 1, row: 1, guidance: "Primary benchmark table, confidence intervals, and visual summaries" },
      { title: "Ablations & Error Analysis", column: 1, row: 2, guidance: "Key ablations, failure modes, subgroup analysis, and robustness" },
      { title: "Conclusions & Release", column: 1, row: 3, guidance: "Main empirical takeaway, limitations, and link to code/model card" },
      { title: "References", column: 0, row: 4, guidance: "Prior benchmarks, dataset papers, and comparison baselines" },
      { title: "Artifacts", column: 1, row: 4, guidance: "QR code to repo, dataset, checkpoint, or demo" },
    ],
  },
  systems_architecture: {
    name: "Systems Architecture",
    description: "Poster for systems, infrastructure, and engineering architecture work",
    domains: ["computer_science", "engineering"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and system name" },
      { title: "Problem Context", column: 0, row: 1, guidance: "Operational setting, bottleneck, and target workload" },
      { title: "Architecture Overview", column: 0, row: 2, guidance: "High-level block diagram and design rationale" },
      { title: "Implementation Details", column: 0, row: 3, guidance: "Key components, interfaces, deployment environment, and constraints" },
      { title: "Performance Results", column: 1, row: 1, guidance: "Latency, throughput, reliability, energy, or cost results" },
      { title: "Tradeoffs & Failure Modes", column: 1, row: 2, guidance: "Scalability limits, bottlenecks, ablations, and resilience findings" },
      { title: "Deployment Lessons", column: 1, row: 3, guidance: "Production learnings, generalizability, and next system iteration" },
      { title: "References", column: 0, row: 4, guidance: "Core systems papers and design references" },
      { title: "Demo / Repository", column: 1, row: 4, guidance: "QR code to repo, dashboard, or live demo" },
    ],
  },
  hci_study: {
    name: "HCI Study",
    description: "Poster for user studies, interaction design, and human-centered computing",
    domains: ["computer_science"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and system/interface snapshot" },
      { title: "Design Problem", column: 0, row: 1, guidance: "User need, context of use, and current breakdowns" },
      { title: "System / Prototype", column: 0, row: 2, guidance: "Interaction flow, interface concept, and implementation highlights" },
      { title: "Study Design", column: 0, row: 3, guidance: "Participants, tasks, measures, and ethics details" },
      { title: "Findings", column: 1, row: 1, colSpan: 2, guidance: "Usability scores, task metrics, thematic findings, and key screenshots" },
      { title: "Design Implications", column: 1, row: 2, guidance: "What the findings imply for future interface design" },
      { title: "Limitations & Next Steps", column: 2, row: 2, guidance: "Scope limits, open questions, and next iteration" },
      { title: "References", column: 1, row: 3, guidance: "Key HCI, CSCW, and usability references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Participant thanks, funding, and QR code to video/demo" },
    ],
  },
  prototype_validation: {
    name: "Prototype Validation",
    description: "Poster for engineering prototypes with bench or field validation",
    domains: ["engineering"],
    gridLayout: "two_plus_one",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and prototype photo" },
      { title: "Design Objective", column: 0, row: 1, guidance: "Use case, constraints, and target performance" },
      { title: "Prototype Design", column: 0, row: 2, guidance: "CAD, materials, fabrication, and subsystem overview" },
      { title: "Test Protocol", column: 1, row: 1, guidance: "Bench setup, sensors, calibration, and validation criteria" },
      { title: "Performance Results", column: 2, row: 1, guidance: "Efficiency, reliability, stress, or control performance plots" },
      { title: "Failure Analysis", column: 2, row: 2, guidance: "Observed failure modes, tradeoffs, and redesign opportunities" },
      { title: "Conclusion", column: 1, row: 2, guidance: "Validation outcome, readiness level, and next prototype iteration" },
      { title: "References", column: 0, row: 3, colSpan: 2, guidance: "Standards, prior systems, and benchmark references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, fabrication support, and QR code" },
    ],
  },
  process_design: {
    name: "Process Design",
    description: "Poster for engineering workflows, manufacturing, or process optimization",
    domains: ["engineering"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and process overview graphic" },
      { title: "Process Context", column: 0, row: 1, guidance: "Operational environment, constraints, and target KPI" },
      { title: "Design Variables", column: 0, row: 2, guidance: "Control factors, materials, or process parameters under study" },
      { title: "Optimization / Model", column: 0, row: 3, guidance: "Optimization method, simulation, DOE, or process model" },
      { title: "Main Results", column: 1, row: 1, colSpan: 2, guidance: "Yield, throughput, cost, quality, or energy results" },
      { title: "Sensitivity Analysis", column: 1, row: 2, guidance: "Parameter sensitivity and operational tradeoffs" },
      { title: "Implementation Guidance", column: 2, row: 2, guidance: "Recommended settings, feasibility, and deployment constraints" },
      { title: "References", column: 1, row: 3, guidance: "Key process engineering references and standards" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, facility support, and QR code" },
    ],
  },
  mathematical_modeling: {
    name: "Mathematical Modeling",
    description: "Poster for applied math or quantitative modeling work",
    domains: ["mathematics"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and modeled system" },
      { title: "Modeling Question", column: 0, row: 1, guidance: "Real-world or abstract phenomenon and target prediction" },
      { title: "Model Formulation", column: 0, row: 2, guidance: "Variables, assumptions, governing equations, and parameters" },
      { title: "Analysis / Numerical Method", column: 0, row: 3, guidance: "Analytical techniques, identifiability, or numerical solvers" },
      { title: "Results", column: 1, row: 1, guidance: "Phase plots, solution behavior, sensitivity analysis, or convergence results" },
      { title: "Interpretation", column: 1, row: 2, guidance: "What the model explains and where it breaks down" },
      { title: "Conclusions & Extensions", column: 1, row: 3, guidance: "Main result, limitations, and next model extension" },
      { title: "References", column: 0, row: 4, guidance: "Mathematical and application-domain references" },
      { title: "Artifacts", column: 1, row: 4, guidance: "QR code to appendix, proofs, or simulation code" },
    ],
  },
  proof_outline: {
    name: "Proof Outline",
    description: "Poster for pure mathematics emphasizing theorem structure and proof ideas",
    domains: ["mathematics"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and theorem area" },
      { title: "Problem Statement", column: 0, row: 1, guidance: "Formal statement of the problem or conjecture" },
      { title: "Definitions & Setup", column: 0, row: 2, guidance: "Notation, assumptions, and key preliminary objects" },
      { title: "Main Theorem", column: 1, row: 1, colSpan: 2, guidance: "Clean theorem statement with precise hypotheses" },
      { title: "Proof Strategy", column: 1, row: 2, guidance: "High-level proof architecture and central lemmas" },
      { title: "Key Lemmas / Examples", column: 2, row: 2, guidance: "Representative intermediate results or illustrative examples" },
      { title: "Consequences", column: 0, row: 3, guidance: "Corollaries, applications, or open problems" },
      { title: "References", column: 1, row: 3, guidance: "Foundational papers and closest related results" },
      { title: "Contact / Appendix", column: 2, row: 3, guidance: "QR code to full proof, preprint, or notes" },
    ],
  },
  social_survey: {
    name: "Social Survey",
    description: "Poster for survey-based or observational social science studies",
    domains: ["social_sciences"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and study population" },
      { title: "Research Question", column: 0, row: 1, guidance: "Theory, construct, and practical motivation" },
      { title: "Data & Sample", column: 0, row: 2, guidance: "Sampling frame, respondents, measures, and context" },
      { title: "Methods", column: 0, row: 3, guidance: "Survey design, scales, modeling approach, and ethics" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Associations, subgroup patterns, regression outputs, and figures" },
      { title: "Interpretation", column: 1, row: 2, guidance: "Theoretical meaning and boundary conditions" },
      { title: "Implications", column: 2, row: 2, guidance: "Policy, institutional, or societal implications" },
      { title: "References", column: 1, row: 3, guidance: "Theory, scale, and methods references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, community partners, and QR code" },
    ],
  },
  qualitative_study: {
    name: "Qualitative Study",
    description: "Poster for interview, ethnographic, focus group, or case-based research",
    domains: ["social_sciences", "psychology"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and field site or participant group" },
      { title: "Context & Aim", column: 0, row: 1, guidance: "Setting, motivation, and qualitative research question" },
      { title: "Participants & Data", column: 0, row: 2, guidance: "Recruitment, sample, data sources, and ethics" },
      { title: "Analytic Approach", column: 0, row: 3, guidance: "Coding method, reflexivity, trustworthiness, and analytic lens" },
      { title: "Themes", column: 1, row: 1, colSpan: 2, guidance: "Theme map, quotes, or case narratives" },
      { title: "Interpretation", column: 1, row: 2, guidance: "What the themes show and where tensions emerge" },
      { title: "Practice / Theory Implications", column: 2, row: 2, guidance: "Implications for theory, services, or institutions" },
      { title: "References", column: 1, row: 3, guidance: "Methodological and substantive references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Participants, partners, funding, and QR code" },
    ],
  },
  policy_analysis: {
    name: "Policy Analysis",
    description: "Poster for policy evaluation, comparative governance, or recommendation-focused work",
    domains: ["social_sciences", "economics", "law", "education", "environmental"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and policy domain" },
      { title: "Policy Problem", column: 0, row: 1, guidance: "Institutional context, stakes, and status quo" },
      { title: "Framework / Data", column: 0, row: 2, guidance: "Legal framework, theory of change, data, or comparative cases" },
      { title: "Methods", column: 0, row: 3, guidance: "Comparative, empirical, legal, or mixed-methods approach" },
      { title: "Findings", column: 1, row: 1, guidance: "Main evidence, comparative results, costs, or implementation patterns" },
      { title: "Recommendations", column: 1, row: 2, guidance: "Actionable policy options and likely tradeoffs" },
      { title: "Conclusion", column: 1, row: 3, guidance: "Bottom-line recommendation, risks, and next decision point" },
      { title: "References", column: 0, row: 4, guidance: "Key policy documents, articles, and statutes" },
      { title: "Appendix / QR", column: 1, row: 4, guidance: "QR code to brief, appendix, or dashboard" },
    ],
  },
  mixed_methods_research: {
    name: "Mixed Methods Research",
    description: "Poster for designs integrating quantitative and qualitative evidence",
    domains: ["social_sciences", "education"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and study context" },
      { title: "Research Aim", column: 0, row: 1, guidance: "Question and rationale for combining methods" },
      { title: "Quantitative Strand", column: 0, row: 2, guidance: "Sample, instruments, and analytic strategy" },
      { title: "Qualitative Strand", column: 0, row: 3, guidance: "Participants, data collection, and coding approach" },
      { title: "Integrated Findings", column: 1, row: 1, colSpan: 2, guidance: "Joint display showing convergence, divergence, and complementarity" },
      { title: "Interpretation", column: 1, row: 2, guidance: "How the strands combine into a stronger explanation" },
      { title: "Implications", column: 2, row: 2, guidance: "Practical, theoretical, or design implications" },
      { title: "References", column: 1, row: 3, guidance: "Mixed-methods and substantive references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Partners, participants, funding, and QR code" },
    ],
  },
  economics_empirical: {
    name: "Economics Empirical",
    description: "Poster for causal inference, econometric, and policy-evaluation studies",
    domains: ["economics"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and outcome of interest" },
      { title: "Question & Context", column: 0, row: 1, guidance: "Economic motivation, policy context, and hypothesis" },
      { title: "Data & Identification", column: 0, row: 2, guidance: "Dataset, treatment definition, identification strategy, and assumptions" },
      { title: "Model Specification", column: 0, row: 3, guidance: "Regression form, controls, standard errors, and robustness plan" },
      { title: "Main Estimates", column: 1, row: 1, guidance: "Core coefficients, event studies, elasticity plots, or welfare results" },
      { title: "Robustness & Heterogeneity", column: 1, row: 2, guidance: "Sensitivity checks, subgroup effects, and alternative specifications" },
      { title: "Policy Takeaway", column: 1, row: 3, guidance: "What decision-makers should infer and what remains uncertain" },
      { title: "References", column: 0, row: 4, guidance: "Theory, identification, and policy references" },
      { title: "Data / Code", column: 1, row: 4, guidance: "QR code to paper, appendix, replication package, or working paper" },
    ],
  },
  finance_modeling: {
    name: "Finance Modeling",
    description: "Poster for asset pricing, risk, or financial market modeling studies",
    domains: ["economics"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and market or asset class" },
      { title: "Research Problem", column: 0, row: 1, guidance: "Puzzle, anomaly, or pricing question" },
      { title: "Data & Variables", column: 0, row: 2, guidance: "Asset universe, factors, sample period, and transformations" },
      { title: "Model", column: 0, row: 3, guidance: "Theoretical setup, estimation method, or forecasting model" },
      { title: "Main Results", column: 1, row: 1, colSpan: 2, guidance: "Returns, alphas, Sharpe ratios, forecast accuracy, or risk metrics" },
      { title: "Stress / Robustness", column: 1, row: 2, guidance: "Out-of-sample checks, regime splits, and crisis behavior" },
      { title: "Interpretation", column: 2, row: 2, guidance: "Economic meaning, limitations, and implementation relevance" },
      { title: "References", column: 1, row: 3, guidance: "Core finance and econometrics references" },
      { title: "Appendix / QR", column: 2, row: 3, guidance: "QR code to appendix, slides, or replication materials" },
    ],
  },
  psychology_experiment: {
    name: "Psychology Experiment",
    description: "Poster for behavioral, cognitive, or intervention experiments in psychology",
    domains: ["psychology"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and participant population" },
      { title: "Background & Hypotheses", column: 0, row: 1, guidance: "Theory, prior findings, and preregistered hypotheses" },
      { title: "Participants & Design", column: 0, row: 2, guidance: "Recruitment, sample, task, conditions, and measures" },
      { title: "Procedure", column: 0, row: 3, guidance: "Timeline, intervention or manipulation, and analytic plan" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Effect sizes, confidence intervals, manipulation checks, and key plots" },
      { title: "Interpretation", column: 1, row: 2, guidance: "How the findings support or revise the theory" },
      { title: "Limitations & Replication", column: 2, row: 2, guidance: "Boundary conditions, external validity, and next replication step" },
      { title: "References", column: 1, row: 3, guidance: "Theory, methods, and scale references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, lab team, and QR code to preregistration/materials" },
    ],
  },
  law_doctrinal: {
    name: "Law Doctrinal",
    description: "Poster for doctrinal legal analysis and precedent mapping",
    domains: ["law"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and jurisdiction" },
      { title: "Legal Question", column: 0, row: 1, guidance: "Doctrinal issue, stakes, and procedural setting" },
      { title: "Authorities", column: 0, row: 2, guidance: "Cases, statutes, regulations, and secondary sources analyzed" },
      { title: "Method", column: 0, row: 3, guidance: "Doctrinal, comparative, historical, or socio-legal method" },
      { title: "Holding / Argument Map", column: 1, row: 1, colSpan: 2, guidance: "Precedent line, doctrinal split, or interpretive comparison" },
      { title: "Analysis", column: 1, row: 2, guidance: "Interpretive reasoning and strongest legal argument" },
      { title: "Implications", column: 2, row: 2, guidance: "Effects on litigation, governance, or law reform" },
      { title: "Authorities Cited", column: 1, row: 3, guidance: "Lead cases, statutes, and law review sources" },
      { title: "QR / Contact", column: 2, row: 3, guidance: "QR code to brief, note, or full article" },
    ],
  },
  comparative_law: {
    name: "Comparative Law",
    description: "Poster for cross-jurisdiction legal comparison",
    domains: ["law"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and jurisdictions compared" },
      { title: "Comparative Problem", column: 0, row: 1, guidance: "Shared legal issue and reason comparison matters" },
      { title: "Jurisdictional Frameworks", column: 0, row: 2, guidance: "Relevant doctrines, statutes, and institutional structures" },
      { title: "Comparison Method", column: 0, row: 3, guidance: "Selection criteria, variables of comparison, and limits" },
      { title: "Comparative Findings", column: 1, row: 1, guidance: "Key doctrinal similarities, differences, and policy divergence" },
      { title: "Transferability", column: 1, row: 2, guidance: "What reforms, cautions, or lessons can be transferred" },
      { title: "Conclusion", column: 1, row: 3, guidance: "Strongest comparative insight and recommendation" },
      { title: "Authorities", column: 0, row: 4, guidance: "Cases, statutes, and leading scholarship across jurisdictions" },
      { title: "QR / Appendix", column: 1, row: 4, guidance: "QR code to comparison table or full memorandum" },
    ],
  },
  case_commentary: {
    name: "Case Commentary",
    description: "Poster for a single leading judgment or tightly bounded case cluster",
    domains: ["law"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and cited case" },
      { title: "Case Background", column: 0, row: 1, guidance: "Facts, procedural history, and issues presented" },
      { title: "Holding", column: 0, row: 2, guidance: "Core ruling and reasoning in precise legal terms" },
      { title: "Doctrinal Significance", column: 1, row: 1, guidance: "How the case shifts or clarifies the doctrine" },
      { title: "Critique", column: 1, row: 2, guidance: "Strongest supportive and critical scholarly perspectives" },
      { title: "Practical Impact", column: 2, row: 1, guidance: "Implications for courts, agencies, or litigants" },
      { title: "Open Questions", column: 2, row: 2, guidance: "Unresolved doctrinal questions and likely next cases" },
      { title: "Authorities", column: 1, row: 3, guidance: "Lead cases, statutes, and commentary" },
      { title: "QR / Contact", column: 2, row: 3, guidance: "QR code to case note or bench memo" },
    ],
  },
  humanities_archive: {
    name: "Humanities Archive",
    description: "Poster for archive-based humanities or historical source research",
    domains: ["humanities"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and archive or corpus name" },
      { title: "Research Question", column: 0, row: 1, guidance: "Historical or interpretive question and stakes" },
      { title: "Sources", column: 0, row: 2, guidance: "Archives, manuscripts, images, oral histories, or corpus" },
      { title: "Method", column: 0, row: 3, guidance: "Close reading, archival method, metadata strategy, or historical approach" },
      { title: "Findings", column: 1, row: 1, colSpan: 2, guidance: "Primary source excerpts, timeline, or visual evidence supporting the argument" },
      { title: "Interpretive Claim", column: 1, row: 2, guidance: "What the sources reveal and how they revise prior scholarship" },
      { title: "Scholarly Significance", column: 2, row: 2, guidance: "Historiographical, literary, or philosophical importance" },
      { title: "References", column: 1, row: 3, guidance: "Primary archive references and secondary scholarship" },
      { title: "QR / Repository", column: 2, row: 3, guidance: "QR code to digital exhibit, appendix, or project page" },
    ],
  },
  comparative_literature: {
    name: "Comparative Literature",
    description: "Poster for transnational, comparative, or cross-text literary analysis",
    domains: ["humanities"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and texts compared" },
      { title: "Texts & Context", column: 0, row: 1, guidance: "Authors, periods, languages, and comparative rationale" },
      { title: "Framework", column: 0, row: 2, guidance: "Critical lens, method, and key themes or motifs" },
      { title: "Comparative Reading", column: 1, row: 1, guidance: "Parallel excerpts, visual schema, and analytic contrasts" },
      { title: "Interpretation", column: 1, row: 2, guidance: "What the comparison reveals about form, politics, or genre" },
      { title: "Contribution", column: 1, row: 3, guidance: "How the reading reframes the canon, field, or debate" },
      { title: "References", column: 0, row: 3, guidance: "Primary and secondary references" },
      { title: "QR / Appendix", column: 0, row: 4, colSpan: 2, guidance: "QR code to bibliography, appendix, or digital companion" },
    ],
  },
  historical_argument: {
    name: "Historical Argument",
    description: "Poster for history-focused argumentation built from primary and secondary sources",
    domains: ["humanities"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and time period" },
      { title: "Question & Historiography", column: 0, row: 1, guidance: "Debate, dominant interpretation, and intervention" },
      { title: "Sources", column: 0, row: 2, guidance: "Primary evidence base and source criticism" },
      { title: "Argument", column: 1, row: 1, colSpan: 2, guidance: "Core claim supported by timeline, map, or documentary excerpts" },
      { title: "Evidence Threads", column: 1, row: 2, guidance: "Most important strands of evidence and counterevidence" },
      { title: "Historical Significance", column: 2, row: 2, guidance: "What changes in the broader historical narrative" },
      { title: "References", column: 0, row: 3, guidance: "Primary and secondary references" },
      { title: "Archive / QR", column: 1, row: 3, colSpan: 2, guidance: "QR code to source list, appendix, or digital archive" },
    ],
  },
  education_intervention: {
    name: "Education Intervention",
    description: "Poster for classroom or curriculum interventions with measurable outcomes",
    domains: ["education"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and learner context" },
      { title: "Instructional Problem", column: 0, row: 1, guidance: "Learning need, curricular context, and target outcome" },
      { title: "Intervention Design", column: 0, row: 2, guidance: "Instructional strategy, duration, modality, and fidelity plan" },
      { title: "Participants & Measures", column: 0, row: 3, guidance: "Learners, instructors, instruments, and assessment schedule" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Learning gains, engagement metrics, and implementation evidence" },
      { title: "Teacher / Student Experience", column: 1, row: 2, guidance: "Perceptions, usability, and barriers or facilitators" },
      { title: "Pedagogical Implications", column: 2, row: 2, guidance: "How instructors should adapt or extend the intervention" },
      { title: "References", column: 1, row: 3, guidance: "Learning science, pedagogy, and methods references" },
      { title: "Resources", column: 2, row: 3, guidance: "QR code to lesson plan, rubric, or toolkit" },
    ],
  },
  assessment_design: {
    name: "Assessment Design",
    description: "Poster for measurement, rubric, psychometric, or evaluation design studies",
    domains: ["education"],
    gridLayout: "two_plus_one",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and assessment context" },
      { title: "Assessment Need", column: 0, row: 1, guidance: "Target competency, gap in current measures, and use case" },
      { title: "Instrument Design", column: 0, row: 2, guidance: "Blueprint, rubric, item types, and validation plan" },
      { title: "Validation Sample", column: 1, row: 1, guidance: "Participants, administration setting, and scoring workflow" },
      { title: "Psychometric Results", column: 2, row: 1, guidance: "Reliability, validity, factor structure, and item performance" },
      { title: "Use Recommendations", column: 2, row: 2, guidance: "How instructors or institutions should use the instrument" },
      { title: "Conclusion", column: 1, row: 2, guidance: "Main quality claim and next validation milestone" },
      { title: "References", column: 0, row: 3, colSpan: 2, guidance: "Assessment and measurement references" },
      { title: "Materials", column: 2, row: 3, guidance: "QR code to rubric, survey, or scoring guide" },
    ],
  },
  environmental_field_study: {
    name: "Environmental Field Study",
    description: "Poster for field observations, monitoring, and ecosystem measurements",
    domains: ["environmental"],
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, and study region" },
      { title: "Environmental Question", column: 0, row: 1, guidance: "System, stressor, and ecological or health relevance" },
      { title: "Site & Sampling", column: 0, row: 2, guidance: "Field sites, sampling design, sensors, and temporal scope" },
      { title: "Methods", column: 0, row: 3, guidance: "Laboratory assays, remote sensing, or statistical analysis" },
      { title: "Findings", column: 1, row: 1, colSpan: 2, guidance: "Maps, concentration plots, biodiversity metrics, or exposure trends" },
      { title: "Interpretation", column: 1, row: 2, guidance: "Mechanisms, local drivers, and uncertainty" },
      { title: "Management Implications", column: 2, row: 2, guidance: "Implications for conservation, mitigation, or monitoring policy" },
      { title: "References", column: 1, row: 3, guidance: "Key field and environmental method references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Community partners, funding, field teams, and QR code" },
    ],
  },
  climate_modeling: {
    name: "Climate Modeling",
    description: "Poster for climate, hydrologic, or earth-system modeling studies",
    domains: ["environmental"],
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, and model or scenario family" },
      { title: "Question & Scenarios", column: 0, row: 1, guidance: "System boundary, forcing scenario, and research objective" },
      { title: "Model Setup", column: 0, row: 2, guidance: "Model structure, inputs, calibration, and validation sources" },
      { title: "Assumptions & Uncertainty", column: 0, row: 3, guidance: "Scenario assumptions, sensitivity analysis, and uncertainty framing" },
      { title: "Projected Outcomes", column: 1, row: 1, guidance: "Maps, time series, anomaly plots, or exposure projections" },
      { title: "Validation & Comparison", column: 1, row: 2, guidance: "Historical fit, inter-model comparison, and known failure regions" },
      { title: "Implications", column: 1, row: 3, guidance: "What the projections imply for adaptation, mitigation, or planning" },
      { title: "References", column: 0, row: 4, guidance: "Core model, climate, and scenario references" },
      { title: "Data / Code", column: 1, row: 4, guidance: "QR code to repository, dashboard, or supplementary data" },
    ],
  },
};

export function getPosterTemplatesForDomain(domain?: DomainConfig): PosterTemplate[] {
  if (!domain) {
    return Object.values(POSTER_TEMPLATES);
  }

  return Object.entries(POSTER_TEMPLATES)
    .filter(([key]) => domain.posterTemplates.includes(key))
    .map(([, template]) => template);
}
