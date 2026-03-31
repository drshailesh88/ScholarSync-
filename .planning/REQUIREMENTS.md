# Requirements — Explore Module V1

## Version
v1 — Multi-Source Discovery with Web/News/Discussions Tabs

## Must Have (v1)

### Search Infrastructure
- [x] SearXNG deployed on GCP and returning JSON results for web, news, and social media queries
- [x] SearXNG source adapter normalizes results into the existing UnifiedSearchResult format
- [x] Unified search route fans out to SearXNG alongside existing academic sources
- [x] Web/News/Discussions tabs search via SearXNG categories (general, news, social media)
- [ ] Academic tab continues using existing 5-source pipeline (PubMed, S2, OpenAlex, arXiv, ClinicalTrials) — zero regression
- [ ] Results appear in under 2 seconds
- [x] Graceful degradation: if SearXNG is down, Academic tab works normally; other tabs show "temporarily unavailable"

### Trust & Quality
- [ ] Trust Tier classifier assigns Government/Major Journalism/Community/Other to every web result
- [ ] Trust Indicator (3px colored left border) visible on every result card
- [ ] Cohere rerank applied to web results (same as academic results)
- [ ] Domain preferences (Mute/Lower/Neutral/Higher/Prefer) filter and boost results
- [ ] Source Info panel shows domain details and preference controls on shield icon click

### Explore Page UX
- [ ] Explore page with Kagi-style centered search bar (glass-morphism pill)
- [ ] Landing page shows only search bar and tabs — no feed, no trending, no recommendations
- [ ] Horizontal tabs: Academic | Web | News | Discussions | More
- [ ] Tab switching is instant (client-side filter on already-fetched results)
- [ ] Filter pills below tabs: Scope | Order By | Time | Options | Advanced
- [ ] Single-column results layout, 780px max-width, 5-6 results per screen
- [ ] Traditional pagination (not infinite scroll)
- [ ] Stats line showing result count and timing

### Result Cards
- [ ] Card anatomy: trust indicator + title + URL breadcrumb + author/source + snippet + date + save icon + actions menu
- [ ] Academic tab cards show journal name, authors, evidence level
- [ ] News tab cards show publication name and relative time
- [ ] Discussions tab cards show platform, community, engagement
- [ ] Hover: subtle background change, action buttons appear
- [ ] Mobile: save icon and actions menu always visible (no hover)

### Actions Menu
- [ ] "..." menu on each result with: Save to Library, Save to Project, Cite in Draft, Open Original, Summarize Page, Ask About Page, More from this source, Block this source, Copy Link
- [ ] Keyboard shortcuts shown inline in menu

### Saving & Library
- [ ] One-click save (+) to Library on every result
- [ ] Save icon transforms from (+) to checkmark when saved
- [ ] Subtle toast "Saved to Library" auto-dismisses in 2 seconds
- [ ] Duplicate prevention (same URL, same user)
- [ ] All metadata auto-captured at save time (title, URL, domain, author, date, snippet, source type, trust tier, tab, search query, thumbnail)
- [ ] Web sources stored in new `web_sources` table (papers table NOT touched)
- [ ] Saved sources linkable to multiple projects via `project_web_sources`
- [ ] Plan-dependent save limits enforced

### Content Extraction & Annotation
- [ ] Background content extraction via Mozilla Readability after save (save feels instant)
- [ ] Clean HTML snapshot stored for highlighting
- [ ] User can highlight passages in saved web sources with 5 colors (yellow, green, red, blue, purple)
- [ ] User can add notes to highlights
- [ ] User can add a general note to a web source
- [ ] Highlights citable in drafts via the editor
- [ ] Same annotation UX for web sources and academic papers

### Scopes
- [ ] Scope dropdown in filter pills with built-in options (All Sources, Academic, Web, News, Discussions)
- [ ] User can create custom Scopes with included/excluded domains, keywords, date ranges
- [ ] Max 20 Scopes per user, free for all plans
- [ ] Scopes can be toggled on/off and reordered
- [ ] "Edit Scopes..." link opens settings page

### Domain Preferences
- [ ] 5-level system: Mute / Lower / Neutral / Higher / Prefer
- [ ] Shield icon on each result opens Source Info panel with preference controls
- [ ] "My Sources" settings page to manage all domain preferences
- [ ] Max 1000 domain preferences, free for all plans
- [ ] Muted domains never appear in results
- [ ] Preferred domains appear near top

### On-Demand Synthesis
- [ ] Click button or press Q to generate synthesis
- [ ] Synthesis appears above results with inline citation markers
- [ ] Citation markers colored by Trust Tier
- [ ] Synthesis streams word-by-word
- [ ] Synthesis is collapsible
- [ ] Only fires when user explicitly requests (not automatic)

### Keyboard Navigation
- [ ] j/k or arrows to navigate results
- [ ] / to focus search bar
- [ ] 1/2/3/4 to switch tabs
- [ ] S to save, O to open, C to cite, Q to synthesize, I for info, B to block
- [ ] X to select, Shift+arrows to extend selection
- [ ] ? to show keyboard shortcuts overlay

### Search History
- [ ] Clock icon next to search bar
- [ ] Shows recent searches (last 100, FIFO)
- [ ] Each entry shows query, tab, scope
- [ ] Delete individual or clear all

### Soft Delete
- [ ] Deleted web sources go to Trash for 30 days
- [ ] Highlights and notes cascade-delete with source
- [ ] Recovery within 30 days restores everything

### Navigation
- [ ] Sidebar renamed from "Discover" to "Explore"
- [ ] Route updated accordingly

## Should Have (v1.1)

- [ ] Firecrawl API fallback for pages Readability can't extract
- [ ] "More" tab containing Images, Videos, Podcasts (if SearXNG supports them)
- [ ] Advanced Search modal with structured query builder
- [ ] Result grouping (same domain) — toggleable in settings
- [ ] Bulk actions on selected results (save all, tag all)

## Out of Scope

- Sharing web sources or public links
- Email notifications for saved search alerts
- Import from Readwise/Instapaper
- Export web sources
- Community domain rankings
- Shareable Scopes
- AI-suggested Scope domains
- Self-hosted reranker
- Real-time collaboration on annotations
- Browser extension
- Offline support
- Admin panel

## Source

- PRD: GitHub Issue #51
- Planning decisions: `.planning/decisions/2026-03-30-discovery-module-ux-architecture.md`
- Reranking research: `.planning/decisions/2026-03-30-open-source-reranking-research.md`
- UX Brief: `.planning/ux-brief.md`
- UI Brief: `.planning/ui-brief.md`
- Data Requirements: `.planning/data-requirements.md`
- Infra Requirements: `.planning/infra-requirements.md`
- Kagi Reverse Engineering: `.planning/kagi-reverse-engineering.md`
- Competition Research: `.planning/competition-research.md`
- Ubiquitous Language: `UBIQUITOUS_LANGUAGE.md`
- Schema: `src/lib/db/schema/explore.ts`
- Infra: `infra/searxng/`, `INFRA_DECISIONS.md`
