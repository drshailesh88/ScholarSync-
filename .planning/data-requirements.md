# Data Requirements: ScholarSync Explore Module
**Date:** 2026-03-31
**Source:** PRD planning files + data grilling session with founder
**Status:** GRILLED — ready for database engineer

**Key constraint:** The existing `papers` table is NOT touched. Web sources get a NEW, separate table. Academic tab functionality remains completely non-destructive.

---

## Data Subjects

### 1. Web Sources (NEW)

**What it is:** Any non-academic piece of content a user finds through Explore and saves — a news article, blog post, Reddit thread, government report, YouTube video transcript. It's a saved reference with metadata, a clean content snapshot for highlighting, and personal annotations.

**Example:** "A Reuters article titled 'FDA Expands GLP-1 Drug Approvals for Obesity' published March 15, 2026, saved by the user to their Library, later added to their 'GLP-1 Article' project, with 3 highlights and a note saying 'use the FDA quote in paragraph 2.'"

**Lifecycle:**
- Created by: System, when user clicks save (+) on a search result in Explore. All metadata auto-captured from search result. User never fills out a form.
- Updated by: User can edit personal fields (notes, tags). Captured metadata (title, URL, author, date, snippet) is frozen at save time — never auto-updated.
- Deleted by: User explicitly deletes.
- Deletion behavior: Soft delete, 30-day recovery window. After 30 days, permanent deletion. Highlights and notes go to Trash with the source — no orphaned annotations.
- History needed: No. Just two timestamps: created_at and updated_at.

**Ownership & Access:**
- Belongs to: One user. Each user gets their own copy of a saved source.
- Sharing: No sharing in V1. Comes later as part of project-level sharing.
- Access levels: Owner only. No editor/viewer roles for V1.
- Deduplication: One canonical record per URL per user. If user tries to save same URL again, system shows "Already in your Library."

**Auto-Captured Metadata (frozen at save time):**
- Title
- URL (canonical link)
- Domain name (reuters.com, who.int, reddit.com)
- Snippet / description (preview text from search results)
- Author name (when detectable)
- Publish date (when detectable)
- Source type (news_article, blog_post, discussion_post, government_report, wiki, video, other)
- Trust tier (government, major_journalism, community, other)
- Tab it was found on (web, news, discussions)
- Search query that found it (provenance)
- Thumbnail URL (favicon or OG image, when available)
- Full page content snapshot (clean HTML/text for highlighting — frozen at save time, one version only, never updated)

**User-Editable Fields:**
- Personal notes (free text)
- Tags (user-defined, multiple)
- Status: saved (default) or archived
- Project associations (can be in multiple projects, or in none — Library is the default home)

**Annotation Capabilities (V1):**
- Notes: Free-text notes field per source
- Highlights: Select passages in the stored content snapshot, highlight with color coding
- Highlight colors: Same 5 colors as existing PDF highlights (yellow, green, red, blue, purple)
- Notes on highlights: Each highlight can have its own note
- Highlights are citable: Can be pulled into drafts in the editor as quotes with attribution
- Unified system: Same annotation UX as PDF highlighting on academic papers

**Content Storage:**
- Clean copy of web page content stored at save time (for stable highlight anchoring)
- One snapshot only — no versioning, no re-fetching
- If original page changes or goes down, the stored copy remains

**Multi-Project Membership:**
- One saved source can be linked to multiple projects (same pattern as project_papers)
- Each project-source link has its own notes, tags, status
- Highlights stay on the source itself (content-level, not project-level)

**Limits:**
- Max per user: Plan-dependent. Free users get a limit (e.g., 50). Paid users get higher limit or unlimited.
- URL uniqueness: One record per URL per user. No duplicates.
- No rules on content length or metadata — capture everything available.
- Can exist without a project (Library is default home).

**Search & Filter (within Library):**
- Searchable by: Title, author, domain, snippet, personal notes, highlight text, tags
- Sortable by: Date saved (default), date published, title alphabetically, domain
- Filterable by: Source type (news/web/discussion), trust tier, project, tags, has highlights (yes/no)

**Billing impact:**
- Counted for usage: Yes — total saved web sources counts against plan limit
- Plan-dependent capabilities: Save limit varies by tier

**Future expansion (plan for, don't build):**
- Export to CSV/JSON
- Import from Readwise/Instapaper (CSV/HTML formats)
- Domain-agnostic (web source is web source, no discipline-specific handling)

---

### 2. Scopes (NEW — user-created search profiles)

**What it is:** A saved search configuration that filters where Explore looks. The user creates it once, names it, and it appears in the Scope dropdown on every future search. Like Kagi's Lenses but user-created only.

**Example:** "Top Cardiology Journals — restricts Academic tab to nejm.org, thelancet.com, jacc.org, circulation.aha.org. Created by Dr. Singh for his daily literature searches."

**Lifecycle:**
- Created by: User only, manually. No system-created Scopes. (Tabs handle the built-in source filtering.)
- Updated by: User can change any field anytime. Changes take effect on next search.
- Deleted by: User. Permanent delete, no soft delete, no recovery needed. Recreating takes 30 seconds.
- History needed: No.

**Ownership & Access:**
- Belongs to: One user.
- Sharing: Not in V1. Future: shareable via link (professor shares "Top Neuroscience Journals" with students).
- Access levels: Owner only.

**Content (the Scope definition):**
- Name (display label)
- Included domains: Up to 10 (e.g., nejm.org, thelancet.com)
- Excluded domains: Up to 10 (e.g., pinterest.com, quora.com)
- Included keywords: Up to 5
- Excluded keywords: Up to 5
- Date range: Optional from/to dates
- Region: Optional

**Limits:**
- Max per user: 20 (same as Kagi). Free for all plans — not gated behind paywall.
- Name rules: No uniqueness requirement. Any characters. Reasonable length limit (100 chars).
- Can be empty: Yes — a Scope with no filters is valid (equivalent to "All Sources").

**Ordering:**
- User can reorder Scopes in the dropdown (drag handles, like Kagi).
- Each Scope has an on/off toggle — "off" hides it from dropdown without deleting.

**Search & Filter:**
- Not searchable — max 20 items, no search needed.
- Managed in Settings > Scopes page.

**Billing impact:** None. Free for all plans.

**Future expansion:**
- Shareable Scopes via link
- AI-suggested domains ("Suggest domains for me" button using Scimago data)

---

### 3. Domain Preferences (NEW — per-user source trust adjustments)

**What it is:** A user's personal opinion about a specific website, expressed as a 5-tier preference that permanently adjusts how Explore ranks results from that domain.

**Example:** "Dr. Singh has Muted dailymail.co.uk (never shows), Lowered medium.com (appears further down), and Prefers reuters.com (appears at top). These apply to every search he does."

**Tier system (confirmed, locked):**

| Level | Name | What It Does |
|---|---|---|
| 1 | **Mute** | Source disappears from all results |
| 2 | **Lower** | Source ranks lower, appears further down |
| 3 | **Neutral** | Default state, no adjustment (not stored — absence = neutral) |
| 4 | **Higher** | Source ranks higher in results |
| 5 | **Prefer** | Source appears at or near the top always |

**Lifecycle:**
- Created by: User clicking the shield icon on any search result, or manually in "My Sources" settings page.
- Updated by: User can change the level anytime (same shield icon or settings page).
- Deleted by: User removes the preference → source returns to Neutral. Instant, no soft delete.
- History needed: No.

**Ownership & Access:**
- Belongs to: One user. Completely private.
- Sharing: No.
- Access levels: Owner only.

**Content:**
- Domain name (e.g., dailymail.co.uk)
- Preference level (mute / lower / higher / prefer)
- Note: "Neutral" is NOT stored — it's the default state. Only non-neutral preferences are recorded.

**Limits:**
- Max per user: 1000 domains. Free for all plans.
- Domain rules: Standard domain format. No wildcards for V1.

**Search & Filter (in settings):**
- Filterable by: Preference level (show all Muted, show all Preferred)
- Sortable by: Domain name, date added

**Billing impact:** None. Free for all plans.

**Future expansion:**
- Community rankings (aggregated anonymous data: "87% of cardiologists Prefer nejm.org")
- Bulk import (paste a list of domains to Mute/Prefer)

---

### 4. Search History (NEW — recent Explore searches)

**What it is:** A list of recent searches the user has made in Explore, for convenience. Lives behind the clock icon next to the search bar.

**Example:** "User's last 5 searches: 'GLP-1 cardiovascular mortality' (Academic tab, no Scope) → 'FDA obesity drug approval 2026' (News tab, 'Government Sources' Scope) → ..."

**Lifecycle:**
- Created by: System, automatically, every time user searches in Explore.
- Updated by: Not updated — each search is a new entry.
- Deleted by: User can clear all history or delete individual entries. Permanent delete, no recovery.
- History needed: No (it IS the history).

**Ownership & Access:**
- Belongs to: One user. Private, never shared, never visible to others.
- No sharing, no access levels.

**Content per entry:**
- Query text
- Active tab (academic / web / news / discussions)
- Active Scope (if any — name or ID)
- Timestamp

**Limits:**
- Max entries: 100 per user. Oldest drops off silently when limit reached (FIFO).
- Free for all plans.

**Search & Filter:**
- Not searchable — it's a short list, user scrolls.
- Sorted by: Most recent first (only option).

**Billing impact:** None.

**Privacy:** We are NOT tracking searches for analytics or marketing. This is purely for user convenience. Aligns with Kagi's "Your searches are always private" philosophy.

---

## Relationships Between Data Subjects

| Subject A | Relationship | Subject B | Notes |
|---|---|---|---|
| User | has many | Web Sources | Max per plan. Deleted on account deletion (30-day grace). |
| User | has many | Scopes | Max 20. Deleted on account deletion. |
| User | has many | Domain Preferences | Max 1000. Deleted on account deletion. |
| User | has many | Search History entries | Max 100 FIFO. Deleted on account deletion. |
| Web Source | has many | Highlights | Cascade delete — highlights die with source. |
| Web Source | has many | Highlight Notes | Cascade delete — notes die with highlight. |
| Web Source | can be in many | Projects | Via a linking table (like project_papers). Each link has own notes/tags/status. |
| Web Source | found via | Search History entry | Optional provenance link — which search found this source. |
| Scope | used in | Search History entry | Optional — which Scope was active during a search. |
| Papers (EXISTING) | NOT connected to | Web Sources | Completely separate tables. Academic tab uses papers. Web/News/Discussions tabs use web sources. No cross-contamination. |

**Account deletion behavior:**
- 30-day grace period (account deactivated immediately, data held for 30 days)
- After 30 days: all web sources, highlights, notes, scopes, domain preferences, search history permanently deleted
- Existing papers/projects/documents follow their already-established deletion rules

**Orphan rules:**
- Web source deleted → all its highlights and notes deleted (cascade)
- Project deleted → project-source links deleted, but the web source itself survives in Library
- User deletes account → everything goes (after 30-day grace)
- No orphaned annotations, no orphaned highlights, no orphaned links

---

## What Is NOT Touched

The following existing data subjects are NOT modified by the Explore module:

- **papers** table — stays exactly as-is. Academic tab reads from this.
- **project_papers** — stays as-is. Academic papers linked to projects via this.
- **paper_chunks** — stays as-is. RAG embeddings for academic papers.
- **pdf_highlights** — stays as-is. PDF annotation for academic papers.
- **search_queries** — stays as-is. Existing project-scoped search audit trail.
- **users** — minor addition: may need new usage counter fields for web source limits.
- **projects** — minor addition: needs to support linking to web sources (new linking table), not just papers.

---

## Future-Proofing Decisions

| Question | Answer |
|---|---|
| Teams/organizations | Not now. Individual users only. Plan for it later. |
| Real-time collaboration on web sources | Not planned, not needed. Overkill. |
| Admin panel | Not now. Plan for it later. |
| Analytics on searches | No. Searches are private. We don't track for marketing. |
| Institutional sales | Not now. Plan for it later. |
| Data compliance (GDPR-like) | Yes — 30-day grace on account deletion, then permanent purge. Export capability planned but not V1. |
| Public API | Not now. Plan for it later. |
| Export web sources | Planned future feature. Data model must support it (no blockers). |
| Import from Readwise/Instapaper | Planned future feature. Standard CSV/HTML import. Data model must support it. |
| Scope sharing | Planned future feature. Shareable link model. |
| Community domain rankings | Planned future feature. Aggregated anonymous preference data. |
| Web source versioning | Not planned. One snapshot at save time, frozen forever. |
| Cross-discipline web sources | Not needed. Web sources are domain-agnostic. A news article is a news article regardless of field. |

---

## Open Questions

- [ ] Exact plan-based limits for web source saves (50 free? 500 basic? unlimited pro?)
- [ ] Should the clean content snapshot for highlighting be stored in the same table or a separate content store (engineering decision, not product decision)?
- [ ] Should highlight colors be the same 5 as PDF highlights (yellow/green/red/blue/purple) or should web sources get additional colors?
- [ ] When a highlight is cited in a draft, what citation format is used for web sources? (APA for web articles? Simple URL reference?)
