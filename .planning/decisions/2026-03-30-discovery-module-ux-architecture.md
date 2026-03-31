# Planning Session: Discovery/Literature Search Module — UX, Architecture, and Web Search Expansion
**Date:** 2026-03-19 through 2026-03-30
**Source:** Claude.ai + ChatGPT (multi-session)
**Status:** captured

## Context
ScholarSync has a strong academic search pipeline (PubMed + Semantic Scholar + OpenAlex + ClinicalTrials.gov + arXiv, with RRF fusion, Cohere rerank, evidence levels, journal quality). The founder wants to expand the Discovery/Research module to serve non-academic users (journalists, bloggers, curious readers) by adding web search, news, and discussion sources — while keeping the academic search world-class. Two parallel planning threads: (1) UX and product positioning decisions, (2) technical research on open-source reranking and search quality infrastructure.

---

## Key Decisions Made

### Product Positioning

1. **ScholarSync is a "workspace for evidence-based writing," not a search engine.** The home surface is projects/drafts, not a search bar. Search is a capability invoked from the workspace. Rejected: "Perplexity clone" positioning, "general second brain for everyone" (too broad). Rationale: defensible niche is people whose writing depends on sources — researchers, journalists, policy analysts, Substack writers, evidence-based Twitter threads.

2. **The Research module should exist as a separate module, not be collapsed into the agent.** The agent in the editor is "find me a source while I write." The research module is "spend 30 minutes exploring what's out there." Different postures, different intentions. The research module also serves as a trust-building surface for new users. Rejected: merging everything into the agent sidebar.

3. **The agent should NOT change appearance between modules.** Same agent, same sidebar, same conversation thread — everywhere in the app. What changes is the output format (paper cards in editor, richer cards in research module, synthesis blocks for overview queries). Rejected: different agent personas/skins per module. Rationale: changing appearance signals "these are separate products bolted together."

### UX Architecture

4. **Tabs organized by user intent, not content format.** Four tabs: `Academic | Web & Reports | News | Discussions`. NOT Google-style format tabs (images, videos, shopping). Rationale: a researcher doesn't want Reddit cluttering their paper results; a blogger doesn't want 50 PubMed papers. Tabs let each user type land in their home.

5. **No "All" tab.** The synthesis at the top IS the "All" view — it draws from every source type and tells the blended story with citation numbers colored by evidence quality. Each tab below is a focused drill-down. Rejected: "All" tab that mixes papers with Reddit posts (impossible to rank well — signals are completely different across source types). Google has spent 25 years on this and still doesn't do it perfectly.

6. **Synthesis is ONE block at the top, generated from ALL source types, not per-tab.** One LLM call on the top-N results across all categories. Each citation number in the synthesis is colored by evidence quality (green = Level I, blue = RCT, etc.). The synthesis runs once per search, not per tab switch. Rejected: per-tab synthesis (expensive, slow, fragments the insight).

7. **Default tab is detected by query intent, with Academic as the tiebreaker.** "SGLT2 inhibitors" → Academic. "Why is everyone talking about Ozempic" → News. "Ozempic side effects reddit" → Discussions. Ambiguous queries → Academic (scholar-first positioning). Tab switching is instant (client-side filter on already-fetched results, not a new search).

8. **Each tab has its own filter bar, tailored to that source type.** Academic: date range, study type, evidence level, journal quartile, open access. Web: date range, domain type. News: date range, region. Discussions: subreddit/forum, minimum upvotes. This is "better PubMed" — same filter power, actually usable UI.

9. **Each tab has count badges.** Papers (23), News (8), Web (15), Discussions (4). User immediately knows coverage landscape.

10. **Trust indicators on every source, appropriate to type.** Academic: colored left-border by evidence level (green=I, blue=II, amber=III). Web: domain credibility accent (gold=government, silver=major journalism). Discussions: upvote count + subreddit name. This is the scholar-first advantage — even web results come with quality assessment.

### Agent Integration

11. **The editor sidebar should use the same search APIs as the Research module.** Currently the Studio's ResearchSidebar calls `/api/research/search` while the Research page calls `/api/search/unified`. Point them at the same endpoint for identical results. Verified: this is a routing change, not new engineering.

12. **The Workbench Assistant's "Open" scope is where web search lives in the editor.** When user is in Draft mode with Open scope, the agent searches the web (via SearXNG when available) rather than just academic databases. The scope switching infrastructure already exists.

### Database

13. **Path A: extend `papers` table to `sources` table.** Add `sourceType` column (academic_paper, web_article, news_article, discussion_post, report). Academic-specific fields (doi, pmid, evidenceLevel, journalQuartile) stay null for web sources. Add new nullable columns: url, domain, domainAuthority, snippet, thumbnailUrl. One migration, backward compatible. Rejected: Path B (separate `sources` table — creates split, two save flows, two places agent queries). Decision: do this when Web tab ships, not before.

### Build Sequence

14. **Incremental tab launch, quality-gated.** Launch order:
    - Phase 1: Wire orphaned quality modules (qualityRank, enrichStudyTypes, expandQuery) — DONE, merged PR #50
    - Phase 2: Add synthesis block to Research page (AISynthesisPanel exists, extend it)
    - Phase 3: Deploy SearXNG (Docker on GCP), build Web tab with domain authority signals
    - Phase 4: Extend papers → sources schema
    - Phase 5: Add News tab
    - Phase 6: Add Discussions tab
    Each tab only ships when its quality is defensible. One excellent tab beats four mediocre ones.

---

## Open Questions

- [ ] SearXNG deployment strategy — Docker on GCP alongside ScholarSync? Separate service? Sidecar?
- [ ] How to handle SearXNG rate limiting and caching for cost control
- [ ] Domain authority scoring methodology — use an existing dataset? Build from scratch? Start with a static tier list?
- [ ] Should synthesis be premium-only or available to free users? (Currently AISynthesisPanel is premium-only)
- [ ] How to handle the "save web source to library" UX — same button as papers? Different visual treatment?
- [ ] Content extraction strategy — Firecrawl (self-hosted), Jina Reader API (free tier), or Trafilatura?
- [ ] How to handle recency scoring — add a `yearWeight` / `freshnessBoost` to quality-ranker.ts?
- [ ] Click-through rate / user feedback loop — how to learn which results users find useful over time?

---

## Constraints & Requirements

- Medicine is default. No domain param = current behavior unchanged.
- Annealing score must stay FROZEN (>95). 139 E2E tests must pass.
- Never break existing medical functionality.
- Vertical slices only — each task cuts through all layers.
- Academic tab must remain world-class — adding web search must not dilute it.
- SearXNG integration must be additive (only called when web/news/discussions tabs are active).

---

## Next Steps

- Capture the open-source reranking research as a separate decisions file (done — see companion file)
- Write PRD for Phase 2 (synthesis block on Research page)
- Write PRD for Phase 3 (SearXNG + Web tab)
- Deploy SearXNG in dev environment for testing

---

## Raw Notes

### Source: Claude.ai discussion (March 18-19, 2026)

**PubMed strengths:** honest, powerful filters, saved searches. **Weaknesses:** ugly, wall of text, no visual hierarchy, no synthesis, keyword-based only, papers only.

**Perplexity strengths:** respects time, synthesis is the product, follow-up questions, Deep Research mode. **Weaknesses:** can't evaluate sources (citation [3] might be Nature or random blog), no browsing/scanning, no landscape view, dangerous for researchers (black box), removed Focus modes and users revolted.

**Google strengths:** fast, comprehensive, tabs give clear destinations, AI Overview, "People also ask." **Weaknesses:** not designed for research, SEO-gamed, no evidence hierarchy, can't save to project, can't cite in draft, dead end for deep work.

**Key insight on tabs:** Perplexity removed Focus modes in Feb 2025, 150+ upvotes revolt on Reddit, 75% of one user's searches relied on Social mode. There's an opening.

**Key insight on synthesis:** ScholarSync's advantage is showing BOTH synthesis AND transparent evidence. Perplexity gives synthesis without evidence transparency. PubMed gives evidence without synthesis. ScholarSync gives both.

**Key insight on "All" tab:** An "All" tab mixing papers with Reddit is impossible to rank well — ranking signals are completely different. Google has spent 25 years and billions on this. The synthesis at top IS the "All" view.

**Key insight on product positioning:** Not "a search engine." Not "a research platform." A workspace where people who write from sources can find, evaluate, organize, and write — all in one place. This includes researchers, journalists, policy analysts, Substack writers, evidence-based Twitter threads. Excludes fiction writers, grocery lists, project management.

**Vane/Perplexica analysis:** MIT license, same tech stack (Next.js, TypeScript, Drizzle ORM, Tailwind). SearXNG bundled in Docker. Classifier detects query intent. Researcher agent loop (2/6/25 iterations for speed/balanced/quality). Available actions: web_search, academic_search, social_search, scrape_url, uploads_search, done. Recommendation: port search layer into ScholarSync, don't run as separate service. Key file: searxng.ts is 67 lines.

**Repos identified for web search expansion:**
- SearXNG — self-hosted metasearch, 70+ engines, Docker, zero cost
- Firecrawl — search + full content extraction, self-hostable
- Vane/Perplexica — 15k+ stars, study architecture
- Jina Reader API — free tier, URL → clean Markdown
- Trafilatura — Python, web content extraction, strips boilerplate
- newspaper3k/4k — Python, newspaper article extraction
- RSSHub — RSS feed generator for sites without feeds
- Tavily — purpose-built for AI agents, $0.008/credit
- Exa — neural search, semantic not keyword
- Brave Search API — 2,000 free queries/month
- Perplexity Sonar API — search + LLM in one call
- GPT-Researcher — 20k+ stars, auto-research agent
- Stanford STORM — multi-perspective research synthesis

**Claude Scientific Skills repo analysis (K-Dense-AI/claude-scientific-skills):** Cannot use directly (Python CLI scripts for Claude Code, not Vercel AI SDK tools). Three integration paths: (1) Port Python logic to TypeScript tools (recommended), (2) Use MCP servers directly (for BGPT), (3) Use SKILL.md files as agent system prompts (free value). Priority: enhance system prompt with discipline-aware instructions → port arXiv source → port bioRxiv → add BGPT MCP → add scientific-critical-thinking evaluation.

---

## Addendum: The "Why" Behind Explore (Founder Thought Dump, 2026-03-30)

### The Core Thesis

Everyone is producing AI-generated content. Nobody is writing for humans anymore. People are prompting AI and publishing the output without any real sources, real data, or real reporting behind it. ScholarSync's Explore module exists for the people who refuse to do that.

### Who This Serves

Not just academics. Writers of all kinds who want their work backed by substance:
- A blogger writing a well-researched article
- A journalist publishing a newspaper piece
- A social media creator who wants their post backed by real evidence
- A finance writer who needs real data, not AI-generated analysis
- Anyone who wants to write pieces that actually matter

### What "Explore" Actually Is

It's NOT "web search because Perplexity has it." It's a quality source discovery layer for evidence-based writing. The output isn't an answer — it's curated raw material: a newspaper article from FT, a government report from WHO, a Reddit thread with practitioner experience, an academic paper with hard data.

### The Anti-SEO Positioning

The whole point is surfacing "what matters" not "what ranks on Google." If the Explore module shows the same SEO-gamed results Google shows, we've failed. Source quality indicators aren't a nice-to-have — they're the entire product thesis. Every result must tell the user WHY it's trustworthy (government source, peer-reviewed, major journalism, primary data).

### The Workflow

User finds quality sources in Explore → saves them to a project → switches to the editor → writes their piece backed by real evidence → cites properly. One platform, one workflow. The sources ARE the product. The writing tools amplify them.
