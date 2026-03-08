/**
 * Illustration AI Utilities
 *
 * Shared utility functions for illustration generation backend routing and domain detection.
 */

// =============================================================================
// TYPES
// =============================================================================

export type Backend = "mermaid" | "svg" | "gemini";

// =============================================================================
// BACKEND AUTO-ROUTING
// =============================================================================

/**
 * Detect the best backend for a given prompt and domain
 *
 * @param prompt - User's natural language description
 * @param domain - Optional domain context
 * @returns The selected backend
 */
export function detectBestBackend(prompt: string, _domain?: string): Backend {
  const lower = prompt.toLowerCase();

  // Mermaid: flowcharts, process diagrams, decision trees
  const mermaidKeywords = [
    "flowchart",
    "flow chart",
    "flow diagram",
    "decision tree",
    "consort",
    "prisma",
    "strobe",
    "pathway",
    "algorithm",
    "sequence diagram",
    "state diagram",
    "gantt",
    "timeline",
    "process",
    "workflow",
    "protocol",
    "steps",
    "sequence",
    "state machine",
    "er diagram",
    "class diagram",
    "entity relationship",
  ];
  if (mermaidKeywords.some((k) => lower.includes(k))) return "mermaid";

  // Gemini: complex biological/anatomical illustrations
  const geminiKeywords = [
    "illustration",
    "illustrate",
    "detailed",
    "anatomy",
    "anatomical",
    "cross-section",
    "cross section",
    "microscopy",
    "photorealistic",
    "realistic",
    "organelle",
    "tissue",
    "organ",
    "structure",
    "cell membrane",
    "mitochondria",
    "neuron",
    "synapse",
    "sarcomere",
    "muscle",
    "blood vessel",
    "artery",
    "vein",
    "protein structure",
    "molecular structure",
    "crystal structure",
    "microscopic",
    "histology",
    "embryology",
    "radiology",
    "mri",
    "ct scan",
    "x-ray",
    "ultrasound",
    "endoscopy",
  ];
  if (geminiKeywords.some((k) => lower.includes(k))) return "gemini";

  // Default: SVG backend (LLM generates SVG code)
  return "svg";
}

// =============================================================================
// DOMAIN DETECTION
// =============================================================================

/**
 * Detect domain from prompt for specialized illustration generation
 * Maps keywords to domain-specific prompt enhancement
 *
 * @param prompt - User's natural language description
 * @returns Detected domain or undefined
 */
export function detectDomainFromPrompt(prompt: string): string | undefined {
  const lower = prompt.toLowerCase();

  const domainPatterns: Record<string, RegExp> = {
    cardiology: /heart|cardiac|coronary|ecg|ekg|arrhythmia|myocardial|ventricular|atrial|cardiovascular/,
    neurology: /brain|neural|neuron|synapse|cortex|dementia|alzheimer|parkinson|stroke/,
    pulmonology: /lung|pulmonary|respiratory|breath|airway|alveol|pneumonia|copd|asthma/,
    gastroenterology:
      /stomach|intestine|bowel|liver|pancreas|digestive|gi |gastro|esophagus|colon/,
    endocrinology:
      /hormone|thyroid|diabetes|insulin|glucose|endocrine|pituitary|adrenal|metabolic/,
    nephrology: /kidney|renal|nephron|dialysis|urine|bladder|urology|ureter/,
    "hematology-oncology":
      /blood|leukemia|cancer|tumor|hemoglobin|anemia|clot|coagulation|lymphoma/,
    "infectious-disease": /virus|bacteria|infection|antibiotic|viral|bacterial|sepsis|pathogen|microbe/,
    orthopedics: /bone|fracture|skeletal|muscle|tendon|ligament|joint|spine|orthopedic/,
    dermatology: /skin|dermal|rash|lesion|epidermis|dermatitis/,
    ophthalmology: /eye|vision|ocular|retina|cornea|glaucoma|cataract/,
    radiology: /x-ray|ct|mri|ultrasound|imaging|radiologic/,
    physiology: /physiology|homeostasis|mechanism|feedback|regulation|physiologic/,
    biochemistry: /protein|enzyme|metabolism|amino acid|biochemical|pathway|reaction/,
    pharmacology: /drug|medication|pharmacokinetic|pharmacodynamic|dose|therapeutic/,
    "cell-biology": /cell|mitochondria|nucleus|organelle|membrane|cytoplasm|cellular/,
    "molecular-biology": /dna|rna|gene|protein|transcription|translation|mutation|genetic/,
    immunology: /immune|antibody|antigen|lymphocyte|inflammation/,
    "emergency-medicine": /emergency|trauma|critical|acute|resuscitation/,
    obgyn: /pregnancy|obstetric|gynecologic|fetal|maternal|uterus/,
    pediatrics: /pediatric|neonatal|infant|child|adolescent/,
    psychiatry: /psychiatric|mental|depression|anxiety|schizophrenia|psychological/,
    surgery: /surgery|surgical|incision|operation|procedure/,
    anesthesiology: /anesthesia|anesthetic|pain management/,
    rheumatology: /arthritis|rheumatoid|lupus|autoimmune|joint pain/,
    ent: /ear|nose|throat|sinus|tonsil|larynx|otolaryngolog/,
    physics: /physics|force|energy|wave|quantum|mechanic|optics|electric|magnetic/,
    chemistry: /chemical|molecule|bond|reaction|organic|inorganic|analytic/,
    "computer-science": /algorithm|data structure|software|programming|network|database|computing/,
    engineering: /engineering|mechanical|electrical|civil|system|control|design/,
    mathematics: /mathematical|equation|calculus|algebra|geometry|statistics|probability/,
    ecology: /ecosystem|environment|climate|habitat|species|population|ecological/,
    zoology: /animal|zoology|insect|entomology|vet|veterinary/,
    botany: /plant|botany|flora|photosynthesis|leaf|root|flower/,
    astronomy: /star|planet|galaxy|solar|astronom|cosmic|space|universe/,
    geology: /geolog|rock|mineral|earth|crust|volcan|earthquake|seismic/,
    meteorology: /weather|climate|meteorolog|atmospheric|forecast|temperature|humidity/,
    oceanography: /ocean|marine|sea|water|oceanograph|nautical|aquatic/,
    agriculture: /agricultur|farm|crop|soil|harvest|livestock|agronom/,
    forensics: /forensic|evidence|crime|legal|autopsy|pathology legal/,
    aerospace: /aerospace|aircraft|rocket|satellite|aviation|flight/,
    "biomedical-engineering": /biomedical|bioengineering|medical device|prosthet|implant|biomaterial/,
  };

  for (const [domain, pattern] of Object.entries(domainPatterns)) {
    if (pattern.test(lower)) {
      return domain;
    }
  }

  return undefined;
}
