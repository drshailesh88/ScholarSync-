Read program.md and annealing-log.jsonl. Run: node quality-score.mjs

This is the ACCESSIBILITY + POLISH session (Phase 5).

=== AXE-CORE AUDIT ===
Create: e2e/accessibility/full-audit.spec.ts

Install if needed: npm install -D @axe-core/playwright

Run axe-core on ALL pages:
/, /dashboard, /projects, /library, /research, /deep-research,
/studio, /notebook, /latex, /compliance, /analysis, /feeds,
/slides, /presentation, /illustrate, /poster, /systematic-review,
/settings, /onboarding, /sign-in, /sign-up

For each page:
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')).toHaveLength(0);

Fix all critical and serious violations.

=== KEYBOARD NAVIGATION ===
Create: e2e/accessibility/keyboard.spec.ts
  - Tab reaches all interactive elements
  - Focus indicator visible
  - No keyboard traps
  - Escape closes modals
  - Enter/Space activates buttons

=== CODE QUALITY SWEEP ===
  - npx tsc --noEmit (fix remaining errors)
  - Remove console.log from production code
  - Check bundle sizes with next build
  - Remove unused dependencies

Branch: hardening/session-N
