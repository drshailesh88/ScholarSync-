# The Anti-Frankenstein Doctrine

> How ScholarSync shows ~15 modules as **one app**, not ten apps under one roof.
> Consolidated from the April 2026 UX rethink. Pre-April design is discarded.

---

## The problem (what "Frankenstein" means here)

Old ScholarSync exposed **~18 sidebar destinations** as a flat tool-list:
Dashboard · Studio · Editor · Literature Search · Notebook · Deep Research · Library ·
Slides · Presentation · Poster · LaTeX · Systematic Review · Illustrate · Journal Feed ·
Analysis · Compliance · Projects · Settings.

It read as ten separate apps because of five structural tells:
- **Tool-list navigation** — top level was a menu of *verbs/tools*, not *places*.
- **Duplicated families** — Studio vs Editor; Slides vs Presentation (+ Slides' own 3 modes); three discovery surfaces (Literature Search vs Deep Research vs Notebook).
- **No shared object spine** — each screen invented its own nouns; handoffs glued by `sessionStorage`/paste, not a shared model.
- **Per-module dialects** — different keyboard shortcuts, layouts, and chrome per screen.
- **Cosmetic-only cohesion** — at best a shared palette; no structural unity.

> The user's words: *"it felt like 10 different apps living under one app."* That is the disease this doctrine cures.

---

## The cure — six layers

### 1. One identity sentence (the spine)
The whole app is **one journey, not a toolbox**: **find → keep → think → write**
(*Discover → Curate → Synthesize → Publish*). Every module is a **phase** of that journey, never a sibling competing in a menu.
> *"That turns the app from a pile of tools into a research operating system."*

### 2. Three felt homes, not N tools
The product visibly revolves around **three homes**:

| Home | Verb | Feel |
|------|------|------|
| **Library** | keep | the bookshelf — calm, managerial, cool/neutral, lean back |
| **Reading Room** | think | the desk under a lamp — focused, warm, lean forward |
| **Studio** | write | the writing desk — clean prose surface |

- **Intake:** Search + Feeds (acquisition front door).
- **Projects:** quiet **background glue**, not a destination you "visit."
- **Everything else folds in** as a mode, output, or overlay — never a top-level tool:
  - Deep Research / Literature Search → **modes inside Reading Room's search**
  - LaTeX · Poster · Slides · Presentation · Illustrate → **output formats inside Studio**
  - Compliance / Integrity Check → a **"Check" step inside Studio**
  - Systematic Review → a **medicine-only specialist overlay** (must not shape global architecture)

> Governing doctrine: *"Everything either feeds the core work graph, operates on its outputs, or specializes it. **Nothing gets to become its own disconnected universe.**"*

### 3. Hard ownership boundaries (the anti-rot rule)
> *"This one rule will prevent half your future mess."*

- **Explore** owns acquisition — **not** durable source state.
- **Library** owns custody — **not** conversational state.
- **Reading Room** owns synthesis — **not** canonical source truth.
- **Studio** owns expression — receives typed *Materials*, not raw chat.

Overlap between modules is what *creates* the Frankenstein. Each capability lives in exactly one home.

### 4. One shared object model (the connective tissue)
The same object flows through every home, **referenced by shared ID, never cloned**:

```
Source → Project → ReadingSet → Room → Material → Draft
```

A source saved in Library *is the same object* read in Reading Room and cited in Studio.
> *"Objects keep the product coherent. Modes keep it legible. Prompts keep it intelligent."*

This is the mechanism that makes three separate rooms feel like one building.

### 5. One frame, one grammar (the felt cohesion)
- **Stable shell that never moves** — VS Code model: a fixed far-left rail + a contextual second panel. The frame is immutable; only the center content swaps.
- **Two templates only** — a collection view and a focused view. No third template. "Two layouts teach the whole product in 30 seconds."
- **One interaction grammar everywhere** — one accent color = one primary verb; hover-reveals secondary actions; right-click is the power menu; one global `⌘K`; one shared `200ms` transition; one empty-state template.

> *"Repetition is calming. Novelty per screen is anxiety-inducing. Calm means consistent, not minimal."*

### 6. One design DNA (premiumness)
Propagate the **Editor-as-hero** aesthetic to every surface:
- **Type:** Source Serif 4 (content) + DM Sans (UI) + JetBrains Mono (code)
- **Canvas:** warm cream `#FAFAF8` / charcoal ink; **purple `#6D28D9` for global CTAs only**; each home gets a local accent (Library = muted blue `#4A7AB5`)
- **Spacing:** generous, 720px reading column, spring-curve motion
- **Standard:** *"feel like a word processor · look as lean as Notion · feel as premium as Bear."*
- **Emotional target:** *"I'm in the right place… I am at home here. I'd like to come back."*

**Testable cohesion gate:** every screen must pass *"feels like Studio (same DNA)"* — verified by checklist + LLM-as-judge.

---

## The brand frame
> **ScholarSync is Adobe Creative Cloud for intellectuals. Multiple modules, each could be a standalone app, but they all feel like ScholarSync. No Frankenstein.**

---

## The cohesion checklist (use on every screen)
- [ ] Reached from a **place** (home), not a tool name in a flat menu?
- [ ] Lives inside one of the 3 homes (or is intake/glue) — not its own top-level universe?
- [ ] Owns only its boundary's state (no overlap with another home)?
- [ ] Operates on the **shared object model** by ID (no cloned payloads)?
- [ ] Uses the **stable shell**, one of the **two templates**, and the shared grammar (accent = one verb, hover-reveal, right-click, ⌘K, 200ms)?
- [ ] Passes the **DNA gate** — "feels like Studio"?

If any box is unchecked, that screen is re-growing a Frankenstein limb.
