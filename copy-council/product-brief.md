# ScholarSync — Product Brief for Copywriters
**Version 1.0 | February 2026**

---

## PART 1: PRODUCT DEFINITION

### One Sentence
ScholarSync is an AI-powered academic writing platform that takes medical students and researchers from literature search to published manuscript — without writing a single word for them.

### One Paragraph
ScholarSync is the end-to-end research intelligence platform built for the medical education ecosystem in India and beyond. It replaces the six-app cobble-job that every medical student currently suffers through — Google Scholar tabs, a Word document, Grammarly, a citation manager, a plagiarism checker, and a WhatsApp group asking seniors for help — with a single integrated workspace. The Studio is a rich editor that knows you're writing a clinical case report, not a marketing email. Deep Research is a multi-source literature search engine that thinks like a medical librarian. Learn Mode is a Socratic mentor who teaches you to write properly rather than doing it for you. PRISMA Systematic Review is a publication-grade protocol for researchers doing evidence synthesis. And every feature is wired together — search a paper, save it to your library, cite it in your document, check it for AI detection, and export it to Word or PDF, all without leaving the tab.

---

## PART 2: THE PROBLEM

### The Current Workflow: A Medical Student Writing Their First Paper

Picture Dr. Rahul Sharma — third-year MBBS student, Nagpur Medical College. He has been assigned to write a case report with his resident. The paper is due in six weeks. He has never done this before.

**Day 1. The Research Phase.**
He opens Google Scholar and types "case report format MBBS." He gets a mix of advice articles, PDF guides, and someone's old Slideshare deck. He switches to PubMed. He types his clinical question. He gets 847 results. He has no idea how to filter them. He opens tabs — lots of tabs. He reads abstracts, some he can access, many he cannot. He pastes DOI links into Unpaywall hoping for free PDFs. He emails his supervisor: "Sir, can you send me the papers?" His supervisor doesn't reply for three days.

**Day 4. The Library Problem.**
He has 23 papers saved. They live in: a folder called "Research" on his desktop, 14 browser bookmarks, six PDFs in his Downloads folder, and four links in a WhatsApp message he sent to himself. He has no idea which papers he has actually read. He has no annotations. When he needs to find the RCT he read four days ago, he cannot.

**Day 8. The Writing Starts.**
He opens Word. He types "Introduction" and stares at the blank page for twenty minutes. He does not know what goes in an introduction. He asks Google: "how to write introduction case report medical journal." He finds a Medium post and a Reddit thread. He starts copying the structure loosely. He is not sure about tense. He is not sure about person. He writes "we noted that the patient..." and then second-guesses every word.

**Day 12. The Citation Nightmare.**
He has written two paragraphs. He needs to cite four papers. He opens Mendeley (which he installed six months ago and barely knows how to use). He cannot remember how to add a paper. He copies citations manually from PubMed, formats them in APA, then realizes the target journal uses Vancouver. He reformats them. He pastes them in the wrong place. He accidentally deletes a paragraph he cannot undo.

**Day 19. The AI Temptation.**
He is stuck on the Discussion section. He types his case summary into ChatGPT: "write a discussion section for this case report." He pastes the output. It sounds plausible but slightly wrong — wrong statistics, wrong journals cited, wrong journal names. Two of the citations don't exist. He edits it anyway. He feels vaguely guilty. He doesn't know if his supervisor will notice.

**Day 23. The Compliance Panic.**
His senior resident, who is also a co-author, hears that some journals are now checking for AI-generated content. He messages Rahul: "Bhai check karo AI detect toh nahi ho raha." Rahul pastes his paper into three different free AI detectors. They all give different results. He doesn't know which one to trust. One says 67% AI. He panics. He starts rewriting sentences manually to sound more human.

**Day 29. The Export Mess.**
The journal requires a Word document with specific formatting: 12pt Times New Roman, 1.5 line spacing, no headers in the title page, references as footnotes. His Word document is a disaster of inconsistent fonts and styles. He spends four hours reformatting. He exports a PDF — the fonts look wrong. He is not sure why.

**Day 35. The Submission Failure.**
He submits. The journal returns the paper in 48 hours: "Inadequate literature review. Introduction lacks context. Methods section missing from case report." He has to start over.

---

### Specific Pain Points by Stage

**Literature Search**
- PubMed returns too many results with no guidance on which matter
- Abstract-only access means reading without full context
- No synthesis across papers — students read individually, never comparatively
- No understanding of evidence hierarchy (is this an RCT? A case series? A meta-analysis?)
- No "find similar papers" capability — students don't know to look for citing papers

**Library Management**
- Papers scattered across multiple apps, tabs, folders, messages
- No annotations tied to papers
- Citation format switching is manual, error-prone, and time-consuming
- BibTeX/RIS import/export is too technical for students

**Writing**
- No understanding of IMRAD structure, CARE guidelines, STROBE criteria
- Blank page paralysis is real and universal
- Tense and voice errors are constant (passive vs. active, first vs. third person)
- No way to check writing quality — readability, jargon density, passive voice overuse

**AI and Integrity**
- Students are using ChatGPT but have no guidance on appropriate vs. inappropriate use
- AI detectors give inconsistent results, creating anxiety without resolution
- No mechanism to "humanize" flagged passages appropriately
- Plagiarism checkers (Turnitin) are not accessible to individual students

**Export and Submission**
- Word formatting requirements are journal-specific and tedious to apply
- PDF exports break formatting
- No awareness of target journal submission standards before writing begins

---

### The Emotional Arc (Without ScholarSync)

- **Week 1:** Excitement mixed with overwhelm. "I'll figure this out."
- **Week 2:** Frustration. "Why is this so hard? My senior makes it look easy."
- **Week 3:** Self-doubt. "Maybe I'm not cut out for research."
- **Week 4:** Shortcuts. ChatGPT, copy-paste, borrowed sentences.
- **Week 5:** Anxiety. AI detectors, compliance fear, imposter syndrome peaking.
- **Week 6:** Relief at submitting — followed by rejection. The cycle resets.

---

## PART 3: THE SOLUTION — Feature by Feature

### Feature 1: Deep Research (Literature Intelligence Engine)

**What it is:** A multi-source medical literature search engine that searches PubMed, Semantic Scholar, and OpenAlex simultaneously, then uses AI to rank, synthesize, and explain the results.

**What it actually does, technically:**
- Accepts a natural language research question ("What is the role of SGLT2 inhibitors in heart failure with reduced ejection fraction?")
- AI reformulates the query for each source: PubMed gets a MeSH-optimized Boolean query with field tags; Semantic Scholar gets a descriptive semantic query; OpenAlex gets a concept-based query
- All three sources are searched in parallel
- Results are merged with Reciprocal Rank Fusion — papers appearing in multiple sources get boosted
- Cohere Rerank (cross-encoder) sorts results by true semantic relevance to your specific question
- Evidence level is automatically assigned: Level I (meta-analyses), Level II (RCTs), Level III (cohort studies), down to Level V (expert opinion)
- Open-access PDFs are found automatically via Unpaywall
- Results show: title, authors, journal, year, evidence level badge, TL;DR, citation count, study type, PDF availability
- "Find Similar Papers" uses the Semantic Scholar Recommendations API to find papers connected via citation graph and embedding similarity

**Research modes:**
- Quick Scan: 15 papers, 1-2 minutes
- Standard: 30 papers, 3-5 minutes
- Deep Dive: 60 papers, 8-12 minutes
- Exhaustive: 100 papers, 15-25 minutes

**Research Agent:** A Research Copilot sidebar conducts systematic searches autonomously — it plans, executes, assesses coverage gaps, and recommends which papers to save. Like having a medical librarian run the search for you.

**AI Synthesis:** After search, ScholarSync synthesizes across all results — comparing findings, identifying contradictions, flagging evidence gaps — with citations back to specific papers.

**Why it's different from just PubMed:**
PubMed returns a list. ScholarSync returns an understanding. Every result is ranked by relevance, tagged by evidence strength, and synthesized into a coherent picture of what the literature says.

---

### Feature 2: The Studio (Academic Writing Editor)

**What it is:** A purpose-built rich text editor designed specifically for academic manuscript writing — not a word processor repurposed for research, but an editor built from the ground up knowing you're writing a case report, review article, or research paper.

**Built on Tiptap (ProseMirror)** — the same foundation used by Notion and linear.app — with academic-specific extensions:
- Merriweather serif font as default (how published papers actually look)
- Slash commands for academic formatting (/method, /figure, /table, /citation)
- Auto-save with version history (every 3 seconds debounced)
- Document outline in the left sidebar with section navigation
- Selection toolbar with AI commands on highlighted text

**Three-column layout:**
- Left sidebar: cited sources, document sections, library access
- Center: the writing surface
- Right: AI panel with Chat, Research, and Checks tabs

**AI Chat panel (Write mode):** A research assistant that helps with academic writing tasks — explains terminology, suggests structure, helps interpret data, clarifies methodology. Context-aware: it knows what document type you're writing and what section you're in.

**Export:** Word (.docx) with proper academic formatting, PDF with pagination and margins, PowerPoint (.pptx) for presentations, BibTeX and RIS for reference managers.

**Writing analysis integration:** Real-time visibility into AI detection score and plagiarism status from within the editor — not as a separate tool you have to switch to.

---

### Feature 3: Learn Mode (Socratic Academic Mentor)

**What it is:** A second mode within the Studio that activates a completely different AI persona. In Learn Mode, the AI never writes for you. It teaches you how to write.

**The Three Laws of Learn Mode:**
1. Never Write For Them
2. Socratic First, Didactic Second
3. Evidence Is Sacred

**How it actually works:**
- Toggle the Write/Learn switch in the Studio top bar
- A green banner appears: "I won't write for you — I'll help you think."
- The AI persona switches from "research assistant" to "senior academic mentor"
- Ask it to write your introduction, and it responds with a framework and guiding questions: "What gap in the literature does your case fill? Who has described similar cases before? What's the clinical takeaway you want readers to leave with?"
- It teaches IMRAD structure, CARE guidelines, STROBE criteria, PRISMA checklists — not as abstract concepts, but as applied guidance for your specific document
- Diagnostic questions at the start: "What do you already know about writing a case report introduction?"
- Probing questions when answers are vague: "You said the presentation was unusual — what specifically was unusual about the timeline?"
- Scaffolding questions when stuck: "Let's break this down. Your discussion needs three things: context, interpretation, and limitations. Which do you want to start with?"
- After two rounds of Socratic prompting, it shifts to brief direct instruction (2-4 sentences), then returns to Socratic mode

**Why this matters:** Every medical education institution has the same problem — students submit AI-generated text because they don't know how to write, not because they're lazy. Learn Mode addresses the underlying gap: it builds the skill, not just the document.

**Culturally specific:** The system understands the Indian medical education context — common target journals (IJCM, JAPI, IJMR), the typical student-supervisor relationship dynamic, and even handles mixed Hindi-English input naturally (responding in academic English for the manuscript).

---

### Feature 4: PRISMA Systematic Reviews

**What it is:** A complete systematic review workflow engine that automates the most technically demanding parts of evidence synthesis — PICO formulation, database search strategy generation, AI-assisted paper screening, PRISMA 2020 flow diagram generation, Risk of Bias assessment, and data extraction.

**What it actually does:**

**PICO to Search Strategy:**
- User enters Population, Intervention, Comparison, Outcome
- AI generates optimized search strings for PubMed (MeSH + Boolean), EMBASE, and Cochrane with proper field tags, explosion terms, and subheadings
- Formatted to paste directly into each database — no manual query construction

**Triple-Agent AI Screening:**
- Upload a list of papers (title + abstract)
- Three independent AI agents screen each paper against your inclusion/exclusion criteria
- Each agent makes an independent include/exclude/uncertain decision with reasoning
- Consensus algorithm: unanimous include = include; unanimous exclude = exclude; any disagreement = flagged for human review
- Batch screening processes hundreds of papers in parallel
- Reduces 40-hour manual screening tasks to minutes

**PRISMA 2020 Flow Diagram:**
- Auto-generated SVG diagram reflecting your actual data flow (records identified, records screened, records excluded, studies included)
- Updates in real time as you progress through screening
- Exportable as SVG for journal submission
- Includes PRISMA 2020 checklist with completion status

**Risk of Bias 2 (RoB 2) Assessment:**
- For each included RCT, AI assesses five domains: randomization process, deviations from intervention, missing outcome data, measurement of outcome, selection of reported results
- Returns domain-level judgments (low / some concerns / high risk) with supporting signaling questions answered from the paper
- Generates overall risk judgment

**AI Data Extraction:**
- Structured extraction of key fields from paper full text or abstract
- Configurable extraction fields per review
- PICO extraction: population, intervention, comparison, outcome, study design, sample size, duration, key findings, limitations
- Stored in extraction table for meta-analysis export

**Why this matters:** A systematic review without these tools takes a post-doc researcher 6-12 months. With ScholarSync, the infrastructure work (search strategy, screening logistics, flow diagram, RoB assessment) is handled. Researchers spend time on what actually requires their judgment.

---

### Feature 5: Export

**Formats:**
- **Word (.docx):** Academic formatting with proper styles — Times New Roman or custom fonts, line spacing, paragraph indentation, formatted references section
- **PDF:** Proper pagination, 1-inch margins, Letter size, header hierarchy preserved
- **PowerPoint (.pptx):** Converts research documents to slide decks with AI slide generation, design theme selection, speaker notes
- **Presentation PDF:** Slide deck exported as PDF for submission
- **BibTeX:** Exportable citation file for LaTeX users and reference managers
- **RIS:** Universal format importable into Mendeley, Zotero, EndNote, RefWorks
- **Rich text clipboard:** Copy formatted content to paste into Google Docs or Word with formatting preserved (bold, italic, headings, lists — not plain text)

**Why this matters:** The last mile — getting a finished document out of a writing tool into a submission-ready format — is where hours disappear. A student should spend zero time on reformatting.

---

### Feature 6: Citation Management

**How it works:**
- Search for papers in the built-in search or import from your Library
- One-click add to document references
- Auto-formatted citations in any style: APA 7, MLA 9, Chicago, Vancouver (the standard for medical journals)
- In-text citations inserted as clickable markers
- Reference sidebar shows all cited sources in order
- Citation dialog generates formatted citation text for any paper
- Copy in-text citation (parenthetical) separately from full reference
- BibTeX/RIS export for external reference managers
- Citation graph: find papers cited by your sources (backward traversal) and papers that cite your sources (forward traversal via Semantic Scholar)

**Library management:**
- Save papers from search results directly to library
- Organize into collections/folders
- Favorite papers for priority access
- View PDF inline with annotation support
- Access from within the Studio without switching apps

---

## PART 4: KEY DIFFERENTIATORS

**What ScholarSync can do that no other single tool does:**

1. **The only tool with both a research engine AND a writing editor in one workspace.** Elicit searches. Jenni AI writes. ScholarSync does both. Moving between them destroys focus and context.

2. **Evidence hierarchy on every search result.** No other academic search tool displays Level I/II/III evidence classification automatically from study type. For medical students, this is foundational — a case report and a meta-analysis are not equivalent evidence.

3. **Learn Mode: AI that refuses to write for you.** This is the product's moral backbone. Every other AI writing tool writes. ScholarSync's Learn Mode explicitly refuses to and teaches instead. This is the only tool a university could recommend without worrying about academic integrity violations.

4. **Triple-agent AI screening for systematic reviews.** NotebookLM, Elicit, and SciSpace do not have this. Having three independent AI agents disagree and flag conflicts is a publication-grade screening methodology. This makes ScholarSync the only tool capable of being cited in a systematic review's Methods section.

5. **Multi-source search with MeSH-optimized query reformulation.** PubMed search requires Medical Subject Headings to be effective. ScholarSync's AI automatically converts a natural language question into a proper MeSH-tagged Boolean query — a skill that takes medical librarians years to develop.

6. **Citation graph traversal in literature search.** Snowball sampling — finding papers that cite your best papers, and papers those papers cite — is how experienced researchers find landmark studies that a keyword search misses. ScholarSync automates this via the Semantic Scholar citation graph API.

7. **PRISMA 2020 flow diagram auto-generation.** Every systematic review submitted to a journal requires a PRISMA flow diagram. ScholarSync generates it in real time and exports it as submission-ready SVG.

8. **Indian medical education context baked in.** The AI mentor understands IJCM, JAPI, and the Indian medical curriculum. It understands the student-supervisor relationship. It handles English-Hindi mixing. No tool built outside India does this.

9. **Integrated AI detection + humanization.** Detect AI content, understand which paragraphs are flagged, and rewrite them with appropriate humanization — light, medium, or heavy — without leaving the editor.

---

## PART 5: TARGET PERSONAS

### Persona 1: Riya Patel, Third-Year MBBS Student
**Age:** 21. **Location:** Mumbai. **College:** Grant Medical College.

Riya is being asked to co-author a case report by her senior resident for the first time. She is excited and terrified in equal measure. She has been on academic social media long enough to know that publications matter for PG entrance and residency applications. She has never used PubMed seriously. She has used ChatGPT for assignments but has also heard horror stories about plagiarism detection. She is active on Instagram, follows medical education pages, and uses YouTube tutorials to learn new skills.

**Her core fear:** That she'll write something embarrassing that makes her look incompetent in front of her supervisor.

**What she needs:** A guided, forgiving system that teaches her the right way to do things without making her feel stupid for not already knowing.

**How ScholarSync serves her:** Learn Mode is built for Riya. The Socratic mentor teaches her CARE guidelines one question at a time. She learns to write while writing her actual paper. Deep Research shows her which papers matter and why — the evidence level badges give her a vocabulary for "this is a stronger paper than that one."

**The line that lands for her:** "Write your first paper the right way. ScholarSync teaches you — it doesn't write for you."

---

### Persona 2: Dr. Arjun Mehta, Senior Resident, Internal Medicine
**Age:** 28. **Location:** Hyderabad. **Hospital:** NIMS.

Arjun has two publications and is working toward his MD. He is being asked to mentor a junior student on a case report while simultaneously writing his own original research paper for submission to an indexed journal. He knows how to write. His problem is time, efficiency, and iteration speed. He spends three hours on literature search for what should take one hour. He manually reformats references every time the target journal changes. He uses Word, Zotero, and Google Scholar separately.

**His core fear:** Wasting time on the administrative parts of research when his patient load is already brutal.

**What he needs:** Speed and quality. He wants to find the right papers faster. He wants citations to just work. He wants export to be frictionless.

**How ScholarSync serves him:** Deep Research cuts his literature search from three hours to twenty minutes. The writing analysis flags passive voice and readability issues before submission. Export to Word with proper formatting saves him two hours of final prep. Citation management means he never reformats references again.

**The line that lands for him:** "Cut your literature search from three hours to twenty minutes. Then write."

---

### Persona 3: Dr. Priya Nair, Associate Professor and Research Supervisor
**Age:** 41. **Location:** Chennai. **College:** Sri Ramachandra Institute.

Priya supervises eight student research projects simultaneously. She is frustrated by the quality of first drafts she receives. Students either write too little (blank page panic), write AI-generated text that sounds plausible but is factually wrong, or plagiarize from papers they have read. She spends hours correcting fundamental writing structure issues that should have been caught earlier. She wants her students to become competent researchers, not just paper-submitters.

**Her core fear:** Reputational damage from publishing a paper with errors that got through because she didn't catch them.

**What she needs:** A tool she can recommend to students that guides them to write properly, not just produce text. She also wants visibility — she wants to see that the process is being followed.

**How ScholarSync serves her:** She can recommend Learn Mode knowing the AI will not write for her students. The integrity check gives her confidence that AI-generated content has been addressed. The systematic IMRAD and CARE framework guidance means students arrive with structurally sound drafts, not blank pages.

**The line that lands for her:** "Finally, an AI tool that teaches your students to write — not one that writes for them."

---

### Persona 4: Dr. Vikram Rao, Post-Doc Researcher
**Age:** 33. **Location:** Bengaluru. **Institution:** NIMHANS.

Vikram is conducting a systematic review on antidepressant efficacy in treatment-resistant depression. He has PRISMA methodology training. He is the most technically sophisticated user on this list. He knows what he needs: a better screening workflow, automated PRISMA flow generation, and integrated data extraction. He currently uses Covidence (expensive, foreign-built), Excel for data extraction, and REVMAN for meta-analysis. He is open to a better tool that costs less and integrates more tightly.

**His core fear:** Publishing a systematic review with methodological errors that undermine its validity.

**What he needs:** Protocol-grade tools. Triple-agent screening. RoB 2 assessment. PRISMA 2020 compliance. Data extraction tables.

**How ScholarSync serves him:** The systematic review engine is built specifically for him. Triple-agent screening with conflict resolution. PRISMA 2020 flow diagram that auto-generates and updates. RoB 2 assessment per domain. The fact that ScholarSync is built on PubMed + Semantic Scholar + OpenAlex gives him broader coverage than Covidence's database.

**The line that lands for him:** "Systematic review infrastructure that would take two months to build — ready on day one."

---

### Persona 5: Dr. Sunita Krishnan, Department Head, Community Medicine
**Age:** 52. **Location:** Pune. **College:** BJMC.

Sunita is evaluating tools for her department. She has 40 faculty and 200 students. She is skeptical of AI writing tools because of academic integrity concerns. She is budget-conscious: institutional pricing matters. She wants a tool that improves research output quantity and quality from her department, not one that generates plagiarism scandals. She will not recommend a tool she has not personally vetted. She is not a tech adopter — she wants something she can understand and explain to her dean.

**Her core fear:** Recommending a tool that enables academic dishonesty, then having to answer for it to the university ethics board.

**What she needs:** An institutional pitch. Proof that the tool builds skills, not shortcuts. Compliance features that show the tool actively works against academic integrity violations. A pricing model that makes sense at scale.

**How ScholarSync serves her:** Learn Mode's explicit refusal to write for students is her key differentiator. AI detection built in. The approach is defensible to an ethics committee. Institutional pricing makes the math work.

**The line that lands for her:** "The only AI research tool we could recommend to an academic integrity committee."

---

## PART 6: PRICING

Pricing is in Indian Rupees (INR), processed via Razorpay.

### Free Plan — ₹0/month
**For:** Students just starting out, trying the product before committing.

Features:
- Limited deep research (Quick Scan mode, reduced paper count)
- Studio editor with manual formatting
- Basic library management (limited papers)
- APA citation formatting only
- AI chat with usage cap
- PDF export

Limitation: No systematic review tools, no AI detection/compliance, no advanced research modes, no DOCX export.

**Emotional positioning:** "Start for free. No credit card. No expiry."

---

### Basic Plan — ₹1,000/month (~$12 USD)
**For:** Individual students and residents actively writing papers.

Everything in Free, plus:
- Standard and Deep Dive research modes
- Multiple citation formats (APA, MLA, Chicago, Vancouver)
- AI detection and compliance checks (10 checks/month)
- DOCX and PDF export
- Full library management with collections
- Learn Mode (Socratic mentor)
- PubMed + Semantic Scholar + OpenAlex search
- Write/Learn mode toggle in Studio
- AI writing analysis (basic)
- 50,000 AI tokens/month

**Emotional positioning:** "Everything a student needs to write their first published paper. Less than a textbook."

---

### Pro Plan — ₹2,000/month (~$24 USD)
**For:** Residents, post-docs, and faculty conducting serious research.

Everything in Basic, plus:
- Exhaustive research mode (up to 100 papers, citation graph traversal)
- Full PRISMA systematic review suite (search strategy, triple-agent screening, PRISMA flow, RoB 2, data extraction)
- Unlimited plagiarism checks
- AI humanization (light, medium, heavy)
- PowerPoint export
- Presentation generation from research documents
- Priority AI processing
- Advanced writing analysis
- Unlimited AI tokens

**Emotional positioning:** "Publication-grade research infrastructure. At a fraction of what Covidence costs."

---

### Institutional Plan — Custom Pricing
**For:** Medical colleges, hospitals, and research departments.

All Pro features, plus:
- Multi-user management dashboard
- Usage analytics per student/faculty
- Supervisor visibility tools
- Custom domain/branding options
- Priority support

**Emotional positioning:** "Raise your department's research output. Get visibility into every project. Make ScholarSync your institutional standard."

---

## PART 7: COMPETITIVE LANDSCAPE

### Elicit
**What it does:** AI research assistant for literature review. Strong at generating tables comparing papers. Good at extracting key claims from abstracts.

**Gaps vs ScholarSync:**
- No writing editor. You research in Elicit, then switch to Word. Context is lost.
- No Learn Mode. It assists; it doesn't teach.
- No PRISMA systematic review tools.
- No AI detection or compliance tools.
- No Indian medical context or pricing.
- No citation graph traversal.

**One-line comparison:** "Elicit finds papers. ScholarSync turns them into a published manuscript."

---

### SciSpace
**What it does:** PDF viewer with AI chat. Good at explaining individual papers. Has a co-pilot for asking questions about PDFs.

**Gaps vs ScholarSync:**
- Focused on reading, not writing.
- No systematic review tools.
- No multi-source literature search engine.
- No Learn Mode.
- No compliance/AI detection.
- Writing features are basic (more like Grammarly than an academic editor).

**One-line comparison:** "SciSpace helps you read papers. ScholarSync helps you write them."

---

### Consensus
**What it does:** Searches academic papers and synthesizes consensus on specific questions. Good for quick "what does the research say about X" answers.

**Gaps vs ScholarSync:**
- Synthesis only — no writing editor, no export, no citation management.
- No systematic review tools.
- No Learn Mode.
- No compliance tools.
- It is a search tool, not a writing platform.

**One-line comparison:** "Consensus answers a question. ScholarSync writes the paper."

---

### Paperpal
**What it does:** Academic writing assistant and proofreader. Grammar correction with academic context. Powered by Springer Nature.

**Gaps vs ScholarSync:**
- Writing assistance, not research intelligence. No literature search engine.
- No systematic review tools.
- No Learn Mode.
- Correction-focused, not creation-focused.
- No multi-source research with evidence hierarchy.

**One-line comparison:** "Paperpal fixes your writing. ScholarSync teaches you to write correctly from the start."

---

### Jenni AI
**What it does:** AI writing assistant that writes academic text for you. Autocomplete-style writing. Popular with students because it writes sections, not just edits.

**Gaps vs ScholarSync (and why this is a feature, not a gap):**
- Jenni writes for you. ScholarSync (in Learn Mode) explicitly refuses to.
- For a university that cares about academic integrity, Jenni is a liability. ScholarSync is defensible.
- No systematic review tools.
- No literature search engine.
- No compliance tools.

**One-line comparison:** "Jenni writes your paper for you. Learn Mode teaches you to write it yourself. Only one of those is acceptable at your university."

---

### The White Space ScholarSync Owns
No single tool combines:
- Multi-source medical literature search with evidence hierarchy classification
- Integrated writing editor with academic structure guidance
- A Socratic learning mode that explicitly refuses to write for users
- PRISMA-compliant systematic review infrastructure
- AI detection and humanization
- Multi-format export

That combination, at Indian pricing, for the Indian medical education market, is ScholarSync's uncrowded lane.

---

## PART 8: EMOTIONAL JOURNEY MAP

**With ScholarSync:**

### Stage 1: "I need to write a paper" (Day 0)
**Emotion:** Overwhelmed, uncertain, slightly excited.
**ScholarSync moment:** Opens the app, selects document type (Case Report), and the AI guide immediately says: "Let's figure out what kind of case report this is first. Tell me about the case in one sentence." The blank page is gone. There is a conversation. The overwhelm has a shape now.

### Stage 2: "I need to understand the literature" (Day 1-3)
**Emotion:** Frustrated by search volume, unsure what's relevant, tired of abstracts.
**ScholarSync moment:** Types the clinical question into Deep Research. Watches it search PubMed, Semantic Scholar, and OpenAlex simultaneously. Sees the results ranked by relevance, color-coded by evidence level. Level I papers at the top — meta-analyses, systematic reviews. Reads the AI synthesis: "The evidence strongly favors X, with two RCTs (Level II) confirming Y, though one conflicting study from 2019 suggests Z." For the first time, they understand the landscape. **Emotion shifts to:** Confident, oriented, ready.

### Stage 3: "I'm actually writing now" (Day 4-10)
**Emotion:** Engaged, occasionally stuck, but never panicking.
**ScholarSync moment:** In Learn Mode, the AI asks: "You said the intervention was unusual — what specifically makes it different from standard of care?" The student thinks. Types. The AI probes further. The student realizes what their actual argument is. They write it themselves. It's good. **Emotion:** Pride. "I wrote this."

### Stage 4: "I need citations" (Day 11-14)
**Emotion:** Previously: dread. Now: routine.
**ScholarSync moment:** Opens the saved paper in the library, clicks "Cite," sees Vancouver format ready to copy. Opens the citation dialog in the Studio, inserts the citation with one click. The reference appears at the bottom automatically. **Emotion:** Relieved, competent.

### Stage 5: "Is this any good?" (Day 15-20)
**Emotion:** Uncertain about quality, anxious about submission.
**ScholarSync moment:** Runs the Checks tab. AI detection: 12% — low risk. Writing analysis: 3 passive voice instances flagged. Clicks "AI Fix" — reviews the suggestion, accepts it. The paper looks professional. **Emotion:** Reassured, ready.

### Stage 6: "Ready to submit" (Day 21)
**Emotion:** Confident. Maybe even excited.
**ScholarSync moment:** Clicks Export. Downloads the Word file formatted to Vancouver, Times New Roman, 1.5 spacing, reference list at the bottom. No reformatting needed. Attaches it to the submission portal. Submits. **Emotion:** Accomplished. "I did this."

### Stage 7: "Accepted" (Week 8)
**Emotion:** Validated, proud, ready to do it again.
**ScholarSync moment:** (This is the moment we're building toward.)

---

## PART 9: PROOF POINTS

### Technology Credibility
- **Multi-source search:** PubMed (35M+ papers), Semantic Scholar (200M+ papers), OpenAlex (250M+ works) — the three largest academic databases, searched simultaneously.
- **Claude AI (Anthropic):** The same AI that powers some of the most advanced AI applications in the world. Not a generic GPT wrapper. Dual-model architecture: Claude Haiku for speed, Claude Sonnet for quality.
- **Reciprocal Rank Fusion + Cohere Rerank:** The same ranking methodology used by enterprise search systems — papers appearing in multiple databases get boosted. Cross-encoder reranking means results ranked by true semantic relevance.
- **HyDE (Hypothetical Document Embeddings):** A research-grade retrieval technique — the AI writes a hypothetical answer to your question, embeds it, then finds papers whose language patterns match. More accurate than query-only search.
- **pgvector embeddings:** Papers are embedded into 1,536-dimensional vector space. Every chunk of every uploaded PDF is indexed. RAG (Retrieval-Augmented Generation) chat cites the specific page and section it pulled from.
- **71-table database schema:** Built to support a complete research lifecycle — from initial search through publication. Not a prototype. An infrastructure investment.
- **PRISMA 2020 compliance:** The systematic review engine produces artifacts that meet the PRISMA 2020 reporting standards — the most cited methodological framework in systematic review methodology.
- **RoB 2 (Risk of Bias 2):** Cochrane's current standard for assessing RCT quality. Automated domain-level assessment against all five domains.
- **Rate-limited, authenticated API infrastructure:** Upstash Redis rate limiting. Clerk authentication. Production-grade infrastructure.

### Methodology Credibility
- Systematic review workflow follows Cochrane methodology.
- Screening follows established triple-agent consensus methodology.
- Citation management outputs Vancouver, the standard for medical journal submissions.
- Learn Mode follows established evidence on Socratic teaching methodology in medical education.
- Writing analysis includes Flesch Reading Ease, Gunning Fog Index, academic jargon detection.

### Compliance Signals
- AI detection built with acknowledgment of the academic integrity landscape.
- Humanization feature designed to preserve factual content while adjusting tone — not to deceive, but to make legitimately human-written improvements.
- Copyleaks integration for professional-grade plagiarism detection.
- The Learn Mode's explicit refusal to write for users is a documented product decision, not a marketing claim.

---

## PART 10: VOICE AND TONE

### The ScholarSync Personality
ScholarSync sounds like the best professor you ever had — the one who challenged you, believed in you, and made you smarter. Not the intimidating professor who made you feel stupid for asking questions. Not the easy professor who let you coast. The one who pushed back when you took shortcuts and celebrated when you got it right.

### Core Tone Attributes

**Confident without arrogance.**
We know what we do well. We say it plainly. We don't hedge everything or bury claims in qualifications. But we don't dismiss other tools or talk down to users who currently use them.

**Academic but not stuffy.**
This is a product for people in academic medicine, not a policy document. Write like a smart colleague, not a textbook. Short sentences where short sentences work. Plain words where plain words are precise enough.

**Warm but not patronizing.**
Medical students are smart, capable people in a demanding environment. They don't need to be coddled. They need to be respected and given better tools. Speak to their capability, not their difficulty.

**Direct and specific over vague and aspirational.**
Not: "Unlock your research potential."
Yes: "Search PubMed, Semantic Scholar, and OpenAlex simultaneously. Get results ranked by evidence level. In under two minutes."

**Honest about what it doesn't do.**
ScholarSync doesn't write for you in Learn Mode. We say that clearly and proudly. The product has a point of view on academic integrity. That point of view should come through in the copy.

### Language Guidelines

**Use:**
- Active voice throughout
- Specific numbers (30 papers, 3-5 minutes, Level I evidence)
- Before/after contrasts (research in 3 tabs vs. research in one place)
- Medical terminology naturally (RCT, PRISMA, PICO, Vancouver, IMRAD) — this audience knows it
- Questions that name the pain ("Still reformatting references when the journal changes?")

**Avoid:**
- "AI-powered" as a standalone claim (say what the AI does specifically)
- "Revolutionize," "transform," "unlock potential" — generic and empty
- Overstating automation ("write your paper for you") — this is legally and ethically wrong for this product
- Diminishing the user ("even beginners can...") — insulting to a medical student
- Passive voice (ironic for a product with a writing coach)

### The Headline Formula That Works for ScholarSync
`[What they currently struggle with] → [What ScholarSync makes possible]`

Examples:
- "40 browser tabs for one literature review. Or one search in ScholarSync."
- "Rejected for inadequate literature review. Not anymore."
- "Your supervisor won't write your paper. Now ScholarSync won't either. Here's what it will do."
- "Literature search shouldn't take three hours. Ours takes three minutes."

### What ScholarSync Is Not
- It is not a ghostwriter. (Learn Mode won't write for you.)
- It is not a plagiarism machine. (AI detection is built in, not bolted on.)
- It is not just another AI writing tool. (The editor knows you're writing a case report, not a blog post.)
- It is not built for the US or European market and repackaged for India. (It's built for Indian medical education, with Indian pricing, with Indian journal targets.)

---

## APPENDIX: Technical Stack Reference for Copywriters

*These facts can be used for credibility — use specific claims, not generic "AI-powered" language.*

- **AI Models:** Claude Sonnet (quality tasks) + Claude Haiku (speed tasks) via Anthropic
- **Research Sources:** PubMed (NCBI EFetch API with MeSH), Semantic Scholar (Graph API), OpenAlex (CC0, 250M works), Unpaywall (OA PDF lookup)
- **Ranking:** Reciprocal Rank Fusion + Cohere Rerank v3.5 cross-encoder
- **Editor:** Tiptap (ProseMirror) with 20+ academic extensions
- **Database:** PostgreSQL with pgvector for semantic search, 71-table schema
- **Auth:** Clerk (enterprise-grade)
- **Payments:** Razorpay (INR)
- **Export:** pdf-lib (PDF), docx (Word), pptxgenjs (PowerPoint)
- **Citation formats:** APA 7, MLA 9, Chicago, Vancouver, BibTeX, RIS via citation-js
- **Rate limiting:** Upstash Redis
- **Infrastructure:** Next.js 16, deployed on GCP Cloud Run
- **PRISMA:** PRISMA 2020 flow diagram, RoB 2, triple-agent consensus screening
- **Systematic review:** Cochrane-methodology search strategy generation (MeSH, EMBASE, Cochrane formats)

---

*Brief prepared February 2026. For ScholarSync copywriting team use.*
*All feature descriptions verified against production codebase at `/Users/shaileshsingh/codename ScholarSync/`.*
