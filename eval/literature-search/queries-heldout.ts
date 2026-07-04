/**
 * HELD-OUT evaluation query set — Manan OS literature search.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  DO NOT TUNE ON THIS FILE. DO NOT REFERENCE THESE QUERY IDS IN RANKING CODE.
 * ─────────────────────────────────────────────────────────────────────────────
 * This set exists to measure generalization. It is kept STRICTLY SEPARATE from
 * the 87-query training benchmark in `queries.ts`, which the pipeline (its CYCLE
 * tables, entity-drift lists, trial-ranking heuristics, quality-ranker weights)
 * was iterated against. If any ranking heuristic ever hardcodes, special-cases,
 * or is fitted to a query id, DOI, PMID, or title in THIS file, the measurement
 * is contaminated and worthless.
 *
 * Enforced expectations for anyone touching the ranking path:
 *   - entity-drift.ts / quality-ranker.ts / trial-ranking.ts / query-planner.ts
 *     MUST NOT import from this file or match on these ids.
 *   - These queries are reported under their OWN run label (`--heldout`), never
 *     mixed into the 87q training aggregate.
 *
 * Coverage rationale: the training set is almost entirely clinical medicine, so
 * the ranking heuristics have EMPTY tables outside it. This set deliberately
 * over-weights NON-clinical domains (computer science / ML, molecular biology,
 * psychology, statistics, economics) where the heuristics have no priors, plus a
 * few clinical landmarks distinct from the training topics.
 *
 * GROUND TRUTH: every PMID/DOI below was confirmed this session against a neutral
 * source (Europe PMC for PMIDs; Crossref/DataCite/OpenAlex for DOIs) — see the
 * verification log in the accompanying handover. No id is asserted unseen. A
 * distinctive `titleIncludes` substring is included alongside each id as a
 * matcher backstop (identifiers a source returns can vary: arXiv vs publisher DOI).
 */

import type { MustHave } from "./queries";

export type HeldoutDomain =
  | "computer_science"
  | "biology"
  | "psychology"
  | "statistics"
  | "economics"
  | "medicine";

export interface HeldoutQuery {
  /** Stable slug (used in artifact filenames). MUST NOT appear in ranking code. */
  id: string;
  /** The user query as typed. */
  query: string;
  /** Domain, for reporting generalization SEPARATELY by field. */
  domain: HeldoutDomain;
  /** Free-form query class label (not the clinical QueryCategory union). */
  category: string;
  /** What the searcher actually wants. */
  intent: string;
  recencyBiased?: boolean;
  /** Landmark/expected papers (each matches any-of its identifiers). */
  mustHaves: MustHave[];
  notes?: string;
}

export const HELDOUT_QUERIES: HeldoutQuery[] = [
  // ── Computer science / ML ────────────────────────────────────────────────
  {
    id: "held-cs-transformers",
    query: "attention is all you need transformer architecture",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the seminal Transformer paper introducing self-attention.",
    mustHaves: [
      {
        label: "Attention Is All You Need (Vaswani et al., NeurIPS 2017)",
        dois: ["10.48550/arXiv.1706.03762"],
        titleIncludes: ["attention is all you need"],
      },
    ],
  },
  {
    id: "held-cs-resnet",
    query: "deep residual learning residual networks for image recognition",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the ResNet paper introducing residual connections.",
    mustHaves: [
      {
        label: "Deep Residual Learning for Image Recognition (He et al., CVPR 2016)",
        dois: ["10.1109/CVPR.2016.90"],
        titleIncludes: ["deep residual learning for image recognition"],
      },
    ],
  },
  {
    id: "held-cs-bert",
    query: "BERT bidirectional transformer pretraining for language understanding",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the BERT pretraining paper.",
    mustHaves: [
      {
        label: "BERT (Devlin et al., NAACL 2019)",
        dois: ["10.18653/v1/N19-1423"],
        titleIncludes: ["bert", "pre-training of deep bidirectional transformers"],
      },
    ],
  },
  {
    id: "held-cs-adam",
    query: "Adam adaptive moment estimation optimizer for stochastic gradient descent",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the Adam optimizer paper.",
    mustHaves: [
      {
        label: "Adam: A Method for Stochastic Optimization (Kingma & Ba, ICLR 2015)",
        dois: ["10.48550/arXiv.1412.6980"],
        titleIncludes: ["adam", "method for stochastic optimization"],
      },
    ],
  },
  {
    id: "held-cs-alexnet",
    query: "ImageNet classification with deep convolutional neural networks",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the AlexNet paper that launched modern deep learning for vision.",
    mustHaves: [
      {
        label: "AlexNet (Krizhevsky, Sutskever & Hinton, NeurIPS 2012)",
        dois: ["10.1145/3065386"],
        titleIncludes: ["imagenet classification with deep convolutional"],
      },
    ],
  },
  {
    id: "held-cs-gan",
    query: "generative adversarial networks GAN generator discriminator",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the original GAN paper.",
    mustHaves: [
      {
        label: "Generative Adversarial Nets (Goodfellow et al., NeurIPS 2014)",
        dois: ["10.48550/arXiv.1406.2661"],
        titleIncludes: ["generative adversarial"],
      },
    ],
  },
  {
    id: "held-cs-word2vec",
    query: "word2vec efficient estimation of word representations in vector space",
    domain: "computer_science",
    category: "landmark_method",
    intent: "Retrieve the word2vec word-embeddings paper.",
    mustHaves: [
      {
        label: "Efficient Estimation of Word Representations (Mikolov et al., 2013)",
        dois: ["10.48550/arXiv.1301.3781"],
        titleIncludes: ["efficient estimation of word representations"],
      },
    ],
  },

  // ── Molecular biology / genetics ─────────────────────────────────────────
  {
    id: "held-bio-dna-structure",
    query: "molecular structure of DNA double helix",
    domain: "biology",
    category: "landmark_discovery",
    intent: "Retrieve the Watson–Crick DNA double-helix paper.",
    mustHaves: [
      {
        label: "Molecular Structure of Nucleic Acids (Watson & Crick, Nature 1953)",
        pmids: ["13054692"],
        dois: ["10.1038/171737a0"],
        titleIncludes: ["molecular structure of nucleic acids"],
      },
    ],
  },
  {
    id: "held-bio-crispr",
    query: "CRISPR Cas9 programmable dual-RNA guided DNA endonuclease",
    domain: "biology",
    category: "landmark_method",
    intent: "Retrieve the Jinek/Doudna/Charpentier CRISPR-Cas9 paper.",
    mustHaves: [
      {
        label: "Programmable Dual-RNA–Guided DNA Endonuclease (Jinek et al., Science 2012)",
        pmids: ["22745249"],
        dois: ["10.1126/science.1225829"],
        titleIncludes: ["programmable dual-rna", "dna endonuclease in adaptive bacterial"],
      },
    ],
  },
  {
    id: "held-bio-human-genome",
    query: "initial sequencing and analysis of the human genome",
    domain: "biology",
    category: "landmark_discovery",
    intent: "Retrieve the Human Genome Project initial sequencing paper.",
    mustHaves: [
      {
        label: "Initial sequencing and analysis of the human genome (IHGSC, Nature 2001)",
        pmids: ["11237011"],
        dois: ["10.1038/35057062"],
        titleIncludes: ["initial sequencing and analysis of the human genome"],
      },
    ],
  },
  {
    id: "held-bio-rnai",
    query: "RNA interference double-stranded RNA gene silencing Caenorhabditis elegans",
    domain: "biology",
    category: "landmark_discovery",
    intent: "Retrieve the Fire & Mello RNAi paper.",
    mustHaves: [
      {
        label: "Potent and specific genetic interference by dsRNA (Fire & Mello, Nature 1998)",
        pmids: ["9486653"],
        dois: ["10.1038/35888"],
        titleIncludes: ["potent and specific genetic interference by double-stranded rna"],
      },
    ],
  },
  {
    id: "held-bio-blast",
    query: "BLAST basic local alignment search tool sequence similarity",
    domain: "biology",
    category: "landmark_method",
    intent: "Retrieve the original BLAST algorithm paper.",
    mustHaves: [
      {
        label: "Basic local alignment search tool (Altschul et al., JMB 1990)",
        pmids: ["2231712"],
        dois: ["10.1016/S0022-2836(05)80360-2"],
        titleIncludes: ["basic local alignment search tool"],
      },
    ],
  },
  {
    id: "held-bio-pcr",
    query: "polymerase chain reaction thermostable DNA polymerase amplification",
    domain: "biology",
    category: "landmark_method",
    intent: "Retrieve the Saiki et al. PCR-with-Taq paper.",
    mustHaves: [
      {
        label: "Primer-directed enzymatic amplification of DNA (Saiki et al., Science 1988)",
        pmids: ["2448875"],
        dois: ["10.1126/science.2448875"],
        titleIncludes: ["primer-directed enzymatic amplification of dna"],
      },
    ],
  },

  // ── Psychology / cognitive science ───────────────────────────────────────
  {
    id: "held-psy-prospect-theory",
    query: "prospect theory decision making under risk",
    domain: "psychology",
    category: "landmark_theory",
    intent: "Retrieve the Kahneman & Tversky prospect-theory paper.",
    mustHaves: [
      {
        label: "Prospect Theory: An Analysis of Decision under Risk (Kahneman & Tversky, 1979)",
        dois: ["10.2307/1914185"],
        titleIncludes: ["prospect theory"],
      },
    ],
  },
  {
    id: "held-psy-heuristics-biases",
    query: "judgment under uncertainty heuristics and biases",
    domain: "psychology",
    category: "landmark_theory",
    intent: "Retrieve the Tversky & Kahneman heuristics-and-biases paper.",
    mustHaves: [
      {
        label: "Judgment under Uncertainty: Heuristics and Biases (Tversky & Kahneman, Science 1974)",
        pmids: ["17835457"],
        dois: ["10.1126/science.185.4157.1124"],
        titleIncludes: ["judgment under uncertainty"],
      },
    ],
  },
  {
    id: "held-psy-magical-seven",
    query: "working memory capacity magical number seven plus or minus two",
    domain: "psychology",
    category: "landmark_theory",
    intent: "Retrieve Miller's 'Magical Number Seven' paper.",
    mustHaves: [
      {
        label: "The Magical Number Seven (Miller, Psychological Review 1956)",
        pmids: ["13310704"],
        dois: ["10.1037/h0043158"],
        titleIncludes: ["magical number seven"],
      },
    ],
  },
  {
    id: "held-psy-reproducibility",
    query: "reproducibility replication crisis psychological science",
    domain: "psychology",
    category: "landmark_study",
    intent: "Retrieve the Open Science Collaboration reproducibility study.",
    mustHaves: [
      {
        label: "Estimating the reproducibility of psychological science (OSC, Science 2015)",
        pmids: ["26315443"],
        dois: ["10.1126/science.aac4716"],
        titleIncludes: ["reproducibility of psychological science"],
      },
    ],
  },
  {
    id: "held-psy-ego-depletion",
    query: "ego depletion self-control as a limited resource",
    domain: "psychology",
    category: "landmark_study",
    intent: "Retrieve the Baumeister et al. ego-depletion paper.",
    mustHaves: [
      {
        label: "Ego depletion: Is the active self a limited resource? (Baumeister et al., JPSP 1998)",
        pmids: ["9599441"],
        dois: ["10.1037/0022-3514.74.5.1252"],
        titleIncludes: ["ego depletion"],
      },
    ],
  },

  // ── Statistics / methods ─────────────────────────────────────────────────
  {
    id: "held-stat-lasso",
    query: "lasso regression shrinkage and variable selection",
    domain: "statistics",
    category: "landmark_method",
    intent: "Retrieve Tibshirani's LASSO paper.",
    mustHaves: [
      {
        label: "Regression Shrinkage and Selection via the Lasso (Tibshirani, JRSS-B 1996)",
        dois: ["10.1111/j.2517-6161.1996.tb02080.x"],
        titleIncludes: ["regression shrinkage and selection via the lasso"],
      },
    ],
  },
  {
    id: "held-stat-random-forests",
    query: "random forests ensemble of decision trees",
    domain: "statistics",
    category: "landmark_method",
    intent: "Retrieve Breiman's Random Forests paper.",
    mustHaves: [
      {
        label: "Random Forests (Breiman, Machine Learning 2001)",
        dois: ["10.1023/A:1010933404324"],
        titleIncludes: ["random forests"],
      },
    ],
  },

  // ── Economics ────────────────────────────────────────────────────────────
  {
    id: "held-econ-lemons",
    query: "market for lemons asymmetric information adverse selection",
    domain: "economics",
    category: "landmark_theory",
    intent: "Retrieve Akerlof's 'The Market for Lemons'.",
    mustHaves: [
      {
        label: "The Market for Lemons (Akerlof, QJE 1970)",
        dois: ["10.2307/1879431"],
        titleIncludes: ["market for", "lemons"],
      },
    ],
  },

  // ── Clinical (distinct from the training topics) ─────────────────────────
  {
    id: "held-clin-sprint-bp",
    query: "intensive versus standard blood pressure control SPRINT trial",
    domain: "medicine",
    category: "trial",
    intent: "Retrieve the SPRINT intensive blood-pressure RCT.",
    mustHaves: [
      {
        label: "Intensive vs Standard Blood-Pressure Control, SPRINT (NEJM 2015)",
        pmids: ["26551272"],
        dois: ["10.1056/NEJMoa1511939"],
        titleIncludes: ["intensive versus standard blood-pressure control"],
      },
    ],
  },
  {
    id: "held-clin-4s-statin",
    query: "simvastatin cholesterol lowering survival coronary heart disease 4S",
    domain: "medicine",
    category: "trial",
    intent: "Retrieve the Scandinavian Simvastatin Survival Study (4S).",
    mustHaves: [
      {
        label: "Scandinavian Simvastatin Survival Study, 4S (Lancet 1994)",
        pmids: ["7968073"],
        dois: ["10.1016/S0140-6736(94)90566-5"],
        titleIncludes: ["randomised trial of cholesterol lowering in 4444 patients"],
      },
    ],
  },
  {
    id: "held-clin-ukpds33",
    query: "intensive blood glucose control type 2 diabetes UKPDS",
    domain: "medicine",
    category: "trial",
    intent: "Retrieve UKPDS 33 (intensive glucose control in type 2 diabetes).",
    mustHaves: [
      {
        label: "Intensive blood-glucose control, UKPDS 33 (Lancet 1998)",
        pmids: ["9742976"],
        dois: ["10.1016/S0140-6736(98)07019-6"],
        titleIncludes: ["intensive blood-glucose control with sulphonylureas or insulin"],
      },
    ],
  },
];

/** Held-out query ids, exported ONLY so tooling can assert separation — never so
 * ranking code can special-case them. */
export const HELDOUT_QUERY_IDS: ReadonlySet<string> = new Set(
  HELDOUT_QUERIES.map((q) => q.id)
);

export const HELDOUT_DOMAIN_COUNTS: Record<string, number> = HELDOUT_QUERIES.reduce(
  (acc, q) => {
    acc[q.domain] = (acc[q.domain] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
