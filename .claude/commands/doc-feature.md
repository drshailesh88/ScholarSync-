# Document a feature module from machine-extracted source truth

Module to document: $ARGUMENTS

## Phase 1: Extract ground truth (zero hallucination possible)

Run the AST extractor to get machine-verified patterns:

```bash
node e2e/pipeline/extract-features.cjs $ARGUMENTS
```

This produces:
- `e2e/extracted/$ARGUMENTS/raw-extraction.json` — every conditional, handler, API call, state variable, string literal, component, hook, timer, error handler, link, and type declaration with exact file:line
- `e2e/extracted/$ARGUMENTS/import-tree.json` — the actual import graph from the route file (only files reachable from the route)

## Phase 2: Read the extraction + existing doc

1. Read `e2e/extracted/$ARGUMENTS/raw-extraction.json` fully
2. Read `e2e/extracted/$ARGUMENTS/import-tree.json` fully
3. Read the existing feature doc — find the matching `*_FEATURES_TESTING.md` file for this module
4. Count existing checkboxes: `grep -c '^\- \[ \]' <FEATURE_DOC>`

## Phase 3: Write documentation from extraction data ONLY

Update the `*_FEATURES_TESTING.md` file. Rules:

- **ONLY document patterns that appear in raw-extraction.json** — if it's not in the JSON, it does not exist
- **ONLY document files that appear in import-tree.json** — if a component is not in the import tree, it is NOT RENDERED on this route, list it under "Components NOT Rendered"
- For every checkbox, include `file_path:line_number` from the extraction JSON
- For API calls: document the URL, method, and response handling visible in the extraction
- For conditionals: document when UI elements show/hide based on the extracted conditions
- For handlers: document what each click/submit/key handler does
- For state: document every useState with its initial value
- For strings: document every visible text, placeholder, title, aria-label
- For disabled states: document when buttons/inputs are disabled and the condition
- For effects: document every useEffect and whether it has cleanup
- For timers: document setTimeout/setInterval with delays
- For error handlers: document try/catch and what the catch does
- Do NOT read source files directly to "fill gaps" — the extractor already read them
- Do NOT infer features from component names — only from extracted patterns
- Do NOT describe features from components that exist in the codebase but are missing from import-tree.json

## Phase 4: Verify counts

After editing, run:
```bash
grep -c '^\- \[ \]' <FEATURE_DOC>
```

Report: "Before: X checkboxes, After: Y checkboxes, Net added: Z"

## Phase 5: Build specs for browser testing

```bash
node e2e/pipeline/build-specs.cjs $ARGUMENTS
```

This chunks the doc into 35-item spec files ready for agent-browser + Ralph loop.

Report the manifest when done.
