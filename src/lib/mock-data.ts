// Mock data layer for ScholarSync Phase 2
// Realistic medical student data themed around CRISPR gene editing research

export interface MockUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  creditsUsed: number;
  creditsLimit: number;
}

export interface MockProject {
  id: string;
  title: string;
  type: "research_paper" | "learn_session" | "thesis";
  status: "drafting" | "completed" | "issues_found";
  wordCount: number;
  lastEdited: string;
}

export interface MockPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  type: "pdf" | "web";
  abstract: string;
  isFavorite: boolean;
}

export interface MockCollection {
  id: string;
  name: string;
  paperCount: number;
}

export interface MockSearchResult {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  citationCount: number;
  tags: string[];
  hasPdf: boolean;
  tldr: string;
}

export interface MockChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface MockUsageStats {
  aiTokens: { used: number; limit: number };
  searches: { used: number; limit: number };
  plagiarismChecks: { used: number; limit: number };
}

export interface MockInvoice {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface MockSlide {
  id: string;
  title: string;
  content: string;
}

export const mockUser: MockUser = {
  id: "usr_01",
  name: "Dr. Rahul Sharma",
  email: "rahul.sharma@aiims.edu",
  plan: "Basic",
  creditsUsed: 12450,
  creditsLimit: 50000,
};

export const mockProjects: MockProject[] = [
  {
    id: "proj_01",
    title: "CRISPR-Cas9 in Sickle Cell Disease: A Systematic Review",
    type: "research_paper",
    status: "drafting",
    wordCount: 4250,
    lastEdited: "2026-02-13T09:30:00Z",
  },
  {
    id: "proj_02",
    title: "Gene Therapy Ethical Frameworks — Learn Session",
    type: "learn_session",
    status: "completed",
    wordCount: 1800,
    lastEdited: "2026-02-12T14:15:00Z",
  },
  {
    id: "proj_03",
    title: "Base Editing vs Prime Editing: Comparative Analysis",
    type: "research_paper",
    status: "issues_found",
    wordCount: 6120,
    lastEdited: "2026-02-11T20:00:00Z",
  },
  {
    id: "proj_04",
    title: "Pharmacogenomics in Oncology — Thesis Chapter 3",
    type: "thesis",
    status: "drafting",
    wordCount: 8750,
    lastEdited: "2026-02-10T11:45:00Z",
  },
  {
    id: "proj_05",
    title: "mRNA Vaccine Mechanisms — Learn Session",
    type: "learn_session",
    status: "completed",
    wordCount: 2100,
    lastEdited: "2026-02-08T16:30:00Z",
  },
  {
    id: "proj_06",
    title: "Off-Target Effects in CRISPR Therapeutics",
    type: "research_paper",
    status: "drafting",
    wordCount: 3400,
    lastEdited: "2026-02-07T08:20:00Z",
  },
];

export const mockPapers: MockPaper[] = [
  {
    id: "paper_01",
    title: "CRISPR-Cas9 Gene Editing for Sickle Cell Disease",
    authors: ["Frangoul, H.", "Altshuler, D.", "Cappellini, M.D."],
    journal: "New England Journal of Medicine",
    year: 2021,
    doi: "10.1056/NEJMoa2031054",
    type: "pdf",
    abstract:
      "We assessed the safety and efficacy of a single dose of autologous CRISPR-Cas9-edited CD34+ hematopoietic stem and progenitor cells (CTX001) in patients with severe sickle cell disease.",
    isFavorite: true,
  },
  {
    id: "paper_02",
    title: "Base editing: precision chemistry on the genome and transcriptome of living cells",
    authors: ["Rees, H.A.", "Liu, D.R."],
    journal: "Nature Reviews Genetics",
    year: 2018,
    doi: "10.1038/s41576-018-0059-1",
    type: "pdf",
    abstract:
      "Base editors convert one base pair to another at a target genomic locus without requiring double-stranded DNA breaks or donor DNA templates.",
    isFavorite: true,
  },
  {
    id: "paper_03",
    title: "Therapeutic CRISPR/Cas9 applications: progress and prospects",
    authors: ["Doudna, J.A.", "Charpentier, E."],
    journal: "Science",
    year: 2024,
    doi: "10.1126/science.adn9779",
    type: "web",
    abstract:
      "Genome editing technologies based on CRISPR-Cas9 are being developed as new therapeutic approaches for a range of human diseases.",
    isFavorite: false,
  },
  {
    id: "paper_04",
    title: "Off-target effects of CRISPR-Cas9: challenges and mitigation strategies",
    authors: ["Zhang, X.H.", "Tee, L.Y.", "Wang, X.G."],
    journal: "Molecular Therapy - Nucleic Acids",
    year: 2023,
    doi: "10.1016/j.omtn.2023.04.015",
    type: "pdf",
    abstract:
      "Off-target cleavage by CRISPR-Cas9 remains a critical concern for therapeutic applications. This review examines detection methods and mitigation strategies.",
    isFavorite: false,
  },
  {
    id: "paper_05",
    title: "Prime editing: A new era of precise genome editing",
    authors: ["Anzalone, A.V.", "Randolph, P.B.", "Davis, J.R.", "Sousa, A.A."],
    journal: "Nature",
    year: 2019,
    doi: "10.1038/s41586-019-1711-4",
    type: "pdf",
    abstract:
      "We describe prime editing, a versatile and precise genome editing method that directly writes new genetic information into a specified DNA site.",
    isFavorite: true,
  },
  {
    id: "paper_06",
    title: "Ethical considerations for CRISPR genome editing in human embryos",
    authors: ["Lander, E.S.", "Baylis, F.", "Zhang, F."],
    journal: "Nature",
    year: 2019,
    doi: "10.1038/d41586-019-00726-5",
    type: "web",
    abstract:
      "A moratorium on heritable genome editing is needed. We call on global stakeholders to voluntarily commit to not approve clinical uses of germline editing.",
    isFavorite: false,
  },
  {
    id: "paper_07",
    title: "In vivo CRISPR delivery for therapeutic gene editing",
    authors: ["Xu, C.L.", "Ruan, M.Z.C.", "Mahajan, V.B.", "Tsang, S.H."],
    journal: "Cell & Gene Therapy Insights",
    year: 2024,
    doi: "10.18609/cgti.2024.001",
    type: "pdf",
    abstract:
      "Recent advances in delivery systems have enabled in vivo CRISPR-based therapies. We review AAV, lipid nanoparticle, and exosome-based delivery approaches.",
    isFavorite: false,
  },
  {
    id: "paper_08",
    title: "CRISPR-Cas13 systems for RNA editing in human cells",
    authors: ["Abudayyeh, O.O.", "Gootenberg, J.S.", "Konermann, S."],
    journal: "Nature Biotechnology",
    year: 2023,
    doi: "10.1038/nbt.4271",
    type: "web",
    abstract:
      "We demonstrate RNA editing in human cells using CRISPR-Cas13 systems with ADAR2 deaminase domains, enabling programmable A-to-I RNA editing.",
    isFavorite: false,
  },
];

export const mockCollections: MockCollection[] = [
  { id: "col_01", name: "CRISPR Reviews", paperCount: 4 },
  { id: "col_02", name: "Ethics & Policy", paperCount: 2 },
  { id: "col_03", name: "Delivery Systems", paperCount: 3 },
];

export const mockSearchResults: MockSearchResult[] = [
  {
    id: "sr_01",
    title: "Clinical applications of CRISPR-Cas9 in hematological malignancies",
    authors: ["Li, C.", "Mei, H.", "Hu, Y."],
    journal: "Journal of Hematology & Oncology",
    year: 2025,
    abstract:
      "This review systematically examines the clinical trials using CRISPR-Cas9 for treating hematological cancers, including CAR-T cell engineering and direct gene correction approaches.",
    citationCount: 142,
    tags: ["Clinical Trial", "Hematology", "CAR-T"],
    hasPdf: true,
    tldr: "CRISPR-Cas9 is increasingly used in clinical trials for blood cancers, particularly in engineering improved CAR-T cells with enhanced tumor killing efficiency.",
  },
  {
    id: "sr_02",
    title: "Next-generation CRISPR technologies and their applications in gene therapy",
    authors: ["Porto, E.M.", "Komor, A.C.", "Slaymaker, I.M.", "Yeo, G.W."],
    journal: "Nature Reviews Drug Discovery",
    year: 2024,
    abstract:
      "Beyond conventional Cas9, next-generation tools including base editors, prime editors, and CRISPRa/CRISPRi offer expanded therapeutic possibilities with improved precision.",
    citationCount: 328,
    tags: ["Review", "Base Editing", "Prime Editing"],
    hasPdf: true,
    tldr: "Next-gen CRISPR tools like base and prime editors offer more precise genome modifications with fewer off-target effects than traditional Cas9.",
  },
  {
    id: "sr_03",
    title: "Lipid nanoparticle delivery of CRISPR components for in vivo gene editing",
    authors: ["Qiu, M.", "Glass, Z.", "Chen, J.", "Haas, M."],
    journal: "Advanced Materials",
    year: 2025,
    abstract:
      "Lipid nanoparticles have emerged as a leading delivery platform for CRISPR components. We review formulation strategies and clinical progress.",
    citationCount: 89,
    tags: ["Delivery", "LNP", "In Vivo"],
    hasPdf: false,
    tldr: "LNPs are the most promising non-viral delivery method for CRISPR therapeutics, with several formulations now in clinical trials.",
  },
  {
    id: "sr_04",
    title: "Ethical frameworks for somatic CRISPR gene therapy in developing nations",
    authors: ["Baylis, F.", "McLeod, M."],
    journal: "The Lancet Global Health",
    year: 2024,
    abstract:
      "Access to CRISPR therapeutics raises equity concerns for low- and middle-income countries. We propose an ethical framework addressing affordability, infrastructure, and governance.",
    citationCount: 56,
    tags: ["Ethics", "Global Health", "Policy"],
    hasPdf: true,
    tldr: "A new ethical framework is needed to ensure equitable access to CRISPR gene therapies in developing nations.",
  },
  {
    id: "sr_05",
    title: "CRISPR-based diagnostics: from SHERLOCK to clinical deployment",
    authors: ["Gootenberg, J.S.", "Abudayyeh, O.O.", "Kellner, M.J."],
    journal: "Science Translational Medicine",
    year: 2025,
    abstract:
      "CRISPR-based diagnostic platforms like SHERLOCK and DETECTR have moved from proof-of-concept to clinical deployment for pathogen detection and genotyping.",
    citationCount: 215,
    tags: ["Diagnostics", "SHERLOCK", "Point-of-Care"],
    hasPdf: true,
    tldr: "CRISPR diagnostics are now clinically deployed for rapid, sensitive detection of pathogens including respiratory viruses and antimicrobial resistance genes.",
  },
];

export const mockChatMessages: MockChatMessage[] = [
  {
    id: "msg_01",
    role: "user",
    content: "What are the key differences between base editing and prime editing?",
  },
  {
    id: "msg_02",
    role: "assistant",
    content:
      "Great question! Here are the key differences:\n\n**Base Editing** (developed by David Liu's lab, 2016):\n- Converts one base pair to another (C→T or A→G) without double-strand breaks\n- Limited to transition mutations (4 of 12 possible point mutations)\n- Higher efficiency for single-nucleotide changes (~50-80%)\n\n**Prime Editing** (2019):\n- Can make all 12 types of point mutations plus small insertions and deletions\n- Uses a prime editing guide RNA (pegRNA) with a reverse transcriptase\n- Lower efficiency (~10-50%) but far more versatile\n- No double-strand breaks required\n\nFor your sickle cell review, base editing is particularly relevant since the HbS mutation (GAG→GTG) can be corrected with an adenine base editor.",
  },
  {
    id: "msg_03",
    role: "user",
    content: "Can you help me write an introduction paragraph for the systematic review?",
  },
  {
    id: "msg_04",
    role: "assistant",
    content:
      "Here's a draft introduction:\n\n*Sickle cell disease (SCD) affects approximately 20 million individuals globally, with the highest burden in sub-Saharan Africa and India (Piel et al., 2017). The disease arises from a single nucleotide substitution in the β-globin gene (HBB), making it an ideal candidate for gene editing approaches. The advent of CRISPR-Cas9 technology has opened unprecedented therapeutic avenues, with CTX001 (exa-cel) becoming the first CRISPR-based therapy to receive regulatory approval in 2023 (Frangoul et al., 2021). This systematic review examines the efficacy, safety, and long-term outcomes of CRISPR-based interventions for SCD...*\n\nWould you like me to adjust the scope or add specific aspects?",
  },
];

export const mockUsageStats: MockUsageStats = {
  aiTokens: { used: 12450, limit: 50000 },
  searches: { used: 85, limit: -1 },
  plagiarismChecks: { used: 3, limit: 10 },
};

export const mockInvoices: MockInvoice[] = [
  {
    id: "inv_01",
    date: "2026-02-01",
    description: "Basic Plan — February 2026",
    amount: 1000,
  },
  {
    id: "inv_02",
    date: "2026-01-01",
    description: "Basic Plan — January 2026",
    amount: 1000,
  },
  {
    id: "inv_03",
    date: "2025-12-01",
    description: "Basic Plan — December 2025",
    amount: 1000,
  },
];

export const mockSlides: MockSlide[] = [
  {
    id: "slide_01",
    title: "CRISPR-Cas9 in Sickle Cell Disease",
    content: "A Systematic Review of Therapeutic Applications\n\nDr. Rahul Sharma\nAIIMS, New Delhi",
  },
  {
    id: "slide_02",
    title: "Introduction",
    content:
      "• SCD affects ~20 million globally\n• Single nucleotide substitution in HBB gene\n• CRISPR-Cas9 offers targeted correction\n• CTX001 (exa-cel) first approved CRISPR therapy (2023)",
  },
  {
    id: "slide_03",
    title: "Methodology",
    content:
      "• Systematic search: PubMed, Semantic Scholar, Cochrane\n• Keywords: CRISPR, sickle cell, gene editing, gene therapy\n• Inclusion: Clinical trials, 2019-2026\n• Quality: PRISMA 2020 guidelines",
  },
];

// Utility: format relative time
export function formatRelativeTime(isoDate: string): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}
