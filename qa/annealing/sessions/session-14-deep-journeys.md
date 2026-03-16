Read qa/annealing/HANDOFF.md for full context.
git checkout hardening/session-1 && git pull origin hardening/session-1

DO NOT modify quality-score.mjs or any scorer files.
DO NOT modify qa/module-assertions/ files or qa/queue.jsonl.
DO NOT re-run the E2E spec pipeline. That is done.

YOUR ONLY JOB: Write deep, realistic Playwright E2E tests that simulate a real user
doing real work in ScholarSync. Not just "page loads" — actually interact with every
button, input, panel, dialog, and workflow.

Read docs/USER_JOURNEY_DOCUMENTATION.md COMPLETELY. It documents every click, every
input field, every keyboard shortcut, every dialog, every export flow. Use it as
your source of truth for what UI elements exist and what they should do.

IMPORTANT CONTEXT:
- Dev server runs on port 3001 (not 3000)
- Auth bypass: set cookie __playwright=true in test beforeEach (dev mode only)
- No real database — pages will show empty states, that's expected
- No real API keys — AI features won't produce real results, that's expected
- BUT: all UI elements should render, all buttons should be clickable, all forms
  should accept input, all dialogs should open/close, all navigation should work
- Use @playwright/test (NOT vitest)
- Existing shallow tests are in e2e/journeys/ — you are REPLACING them with deep versions

Create directory: e2e/journeys/deep/

WHAT "DEEP" MEANS:
- Click every button that exists on the page
- Fill every input field with realistic data
- Open every dialog and verify its contents
- Test keyboard shortcuts (Cmd+Shift+C for citations, etc.)
- Test empty states (what does the user see with no data?)
- Test error states (what happens if you submit an empty form?)
- Test navigation between modules (sidebar clicks, breadcrumbs, back button)
- Test that panels open/close (sidebars, right panels, modals)
- Verify specific text content matches what USER_JOURNEY_DOCUMENTATION.md describes

=== DEEP JOURNEY 1: Studio Writing Experience ===
File: e2e/journeys/deep/studio-writing.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 4.1-4.10

Test a real user writing a draft:
1. Go to /studio
2. Verify Write/Learn mode toggle exists and is clickable
3. Click "Write" mode — verify AI Intensity selector appears (Focus/Collaborate/Accelerate)
4. Click "Learn" mode — verify document type selector appears
5. Switch back to Write mode
6. Find the TipTap editor area — verify it's editable
7. Type a realistic paragraph: "Introduction: Type 2 diabetes mellitus affects over 500 million people worldwide. Recent advances in GLP-1 receptor agonists have shown promising results in glycemic control."
8. Verify auto-save indicator appears (Saving.../Saved)
9. Test the formatting toolbar: click Bold, Italic, verify they toggle
10. Test heading buttons (H1, H2, H3)
11. Test the right panel tabs: "Chat & Learn", "Research", "Checks" — click each, verify panel switches
12. Test keyboard shortcut Cmd+Shift+C — verify Citation Dialog opens
13. Close the Citation Dialog
14. Test keyboard shortcut Cmd+Shift+R — verify Reference Sidebar toggles
15. Test the Export dropdown in toolbar — verify PDF and Word options exist
16. Test slash commands: type "/" in the editor — verify command palette appears
17. Verify sidebar has: document title, project selector, "My Library" link, "Literature Search" link
18. Test inline AI features if visible (continue, summarize buttons)

=== DEEP JOURNEY 2: Literature Search & Discovery ===
File: e2e/journeys/deep/literature-search.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 5.1-5.5

Test a real user searching for papers:
1. Go to /research
2. Verify search bar is visible and editable
3. Type "metformin type 2 diabetes RCT" and press Enter
4. Wait for results area (may be empty without API keys — that's OK)
5. Verify sort options exist: Relevance, Date, Citations
6. Click each sort option — verify it's interactive
7. Verify filter panel exists with: Evidence Level, Year Range, Study Type, Source
8. Interact with filters: click Evidence Level dropdown, select "Level I"
9. Verify "Clear Filters" button appears when filter is active
10. Check sidebar for recent searches area
11. Verify scope selector (if visible): PubMed, Semantic Scholar, OpenAlex tabs
12. Test empty state: clear search — verify appropriate message shows
13. Verify the AI Synthesis panel area exists (right side or button to open it)
14. Test that search input accepts special characters: "BRCA1 AND (breast OR ovarian)"

=== DEEP JOURNEY 3: Notebook / PDF Chat (NotebookLM-style) ===
File: e2e/journeys/deep/notebook-chat.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 6.1-6.6

Test a real user chatting with papers:
1. Go to /notebook
2. Verify chat interface loads (message input area)
3. Verify "Attach Sources" UI exists with options: Upload PDF, Add from Library, Paste URL, Search
4. Type a question in chat input: "What are the key findings on GLP-1 receptor agonists?"
5. Press Enter or click Send — verify message appears in chat area
6. Verify AI response area exists (even if empty/loading without API keys)
7. Check for follow-up suggestion chips area
8. Check for source attribution area ([1], [2] citations)
9. Verify thumbs up/down feedback buttons exist on messages
10. Verify copy message button exists
11. Check for Audio Overview button (headphones icon)
12. Check for Share dialog button — click it, verify dialog opens, close it
13. Test the conversation history sidebar — verify it exists
14. Check for "Sources" tab or notes icon — click to verify Source Notes panel
15. Verify Evidence Extraction area is accessible
16. Test mode selector if visible: Research mode vs Learn mode
17. Check that the password gate doesn't block (for shared notebooks)

=== DEEP JOURNEY 4: LaTeX Paper Writing ===
File: e2e/journeys/deep/latex-editor.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 11.1-11.8

Test a real user writing a LaTeX paper:
1. Go to /latex/new
2. Verify project creation form: title input, template selector, compiler dropdown
3. Fill in title: "Systematic Review of GLP-1 Receptor Agonists"
4. Check template picker — verify it has options (IEEE, Elsevier, etc.)
5. Check compiler selector — verify options: pdflatex, xelatex, lualatex
6. Go to /latex (project list) — verify grid/list of projects or empty state
7. Verify "New Paper" button exists
8. If a project exists, click into it — verify editor workspace loads with:
   a. File tree panel (left) — verify it shows files
   b. Source editor (center) — verify CodeMirror editor loads
   c. Preview pane (right) — verify PDF preview area exists
9. Test the source editor: click into it, type some LaTeX:
   \section{Introduction}
   This paper presents a systematic review of GLP-1 receptor agonists.
10. Verify toolbar has: Compile button, AI tools, Comments, Settings
11. Click Compile button — verify it triggers (may fail without compiler, that's OK)
12. Test file tree: verify main.tex or similar exists
13. Test the AI assistant panel if visible
14. Test the comments panel
15. Test inline AI bar if visible (slash commands in LaTeX)
16. Verify collaboration cursors area exists (for real-time collab)

=== DEEP JOURNEY 5: Deep Research Pipeline ===
File: e2e/journeys/deep/deep-research.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 7.1-7.5

Test a real user running deep research:
1. Go to /deep-research
2. Verify topic input field: "What would you like to research?"
3. Type: "Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
4. Verify research mode selector exists with options: Quick, Standard, Deep, Exhaustive
5. Click each mode — verify selection changes (visual highlight)
6. Click "Start Deep Research" or press Enter
7. Verify progress UI appears (even if it fails without API keys)
8. Verify "Abort" button exists during research
9. Check for Progress Stepper on left panel
10. Check for streaming content area on right panel
11. Navigate to idle state — verify "Past Research Sessions" area exists
12. Test export buttons if visible: Copy Markdown, Download PDF, Open in Studio
13. Test "Save to Library" button if visible
14. Verify tabbed navigation exists (if present)
15. Test the plan preview phase UI elements

=== DEEP JOURNEY 6: Compliance & Quality Checks ===
File: e2e/journeys/deep/compliance-checks.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 16

Test a real user checking draft quality:
1. Go to /compliance
2. Verify the compliance interface loads
3. Check for text input area (paste text to check)
4. Check for check types: Plagiarism check, AI detection
5. Paste sample text: "Type 2 diabetes mellitus is a chronic metabolic disorder characterized by hyperglycemia resulting from insulin resistance and relative insulin deficiency."
6. Click "Run Check" or equivalent button
7. Verify results area exists (may show error without API keys)
8. Check for inline/split view options
9. Check for history panel
10. Check for real-time check mode toggle
11. Navigate to /analysis — verify writing analysis page loads
12. Verify analysis has input area and results display
13. Check for humanize/paraphrase features if visible

=== DEEP JOURNEY 7: Presentation Creation ===
File: e2e/journeys/deep/presentation-creation.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 10.1-10.6

Test a real user creating an AI presentation:
1. Go to /presentation/new
2. Verify Step 1: Source selector — Research Paper, Enter Topic, Paste Abstract, Upload Document
3. Click "Enter Topic" — verify text input appears
4. Type: "GLP-1 Receptor Agonists: A New Era in Diabetes Management"
5. Verify Step 2: Configure Presentation
   a. Title input
   b. Theme selector (modern/academic/minimal/vibrant/dark/clinical)
   c. Audience type (General/Medical/Conference/Grant Committee/Students)
   d. Number of slides control
   e. Tone selector (Professional/Conversational/Technical)
6. Click through themes — verify visual preview changes
7. Click "Generate Presentation" — verify it triggers (may fail without API keys)
8. Go to /presentation — verify deck list or empty state
9. Verify "New Presentation" button exists
10. Test presentation editor if a deck exists:
    a. Slide navigator (left)
    b. Slide canvas (center)
    c. Speaker notes (bottom)
    d. Actions toolbar: Edit, Regenerate, Add, Delete, Present, Export

=== DEEP JOURNEY 8: Slides Builder ===
File: e2e/journeys/deep/slides-builder.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Sections 9.1-9.5

Test a real user building slides manually:
1. Go to /slides
2. Verify deck grid or empty state
3. Verify "Create New" and "Import Presentation" buttons
4. Go to /slides/new — verify creation wizard
5. Check for: title input, theme selector, audience type
6. Fill in title: "Research Findings Presentation"
7. Select a theme if options are visible
8. Check for slide editor if accessible:
   a. Left panel: slide thumbnails
   b. Center: slide canvas
   c. Right panel: properties/styling
   d. Toolbar: add slide, delete, duplicate, theme, text, image, chart

=== DEEP JOURNEY 9: Systematic Review ===
File: e2e/journeys/deep/systematic-review.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 12

Test a real user running a systematic review:
1. Go to /systematic-review
2. Verify project list or empty state
3. Check for "New Review" button
4. Verify the systematic review interface has panels for:
   a. Protocol (PROSPERO registration, PICO, inclusion/exclusion)
   b. Search Strategy (database selection, search terms, PRESS checklist)
   c. Screening (title/abstract, full-text with PDF viewer)
   d. Data Extraction (structured forms, PICO extraction)
   e. Risk of Bias (RoB 2, ROBINS-I, QUADAS-2)
   f. Meta-Analysis (forest plot, funnel plot, heterogeneity)
   g. NMA (network plot, league table)
   h. GRADE assessment
   i. PRISMA Flow Diagram
   j. Manuscript generation
5. Click through each panel tab — verify it loads content
6. Check for paper import UI (search databases, upload RIS/BibTeX)
7. Check for collaboration features (invite, presence indicators)
8. Check for export options (PRISMA checklist, PROSPERO export)
9. Verify audit trail panel is accessible

=== DEEP JOURNEY 10: Illustration / Scientific Figures ===
File: e2e/journeys/deep/illustration.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 13

Test a real user creating scientific illustrations:
1. Go to /illustrate
2. Verify welcome page with two modes: Agent Mode, Editor Mode
3. Click Agent Mode — verify:
   a. Template gallery loads
   b. Prompt input area exists
   c. Chat history area exists
   d. Type prompt: "Create a diagram of the MAPK signaling pathway"
   e. Verify the message appears in chat
4. Navigate to Editor Mode — verify:
   a. Canvas area loads (Fabric.js)
   b. Toolbar with shape tools, text tools, drawing tools
   c. Layers panel on left
   d. Properties panel on right
   e. Style panel for colors, gradients, effects
5. Test the toolbar: click rectangle tool, text tool, line tool
6. Test the properties panel: verify inputs for position, size, rotation, opacity
7. Test export dialog: click Export, verify format options (PNG, SVG, PDF, PPTX, LaTeX)
8. Close export dialog
9. Test keyboard shortcuts dialog if accessible
10. Check for biological shape generators: Cell, DNA Helix, Neuron, Membrane
11. Check for the icon picker/browser

=== DEEP JOURNEY 11: Journal Feed Reader ===
File: e2e/journeys/deep/journal-feeds.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 14

Test a real user browsing journal feeds:
1. Go to /feeds
2. Verify feed list or empty state with "Add Feed" button
3. Click "Add Feed" — verify modal opens with:
   a. Search input for journals
   b. Category/discipline filter
   c. Trending/popular feeds section
4. Close the modal
5. Verify feed sidebar exists (subscribed feeds list)
6. Verify article cards render (or empty state)
7. Check for view modes: list view, magazine view
8. Check for article search bar with filters
9. Verify article card has: title, journal, date, abstract snippet
10. Check for copilot panel (AI summary of feed)
11. Test mute/unmute functionality UI if visible

=== DEEP JOURNEY 12: Cross-Module Navigation ===
File: e2e/journeys/deep/cross-module-navigation.spec.ts

Test that a user can seamlessly move between modules:
1. Start at /dashboard
2. Click "Literature Search" action card → verify arrives at /research
3. Use sidebar to navigate to "Notebook" → verify /notebook loads
4. Use sidebar to navigate to "Studio" → verify /studio loads
5. Use sidebar to navigate to "LaTeX Editor" → verify /latex loads
6. Use sidebar to navigate to "Slides" → verify /slides loads
7. Use sidebar to navigate to "Presentation" → verify /presentation loads
8. Use sidebar to navigate to "Compliance" → verify /compliance loads
9. Use sidebar to navigate to "Systematic Review" → verify /systematic-review loads
10. Use sidebar to navigate to "Illustrate" → verify /illustrate loads
11. Use sidebar to navigate to "Journal Feed" → verify /feeds loads
12. Use sidebar to navigate to "Library" → verify /library loads
13. Use sidebar to navigate to "Projects" → verify /projects loads
14. Use sidebar to navigate to "Settings" → verify /settings loads
15. Use sidebar to navigate to "Dashboard" → verify /dashboard loads
16. Test browser back button after each navigation
17. Verify sidebar highlights the current module

=== DEEP JOURNEY 13: Settings & User Configuration ===
File: e2e/journeys/deep/settings.spec.ts
Source: USER_JOURNEY_DOCUMENTATION.md Section 17

Test a real user configuring their account:
1. Go to /settings
2. Verify settings page loads with sections/tabs
3. Check for profile section (name, email, avatar)
4. Check for preference sections (theme, language, notifications)
5. Check for subscription/billing section
6. Check for API keys section (if visible)
7. Test form inputs: change a field value
8. Test save button: click and verify response
9. Check for "Log Out" button — verify it exists (don't click it)
10. Test any toggle switches (dark mode, notifications, etc.)

=== HOW TO WRITE EACH TEST ===

```typescript
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

test.describe('Deep Journey: Studio Writing', () => {
  test('complete writing workflow with formatting and panels', async ({ page }) => {
    await page.goto('http://localhost:3001/studio');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).not.toContainText('Application error');

    // Find the editor area
    const editor = page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    await expect(editor).toBeVisible({ timeout: 15000 });

    // Type realistic content
    await editor.click();
    await editor.type('Introduction: Type 2 diabetes mellitus affects over 500 million people worldwide.');

    // Test formatting toolbar
    // ... continue with SPECIFIC, REAL interactions
  });
});
```

CRITICAL RULES:
1. Use SPECIFIC selectors — read the actual page source if generic selectors fail
2. Every test must DO something, not just verify "page loads"
3. If a button exists, CLICK it. If an input exists, TYPE in it. If a dialog exists, OPEN and CLOSE it.
4. Test with REALISTIC academic content (medical research, systematic reviews, etc.)
5. Handle "no database" gracefully — empty states are valid, crashes are not
6. If something fails because the UI element doesn't exist, that's a REAL BUG — log it
7. Take screenshots at key points: await page.screenshot({ path: 'e2e/artifacts/journey-name-step.png' })
8. Each journey file should have 5-15 tests covering different aspects of that module

=== EXECUTION ===

For each journey file:
1. Write the test
2. Run: npx playwright test e2e/journeys/deep/<file>.spec.ts --reporter=list
3. If it fails because UI element is missing → that's a real finding, log it in the test
4. If it fails because selector is wrong → fix the selector
5. Commit after each journey file passes

After all journeys pass:
1. Create e2e/journeys/deep/FINDINGS.md listing any UI issues discovered
2. Log results to annealing-log.jsonl
3. Commit everything
4. Push: git push origin hardening/session-1

Go.
