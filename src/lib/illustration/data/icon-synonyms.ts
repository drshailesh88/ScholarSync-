/**
 * Scientific Icon Synonym Dictionary
 * Maps common search terms to related terms for fuzzy matching
 */
export const ICON_SYNONYMS: Record<string, string[]> = {
  // Anatomy
  'heart': ['cardiac', 'cardio', 'myocardium', 'ventricle', 'atrium', 'coronary'],
  'brain': ['cerebral', 'cortex', 'neural', 'neuron', 'CNS', 'encephalon'],
  'lung': ['pulmonary', 'respiratory', 'alveoli', 'bronchi', 'pneumo'],
  'kidney': ['renal', 'nephron', 'glomerulus', 'urinary'],
  'liver': ['hepatic', 'hepatocyte', 'biliary'],
  'stomach': ['gastric', 'GI', 'digestive'],
  'intestine': ['bowel', 'colon', 'ileum', 'jejunum', 'duodenum', 'enteric'],
  'bone': ['skeletal', 'osseous', 'orthopedic', 'osteo'],
  'muscle': ['myocyte', 'muscular', 'skeletal muscle', 'smooth muscle'],
  'eye': ['ocular', 'optic', 'retina', 'cornea', 'ophthalmology'],
  'ear': ['auditory', 'otic', 'cochlea', 'vestibular'],
  'skin': ['dermal', 'epidermis', 'integumentary', 'cutaneous'],
  'blood': ['hematologic', 'hemoglobin', 'erythrocyte', 'leukocyte', 'platelet'],
  'vessel': ['vascular', 'artery', 'vein', 'capillary', 'endothelial'],
  'nerve': ['neural', 'axon', 'dendrite', 'synapse', 'peripheral'],
  'spine': ['vertebral', 'spinal', 'cervical', 'thoracic', 'lumbar'],

  // Cell biology
  'cell': ['cellular', 'cytoplasm', 'cytosol', 'eukaryote', 'prokaryote'],
  'nucleus': ['nuclear', 'nucleolus', 'chromatin', 'nuclear envelope'],
  'mitochondria': ['mitochondrion', 'ATP', 'oxidative', 'cristae', 'powerhouse'],
  'membrane': ['phospholipid', 'bilayer', 'plasma membrane', 'lipid'],
  'ribosome': ['translation', 'rRNA', 'protein synthesis', '30S', '50S'],
  'golgi': ['golgi apparatus', 'cisternae', 'vesicle', 'secretory'],
  'ER': ['endoplasmic reticulum', 'rough ER', 'smooth ER', 'SER', 'RER'],
  'lysosome': ['degradation', 'autophagy', 'acid hydrolase'],
  'cytoskeleton': ['actin', 'tubulin', 'microtubule', 'microfilament', 'intermediate filament'],

  // Molecular biology
  'DNA': ['deoxyribonucleic', 'double helix', 'nucleotide', 'gene', 'genome', 'chromatin'],
  'RNA': ['ribonucleic', 'mRNA', 'tRNA', 'rRNA', 'transcription'],
  'protein': ['polypeptide', 'amino acid', 'enzyme', 'receptor', 'antibody'],
  'antibody': ['immunoglobulin', 'IgG', 'IgM', 'IgA', 'Fab', 'Fc'],
  'enzyme': ['catalysis', 'substrate', 'active site', 'kinase', 'protease'],
  'receptor': ['ligand', 'binding', 'signal', 'GPCR', 'tyrosine kinase'],

  // Lab equipment
  'microscope': ['microscopy', 'magnification', 'lens', 'objective', 'eyepiece'],
  'pipette': ['micropipette', 'pipet', 'tip', 'aspirate'],
  'beaker': ['flask', 'erlenmeyer', 'graduated cylinder', 'glassware'],
  'centrifuge': ['spin', 'pellet', 'supernatant', 'RPM'],
  'PCR': ['polymerase chain reaction', 'thermocycler', 'amplification', 'primer'],
  'gel': ['electrophoresis', 'agarose', 'PAGE', 'western', 'southern', 'northern'],
  'plate': ['well plate', '96-well', '384-well', 'microplate', 'ELISA'],

  // Pathology
  'tumor': ['cancer', 'neoplasm', 'malignant', 'oncology', 'carcinoma'],
  'inflammation': ['inflammatory', 'cytokine', 'immune', 'edema', 'redness'],
  'infection': ['pathogen', 'bacteria', 'virus', 'fungus', 'sepsis'],
  'clot': ['thrombus', 'thrombosis', 'coagulation', 'fibrin', 'embolus'],

  // Cardiology specific
  'stent': ['PCI', 'angioplasty', 'intervention', 'scaffold'],
  'valve': ['mitral', 'aortic', 'tricuspid', 'pulmonic', 'stenosis', 'regurgitation'],
  'ECG': ['EKG', 'electrocardiogram', 'QRS', 'P wave', 'ST segment', 'rhythm'],
  'catheter': ['cath', 'catheterization', 'angiography', 'intervention'],
  'pacemaker': ['ICD', 'implantable', 'defibrillator', 'lead', 'CRT'],
  'STEMI': ['ST elevation', 'myocardial infarction', 'MI', 'heart attack'],

  // Diagrams
  'flowchart': ['flow diagram', 'algorithm', 'decision tree', 'workflow'],
  'pathway': ['signaling', 'cascade', 'transduction', 'metabolic'],
  'cycle': ['loop', 'Krebs', 'citric acid', 'Calvin', 'cell cycle'],
  'tree': ['phylogenetic', 'dendrogram', 'hierarchy', 'evolutionary'],
};

/**
 * Expand a search query with synonyms.
 * Returns the original terms plus all synonym matches.
 * Uses transitive closure: if word A is a synonym of word B, and word B is a synonym of word C,
 * searching for A returns A, B, and C.
 */
export function expandWithSynonyms(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/);
  const expanded = new Set<string>(words);

  // First pass: direct matches
  for (const word of words) {
    // Check if this word IS a key
    if (ICON_SYNONYMS[word]) {
      ICON_SYNONYMS[word].forEach(syn => expanded.add(syn.toLowerCase()));
    }

    // Check if this word appears in any value array
    for (const [key, synonyms] of Object.entries(ICON_SYNONYMS)) {
      if (synonyms.some(s => s.toLowerCase().includes(word))) {
        expanded.add(key.toLowerCase());
      }
    }
  }

  // Second pass: transitive closure (get all synonyms of synonyms)
  const toAdd: string[] = [];
  for (const term of expanded) {
    if (ICON_SYNONYMS[term]) {
      ICON_SYNONYMS[term].forEach(syn => {
        if (!expanded.has(syn.toLowerCase())) {
          toAdd.push(syn.toLowerCase());
        }
      });
    }
  }

  // Add transitive synonyms and re-check
  for (const term of toAdd) {
    expanded.add(term);
    if (ICON_SYNONYMS[term]) {
      ICON_SYNONYMS[term].forEach((syn: string) => expanded.add(syn.toLowerCase()));
    }
  }

  return [...expanded];
}
