# UX Brief: ScholarSync Explore Module
**Date:** 2026-03-31
**Source:** UX interview + competition research + Kagi reverse-engineering + Readwise Reader teardown
**Status:** COMPLETE — ready for UI brief and frontend development

---

## App Identity
- **Vibe:** Calm, tasteful, trustworthy, minimal, warm
- **Not like:** Perplexity (black box), Google (SEO-gamed), Adobe/MS Word (overwhelming), "research as afterthought to a writing app"
- **Should feel like:** As powerful as Google/Perplexity but the anti-thesis — show resources first, not black boxes. A curator with excellent taste who shows you only what matters and tells you WHY it matters.
- **Primary user:** Anyone writing content that needs real sources — YouTube scripts, blogs, Medium articles, newsletters, newspaper pieces, academic papers, social media posts. Writers who refuse to publish AI-generated slop without real evidence behind it.
- **Device priority:** Device-agnostic, laptop for max potential. Explore module specifically works well on mobile too.
- **Color mode default:** Light first. Nail light mode. Dark mode complements later.

## Design DNA (from inspirations)
- **Kagi Search:** THE reference for all UX decisions. Search bar, tabs, filter pills, keyboard shortcuts, settings structure, result layout, single-column results, Advanced Search modal, Scope (Lens) dropdown, domain personalization.
- **Readwise Reader:** Card design in list view (thumbnail + title + snippet + source + metadata), "..." actions menu with keyboard shortcuts shown inline, save icon behavior (outline → filled), trust indicator as colored card marker.
- **Bear:** Warm restraint, progressive disclosure, collapsible panels, "show nothing until asked" philosophy.
- **Netflix:** Three-layer progressive disclosure (default → hover → detail).
- **Apple Apps:** Semantic color only, "..." overflow for actions, collapsing chrome, typographic hierarchy.

## Design System (EXISTING — DO NOT CHANGE)
- **Light background:** `#FAFAF8` (warm off-white)
- **Dark background:** `#1C1B1A` (warm charcoal)
- **Brand accent:** `#6D28D9` (purple light) / `#8B7BF4` (purple dark)
- **Ink:** `rgb(55,53,47)` (warm dark, not pure black)
- **Font sans:** DM Sans
- **Font serif:** Source Serif 4
- **Font mono:** JetBrains Mono

---

## Navigation
- **Pattern:** Explore is a separate module in the app sidebar, alongside Feed, Library, Editor, etc.
- **Explore vs Feed:** Separate modules. Feed = passive browsing ("what's new in subscriptions"). Explore = active searching ("find me sources on X"). Different intent, different module.
- **After entering Explore:** User sees the Explore landing page. App sidebar remains as-is. No sub-navigation within Explore — it's search bar → results.

---

## Explore Module Decisions

### Landing Page (Pre-Search)
- **Model:** Kagi — just the search bar, nothing else
- **Elements:** Logo centered, search bar centered below (pill-shaped), tabs below search bar, filter pills below tabs
- **Empty state:** No feed, no trending, no recent searches visible. History behind a clock icon next to search bar (opt-in).
- **Philosophy:** "You came here to search. Here is the search box. Go."

### Tabs
- **Tabs:** Academic | Web | News | Discussions | More
- **Appearance:** Text-only, no icons, no decoration, no count badges
- **Active indicator:** 2px underline in `--brand` color
- **Default tab:** Academic (scholar-first positioning)
- **Tab switching:** Instant swap, no animation. "Search is done in hurry."
- **"More" tab:** Contains tabs we don't have yet (Images, Videos, Podcasts, PDFs). If SearXNG/infra supports them, include them. Otherwise it's future-proofing.
- **Keyboard:** 1/2/3/4 for tabs, ]/[ to cycle

### Filter Pills
- **Pattern:** Kagi-style pill dropdowns below tabs
- **Pills:** Scope ▾ | Order By ▾ | Time ▾ | Options ▾ | Advanced
- **Visibility:** Hidden on landing page. Appear after first search. (Optional "Always Show" toggle in settings.)
- **Appearance:** Small pill-shaped, 30-32px height, 16px border radius, --ink text, --surface-raised background

### Scope (replaces Kagi "Lens")
- **Dropdown contents:**
  - All Sources (default)
  - Built-in: Academic Papers, Web & Reports, News, Discussions
  - User-created custom scopes (e.g., "Top Cardiology Journals", "Government Sources")
  - "Edit Scopes..." at bottom (opens settings)
- **Active indicator:** `--brand` purple indicator in the pill when a custom Scope is active
- **Creation form:** Name, source types (checkboxes), included domains (up to 10), excluded domains (up to 10), included keywords (up to 5), excluded keywords (up to 5), date range, region, shareable link toggle

### Order By Dropdown
- Default (Quality)
- Recency
- Citation Count (Academic tab only)
- Source Trust
- Ascending / Descending

### Time Dropdown
- Any time (default)
- Past 24 hours / Past week / Past month / Past year
- Custom date range (From/To pickers)

### Options Dropdown
- Exact match only (Kagi's "Verbatim")
- Use my preferences (Kagi's "Personalized")
- Open access only (Academic-specific)
- Exclude preprints (Academic-specific)

### Advanced Search
- **Pattern:** Kagi-style modal behind "Advanced" pill button
- **Fields:** "Find sources with..." (all these words, exact phrase, any of these, none of these) + "Narrow by..." (region, date range, site/domain, source type, study type for Academic, author)
- **Actions:** Cancel | Build Search

### Search Results
- **Layout:** Single column, 780px max-width, left-aligned, Kagi model
- **Results per screen:** 5-6 with generous spacing (20-24px gap)
- **Pagination:** Traditional pagination, NOT infinite scroll
- **Stats line:** "23 results in 0.8s" (Kagi-style timing display)

### Result Card Anatomy
- **Trust indicator:** Readwise-style colored card marker (left-edge colored bar/dot)
  - Green = government, institutional (.gov, .edu, WHO, NHS)
  - Blue = major journalism, Q1 journals (NYT, Reuters, NEJM, Lancet)
  - Amber = community, forums (Reddit, HackerNews)
  - Gray = everything else (blogs, unknown domains)
- **Title:** Clickable link, 17px, weight 500, opens source page
- **Save icon:** Always visible (bookmark outline), right-aligned. One-click save to Library.
- **"..." menu:** Always visible, right-aligned, opens actions dropdown
- **URL breadcrumb:** 13px, `--brand` color, breadcrumb format
- **Author/Source line:** 13px, `--ink-muted`, when available
- **Date:** Small rounded grey pill badge, right-aligned
- **Snippet:** 14px, `--ink-muted`, 2-3 lines max, search terms in bold

### Per-Tab Card Variations
- **Academic:** URL shows journal name instead of URL path. Author line always shown. Trust dot = evidence level (green I, blue II, amber III, orange IV, gray V).
- **Web:** Standard URL breadcrumb. Trust dot = domain authority tier.
- **News:** Publication name + relative date ("Reuters · 3 hours ago"). Trust dot = outlet tier.
- **Discussions:** Platform + community ("Reddit · r/medicine"). Engagement shown ("▲ 847 · 234 comments"). Trust dot = gray for all.

### Hover Behavior
- **Desktop:** Subtle background change to `--surface-raised`. Action icons appear if not already visible.
- **Mobile:** No hover. "..." menu and save icon always visible. Tap to interact.

### "..." Actions Menu (per result)
| Action | Keyboard Shortcut |
|---|---|
| Save to Library | `S` |
| Save to Project... | `Shift+S` |
| Cite in Draft | `C` |
| Open Original | `O` |
| Summarize Page | `Shift+Q` |
| Ask About Page | `A` |
| More from this source | — |
| Block this source | `B` |
| Copy Link | `Shift+C` |

### Save Behavior
- **Where:** One-click save to Library. Organize into Projects later from Library.
- **Feedback:** Subtle toast: "Saved to Library" (auto-dismisses 2 seconds). Save icon fills in (outline → filled).
- **Cite from Explore:** Available as secondary action in "..." menu ("Cite in Draft"). Opens draft picker if multiple drafts open. Not prominent — save is the primary action, cite is secondary.

### Synthesis (On-Demand)
- **Trigger:** Click-to-generate button in the "..." overflow menu (Kagi Quick Answer style), or keyboard shortcut `Q`
- **Copy:** Better word than "Synthesize" — TBD (e.g., "Research Brief", "Quick Summary", "Overview")
- **Placement:** Appears below search bar, above results (pushes results down), like Kagi Quick Answer
- **Content:** AI-generated summary with inline citation markers [1][2][3], colored by trust tier of cited source
- **Behavior:** Streams in word-by-word. Collapsible ("Show More" / "Collapse"). One synthesis per search, draws from all source types.
- **Cost control:** Only fires when user explicitly requests. No auto-synthesis.

### Source Info Panel (Trust & Personalization)
- **Trigger:** Shield icon (🛡) per result, or press `I` on highlighted result
- **Content:** Domain name, organization, trust tier, domain type, impact metrics (IF/quartile for journals), open access status, tracker count
- **Personalization controls:** Block / Lower / Normal / Higher / Pin (5-level, Kagi model)
- **Report button:** "Report as low-quality"

### Search History
- **Location:** Clock icon (🕐) next to the search bar
- **Behavior:** Click to see recent searches as a dropdown list
- **Philosophy:** Opt-in. Not visible by default. User must click to see history.

### Keyboard Shortcuts
- **Overlay:** Press `?` to see all shortcuts (Kagi model)
- **Navigation:** j/k or ↑/↓ to move between results, Enter to open
- **Tabs:** 1/2/3/4 for tab switching, ]/[ to cycle
- **Actions:** S (save), O (open original), C (cite), Q (synthesize), I (source info), B (block)
- **Selection:** X to toggle select, Shift+↑/↓ to extend, Cmd+A to select all
- **Search:** / to focus search bar

### Academic Tab
- **Decision:** Keeps existing Research page UX/UI. Global design improvements (typography, spacing, card design from this brief) apply. But the academic search pipeline, evidence levels, journal quality, filters — all stay as-is.
- **Consistency:** Academic tab follows the same Kagi-style layout as other tabs, but with academic-specific metadata on cards (authors, journal, evidence level, citations).

### Settings (Explore-specific)
- **Search Behavior:** Search suggestions (on/off), show filter bar by default (on/off), group results from same domain (on/off), result snippet length (short/long), default tab, open links in new tab
- **Scopes:** Create/edit/delete/toggle active scopes, share scope links
- **Synthesis:** Auto-synthesize on `?` queries (on/off), synthesis model selection
- **Source Preferences:** View/manage boosted/blocked domains, add domain rules (Block/Lower/Normal/Higher/Pin), community rankings

---

## Content Density
- **Default:** Spacious (Kagi model — generous whitespace, large text, 5-6 results per screen)
- **Density handling:** Show results with title + snippet (2-3 lines). Click/navigate to expand. No full abstracts in list view.
- **Lists:** Pagination (not infinite scroll)
- **Content width:** 780px max, left-aligned within centered container

## Motion
- **Navigation speed:** Instant. No transitions on tab switching, filter changes, or result loading.
- **Micro-animations:** Minimal — hover highlight background change only. Save icon fill animation (outline → filled).
- **Modal appearance:** Instant overlay with backdrop dim (Advanced Search). No slide-in.
- **Toast:** Fade in, auto-dismiss after 2 seconds, fade out.

## Responsive Behavior
- **Desktop (>1024px):** Full layout, 780px results column, all filter pills visible, hover interactions
- **Tablet (768-1024px):** Full width, tabs/pills scroll horizontally
- **Mobile (<768px):** Full width, tabs/pills scroll horizontally, "..." always visible, source info becomes bottom sheet

---

## Rules (extracted from interview)

1. **Kagi is THE UX reference.** When in doubt, do what Kagi does.
2. **No black boxes.** Show resources first. Synthesis is optional and on-demand.
3. **Opinionated restraint.** Make the hard decision about what NOT to show.
4. **Progressive disclosure.** Three layers: default (title + snippet + trust dot) → hover (action buttons) → click ("..." menu or source info panel).
5. **Speed over polish.** Search is done in hurry. No animations. Fulfill the requirement quickly or the user leaves.
6. **Trust indicators, not decorative badges.** Colored dots/markers communicate source quality without cluttering.
7. **Save is the primary action.** One-click save to Library. Cite is secondary (in "..." menu).
8. **Feed and Explore are separate.** Different intent, different module.
9. **Academic tab stays strong.** Don't break what works. Apply global design improvements only.
10. **Familiarity matters.** Tabs give familiarity. Don't invent radical new patterns that make users flee.
11. **Anti-SEO is the product thesis.** If Explore shows SEO-gamed results, we've failed. Source quality indicators are the entire point.
12. **Light mode first.** Nail light mode. Dark mode complements.

---

## Open Questions
- [ ] Better copy for "Synthesize" button — "Research Brief"? "Overview"? "Quick Summary"? "Insights"?
- [ ] Should grouped results from same domain be on or off by default?
- [ ] Should the clock icon history show just queries, or queries + which tab/scope was active?
- [ ] Max number of custom Scopes per user (Kagi allows 20 lenses)

---

## Next Steps
1. Run `/ui-brief` — define visual language (already mostly set via globals.css, but formalize for Explore components)
2. Run `/write-a-prd` — create the PRD for Explore module V1 as a GitHub Issue
3. Run `/prd-to-plan` — break PRD into tracer-bullet vertical slices
4. Phase 4.3: Figma wireframes from this spec
5. Phase 4.4: Code from design
