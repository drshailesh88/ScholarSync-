/**
 * psychiatry-prompts.ts
 * Psychiatry-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for psychiatric medicine including:
 * - Mood disorders (depression, bipolar)
 * - Anxiety disorders (GAD, panic, phobias, OCD)
 * - Psychotic disorders (schizophrenia spectrum)
 * - Trauma and stressor-related disorders (PTSD)
 * - Substance use disorders
 * - Personality disorders
 * - Neurodevelopmental disorders (ADHD, ASD)
 * - Eating disorders
 * - Sleep disorders
 * - Psychiatric medications
 * - Psychotherapy modalities
 * - Psychiatric emergencies
 *
 * Total: 25 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PSYCHIATRY DOMAIN PROMPT
// =============================================================================

/**
 * Base psychiatry domain prompt for mental health diagrams
 */
export const PSYCHIATRY_DOMAIN_PROMPT = `
Psychiatry diagram requirements:
- Use DSM-5 diagnostic criteria and terminology
- Follow APA treatment guidelines and algorithms
- Include validated assessment scales (PHQ-9, GAD-7, Y-BOCS, PANSS)
- Reference evidence-based psychotherapy modalities (CBT, DBT, PE, CPT)
- Use appropriate medication class terminology (SSRI, SNRI, SGA, TCA, MAOI)
- Include safety considerations (suicide risk, homicide risk, grave disability)
- Follow biopsychosocial model where applicable
- Include neurotransmitter systems (serotonin, dopamine, norepinephrine, GABA)
- Use color coding: Depression (Blue), Anxiety (Orange), Psychosis (Purple), Mania (Red), Normal/Recovery (Green)
- Reference therapeutic levels and monitoring requirements for mood stabilizers`;

// =============================================================================
// PSYCHIATRY-SPECIFIC PROMPTS
// =============================================================================

export const PSYCHIATRY_PROMPTS = {
  // Mood Disorders
  majorDepression: `
Major Depressive Disorder requirements:
- Include DSM-5 criteria (5+ symptoms, 2 weeks)
- Reference PHQ-9 severity scoring (5-9 mild, 10-14 moderate, 15-19 moderate-severe, 20+ severe)
- Show first-line SSRI selection pathway
- Include STAR*D algorithm for treatment-resistant depression
- Reference adequate trial duration (4-6 weeks)
- Include augmentation strategies (lithium, atypical antipsychotic, T3, bupropion)
- Show ECT/TMS/ketamine indications for refractory cases
- Include maintenance treatment duration (6-12 months first episode, longer if recurrent)`,

  bipolarDisorder: `
Bipolar Disorder requirements:
- Differentiate Bipolar I (mania) vs Bipolar II (hypomania)
- Include DIGFAST criteria for mania
- Reference mood stabilizer selection (lithium, valproate, lamotrigine)
- Show acute mania vs bipolar depression treatment differences
- Include lithium monitoring (levels 0.6-1.0, thyroid, renal)
- Reference SGAs with mood stabilizing properties (quetiapine, olanzapine, aripiprazole)
- Warn against antidepressant monotherapy risk of mood switching
- Include rapid cycling criteria (4+ episodes/year)`,

  // Anxiety Disorders
  generalizedAnxiety: `
Generalized Anxiety Disorder requirements:
- Include DSM-5 criteria (excessive worry, 6+ months)
- Reference GAD-7 severity scoring
- Show first-line treatment pathway (SSRI/SNRI + CBT)
- Include benzodiazepine role (short-term, adjunctive, not first-line)
- Reference buspirone as alternative
- Show CBT components (cognitive restructuring, relaxation, exposure)
- Include physical symptoms (muscle tension, restlessness, fatigue)
- Differentiate from other anxiety disorders`,

  panicDisorder: `
Panic Disorder requirements:
- Include unexpected panic attack definition
- Reference agoraphobia comorbidity
- Show cognitive model (catastrophic misinterpretation)
- Include interoceptive exposure therapy
- Reference SSRI as first-line pharmacotherapy
- Show acute panic attack management (reassurance, breathing, not benzos long-term)
- Include differential diagnosis (cardiac, thyroid, substance-induced)
- Reference frequency criteria for diagnosis`,

  ocdTreatment: `
Obsessive-Compulsive Disorder requirements:
- Differentiate obsessions (intrusive thoughts) from compulsions (rituals)
- Reference Y-BOCS severity scoring (8-15 mild, 16-23 moderate, 24-31 severe, 32+ extreme)
- Show ERP (Exposure and Response Prevention) as gold standard therapy
- Include high-dose SSRI requirement (fluoxetine 40-80mg, higher than depression)
- Reference 10-12 week adequate trial duration
- Show SGA augmentation for partial responders
- Include DBS/gamma knife for severe refractory cases
- Differentiate OCD from OCPD (personality disorder)`,

  // Psychotic Disorders
  schizophrenia: `
Schizophrenia Spectrum requirements:
- Include positive symptoms (delusions, hallucinations, disorganized thought/behavior)
- Include negative symptoms (avolition, anhedonia, alogia, flat affect, asociality)
- Reference first-episode psychosis workup (rule out substances, medical causes)
- Show antipsychotic selection (SGA preferred for metabolic profile)
- Include clozapine criteria for treatment-resistant (2 failed trials)
- Reference LAI (long-acting injectable) indications
- Show metabolic monitoring requirements (weight, glucose, lipids)
- Include cognitive and functional recovery goals`,

  firstEpisodePsychosis: `
First Episode Psychosis requirements:
- Include comprehensive medical workup (labs, tox, imaging)
- Reference DUP (duration of untreated psychosis) and prognosis
- Show low-dose antipsychotic initiation
- Include family psychoeducation importance
- Reference specialized early intervention programs
- Show differential diagnosis (substance-induced, brief psychotic, affective psychosis)
- Include prodromal symptoms identification
- Reference risk factors and family history`,

  // Trauma and Stressor-Related
  ptsdAssessment: `
PTSD Assessment requirements:
- Include Criterion A trauma definition
- Reference four symptom clusters (intrusions, avoidance, negative cognitions, hyperarousal)
- Show validated assessment tools (PCL-5, CAPS-5)
- Include duration criterion (>1 month)
- Differentiate acute stress disorder (<1 month) from PTSD
- Reference dissociative subtype criteria
- Show complex PTSD considerations
- Include functional impairment assessment`,

  traumaTherapy: `
Trauma-Focused Therapy requirements:
- Include first-line therapies (PE, CPT, EMDR)
- Reference PE components (imaginal exposure, in vivo exposure)
- Show CPT stuck points and cognitive restructuring
- Include EMDR bilateral stimulation protocol
- Reference SSRI role (sertraline, paroxetine FDA-approved)
- Show prazosin for nightmares
- Include contraindications and stabilization needs
- Reference ongoing safety concerns`,

  // Substance Use Disorders
  alcoholUseDisorder: `
Alcohol Use Disorder requirements:
- Include DSM-5 criteria (mild, moderate, severe)
- Reference CIWA-Ar for withdrawal severity
- Show medical detox protocol (benzodiazepines, thiamine)
- Include MAT options (naltrexone, acamprosate, disulfiram)
- Reference motivational interviewing approach
- Show Wernicke-Korsakoff prevention
- Include seizure and DT risk assessment
- Reference 12-step and mutual support groups`,

  opioidUseDisorder: `
Opioid Use Disorder requirements:
- Include MAT as gold standard (buprenorphine, methadone, XR-naltrexone)
- Reference buprenorphine induction protocol (COWS score)
- Show overdose reversal with naloxone
- Include harm reduction principles
- Reference pregnancy considerations (buprenorphine preferred)
- Show cognitive-behavioral relapse prevention
- Include social determinants and housing
- Reference stigma reduction in clinical settings`,

  // Personality Disorders
  borderlinePersonality: `
Borderline Personality Disorder requirements:
- Include DSM-5 criteria (5 of 9 features)
- Reference DBT as evidence-based treatment
- Show biosocial theory of emotional dysregulation
- Include chain analysis for self-harm behaviors
- Reference validation and change dialectic
- Show medication role (symptom-targeted, not curative)
- Include crisis management vs chronic suicidality
- Reference splitting and clinician self-care`,

  personalityClusters: `
Personality Disorders Classification requirements:
- Define Cluster A (odd/eccentric: paranoid, schizoid, schizotypal)
- Define Cluster B (dramatic/erratic: antisocial, borderline, histrionic, narcissistic)
- Define Cluster C (anxious/fearful: avoidant, dependent, OCPD)
- Include prevalence and comorbidity patterns
- Reference treatment approach by cluster
- Show insight capacity differences
- Include therapeutic alliance challenges
- Differentiate from Axis I disorders`,

  // Neurodevelopmental
  adhdAssessment: `
ADHD Assessment requirements:
- Include DSM-5 criteria (6+ symptoms, before age 12, two settings)
- Reference validated rating scales (Vanderbilt, Conners, ADHD-RS)
- Differentiate presentations (inattentive, hyperactive-impulsive, combined)
- Include adult ADHD considerations (symptom evolution)
- Reference executive function deficits
- Show differential diagnosis (anxiety, depression, bipolar, sleep, substance)
- Include functional impairment domains (academic, occupational, social)
- Reference neuropsychological testing indications`,

  adhdTreatment: `
ADHD Treatment requirements:
- Reference stimulant medications as first-line (methylphenidate, amphetamine)
- Include formulation considerations (IR, ER, prodrug)
- Show monitoring parameters (height, weight, HR, BP)
- Include non-stimulant options (atomoxetine, viloxazine, alpha-2 agonists)
- Reference behavioral therapy especially in children
- Show parent training and school accommodations
- Include cardiovascular screening considerations
- Reference diversion and misuse prevention`,

  autismSpectrum: `
Autism Spectrum Disorder requirements:
- Include core features (social communication, restricted/repetitive behaviors)
- Reference developmental screening tools (M-CHAT)
- Show comprehensive diagnostic evaluation components
- Include sensory sensitivities and preferences
- Reference evidence-based interventions (ABA, early intervention)
- Show comorbidity management (anxiety, ADHD, irritability)
- Include transition planning to adulthood
- Reference neurodiversity-affirming approaches`,

  // Eating Disorders
  anorexiaNervosa: `
Anorexia Nervosa requirements:
- Include restriction subtype vs binge-purge subtype
- Reference medical complications (bradycardia, electrolyte abnormalities, refeeding syndrome)
- Show level of care criteria (inpatient, residential, partial, outpatient)
- Include FBT (family-based treatment) for adolescents
- Reference weight restoration goals
- Show refeeding syndrome prevention (start low, go slow)
- Include bone density monitoring
- Reference high mortality rate among psychiatric disorders`,

  bulimiaAndBED: `
Bulimia Nervosa and BED requirements:
- Differentiate BN (compensatory behaviors) from BED (no compensation)
- Include CBT-BN and CBT-E as evidence-based treatments
- Reference fluoxetine for bulimia (60mg)
- Show lisdexamfetamine indication for BED
- Include medical complications of purging (dental, esophageal, electrolyte)
- Reference IPT as alternative therapy
- Show dietary counseling role
- Include relapse prevention strategies`,

  // Medications
  antidepressantSelection: `
Antidepressant Selection requirements:
- Compare SSRI, SNRI, TCA, MAOI, atypical classes
- Include side effect profiles (sexual dysfunction, weight, sedation)
- Reference first-line selection factors (efficacy, tolerability, drug interactions)
- Show cytochrome P450 considerations
- Include starting doses and titration schedules
- Reference serotonin syndrome recognition
- Show discontinuation syndrome prevention
- Include pregnancy and lactation considerations`,

  antipsychoticManagement: `
Antipsychotic Management requirements:
- Differentiate first-generation (typical) from second-generation (atypical)
- Include metabolic syndrome monitoring (weight, glucose, lipids)
- Reference AIMS for tardive dyskinesia screening
- Show EPS and akathisia management
- Include prolactin elevation effects
- Reference QTc monitoring for specific agents
- Show clozapine absolute neutrophil count monitoring
- Include LAI formulations and administration`,

  moodStabilizers: `
Mood Stabilizer requirements:
- Compare lithium, valproate, carbamazepine, lamotrigine
- Include therapeutic levels and monitoring schedules
- Reference lithium toxicity signs and kidney/thyroid effects
- Show valproate teratogenicity warnings (neural tube defects)
- Include lamotrigine titration (SJS risk)
- Reference carbamazepine drug interactions and HLA-B*1502 screening
- Show antimanic vs antidepressant efficacy differences
- Include maintenance treatment duration`,

  // Psychotherapy
  cbtPrinciples: `
CBT Principles requirements:
- Include cognitive model (thoughts → feelings → behaviors)
- Reference common cognitive distortions
- Show behavioral activation for depression
- Include exposure hierarchy construction for anxiety
- Reference thought records and cognitive restructuring
- Show behavioral experiments
- Include session structure (agenda, homework, summary)
- Reference number of sessions (12-20 typical)`,

  dbtComponents: `
DBT Components requirements:
- Include four skills modules (mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness)
- Reference biosocial theory of BPD
- Show individual therapy + group skills training model
- Include phone coaching role
- Reference consultation team for therapists
- Show diary card tracking of behaviors
- Include validation and change balance
- Reference hierarchy of treatment targets`,

  // Emergencies
  suicideRiskAssessment: `
Suicide Risk Assessment requirements:
- Include static risk factors (prior attempts, family history, access to means)
- Reference dynamic risk factors (acute stressors, hopelessness, intoxication)
- Show protective factors (social support, reasons for living, future orientation)
- Include assessment of suicidal ideation (passive vs active, plan, intent, means)
- Reference Columbia-Suicide Severity Rating Scale
- Show safety planning components (warning signs, coping, support, means restriction)
- Include disposition decision-making (outpatient, voluntary, involuntary)
- Reference lethal means counseling`,

  agitatedPatient: `
Agitated Patient Management requirements:
- Include de-escalation verbal techniques first
- Reference environmental modifications (low stimulation, exit access)
- Show medication options (PO preferred: olanzapine, risperidone, lorazepam)
- Include IM medications when needed (olanzapine IM, haloperidol + lorazepam + diphenhydramine)
- Reference contraindications (anticholinergic in dementia, benzo in respiratory)
- Show seclusion/restraint as last resort
- Include post-event debriefing
- Reference underlying cause identification (delirium, psychosis, intoxication)`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Psychiatry-specific few-shot examples
 */
export const PSYCHIATRY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for major depression treatment algorithm',
    output: `flowchart TD
    A[("MDD\\nDiagnosed")] --> B{"PHQ-9\\nSeverity?"}

    subgraph Mild["Mild Depression (5-9)"]
        B -->|"Mild"| C["Psychotherapy\\nWatchful Waiting"]
    end

    subgraph ModSevere["Moderate-Severe (10+)"]
        B -->|"Moderate"| D["SSRI + Therapy"]
        B -->|"Severe"| E["SSRI + Therapy\\nConsider Safety"]
    end

    C --> F{"Response\\n4-6 weeks?"}
    D --> F
    E --> G{"Hospitalization\\nNeeded?"}

    G -->|"Yes"| H["Inpatient\\nIntensive Treatment"]
    G -->|"No"| F

    F -->|"Full Response"| I["Continue 6-12mo\\nRelapse Prevention"]
    F -->|"Partial"| J["Optimize Dose"]
    F -->|"No Response"| K["Switch SSRI\\nor to SNRI"]

    J --> L{"Better at\\n8-12 weeks?"}
    L -->|"Yes"| I
    L -->|"No"| K

    K --> M{"2+ Failed\\nTrials?"}
    M -->|"Yes"| N["Treatment-Resistant:\\nAugment (Li, SGA)\\nor ECT/TMS/Ketamine"]

    style E fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff
    style N fill:#9B59B6,color:#fff`,
  },
  {
    prompt: 'Create a diagram for psychiatric medication side effect comparison',
    output: `flowchart TD
    A["Psychiatric Medication\\nSide Effects"]

    subgraph SSRI["SSRIs"]
        S1["Sexual dysfunction"]
        S2["GI upset (transient)"]
        S3["Activation/Insomnia"]
        S4["Weight neutral/gain"]
    end

    subgraph SNRI["SNRIs"]
        N1["Similar to SSRIs"]
        N2["+ Elevated BP"]
        N3["+ Withdrawal syndrome"]
    end

    subgraph TCA["TCAs"]
        T1["Anticholinergic"]
        T2["Cardiac (QTc, conduction)"]
        T3["Weight gain"]
        T4["Lethal in overdose"]
    end

    subgraph SGA["Atypical Antipsychotics"]
        A1["Metabolic syndrome"]
        A2["Weight gain (varies)"]
        A3["Sedation"]
        A4["QTc prolongation"]
        A5["EPS (less than FGA)"]
        A6["Prolactin elevation"]
    end

    subgraph MS["Mood Stabilizers"]
        M1["Lithium: Thyroid, Renal,\\nTremor, Diabetes insipidus"]
        M2["Valproate: Hepatic,\\nTeratogenic, Weight"]
        M3["Lamotrigine: SJS risk\\n(slow titration)"]
    end

    A --> SSRI & SNRI & TCA & SGA & MS

    style T4 fill:#DC143C,color:#fff
    style A1 fill:#FFA500,color:#000
    style M2 fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create a suicide risk assessment algorithm',
    output: `flowchart TD
    A[("Suicide Risk\\nAssessment")] --> B["Screen with\\nPHQ-9 Q9 or ASQ"]

    B --> C{"Any Positive\\nResponse?"}
    C -->|"No"| D["Document Low Risk\\nRoutine Follow-up"]
    C -->|"Yes"| E["Full Assessment"]

    subgraph Assessment["Detailed Assessment"]
        E --> F["Ideation:\\nPassive vs Active"]
        F --> G["Plan:\\nSpecific Method?"]
        G --> H["Intent:\\nWill to Act?"]
        H --> I["Means:\\nAccess to Method?"]
    end

    subgraph Risk["Risk Stratification"]
        I --> J{"Active SI +\\nPlan + Intent\\n+ Means?"}
        J -->|"Yes"| K["HIGH RISK"]
        J -->|"Some but not all"| L["MODERATE RISK"]
        J -->|"Passive only"| M["LOW-MODERATE"]
    end

    subgraph Disposition["Disposition"]
        K --> N["Psychiatric Hold\\nHospitalization"]
        L --> O["Crisis Services\\nIntensive Outpatient\\nSafety Planning"]
        M --> P["Safety Plan\\nOutpatient with\\nClose Follow-up"]
    end

    subgraph SafetyPlan["Safety Plan Components"]
        SP1["Warning signs"]
        SP2["Coping strategies"]
        SP3["People to contact"]
        SP4["Professionals/Crisis lines"]
        SP5["Means restriction"]
        SP6["Reasons for living"]
    end

    O --> SafetyPlan
    P --> SafetyPlan

    style K fill:#8B0000,color:#fff
    style L fill:#FFA500,color:#000
    style N fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a DBT skills overview diagram',
    output: `flowchart TD
    DBT["Dialectical Behavior Therapy"]

    subgraph Mind["Mindfulness"]
        M1["WHAT Skills"]
        M2["Observe: Notice without judgment"]
        M3["Describe: Put words to experience"]
        M4["Participate: Fully engage"]
        M5["HOW Skills"]
        M6["Non-judgmentally"]
        M7["One-mindfully"]
        M8["Effectively"]
    end

    subgraph DT["Distress Tolerance"]
        D1["TIPP: Temperature, Intense\\nexercise, Paced breathing,\\nPaired relaxation"]
        D2["ACCEPTS: Activities, Contributing,\\nComparisons, Emotions,\\nPushing away, Thoughts, Sensations"]
        D3["IMPROVE: Imagery, Meaning,\\nPrayer, Relaxation, One thing,\\nVacation, Encouragement"]
        D4["Radical Acceptance"]
    end

    subgraph ER["Emotion Regulation"]
        E1["Check the Facts"]
        E2["Opposite Action"]
        E3["ABC PLEASE:\\nAccumulate positives\\nBuild mastery\\nCope ahead"]
    end

    subgraph IE["Interpersonal Effectiveness"]
        I1["DEAR MAN: Objectives\\nDescribe, Express, Assert,\\nReinforce, Mindful,\\nAppear confident, Negotiate"]
        I2["GIVE: Relationship\\nGentle, Interested,\\nValidate, Easy manner"]
        I3["FAST: Self-respect\\nFair, Apologies (few),\\nStick to values, Truthful"]
    end

    DBT --> Mind & DT & ER & IE
    M1 --> M2 & M3 & M4
    M5 --> M6 & M7 & M8

    style Mind fill:#9B59B6,color:#fff
    style DT fill:#E74C3C,color:#fff
    style ER fill:#3498DB,color:#fff
    style IE fill:#27AE60,color:#fff`,
  },
  {
    prompt: 'Create a schizophrenia treatment algorithm',
    output: `flowchart TD
    A[("First-Episode\\nPsychosis")] --> B["Medical Workup"]

    subgraph Workup["Rule Out Secondary Causes"]
        B --> B1["Labs: CBC, CMP, TSH,\\nUrine Tox, HIV, RPR"]
        B1 --> B2["Consider: MRI Brain\\nif atypical features"]
    end

    B2 --> C{"Substance-\\nInduced?"}
    C -->|"Yes"| D["Observe off substances\\nRe-evaluate"]
    C -->|"No"| E["Start Antipsychotic"]

    subgraph FirstLine["First-Line Treatment"]
        E --> F["SGA Preferred:\\nRisperidone, Aripiprazole,\\nOlanzapine, Ziprasidone"]
        F --> G["Low starting dose\\nSlow titration"]
        G --> H["Adequate trial:\\n4-6 weeks at\\ntherapeutic dose"]
    end

    H --> I{"Response?"}
    I -->|"Yes"| J["Continue +\\nRelapse Prevention"]
    I -->|"Partial"| K["Optimize Dose\\nOR Switch Agent"]
    I -->|"No"| L["Switch to\\nDifferent SGA"]

    L --> M{"2+ Failed\\nTrials?"}
    M -->|"Yes"| N["CLOZAPINE\\nTreatment-Resistant\\nSchizophrenia"]

    N --> O["Clozapine Monitoring:\\nANC weekly x 6 mo\\nThen biweekly\\nREMS registry"]

    subgraph Psychosocial["Psychosocial Interventions"]
        P1["CBT for Psychosis"]
        P2["Family Psychoeducation"]
        P3["Supported Employment"]
        P4["Social Skills Training"]
    end

    J --> Psychosocial

    subgraph Monitoring["Ongoing Monitoring"]
        Q1["Metabolic: Weight,\\nGlucose, Lipids"]
        Q2["Movement: AIMS\\nfor TD screening"]
        Q3["Prolactin if\\nsymptomatic"]
    end

    style N fill:#9B59B6,color:#fff
    style O fill:#FFA500,color:#000
    style J fill:#228B22,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const psychiatryPrompts = {
  PSYCHIATRY_DOMAIN_PROMPT,
  PSYCHIATRY_PROMPTS,
  PSYCHIATRY_FEW_SHOT_EXAMPLES,
};

export default psychiatryPrompts;
