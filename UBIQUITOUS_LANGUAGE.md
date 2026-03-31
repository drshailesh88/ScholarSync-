# Ubiquitous Language

## Search & Discovery

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Explore** | The module where users actively search for sources across academic, web, news, and discussion content | Discover, Research (when referring to the search module), Search page |
| **Search** | The act of querying Explore for sources | Query, lookup, fetch |
| **Result** | A single item returned by a search — could be a paper, web article, news piece, or discussion post | Hit, match, listing, entry |
| **Synthesis** | An AI-generated summary of search results, produced on demand when the user requests it | Summary, Quick Answer, AI Overview, digest |
| **Tab** | A fixed source-category selector in Explore: Academic, Web, News, Discussions, More | Category, vertical, channel, mode, focus |
| **Scope** | A user-created, named, reusable search filter that constrains which domains, keywords, and date ranges appear in results | Lens (Kagi's term), Focus (Perplexity's term), filter preset, search profile |

## Sources & Content

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Paper** | An academic publication stored in the `papers` table — journal articles, preprints, clinical trials | Article (when academic), study, publication, manuscript |
| **Web Source** | A non-academic piece of saved content — news articles, blog posts, Reddit threads, government reports, video transcripts | Bookmark, clipping, link, saved page, web article |
| **Source** | Generic term for anything the user can save and cite — encompasses both Papers and Web Sources | Resource, reference, item, document |
| **Snippet** | The 2-3 line preview text shown on a search result card, extracted from the page content | Excerpt, description, preview, abstract (when non-academic) |
| **Snapshot** | The clean, frozen copy of a web page's content stored at save time for highlighting | Cache, archive, permanent copy, web archive |
| **Trust Tier** | A quality classification assigned to a source based on its domain: Government, Major Journalism, Community, or Other | Credibility score, authority level, quality badge, domain rating |

## Annotations

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Highlight** | A user-selected passage of text within a saved source (paper PDF or web source snapshot), marked with one of 5 colors | Annotation (when referring to the marked text itself), selection, underline |
| **Note** | Free-text written by the user, attached either to a source overall or to a specific highlight within it | Annotation (when referring to written commentary), comment, memo |
| **Annotate** | The act of adding highlights and/or notes to a saved source | Mark up, comment on, review |

## Organization

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Library** | The user's personal collection of all saved sources (both Papers and Web Sources), organized by type and tags | Collection, bookmarks, saved items, reading list |
| **Project** | A user-created workspace grouping related sources, drafts, and evidence tables around a research goal | Folder, workspace (when referring to a specific project), collection |
| **Tag** | A user-defined label applied to saved sources for cross-project classification | Label, category, keyword |

## Domain Preferences

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Domain Preference** | A user's persistent opinion about a specific website, expressed as one of five levels that adjusts future search ranking | Personalization, domain ranking, site preference, source ranking |
| **Mute** | Domain preference level 1 — source never appears in results | Block, ban, blacklist, hide |
| **Lower** | Domain preference level 2 — source ranks further down in results | Demote, deprioritize, downrank |
| **Neutral** | Domain preference level 3 — default state, no adjustment applied (not stored) | Normal, default, unranked |
| **Higher** | Domain preference level 4 — source ranks further up in results | Boost, promote, uprank |
| **Prefer** | Domain preference level 5 — source appears at or near the top of results always | Pin, favorite, always show, prioritize |
| **My Sources** | The settings page where users manage all their domain preferences | Personalized Results (Kagi's term), domain rankings, source preferences |

## Quality & Ranking

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Evidence Level** | The OCEBM classification (I through V) assigned to academic papers based on study design | Evidence grade, study quality, evidence tier |
| **Quality Score** | The composite ranking score blending evidence level, citations, journal quality, RRF score, and relevance | Rank score, composite score, quality rank |
| **Trust Indicator** | The visual element on a result card that communicates source quality — a 3px colored left border | Trust badge, quality badge, credibility icon, shield |
| **Rerank** | The process of re-ordering search results using a cross-encoder model (Cohere) after initial retrieval and fusion | Re-score, re-sort, quality rank (when referring to the Cohere step specifically) |

## User Actions

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Save** | Adding a search result to the user's Library as a persistent source with metadata snapshot | Bookmark, clip, add, collect, star |
| **Cite** | Inserting a reference to a saved source into a draft document in the editor | Reference, insert citation, add reference |
| **Open Original** | Navigating to the source's actual URL in a new browser tab | Visit, go to page, open link, view source |

## Infrastructure

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **SearXNG** | The self-hosted metasearch engine that powers the Web, News, and Discussions tabs by aggregating results from Google, Bing, DuckDuckGo, and 70+ other engines | Search engine, web search service, metasearch |
| **Readability** | Mozilla's JavaScript library that extracts clean article text from raw HTML pages, used to create snapshots for highlighting | Content extractor, scraper, page cleaner |
| **Firecrawl** | A third-party API used as a fallback when Readability cannot extract content from JavaScript-heavy pages | Scraper, crawler, content extraction API |

## Modules (app navigation)

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Explore** | Active search and discovery module | Discover, Research (ambiguous — see below), Search |
| **Feed** | Passive browsing module for subscribed journal feeds and news sources | Home, discover (lowercase) |
| **Library** | Saved sources management module | Collection, bookmarks |
| **Studio** | The writing/drafting workspace with TipTap editor and Workbench assistant panel | Editor, Draft, Document editor |
| **Reading Room** | The Notebook module for deep reading, Q&A, and source analysis | Notebook, deep read |

---

## Relationships

- A **User** has one **Library** containing many **Sources** (both **Papers** and **Web Sources**)
- A **Source** can be linked to many **Projects** — each link has its own **Notes**, **Tags**, and status
- A **Source** has many **Highlights**, each with an optional **Note**
- A **Highlight** belongs to exactly one **Source** and is anchored to the **Snapshot** (for Web Sources) or PDF (for Papers)
- A **User** has many **Scopes** (max 20) — a **Scope** is a reusable search filter
- A **User** has many **Domain Preferences** (max 1000) — each is a **Mute/Lower/Neutral/Higher/Prefer** setting for one domain
- A **Search** in **Explore** produces **Results** across multiple **Tabs**
- A **Result** can be **Saved** to become a **Source** in the **Library**
- A **Source** can be **Cited** in a draft in **Studio**
- A **Paper** and a **Web Source** are NEVER mixed in the same database table — they are completely separate data types with separate storage

---

## Example Dialogue

> **Dev:** "When a user searches in **Explore**, do results from all **Tabs** load at once?"
>
> **Founder:** "Yes. One search hits all sources in parallel. **Tabs** filter the view client-side — switching from **Academic** to **News** is instant because the results are already there."
>
> **Dev:** "If the user has a **Scope** called 'Top Cardiology Journals' active, does it affect the **News** tab?"
>
> **Founder:** "No. That **Scope** only includes academic domains. It narrows the **Academic** tab. The **News** tab shows all news sources unless the user creates a separate **Scope** for news."
>
> **Dev:** "When someone clicks **Save** on a news result, what happens?"
>
> **Founder:** "The **Result** becomes a **Web Source** in their **Library**. The system captures all metadata and starts extracting a **Snapshot** of the page in the background using **Readability**. Once the **Snapshot** is ready, the user can **Annotate** it — add **Highlights** and **Notes**."
>
> **Dev:** "Can they **Cite** that **Web Source** in their draft?"
>
> **Founder:** "Yes — from the '...' menu on the result, or later from the editor's sidebar. The **Cite** action inserts a reference in their **Studio** draft with proper attribution."
>
> **Dev:** "What if they've **Muted** reuters.com but a Reuters article is the most relevant result?"
>
> **Founder:** "They never see it. **Mute** is absolute — the **Domain Preference** removes it from all results. If they change their mind, they go to **My Sources** in settings and change Reuters from **Mute** to **Neutral**."

---

## Flagged Ambiguities

1. **"Research"** was used to mean three different things: (a) the existing Research page/module for academic paper search, (b) the act of doing research, and (c) the new Explore module. **Resolution:** The module is called **Explore**. The existing academic search page is the **Academic tab within Explore**. "Research" is reserved for the general activity, not a module name.

2. **"Discover"** was used interchangeably with "Explore" in early discussions. The sidebar navigation currently shows "Discover" for the route `/research`. **Resolution:** The module is called **Explore**. The route and sidebar label should be updated to match. "Discover" is retired.

3. **"Source"** is used both as a generic term (any saved content) and in the context of "source type" (academic, web, news, discussion). **Resolution:** **Source** is the generic parent term. **Paper** and **Web Source** are the two specific types. **Source type** refers to the tab/category classification. Context usually makes the meaning clear.

4. **"Annotation"** was used to mean both the highlighted text AND the written note. **Resolution:** **Highlight** = the marked passage. **Note** = the written commentary. **Annotate** = the verb for doing either/both. Never use "annotation" as a noun — use the specific term.

5. **"Filter" vs "Scope"** — filters are the temporary dropdowns (Order By, Time, Options) that reset between searches. **Scopes** are persistent, named, reusable filter configurations. They are different things. Never call a Scope a "filter."

6. **"Lens"** is Kagi's term. We use **Scope**. Never use "Lens" in ScholarSync UI, code, or documentation.

7. **"Bookmark"** is a common user mental model but we use **Save** as the action and **Library** as the destination. Never use "bookmark" in the UI — it implies a lightweight browser action. Saving to ScholarSync is more than bookmarking — it captures metadata, creates a snapshot, and enables highlighting.
