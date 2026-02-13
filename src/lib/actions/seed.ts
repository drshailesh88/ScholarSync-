"use server";

import { db } from "@/lib/db";
import { users, projects, papers, userReferences } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DEV_USER_ID } from "@/lib/auth";

// Seeds the database with realistic dev data if it's empty
export async function seedDevData() {
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, DEV_USER_ID));

  if (existing) return { seeded: false, message: "Dev data already exists" };

  // Create dev user
  await db.insert(users).values({
    id: DEV_USER_ID,
    email: "rahul.sharma@aiims.edu",
    full_name: "Dr. Rahul Sharma",
    degree_level: "phd",
    specialty: "Molecular Biology",
    country: "India",
    bio: "PhD candidate researching CRISPR-Cas9 applications in sickle cell disease at AIIMS, New Delhi.",
    plan: "basic",
    tokens_limit: 50000,
    tokens_used_this_month: 12450,
    searches_used_this_month: 85,
    plagiarism_checks_used: 3,
    onboarding_completed: true,
  });

  // Create sample projects
  const projectData = [
    {
      title: "CRISPR-Cas9 Systematic Review",
      project_type: "systematic_review" as const,
      status: "drafting" as const,
      description: "A systematic review of CRISPR-Cas9 gene editing for sickle cell disease treatment",
    },
    {
      title: "Base Editing Safety Profile",
      project_type: "original_article" as const,
      status: "drafting" as const,
      description: "Analysis of off-target effects in adenine base editing",
    },
    {
      title: "Gene Therapy Ethics Review",
      project_type: "review_article" as const,
      status: "reviewing" as const,
      description: "Ethical considerations in germline gene therapy",
    },
    {
      title: "CTX001 Clinical Outcomes",
      project_type: "case_report" as const,
      status: "completed" as const,
      description: "Long-term outcomes of exa-cel therapy in SCD patients",
    },
    {
      title: "Prime Editing Mechanisms",
      project_type: "literature_review" as const,
      status: "planning" as const,
      description: "Literature review of prime editing mechanisms and applications",
    },
    {
      title: "Hemoglobin F Induction",
      project_type: "thesis" as const,
      status: "drafting" as const,
      description: "PhD thesis chapter on HbF induction strategies via CRISPR",
    },
  ];

  for (const p of projectData) {
    await db.insert(projects).values({
      user_id: DEV_USER_ID,
      ...p,
    });
  }

  // Create sample papers
  const paperData = [
    {
      title: "CRISPR-Cas9 Gene Editing for Sickle Cell Disease and β-Thalassemia",
      authors: ["Frangoul, H.", "Altshuler, D.", "Cappellini, M.D."],
      journal: "New England Journal of Medicine",
      year: 2021,
      doi: "10.1056/NEJMoa2031054",
      source: "pubmed" as const,
      abstract: "A single-group, open-label study of CTX001 in patients with transfusion-dependent β-thalassemia or severe sickle cell disease.",
      citation_count: 1850,
    },
    {
      title: "Base editing: precision chemistry on the genome and transcriptome",
      authors: ["Rees, H.A.", "Liu, D.R."],
      journal: "Nature Reviews Genetics",
      year: 2018,
      doi: "10.1038/s41576-018-0059-1",
      source: "semantic_scholar" as const,
      abstract: "Review of adenine and cytosine base editors for precise nucleotide conversions.",
      citation_count: 2100,
    },
    {
      title: "Prime editing: A new era of precise genome editing",
      authors: ["Anzalone, A.V.", "Randolph, P.B.", "Davis, J.R."],
      journal: "Nature",
      year: 2019,
      doi: "10.1038/s41586-019-1711-4",
      source: "pubmed" as const,
      abstract: "Search-and-replace genome editing without double-strand breaks or donor DNA.",
      citation_count: 3200,
    },
    {
      title: "Delivery technologies for genome editing",
      authors: ["Yin, H.", "Kauffman, K.J.", "Anderson, D.G."],
      journal: "Nature Reviews Drug Discovery",
      year: 2017,
      doi: "10.1038/nrd.2016.280",
      source: "semantic_scholar" as const,
      abstract: "Review of viral and non-viral delivery systems for CRISPR components.",
      citation_count: 1500,
    },
    {
      title: "The Ethics of Human Genome Editing",
      authors: ["National Academies of Sciences"],
      journal: "National Academies Press",
      year: 2017,
      doi: "10.17226/24623",
      source: "user_upload" as const,
      abstract: "Consensus study report on ethical considerations in human genome editing.",
      citation_count: 890,
    },
    {
      title: "In vivo CRISPR base editing of PCSK9 durably lowers cholesterol",
      authors: ["Musunuru, K.", "Chadwick, A.C.", "Mizoguchi, T."],
      journal: "Nature",
      year: 2021,
      doi: "10.1038/s41586-021-03534-y",
      source: "pubmed" as const,
      abstract: "Adenine base editing of PCSK9 in nonhuman primates lowers LDL cholesterol.",
      citation_count: 750,
    },
    {
      title: "Therapeutic gene editing: delivery and regulatory perspectives",
      authors: ["Li, C.", "Samulski, R.J."],
      journal: "Gene Therapy",
      year: 2020,
      doi: "10.1038/s41434-020-0171-1",
      source: "semantic_scholar" as const,
      abstract: "Overview of gene therapy delivery platforms and regulatory landscape.",
      citation_count: 420,
    },
    {
      title: "CRISPR-Cas9 structures and mechanisms",
      authors: ["Jiang, F.", "Doudna, J.A."],
      journal: "Annual Review of Biophysics",
      year: 2017,
      doi: "10.1146/annurev-biophys-062215-010822",
      source: "pubmed" as const,
      abstract: "Structural biology of CRISPR-Cas9 and implications for genome editing.",
      citation_count: 1100,
    },
  ];

  const paperIds: number[] = [];
  for (const p of paperData) {
    const [paper] = await db.insert(papers).values(p).returning();
    paperIds.push(paper.id);
  }

  // Create user references (library entries)
  for (let i = 0; i < paperIds.length; i++) {
    await db.insert(userReferences).values({
      userId: DEV_USER_ID,
      paperId: paperIds[i],
      collection: i < 3 ? "CRISPR Review" : i < 6 ? "Ethics" : "All Papers",
      isFavorite: i < 3,
    });
  }

  return { seeded: true, message: "Dev data seeded successfully" };
}
