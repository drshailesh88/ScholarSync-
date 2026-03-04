/**
 * ophthalmology.ts
 * Ophthalmology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for eye and vision medicine diagrams including:
 * - Eye anatomy structures (cornea blue, sclera white, iris colored)
 * - Retinal layers and vasculature
 * - Pathological conditions (hemorrhages, drusen, edema)
 * - Diagnostic categories and clinical severity
 * - Surgical procedures and equipment
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// TYPE DEFINITION
// =============================================================================

export interface OphthalmologyColorScheme {
  // Anatomy
  eyeAnatomy: typeof eyeAnatomyColors;
  anteriorSegment: typeof anteriorSegmentColors;
  posteriorSegment: typeof posteriorSegmentColors;
  vasculature: typeof vasculatureColors;
  // Pathology
  pathologyAnterior: typeof pathologyAnteriorColors;
  pathologyPosterior: typeof pathologyPosteriorColors;
  // Clinical
  severity: typeof severityColors;
  diagnostics: typeof diagnosticsColors;
  // Procedures
  surgical: typeof surgicalColors;
  laser: typeof laserColors;
}

// =============================================================================
// PRIMARY PALETTE - Eye Anatomy
// =============================================================================

/**
 * Eye anatomy colors for structural components
 */
export const eyeAnatomyColors = {
  /** Cornea - transparent/light blue */
  cornea: '#87CEEB',
  /** Sclera - white/off-white */
  sclera: '#F5F5F5',
  /** Iris - default brown (variable) */
  irisBrown: '#8B4513',
  /** Iris - blue variant */
  irisBlue: '#4169E1',
  /** Iris - green variant */
  irisGreen: '#228B22',
  /** Iris - hazel variant */
  irisHazel: '#8E7618',
  /** Pupil - black */
  pupil: '#1A1A1A',
  /** Lens - pale yellow/clear */
  lens: '#FFFACD',
  /** Lens nucleus - darker yellow */
  lensNucleus: '#FFD700',
  /** Vitreous - clear/gel */
  vitreous: '#E8E8E8',
  /** Conjunctiva - pink/vascular */
  conjunctiva: '#FFB6C1',
  /** Limbus - transition zone */
  limbus: '#C0C0C0',
};

// =============================================================================
// SECONDARY PALETTE - Anterior Segment
// =============================================================================

/**
 * Anterior segment structure colors
 */
export const anteriorSegmentColors = {
  /** Anterior chamber - aqueous/clear */
  anteriorChamber: '#E0F7FA',
  /** Posterior chamber */
  posteriorChamber: '#E0F0FF',
  /** Trabecular meshwork */
  trabecularMeshwork: '#D4A574',
  /** Schlemm's canal */
  schlemmsCanal: '#4169E1',
  /** Ciliary body */
  ciliaryBody: '#CD853F',
  /** Ciliary processes */
  ciliaryProcesses: '#DEB887',
  /** Zonular fibers */
  zonules: '#F0E68C',
  /** Iris stroma */
  irisStroma: '#A0522D',
  /** Iris pigment epithelium */
  irisPigment: '#654321',
  /** Corneal epithelium */
  cornealEpithelium: '#ADD8E6',
  /** Corneal stroma */
  cornealStroma: '#B0E0E6',
  /** Corneal endothelium */
  cornealEndothelium: '#87CEEB',
};

// =============================================================================
// TERTIARY PALETTE - Posterior Segment
// =============================================================================

/**
 * Posterior segment and retinal layer colors
 */
export const posteriorSegmentColors = {
  /** Retina - neural tissue */
  retina: '#FFE4B5',
  /** Retinal pigment epithelium (RPE) */
  rpe: '#8B4513',
  /** Bruch's membrane */
  bruchsMembrane: '#D2691E',
  /** Choroid */
  choroid: '#DC143C',
  /** Choriocapillaris */
  choriocapillaris: '#FF6B6B',
  /** Macula/fovea region */
  macula: '#FFD700',
  /** Fovea - central */
  fovea: '#FFA500',
  /** Optic nerve/disc */
  opticDisc: '#FFA07A',
  /** Optic cup */
  opticCup: '#FFE4C4',
  /** Neuroretinal rim */
  neuroretinalRim: '#FF8C00',
  /** Nerve fiber layer */
  nerveFiberLayer: '#F5DEB3',
  /** Photoreceptors - rods */
  rods: '#C0C0C0',
  /** Photoreceptors - cones */
  cones: '#FFD700',
  /** Inner limiting membrane */
  ilm: '#F0F0F0',
};

// =============================================================================
// VASCULAR PALETTE
// =============================================================================

/**
 * Ocular vasculature colors
 */
export const vasculatureColors = {
  /** Retinal arteries */
  retinalArtery: '#DC143C',
  /** Retinal veins */
  retinalVein: '#4169E1',
  /** Central retinal artery */
  centralRetinalArtery: '#B22222',
  /** Central retinal vein */
  centralRetinalVein: '#191970',
  /** Ciliary arteries */
  ciliaryArteries: '#FF6347',
  /** Episcleral veins */
  episcleralVeins: '#6495ED',
  /** Choroidal vessels */
  choroidalVessels: '#8B0000',
  /** Neovascularization */
  neovascularization: '#FF0000',
  /** Vascular sheathing */
  sheathing: '#F5F5DC',
};

// =============================================================================
// PATHOLOGY - ANTERIOR SEGMENT
// =============================================================================

/**
 * Anterior segment pathology colors
 */
export const pathologyAnteriorColors = {
  /** Cataract - nuclear sclerosis */
  cataractNuclear: '#8B4513',
  /** Cataract - cortical */
  cataractCortical: '#FFFFFF',
  /** Cataract - PSC */
  cataractPSC: '#F5F5DC',
  /** Cataract - brunescent */
  cataractBrunescent: '#654321',
  /** Corneal edema */
  cornealEdema: '#B0C4DE',
  /** Corneal ulcer/infiltrate */
  cornealInfiltrate: '#F5F5DC',
  /** Hypopyon */
  hypopyon: '#FFFACD',
  /** Hyphema */
  hyphema: '#8B0000',
  /** Keratic precipitates */
  keraticPrecipitates: '#D3D3D3',
  /** Anterior chamber cells */
  acCells: '#808080',
  /** Pterygium */
  pterygium: '#FFB6C1',
  /** Arcus senilis */
  arcusSenilis: '#E0E0E0',
};

// =============================================================================
// PATHOLOGY - POSTERIOR SEGMENT
// =============================================================================

/**
 * Posterior segment pathology colors
 */
export const pathologyPosteriorColors = {
  /** Hemorrhage - dot/blot */
  hemorrhageDotBlot: '#8B0000',
  /** Hemorrhage - flame */
  hemorrhageFlame: '#DC143C',
  /** Hemorrhage - preretinal */
  hemorrhagePreretinal: '#B22222',
  /** Vitreous hemorrhage */
  vitreousHemorrhage: '#800000',
  /** Hard exudates */
  hardExudates: '#FFD700',
  /** Soft exudates (CWS) */
  cottonWoolSpots: '#FFFFFF',
  /** Drusen - soft */
  drusenSoft: '#FFD700',
  /** Drusen - hard */
  drusenHard: '#DAA520',
  /** Subretinal fluid */
  subretinalFluid: '#ADD8E6',
  /** Intraretinal fluid (IRF) */
  intraretinalFluid: '#87CEEB',
  /** Pigment epithelial detachment */
  ped: '#D2B48C',
  /** Geographic atrophy */
  geographicAtrophy: '#A9A9A9',
  /** CNV membrane */
  cnvMembrane: '#808080',
  /** Macular hole */
  macularHole: '#2F2F2F',
  /** Epiretinal membrane */
  epiretinalMembrane: '#F5F5F5',
  /** Retinal detachment */
  retinalDetachment: '#D3D3D3',
  /** Lattice degeneration */
  latticeDegeneration: '#A9A9A9',
};

// =============================================================================
// SEVERITY PALETTE
// =============================================================================

/**
 * Clinical severity indicator colors
 */
export const severityColors = {
  /** Normal/healthy */
  normal: '#228B22',
  /** Mild pathology */
  mild: '#FFD700',
  /** Moderate pathology */
  moderate: '#FFA500',
  /** Severe pathology */
  severe: '#DC143C',
  /** Urgent/sight-threatening */
  urgent: '#8B0000',
  /** Emergency */
  emergency: '#FF0000',
  /** Stable/monitoring */
  stable: '#4169E1',
  /** Improving */
  improving: '#32CD32',
  /** Worsening/progressing */
  progressing: '#FF4500',
};

// =============================================================================
// DIAGNOSTICS PALETTE
// =============================================================================

/**
 * Diagnostic testing and imaging colors
 */
export const diagnosticsColors = {
  /** IOP - normal range */
  iopNormal: '#228B22',
  /** IOP - elevated */
  iopElevated: '#FFA500',
  /** IOP - high risk */
  iopHighRisk: '#DC143C',
  /** Visual field - normal */
  vfNormal: '#90EE90',
  /** Visual field - defect */
  vfDefect: '#2F2F2F',
  /** Visual field - borderline */
  vfBorderline: '#FFD700',
  /** OCT - normal RNFL */
  octNormal: '#228B22',
  /** OCT - borderline RNFL */
  octBorderline: '#FFD700',
  /** OCT - abnormal RNFL */
  octAbnormal: '#DC143C',
  /** Fluorescein angiography - leakage */
  faLeakage: '#FFFFFF',
  /** FA - pooling */
  faPooling: '#ADD8E6',
  /** FA - staining */
  faStaining: '#C0C0C0',
  /** FA - blockage */
  faBlockage: '#2F2F2F',
};

// =============================================================================
// SURGICAL PALETTE
// =============================================================================

/**
 * Surgical procedure colors
 */
export const surgicalColors = {
  /** Incision site */
  incision: '#FF6347',
  /** Capsulotomy/rhexis */
  capsulotomy: '#4169E1',
  /** IOL implant */
  iolImplant: '#87CEEB',
  /** IOL haptics */
  iolHaptics: '#4682B4',
  /** LASIK flap */
  lasikFlap: '#B0E0E6',
  /** Vitrectomy port */
  vitrectomyPort: '#696969',
  /** Scleral buckle */
  scleralBuckle: '#4169E1',
  /** Silicone oil */
  siliconOil: '#F0F0F0',
  /** Gas tamponade */
  gasTamponade: '#E8E8E8',
  /** Suture */
  suture: '#4169E1',
  /** Bleb (trabeculectomy) */
  bleb: '#E0E0E0',
  /** Tube shunt */
  tubeShunt: '#808080',
};

// =============================================================================
// LASER TREATMENT PALETTE
// =============================================================================

/**
 * Laser treatment colors
 */
export const laserColors = {
  /** Argon laser (green) */
  argonGreen: '#228B22',
  /** Argon laser (blue-green) */
  argonBlueGreen: '#20B2AA',
  /** YAG laser */
  yagLaser: '#FF4500',
  /** Excimer laser */
  excimerLaser: '#9370DB',
  /** Diode laser */
  diodeLaser: '#DC143C',
  /** SLT laser */
  sltLaser: '#32CD32',
  /** PRP burns */
  prpBurns: '#556B2F',
  /** Focal laser */
  focalLaser: '#228B22',
  /** LPI (iridotomy) */
  lpiSite: '#4169E1',
};

// =============================================================================
// COMBINED COLOR SCHEME EXPORT
// =============================================================================

/**
 * Complete ophthalmology color scheme
 */
export const ophthalmologyColorScheme: OphthalmologyColorScheme = {
  eyeAnatomy: eyeAnatomyColors,
  anteriorSegment: anteriorSegmentColors,
  posteriorSegment: posteriorSegmentColors,
  vasculature: vasculatureColors,
  pathologyAnterior: pathologyAnteriorColors,
  pathologyPosterior: pathologyPosteriorColors,
  severity: severityColors,
  diagnostics: diagnosticsColors,
  surgical: surgicalColors,
  laser: laserColors,
};

export default ophthalmologyColorScheme;
