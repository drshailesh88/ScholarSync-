/**
 * Scientific Shape Generators
 *
 * Professional biological and scientific shape generators for FINNISH.
 * These tools help scientists create publication-quality diagrams quickly.
 *
 * Features that BioRender has but we now match:
 * - Cell membrane (phospholipid bilayer)
 * - DNA/RNA helix
 * - Cell layer/tissue
 * - Pathway arrows
 * - Protein structure representations
 */

// ============================================================================
// Types
// ============================================================================

export interface ShapeOptions {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
}

export interface DNAHelixOptions extends ShapeOptions {
  length?: number;
  basePairs?: number;
  twist?: number;
  width?: number;
  style?: 'simple' | 'detailed' | 'schematic';
  showBasePairs?: boolean;
  baseColors?: { a: string; t: string; g: string; c: string };
}

export interface CellMembraneOptions extends ShapeOptions {
  length?: number;
  phospholipidCount?: number;
  bilayer?: boolean;
  showHeadGroups?: boolean;
  showTails?: boolean;
  curvature?: number;
  proteins?: MembraneProtein[];
}

export interface MembraneProtein {
  position: number; // 0-1 along membrane
  type: 'channel' | 'receptor' | 'pump' | 'transporter';
  label?: string;
}

export interface CellLayerOptions extends ShapeOptions {
  rows?: number;
  columns?: number;
  cellWidth?: number;
  cellHeight?: number;
  cellType?: 'epithelial' | 'endothelial' | 'squamous' | 'cuboidal' | 'columnar';
  showNuclei?: boolean;
  junctions?: boolean;
  spacing?: number;
}

export interface PathwayArrowOptions extends ShapeOptions {
  type?: 'activation' | 'inhibition' | 'catalysis' | 'transport' | 'binding';
  curved?: boolean;
  startPoint?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  label?: string;
}

export interface NeuronOptions extends ShapeOptions {
  type?: 'pyramidal' | 'interneuron' | 'motor' | 'sensory' | 'purkinje';
  dendrites?: number;
  axonLength?: number;
  showMyelin?: boolean;
  showSynapses?: boolean;
}

export interface MitochondriaOptions extends ShapeOptions {
  width?: number;
  height?: number;
  cristaCount?: number;
  showMatrix?: boolean;
}

// ============================================================================
// DNA Helix Generator
// ============================================================================

/**
 * Generate a DNA double helix SVG path
 *
 * @example
 * const dna = generateDNAHelix({ length: 200, basePairs: 10, style: 'detailed' });
 * // Returns SVG string ready for Fabric.js
 */
export function generateDNAHelix(options: DNAHelixOptions = {}): string {
  const {
    length = 200,
    basePairs = 10,
    twist = 36, // degrees per base pair (B-DNA standard)
    width = 40,
    style = 'simple',
    showBasePairs = true,
    stroke = '#3B82F6',
    strokeWidth = 2,
    fill = 'none',
    baseColors = { a: '#EF4444', t: '#22C55E', g: '#F59E0B', c: '#8B5CF6' }
  } = options;

  const stepSize = length / basePairs;
  const halfWidth = width / 2;

  let svg = `<svg viewBox="0 0 ${width + 20} ${length + 20}" xmlns="http://www.w3.org/2000/svg">`;

  // Generate the two backbone strands
  let strand1Points: string[] = [];
  let strand2Points: string[] = [];
  let basePairPaths: string[] = [];

  for (let i = 0; i <= basePairs; i++) {
    const y = 10 + i * stepSize;
    const angle = (i * twist * Math.PI) / 180;

    const x1 = 10 + halfWidth + Math.sin(angle) * halfWidth;
    const x2 = 10 + halfWidth + Math.sin(angle + Math.PI) * halfWidth;

    strand1Points.push(`${x1},${y}`);
    strand2Points.push(`${x2},${y}`);

    // Add base pairs (horizontal lines connecting strands)
    if (showBasePairs && i < basePairs) {
      const midY = y + stepSize / 2;
      const midAngle = ((i + 0.5) * twist * Math.PI) / 180;
      const mx1 = 10 + halfWidth + Math.sin(midAngle) * halfWidth;
      const mx2 = 10 + halfWidth + Math.sin(midAngle + Math.PI) * halfWidth;

      if (style === 'detailed') {
        // Show base pair with colors
        const bases = ['at', 'ta', 'gc', 'cg'];
        const pair = bases[i % 4];
        const color1 = baseColors[pair[0] as keyof typeof baseColors];
        const color2 = baseColors[pair[1] as keyof typeof baseColors];

        basePairPaths.push(
          `<line x1="${mx1}" y1="${midY}" x2="${(mx1 + mx2) / 2}" y2="${midY}" stroke="${color1}" stroke-width="${strokeWidth * 0.8}"/>`,
          `<line x1="${(mx1 + mx2) / 2}" y1="${midY}" x2="${mx2}" y2="${midY}" stroke="${color2}" stroke-width="${strokeWidth * 0.8}"/>`
        );
      } else {
        basePairPaths.push(
          `<line x1="${mx1}" y1="${midY}" x2="${mx2}" y2="${midY}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="0.5"/>`
        );
      }
    }
  }

  // Create smooth curves for backbone strands
  svg += `<path d="M ${strand1Points[0]} ${strand1Points.slice(1).map((p, i) => {
    if (i === 0) return `L ${p}`;
    return `L ${p}`;
  }).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;

  svg += `<path d="M ${strand2Points[0]} ${strand2Points.slice(1).map((p, i) => {
    if (i === 0) return `L ${p}`;
    return `L ${p}`;
  }).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;

  // Add base pairs
  svg += basePairPaths.join('');

  // Add sugar-phosphate markers for detailed style
  if (style === 'detailed') {
    strand1Points.forEach((point) => {
      const [x, y] = point.split(',').map(Number);
      svg += `<circle cx="${x}" cy="${y}" r="${strokeWidth}" fill="${stroke}"/>`;
    });
    strand2Points.forEach((point) => {
      const [x, y] = point.split(',').map(Number);
      svg += `<circle cx="${x}" cy="${y}" r="${strokeWidth}" fill="${stroke}"/>`;
    });
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Cell Membrane Generator
// ============================================================================

/**
 * Generate a cell membrane (phospholipid bilayer) SVG
 *
 * @example
 * const membrane = generateCellMembrane({ length: 300, phospholipidCount: 20 });
 */
export function generateCellMembrane(options: CellMembraneOptions = {}): string {
  const {
    length = 300,
    phospholipidCount = 15,
    bilayer = true,
    showHeadGroups = true,
    showTails = true,
    curvature: _curvature = 0, // TODO: implement curved membranes
    stroke = '#6B7280',
    strokeWidth = 1,
    fill = '#FEF3C7',
    proteins = []
  } = options;

  const spacing = length / phospholipidCount;
  const headRadius = spacing * 0.35;
  const tailLength = headRadius * 2.5;
  const bilayerGap = bilayer ? tailLength * 2 + headRadius : 0;

  const height = bilayer ? headRadius * 2 + bilayerGap + headRadius * 2 + 40 : headRadius * 2 + tailLength + 20;

  let svg = `<svg viewBox="0 0 ${length + 20} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Helper function to draw a single phospholipid
  const drawPhospholipid = (x: number, y: number, flipped: boolean) => {
    const direction = flipped ? -1 : 1;
    let result = '';

    // Head group (circle)
    if (showHeadGroups) {
      result += `<circle cx="${x}" cy="${y}" r="${headRadius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
    }

    // Fatty acid tails (wavy lines)
    if (showTails) {
      const tailY1 = y + direction * (headRadius + 2);
      const tailY2 = y + direction * (headRadius + tailLength);

      // Saturated tail (straight)
      result += `<path d="M ${x - headRadius * 0.3} ${tailY1} L ${x - headRadius * 0.3} ${tailY2}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none"/>`;

      // Unsaturated tail (kinked)
      const kinkY = tailY1 + direction * tailLength * 0.4;
      result += `<path d="M ${x + headRadius * 0.3} ${tailY1} L ${x + headRadius * 0.3} ${kinkY} L ${x + headRadius * 0.5} ${kinkY + direction * tailLength * 0.2} L ${x + headRadius * 0.3} ${tailY2}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none"/>`;
    }

    return result;
  };

  // Draw outer leaflet (top layer)
  for (let i = 0; i < phospholipidCount; i++) {
    const x = 10 + spacing / 2 + i * spacing;
    const y = 10 + headRadius;

    // Add slight variation for natural look
    const offset = Math.sin(i * 0.5) * 2;
    svg += drawPhospholipid(x + offset, y, false);
  }

  // Draw inner leaflet (bottom layer) if bilayer
  if (bilayer) {
    for (let i = 0; i < phospholipidCount; i++) {
      const x = 10 + spacing / 2 + i * spacing;
      const y = 10 + headRadius + bilayerGap;

      const offset = Math.sin(i * 0.5 + 0.5) * 2;
      svg += drawPhospholipid(x + offset, y, true);
    }
  }

  // Draw membrane proteins
  proteins.forEach(protein => {
    const x = 10 + protein.position * length;
    const y = 10 + headRadius + (bilayer ? bilayerGap / 2 : tailLength / 2);

    switch (protein.type) {
      case 'channel':
        svg += `<rect x="${x - 8}" y="${y - 20}" width="16" height="40" rx="4" fill="#60A5FA" stroke="#2563EB" stroke-width="1"/>`;
        svg += `<ellipse cx="${x}" cy="${y}" rx="4" ry="15" fill="#DBEAFE"/>`;
        break;
      case 'receptor':
        svg += `<path d="M ${x - 10} ${y + 15} L ${x - 10} ${y - 10} Q ${x} ${y - 25} ${x + 10} ${y - 10} L ${x + 10} ${y + 15}" fill="#F472B6" stroke="#DB2777" stroke-width="1"/>`;
        break;
      case 'pump':
        svg += `<rect x="${x - 12}" y="${y - 18}" width="24" height="36" rx="6" fill="#34D399" stroke="#059669" stroke-width="1"/>`;
        svg += `<path d="M ${x - 4} ${y - 8} L ${x + 4} ${y - 8} L ${x} ${y - 14} Z" fill="#059669"/>`;
        svg += `<path d="M ${x - 4} ${y + 8} L ${x + 4} ${y + 8} L ${x} ${y + 14} Z" fill="#059669"/>`;
        break;
      case 'transporter':
        svg += `<rect x="${x - 10}" y="${y - 15}" width="20" height="30" rx="5" fill="#FBBF24" stroke="#D97706" stroke-width="1"/>`;
        svg += `<path d="M ${x - 5} ${y} L ${x + 5} ${y}" stroke="#D97706" stroke-width="2"/>`;
        break;
    }

    if (protein.label) {
      svg += `<text x="${x}" y="${y + (bilayer ? 35 : 25)}" text-anchor="middle" font-size="10" fill="#374151">${protein.label}</text>`;
    }
  });

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Cell Layer / Tissue Generator
// ============================================================================

/**
 * Generate a cell layer/tissue diagram
 *
 * @example
 * const tissue = generateCellLayer({ rows: 3, columns: 5, cellType: 'epithelial' });
 */
export function generateCellLayer(options: CellLayerOptions = {}): string {
  const {
    rows = 2,
    columns = 5,
    cellWidth = 40,
    cellHeight = 50,
    cellType = 'cuboidal',
    showNuclei = true,
    junctions = true,
    spacing = 2,
    stroke = '#6B7280',
    strokeWidth = 1,
    fill = '#FEF3C7'
  } = options;

  const totalWidth = columns * (cellWidth + spacing) + 20;
  const totalHeight = rows * (cellHeight + spacing) + 20;

  let svg = `<svg viewBox="0 0 ${totalWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;

  // Cell shape based on type
  const getCellPath = (x: number, y: number, row: number, _col: number) => {
    const nucleusRadius = Math.min(cellWidth, cellHeight) * 0.2;

    let cellPath = '';
    let nucleusPath = '';

    switch (cellType) {
      case 'squamous':
        // Flat cells
        const squamousHeight = cellHeight * 0.3;
        cellPath = `<ellipse cx="${x + cellWidth / 2}" cy="${y + squamousHeight / 2}" rx="${cellWidth / 2}" ry="${squamousHeight / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
        if (showNuclei) {
          nucleusPath = `<ellipse cx="${x + cellWidth / 2}" cy="${y + squamousHeight / 2}" rx="${nucleusRadius}" ry="${nucleusRadius * 0.5}" fill="#8B5CF6" opacity="0.6"/>`;
        }
        break;

      case 'columnar':
        // Tall cells
        cellPath = `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
        if (showNuclei) {
          nucleusPath = `<ellipse cx="${x + cellWidth / 2}" cy="${y + cellHeight * 0.7}" rx="${nucleusRadius}" ry="${nucleusRadius * 1.2}" fill="#8B5CF6" opacity="0.6"/>`;
        }
        // Add cilia/microvilli for apical surface
        if (row === 0) {
          for (let i = 0; i < 5; i++) {
            const ciliaX = x + (i + 0.5) * (cellWidth / 5);
            cellPath += `<line x1="${ciliaX}" y1="${y}" x2="${ciliaX}" y2="${y - 8}" stroke="${stroke}" stroke-width="0.5"/>`;
          }
        }
        break;

      case 'cuboidal':
      default:
        // Square-ish cells
        const cuboidalHeight = cellWidth;
        cellPath = `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cuboidalHeight}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
        if (showNuclei) {
          nucleusPath = `<circle cx="${x + cellWidth / 2}" cy="${y + cuboidalHeight / 2}" r="${nucleusRadius}" fill="#8B5CF6" opacity="0.6"/>`;
        }
        break;
    }

    return cellPath + nucleusPath;
  };

  // Draw cells
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = 10 + col * (cellWidth + spacing);
      const y = 10 + row * (cellHeight + spacing);
      svg += getCellPath(x, y, row, col);
    }
  }

  // Draw tight junctions between cells
  if (junctions && rows > 0) {
    svg += `<g stroke="#EF4444" stroke-width="2" stroke-dasharray="2,2">`;
    for (let row = 0; row < rows - 1; row++) {
      const y = 10 + (row + 1) * (cellHeight + spacing) - spacing / 2;
      svg += `<line x1="10" y1="${y}" x2="${totalWidth - 10}" y2="${y}"/>`;
    }
    svg += `</g>`;
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Pathway Arrow Generator
// ============================================================================

/**
 * Generate pathway arrows for signaling diagrams
 *
 * @example
 * const arrow = generatePathwayArrow({ type: 'activation', curved: true });
 */
export function generatePathwayArrow(options: PathwayArrowOptions = {}): string {
  const {
    type = 'activation',
    curved = false,
    startPoint = { x: 10, y: 50 },
    endPoint = { x: 190, y: 50 },
    label,
    stroke = '#374151',
    strokeWidth = 2
  } = options;

  const width = Math.abs(endPoint.x - startPoint.x) + 20;
  const height = Math.max(100, Math.abs(endPoint.y - startPoint.y) + 40);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Arrow colors by type
  const colors: Record<string, { stroke: string; fill: string }> = {
    activation: { stroke: '#22C55E', fill: '#22C55E' },
    inhibition: { stroke: '#EF4444', fill: '#EF4444' },
    catalysis: { stroke: '#3B82F6', fill: '#3B82F6' },
    transport: { stroke: '#8B5CF6', fill: '#8B5CF6' },
    binding: { stroke: '#F59E0B', fill: '#F59E0B' }
  };

  const { stroke: arrowStroke, fill: arrowFill } = colors[type] || colors.activation;

  // Calculate path
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx);

  let pathD = '';
  if (curved) {
    const midX = (startPoint.x + endPoint.x) / 2;
    const midY = Math.min(startPoint.y, endPoint.y) - 30;
    pathD = `M ${startPoint.x} ${startPoint.y} Q ${midX} ${midY} ${endPoint.x} ${endPoint.y}`;
  } else {
    pathD = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
  }

  // Draw line
  svg += `<path d="${pathD}" fill="none" stroke="${arrowStroke}" stroke-width="${strokeWidth}"/>`;

  // Draw arrowhead based on type
  const arrowLength = 12;
  const arrowAngle = Math.PI / 6;

  const tipX = endPoint.x;
  const tipY = endPoint.y;

  switch (type) {
    case 'activation':
      // Standard arrow
      svg += `<polygon points="${tipX},${tipY} ${tipX - arrowLength * Math.cos(angle - arrowAngle)},${tipY - arrowLength * Math.sin(angle - arrowAngle)} ${tipX - arrowLength * Math.cos(angle + arrowAngle)},${tipY - arrowLength * Math.sin(angle + arrowAngle)}" fill="${arrowFill}"/>`;
      break;

    case 'inhibition':
      // T-bar (inhibition)
      const perpAngle = angle + Math.PI / 2;
      const barLength = 10;
      svg += `<line x1="${tipX + barLength * Math.cos(perpAngle)}" y1="${tipY + barLength * Math.sin(perpAngle)}" x2="${tipX - barLength * Math.cos(perpAngle)}" y2="${tipY - barLength * Math.sin(perpAngle)}" stroke="${arrowStroke}" stroke-width="${strokeWidth * 1.5}"/>`;
      break;

    case 'catalysis':
      // Circle (enzyme)
      svg += `<circle cx="${tipX}" cy="${tipY}" r="6" fill="none" stroke="${arrowStroke}" stroke-width="${strokeWidth}"/>`;
      break;

    case 'transport':
      // Double arrow
      svg += `<polygon points="${tipX},${tipY} ${tipX - arrowLength * Math.cos(angle - arrowAngle)},${tipY - arrowLength * Math.sin(angle - arrowAngle)} ${tipX - arrowLength * 0.7 * Math.cos(angle)},${tipY - arrowLength * 0.7 * Math.sin(angle)} ${tipX - arrowLength * Math.cos(angle + arrowAngle)},${tipY - arrowLength * Math.sin(angle + arrowAngle)}" fill="${arrowFill}"/>`;
      break;

    case 'binding':
      // Diamond
      svg += `<polygon points="${tipX + 6},${tipY} ${tipX},${tipY - 6} ${tipX - 6},${tipY} ${tipX},${tipY + 6}" fill="${arrowFill}"/>`;
      break;
  }

  // Add label if provided
  if (label) {
    const labelX = (startPoint.x + endPoint.x) / 2;
    const labelY = curved ? Math.min(startPoint.y, endPoint.y) - 40 : (startPoint.y + endPoint.y) / 2 - 10;
    svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="12" fill="${stroke}">${label}</text>`;
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Neuron Generator
// ============================================================================

/**
 * Generate a neuron illustration
 *
 * @example
 * const neuron = generateNeuron({ type: 'pyramidal', dendrites: 5 });
 */
export function generateNeuron(options: NeuronOptions = {}): string {
  const {
    type = 'pyramidal',
    dendrites = 5,
    axonLength = 150,
    showMyelin = true,
    showSynapses: _showSynapses = false, // TODO: implement synapse details
    stroke = '#374151',
    strokeWidth = 1.5,
    fill = '#FEF3C7'
  } = options;

  const width = 200;
  const height = axonLength + 120;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  const somaX = width / 2;
  const somaY = 60;
  const somaRadius = 20;

  // Draw dendrites
  for (let i = 0; i < dendrites; i++) {
    const angle = -Math.PI / 2 + (i - (dendrites - 1) / 2) * (Math.PI / (dendrites + 1));
    const length = 30 + Math.random() * 20;
    const endX = somaX + Math.cos(angle) * (somaRadius + length);
    const endY = somaY + Math.sin(angle) * (somaRadius + length);

    // Main dendrite
    svg += `<path d="M ${somaX + Math.cos(angle) * somaRadius} ${somaY + Math.sin(angle) * somaRadius} Q ${somaX + Math.cos(angle) * (somaRadius + length / 2)} ${somaY + Math.sin(angle) * (somaRadius + length / 2) - 10} ${endX} ${endY}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;

    // Dendritic spines
    for (let j = 0; j < 3; j++) {
      const spineT = 0.3 + j * 0.25;
      const spineX = somaX + Math.cos(angle) * (somaRadius + length * spineT);
      const spineY = somaY + Math.sin(angle) * (somaRadius + length * spineT);
      const spineAngle = angle + (Math.random() - 0.5) * Math.PI / 2;
      svg += `<line x1="${spineX}" y1="${spineY}" x2="${spineX + Math.cos(spineAngle) * 5}" y2="${spineY + Math.sin(spineAngle) * 5}" stroke="${stroke}" stroke-width="0.5"/>`;
      svg += `<circle cx="${spineX + Math.cos(spineAngle) * 5}" cy="${spineY + Math.sin(spineAngle) * 5}" r="1.5" fill="${stroke}"/>`;
    }
  }

  // Draw soma (cell body)
  if (type === 'pyramidal') {
    svg += `<path d="M ${somaX} ${somaY - somaRadius} L ${somaX - somaRadius} ${somaY + somaRadius * 0.7} L ${somaX + somaRadius} ${somaY + somaRadius * 0.7} Z" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
  } else {
    svg += `<circle cx="${somaX}" cy="${somaY}" r="${somaRadius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
  }

  // Draw nucleus
  svg += `<circle cx="${somaX}" cy="${somaY}" r="${somaRadius * 0.4}" fill="#8B5CF6" opacity="0.5"/>`;

  // Draw axon
  const axonStartY = somaY + somaRadius;
  const axonEndY = somaY + axonLength;

  svg += `<line x1="${somaX}" y1="${axonStartY}" x2="${somaX}" y2="${axonEndY}" stroke="${stroke}" stroke-width="${strokeWidth * 1.5}"/>`;

  // Draw myelin sheath
  if (showMyelin) {
    const myelinSegments = Math.floor(axonLength / 25);
    for (let i = 0; i < myelinSegments; i++) {
      const segY = axonStartY + 15 + i * 25;
      svg += `<ellipse cx="${somaX}" cy="${segY}" rx="8" ry="10" fill="#A5B4FC" stroke="#6366F1" stroke-width="0.5"/>`;
    }

    // Nodes of Ranvier (gaps)
    for (let i = 0; i < myelinSegments - 1; i++) {
      const nodeY = axonStartY + 25 + i * 25;
      svg += `<rect x="${somaX - 2}" y="${nodeY}" width="4" height="5" fill="#FEF3C7" stroke="${stroke}" stroke-width="0.5"/>`;
    }
  }

  // Draw axon terminal
  const terminalY = axonEndY;
  svg += `<path d="M ${somaX} ${terminalY} L ${somaX - 15} ${terminalY + 15} M ${somaX} ${terminalY} L ${somaX + 15} ${terminalY + 15} M ${somaX} ${terminalY} L ${somaX} ${terminalY + 20}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;

  // Synaptic boutons
  svg += `<circle cx="${somaX - 15}" cy="${terminalY + 15}" r="5" fill="#FBBF24" stroke="${stroke}" stroke-width="0.5"/>`;
  svg += `<circle cx="${somaX + 15}" cy="${terminalY + 15}" r="5" fill="#FBBF24" stroke="${stroke}" stroke-width="0.5"/>`;
  svg += `<circle cx="${somaX}" cy="${terminalY + 20}" r="5" fill="#FBBF24" stroke="${stroke}" stroke-width="0.5"/>`;

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Mitochondria Generator
// ============================================================================

/**
 * Generate a mitochondria illustration
 */
export function generateMitochondria(options: MitochondriaOptions = {}): string {
  const {
    width = 120,
    height = 60,
    cristaCount = 5,
    showMatrix = true,
    stroke = '#374151',
    strokeWidth = 1.5,
    fill = '#FEF3C7'
  } = options;

  let svg = `<svg viewBox="0 0 ${width + 20} ${height + 20}" xmlns="http://www.w3.org/2000/svg">`;

  const cx = (width + 20) / 2;
  const cy = (height + 20) / 2;
  const rx = width / 2;
  const ry = height / 2;

  // Outer membrane
  svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;

  // Inner membrane (intermembrane space)
  svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 5}" ry="${ry - 5}" fill="#FDE68A" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}"/>`;

  // Cristae (inner membrane folds)
  const cristaSpacing = (width - 30) / (cristaCount + 1);
  for (let i = 0; i < cristaCount; i++) {
    const cristaX = 25 + (i + 1) * cristaSpacing;
    const cristaHeight = (ry - 10) * (0.5 + Math.random() * 0.4);

    // Alternating up/down cristae
    if (i % 2 === 0) {
      svg += `<path d="M ${cristaX} ${cy + ry - 8} L ${cristaX} ${cy + ry - 8 - cristaHeight} Q ${cristaX + 8} ${cy + ry - 8 - cristaHeight - 5} ${cristaX + 5} ${cy + ry - 8}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 0.8}"/>`;
    } else {
      svg += `<path d="M ${cristaX} ${cy - ry + 8} L ${cristaX} ${cy - ry + 8 + cristaHeight} Q ${cristaX + 8} ${cy - ry + 8 + cristaHeight + 5} ${cristaX + 5} ${cy - ry + 8}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 0.8}"/>`;
    }
  }

  // Matrix granules
  if (showMatrix) {
    for (let i = 0; i < 3; i++) {
      const gx = cx + (Math.random() - 0.5) * rx * 0.5;
      const gy = cy + (Math.random() - 0.5) * ry * 0.5;
      svg += `<circle cx="${gx}" cy="${gy}" r="3" fill="#92400E" opacity="0.4"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Nucleus Generator
// ============================================================================

export interface NucleusOptions extends ShapeOptions {
  diameter?: number;
  pores?: number;
  envelopeStyle?: 'solid' | 'dotted' | 'double';
}

/**
 * Generate a cell nucleus with nuclear pores
 */
export function generateNucleus(options: NucleusOptions = {}): string {
  const {
    diameter = 100,
    pores = 8,
    envelopeStyle = 'solid',
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#e2e8f0',
    opacity = 0.9,
  } = options;

  const cx = diameter / 2;
  const cy = diameter / 2;
  const rx = diameter / 2;
  const ry = diameter / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}">`;

  // Nuclear envelope
  if (envelopeStyle === 'double') {
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.9}" ry="${ry * 0.9}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  } else if (envelopeStyle === 'dotted') {
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="4 4" opacity="${opacity}"/>`;
  } else {
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  }

  // Nucleolus
  svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.3}" ry="${ry * 0.25}" fill="#a78bfa" stroke="#6366f1" stroke-width="${strokeWidth * 0.5}" opacity="${opacity}"/>`;

  // Nuclear pores
  for (let i = 0; i < pores; i++) {
    const angle = (i / pores) * Math.PI * 2;
    const px = cx + Math.cos(angle) * rx * 0.85;
    const py = cy + Math.sin(angle) * ry * 0.85;
    svg += `<circle cx="${px}" cy="${py}" r="${diameter * 0.03}" fill="${stroke}" opacity="0.6"/>`;
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Ribosome Generator
// ============================================================================

export interface RibosomeOptions extends ShapeOptions {
  size?: number;
  subunits?: 'large' | 'small' | 'both';
  showRna?: boolean;
}

/**
 * Generate a ribosome (large and small subunits)
 */
export function generateRibosome(options: RibosomeOptions = {}): string {
  const {
    size = 60,
    subunits = 'both',
    showRna = true,
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#fbbf24',
    opacity = 0.9,
  } = options;

  const cx = size / 2;
  const cy = size / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;

  // Large subunit (bottom, larger)
  if (subunits === 'large' || subunits === 'both') {
    svg += `<ellipse cx="${cx}" cy="${cy * 0.65}" rx="${size * 0.4}" ry="${size * 0.25}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  }

  // Small subunit (top, smaller)
  if (subunits === 'small' || subunits === 'both') {
    svg += `<ellipse cx="${cx}" cy="${cy * 0.3}" rx="${size * 0.3}" ry="${size * 0.18}" fill="#f472b6" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  }

  // mRNA strand (curved line through subunits)
  if (showRna) {
    svg += `<path d="M ${cx * 0.3} ${cy * 0.2} Q ${cx} ${cy * 0.5} ${cx * 0.7} ${cy * 0.8}" fill="none" stroke="#60a5fa" stroke-width="${strokeWidth * 1.5}" stroke-dasharray="3 3"/>`;
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Vesicle Generator
// ============================================================================

export interface VesicleOptions extends ShapeOptions {
  diameter?: number;
  cargo?: 'none' | 'dots' | 'circle';
  membraneStyle?: 'solid' | 'studded' | 'coated';
}

/**
 * Generate a vesicle (membrane-bound organelle)
 */
export function generateVesicle(options: VesicleOptions = {}): string {
  const {
    diameter = 80,
    cargo = 'dots',
    membraneStyle = 'solid',
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#c4b5fd',
    opacity = 0.85,
  } = options;

  const cx = diameter / 2;
  const cy = diameter / 2;
  const rx = diameter / 2;
  const ry = diameter / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}">`;

  // Main vesicle body
  svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

  // Membrane studs (for clathrin-coated or studded vesicles)
  if (membraneStyle === 'studded') {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const px = cx + Math.cos(angle) * rx * 0.95;
      const py = cy + Math.sin(angle) * ry * 0.95;
      svg += `<circle cx="${px}" cy="${py}" r="3" fill="${stroke}" opacity="0.7"/>`;
    }
  } else if (membraneStyle === 'coated') {
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth + 2}" stroke-dasharray="2 2" opacity="0.5"/>`;
  }

  // Cargo
  if (cargo === 'dots') {
    for (let i = 0; i < 5; i++) {
      const px = cx + (Math.random() - 0.5) * rx * 0.8;
      const py = cy + (Math.random() - 0.5) * ry * 0.8;
      svg += `<circle cx="${px}" cy="${py}" r="4" fill="#7c3aed" opacity="0.6"/>`;
    }
  } else if (cargo === 'circle') {
    svg += `<circle cx="${cx}" cy="${cy}" r="${rx * 0.3}" fill="#7c3aed" opacity="0.5"/>`;
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Virus Generator
// ============================================================================

export interface VirusOptions extends ShapeOptions {
  diameter?: number;
  type?: 'icosahedral' | 'envelope' | 'complex' | 'bacteriophage';
  spikeLength?: number;
  genomeType?: 'rna' | 'dna';
}

/**
 * Generate a virus particle
 */
export function generateVirus(options: VirusOptions = {}): string {
  const {
    diameter = 100,
    type = 'icosahedral',
    spikeLength = 15,
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#10b981',
    opacity = 0.9,
  } = options;

  const cx = diameter / 2;
  const cy = diameter / 2;
  const r = diameter / 2 - spikeLength;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}">`;

  if (type === 'envelope') {
    // Envelope virus (oval with surface proteins)
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.2}" ry="${r * 0.8}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

    // Surface glycoproteins
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const px = cx + Math.cos(angle) * r * 1.1;
      const py = cy + Math.sin(angle) * r * 0.72;
      svg += `<line x1="${px}" y1="${py}" x2="${px + Math.cos(angle) * 12}" y2="${py + Math.sin(angle) * 12}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}"/>`;
      svg += `<circle cx="${px + Math.cos(angle) * 14}" cy="${py + Math.sin(angle) * 14}" r="3" fill="#fbbf24"/>`;
    }
  } else if (type === 'bacteriophage') {
    // Bacteriophage (icosahedral head + helical tail)
    svg += `<circle cx="${cx}" cy="${r * 0.35}" r="${r * 0.3}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

    // Tail sheath
    svg += `<rect x="${cx - r * 0.1}" y="${r * 0.35}" width="${r * 0.2}" height="${r * 0.5}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

    // Tail fibers
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI;
      const fx = cx + Math.cos(angle) * r * 0.15;
      const fy = r * 0.85;
      svg += `<line x1="${cx}" y1="${r * 0.85}" x2="${fx}" y2="${fy + 20}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}"/>`;
    }
  } else {
    // Icosahedral virus with spikes
    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

    // Facets
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      svg += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r * 0.7}" y2="${cy + Math.sin(angle) * r * 0.7}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="0.3"/>`;
    }

    // Spikes
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const sx = cx + Math.cos(angle) * r;
      const sy = cy + Math.sin(angle) * r;
      svg += `<line x1="${sx}" y1="${sy}" x2="${sx + Math.cos(angle) * spikeLength}" y2="${sy + Math.sin(angle) * spikeLength}" stroke="${stroke}" stroke-width="${strokeWidth * 0.8}"/>`;
      svg += `<circle cx="${sx + Math.cos(angle) * (spikeLength + 4)}" cy="${sy + Math.sin(angle) * (spikeLength + 4)}" r="3" fill="#ef4444"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Bacteria Generator
// ============================================================================

export interface BacteriaOptions extends ShapeOptions {
  type?: 'bacillus' | 'coccus' | 'spirillum' | 'diplococcus';
  length?: number;
  width?: number;
  flagella?: number;
}

/**
 * Generate bacterial cell
 */
export function generateBacteria(options: BacteriaOptions = {}): string {
  const {
    type = 'bacillus',
    length = 100,
    width = 40,
    flagella = 2,
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#34d399',
    opacity = 0.9,
  } = options;

  const cx = length / 2;
  const cy = Math.max(length, width) / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${length + 40}" height="${Math.max(length, width) + 40}" viewBox="0 0 ${length + 40} ${Math.max(length, width) + 40}">`;

  if (type === 'coccus') {
    // Round bacterium
    const r = width / 2;
    svg += `<circle cx="${cx + 20}" cy="${cy + 20}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  } else if (type === 'spirillum') {
    // Spiral bacterium
    svg += `<path d="M ${20} ${cy + 20} q ${width / 4} ${-width / 4} ${width / 2} ${cy + 20} t ${width / 2} ${cy + 20 + width / 4}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  } else if (type === 'diplococcus') {
    // Two cocci
    const r = width / 2;
    svg += `<circle cx="${cx}" cy="${cy + 20}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
    svg += `<circle cx="${cx + width - 5}" cy="${cy + 20}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  } else {
    // Bacillus (rod-shaped) - default
    svg += `<rect x="${20}" y="${cy + 20 - width / 2}" width="${length}" height="${width}" rx="${width / 2}" ry="${width / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

    // Flagella
    for (let i = 0; i < flagella; i++) {
      const fx = 20 + length + (i - flagella / 2) * 10;
      const fy = cy + 20 + (i - flagella / 2 + 0.5) * 15;
      svg += `<path d="M ${20 + length} ${cy + 20} Q ${fx} ${fy} ${fx} ${fy + 30}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 0.8}" stroke-dasharray="4 2"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Golgi Apparatus Generator
// ============================================================================

export interface GolgiOptions extends ShapeOptions {
  size?: number;
  cisternae?: number;
}

/**
 * Generate Golgi apparatus (stacked membrane cisternae)
 */
export function generateGolgi(options: GolgiOptions = {}): string {
  const {
    size = 120,
    cisternae = 5,
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#f472b6',
    opacity = 0.85,
  } = options;

  const cx = size / 2;
  const cy = size / 2;
  const width = size * 0.7;
  const height = size * 0.6;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;

  // Stacked cisternae with varying sizes
  for (let i = 0; i < cisternae; i++) {
    const progress = i / (cisternae - 1);
    const cWidth = width * (0.6 + Math.abs(progress - 0.5) * 0.8);
    const cHeight = height * 0.15;
    const cY = cy - height / 2 + i * (height / cisternae) + cHeight / 2;

    // Curved cisternae
    svg += `<path d="M ${cx - cWidth / 2} ${cY} Q ${cx} ${cY - cHeight / 2} ${cx + cWidth / 2} ${cY}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

    // Vesicles near Golgi
    if (i === 0 || i === cisternae - 1) {
      const vx = cx + (i === 0 ? -1 : 1) * (cWidth / 2 + 15);
      svg += `<circle cx="${vx}" cy="${cY}" r="6" fill="#c084fc" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="${opacity}"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Endoplasmic Reticulum Generator
// ============================================================================

export interface EROptions extends ShapeOptions {
  type?: 'rough' | 'smooth';
  size?: number;
  branches?: number;
}

/**
 * Generate endoplasmic reticulum
 */
export function generateER(options: EROptions = {}): string {
  const {
    type = 'rough',
    size = 120,
    branches = 5,
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#fbbf24',
    opacity = 0.85,
  } = options;

  const cx = size / 2;
  const cy = size / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;

  if (type === 'smooth') {
    // Smooth ER (tubular network)
    for (let i = 0; i < branches; i++) {
      const startX = 20 + (i / branches) * (size - 40);
      const startY = 30 + Math.sin(i * 2) * 20;
      svg += `<path d="M ${startX} ${startY} Q ${startX + 20} ${startY - 20} ${startX + 40} ${startY}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 1.5}" opacity="${opacity}"/>`;
      svg += `<path d="M ${startX + 10} ${startY} Q ${startX + 30} ${startY + 15} ${startX + 50} ${startY - 10}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 1.5}" opacity="${opacity}"/>`;
    }
  } else {
    // Rough ER (with ribosomes)
    for (let i = 0; i < branches; i++) {
      const startX = 20 + (i / branches) * (size - 40);
      const startY = 30 + Math.sin(i * 2) * 20;
      svg += `<path d="M ${startX} ${startY} Q ${startX + 20} ${startY - 20} ${startX + 40} ${startY}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 1.5}" opacity="${opacity}"/>`;

      // Ribosomes (dots) on the membrane
      for (let j = 0; j < 5; j++) {
        const t = j / 4;
        const rx = startX + t * 40;
        const ry = startY + Math.sin(t * Math.PI) * 15;
        svg += `<circle cx="${rx}" cy="${ry}" r="2" fill="${stroke}" opacity="0.7"/>`;
      }
    }
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Microtubule Generator
// ============================================================================

export interface MicrotubuleOptions extends ShapeOptions {
  length?: number;
  protofilaments?: number;
  showDimer?: boolean;
}

/**
 * Generate a microtubule (hollow tube of tubulin)
 */
export function generateMicrotubule(options: MicrotubuleOptions = {}): string {
  const {
    length = 200,
    protofilaments = 13,
    showDimer = false,
    stroke = '#4a5568',
    strokeWidth = 2,
    opacity = 0.9,
  } = options;

  const width = 30;
  const cx = width / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${length}" viewBox="0 0 ${width} ${length}">`;

  // Protofilaments (parallel lines)
  for (let i = 0; i < protofilaments; i++) {
    const x = (i / protofilaments) * width;
    svg += `<line x1="${x}" y1="0" x2="${x}" y2="${length}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="${opacity * 0.5}"/>`;
  }

  // Tubulin dimers (if showing detailed structure)
  if (showDimer) {
    for (let i = 0; i < protofilaments; i++) {
      const x = (i / protofilaments) * width;
      for (let y = 0; y < length; y += 8) {
        svg += `<ellipse cx="${x}" cy="${y}" rx="${width / protofilaments / 3}" ry="3" fill="#60a5fa" opacity="${opacity * 0.6}"/>`;
      }
    }
  }

  // Outer boundary
  svg += `<rect x="0" y="0" width="${width}" height="${length}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Protein Structure Generator
// ============================================================================

export interface ProteinOptions extends ShapeOptions {
  type?: 'alpha-helix' | 'beta-sheet' | 'tertiary';
  length?: number;
  strands?: number;
}

/**
 * Generate a protein secondary structure
 */
export function generateProtein(options: ProteinOptions = {}): string {
  const {
    type = 'alpha-helix',
    length = 100,
    strands = 4,
    stroke = '#4a5568',
    strokeWidth = 2,
    fill = '#818cf8',
    opacity = 0.9,
  } = options;

  const width = length * 0.8;
  const height = type === 'beta-sheet' ? 60 : 40;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

  if (type === 'alpha-helix') {
    // Alpha helix (coil)
    const coils = 5;
    const coilWidth = width / coils;
    for (let i = 0; i < coils; i++) {
      const x = i * coilWidth;
      // Arrow shape to represent helix turning away
      svg += `<path d="M ${x} ${height * 0.8} L ${x + coilWidth * 0.3} ${height * 0.2} L ${x + coilWidth * 0.6} ${height * 0.8}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
      // N to C indicator
      if (i === 0) {
        svg += `<text x="${x}" y="${height * 0.95}" font-size="10" fill="${stroke}">N</text>`;
      }
    }
    svg += `<text x="${width - 10}" y="${height * 0.95}" font-size="10" fill="${stroke}">C</text>`;
  } else if (type === 'beta-sheet') {
    // Beta sheet (arrows pointing same direction)
    const strandWidth = width / strands;
    const arrowLength = height * 0.6;

    for (let i = 0; i < strands; i++) {
      const x = i * strandWidth + 10;
      // Parallel beta strands (arrows pointing right)
      svg += `<path d="M ${x} ${height * 0.2} L ${x + arrowLength} ${height * 0.5} L ${x} ${height * 0.8} Z" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;

      // Hydrogen bonds (dashed lines between strands)
      if (i < strands - 1) {
        for (let j = 0; j < 3; j++) {
          const hx = x + arrowLength + j * (strandWidth - arrowLength) / 3;
          svg += `<line x1="${hx}" y1="${height * 0.3 + j * height * 0.2}" x2="${hx}" y2="${height * 0.3 + j * height * 0.2}" stroke="${stroke}" stroke-width="1" stroke-dasharray="3 3" opacity="${opacity * 0.5}"/>`;
        }
      }
    }
  } else {
    // Tertiary structure (globular blob)
    svg += `<ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.4}" ry="${height * 0.4}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
    // Small pockets on surface
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const px = width / 2 + Math.cos(angle) * width * 0.3;
      const py = height / 2 + Math.sin(angle) * height * 0.3;
      svg += `<circle cx="${px}" cy="${py}" r="5" fill="#c084fc" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="${opacity * 0.7}"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

// ============================================================================
// Export all generators
// ============================================================================

export const scientificShapeGenerators = {
  dnaHelix: generateDNAHelix,
  cellMembrane: generateCellMembrane,
  cellLayer: generateCellLayer,
  pathwayArrow: generatePathwayArrow,
  neuron: generateNeuron,
  mitochondria: generateMitochondria,
  nucleus: generateNucleus,
  ribosome: generateRibosome,
  vesicle: generateVesicle,
  virus: generateVirus,
  bacteria: generateBacteria,
  golgi: generateGolgi,
  er: generateER,
  microtubule: generateMicrotubule,
  protein: generateProtein,
};

export default scientificShapeGenerators;
