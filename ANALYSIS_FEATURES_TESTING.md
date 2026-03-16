# ScholarSync Analysis Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Analysis page (`/analysis`), including writing quality metrics, AI detection, and plagiarism scanning.
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Header & Navigation](#2-header--navigation)
3. [Source Mode Toggle](#3-source-mode-toggle)
4. [Input Mode — Text Area (Left Side)](#4-input-mode--text-area-left-side)
5. [Input Mode — Project Selector](#5-input-mode--project-selector)
6. [Input Mode — Instant Metrics Panel (Right Side)](#6-input-mode--instant-metrics-panel-right-side)
7. [Analyze Writing Button & Submission](#7-analyze-writing-button--submission)
8. [Results Mode — Highlighted Text (Left Side)](#8-results-mode--highlighted-text-left-side)
9. [Results Mode — Issues Tab (Right Side)](#9-results-mode--issues-tab-right-side)
10. [Results Mode — Detailed Metrics Tab (Right Side)](#10-results-mode--detailed-metrics-tab-right-side)
11. [Results Mode — Legend](#11-results-mode--legend)
12. [Writing Analysis Library](#12-writing-analysis-library)
13. [API — POST /api/integrity-check](#13-api--post-apiintegrity-check)
14. [AI Detection Engine](#14-ai-detection-engine)
15. [Plagiarism Engine](#15-plagiarism-engine)
16. [Server Actions](#16-server-actions)
17. [Unused Adjacent Modules](#17-unused-adjacent-modules)
18. [CircularGauge Component](#18-circulargauge-component)
19. [Loading & Error States](#19-loading--error-states)
20. [Error Handling & Edge Cases](#20-error-handling--edge-cases)
21. [Quick Test Workflows](#21-quick-test-workflows)

---

## 1. Page Overview

The Analysis page provides a standalone writing quality, AI detection, and plagiarism analysis tool outside of the Studio editor.

| Item | Detail |
|------|--------|
| **Route** | `/analysis` |
| **Page Component** | `AnalysisPage` (`src/app/(app)/analysis/page.tsx`) |
| **Loading UI** | `src/app/(app)/analysis/loading.tsx` — skeleton loaders |
| **Error UI** | `src/app/(app)/analysis/error.tsx` — "Analysis unavailable" message |
| **Server Actions** | `src/lib/actions/analysis.ts` |
| **Writing Analysis Lib** | `src/lib/writing-analysis.ts` |
| **API Endpoint** | `POST /api/integrity-check` (`src/app/api/integrity-check/route.ts`) |
| **AI Detection** | `src/lib/integrity/ai-detection.ts` |
| **Plagiarism** | `src/lib/integrity/plagiarism-engine.ts` |
| **Gauge UI** | `src/components/ui/circular-gauge.tsx` |

### Key State Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `sourceMode` | `"document" \| "paste"` | Toggle between loading from a project document or pasting raw text |
| `docLoading` | `boolean` | Whether a project document is being fetched |
| `activeDoc` | `DocumentForAnalysis \| null` | The loaded document object |
| `projects` | `{id, title}[]` | User's available projects |
| `selectedProjectId` | `number \| null` | Currently selected project in dropdown |
| `projectDropdownOpen` | `boolean` | Whether the project dropdown is open |
| `inputText` | `string` | The text content to analyze |
| `result` | `AnalysisResult \| null` | API response after analysis completes |
| `loading` | `boolean` | Whether analysis is in progress |
| `error` | `string \| null` | Error message from analysis |
| `paragraphs` | `string[]` | Parsed paragraphs from the input text |
| `activeTab` | `"issues" \| "metrics"` | Active tab on the results right-side panel |
| `clientIssues` | `WritingIssue[]` | Client-side writing issues from `write-good` |
| `clientMetrics` | `WritingMetrics \| null` | Client-side readability and writing metrics |

---

## 2. Header & Navigation

- [ ] **Back link** — ArrowLeft icon navigates to `/studio`
- [ ] **Title (input mode)** — displays "Writing Analysis"
- [ ] **Title (results mode)** — displays "Draft Analysis"

---

## 3. Source Mode Toggle

Two toggle buttons in the header. Only the `From Document` button includes the `FileText` icon.

| Button | Label | Test |
|--------|-------|------|
| **From Document** | "From Document" | [ ] Switches `sourceMode` to `"document"`, shows project selector |
| **Paste Text** | "Paste Text" | [ ] Switches `sourceMode` to `"paste"`, shows editable textarea |

- [ ] Active button is visually highlighted
- [ ] Switching from document mode to paste mode preserves the current textarea content
- [ ] Switching back to document mode can overwrite the textarea with the selected document content

---

## 4. Input Mode — Text Area (Left Side)

The main text input area for providing content to analyze.

### Placeholder Text
- [ ] **Document mode placeholder** — "Document content loaded from your project..."
- [ ] **Paste mode placeholder** — "Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions..."

### Text Constraints
| Constraint | Value | Test |
|------------|-------|------|
| **Minimum length** | 50 characters | [ ] Button disabled when text < 50 chars |
| **Maximum length** | 50,000 characters (validated at API) | [ ] API rejects text exceeding 50,000 chars |

### Word Count
- [ ] **Word count display** — shows "{count} words" below the textarea
- [ ] Word count updates in real time as text is typed or pasted

---

## 5. Input Mode — Project Selector

Visible only when `sourceMode` is `"document"` and the user has at least one project.

- [ ] **Label** — "Project:"
- [ ] **Dropdown trigger** — shows selected project title or "Select project" placeholder
- [ ] **CaretDown icon** — displayed on the dropdown trigger
- [ ] **Dropdown list** — shows all user projects by title
- [ ] **Selection** — clicking a project sets `selectedProjectId` and fetches the document
- [ ] **Document loading** — `docLoading` state shows loading indicator while fetching
- [ ] **Document loaded** — textarea populates with the document content from `activeDoc`
- [ ] **No projects** — project selector is hidden when `projects.length === 0`

---

## 6. Input Mode — Instant Metrics Panel (Right Side)

A 320px-wide panel that appears on the right side when `clientMetrics` is available and `text.length > 0`. Provides real-time feedback as the user types or pastes text.

### Readability Gauge
- [ ] **CircularGauge** — 110px, displays `clientMetrics.fleschReadingEase`
- [ ] **Readability label** — shown below the gauge (Easy / Standard / Difficult / Very Difficult)

### Metric Counts Grid (3 columns)
| Metric | Source | Test |
|--------|--------|------|
| **Words** | `clientMetrics.wordCount` | [ ] Displays correct word count |
| **Sentences** | `clientMetrics.sentenceCount` | [ ] Displays correct sentence count |
| **Paragraphs** | `clientMetrics.paragraphCount` | [ ] Displays correct paragraph count |

### Readability Section
| Metric | Max Value | Test |
|--------|-----------|------|
| **Flesch-Kincaid Grade** | 20 | [ ] Displays grade level |
| **Gunning Fog Index** | 20 | [ ] Displays fog index |
| **Flesch Reading Ease** | 100 | [ ] Displays reading ease score |
| **Avg Sentence Length** | 40 | [ ] Displays average sentence length in words |

### Writing Quality Section (2x2 Grid)
| Metric | Color | Source | Test |
|--------|-------|--------|------|
| **Passive Voice** | Yellow | `passiveVoiceCount` | [ ] Displays count of passive voice instances |
| **Weasel Words** | Orange | `weaselWordCount` | [ ] Displays count of weasel words |
| **Adverbs** | Blue | `adverbCount` | [ ] Displays count of adverbs |
| **Complex Sentences** | Red | `complexSentenceCount` | [ ] Displays count of complex sentences |

### Issues Summary
- [ ] **Max 10 issues** — displays up to 10 issues from `clientIssues`
- [ ] **Scrollable** — list is scrollable when issues exceed visible area
- [ ] **Warning issues** — shown with yellow background
- [ ] **Info issues** — shown with blue background

---

## 7. Analyze Writing Button & Submission

- [ ] **Button label** — "Analyze Writing" with Sparkle icon
- [ ] **Loading label** — "Analyzing..." while the button keeps the `Sparkle` icon in the current implementation
- [ ] **Disabled when** — `loading` is true OR `inputText.length < 50`
- [ ] **Submission** — sends text to the `/api/integrity-check` endpoint
- [ ] **Success** — populates `result`, switches to results mode, parses `paragraphs`
- [ ] **Failure** — sets `error` state with error message

---

## 8. Results Mode — Highlighted Text (Left Side)

After analysis completes, the left panel displays paragraphs with color-coded highlighting based on human probability scores.

### Paragraph Highlighting
| Human Probability | Background | Border | Test |
|-------------------|------------|--------|------|
| **< 40%** (Low) | `bg-red-500/10` | `border-l-2 red` | [ ] Paragraph highlighted red |
| **40-70%** (Mixed) | `bg-yellow-500/10` | `border-l-2 yellow` | [ ] Paragraph highlighted yellow |
| **> 70%** (High) | `bg-emerald-500/5` | `border-l-2 emerald` | [ ] Paragraph highlighted green |

### Paragraph Details
- [ ] **Glass panel** — rounded-2xl styling
- [ ] **Flags** — displayed below each paragraph in 10px text
- [ ] **Back link** — "← Analyze New Text" button to return to input mode

---

## 9. Results Mode — Issues Tab (Right Side)

The right-side panel (384px wide) has two tabs. The Issues tab is shown by default.

### Tab Header
- [ ] **Issues tab** — label "Issues" with count badge
- [ ] **Detailed Metrics tab** — label "Detailed Metrics"
- [ ] **Active tab** — visually highlighted

### API Suggestions
- [ ] **Styling** — purple-500/10 background with Sparkle icon
- [ ] **Label** — "Suggestion {i+1}" for each suggestion
- [ ] **Content** — displays AI-generated improvement suggestions

### Writing Issues (from write-good)
- [ ] **Max 15 issues** — displays up to 15 writing issues
- [ ] **Color coding by type**:
  - Passive voice — yellow
  - Weasel words — orange
  - Complex sentences — red
  - Default/other — blue
- [ ] **Issue details** — shows reason and suggestion (if available)

### Plagiarism Indicators
- [ ] **Severity badges** — display "{severity} RISK" for each match
- [ ] **Match details** — shows excerpt and source information

---

## 10. Results Mode — Detailed Metrics Tab (Right Side)

Switching to the "Detailed Metrics" tab shows comprehensive analysis data.

### 1. Readability Section
| Metric | Max Value | Test |
|--------|-----------|------|
| **Grade** | 100 | [ ] Displays overall readability grade |
| **Flesch-Kincaid** | 20 | [ ] Displays Flesch-Kincaid grade level |
| **Gunning Fog** | 20 | [ ] Displays Gunning Fog index |
| **Flesch Reading Ease** | 100 | [ ] Displays reading ease score |
| **Avg Sentence Length** | 40 | [ ] Displays average sentence length in words |

### 2. Writing Quality Section
| Metric | Test |
|--------|------|
| **Passive Voice** | [ ] Displays passive voice count |
| **Weasel Words** | [ ] Displays weasel word count |
| **Adverbs** | [ ] Displays adverb count |
| **Complex Sentences** | [ ] Displays complex sentence count |

### 3. AI Detection Section
| Metric | Color Thresholds | Test |
|--------|-----------------|------|
| **Human Score** | Green >= 70, Yellow 40-70, Red < 40 | [ ] Displays human probability percentage with correct color |
| **AI Score** | Green <= 30, Yellow 30-60, Red > 60 | [ ] Displays AI probability percentage with correct color |
| **Overall Risk** | — | [ ] Displays overall risk level label |

### 4. Paragraph Breakdown
- [ ] **Per-paragraph scores** — shows human probability for each paragraph
- [ ] **Color-coded** — matches the highlighting thresholds from the left panel

---

## 11. Results Mode — Legend

The legend explains the paragraph color coding:

| Color | Label | Test |
|-------|-------|------|
| **Red** | "Low Human (<40%)" | [ ] Legend entry displayed |
| **Yellow** | "Mixed (40-70%)" | [ ] Legend entry displayed |
| **Emerald** | "High Human (>70%)" | [ ] Legend entry displayed |

---

## 12. Writing Analysis Library

**File**: `src/lib/writing-analysis.ts`

### WritingIssue Type

| Field | Type | Description |
|-------|------|-------------|
| `index` | `number` | Position index of the issue |
| `offset` | `number` | Character offset in text |
| `reason` | `string` | Description of the issue |
| `type` | `"passive" \| "weasel" \| "adverb" \| "complex" \| "readability"` | Issue category |
| `severity` | `"info" \| "warning" \| "error"` | Issue severity level |
| `suggestion` | `string?` | Optional improvement suggestion |

### WritingMetrics Type

| Field | Type | Test |
|-------|------|------|
| `wordCount` | `number` | [ ] Correct word count |
| `sentenceCount` | `number` | [ ] Correct sentence count |
| `paragraphCount` | `number` | [ ] Correct paragraph count |
| `avgWordsPerSentence` | `number` | [ ] Calculated correctly |
| `avgSentenceLength` | `number` | [ ] Calculated correctly |
| `fleschReadingEase` | `number` | [ ] Formula applied correctly |
| `fleschKincaidGrade` | `number` | [ ] Formula applied correctly |
| `gunningFogIndex` | `number` | [ ] Formula applied correctly |
| `automatedReadabilityIndex` | `number` | [ ] Formula applied correctly |
| `colemanLiauIndex` | `number` | [ ] Formula applied correctly |
| `complexWordCount` | `number` | [ ] Words with 3+ syllables counted |
| `complexWordPercentage` | `number` | [ ] Percentage calculated correctly |
| `vocabularyDiversity` | `number` | [ ] Type-token ratio calculated |
| `avgSyllablesPerWord` | `number` | [ ] Syllable counting works |
| `passiveVoiceCount` | `number` | [ ] Passive voice detected by write-good |
| `weaselWordCount` | `number` | [ ] Weasel words detected by write-good |
| `adverbCount` | `number` | [ ] Adverbs detected by write-good |
| `complexSentenceCount` | `number` | [ ] Sentences with >35 words flagged |
| `readabilityLabel` | `string` | [ ] Correct label assigned |

### Readability Labels
| Flesch Reading Ease | Label | Test |
|---------------------|-------|------|
| >= 60 | "Easy" | [ ] Label assigned correctly |
| >= 40 | "Standard" | [ ] Label assigned correctly |
| >= 20 | "Difficult" | [ ] Label assigned correctly |
| < 20 | "Very Difficult" | [ ] Label assigned correctly |

### Library Dependencies
- [ ] **write-good** — used for passive voice, weasel word, adverb, and other writing issue detection
- [ ] **Complex sentence detection** — sentences with more than 35 words flagged as complex
- [ ] **Multiple readability formulas** — Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog, Automated Readability Index, Coleman-Liau Index

---

## 13. API — POST /api/integrity-check

**File**: `src/app/api/integrity-check/route.ts`

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | `string` | Yes | Text to analyze (50-50,000 characters) |
| `mode` | `"full" \| "ai_detection" \| "plagiarism" \| "citation_audit"` | No | Analysis mode (defaults to full) |
| `sources` | `any` | No | Optional sources for plagiarism comparison |
| `projectId` | `number` | No | Optional project context |
| `documentId` | `number` | No | Optional document context |

### Rate Limiting
- [ ] **Limit** — 20 requests per hour per user
- [ ] **Exceeded** — returns 429 status

### Plan Gating
| Plan | Available Features | Test |
|------|-------------------|------|
| **Free** | AI detection only | [ ] Free users only get AI detection results |
| **Paid** | Full suite (AI detection + plagiarism + citation audit) | [ ] Paid users get all analysis modules |

### Error Responses
| Status | Condition | Test |
|--------|-----------|------|
| **401** | Unauthenticated | [ ] Returns 401 for unauthenticated requests |
| **400** | Validation failure (text too short/long) | [ ] Returns 400 for invalid text length |
| **429** | Rate limit exceeded | [ ] Returns 429 when rate limited |
| **503** | AI service not configured or AI detection failure | [ ] Returns 503 for upstream AI availability problems |
| **500** | Internal server error | [ ] Returns 500 for unexpected errors |

---

## 14. AI Detection Engine

**File**: `src/lib/integrity/ai-detection.ts`

### Detection Methods by Plan
| Plan | Method | Test |
|------|--------|------|
| **Free** | LLM-heuristic only | [ ] Free tier uses heuristic-based detection |
| **Paid** | Binoculars (Replicate) + LLM combined (60/40 weighting) | [ ] Paid tier combines Binoculars and LLM scores |

### Binoculars Model
- [ ] **Model** — `drshailesh88/binoculars-ai-detection` on Replicate
- [ ] **Threshold** — 0.8536432310785527
- [ ] **Weighting** — 60% Binoculars, 40% LLM in combined score

### Hedging Phrases
- [ ] **Count** — exactly 35 hedging phrases tracked
- [ ] **Detection** — phrases counted and reported in text statistics

### Text Statistics Computed
| Statistic | Description | Test |
|-----------|-------------|------|
| `avgSentenceLength` | Average words per sentence | [ ] Calculated correctly |
| `sentenceLengthStdDev` | Burstiness measure | [ ] Standard deviation calculated |
| `typeTokenRatio` | Vocabulary diversity | [ ] Unique words / total words |
| `passiveVoicePercent` | Passive voice usage rate | [ ] Percentage calculated |
| `readabilityGrade` | Overall readability grade | [ ] Grade computed |
| `hedgingPhraseCount` | Number of hedging phrases | [ ] Hedging phrases counted |
| `formulaicTransitionDensity` | Density of formulaic transitions | [ ] Transitions detected |
| `paragraphLengthStdDev` | Paragraph length variation | [ ] Standard deviation calculated |
| `repetitiveSentenceOpeningRatio` | Ratio of repeated sentence starters | [ ] Repetition detected |
| `markdownHeadingCount` | Number of markdown headings | [ ] Headings counted |

---

## 15. Plagiarism Engine

**File**: `src/lib/integrity/plagiarism-engine.ts`

- [ ] **Paid feature only** — plagiarism engine runs only for paid plans in the API
- [ ] **Similarity score** — percentage of matched content
- [ ] **Source matching** — identifies potential source documents
- [ ] **Severity levels** — high, medium, low risk classifications
- [ ] **Match excerpts** — highlights matched text passages

---

## 16. Server Actions

**File**: `src/lib/actions/analysis.ts`

| Action | Description | Test |
|--------|-------------|------|
| `getActiveDocumentForAnalysis(projectId?)` | Loads the most recent document for a project | [ ] Returns document content for the given project |
| `listProjectsForAnalysis()` | Returns the authenticated user's projects | [ ] Returns array of `{id, title}` objects |

---

## 17. Unused Adjacent Modules

These modules exist in the repo but are **not** imported by `src/app/(app)/analysis/page.tsx`, so they should not be treated as current `/analysis` page features.

| Module | Status |
|--------|--------|
| `src/hooks/useRealtimeIntegrity.ts` | Exists, but `/analysis` uses its own local 500ms debounced `useEffect` instead |
| `runWritingAnalysis(projectId?)` | Exists in `src/lib/actions/analysis.ts`, but is not imported by `/analysis` |
| `analyzeText(text)` | Exists in `src/lib/actions/analysis.ts`, but is not imported by `/analysis` |

---

## 18. CircularGauge Component

**File**: `src/components/ui/circular-gauge.tsx`

### Props
| Prop | Type | Default | Test |
|------|------|---------|------|
| `value` | `number` (0-100) | — | [ ] Gauge renders at correct fill level |
| `label` | `string` | — | [ ] Label text displayed below gauge |
| `size` | `number` | 140 | [ ] Gauge renders at specified pixel size |

### Color Thresholds
| Value Range | Color | Test |
|-------------|-------|------|
| >= 80 | Green | [ ] Gauge is green for values 80-100 |
| >= 60 | Yellow | [ ] Gauge is yellow for values 60-79 |
| >= 40 | Orange | [ ] Gauge is orange for values 40-59 |
| < 40 | Red | [ ] Gauge is red for values 0-39 |

---

## 19. Loading & Error States

### Loading State (`loading.tsx`)
- [ ] **Skeleton loaders** — shimmer placeholders for the full page layout
- [ ] **Smooth appearance** — no layout shift when content loads

### Error State (`error.tsx`)
- [ ] **Title** — "Analysis unavailable"
- [ ] **Message** — "We couldn't load the writing analysis tool. Please try again."
- [ ] **Retry option** — user can attempt to reload the page

---

## 20. Error Handling & Edge Cases

### Input Validation
- [ ] **Empty text** — analyze button disabled, no API call made
- [ ] **Text < 50 characters** — analyze button disabled with visual indication
- [ ] **Text > 50,000 characters** — API returns 400 validation error
- [ ] **Only whitespace** — handled gracefully (word count shows 0)

### API Errors
- [ ] **Unauthenticated (401)** — appropriate error message displayed
- [ ] **Rate limited (429)** — error message indicates rate limit exceeded
- [ ] **Server error (500)** — generic error message displayed
- [ ] **Network failure** — error state shown with retry guidance

### Plan Restrictions
- [ ] **Free tier API** — plagiarism and citation engines are not executed for free plans
- [ ] **Current `/analysis` UI** — no upgrade prompt or locked-state card is implemented

### Document Mode Edge Cases
- [ ] **No projects** — project selector hidden, user guided to paste mode
- [ ] **Empty document** — textarea shows empty, analyze button disabled
- [ ] **Project fetch failure** — error message displayed, fallback to paste mode

---

## 21. Quick Test Workflows

### Basic Paste Analysis Flow
1. [ ] Navigate to `/analysis`
2. [ ] Verify page loads with "Writing Analysis" title
3. [ ] Confirm "Paste Text" mode is available
4. [ ] Click "Paste Text" toggle
5. [ ] Paste text with at least 50 characters into the textarea
6. [ ] Verify word count updates in real time
7. [ ] Verify instant metrics panel appears on the right (readability gauge, counts, quality grid)
8. [ ] Click "Analyze Writing" button
9. [ ] Verify loading state with "Analyzing..." label
10. [ ] Verify results mode loads with highlighted paragraphs on the left
11. [ ] Verify Issues tab displays on the right with suggestion count
12. [ ] Switch to "Detailed Metrics" tab and verify all four sections render
13. [ ] Verify color legend (Red, Yellow, Emerald) is displayed
14. [ ] Click "← Analyze New Text" to return to input mode

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Document Workflow
- [ ] First available project is auto-selected on initial page load in document mode
- [ ] Active document title is shown inline beside the project selector after a document loads
- [ ] Document-mode textarea is read-only while showing the loaded project document text
- [ ] Clicking outside the project dropdown closes the project menu
- [ ] Empty document state shows a FileText illustration with guidance to write in Studio first or switch to paste mode

### Validation and Inline Errors
- [ ] Manual submission with fewer than 50 characters shows the inline message "Please enter at least 50 characters of text to analyze."
- [ ] API validation failures surface the returned inline error text under the textarea (for example, "Invalid request")
- [ ] Network failures surface the inline message "Failed to connect. Check your API key."

### Instant Metrics Panel
- [ ] Instant writing analysis appears after a 500ms debounce once text is present
- [ ] Instant readability badge uses the local analysis labels from the live UI (`Easy`, `Standard`, `Difficult`, `Very Difficult`)
- [ ] Client issue summaries show a `+N more issues` footer when more than 10 issues are detected

### Results Mode
- [ ] Results mode keeps the word, sentence, and paragraph summary cards above the right-side tabs
- [ ] "Analyze New Text" resets the result view, clears stored paragraphs, and returns the right-side panel to the Issues tab
- [ ] Issues tab shows a positive empty state message when no AI suggestions are returned: "No issues detected. Your writing looks great!"
- [ ] Local issue cards in results mode are grouped under a dedicated "Writing Issues (write-good)" section beneath AI suggestions
- [ ] Results-mode write-good issues show a `+N more issues` footer when more than 15 issues are available
- [ ] Paragraph Breakdown in Detailed Metrics renders only when paragraph-level AI analysis entries are returned

### Document Mode Flow
1. [ ] Navigate to `/analysis`
2. [ ] Click "From Document" toggle
3. [ ] Verify project selector dropdown appears
4. [ ] Select a project from the dropdown
5. [ ] Verify document content loads into the textarea
6. [ ] Verify word count updates after document loads
7. [ ] Verify instant metrics panel populates
8. [ ] Click "Analyze Writing" and verify full analysis results

### Integration Risks
- [ ] The page-local `AnalysisResult` type expects top-level `humanScore`, `aiScore`, `paragraphAnalysis`, and `plagiarismIndicators`
- [ ] `POST /api/integrity-check` returns those values under nested `aiDetection` and `plagiarism` objects instead
- [ ] Result-mode AI detection, paragraph breakdown, and plagiarism indicator views are therefore out of contract until the page normalizes the API payload

### AI Detection Results Flow
1. [ ] Submit text for analysis
2. [ ] In results, switch to "Detailed Metrics" tab
3. [ ] Verify AI Detection section shows Human Score with correct color coding
4. [ ] Verify AI Score displays with inverse color coding
5. [ ] Verify Overall Risk label is present
6. [ ] Check paragraph breakdown shows per-paragraph human probability scores
7. [ ] Verify paragraph highlighting on the left matches the scores

### Instant Metrics Validation Flow
1. [ ] Enter text in paste mode
2. [ ] Verify CircularGauge shows Flesch Reading Ease score
3. [ ] Verify readability label matches the score range (Easy/Standard/Difficult/Very Difficult)
4. [ ] Verify Words, Sentences, Paragraphs counts in the 3-column grid
5. [ ] Verify Flesch-Kincaid Grade, Gunning Fog Index, Flesch Reading Ease, Avg Sentence Length
6. [ ] Verify Passive Voice (yellow), Weasel Words (orange), Adverbs (blue), Complex Sentences (red) in the 2x2 grid
7. [ ] Verify issues summary shows up to 10 issues with correct color coding

### Free vs Paid Tier Flow
1. [ ] Log in as a free-tier user
2. [ ] Submit text for analysis
3. [ ] Verify AI detection results are returned
4. [ ] Verify the current `/analysis` UI does not render a locked-state upgrade prompt
5. [ ] Verify paid-tier API responses include nested `plagiarism` and `citationAudit` objects
6. [ ] Log in as a paid-tier user
7. [ ] Submit same text for analysis
8. [ ] Verify full suite results (AI detection + plagiarism + citation audit) are returned

### Error Handling Flow
1. [ ] Try to analyze with less than 50 characters — button should be disabled
2. [ ] Submit analysis and simulate network failure — verify error state displays
3. [ ] Verify error message is shown with guidance to retry
4. [ ] Submit rapid requests to trigger rate limiting — verify 429 error handled gracefully
5. [ ] Navigate to `/analysis` while unauthenticated — verify 401 handling

### Icons Reference
| Icon | Usage |
|------|-------|
| **ArrowLeft** | Back navigation to `/studio` |
| **Sparkle** | Analyze button, API suggestion items |
| **CircleNotch** | Document-loading state in document mode |
| **CaretDown** | Project dropdown indicator |
| **FileText** | `From Document` toggle and empty-document state |

### Detailed QA Coverage

#### Initial State and Data Hydration
- [ ] `sourceMode` defaults to `document` on first render
- [ ] `docLoading` defaults to `true` before the first document fetch resolves
- [ ] `result` defaults to `null`, so input mode is the first visible state
- [ ] `activeTab` defaults to `issues` before any result is shown
- [ ] `listProjectsForAnalysis()` runs on mount to populate the document dropdown
- [ ] The first returned project ID is auto-assigned to `selectedProjectId` when no project is already selected
- [ ] `getActiveDocumentForAnalysis(selectedProjectId)` runs after document mode initializes and again when the selected project changes
- [ ] Document fetch failures clear `activeDoc` and reset `inputText` to an empty string
- [ ] Empty `inputText` clears both `clientIssues` and `clientMetrics`

#### Header and Navigation
- [ ] Header back control is a `Link` to `/studio`, not a button with imperative navigation
- [ ] Header title reads `Writing Analysis` while `result` is null
- [ ] Header title switches to `Draft Analysis` after a successful analysis response sets `result`
- [ ] Source-mode toggle group is visible only while `result` is null
- [ ] Results-mode legend replaces the source toggle group after `result` is set
- [ ] Results legend contains exactly three items: `Low Human (<40%)`, `Mixed (40-70%)`, and `High Human (>70%)`
- [ ] Each legend item includes a colored square swatch plus text label

#### Source Mode Toggle
- [ ] `From Document` button is the selected toggle on initial render
- [ ] Selected toggle uses `bg-brand text-white`
- [ ] Unselected toggle uses `text-ink-muted` and hover text-color changes
- [ ] `From Document` toggle includes a `FileText` icon before its label
- [ ] `Paste Text` toggle has text only with no icon in the current implementation
- [ ] Clicking `Paste Text` switches `sourceMode` to `paste`
- [ ] Clicking `From Document` switches `sourceMode` back to `document`
- [ ] Switching from document mode to paste mode does not clear `inputText`; the current text carries over
- [ ] Switching back to document mode triggers a fresh document load that can overwrite pasted text

#### Document Mode Project Selector
- [ ] Project selector row is rendered only when `sourceMode === "document"` and `projects.length > 0`
- [ ] Project selector row starts with the label `Project:`
- [ ] Project dropdown trigger shows the selected project title when `selectedProject` is found
- [ ] Project dropdown trigger falls back to `Select project` when no project is selected yet
- [ ] Project dropdown trigger includes a trailing `CaretDown` icon
- [ ] Clicking the project trigger toggles `projectDropdownOpen`
- [ ] Open project menu renders as an absolutely positioned dropdown under the trigger
- [ ] Project menu is capped with `max-h-60 overflow-y-auto`
- [ ] Currently selected project row uses `bg-brand/10 text-brand font-medium`
- [ ] Non-selected project rows use `text-ink` and gain a hover background
- [ ] Clicking a project option sets `selectedProjectId` and closes the dropdown
- [ ] Clicking outside the dropdown closes it through the `mousedown` document listener
- [ ] When `activeDoc` exists, a `Document: {title}` text label is shown to the right of the project selector

#### Document Mode Loading and Empty States
- [ ] While `docLoading` is true in document mode, the textarea is replaced by a centered loading state
- [ ] Document loading state shows a `CircleNotch` icon with `animate-spin`
- [ ] Document loading state shows the text `Loading document...`
- [ ] When document mode has no `activeDoc`, the textarea is replaced by the empty-document state
- [ ] Empty-document state uses a `FileText` icon above the message
- [ ] Empty-document state message reads `No document found. Write something in the Studio first, or switch to paste mode.`
- [ ] Empty-document state hides the textarea and analyze button entirely

#### Textarea Behavior
- [ ] Document-mode textarea placeholder is `Document content loaded from your project...`
- [ ] Paste-mode textarea placeholder is `Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions...`
- [ ] Document-mode textarea is `readOnly`
- [ ] Paste-mode textarea is editable
- [ ] Textarea uses `font-serif`
- [ ] Textarea uses `resize-none`
- [ ] Textarea uses `focus:ring-2 focus:ring-brand/40` when focused
- [ ] Word count text is always computed from `effectiveText.split(/\s+/).filter(Boolean).length`
- [ ] Word count reads `0 words` when the textarea is empty or whitespace-only
- [ ] Paste-mode typing updates `inputText` on every `onChange`

#### Inline Error Handling
- [ ] Inline error text is rendered directly under the textarea in red when `error` is non-null
- [ ] Forced submission with fewer than 50 characters sets `Please enter at least 50 characters of text to analyze.`
- [ ] New document loads clear prior errors by setting `error` back to `null`
- [ ] Starting a new analysis clears prior errors before the fetch begins
- [ ] Non-OK API responses use `data.error || "Writing analysis failed"` for the inline error
- [ ] Network exceptions set the inline error to `Failed to connect. Check your API key.`
- [ ] Error feedback is inline text only; there is no toast, alert banner, or modal

#### Analyze Writing Button
- [ ] Analyze button label is `Analyze Writing` while idle
- [ ] Analyze button includes a leading `Sparkle` icon while idle
- [ ] Analyze button is disabled when `effectiveText.trim().length < 50`
- [ ] Analyze button is disabled when `loading` is true
- [ ] Disabled button uses the `disabled:opacity-50` style
- [ ] Clicking Analyze serializes the request body as `{ text: inputText, mode: "full" }`
- [ ] Clicking Analyze splits the current text into paragraphs using `/\n\n+/` before the network request
- [ ] While loading, the button label changes to `Analyzing...`
- [ ] While loading, the button still renders the `Sparkle` icon; it does not swap to a spinner in the current implementation
- [ ] Successful responses store the parsed JSON in `result`
- [ ] Successful responses keep the previously computed `clientMetrics` visible for the results summary cards

#### Instant Metrics Panel
- [ ] Instant metrics panel is hidden until `clientMetrics` exists and trimmed text length is greater than 0
- [ ] Instant metrics panel appears for loaded document text as well as pasted text
- [ ] Instant metrics analysis is debounced by 500ms after the last text change
- [ ] Instant gauge size is `110`
- [ ] Instant gauge center displays the numeric `fleschReadingEase` score
- [ ] Instant gauge label comes from `clientMetrics.readabilityLabel`
- [ ] Instant readability labels in the current implementation are `Easy`, `Standard`, `Difficult`, and `Very Difficult`
- [ ] Counts grid renders `Words`, `Sentences`, and `Paragraphs` summary cards
- [ ] Readability section renders four `MetricBar` rows
- [ ] Writing Quality section renders four `IssueBadge` tiles
- [ ] Instant issues section header shows `Issues ({clientIssues.length})`
- [ ] Instant issues list renders at most 10 items before collapsing to a `+N more issues` footer
- [ ] Warning-severity instant issues use yellow styling
- [ ] Non-warning instant issues use blue styling

#### Results Mode Layout
- [ ] Successful analysis hides the source toggle and displays the three-color legend
- [ ] Results left panel wraps the analyzed text in a `glass-panel rounded-2xl p-8` container
- [ ] Results left panel header contains the `Analyze New Text` reset button on the left
- [ ] Results left panel header shows `activeDoc.documentTitle` on the right when a document-backed analysis is open
- [ ] Clicking `Analyze New Text` sets `result` back to `null`
- [ ] Clicking `Analyze New Text` clears `paragraphs`
- [ ] Clicking `Analyze New Text` resets `activeTab` back to `issues`
- [ ] Results right panel width is `w-96`
- [ ] Results right panel gauge size is `120`
- [ ] Results right panel keeps the Words, Sentences, and Paragraphs summary cards above the tabs when `clientMetrics` exists

#### Highlighted Paragraph Rendering
- [ ] Each paragraph is rendered from the precomputed `paragraphs` array, not by splitting the server response
- [ ] Paragraphs with no matching `paragraphAnalysis` entry default to `100` human probability
- [ ] Paragraphs under 40% human use red background and left border styling
- [ ] Paragraphs between 40% and 70% human use yellow background and left border styling
- [ ] Paragraphs above 70% human use emerald background and left border styling
- [ ] Paragraph flags render as `Flags: {comma-separated flags}` below the paragraph when flags exist
- [ ] Paragraph flag text is omitted entirely when no flags are present

#### Results Issues Tab
- [ ] Results tab list is driven by `analysisTabs`
- [ ] Issues-tab count badge uses `result.writingQuality.suggestions.length` once results exist
- [ ] When `writingQuality.suggestions.length === 0`, the issues tab shows `No issues detected. Your writing looks great!`
- [ ] AI suggestion cards use `bg-purple-500/10`
- [ ] AI suggestion cards include a purple `Sparkle` icon and a `Suggestion {n}` label
- [ ] Local write-good issues render in a dedicated `Writing Issues (write-good)` section below AI suggestions
- [ ] Results write-good issues render at most 15 cards before a `+N more issues` footer
- [ ] Results write-good issue cards show uppercase type labels
- [ ] Results write-good issue cards display the issue reason text only
- [ ] Plagiarism Indicators section renders only when `result.plagiarismIndicators.length > 0`
- [ ] High-severity plagiarism cards use red text/background styling
- [ ] Medium-severity plagiarism cards use yellow text/background styling
- [ ] Low-severity plagiarism cards use muted text on `bg-surface-raised`
- [ ] Plagiarism cards display uppercase `{SEVERITY} Risk` labels, an italic excerpt, and a concern line

#### Results Detailed Metrics Tab
- [ ] Detailed Metrics tab renders `Readability`, `Writing Quality`, and `AI Detection` sections every time metrics view is active
- [ ] Readability section always shows `Readability Grade`
- [ ] Results readability section adds `Flesch-Kincaid Grade`, `Gunning Fog Index`, and `Flesch Reading Ease` only when `clientMetrics` exists
- [ ] Results `Avg Sentence Length` row comes from `result.writingQuality.averageSentenceLength`
- [ ] Writing Quality `Passive Voice` falls back to `result.writingQuality.passiveVoiceCount` when `clientMetrics` is unavailable
- [ ] Writing Quality `Weasel Words`, `Adverbs`, and `Complex Sentences` rows render only when `clientMetrics` exists
- [ ] AI Detection section renders `Human Score`, `AI Score`, and `Overall Risk` as `ToneBadge` rows
- [ ] Human Score uses emerald for >= 70, yellow for 40-69, and red below 40
- [ ] AI Score uses emerald for <= 30, yellow for 31-60, and red above 60
- [ ] Overall Risk uses `low -> emerald`, `medium -> yellow`, and `high -> red`
- [ ] Paragraph Breakdown section renders only when `result.paragraphAnalysis.length > 0`
- [ ] Paragraph Breakdown rows display `Paragraph {n}` on the left and `{humanProbability}% human` on the right

#### Helper Component Behavior
- [ ] `MetricBar` caps bar fill width at 100% with `Math.min((value / max) * 100, 100)`
- [ ] `MetricBar` appends suffix text such as ` words`, ` instances`, or ` sentences` in the value label when provided
- [ ] `IssueBadge` color map is `yellow`, `orange`, `blue`, and `red`
- [ ] `CircularGauge` color thresholds are green >= 80, yellow >= 60, orange >= 40, and red below 40
- [ ] Results gauge readability label uses `Excellent`, `Good`, `Needs Improvement`, and `Poor`
- [ ] Instant gauge readability label uses the `analyzeWriting()` labels, not the results-gauge labels

---

## Re-Audit Discoveries (Claude Code Pass 2)

> These checks were found by reading every file in the import tree line by line.
> Every item traces to a specific file and approximate line number.

### `src/lib/integrity/index.ts` — AI Writing Suggestions (buildWritingSuggestions)

The API generates actionable writing suggestions based on statistical text features. Each condition below is an independent code branch that produces a distinct suggestion string displayed in the Issues tab.

- [ ] When `stats.avgSentenceLength > 28`, the API returns the suggestion: "Your average sentence length is high. Consider breaking long sentences for readability." (~line 129)
- [ ] When `stats.sentenceLengthStdDev < 3`, the API returns: "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure." (~line 133)
- [ ] When `stats.passiveVoicePercent > 30`, the API returns: "{N}% of sentences use passive voice. Consider using more active voice." where N is `Math.round(passiveVoicePercent)` (~line 139)
- [ ] When `stats.typeTokenRatio < 0.35` and `> 0`, the API returns: "Vocabulary diversity is low. Use more varied word choices to strengthen your writing." (~line 144)
- [ ] When `stats.hedgingPhraseCount > 5`, the API returns: "Found {N} hedging phrases (e.g. \"It is important to note\"). These are common in AI-generated text — consider being more direct." (~line 149)
- [ ] When `stats.readabilityGrade > 16`, the API returns: "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility." (~line 154)
- [ ] When none of the above conditions fire, the suggestions array is empty and the Issues tab shows the "No issues detected" message (~line 124-159)

### `src/app/api/integrity-check/route.ts` — Error Responses (exact text)

- [ ] 401 response body is `{ error: "Not authenticated" }` (~line 47)
- [ ] 400 response body is `{ error: "Invalid request", details: <fieldErrors> }` where details come from Zod validation (~line 72)
- [ ] 503 when AI is not configured returns `{ error: "AI service is not configured." }` (~line 62)
- [ ] 503 when AI detection throws returns `{ error: "AI detection service is unavailable. Please try again later." }` (~line 102)
- [ ] 500 catch-all returns `{ error: "Failed to analyze text" }` (~line 159)
- [ ] Rate limit exceeded returns status **429** (not 503) with `{ error: "Rate limit exceeded. Please try again later." }` and `X-RateLimit-Remaining` header (`src/lib/rate-limit.ts` ~line 77)
- [ ] Rate limit key format is `{userId}:integrity-check` using `RATE_LIMITS.analysis` config (`src/lib/rate-limit.ts` ~line 56, route ~line 53)
- [ ] API checks `isAIConfigured()` before processing and returns 503 if false (~line 59)
- [ ] API persists results to `integrityChecks` database table after every successful check (~line 120)
- [ ] Database persistence failure is non-fatal — results are still returned to the client (~line 148-150)
- [ ] `contentChecked` field in DB is truncated to first 5000 characters of submitted text (~line 125)
- [ ] Zod `sources` schema validates an array of objects with optional fields: `title`, `doi`, `pmid`, `authors` (string array), `year` (number) (~line 23-31)

### `src/lib/integrity/index.ts` — Tier Gating and Response Shape

- [ ] Paid plans are `["basic", "pro", "institutional"]` — the `PAID_PLANS` set at ~line 22
- [ ] Free plan users get AI detection only; plagiarism, citation audit, and self-plagiarism engines are skipped (~lines 37-40)
- [ ] Response includes `tier` field ("free" or "paid"), `checkedAt` ISO timestamp, and optional `selfPlagiarism` and `citationAudit` fields (~line 104-120)
- [ ] `writingQuality.passiveVoiceCount` in the API response is derived from `(passiveVoicePercent / 100) * sentenceCount`, not from write-good (~line 111-113)
- [ ] `writingQuality.readabilityGrade` in the API response comes from the AI detection engine's Flesch-Kincaid grade, not from the client-side `fleschReadingEase` (~line 116)

### `src/lib/writing-analysis.ts` — Metric Formatting Precision

- [ ] `fleschReadingEase` is clamped to 0-100 range and rounded to integer with `Math.round()` (~line 170-178)
- [ ] `fleschKincaidGrade` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(rawGrade * 10) / 10` (~line 183-186)
- [ ] `gunningFogIndex` is clamped to >= 0 and rounded to 1 decimal place: `Math.round(... * 10) / 10` (~line 191-196)
- [ ] `automatedReadabilityIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 259-262)
- [ ] `colemanLiauIndex` is clamped to >= 0 and rounded to 1 decimal: `Math.round(... * 10) / 10` (~line 268-271)
- [ ] `vocabularyDiversity` is a type-token ratio rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 275)
- [ ] `avgSyllablesPerWord` is rounded to 2 decimal places: `Math.round(... * 100) / 100` (~line 292)
- [ ] `avgWordsPerSentence` and `avgSentenceLength` are identical values, both `Math.round(avgWordsPerSentence * 10) / 10` (~line 282-283)
- [ ] `complexWordPercentage` is rounded to 1 decimal: `Math.round(... * 1000) / 10` (~line 290)

### `src/lib/writing-analysis.ts` — Issue Generation Details

- [ ] `classifyReason()` maps write-good reasons: "passive voice" → type `passive` / severity `warning`; "weasel" → type `weasel` / severity `warning`; "adverb" → type `adverb` / severity `info`; all others → type `readability` / severity `info` (~line 94-112)
- [ ] Complex sentence issues have reason `"This sentence has {N} words. Consider breaking it up for clarity."` and suggestion `"Break this into shorter sentences for better readability."` (~line 241-248)
- [ ] `isComplexWord()` requires 3+ syllables AND excludes words ending in "ed", "es", or "ing" (~line 118-127)

### `src/lib/integrity/ai-detection.ts` — Detection Engine Details

- [ ] `HEDGING_PHRASES` array contains exactly 35 hedging phrases (~line 144-182)
- [ ] `PARAGRAPH_BATCH_SIZE` for LLM analysis is 4 paragraphs per batch (~line 185)
- [ ] `overallRisk` derivation: humanScore >= 70 → "low", >= 40 → "medium", < 40 → "high" (~line 1090-1097)
- [ ] `aiScore` is computed as `100 - humanScore` after clamping (~line 1088)
- [ ] Binoculars score is mapped to human probability: `(score / threshold - 0.5) * 100`, clamped to 0-100 (~line 64-69)
- [ ] Combined paid-tier score: 60% Binoculars + 40% LLM-heuristic, rounded (~line 1075-1077)
- [ ] `computeTextStatistics` rounds `avgSentenceLength` to 2 decimal places, `typeTokenRatio` to 3 decimal places, `formulaicTransitionDensity` to 3 decimal places (~line 421-431)

### `src/lib/integrity/plagiarism-engine.ts` — Severity Thresholds

- [ ] Plagiarism severity: Jaccard similarity >= 0.4 → "high", >= 0.2 → "medium", < 0.2 → "low" (~line 500-504)
- [ ] Plagiarism matches below 0.08 Jaccard similarity are not reported (~line 599)
- [ ] Scholarly API searches have a 12-second abort timeout (~line 547)
- [ ] Paragraph excerpts in plagiarism results are truncated to 120 characters with "..." suffix (~line 540-541)

### `src/components/ui/circular-gauge.tsx` — Implementation Details

- [ ] Gauge SVG stroke width is 10 pixels (~line 26)
- [ ] Gauge SVG is rotated with `-rotate-90` class so arc starts at 12 o'clock position (~line 38)
- [ ] Active arc uses `strokeLinecap="round"` for rounded ends (~line 55)
- [ ] Arc fill animates with `transition-all duration-1000` (~line 58)
- [ ] Gauge color hex values: green `#22c55e` (>= 80), yellow `#eab308` (>= 60), orange `#f97316` (>= 40), red `#ef4444` (< 40) (~line 12-17)
- [ ] Center value text uses `text-2xl font-bold text-ink` (~line 62)
- [ ] Label text below gauge uses `text-sm font-medium text-ink-muted` (~line 65)

### `src/components/ui/tabs.tsx` — Tabs Component Details

- [ ] Active tab button style: `bg-surface-raised text-ink border border-border-subtle` (~line 36)
- [ ] Inactive tab button style: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (~line 37)
- [ ] Active tab count badge: `bg-brand/10 text-brand` (~line 48)
- [ ] Inactive tab count badge: `bg-surface-raised text-ink-muted` (~line 49)
- [ ] Count badge is rendered only when `tab.count !== undefined` (~line 41)

### `src/components/ui/error-display.tsx` — Error Page Details

- [ ] Error page reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` (~line 23-27)
- [ ] Error page displays a `WarningCircle` icon (size 32) inside a red-tinted rounded container (~line 35-36)
- [ ] Retry button text is "Try Again" with an `ArrowCounterClockwise` icon (size 16) (~line 43-46)

### `src/app/(app)/analysis/loading.tsx` — Loading Skeleton Structure

- [ ] Loading skeleton renders exactly 4 `Skeleton` elements: back-button placeholder (h-8 w-8 rounded-lg), title placeholder (h-6 w-40), textarea placeholder (flex-1 rounded-2xl), and a footer row with word-count placeholder (h-4 w-20) plus button placeholder (h-12 w-40 rounded-xl) (~lines 6-15)
- [ ] Loading skeleton mirrors the page layout height: `h-[calc(100vh-7rem)]` (~line 5)

### `src/app/(app)/analysis/page.tsx` — Additional UI Details

- [ ] Page container uses `h-[calc(100vh-7rem)]` for viewport height minus header (~line 203)
- [ ] Analyze button uses `rounded-xl px-6 py-3` — not rounded-lg (~line 344)
- [ ] Legend swatches in results mode use `w-3 h-3 rounded` with both `bg-{color}-500/30` AND `border border-{color}-500` (~lines 245-255)
- [ ] Results-mode reset button text is `← Analyze New Text` (using `&larr;` HTML entity), not "Back to Analyze New Text" (~line 464)
- [ ] Results-mode reset button is styled as text link: `text-xs text-brand hover:text-brand-hover font-medium` (~line 462)
- [ ] Results gauge value comes from `result.writingQuality.readabilityGrade` (API's Flesch-Kincaid grade), while instant gauge value comes from `clientMetrics.fleschReadingEase` (~line 500 vs ~line 360)
- [ ] Results-mode Writing Quality `Passive Voice` MetricBar uses dynamic max: `Math.max(value, 10)` (~line 679)
- [ ] Results-mode `Weasel Words` and `Adverbs` MetricBars use dynamic max: `Math.max(value, 10)` (~lines 688, 693)
- [ ] Results-mode `Complex Sentences` MetricBar uses dynamic max: `Math.max(value, 5)` (~line 699)
- [ ] Results-mode Readability Grade MetricBar has max of `100` (~line 642)
- [ ] Results-mode Overall Risk is capitalized from raw value: `result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)` — displays "Low", "Medium", or "High" (~line 723)
- [ ] Paragraph breakdown score pills use `px-2 py-0.5 rounded-full text-xs font-medium` with three color tiers matching the left-panel highlighting thresholds (~lines 741-748)
- [ ] Plagiarism indicator cards include a `Sparkle` icon before the severity label, using the severity color (~line 615-616)
- [ ] Plagiarism indicator concern line is plain text: `text-xs text-ink-muted` (~line 623)
- [ ] Issues tab count in input mode (before results) shows `clientIssues.length` when clientIssues > 0, or `undefined` (hidden) when no issues (~line 147)
- [ ] `ToneBadge` helper renders label left / colored badge right with three color options: emerald → `bg-emerald-500/10 text-emerald-500`, yellow → `bg-yellow-500/10 text-yellow-500`, red → `bg-red-500/10 text-red-500` (~lines 785-795)
- [ ] `IssueBadge` helper renders count as `text-lg font-semibold` and label as `text-[10px]` with four color options: yellow → `text-yellow-600`, orange → `text-orange-600`, blue → `text-blue-600`, red → `text-red-600` (~lines 798-811)
- [ ] `MetricBar` bar track is `h-1.5 rounded-full bg-surface-raised`; fill bar is `h-full rounded-full bg-brand transition-all` (~lines 774-779)
- [ ] `MetricBar` value label format is `{value}{suffix}` with no space before the suffix string (~line 772)

### `src/hooks/useRealtimeIntegrity.ts` — Hook Internals

- [ ] Hook cancels in-flight requests via `AbortController` before starting a new check (~line 35-37)
- [ ] Hook sends `mode: "ai_detection"` in the request body, not `"full"` (~line 49)
- [ ] Hook extracts `result.aiDetection?.humanScore` from the API response (~line 59)
- [ ] Hook ignores `AbortError` exceptions (cancelled requests are not treated as errors) (~line 62-65)
- [ ] Hook cleanup on unmount aborts any pending request and clears the debounce timer (~line 107-116)

---

### Behavior Corrections (Pass 2)

1. **Section 12 readability labels are WRONG for the library function.** The existing doc (lines 313-318) says the `writing-analysis.ts` labels are "Excellent" (>= 80) / "Good" (>= 60) / "Needs Improvement" (>= 40) / "Poor" (< 40). The ACTUAL `getReadabilityLabel` function in `src/lib/writing-analysis.ts` (lines 133-138) returns: **"Easy"** (>= 60) / **"Standard"** (>= 40) / **"Difficult"** (>= 20) / **"Very Difficult"** (< 20). Different labels AND different thresholds. The Additional Features section (line 706) already has the correct labels, but Section 12 was never corrected.

2. **Rate limit returns 429, not 503.** The existing doc (line 356) says rate limiting returns status 503. The actual `checkRateLimit` function in `src/lib/rate-limit.ts` (lines 77, 94) returns **status 429** with `NextResponse.json`. The 503 status in the route is used for "AI not configured" and "AI detection failure" — two separate error paths.

3. **Reset button text is "← Analyze New Text", not "Back to Analyze New Text".** Section 8 (line 194) says the link text is "Back to Analyze New Text". The actual JSX at `page.tsx` line 464 renders `&larr; Analyze New Text` — a left arrow followed by "Analyze New Text". There is no word "Back" in the button text.

4. **Hedging phrases count is 35, not "23+".** Section 14 (line 377) says "23+ hedging phrases tracked". The actual `HEDGING_PHRASES` array in `ai-detection.ts` (lines 144-182) contains exactly **35** phrases. While "23+" is technically not false, it understates the count by 12.

5. **Section 6 Readability label description is inconsistent.** Line 136 says the readability label is "Excellent / Good / Needs Improvement / Poor" but the instant metrics panel uses labels from `clientMetrics.readabilityLabel` which comes from `analyzeWriting()` — the library function that returns "Easy / Standard / Difficult / Very Difficult". The Additional Features section (lines 704-706) correctly documents this, but Section 6 was never updated.

6. **The `Paste Text` toggle button has both modes using `bg-brand text-white` when active.** Line 633 says "Selected toggle uses `bg-brand text-white`" which is correct. However, the Paste Text button class (page.tsx lines 231-236) applies the same `bg-brand text-white` style when active — confirming both toggles share the exact same active style.

7. **The page's `AnalysisResult` interface does not match the API's `IntegrityCheckResult` response shape.** The page defines `humanScore`, `aiScore`, `paragraphAnalysis`, `plagiarismIndicators` at the top level (page.tsx lines 29-41), but the API returns these nested under `aiDetection` and `plagiarism` (integrity/types.ts lines 145-165). This is a data contract mismatch — the page reads `result.humanScore` but the API sends `result.aiDetection.humanScore`.

### Components Referenced But Not Rendered

1. **`useRealtimeIntegrity` hook** — Listed in Section 17 and the Page Overview table (line 49), but the analysis page does NOT import or call this hook. The page implements its own debounced analysis via a local `useEffect` with `setTimeout` at 500ms. The hook (with 2000ms debounce and 100-char minimum) is designed for the Studio editor, not the standalone analysis page.

2. **`analyzeText()` server action** — Listed in Section 16 (line 416), but the analysis page never calls this action. The page calls `analyzeWriting()` directly from the client-side library import, not through the server action.

3. **`runWritingAnalysis()` server action** — Listed in Section 16 (line 415), but the analysis page never calls this action. It is available for other consumers but unused on `/analysis`.
