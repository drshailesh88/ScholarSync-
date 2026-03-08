/**
 * infectious-disease-prompts.ts
 * Infectious Disease-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for infectious disease medicine including:
 * - Antibiotic selection and stewardship
 * - Sepsis management and recognition
 * - HIV/AIDS care continuum
 * - Tuberculosis diagnosis and treatment
 * - Infection control protocols
 * - Antimicrobial resistance
 * - Vaccine schedules and immunization
 * - Outbreak investigation
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// INFECTIOUS DISEASE DOMAIN PROMPT
// =============================================================================

/**
 * Base infectious disease domain prompt for microbiology and ID diagrams
 */
export const INFECTIOUS_DISEASE_DOMAIN_PROMPT = `
Infectious Disease diagram requirements:
- Use standard microbiological terminology and nomenclature
- Follow IDSA guidelines for treatment recommendations
- Include Gram stain characteristics where applicable
- Reference antibiotic susceptibility patterns (S/I/R)
- Use proper taxonomic classification (genus species)
- Include MIC values and breakpoints where relevant
- Follow CDC guidelines for infection control
- Use color coding: Purple for Gram positive, Pink for Gram negative
- Include culture and sensitivity interpretation
- Reference WHO/CDC guidelines for outbreak management`;

// =============================================================================
// INFECTIOUS DISEASE-SPECIFIC PROMPTS
// =============================================================================

export const INFECTIOUS_DISEASE_PROMPTS = {
  // Antibiotic Selection and Stewardship
  empiricAntibioticSelection: `
Empiric Antibiotic Selection Algorithm requirements:
- Differentiate community vs healthcare-associated infections
- Include site of infection considerations
- Reference local resistance patterns (antibiogram)
- Include patient-specific factors (allergies, renal function)
- Show narrow vs broad spectrum options
- Include de-escalation pathway
- Reference IDSA guidelines by syndrome`,

  antibioticStewardship: `
Antimicrobial Stewardship Program requirements:
- Include prospective audit with intervention
- Show formulary restriction protocols
- Include IV-to-PO conversion criteria
- Reference dose optimization strategies
- Show de-escalation triggers
- Include duration of therapy guidelines
- Reference antibiotic timeout protocols`,

  antibioticMechanisms: `
Antibiotic Mechanisms Diagram requirements:
- Show bacterial cell structure with drug targets
- Include cell wall synthesis inhibitors (beta-lactams)
- Show protein synthesis inhibitors (30S and 50S)
- Include DNA/RNA synthesis inhibitors
- Show folate pathway inhibitors
- Include cell membrane disruptors
- Reference resistance mechanisms for each class`,

  // Sepsis Management
  sepsisRecognition: `
Sepsis Recognition and Management requirements:
- Include qSOFA criteria (RR >= 22, SBP <= 100, altered mental status)
- Show SOFA score components
- Reference Sepsis-3 definitions
- Include Hour-1 Bundle elements
- Show lactate clearance monitoring
- Include vasopressor selection pathway
- Reference source control timing`,

  septicShockManagement: `
Septic Shock Management requirements:
- Include fluid resuscitation targets (30 mL/kg)
- Show vasopressor titration (norepinephrine first)
- Include MAP target >= 65 mmHg
- Reference lactate-guided resuscitation
- Show stress-dose steroid indications
- Include CVP/ScvO2 monitoring when appropriate
- Reference EGDT principles and current evidence`,

  // HIV/AIDS
  hivDiagnosis: `
HIV Diagnosis and Initial Evaluation requirements:
- Include 4th generation Ag/Ab testing algorithm
- Show confirmatory HIV-1/2 differentiation
- Include baseline CD4 count and viral load
- Reference resistance testing indications
- Include opportunistic infection screening
- Show HLA-B*5701 testing for abacavir
- Reference initial laboratory panel`,

  artInitiation: `
ART Initiation Algorithm requirements:
- Follow DHHS guidelines for initial regimens
- Include INSTI-based preferred regimens
- Show considerations for specific populations
- Reference drug-drug interactions
- Include adherence assessment
- Show viral load monitoring schedule
- Reference treatment failure definitions`,

  opportunisticInfections: `
Opportunistic Infection Prophylaxis requirements:
- Include CD4-based thresholds for prophylaxis
- Show PCP prophylaxis (TMP-SMX, alternatives)
- Include MAC prophylaxis criteria
- Reference toxoplasmosis prophylaxis
- Show criteria for stopping prophylaxis
- Include IRIS recognition and management
- Reference immune reconstitution milestones`,

  // Tuberculosis
  tbScreeningDiagnosis: `
TB Screening and Diagnosis requirements:
- Include TST vs IGRA selection criteria
- Show interpretation of screening tests
- Reference chest imaging findings
- Include sputum collection protocol
- Show AFB smear and culture interpretation
- Include NAAT/GeneXpert utilization
- Reference drug susceptibility testing`,

  tbTreatmentMonitoring: `
TB Treatment and Monitoring requirements:
- Include standard RIPE regimen
- Show intensive vs continuation phase
- Reference DOT requirements
- Include hepatotoxicity monitoring
- Show drug-resistant TB pathways
- Include treatment response assessment
- Reference completion criteria`,

  ltbiManagement: `
LTBI Management requirements:
- Include risk stratification for treatment
- Show 3HP (rifapentine/INH) protocol
- Reference 4R (rifampin) option
- Include 9H regimen considerations
- Show contraindications for each regimen
- Include monitoring for adverse effects
- Reference special populations (contacts, immunocompromised)`,

  // Infection Control
  isolationPrecautions: `
Isolation Precautions requirements:
- Include standard precautions baseline
- Show contact precaution indications (MRSA, VRE, C. diff)
- Reference droplet precautions (influenza, meningococcus)
- Include airborne precautions (TB, measles, varicella)
- Show PPE requirements for each level
- Include room requirements (AIIR)
- Reference duration and discontinuation criteria`,

  healthcareInfectionPrevention: `
Healthcare Infection Prevention requirements:
- Include CAUTI prevention bundle
- Show CLABSI prevention strategies
- Reference VAP prevention bundle
- Include SSI prevention measures
- Show hand hygiene compliance monitoring
- Include environmental cleaning protocols
- Reference antimicrobial stewardship integration`,

  // Antimicrobial Resistance
  mdrOrganismManagement: `
MDR Organism Management requirements:
- Include MRSA treatment options
- Show ESBL-producing organism approach
- Reference CRE (carbapenem-resistant Enterobacteriaceae)
- Include VRE treatment strategies
- Show MDR Pseudomonas approach
- Include MDR Acinetobacter considerations
- Reference novel antimicrobial agents`,

  resistanceMechanisms: `
Resistance Mechanisms Diagram requirements:
- Show beta-lactamase classification (Ambler)
- Include efflux pump mechanisms
- Reference target modification (PBP, ribosome)
- Show porin loss mechanisms
- Include biofilm-mediated resistance
- Reference horizontal gene transfer
- Include carbapenemase types (KPC, NDM, OXA)`,

  // Vaccines and Immunization
  adultImmunization: `
Adult Immunization Schedule requirements:
- Include routine vaccines (influenza, Tdap)
- Show age-based recommendations (shingles, pneumococcal)
- Reference high-risk group vaccines
- Include travel vaccine considerations
- Show catch-up schedule guidance
- Include contraindications and precautions
- Reference special populations (pregnancy, immunocompromised)`,

  vaccineAdverseEvents: `
Vaccine Adverse Event Management requirements:
- Include anaphylaxis recognition and treatment
- Show local reaction management
- Reference syncope prevention
- Include VAERS reporting criteria
- Show contraindication vs precaution distinction
- Include risk communication strategies
- Reference vaccine safety monitoring systems`,

  // Outbreak Investigation
  outbreakInvestigation: `
Outbreak Investigation Algorithm requirements:
- Include case definition development
- Show epidemiologic curve construction
- Reference hypothesis generation
- Include analytic study design
- Show control measure implementation
- Include communication strategies
- Reference post-outbreak evaluation`,

  travelMedicineConsultation: `
Travel Medicine Consultation requirements:
- Include destination-specific risk assessment
- Show required vs recommended vaccines
- Reference malaria prophylaxis selection
- Include traveler's diarrhea prevention
- Show altitude illness prevention
- Include post-travel evaluation triggers
- Reference CDC Yellow Book resources`,

  fungalInfectionManagement: `
Fungal Infection Management requirements:
- Include Candida species identification importance
- Show invasive aspergillosis diagnosis
- Reference endemic mycoses (histo, blasto, cocci)
- Include antifungal selection by syndrome
- Show echinocandin vs azole considerations
- Include therapeutic drug monitoring indications
- Reference combination therapy scenarios`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Infectious Disease-specific few-shot examples
 */
export const INFECTIOUS_DISEASE_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for empiric antibiotic selection in community-acquired pneumonia',
    output: `flowchart TD
    A[("CAP Diagnosis")] --> B{"Severity\\nAssessment"}
    B -->|"CURB-65 0-1"| C["Outpatient"]
    B -->|"CURB-65 2"| D["Hospital Ward"]
    B -->|"CURB-65 3-5"| E["ICU Admission"]

    C --> F["Amoxicillin 1g TID\\nor Doxycycline 100mg BID"]
    C --> G{"Risk Factors\\nfor Resistance?"}
    G -->|"Yes"| H["Amox-Clav +\\nMacrolide"]

    D --> I["Beta-lactam +\\nMacrolide"]
    D --> J["or Respiratory FQ"]

    E --> K{"Pseudomonas\\nRisk?"}
    K -->|"No"| L["Ceftriaxone +\\nAzithromycin"]
    K -->|"Yes"| M["Pip-Tazo +\\nFluoroquinolone"]

    E --> N{"MRSA Risk?"}
    N -->|"Yes"| O["Add Vancomycin"]

    style E fill:#DC143C,color:#fff
    style C fill:#228B22,color:#fff
    style M fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create a sepsis Hour-1 bundle flowchart',
    output: `flowchart TD
    A[("Sepsis\\nSuspected")] --> B["Hour-1 Bundle\\nStart Clock"]

    B --> C["1. Measure Lactate"]
    B --> D["2. Blood Cultures\\nx2 sets"]
    B --> E["3. Broad-Spectrum\\nAntibiotics"]
    B --> F["4. Crystalloid 30mL/kg\\nif Hypotensive or\\nLactate >= 4"]
    B --> G["5. Vasopressors\\nif MAP < 65\\nafter fluids"]

    C --> H{"Lactate\\n>= 2?"}
    H -->|"Yes"| I["Repeat in 2-4h"]

    E --> J["Within 1 Hour\\nof Recognition"]
    J --> K["Cover likely\\npathogens"]
    K --> L["Consider source"]

    G --> M["Norepinephrine\\nFirst Line"]
    M --> N["Target MAP >= 65"]

    subgraph Targets["Resuscitation Targets"]
        O["MAP >= 65"]
        P["Urine output >= 0.5mL/kg/hr"]
        Q["Lactate normalizing"]
    end

    style B fill:#DC143C,color:#fff
    style J fill:#FFA500,color:#000
    style N fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an HIV diagnosis and initial workup algorithm',
    output: `flowchart TD
    A["HIV Screening\\nIndicated"] --> B["4th Gen\\nAg/Ab Test"]

    B -->|"Negative"| C["No HIV Infection\\n(Window period consideration)"]
    B -->|"Positive"| D["Confirmatory\\nHIV-1/2 Differentiation"]

    D -->|"HIV-1 Positive"| E["HIV-1 Confirmed"]
    D -->|"HIV-2 Positive"| F["HIV-2 Confirmed"]
    D -->|"Negative/Indeterminate"| G["HIV-1 RNA\\n(NAT)"]

    G -->|"Detected"| H["Acute HIV-1"]
    G -->|"Not Detected"| I["False Positive\\nor HIV-2"]

    E --> J["Initial Workup"]

    subgraph Baseline["Baseline Labs"]
        J --> K["CD4 Count"]
        J --> L["HIV Viral Load"]
        J --> M["Resistance Testing"]
        J --> N["HLA-B*5701"]
    end

    subgraph Screening["OI Screening"]
        J --> O["Hepatitis B/C"]
        J --> P["Syphilis"]
        J --> Q["TB (IGRA/TST)"]
        J --> R["Toxoplasma IgG"]
    end

    K --> S{"CD4 < 200?"}
    S -->|"Yes"| T["Start OI Prophylaxis\\nPCP, MAC as indicated"]

    M --> U["Start ART\\n(INSTI-based preferred)"]

    style E fill:#DC143C,color:#fff
    style U fill:#228B22,color:#fff
    style T fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create an isolation precautions decision tree',
    output: `flowchart TD
    A[("Suspected\\nInfection")] --> B{"Transmission\\nRoute?"}

    B --> C["Contact"]
    B --> D["Droplet"]
    B --> E["Airborne"]

    subgraph ContactP["Contact Precautions"]
        C --> C1["Private Room\\n(or cohorting)"]
        C --> C2["Gown + Gloves\\non entry"]
        C --> C3["Dedicated Equipment"]
        C --> C4["MRSA, VRE\\nC. diff, Scabies\\nDraining wounds"]
    end

    subgraph DropletP["Droplet Precautions"]
        D --> D1["Private Room"]
        D --> D2["Surgical Mask\\nwithin 6 feet"]
        D --> D3["Door may be open"]
        D --> D4["Influenza\\nMeningococcus\\nPertussis, Mumps"]
    end

    subgraph AirborneP["Airborne Precautions"]
        E --> E1["AIIR Room\\n(Negative Pressure)"]
        E --> E2["N95 Respirator\\nor PAPR"]
        E --> E3["Door must\\nremain closed"]
        E --> E4["TB, Measles\\nVaricella, COVID\\nDisseminated Zoster"]
    end

    E1 --> F{"Patient\\nLeaving Room?"}
    F -->|"Yes"| G["Patient wears\\nsurgical mask"]

    style E fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000
    style C fill:#F59E0B,color:#000`,
  },
  {
    prompt: 'Create an antimicrobial resistance organism treatment algorithm',
    output: `flowchart TD
    A[("MDR Organism\\nIdentified")] --> B{"Organism?"}

    B -->|"MRSA"| C["MRSA Treatment"]
    B -->|"ESBL"| D["ESBL Treatment"]
    B -->|"CRE"| E["CRE Treatment"]
    B -->|"VRE"| F["VRE Treatment"]

    subgraph MRSA["MRSA Options"]
        C --> C1["Vancomycin\\n(trough 15-20)"]
        C --> C2["Daptomycin\\n(not for pneumonia)"]
        C --> C3["Linezolid\\n(watch for toxicity)"]
        C --> C4["Ceftaroline"]
    end

    subgraph ESBL["ESBL Options"]
        D --> D1["Carbapenem\\n(meropenem, ertapenem)"]
        D --> D2["Pip-Tazo\\n(if MIC <= 16)"]
        D --> D3["Ceftazidime-avibactam\\n(if carbapenem-sparing)"]
    end

    subgraph CRE["CRE Options"]
        E --> E1{"Carbapenemase\\nType?"}
        E1 -->|"KPC"| E2["Ceftazidime-avibactam\\nMeropenem-vaborbactam"]
        E1 -->|"NDM/MBL"| E3["Aztreonam + Ceftazidime-avibactam\\nCefiderocol"]
        E1 -->|"OXA-48"| E4["Ceftazidime-avibactam"]
    end

    subgraph VRE["VRE Options"]
        F --> F1["Daptomycin"]
        F --> F2["Linezolid"]
        F --> F3["Tigecycline\\n(bacteriostatic)"]
    end

    style E fill:#DC143C,color:#fff
    style C fill:#9333EA,color:#fff
    style D fill:#F97316,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const infectiousDiseasePrompts = {
  INFECTIOUS_DISEASE_DOMAIN_PROMPT,
  INFECTIOUS_DISEASE_PROMPTS,
  INFECTIOUS_DISEASE_FEW_SHOT_EXAMPLES,
};
export default infectiousDiseasePrompts;
