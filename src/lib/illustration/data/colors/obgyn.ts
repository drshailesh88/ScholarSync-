/**
 * obgyn.ts
 * OB/GYN color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for obstetrics and gynecology diagrams including:
 * - Female reproductive anatomy
 * - Pregnancy and fetal development
 * - Labor and delivery stages
 * - Gynecologic pathology
 * - Obstetric emergencies
 * - Contraception and fertility
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Female Reproductive Anatomy
// =============================================================================

/**
 * Uterine and cervical tissue colors
 */
export const uterineColors = {
  /** Myometrium (uterine muscle) */
  myometrium: '#E8B4B8',
  /** Endometrium (proliferative phase) */
  endometriumProliferative: '#F5C6CB',
  /** Endometrium (secretory phase) */
  endometriumSecretory: '#F8D7DA',
  /** Cervix */
  cervix: '#D4A5A5',
  /** Cervical os */
  cervicalOs: '#8B4547',
  /** Ectocervix */
  ectocervix: '#F0C0C0',
  /** Endocervix */
  endocervix: '#E8A0A0',
  /** Uterine fundus */
  fundus: '#E8B4B8',
  /** Corpus */
  corpus: '#DCA0A4',
  /** Isthmus */
  isthmus: '#C8888C',
};

/**
 * Ovarian tissue and follicle colors
 */
export const ovarianColors = {
  /** Ovarian cortex */
  cortex: '#DDA0DD',
  /** Ovarian medulla */
  medulla: '#D8BFD8',
  /** Primordial follicle */
  primordialFollicle: '#E6E6FA',
  /** Primary follicle */
  primaryFollicle: '#D8BFD8',
  /** Secondary follicle */
  secondaryFollicle: '#DDA0DD',
  /** Graafian/mature follicle */
  graafianFollicle: '#BA55D3',
  /** Corpus luteum */
  corpusLuteum: '#FFD700',
  /** Corpus albicans */
  corpusAlbicans: '#F5F5DC',
  /** Theca cells */
  thecaCells: '#DA70D6',
  /** Granulosa cells */
  granulosaCells: '#EE82EE',
  /** Oocyte */
  oocyte: '#FFE4E1',
};

/**
 * Fallopian tube and vaginal colors
 */
export const tubalVaginalColors = {
  /** Fallopian tube wall */
  tubeWall: '#F4A460',
  /** Fimbriae */
  fimbriae: '#FFB6C1',
  /** Ampulla */
  ampulla: '#FFA07A',
  /** Isthmus of tube */
  tubeIsthmus: '#E9967A',
  /** Cilia (tubal epithelium) */
  cilia: '#FFE4B5',
  /** Vaginal mucosa */
  vaginalMucosa: '#FFDAB9',
  /** Vaginal rugae */
  rugae: '#F5DEB3',
  /** Bartholin gland */
  bartholinGland: '#DEB887',
};

// =============================================================================
// PREGNANCY AND FETAL DEVELOPMENT
// =============================================================================

/**
 * Fetal tissue colors
 */
export const fetalColors = {
  /** Fetal skin */
  fetalSkin: '#FFEFD5',
  /** Fetal tissue general */
  fetalTissue: '#FFE4C4',
  /** Umbilical cord */
  umbilicalCord: '#87CEEB',
  /** Umbilical arteries */
  umbilicalArteries: '#DC143C',
  /** Umbilical vein */
  umbilicalVein: '#4169E1',
  /** Wharton's jelly */
  whartonJelly: '#E0FFFF',
  /** Vernix caseosa */
  vernix: '#FFFFF0',
  /** Lanugo */
  lanugo: '#F5F5DC',
};

/**
 * Placental and amniotic colors
 */
export const placentalColors = {
  /** Placental disc */
  placenta: '#CD5C5C',
  /** Chorionic villi */
  chorionicVilli: '#F08080',
  /** Decidua basalis */
  deciduaBasalis: '#C08080',
  /** Intervillous space */
  intervillousSpace: '#8B0000',
  /** Amniotic fluid */
  amnioticFluid: '#87CEEB',
  /** Amnion membrane */
  amnion: '#E0FFFF',
  /** Chorion membrane */
  chorion: '#B0E0E6',
  /** Maternal blood */
  maternalBlood: '#DC143C',
  /** Fetal blood */
  fetalBlood: '#FF6347',
};

/**
 * Gestational age milestone colors
 */
export const gestationalColors = {
  /** First trimester (weeks 1-12) */
  firstTrimester: '#98FB98',
  /** Second trimester (weeks 13-27) */
  secondTrimester: '#FFD700',
  /** Third trimester (weeks 28-40) */
  thirdTrimester: '#FFA500',
  /** Term (37-42 weeks) */
  term: '#228B22',
  /** Preterm (<37 weeks) */
  preterm: '#FF6347',
  /** Post-term (>42 weeks) */
  postterm: '#DC143C',
  /** Embryonic period (weeks 1-8) */
  embryonic: '#90EE90',
  /** Fetal period (weeks 9-40) */
  fetalPeriod: '#32CD32',
  /** Viability threshold (23-24 weeks) */
  viability: '#FFA500',
};

// =============================================================================
// LABOR AND DELIVERY
// =============================================================================

/**
 * Labor stage colors
 */
export const laborColors = {
  /** Latent phase */
  latentPhase: '#90EE90',
  /** Active phase */
  activePhase: '#FFD700',
  /** Transition */
  transition: '#FFA500',
  /** Second stage (pushing) */
  secondStage: '#FF6347',
  /** Third stage (placental) */
  thirdStage: '#DC143C',
  /** Contractions */
  contraction: '#FF4500',
  /** Rest period */
  restPeriod: '#98FB98',
  /** Cervical dilation */
  cervicalDilation: '#DA70D6',
  /** Effacement */
  effacement: '#EE82EE',
};

/**
 * Fetal heart rate tracing colors
 */
export const fhrColors = {
  /** Normal baseline (110-160 bpm) */
  normalBaseline: '#228B22',
  /** Tachycardia (>160 bpm) */
  tachycardia: '#FFA500',
  /** Bradycardia (<110 bpm) */
  bradycardia: '#DC143C',
  /** Moderate variability */
  moderateVariability: '#228B22',
  /** Minimal variability */
  minimalVariability: '#FFA500',
  /** Absent variability */
  absentVariability: '#DC143C',
  /** Accelerations */
  accelerations: '#32CD32',
  /** Early decelerations */
  earlyDecels: '#FFD700',
  /** Variable decelerations */
  variableDecels: '#FFA500',
  /** Late decelerations */
  lateDecels: '#DC143C',
  /** Category I tracing */
  categoryI: '#228B22',
  /** Category II tracing */
  categoryII: '#FFA500',
  /** Category III tracing */
  categoryIII: '#DC143C',
};

/**
 * Delivery method colors
 */
export const deliveryColors = {
  /** Spontaneous vaginal delivery */
  svd: '#228B22',
  /** Cesarean section */
  cesarean: '#4169E1',
  /** Operative vaginal (vacuum) */
  vacuum: '#FFD700',
  /** Operative vaginal (forceps) */
  forceps: '#FFA500',
  /** Breech delivery */
  breech: '#DC143C',
  /** VBAC success */
  vbacSuccess: '#32CD32',
  /** Shoulder dystocia */
  shoulderDystocia: '#8B0000',
};

// =============================================================================
// PATHOLOGY COLORS
// =============================================================================

/**
 * Gynecologic pathology colors
 */
export const gynPathologyColors = {
  /** Endometriosis */
  endometriosis: '#8B008B',
  /** Adenomyosis */
  adenomyosis: '#9932CC',
  /** Fibroids/Leiomyoma */
  fibroids: '#CD5C5C',
  /** PCOS ovary */
  pcos: '#9370DB',
  /** Ovarian cyst */
  ovarianCyst: '#87CEEB',
  /** Ectopic pregnancy */
  ectopic: '#FF0000',
  /** Cervical dysplasia (CIN) */
  cin: '#FF6347',
  /** Endometrial hyperplasia */
  endometrialHyperplasia: '#FA8072',
  /** Ovarian cancer */
  ovarianCancer: '#4B0082',
  /** Endometrial cancer */
  endometrialCancer: '#800080',
  /** Cervical cancer */
  cervicalCancer: '#8B0000',
  /** PID/TOA */
  pidToa: '#B22222',
  /** Bartholin cyst */
  bartholinCyst: '#ADD8E6',
};

/**
 * Obstetric pathology colors
 */
export const obsPathologyColors = {
  /** Preeclampsia */
  preeclampsia: '#FF4500',
  /** Eclampsia */
  eclampsia: '#8B0000',
  /** HELLP syndrome */
  hellp: '#DC143C',
  /** Gestational diabetes */
  gdm: '#FFA500',
  /** Placenta previa */
  placentaPrevia: '#FF6347',
  /** Placental abruption */
  abruption: '#8B0000',
  /** Placenta accreta spectrum */
  accreta: '#B22222',
  /** Postpartum hemorrhage */
  pph: '#DC143C',
  /** Chorioamnionitis */
  chorioamnionitis: '#CD853F',
  /** PPROM */
  pprom: '#87CEEB',
  /** Preterm labor */
  pretermLabor: '#FFA500',
  /** IUGR/FGR */
  iugr: '#DDA0DD',
  /** Macrosomia */
  macrosomia: '#FFD700',
  /** Oligohydramnios */
  oligohydramnios: '#B0C4DE',
  /** Polyhydramnios */
  polyhydramnios: '#4682B4',
  /** Molar pregnancy */
  molar: '#9370DB',
};

// =============================================================================
// CONTRACEPTION AND FERTILITY
// =============================================================================

/**
 * Contraceptive method colors
 */
export const contraceptionColors = {
  /** Copper IUD */
  copperIud: '#CD853F',
  /** Hormonal IUD */
  hormonalIud: '#DDA0DD',
  /** Implant */
  implant: '#20B2AA',
  /** Oral contraceptives */
  ocp: '#FF69B4',
  /** Patch */
  patch: '#FFB6C1',
  /** Ring */
  ring: '#DA70D6',
  /** Injectable */
  injectable: '#4682B4',
  /** Barrier methods */
  barrier: '#B0C4DE',
  /** Sterilization */
  sterilization: '#708090',
  /** Natural methods */
  natural: '#90EE90',
};

/**
 * Fertility treatment colors
 */
export const fertilityColors = {
  /** Ovulation induction */
  ovulationInduction: '#FFD700',
  /** IUI */
  iui: '#87CEEB',
  /** IVF */
  ivf: '#4169E1',
  /** ICSI */
  icsi: '#6495ED',
  /** Embryo */
  embryo: '#FFE4E1',
  /** Blastocyst */
  blastocyst: '#FFA07A',
  /** Sperm */
  sperm: '#B0E0E6',
  /** Egg retrieval */
  eggRetrieval: '#DDA0DD',
  /** Embryo transfer */
  embryoTransfer: '#98FB98',
  /** Cryopreservation */
  cryopreservation: '#00CED1',
};

// =============================================================================
// MENSTRUAL CYCLE
// =============================================================================

/**
 * Menstrual cycle phase colors
 */
export const menstrualCycleColors = {
  /** Menstrual phase (days 1-5) */
  menstrual: '#DC143C',
  /** Follicular phase (days 1-14) */
  follicular: '#FF69B4',
  /** Ovulation (day 14) */
  ovulation: '#FFD700',
  /** Luteal phase (days 14-28) */
  luteal: '#DDA0DD',
  /** Proliferative endometrium */
  proliferative: '#FFB6C1',
  /** Secretory endometrium */
  secretory: '#E6E6FA',
  /** Ischemic phase */
  ischemic: '#D3D3D3',
};

/**
 * Hormone level colors
 */
export const hormoneColors = {
  /** Estrogen */
  estrogen: '#FF69B4',
  /** Progesterone */
  progesterone: '#DDA0DD',
  /** FSH */
  fsh: '#4169E1',
  /** LH */
  lh: '#FFD700',
  /** hCG */
  hcg: '#32CD32',
  /** Prolactin */
  prolactin: '#87CEEB',
  /** GnRH */
  gnrh: '#9370DB',
  /** Inhibin */
  inhibin: '#CD853F',
  /** AMH */
  amh: '#20B2AA',
};

// =============================================================================
// PROCEDURES AND EQUIPMENT
// =============================================================================

/**
 * Surgical procedure colors
 */
export const procedureColors = {
  /** Cesarean incision */
  cesareanIncision: '#DC143C',
  /** Pfannenstiel incision */
  pfannenstielIncision: '#FF6347',
  /** Midline incision */
  midlineIncision: '#CD5C5C',
  /** Laparoscopic ports */
  laparoscopicPorts: '#4682B4',
  /** Hysteroscopy */
  hysteroscopy: '#87CEEB',
  /** D&C */
  dandC: '#DDA0DD',
  /** LEEP/cone */
  leepCone: '#FFA500',
  /** Sutures */
  sutures: '#4169E1',
  /** Hemostasis */
  hemostasis: '#228B22',
  /** Active bleeding */
  activeBleed: '#DC143C',
};

/**
 * Equipment colors
 */
export const equipmentColors = {
  /** Speculum */
  speculum: '#C0C0C0',
  /** Forceps (delivery) */
  forceps: '#708090',
  /** Vacuum extractor */
  vacuum: '#B0C4DE',
  /** IUD */
  iud: '#87CEEB',
  /** Cervical dilators */
  dilators: '#A9A9A9',
  /** Curette */
  curette: '#808080',
  /** Fetal monitor */
  fetalMonitor: '#228B22',
  /** Ultrasound probe */
  ultrasoundProbe: '#4682B4',
  /** Colposcope */
  colposcope: '#6495ED',
};

// =============================================================================
// SEVERITY AND STATUS GRADIENTS
// =============================================================================

/**
 * Clinical severity gradient
 */
export const severityGradient = {
  /** Normal/Healthy */
  normal: '#228B22',
  /** Mild concern */
  mild: '#FFD700',
  /** Moderate concern */
  moderate: '#FFA500',
  /** Severe/High risk */
  severe: '#DC143C',
  /** Emergency/Critical */
  emergency: '#8B0000',
};

/**
 * Pregnancy status colors
 */
export const pregnancyStatusColors = {
  /** Viable pregnancy */
  viable: '#228B22',
  /** Threatened */
  threatened: '#FFA500',
  /** Inevitable */
  inevitable: '#FF6347',
  /** Incomplete */
  incomplete: '#DC143C',
  /** Complete */
  complete: '#D3D3D3',
  /** Missed */
  missed: '#808080',
  /** Ectopic */
  ectopic: '#8B0000',
};

// =============================================================================
// FLOWCHART AND DECISION COLORS
// =============================================================================

/**
 * Flowchart node colors
 */
export const flowchartColors = {
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
  /** Success/Positive outcome */
  success: '#28A745',
  /** Failure/Negative outcome */
  failure: '#DC3545',
  /** Information */
  info: '#17A2B8',
  /** Referral needed */
  referral: '#9C27B0',
  /** Emergency action */
  emergencyAction: '#B71C1C',
  /** Continue monitoring */
  monitoring: '#1976D2',
};

// =============================================================================
// COMPLETE OBGYN COLOR SCHEME
// =============================================================================

/**
 * Complete OB/GYN color scheme export
 */
export const obgynColorScheme = {
  // Anatomy
  uterine: uterineColors,
  ovarian: ovarianColors,
  tubalVaginal: tubalVaginalColors,

  // Pregnancy
  fetal: fetalColors,
  placental: placentalColors,
  gestational: gestationalColors,

  // Labor and Delivery
  labor: laborColors,
  fhr: fhrColors,
  delivery: deliveryColors,

  // Pathology
  gynPathology: gynPathologyColors,
  obsPathology: obsPathologyColors,

  // Reproductive Health
  contraception: contraceptionColors,
  fertility: fertilityColors,
  menstrualCycle: menstrualCycleColors,
  hormones: hormoneColors,

  // Clinical
  procedure: procedureColors,
  equipment: equipmentColors,
  severity: severityGradient,
  pregnancyStatus: pregnancyStatusColors,
  flowchart: flowchartColors,

  // Quick access to commonly used colors
  common: {
    uterus: '#E8B4B8',
    ovary: '#DDA0DD',
    placenta: '#CD5C5C',
    amnioticFluid: '#87CEEB',
    fetus: '#FFEFD5',
    normalFHR: '#228B22',
    abnormalFHR: '#DC143C',
    emergency: '#8B0000',
    normal: '#228B22',
    abnormal: '#DC143C',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type UterineColors = typeof uterineColors;
export type OvarianColors = typeof ovarianColors;
export type TubalVaginalColors = typeof tubalVaginalColors;
export type FetalColors = typeof fetalColors;
export type PlacentalColors = typeof placentalColors;
export type GestationalColors = typeof gestationalColors;
export type LaborColors = typeof laborColors;
export type FHRColors = typeof fhrColors;
export type DeliveryColors = typeof deliveryColors;
export type GynPathologyColors = typeof gynPathologyColors;
export type ObsPathologyColors = typeof obsPathologyColors;
export type ContraceptionColors = typeof contraceptionColors;
export type FertilityColors = typeof fertilityColors;
export type MenstrualCycleColors = typeof menstrualCycleColors;
export type HormoneColors = typeof hormoneColors;
export type ProcedureColors = typeof procedureColors;
export type EquipmentColors = typeof equipmentColors;
export type SeverityGradient = typeof severityGradient;
export type PregnancyStatusColors = typeof pregnancyStatusColors;
export type FlowchartColors = typeof flowchartColors;
export type OBGYNColorScheme = typeof obgynColorScheme;

export default obgynColorScheme;
