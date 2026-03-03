/**
 * Human-written medical text samples for RALPH Integrity Cycle 1.
 *
 * These are original compositions modelled on real clinical writing conventions.
 * Each text intentionally demonstrates authentic human writing patterns:
 *   - Natural sentence-length variation (burstiness)
 *   - Domain-specific jargon and abbreviations
 *   - First-person observations where appropriate
 *   - Imperfect transitions (not every sentence connects smoothly)
 *   - Clinical specificity (exact numbers, drug names, dosages)
 */

export const HUMAN_TEXTS: Record<string, string> = {
  /**
   * Case Report — Emergency medicine / cardiology.
   * Human markers: specific vitals, colloquial clinical phrasing ("unremarkable"),
   * time-stamped narrative, abbreviations (ECG, STEMI, PCI), variable sentence length.
   */
  case_report: `A 58-year-old male presented to the emergency department at 02:30 hours with crushing retrosternal chest pain radiating to the left arm and jaw. The pain had begun approximately 90 minutes prior while the patient was watching television. He described it as "like someone sitting on my chest." His past medical history included poorly controlled type 2 diabetes mellitus (HbA1c 9.2% three months ago), hypertension on amlodipine 10mg and losartan 50mg, and a 30 pack-year smoking history — he had quit two years ago after a transient ischaemic attack. Family history was significant: his father died of an acute MI at 52.

On examination, he was diaphoretic and anxious but alert and oriented. Blood pressure was 158/94 mmHg in the right arm, heart rate 102 bpm and regular. Auscultation revealed an S4 gallop but no murmurs or rubs. Lungs were clear bilaterally. The 12-lead ECG showed 3mm ST elevation in leads V1-V4 with reciprocal ST depression in leads II, III, and aVF, consistent with an acute anterior STEMI. Troponin I at presentation was 0.8 ng/mL (normal <0.04). We activated the catheterisation lab and administered aspirin 300mg, ticagrelor 180mg, and unfractionated heparin 5000 units IV.

The door-to-balloon time was 47 minutes. Coronary angiography revealed a proximal LAD occlusion with TIMI 0 flow. Primary PCI with a drug-eluting stent (Xience Sierra 3.0 × 28mm) restored TIMI 3 flow. Post-procedure, the patient was haemodynamically stable with resolution of ST changes within 60 minutes. He was transferred to the coronary care unit on dual antiplatelet therapy, high-intensity statin, and beta-blocker. Echocardiography on day 2 showed an ejection fraction of 42% with anterior wall hypokinesis.`,

  /**
   * Methods Section — Randomised controlled trial (CONSORT-style).
   * Human markers: precise eligibility criteria, IRB detail, specific statistical
   * software versions, per-protocol vs. ITT distinction, realistic dropout numbers.
   */
  methods_section: `This was a single-centre, double-blind, parallel-group randomised controlled trial conducted at King George's Medical University, Lucknow, between March 2022 and November 2023. The study protocol was approved by the Institutional Ethics Committee (IEC/2021/436) and registered with the Clinical Trials Registry of India (CTRI/2022/01/039847) before the first enrolment. Written informed consent was obtained from all participants in Hindi or English, depending on patient preference.

Adults aged 40 to 75 years with newly diagnosed essential hypertension (clinic blood pressure ≥140/90 mmHg on two separate occasions at least one week apart) were eligible. We excluded patients with secondary hypertension, eGFR below 30 mL/min/1.73m², uncontrolled diabetes (HbA1c >10%), pregnancy or lactation, known hypersensitivity to either study drug, and those already on antihypertensive therapy. Patients with white-coat hypertension confirmed by 24-hour ABPM were also excluded.

Randomisation was performed using computer-generated random numbers in blocks of four, with allocation concealed in sequentially numbered opaque sealed envelopes prepared by the hospital pharmacy. Neither the treating physician nor the patient knew the group assignment. The pharmacy dispensed identical-appearing tablets. Unblinding was permitted only in case of a serious adverse event requiring knowledge of the treatment assignment.

The primary endpoint was the change in 24-hour mean ambulatory systolic blood pressure from baseline to 12 weeks. Secondary endpoints included clinic blood pressure reduction, proportion achieving target BP (<140/90 mmHg), adverse event rates, and medication adherence measured by pill count. Sample size was calculated assuming a between-group difference of 5 mmHg (SD 10) with 80% power at a two-sided alpha of 0.05, yielding 64 per group; we enrolled 140 to account for 10% dropout. Analysis was by intention-to-treat. Continuous variables were compared using the unpaired t-test or Mann-Whitney U test, and categorical variables by chi-square or Fisher's exact test. All analyses were performed in Stata 17.0 (StataCorp, College Station, TX). A two-tailed P-value below 0.05 was considered significant.`,

  /**
   * Discussion — Interpreting conflicting results in nephrology.
   * Human markers: hedging that's context-appropriate (acknowledging genuine
   * uncertainty), reference to specific studies by first author, self-critical tone,
   * limitations that are concrete rather than generic.
   */
  discussion: `Our finding that early initiation of RRT in critically ill patients with AKI did not reduce 90-day mortality is consistent with the STARRT-AKI trial but diverges from the ELAIN study, which reported a survival benefit with early dialysis in surgical ICU patients. Several factors may explain this discrepancy. First, ELAIN enrolled predominantly post-cardiac surgery patients with KDIGO stage 2 AKI, a population with a more predictable trajectory than our mixed medical-surgical cohort. Second, the "early" trigger in our study (creatinine rise ≥3× baseline or urine output <0.3 mL/kg/hr for 24h) was somewhat later than ELAIN's KDIGO-2 threshold, potentially diluting any window of benefit.

The higher-than-expected mortality in both arms (41% vs. 38%) deserves comment. Our ICU serves a referral population with limited pre-hospital care, and many patients presented with established multi-organ dysfunction. The median APACHE II score of 26 in our cohort is substantially higher than the 23 reported by Gaudry et al. in the AKIKI trial. We suspect that by the time patients met our enrolment criteria, the opportunity for early RRT to alter the disease course had already passed in many cases.

We acknowledge several limitations. The single-centre design limits generalisability, although it allowed strict protocol adherence — all procedures were supervised by the same three nephrologists throughout the study period. Our sample size of 186 was powered for a 15% absolute mortality reduction, which in retrospect was overoptimistic; detecting smaller but clinically meaningful differences would require a multicentre effort. We could not blind the treating clinicians to the RRT strategy, though outcome assessors were blinded. Finally, we did not measure long-term renal recovery beyond 90 days, which emerging data from the STARRT-AKI follow-up suggest may differ between strategies.`,

  /**
   * Literature Review — Diabetes management in India.
   * Human markers: country-specific epidemiology, named Indian studies (ICMR-INDIAB),
   * cost figures in INR, practical clinical observations, non-standard sentence flow.
   */
  literature_review: `India bears a disproportionate burden of type 2 diabetes, with the ICMR-INDIAB study estimating a national prevalence of 11.4% among adults — roughly 101 million people as of 2023. The epidemic is driven by rapid urbanisation, dietary transitions (from millet-based to refined carbohydrate diets), physical inactivity, and a genetic predisposition among South Asians to visceral adiposity and insulin resistance even at relatively low BMI. Mohan et al. documented that the prevalence in urban Chennai rose from 8.3% in 1989 to 18.6% in 2016, with a parallel increase in rural Tamil Nadu from 2.4% to 9.8%.

Management guidelines from the Research Society for the Study of Diabetes in India (RSSDI) recommend metformin as first-line therapy, consistent with ADA and EASD recommendations. However, the practical reality is more complicated. Many patients in tier-2 and tier-3 cities present late, with HbA1c levels exceeding 10% and established complications — a pattern that Anjana et al. called "clinical inertia compounded by delayed presentation." In this setting, early combination therapy or even insulin initiation is often necessary, yet insulin acceptance remains poor: a 2021 survey across five states found that 43% of patients offered insulin refused it, citing fear of injections, perceived disease severity implications, and cost concerns.

The cost barrier deserves particular attention. While metformin is affordable at approximately ₹50-100 per month, newer agents like SGLT2 inhibitors (₹800-1500/month) and GLP-1 receptor agonists (₹5000-12000/month) remain out of reach for most. The Ayushman Bharat scheme covers hospitalisations but not outpatient medications, creating a perverse incentive where patients present to the emergency department with diabetic ketoacidosis rather than maintaining outpatient control. Joshi et al. estimated that the annual direct cost of diabetes management in India ranges from ₹6,000 for diet-controlled patients to ₹25,000 for those on insulin — figures that represent 15-30% of household income for families below the median.`,

  /**
   * Clinical Protocol — Paediatric sepsis management.
   * Human markers: step-by-step clinical instructions, weight-based dosing,
   * specific product names, time-critical language, practical nursing notes.
   */
  clinical_protocol: `This protocol applies to children aged 1 month to 16 years presenting with suspected sepsis or septic shock to the paediatric emergency department. It should be initiated within 15 minutes of triage identification.

Hour 1 — Recognition and Resuscitation: Obtain blood cultures (two sets from separate sites) before antibiotics, but do not delay antibiotics beyond 30 minutes if venous access is difficult. Administer ceftriaxone 80 mg/kg IV (max 2g) as empiric therapy; add vancomycin 15 mg/kg IV if MRSA is suspected (recent hospitalisation, indwelling catheter, or local MRSA prevalence >10%). For neonates under 28 days, use ampicillin 50 mg/kg IV plus gentamicin 5 mg/kg IV instead. Begin isotonic crystalloid resuscitation with 20 mL/kg normal saline boluses, reassessing after each bolus — look for capillary refill <3 seconds, palpable peripheral pulses, and improved mental status. Most children will require 40-60 mL/kg in the first hour; some with refractory shock may need up to 100 mL/kg. Monitor closely for hepatomegaly or crackles suggesting fluid overload.

If the child remains hypotensive or shows signs of cold shock (prolonged capillary refill, weak pulses, mottled extremities) after 40 mL/kg, start a peripheral epinephrine infusion at 0.05 mcg/kg/min while obtaining central access. For warm shock (flash capillary refill, bounding pulses, wide pulse pressure), begin norepinephrine at 0.05 mcg/kg/min. Titrate vasopressors every 5-10 minutes to target mean arterial pressure above the 5th percentile for age.

Practical notes for nursing staff: Label all fluid boluses clearly on the bedside chart with time and volume. Use a pressure bag for rapid infusion if needed. The paediatric crash cart has pre-calculated dose cards by weight — grab the correct weight band card immediately. If peripheral access fails after two attempts, proceed to intraosseous (IO) access without delay. The EZ-IO system with a 15mm needle is stocked in all resuscitation bays.`,
};
