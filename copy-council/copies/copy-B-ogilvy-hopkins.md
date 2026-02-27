# COPY B — Ogilvy-Hopkins Framework
**ScholarSync Landing Page | Full Copy Draft**
**Copywriting Framework:** David Ogilvy (Big Idea + Factual Proof) + Claude Hopkins (Reason-Why + Demonstration) + Bob Bly (Feature-Benefit Translation for Professional Audiences)
**Big Idea:** Access Parity — the research infrastructure of a Harvard medical library, available to every physician in India.

---

---

## SECTION 1: HERO

---

**HEADLINE:**

# A physician in Raipur now has the same research infrastructure as a physician at Harvard Medical School.

**SUBHEADLINE:**

ScholarSync searches PubMed, Semantic Scholar, and OpenAlex simultaneously — 485 million indexed papers — ranks every result by evidence level, synthesizes the literature, and guides you through writing a PRISMA-compliant manuscript. Without switching tabs. Without a medical librarian on staff. Without a postgraduate degree in research methodology.

This is what the research process looks like when it is built properly.

**CTA:**

Begin your research — free, no credit card required.

---

---

## SECTION 2: THE FACTUAL PROOF BLOCK

---

**What ScholarSync does. Stated plainly.**

Ogilvy's advice, applied here: the following are facts, not claims. Read them in the manner of a colleague who has already done the work and is reporting results.

1. ScholarSync searches three databases simultaneously — PubMed (35 million papers), Semantic Scholar (200 million papers), and OpenAlex (250 million works) — and returns a merged, ranked result set in under 30 seconds.

2. Every result is automatically classified by evidence level: Level I (meta-analyses and systematic reviews), Level II (randomised controlled trials), Level III (cohort studies), Level IV (case-control studies), Level V (expert opinion and case reports). A third-year MBBS student sees, at a glance, which paper carries which weight.

3. The system converts a plain-language clinical question into a MeSH-optimised Boolean query for PubMed, a semantic query for Semantic Scholar, and a concept-based query for OpenAlex — automatically. Constructing this query correctly by hand requires training that most medical librarians take years to develop.

4. Results are ranked using Reciprocal Rank Fusion combined with Cohere Rerank v3.5 cross-encoder scoring. Papers appearing in multiple databases are boosted. Final ordering reflects true semantic relevance to your specific question — not keyword frequency.

5. ScholarSync generates an optimised search strategy for Cochrane, EMBASE, and PubMed from a PICO input — formatted with field tags, explosion terms, and subheadings, ready to paste directly into each database without manual query construction.

6. The triple-agent AI screening system assigns three independent AI agents to evaluate each paper against your inclusion and exclusion criteria. Unanimous agreement proceeds automatically. Any disagreement flags the paper for human review. This screening methodology is citable in a systematic review's Methods section.

7. The PRISMA 2020 flow diagram generates in real time and exports as a submission-ready SVG file. The accompanying PRISMA checklist tracks completion status across all 27 items.

8. Risk of Bias assessment using the Cochrane RoB 2 tool is automated per paper — domain-level judgments across all five domains, with supporting signaling questions answered from the paper's text.

9. The writing editor is built on ProseMirror with 20 academic-specific extensions. It knows you are writing a case report or systematic review, not a memo. It applies IMRAD structure, CARE guidelines, and STROBE criteria as contextual guidance — not as a correction added after the fact.

10. Export produces a Word document formatted to journal submission standards — Times New Roman, 1.5 line spacing, Vancouver-formatted reference list — with no manual reformatting required. The same document exports to PDF, PowerPoint, BibTeX, and RIS.

---

---

## SECTION 3: THE ACCESS PARITY ARGUMENT

---

**The Big Idea**

### Every medical college in India teaches clinical medicine at a high standard. Almost none teach research methodology.

This is not a criticism. It is a structural fact with a structural cause.

When a physician at Harvard Medical School begins a systematic review, she has access to: a medical librarian trained in Boolean query construction across multiple databases; institutional access to Cochrane, EMBASE, and UpToDate; Covidence for systematic review screening; a research methodology supervisor with a dedicated office hour; and a departmental statistician available for consultation.

When a senior resident at a government hospital in Patna begins the same systematic review, she has access to: PubMed, which is free. A faculty supervisor who is managing a clinical ward simultaneously. Google Scholar. A WhatsApp group.

The quality gap in published Indian medical research is not a function of intellect or effort. Indian medical professionals are demonstrably capable of world-class research. The gap is infrastructural. It is a gap in tools, not in talent.

ScholarSync was built to close that gap.

Not to approximate the Harvard infrastructure. To equal it — and in some respects surpass it. The HyDE retrieval technique ScholarSync uses (Hypothetical Document Embeddings, in which the AI generates a hypothetical ideal answer to your research question and retrieves papers whose language patterns match) is a research-grade methodology that most university library systems do not yet deploy.

A physician in Raipur who opens ScholarSync tonight has access to a better literature search engine than many researchers at institutions whose library budgets exceed the GDP of small districts.

That is the point. That is why ScholarSync was built.

---

---

## SECTION 4: FEATURE DEMONSTRATION

---

**What actually happens when you run a search**

Hopkins' principle applied: do not describe the product. Show the product working. Follow one search from question to synthesis.

---

**The question:**

A senior resident at NIMS Hyderabad is preparing a systematic review on SGLT2 inhibitors in heart failure with reduced ejection fraction. She types her clinical question into ScholarSync in natural language:

*"What is the evidence for SGLT2 inhibitors in heart failure with reduced ejection fraction?"*

---

**What happens in the first 11 seconds:**

ScholarSync reads the question and generates three distinct search formulations simultaneously.

For PubMed, it constructs a MeSH-optimised Boolean query:
`("Sodium-Glucose Transporter 2 Inhibitors"[MeSH Terms] OR "SGLT2 inhibitor*"[tiab]) AND ("Heart Failure"[MeSH Terms] AND "reduced ejection fraction"[tiab]) AND ("2015"[PDat]:"2026"[PDat])`

For Semantic Scholar, it passes a descriptive semantic query optimised for embedding-based retrieval.

For OpenAlex, it queries by concept and keyword combination.

All three searches run in parallel. Results return in under 30 seconds.

---

**What the results look like:**

Thirty papers appear, ranked by relevance. At the top: the EMPEROR-Reduced trial (2020), the DAPA-HF trial (2019), and a 2023 Cochrane systematic review synthesising 12 RCTs. Each result shows:

- Title, authors, journal, and year
- Evidence level badge — Level I for the Cochrane review, Level II for the RCTs
- A one-paragraph TL;DR of the paper's key finding
- Citation count
- PDF availability via Unpaywall (open access where it exists)

She has not read a single abstract yet. She already knows the shape of the evidence.

---

**The AI synthesis:**

Below the results, ScholarSync synthesises across all 30 papers:

*"The evidence for SGLT2 inhibitors in HFrEF is strong and consistent across two large RCTs. DAPA-HF (2019) demonstrated a 26% relative risk reduction in worsening heart failure or cardiovascular death with dapagliflozin (HR 0.74; 95% CI 0.65-0.85). EMPEROR-Reduced (2020) showed similar findings with empagliflozin (HR 0.75; 95% CI 0.65-0.86). A 2023 Cochrane review synthesising 12 RCTs confirmed these findings with low heterogeneity (I² = 14%). Two trials report minor genital mycotic infections as the primary adverse event. The evidence gap is in HFpEF and mixed ejection fraction populations, where three ongoing RCTs had not reported at the time of the most recent systematic review."*

Each sentence links to the specific papers it draws from.

She did not write this synthesis. She did not need to read 30 abstracts to understand the landscape. In eleven seconds, she has what a medical librarian trained in evidence synthesis might take three hours to produce manually.

---

**What she does next:**

She clicks "Save to Library" on seven papers. She clicks "Find Similar Papers" on the EMPEROR-Reduced trial. ScholarSync uses the Semantic Scholar citation graph to find 14 papers that cite it and 8 foundational papers it cites — including two trials she had not found in the original search.

She opens the PICO builder. She enters Population (adults with HFrEF, EF under 40%), Intervention (SGLT2 inhibitors), Comparison (placebo or standard care), Outcome (cardiovascular mortality, worsening heart failure). ScholarSync generates three formatted search strings — one each for PubMed, EMBASE, and Cochrane — ready to paste.

She has been in ScholarSync for 22 minutes. Her search strategy is complete. Her literature is ranked, synthesised, and saved. She has found papers that a keyword search alone would have missed.

This is what a medical librarian does. It now takes 22 minutes instead of three weeks.

---

---

## SECTION 5: PROFESSIONAL CREDIBILITY

---

**Built to the standard your journal reviewer expects**

Bly's principle for professional audiences: speak the language of methodology. The physician evaluating a research tool is not reading a software brochure. She is evaluating whether the tool can survive scrutiny in a Methods section.

---

**PRISMA 2020 Compliance**

The Preferred Reporting Items for Systematic Reviews and Meta-Analyses 2020 checklist contains 27 items across 9 domains. Systematic reviews that do not address all 27 items are routinely rejected by indexed journals before peer review reaches the substance of the research.

ScholarSync tracks PRISMA 2020 compliance throughout the review process. The checklist updates in real time as you work. When you export, the completion status of all 27 items is visible. Items that require human judgment are flagged for your attention. Items that ScholarSync has addressed are marked complete with the evidence that satisfies them.

The PRISMA 2020 flow diagram — required by every journal that accepts systematic reviews — generates automatically, updates as your screening decisions are made, and exports as an SVG file formatted for journal submission.

---

**Risk of Bias Assessment (Cochrane RoB 2)**

The Risk of Bias 2 tool is the current Cochrane standard for assessing randomised controlled trial quality. Assessment requires evaluating five domains: the randomisation process, deviations from intended interventions, missing outcome data, measurement of the outcome, and selection of reported results.

For each included RCT, ScholarSync's RoB 2 module answers the signaling questions for each domain from the paper's full text, returns domain-level judgments (low risk, some concerns, high risk), and produces an overall risk judgment. The assessment is transparent — every judgment cites the specific passage from the paper that supports it.

This is auditable. It can be included in a systematic review's supplementary materials.

---

**Cochrane-Methodology Search Strategy Generation**

The search strategies ScholarSync generates follow Cochrane Handbook methodology. Queries include MeSH terms with explosion, field tag specifications ([tiab], [MeSH Terms], [Subheading]), proximity operators where appropriate, and year filters. EMBASE strategies include EMTREE terms with their PubMed MeSH equivalents. Cochrane strategies are formatted for the Cochrane Register interface.

A medical information specialist reviewing your search strategy will find it constructed correctly.

---

**Evidence Hierarchy Classification**

Evidence levels assigned by ScholarSync correspond to the Oxford Centre for Evidence-Based Medicine hierarchy, adapted for clinical medicine. The classification is automatic, based on study design as reported in the paper's metadata and abstract. When study design is ambiguous, ScholarSync flags the paper for manual review rather than misclassifying it.

In a manuscript's Methods section, you can state: "Evidence was graded according to the Oxford CEBM hierarchy."

---

**Vancouver Citation Formatting**

Vancouver style — the International Committee of Medical Journal Editors standard — is the citation format required by the majority of Indian indexed medical journals, including IJCM, JAPI, IJMR, and the National Medical Journal of India. ScholarSync generates Vancouver citations from imported paper metadata, with no manual formatting. The reference list is numbered sequentially in order of citation. In-text citations are inserted as clickable superscript markers.

When the target journal changes, the entire reference list reformats in two clicks.

---

---

## SECTION 6: THE COMPARISON

---

**ScholarSync against the current workflow — column by column**

The standard workflow for a systematic review among Indian medical researchers today: PubMed in one tab, Google Scholar in a second, a Word document for notes, Zotero or Mendeley for citation management, Grammarly for writing correction, and a third-party AI detector before submission. Six applications. No integration. Significant duplication of effort at each handoff between tools.

Here is what that workflow costs, and what ScholarSync changes:

---

| Current Workflow | Time Required | ScholarSync | Time Required |
|---|---|---|---|
| Manual Boolean query construction for PubMed | 45-90 minutes for a trained researcher; 3+ hours for a student | AI generates MeSH-optimised queries for PubMed, EMBASE, and Cochrane from a PICO input | Under 2 minutes |
| Literature search across PubMed + Google Scholar | 3-6 hours; results unranked, evidence level unknown | Simultaneous search of PubMed, Semantic Scholar, OpenAlex; results ranked by relevance and evidence level | Under 30 seconds |
| Manual abstract screening against inclusion/exclusion criteria | 40+ hours per 1,000 citations for two independent reviewers | Triple-agent AI screening with conflict detection; human review only where agents disagree | Minutes for screening; human time concentrated at genuine decision points |
| Building the PRISMA 2020 flow diagram in PowerPoint or Word | 2-4 hours; must be manually updated each time screening decisions change | Auto-generated SVG, updates in real time as screening progresses | Zero additional time |
| Risk of Bias assessment per RCT | 30-60 minutes per paper; two independent reviewers required | Automated RoB 2 domain-level assessment with cited evidence from each paper | Under 5 minutes per paper |
| Citation formatting and reformatting when journal changes | 1-3 hours for a 40-paper reference list; error rate is high | One-click reformatting in APA, Vancouver, MLA, Chicago, BibTeX, or RIS; zero manual intervention | Under 10 seconds |
| Final Word document formatting to journal standards | 2-4 hours; fonts, line spacing, margins, headers applied manually | Export produces a correctly formatted Word document with journal-standard styling applied | One click |
| AI detection check using a third-party tool, then return to editor | 30-60 minutes switching between tools; inconsistent results across detectors | AI detection within the editor; flagged passages visible in context; rewriting done without leaving the document | Continuous, integrated |

---

**What the arithmetic means:**

A systematic review that currently requires 60-80 hours of infrastructure work — search strategy, screening logistics, flow diagram, RoB assessment, citation management, formatting — requires fewer than 10 hours with ScholarSync. The remaining hours are not saved by cutting corners. They are saved because the administrative and logistical work is handled correctly, automatically, and in a single workspace.

The hours freed are hours you spend on what actually constitutes research: reading, interpreting, discussing findings, and writing.

---

---

## SECTION 7: PRICING

---

**ScholarSync is priced as a professional investment, not a consumer subscription.**

The benchmark is not other software. The benchmark is the professional outcome — a published paper in an indexed journal, a systematic review that survives peer review, a research portfolio that supports a postgraduate application or a grant submission.

---

### Free Plan — ₹0 per month

Begin with no commitment. The Free plan includes literature search in Quick Scan mode, the Studio writing editor, basic library management, APA citation formatting, and PDF export.

It is sufficient to understand what ScholarSync does. It is not sufficient to complete a serious research project.

No credit card. No expiry date.

---

### Basic Plan — ₹999 per month

For students and residents writing their first published papers.

Includes Standard and Deep Dive research modes (up to 60 papers per search), all citation formats including Vancouver, Learn Mode (the Socratic writing mentor), AI detection with 10 checks per month, Word document export, full library management with collections, and access to PubMed, Semantic Scholar, and OpenAlex simultaneously.

**The reference point:** A single textbook in clinical medicine costs ₹800-1,500 and is consulted for two years. ScholarSync at ₹999 per month is consulted every day you are writing.

---

### Pro Plan — ₹1,999 per month

For residents, post-doctoral researchers, and faculty conducting systematic reviews and original research.

Includes everything in Basic, plus: Exhaustive research mode (up to 100 papers with citation graph traversal), the complete PRISMA systematic review suite (PICO-to-search-strategy, triple-agent screening, PRISMA 2020 flow diagram, RoB 2 assessment, structured data extraction), unlimited AI detection and plagiarism checks, AI humanization, PowerPoint export, and unlimited AI processing.

**The reference point:** Covidence, the current institutional standard for systematic review screening, costs approximately $160 USD per month for individual researchers — roughly ₹13,500. ScholarSync Pro costs ₹1,999 and includes capabilities Covidence does not have: integrated writing, citation management, evidence-level classification, and a complete writing editor.

---

---

## SECTION 8: INSTITUTIONAL OFFERING

---

**For department heads and research supervisors**

---

### Raise your department's research output. Then measure it.

A medical department's research output is limited not by the capability of its faculty and students but by the infrastructure available to them. The bottleneck in most Indian medical colleges is not talent — it is the absence of a systematic process for moving from clinical observation to published manuscript.

ScholarSync Institutional provides that process, at department scale.

**What the Institutional plan includes:**

A multi-user dashboard from which you see every active research project in your department — which papers are saved, which manuscripts are in progress, which systematic reviews are in the screening phase. Usage analytics per student and faculty member. Supervisor visibility tools that show you where students are in the process before the first draft arrives on your desk.

For faculty supervising multiple student projects simultaneously, this visibility is not a minor convenience. It is the difference between catching a methodological error in week two and catching it in week eight, after the student has built an entire manuscript on a flawed literature search.

**The ethical dimension:**

Every tool you recommend to students carries your professional endorsement of the research it produces. ScholarSync's Learn Mode is the only AI research tool built with an explicit design principle against writing for students. When a student uses Learn Mode, the AI never produces text on their behalf. It asks questions. It teaches structure. It diagnoses gaps in understanding. The manuscript the student submits is theirs.

This is defensible to an ethics committee. It is the answer to the question your dean will ask when AI in academic writing comes before the board.

**Institutional pricing is available on request.** Contact us with the number of faculty and students in your department. We will propose a per-seat arrangement that makes the investment rational at institutional scale.

---

---

## SECTION 9: CALL TO ACTION

---

**Begin your research.**

---

The argument for ScholarSync rests on one verifiable claim: that the research process, done well, produces better outcomes than the research process done badly — and that the tools available to a researcher determine, to a significant degree, how well the process can be done.

You have been working with the tools available to you. Those tools were not designed for this work. PubMed was designed to index papers, not to rank them by relevance to your specific question. Word was designed to produce documents, not to guide a physician through IMRAD structure. Grammarly was designed to correct grammar, not to teach a medical student why the Methods section of a systematic review is written in the past tense.

ScholarSync was designed for this work. Specifically. With 71 database tables, three simultaneous search sources, a PRISMA 2020 compliance engine, and a writing editor that understands the difference between a case report and a research article.

The test is simple. Bring your actual research question — the one you are currently working on, or the one you intend to start next week. Run it through ScholarSync on the Free plan. Compare the result to what your current workflow produces in the same time.

If ScholarSync does not find papers your manual search missed, and if it does not synthesise those papers into a clearer picture of the evidence than you have now, stop here. The product has not earned your subscription.

If it does, you will know what to do.

---

**Begin your research — free, no credit card required.**

*Or speak to us about institutional access for your department.*

---

---

*COPY B — Complete draft. Ogilvy-Hopkins framework. All sections.*
*Prepared for ScholarSync copy review, February 2026.*
