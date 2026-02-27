/**
 * Screening Accuracy Simulation Framework
 *
 * Validates AI screening performance against gold-standard labeled datasets.
 * Computes standard information retrieval metrics (sensitivity, specificity,
 * precision, recall, F1) plus systematic-review-specific metrics (WSS@95,
 * WSS@100) used to quantify work saved over manual screening.
 *
 * Designed for dependency injection — any screening function that accepts
 * (title, abstract) and returns a label can be benchmarked.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BenchmarkDataset {
  name: string;
  papers: {
    id: string;
    title: string;
    abstract: string;
    goldLabel: "include" | "exclude";
  }[];
}

export interface BenchmarkResult {
  datasetName: string;
  totalPapers: number;
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
  sensitivity: number; // recall for includes (TP / (TP + FN))
  specificity: number; // recall for excludes (TN / (TN + FP))
  precision: number; // TP / (TP + FP)
  recall: number; // same as sensitivity
  f1Score: number; // 2 * precision * recall / (precision + recall)
  wss95: number; // Work Saved over Sampling at 95% recall
  wss100: number; // Work Saved over Sampling at 100% recall
  reportText: string; // Generated methods section text
}

export type ScreeningDecision = "include" | "exclude" | "maybe";

export type ScreeningFunction = (
  title: string,
  abstract: string
) => Promise<ScreeningDecision>;

// ---------------------------------------------------------------------------
// Core metrics computation (pure, synchronous)
// ---------------------------------------------------------------------------

/**
 * Compute confusion matrix metrics from parallel prediction / gold-label arrays.
 *
 * "maybe" predictions are treated as "include" (conservative — avoids missing
 * relevant studies, which is the standard in systematic review methodology).
 */
export function computeMetrics(
  predictions: ScreeningDecision[],
  goldLabels: ("include" | "exclude")[]
): Omit<BenchmarkResult, "datasetName" | "totalPapers" | "wss95" | "wss100" | "reportText"> {
  if (predictions.length !== goldLabels.length) {
    throw new Error(
      `Predictions length (${predictions.length}) does not match gold labels length (${goldLabels.length})`
    );
  }

  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;

  for (let i = 0; i < predictions.length; i++) {
    // "maybe" is treated as "include" (conservative for systematic reviews)
    const predicted =
      predictions[i] === "exclude" ? "exclude" : "include";
    const gold = goldLabels[i];

    if (predicted === "include" && gold === "include") tp++;
    else if (predicted === "include" && gold === "exclude") fp++;
    else if (predicted === "exclude" && gold === "exclude") tn++;
    else if (predicted === "exclude" && gold === "include") fn++;
  }

  const sensitivity = tp + fn === 0 ? 0 : tp / (tp + fn);
  const specificity = tn + fp === 0 ? 0 : tn / (tn + fp);
  const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
  const recall = sensitivity;
  const f1Score =
    precision + recall === 0
      ? 0
      : (2 * precision * recall) / (precision + recall);

  return {
    truePositives: tp,
    falsePositives: fp,
    trueNegatives: tn,
    falseNegatives: fn,
    sensitivity,
    specificity,
    precision,
    recall,
    f1Score,
  };
}

// ---------------------------------------------------------------------------
// Work Saved over Sampling (WSS)
// ---------------------------------------------------------------------------

/**
 * WSS@X measures the proportion of papers a reviewer does NOT need to screen
 * while still achieving X% recall.
 *
 * Formula: WSS@X = (TN + FN) / N - (1 - X/100)
 *
 * A higher value means more work is saved. WSS@95 is the standard metric in
 * systematic review automation literature (Cohen et al., 2006).
 */
export function computeWSS(
  predictions: ScreeningDecision[],
  goldLabels: ("include" | "exclude")[],
  recallThreshold: number
): number {
  if (predictions.length !== goldLabels.length) {
    throw new Error(
      `Predictions length (${predictions.length}) does not match gold labels length (${goldLabels.length})`
    );
  }

  const n = predictions.length;
  if (n === 0) return 0;

  let tn = 0;
  let fn = 0;

  for (let i = 0; i < n; i++) {
    const predicted =
      predictions[i] === "exclude" ? "exclude" : "include";
    const gold = goldLabels[i];

    if (predicted === "exclude" && gold === "exclude") tn++;
    else if (predicted === "exclude" && gold === "include") fn++;
  }

  return (tn + fn) / n - (1 - recallThreshold / 100);
}

// ---------------------------------------------------------------------------
// Validation report generation
// ---------------------------------------------------------------------------

/**
 * Generate a methods-section-ready validation report summarizing benchmark
 * results. Suitable for inclusion in a systematic review manuscript.
 */
export function generateValidationReport(result: BenchmarkResult): string {
  const pct = (v: number) => (v * 100).toFixed(1);

  return [
    `Screening Validation Report: ${result.datasetName}`,
    `${"=".repeat(50)}`,
    ``,
    `Dataset: ${result.datasetName} (N = ${result.totalPapers} studies)`,
    ``,
    `Confusion Matrix:`,
    `  True Positives:  ${result.truePositives}`,
    `  False Positives: ${result.falsePositives}`,
    `  True Negatives:  ${result.trueNegatives}`,
    `  False Negatives: ${result.falseNegatives}`,
    ``,
    `Performance Metrics:`,
    `  Sensitivity (Recall): ${pct(result.sensitivity)}%`,
    `  Specificity:          ${pct(result.specificity)}%`,
    `  Precision:            ${pct(result.precision)}%`,
    `  F1 Score:             ${pct(result.f1Score)}%`,
    ``,
    `Work Saved over Sampling:`,
    `  WSS@95:  ${pct(result.wss95)}%`,
    `  WSS@100: ${pct(result.wss100)}%`,
    ``,
    `Methods Section Text:`,
    `---`,
    `The AI-assisted screening tool was validated against the ${result.datasetName} ` +
      `benchmark dataset comprising ${result.totalPapers} studies. ` +
      `The tool achieved a sensitivity of ${pct(result.sensitivity)}% ` +
      `and specificity of ${pct(result.specificity)}%, ` +
      `with a precision of ${pct(result.precision)}% ` +
      `and F1 score of ${pct(result.f1Score)}%. ` +
      `Work Saved over Sampling at 95% recall (WSS@95) was ${pct(result.wss95)}%, ` +
      `indicating the proportion of papers that could be safely excluded ` +
      `without manual review while maintaining 95% recall of relevant studies. ` +
      `WSS@100 was ${pct(result.wss100)}%.`,
    `---`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Run full benchmark
// ---------------------------------------------------------------------------

/**
 * Run a screening function against a labeled benchmark dataset and compute
 * all validation metrics.
 *
 * The screening function receives (title, abstract) and returns a decision.
 * "maybe" decisions are treated as "include" (conservative).
 *
 * @param dataset - Gold-standard labeled dataset
 * @param screeningFn - The screening function to benchmark
 * @param onProgress - Optional progress callback (completed, total)
 */
export async function runBenchmark(
  dataset: BenchmarkDataset,
  screeningFn: ScreeningFunction,
  onProgress?: (completed: number, total: number) => void
): Promise<BenchmarkResult> {
  const predictions: ScreeningDecision[] = [];
  const goldLabels: ("include" | "exclude")[] = [];

  // Screen each paper sequentially to avoid overwhelming rate limits
  for (let i = 0; i < dataset.papers.length; i++) {
    const paper = dataset.papers[i];
    const decision = await screeningFn(paper.title, paper.abstract);
    predictions.push(decision);
    goldLabels.push(paper.goldLabel);
    onProgress?.(i + 1, dataset.papers.length);
  }

  const metrics = computeMetrics(predictions, goldLabels);
  const wss95 = computeWSS(predictions, goldLabels, 95);
  const wss100 = computeWSS(predictions, goldLabels, 100);

  const result: BenchmarkResult = {
    datasetName: dataset.name,
    totalPapers: dataset.papers.length,
    ...metrics,
    wss95,
    wss100,
    reportText: "", // placeholder — filled below
  };

  result.reportText = generateValidationReport(result);

  return result;
}

// ---------------------------------------------------------------------------
// Built-in Cohen-style test dataset
// ---------------------------------------------------------------------------

/**
 * A small synthetic dataset modeled after the Cohen et al. (2006) benchmark
 * structure. Contains 50 papers with known include/exclude labels across
 * a hypothetical drug efficacy systematic review.
 *
 * This dataset is intended for quick smoke-testing of screening functions,
 * NOT for publication-grade validation. For real validation, use actual
 * benchmark datasets (e.g., CLEF eHealth, SWIFT, or Cohen datasets).
 */
export function createCohenDataset(): BenchmarkDataset {
  return {
    name: "Cohen-style Synthetic Benchmark (N=50)",
    papers: [
      // --- Includes (20 papers) — RCTs of drug X for condition Y ---
      {
        id: "C001",
        title: "Randomized controlled trial of Drug X versus placebo in patients with Type 2 Diabetes",
        abstract:
          "We conducted a double-blind RCT of 200 patients with T2DM. Participants were randomized to Drug X (100mg daily) or placebo for 12 weeks. Primary outcome was HbA1c reduction. Drug X significantly reduced HbA1c by 1.2% (95% CI: 0.8-1.6, p<0.001).",
        goldLabel: "include",
      },
      {
        id: "C002",
        title: "Efficacy and safety of Drug X in a multicenter randomized trial",
        abstract:
          "A phase III multicenter RCT enrolled 500 adults with T2DM. Drug X 50mg and 100mg were compared with placebo. Both doses achieved significant HbA1c reductions at 24 weeks. Adverse events were comparable across groups.",
        goldLabel: "include",
      },
      {
        id: "C003",
        title: "Drug X monotherapy versus metformin: a head-to-head randomized comparison",
        abstract:
          "This randomized non-inferiority trial compared Drug X 100mg with metformin 1000mg in treatment-naive T2DM patients (n=300). Drug X was non-inferior for HbA1c reduction at 52 weeks (difference: 0.1%, 95% CI: -0.2 to 0.4).",
        goldLabel: "include",
      },
      {
        id: "C004",
        title: "Long-term cardiovascular outcomes with Drug X: the CARDIO-X randomized trial",
        abstract:
          "We randomized 8000 T2DM patients with established cardiovascular disease to Drug X or placebo. Over a median follow-up of 3.2 years, Drug X reduced major adverse cardiovascular events (HR 0.86, 95% CI: 0.78-0.95).",
        goldLabel: "include",
      },
      {
        id: "C005",
        title: "A randomized crossover study of Drug X in elderly patients with diabetes",
        abstract:
          "Crossover RCT of 80 patients aged >65 with T2DM. Drug X 50mg was compared with placebo in two 12-week periods. Drug X improved fasting glucose and was well-tolerated in this elderly population.",
        goldLabel: "include",
      },
      {
        id: "C006",
        title: "Combination therapy with Drug X and insulin glargine: a randomized factorial trial",
        abstract:
          "Factorial design RCT (n=400) evaluating Drug X 100mg, insulin glargine, both, or placebo in T2DM patients inadequately controlled on metformin. Combination therapy produced the greatest HbA1c reduction (-1.8%).",
        goldLabel: "include",
      },
      {
        id: "C007",
        title: "Drug X for prevention of diabetes progression: randomized controlled trial",
        abstract:
          "Double-blind RCT enrolling 1200 prediabetic adults. Participants received Drug X 50mg or placebo for 3 years. Drug X reduced progression to T2DM by 38% (HR 0.62, p=0.003).",
        goldLabel: "include",
      },
      {
        id: "C008",
        title: "Renal outcomes with Drug X in diabetic nephropathy: the RENAL-X trial",
        abstract:
          "Randomized trial of 3000 T2DM patients with eGFR 30-60. Drug X slowed eGFR decline (difference: 2.1 mL/min/1.73m2/year, p<0.001) and reduced albuminuria progression.",
        goldLabel: "include",
      },
      {
        id: "C009",
        title: "Safety and tolerability of Drug X: pooled analysis of 6 randomized controlled trials",
        abstract:
          "Pooled analysis of individual patient data from 6 RCTs (n=3200). Drug X had a favorable safety profile with no increased risk of hypoglycemia. Most common adverse events were gastrointestinal (8.2% vs 5.1% placebo).",
        goldLabel: "include",
      },
      {
        id: "C010",
        title: "Drug X versus empagliflozin in T2DM: a randomized double-blind trial",
        abstract:
          "Head-to-head RCT comparing Drug X 100mg with empagliflozin 25mg in 450 T2DM patients. Both agents achieved similar HbA1c reductions. Drug X showed superior weight loss (-3.2 kg vs -2.1 kg, p=0.02).",
        goldLabel: "include",
      },
      {
        id: "C011",
        title: "Dose-ranging study of Drug X in type 2 diabetes: a phase II randomized trial",
        abstract:
          "Phase II dose-ranging RCT tested Drug X at 25mg, 50mg, 100mg, and 200mg versus placebo in 250 T2DM patients over 12 weeks. Dose-dependent HbA1c reductions were observed. The 100mg dose had optimal efficacy-safety balance.",
        goldLabel: "include",
      },
      {
        id: "C012",
        title: "Drug X add-on to sulfonylurea therapy: a randomized placebo-controlled study",
        abstract:
          "RCT of 180 T2DM patients on stable sulfonylurea doses. Adding Drug X 100mg reduced HbA1c by 0.9% versus placebo at 24 weeks without increased hypoglycemia risk.",
        goldLabel: "include",
      },
      {
        id: "C013",
        title: "Patient-reported outcomes with Drug X treatment: results from a randomized trial",
        abstract:
          "Pre-specified secondary analysis of a 52-week RCT (n=600). Drug X improved diabetes-specific quality of life scores (DQOL: +8.3 vs +2.1, p<0.001) and treatment satisfaction compared to placebo.",
        goldLabel: "include",
      },
      {
        id: "C014",
        title: "Drug X in Asian patients with type 2 diabetes: a randomized controlled trial",
        abstract:
          "Multicenter RCT in Japan, Korea, and China (n=350). Drug X 50mg and 100mg both significantly reduced HbA1c in Asian T2DM patients. Efficacy was consistent with global trial results.",
        goldLabel: "include",
      },
      {
        id: "C015",
        title: "Glycemic durability of Drug X: 2-year extension of a randomized trial",
        abstract:
          "Two-year open-label extension of a 24-week RCT. Drug X maintained HbA1c reductions through 120 weeks. Sustained glycemic control was observed in 68% of participants without additional therapy.",
        goldLabel: "include",
      },
      {
        id: "C016",
        title: "Drug X for gestational diabetes: a pilot randomized controlled trial",
        abstract:
          "Pilot RCT of 60 women with gestational diabetes randomized to Drug X 50mg or insulin. Drug X achieved non-inferior glycemic control with fewer hypoglycemic episodes. Neonatal outcomes were similar.",
        goldLabel: "include",
      },
      {
        id: "C017",
        title: "Effects of Drug X on beta-cell function: a randomized mechanistic study",
        abstract:
          "Mechanistic RCT in 100 early T2DM patients. Drug X improved HOMA-B by 25% versus placebo at 16 weeks. Clamp studies confirmed enhanced insulin secretion and reduced glucagon response.",
        goldLabel: "include",
      },
      {
        id: "C018",
        title: "Drug X versus DPP-4 inhibitors: network meta-analysis of randomized trials",
        abstract:
          "Systematic review and network meta-analysis of 15 RCTs comparing Drug X with DPP-4 inhibitors. Drug X showed superior HbA1c reduction (MD: -0.3%, 95% CrI: -0.5 to -0.1) and weight loss.",
        goldLabel: "include",
      },
      {
        id: "C019",
        title: "Hepatic outcomes with Drug X in T2DM with NAFLD: a randomized trial",
        abstract:
          "RCT of 200 T2DM patients with biopsy-confirmed NAFLD. Drug X 100mg reduced liver fat content by 35% versus 8% with placebo (p<0.001). ALT normalized in 52% of Drug X patients.",
        goldLabel: "include",
      },
      {
        id: "C020",
        title: "Drug X in adolescents with type 2 diabetes: randomized controlled trial",
        abstract:
          "First pediatric RCT of Drug X in 120 adolescents (12-17 years) with T2DM. Drug X 50mg reduced HbA1c by 0.8% versus placebo. Growth and pubertal development were unaffected.",
        goldLabel: "include",
      },

      // --- Excludes (30 papers) — wrong study design, population, or topic ---
      {
        id: "C021",
        title: "Prevalence of type 2 diabetes in urban populations: a cross-sectional survey",
        abstract:
          "Cross-sectional survey of 10000 adults in metropolitan areas. T2DM prevalence was 12.3%. Risk factors included obesity, family history, and sedentary lifestyle. No interventions were evaluated.",
        goldLabel: "exclude",
      },
      {
        id: "C022",
        title: "Pathophysiology of insulin resistance in type 2 diabetes: a narrative review",
        abstract:
          "This narrative review summarizes current understanding of insulin resistance mechanisms in T2DM, including hepatic glucose production, adipose tissue dysfunction, and skeletal muscle metabolism.",
        goldLabel: "exclude",
      },
      {
        id: "C023",
        title: "Case report: severe hypoglycemia with Drug X in a patient with renal failure",
        abstract:
          "We report a 72-year-old male with CKD stage 5 who developed severe hypoglycemia after initiating Drug X. This case highlights the need for dose adjustment in advanced renal impairment.",
        goldLabel: "exclude",
      },
      {
        id: "C024",
        title: "Economic burden of type 2 diabetes: a systematic review of cost-of-illness studies",
        abstract:
          "Systematic review of 45 cost-of-illness studies. Direct medical costs of T2DM ranged from $1500-$9000 per patient per year across different healthcare systems.",
        goldLabel: "exclude",
      },
      {
        id: "C025",
        title: "Drug Y for type 2 diabetes: a randomized controlled trial",
        abstract:
          "RCT of Drug Y (not Drug X) in 300 T2DM patients. Drug Y 200mg reduced HbA1c by 0.7% versus placebo at 24 weeks. This trial did not include any Drug X treatment arms.",
        goldLabel: "exclude",
      },
      {
        id: "C026",
        title: "Lifestyle intervention versus metformin in prediabetes: the DPP study revisited",
        abstract:
          "Secondary analysis of the Diabetes Prevention Program. Intensive lifestyle intervention reduced T2DM incidence by 58%. Metformin reduced incidence by 31%. Neither arm included Drug X.",
        goldLabel: "exclude",
      },
      {
        id: "C027",
        title: "Animal model of Drug X pharmacokinetics in diabetic rats",
        abstract:
          "Preclinical study in streptozotocin-induced diabetic rats. Drug X demonstrated dose-proportional pharmacokinetics with a half-life of 4.2 hours. Oral bioavailability was 62%.",
        goldLabel: "exclude",
      },
      {
        id: "C028",
        title: "In vitro binding affinity of Drug X to target receptor",
        abstract:
          "Cell-based assay measuring Drug X binding kinetics. IC50 was 12nM for the target receptor. Selectivity over related receptors was >100-fold. No clinical data presented.",
        goldLabel: "exclude",
      },
      {
        id: "C029",
        title: "Patient perspectives on diabetes medication adherence: a qualitative study",
        abstract:
          "Qualitative interview study of 30 T2DM patients exploring barriers and facilitators to medication adherence. Themes included side effects, cost, and provider communication.",
        goldLabel: "exclude",
      },
      {
        id: "C030",
        title: "Drug X manufacturer stock analysis and market forecast 2024-2030",
        abstract:
          "Financial analysis of Drug X market performance. Projected global sales of $3.2 billion by 2028. Competitor landscape and patent cliff analysis included.",
        goldLabel: "exclude",
      },
      {
        id: "C031",
        title: "Retrospective cohort study of Drug X outcomes in clinical practice",
        abstract:
          "Retrospective analysis of 2000 patients prescribed Drug X in a hospital system. HbA1c reduction was 0.9% at 6 months. This was not a randomized study.",
        goldLabel: "exclude",
      },
      {
        id: "C032",
        title: "Drug X: mechanism of action and pharmacological profile",
        abstract:
          "Review of Drug X pharmacology. Mechanism involves selective receptor modulation leading to enhanced insulin secretion. Discusses preclinical and early clinical data but no new trial data.",
        goldLabel: "exclude",
      },
      {
        id: "C033",
        title: "Diabetes management guidelines update 2024",
        abstract:
          "Clinical practice guideline update for T2DM management. Discusses positioning of various drug classes including Drug X. Based on consensus rather than new trial data.",
        goldLabel: "exclude",
      },
      {
        id: "C034",
        title: "Observational study of Drug X prescribing patterns in primary care",
        abstract:
          "Cross-sectional survey of 500 primary care physicians. 42% reported prescribing Drug X as second-line therapy. Factors influencing choice included formulary status and patient preference.",
        goldLabel: "exclude",
      },
      {
        id: "C035",
        title: "Genetic predictors of Drug X response: a pharmacogenomics study",
        abstract:
          "Post-hoc pharmacogenomic analysis of trial participants. SNPs in CYP2C9 and SLC22A1 were associated with Drug X response variability. No new efficacy data presented.",
        goldLabel: "exclude",
      },
      {
        id: "C036",
        title: "Drug X formulation development: extended-release tablet optimization",
        abstract:
          "Pharmaceutical sciences study on Drug X extended-release formulation. Various polymer matrices were tested. Optimal formulation achieved 24-hour drug release. No clinical outcomes.",
        goldLabel: "exclude",
      },
      {
        id: "C037",
        title: "Type 1 diabetes management with insulin pump therapy: a randomized trial",
        abstract:
          "RCT of insulin pump versus multiple daily injections in 150 Type 1 diabetes patients. Pump therapy improved HbA1c and reduced hypoglycemia. Wrong disease population (T1DM, not T2DM).",
        goldLabel: "exclude",
      },
      {
        id: "C038",
        title: "Drug X post-marketing surveillance report: first 5 years",
        abstract:
          "Post-marketing safety surveillance of Drug X covering 500000 patient-years. Rare hepatotoxicity signal identified (incidence 0.002%). Non-randomized surveillance data.",
        goldLabel: "exclude",
      },
      {
        id: "C039",
        title: "Editorial: the future of diabetes pharmacotherapy",
        abstract:
          "Editorial commentary discussing emerging diabetes therapies including Drug X. Expresses opinion on positioning but presents no new data or systematic analysis.",
        goldLabel: "exclude",
      },
      {
        id: "C040",
        title: "Conference abstract: preliminary results of Drug X in T2DM",
        abstract:
          "Conference abstract reporting interim 12-week results of an ongoing Drug X trial. Only 60 of planned 200 patients enrolled. Results are preliminary and incomplete.",
        goldLabel: "exclude",
      },
      {
        id: "C041",
        title: "Cost-effectiveness analysis of Drug X versus standard care for T2DM",
        abstract:
          "Health economic modeling study. Drug X had an ICER of $25000/QALY versus metformin. Model inputs derived from published trials. No new clinical efficacy data.",
        goldLabel: "exclude",
      },
      {
        id: "C042",
        title: "Drug X prescribing information and regulatory review",
        abstract:
          "Summary of FDA regulatory review and approved prescribing information for Drug X. Includes label indications, dosing, warnings, and clinical pharmacology summary.",
        goldLabel: "exclude",
      },
      {
        id: "C043",
        title: "Single-arm pilot study of Drug X in pancreatic cancer-related diabetes",
        abstract:
          "Open-label single-arm study of Drug X in 25 patients with diabetes secondary to pancreatic cancer. No control group. HbA1c improved by 0.6% at 8 weeks.",
        goldLabel: "exclude",
      },
      {
        id: "C044",
        title: "Meta-analysis of dietary interventions for type 2 diabetes",
        abstract:
          "Meta-analysis of 30 RCTs evaluating dietary modifications for T2DM. Low-carbohydrate diets showed greatest HbA1c reduction. No pharmacological interventions included.",
        goldLabel: "exclude",
      },
      {
        id: "C045",
        title: "Drug X and Drug Z interaction: a pharmacokinetic crossover study",
        abstract:
          "Pharmacokinetic interaction study in 12 healthy volunteers. Co-administration of Drug X and Drug Z did not significantly alter the AUC or Cmax of either agent. No efficacy outcomes.",
        goldLabel: "exclude",
      },
      {
        id: "C046",
        title: "Letter to the editor: concerns about Drug X trial methodology",
        abstract:
          "Correspondence raising methodological concerns about a published Drug X trial, including issues with randomization concealment and outcome ascertainment. No new data.",
        goldLabel: "exclude",
      },
      {
        id: "C047",
        title: "Telemedicine for diabetes management: a cluster randomized trial",
        abstract:
          "Cluster RCT of telemedicine-based diabetes management in 40 clinics. Telemedicine improved HbA1c by 0.4% versus usual care. No specific drug interventions evaluated.",
        goldLabel: "exclude",
      },
      {
        id: "C048",
        title: "Drug X synthesis and chemical characterization",
        abstract:
          "Organic chemistry study reporting a novel synthetic route for Drug X. Yield improved to 85% via palladium-catalyzed coupling. Purity confirmed by NMR and mass spectrometry.",
        goldLabel: "exclude",
      },
      {
        id: "C049",
        title: "Registry study: real-world effectiveness of Drug X in diverse populations",
        abstract:
          "Prospective registry of 5000 Drug X users across 50 sites. Real-world HbA1c reduction was 0.7% at 12 months. Observational design without randomization.",
        goldLabel: "exclude",
      },
      {
        id: "C050",
        title: "Erratum: correction to Drug X trial baseline characteristics table",
        abstract:
          "Published erratum correcting Table 1 baseline demographics in a previously published Drug X trial. Two values for BMI and age were transposed. No impact on trial conclusions.",
        goldLabel: "exclude",
      },
    ],
  };
}
