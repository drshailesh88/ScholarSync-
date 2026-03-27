# SR Redesign: Project Context

> This document captures the vision, constraints, and philosophy for redesigning the Systematic Review module. It is the source of truth for any AI agent working on this project.

-----

## The Founder’s Vision

### Who Is The Target User?

Academics who **should** know how to do systematic reviews — but don’t. Intelligent, capable researchers who need the process **systematized**, not the work done for them.

> “I am an academic myself. I am at my position in my career where I am supposed to write systematic reviews. However, despite having published many articles and despite having worked with many senior authors - I myself don’t know how to do systematic reviews, how to do meta-analysis, what are all the types of reviews. Meaning most people who want to do these need hand holding.”

### What We Are NOT Building

- A ghostwriter that fills in templates
- A rigid framework that constrains users (no pre-populated IMRAD structures)
- A “click next and get output” wizard
- A visual clone of Covidence, Rayyan, or any existing tool

### What We ARE Building

A system that makes a genuinely complex journey **legible** — where users:

- Know what they’re doing
- Know what the next best step is
- Know what the probable outcome is

Without being constrained or spoon-fed.

-----

## The Emotional Goal

**Users return for the feel, not the function.**

> “Users do not come back because they know that this app can get the job done. Users come back to the app when they feel that this is a good place to be in. I’m in the right place, and this will help me get to the finish line easily, and I am at home here. I like being here. I would like to come back here again, revisit here, and finish my incomplete work.”

There are many apps that can do systematic reviews. AI can build one overnight. The differentiator is **premiumness** — the feeling that things have been done tastefully, not just functionally.

-----

## Brand Constraints (Hard Rules)

ScholarSync is **Adobe Creative Cloud for intellectuals**. Multiple modules, each could be a standalone app, but they all feel like ScholarSync. No Frankenstein.

### Design DNA (From Studio/Editor Module)

The editor module is the “hero section” — it sets the standard:

```
Feel like a word processor — frictionless typing, familiar font hierarchy, zero learning curve
Look as lean as Notion — progressive disclosure, nothing glaring, everything findable  
Feel as premium as Bear — generous spacing, tactile interactions, "I want to come back" feeling
```

### Typography

```css
--font-sans-family: "DM Sans"           /* UI elements */
--font-serif-family: "Source Serif 4"   /* Content, titles */
```

### Colors (From Landing Page)

```css
--primary-purple: #6D28D9;
--dark-purple: #1E1145;
--hover-purple: #5B21B6;
--text-main: #241013;
--bg-main: rgb(242, 240, 235);      /* Warm cream canvas */
--bg-card: rgb(233, 229, 221);
--bg-ai: #F5F4F0;
--bg-toolbar: #FAFAF8;
--green: #0a6847;
--blue: #4a7ab5;
--gold: #d4b060;
--pink: #c06090;
```

### Sidebar

Dark charcoal (`#1E1D1C`), white icons, `.ss-sidebar` class. Already defined in `globals.css`.

### Spacing

Generous. Studio-level. `p-6` minimum on panels. `max-width: 720px` for content areas.

### If We Need More Colors

Use the palette from the landing page. No new colors without checking brand consistency.

-----

## UX Principles (From Reference Apps)

The best apps compress hard systems into obvious next steps:

|App            |Principle                                           |Applied to SR                                                                       |
|---------------|----------------------------------------------------|------------------------------------------------------------------------------------|
|**Uber**       |One dominant question, reveal rest in sequence      |“What type of review?” → “What’s your research question?” → “Where will you search?”|
|**Google Maps**|System thinks hard, interface shows concrete options|User sees: “You have 1,616 papers. 932 are duplicates. 684 ready for screening.”    |
|**Airbnb**     |Stepwise path, surface info when it matters         |Don’t explain GRADE until they reach that phase                                     |
|**Wise**       |Make tradeoffs legible before commitment            |“NMA requires direct comparison data. You have 12 studies with this. Proceed?”      |
|**Duolingo**   |Bite-sized, momentum not effort                     |Screening one paper at a time, progress bar, “147 done, 537 to go”                  |
|**Slack**      |Few stable primitives that scale                    |Papers, decisions, extractions, analyses — same patterns everywhere                 |
|**Notion**     |Scaffolding makes power usable                      |Templates for PICO, pre-built search strings, but editable                          |

### Core UX Moves

1. **Hide secondary complexity until it matters**
1. **Keep key choices visible** so users recognize rather than remember
1. **Prevent expensive errors** with defaults, constraints, and clear recovery
1. **Progressive disclosure** — different screens for different cognitive modes

-----

## Architecture Philosophy

### Cognitive Modes Require Different Environments

A systematic review involves distinct cognitive phases:

|Phase        |Cognitive Demand    |Speed        |What the Brain Needs             |
|-------------|--------------------|-------------|---------------------------------|
|Protocol     |Deliberate planning |Slow         |Focus, structure, no distractions|
|Search       |Technical precision |Medium       |Builder tools, validation        |
|Screening    |Pattern recognition |**Very fast**|Minimal decisions, keyboard flow |
|Full-text    |Deep reading        |Slow         |Immersion, the whole document    |
|RoB          |Critical judgment   |Medium       |Evidence + questions side-by-side|
|Extraction   |Precise data entry  |Medium       |Grid, fields, no friction        |
|Meta-analysis|Statistical thinking|Slow         |Visualizations, controls         |
|GRADE        |Holistic judgment   |Slow         |Body of evidence view            |
|Reporting    |Writing             |Slow         |Clean page, PRISMA auto-filled   |

**Implication**: Some phases may need their own screens/routes, not just tabs.

### Page Naming

Simple, clear names. No “The Forge”, “The Scriptorium” — these create friction for first-time users.

Good: Protocol, Search, Screening, Assessment, Analysis, Report
Bad: The Charter, The First Pass, The Laboratory

### Buddy (AI Assistant)

Buddy was removed from the editor but makes sense in SR because:

- Screening 1,600 papers manually is brutal — AI consensus helps
- Each room has a specific job for AI (MeSH suggestions, evidence highlighting, GRADE reasoning)
- It’s not a chatbot — it’s contextual intelligence that manifests as pills, sidebars, evidence tags
- Audit trail: “Buddy suggested X, human overrode to Y” is valuable for PRISMA compliance

If we keep Buddy, it should be contextual per screen, not a global chatbot.

-----

## Technical Constraints

### Don’t Break What Works

The backend is solid. 40+ API routes. All panels function. Tests pass.

**Zero tolerance for regressions.**

### Existing Infrastructure

- **Framework**: Next.js, TypeScript
- **State**: Zustand stores
- **Real-time**: Liveblocks for collaboration
- **Styling**: Tailwind + custom CSS classes in `globals.css`
- **Testing**: Playwright for E2E

### Current SR Module Location

```
/src/app/(app)/systematic-review/
├── page.tsx                    # Hub/dashboard
└── [projectId]/
    └── page.tsx                # Workflow page (single page, tab-based)

/src/components/systematic-review/   # 40+ panel components
/src/stores/systematic-review-store.ts
/src/app/api/systematic-review/     # 40+ API routes
```

-----

## Development Methodology

### GSD Framework

Track what needs doing. Each task has clear scope.

### Spec-Driven Development

Per spec, define acceptance criteria before building.

### Ralph Loop (Geoffrey Huntley)

```
PLANNING PROMPT → Gap analysis, TODO list (no implementation)
BUILDING PROMPT → Pick task, implement, run tests, commit if pass, iterate if fail
```

Progress lives in files + git, not in context window.

### Self-Healing QA

Playwright tests for objective measurement. Keep improving until high score.

### LLM-as-Judge for Subjective Criteria

For UX quality, aesthetics, brand consistency — use LLM review with binary pass/fail.

-----

## Success Criteria

### Functional

- [ ] All existing features still work (Playwright tests pass)
- [ ] User can complete full SR workflow without confusion
- [ ] Progress is always visible
- [ ] Keyboard shortcuts work in screening

### Experiential

- [ ] Feels like ScholarSync (same DNA as Studio)
- [ ] Feels premium, not enterprise
- [ ] User knows what to do next at every step
- [ ] User wants to return

-----

## What This Document Is For

Any AI agent (Claude Code, Codex, etc.) working on this project should:

1. Read this document first
1. Understand the constraints before writing code
1. Check changes against brand principles
1. Test against documented architecture
1. Never sacrifice user experience for faster implementation

-----

*Last updated: March 27, 2026*
*Conversation context: Claude.ai session with founder*