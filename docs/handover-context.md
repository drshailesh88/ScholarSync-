# ScholarSync - Handover Context

> This file is updated before context window gets tight. Re-read this + MASTER_REGISTRY.md + LIBRARY_MAP.md to get fully caught up.

---

## Last Updated: 2026-02-12

## Current State
- **Phase:** UI mockups redesigned + Library research complete + AI SDK & retrieval pipeline researched + Competitor stacks researched + Database comparison done. Ready for final architecture decisions → development.
- **What's done:**
  1. 12 HTML mockup pages redesigned with premium dark theme (indigo brand, glass effects, animations)
  2. Landing page rebuilt from writer2 repo copy with ScholarSync design system
  3. Full LIBRARY_MAP.md created — every button/feature mapped to a battle-tested library
  4. Master Registry documents every page, component, button, and backend wiring
  5. AI SDK research: Vercel AI SDK v6 + Mastra recommended for copilot
  6. 8-stage paper retrieval pipeline designed (SciSpace/Elicit-level)
  7. Competitor tech stacks researched (Elicit, Paperpal, Consensus, Jenni AI, Connected Papers, ResearchRabbit)
  8. Database deep-dive: 11 options compared, Convex vs Supabase as top contenders
  9. GCP analysis: Hybrid approach recommended (GCP for ML workloads, managed services for rest)
  10. Library updates: pdf-parse → unpdf+Docling, retext → retext+LanguageTool
- **What's next:** Founder locks architecture decisions (database, AI SDK, cloud) → begin development

## Key Files to Re-read
1. `docs/MASTER_REGISTRY.md` - Every page, component, button, and backend wiring
2. `docs/LIBRARY_MAP.md` - Open-source libraries for every feature/button
3. `docs/decisions-log.md` - All decisions made so far
4. `docs/RESEARCH-ai-sdk-and-retrieval-pipeline.md` - AI SDK choice + 8-stage retrieval pipeline
5. `docs/RESEARCH-competitor-tech-stacks.md` - How Elicit, Paperpal, Consensus, Jenni AI etc. built their stacks
6. `docs/RESEARCH-database-comparison.md` - 11 databases compared with pricing at scale
7. `docs/RESEARCH-library-updates.md` - Updated library choices (unpdf, Docling, LanguageTool)
8. `docs/RESEARCH-gcp-analysis.md` - GCP hybrid approach analysis
9. `Comprehensive Interview Questionnaire.sty` - The founder's complete vision interview

## The Stack (Quick Reference — Pending Final Decisions)
| Layer | Library/Service | Status |
|-------|----------------|--------|
| **Frontend** | Next.js on Vercel | Decided |
| **AI SDK** | Vercel AI SDK v6 + Mastra | Researched, pending approval |
| **Editor** | Tiptap (ProseMirror) | Approved |
| **Writing Analysis** | retext + LanguageTool | Researched, pending approval |
| **Citations** | citation-js | Approved |
| **Paper Search** | PubMed + Semantic Scholar + OpenAlex (REST) | Decided |
| **Retrieval Pipeline** | SPECTER2 + Cohere Rerank + pgvector | Researched, pending approval |
| **Plagiarism + AI Detection** | Copyleaks API | Approved |
| **PDF Extraction** | unpdf + Docling microservice | Researched (replaces pdf-parse) |
| **PDF Viewer** | @react-pdf-viewer/core | Decided |
| **PDF Export** | Puppeteer | Decided |
| **DOCX Export** | docx | Decided |
| **LaTeX Export** | Pandoc (CLI) | Decided |
| **PPTX Slides** | pptxgenjs | Decided |
| **File Upload** | react-dropzone | Decided |
| **Auth** | Clerk | Decided |
| **Backend/DB** | Convex OR Supabase | **Pending decision** |
| **Cloud (ML workloads)** | GCP Cloud Run + Vertex AI | Researched, pending approval |
| **Payments** | Razorpay | Decided |

## Project Vision (Quick Recap)
- **What:** SciSpace meets KhanAmigo - all-in-one academic writing platform
- **Who:** 3rd-year MD students in India (primary), expandable to all sciences
- **Core Modes:** Learn Mode (Socratic coaching via Mastra Agent) + Draft Mode (AI writing via AI SDK)
- **Core Features:** Paper Search (8-stage pipeline), AI Writing, Plagiarism Check, AI Detection, Citations, Slides Generator, Notebook Mode (RAG)
- **Tech:** Vercel (frontend), TBD (database), Clerk (auth), Razorpay (payments), GCP (ML microservices)
- **Price:** Free / INR 1,000/mo Basic / INR 2,000/mo Pro
- **Launch:** July 2026
- **Priority:** Reliability > Speed > Cost

## Important Notes
- Founder is not from tech/business background - needs explanation for technical concepts
- Solo founder running operations with AI agents
- Token-based usage limits critical to prevent subscription sharing abuse
- All file access strictly locked to owning user
- HIPAA-adjacent compliance needed (Indian medical data regulations)
- writer2 GitHub repo (github.com/drshailesh88/writer2) used as landing page copy reference — rest of that repo's code was discarded
