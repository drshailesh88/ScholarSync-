import type { DomainId } from "@/lib/search/domains/types";

export const DOMAIN_OPTIONS: Array<{
  id: DomainId;
  label: string;
  description: string;
}> = [
  {
    id: "medicine",
    label: "Medicine & Health Sciences",
    description: "Clinical medicine, public health, biomedical research",
  },
  {
    id: "biology",
    label: "Biology & Life Sciences",
    description: "Molecular biology, genetics, ecology, neuroscience",
  },
  {
    id: "physics",
    label: "Physics & Astronomy",
    description: "Theoretical physics, experimental physics, astrophysics",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    description: "Organic, inorganic, physical, analytical chemistry",
  },
  {
    id: "computer_science",
    label: "Computer Science & AI",
    description: "Software engineering, machine learning, algorithms, systems",
  },
  {
    id: "engineering",
    label: "Engineering",
    description: "Electrical, mechanical, civil, chemical engineering",
  },
  {
    id: "mathematics",
    label: "Mathematics",
    description: "Pure mathematics, applied mathematics, statistics",
  },
  {
    id: "social_sciences",
    label: "Social Sciences",
    description: "Sociology, anthropology, political science",
  },
  {
    id: "economics",
    label: "Economics & Business",
    description: "Microeconomics, macroeconomics, finance, management",
  },
  {
    id: "psychology",
    label: "Psychology",
    description: "Clinical, cognitive, social, developmental psychology",
  },
  {
    id: "law",
    label: "Law",
    description: "Constitutional law, international law, jurisprudence",
  },
  {
    id: "humanities",
    label: "Humanities & Arts",
    description: "History, philosophy, literature, linguistics",
  },
  {
    id: "education",
    label: "Education",
    description: "Educational research, pedagogy, curriculum design",
  },
  {
    id: "environmental",
    label: "Environmental Science",
    description: "Climate science, ecology, conservation, sustainability",
  },
  {
    id: "multidisciplinary",
    label: "Multidisciplinary / Not Sure",
    description: "Search across all scientific disciplines",
  },
];

export function getDomainLabel(domainId: string): string {
  return DOMAIN_OPTIONS.find((domain) => domain.id === domainId)?.label ?? "Multidisciplinary";
}
