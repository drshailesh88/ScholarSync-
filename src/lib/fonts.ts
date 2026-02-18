// System font stacks used as CSS variables.
// In production with internet access, swap back to next/font/google:
//   import { Inter, Crimson_Pro, JetBrains_Mono } from "next/font/google";

const makeFontVar = (variable: string) => ({
  variable,
  className: "",
  style: { fontFamily: "inherit" } as const,
});

export const inter = makeFontVar("font-inter");
export const crimsonPro = makeFontVar("font-crimson-pro");
export const jetbrainsMono = makeFontVar("font-jetbrains-mono");
