# Execution Prompt — Issue #25: Content Curation — All 15 Domain Configs

## FOR CODEX — Tag @codex on Issue #25 with: "Read and execute docs/multi-domain/EXEC_PROMPT_ISSUE_25.md"

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b feature/issue-25-content-curation
```

All work happens on this branch. When done, push and create a PR targeting main.

---

Read this entire prompt before writing any code.

## CONTEXT

The Domain Registry architecture is on main. Medicine and multidisciplinary configs exist. This issue creates the remaining 13 domain configs and curates all content: journal feeds, poster templates, LaTeX templates, mentor personas, evidence hierarchies, perspective templates, and more.

Read:
- `src/lib/search/domains/medicine.ts` — the TEMPLATE. Every new domain config follows this exact shape.
- `src/lib/search/domains/multidisciplinary.ts` — the generic fallback
- `src/lib/search/domains/types.ts` — DomainConfig interface
- `src/lib/search/domains/registry.ts` — where to register new configs
- `src/data/journal-feeds.ts` — existing medical journal feeds (the pattern for new entries)
- `src/data/latex-templates.ts` — existing templates
- `src/types/poster.ts` — poster template structure
- `docs/multi-domain/GRILL_DECISIONS.md` — all 23 decisions

## CRITICAL REQUIREMENT: BEST FOOT FORWARD

The founder's explicit instruction: "If you're doing it, put your best foot forward. Don't come up with a cheap-looking bad product." Every domain must feel purpose-built, not generic. This means:

- **15-30 REAL journals per domain** with working RSS/Atom feed URLs
- **Evidence hierarchies that match each field's actual conventions**
- **Mentor personas that reference the correct reporting guidelines per field**
- **Poster templates with section structures that match field conventions**
- **LaTeX templates from actual journals in that field**

## WHAT TO BUILD

### Step 1: Create 13 Domain Config Files

Create one file per domain in `src/lib/search/domains/`:

```
physics.ts
chemistry.ts
computer-science.ts
engineering.ts
mathematics.ts
social-sciences.ts
economics.ts
psychology.ts
law.ts
humanities.ts
education.ts
environmental.ts
biology.ts
```

Each file exports a `DomainConfig` object following the EXACT structure of `medicine.ts`. Here are the specifics per domain:

---

#### physics.ts

```typescript
{
  id: "physics",
  label: "Physics & Astronomy",
  description: "Theoretical physics, experimental physics, astrophysics, condensed matter",

  sources: ["arxiv", "semantic_scholar", "openalex"],

  personas: {
    librarian: "You are a physics research librarian specializing in academic database search optimization.\n\nFor arXiv: Use category prefixes (hep-th, cond-mat, astro-ph, quant-ph). Use field search: ti: (title), au: (author), abs: (abstract).\nFor Semantic Scholar: Use natural language, conceptual descriptions.\nFor OpenAlex: Use concept-based keywords with synonyms.",
    researcher: "You are a physics research strategist specializing in comprehensive literature search across theoretical, experimental, and computational physics.",
    textbook: "You are a physics textbook. Write a brief, factual 2-3 sentence answer. Use precise physics terminology and SI units. State facts directly.",
  },

  querySyntaxHints: "For arXiv: Use category prefixes like hep-th (high-energy theory), cond-mat (condensed matter), astro-ph (astrophysics), quant-ph (quantum physics). Use field prefixes: ti: (title), au: (author), abs: (abstract).\nFor Semantic Scholar: Use natural language.\nFor OpenAlex: Use concept-based keywords.",

  queryExample: 'User: "What are the latest developments in topological insulators?"\narXiv: ti:"topological insulator" OR abs:"topological insulator" AND cat:cond-mat.mes-hall\nSemantic Scholar: topological insulators recent developments band structure surface states\nOpenAlex: topological insulators band topology surface states quantum materials',

  evidenceHierarchy: [
    { level: "I", label: "Peer-Reviewed Journal Article", studyTypes: ["journal_article"], color: "emerald" },
    { level: "II", label: "Conference Proceedings (Refereed)", studyTypes: ["conference_paper"], color: "sky" },
    { level: "III", label: "Preprint (arXiv)", studyTypes: ["preprint"], color: "amber" },
    { level: "IV", label: "Thesis / Technical Report", studyTypes: ["thesis", "technical_report"], color: "orange" },
    { level: "V", label: "Working Paper / Other", studyTypes: ["working_paper", "review", "editorial", "other"], color: "slate" },
  ],

  studyTypePatterns: [
    { studyType: "review", patterns: ["\\breview\\b", "\\bsurvey\\b", "\\boverview\\b"] },
    { studyType: "preprint", patterns: ["\\barxiv\\b", "\\bpreprint\\b"] },
    { studyType: "conference_paper", patterns: ["\\bproceedings\\b", "\\bconference\\b", "\\bworkshop\\b"] },
    { studyType: "thesis", patterns: ["\\bthesis\\b", "\\bdissertation\\b"] },
  ],

  filterOptions: [
    { value: "journal_article", label: "Journal Article" },
    { value: "conference_paper", label: "Conference Paper" },
    { value: "preprint", label: "Preprint" },
    { value: "review", label: "Review / Survey" },
    { value: "thesis", label: "Thesis" },
    { value: "other", label: "Other" },
  ],

  synonymMap: [],  // Physics doesn't have a curated synonym map yet

  useProvenDeepResearch: false,
  perspectiveTemplates: [
    { name: "Theoretical Foundations", description: "Core theoretical framework and mathematical formalism", queryTemplates: ["${topic} theoretical framework formalism", "${topic} theory mathematical model"], expectedStudyTypes: ["journal_article"] },
    { name: "Experimental Verification", description: "Experimental evidence and measurements", queryTemplates: ["${topic} experimental measurement observation", "${topic} experimental results verification data"], expectedStudyTypes: ["journal_article"] },
    { name: "Computational Methods", description: "Numerical simulations and computational approaches", queryTemplates: ["${topic} simulation computational numerical method", "${topic} Monte Carlo density functional calculation"], expectedStudyTypes: ["journal_article", "preprint"] },
    { name: "Applications & Technology", description: "Practical applications and technological impact", queryTemplates: ["${topic} application technology device", "${topic} practical implementation engineering"], expectedStudyTypes: ["journal_article"] },
    { name: "Recent Breakthroughs", description: "Latest developments and discoveries", queryTemplates: ["${topic} recent discovery breakthrough 2024 2025", "${topic} novel finding new result"], expectedStudyTypes: ["journal_article", "preprint"] },
    { name: "Review & Synthesis", description: "Review articles and status reports", queryTemplates: ["${topic} review status report progress", "${topic} survey overview state of the art"], expectedStudyTypes: ["review"] },
  ],

  researchFramework: null,

  useProvenGuidance: false,
  guidanceContext: {
    targetReader: "physics graduate student, postdoc, or professor",
    reportingGuidelines: ["APS Style Guide", "Nature Physics author guidelines", "IUPAP recommendations"],
    writingConventions: "Use SI units throughout. Report uncertainties as ±. Use LaTeX notation for equations. Cite using numerical references [1], [2]. Present data with appropriate significant figures.",
    documentTypes: ["original_article", "review_article", "thesis", "book_chapter", "letter"],
  },

  journalCategories: ["General Physics", "Condensed Matter", "High Energy Physics", "Astrophysics", "Quantum Physics", "Optics", "Nuclear Physics"],

  feedsSummaryPrompt: "Generate a research summary in exactly 3 sentences:\n1. What was studied (system, method, theoretical framework)\n2. What was found (key measurements, predictions, or calculations with uncertainties)\n3. What it means for the field (implications for theory or experiment)\n\nInclude key numbers with units and uncertainties where available.\nDo NOT start with \"This study...\" — lead with the finding.\nThen output exactly 3 suggested follow-up questions.",

  presentationStudyDesigns: "theoretical|experimental|computational|observational|simulation|review|other",

  calloutType: { id: "experimental", label: "Experimental Note" },

  posterTemplates: ["theoretical_analysis", "experimental_results", "computational_study", "basic_science"],

  features: {
    systematicReview: false,
    picoExtraction: false,
    clinicalTrialsSearch: false,
    presentationTypes: ["thesis_defense", "conference", "classroom", "general", "grant_presentation", "poster_session", "lab_meeting", "departmental_seminar"],
    journalFeeds: true,
  },
}
```

**For the remaining 12 domains**, follow this same pattern. Key differences per domain:

| Domain | Sources | Evidence Focus | Framework | SR? | Key Journals |
|--------|---------|---------------|-----------|-----|-------------|
| biology | pubmed, semantic_scholar, openalex | Same as medicine (uses proven path) | PICO (shared with medicine) | true | Nature, Cell, Science, PNAS, eLife |
| chemistry | semantic_scholar, openalex | journal > conference > preprint | null | false | JACS, Angew Chem, Chem Rev, Nature Chemistry |
| computer_science | arxiv, semantic_scholar, openalex | venue tier (A*/A/B) > journal > preprint | null | false | ACM Computing Surveys, IEEE Trans, JMLR, Nature MI |
| engineering | arxiv, semantic_scholar, openalex | journal > conference > patent | null | false | IEEE Trans, ASME, Elsevier engineering journals |
| mathematics | arxiv, semantic_scholar, openalex | journal > preprint > proceedings | null | false | Annals of Math, Inventiones, Acta Mathematica |
| social_sciences | semantic_scholar, openalex | meta-analysis > experimental > survey > qualitative | SPIDER | false | ASR, AJS, Social Forces, Annual Reviews |
| economics | arxiv, semantic_scholar, openalex | journal > working paper > policy brief | null | false | AER, Econometrica, QJE, Journal of Finance, NBER |
| psychology | pubmed, semantic_scholar, openalex | meta-analysis > RCT > experimental > survey > qualitative | PICO (adapted) | true | Psych Bulletin, JPSP, Developmental Psychology |
| law | semantic_scholar, openalex | supreme court > appellate > law review > commentary | CLIP | false | Harvard LR, Yale LJ, Stanford LR, Columbia LR |
| humanities | semantic_scholar, openalex | monograph > journal > book chapter > conference | null | false | PMLA, Critical Inquiry, Past & Present |
| education | semantic_scholar, openalex | meta-analysis > experimental > quasi-experimental > survey | PEO | false | AERJ, Rev of Educ Research, Teaching and Teacher Ed |
| environmental | semantic_scholar, openalex | journal > field study > modeling > review | null | false | Nature Climate Change, Env Sci & Tech, Global Change Bio |

**IMPORTANT for biology:** Set `useProvenDeepResearch: true` and `useProvenGuidance: true` (same as medicine — they share the proven pipeline).

**IMPORTANT for psychology:** Set `features.systematicReview: true` (psychologists do systematic reviews).

### Step 2: Register All Domains

File: `src/lib/search/domains/registry.ts`

Import and add all 13 new configs to the `domainRegistry` map.

### Step 3: Add Journal Feeds

File: `src/data/journal-feeds.ts`

Add 15-30 journal entries per domain. Each entry follows the existing format:

```typescript
{
  id: "nature-physics",
  title: "Nature Physics",
  feedUrl: "https://www.nature.com/nphys.rss",
  siteUrl: "https://www.nature.com/nphys/",
  publisher: "Springer Nature",
  category: "General Physics",
  specialty: "Physics",
  issn: "1745-2473",
  description: "Leading journal covering all areas of physics",
}
```

**RSS Feed URL Sources:**
- Nature journals: `https://www.nature.com/{journal-code}.rss`
- arXiv feeds: `https://rss.arxiv.org/rss/{category}` (e.g., `https://rss.arxiv.org/rss/cs.AI`)
- IEEE: `https://ieeexplore.ieee.org/rss/TOC{journal-number}.XML`
- ACM: `https://dl.acm.org/journal/{journal-id}/feed`
- Springer: `https://link.springer.com/journal/{id}/rss`
- Wiley: `https://onlinelibrary.wiley.com/feed/{journal-doi}`
- JSTOR: Many journals have RSS feeds at their publisher sites

**DO YOUR BEST to use real, working RSS URLs.** If you're unsure about a URL, note it with a `// TODO: verify URL` comment. The founder will verify these manually.

Tag each entry with the appropriate `category` and `specialty` so the journal browser can filter by domain.

### Step 4: Add Poster Templates

File: `src/types/poster.ts`

Add domain-tagged templates following the existing pattern. Example for physics:

```typescript
theoretical_analysis: {
  id: "theoretical_analysis",
  name: "Theoretical Analysis",
  description: "Physics poster for theoretical and mathematical work",
  domains: ["physics", "mathematics"],
  sections: [
    { title: "Introduction & Motivation", type: "text" },
    { title: "Theoretical Framework", type: "text" },
    { title: "Mathematical Derivation", type: "text" },
    { title: "Key Results", type: "text" },
    { title: "Comparison with Experiment", type: "text" },
    { title: "Conclusions & Outlook", type: "text" },
    { title: "References", type: "references" },
  ],
},
```

Add 3-4 templates per domain. Ensure the `domains` array tags them correctly.

### Step 5: Add LaTeX Templates

File: `src/data/latex-templates.ts`

Add 2-4 LaTeX templates per domain. Use official journal LaTeX templates where available:

- **Physics:** APS (REVTeX), Springer, Nature Physics
- **CS:** ACM (`acmart` class), IEEE (`IEEEtran` class), Springer LNCS
- **Mathematics:** AMS (`amsart` class)
- **Economics:** Econometrica, AER
- **Psychology:** APA manuscript format (7th edition)
- **Law:** Law review format
- **Others:** Elsevier (`elsarticle` class), Springer (`svjour3` class)

Each template needs: a valid LaTeX preamble with the correct document class, placeholder sections, and the journal's required formatting.

### Step 6: Write Tests

Create file: `src/lib/search/domains/__tests__/all-domains.test.ts`

Test:
1. All 15 domains are registered in the registry
2. `getDomainConfig(id)` returns the correct config for each of the 15 domain IDs
3. Every domain config has all required fields (non-null sources, personas, evidenceHierarchy, etc.)
4. Every domain config has at least 1 source
5. Every domain config has exactly 5 evidence hierarchy levels
6. Medicine config has `useProvenDeepResearch: true`
7. Biology config has `useProvenDeepResearch: true`
8. Physics config has `useProvenDeepResearch: false`
9. Medicine config has `features.systematicReview: true`
10. Physics config has `features.systematicReview: false`
11. Psychology config has `features.systematicReview: true`
12. Every domain with `journalFeeds: true` has at least 10 entries in journal-feeds.ts matching its journalCategories

## WHAT NOT TO DO

- DO NOT modify existing medicine.ts or multidisciplinary.ts configs
- DO NOT modify any search pipeline, deep research, RAG, guide, or presentation code
- DO NOT modify the DomainConfig type definition
- DO NOT modify the unified search route or any API routes
- DO NOT add dependencies

## FILE SUMMARY

| Action | File |
|--------|------|
| CREATE | `src/lib/search/domains/physics.ts` |
| CREATE | `src/lib/search/domains/biology.ts` |
| CREATE | `src/lib/search/domains/chemistry.ts` |
| CREATE | `src/lib/search/domains/computer-science.ts` |
| CREATE | `src/lib/search/domains/engineering.ts` |
| CREATE | `src/lib/search/domains/mathematics.ts` |
| CREATE | `src/lib/search/domains/social-sciences.ts` |
| CREATE | `src/lib/search/domains/economics.ts` |
| CREATE | `src/lib/search/domains/psychology.ts` |
| CREATE | `src/lib/search/domains/law.ts` |
| CREATE | `src/lib/search/domains/humanities.ts` |
| CREATE | `src/lib/search/domains/education.ts` |
| CREATE | `src/lib/search/domains/environmental.ts` |
| MODIFY | `src/lib/search/domains/registry.ts` (register all 13 new domains) |
| MODIFY | `src/data/journal-feeds.ts` (add ~300 journal entries) |
| MODIFY | `src/types/poster.ts` (add ~40 poster templates) |
| MODIFY | `src/data/latex-templates.ts` (add ~30 LaTeX templates) |
| CREATE | `src/lib/search/domains/__tests__/all-domains.test.ts` |

## VERIFICATION

```bash
npx tsc --noEmit  # zero errors
npx vitest run src/lib/search/domains/__tests__/  # all domain tests pass
npx vitest run src/lib/search/__tests__/  # existing tests pass
```

## COMMIT AND PR

```bash
git add -A
git commit -m "feat: add all 15 domain configs with curated feeds, templates, and personas

- 13 new domain config files (physics, CS, engineering, law, etc.)
- ~300 curated journal feeds across all domains
- ~40 domain-specific poster templates
- ~30 LaTeX templates from official journal sources
- Evidence hierarchies matching field conventions
- Mentor personas with field-specific reporting guidelines
- Deep research perspective templates for all non-medicine domains
- 12 validation tests

Implements #25"

git push -u origin feature/issue-25-content-curation
gh pr create --base main --title "feat: All 15 domain configs with curated content (#25)" --body "Closes #25"
```
