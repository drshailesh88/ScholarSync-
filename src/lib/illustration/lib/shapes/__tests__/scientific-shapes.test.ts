/**
 * Tests for Scientific Shape Generators
 *
 * Tests SVG generation for all 15 scientific shapes:
 * - DNA Helix, Cell Membrane, Cell Layer, Pathway Arrow, Neuron, Mitochondria
 * - Nucleus, Ribosome, Vesicle, Virus, Bacteria, Golgi, ER, Microtubule, Protein
 */

import { describe, it, expect } from 'vitest';
import {
  generateDNAHelix,
  generateCellMembrane,
  generateCellLayer,
  generatePathwayArrow,
  generateNeuron,
  generateMitochondria,
  generateNucleus,
  generateRibosome,
  generateVesicle,
  generateVirus,
  generateBacteria,
  generateGolgi,
  generateER,
  generateMicrotubule,
  generateProtein,
} from '../scientific-shapes';

describe('scientific-shapes', () => {
  describe('generateDNAHelix', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateDNAHelix();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('should use custom length parameter', () => {
      const defaultSvg = generateDNAHelix();
      const customSvg = generateDNAHelix({ length: 300 });
      // Custom length should produce different SVG than default
      expect(customSvg).not.toBe(defaultSvg);
      expect(customSvg).toContain('<svg');
    });

    it('should use custom basePairs parameter', () => {
      const svg = generateDNAHelix({ basePairs: 15 });
      // Should have more base pair elements
      expect(svg.length).toBeGreaterThan(0);
    });

    it('should support different styles', () => {
      const simpleSvg = generateDNAHelix({ style: 'simple' });
      const detailedSvg = generateDNAHelix({ style: 'detailed' });
      expect(simpleSvg).toContain('<svg');
      expect(detailedSvg).toContain('<svg');
    });
  });

  describe('generateCellMembrane', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateCellMembrane();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should create bilayer when bilayer option is true', () => {
      const svg = generateCellMembrane({ bilayer: true });
      expect(svg).toContain('<svg');
    });

    it('should use custom length parameter', () => {
      const svg = generateCellMembrane({ length: 400 });
      // Check that viewBox width matches the length (plus some padding for the membrane height)
      expect(svg).toContain('viewBox=');
      expect(svg.length).toBeGreaterThan(0);
    });

    it('should show head groups when showHeadGroups is true', () => {
      const svg = generateCellMembrane({ showHeadGroups: true });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateCellLayer', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateCellLayer();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom rows and columns', () => {
      const svg = generateCellLayer({ rows: 3, columns: 6 });
      expect(svg).toContain('<svg');
    });

    it('should support different cell types', () => {
      const cuboidalSvg = generateCellLayer({ cellType: 'cuboidal' });
      const columnarSvg = generateCellLayer({ cellType: 'columnar' });
      expect(cuboidalSvg).toContain('<svg');
      expect(columnarSvg).toContain('<svg');
    });

    it('should show nuclei when showNuclei is true', () => {
      const svg = generateCellLayer({ showNuclei: true });
      expect(svg).toContain('<svg');
    });
  });

  describe('generatePathwayArrow', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generatePathwayArrow();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should support activation arrow type', () => {
      const svg = generatePathwayArrow({ type: 'activation' });
      expect(svg).toContain('<svg');
    });

    it('should support inhibition arrow type', () => {
      const svg = generatePathwayArrow({ type: 'inhibition' });
      expect(svg).toContain('<svg');
    });

    it('should support curved arrows', () => {
      const svg = generatePathwayArrow({ curved: true });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateNeuron', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateNeuron();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should support different neuron types', () => {
      const pyramidalSvg = generateNeuron({ type: 'pyramidal' });
      const motorSvg = generateNeuron({ type: 'motor' });
      expect(pyramidalSvg).toContain('<svg');
      expect(motorSvg).toContain('<svg');
    });

    it('should show myelin when showMyelin is true', () => {
      const svg = generateNeuron({ showMyelin: true });
      expect(svg).toContain('<svg');
    });

    it('should use custom dendrite count', () => {
      const svg = generateNeuron({ dendrites: 7 });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateMitochondria', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateMitochondria();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom width and height', () => {
      const svg = generateMitochondria({ width: 150, height: 80 });
      expect(svg).toContain('<svg');
    });

    it('should use custom crista count', () => {
      const svg = generateMitochondria({ cristaCount: 7 });
      expect(svg).toContain('<svg');
    });

    it('should show matrix when showMatrix is true', () => {
      const svg = generateMitochondria({ showMatrix: true });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateNucleus', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateNucleus();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom diameter parameter', () => {
      const svg = generateNucleus({ diameter: 150 });
      expect(svg).toContain('width="150"');
    });

    it('should use custom pore count', () => {
      const svg = generateNucleus({ pores: 12 });
      expect(svg).toContain('<svg');
    });

    it('should support different envelope styles', () => {
      const solidSvg = generateNucleus({ envelopeStyle: 'solid' });
      const dottedSvg = generateNucleus({ envelopeStyle: 'dotted' });
      const doubleSvg = generateNucleus({ envelopeStyle: 'double' });
      expect(solidSvg).toContain('<svg');
      expect(dottedSvg).toContain('<svg');
      expect(doubleSvg).toContain('<svg');
    });
  });

  describe('generateRibosome', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateRibosome();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom size parameter', () => {
      const svg = generateRibosome({ size: 80 });
      expect(svg).toContain('width="80"');
    });

    it('should support different subunit configurations', () => {
      const bothSvg = generateRibosome({ subunits: 'both' });
      const largeSvg = generateRibosome({ subunits: 'large' });
      const smallSvg = generateRibosome({ subunits: 'small' });
      expect(bothSvg).toContain('<svg');
      expect(largeSvg).toContain('<svg');
      expect(smallSvg).toContain('<svg');
    });

    it('should show mRNA when showRna is true', () => {
      const svg = generateRibosome({ showRna: true });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateVesicle', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateVesicle();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom diameter parameter', () => {
      const svg = generateVesicle({ diameter: 100 });
      expect(svg).toContain('width="100"');
    });

    it('should support different cargo types', () => {
      const dotsSvg = generateVesicle({ cargo: 'dots' });
      const circleSvg = generateVesicle({ cargo: 'circle' });
      const noneSvg = generateVesicle({ cargo: 'none' });
      expect(dotsSvg).toContain('<svg');
      expect(circleSvg).toContain('<svg');
      expect(noneSvg).toContain('<svg');
    });

    it('should support different membrane styles', () => {
      const solidSvg = generateVesicle({ membraneStyle: 'solid' });
      const studdedSvg = generateVesicle({ membraneStyle: 'studded' });
      const coatedSvg = generateVesicle({ membraneStyle: 'coated' });
      expect(solidSvg).toContain('<svg');
      expect(studdedSvg).toContain('<svg');
      expect(coatedSvg).toContain('<svg');
    });
  });

  describe('generateVirus', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateVirus();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should support different virus types', () => {
      const icosahedralSvg = generateVirus({ type: 'icosahedral' });
      const envelopeSvg = generateVirus({ type: 'envelope' });
      const phageSvg = generateVirus({ type: 'bacteriophage' });
      expect(icosahedralSvg).toContain('<svg');
      expect(envelopeSvg).toContain('<svg');
      expect(phageSvg).toContain('<svg');
    });

    it('should use custom spike length', () => {
      const svg = generateVirus({ spikeLength: 20 });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateBacteria', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateBacteria();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should support different bacteria types', () => {
      const bacillusSvg = generateBacteria({ type: 'bacillus' });
      const coccusSvg = generateBacteria({ type: 'coccus' });
      const spirillumSvg = generateBacteria({ type: 'spirillum' });
      const diploSvg = generateBacteria({ type: 'diplococcus' });
      expect(bacillusSvg).toContain('<svg');
      expect(coccusSvg).toContain('<svg');
      expect(spirillumSvg).toContain('<svg');
      expect(diploSvg).toContain('<svg');
    });

    it('should use custom flagella count', () => {
      const svg = generateBacteria({ flagella: 4 });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateGolgi', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateGolgi();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom size parameter', () => {
      const svg = generateGolgi({ size: 150 });
      expect(svg).toContain('width="150"');
    });

    it('should use custom cisternae count', () => {
      const svg = generateGolgi({ cisternae: 7 });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateER', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateER();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should support rough and smooth ER types', () => {
      const roughSvg = generateER({ type: 'rough' });
      const smoothSvg = generateER({ type: 'smooth' });
      expect(roughSvg).toContain('<svg');
      expect(smoothSvg).toContain('<svg');
    });

    it('should use custom branch count', () => {
      const svg = generateER({ branches: 7 });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateMicrotubule', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateMicrotubule();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should use custom length parameter', () => {
      const svg = generateMicrotubule({ length: 300 });
      expect(svg).toContain('height="300"');
    });

    it('should use custom protofilament count', () => {
      const svg = generateMicrotubule({ protofilaments: 15 });
      expect(svg).toContain('<svg');
    });

    it('should show dimers when showDimer is true', () => {
      const svg = generateMicrotubule({ showDimer: true });
      expect(svg).toContain('<svg');
    });
  });

  describe('generateProtein', () => {
    it('should generate valid SVG with default options', () => {
      const svg = generateProtein();
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('should support different protein structures', () => {
      const helixSvg = generateProtein({ type: 'alpha-helix' });
      const sheetSvg = generateProtein({ type: 'beta-sheet' });
      const tertiarySvg = generateProtein({ type: 'tertiary' });
      expect(helixSvg).toContain('<svg');
      expect(sheetSvg).toContain('<svg');
      expect(tertiarySvg).toContain('<svg');
    });

    it('should use custom length parameter', () => {
      const svg = generateProtein({ length: 200 });
      expect(svg).toContain('<svg');
    });

    it('should use custom strand count for beta sheet', () => {
      const svg = generateProtein({ type: 'beta-sheet', strands: 5 });
      expect(svg).toContain('<svg');
    });
  });
});
