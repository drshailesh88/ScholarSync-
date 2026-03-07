import type { ShapeData } from "@/types/presentation";

export type ShapeType = ShapeData["shapeType"];

export const SHAPE_TYPE_OPTIONS: { type: ShapeType; label: string }[] = [
  { type: "rectangle", label: "Rectangle" },
  { type: "rounded_rectangle", label: "Rounded Rectangle" },
  { type: "circle", label: "Circle" },
  { type: "ellipse", label: "Ellipse" },
  { type: "triangle", label: "Triangle" },
  { type: "arrow", label: "Arrow" },
  { type: "line", label: "Line" },
  { type: "star", label: "Star" },
  { type: "diamond", label: "Diamond" },
  { type: "pentagon", label: "Pentagon" },
  { type: "hexagon", label: "Hexagon" },
];

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

export function renderShapeSvgPrimitive(
  shapeType: ShapeType,
  { fill, stroke, strokeWidth }: ShapeRenderOptions
): React.ReactNode {
  switch (shapeType) {
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
    default:
      return <rect x="8" y="8" width="84" height="84" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
}
