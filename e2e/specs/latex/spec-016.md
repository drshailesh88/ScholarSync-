# latex — Spec 016

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Live Preview — LaTeX-to-HTML (`latex-to-html.ts`)
- [ ] LaTeX comments (`%...`) stripped but escaped `\%` preserved via placeholder swap
- [ ] `\protect`, `\noindent`, `\centering`, `\vfill`, `\hfill` silently removed
- [ ] `\pagenumbering`, `\pagestyle`, `\thispagestyle`, `\setcounter` silently removed
- [ ] Special characters: `\$`→$, `\&`→&amp;, `\#`→#, `\_`→_, `\{`→{, `\}`→}
- [ ] `\\` (double backslash) renders as `<br />` line break
- [ ] Double newlines converted to paragraph breaks (`</p><p>`)
- [ ] Preamble (everything before `\begin{document}`) and everything after `\end{document}` is stripped
- [ ] `\includegraphics` renders as actual `<img>` tag with src `/api/latex/images/serve?path={encoded}`
- [ ] `\ref{key}` → styled span `[ref:key]`, `\eqref{key}` → `(key)`, `\cite[p|t|author]?{keys}` → `[key1, key2]`
#### Environment Conversions (`latex-environments.ts`)
- [ ] Figure environment extracts `\caption{}` and `\includegraphics{}`, renders as `<figure>` with text placeholder (not actual image)
- [ ] Table environment extracts `\caption{}` and nested tabular
- [ ] Tabular column spec: `l/L`→left, `c/C`→center, `r/R`→right alignment
- [ ] `\multicolumn{N}{align}{content}` handled inside tabular cells with correct colspan
- [ ] First tabular row renders as `<th>`, subsequent rows as `<td>`
- [ ] Standalone tabular (not inside `\begin{table}`) also converted
- [ ] `verbatim` → `<pre>`, `lstlisting` → `<pre><code>`
- [ ] `quote`/`quotation` → `<blockquote>`
- [ ] `center` → centered div, `flushleft` → left-aligned div, `flushright` → right-aligned div
- [ ] `minipage` → plain `<div class="latex-minipage">` wrapper (width parameter consumed but not applied)
- [ ] 10 theorem-like environments: theorem, lemma, definition, corollary, proposition, remark, example, conjecture, notation, axiom — each renders as styled div with bold label
- [ ] `proof` → div with italic "Proof." and QED symbol ∎ (float right)
- [ ] `titlepage` → centered padded div
- [ ] `thebibliography` → ordered list with "References" heading, splitting on `\bibitem{key}`
#### useMediaQuery Hook
- [ ] Mobile breakpoint: `<768px`, minTouchTarget = 44px
- [ ] Tablet breakpoint: `768px <= width < 1024px`, minTouchTarget = 32px
- [ ] Desktop breakpoint: `width >= 1024px`, minTouchTarget = 24px
- [ ] Resize listener debounced by 100ms
- [ ] Server-side rendering default assumes desktop (1024×768)
#### Zustand Store — Track Changes Server Sync
- [ ] `acceptChange(id)` optimistically updates local state AND sends PATCH to `/api/latex/track-changes` with `{ id, status: "accepted" }`
- [ ] `rejectChange(id)` same pattern: local update + PATCH with `{ id, status: "rejected" }`
- [ ] `acceptAllChanges()` batch-updates every change currently stored in `pendingChanges` and fires individual PATCH requests for each entry
- [ ] `rejectAllChanges()` follows the same all-entries batch pattern
- [ ] All track-change server sync errors are caught silently
#### Behavior Corrections (Pass 2)
- [ ] **Image insert code is NOT a figure environment**: source generates only `\includegraphics[width=\linewidth]{figures/basename.ext}` — the existing doc section 12 incorrectly shows a full `\begin{figure}...\end{figure}` wrapper
- [ ] **New-file input placeholder is `filename or folder/name`**, not `filename.tex` as stated in the Codex audit section
