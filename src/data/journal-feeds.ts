// ============================================================================
// ScholarSync — Curated Journal Feed Directory
// ~80 medical/scientific journals organized by specialty
// ============================================================================

import type { JournalDirectoryEntry } from "@/types/feed";

type AdditionalJournalFeed = Omit<JournalDirectoryEntry, "specialty"> & {
  specialty?: JournalDirectoryEntry["specialty"];
};

function buildJournalFeed(feed: AdditionalJournalFeed): JournalDirectoryEntry {
  return {
    specialty: "Other",
    ...feed,
  };
}

const MULTI_DOMAIN_JOURNAL_FEEDS: JournalDirectoryEntry[] = [
  // TODO(issue-25): Verify select publisher feed endpoints during founder QA, especially MDPI, Frontiers, and student-edited law review feeds.

  // ═══════════════════════════════════════════════════════════════════
  // MULTIDISCIPLINARY
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "PNAS",
    feedUrl: "https://www.pnas.org/action/showFeed?type=etoc&feed=rss&jc=pnas",
    siteUrl: "https://www.pnas.org",
    publisher: "National Academy of Sciences",
    category: "Multidisciplinary",
    description: "Proceedings of the National Academy of Sciences.",
  }),
  buildJournalFeed({
    title: "Nature Communications",
    feedUrl: "https://www.nature.com/ncomms.rss",
    siteUrl: "https://www.nature.com/ncomms/",
    publisher: "Springer Nature",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "PLOS ONE",
    feedUrl: "https://journals.plos.org/plosone/feed/atom",
    siteUrl: "https://journals.plos.org/plosone/",
    publisher: "PLOS",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "eLife",
    feedUrl: "https://elifesciences.org/rss/recent.xml",
    siteUrl: "https://elifesciences.org/",
    publisher: "eLife Sciences Publications",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "PeerJ",
    feedUrl: "https://peerj.com/articles/index.rss2",
    siteUrl: "https://peerj.com/",
    publisher: "PeerJ",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "Royal Society Open Science",
    feedUrl: "https://royalsocietypublishing.org/action/showFeed?type=etoc&feed=rss&jc=rsos",
    siteUrl: "https://royalsocietypublishing.org/journal/rsos",
    publisher: "The Royal Society",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "iScience",
    feedUrl: "https://www.cell.com/iscience/current.rss",
    siteUrl: "https://www.cell.com/iscience/home",
    publisher: "Cell Press",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "Science Advances",
    feedUrl: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=sciadv",
    siteUrl: "https://www.science.org/journal/sciadv",
    publisher: "AAAS",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "Proceedings of the Royal Society A",
    feedUrl: "https://royalsocietypublishing.org/action/showFeed?type=etoc&feed=rss&jc=rspa",
    siteUrl: "https://royalsocietypublishing.org/journal/rspa",
    publisher: "The Royal Society",
    category: "Multidisciplinary",
  }),
  buildJournalFeed({
    title: "Philosophical Transactions of the Royal Society A",
    feedUrl: "https://royalsocietypublishing.org/action/showFeed?type=etoc&feed=rss&jc=rsta",
    siteUrl: "https://royalsocietypublishing.org/journal/rsta",
    publisher: "The Royal Society",
    category: "Multidisciplinary",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // BIOLOGY
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Cell",
    feedUrl: "https://www.cell.com/cell/current.rss",
    siteUrl: "https://www.cell.com/cell/home",
    publisher: "Cell Press",
    category: "General Biology",
  }),
  buildJournalFeed({
    title: "Nature Genetics",
    feedUrl: "https://www.nature.com/ng.rss",
    siteUrl: "https://www.nature.com/ng/",
    publisher: "Springer Nature",
    category: "Genetics",
  }),
  buildJournalFeed({
    title: "PLOS Biology",
    feedUrl: "https://journals.plos.org/plosbiology/feed/atom",
    siteUrl: "https://journals.plos.org/plosbiology/",
    publisher: "PLOS",
    category: "General Biology",
  }),
  buildJournalFeed({
    title: "BMC Biology",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=12915",
    siteUrl: "https://bmcbiol.biomedcentral.com/",
    publisher: "Springer Nature",
    category: "General Biology",
  }),
  buildJournalFeed({
    title: "Genome Biology",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=13059",
    siteUrl: "https://genomebiology.biomedcentral.com/",
    publisher: "Springer Nature",
    category: "Genetics",
  }),
  buildJournalFeed({
    title: "Frontiers in Cell and Developmental Biology",
    feedUrl: "https://www.frontiersin.org/journals/cell-and-developmental-biology/rss",
    siteUrl: "https://www.frontiersin.org/journals/cell-and-developmental-biology",
    publisher: "Frontiers",
    category: "Cell Biology",
  }),
  buildJournalFeed({
    title: "Frontiers in Genetics",
    feedUrl: "https://www.frontiersin.org/journals/genetics/rss",
    siteUrl: "https://www.frontiersin.org/journals/genetics",
    publisher: "Frontiers",
    category: "Genetics",
  }),
  buildJournalFeed({
    title: "Frontiers in Ecology and Evolution",
    feedUrl: "https://www.frontiersin.org/journals/ecology-and-evolution/rss",
    siteUrl: "https://www.frontiersin.org/journals/ecology-and-evolution",
    publisher: "Frontiers",
    category: "Ecology",
  }),
  buildJournalFeed({
    title: "BMC Genomics",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=12864",
    siteUrl: "https://bmcgenomics.biomedcentral.com/",
    publisher: "Springer Nature",
    category: "Genetics",
  }),
  buildJournalFeed({
    title: "Microbiome",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=40168",
    siteUrl: "https://microbiomejournal.biomedcentral.com/",
    publisher: "Springer Nature",
    category: "Microbiology",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Nature Physics",
    feedUrl: "https://www.nature.com/nphys.rss",
    siteUrl: "https://www.nature.com/nphys/",
    publisher: "Springer Nature",
    category: "General Physics",
  }),
  buildJournalFeed({
    title: "Physical Review Letters",
    feedUrl: "https://feeds.aps.org/rss/recent/prl.xml",
    siteUrl: "https://journals.aps.org/prl/",
    publisher: "APS",
    category: "General Physics",
  }),
  buildJournalFeed({
    title: "Physical Review X",
    feedUrl: "https://feeds.aps.org/rss/recent/prx.xml",
    siteUrl: "https://journals.aps.org/prx/",
    publisher: "APS",
    category: "General Physics",
  }),
  buildJournalFeed({
    title: "arXiv Condensed Matter",
    feedUrl: "https://rss.arxiv.org/rss/cond-mat",
    siteUrl: "https://arxiv.org/archive/cond-mat",
    publisher: "arXiv",
    category: "Condensed Matter",
  }),
  buildJournalFeed({
    title: "arXiv High Energy Physics - Theory",
    feedUrl: "https://rss.arxiv.org/rss/hep-th",
    siteUrl: "https://arxiv.org/archive/hep-th",
    publisher: "arXiv",
    category: "High Energy Physics",
  }),
  buildJournalFeed({
    title: "arXiv High Energy Physics - Phenomenology",
    feedUrl: "https://rss.arxiv.org/rss/hep-ph",
    siteUrl: "https://arxiv.org/archive/hep-ph",
    publisher: "arXiv",
    category: "High Energy Physics",
  }),
  buildJournalFeed({
    title: "arXiv Astrophysics",
    feedUrl: "https://rss.arxiv.org/rss/astro-ph",
    siteUrl: "https://arxiv.org/archive/astro-ph",
    publisher: "arXiv",
    category: "Astrophysics",
  }),
  buildJournalFeed({
    title: "arXiv Quantum Physics",
    feedUrl: "https://rss.arxiv.org/rss/quant-ph",
    siteUrl: "https://arxiv.org/archive/quant-ph",
    publisher: "arXiv",
    category: "Quantum Physics",
  }),
  buildJournalFeed({
    title: "arXiv General Relativity and Quantum Cosmology",
    feedUrl: "https://rss.arxiv.org/rss/gr-qc",
    siteUrl: "https://arxiv.org/archive/gr-qc",
    publisher: "arXiv",
    category: "Astrophysics",
  }),
  buildJournalFeed({
    title: "arXiv Nuclear Theory",
    feedUrl: "https://rss.arxiv.org/rss/nucl-th",
    siteUrl: "https://arxiv.org/archive/nucl-th",
    publisher: "arXiv",
    category: "Nuclear Physics",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // CHEMISTRY
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Nature Chemistry",
    feedUrl: "https://www.nature.com/nchem.rss",
    siteUrl: "https://www.nature.com/nchem/",
    publisher: "Springer Nature",
    category: "General Chemistry",
  }),
  buildJournalFeed({
    title: "Frontiers in Chemistry",
    feedUrl: "https://www.frontiersin.org/journals/chemistry/rss",
    siteUrl: "https://www.frontiersin.org/journals/chemistry",
    publisher: "Frontiers",
    category: "General Chemistry",
  }),
  buildJournalFeed({
    title: "Molecules",
    feedUrl: "https://www.mdpi.com/rss/journal/molecules",
    siteUrl: "https://www.mdpi.com/journal/molecules",
    publisher: "MDPI",
    category: "Organic Chemistry",
  }),
  buildJournalFeed({
    title: "Chemistry",
    feedUrl: "https://www.mdpi.com/rss/journal/chemistry",
    siteUrl: "https://www.mdpi.com/journal/chemistry",
    publisher: "MDPI",
    category: "General Chemistry",
  }),
  buildJournalFeed({
    title: "Catalysts",
    feedUrl: "https://www.mdpi.com/rss/journal/catalysts",
    siteUrl: "https://www.mdpi.com/journal/catalysts",
    publisher: "MDPI",
    category: "Physical Chemistry",
  }),
  buildJournalFeed({
    title: "Polymers",
    feedUrl: "https://www.mdpi.com/rss/journal/polymers",
    siteUrl: "https://www.mdpi.com/journal/polymers",
    publisher: "MDPI",
    category: "Materials Chemistry",
  }),
  buildJournalFeed({
    title: "Nanomaterials",
    feedUrl: "https://www.mdpi.com/rss/journal/nanomaterials",
    siteUrl: "https://www.mdpi.com/journal/nanomaterials",
    publisher: "MDPI",
    category: "Materials Chemistry",
  }),
  buildJournalFeed({
    title: "Electrochem",
    feedUrl: "https://www.mdpi.com/rss/journal/electrochem",
    siteUrl: "https://www.mdpi.com/journal/electrochem",
    publisher: "MDPI",
    category: "Analytical Chemistry",
  }),
  buildJournalFeed({
    title: "Separations",
    feedUrl: "https://www.mdpi.com/rss/journal/separations",
    siteUrl: "https://www.mdpi.com/journal/separations",
    publisher: "MDPI",
    category: "Analytical Chemistry",
  }),
  buildJournalFeed({
    title: "BioChem",
    feedUrl: "https://www.mdpi.com/rss/journal/biochem",
    siteUrl: "https://www.mdpi.com/journal/biochem",
    publisher: "MDPI",
    category: "Chemical Biology",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // COMPUTER SCIENCE
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "arXiv Artificial Intelligence",
    feedUrl: "https://rss.arxiv.org/rss/cs.AI",
    siteUrl: "https://arxiv.org/archive/cs.AI",
    publisher: "arXiv",
    category: "AI & Machine Learning",
  }),
  buildJournalFeed({
    title: "arXiv Computation and Language",
    feedUrl: "https://rss.arxiv.org/rss/cs.CL",
    siteUrl: "https://arxiv.org/archive/cs.CL",
    publisher: "arXiv",
    category: "Natural Language Processing",
  }),
  buildJournalFeed({
    title: "arXiv Computer Vision and Pattern Recognition",
    feedUrl: "https://rss.arxiv.org/rss/cs.CV",
    siteUrl: "https://arxiv.org/archive/cs.CV",
    publisher: "arXiv",
    category: "Computer Vision",
  }),
  buildJournalFeed({
    title: "arXiv Cryptography and Security",
    feedUrl: "https://rss.arxiv.org/rss/cs.CR",
    siteUrl: "https://arxiv.org/archive/cs.CR",
    publisher: "arXiv",
    category: "Security",
  }),
  buildJournalFeed({
    title: "arXiv Software Engineering",
    feedUrl: "https://rss.arxiv.org/rss/cs.SE",
    siteUrl: "https://arxiv.org/archive/cs.SE",
    publisher: "arXiv",
    category: "Software Engineering",
  }),
  buildJournalFeed({
    title: "arXiv Human-Computer Interaction",
    feedUrl: "https://rss.arxiv.org/rss/cs.HC",
    siteUrl: "https://arxiv.org/archive/cs.HC",
    publisher: "arXiv",
    category: "Human-Computer Interaction",
  }),
  buildJournalFeed({
    title: "arXiv Databases",
    feedUrl: "https://rss.arxiv.org/rss/cs.DB",
    siteUrl: "https://arxiv.org/archive/cs.DB",
    publisher: "arXiv",
    category: "Systems",
  }),
  buildJournalFeed({
    title: "arXiv Robotics",
    feedUrl: "https://rss.arxiv.org/rss/cs.RO",
    siteUrl: "https://arxiv.org/archive/cs.RO",
    publisher: "arXiv",
    category: "Systems",
  }),
  buildJournalFeed({
    title: "arXiv Distributed, Parallel, and Cluster Computing",
    feedUrl: "https://rss.arxiv.org/rss/cs.DC",
    siteUrl: "https://arxiv.org/archive/cs.DC",
    publisher: "arXiv",
    category: "Systems",
  }),
  buildJournalFeed({
    title: "Journal of Machine Learning Research",
    feedUrl: "https://www.jmlr.org/jmlr.xml",
    siteUrl: "https://www.jmlr.org/",
    publisher: "Microtome Publishing",
    category: "AI & Machine Learning",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // ENGINEERING
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Frontiers in Robotics and AI",
    feedUrl: "https://www.frontiersin.org/journals/robotics-and-ai/rss",
    siteUrl: "https://www.frontiersin.org/journals/robotics-and-ai",
    publisher: "Frontiers",
    category: "Robotics & Control",
  }),
  buildJournalFeed({
    title: "Machines",
    feedUrl: "https://www.mdpi.com/rss/journal/machines",
    siteUrl: "https://www.mdpi.com/journal/machines",
    publisher: "MDPI",
    category: "Mechanical Engineering",
  }),
  buildJournalFeed({
    title: "Electronics",
    feedUrl: "https://www.mdpi.com/rss/journal/electronics",
    siteUrl: "https://www.mdpi.com/journal/electronics",
    publisher: "MDPI",
    category: "Electrical Engineering",
  }),
  buildJournalFeed({
    title: "Energies",
    feedUrl: "https://www.mdpi.com/rss/journal/energies",
    siteUrl: "https://www.mdpi.com/journal/energies",
    publisher: "MDPI",
    category: "Energy Engineering",
  }),
  buildJournalFeed({
    title: "Buildings",
    feedUrl: "https://www.mdpi.com/rss/journal/buildings",
    siteUrl: "https://www.mdpi.com/journal/buildings",
    publisher: "MDPI",
    category: "Civil Engineering",
  }),
  buildJournalFeed({
    title: "Infrastructures",
    feedUrl: "https://www.mdpi.com/rss/journal/infrastructures",
    siteUrl: "https://www.mdpi.com/journal/infrastructures",
    publisher: "MDPI",
    category: "Civil Engineering",
  }),
  buildJournalFeed({
    title: "Materials",
    feedUrl: "https://www.mdpi.com/rss/journal/materials",
    siteUrl: "https://www.mdpi.com/journal/materials",
    publisher: "MDPI",
    category: "Materials Engineering",
  }),
  buildJournalFeed({
    title: "Robotics",
    feedUrl: "https://www.mdpi.com/rss/journal/robotics",
    siteUrl: "https://www.mdpi.com/journal/robotics",
    publisher: "MDPI",
    category: "Robotics & Control",
  }),
  buildJournalFeed({
    title: "CivilEng",
    feedUrl: "https://www.mdpi.com/rss/journal/civileng",
    siteUrl: "https://www.mdpi.com/journal/civileng",
    publisher: "MDPI",
    category: "Civil Engineering",
  }),
  buildJournalFeed({
    title: "Engineering Proceedings",
    feedUrl: "https://www.mdpi.com/rss/journal/engproc",
    siteUrl: "https://www.mdpi.com/journal/engproc",
    publisher: "MDPI",
    category: "Electrical Engineering",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // MATHEMATICS
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "arXiv Algebraic Geometry",
    feedUrl: "https://rss.arxiv.org/rss/math.AG",
    siteUrl: "https://arxiv.org/archive/math.AG",
    publisher: "arXiv",
    category: "Geometry & Topology",
  }),
  buildJournalFeed({
    title: "arXiv Analysis of PDEs",
    feedUrl: "https://rss.arxiv.org/rss/math.AP",
    siteUrl: "https://arxiv.org/archive/math.AP",
    publisher: "arXiv",
    category: "Applied Mathematics",
  }),
  buildJournalFeed({
    title: "arXiv Combinatorics",
    feedUrl: "https://rss.arxiv.org/rss/math.CO",
    siteUrl: "https://arxiv.org/archive/math.CO",
    publisher: "arXiv",
    category: "Pure Mathematics",
  }),
  buildJournalFeed({
    title: "arXiv Probability",
    feedUrl: "https://rss.arxiv.org/rss/math.PR",
    siteUrl: "https://arxiv.org/archive/math.PR",
    publisher: "arXiv",
    category: "Probability & Statistics",
  }),
  buildJournalFeed({
    title: "arXiv Statistics Theory",
    feedUrl: "https://rss.arxiv.org/rss/math.ST",
    siteUrl: "https://arxiv.org/archive/math.ST",
    publisher: "arXiv",
    category: "Probability & Statistics",
  }),
  buildJournalFeed({
    title: "arXiv Numerical Analysis",
    feedUrl: "https://rss.arxiv.org/rss/math.NA",
    siteUrl: "https://arxiv.org/archive/math.NA",
    publisher: "arXiv",
    category: "Computational Mathematics",
  }),
  buildJournalFeed({
    title: "arXiv Optimization and Control",
    feedUrl: "https://rss.arxiv.org/rss/math.OC",
    siteUrl: "https://arxiv.org/archive/math.OC",
    publisher: "arXiv",
    category: "Applied Mathematics",
  }),
  buildJournalFeed({
    title: "arXiv Geometric Topology",
    feedUrl: "https://rss.arxiv.org/rss/math.GT",
    siteUrl: "https://arxiv.org/archive/math.GT",
    publisher: "arXiv",
    category: "Geometry & Topology",
  }),
  buildJournalFeed({
    title: "arXiv Number Theory",
    feedUrl: "https://rss.arxiv.org/rss/math.NT",
    siteUrl: "https://arxiv.org/archive/math.NT",
    publisher: "arXiv",
    category: "Algebra & Number Theory",
  }),
  buildJournalFeed({
    title: "Mathematics",
    feedUrl: "https://www.mdpi.com/rss/journal/mathematics",
    siteUrl: "https://www.mdpi.com/journal/mathematics",
    publisher: "MDPI",
    category: "Applied Mathematics",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // SOCIAL SCIENCES
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Frontiers in Sociology",
    feedUrl: "https://www.frontiersin.org/journals/sociology/rss",
    siteUrl: "https://www.frontiersin.org/journals/sociology",
    publisher: "Frontiers",
    category: "Sociology",
  }),
  buildJournalFeed({
    title: "Frontiers in Political Science",
    feedUrl: "https://www.frontiersin.org/journals/political-science/rss",
    siteUrl: "https://www.frontiersin.org/journals/political-science",
    publisher: "Frontiers",
    category: "Political Science",
  }),
  buildJournalFeed({
    title: "Frontiers in Communication",
    feedUrl: "https://www.frontiersin.org/journals/communication/rss",
    siteUrl: "https://www.frontiersin.org/journals/communication",
    publisher: "Frontiers",
    category: "Interdisciplinary Social Science",
  }),
  buildJournalFeed({
    title: "Social Sciences",
    feedUrl: "https://www.mdpi.com/rss/journal/socsci",
    siteUrl: "https://www.mdpi.com/journal/socsci",
    publisher: "MDPI",
    category: "Interdisciplinary Social Science",
  }),
  buildJournalFeed({
    title: "Societies",
    feedUrl: "https://www.mdpi.com/rss/journal/societies",
    siteUrl: "https://www.mdpi.com/journal/societies",
    publisher: "MDPI",
    category: "Sociology",
  }),
  buildJournalFeed({
    title: "Administrative Sciences",
    feedUrl: "https://www.mdpi.com/rss/journal/admsci",
    siteUrl: "https://www.mdpi.com/journal/admsci",
    publisher: "MDPI",
    category: "Social Policy",
  }),
  buildJournalFeed({
    title: "Behavioral Sciences",
    feedUrl: "https://www.mdpi.com/rss/journal/behavsci",
    siteUrl: "https://www.mdpi.com/journal/behavsci",
    publisher: "MDPI",
    category: "Interdisciplinary Social Science",
  }),
  buildJournalFeed({
    title: "Youth",
    feedUrl: "https://www.mdpi.com/rss/journal/youth",
    siteUrl: "https://www.mdpi.com/journal/youth",
    publisher: "MDPI",
    category: "Demography",
  }),
  buildJournalFeed({
    title: "Genealogy",
    feedUrl: "https://www.mdpi.com/rss/journal/genealogy",
    siteUrl: "https://www.mdpi.com/journal/genealogy",
    publisher: "MDPI",
    category: "Demography",
  }),
  buildJournalFeed({
    title: "SN Social Sciences",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=43545",
    siteUrl: "https://link.springer.com/journal/43545",
    publisher: "Springer Nature",
    category: "Interdisciplinary Social Science",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // ECONOMICS
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Economies",
    feedUrl: "https://www.mdpi.com/rss/journal/economies",
    siteUrl: "https://www.mdpi.com/journal/economies",
    publisher: "MDPI",
    category: "General Economics",
  }),
  buildJournalFeed({
    title: "Econometrics",
    feedUrl: "https://www.mdpi.com/rss/journal/econometrics",
    siteUrl: "https://www.mdpi.com/journal/econometrics",
    publisher: "MDPI",
    category: "Econometrics",
  }),
  buildJournalFeed({
    title: "Journal of Risk and Financial Management",
    feedUrl: "https://www.mdpi.com/rss/journal/jrfm",
    siteUrl: "https://www.mdpi.com/journal/jrfm",
    publisher: "MDPI",
    category: "Financial Economics",
  }),
  buildJournalFeed({
    title: "International Journal of Financial Studies",
    feedUrl: "https://www.mdpi.com/rss/journal/ijfs",
    siteUrl: "https://www.mdpi.com/journal/ijfs",
    publisher: "MDPI",
    category: "Financial Economics",
  }),
  buildJournalFeed({
    title: "Risks",
    feedUrl: "https://www.mdpi.com/rss/journal/risks",
    siteUrl: "https://www.mdpi.com/journal/risks",
    publisher: "MDPI",
    category: "Financial Economics",
  }),
  buildJournalFeed({
    title: "Businesses",
    feedUrl: "https://www.mdpi.com/rss/journal/businesses",
    siteUrl: "https://www.mdpi.com/journal/businesses",
    publisher: "MDPI",
    category: "Microeconomics",
  }),
  buildJournalFeed({
    title: "FinTech",
    feedUrl: "https://www.mdpi.com/rss/journal/fintech",
    siteUrl: "https://www.mdpi.com/journal/fintech",
    publisher: "MDPI",
    category: "Financial Economics",
  }),
  buildJournalFeed({
    title: "NBER Working Papers",
    feedUrl: "https://www.nber.org/rss/new.xml",
    siteUrl: "https://www.nber.org/papers",
    publisher: "NBER",
    category: "General Economics",
  }),
  buildJournalFeed({
    title: "arXiv Economics",
    feedUrl: "https://rss.arxiv.org/rss/q-fin.EC",
    siteUrl: "https://arxiv.org/archive/q-fin.EC",
    publisher: "arXiv",
    category: "Econometrics",
  }),
  buildJournalFeed({
    title: "Frontiers in Economics",
    feedUrl: "https://www.frontiersin.org/journals/economics/rss",
    siteUrl: "https://www.frontiersin.org/journals/economics",
    publisher: "Frontiers",
    category: "General Economics",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // PSYCHOLOGY
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Nature Human Behaviour",
    feedUrl: "https://www.nature.com/nathumbehav.rss",
    siteUrl: "https://www.nature.com/nathumbehav/",
    publisher: "Springer Nature",
    category: "General Psychology",
  }),
  buildJournalFeed({
    title: "BMC Psychology",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=40359",
    siteUrl: "https://bmcpsychology.biomedcentral.com/",
    publisher: "Springer Nature",
    category: "Clinical Psychology",
  }),
  buildJournalFeed({
    title: "Frontiers in Psychology",
    feedUrl: "https://www.frontiersin.org/journals/psychology/rss",
    siteUrl: "https://www.frontiersin.org/journals/psychology",
    publisher: "Frontiers",
    category: "General Psychology",
  }),
  buildJournalFeed({
    title: "Frontiers in Psychiatry",
    feedUrl: "https://www.frontiersin.org/journals/psychiatry/rss",
    siteUrl: "https://www.frontiersin.org/journals/psychiatry",
    publisher: "Frontiers",
    category: "Clinical Psychology",
  }),
  buildJournalFeed({
    title: "Frontiers in Human Neuroscience",
    feedUrl: "https://www.frontiersin.org/journals/human-neuroscience/rss",
    siteUrl: "https://www.frontiersin.org/journals/human-neuroscience",
    publisher: "Frontiers",
    category: "Neuroscience & Behavior",
  }),
  buildJournalFeed({
    title: "Psych",
    feedUrl: "https://www.mdpi.com/rss/journal/psych",
    siteUrl: "https://www.mdpi.com/journal/psych",
    publisher: "MDPI",
    category: "General Psychology",
  }),
  buildJournalFeed({
    title: "Brain Sciences",
    feedUrl: "https://www.mdpi.com/rss/journal/brainsci",
    siteUrl: "https://www.mdpi.com/journal/brainsci",
    publisher: "MDPI",
    category: "Neuroscience & Behavior",
  }),
  buildJournalFeed({
    title: "Adolescents",
    feedUrl: "https://www.mdpi.com/rss/journal/adolescents",
    siteUrl: "https://www.mdpi.com/journal/adolescents",
    publisher: "MDPI",
    category: "Developmental Psychology",
  }),
  buildJournalFeed({
    title: "Psychiatry International",
    feedUrl: "https://www.mdpi.com/rss/journal/psychiatryint",
    siteUrl: "https://www.mdpi.com/journal/psychiatryint",
    publisher: "MDPI",
    category: "Clinical Psychology",
  }),
  buildJournalFeed({
    title: "Frontiers in Cognition",
    feedUrl: "https://www.frontiersin.org/journals/cognition/rss",
    siteUrl: "https://www.frontiersin.org/journals/cognition",
    publisher: "Frontiers",
    category: "Cognitive Psychology",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // LAW
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Harvard Law Review",
    feedUrl: "https://harvardlawreview.org/feed/",
    siteUrl: "https://harvardlawreview.org/",
    publisher: "Harvard Law Review",
    category: "Constitutional Law",
  }),
  buildJournalFeed({
    title: "Stanford Law Review",
    feedUrl: "https://stanfordlawreview.org/feed/",
    siteUrl: "https://stanfordlawreview.org/",
    publisher: "Stanford Law Review",
    category: "Technology Law",
  }),
  buildJournalFeed({
    title: "Columbia Law Review",
    feedUrl: "https://columbialawreview.org/feed/",
    siteUrl: "https://columbialawreview.org/",
    publisher: "Columbia Law Review",
    category: "Administrative Law",
  }),
  buildJournalFeed({
    title: "Virginia Law Review",
    feedUrl: "https://virginialawreview.org/feed/",
    siteUrl: "https://virginialawreview.org/",
    publisher: "Virginia Law Review",
    category: "Constitutional Law",
  }),
  buildJournalFeed({
    title: "Michigan Law Review",
    feedUrl: "https://michiganlawreview.org/feed/",
    siteUrl: "https://michiganlawreview.org/",
    publisher: "Michigan Law Review",
    category: "Legal Theory",
  }),
  buildJournalFeed({
    title: "Georgetown Law Journal",
    feedUrl: "https://www.law.georgetown.edu/georgetown-law-journal/feed/",
    siteUrl: "https://www.law.georgetown.edu/georgetown-law-journal/",
    publisher: "Georgetown University Law Center",
    category: "International Law",
  }),
  buildJournalFeed({
    title: "Laws",
    feedUrl: "https://www.mdpi.com/rss/journal/laws",
    siteUrl: "https://www.mdpi.com/journal/laws",
    publisher: "MDPI",
    category: "International Law",
  }),
  buildJournalFeed({
    title: "Journal of Cybersecurity and Privacy",
    feedUrl: "https://www.mdpi.com/rss/journal/jcp",
    siteUrl: "https://www.mdpi.com/journal/jcp",
    publisher: "MDPI",
    category: "Technology Law",
  }),
  buildJournalFeed({
    title: "Journal of Criminal Law and Criminology",
    feedUrl: "https://scholarlycommons.law.northwestern.edu/jclc/recent.rss",
    siteUrl: "https://scholarlycommons.law.northwestern.edu/jclc/",
    publisher: "Northwestern University School of Law",
    category: "Criminal Law",
  }),
  buildJournalFeed({
    title: "Criminal Justice Ethics",
    feedUrl: "https://www.tandfonline.com/feed/rss/rcre20",
    siteUrl: "https://www.tandfonline.com/journals/rcre20",
    publisher: "Taylor & Francis",
    category: "Criminal Law",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // HUMANITIES
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Humanities",
    feedUrl: "https://www.mdpi.com/rss/journal/humanities",
    siteUrl: "https://www.mdpi.com/journal/humanities",
    publisher: "MDPI",
    category: "Literature",
  }),
  buildJournalFeed({
    title: "Philosophies",
    feedUrl: "https://www.mdpi.com/rss/journal/philosophies",
    siteUrl: "https://www.mdpi.com/journal/philosophies",
    publisher: "MDPI",
    category: "Philosophy",
  }),
  buildJournalFeed({
    title: "Histories",
    feedUrl: "https://www.mdpi.com/rss/journal/histories",
    siteUrl: "https://www.mdpi.com/journal/histories",
    publisher: "MDPI",
    category: "History",
  }),
  buildJournalFeed({
    title: "Religions",
    feedUrl: "https://www.mdpi.com/rss/journal/religions",
    siteUrl: "https://www.mdpi.com/journal/religions",
    publisher: "MDPI",
    category: "Religion",
  }),
  buildJournalFeed({
    title: "Arts",
    feedUrl: "https://www.mdpi.com/rss/journal/arts",
    siteUrl: "https://www.mdpi.com/journal/arts",
    publisher: "MDPI",
    category: "Art & Media Studies",
  }),
  buildJournalFeed({
    title: "Literature",
    feedUrl: "https://www.mdpi.com/rss/journal/literature",
    siteUrl: "https://www.mdpi.com/journal/literature",
    publisher: "MDPI",
    category: "Literature",
  }),
  buildJournalFeed({
    title: "Heritage",
    feedUrl: "https://www.mdpi.com/rss/journal/heritage",
    siteUrl: "https://www.mdpi.com/journal/heritage",
    publisher: "MDPI",
    category: "History",
  }),
  buildJournalFeed({
    title: "Frontiers in Digital Humanities",
    feedUrl: "https://www.frontiersin.org/journals/digital-humanities/rss",
    siteUrl: "https://www.frontiersin.org/journals/digital-humanities",
    publisher: "Frontiers",
    category: "Cultural Studies",
  }),
  buildJournalFeed({
    title: "Journalism and Media",
    feedUrl: "https://www.mdpi.com/rss/journal/journalmedia",
    siteUrl: "https://www.mdpi.com/journal/journalmedia",
    publisher: "MDPI",
    category: "Art & Media Studies",
  }),
  buildJournalFeed({
    title: "Frontiers in Philosophy",
    feedUrl: "https://www.frontiersin.org/journals/philosophy/rss",
    siteUrl: "https://www.frontiersin.org/journals/philosophy",
    publisher: "Frontiers",
    category: "Philosophy",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Frontiers in Education",
    feedUrl: "https://www.frontiersin.org/journals/education/rss",
    siteUrl: "https://www.frontiersin.org/journals/education",
    publisher: "Frontiers",
    category: "Learning Sciences",
  }),
  buildJournalFeed({
    title: "Education Sciences",
    feedUrl: "https://www.mdpi.com/rss/journal/education",
    siteUrl: "https://www.mdpi.com/journal/education",
    publisher: "MDPI",
    category: "Higher Education",
  }),
  buildJournalFeed({
    title: "International Journal of STEM Education",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=40594",
    siteUrl: "https://stemeducationjournal.springeropen.com/",
    publisher: "Springer Nature",
    category: "Learning Sciences",
  }),
  buildJournalFeed({
    title: "International Journal of Educational Technology in Higher Education",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=41239",
    siteUrl: "https://educationaltechnologyjournal.springeropen.com/",
    publisher: "Springer Nature",
    category: "Educational Technology",
  }),
  buildJournalFeed({
    title: "Smart Learning Environments",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=40561",
    siteUrl: "https://slejournal.springeropen.com/",
    publisher: "Springer Nature",
    category: "Educational Technology",
  }),
  buildJournalFeed({
    title: "Language Testing in Asia",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=40468",
    siteUrl: "https://languagetestingasia.springeropen.com/",
    publisher: "Springer Nature",
    category: "Assessment & Evaluation",
  }),
  buildJournalFeed({
    title: "Journal of Learning Analytics",
    feedUrl: "https://learning-analytics.info/index.php/JLA/gateway/plugin/WebFeedGatewayPlugin/rss2",
    siteUrl: "https://learning-analytics.info/index.php/JLA",
    publisher: "Society for Learning Analytics Research",
    category: "Assessment & Evaluation",
  }),
  buildJournalFeed({
    title: "Journal of Teacher Education",
    feedUrl: "https://journals.sagepub.com/action/showFeed?ui=0&mi=ehikzz&ai=2b4&jc=jtea&type=etoc&feed=rss",
    siteUrl: "https://journals.sagepub.com/home/jte",
    publisher: "SAGE Publications",
    category: "Teacher Education",
  }),
  buildJournalFeed({
    title: "Frontiers in Psychology (Educational Psychology)",
    feedUrl: "https://www.frontiersin.org/journals/psychology/sections/educational-psychology/rss",
    siteUrl: "https://www.frontiersin.org/journals/psychology/sections/educational-psychology",
    publisher: "Frontiers",
    category: "Educational Psychology",
  }),
  buildJournalFeed({
    title: "Higher Education",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=10734",
    siteUrl: "https://link.springer.com/journal/10734",
    publisher: "Springer Nature",
    category: "Higher Education",
  }),

  // ═══════════════════════════════════════════════════════════════════
  // ENVIRONMENTAL SCIENCE
  // ═══════════════════════════════════════════════════════════════════
  buildJournalFeed({
    title: "Nature Climate Change",
    feedUrl: "https://www.nature.com/nclimate.rss",
    siteUrl: "https://www.nature.com/nclimate/",
    publisher: "Springer Nature",
    category: "Climate Science",
  }),
  buildJournalFeed({
    title: "Frontiers in Climate",
    feedUrl: "https://www.frontiersin.org/journals/climate/rss",
    siteUrl: "https://www.frontiersin.org/journals/climate",
    publisher: "Frontiers",
    category: "Climate Science",
  }),
  buildJournalFeed({
    title: "Frontiers in Environmental Science",
    feedUrl: "https://www.frontiersin.org/journals/environmental-science/rss",
    siteUrl: "https://www.frontiersin.org/journals/environmental-science",
    publisher: "Frontiers",
    category: "Environmental Chemistry",
  }),
  buildJournalFeed({
    title: "Frontiers in Earth Science",
    feedUrl: "https://www.frontiersin.org/journals/earth-science/rss",
    siteUrl: "https://www.frontiersin.org/journals/earth-science",
    publisher: "Frontiers",
    category: "Earth Systems",
  }),
  buildJournalFeed({
    title: "Sustainability",
    feedUrl: "https://www.mdpi.com/rss/journal/sustainability",
    siteUrl: "https://www.mdpi.com/journal/sustainability",
    publisher: "MDPI",
    category: "Sustainability",
  }),
  buildJournalFeed({
    title: "Climate",
    feedUrl: "https://www.mdpi.com/rss/journal/climate",
    siteUrl: "https://www.mdpi.com/journal/climate",
    publisher: "MDPI",
    category: "Climate Science",
  }),
  buildJournalFeed({
    title: "Atmosphere",
    feedUrl: "https://www.mdpi.com/rss/journal/atmosphere",
    siteUrl: "https://www.mdpi.com/journal/atmosphere",
    publisher: "MDPI",
    category: "Climate Science",
  }),
  buildJournalFeed({
    title: "Water",
    feedUrl: "https://www.mdpi.com/rss/journal/water",
    siteUrl: "https://www.mdpi.com/journal/water",
    publisher: "MDPI",
    category: "Earth Systems",
  }),
  buildJournalFeed({
    title: "Remote Sensing",
    feedUrl: "https://www.mdpi.com/rss/journal/remotesensing",
    siteUrl: "https://www.mdpi.com/journal/remotesensing",
    publisher: "MDPI",
    category: "Earth Systems",
  }),
  buildJournalFeed({
    title: "Environmental Sciences Europe",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=12302",
    siteUrl: "https://enveurope.springeropen.com/",
    publisher: "Springer Nature",
    category: "Environmental Chemistry",
  }),
];

export const JOURNAL_FEEDS: JournalDirectoryEntry[] = [

  // ═══════════════════════════════════════════════════════════════════
  // GENERAL MEDICINE / INTERNAL MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "NEJM — Current Issue",
    feedUrl: "https://www.nejm.org/action/showFeed?jc=nejm&type=etoc&feed=rss",
    siteUrl: "https://www.nejm.org",
    publisher: "Massachusetts Medical Society",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0028-4793",
    description: "The most trusted, influential source of new medical knowledge and clinical best practices.",
  },
  {
    title: "The Lancet",
    feedUrl: "https://www.thelancet.com/rssfeed/lancet_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lancet",
    publisher: "Elsevier",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0140-6736",
    description: "Publishing the best science for better lives.",
  },
  {
    title: "JAMA",
    feedUrl: "https://jamanetwork.com/rss/site_3/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jama",
    publisher: "American Medical Association",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0098-7484",
    description: "The Journal of the American Medical Association — peer-reviewed medical journal.",
  },
  {
    title: "BMJ",
    feedUrl: "https://www.bmj.com/rss/recent.xml",
    siteUrl: "https://www.bmj.com",
    publisher: "BMJ Publishing Group",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0959-8138",
    description: "Leading general medical journal. Research, education, comment, and analysis.",
  },
  {
    title: "Annals of Internal Medicine",
    feedUrl: "https://www.acpjournals.org/action/showFeed?type=etoc&feed=rss&jc=aim",
    siteUrl: "https://www.acpjournals.org/journal/aim",
    publisher: "American College of Physicians",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0003-4819",
  },
  {
    title: "JAMA Internal Medicine",
    feedUrl: "https://jamanetwork.com/rss/site_17/73.xml",
    siteUrl: "https://jamanetwork.com/journals/jamainternalmedicine",
    publisher: "American Medical Association",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "2168-6106",
  },
  {
    title: "Nature Medicine",
    feedUrl: "https://www.nature.com/nm.rss",
    siteUrl: "https://www.nature.com/nm",
    publisher: "Springer Nature",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "1078-8956",
    description: "Biomedical research advancing clinical practice.",
  },
  {
    title: "PLOS Medicine",
    feedUrl: "https://journals.plos.org/plosmedicine/feed/atom",
    siteUrl: "https://journals.plos.org/plosmedicine",
    publisher: "PLOS",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "1549-1676",
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARDIOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Circulation",
    feedUrl: "https://www.ahajournals.org/action/showFeed?type=etoc&feed=rss&jc=circ",
    siteUrl: "https://www.ahajournals.org/journal/circ",
    publisher: "American Heart Association",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0009-7322",
    description: "Premier journal of the AHA, publishing cardiovascular research since 1950.",
  },
  {
    title: "European Heart Journal",
    feedUrl: "https://academic.oup.com/rss/site_5375/3236.xml",
    siteUrl: "https://academic.oup.com/eurheartj",
    publisher: "Oxford University Press / ESC",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0195-668X",
  },
  {
    title: "JACC",
    feedUrl: "https://www.jacc.org/action/showFeed?type=etoc&feed=rss&jc=jacc",
    siteUrl: "https://www.jacc.org/journal/jacc",
    publisher: "American College of Cardiology / Elsevier",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0735-1097",
    description: "Journal of the American College of Cardiology.",
  },
  {
    title: "JAMA Cardiology",
    feedUrl: "https://jamanetwork.com/rss/site_20/76.xml",
    siteUrl: "https://jamanetwork.com/journals/jamacardiology",
    publisher: "American Medical Association",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "2380-6583",
  },
  {
    title: "Circulation Research",
    feedUrl: "https://www.ahajournals.org/action/showFeed?type=etoc&feed=rss&jc=res",
    siteUrl: "https://www.ahajournals.org/journal/res",
    publisher: "American Heart Association",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0009-7330",
  },
  {
    title: "Nature Reviews Cardiology",
    feedUrl: "https://www.nature.com/nrcardio.rss",
    siteUrl: "https://www.nature.com/nrcardio",
    publisher: "Springer Nature",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "1759-5002",
  },
  {
    title: "JACC: Heart Failure",
    feedUrl: "https://www.jacc.org/action/showFeed?type=etoc&feed=rss&jc=heart-failure",
    siteUrl: "https://www.jacc.org/journal/heart-failure",
    publisher: "American College of Cardiology / Elsevier",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "2213-1779",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SURGERY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Annals of Surgery",
    feedUrl: "https://journals.lww.com/annalsofsurgery/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/annalsofsurgery",
    publisher: "Wolters Kluwer",
    category: "Surgery",
    specialty: "Surgery",
    issn: "0003-4932",
  },
  {
    title: "JAMA Surgery",
    feedUrl: "https://jamanetwork.com/rss/site_12/68.xml",
    siteUrl: "https://jamanetwork.com/journals/jamasurgery",
    publisher: "American Medical Association",
    category: "Surgery",
    specialty: "Surgery",
    issn: "2168-6254",
  },
  {
    title: "British Journal of Surgery",
    feedUrl: "https://academic.oup.com/rss/site_6337/advanceAccess_4087.xml",
    siteUrl: "https://academic.oup.com/bjs",
    publisher: "Oxford University Press",
    category: "Surgery",
    specialty: "Surgery",
    issn: "0007-1323",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PEDIATRICS
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Pediatrics",
    feedUrl: "https://jamanetwork.com/rss/site_14/70.xml",
    siteUrl: "https://jamanetwork.com/journals/jamapediatrics",
    publisher: "American Medical Association",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "2168-6203",
  },
  {
    title: "Pediatrics",
    feedUrl: "https://publications.aap.org/action/showFeed?type=etoc&feed=rss&jc=pediatrics",
    siteUrl: "https://publications.aap.org/pediatrics",
    publisher: "American Academy of Pediatrics",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "0031-4005",
  },
  {
    title: "The Lancet Child & Adolescent Health",
    feedUrl: "https://www.thelancet.com/rssfeed/lanchi_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanchi",
    publisher: "Elsevier",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "2352-4642",
  },
  {
    title: "Archives of Disease in Childhood",
    feedUrl: "https://adc.bmj.com/rss/recent.xml",
    siteUrl: "https://adc.bmj.com",
    publisher: "BMJ Publishing Group",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "0003-9888",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ONCOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Oncology",
    feedUrl: "https://jamanetwork.com/rss/site_19/75.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaoncology",
    publisher: "American Medical Association",
    category: "Oncology",
    specialty: "Internal Medicine",
    issn: "2374-2437",
  },
  {
    title: "The Lancet Oncology",
    feedUrl: "https://www.thelancet.com/rssfeed/lanonc_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanonc",
    publisher: "Elsevier",
    category: "Oncology",
    specialty: "Internal Medicine",
    issn: "1470-2045",
  },
  {
    title: "Nature Reviews Cancer",
    feedUrl: "https://www.nature.com/nrc.rss",
    siteUrl: "https://www.nature.com/nrc",
    publisher: "Springer Nature",
    category: "Oncology",
    specialty: "Internal Medicine",
    issn: "1474-175X",
  },

  // ═══════════════════════════════════════════════════════════════════
  // NEUROLOGY / PSYCHIATRY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Neurology",
    feedUrl: "https://jamanetwork.com/rss/site_15/71.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaneurology",
    publisher: "American Medical Association",
    category: "Neurology",
    specialty: "Internal Medicine",
    issn: "2168-6149",
  },
  {
    title: "The Lancet Neurology",
    feedUrl: "https://www.thelancet.com/rssfeed/laneur_current.xml",
    siteUrl: "https://www.thelancet.com/journals/laneur",
    publisher: "Elsevier",
    category: "Neurology",
    specialty: "Internal Medicine",
    issn: "1474-4422",
  },
  {
    title: "Nature Neuroscience",
    feedUrl: "https://www.nature.com/neuro.rss",
    siteUrl: "https://www.nature.com/neuro",
    publisher: "Springer Nature",
    category: "Neurology",
    specialty: "Internal Medicine",
    issn: "1097-6256",
  },
  {
    title: "JAMA Psychiatry",
    feedUrl: "https://jamanetwork.com/rss/site_16/72.xml",
    siteUrl: "https://jamanetwork.com/journals/jamapsychiatry",
    publisher: "American Medical Association",
    category: "Psychiatry",
    specialty: "Psychiatry",
    issn: "2168-622X",
  },
  {
    title: "The Lancet Psychiatry",
    feedUrl: "https://www.thelancet.com/rssfeed/lanpsy_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanpsy",
    publisher: "Elsevier",
    category: "Psychiatry",
    specialty: "Psychiatry",
    issn: "2215-0366",
  },

  // ═══════════════════════════════════════════════════════════════════
  // RADIOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Radiology",
    feedUrl: "https://pubs.rsna.org/action/showFeed?type=etoc&feed=rss&jc=radiology",
    siteUrl: "https://pubs.rsna.org/journal/radiology",
    publisher: "RSNA",
    category: "Radiology",
    specialty: "Radiology",
    issn: "0033-8419",
  },
  {
    title: "JAMA Radiology (Diagnostic Imaging)",
    feedUrl: "https://jamanetwork.com/rss/site_192/184.xml",
    siteUrl: "https://jamanetwork.com/journals/jama/diagnostic-imaging",
    publisher: "American Medical Association",
    category: "Radiology",
    specialty: "Radiology",
  },
  {
    title: "European Radiology",
    feedUrl: "https://link.springer.com/search.rss?search-within=Journal&facet-journal-id=330&query=",
    siteUrl: "https://link.springer.com/journal/330",
    publisher: "Springer Nature",
    category: "Radiology",
    specialty: "Radiology",
    issn: "0938-7994",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ORTHOPEDICS
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Journal of Bone & Joint Surgery",
    feedUrl: "https://journals.lww.com/jbjsjournal/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/jbjsjournal",
    publisher: "Wolters Kluwer",
    category: "Orthopedics",
    specialty: "Orthopedics",
    issn: "0021-9355",
  },
  {
    title: "Clinical Orthopaedics and Related Research",
    feedUrl: "https://journals.lww.com/clinorthop/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/clinorthop",
    publisher: "Wolters Kluwer",
    category: "Orthopedics",
    specialty: "Orthopedics",
    issn: "0009-921X",
  },

  // ═══════════════════════════════════════════════════════════════════
  // DERMATOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Dermatology",
    feedUrl: "https://jamanetwork.com/rss/site_214/187.xml",
    siteUrl: "https://jamanetwork.com/journals/jamadermatology",
    publisher: "American Medical Association",
    category: "Dermatology",
    specialty: "Dermatology",
    issn: "2168-6068",
  },
  {
    title: "British Journal of Dermatology",
    feedUrl: "https://academic.oup.com/rss/site_5367/3228.xml",
    siteUrl: "https://academic.oup.com/bjd",
    publisher: "Oxford University Press",
    category: "Dermatology",
    specialty: "Dermatology",
    issn: "0007-0963",
  },

  // ═══════════════════════════════════════════════════════════════════
  // OPHTHALMOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Ophthalmology",
    feedUrl: "https://jamanetwork.com/rss/site_159/174.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaophthalmology",
    publisher: "American Medical Association",
    category: "Ophthalmology",
    specialty: "Ophthalmology",
    issn: "2168-6165",
  },
  {
    title: "Ophthalmology",
    feedUrl: "https://www.aaojournal.org/action/showFeed?type=etoc&feed=rss&jc=ophtha",
    siteUrl: "https://www.aaojournal.org",
    publisher: "AAO / Elsevier",
    category: "Ophthalmology",
    specialty: "Ophthalmology",
    issn: "0161-6420",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ENT (OTOLARYNGOLOGY)
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Otolaryngology — Head & Neck Surgery",
    feedUrl: "https://jamanetwork.com/rss/site_18/74.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaotolaryngology",
    publisher: "American Medical Association",
    category: "Otolaryngology",
    specialty: "ENT",
    issn: "2168-6181",
  },
  {
    title: "The Laryngoscope",
    feedUrl: "https://onlinelibrary.wiley.com/action/showFeed?jc=15314995&type=etoc&feed=rss",
    siteUrl: "https://onlinelibrary.wiley.com/journal/15314995",
    publisher: "Wiley",
    category: "Otolaryngology",
    specialty: "ENT",
    issn: "0023-852X",
  },

  // ═══════════════════════════════════════════════════════════════════
  // OBSTETRICS & GYNECOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Obstetrics & Gynecology",
    feedUrl: "https://journals.lww.com/greenjournal/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/greenjournal",
    publisher: "Wolters Kluwer / ACOG",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics & Gynecology",
    issn: "0029-7844",
  },
  {
    title: "The Lancet — Obstetrics, Gynaecology & Women's Health",
    feedUrl: "https://www.thelancet.com/rssfeed/lanogw_current.xml",
    siteUrl: "https://www.thelancet.com",
    publisher: "Elsevier",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics & Gynecology",
  },
  {
    title: "BJOG",
    feedUrl: "https://onlinelibrary.wiley.com/action/showFeed?jc=14710528&type=etoc&feed=rss",
    siteUrl: "https://onlinelibrary.wiley.com/journal/14710528",
    publisher: "Wiley / RCOG",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics & Gynecology",
    issn: "1470-0328",
  },

  // ═══════════════════════════════════════════════════════════════════
  // EMERGENCY MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Annals of Emergency Medicine",
    feedUrl: "https://www.annemergmed.com/action/showFeed?type=etoc&feed=rss&jc=ymem",
    siteUrl: "https://www.annemergmed.com",
    publisher: "ACEP / Elsevier",
    category: "Emergency Medicine",
    specialty: "Emergency Medicine",
    issn: "0196-0644",
  },
  {
    title: "Emergency Medicine Journal",
    feedUrl: "https://emj.bmj.com/rss/recent.xml",
    siteUrl: "https://emj.bmj.com",
    publisher: "BMJ Publishing Group",
    category: "Emergency Medicine",
    specialty: "Emergency Medicine",
    issn: "1472-0205",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANESTHESIOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Anesthesiology",
    feedUrl: "https://journals.lww.com/anesthesiology/_layouts/OAKS.Journals/feed.aspx?FeedType=LatestArticles",
    siteUrl: "https://pubs.asahq.org/anesthesiology",
    publisher: "ASA / Wolters Kluwer",
    category: "Anesthesiology",
    specialty: "Anesthesiology",
    issn: "0003-3022",
  },
  {
    title: "British Journal of Anaesthesia",
    feedUrl: "https://academic.oup.com/rss/site_5285/3151.xml",
    siteUrl: "https://academic.oup.com/bja",
    publisher: "Oxford University Press",
    category: "Anesthesiology",
    specialty: "Anesthesiology",
    issn: "0007-0912",
  },

  // ═══════════════════════════════════════════════════════════════════
  // INFECTIOUS DISEASE / MICROBIOLOGY / PATHOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Lancet Infectious Diseases",
    feedUrl: "https://www.thelancet.com/rssfeed/laninf_current.xml",
    siteUrl: "https://www.thelancet.com/journals/laninf",
    publisher: "Elsevier",
    category: "Infectious Disease",
    specialty: "Microbiology",
    issn: "1473-3099",
  },
  {
    title: "Clinical Infectious Diseases",
    feedUrl: "https://academic.oup.com/rss/site_5301/3167.xml",
    siteUrl: "https://academic.oup.com/cid",
    publisher: "Oxford University Press / IDSA",
    category: "Infectious Disease",
    specialty: "Microbiology",
    issn: "1058-4838",
  },
  {
    title: "Nature Microbiology",
    feedUrl: "https://www.nature.com/nmicrobiol.rss",
    siteUrl: "https://www.nature.com/nmicrobiol",
    publisher: "Springer Nature",
    category: "Microbiology",
    specialty: "Microbiology",
    issn: "2058-5276",
  },
  {
    title: "American Journal of Clinical Pathology",
    feedUrl: "https://academic.oup.com/rss/site_5269/3135.xml",
    siteUrl: "https://academic.oup.com/ajcp",
    publisher: "Oxford University Press",
    category: "Pathology",
    specialty: "Pathology",
    issn: "0002-9173",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PHARMACOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Clinical Pharmacology & Therapeutics",
    feedUrl: "https://ascpt.onlinelibrary.wiley.com/action/showFeed?jc=15326535&type=etoc&feed=rss",
    siteUrl: "https://ascpt.onlinelibrary.wiley.com/journal/15326535",
    publisher: "Wiley / ASCPT",
    category: "Pharmacology",
    specialty: "Pharmacology",
    issn: "0009-9236",
  },
  {
    title: "Nature Reviews Drug Discovery",
    feedUrl: "https://www.nature.com/nrd.rss",
    siteUrl: "https://www.nature.com/nrd",
    publisher: "Springer Nature",
    category: "Pharmacology",
    specialty: "Pharmacology",
    issn: "1474-1776",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PUBLIC HEALTH / COMMUNITY MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Lancet Public Health",
    feedUrl: "https://www.thelancet.com/rssfeed/lanpub_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanpub",
    publisher: "Elsevier",
    category: "Public Health",
    specialty: "Community Medicine",
    issn: "2468-2667",
  },
  {
    title: "The Lancet Global Health",
    feedUrl: "https://www.thelancet.com/rssfeed/langlo_current.xml",
    siteUrl: "https://www.thelancet.com/journals/langlo",
    publisher: "Elsevier",
    category: "Public Health",
    specialty: "Community Medicine",
    issn: "2214-109X",
  },
  {
    title: "American Journal of Public Health",
    feedUrl: "https://ajph.aphapublications.org/action/showFeed?type=etoc&feed=rss&jc=ajph",
    siteUrl: "https://ajph.aphapublications.org",
    publisher: "APHA",
    category: "Public Health",
    specialty: "Community Medicine",
    issn: "0090-0036",
  },

  // ═══════════════════════════════════════════════════════════════════
  // BASIC SCIENCES (Anatomy, Physiology, Biochemistry)
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Nature",
    feedUrl: "https://www.nature.com/nature.rss",
    siteUrl: "https://www.nature.com/nature",
    publisher: "Springer Nature",
    category: "General Science",
    specialty: "Other",
    issn: "0028-0836",
    description: "International journal of science publishing peer-reviewed research across all fields.",
  },
  {
    title: "Science",
    feedUrl: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
    siteUrl: "https://www.science.org/journal/science",
    publisher: "AAAS",
    category: "General Science",
    specialty: "Other",
    issn: "0036-8075",
  },
  {
    title: "Cell",
    feedUrl: "https://www.cell.com/cell/current.rss",
    siteUrl: "https://www.cell.com/cell/home",
    publisher: "Cell Press / Elsevier",
    category: "Cell Biology",
    specialty: "Biochemistry",
    issn: "0092-8674",
  },
  {
    title: "Nature Cell Biology",
    feedUrl: "https://www.nature.com/ncb.rss",
    siteUrl: "https://www.nature.com/ncb",
    publisher: "Springer Nature",
    category: "Cell Biology",
    specialty: "Biochemistry",
    issn: "1465-7392",
  },
  {
    title: "Physiological Reviews",
    feedUrl: "https://journals.physiology.org/action/showFeed?type=etoc&feed=rss&jc=physrev",
    siteUrl: "https://journals.physiology.org/journal/physrev",
    publisher: "American Physiological Society",
    category: "Physiology",
    specialty: "Physiology",
    issn: "0031-9333",
  },
  {
    title: "Journal of Anatomy",
    feedUrl: "https://onlinelibrary.wiley.com/action/showFeed?jc=14697580&type=etoc&feed=rss",
    siteUrl: "https://onlinelibrary.wiley.com/journal/14697580",
    publisher: "Wiley",
    category: "Anatomy",
    specialty: "Anatomy",
    issn: "0021-8782",
  },

  // ═══════════════════════════════════════════════════════════════════
  // RESEARCH METHODS / EVIDENCE-BASED MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Cochrane Database of Systematic Reviews",
    feedUrl: "https://www.cochranelibrary.com/cdsr/table-of-contents/rss.xml",
    siteUrl: "https://www.cochranelibrary.com",
    publisher: "Cochrane",
    category: "Evidence-Based Medicine",
    specialty: "Other",
    issn: "1469-493X",
  },
  {
    title: "Systematic Reviews",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=13643",
    siteUrl: "https://systematicreviewsjournal.biomedcentral.com",
    publisher: "BioMed Central / Springer Nature",
    category: "Research Methods",
    specialty: "Other",
    issn: "2046-4053",
  },
  {
    title: "Trials",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=13063",
    siteUrl: "https://trialsjournal.biomedcentral.com",
    publisher: "BioMed Central / Springer Nature",
    category: "Research Methods",
    specialty: "Other",
    issn: "1745-6215",
  },

  // ═══════════════════════════════════════════════════════════════════
  // NEPHROLOGY / ENDOCRINOLOGY / PULMONOLOGY (cross-specialty)
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Lancet Diabetes & Endocrinology",
    feedUrl: "https://www.thelancet.com/rssfeed/landia_current.xml",
    siteUrl: "https://www.thelancet.com/journals/landia",
    publisher: "Elsevier",
    category: "Endocrinology",
    specialty: "Internal Medicine",
    issn: "2213-8587",
  },
  {
    title: "Kidney International",
    feedUrl: "https://www.kidney-international.org/action/showFeed?type=etoc&feed=rss&jc=kint",
    siteUrl: "https://www.kidney-international.org",
    publisher: "Elsevier / ISN",
    category: "Nephrology",
    specialty: "Internal Medicine",
    issn: "0085-2538",
  },
  {
    title: "The Lancet Respiratory Medicine",
    feedUrl: "https://www.thelancet.com/rssfeed/lanres_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanres",
    publisher: "Elsevier",
    category: "Pulmonology",
    specialty: "Internal Medicine",
    issn: "2213-2600",
  },
  {
    title: "The Lancet Gastroenterology & Hepatology",
    feedUrl: "https://www.thelancet.com/rssfeed/langas_current.xml",
    siteUrl: "https://www.thelancet.com/journals/langas",
    publisher: "Elsevier",
    category: "Gastroenterology",
    specialty: "Internal Medicine",
    issn: "2468-1253",
  },
  {
    title: "The Lancet Rheumatology",
    feedUrl: "https://www.thelancet.com/rssfeed/lanrhe_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanrhe",
    publisher: "Elsevier",
    category: "Rheumatology",
    specialty: "Internal Medicine",
    issn: "2665-9913",
  },

  // ═══════════════════════════════════════════════════════════════════
  // FORENSIC MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Forensic Science International",
    feedUrl: "https://rss.sciencedirect.com/publication/science/03790738",
    siteUrl: "https://www.sciencedirect.com/journal/forensic-science-international",
    publisher: "Elsevier",
    category: "Forensic Medicine",
    specialty: "Forensic Medicine",
    issn: "0379-0738",
  },

  // ═══════════════════════════════════════════════════════════════════
  // OPEN ACCESS / MULTIDISCIPLINARY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "BMC Medicine",
    feedUrl: "https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=12916",
    siteUrl: "https://bmcmedicine.biomedcentral.com",
    publisher: "BioMed Central / Springer Nature",
    category: "General Medicine",
    specialty: "Other",
    issn: "1741-7015",
  },
  {
    title: "Scientific Reports — Health Sciences",
    feedUrl: "https://www.nature.com/subjects/health-sciences.rss",
    siteUrl: "https://www.nature.com/srep",
    publisher: "Springer Nature",
    category: "General Science",
    specialty: "Other",
    issn: "2045-2322",
  },
  ...MULTI_DOMAIN_JOURNAL_FEEDS,
];

// ═══════════════════════════════════════════════════════════════════════
// Category list derived from the data
// ═══════════════════════════════════════════════════════════════════════

export const FEED_CATEGORIES = [
  ...new Set(JOURNAL_FEEDS.map((f) => f.category)),
].sort();

// ═══════════════════════════════════════════════════════════════════════
// Specialty list derived from the data
// ═══════════════════════════════════════════════════════════════════════

export const FEED_SPECIALTIES = [
  ...new Set(JOURNAL_FEEDS.map((f) => f.specialty)),
].sort();
