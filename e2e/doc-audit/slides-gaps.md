# Slides — Feature Doc Gaps

**Original doc:** `SLIDES_FEATURES_TESTING.md`
**Original checkbox count:** 383
**After Codex pass 1:** 536
**After Claude Code pass 2:** 698
**New checks added in pass 2:** 162

## Pass 2 Coverage Areas

### New sections added (162 checks):
- Slide Sorter View (8) — entirely new feature not in original doc
- Presenter Mode additional keyboard shortcuts (10)
- Presenter Mode audience window & fullscreen (8)
- Presenter Mode empty & edge states (8)
- Presenter Mode notes font size (2)
- Slide Store defaults & internals (17)
- Slide Store duplicate/delete/add behavior (11)
- Slide Store block selection state (3)
- Keyboard shortcuts Tab cycling guard (3)
- Handout Export Dialog defaults & details (8)
- PPTX Export details (3)
- Find & Replace additional details (9)
- Accessibility Panel additional details (9)
- Regenerate Dialog additional details (5)
- API route validation schemas (15)
- Other: toolbar avatars, mode selector, wizard details, canvas editor, etc (23)
- Behavior corrections (11)
- Components referenced but not rendered (2)

## Features in doc that DON'T EXIST in the app
- Deck cards show generic Presentation icon, not real thumbnails
- PPTX import is inline panel, not modal dialog
- Background generation only runs with non-empty description
- Theme key not persisted in createDeck
- Invalid deckId shows inline error, not redirect
- Empty decks show mode-selection screen first
- Filmstrip is w-48, not w-64
- Share button only flips store state, no panel rendered
- PDF export uses configurable handout dialog
