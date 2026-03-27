# Zone 1: Typography & Spacing — Gap Analysis

> Compared against: Bear (dark), Notion (light), Google Docs (light)
> Date: 2026-03-27

## Summary

The editor already has decent typography foundations (serif font, 17px base, 1.78 line-height). But several gaps remain when compared side-by-side with Bear, Notion, and Google Docs.

## Gaps Found

### 1. Heading Weight Hierarchy (Priority: HIGH)
- **Current:** H1–H4 all use `font-weight: 700`
- **Reference:** Bear and Google Docs use bolder H1 and progressively lighter sub-headings
- **Fix:** H1 stays 700, H2–H4 drop to 600 for clear visual hierarchy

### 2. List Item Spacing Too Tight (Priority: HIGH)
- **Current:** `li { margin-bottom: 0.25rem }` — items feel cramped
- **Reference:** Bear has generous spacing between list items (~0.4em)
- **Fix:** Increase to `0.4em` for li, `0.3em` for nested `li p`

### 3. Blockquote Border Color (Priority: MEDIUM)
- **Current:** Uses `var(--brand)` (purple) — too loud for academic content
- **Reference:** Bear uses a subtle gray left border; Notion uses a light gray
- **Fix:** Use muted ink color instead of brand purple

### 4. First Heading Top Margin (Priority: MEDIUM)
- **Current:** H1 has `margin-top: 2.5rem` even as the first element
- **Reference:** Bear/Notion have no excessive gap above the first heading
- **Fix:** `:first-child` heading should have `margin-top: 0`

### 5. Table Cell Padding (Priority: LOW)
- **Current:** `th: 8px 12px`, `td: 6px 12px` — slightly tight
- **Reference:** Google Docs and Notion have more generous cell padding
- **Fix:** Increase to `10px 14px` for th, `8px 14px` for td

### 6. Paragraph Margin (Priority: LOW)
- **Current:** `margin-bottom: 1rem` — adequate but Bear has slightly more
- **Fix:** Increase to `1.15em` for slightly more breathing room

### 7. Heading Sizes Fine-Tuning (Priority: LOW)
- **Current:** H1=36px, H2=28px, H3=22px, H4=18px
- **Target (sprint):** H1≈2em(34px), H2≈1.5em(25.5px), H3≈1.25em(21px), H4≈1.1em(18.7px)
- Shift to `em` units for better scalability and slightly adjust proportions

## Dimensions Not Needing Changes
- Line-height (1.78) — already matches Bear
- Letter-spacing (0.005em) — comfortable
- Font family (Source Serif 4) — good editorial serif
- Font size (17px) — comfortable reading size
