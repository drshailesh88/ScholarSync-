import type { ShapeData } from "@/types/presentation";

export type ShapeType = ShapeData["shapeType"];

export type ShapeCategory = "Basic" | "Flowchart" | "Connectors" | "Callouts" | "Arrows" | "Brackets";

export interface ShapeOption {
  type: ShapeType;
  label: string;
  category: ShapeCategory;
}

export const SHAPE_CATEGORIES: ShapeCategory[] = [
  "Basic",
  "Flowchart",
  "Connectors",
  "Callouts",
  "Arrows",
  "Brackets",
];

export const SHAPE_TYPE_OPTIONS: ShapeOption[] = [
  // Basic
  { type: "rectangle", label: "Rectangle", category: "Basic" },
  { type: "rounded_rectangle", label: "Rounded Rect", category: "Basic" },
  { type: "circle", label: "Circle", category: "Basic" },
  { type: "ellipse", label: "Ellipse", category: "Basic" },
  { type: "triangle", label: "Triangle", category: "Basic" },
  { type: "arrow", label: "Arrow", category: "Basic" },
  { type: "line", label: "Line", category: "Basic" },
  { type: "star", label: "Star", category: "Basic" },
  { type: "diamond", label: "Diamond", category: "Basic" },
  { type: "pentagon", label: "Pentagon", category: "Basic" },
  { type: "hexagon", label: "Hexagon", category: "Basic" },
  // Flowchart
  { type: "flowchart_process", label: "Process", category: "Flowchart" },
  { type: "flowchart_decision", label: "Decision", category: "Flowchart" },
  { type: "flowchart_data", label: "Data", category: "Flowchart" },
  { type: "flowchart_document", label: "Document", category: "Flowchart" },
  { type: "flowchart_start_end", label: "Start/End", category: "Flowchart" },
  { type: "flowchart_predefined", label: "Predefined", category: "Flowchart" },
  { type: "flowchart_manual_input", label: "Manual Input", category: "Flowchart" },
  { type: "flowchart_preparation", label: "Preparation", category: "Flowchart" },
  // Connectors
  { type: "connector_straight", label: "Straight", category: "Connectors" },
  { type: "connector_elbow", label: "Elbow", category: "Connectors" },
  { type: "connector_curved", label: "Curved", category: "Connectors" },
  // Callouts
  { type: "callout_rect", label: "Rectangle", category: "Callouts" },
  { type: "callout_rounded", label: "Rounded", category: "Callouts" },
  { type: "callout_cloud", label: "Cloud", category: "Callouts" },
  // Arrows
  { type: "arrow_right", label: "Right", category: "Arrows" },
  { type: "arrow_left", label: "Left", category: "Arrows" },
  { type: "arrow_up", label: "Up", category: "Arrows" },
  { type: "arrow_down", label: "Down", category: "Arrows" },
  { type: "arrow_double", label: "Double", category: "Arrows" },
  { type: "arrow_curved", label: "Curved", category: "Arrows" },
  { type: "chevron", label: "Chevron", category: "Arrows" },
  // Brackets / Braces
  { type: "bracket_left", label: "Bracket [", category: "Brackets" },
  { type: "bracket_right", label: "Bracket ]", category: "Brackets" },
  { type: "brace_left", label: "Brace {", category: "Brackets" },
  { type: "brace_right", label: "Brace }", category: "Brackets" },
];

/** Get shapes grouped by category */
export function getShapesByCategory(): Record<ShapeCategory, ShapeOption[]> {
  const groups = {} as Record<ShapeCategory, ShapeOption[]>;
  for (const cat of SHAPE_CATEGORIES) {
    groups[cat] = SHAPE_TYPE_OPTIONS.filter((s) => s.category === cat);
  }
  return groups;
}

/** Returns true if the shape type is a connector */
export function isConnectorShape(shapeType: ShapeType): boolean {
  return shapeType === "connector_straight" || shapeType === "connector_elbow" || shapeType === "connector_curved";
}

/** Returns true if the shape type is line-like (no fill) */
export function isLineShape(shapeType: ShapeType): boolean {
  return shapeType === "line" || isConnectorShape(shapeType);
}

interface ShapeRenderOptions {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

function regularPolygonPoints(
  sides: number,
  radius = 42,
  centerX = 50,
  centerY = 50,
  rotationDegrees = -90
): string {
  const rotationRadians = (rotationDegrees * Math.PI) / 180;
  const points: string[] = [];

  for (let i = 0; i < sides; i += 1) {
    const angle = rotationRadians + (2 * Math.PI * i) / sides;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return points.join(" ");
}

function starPoints(
  spikes = 5,
  outerRadius = 42,
  innerRadius = 18,
  centerX = 50,
  centerY = 50
): string {
  const points: string[] = [];
  const step = Math.PI / spikes;

  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + i * step;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return points.join(" ");
}

/** Render an arrowhead marker definition */
export function renderArrowMarkers(
  id: string,
  arrowStart: string | undefined,
  arrowEnd: string | undefined,
  stroke: string
): React.ReactNode {
  const markers: React.ReactNode[] = [];

  const renderMarker = (markerId: string, type: string, isStart: boolean) => {
    switch (type) {
      case "arrow":
        return (
          <marker
            key={markerId}
            id={markerId}
            markerWidth="10"
            markerHeight="7"
            refX={isStart ? "0" : "10"}
            refY="3.5"
            orient="auto-start-reverse"
          >
            <polygon points={isStart ? "10,0 0,3.5 10,7" : "0,0 10,3.5 0,7"} fill={stroke} />
          </marker>
        );
      case "circle":
        return (
          <marker
            key={markerId}
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <circle cx="4" cy="4" r="3" fill={stroke} />
          </marker>
        );
      case "diamond":
        return (
          <marker
            key={markerId}
            id={markerId}
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <polygon points="5,0 10,5 5,10 0,5" fill={stroke} />
          </marker>
        );
      default:
        return null;
    }
  };

  if (arrowStart && arrowStart !== "none") {
    markers.push(renderMarker(`${id}-start`, arrowStart, true));
  }
  if (arrowEnd && arrowEnd !== "none") {
    markers.push(renderMarker(`${id}-end`, arrowEnd, false));
  }

  if (markers.length === 0) return null;
  return <defs>{markers}</defs>;
}

export function renderShapeSvgPrimitive(
  shapeType: ShapeType,
  { fill, stroke, strokeWidth }: ShapeRenderOptions
): React.ReactNode {
  switch (shapeType) {
    // ---- Basic shapes ----
    case "rectangle":
      return <rect x="8" y="8" width="84" height="84" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "rounded_rectangle":
      return <rect x="8" y="8" width="84" height="84" rx="14" ry="14" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "circle":
      return <circle cx="50" cy="50" r="40" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "ellipse":
      return <ellipse cx="50" cy="50" rx="42" ry="30" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "triangle":
      return <polygon points="50,8 92,92 8,92" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "arrow":
      return (
        <path
          d="M8 35 H58 V18 L92 50 L58 82 V65 H8 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "line":
      return (
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke={stroke}
          strokeWidth={Math.max(1, strokeWidth)}
          strokeLinecap="round"
        />
      );
    case "star":
      return <polygon points={starPoints()} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "diamond":
      return <polygon points="50,8 92,50 50,92 8,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "pentagon":
      return <polygon points={regularPolygonPoints(5)} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "hexagon":
      return <polygon points={regularPolygonPoints(6)} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;

    // ---- Flowchart shapes ----
    case "flowchart_process":
      // Standard rectangle (same as rectangle but semantically different)
      return <rect x="8" y="20" width="84" height="60" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "flowchart_decision":
      // Diamond
      return <polygon points="50,8 92,50 50,92 8,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "flowchart_data":
      // Parallelogram
      return <polygon points="20,10 92,10 80,90 8,90" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "flowchart_document":
      // Rectangle with wavy bottom
      return (
        <path
          d="M8,15 H92 V75 C75,65 55,90 35,80 C20,73 8,85 8,85 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case "flowchart_start_end":
      // Stadium / pill shape
      return <rect x="8" y="25" width="84" height="50" rx="25" ry="25" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "flowchart_predefined":
      // Rectangle with double vertical lines at sides
      return (
        <>
          <rect x="8" y="20" width="84" height="60" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="20" y1="20" x2="20" y2="80" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="80" y1="20" x2="80" y2="80" stroke={stroke} strokeWidth={strokeWidth} />
        </>
      );
    case "flowchart_manual_input":
      // Trapezoid with slanted top
      return <polygon points="8,25 92,10 92,90 8,90" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case "flowchart_preparation":
      // Hexagon (elongated horizontal)
      return <polygon points="20,10 80,10 92,50 80,90 20,90 8,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;

    // ---- Connectors ----
    case "connector_straight":
      return (
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
        />
      );
    case "connector_elbow":
      return (
        <path
          d="M10,30 H50 V70 H90"
          fill="none"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "connector_curved":
      return (
        <path
          d="M10,50 C30,10 70,90 90,50"
          fill="none"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
        />
      );

    // ---- Callouts ----
    case "callout_rect":
      return (
        <path
          d="M8,10 H92 V65 H45 L30,88 L35,65 H8 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "callout_rounded":
      return (
        <path
          d="M22,10 H78 Q92,10 92,24 V51 Q92,65 78,65 H45 L30,88 L35,65 H22 Q8,65 8,51 V24 Q8,10 22,10 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case "callout_cloud":
      return (
        <>
          <path
            d="M30,70 C10,70 5,55 15,45 C5,35 15,15 30,20 C35,5 55,5 60,18 C70,8 90,15 85,30 C95,35 95,55 82,58 C90,70 75,80 65,70 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <ellipse cx="35" cy="82" rx="6" ry="4" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
          <ellipse cx="25" cy="90" rx="4" ry="3" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </>
      );

    // ---- Arrow shapes ----
    case "arrow_right":
      return (
        <path
          d="M8 35 H60 V18 L92 50 L60 82 V65 H8 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "arrow_left":
      return (
        <path
          d="M92 35 H40 V18 L8 50 L40 82 V65 H92 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "arrow_up":
      return (
        <path
          d="M35 92 V40 H18 L50 8 L82 40 H65 V92 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "arrow_down":
      return (
        <path
          d="M35 8 V60 H18 L50 92 L82 60 H65 V8 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "arrow_double":
      return (
        <path
          d="M8 50 L28 20 V35 H72 V20 L92 50 L72 80 V65 H28 V80 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "arrow_curved":
      return (
        <path
          d="M15,70 C15,25 85,25 85,45 L92,45 L80,55 L75,42 L82,42 C82,30 25,30 25,65 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case "chevron":
      return (
        <path
          d="M8 10 L65 10 L92 50 L65 90 L8 90 L35 50 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    // ---- Brackets / Braces ----
    case "bracket_left":
      return (
        <path
          d="M65,10 H45 Q30,10 30,25 V42 Q30,50 20,50 Q30,50 30,58 V75 Q30,90 45,90 H65"
          fill="none"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "bracket_right":
      return (
        <path
          d="M35,10 H55 Q70,10 70,25 V42 Q70,50 80,50 Q70,50 70,58 V75 Q70,90 55,90 H35"
          fill="none"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "brace_left":
      return (
        <path
          d="M70,8 C55,8 50,15 50,30 L50,42 C50,48 45,50 35,50 C45,50 50,52 50,58 L50,70 C50,85 55,92 70,92"
          fill="none"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
        />
      );
    case "brace_right":
      return (
        <path
          d="M30,8 C45,8 50,15 50,30 L50,42 C50,48 55,50 65,50 C55,50 50,52 50,58 L50,70 C50,85 45,92 30,92"
          fill="none"
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth)}
          strokeLinecap="round"
        />
      );

    default:
      return <rect x="8" y="8" width="84" height="84" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
}
