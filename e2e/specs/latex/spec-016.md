# latex — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)
- [x] PASS: LaTeX comments (`%...`) stripped but escaped `\%` preserved via placeholder swap
- [x] PASS: `\protect`, `\noindent`, `\centering`, `\vfill`, `\hfill` silently removed
- [x] PASS: `\pagenumbering`, `\pagestyle`, `\thispagestyle`, `\setcounter` silently removed
- [x] PASS: Special characters: `\$`→$, `\&`→&amp;, `\#`→#, `\_`→_, `\{`→{, `\}`→}
- [x] PASS: `\\` (double backslash) renders as `<br />` line break
- [x] PASS: Double newlines converted to paragraph breaks (`</p><p>`)
- [x] PASS: Preamble (everything before `\begin{document}`) and everything after `\end{document}` is stripped
- [x] PASS: `\includegraphics` renders as actual `<img>` tag with src `/api/latex/images/serve?path={encoded}`
- [x] PASS: `\ref{key}` → styled span `[ref:key]`, `\eqref{key}` → `(key)`, `\cite[p|t|author]?{keys}` → `[key1, key2]`
#### Environment Conversions (`latex-environments.ts`)
- [x] PASS: Figure environment extracts `\caption{}` and `\includegraphics{}`, renders as `<figure>` with text placeholder (not actual image)
- [x] PASS: Table environment extracts `\caption{}` and nested tabular
- [x] PASS: Tabular column spec: `l/L`→left, `c/C`→center, `r/R`→right alignment
- [x] PASS: `\multicolumn{N}{align}{content}` handled inside tabular cells with correct colspan
- [x] PASS: First tabular row renders as `<th>`, subsequent rows as `<td>`
- [x] PASS: Standalone tabular (not inside `\begin{table}`) also converted
- [x] PASS: `verbatim` → `<pre>`, `lstlisting` → `<pre><code>`
- [x] PASS: `quote`/`quotation` → `<blockquote>`
- [x] PASS: `center` → centered div, `flushleft` → left-aligned div, `flushright` → right-aligned div
- [x] PASS: `minipage` → plain `<div class="latex-minipage">` wrapper (width parameter consumed but not applied)
- [x] PASS: 10 theorem-like environments: theorem, lemma, definition, corollary, proposition, remark, example, conjecture, notation, axiom — each renders as styled div with bold label
- [x] PASS: `proof` → div with italic "Proof." and QED symbol ∎ (float right)
- [x] PASS: `titlepage` → centered padded div
- [x] PASS: `thebibliography` → ordered list with "References" heading, splitting on `\bibitem{key}`
#### useMediaQuery Hook
- [x] PASS: Mobile breakpoint: `<768px`, minTouchTarget = 44px
- [x] PASS: Tablet breakpoint: `768px <= width < 1024px`, minTouchTarget = 32px
- [x] PASS: Desktop breakpoint: `width >= 1024px`, minTouchTarget = 24px
- [x] PASS: Resize listener debounced by 100ms
- [x] PASS: Server-side rendering default assumes desktop (1024×768)
#### Zustand Store — Track Changes Server Sync
- [x] PASS: `acceptChange(id)` optimistically updates local state AND sends PATCH to `/api/latex/track-changes` with `{ id, status: "accepted" }`
- [x] PASS: `rejectChange(id)` same pattern: local update + PATCH with `{ id, status: "rejected" }`
- [x] PASS: `acceptAllChanges()` batch-updates every change currently stored in `pendingChanges` and fires individual PATCH requests for each entry
- [x] PASS: `rejectAllChanges()` follows the same all-entries batch pattern
- [x] PASS: All track-change server sync errors are caught silently
#### Behavior Corrections (Pass 2)
- [x] PASS: **Image insert code is NOT a figure environment**: source generates only `\includegraphics[width=\linewidth]{figures/basename.ext}` — the existing doc section 12 incorrectly shows a full `\begin{figure}...\end{figure}` wrapper
- [x] PASS: **New-file input placeholder is `filename or folder/name`**, not `filename.tex` as stated in the Codex audit section
