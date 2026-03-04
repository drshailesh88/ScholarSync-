/**
 * Icon Park Integration Module
 *
 * @icon-park/react provides 2400+ high-quality icons by ByteDance.
 * Licensed under Apache 2.0.
 *
 * This module focuses on science, medical, and research-related icons.
 *
 * @see https://iconpark.oceanengine.com/
 */

import {
  // Biological & Medical
  Brain,
  Cell,
  Bone,
  Lung,
  Heart,
  Heartbeat,
  HeartRate,
  Gastrointestinal,
  Coronavirus,
  Eyes,

  // Laboratory & Research
  Flask,
  Experiment,
  ExperimentOne,
  TestTube,
  Electrocardiogram,

  // Nature & Environment
  Leaf,
  TreeOne,
  Bug,
  Fish,
  Bird,

  // Data & Analysis
  ChartLineArea,
  ChartHistogram,
  ChartLine,
  ChartPie,
  DataSheet,
  Analysis,
  DatabaseNetwork,

  // Technology & Tools
  Cpu,
  Chip,
  Robot,
  Microscope,
  Telescope,
  Compass,
  Ruler,

  // Math & Physics
  Calculator,
  CalculatorOne,
  Formula,
  Lightning,
  Magnet,
  Scale,

  // General Science
  Earth,
  Sun,
  Moon,
  Planet,
  Rocket,

  // Chemistry
  WaterLevel,
  Fire,
  Wind,
  Thermometer,
  Radiation,
  NuclearPlant,
} from '@icon-park/react';

// Define proper type for Icon Park components
type IconParkComponent = typeof Brain;

/**
 * Icon Park icon metadata for search and categorization
 */
export interface IconParkMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  component: IconParkComponent;
}

/**
 * All available Icon Park science/research icons with metadata
 */
export const iconParkList: IconParkMeta[] = [
  // Biological & Medical
  { id: 'brain', name: 'Brain', category: 'biology', keywords: ['neurology', 'mind', 'organ', 'nervous system', 'cognitive'], component: Brain },
  { id: 'cell', name: 'Cell', category: 'biology', keywords: ['biology', 'organism', 'cellular', 'microbe', 'life'], component: Cell },
  { id: 'bone', name: 'Bone', category: 'biology', keywords: ['skeleton', 'orthopedic', 'anatomy', 'skeletal'], component: Bone },
  { id: 'lung', name: 'Lung', category: 'biology', keywords: ['respiratory', 'pulmonary', 'breathing', 'organ'], component: Lung },
  { id: 'heart-ip', name: 'Heart', category: 'biology', keywords: ['cardiac', 'cardiology', 'organ', 'cardiovascular'], component: Heart },
  { id: 'heartbeat-ip', name: 'Heartbeat', category: 'biology', keywords: ['pulse', 'vital signs', 'cardiac', 'rhythm'], component: Heartbeat },
  { id: 'heart-rate-ip', name: 'Heart Rate', category: 'biology', keywords: ['bpm', 'pulse', 'vital signs', 'cardiac'], component: HeartRate },
  { id: 'gastrointestinal', name: 'Gastrointestinal', category: 'biology', keywords: ['digestive', 'stomach', 'intestine', 'gi tract'], component: Gastrointestinal },
  { id: 'coronavirus', name: 'Coronavirus', category: 'biology', keywords: ['virus', 'covid', 'pathogen', 'disease', 'infection'], component: Coronavirus },
  { id: 'eyes-ip', name: 'Eyes', category: 'biology', keywords: ['vision', 'ophthalmology', 'sight', 'optical'], component: Eyes },

  // Laboratory & Research
  { id: 'flask', name: 'Flask', category: 'laboratory', keywords: ['chemistry', 'lab', 'beaker', 'experiment', 'research'], component: Flask },
  { id: 'experiment', name: 'Experiment', category: 'laboratory', keywords: ['research', 'lab', 'test', 'science', 'study'], component: Experiment },
  { id: 'experiment-one', name: 'Experiment Alt', category: 'laboratory', keywords: ['research', 'lab', 'test', 'science'], component: ExperimentOne },
  { id: 'test-tube', name: 'Test Tube', category: 'laboratory', keywords: ['lab', 'chemistry', 'sample', 'research'], component: TestTube },
  { id: 'ecg', name: 'ECG', category: 'laboratory', keywords: ['electrocardiogram', 'heart monitor', 'medical', 'diagnostic'], component: Electrocardiogram },
  { id: 'microscope-ip', name: 'Microscope', category: 'laboratory', keywords: ['lab', 'magnify', 'research', 'biology'], component: Microscope },
  { id: 'telescope', name: 'Telescope', category: 'laboratory', keywords: ['astronomy', 'observation', 'space', 'optics'], component: Telescope },

  // Nature & Environment
  { id: 'leaf', name: 'Leaf', category: 'nature', keywords: ['plant', 'botany', 'green', 'ecology', 'environment'], component: Leaf },
  { id: 'tree', name: 'Tree', category: 'nature', keywords: ['plant', 'botany', 'forest', 'ecology'], component: TreeOne },
  { id: 'bug', name: 'Bug', category: 'nature', keywords: ['insect', 'entomology', 'arthropod', 'animal'], component: Bug },
  { id: 'fish', name: 'Fish', category: 'nature', keywords: ['marine', 'aquatic', 'ichthyology', 'animal'], component: Fish },
  { id: 'bird', name: 'Bird', category: 'nature', keywords: ['ornithology', 'avian', 'animal', 'flying'], component: Bird },

  // Data & Analysis
  { id: 'chart-area', name: 'Area Chart', category: 'data', keywords: ['graph', 'statistics', 'visualization', 'analytics'], component: ChartLineArea },
  { id: 'histogram', name: 'Histogram', category: 'data', keywords: ['chart', 'statistics', 'distribution', 'bar graph'], component: ChartHistogram },
  { id: 'line-chart', name: 'Line Chart', category: 'data', keywords: ['graph', 'trend', 'statistics', 'time series'], component: ChartLine },
  { id: 'pie-chart', name: 'Pie Chart', category: 'data', keywords: ['graph', 'proportion', 'statistics', 'percentage'], component: ChartPie },
  { id: 'data-sheet', name: 'Data Sheet', category: 'data', keywords: ['spreadsheet', 'table', 'dataset', 'records'], component: DataSheet },
  { id: 'analysis', name: 'Analysis', category: 'data', keywords: ['research', 'study', 'investigation', 'examination'], component: Analysis },
  { id: 'database-ip', name: 'Database', category: 'data', keywords: ['storage', 'data', 'server', 'records'], component: DatabaseNetwork },

  // Technology & Tools
  { id: 'cpu', name: 'CPU', category: 'technology', keywords: ['processor', 'computer', 'chip', 'computing'], component: Cpu },
  { id: 'chip', name: 'Chip', category: 'technology', keywords: ['microchip', 'electronics', 'circuit', 'semiconductor'], component: Chip },
  { id: 'robot', name: 'Robot', category: 'technology', keywords: ['automation', 'ai', 'machine', 'android'], component: Robot },
  { id: 'compass', name: 'Compass', category: 'technology', keywords: ['navigation', 'direction', 'orientation', 'tool'], component: Compass },
  { id: 'ruler', name: 'Ruler', category: 'technology', keywords: ['measurement', 'scale', 'dimension', 'tool'], component: Ruler },

  // Math & Physics
  { id: 'calculator', name: 'Calculator', category: 'math', keywords: ['math', 'computation', 'arithmetic', 'number'], component: Calculator },
  { id: 'calculator-alt', name: 'Calculator Alt', category: 'math', keywords: ['math', 'computation', 'device', 'arithmetic'], component: CalculatorOne },
  { id: 'formula', name: 'Formula', category: 'math', keywords: ['mathematics', 'equation', 'calculus', 'expression'], component: Formula },
  { id: 'lightning', name: 'Lightning', category: 'physics', keywords: ['electricity', 'energy', 'power', 'electric'], component: Lightning },
  { id: 'magnet', name: 'Magnet', category: 'physics', keywords: ['magnetic', 'field', 'attraction', 'electromagnetic'], component: Magnet },
  { id: 'scale', name: 'Scale', category: 'physics', keywords: ['weight', 'balance', 'measurement', 'mass'], component: Scale },

  // Astronomy & Space
  { id: 'earth', name: 'Earth', category: 'astronomy', keywords: ['planet', 'globe', 'world', 'geography'], component: Earth },
  { id: 'sun', name: 'Sun', category: 'astronomy', keywords: ['star', 'solar', 'light', 'energy'], component: Sun },
  { id: 'moon', name: 'Moon', category: 'astronomy', keywords: ['lunar', 'satellite', 'night', 'phase'], component: Moon },
  { id: 'planet', name: 'Planet', category: 'astronomy', keywords: ['space', 'celestial', 'orbit', 'astronomy'], component: Planet },
  { id: 'rocket', name: 'Rocket', category: 'astronomy', keywords: ['space', 'launch', 'spacecraft', 'exploration'], component: Rocket },

  // Chemistry & Elements
  { id: 'water-level', name: 'Water Level', category: 'chemistry', keywords: ['liquid', 'h2o', 'hydrology', 'fluid'], component: WaterLevel },
  { id: 'fire', name: 'Fire', category: 'chemistry', keywords: ['flame', 'combustion', 'heat', 'energy'], component: Fire },
  { id: 'wind', name: 'Wind', category: 'chemistry', keywords: ['air', 'atmosphere', 'weather', 'gas'], component: Wind },
  { id: 'thermometer-ip', name: 'Thermometer', category: 'chemistry', keywords: ['temperature', 'heat', 'measurement', 'celsius'], component: Thermometer },
  { id: 'radiation', name: 'Radiation', category: 'chemistry', keywords: ['radioactive', 'nuclear', 'hazard', 'atomic'], component: Radiation },
  { id: 'nuclear-plant', name: 'Nuclear Plant', category: 'chemistry', keywords: ['atomic', 'energy', 'power', 'reactor'], component: NuclearPlant },
];

/**
 * Icon Park categories
 */
export const iconParkCategories = {
  biology: { name: 'Biology & Medical', description: 'Biological structures and medical icons' },
  laboratory: { name: 'Laboratory', description: 'Lab equipment and research tools' },
  nature: { name: 'Nature', description: 'Plants, animals, and environment' },
  data: { name: 'Data & Analysis', description: 'Charts, graphs, and data visualization' },
  technology: { name: 'Technology', description: 'Computing and electronics' },
  math: { name: 'Mathematics', description: 'Math symbols and calculations' },
  physics: { name: 'Physics', description: 'Physical forces and phenomena' },
  astronomy: { name: 'Astronomy', description: 'Space and celestial objects' },
  chemistry: { name: 'Chemistry', description: 'Chemical elements and reactions' },
};

/**
 * Search Icon Park icons by query
 */
export function searchIconPark(query: string): IconParkMeta[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return iconParkList;

  return iconParkList.filter(icon => {
    const searchText = [icon.name, icon.category, ...icon.keywords].join(' ').toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get icons by category
 */
export function getIconParkByCategory(category: string): IconParkMeta[] {
  return iconParkList.filter(icon => icon.category === category);
}

// Re-export commonly used icons (using unique names to avoid conflicts)
export {
  Brain as IconParkBrain,
  Cell as IconParkCell,
  Flask as IconParkFlask,
  Experiment as IconParkExperiment,
  Microscope as IconParkMicroscope,
  Heart as IconParkHeart,
  Lung as IconParkLung,
  Earth as IconParkEarth,
  Radiation as IconParkRadiation,
};
