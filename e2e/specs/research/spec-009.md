# research — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Unified Search API Internals
- [ ] Unhandled unified-search failures return HTTP 500 with `{ "error": "Search failed" }`
#### Source Adapter Normalization
- [ ] PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty
- [ ] PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces
- [ ] Labeled PubMed abstract segments are prefixed as `Label: text` during parsing
- [ ] PubMed author names are normalized to `LastName ForeName`
- [ ] PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`
- [ ] PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`
- [ ] PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted
- [ ] PubMed DOI is read from `<ArticleId IdType="doi">`
- [ ] PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`
- [ ] PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`
- [ ] PubMed study type uses the first mapped publication type that is not `"other"`
- [ ] PubMed results always set `citationCount` to `0`
- [ ] PubMed results always set `isOpenAccess` to `false`
- [ ] PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [ ] PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`
- [ ] Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2
- [ ] Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`
- [ ] Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present
- [ ] Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`
- [ ] Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them
- [ ] Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `"other"`
- [ ] Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [ ] Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`
- [ ] OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results
- [ ] OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically
- [ ] OpenAlex concept chips are limited to concepts whose score is greater than `0.3`
- [ ] OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`
- [ ] OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true
- [ ] OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [ ] ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : ' " ( ) [ ] { }`
- [ ] ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms
- [ ] ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string
- [ ] ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`
- [ ] ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`
