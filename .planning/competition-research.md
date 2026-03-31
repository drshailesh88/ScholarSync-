# Competition & Inspiration Research: ScholarSync Explore Module
**Date:** 2026-03-30
**Competitors analyzed:** 11
**Inspirations analyzed:** 4
**Focus:** Web/News/Discussions tabs in the Explore (Discovery) module — NOT the academic search tab

---

## THE CORE THESIS

ScholarSync's Explore module is NOT "web search because Perplexity has it." It's a quality source discovery layer for evidence-based writing. Everyone is producing AI-generated content with no real sources behind it. ScholarSync serves people who refuse to do that — bloggers, journalists, newsletter writers, social media creators who want their work backed by real reporting, real data, real evidence. The output isn't an answer. It's curated raw material that becomes the backbone of work that matters.

**The anti-SEO positioning:** If Explore shows the same SEO-gamed results Google shows, we've failed. Source quality indicators aren't a nice-to-have — they're the entire product thesis.

---

## COMPETITORS

### 1. Perplexity AI — "Ask anything. Get answers with sources."
**URL:** perplexity.ai
**Positioning:** AI answer engine for everyone. "Google replacement."
**Pricing:** Free / Pro $20/mo / Max $200/mo / Enterprise $40-325/seat/mo

**How They Present Information:**
- **Landing:** Aggressively minimal. Single centered search bar, Zen-like. Logo, search box, suggested topics. ~5-7 interactive elements total. Feels like Google circa 2005.
- **Results flow:** Sources cards (horizontal row, 5-8 compact cards with favicon + domain + title) appear FIRST → then AI synthesis streams below → then 5 follow-up question pills → then new input for conversation thread.
- **Synthesis format:** Paragraph-form prose with inline numbered citations [1][2][3]. Hover a citation → tooltip with snippet. Click → full source. Citations mimic academic writing conventions.
- **Focus modes (source selection):** Small toggleable pills below search bar: Web (default), Academic, Social (Reddit/X), YouTube, News, Finance. Pre-search filter, not post-search. Switching is instant. Default works without any selection — textbook progressive disclosure.
- **Pro Search:** Multi-step deep research showing progress ("Searching for X... Reading 12 sources... Synthesizing..."). Users tolerate longer waits when shown step-by-step progress.
- **Threads:** Each search creates a persistent conversation with full context. Threads saved in Library. Collections act as folders.

**UX Teardown:**
- **Information architecture:** Flat. Search → results → follow-up. Two clicks maximum to any feature.
- **Progressive disclosure:** Layer 0: search bar + optional focus mode. Layer 1: sources + answer + follow-ups. Layer 2: hover citation → snippet. Layer 3: Library, Collections, export.
- **Cognitive load:** Maximum 2 decisions at any point (query + focus mode). Remarkably low for a research tool.
- **What's hidden:** Model selection, API settings, formatting options, citation style preferences, export tools. All exist but require deliberate navigation.

**Infrastructure:**
- Frontend: Next.js (React, RSC, migrated to App Router)
- Search: Vespa (vector + lexical + ML ranking, 200B+ URLs)
- Inference: Custom ROSE engine, NVIDIA H100 GPUs, TensorRT-LLM
- CDN: Cloudflare
- Marketing site: Framer
- Models: Proprietary Sonar (fine-tuned Mistral-7B / Llama-2-70B)

**Strengths:**
- Synthesis quality is best-in-class
- Sources-first layout builds trust before answer
- Focus modes give control without complexity
- Conversational threading enables deep research sessions
- The absence of ads creates genuine calm

**Weaknesses:**
- All citations treated equally — a Nature paper and a random blog get the same [N] treatment. No quality grading.
- Cannot evaluate sources without clicking through. No evidence level, no journal quality, no domain authority visible.
- Removed focus modes briefly in Feb 2025 — users revolted (150+ upvote Reddit thread). Shows users deeply value source control.
- No workspace integration — Perplexity is a dead end. You read the answer and leave.
- No save-to-project, no cite-in-draft, no library. It's consumption, not creation.

**Why It Survives Despite Google:**
Perplexity respects your time. Google gives you 10 blue links and says "figure it out." Perplexity reads those 10 links for you and tells you what they say. The value proposition is TIME — not better results, but faster understanding.

---

### 2. You.com — "AI-powered productivity engine"
**URL:** you.com
**Positioning:** Multi-modal AI assistant with search. Chat-first, not search-first.
**Pricing:** Free / YouPro ~$20/mo

**How They Present Information:**
- **Landing:** Chat-first interface. Central input box with mode selector pills: Smart, Genius, Research, Create. Dark/light toggle. Minimal but signals "AI chatbot" not "search engine."
- **Results flow:** AI answer dominates viewport → inline numbered citations [1][2][3] → source cards as compact horizontal row or grid tiles → tabs for Sources, Images, Videos, News.
- **Mode system:** Smart (free, fast) / Genius (paid, GPT-4-class) / Research (paid, multi-step) / Create (paid, image gen). Modes as selectable pills near input. Lock icons on paid modes.
- **Research mode:** Multi-step with visible progress steps. Produces structured reports with sections.

**UX Teardown:**
- **Information architecture:** AI answer is primary, traditional results are secondary. This is the opposite of Kagi's philosophy.
- **Progressive disclosure:** Modes are visible upfront (potential overwhelm for new users). Source cards, images, videos, news organized into tabs below the answer.
- **Cognitive load:** Higher than Perplexity. 4 modes + mode descriptions + subscription prompts + mixed media tabs. Can feel noisy.
- **What's hidden:** Model configuration, API access, advanced settings.

**Infrastructure:**
- Frontend: Next.js (search app), Webflow (marketing)
- CDN: Cloudflare
- Analytics: Amplitude, Google Tag Manager
- Marketing: HubSpot, Warmly, Intellimize

**Strengths:**
- Multiple AI models in one interface
- Research mode produces genuinely useful structured reports
- Tab-based result organization (sources, images, videos, news)
- Dark mode well-implemented

**Weaknesses:**
- Mode selector overwhelming for new users (what does "Genius" mean without trying it?)
- Source card rows feel busy with 8-10 items
- Subscription upsells disrupt the flow for free users
- Sometimes shows ads that break the experience
- When multiple media types present, page becomes visually noisy

**Why It Survives Despite Google:**
You.com bets that users want AI to do the work entirely — synthesize, summarize, create. Google makes you click through and read. You.com reads and writes for you. The multi-model approach (choose GPT-4 or Claude) appeals to power users.

---

### 3. Kagi Search — "Search. Done right."
**URL:** kagi.com
**Positioning:** Premium, ad-free, privacy-respecting search for knowledge workers. "Fix Google."
**Pricing:** Starter $5/mo (300 searches) / Professional $10/mo (unlimited) / Ultimate $25/mo

**How They Present Information:**
- **Landing:** Almost aggressively minimal. Single search bar, centered. Logo. Nothing else. No tagline, no marketing copy, no feature callouts, no trending topics, no news feed. The message: "You came here to search. Here is the search box. Go."
- **Results flow:** Clean single-column results. Title (blue link) → URL (small, gray) → snippet. Generous line spacing. No ads. No "People also ask." No knowledge panels cluttering the sidebar. No video carousels.
- **Tabs:** Standard text links at top: Web, Images, Videos, News, Maps, Podcasts. Minimal, not elaborate.
- **Domain boost/block:** Small shield icon next to each result. Click → Raise, Lower, Block, Pin. Persistent across all future searches. Discoverable but not intrusive.
- **Lenses:** Pre-configured search filters — "Forums" (Reddit, HN, StackOverflow), "Programming" (developer docs), "Academic" (.edu, journals). Users can create custom lenses.
- **AI features:** FastGPT (quick answer at top of results, optional), Assistant (separate chat page), Summarizer (separate tool for URLs/videos). AI supplements search, does NOT replace it.

**UX Teardown:**
- **Information architecture:** Search-first. Traditional blue links are primary. AI is an optional addition. This is the anti-Perplexity.
- **Progressive disclosure:** Masterful. Landing = just search box. Results = clean links. Domain controls = small icon per result. Lenses = discoverable in settings. AI = separate tools. Each layer adds power without adding clutter.
- **Cognitive load:** Extremely low. The results page feels like reading a well-typeset document.
- **What's hidden:** Domain boost/block (discover organically), lenses (settings), AI model selection (assistant settings), custom CSS, search operators.

**Infrastructure:**
- Frontend: Server-rendered HTML with vanilla JS/SCSS — NO React/Vue/Svelte framework. Deliberately minimal JS.
- Backend: Crystal language (90% of search backend), PostgreSQL (raw SQL, no ORM)
- CDN: Google Cloud
- Search index: Hybrid — own crawlers (Teclis, TinyGem) + Google/Bing syndicated results
- Payments: PayPal
- AI: Multiple LLM backends (Claude, GPT-4, open models) — user chooses

**Strengths:**
- Speed. Pages load noticeably faster than Google (no ad auctions, no tracking scripts).
- Silence. The absence of noise creates genuine calm. Rare on the modern web.
- Respect. No dark-pattern upselling, no notification spam, no gamification.
- Control. Domain boost/block gives users real power over results.
- Typography and whitespace are genuinely well-considered.
- Paid = aligned incentives. Kagi's incentive is better search, not more ad revenue.

**Weaknesses:**
- Paid-only model limits adoption (most people won't pay for search)
- No synthesis on results page by default (FastGPT is opt-in)
- Domain boost/block requires learning curve
- Lenses are powerful but buried in settings
- Small team (~20-30 people) limits feature velocity

**Why It Survives Despite Google:**
Kagi survives because it offers what Google structurally cannot: search without conflicts of interest. Google's business model requires ads, which means results are influenced by advertisers. Kagi's business model is subscriptions, which means results are influenced only by quality. For knowledge workers who search 50+ times/day, the difference is transformative. The domain boost/block feature alone — "never show me Pinterest results again" — creates lock-in that Google can't match.

---

### 4. Brave Search — "Independent. Private."
**URL:** search.brave.com
**Positioning:** Independent search index. Privacy-first. Not relying on Google/Bing.
**Pricing:** Free / Premium $3/mo / API $5/1k requests

**How They Present Information:**
- **Landing:** Clean search bar, Brave logo. Slightly more chrome than Kagi (navigation links, some branding) but still restrained.
- **Results flow:** Traditional blue links with snippets. "Ask Brave" AI answer (powered by Qwen3) appears as an expandable block at the top. Standard tabs: Web, News, Images, Videos.
- **AI integration:** Ask Brave chatbot with grounding citations. 94.1% F1 on SimpleQA (outperforms ChatGPT and Perplexity on factual accuracy). But it's positioned as a supplement, not the primary experience.

**Infrastructure:**
- Frontend: SvelteKit
- Backend: Rust (performance-critical), Python (tooling)
- CDN: Amazon CloudFront
- Search index: Independent, built from scratch (not Google/Bing dependent)
- Analytics: None detected (privacy-first)

**Strengths:** Independent index, privacy-first, $3/mo (cheapest premium search), strong AI accuracy.
**Weaknesses:** Results quality sometimes lags Google. Limited AI features compared to Perplexity. Brand recognition low outside privacy community.
**Why It Survives:** Privacy. Some users will never use Google again for ideological reasons. Brave captures that audience at a price point ($3/mo) that makes it a no-brainer.

---

### 5. Andi Search — "Search for the next generation"
**URL:** andisearch.com
**Positioning:** Free, private, ad-free AI search with credibility scoring.
**Pricing:** Free (no account required)

**How They Present Information:**
- Direct answers synthesized from web, not a list of links. Claims 87% accuracy (beating Google, ChatGPT, Perplexity).
- Proprietary Trantora index analyzes page content for meaning AND credibility.
- No source-type tabs — single unified search.
- PCMag "Best Free AI Search Engine" 3 years running.

**Infrastructure:**
- Frontend: Vite SPA (vanilla JS or compiled framework)
- Hosting: Amazon S3 + CloudFront
- PWA support
- YC-backed

**Why It Matters:** Andi's Trantora credibility index is the closest existing product to what ScholarSync wants for source quality scoring on web results. Worth studying their approach.

---

### 6. Liner — "AI search with Scholar Mode"
**URL:** liner.com
**Positioning:** AI search for research with academic paper integration.
**Pricing:** Free / Premium $18/mo / Power $36/mo

**How They Present Information:**
- Scholar Mode filters for peer-reviewed sources only. 460M+ academic papers.
- General web mode for everything else.
- Deep Research generates organized reports.
- Claims 95.3% accuracy on SimpleQA.

**Infrastructure:**
- Frontend: Next.js
- CDN: Cloudflare
- Analytics: Segment, Google Analytics, Facebook Pixel
- Ads: DoubleClick, Media.net (has ads, unlike Kagi/Brave)

**Why It Matters:** Closest competitor to ScholarSync's positioning — combines academic search with general web search. But has ads, which undermines the "quality" positioning.

---

### 7-11. Other Notable Competitors

| Competitor | Key Differentiator | Why It Matters |
|---|---|---|
| **ChatGPT Search** | Deep Research mode synthesizes 100+ sources. Partner content for news/shopping. | The 800-lb gorilla. If OpenAI nails search, everyone else is in trouble. |
| **Google AI Overviews** | Appears on 60% of searches. E-E-A-T quality scoring. Deep Research. | Google IS the baseline. Everything we build is measured against this. |
| **Metaso** (Chinese) | 6+ tabs: web, academic, videos, podcasts, images. Free. | Best tab-based source selection UX. Worth studying for tab design. |
| **Perplexica/Vane** (OSS) | Self-hosted Perplexity clone. 6 focus modes. MIT license. | Our planned SearXNG integration draws from this codebase. |
| **Morphic** (OSS) | Generative UI — designs its own interface per query. Next.js. | Interesting concept but impractical for our use case. |

---

## FEATURE PARITY MATRIX

| Feature | Perplexity | You.com | Kagi | Brave | Andi | Liner | **ScholarSync Plan** |
|---------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Web search | YES | YES | YES | YES | YES | YES | **Phase 3** |
| News search | Focus mode | Tab | Tab | Tab | NO | NO | **Phase 5** |
| Social/Discussion search | Focus mode | NO | Lens | NO | NO | NO | **Phase 6** |
| Academic search | Focus mode | Mode | Lens | NO | NO | Scholar Mode | **YES (built)** |
| AI synthesis | YES | YES | Optional | Optional | YES | YES | **Phase 2** |
| Source quality indicators | NO | NO | Domain boost | NO | Credibility score | NO | **YES (core thesis)** |
| Evidence level grading | NO | NO | NO | NO | NO | NO | **YES (built, academic)** |
| Domain trust tiers | NO | NO | User-defined | NO | Trantora index | NO | **YES (planned)** |
| Save to project/library | Collections | NO | NO | NO | NO | Highlights | **YES (built)** |
| Cite in draft | Copy citation | NO | NO | NO | NO | NO | **YES (built)** |
| Editor/writing workspace | NO | NO | NO | NO | NO | NO | **YES (built)** |
| Filters per source type | NO | NO | Lenses | NO | NO | NO | **YES (planned)** |
| Follow-up questions | YES | YES | FastGPT | Ask Brave | YES | YES | **YES (agent)** |

**ScholarSync's unique advantages (things NO competitor has):**
1. Source quality indicators on EVERY result (evidence level for papers, domain trust for web)
2. Direct save-to-project → cite-in-draft → write workflow
3. Per-source-type filters (date, study type for academic; domain type for web; recency for news)
4. Quality-weighted ranking (not SEO-order, not just semantic relevance)
5. Writing workspace integration (the search serves the writing, not the other way around)

---

## DETAILED UX COMPARISON: How Each Presents Information Differently

### The Information Presentation Spectrum

These competitors fall on a spectrum from "give me the raw sources" to "just give me the answer":

```
RAW SOURCES ←————————————————————————→ SYNTHESIZED ANSWER
   Kagi          Brave       Google       You.com      Perplexity
  (blue links)  (links+AI)  (AI overview  (AI-first,   (answer-first,
                             + links)     links second) sources as proof)
```

**Kagi says:** "Here are the best results. You decide what they mean."
**Brave says:** "Here are results, and here's a quick AI summary if you want it."
**Google says:** "Here's an AI overview AND the results. Take your pick."
**You.com says:** "Here's the AI answer. Sources are below if you want to verify."
**Perplexity says:** "Here's what the sources say. Here are the sources to prove it."

### ScholarSync's Position

ScholarSync should sit between Kagi and Perplexity — closer to Perplexity on synthesis, closer to Kagi on source quality transparency:

"Here's a synthesis of what trustworthy sources say [with quality grades on every citation]. Here are the actual sources [with trust indicators]. Save what matters to your project."

### How Users Interact Differently

| Platform | Primary interaction | Secondary interaction | Terminal action |
|---|---|---|---|
| **Google** | Scan blue links, click one | Read page, go back, try another | Leave Google |
| **Perplexity** | Read synthesis | Click citation to verify | Ask follow-up OR leave |
| **Kagi** | Scan results (cleaner than Google) | Click link, read page | Leave Kagi |
| **You.com** | Read AI answer | Switch mode for deeper answer | Leave You.com |
| **ScholarSync** | Read synthesis + scan quality-graded sources | Save sources to project | Switch to editor, write |

The critical difference: **every other platform is a dead end.** Users consume information and leave. ScholarSync is the only platform where the search flows directly into creation. The terminal action isn't "leave" — it's "write."

### Why They Survive Despite Google

Each competitor survives by solving a specific problem Google structurally cannot:

| Competitor | What Google Can't Do | Structural Reason |
|---|---|---|
| **Perplexity** | Synthesize and cite sources in one coherent answer | Google's ad model requires showing 10 links (more ad slots). Synthesis reduces clicks. |
| **Kagi** | Remove ads and SEO-gamed results | Google's entire business IS ads. Removing them removes the business. |
| **Brave** | Search without tracking | Google's ad targeting requires tracking. Privacy kills the model. |
| **You.com** | Let users choose AI models | Google is locked to Gemini. Multi-model is a competitive disadvantage for them. |
| **Andi** | Score source credibility transparently | Google's E-E-A-T is opaque. Transparency would reveal ranking mechanics to SEO gamers. |

**ScholarSync's structural advantage over Google:** Google cannot integrate search results into a writing workspace with citation management, evidence grading, and draft creation. Search and creation are fundamentally different products at Google (Search vs. Docs). ScholarSync makes them one thing.

---

## DESIGN INSPIRATIONS

### 1. Bear (Shiny Frog) — Stealing: Warm restraint, typography discipline, collapsible simplicity

**Visual DNA:**
- **Layout:** Three-pane (tag sidebar ~220px, note list, editor). Each pane collapsible — editor can take 100%. Content column constrained to ~65-75 characters for comfortable reading.
- **Typography:** Custom "Bear Sans" (based on Clarika by Brandon Knap). Significant investment in vertical rhythm. Headers distinct via weight/size, not color. Line height, paragraph spacing hand-tuned.
- **Colors:** 2-3 per theme. Default warm white + high-contrast dark text. Bear red (#DA3A2E) used sparingly. Dark themes genuinely dark, not dark gray.
- **Density:** Generous whitespace everywhere. Note list: title + first line preview, nothing more. No metadata clutter in editor. Word count, dates, tags in slide-out Info panel on demand.
- **Motion:** Subtle. Pane transitions, smooth collapse/expand. Nothing bouncy or attention-grabbing.

**What they chose NOT to show:**
- No visible toolbar by default
- No per-note metadata (dates, word count) unless Info panel opened
- No folder hierarchy — tags only
- No collaboration, sharing, commenting UI
- No split-pane editing

**Patterns to steal:**
1. **One-line previews** — Note list shows title + first line only. Search results should show title + one-line snippet, not full abstracts.
2. **Collapsible panels** — Sidebar collapses fully, content takes 100%. Filters should collapse the same way.
3. **Warm restraint** — Muted warm palette, not clinical white. Makes the interface feel inviting, not institutional.
4. **Hidden metadata** — Show quality indicators on hover/expand, not as permanent badges cluttering every card.

---

### 2. PDF Expert (Readdle) — Stealing: Tab-based progressive disclosure, contextual tools, "one click away"

**Visual DNA:**
- **Layout:** Document canvas dominates (~85%+ viewport). Thin toolbar strip at top. Sidebar (thumbnails, TOC) toggleable, overlays rather than pushing content.
- **Typography:** System fonts (SF Pro). Clean, unadorned. UI text secondary to document content.
- **Colors:** Readdle blue accent. Neutral grays. Toolbar light gray so document stands out. Won Red Dot Design Award.
- **Density:** 5-8 tools per tab (not Acrobat's 30). Document viewing maximized, chrome minimized.

**What they chose NOT to show:**
- No OCR button until you need it
- No form-field detection until you open a form
- No JavaScript console, preflight, print production (Acrobat staples)
- Editing capabilities hidden until you switch to Edit tab

**Patterns to steal:**
1. **Tab-based mode switching** — Tabs swap secondary controls without changing the page. Source type tabs (Academic, Web, News) should work the same way.
2. **Contextual secondary toolbar** — Selecting a result reveals action buttons (save, cite) that are hidden by default.
3. **"One click away" philosophy** — Everything findable, nothing in the way. Advanced filters behind a single toggle.

---

### 3. Netflix — Stealing: Three-layer progressive disclosure, card hover expansion, content-as-UI

**Visual DNA:**
- **Layout:** Horizontal carousel rows by category. Edge-to-edge. Navigation bar has only 5 tabs for thousands of titles. Two-axis navigation (horizontal scroll per row, vertical scroll for rows) prevents "wall of content."
- **Typography:** Custom Netflix Sans. Title bold/large, metadata (year, rating, genre) small/gray/subordinate. Very limited text on screen.
- **Colors:** Three-color palette: black, Netflix red (#E50914), white. Dark background = theater-like immersion. Content thumbnails provide all visual variety.
- **Density:** Three tiers — (1) Default: thumbnail only, no text. (2) Hover: enlarged card + title + match % + description + genre tags + play/add buttons. (3) Click: full synopsis, cast, episodes, similar titles.
- **Motion:** Hover → scale-up 1.5x, neighbors push apart smoothly. Fast but never jarring.

**What they chose NOT to show:**
- No visible search filters (genre, year, rating) — algorithm curates
- No star ratings (removed for "% Match")
- No queue/history on main view
- No social features in browsing flow
- No episode numbers/air dates in browse view

**Patterns to steal:**
1. **Three-layer disclosure** — List view (title + snippet) → expanded card (abstract + metadata + quality indicators) → full detail panel. Never show everything at once.
2. **Card hover expansion** — Hovering a search result reveals evidence level, journal, citations, save button. Default shows only title + one-line snippet + trust indicator.
3. **Category rows vs filter panels** — Group results by type (Academic, News, Discussions) as horizontal sections rather than requiring users to configure filters.
4. **Truncation with expand** — Show first 2 lines of snippet, expand on interaction.

---

### 4. Apple Apps (Notes, Safari, Mail) — Stealing: Semantic color, "..." overflow, collapsing chrome, typographic hierarchy

**Visual DNA:**
- **Layout:** Consistent three-pane (sidebar, list, detail). Content area always widest. List pane shows just enough to identify items. Safari chrome shrinks to nearly nothing when scrolling.
- **Typography:** San Francisco (SF Pro). Strict typographic hierarchy: Large Title → Title → Headline → Body → Callout → Footnote → Caption. Dynamic Type scales with user preferences.
- **Colors:** Semantic only — blue for interactive, red for destructive, gray for secondary. Default backgrounds barely-there grays or translucent materials. No decorative gradients or shadows.
- **Density:** Apple Mail: sender + subject + first line (3 data points per row). Notes: title + first line (2 data points). Toolbars: 4-6 icons maximum, rest in "..." overflow.

**What they chose NOT to show:**
- Notes: No formatting toolbar by default. No word count. No metadata. No version history button.
- Safari: No bookmarks bar by default. No status bar. URL truncated to domain only.
- Mail: No read receipts. No scheduling UI by default. No attachment indicators until you look.
- General: No onboarding tutorials. No tooltips. No "What's New" modals.

**Patterns to steal:**
1. **Semantic color only** — Blue for clickable, gray for metadata, black for titles. No decorative color. Trust indicators use color purposefully (green = government, gold = major journalism).
2. **"..." overflow for actions** — Put Save, Cite, Export, Share behind a single "..." button per result card. Not as 4 visible icon buttons.
3. **Collapsing chrome** — Hide search bar and filters when user scrolls through results. Bring back on scroll-up.
4. **Row height discipline** — Each result gets a fixed, comfortable height. Title + one-line snippet + minimal metadata. No variable-height cards creating visual chaos.
5. **Typographic hierarchy** — Title (SF Pro Semibold 17pt), Snippet (SF Pro Regular 15pt), Metadata (SF Pro Regular 13pt gray). Three levels, no more.

---

## IDENTITY SYNTHESIS

Blending the inspirations above, ScholarSync's Explore module should feel like:

> **"Bear's warm restraint meets Netflix's three-layer disclosure meets Apple's semantic clarity. Unlike Perplexity, which feels like a chatbot that also searches, and unlike Google, which feels like an ad platform that also answers questions, ScholarSync should feel like a calm, opinionated curator — someone with excellent taste who shows you only what matters and tells you WHY it matters."**

**Derived Design Direction:**

| Dimension | Inspiration | Concrete Decision |
|---|---|---|
| **Layout** | Bear + Apple | Single-column results. Collapsible filter sidebar. Detail panel slides in from right. No permanent side panels. |
| **Typography** | Bear + Apple | System font (SF Pro / Inter). Three levels only: Title (semibold 16-17px), Snippet (regular 14-15px), Metadata (regular 12-13px, gray). Generous line height (1.5x). |
| **Color** | Bear + Apple | Warm neutral background (not pure white). One accent color. Source trust indicators as the ONLY decorative color: green accent = government/institutional, blue = major journalism, amber = community/forum. |
| **Density** | Netflix | Three-layer disclosure. Default: title + one-line snippet + trust indicator dot. Hover/tap: expand to show full snippet + metadata + action buttons. Click: full detail panel with reading view. |
| **Motion** | Netflix + Apple | Fast, smooth expand on hover. Collapsing search bar on scroll. No bouncy animations. Everything should feel instant. |
| **Actions** | Apple | "..." overflow menu per card. Not 4 visible buttons. "Save to Project" is the ONE visible action button. Everything else behind "...". |
| **Filters** | PDF Expert + Kagi | Tab-based source switching (Academic, Web, News, Discussions). Per-tab filters behind a toggle, not permanently visible. Opinionated defaults — the system shows what matters without requiring configuration. |
| **Navigation** | Kagi | Clean, minimal tab bar. Count badges on each tab. No elaborate UI. Text + count, that's it. |

---

## OPEN QUESTIONS FOR UX BRIEF

- [ ] Should the synthesis block be collapsible or always visible? (Bear says hide; Perplexity says always show)
- [ ] Should source trust indicators be colored dots, colored left-borders, or text labels? (Netflix uses no text labels; Apple uses semantic color)
- [ ] How many results visible per screen? (Kagi shows ~7-8 generously spaced; Google shows 10 dense; Perplexity shows 1 synthesis)
- [ ] Should follow-up question suggestions appear? (Perplexity shows 5 per answer; Kagi shows none; Bear would say hide them)
- [ ] Card-based or list-based results? (Netflix = cards; Kagi = list; Google = list with cards mixed in)
- [ ] Dark mode as default? (Netflix dark creates immersion and makes content pop; Bear offers both; Kagi is light-default)
- [ ] Should "Explore" be the module name or "Discover"? (Currently "Discover" in sidebar navigation)
- [ ] How prominent should the synthesis be relative to results? (Perplexity: synthesis dominant. Kagi: results dominant. We need to find the middle.)
- [ ] Should the search bar persist while scrolling results or collapse? (Apple: collapse. Google: persist.)
- [ ] Mobile-first or desktop-first design? (Perplexity: mobile-first. Kagi: desktop-first.)

---

## INFRASTRUCTURE COMPARISON

| Company | Frontend | Backend | CDN | Search Index | Analytics |
|---------|----------|---------|-----|-------------|-----------|
| **Perplexity** | Next.js (RSC) | Python, PyTorch | Cloudflare | Vespa (200B+ URLs) | Unknown |
| **You.com** | Next.js | Unknown | Cloudflare | Bing API + own | Amplitude, GTM |
| **Kagi** | Vanilla JS/SCSS (SSR) | Crystal, PostgreSQL | Google Cloud | Own (Teclis, TinyGem) + Google/Bing | None |
| **Brave** | SvelteKit | Rust, Python | CloudFront | Independent (built from scratch) | None |
| **Andi** | Vite SPA | Unknown | S3 + CloudFront | Unknown (Trantora) | None |
| **Liner** | Next.js | NGINX/Ubuntu | Cloudflare | Unknown | Segment, GA, FB Pixel |
| **ScholarSync** | Next.js (RSC) | Next.js API routes | — | PubMed+S2+OA+CT+arXiv+SearXNG(planned) | — |

**Notable:** Kagi uses NO frontend framework — server-rendered HTML with vanilla JS. This is why it's the fastest-loading search engine. A deliberate architectural choice aligned with their "speed as a feature" philosophy.

---

## KEY TAKEAWAYS

1. **Source quality transparency is our moat.** No competitor grades sources by quality. Perplexity treats all citations equally. Google hides E-E-A-T scores. ScholarSync is the only product where users can SEE why a source is trustworthy.

2. **The workspace integration is our structural advantage.** Every competitor is a dead end — users consume and leave. ScholarSync is the only platform where search flows into save → cite → write. This cannot be replicated by adding a "save" button to Perplexity.

3. **Opinionated restraint is the design north star.** Bear, Netflix, Apple, Kagi all succeed by choosing what NOT to show. Three-layer progressive disclosure (title → expanded card → detail panel) with hidden metadata and "..." overflow actions.

4. **Synthesis + transparent sources is the winning combination.** Perplexity has synthesis without source transparency. Kagi has source quality without synthesis. We do both.

5. **Tabs, not modes.** Source type selection should feel like navigating categories (Kagi/Google tabs), not choosing an AI mode (You.com/Perplexity Focus). Tabs are destinations. Modes are configurations.

6. **Speed is a feature.** Kagi and Brave are noticeably faster than Google. No ads, no tracking scripts, no third-party resources. Our Explore module should aim for <1 second to first results.

7. **The anti-SEO story is the marketing story.** "In a world of AI-generated slop, find sources that actually matter." This is the emotional hook that none of the competitors are using — they're all fighting over "better AI answers." We're fighting for "better sources for people who actually write."
