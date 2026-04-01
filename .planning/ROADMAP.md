# Roadmap — Explore Module V1

## Phases

Each phase is a vertical tracer bullet — cuts through all layers (schema → API → UI → tests) and produces a demoable deliverable.

---

### Phase 1: SearXNG Deployment + Source Adapter (Tracer Bullet)
**Deliverable:** Search "climate change" → get web results from SearXNG → displayed in terminal/API response
**Why first:** Proves the entire new infrastructure works. If SearXNG deployment fails, everything else is blocked.

- [x] Deploy SearXNG to GCP using `infra/searxng/deploy.sh`
- [x] Create `src/lib/search/sources/searxng.ts` — source adapter that calls SearXNG JSON API
- [x] Normalize SearXNG results to `UnifiedSearchResult` format
- [x] Add SEARXNG_URL to environment variables
- [x] Add SearXNG to unified search route (behind a `tab` query parameter)
- [x] Write tests: SearXNG adapter returns normalized results, handles timeout, handles empty results, handles SearXNG down
- [ ] Verify: `curl /api/search/unified?q=climate+change&tab=web` returns SearXNG results

Risk: **MEDIUM** — GCP deployment is new territory, but deploy.sh automates it. SearXNG is well-documented.

---

### Phase 2: Trust Tier + Domain Preferences (Quality Layer)
**Deliverable:** Web results have colored trust indicators. User can Mute/Prefer domains and see the effect on next search.

- [x] Create `src/lib/search/trust-tier.ts` — static domain → tier classifier
- [x] Create curated domain list (top 200 government, 100 journalism, 50 community domains)
- [x] Apply trust tier to every result in unified search route
- [ ] Run database migration for `domain_preferences` table
- [x] Create server actions: setDomainPreference, getDomainPreferences, removeDomainPreference
- [x] Apply domain preferences in unified search route (filter Muted, boost Preferred)
- [x] Write tests: trust classifier, domain preference CRUD, Muted domains filtered, Preferred boosted

Risk: **LOW** — straightforward data layer + classifier. No external dependencies.

---

### Phase 3: Explore Page Shell (UI Foundation)
**Deliverable:** User navigates to /explore, sees search bar, types a query, sees results with trust indicators and tabs.

- [x] Create `/explore` route with Kagi-style layout
- [x] Build ExploreSearchBar component (glass-morphism pill, 48px, DM Sans)
- [x] Build ExploreTabs component (Academic | Web | News | Discussions | More)
- [x] Build ResultCard component (trust left-border, title, URL, snippet, date, save icon, "..." menu)
- [x] Build per-tab card variations (Academic: journal+authors, News: outlet+time, Discussions: platform+engagement)
- [x] Wire to unified search API with tab parameter
- [x] Implement client-side tab switching (instant, no re-fetch)
- [x] Add pagination
- [x] Add stats line
- [x] Update sidebar: rename "Discover" → "Explore"
- [x] Write E2E or integration tests: search renders results, tabs switch, pagination works

Risk: **LOW** — UI work, well-specified by UX/UI briefs and Kagi reverse-engineering.

---

### Phase 4: Filter Pills + Scopes (Search Refinement)
**Deliverable:** User can filter by time, sort by trust, and create/use custom Scopes.

- [x] Build FilterPills component (Scope, Order By, Time, Options)
- [x] Build ScopeDropdown with built-in options + user custom scopes
- [x] Run database migration for `scopes` table
- [x] Create server actions: createScope, updateScope, deleteScope, getUserScopes, reorderScopes
- [x] Build Scope management settings page
- [x] Implement Order By: Quality, Recency, Citation Count, Source Trust
- [x] Implement Time filter: 24h, week, month, year, custom range
- [x] Implement Options: Exact match, Use my preferences, Open access only
- [x] Apply Scope constraints in unified search route
- [x] Active filter pill styling (purple tint)
- [x] Write tests: Scope CRUD, max 20 enforced, filters applied to results

Risk: **LOW** — data layer + UI. Scopes are simple domain/keyword filters.

---

### Phase 5: Save + Web Sources Database (Library Integration)
**Deliverable:** User clicks (+) on a result → saved to Library → visible in Library page → linkable to Projects.

- [x] Run database migration for `web_sources` and `project_web_sources` tables
- [x] Create server actions: saveWebSource, getWebSources, archiveWebSource, deleteWebSource, linkToProject
- [x] Implement duplicate prevention (unique user_id + url)
- [ ] Implement plan-based save limits
- [x] Build save interaction on ResultCard (+ icon → checkmark, toast notification)
- [x] Build "Save to Project..." picker in actions menu
- [x] Update Library page to show Web Sources alongside Papers
- [x] Implement soft delete with 30-day recovery
- [x] Write tests: save CRUD, duplicate prevention, plan limits, soft delete, cascade, multi-project linking

Risk: **LOW** — follows existing project_papers pattern exactly. Schema already built.

---

### Phase 6: Content Extraction + Annotation (Reading & Highlighting)
**Deliverable:** User opens a saved web source → reads clean content → highlights passages with colors → adds notes.

- [x] Create `src/lib/web/content-extractor.ts` using Jina Reader (existing pattern)
- [x] Background extraction job: triggered on save, extracts content, updates `content_html` + `content_plain`
- [x] Build Web Source Reader view (clean rendered HTML from snapshot)
- [x] Run database migration for `web_source_highlights` table
- [x] Implement highlighting on web content (text selection → color picker → save)
- [x] Implement notes on highlights
- [x] Implement general notes on web source
- [x] Reuse existing annotation color enum (yellow, green, red, blue, purple)
- [x] Make highlights citable in editor drafts
- [x] Write tests: content extraction, highlight CRUD, notes, citation integration

Risk: **MEDIUM** — content extraction from arbitrary web pages can be unpredictable. Readability handles 90% of cases. Edge cases will appear.

---

### Phase 7: Source Info Panel + Actions Menu (Interaction Polish)
**Deliverable:** User clicks shield → sees domain details + preference controls. Full actions menu with keyboard shortcuts.

- [ ] Build SourceInfoPanel (inline expansion with domain name, trust tier, type, tracker info, preference controls)
- [ ] Build ActionsMenu ("..." dropdown with Save, Save to Project, Cite, Open Original, Summarize, Ask About, More from source, Block, Copy Link)
- [ ] Add keyboard shortcut labels to every menu item
- [ ] Wire "Block this source" to domain preferences (sets to Mute)
- [ ] Wire "More from this source" to re-search scoped to domain
- [ ] Build "My Sources" settings page (manage all domain preferences)
- [ ] Write tests: source info panel renders, actions execute correctly

Risk: **LOW** — UI polish, no new infrastructure.

---

### Phase 8: Keyboard Navigation + Search History (Power User Features)
**Deliverable:** User navigates entirely by keyboard. Search history accessible via clock icon.

- [x] Implement j/k result navigation with visible highlight
- [x] Implement / for search focus, 1-4 for tabs, ]/[ for tab cycling
- [x] Implement S/O/C/Q/I/B action shortcuts
- [x] Implement X for selection, Shift+arrows for range
- [x] Build KeyboardShortcutsOverlay (? trigger, two-column layout)
- [x] Run database migration for `explore_search_history` table
- [x] Create server actions: addSearchHistory, getSearchHistory, deleteSearchHistory, clearAllHistory
- [x] Build SearchHistoryDropdown (clock icon, recent queries with tab/scope context)
- [x] Implement FIFO at 100 entries
- [x] Write tests: keyboard nav, history CRUD, FIFO enforcement

Risk: **LOW** — keyboard handling is well-understood. History is simple CRUD.

---

### Phase 9: On-Demand Synthesis (AI Layer)
**Deliverable:** User presses Q → AI synthesis streams above results with colored citation markers.

- [x] Build SynthesisBlock component (collapsible, streaming, citation markers)
- [x] Create synthesis API endpoint (or extend existing /api/research/synthesize)
- [x] Synthesis draws from top results across current tab
- [x] Citation markers colored by trust tier of cited source
- [x] Keyboard shortcut Q toggles synthesis
- [x] Synthesis collapsible via button or Q again
- [x] Write tests: synthesis generates, citations link to results, streaming works, collapse works

Risk: **LOW** — existing synthesis infrastructure exists (AISynthesisPanel, /api/research/synthesize). This extends it for web sources.

---

### Phase 10: Mobile + Responsive + Polish
**Deliverable:** Explore works beautifully on mobile. All edge cases handled. Ready for users.

- [ ] Responsive layout: tabs/pills horizontal scroll on mobile
- [ ] Save icon and actions menu always visible on mobile (no hover)
- [ ] Source Info panel as bottom sheet on mobile
- [ ] Hover states: shadow lift on desktop result cards
- [ ] Loading states for search and content extraction
- [ ] Error states for failed searches, failed extraction
- [ ] Empty states for no results, no history
- [ ] Final visual polish against UI Brief specs
- [ ] Cross-browser testing
- [ ] Performance audit (< 2 second results, instant tab switching)
- [ ] E2E test suite for full Explore workflow

Risk: **LOW** — polish and responsive design. No new architecture.

---

## Phase Summary

| Phase | Deliverable | Risk | Dependencies |
|---|---|---|---|
| 1 | SearXNG deployed + adapter working | MEDIUM | GCP account |
| 2 | Trust tiers + domain preferences | LOW | Phase 1 |
| 3 | Explore page with results + tabs | LOW | Phase 1 |
| 4 | Filter pills + Scopes | LOW | Phase 3 |
| 5 | Save to Library + web sources DB | LOW | Phase 3 |
| 6 | Content extraction + annotation | MEDIUM | Phase 5 |
| 7 | Source Info panel + actions menu | LOW | Phase 2, 5 |
| 8 | Keyboard nav + search history | LOW | Phase 3 |
| 9 | On-demand synthesis | LOW | Phase 3 |
| 10 | Mobile + responsive + polish | LOW | All above |

**Phases 2-5 can run in parallel** after Phase 1. Phase 6 depends on Phase 5. Phases 7-9 can run in parallel after their dependencies. Phase 10 is the final pass.

**Estimated total:** 10 phases. Each phase is independently demoable and shippable.
