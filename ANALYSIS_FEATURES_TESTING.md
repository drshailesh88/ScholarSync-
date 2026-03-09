# ScholarSync Analysis Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Analysis page (`/analysis`), including writing quality metrics, AI detection, plagiarism scanning, and the real-time integrity hook.
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
17. [Real-Time Integrity Hook](#17-real-time-integrity-hook)
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
| **Real-Time Hook** | `src/hooks/useRealtimeIntegrity.ts` |
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

Two toggle buttons in the header, styled with the FileText icon:

| Button | Label | Test |
|--------|-------|------|
| **From Document** | "From Document" | [ ] Switches `sourceMode` to `"document"`, shows project selector |
| **Paste Text** | "Paste Text" | [ ] Switches `sourceMode` to `"paste"`, shows empty textarea |

- [ ] Active button is visually highlighted
- [ ] Switching modes preserves any previously entered text (if applicable)

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
- [ ] **Readability label** — shown below the gauge (Excellent / Good / Needs Improvement / Poor)

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
- [ ] **Loading label** — "Analyzing..." with spinner (CircleNotch icon)
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
- [ ] **Back link** — "Back to Analyze New Text" link to return to input mode

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
| >= 80 | "Excellent" | [ ] Label assigned correctly |
| >= 60 | "Good" | [ ] Label assigned correctly |
| >= 40 | "Needs Improvement" | [ ] Label assigned correctly |
| < 40 | "Poor" | [ ] Label assigned correctly |

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
- [ ] **Exceeded** — returns 503 status

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
| **503** | Not configured or rate limit exceeded | [ ] Returns 503 when rate limited |
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
- [ ] **Count** — 23+ hedging phrases tracked (e.g., "it is important to note", "arguably", etc.)
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

- [ ] **Paid feature only** — locked for free-tier users
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
| `runWritingAnalysis(projectId?)` | Runs local (client-side) writing analysis on a project document | [ ] Returns WritingMetrics and WritingIssues |
| `analyzeText(text)` | Analyzes arbitrary text input | [ ] Returns analysis results for pasted text |
| `listProjectsForAnalysis()` | Returns the authenticated user's projects | [ ] Returns array of `{id, title}` objects |

---

## 17. Real-Time Integrity Hook

**File**: `src/hooks/useRealtimeIntegrity.ts`

### Hook Signature
`useRealtimeIntegrity(text: string, enabled: boolean)`

### Behavior
| Parameter | Value | Test |
|-----------|-------|------|
| **Debounce** | 2,000ms | [ ] Analysis does not fire until 2s after last keystroke |
| **Minimum text length** | 100 characters | [ ] No analysis triggered for text < 100 chars |
| **Minimum change** | 10 characters changed | [ ] No re-analysis if fewer than 10 chars changed |

### Return Values
| Field | Type | Description | Test |
|-------|------|-------------|------|
| `score` | `number \| null` | Human probability score (0-100) | [ ] Returns numeric score after analysis |
| `loading` | `boolean` | Whether analysis is in progress | [ ] True while debounced request is pending |
| `error` | `string \| null` | Error message if analysis fails | [ ] Returns error string on failure |

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
- [ ] **Rate limited (503)** — error message indicates rate limit exceeded
- [ ] **Server error (500)** — generic error message displayed
- [ ] **Network failure** — error state shown with retry guidance

### Plan Restrictions
- [ ] **Free tier** — only AI detection results shown, plagiarism and citation audit locked
- [ ] **Upgrade prompt** — free-tier users see indication that full suite requires paid plan

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
14. [ ] Click "Back to Analyze New Text" to return to input mode

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
3. [ ] Verify readability label matches the score range (Excellent/Good/Needs Improvement/Poor)
4. [ ] Verify Words, Sentences, Paragraphs counts in the 3-column grid
5. [ ] Verify Flesch-Kincaid Grade, Gunning Fog Index, Flesch Reading Ease, Avg Sentence Length
6. [ ] Verify Passive Voice (yellow), Weasel Words (orange), Adverbs (blue), Complex Sentences (red) in the 2x2 grid
7. [ ] Verify issues summary shows up to 10 issues with correct color coding

### Free vs Paid Tier Flow
1. [ ] Log in as a free-tier user
2. [ ] Submit text for analysis
3. [ ] Verify AI detection results are returned
4. [ ] Verify plagiarism section is locked with upgrade prompt
5. [ ] Verify citation audit section is locked with upgrade prompt
6. [ ] Log in as a paid-tier user
7. [ ] Submit same text for analysis
8. [ ] Verify full suite results (AI detection + plagiarism + citation audit) are returned

### Error Handling Flow
1. [ ] Try to analyze with less than 50 characters — button should be disabled
2. [ ] Submit analysis and simulate network failure — verify error state displays
3. [ ] Verify error message is shown with guidance to retry
4. [ ] Submit rapid requests to trigger rate limiting — verify 503 error handled gracefully
5. [ ] Navigate to `/analysis` while unauthenticated — verify 401 handling

### Icons Reference
| Icon | Usage |
|------|-------|
| **ArrowLeft** | Back navigation to `/studio` |
| **Sparkle** | Analyze button, API suggestion items |
| **CircleNotch** | Loading spinner during analysis |
| **CaretDown** | Project dropdown indicator |
| **FileText** | Source mode toggle buttons |

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
