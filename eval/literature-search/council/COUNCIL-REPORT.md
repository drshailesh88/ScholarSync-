# LLM-Council Verdict — Manan vs Elicit

Judges: opus, codex, deepseek (cross-family: Anthropic Opus · OpenAI Codex · Google Gemini).
Manan run: `exact-title-fix` (current `main` HEAD, with the OpenAlex wildcard-400 fix and Cohere cross-encoder active).

## Per-query majority vote

| query | opus | codex | deepseek | **majority** | Manan mean | Elicit mean |
|---|---|---|---|---|---|---|
| tavr-low-risk-6yr | elicit | elicit | manan | **elicit** | 4.56 | 4.61 |
| exact-dapa-hf | manan | manan | manan | **manan** | 5 | 3.89 |
| recency-lecanemab | manan | manan | manan | **manan** | 4.56 | 3.89 |
| pico-sglt2-cv-mortality | elicit | manan | manan | **manan** | 4.28 | 3.56 |
| guideline-af-esc | manan | manan | tie | **manan** | 4.72 | 3.94 |
| compare-doac-vs-warfarin | tie | manan | manan | **manan** | 4.33 | 3.22 |
| exact-recovery-dex | manan | manan | manan | **manan** | 5 | 3.67 |
| exact-keynote-189 | manan | manan | manan | **manan** | 5 | 4.11 |
| acronym-dapa-hf | manan | manan | manan | **manan** | 4.67 | 3.72 |
| acronym-partner-3 | manan | manan | manan | **manan** | 3.5 | 1.56 |
| acronym-keynote-189 | manan | manan | manan | **manan** | 4.83 | 2.72 |
| acronym-sprint | elicit | manan | manan | **manan** | 4.39 | 3.83 |
| broad-hfref-management | elicit | elicit | elicit | **elicit** | 3.22 | 3.89 |
| broad-cap-treatment | elicit | manan | manan | **manan** | 3.83 | 3.11 |
| broad-af-anticoagulation | manan | manan | manan | **manan** | 4.44 | 2.5 |
| pico-egdt-septic-shock | manan | manan | manan | **manan** | 5 | 4.22 |
| pico-oxygen-icu | tie | manan | manan | **manan** | 4.61 | 4.06 |
| recency-semaglutide-cv-2025 | elicit | elicit | manan | **elicit** | 3.72 | 3.72 |
| recency-cart-myeloma | tie | elicit | manan | **tie** | 3.83 | 3.61 |
| sr-statins-primary-prevention | manan | manan | manan | **manan** | 4.67 | 3.67 |
| sr-sglt2-hf-hospitalization | manan | manan | manan | **manan** | 5 | 4.11 |
| sr-cochrane-steroids-sepsis | elicit | elicit | manan | **elicit** | 4.67 | 4.56 |
| guideline-aortic-stenosis | manan | manan | tie | **manan** | 4.83 | 3.94 |
| guideline-kdigo-ckd | elicit | manan | manan | **manan** | 4.67 | 4.22 |
| lto-bariatric-diabetes | manan | manan | manan | **manan** | 4.94 | 4.11 |
| lto-pci-vs-cabg-left-main | tie | manan | manan | **manan** | 5 | 4.22 |
| lto-dapa-ckd | tie | manan | manan | **manan** | 4.89 | 4.22 |
| safety-vaccine-myocarditis | elicit | elicit | manan | **elicit** | 4.67 | 4.5 |
| safety-glp1-pancreatitis | elicit | elicit | manan | **elicit** | 4.33 | 4.11 |
| safety-sglt2-dka | elicit | manan | manan | **manan** | 4.72 | 3.78 |
| safety-fluoroquinolone-aneurysm | tie | tie | manan | **tie** | 5 | 4.56 |
| compare-tirzepatide-semaglutide | manan | tie | manan | **manan** | 4.94 | 4.33 |
| compare-ticagrelor-clopidogrel | tie | manan | manan | **manan** | 5 | 4.28 |
| mechanism-sglt2-cardioprotection | elicit | elicit | manan | **elicit** | 4.5 | 4.56 |

## Tally (by per-query majority)

- **Manan wins: 25**
- Elicit wins: 7
- Ties: 2

Overall winner per judge: opus=manan, codex=manan, deepseek=manan.

## Judge summaries

- **opus:** Manan wins narrowly, driven by decisive advantages on acronym and exact-paper resolution where Elicit suffered catastrophic wrong-domain failures (PARTNER 3 returning HIV papers, KEYNOTE-189 returning the wrong trials) and on broad-clinical queries where Manan surfaced landmark RCTs and current guidelines that Elicit replaced with generic reviews. Elicit was the stronger system on focused topical queries such as PICO, safety/adverse-event, mechanism, and the HFrEF/CKD overviews, where its results stayed tightly on-target while Manan drifted (HFpEF, off-class drugs) or diluted with tangential meta-analyses. The two are close overall, with Manan's edge resting on recall of named landmark trials and consistently cleaner identifier metadata.
- **codex:** Manan wins more queries overall, especially exact-paper, trial-acronym, guideline, long-term outcome, and several PICO/systematic-review searches, largely because it provides cleaner metadata and fewer low-trust records. Elicit is stronger on some broad, recency, safety, and mechanism queries where citation-weighted ranking surfaces the most directly relevant review or landmark first, but it more often includes duplicates, null metadata, or off-target records.
- **deepseek:** Manan outperforms Elicit across most queries, particularly in metadata completeness, ranking of landmark papers, and inclusion of recent high-quality evidence. Elicit struggles with acronym resolution (e.g., PARTNER 3) and often includes older or less relevant entries. Manan wins 32 of 34 queries, with 2 ties.

## Notes per query (first judge with a note)

- **tavr-low-risk-6yr:** Elicit has both landmarks with PARTNER 3 ranked #1 and the Evolut 6-year #2; Manan has the 6-year paper but omits PARTNER 3 entirely.
- **exact-dapa-hf:** Both return the exact DAPA-HF paper at #1, but Manan's supporting top-10 is all landmark-quality trials while Elicit includes null-id and zero-cite filler items.
- **recency-lecanemab:** Both lead with CLARITY-AD and both capture the open-label extension; Manan adds genuinely newer 2025-2026 real-world/PET follow-ups fitting the recency intent, while Elicit ends with a junk 'Developing Topics' entry.
- **pico-sglt2-cv-mortality:** Elicit's top 10 are uniformly SGLT2i CV-outcome/mortality meta-analyses matching the PICO, whereas Manan drifts to kidney outcomes and includes an off-target oral-semaglutide (GLP-1) trial.
- **guideline-af-esc:** Manan ranks the canonical ESC 2016/2020/2024 AF guidelines (incl. the newest) in its top three; Elicit clutters with duplicate regional re-publications and buries the 2024 guideline at #9.
- **compare-doac-vs-warfarin:** Manan's #1-2 network meta-analyses are the strongest single items but it drifts to device/Watchman/asundexian topics, while Elicit is more uniformly on-comparison but opens with a predatory null-journal entry.
- **exact-recovery-dex:** Manan places the canonical RECOVERY dexamethasone NEJM paper at #1 with a clean list; Elicit leads with the medRxiv preprint and includes a dubious 'Romanian Archives' duplicate at #3.
- **exact-keynote-189:** Both nail the exact KEYNOTE-189 paper at #1, but Manan's remaining items are all relevant pembrolizumab-NSCLC trials while Elicit mixes in a NEJM Journal Watch and a null-id entry.
- **acronym-dapa-hf:** Manan includes the primary DAPA-HF NEJM trial (at #7) plus many genuine substudies; Elicit omits the primary trial paper entirely from its top 10.
- **acronym-partner-3:** Manan resolves PARTNER 3 to the TAVR trial with the NEJM primary plus follow-ups despite three off-topic contaminants, whereas Elicit catastrophically returns the wrong-domain HIV PARTNER study and never finds the TAVR trial.
- **acronym-keynote-189:** Manan's list is all correct KEYNOTE-189 papers including the NEJM primary, while Elicit is contaminated with the wrong KEYNOTE trials (590, 859, 789, 495) and lacks the primary.
- **acronym-sprint:** Both omit a clean original 2015 SPRINT paper, but Elicit ranks the 2021 Final Report at #1 whereas Manan buries it at #7 and its #5 'SPRINT' entry is a NEJM correspondence rather than the trial.
- **broad-hfref-management:** Elicit returns ten on-topic HFrEF management reviews/guides, while Manan is heavily contaminated with HFpEF papers (TOPCAT, SPIRRIT-HFpEF, HFpEF cohorts) for an HFrEF query.
- **broad-cap-treatment:** Manan holds the full ATS/IDSA 2019 guideline but only at #5 behind dated narrow antibiotic RCTs, while Elicit leads with current guideline-level reviews (JAMA 2020) more aligned with a management overview.
- **broad-af-anticoagulation:** Manan surfaces landmark DOAC RCTs (ROCKET-AF, ARISTOTLE) plus the ESC guideline and a JAMA review, whereas Elicit returns only generic narrative reviews with no landmark trials or guidelines.
- **pico-egdt-septic-shock:** Both retrieve all three EGDT trials (ProCESS/ARISE/ProMISe) plus the pooled meta-analyses, but Manan ranks the syntheses and NEJM RCTs cleanly at top while Elicit leads with a low-cite CJEM piece.
- **pico-oxygen-icu:** Both lead with the Oxygen-ICU JAMA trial; Manan adds the ICU-ROX NEJM RCT while Elicit adds the high-impact IOTA Lancet meta-analysis, leaving them roughly even.
- **recency-semaglutide-cv-2025:** Manan is newer but dilutes with GLP-1-class NMAs and tirzepatide/HFpEF noise that are not semaglutide-CV-specific, while Elicit anchors on the pivotal SELECT trial and stays on-topic.
- **recency-cart-myeloma:** Manan leads with the newest 2025 BCMA CAR-T meta-analysis but mixes in off-topic lymphoma/microRNA reviews, while Elicit is more uniformly myeloma-CAR-T but older and review-heavy.
- **sr-statins-primary-prevention:** Both include the Cochrane SR, but Manan leads with a higher-quality 94k-participant network MA and a recent BMJ adverse-events SR with clean metadata, while Elicit relies on older entries with several missing IDs.
- **sr-sglt2-hf-hospitalization:** Manan's top items are high-impact Lancet/JAMA SGLT2-HF meta-analyses directly on hospitalization, whereas Elicit's on-topic MAs sit largely in lower-tier journals (Cureus, Cardiol Res Pract).
- **sr-cochrane-steroids-sepsis:** Both surface the Cochrane reviews, but Elicit ranks three Cochrane editions plus the major JAMA Internal Medicine 2019 meta-analysis higher, while Manan spends two slots on protocols.
- **guideline-aortic-stenosis:** Manan ranks the current 2020 ACC/AHA valvular guideline and 2017 focused update highest, while Elicit leads with the superseded 2014 guideline.
- **guideline-kdigo-ckd:** Elicit tightly focuses its top results on the KDIGO 2024 CKD evaluation/management guideline plus commentaries, while Manan spreads across adjacent KDIGO topics (transplant, ADPKD, anemia, MBD).
- **lto-bariatric-diabetes:** Manan includes the STAMPEDE 5-year landmark RCT plus the JAMA long-term and Lancet survival meta-analyses, whereas Elicit returns strong meta-analyses but lacks a landmark long-term RCT.
- **lto-pci-vs-cabg-left-main:** Both are excellent on long-term left-main data; Manan leads with the Lancet IPD meta-analysis plus SYNTAX/PRECOMBAT 10-year RCTs, while Elicit prominently features EXCEL 5-year, leaving them comparable.
- **lto-dapa-ckd:** Both surface the DAPA-CKD NEJM primary plus long-term analyses; Elicit ranks the primary #1 and adds a longer-term modeling paper but includes one off-topic CBT/arthritis entry, while Manan is all on-topic with the primary at #3.
- **safety-vaccine-myocarditis:** Elicit better matches the 'young males' intent with a young-males-specific systematic review and the 23-million-resident Nordic cohort, while Manan's strong cohorts are slightly less targeted.
- **safety-glp1-pancreatitis:** Every Elicit result addresses GLP-1/incretin pancreatitis risk, whereas Manan dilutes its top slots with off-target GLP-1 cardiovascular/renal outcome meta-analyses.
- **safety-sglt2-dka:** Elicit leads with the landmark NEJM DKA-after-SGLT2-initiation cohort and stays DKA-focused (despite one off-topic pembrolizumab entry), while Manan opens with a broad CVOT meta-analysis and drifts to frailty/preop topics.
- **safety-fluoroquinolone-aneurysm:** Both retrieve the seminal 2015 JAMA-IM case-control and BMJ nationwide cohort plus SR/MAs; Manan additionally shows balance with a null/negative Eur Heart J cohort and a 2025 network study.
- **compare-tirzepatide-semaglutide:** Manan returns both pivotal head-to-head RCTs (SURPASS-2 and SURMOUNT-5) plus the JAMA-IM real-world study, whereas Elicit has SURMOUNT-5 but lacks SURPASS-2 and fills the rest with lower-tier meta-analyses.
- **compare-ticagrelor-clopidogrel:** Both place the PLATO primary NEJM trial at #1 with relevant substudies; Manan offers slightly more PLATO follow-ups and a 2025 RCT while Elicit includes an off-topic ticagrelor-vs-prasugrel meta-analysis.
- **mechanism-sglt2-cardioprotection:** All ten Elicit results are SGLT2 cardioprotection mechanism reviews/translational studies, whereas Manan's strong Packer Circulation lead is undercut by two off-topic entries (a T2D treatment NMA and a dementia meta-analysis).