/**
 * Mermaid Graph Import
 *
 * Parses Mermaid diagram SVG into a structured graph representation
 * and creates editable Fabric.js objects with smart connectors.
 *
 * @module mermaid-import
 */

import { Canvas as FabricCanvas, Rect, IText, FabricObject, Group } from 'fabric';
import { ConnectorManager, ensureObjectId } from './ConnectorManager';
import { calculateConnectorPath } from './SmartConnector';

// =============================================================================
// TYPES
// =============================================================================

export interface MermaidNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: 'rect' | 'rounded' | 'diamond' | 'circle' | 'stadium' | 'cylinder';
}

export interface MermaidEdge {
  sourceId: string;
  targetId: string;
  label?: string;
  arrowType: 'arrow' | 'none' | 'both';
}

export interface MermaidGraph {
  nodes: MermaidNode[];
  edges: MermaidEdge[];
  direction: 'TB' | 'LR' | 'BT' | 'RL';
}

export interface CreateCanvasGraphOptions {
  nodeColor?: string;
  textColor?: string;
  padding?: number;
}

export interface CreateCanvasGraphResult {
  nodes: Map<string, FabricObject>;
  connectorIds: string[];
}

// =============================================================================
// MERMAID SVG PARSING
// =============================================================================

/**
 * Parse a Mermaid SVG string into a structured graph
 */
export function parseMermaidSVG(svgString: string): MermaidGraph {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  const nodes: MermaidNode[] = [];
  const edges: MermaidEdge[] = [];
  let direction: MermaidGraph['direction'] = 'TB';

  // Find all node groups - Mermaid uses class "node"
  const nodeGroups = doc.querySelectorAll('.node');
  for (const nodeGroup of Array.from(nodeGroups)) {
    const node = parseNodeGroup(nodeGroup as Element);
    if (node) {
      nodes.push(node);
    }
  }

  // Find all edges - Mermaid uses class "edgePath" or "edge"
  const edgePaths = doc.querySelectorAll('.edgePath path, .edgePath path[id^="L-"]');
  for (const edgePath of Array.from(edgePaths)) {
    const edge = parseEdgePath(edgePath as Element, nodes);
    if (edge) {
      edges.push(edge);
    }
  }

  // Also look for edge labels
  const edgeLabels = doc.querySelectorAll('.edgeLabel');
  for (const edgeLabel of Array.from(edgeLabels)) {
    const edge = parseEdgeLabel(edgeLabel as Element, nodes);
    if (edge && !edges.some(e => e.sourceId === edge.sourceId && e.targetId === edge.targetId)) {
      edges.push(edge);
    }
  }

  // Detect direction from overall layout
  direction = detectDiagramDirection(nodes, doc);

  return { nodes, edges, direction };
}

/**
 * Parse a Mermaid node group element
 */
function parseNodeGroup(element: Element): MermaidNode | null {
  // Get node ID from the group's id attribute
  // Format: flowchart-NODEID-123
  const groupId = element.getAttribute('id');
  if (!groupId) return null;

  // Extract node ID - varies by diagram type
  // flowchart-A-123, stateDiagram-NODEID-123, etc.
  const idMatch = groupId.match(/([A-Za-z0-9]+)-([A-Za-z0-9]+)-/);
  const nodeId = idMatch ? idMatch[1] : groupId;

  // Find the shape element (rect, circle, polygon)
  const rect = element.querySelector('rect');
  const circle = element.querySelector('circle');
  const polygon = element.querySelector('polygon');

  let shape: MermaidNode['shape'] = 'rect';
  let x = 0, y = 0, width = 0, height = 0;

  if (rect) {
    const rectX = parseFloat(rect.getAttribute('x') || '0');
    const rectY = parseFloat(rect.getAttribute('y') || '0');
    const rectWidth = parseFloat(rect.getAttribute('width') || '0');
    const rectHeight = parseFloat(rect.getAttribute('height') || '0');
    const rx = parseFloat(rect.getAttribute('rx') || '0');

    // Check for rounded corners or stadium shape
    const ry = parseFloat(rect.getAttribute('ry') || String(rx));
    if (rx > 0 && ry === rx && rectWidth / 2 === rx) {
      shape = 'stadium';
    } else if (rx > 0 || ry > 0) {
      shape = 'rounded';
    }

    x = rectX;
    y = rectY;
    width = rectWidth;
    height = rectHeight;
  } else if (circle) {
    const cx = parseFloat(circle.getAttribute('cx') || '0');
    const cy = parseFloat(circle.getAttribute('cy') || '0');
    const r = parseFloat(circle.getAttribute('r') || '0');
    shape = 'circle';
    x = cx - r;
    y = cy - r;
    width = r * 2;
    height = r * 2;
  } else if (polygon) {
    // Diamond shapes are rendered as polygons
    const points = polygon.getAttribute('points');
    if (points) {
      const coords = points.split(/\s+/).map((p, i) => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
      });
      if (coords.length >= 3) {
        // Calculate bounding box
        const xs = coords.map(c => c.x);
        const ys = coords.map(c => c.y);
        x = Math.min(...xs);
        y = Math.min(...ys);
        width = Math.max(...xs) - x;
        height = Math.max(...ys) - y;
        shape = 'diamond';
      }
    }
  }

  // Find label text
  let label = '';
  const textElement = element.querySelector('text, .nodeLabel, span');
  if (textElement) {
    label = textElement.textContent || '';
  } else {
    // Try foreignObject
    const foreignObject = element.querySelector('foreignObject');
    if (foreignObject) {
      label = foreignObject.textContent || '';
    }
  }

  // Clean up label text (remove newlines, extra spaces)
  label = label.trim().replace(/\s+/g, ' ');

  // Apply transform if present
  const transform = element.getAttribute('transform');
  if (transform) {
    const translateMatch = transform.match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)/);
    if (translateMatch) {
      x += parseFloat(translateMatch[1]);
      y += parseFloat(translateMatch[2]);
    }
  }

  return {
    id: nodeId,
    label,
    x,
    y,
    width,
    height,
    shape,
  };
}

/**
 * Parse an edge path element
 */
function parseEdgePath(element: Element, nodes: MermaidNode[]): MermaidEdge | null {
  const id = element.getAttribute('id') || '';
  // Format: L-SOURCE-TARGET or L-L-SOURCE-TARGET
  const idMatch = id.match(/L-(?:L-)?([A-Za-z0-9]+)-([A-Za-z0-9]+)/);

  if (!idMatch) return null;

  const sourceId = idMatch[2];
  const targetId = idMatch[3];

  // Validate nodes exist
  const sourceExists = nodes.some(n => n.id === sourceId);
  const targetExists = nodes.some(n => n.id === targetId);

  if (!sourceExists || !targetExists) {
    return null;
  }

  return {
    sourceId,
    targetId,
    arrowType: 'arrow', // Default
  };
}

/**
 * Parse an edge label element
 */
function parseEdgeLabel(element: Element, nodes: MermaidNode[]): MermaidEdge | null {
  const id = element.getAttribute('id') || '';
  // Format: L-L-SOURCE-TARGET
  const idMatch = id.match(/L-L-([A-Za-z0-9]+)-([A-Za-z0-9]+)/);

  if (!idMatch) return null;

  const sourceId = idMatch[1];
  const targetId = idMatch[2];

  const labelElement = element.querySelector('text');
  const label = labelElement?.textContent || undefined;

  return {
    sourceId,
    targetId,
    label,
    arrowType: 'arrow',
  };
}

/**
 * Detect diagram direction from node positions
 */
function detectDiagramDirection(nodes: MermaidNode[], doc: Document): MermaidGraph['direction'] {
  if (nodes.length < 2) return 'TB';

  // Calculate variance in X vs Y positions
  const xPositions = nodes.map(n => n.x);
  const yPositions = nodes.map(n => n.y);

  const xVariance = Math.max(...xPositions) - Math.min(...xPositions);
  const yVariance = Math.max(...yPositions) - Math.min(...yPositions);

  // Also check for specific Mermaid attributes
  const rootElement = doc.querySelector('svg, #mermaid, #graph');
  if (rootElement) {
    const classAttr = rootElement.getAttribute('class') || '';
    if (classAttr.includes('TB')) return 'TB';
    if (classAttr.includes('LR')) return 'LR';
    if (classAttr.includes('BT')) return 'BT';
    if (classAttr.includes('RL')) return 'RL';
  }

  // Infer from node positions
  // More variance in Y suggests TB (vertical stacking)
  // More variance in X suggests LR (horizontal arrangement)
  return yVariance > xVariance ? 'TB' : 'LR';
}

// =============================================================================
// CANVAS GRAPH CREATION
// =============================================================================

/**
 * Create an editable graph on the canvas from parsed Mermaid graph
 */
export function createCanvasGraph(
  canvas: FabricCanvas,
  graph: MermaidGraph,
  connectorManager: ConnectorManager,
  options: CreateCanvasGraphOptions = {}
): CreateCanvasGraphResult {
  const {
    nodeColor = '#ffffff',
    textColor = '#333333',
    padding = 8,
  } = options;

  const nodeObjects = new Map<string, FabricObject>();
  const connectorIds: string[] = [];

  // Create nodes first
  for (const mermaidNode of graph.nodes) {
    const nodeObj = createFabricNode(mermaidNode, {
      nodeColor,
      textColor,
      padding,
    });

    canvas.add(nodeObj);
    nodeObjects.set(mermaidNode.id, nodeObj);
  }

  // Then create edges as smart connectors
  for (const edge of graph.edges) {
    const sourceObj = nodeObjects.get(edge.sourceId);
    const targetObj = nodeObjects.get(edge.targetId);

    if (sourceObj && targetObj) {
      const connectorId = connectorManager.addConnector(
        ensureObjectId(sourceObj),
        ensureObjectId(targetObj),
        {
          ...edge.label ? { label: edge.label } : {},
        }
      );

      if (connectorId) {
        connectorIds.push(connectorId);
      }
    }
  }

  canvas.renderAll();

  return {
    nodes: nodeObjects,
    connectorIds,
  };
}

/**
 * Create a Fabric.js object from a Mermaid node
 */
function createFabricNode(
  node: MermaidNode,
  options: CreateCanvasGraphOptions
): Group {
  const { nodeColor = '#ffffff', textColor = '#333333', padding = 8 } = options;

  const objects: FabricObject[] = [];

  // Create shape based on Mermaid shape type
  let shape: FabricObject;

  switch (node.shape) {
    case 'diamond':
      // Diamond using rotated rect
      shape = new Rect({
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
        fill: nodeColor,
        stroke: '#333333',
        strokeWidth: 2,
        angle: 45,
        originX: 'center',
        originY: 'center',
      });
      break;

    case 'circle':
      shape = new Rect({
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
        fill: nodeColor,
        stroke: '#333333',
        strokeWidth: 2,
        rx: node.width / 2,
        ry: node.height / 2,
      });
      break;

    case 'rounded':
      shape = new Rect({
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
        fill: nodeColor,
        stroke: '#333333',
        strokeWidth: 2,
        rx: 8,
        ry: 8,
      });
      break;

    case 'stadium':
      shape = new Rect({
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
        fill: nodeColor,
        stroke: '#333333',
        strokeWidth: 2,
        rx: node.height / 2,
        ry: node.height / 2,
      });
      break;

    case 'cylinder':
      // Cylinder represented as two ellipses and a rect
      // Simplified as a rect with ellipse top
      shape = new Rect({
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
        fill: nodeColor,
        stroke: '#333333',
        strokeWidth: 2,
      });
      break;

    default:
      // Standard rectangle
      shape = new Rect({
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
        fill: nodeColor,
        stroke: '#333333',
        strokeWidth: 2,
      });
      break;
  }

  objects.push(shape);

  // Add label text
  if (node.label) {
    const text = new IText(node.label, {
      left: node.x + node.width / 2,
      top: node.y + node.height / 2,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: textColor,
      originX: 'center',
      originY: 'center',
    });
    objects.push(text);
  }

  // Create group
  const group = new Group(objects, {
    left: node.x,
    top: node.y,
    selectable: true,
    evented: true,
  });

  // Set ID and custom data attributes for connector tracking
  group.set('id', `mermaid_${node.id}`);
  group.set('data-type', 'mermaid-node');
  group.set('data-node-id', node.id);

  return group;
}

/**
 * Check if an SVG appears to be a Mermaid diagram
 */
export function isMermaidDiagram(svgContent: string): boolean {
  // Look for Mermaid-specific markers
  const mermaidMarkers = [
    'class="node"',
    'class="edgePath"',
    'class="edgeLabel"',
    'id="mermaid"',
    'id="flowchart-"',
    'id="stateDiagram-"',
  ];

  const lowerContent = svgContent.toLowerCase();
  return mermaidMarkers.some(marker => lowerContent.includes(marker.toLowerCase()));
}

/**
 * Get Mermaid code from SVG if embedded
 */
export function extractMermaidCode(svgContent: string): string | null {
  // Look for embedded Mermaid code in comments
  // Use [\s\S]*? instead of /s flag for broader ES compatibility
  const commentMatch = svgContent.match(/%%\{[\s\S]*?\}%%/);
  if (commentMatch) {
    return commentMatch[0];
  }

  // Try to extract from specific data attributes
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const dataElement = doc.querySelector('[data-mermaid]');
  if (dataElement) {
    return dataElement.getAttribute('data-mermaid') || null;
  }

  return null;
}

/**
 * Create a preview graph (simplified visualization)
 * Used for showing a preview before sending to canvas
 */
export function createPreviewGraph(
  graph: MermaidGraph
): { width: number; height: number; svg: string } {
  const bounds = calculateGraphBounds(graph);

  // Generate simplified SVG for preview
  const nodesSVG = graph.nodes.map(node => {
    const style = `fill: ${getShapeColor(node.shape)}; stroke: #333; stroke-width: 2;`;
    switch (node.shape) {
      case 'diamond':
        return `<polygon points="${getDiamondPoints(node)}" style="${style}" />`;
      case 'circle':
        return `<ellipse cx="${node.x + node.width / 2}" cy="${node.y + node.height / 2}" rx="${node.width / 2}" ry="${node.height / 2}" style="${style}" />`;
      case 'rounded':
        return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="8" ry="8" style="${style}" />`;
      case 'stadium':
        return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="${node.height / 2}" ry="${node.height / 2}" style="${style}" />`;
      default:
        return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" style="${style}" />`;
    }
  });

  const edgesSVG = graph.edges.map(edge => {
    const source = graph.nodes.find(n => n.id === edge.sourceId);
    const target = graph.nodes.find(n => n.id === edge.targetId);
    if (!source || !target) return '';

    const sourceCenter = {
      x: source.x + source.width / 2,
      y: source.y + source.height / 2,
    };
    const targetCenter = {
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    };

    // Simple straight line
    return `<line x1="${sourceCenter.x}" y1="${sourceCenter.y}" x2="${targetCenter.x}" y2="${targetCenter.y}" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)" />`;
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width + 40}" height="${bounds.height + 40}">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 0" fill="#666" />
        </marker>
      </defs>
      ${nodesSVG.join('\n')}
      ${edgesSVG.join('\n')}
    </svg>
  `;

  return {
    width: bounds.width + 40,
    height: bounds.height + 40,
    svg: svg.trim(),
  };
}

// =============================================================================
// UTILITIES
// =============================================================================

function calculateGraphBounds(graph: MermaidGraph): {
  width: number;
  height: number;
} {
  if (graph.nodes.length === 0) {
    return { width: 100, height: 100 };
  }

  let maxX = 0;
  let maxY = 0;

  for (const node of graph.nodes) {
    maxX = Math.max(maxX, node.x + node.width);
    maxY = Math.max(maxY, node.y + node.height);
  }

  return { width: maxX, height: maxY };
}

function getShapeColor(shape: MermaidNode['shape']): string {
  const colors: Record<string, string> = {
    rect: '#e1f5fe',
    rounded: '#fff9c4',
    diamond: '#fce4ec',
    circle: '#f3e5f5',
    stadium: '#e8f5e9',
    cylinder: '#fff3e0',
  };
  return colors[shape] || '#e1f5fe';
}

function getDiamondPoints(node: MermaidNode): string {
  // Diamond points from center of each side
  const cx = node.x + node.width / 2;
  const cy = node.y + node.height / 2;
  const halfWidth = node.width / 2;
  const halfHeight = node.height / 2;

  return `${cx},${cy - halfHeight} ${cx + halfWidth},${cy} ${cx},${cy + halfHeight} ${cx - halfWidth},${cy}`;
}
