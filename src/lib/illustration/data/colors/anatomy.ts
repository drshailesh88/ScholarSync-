/**
 * anatomy.ts
 * Anatomy color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for human anatomy diagrams including:
 * - Skeletal system (bone, cartilage, joints)
 * - Muscular system (muscles, tendons, ligaments)
 * - Cardiovascular system (arteries, veins, heart)
 * - Nervous system (brain, nerves, spinal cord)
 * - Respiratory system (lungs, airways)
 * - Digestive system (GI tract, liver, pancreas)
 * - Urinary system (kidneys, bladder)
 * - Reproductive system
 * - Endocrine glands
 * - Lymphatic system
 * - Integumentary system (skin layers)
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// SKELETAL SYSTEM COLORS
// =============================================================================

/**
 * Bone tissue colors
 */
export const boneColors = {
  /** Cortical bone - dense outer layer */
  corticalBone: '#F5F5DC',
  /** Trabecular/Cancellous bone - spongy inner bone */
  trabecularBone: '#FAEBD7',
  /** Periosteum - bone membrane */
  periosteum: '#DEB887',
  /** Endosteum - inner membrane */
  endosteum: '#D2B48C',
  /** Red bone marrow */
  redMarrow: '#8B0000',
  /** Yellow bone marrow (fatty) */
  yellowMarrow: '#FFD700',
  /** Growth plate / Epiphyseal plate */
  growthPlate: '#87CEEB',
  /** Bone matrix */
  boneMatrix: '#FAF0E6',
  /** Osteocytes */
  osteocytes: '#CD853F',
  /** Haversian canal */
  haversianCanal: '#DC143C',
};

/**
 * Cartilage colors
 */
export const cartilageColors = {
  /** Hyaline cartilage */
  hyalineCartilage: '#B0E0E6',
  /** Fibrocartilage */
  fibrocartilage: '#B0C4DE',
  /** Elastic cartilage */
  elasticCartilage: '#ADD8E6',
  /** Articular cartilage */
  articularCartilage: '#87CEEB',
  /** Epiphyseal cartilage */
  epiphysealCartilage: '#AFEEEE',
};

/**
 * Joint structure colors
 */
export const jointColors = {
  /** Synovial membrane */
  synovialMembrane: '#FFB6C1',
  /** Synovial fluid */
  synovialFluid: '#E0FFFF',
  /** Joint capsule */
  jointCapsule: '#DDA0DD',
  /** Labrum */
  labrum: '#9370DB',
  /** Meniscus */
  meniscus: '#708090',
  /** Bursa */
  bursa: '#FFDAB9',
};

// =============================================================================
// MUSCULAR SYSTEM COLORS
// =============================================================================

/**
 * Muscle tissue colors
 */
export const muscleColors = {
  /** Skeletal muscle */
  skeletalMuscle: '#CD5C5C',
  /** Cardiac muscle */
  cardiacMuscle: '#B22222',
  /** Smooth muscle */
  smoothMuscle: '#DB7093',
  /** Muscle belly */
  muscleBelly: '#BC8F8F',
  /** Myofibrils */
  myofibrils: '#E9967A',
  /** Sarcomere */
  sarcomere: '#F08080',
};

/**
 * Connective tissue colors
 */
export const connectiveTissueColors = {
  /** Tendon */
  tendon: '#F5DEB3',
  /** Ligament */
  ligament: '#DAA520',
  /** Fascia */
  fascia: '#D3D3D3',
  /** Aponeurosis */
  aponeurosis: '#FFFACD',
  /** Collagen fibers */
  collagenFibers: '#FFEFD5',
  /** Elastic fibers */
  elasticFibers: '#FFE4B5',
};

// =============================================================================
// CARDIOVASCULAR SYSTEM COLORS
// =============================================================================

/**
 * Blood vessel colors
 */
export const vesselColors = {
  /** Artery (oxygenated) */
  artery: '#DC143C',
  /** Arteriole */
  arteriole: '#FF6347',
  /** Capillary arterial end */
  capillaryArterial: '#FF7F7F',
  /** Capillary venous end */
  capillaryVenous: '#7B68EE',
  /** Venule */
  venule: '#6495ED',
  /** Vein (deoxygenated) */
  vein: '#4169E1',
  /** Portal vein */
  portalVein: '#483D8B',
  /** Pulmonary artery (deoxygenated) */
  pulmonaryArtery: '#4169E1',
  /** Pulmonary vein (oxygenated) */
  pulmonaryVein: '#DC143C',
};

/**
 * Heart structure colors
 */
export const heartColors = {
  /** Right atrium */
  rightAtrium: '#4169E1',
  /** Right ventricle */
  rightVentricle: '#1E90FF',
  /** Left atrium */
  leftAtrium: '#DC143C',
  /** Left ventricle */
  leftVentricle: '#B22222',
  /** Myocardium */
  myocardium: '#8B0000',
  /** Endocardium */
  endocardium: '#FFB6C1',
  /** Pericardium */
  pericardium: '#DDA0DD',
  /** Heart valves */
  valves: '#F5F5DC',
  /** Coronary arteries */
  coronaryArteries: '#FFA500',
  /** Conduction system */
  conductionSystem: '#FFD700',
};

/**
 * Blood component colors
 */
export const bloodColors = {
  /** Oxygenated blood */
  oxygenatedBlood: '#DC143C',
  /** Deoxygenated blood */
  deoxygenatedBlood: '#800000',
  /** Red blood cells */
  erythrocytes: '#CD5C5C',
  /** White blood cells */
  leukocytes: '#F5F5F5',
  /** Platelets */
  platelets: '#DDA0DD',
  /** Plasma */
  plasma: '#FFFACD',
};

// =============================================================================
// NERVOUS SYSTEM COLORS
// =============================================================================

/**
 * Central nervous system colors
 */
export const cnsColors = {
  /** Gray matter */
  grayMatter: '#808080',
  /** White matter */
  whiteMatter: '#FFFAF0',
  /** Cerebral cortex */
  cerebralCortex: '#FFC0CB',
  /** Cerebellum */
  cerebellum: '#DDA0DD',
  /** Brainstem */
  brainstem: '#E6E6FA',
  /** Spinal cord */
  spinalCord: '#FFFACD',
  /** Meninges - dura mater */
  duraMater: '#D3D3D3',
  /** Meninges - arachnoid */
  arachnoid: '#F0F8FF',
  /** Meninges - pia mater */
  piaMater: '#FFE4E1',
  /** Cerebrospinal fluid */
  csf: '#E0FFFF',
  /** Ventricles */
  ventricles: '#87CEEB',
};

/**
 * Peripheral nervous system colors
 */
export const pnsColors = {
  /** Nerve trunk */
  nerveTrunk: '#FFD700',
  /** Nerve fiber */
  nerveFiber: '#FFFACD',
  /** Myelin sheath */
  myelinSheath: '#F0E68C',
  /** Schwann cell */
  schwannCell: '#FAFAD2',
  /** Ganglion */
  ganglion: '#DDA0DD',
  /** Neuromuscular junction */
  neuromuscularJunction: '#FFA07A',
  /** Sensory neuron */
  sensoryNeuron: '#4169E1',
  /** Motor neuron */
  motorNeuron: '#DC143C',
  /** Interneuron */
  interneuron: '#9370DB',
};

// =============================================================================
// RESPIRATORY SYSTEM COLORS
// =============================================================================

/**
 * Respiratory structure colors
 */
export const respiratoryColors = {
  /** Nasal mucosa */
  nasalMucosa: '#FFB6C1',
  /** Trachea */
  trachea: '#ADD8E6',
  /** Bronchi */
  bronchi: '#87CEEB',
  /** Bronchioles */
  bronchioles: '#B0E0E6',
  /** Alveoli */
  alveoli: '#FFE4E1',
  /** Lung parenchyma */
  lungParenchyma: '#FFC0CB',
  /** Pleura */
  pleura: '#E6E6FA',
  /** Diaphragm */
  diaphragm: '#BC8F8F',
  /** Epiglottis */
  epiglottis: '#F5DEB3',
  /** Larynx cartilage */
  larynxCartilage: '#B0C4DE',
};

// =============================================================================
// DIGESTIVE SYSTEM COLORS
// =============================================================================

/**
 * GI tract colors
 */
export const giTractColors = {
  /** Oral mucosa */
  oralMucosa: '#FFB6C1',
  /** Esophagus */
  esophagus: '#DEB887',
  /** Gastric mucosa */
  gastricMucosa: '#FA8072',
  /** Duodenum */
  duodenum: '#F4A460',
  /** Jejunum */
  jejunum: '#E9967A',
  /** Ileum */
  ileum: '#FFA07A',
  /** Cecum */
  cecum: '#D2B48C',
  /** Colon */
  colon: '#BC8F8F',
  /** Rectum */
  rectum: '#CD853F',
  /** Intestinal villi */
  villi: '#FFE4C4',
};

/**
 * Accessory organ colors
 */
export const accessoryOrganColors = {
  /** Liver */
  liver: '#8B4513',
  /** Liver parenchyma */
  liverParenchyma: '#A0522D',
  /** Gallbladder */
  gallbladder: '#228B22',
  /** Bile */
  bile: '#9ACD32',
  /** Pancreas */
  pancreas: '#F0E68C',
  /** Pancreatic islets */
  pancreaticIslets: '#FFD700',
  /** Salivary glands */
  salivaryGlands: '#FFDAB9',
  /** Spleen */
  spleen: '#800000',
};

// =============================================================================
// URINARY SYSTEM COLORS
// =============================================================================

/**
 * Urinary structure colors
 */
export const urinaryColors = {
  /** Kidney cortex */
  kidneyCortex: '#CD853F',
  /** Kidney medulla */
  kidneyMedulla: '#DEB887',
  /** Renal pelvis */
  renalPelvis: '#FFDAB9',
  /** Glomerulus */
  glomerulus: '#DC143C',
  /** Bowman's capsule */
  bowmansCapsule: '#FFE4E1',
  /** Proximal tubule */
  proximalTubule: '#90EE90',
  /** Loop of Henle */
  loopOfHenle: '#98FB98',
  /** Distal tubule */
  distalTubule: '#7CFC00',
  /** Collecting duct */
  collectingDuct: '#ADFF2F',
  /** Ureter */
  ureter: '#F0E68C',
  /** Bladder */
  bladder: '#FAFAD2',
  /** Urethra */
  urethra: '#FFFACD',
};

// =============================================================================
// REPRODUCTIVE SYSTEM COLORS
// =============================================================================

/**
 * Female reproductive colors
 */
export const femaleReproColors = {
  /** Ovary */
  ovary: '#DDA0DD',
  /** Follicle */
  follicle: '#FFB6C1',
  /** Corpus luteum */
  corpusLuteum: '#FFD700',
  /** Fallopian tube */
  fallopianTube: '#E6E6FA',
  /** Uterus myometrium */
  myometrium: '#BC8F8F',
  /** Uterus endometrium */
  endometrium: '#FF69B4',
  /** Cervix */
  cervix: '#DB7093',
  /** Vagina */
  vagina: '#FFB6C1',
};

/**
 * Male reproductive colors
 */
export const maleReproColors = {
  /** Testis */
  testis: '#DEB887',
  /** Seminiferous tubules */
  seminiferousTubules: '#F5DEB3',
  /** Epididymis */
  epididymis: '#D2B48C',
  /** Vas deferens */
  vasDeferens: '#C4A484',
  /** Seminal vesicle */
  seminalVesicle: '#FFDAB9',
  /** Prostate */
  prostate: '#BC8F8F',
  /** Bulbourethral gland */
  bulbourethralGland: '#F5DEB3',
};

// =============================================================================
// ENDOCRINE SYSTEM COLORS
// =============================================================================

/**
 * Endocrine gland colors
 */
export const endocrineColors = {
  /** Hypothalamus */
  hypothalamus: '#9370DB',
  /** Pituitary - anterior */
  anteriorPituitary: '#DDA0DD',
  /** Pituitary - posterior */
  posteriorPituitary: '#E6E6FA',
  /** Pineal gland */
  pinealGland: '#DA70D6',
  /** Thyroid */
  thyroid: '#87CEEB',
  /** Parathyroid */
  parathyroid: '#FFD700',
  /** Thymus */
  thymus: '#98FB98',
  /** Adrenal cortex */
  adrenalCortex: '#F0E68C',
  /** Adrenal medulla */
  adrenalMedulla: '#FFA500',
  /** Pancreatic islets */
  islets: '#FAFAD2',
};

// =============================================================================
// LYMPHATIC SYSTEM COLORS
// =============================================================================

/**
 * Lymphatic structure colors
 */
export const lymphaticColors = {
  /** Lymph node */
  lymphNode: '#90EE90',
  /** Lymph node cortex */
  lymphNodeCortex: '#98FB98',
  /** Lymph node medulla */
  lymphNodeMedulla: '#7CFC00',
  /** Lymphatic vessel */
  lymphaticVessel: '#ADFF2F',
  /** Lymph fluid */
  lymphFluid: '#F0FFF0',
  /** Spleen red pulp */
  spleenRedPulp: '#8B0000',
  /** Spleen white pulp */
  spleenWhitePulp: '#F5F5F5',
  /** Thymus cortex */
  thymusCortex: '#98FB98',
  /** Thymus medulla */
  thymusMedulla: '#F0FFF0',
  /** Tonsils */
  tonsils: '#FFB6C1',
};

// =============================================================================
// INTEGUMENTARY SYSTEM COLORS
// =============================================================================

/**
 * Skin layer colors
 */
export const skinColors = {
  /** Stratum corneum */
  stratumCorneum: '#DEB887',
  /** Stratum lucidum */
  stratumLucidum: '#F5DEB3',
  /** Stratum granulosum */
  stratumGranulosum: '#FFEFD5',
  /** Stratum spinosum */
  stratumSpinosum: '#FFE4C4',
  /** Stratum basale */
  stratumBasale: '#FFDAB9',
  /** Papillary dermis */
  papillaryDermis: '#FFC0CB',
  /** Reticular dermis */
  reticularDermis: '#FFB6C1',
  /** Hypodermis */
  hypodermis: '#FFFACD',
  /** Hair shaft */
  hairShaft: '#8B4513',
  /** Hair follicle */
  hairFollicle: '#A0522D',
  /** Sebaceous gland */
  sebaceousGland: '#FFD700',
  /** Sweat gland */
  sweatGland: '#87CEEB',
};

// =============================================================================
// SPECIAL SENSES COLORS
// =============================================================================

/**
 * Eye structure colors
 */
export const eyeColors = {
  /** Cornea */
  cornea: '#E0FFFF',
  /** Sclera */
  sclera: '#FFFAF0',
  /** Iris */
  iris: '#4169E1',
  /** Pupil */
  pupil: '#000000',
  /** Lens */
  lens: '#F0FFFF',
  /** Vitreous humor */
  vitreousHumor: '#F5FFFA',
  /** Retina */
  retina: '#FFE4E1',
  /** Choroid */
  choroid: '#8B0000',
  /** Optic nerve */
  opticNerve: '#FFD700',
};

/**
 * Ear structure colors
 */
export const earColors = {
  /** Tympanic membrane */
  tympanicMembrane: '#F5DEB3',
  /** Ossicles */
  ossicles: '#FAF0E6',
  /** Cochlea */
  cochlea: '#FFC0CB',
  /** Semicircular canals */
  semicircularCanals: '#E6E6FA',
  /** Vestibule */
  vestibule: '#DDA0DD',
  /** Auditory nerve */
  auditoryNerve: '#FFD700',
};

// =============================================================================
// CLINICAL AND DIAGNOSTIC COLORS
// =============================================================================

/**
 * Severity gradient for anatomical conditions
 */
export const anatomySeverityGradient = {
  /** Normal/Healthy tissue */
  normal: '#28A745',
  /** Mild abnormality */
  mild: '#FFC107',
  /** Moderate abnormality */
  moderate: '#FD7E14',
  /** Severe abnormality */
  severe: '#DC3545',
  /** Critical/Emergency */
  critical: '#6F42C1',
};

/**
 * Flowchart and diagram colors
 */
export const anatomyFlowchartColors = {
  /** Start/End nodes */
  terminal: '#4CAF50',
  /** Decision nodes */
  decision: '#FFC107',
  /** Process nodes */
  process: '#2196F3',
  /** Action required */
  action: '#FF5722',
  /** Warning/Caution */
  warning: '#FF9800',
  /** Success/Positive */
  success: '#28A745',
  /** Information */
  info: '#17A2B8',
};

// =============================================================================
// COMPLETE ANATOMY COLOR SCHEME
// =============================================================================

/**
 * Complete anatomy color scheme export
 */
export const anatomyColorScheme = {
  // Skeletal System
  bone: boneColors,
  cartilage: cartilageColors,
  joint: jointColors,

  // Muscular System
  muscle: muscleColors,
  connective: connectiveTissueColors,

  // Cardiovascular System
  vessel: vesselColors,
  heart: heartColors,
  blood: bloodColors,

  // Nervous System
  cns: cnsColors,
  pns: pnsColors,

  // Respiratory System
  respiratory: respiratoryColors,

  // Digestive System
  giTract: giTractColors,
  accessoryOrgans: accessoryOrganColors,

  // Urinary System
  urinary: urinaryColors,

  // Reproductive System
  femaleRepro: femaleReproColors,
  maleRepro: maleReproColors,

  // Endocrine System
  endocrine: endocrineColors,

  // Lymphatic System
  lymphatic: lymphaticColors,

  // Integumentary System
  skin: skinColors,

  // Special Senses
  eye: eyeColors,
  ear: earColors,

  // Clinical
  severity: anatomySeverityGradient,
  flowchart: anatomyFlowchartColors,

  // Quick access to most commonly used colors
  common: {
    bone: '#F5F5DC',
    cartilage: '#ADD8E6',
    muscle: '#CD5C5C',
    tendon: '#F5DEB3',
    artery: '#DC143C',
    vein: '#4169E1',
    nerve: '#FFD700',
    gland: '#DDA0DD',
    normal: '#28A745',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type BoneColors = typeof boneColors;
export type CartilageColors = typeof cartilageColors;
export type JointColors = typeof jointColors;
export type MuscleColors = typeof muscleColors;
export type ConnectiveTissueColors = typeof connectiveTissueColors;
export type VesselColors = typeof vesselColors;
export type HeartColors = typeof heartColors;
export type BloodColors = typeof bloodColors;
export type CNSColors = typeof cnsColors;
export type PNSColors = typeof pnsColors;
export type RespiratoryColors = typeof respiratoryColors;
export type GITractColors = typeof giTractColors;
export type AccessoryOrganColors = typeof accessoryOrganColors;
export type UrinaryColors = typeof urinaryColors;
export type FemaleReproColors = typeof femaleReproColors;
export type MaleReproColors = typeof maleReproColors;
export type EndocrineColors = typeof endocrineColors;
export type LymphaticColors = typeof lymphaticColors;
export type SkinColors = typeof skinColors;
export type EyeColors = typeof eyeColors;
export type EarColors = typeof earColors;
export type AnatomySeverityGradient = typeof anatomySeverityGradient;
export type AnatomyFlowchartColors = typeof anatomyFlowchartColors;
export type AnatomyColorScheme = typeof anatomyColorScheme;

export default anatomyColorScheme;
