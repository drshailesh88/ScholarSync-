/**
 * Health Icons Integration Module
 *
 * Health Icons is a free, open source collection of medical/healthcare icons.
 * Licensed under CC0 (Public Domain).
 *
 * @see https://healthicons.org/
 */

// Import verified health icons (filled variants)
import {
  // Anatomy
  Heart,
  HeartOrgan,
  HeartCardiogram,
  Lungs,
  Kidneys,
  Liver,
  Stomach,
  Intestine,
  Bladder,
  Eye,
  Ear,
  Spine,
  Body,
  BloodCells,
  BloodVessel,
  BloodDrop,
  BloodPressure,
  BloodBag,

  // Medical Equipment
  Stethoscope,
  Syringe,
  SyringeVaccine,
  Pills2 as Pills,
  Pill1,
  Ambulance,
  Hospital,
  Wheelchair,
  Thermometer,
  Crutches,
  Microscope,
  Xray,
  UltrasoundScanner,

  // Medical Conditions
  Virus,
  Bacteria,
  Allergies,
  Asthma,
  Diabetes,
  Fever,
  Headache,

  // Healthcare Services
  Doctor,
  DoctorFemale,
  DoctorMale,
  Nurse,
  EmergencyPost,
  Pharmacy,
} from 'healthicons-react/filled';

// Import outline variants
import {
  Heart as HeartOutline,
  Lungs as LungsOutline,
  Stethoscope as StethoscopeOutline,
} from 'healthicons-react/outline';

/**
 * Health icon metadata for search and categorization
 */
export interface HealthIconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  component: React.ComponentType<{ className?: string; size?: number }>;
  variant: 'filled' | 'outline';
}

/**
 * All available health icons with metadata
 */
export const healthIconsList: HealthIconMeta[] = [
  // Anatomy - Organs
  { id: 'heart', name: 'Heart', category: 'anatomy', keywords: ['cardiac', 'cardiology', 'love'], component: Heart, variant: 'filled' },
  { id: 'heart-organ', name: 'Heart Organ', category: 'anatomy', keywords: ['cardiac', 'cardiology', 'organ', 'circulatory'], component: HeartOrgan, variant: 'filled' },
  { id: 'heart-cardiogram', name: 'Heart Cardiogram', category: 'anatomy', keywords: ['cardiac', 'ecg', 'ekg', 'rhythm'], component: HeartCardiogram, variant: 'filled' },
  { id: 'lungs', name: 'Lungs', category: 'anatomy', keywords: ['pulmonary', 'respiratory', 'breathing', 'organ'], component: Lungs, variant: 'filled' },
  { id: 'kidneys', name: 'Kidneys', category: 'anatomy', keywords: ['renal', 'nephrology', 'organ', 'urinary'], component: Kidneys, variant: 'filled' },
  { id: 'liver', name: 'Liver', category: 'anatomy', keywords: ['hepatic', 'hepatology', 'organ', 'digestive'], component: Liver, variant: 'filled' },
  { id: 'stomach', name: 'Stomach', category: 'anatomy', keywords: ['gastric', 'digestive', 'gi', 'organ'], component: Stomach, variant: 'filled' },
  { id: 'intestine', name: 'Intestine', category: 'anatomy', keywords: ['bowel', 'colon', 'gi', 'digestive'], component: Intestine, variant: 'filled' },
  { id: 'bladder', name: 'Bladder', category: 'anatomy', keywords: ['urinary', 'urology', 'organ'], component: Bladder, variant: 'filled' },
  { id: 'eye', name: 'Eye', category: 'anatomy', keywords: ['ophthalmology', 'vision', 'ocular'], component: Eye, variant: 'filled' },
  { id: 'ear', name: 'Ear', category: 'anatomy', keywords: ['ent', 'hearing', 'auditory', 'otology'], component: Ear, variant: 'filled' },
  { id: 'spine', name: 'Spine', category: 'anatomy', keywords: ['vertebral', 'back', 'spinal', 'neurology'], component: Spine, variant: 'filled' },
  { id: 'body', name: 'Body', category: 'anatomy', keywords: ['human', 'figure', 'anatomy'], component: Body, variant: 'filled' },
  { id: 'blood-cells', name: 'Blood Cells', category: 'anatomy', keywords: ['hematology', 'rbc', 'wbc', 'platelet'], component: BloodCells, variant: 'filled' },
  { id: 'blood-vessel', name: 'Blood Vessel', category: 'anatomy', keywords: ['artery', 'vein', 'vascular'], component: BloodVessel, variant: 'filled' },
  { id: 'blood-drop', name: 'Blood Drop', category: 'anatomy', keywords: ['blood', 'donation', 'sample'], component: BloodDrop, variant: 'filled' },

  // Medical Equipment
  { id: 'stethoscope', name: 'Stethoscope', category: 'equipment', keywords: ['doctor', 'examination', 'auscultation'], component: Stethoscope, variant: 'filled' },
  { id: 'syringe', name: 'Syringe', category: 'equipment', keywords: ['injection', 'needle', 'vaccine'], component: Syringe, variant: 'filled' },
  { id: 'syringe-vaccine', name: 'Vaccine Syringe', category: 'equipment', keywords: ['injection', 'immunization', 'vaccine'], component: SyringeVaccine, variant: 'filled' },
  { id: 'pills', name: 'Pills', category: 'equipment', keywords: ['medication', 'drugs', 'pharmacy', 'tablet'], component: Pills, variant: 'filled' },
  { id: 'pill', name: 'Pill', category: 'equipment', keywords: ['medication', 'drugs', 'pharmacy', 'tablet'], component: Pill1, variant: 'filled' },
  { id: 'ambulance', name: 'Ambulance', category: 'equipment', keywords: ['emergency', 'ems', 'transport'], component: Ambulance, variant: 'filled' },
  { id: 'hospital', name: 'Hospital', category: 'equipment', keywords: ['healthcare', 'clinic', 'medical center'], component: Hospital, variant: 'filled' },
  { id: 'wheelchair', name: 'Wheelchair', category: 'equipment', keywords: ['mobility', 'disability', 'accessibility'], component: Wheelchair, variant: 'filled' },
  { id: 'thermometer', name: 'Thermometer', category: 'equipment', keywords: ['temperature', 'fever', 'vital signs'], component: Thermometer, variant: 'filled' },
  { id: 'blood-pressure', name: 'Blood Pressure', category: 'equipment', keywords: ['sphygmomanometer', 'bp', 'vital signs'], component: BloodPressure, variant: 'filled' },
  { id: 'blood-bag', name: 'Blood Bag', category: 'equipment', keywords: ['transfusion', 'donation', 'blood bank'], component: BloodBag, variant: 'filled' },
  { id: 'crutches', name: 'Crutches', category: 'equipment', keywords: ['mobility', 'injury', 'walking aid'], component: Crutches, variant: 'filled' },
  { id: 'microscope', name: 'Microscope', category: 'diagnostics', keywords: ['lab', 'pathology', 'histology'], component: Microscope, variant: 'filled' },
  { id: 'xray', name: 'X-Ray', category: 'diagnostics', keywords: ['radiology', 'imaging', 'radiograph'], component: Xray, variant: 'filled' },
  { id: 'ultrasound', name: 'Ultrasound', category: 'diagnostics', keywords: ['imaging', 'sonography', 'echo'], component: UltrasoundScanner, variant: 'filled' },

  // Medical Conditions
  { id: 'virus', name: 'Virus', category: 'conditions', keywords: ['infection', 'pathogen', 'disease', 'covid'], component: Virus, variant: 'filled' },
  { id: 'bacteria', name: 'Bacteria', category: 'conditions', keywords: ['infection', 'pathogen', 'microbe'], component: Bacteria, variant: 'filled' },
  { id: 'allergies', name: 'Allergies', category: 'conditions', keywords: ['allergy', 'immune', 'reaction'], component: Allergies, variant: 'filled' },
  { id: 'asthma', name: 'Asthma', category: 'conditions', keywords: ['respiratory', 'breathing', 'inhaler'], component: Asthma, variant: 'filled' },
  { id: 'diabetes', name: 'Diabetes', category: 'conditions', keywords: ['glucose', 'insulin', 'endocrine'], component: Diabetes, variant: 'filled' },
  { id: 'fever', name: 'Fever', category: 'conditions', keywords: ['temperature', 'sick', 'symptom'], component: Fever, variant: 'filled' },
  { id: 'headache', name: 'Headache', category: 'conditions', keywords: ['pain', 'migraine', 'symptom'], component: Headache, variant: 'filled' },

  // Healthcare Services
  { id: 'doctor', name: 'Doctor', category: 'services', keywords: ['physician', 'md', 'healthcare provider'], component: Doctor, variant: 'filled' },
  { id: 'doctor-female', name: 'Doctor (Female)', category: 'services', keywords: ['physician', 'md', 'woman'], component: DoctorFemale, variant: 'filled' },
  { id: 'doctor-male', name: 'Doctor (Male)', category: 'services', keywords: ['physician', 'md', 'man'], component: DoctorMale, variant: 'filled' },
  { id: 'nurse', name: 'Nurse', category: 'services', keywords: ['rn', 'nursing', 'healthcare'], component: Nurse, variant: 'filled' },
  { id: 'emergency', name: 'Emergency', category: 'services', keywords: ['er', 'urgent', 'trauma'], component: EmergencyPost, variant: 'filled' },
  { id: 'pharmacy', name: 'Pharmacy', category: 'services', keywords: ['drugstore', 'medication', 'rx'], component: Pharmacy, variant: 'filled' },

  // Outline variants
  { id: 'heart-outline', name: 'Heart (Outline)', category: 'anatomy', keywords: ['cardiac', 'cardiology'], component: HeartOutline, variant: 'outline' },
  { id: 'lungs-outline', name: 'Lungs (Outline)', category: 'anatomy', keywords: ['pulmonary', 'respiratory'], component: LungsOutline, variant: 'outline' },
  { id: 'stethoscope-outline', name: 'Stethoscope (Outline)', category: 'equipment', keywords: ['doctor', 'examination'], component: StethoscopeOutline, variant: 'outline' },
];

/**
 * Health icon categories
 */
export const healthIconCategories = {
  anatomy: { name: 'Anatomy & Organs', description: 'Body parts and organs' },
  equipment: { name: 'Medical Equipment', description: 'Tools and devices' },
  diagnostics: { name: 'Diagnostics', description: 'Imaging and testing' },
  conditions: { name: 'Conditions', description: 'Diseases and symptoms' },
  services: { name: 'Healthcare Services', description: 'Medical professionals and services' },
};

/**
 * Search health icons by query
 */
export function searchHealthIcons(query: string): HealthIconMeta[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return healthIconsList;

  return healthIconsList.filter(icon => {
    const searchText = [icon.name, icon.category, ...icon.keywords].join(' ').toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get icons by category
 */
export function getHealthIconsByCategory(category: string): HealthIconMeta[] {
  return healthIconsList.filter(icon => icon.category === category);
}

// Re-export commonly used icons
export {
  Heart,
  HeartOrgan,
  Lungs,
  Kidneys,
  Liver,
  Stethoscope,
  Syringe,
  Pills,
  Virus,
  Bacteria,
  Xray,
  Microscope,
};
