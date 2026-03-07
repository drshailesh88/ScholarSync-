# Competitive Parity Audit: Journal Feed vs Feedly

**Date:** 2026-03-07
**Auditor:** ScholarSync Engineering Audit
**ScholarSync Feature:** Journal Feed (Feedly clone)
**Competitor:** Feedly

---

## Executive Summary

ScholarSync's Journal Feed is a **well-architected academic RSS reader** with strong scientific metadata extraction (DOI, PubMed ID parsing), citation generation, library integration, and automated feed fetching. As the "drawing room" of the app -- designed to be the daily entry point that funnels users into deeper features -- it covers the essential Feedly workflows but has gaps in discovery, organization, and AI-powered features that Feedly has refined over a decade.

---

## Feature-by-Feature Comparison

### 1. Feed Management

| Capability | ScholarSync | Feedly | Parity |
|---|---|---|---|
| RSS feed subscription | Yes (add-feed-modal component) | Yes | AT PARITY |
| Atom feed support | Yes (feed-parser.ts handles both RSS 2.0 and Atom) | Yes | AT PARITY |
| Feed discovery/search | Not found (manual URL input only) | Yes (search by topic, keyword, URL) | GAP |
| OPML import | Not found | Yes | GAP |
| OPML export | Not found | Yes | GAP |
| Feed categories/folders | Likely (via feed organization) | Yes (extensive) | UNCLEAR |
| Feed refresh (cron) | Yes (every 15 minutes via `/api/cron/fetch-feeds`) | Yes (real-time to hourly) | AT PARITY |
| Unread counts | Likely (via userArticleStatus) | Yes | AT PARITY |
| Feed metadata | Yes (title, description, siteUrl from parsed feed) | Yes | AT PARITY |
| Feed health monitoring | Yes (error tracking per feed in cron results) | Yes | AT PARITY |
| Feed favicon | Not found | Yes | MINOR GAP |
| Feed muting/pausing | Not found | Yes | GAP |

**Verdict:** Core feed subscription works but **feed discovery is the critical gap**. Users currently must know the RSS URL. Feedly's topic-based discovery is a key differentiator.

### 2. Feed Parsing & Metadata Extraction

| Capability | ScholarSync | Feedly | Parity |
|---|---|---|---|
| RSS 2.0 parsing | Yes (fast-xml-parser) | Yes | AT PARITY |
| Atom parsing | Yes | Yes | AT PARITY |
| DOI extraction | Yes (regex-based from links and content) | Yes (for academic feeds) | AT PARITY |
| PubMed ID extraction | Yes (3 regex patterns: pubmed/, ncbi.nlm.nih.gov/, pmid:) | No (general reader) | AHEAD |
| Author extraction | Yes (dc:creator, author fields) | Yes | AT PARITY |
| Date parsing | Yes (robust Date parsing) | Yes | AT PARITY |
| Content HTML | Yes (content:encoded, description) | Yes | AT PARITY |
| Abstract snippet | Yes (HTML stripped, 500 char limit) | No (full content) | DIFFERENT |
| Image extraction | Basic (imageUrl field) | Yes (article images) | BEHIND |
| Journal/volume/issue | Fields present but null from feeds | N/A | - |

**Verdict:** ScholarSync's parsing is **academically-specialized** with DOI and PubMed ID extraction that Feedly lacks.

### 3. Article Reading

| Capability | ScholarSync | Feedly | Parity |
|---|---|---|---|
| Article list view | Yes (feed components) | Yes | AT PARITY |
| Article detail view | Likely (article reader component) | Yes (clean reader) | AT PARITY |
| Read/unread tracking | Yes (userArticleStatus: isRead, readAt) | Yes | AT PARITY |
| Mark all as read | Not found | Yes | GAP |
| Article search | Not found in feed-specific code | Yes (full-text search) | GAP |
| Text-to-speech | Not found for feeds | Yes (via integration) | GAP |
| Article highlights/notes | Not found for feeds | Yes (highlights, notes) | GAP |
| Reading time estimate | Not found | Yes | MINOR GAP |

### 4. Organization

| Capability | ScholarSync | Feedly | Parity |
|---|---|---|---|
| Save to library | Yes (saveFeedArticleToLibrary with DOI/PMID dedup) | Yes (save for later) | AT PARITY+ |
| Boards/collections | Not found in feeds | Yes (boards, team boards) | GAP |
| Tags | Not found in feeds | Yes | GAP |
| Priority feeds | Not found | Yes (priority inbox) | GAP |
| Filters | Journal filtering (`/api/feeds/articles/journals`) | Yes (by source, keyword, etc.) | BASIC |
| Sort options | Not found | Yes (latest, oldest, popular) | GAP |
| Saved searches | Not found | Yes | GAP |

### 5. AI / Agent Capabilities

| Capability | ScholarSync | Feedly | Comparable Tools |
|---|---|---|---|
| AI article summarization | Not found in feed code | Yes (Leo AI) | Feedly Leo |
| AI topic extraction | Not found | Yes (topic clustering) | Feedly |
| AI recommendations | Not found | Yes ("more like this") | Feedly |
| AI feed discovery | Not found | Yes (topic-based) | Feedly |
| AI chat about articles | Not found in feed code | No | ChatGPT integration |
| Trend detection | Not found | Yes (trending topics) | Feedly |
| Newsletter digest | Not found | Yes (email digest) | Feedly |
| AI-powered board curation | Not found | Yes (Leo rules) | Feedly |
| Research connections | Yes (integration with paper library, notebook) | No | ScholarSync |
| Citation generation | Yes (citation-modal: APA, MLA, Chicago, Vancouver, Harvard, BibTeX) | No | ScholarSync |

**Verdict:** This is the **most critical gap area**. Feedly's Leo AI is a major differentiator with summarization, topic extraction, and trend detection. ScholarSync's feeds currently have **no AI/agent features** despite the user's requirement for agent capabilities.

### 6. Citation & Academic Integration

| Capability | ScholarSync | Feedly | Parity |
|---|---|---|---|
| Citation generation | Yes (6 formats: APA 7, MLA 9, Chicago, Vancouver, Harvard, BibTeX) | No | AHEAD |
| In-text citation copy | Yes (separate copy button) | No | AHEAD |
| DOI linking | Yes (doi.org link in citation modal) | Limited | AHEAD |
| Save to paper library | Yes (with deduplication via DOI/PMID) | No | AHEAD |
| BibTeX export | Yes | No | AHEAD |
| Article → Paper conversion | Yes (articleToPaperData utility) | No | AHEAD |
| Cross-feature integration | Yes (saved articles usable in notebook, slides, research) | No | AHEAD |

**Verdict:** ScholarSync's academic integration is **vastly superior** to Feedly. The ability to cite, save to library, and use articles in other features is the key value proposition.

### 7. Content Sources

| Source Type | ScholarSync | Feedly | Parity |
|---|---|---|---|
| RSS/Atom feeds | Yes | Yes | AT PARITY |
| Academic journals | Yes (via RSS feeds) | Yes | AT PARITY |
| Preprint servers | Possible (via RSS) | Yes | AT PARITY |
| News sources | Possible (via RSS) | Yes (extensive) | BEHIND (discovery) |
| Blog RSS feeds | Possible (via RSS) | Yes | AT PARITY |
| PubMed alerts | Via PubMed RSS | Yes (via RSS) | AT PARITY |
| Twitter/X feeds | No | Yes | GAP |
| Reddit feeds | No | Yes | GAP |
| YouTube channels | No | Yes | GAP |
| Newsletters | No | Yes | GAP |
| Google Alerts | No | Yes (via RSS) | GAP |

### 8. UI/UX

| Capability | ScholarSync | Feedly | Parity |
|---|---|---|---|
| Layout options | Not found (likely single layout) | Yes (magazine, card, list, title-only) | GAP |
| Dark mode | Yes (app-level theme) | Yes | AT PARITY |
| Keyboard shortcuts | Not found for feeds | Yes (j/k navigation, etc.) | GAP |
| Mobile app | No (web only) | Yes (iOS, Android) | GAP |
| Browser extension | No | Yes | GAP |
| Notification system | Not found | Yes (push, email) | GAP |

---

## Gap Analysis Summary

### Critical Gaps (Must Fix -- "Drawing Room" Status)
1. **AI/Agent capabilities** -- No summarization, topic extraction, recommendations, or trend detection. The user specifically requested agent parity with market leaders. This is the #1 gap.
2. **Feed discovery** -- Users can only add feeds by URL; need topic-based discovery, suggested feeds, OPML import
3. **Article search** -- Cannot search within feed articles
4. **Organization (boards, tags, saved searches)** -- Limited to journal filtering only

### Important Gaps (Should Fix for Retention)
5. **Multiple layout options** -- magazine, card, list views
6. **Mark all as read** -- basic expected feature
7. **Sort options** -- latest, oldest, popular
8. **Article highlights/notes** -- engagement features
9. **Keyboard navigation** -- j/k shortcuts for power users
10. **OPML import/export** -- migration from other readers
11. **Feed muting/pausing** -- manage noisy feeds

### Nice-to-Have Gaps
12. Mobile app / responsive optimization
13. Browser extension
14. Email digest/newsletter
15. Twitter/Reddit/YouTube feed integration
16. Push notifications
17. Reading time estimates
18. Feed favicon display

### Areas Where ScholarSync is AHEAD
1. **Citation generation** -- 6 citation formats + BibTeX from any article
2. **DOI/PubMed ID extraction** -- automatic metadata parsing from feeds
3. **Library integration** -- save articles to paper library with dedup
4. **Cross-feature integration** -- use saved articles in notebook, slides, research
5. **Academic metadata** -- journal, volume, issue fields
6. **In-text citation copy** -- separate copy for in-text vs full citation
7. **Article-to-paper conversion** -- structured data transformation
8. **Cron-based auto-fetch** -- every 15 minutes, with error tracking

---

## Priority Recommendations for "Drawing Room" Strategy

Since this feature is intended to be the **daily engagement driver** that funnels users into the rest of the app:

### Phase 1: Essential Engagement (Weeks 1-4)
1. **AI article summarization** -- one-click summary of any article (leverages existing RAG pipeline)
2. **Feed discovery** -- topic-based search, suggested academic feeds, popular feeds
3. **Article search** -- full-text search within subscribed feeds
4. **Mark all as read** -- basic table stakes
5. **Multiple layout options** -- magazine view for browsing, list view for scanning

### Phase 2: Retention & Habit Formation (Weeks 5-8)
6. **AI "more like this" recommendations** -- based on reading history
7. **Boards/collections** -- organize articles by research topic
8. **Keyboard shortcuts** -- j/k/o for power users
9. **AI daily digest** -- morning summary of key articles across feeds
10. **Trending topics** -- what's hot in your subscribed domains

### Phase 3: Differentiation (Weeks 9-12)
11. **AI research connector** -- "This article is relevant to your paper on X"
12. **OPML import** -- easy migration from Feedly
13. **AI-powered feed curation rules** -- "highlight articles about CRISPR with >10 citations"
14. **Article annotations/highlights** -- with export to notebook
15. **Smart notifications** -- "Important paper published in your field"

---

## Overall Parity Score: **48/100**

The Journal Feed has a **solid technical foundation** (feed parsing, DOI extraction, citation generation, library integration) but is **significantly underdeveloped** as a daily engagement tool. The complete absence of AI/agent features, feed discovery, search, and organization makes it unusable as a Feedly replacement today. However, the academic integration features (citations, library save, cross-feature usage) are a strong differentiator that Feedly cannot match. The foundation is good -- it needs feature buildout, especially AI capabilities, to fulfill its "drawing room" mission.
