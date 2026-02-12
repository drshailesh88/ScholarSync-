# ScholarSync

**SciSpace meets KhanAmigo** — an all-in-one AI-powered academic writing platform for medical students and researchers.

## What is ScholarSync?

ScholarSync helps researchers write, research, and publish academic papers with AI assistance. It combines:

- **Learn Mode** — Socratic coaching that teaches research methodology (like KhanAmigo)
- **Draft Mode** — AI-assisted writing with rephrase, expand, summarize, and citation tools
- **Deep Research** — Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex with semantic retrieval
- **Chat with PDF** — Upload papers and ask questions with RAG
- **Plagiarism & AI Detection** — Check content integrity before submission
- **Citations** — Auto-format in APA, MLA, Chicago, Vancouver, AMA + 10,000 styles
- **Slides Generator** — Convert your paper into presentation slides
- **Notebook Mode** — Upload sources and synthesize research across papers

## Target Users

3rd-year MD students in India (primary), expandable to all sciences.

## Current Status

**Phase: Research & Design Complete → Ready for Architecture Decisions → Development**

### What's Done
- 12 UI mockup pages designed with premium dark theme
- Library research: every feature mapped to battle-tested open-source libraries
- AI SDK research: Vercel AI SDK v6 + Mastra recommended
- 8-stage paper retrieval pipeline designed (SciSpace/Elicit-level)
- Competitor analysis: Elicit, Paperpal, Consensus, Jenni AI, etc.
- Database comparison: 11 options evaluated
- GCP hybrid approach analyzed

### What's Next
- Lock architecture decisions (database, AI SDK, cloud)
- Begin development

## Project Structure

```
ScholarSync-/
├── ui-mockups/           # 12 HTML mockup pages (viewable in browser)
│   ├── 01-landing-page.html
│   ├── 02-auth-page.html
│   ├── 03-dashboard.html
│   ├── 04-my-projects.html
│   ├── 05-my-library.html
│   ├── 06-deep-research.html
│   ├── 07-the-studio.html      # Hero page — the editor
│   ├── 08-notebook-mode.html
│   ├── 09-writing-analysis.html
│   ├── 10-final-checks.html
│   ├── 11-slides-generator.html
│   ├── 12-settings.html
│   └── index.html               # Gallery view of all pages
├── docs/
│   ├── MASTER_REGISTRY.md        # Every page, component, button documented
│   ├── LIBRARY_MAP.md            # Open-source library for every feature
│   ├── decisions-log.md          # All decisions (append-only)
│   ├── handover-context.md       # Quick context for new sessions
│   ├── RESEARCH-ai-sdk-and-retrieval-pipeline.md
│   ├── RESEARCH-competitor-tech-stacks.md
│   ├── RESEARCH-database-comparison.md
│   ├── RESEARCH-library-updates.md
│   └── RESEARCH-gcp-analysis.md
└── Comprehensive Interview Questionnaire.sty  # Founder's vision document
```

## Tech Stack (Pending Final Decisions)

| Layer | Choice | Status |
|-------|--------|--------|
| Frontend | Next.js on Vercel | Decided |
| AI SDK | Vercel AI SDK v6 + Mastra | Pending approval |
| Editor | Tiptap (ProseMirror) | Approved |
| Citations | citation-js | Approved |
| Paper Search | PubMed + Semantic Scholar + OpenAlex | Decided |
| Retrieval Pipeline | SPECTER2 + Cohere Rerank + pgvector | Pending approval |
| Plagiarism + AI | Copyleaks API | Approved |
| PDF Extraction | unpdf + Docling | Pending approval |
| Auth | Clerk | Decided |
| Database | Convex OR Supabase | **Pending decision** |
| Cloud (ML) | GCP Cloud Run + Vertex AI | Pending approval |
| Payments | Razorpay | Decided |

## Pricing

- **Free** — Basic features
- **Basic** — INR 1,000/month
- **Pro** — INR 2,000/month

## Launch Target

July 2026

---

Built by Dr. Shailesh Singh with AI agent assistance.
