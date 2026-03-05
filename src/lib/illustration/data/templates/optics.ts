/**
 * optics.ts
 * Optics diagram templates for FINNISH
 *
 * Contains comprehensive templates for optical physics including:
 * - Geometric optics (lenses, mirrors)
 * - Wave optics (interference, diffraction)
 * - Polarization
 * - Lasers and optical instruments
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// GEOMETRIC OPTICS TEMPLATES
// =============================================================================

/**
 * Thin Lens Diagram template
 */
export const thinLensDiagram: DiagramTemplate = {
  id: 'optics-thin-lens',
  name: 'Thin Lens Ray Diagram',
  description: 'Ray tracing for converging and diverging lenses',
  domain: 'physics',
  promptTemplate: `Create a thin lens ray diagram:
- Lens type: {{lensType}}
- Object distance: {{objectDistance}}
- Focal length: {{focalLength}}
- Image distance: {{imageDistance}}
- Magnification: {{magnification}}
- Image characteristics: {{imageCharacteristics}}
{{#additionalNotes}}Ray tracing notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lensType',
    'objectDistance',
    'focalLength',
    'imageDistance',
    'magnification',
    'imageCharacteristics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Object["Object"]
        O["Height h"]
    end
    subgraph Lens["Thin Lens f"]
        L["Optical axis"]
    end
    subgraph Image["Image"]
        I["Height h'"]
    end
    O -->|"Ray 1: parallel→F"| L
    O -->|"Ray 2: through center"| L
    L --> I`,
};

/**
 * Mirror Ray Diagram template
 */
export const mirrorRayDiagram: DiagramTemplate = {
  id: 'optics-mirror-rays',
  name: 'Mirror Ray Diagram',
  description: 'Ray tracing for concave and convex mirrors',
  domain: 'physics',
  promptTemplate: `Create a mirror ray diagram:
- Mirror type: {{mirrorType}}
- Radius of curvature: {{radiusCurvature}}
- Object position: {{objectPosition}}
- Image position: {{imagePosition}}
- Principal rays: {{principalRays}}
- Image type: {{imageType}}
{{#additionalNotes}}Reflection notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mirrorType',
    'radiusCurvature',
    'objectPosition',
    'imagePosition',
    'principalRays',
    'imageType',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Object["Object"]
        O["At distance d_o"]
    end
    subgraph Mirror["Concave Mirror"]
        C["Center C"]
        F["Focus F"]
    end
    subgraph Image["Image"]
        I["Real/Virtual"]
    end
    O -->|"Parallel ray"| Mirror -->|"Through F"| I
    O -->|"Through C"| Mirror -->|"Back through C"| I`,
};

/**
 * Snell's Law Refraction template
 */
export const snellsLaw: DiagramTemplate = {
  id: 'optics-snells-law',
  name: 'Snell Law Refraction',
  description: 'Light refraction at interface between media',
  domain: 'physics',
  promptTemplate: `Create a Snell's law diagram:
- Medium 1 index: {{medium1Index}}
- Medium 2 index: {{medium2Index}}
- Incident angle: {{incidentAngle}}
- Refracted angle: {{refractedAngle}}
- Critical angle: {{criticalAngle}}
- Total internal reflection: {{totalInternalReflection}}
{{#additionalNotes}}Refraction notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'medium1Index',
    'medium2Index',
    'incidentAngle',
    'refractedAngle',
    'criticalAngle',
    'totalInternalReflection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Medium1["n₁"]
        I["Incident ray θ₁"]
    end
    subgraph Interface["Boundary"]
        N["Normal line"]
    end
    subgraph Medium2["n₂"]
        R["Refracted ray θ₂"]
    end
    I --> Interface --> R
    N -.->|"n₁sinθ₁ = n₂sinθ₂"| R`,
};

/**
 * Prism Dispersion template
 */
export const prismDispersion: DiagramTemplate = {
  id: 'optics-prism-dispersion',
  name: 'Prism Dispersion',
  description: 'Wavelength-dependent refraction through a prism',
  domain: 'physics',
  promptTemplate: `Create a prism dispersion diagram:
- Prism material: {{prismMaterial}}
- Apex angle: {{apexAngle}}
- Incident white light: {{incidentLight}}
- Dispersion spectrum: {{dispersionSpectrum}}
- Deviation angles: {{deviationAngles}}
- Minimum deviation: {{minimumDeviation}}
{{#additionalNotes}}Spectral notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'prismMaterial',
    'apexAngle',
    'incidentLight',
    'dispersionSpectrum',
    'deviationAngles',
    'minimumDeviation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph White["White Light"]
        W["All wavelengths"]
    end
    subgraph Prism["Glass Prism"]
        P["n(λ)"]
    end
    subgraph Spectrum["Dispersed"]
        R["Red (least deviated)"]
        V["Violet (most deviated)"]
    end
    W --> Prism --> R
    Prism --> V`,
};

// =============================================================================
// WAVE OPTICS TEMPLATES
// =============================================================================

/**
 * Young's Double Slit template
 */
export const youngDoubleSlit: DiagramTemplate = {
  id: 'optics-young-double-slit',
  name: 'Young Double Slit Interference',
  description: 'Two-slit interference pattern and fringe spacing',
  domain: 'physics',
  promptTemplate: `Create a Young's double slit diagram:
- Slit separation: {{slitSeparation}}
- Screen distance: {{screenDistance}}
- Wavelength: {{wavelength}}
- Fringe spacing: {{fringeSpacing}}
- Intensity pattern: {{intensityPattern}}
- Path difference: {{pathDifference}}
{{#additionalNotes}}Interference notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'slitSeparation',
    'screenDistance',
    'wavelength',
    'fringeSpacing',
    'intensityPattern',
    'pathDifference',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Coherent Source"]
        S["λ"]
    end
    subgraph Slits["Double Slit d"]
        S1["Slit 1"]
        S2["Slit 2"]
    end
    subgraph Screen["Screen L"]
        MAX["Bright: Δ = mλ"]
        MIN["Dark: Δ = (m+½)λ"]
    end
    S --> S1 --> MAX
    S --> S2 --> MIN`,
};

/**
 * Single Slit Diffraction template
 */
export const singleSlitDiffraction: DiagramTemplate = {
  id: 'optics-single-slit-diffraction',
  name: 'Single Slit Diffraction',
  description: 'Fraunhofer diffraction pattern from a single slit',
  domain: 'physics',
  promptTemplate: `Create a single slit diffraction diagram:
- Slit width: {{slitWidth}}
- Wavelength: {{wavelength}}
- Screen distance: {{screenDistance}}
- Central maximum width: {{centralMaximum}}
- Minima positions: {{minimaPositions}}
- Intensity envelope: {{intensityEnvelope}}
{{#additionalNotes}}Diffraction notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'slitWidth',
    'wavelength',
    'screenDistance',
    'centralMaximum',
    'minimaPositions',
    'intensityEnvelope',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Plane Wave λ"]
        W["Wavefronts"]
    end
    subgraph Slit["Slit width a"]
        A["Aperture"]
    end
    subgraph Pattern["Diffraction Pattern"]
        C["Central max"]
        M["Minima at a sinθ = mλ"]
    end
    W --> Slit --> Pattern`,
};

/**
 * Diffraction Grating template
 */
export const diffractionGrating: DiagramTemplate = {
  id: 'optics-diffraction-grating',
  name: 'Diffraction Grating',
  description: 'Multiple slit interference and spectral analysis',
  domain: 'physics',
  promptTemplate: `Create a diffraction grating diagram:
- Grating spacing: {{gratingSpacing}}
- Number of lines: {{numberOfLines}}
- Order numbers: {{orderNumbers}}
- Angular dispersion: {{angularDispersion}}
- Resolving power: {{resolvingPower}}
- Spectral applications: {{spectralApplications}}
{{#additionalNotes}}Spectroscopy notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gratingSpacing',
    'numberOfLines',
    'orderNumbers',
    'angularDispersion',
    'resolvingPower',
    'spectralApplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Light["Incident Light"]
        L["Mixed λ"]
    end
    subgraph Grating["N slits, spacing d"]
        G["d sinθ = mλ"]
    end
    subgraph Orders["Diffraction Orders"]
        M0["m=0 (zeroth)"]
        M1["m=1 (first)"]
        M2["m=2 (second)"]
    end
    Light --> Grating --> Orders`,
};

/**
 * Thin Film Interference template
 */
export const thinFilmInterference: DiagramTemplate = {
  id: 'optics-thin-film',
  name: 'Thin Film Interference',
  description: 'Interference in thin films like soap bubbles and oil slicks',
  domain: 'physics',
  promptTemplate: `Create a thin film interference diagram:
- Film material: {{filmMaterial}}
- Film thickness: {{filmThickness}}
- Refractive indices: {{refractiveIndices}}
- Phase changes: {{phaseChanges}}
- Constructive/destructive: {{interferenceCondition}}
- Color observed: {{colorObserved}}
{{#additionalNotes}}Film optics notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'filmMaterial',
    'filmThickness',
    'refractiveIndices',
    'phaseChanges',
    'interferenceCondition',
    'colorObserved',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Incident["Incident Light"]
        I["Ray at angle θ"]
    end
    subgraph Film["Thin Film t, n"]
        R1["Reflection 1 (phase?)"]
        R2["Reflection 2"]
    end
    subgraph Condition["Interference"]
        C["2nt = mλ or (m+½)λ"]
    end
    I --> Film
    R1 --> Condition
    R2 --> Condition`,
};

// =============================================================================
// POLARIZATION TEMPLATES
// =============================================================================

/**
 * Polarization States template
 */
export const polarizationStates: DiagramTemplate = {
  id: 'optics-polarization-states',
  name: 'Polarization States',
  description: 'Linear, circular, and elliptical polarization',
  domain: 'physics',
  promptTemplate: `Create a polarization states diagram:
- Polarization type: {{polarizationType}}
- E field components: {{eFieldComponents}}
- Phase difference: {{phaseDifference}}
- Handedness: {{handedness}}
- Jones vector: {{jonesVector}}
- Visualization: {{visualization}}
{{#additionalNotes}}Polarization notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'polarizationType',
    'eFieldComponents',
    'phaseDifference',
    'handedness',
    'jonesVector',
    'visualization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Linear["Linear"]
        L["E along one axis"]
    end
    subgraph Circular["Circular"]
        C["Ex, Ey with Δφ=90°"]
    end
    subgraph Elliptical["Elliptical"]
        E["General case"]
    end
    Linear --> Circular --> Elliptical`,
};

/**
 * Malus Law template
 */
export const malusLaw: DiagramTemplate = {
  id: 'optics-malus-law',
  name: 'Malus Law',
  description: 'Intensity transmission through polarizers',
  domain: 'physics',
  promptTemplate: `Create a Malus law diagram:
- Unpolarized source: {{unpolarizedSource}}
- First polarizer: {{firstPolarizer}}
- Second polarizer angle: {{secondPolarizerAngle}}
- Transmitted intensity: {{transmittedIntensity}}
- Crossed polarizers: {{crossedPolarizers}}
- Multiple polarizers: {{multiplePolarizers}}
{{#additionalNotes}}Polarizer notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'unpolarizedSource',
    'firstPolarizer',
    'secondPolarizerAngle',
    'transmittedIntensity',
    'crossedPolarizers',
    'multiplePolarizers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Unpol["Unpolarized I₀"]
        U["Random polarization"]
    end
    subgraph P1["Polarizer 1"]
        POL["I₀/2"]
    end
    subgraph P2["Analyzer θ"]
        AN["I = (I₀/2)cos²θ"]
    end
    Unpol --> P1 --> P2`,
};

/**
 * Brewster Angle template
 */
export const brewsterAngle: DiagramTemplate = {
  id: 'optics-brewster-angle',
  name: 'Brewster Angle',
  description: 'Polarization by reflection at Brewster angle',
  domain: 'physics',
  promptTemplate: `Create a Brewster angle diagram:
- Interface materials: {{interfaceMaterials}}
- Brewster angle: {{brewsterAngle}}
- Reflected polarization: {{reflectedPolarization}}
- Refracted ray angle: {{refractedAngle}}
- P and S components: {{pAndSComponents}}
- Applications: {{applications}}
{{#additionalNotes}}Polarization by reflection: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'interfaceMaterials',
    'brewsterAngle',
    'reflectedPolarization',
    'refractedAngle',
    'pAndSComponents',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Incident["Unpolarized"]
        I["θ_B = tan⁻¹(n₂/n₁)"]
    end
    subgraph Interface["At Brewster Angle"]
        B["θ_i + θ_r = 90°"]
    end
    subgraph Reflected["S-polarized only"]
        S["No P component"]
    end
    Incident --> Interface --> Reflected`,
};

// =============================================================================
// LASER AND INSTRUMENT TEMPLATES
// =============================================================================

/**
 * Laser Cavity template
 */
export const laserCavity: DiagramTemplate = {
  id: 'optics-laser-cavity',
  name: 'Laser Cavity',
  description: 'Optical resonator with gain medium',
  domain: 'physics',
  promptTemplate: `Create a laser cavity diagram:
- Gain medium: {{gainMedium}}
- Mirror reflectivities: {{mirrorReflectivities}}
- Cavity length: {{cavityLength}}
- Mode structure: {{modeStructure}}
- Threshold condition: {{thresholdCondition}}
- Output characteristics: {{outputCharacteristics}}
{{#additionalNotes}}Laser design: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gainMedium',
    'mirrorReflectivities',
    'cavityLength',
    'modeStructure',
    'thresholdCondition',
    'outputCharacteristics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph HR["HR Mirror R≈1"]
        M1["100% reflect"]
    end
    subgraph Gain["Active Medium"]
        G["Population inversion"]
    end
    subgraph OC["Output Coupler"]
        M2["Partial transmission"]
    end
    subgraph Out["Output"]
        L["Laser beam"]
    end
    HR <-->|"Standing wave"| Gain <--> OC --> Out`,
};

/**
 * Telescope Design template
 */
export const telescopeDesign: DiagramTemplate = {
  id: 'optics-telescope',
  name: 'Telescope Optical Design',
  description: 'Astronomical and terrestrial telescope configurations',
  domain: 'physics',
  promptTemplate: `Create a telescope design diagram:
- Telescope type: {{telescopeType}}
- Objective: {{objective}}
- Eyepiece: {{eyepiece}}
- Magnification: {{magnification}}
- Angular resolution: {{angularResolution}}
- Field of view: {{fieldOfView}}
{{#additionalNotes}}Design notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'telescopeType',
    'objective',
    'eyepiece',
    'magnification',
    'angularResolution',
    'fieldOfView',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Sky["Distant Object"]
        O["Parallel rays"]
    end
    subgraph Obj["Objective f_o"]
        FO["Forms real image"]
    end
    subgraph Eye["Eyepiece f_e"]
        FE["Magnifies"]
    end
    subgraph Obs["Observer"]
        E["Eye"]
    end
    Sky --> Obj --> Eye --> Obs`,
};

/**
 * Microscope Design template
 */
export const microscopeDesign: DiagramTemplate = {
  id: 'optics-microscope',
  name: 'Compound Microscope',
  description: 'Compound microscope optical system',
  domain: 'physics',
  promptTemplate: `Create a microscope design diagram:
- Objective lens: {{objectiveLens}}
- Eyepiece lens: {{eyepieceLens}}
- Tube length: {{tubeLength}}
- Total magnification: {{totalMagnification}}
- Numerical aperture: {{numericalAperture}}
- Resolution limit: {{resolutionLimit}}
{{#additionalNotes}}Microscopy notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'objectiveLens',
    'eyepieceLens',
    'tubeLength',
    'totalMagnification',
    'numericalAperture',
    'resolutionLimit',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Sample["Object"]
        S["Near f_obj"]
    end
    subgraph Obj["Objective"]
        FO["High NA, short f"]
    end
    subgraph Eye["Eyepiece"]
        FE["Magnifies"]
    end
    subgraph Final["Virtual Image"]
        I["M = M_obj × M_eye"]
    end
    Sample --> Obj --> Eye --> Final`,
};

/**
 * Fiber Optics template
 */
export const fiberOptics: DiagramTemplate = {
  id: 'optics-fiber',
  name: 'Optical Fiber',
  description: 'Light guidance in optical fibers by total internal reflection',
  domain: 'physics',
  promptTemplate: `Create an optical fiber diagram:
- Core index: {{coreIndex}}
- Cladding index: {{claddingIndex}}
- Numerical aperture: {{numericalAperture}}
- Acceptance angle: {{acceptanceAngle}}
- Mode types: {{modeTypes}}
- Attenuation: {{attenuation}}
{{#additionalNotes}}Fiber design: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'coreIndex',
    'claddingIndex',
    'numericalAperture',
    'acceptanceAngle',
    'modeTypes',
    'attenuation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Light Input"]
        I["Within NA cone"]
    end
    subgraph Fiber["Core + Cladding"]
        TIR["Total Internal Reflection"]
    end
    subgraph Output["Light Output"]
        O["Guided modes"]
    end
    Input --> Fiber -->|"Multiple reflections"| Output`,
};

// =============================================================================
// ADDITIONAL OPTICS TEMPLATES
// =============================================================================

/**
 * Michelson Interferometer template
 */
export const michelsonInterferometer: DiagramTemplate = {
  id: 'optics-michelson',
  name: 'Michelson Interferometer',
  description: 'Two-beam interferometer for precision measurements',
  domain: 'physics',
  promptTemplate: `Create a Michelson interferometer diagram:
- Light source: {{lightSource}}
- Beam splitter: {{beamSplitter}}
- Mirror positions: {{mirrorPositions}}
- Path difference: {{pathDifference}}
- Fringe pattern: {{fringePattern}}
- Applications: {{applications}}
{{#additionalNotes}}LIGO connection: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lightSource',
    'beamSplitter',
    'mirrorPositions',
    'pathDifference',
    'fringePattern',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    S["Source"] --> BS["Beam Splitter"]
    BS --> M1["Mirror 1"]
    BS --> M2["Mirror 2"]
    M1 --> BS
    M2 --> BS
    BS --> D["Detector"]
    subgraph Fringes
        F["Δ = 2d cosθ = mλ"]
    end`,
};

/**
 * Fabry-Perot Interferometer template
 */
export const fabryPerotInterferometer: DiagramTemplate = {
  id: 'optics-fabry-perot',
  name: 'Fabry-Perot Interferometer',
  description: 'Multiple-beam interferometer for high-resolution spectroscopy',
  domain: 'physics',
  promptTemplate: `Create a Fabry-Perot interferometer diagram:
- Mirror reflectivity: {{mirrorReflectivity}}
- Cavity spacing: {{cavitySpacing}}
- Free spectral range: {{freeSpectralRange}}
- Finesse: {{finesse}}
- Resolution: {{resolution}}
- Airy function: {{airyFunction}}
{{#additionalNotes}}Laser applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mirrorReflectivity',
    'cavitySpacing',
    'freeSpectralRange',
    'finesse',
    'resolution',
    'airyFunction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Cavity["Fabry-Perot Cavity"]
        M1["Mirror R"]
        GAP["Spacing d"]
        M2["Mirror R"]
    end
    I["Incident"] --> M1
    M1 --> M2
    M2 --> T["Transmitted"]
    subgraph Props
        FSR["FSR = c/2d"]
        FIN["F = π√R/(1-R)"]
    end`,
};

/**
 * Holography template
 */
export const holography: DiagramTemplate = {
  id: 'optics-holography',
  name: 'Holography',
  description: 'Recording and reconstruction of 3D images',
  domain: 'physics',
  promptTemplate: `Create a holography diagram:
- Recording setup: {{recordingSetup}}
- Reference beam: {{referenceBeam}}
- Object beam: {{objectBeam}}
- Hologram type: {{hologramType}}
- Reconstruction: {{reconstruction}}
- Applications: {{applications}}
{{#additionalNotes}}Coherence requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'recordingSetup',
    'referenceBeam',
    'objectBeam',
    'hologramType',
    'reconstruction',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Recording
        L["Laser"] --> BS["Beam Splitter"]
        BS --> REF["Reference Beam"]
        BS --> OBJ["Object Beam"]
        REF --> H["Hologram"]
        OBJ --> O["Object"] --> H
    end
    subgraph Playback
        H2["Hologram + Ref"] --> I["3D Image"]
    end`,
};

/**
 * Optical Activity template
 */
export const opticalActivity: DiagramTemplate = {
  id: 'optics-optical-activity',
  name: 'Optical Activity',
  description: 'Rotation of polarization by chiral substances',
  domain: 'physics',
  promptTemplate: `Create an optical activity diagram:
- Chiral substance: {{chiralSubstance}}
- Specific rotation: {{specificRotation}}
- Path length: {{pathLength}}
- Concentration: {{concentration}}
- Dextro vs levo: {{dextroLevo}}
- Applications: {{applications}}
{{#additionalNotes}}Saccharimetry: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chiralSubstance',
    'specificRotation',
    'pathLength',
    'concentration',
    'dextroLevo',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    P1["Polarizer"] --> S["Chiral Sample"]
    S --> P2["Analyzer"]
    subgraph Rotation
        R["α = [α]lc"]
        D["+ = dextrorotatory"]
        L["- = levorotatory"]
    end`,
};

/**
 * Birefringence template
 */
export const birefringence: DiagramTemplate = {
  id: 'optics-birefringence',
  name: 'Birefringence',
  description: 'Double refraction in anisotropic crystals',
  domain: 'physics',
  promptTemplate: `Create a birefringence diagram:
- Crystal type: {{crystalType}}
- Ordinary ray: {{ordinaryRay}}
- Extraordinary ray: {{extraordinaryRay}}
- Optic axis: {{opticAxis}}
- Retardation: {{retardation}}
- Wave plates: {{wavePlates}}
{{#additionalNotes}}LCD applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'crystalType',
    'ordinaryRay',
    'extraordinaryRay',
    'opticAxis',
    'retardation',
    'wavePlates',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    I["Unpolarized Light"] --> C["Birefringent Crystal"]
    C --> O["O-ray (n_o)"]
    C --> E["E-ray (n_e)"]
    subgraph WavePlates
        QWP["λ/4: Linear → Circular"]
        HWP["λ/2: Rotate 90°"]
    end`,
};

/**
 * Spectrometer Design template
 */
export const spectrometerDesign: DiagramTemplate = {
  id: 'optics-spectrometer',
  name: 'Spectrometer Design',
  description: 'Optical spectrometer components and resolution',
  domain: 'physics',
  promptTemplate: `Create a spectrometer design diagram:
- Entrance slit: {{entranceSlit}}
- Dispersive element: {{dispersiveElement}}
- Collimating optics: {{collimatingOptics}}
- Focusing optics: {{focusingOptics}}
- Detector: {{detector}}
- Resolution: {{resolution}}
{{#additionalNotes}}Czerny-Turner design: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'entranceSlit',
    'dispersiveElement',
    'collimatingOptics',
    'focusingOptics',
    'detector',
    'resolution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    S["Slit"] --> M1["Collimating Mirror"]
    M1 --> G["Grating"]
    G --> M2["Focusing Mirror"]
    M2 --> D["Detector Array"]
    subgraph Resolution
        R["R = λ/Δλ = mN"]
    end`,
};

/**
 * Rayleigh Scattering template
 */
export const rayleighScattering: DiagramTemplate = {
  id: 'optics-rayleigh-scattering',
  name: 'Rayleigh Scattering',
  description: 'Light scattering by particles smaller than wavelength',
  domain: 'physics',
  promptTemplate: `Create a Rayleigh scattering diagram:
- Particle size: {{particleSize}}
- Wavelength dependence: {{wavelengthDependence}}
- Scattering intensity: {{scatteringIntensity}}
- Blue sky explanation: {{blueSkyExplanation}}
- Sunset colors: {{sunsetColors}}
- Polarization: {{polarization}}
{{#additionalNotes}}Atmospheric optics: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'particleSize',
    'wavelengthDependence',
    'scatteringIntensity',
    'blueSkyExplanation',
    'sunsetColors',
    'polarization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Rayleigh
        I["I ∝ 1/λ⁴"]
        B["Blue scattered more"]
    end
    subgraph Sky
        S1["Noon: Blue overhead"]
        S2["Sunset: Red path longer"]
    end`,
};

/**
 * Aberrations template
 */
export const opticalAberrations: DiagramTemplate = {
  id: 'optics-aberrations',
  name: 'Optical Aberrations',
  description: 'Monochromatic and chromatic aberrations in lenses',
  domain: 'physics',
  promptTemplate: `Create an optical aberrations diagram:
- Spherical aberration: {{sphericalAberration}}
- Coma: {{coma}}
- Astigmatism: {{astigmatism}}
- Field curvature: {{fieldCurvature}}
- Distortion: {{distortion}}
- Chromatic aberration: {{chromaticAberration}}
{{#additionalNotes}}Correction methods: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sphericalAberration',
    'coma',
    'astigmatism',
    'fieldCurvature',
    'distortion',
    'chromaticAberration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Monochromatic
        SA["Spherical: marginal rays"]
        CO["Coma: off-axis comet"]
        AS["Astigmatism: tangential/sagittal"]
    end
    subgraph Chromatic
        CA["n(λ): different focal lengths"]
        ACH["Achromat: crown + flint"]
    end`,
};

/**
 * Gaussian Beam template
 */
export const gaussianBeam: DiagramTemplate = {
  id: 'optics-gaussian-beam',
  name: 'Gaussian Beam',
  description: 'Laser beam propagation and parameters',
  domain: 'physics',
  promptTemplate: `Create a Gaussian beam diagram:
- Beam waist: {{beamWaist}}
- Rayleigh range: {{rayleighRange}}
- Divergence angle: {{divergenceAngle}}
- Spot size variation: {{spotSizeVariation}}
- M-squared factor: {{mSquaredFactor}}
- ABCD matrix: {{abcdMatrix}}
{{#additionalNotes}}Beam quality: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'beamWaist',
    'rayleighRange',
    'divergenceAngle',
    'spotSizeVariation',
    'mSquaredFactor',
    'abcdMatrix',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Beam["Gaussian Beam"]
        W0["Waist w₀"]
        ZR["Rayleigh z_R = πw₀²/λ"]
        TH["Divergence θ = λ/πw₀"]
    end
    subgraph Profile
        WZ["w(z) = w₀√(1+(z/z_R)²)"]
    end`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All optics templates
 */
export const opticsTemplates: DiagramTemplate[] = [
  // Geometric Optics
  thinLensDiagram,
  mirrorRayDiagram,
  snellsLaw,
  prismDispersion,
  opticalAberrations,
  // Wave Optics
  youngDoubleSlit,
  singleSlitDiffraction,
  diffractionGrating,
  thinFilmInterference,
  michelsonInterferometer,
  fabryPerotInterferometer,
  holography,
  rayleighScattering,
  // Polarization
  polarizationStates,
  malusLaw,
  brewsterAngle,
  opticalActivity,
  birefringence,
  // Lasers and Instruments
  laserCavity,
  gaussianBeam,
  telescopeDesign,
  microscopeDesign,
  spectrometerDesign,
  fiberOptics,
];

export default opticsTemplates;
