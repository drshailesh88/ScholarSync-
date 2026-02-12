# ScholarSync - Design & Technical Decisions Log

> Append-only log of all decisions made during development. Never delete entries.

---

## 2026-02-11 - Initial Mockup Import

**Decision:** Imported 12 UI mockup pages from Gemini as the baseline design reference.
**Context:** Founder (Shailesh) generated initial mockups using Gemini. These serve as the visual spec for development.
**Pages imported:** Landing, Auth, Dashboard, Projects, Library, Deep Research, Studio, Notebook, Writing Analysis, Final Checks, Slides Generator, Settings.
**Status:** All stored in `ui-mockups/` directory, documented in `MASTER_REGISTRY.md`.

## 2026-02-11 - Landing Page Redesign (writer2 Reference)

**Decision:** Replaced Gemini-generated landing page with a new design based on writer2 repo (github.com/drshailesh88/writer2) copy/structure.
**Context:** Founder liked the writer2 landing page content and structure but wanted ScholarSync's design system applied. The rest of writer2's app was deemed unsuitable ("trash"), but the landing page copy was retained.
**What changed:**
- Adopted writer2's section structure: Hero, Free Plagiarism CTA, Two Modes, 6-Feature Grid, How It Works (3 steps), 3-Tier Pricing, CTA Banner, Footer
- Retained writer2's copy verbatim (headlines, descriptions, feature text, pricing tiers: Free/Rs.1,000 Basic/Rs.2,000 Pro)
- Applied ScholarSync design system: dark theme (slate-950), indigo brand (#6366f1), Plus Jakarta Sans + Merriweather, Phosphor Icons, Tailwind CDN + Alpine.js
- Added premium touches: dot-pattern backgrounds, glass navbar, gradient text, hover-lift animations, scroll fade-in, glow-pulse CTA, accent bars on feature cards, mode cards with left border accents (amber/sky)
- Hero includes a realistic app mockup preview showing the Studio editor with CRISPR content and AI suggestion
- All CTAs link to auth page (02-auth-page.html)
**Pricing used:** writer2 pricing (Free/Rs.1,000/Rs.2,000) — NOT the original Gemini mockup pricing (Free/Rs.499/Custom)
**Status:** Complete. Viewable at localhost:50006/01-landing-page.html

## 2026-02-11 - Full UI Redesign (All 12 Pages)

**Decision:** Redesigned all 12 mockup pages to match the new landing page's premium dark theme.
**Context:** Founder wanted the UI to be "extremely beautiful." Used Opus 4.6 agents to redesign all pages in parallel.
**Design System Applied:**
- Dark theme: bg-slate-950 base, slate-900 for cards/panels
- Brand: Indigo #6366f1 with full brand-50 to brand-700 scale
- Glass effects: backdrop-blur on navs, modals, panels
- Animations: hover-lift (spring easing), fade-up scroll, glow-pulse CTAs
- Borders: border-white/5 (subtle), border-white/10 (emphasis)
- Cards: bg-slate-900/50 border border-white/5 rounded-2xl
- Dot patterns, gradient text, accent bars
**Pages redesigned:** All 12 (01-12)
**Status:** Complete. All viewable at localhost:50006

## 2026-02-11 - Library Research & Selection

**Decision:** Mapped every button/feature to a battle-tested, permissively-licensed open-source library.
**Context:** Founder requested a deep dive on GitHub for libraries to wire under each button. Research conducted in parallel across 4 tracks: Editor/Writing, Citations/Search, Plagiarism/AI, PDF/Export.
**Key selections:**
- Editor: Tiptap (MIT, ~28K stars)
- Citations: citation-js (MIT, handles APA/MLA/Chicago/Vancouver/AMA + 10K styles)
- Paper Search: Direct REST to PubMed (public domain), Semantic Scholar, OpenAlex (CC0)
- Plagiarism + AI Detection: Copyleaks API (one vendor, both features, ~$0.40/user/mo)
- Writing Analysis: retext ecosystem (MIT, unified.js)
- PDF: @react-pdf-viewer (Apache-2.0) + pdf-parse (MIT) + Puppeteer (Apache-2.0)
- DOCX: docx npm package (MIT)
- PPTX: pptxgenjs (MIT)
- LaTeX: Pandoc CLI (GPL-2.0 as subprocess = SaaS-safe)
- File Upload: react-dropzone (MIT)
**Full details:** `docs/LIBRARY_MAP.md`
**Status:** Research complete. Awaiting founder approval before wiring begins.

## 2026-02-11 - AI SDK Research

**Decision:** Researched AI SDK options for the copilot and recommended Vercel AI SDK v6 (foundation) + Mastra (agent orchestration).
**Context:** Needed to determine how Learn Mode (Socratic coaching), Draft Mode (AI writing), Chat with PDF (RAG), and research synthesis would be powered.
**Evaluated:** Vercel AI SDK, LangChain.js, LlamaIndex.ts, OpenAI SDK, Anthropic SDK, Mastra, CrewAI JS.
**Recommendation:** Two-layer architecture — AI SDK for streaming/structured output/tool calling, Mastra for agent workflows with human-in-the-loop.
**Full details:** `docs/RESEARCH-ai-sdk-and-retrieval-pipeline.md`
**Status:** Research complete. Awaiting founder approval.

## 2026-02-11 - Paper Retrieval Pipeline Design

**Decision:** Designed an 8-stage paper retrieval pipeline to match SciSpace/Elicit capabilities.
**Context:** Direct REST to PubMed/S2/OpenAlex is the data layer. The intelligence layer adds: query augmentation, SPECTER2 embeddings, Cohere re-ranking, citation snowballing, structured extraction, synthesis with attribution.
**Key new components:** SPECTER2 (academic embeddings), Cohere Rerank v3.5, pgvector (vector storage), Mastra Workflows (orchestration).
**Full details:** `docs/RESEARCH-ai-sdk-and-retrieval-pipeline.md`
**Status:** Research complete. Awaiting founder approval.

## 2026-02-11 - Library Updates (pdf-parse, retext)

**Decision:** Recommended replacing pdf-parse with unpdf + Docling. Recommended augmenting retext with LanguageTool.
**Context:** pdf-parse is unmaintained, no TypeScript, no table extraction. unpdf is the modern replacement. Docling (IBM Research) achieves 97.9% accuracy on academic tables. LanguageTool adds grammar/spelling that retext doesn't cover.
**Changes:** pdf-parse → unpdf (npm) + Docling (Python microservice). retext stays, LanguageTool added.
**Full details:** `docs/RESEARCH-library-updates.md`
**Status:** Research complete. Awaiting founder approval.

## 2026-02-11 - Competitor Tech Stack Research

**Decision:** Researched how Elicit, Paperpal/CACTUS, Consensus, Jenni AI, Connected Papers, and ResearchRabbit built their stacks.
**Key findings:**
- Elicit: Multi-cloud K8s, Next.js, Vespa (search engine, not vector DB), SPLADE, custom fine-tuned models, Flyte, $31M raised
- Paperpal: AWS, React, MongoDB+DynamoDB+Redis, SageMaker, proprietary models, bootstrapped to $92M revenue
- Consensus: GCP, Elasticsearch+ELSER, GPT-4, $19.2M raised
- Jenni AI: GCP, React+MobX, Node.js, OpenAI GPT, $850K raised → $10M ARR (most capital-efficient)
- GCP is most popular cloud among smaller academic AI startups
**Full details:** `docs/RESEARCH-competitor-tech-stacks.md`
**Status:** Research complete.

## 2026-02-11 - Database Deep Dive

**Decision:** Compared 11 database options. Top contenders: Convex (best DX) vs Supabase (most mature ecosystem).
**Context:** Founder needs something easy to work with using LLM assistance, professional enough for traffic, cost-effective.
**Evaluated:** Convex, Supabase, Neon+Drizzle, MongoDB Atlas, Turso, Firebase, Appwrite, Xata, PlanetScale, CockroachDB, Railway PG.
**Eliminated:** Firebase (per-read pricing), PlanetScale (no free tier), CockroachDB (overengineered), Appwrite/Xata (smaller ecosystems).
**Full details:** `docs/RESEARCH-database-comparison.md`
**Status:** Research complete. Founder deciding between Convex and Supabase.

## 2026-02-11 - GCP Analysis

**Decision:** Analyzed GCP for ScholarSync. Recommended hybrid approach: keep Vercel+managed DB for main app, use GCP for ML workloads.
**Context:** Founder interested in GCP for startup credits ($200K), Google ecosystem, and tutorials.
**Recommendation:** Apply for GCP startup credits. Use Cloud Run (Mumbai) for Docling PDF microservice, Vertex AI for SPECTER2 embeddings. Don't replace Vercel or managed database with GCP services.
**Full details:** `docs/RESEARCH-gcp-analysis.md`
**Status:** Research complete. Awaiting founder decision.
