"use client";

import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  Atom,
  BookOpen,
  CaretCircleDown,
  Cards,
  ChartBar,
  Clock,
  Code,
  Globe,
  Image,
  ListBullets,
  MathOperations,
  Megaphone,
  Minus,
  PaintBrush,
  Rectangle,
  Question,
  Quotes,
  Table,
  TextAa,
  TreeStructure,
} from "@phosphor-icons/react";

type BlockIconComponent = ComponentType<IconProps>;

const BLOCK_ICON_MAP: Record<string, BlockIconComponent> = {
  Atom,
  BookOpen,
  CaretCircleDown,
  Cards,
  ChartBar,
  Clock,
  Code,
  Globe,
  Image,
  ListBullets,
  MathOperations,
  Megaphone,
  Minus,
  PaintBrush,
  Rectangle,
  Quotes,
  Table,
  TextAa,
  TreeStructure,
};

export function getBlockIcon(iconName: string): BlockIconComponent {
  return BLOCK_ICON_MAP[iconName] ?? Question;
}
