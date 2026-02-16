// System font stacks used as CSS variables.
// In production with internet access, swap back to next/font/google:
//   import { Inter, Plus_Jakarta_Sans, Merriweather } from "next/font/google";

const makeFontVar = (variable: string) => ({
  variable,
  className: "",
  style: { fontFamily: "inherit" } as const,
});

export const inter = makeFontVar("font-inter");
export const plusJakarta = makeFontVar("font-plus-jakarta");
export const merriweather = makeFontVar("font-merriweather");
