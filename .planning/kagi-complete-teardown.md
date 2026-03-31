# Kagi Search — Complete UX Teardown

> Captured: 2026-03-31 | Browser: Chrome (1440x900 desktop + 375px mobile)
> Account: Kagi member since 03/2026 | Plan: 100 searches/month
> Theme: Dark mode (Kagi Dark default)

---

## 1. HOMEPAGE (Logged-in)

**URL:** `https://kagi.com/`

### Elements
- **Kagi logo + dog mascot** — centered, large white wordmark "kagi" with illustrated dog character (sunglasses, ball)
- **Search bar** — full-width, rounded corners, dark glass-morphism style, placeholder: "Let's fetch ..."
- **Search icon** — magnifying glass inside the search bar (right side)
- **"Search Options"** — gear icon + text link below search bar (right-aligned)
- **Top-right controls:**
  - Usage counter pill: smiley face emoji + "4 of 100" (yellow text)
  - Grid icon (4-square layout — Kagi products launcher)
  - Hamburger menu (3-line — Control Center)
- **Privacy banner** — bottom area, lightbulb icon: "Your searches are always private and not saved. Read more in our privacy policy." + Dismiss button
- **Footer links:** Upgrade, About, Blog, Changelog, Live Stats, Hub, Swag, globe icon, Privacy & Terms, Help Docs, Browser Extensions, Feedback, Press
- **Copyright:** "Kagi. Humanize the Web."

### Visual Notes
- Dark background (#1a1a2e or similar)
- Minimal, Google-style centered layout
- No ads, no distractions — just search bar
- Mascot adds personality/brand differentiation

---

## 2. SEARCH RESULTS PAGE

**URL:** `https://kagi.com/search?q=SGLT2+inhibitors+cardiovascular+outcomes`

### Layout Anatomy
```
[Kagi logo] [====== Search Bar ======] [X] [Search icon]   [Usage] [Grid] [Menu]
[All] [Images] [Videos] [News] [Podcasts] [Maps]  [Share] [More ...]
[Lens v] [Region v] [Order By v] [Time v] [Options v] [Advanced]
[X relevant results in X.XXs. ...]                      [Quick Answer]
[Result 1]
[Result 2]
...
```

### Search Bar
- White text on dark input field
- Clear (X) button appears when text present
- Search (magnifying glass) button on right
- Auto-appends "?" when Quick Answer is triggered

### Tab Bar
- **Tabs:** All | Images | Videos | News | Podcasts | Maps | More (with overflow ...)
- Active tab: underlined in purple/white
- Share icon (arrow) and More (three-dot vertical) to the right of tabs

### Filter Pills Row
- Pill-shaped buttons with chevron dropdowns
- **Lens** — dropdown with available search lenses
- **Region** — current region (e.g., "India (IN)")
- **Order By** — sort order
- **Time** — date range filter
- **Options** — verbatim/personalized toggles
- **Advanced** — opens full advanced search modal

### Stats Line
- Left: "18 relevant results in 1.22s. All results from external indexes."
- Shows result count, timing, and index source
- "71% unique Kagi results" shown on some queries

### Quick Answer Button
- Lightning bolt icon + "Quick Answer" text
- Right-aligned on stats line
- Triggers AI-generated summary above results

### Result Card Anatomy
```
[Title (purple link, truncated with ...)]               [Heart] [Three-dot]
[Favicon] [domain.com] > breadcrumb > path
[Date badge] Snippet text that describes the page content...
```
- **Title:** Purple/light blue link text, clickable
- **Heart icon:** Favorite/save (outline by default)
- **Three-dot menu (...):** Context actions per result
- **Favicon:** Small site icon next to domain
- **Domain:** Bold text (e.g., "pmc.ncbi.nlm.nih.gov")
- **Breadcrumb:** Grey text showing URL path
- **Date badge:** Grey rounded pill (e.g., "Mar 24, 2026")
- **Snippet:** 2-3 lines of grey text
- **Grouped results:** Some results appear indented under a primary result (no favicon/domain shown)

### Hover State
- Subtle background highlight on the result card
- No dramatic visual change

### Three-Dot Menu (per result)
Options:
1. More results from this site
2. Remove results from this site
3. Open page in Web Archive
4. _(separator)_
5. Quick Summary
6. Continue in Assistant

### Quick Answer (AI Summary)
- Appears inline, pushes results down
- **"Quick Answer"** bold heading
- Structured prose with:
  - Bold key terms (e.g., **SGLT2 inhibitors**, **cardiovascular disease (CVD)**)
  - Bulleted list of findings (Heart Failure, MACE, Broad Applicability, Ongoing Research)
  - Inline citation numbers in grey circles (superscript, linked to sources: [1], [2], etc.)
- Ends with summary paragraph
- **"Show More"** expandable section with chevron below
- Query auto-modified to question form (appends "?")

---

## 3. SEARCH TABS

### All Tab
- Default view (see Section 2)
- Full filter row: Lens, Region, Order By, Time, Options, Advanced

### Images Tab
**URL:** `https://kagi.com/images?q=...`
- **Layout:** Masonry grid of image thumbnails
- **Filters:** Latest, GIF, HD, Order By, Size, Color, License, Image Types, Aspect, Time, AI Images
- **Search bar addition:** Camera/visual search icon added
- Thumbnails show source favicons/watermarks

### Videos Tab
**URL:** `https://kagi.com/videos?q=...`
- **Layout:** 3-column grid of video cards
- **Filters:** Order By, Time, Duration, Resolution, Source, AI Videos
- **Card anatomy:** Thumbnail with duration badge (e.g., "5:25"), favicon + source domain, heart + three-dot menu, title (bold), time ago ("2 years ago"), likes + views count
- Sources: YouTube, PharmacyTimes, Harvard Medical School, etc.

### News Tab
**URL:** `https://kagi.com/news?q=...`
- **Layout:** Vertical list (not cards)
- **Filters:** Order By, Region, Time (simpler than All tab)
- **Result anatomy:** Favicon + domain + date, title, snippet
- Bookmark/save icon and three-dot menu per result
- Dates prominently displayed

### Podcasts Tab
**URL:** `https://kagi.com/podcasts?q=...`
- **Layout:** Vertical list with large square artwork thumbnails
- **Filters:** Order By only
- **Sections:** "Podcasts" header (headphones icon), "Episodes" sub-header (play icon)
- **Episode anatomy:** Square artwork (~100px), show name, episode title (link), "By: [Publisher]", duration (e.g., "10:18"), date, snippet

### Maps Tab
**URL:** `https://kagi.com/maps/search?q=...`
- **Completely separate UI** — "Kagi Maps" with own search bar
- **Layout:** Left panel (place listings) + right panel (Mapbox map)
- **Category quick-filters:** Restaurants, Cafes, Hotels, Parks, Pharmacies, Museums
- **Sort pills:** Relevance, Rating, Distance, Price
- **Place listing anatomy:** Number, name, star rating + count, photo, address, open/closed status + hours
- **Map features:** Pin markers with rating badges, zoom +/-, compass (N), location target, layers button
- **Note:** Uses LIGHT theme even when search is in dark mode

---

## 4. LENSES

### Lens Dropdown (from filter pills)
Available built-in lenses:
1. Fediverse Forums
2. News 360
3. Usenet/Archive
4. Kagi Documentation
5. Academic
6. Forums
7. Programming
8. PDFs

Bottom action: **Edit** — navigates to lens management page

### Active lens indicator
- Green toggle circle appears in the Lens pill
- Pill text changes to active lens name (e.g., "Academic")
- Green checkmark next to active lens in dropdown

### Academic Lens (`&l=4`)
- Results focus on .edu domains, journals, PMC
- Some results show: "by [Author] · [Year] · Cited by [N]" — academic citation metadata
- Region defaults to "International"

### Forums Lens (`&l=5`)
- Results focus on Reddit, forums, discussion boards
- Titles often include "[article]" prefixes from subreddits
- Region defaults to "India (IN)"

### News 360 Lens (`&l=1`)
- General news discovery (not query-specific)
- Shows diverse news sources with dates
- Broad topics, not filtered to search query

### Lens Management Page
**URL:** `https://kagi.com/settings/lenses`
- Title: "Customize your lenses"
- **Counter:** "Active Lenses (8/20)" — max 20 lenses
- **"Create New" button** (top right)
- **Each lens card:** Drag handle (6-dot grip), name, description, on/off toggle (purple), edit (pencil icon)
- Drag to reorder

### Lens Creation Form
**URL:** `https://kagi.com/settings/create_lens`
- Fields:
  - Name of the lens (text)
  - Include only these sites (up to 10, comma-separated) — placeholder: "example.com, *.substack.com, *.gov, github.com/WebKit/*"
  - Include pages containing these keywords (up to 5, comma-separated)
  - Advanced Options (expandable)
- Save / Cancel buttons
- Back to Lenses link

---

## 5. FILTER PILLS

### Order By
Options:
- **Default** (checked by default)
- Recency
- Website
- Ad/Trackers Count
- _(separator)_
- **Most relevant first** (checked by default)
- Least relevant first

### Time
Options:
- **All** (checked by default)
- Past 24 hours
- Past Week
- Past Month
- Past Year
- _(separator)_
- From Date: `dd/mm/yyyy` (date picker with calendar icon)
- To Date: `dd/mm/yyyy` (date picker with calendar icon)
- Search button (for custom date range)

### Options
Options:
- Verbatim
- _(separator)_
- **Personalized** (checked by default, green checkmark)

### Region
- Search input at top: "Search region..." with X to clear
- **International** as first option
- Alphabetical country list with ISO codes (Afghanistan (AF), Albania (AL), etc.)
- Scrollable long list
- Currently selected shown in pill (e.g., "India (IN)")

---

## 6. ADVANCED SEARCH

**Triggered by:** Clicking "Advanced" pill or URL hash `#menu-advanced-search`

### Modal Layout
**Section 1: "Find pages with..."**
| Field | Placeholder |
|-------|------------|
| all these words | "Type the important words: e.g. tri-colour rat terrier" |
| this exact word or phrase | 'Put exact words in quotes: e.g. "rat terrier"' |
| any of these words | "Type OR between all the words you want: miniature OR standard" |
| none of these words | "Put a minus sign just before words that you don't want: e.g. -rodent, -\"Jack Ru..." |

**Section 2: "Then narrow your results by..."**
| Field | Default | Type |
|-------|---------|------|
| region | India (IN) | Dropdown |
| last update | Anytime | Dropdown |
| date | From Date / To Date | Date pickers (dd/mm/yyyy) |
| site or domain | _(empty)_ | Text input, placeholder: "Search one site (like wikipedia.org) or limit your results to a domain like .edu, ..." |
| terms appearing | Anywhere in the page | Dropdown |
| file type | Any Format | Dropdown |

Each field has an info (i) icon for tooltip help.

**Actions:** Cancel | Build Search

---

## 7. KEYBOARD SHORTCUTS

**Triggered by:** Pressing `?` on search results page

### Two-column overlay

**Left column: Keyboard shortcuts**
| Key | Action |
|-----|--------|
| `?` | Toggle open/close this keyboard shortcut help screen |
| `j` / `arrowdown` | Move highlight down a result |
| `k` / `arrowup` | Move highlight up a result |
| `h` / `arrowleft` | Move left within horizontal inline content, or change boost/ban status in site info modal |
| `l` / `arrowright` | Move right within horizontal inline content, or change boost/ban status in site info modal |
| `enter` | Go to highlighted result (or open first result, which would be highlighted) |
| `/` | Focus the search bar |
| `!` | Focus the search bar, and add a "!" to start typing a bang |
| `q` | Open quick answer |
| `Escape` | Reset highlight scroll state to first result, or close site info |

**Right column: Search operators**
| Operator | Description |
|----------|-------------|
| `filetype:` | Returns only search results that match a particular file extension |
| `site:` | Returns only search results from a particular website |
| `inurl:` | Finds webpages whose URL contains the terms or phrases |
| `intitle:` | Finds webpages whose title contains the terms or phrases |
| `"words"` | Finds the exact words in a phrase |
| `()` | Finds or excludes webpages that contain a group of words |
| `AND` | Finds webpages that contain both of the terms or phrases |
| `+` and `-` | Finds webpages that contain or exclude a term or phrase |
| `OR` | Finds webpages that contain either of the terms or phrases |

---

## 8. SETTINGS PAGES

### Settings Sidebar Navigation
```
General
Appearance
Search
  - General
  - Lenses
Personalized Results
AI
Search Widgets
Privacy
Advanced
Assistant
Billing
  - General
  - Usage Details
Account
Sign Out
```

### Search Settings (`/settings/search`)
| Setting | Type | Default |
|---------|------|---------|
| Search Suggestions | Toggle | ON |
| Search Suggestion Details | Toggle | ON |
| Search Options Always Open | Toggle | OFF |
| Grouped Results | Toggle | ON |
| Fewer Results per Page | Toggle | OFF |
| Verbatim mode | Toggle | OFF |
| Result Snippet Length | Dropdown | Short |
| Search Bangs | Toggle | ON |
| Allowed Quick Bangs | Text input | _(empty, 20 max)_ |
| Search Snaps | Toggle | ON |
| Allowed Quick Snaps | Text input | _(empty, 20 max)_ |
| Safe Search | Toggle | ON |
| Image Safe Search | Toggle | ON |
| Video Thumbnails | Dropdown | Do not modify |
| Video Titles | Dropdown | Do not modify |

### Appearance Settings (`/settings/appearance`)
| Setting | Type | Default |
|---------|------|---------|
| Theme | Segmented: Default/Light/Dark | Default |
| Font Size | Slider: Small/Medium/Normal/Large/Larger | Normal |
| Default Light Theme | Dropdown | Kagi Light (Default) |
| Default Dark Theme | Dropdown | Kagi Dark (Default) |
| Show Results (alignment) | Dropdown | Left |
| Show URL Favicons | Dropdown | URL Adjacent |
| URL Display Style | Dropdown | Split |
| URL Placement | Dropdown | Below Title |
| Custom CSS | Text area + Change button | _(empty)_ |

### Search Widgets Settings (`/settings/more_search`)
All toggleable inline widgets for search results:
| Widget | Default |
|--------|---------|
| Inline Images | ON |
| Inline Videos | ON |
| Inline News | ON |
| Interesting Finds | ON |
| Inline Discussions | ON |
| Listicles | ON |
| Inline Maps | ON |
| Public Records | ON |
| Podcasts | ON |
| Quick Peeks | ON |
| Summary Box | ON |
| Cheat Sheet | ON |
| Blast from the Past | ON |
| Code | ON |
| Related Searches | ON |
| Wikipedia | ON |

### AI Settings (`/settings/ai`)
| Setting | Type | Default |
|---------|------|---------|
| Auto Quick Answer | Toggle | ON |
| SlopStop for image/video results | Dropdown | Downrank |
| SlopStop for web search results | Dropdown | Downrank |
| SlopStop Reports | Button | _(review reported websites)_ |

**SlopStop:** Community-driven project to flag AI-generated websites. Options: Downrank (default) / other options in dropdown.

### Personalized Results (`/settings/user_ranked`)
- Title: "Raise or lower domains in search results"
- Tabs: **Domains** | Video channels
- Filter by status: All (dropdown)
- Counter: "X / 1000" (max 1000 domain rules)
- **Bulk Add** button
- Table columns: Domain | Date and Time | Type | Symbol
- **Type options:** Block, Lower, Normal, Higher, Pin
- Each domain shows a pin/shield icon matching its type
- "domain leaderboard" link — see community rankings

### Assistant Settings (`/settings/assistant`)
| Setting | Type | Default |
|---------|------|---------|
| Thread Saving | Dropdown | Temporary (24 h) |
| Default assistant | Dropdown | Last used |
| Custom Instructions | Textarea (20,000 chars) | _(empty)_ |

### General Settings (`/settings/search_widgets` redirects here)
| Setting | Type | Default |
|---------|------|---------|
| Country/Region | Dropdown | India (IN) |
| Interface Language | Dropdown | Detect language |
| Keyboard Shortcuts | Toggle | ON |
| Open Links in a New Tab | Toggle | OFF |
| Temperature Unit | Dropdown | Automatic |
| Time Format | Dropdown | Automatic |
| Set as Default Search Engine | Button | — |
| Debug Translations | Toggle | OFF |

---

## 9. QUICK ANSWER vs SUMMARIZE

### Quick Answer (search-level AI)
- **Trigger:** Click "Quick Answer" button or press `q`, or end query with "?"
- **Scope:** Synthesizes across ALL search results
- **Output:** Structured answer with inline citations [1][2][3]...
- **Position:** Appears above search results, pushes them down
- **Features:** "Show More" expandable section
- **Cost:** Counts as a search (usage counter increments)

### Quick Summary (per-result)
- **Trigger:** Three-dot menu > "Quick Summary" on individual result
- **Scope:** Summarizes a single page/article
- **Position:** Likely inline or in a popover (not captured separately)

### Continue in Assistant
- **Trigger:** Three-dot menu > "Continue in Assistant"
- **Scope:** Opens Kagi Assistant with the article/result context
- **Purpose:** Deep-dive conversation about a specific result

---

## 10. SITE INFO / DOMAIN PERSONALIZATION

### Access Method
- Click the **shield icon** in search results (mentioned in settings)
- Keyboard: `h`/`l` keys to change boost/ban status
- Settings page: `/settings/user_ranked`

### Domain Ranking Controls
Five levels of domain personalization:
1. **Block** — Never show results from this domain
2. **Lower** — Deprioritize results from this domain
3. **Normal** — Default ranking (no modification)
4. **Higher** — Boost results from this domain
5. **Pin** — Always show results from this domain at top

### Domain Leaderboard
- Community-sourced domain rankings
- Shows what domains everyone else is raising/lowering

---

## 11. MOBILE VIEW (~375px)

### Mobile Homepage
- Logo + mascot scaled down, stacked
- Search bar full-width
- "Search Options" link below
- Usage counter reformats vertically: "13 of 100"
- Grid icon + hamburger menu in top area
- Footer links wrap to multiple lines
- Privacy banner at bottom

### Mobile Search Results
- Kagi logo shrinks to small "k" icon
- Search bar compact with truncated query
- Tabs wrap to single scrollable line: All, Images, Videos, News, Podcasts, Maps
- Share + "More" on separate line below tabs
- Filter pills wrap to 2 rows:
  - Row 1: Lens, Region, Order By
  - Row 2: Time, Options, Advanced
- Quick Answer button inline with stats line
- Result cards full-width, titles truncate with ellipsis
- Smaller typography overall
- Same functionality as desktop

### Mobile Navigation (Control Center)
Same as desktop Control Center (slide-in panel):
- Settings
- Contact Support
- Specials
- Send feedback or report bugs
- Theme toggle: Default / Light / Dark
- Safe Search toggle
- Session Link + Copy button
- Download Kagi Extension + Download button

---

## 12. CONTROL CENTER (Hamburger Menu)

**Trigger:** Click hamburger (three-line) icon, top-right

### Desktop Layout (slide-in from right)
- **Settings** — gear icon
- **Contact Support** — envelope icon
- **Specials** — tag/badge icon
- **Send feedback or report bugs** — paper plane icon
- _(separator)_
- **Theme:** Default | Light | Dark (segmented control, icon + text)
- **Safe Search:** Toggle (ON by default)
- **Session Link:** Description + Copy button + "Do not share this with anyone" warning
- **Download Kagi Extension:** Description + Download button
- **Status:** Green dot + "All Services Operational", Connected to: [region], Network latency: [X]ms
- **Sign Out** — door icon

---

## 13. DESIGN SYSTEM OBSERVATIONS

### Color Palette (Dark Mode)
- Background: Very dark navy/charcoal (~#1a1a2e)
- Surface: Slightly lighter dark (#2a2a3e)
- Text primary: White/light grey
- Text secondary: Medium grey
- Links: Purple/lavender (#b8a9c9)
- Visited links: Slightly different purple
- Accent: Yellow/gold (used in active sidebar items, orange highlights)
- Toggle ON: Purple (#7c6bc4)
- Toggle OFF: Grey
- Quick Answer button: Gold/amber lightning bolt
- Lens active: Green toggle indicator

### Typography
- Clean sans-serif font (system font stack)
- Font size options: Small, Medium, Normal, Large, Larger
- Result titles: Medium weight, purple
- Domain text: Bold weight
- Snippets: Normal weight, grey
- Dates: Small text in rounded badge

### Spacing & Layout
- Results left-aligned (configurable: Left/Center)
- Max content width ~850px on results page
- Comfortable vertical spacing between results
- Grouped/indented results for same-domain clustering
- Filter pills have consistent pill-shape with chevron icons

### Interactive Patterns
- Dropdowns: Floating menu below trigger, light background with dark text
- Modals: Centered overlay with dark backdrop (Advanced Search)
- Slide-in panel: Control Center from right edge
- Toggles: Purple pill-shaped on/off switches
- Keyboard navigation: j/k for results, h/l for site ranking, ? for help

### Unique Kagi UX Patterns
1. **Usage counter** — always visible, creates awareness of search budget
2. **Lenses** — pre-configured search scopes (like saved site: filters)
3. **Domain personalization** — Block/Lower/Normal/Higher/Pin per domain
4. **SlopStop** — community AI content filtering
5. **Quick Answer** — opt-in AI summary (not forced)
6. **Bangs** — shortcut prefixes (!) for searching other sites
7. **Snaps** — shortcut prefixes (@) for site-specific searches
8. **Custom CSS** — user-injectable styling
9. **Session Link** — private window auth without cookies
10. **Web Archive integration** — per-result access to archived versions

---

## Screenshot Reference

All screenshots were captured in-session. Key captures:
- `ss_2209pz9z7` — Homepage (logged-in, dark mode)
- `ss_56293rw4z` — Search results (SGLT2 query)
- `ss_1713tkqyv` — Result hover state
- `ss_6263nv92d` — Three-dot menu
- `ss_78008bwwt` — Quick Answer (top)
- `ss_12723oypq` — Images tab
- `ss_7079qpzvq` — Videos tab
- `ss_2530edzl5` — News tab
- `ss_8003q82h6` — Podcasts tab
- `ss_8591samb1` — Maps tab
- `ss_53366lluo` — Lens dropdown
- `ss_5459oulof` — Academic lens results
- `ss_2330ns2pm` — Forums lens results
- `ss_4192j3ebw` — News 360 lens results
- `ss_1955gxe9k` — Lens management page
- `ss_32504jom4` — Lens creation form
- `ss_22463p1gd` — Order By dropdown
- `ss_741635y32` — Time dropdown
- `ss_5969efymq` — Options dropdown
- `ss_01162lne4` — Region dropdown
- `ss_4084hjope` — Advanced Search modal (top)
- `ss_9558y4qd9` — Keyboard shortcuts overlay
- `ss_3958flw9x` — Search settings
- `ss_5007swuil` — Appearance settings
- `ss_58564tdxg` — Search Widgets settings
- `ss_3195mxmt7` — AI settings
- `ss_1485n1ozn` — Personalized Results / Domain rankings
- `ss_6505s2zx8` — Assistant settings
- `ss_05275euzb` — Mobile homepage
- `ss_74344qtj1` — Mobile search results
- `ss_1038pfgl4` — Mobile Control Center
- `ss_2114eg9u0` — Desktop Control Center
