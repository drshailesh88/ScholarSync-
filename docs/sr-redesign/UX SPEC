# SR Module: Target UX Specification

> This document defines the target user experience for the Systematic Review module. It is the spec that Claude Code builds against.

-----

## Design Philosophy

### Progressive Disclosure

Users should see only what they need at each phase. Complexity is revealed as they progress, not dumped upfront.

### Cognitive Mode Matching

Each phase of a systematic review demands a different mental mode. The interface should match:

|Phase     |Mode               |Speed   |Interface Need            |
|----------|-------------------|--------|--------------------------|
|Protocol  |Planning           |Slow    |Structured forms, guidance|
|Search    |Technical          |Medium  |Builder tools, validation |
|Screening |Pattern recognition|**Fast**|Minimal UI, keyboard-first|
|Full-text |Deep reading       |Slow    |Immersive, PDF + checklist|
|Assessment|Judgment           |Medium  |Evidence + questions      |
|Extraction|Data entry         |Medium  |Clean grid, no friction   |
|Analysis  |Statistical        |Slow    |Visualizations, controls  |
|Reporting |Writing            |Slow    |Auto-filled, just refine  |

### One Dominant Question

Like Uber’s “Where to?”, each screen should have one obvious action.

-----

## Navigation Architecture

### Option A: Phase-Grouped Tabs (Safer)

Keep single-page architecture but visually group tabs into phases:

```
┌─────────────────────────────────────────────────────────────────┐
│  Setup        Search        Screen        Assess        Report  │
│  ──────       ──────        ───●──        ──────        ──────  │
│  Protocol     Strategy      Screening     RoB           PRISMA  │
│  PROSPERO     Import        Full-text     Extraction    GRADE   │
│               Snowball                    Analysis      Export  │
└─────────────────────────────────────────────────────────────────┘
```

- Phase names in top row (clickable to expand)
- Active phase has dot indicator
- Tabs within phase shown below when expanded
- Completed phases show checkmark

### Option B: Room-Based Pages (Bolder)

Separate routes for cognitive modes:

```
/systematic-review/[projectId]/protocol
/systematic-review/[projectId]/search
/systematic-review/[projectId]/screening
/systematic-review/[projectId]/assessment
/systematic-review/[projectId]/analysis
/systematic-review/[projectId]/report
```

Each “room” has its own layout optimized for that cognitive mode.

**Decision needed**: Which option to implement?

-----

## Screen Specifications

### 1. Hub Page (`/systematic-review`)

**Purpose**: Project dashboard. Show all SR projects, quick stats.

**Current state**: Basic list
**Target state**: Card grid with status indicators

```
┌──────────────────────────────────────────────────────────────┐
│  Systematic Reviews                           [+ New Review] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │ SGLT2 in Heart      │  │ Beta-blockers in    │           │
│  │ Failure             │  │ Sepsis              │           │
│  │                     │  │                     │           │
│  │ ●●●○○○○ Screening   │  │ ●●●●●●○ Analysis    │           │
│  │ 234 / 1,616 papers  │  │ 12 studies included │           │
│  │                     │  │                     │           │
│  │ Updated 2 hours ago │  │ Updated yesterday   │           │
│  └─────────────────────┘  └─────────────────────┘           │
│                                                              │
│  ┌─────────────────────┐                                    │
│  │ + Start New Review  │                                    │
│  │                     │                                    │
│  │ Choose review type  │                                    │
│  │ and get started     │                                    │
│  └─────────────────────┘                                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] Projects shown as cards with visual progress
- [ ] Phase indicator shows current stage
- [ ] Paper counts visible at a glance
- [ ] Empty state guides to create first review
- [ ] Card click navigates to project workflow

-----

### 2. Protocol Screen

**Purpose**: Define research question, register protocol.

**Layout**: Centered form, generous spacing, serif headings.

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Reviews                                          │
│                                                              │
│           Define Your Research Question                      │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Research Question                                      │ │
│  │  ──────────────────                                     │ │
│  │  What is the effectiveness of SGLT2 inhibitors in      │ │
│  │  reducing cardiovascular mortality in patients with    │ │
│  │  heart failure?                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐                         │
│  │ Population   │ │ Intervention │                         │
│  │ ──────────── │ │ ──────────── │                         │
│  │ Adults with  │ │ SGLT2        │                         │
│  │ heart failure│ │ inhibitors   │                         │
│  └──────────────┘ └──────────────┘                         │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐                         │
│  │ Comparison   │ │ Outcome      │                         │
│  │ ──────────── │ │ ──────────── │                         │
│  │ Placebo or   │ │ CV mortality │                         │
│  │ usual care   │ │              │                         │
│  └──────────────┘ └──────────────┘                         │
│                                                              │
│  Review Type: [Intervention - RCT ▼]                        │
│                                                              │
│                                    [Save & Continue →]       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] PICO fields auto-expand as user types
- [ ] Review type selector shows appropriate options
- [ ] Save validates required fields
- [ ] Continue navigates to Search phase
- [ ] Progress saved to database

-----

### 3. Search Strategy Screen

**Purpose**: Build database search strings.

**Layout**: Builder panel left, preview right.

```
┌──────────────────────────────────────────────────────────────┐
│  Search Strategy                              [Test Search]  │
├────────────────────────────┬─────────────────────────────────┤
│                            │                                 │
│  Population Block          │  Preview                        │
│  ─────────────────         │  ───────                        │
│  MeSH: Heart Failure [+]   │  (("Heart Failure"[MeSH] OR    │
│  Free: heart failure,      │   "heart failure"[tiab] OR     │
│         cardiac failure    │   "cardiac failure"[tiab])     │
│                            │  AND                            │
│  Intervention Block        │  ("SGLT2 inhibitor*"[tiab] OR  │
│  ──────────────────        │   "sodium-glucose"[tiab] OR    │
│  MeSH: SGLT2 Inhibitors[+] │   "empagliflozin"[tiab] OR     │
│  Free: dapagliflozin,      │   "dapagliflozin"[tiab]))      │
│         empagliflozin      │                                 │
│                            │  Estimated results: ~1,847      │
│                            │                                 │
│  [+ Add Block]             │  [Copy to Clipboard]            │
│                            │                                 │
├────────────────────────────┴─────────────────────────────────┤
│                                                              │
│  Buddy: "Consider adding 'canagliflozin' and 'ertugliflozin'│
│  to capture all approved SGLT2 inhibitors."            [Add] │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] MeSH term autocomplete works
- [ ] Boolean logic preview updates in real-time
- [ ] Estimated result count shown
- [ ] Copy button copies formatted string
- [ ] Buddy suggestions are contextual and helpful
- [ ] Save strategy to database

-----

### 4. Screening Screen (Speed Mode)

**Purpose**: Fast triage of papers. This is where users spend the most time.

**Layout**: Single paper, centered, keyboard-first.

```
┌──────────────────────────────────────────────────────────────┐
│  Screening                                    234 / 1,616    │
│  ═══════════════════════════════════════════════════════════ │
│                                                              │
│                                                              │
│         Effect of Empagliflozin on Cardiovascular            │
│         Outcomes in Patients With Heart Failure              │
│                                                              │
│         Packer M, et al. • NEJM 2020                         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │  Background: SGLT2 inhibitors reduce the risk of      │ │
│  │  hospitalization for heart failure in patients with   │ │
│  │  type 2 diabetes. Whether this benefit extends to     │ │
│  │  patients with heart failure, regardless of diabetes  │ │
│  │  status, is unknown.                                  │ │
│  │                                                        │ │
│  │  Methods: We conducted a randomized, double-blind     │ │
│  │  trial comparing empagliflozin (10 mg daily) with     │ │
│  │  placebo in 3730 patients with class II-IV heart      │ │
│  │  failure and an ejection fraction of 40% or less...   │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │ Exclude │    │  Maybe  │    │ Include │              │
│     │   [E]   │    │   [M]   │    │   [I]   │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                              │
│  ← Previous [←]                           Next [→] →        │
│                                                              │
│  Keyboard: I = Include, E = Exclude, M = Maybe, ? = Help    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] Single paper displayed at a time
- [ ] Keyboard shortcuts work: I, E, M, ←, →
- [ ] Progress bar updates after each decision
- [ ] Auto-advance to next paper after decision
- [ ] No page reload between papers
- [ ] Can navigate back to change decision
- [ ] Decision saved immediately to database
- [ ] “?” shows keyboard shortcut overlay

**Speed Target**: User can screen 10 papers in under 60 seconds using only keyboard.

-----

### 5. Full-Text Review Screen

**Purpose**: Deep reading with PDF alongside checklist.

**Layout**: Split view - PDF left, criteria right.

```
┌──────────────────────────────────────────────────────────────┐
│  Full-Text Review                              12 / 89       │
├─────────────────────────────┬────────────────────────────────┤
│                             │                                │
│  [PDF Viewer]               │  Eligibility Checklist         │
│                             │  ────────────────────          │
│  ┌───────────────────────┐  │                                │
│  │                       │  │  □ RCT or quasi-RCT            │
│  │  [Actual PDF content] │  │  □ Adults with HF              │
│  │                       │  │  □ SGLT2 intervention          │
│  │                       │  │  □ Reports CV mortality        │
│  │                       │  │  □ Full text available         │
│  │                       │  │                                │
│  │                       │  │  Exclusion Reasons             │
│  │                       │  │  ─────────────────             │
│  │                       │  │  ○ Wrong population            │
│  │                       │  │  ○ Wrong intervention          │
│  │                       │  │  ○ Wrong outcome               │
│  │                       │  │  ○ Conference abstract only    │
│  │                       │  │                                │
│  └───────────────────────┘  │  Notes:                        │
│                             │  ┌──────────────────────────┐  │
│  Page 3 of 12  [◀][▶]       │  │                          │  │
│                             │  └──────────────────────────┘  │
├─────────────────────────────┴────────────────────────────────┤
│     [Exclude with Reason]              [Include & Continue]  │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] PDF loads and is scrollable
- [ ] Criteria checklist updates on click
- [ ] Exclusion reason is required if excluding
- [ ] Notes field saves automatically
- [ ] Split is resizable
- [ ] Include/Exclude updates database and advances

-----

### 6. Risk of Bias Screen

**Purpose**: Assess bias across domains.

**Layout**: Domains as accordion, traffic light summary.

```
┌──────────────────────────────────────────────────────────────┐
│  Risk of Bias (RoB 2.0)                        5 / 12        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  EMPEROR-Reduced Trial                                       │
│  Packer M, et al. NEJM 2020                                  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Domain 1: Randomization                           🟢   │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │                                                        │ │
│  │  1.1 Was the allocation sequence random?              │ │
│  │      ● Yes  ○ Probably yes  ○ Probably no  ○ No       │ │
│  │                                                        │ │
│  │  1.2 Was the allocation sequence concealed?           │ │
│  │      ● Yes  ○ Probably yes  ○ Probably no  ○ No       │ │
│  │                                                        │ │
│  │  Supporting text: [Computer-generated sequence...]     │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ▸ Domain 2: Deviations from intervention              🟢   │
│  ▸ Domain 3: Missing outcome data                      🟡   │
│  ▸ Domain 4: Outcome measurement                       🟢   │
│  ▸ Domain 5: Selection of reported result              🟢   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Overall: 🟡 Some concerns                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│                              [Save & Next Study →]          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] Domains expandable as accordion
- [ ] Traffic light updates based on responses
- [ ] Overall judgment calculated automatically
- [ ] Supporting text saved per domain
- [ ] Navigation between studies
- [ ] Appropriate tool shown for review type (RoB2, ROBINS-I, QUADAS-2, etc.)

-----

### 7. Meta-Analysis Screen

**Purpose**: Statistical synthesis with visualizations.

**Layout**: Controls top, visualization center, stats below.

```
┌──────────────────────────────────────────────────────────────┐
│  Meta-Analysis                                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Outcome: CV Mortality    Effect: Risk Ratio    Model: RE   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │                    FOREST PLOT                         │ │
│  │                                                        │ │
│  │  EMPEROR-Reduced  ──●──        0.92 [0.75, 1.12]      │ │
│  │  DAPA-HF          ───●───      0.83 [0.71, 0.97]      │ │
│  │  EMPEROR-Preserved ──●──       0.91 [0.77, 1.08]      │ │
│  │  DELIVER          ───●───      0.88 [0.76, 1.02]      │ │
│  │                                                        │ │
│  │  Overall          ◆           0.88 [0.81, 0.96]       │ │
│  │                   |                                    │ │
│  │              0.5  1.0  1.5                            │ │
│  │              Favors SGLT2i  Favors Control            │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Heterogeneity: I² = 12%  τ² = 0.002  p = 0.32             │
│                                                              │
│  [Export PNG]  [Export Data]  [Sensitivity Analysis]        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] Forest plot renders correctly
- [ ] Effect measure selector works
- [ ] Model selection (fixed/random)
- [ ] Heterogeneity stats displayed
- [ ] Export to PNG works
- [ ] Subgroup analysis available
- [ ] Funnel plot accessible

-----

### 8. PRISMA Flow Screen

**Purpose**: Auto-generated flow diagram.

**Layout**: Diagram centered, counts auto-populated.

```
┌──────────────────────────────────────────────────────────────┐
│  PRISMA 2020 Flow Diagram                      [Export SVG]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌─────────────────┐                       │
│                    │ Records from    │                       │
│                    │ databases       │                       │
│                    │ (n = 2,341)     │                       │
│                    └────────┬────────┘                       │
│                             │                                │
│                    ┌────────▼────────┐                       │
│                    │ After duplicate │                       │
│                    │ removal         │                       │
│                    │ (n = 1,616)     │                       │
│                    └────────┬────────┘                       │
│                             │                                │
│         ┌───────────────────┼───────────────────┐           │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │ Excluded at  │   │ Full-text    │   │ Included in  │    │
│  │ screening    │   │ assessed     │   │ synthesis    │    │
│  │ (n = 1,527)  │   │ (n = 89)     │   │ (n = 12)     │    │
│  └──────────────┘   └──────────────┘   └──────────────┘    │
│                                                              │
│  All counts auto-populated from screening decisions          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] Counts auto-populate from database
- [ ] Diagram updates in real-time
- [ ] Export to SVG/PNG works
- [ ] PRISMA 2020 compliant layout
- [ ] Clickable boxes show paper lists

-----

## Empty States

Every screen needs a warm, helpful empty state:

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                         📄                                 │
│                                                            │
│              No papers imported yet                        │
│                                                            │
│   Import your search results to start screening.          │
│   We support RIS, BibTeX, CSV, and EndNote formats.       │
│                                                            │
│                  [Import Papers]                           │
│                                                            │
│   Tip: Export results from PubMed, EMBASE, or Cochrane   │
│   Library and upload them here.                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Pattern**:

- Icon (relevant, not generic)
- Serif title (what’s missing)
- Description (what to do)
- Primary CTA button
- Tip (extra guidance)

-----

## Transitions & Animations

All transitions use the same timing as Studio:

```css
/* Standard transition */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Spring for interactive elements */
transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

-----

## Buddy Integration Points

Buddy appears contextually, not as a global chatbot:

|Screen       |Buddy Manifestation                        |
|-------------|-------------------------------------------|
|Search       |MeSH suggestions, term expansion           |
|Screening    |3-agent consensus, highlighting key phrases|
|Full-text    |Evidence location tags                     |
|RoB          |Domain-specific guidance                   |
|Meta-analysis|Heterogeneity interpretation               |
|GRADE        |Reasoning assistant                        |

Buddy should feel like a knowledgeable colleague, not a chatbot. No “How can I help you?” — just contextual suggestions.

-----

## Keyboard Shortcuts (Global)

|Key            |Action                        |
|---------------|------------------------------|
|`?`            |Show keyboard shortcut overlay|
|`⌘K` / `Ctrl+K`|Command palette               |
|`⌘S` / `Ctrl+S`|Save current work             |
|`Escape`       |Close modal/panel             |

### Screening-Specific

|Key    |Action         |
|-------|---------------|
|`I`    |Include paper  |
|`E`    |Exclude paper  |
|`M`    |Mark as Maybe  |
|`←`    |Previous paper |
|`→`    |Next paper     |
|`Space`|Scroll abstract|

-----

## Responsive Behavior

- **Desktop (1200px+)**: Full layout as designed
- **Tablet (768-1199px)**: Collapse split views to stacked
- **Mobile (< 768px)**: Single column, bottom nav

Screening on mobile should still support swipe gestures: swipe left = exclude, swipe right = include.

-----

*This spec will evolve as we build. Update after each sprint.*