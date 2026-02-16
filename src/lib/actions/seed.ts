"use server";

import { db } from "@/lib/db";
import {
  users,
  projects,
  papers,
  userReferences,
  searchQueries,
  synthesisDocuments,
  synthesisSections,
  conversations,
  messages,
  slideDecks,
  slides,
} from "@/lib/db/schema";
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

  // Get the first project ID for associations
  const [firstProject] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.user_id, DEV_USER_ID))
    .limit(1);

  // Create search history
  const searchData = [
    { original_query: "CRISPR-Cas9 sickle cell disease clinical trials", source: "pubmed" as const, result_count: 127 },
    { original_query: "base editing off-target effects meta-analysis", source: "semantic_scholar" as const, result_count: 84 },
    { original_query: "gene therapy delivery nanoparticles review 2024", source: "openalex" as const, result_count: 215 },
    { original_query: "prime editing efficiency mammalian cells", source: "pubmed" as const, result_count: 63 },
    { original_query: "hemoglobin F induction hydroxyurea CRISPR", source: "semantic_scholar" as const, result_count: 42 },
  ];

  for (const s of searchData) {
    await db.insert(searchQueries).values({
      user_id: DEV_USER_ID,
      project_id: firstProject?.id,
      ...s,
    });
  }

  // Create a synthesis document with sections
  if (firstProject) {
    const [doc] = await db
      .insert(synthesisDocuments)
      .values({
        project_id: firstProject.id,
        title: "CRISPR-Cas9 for Sickle Cell Disease: A Systematic Review",
        document_type: "systematic_review",
        citation_style: "vancouver",
        target_journal: "The Lancet Haematology",
        word_limit: 5000,
        overall_status: "drafting",
      })
      .returning();

    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: "abstract",
      title: "Abstract",
      sort_order: 0,
      plain_text_content: "Background: CRISPR-Cas9 gene editing has emerged as a promising therapeutic approach for sickle cell disease (SCD). This systematic review evaluates clinical evidence for CRISPR-based treatments in SCD patients.",
      word_count: 32,
    });
    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: "introduction",
      title: "Introduction",
      sort_order: 1,
      plain_text_content: "Sickle cell disease affects millions worldwide, with the highest burden in sub-Saharan Africa and India. Current treatments including hydroxyurea and blood transfusions manage symptoms but do not address the underlying genetic cause. CRISPR-Cas9 technology offers the potential for a one-time curative treatment by editing the BCL11A enhancer or correcting the HBB gene directly.",
      word_count: 52,
    });
    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: "methodology",
      title: "Methods",
      sort_order: 2,
      plain_text_content: "We searched PubMed, EMBASE, and Cochrane Library from January 2016 to December 2025 using MeSH terms for CRISPR, gene editing, and sickle cell disease. Two reviewers independently screened titles and abstracts.",
      word_count: 35,
    });
    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: "results",
      title: "Results",
      sort_order: 3,
      plain_text_content: "",
      word_count: 0,
      status: "outline",
    });
    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: "discussion",
      title: "Discussion",
      sort_order: 4,
      plain_text_content: "",
      word_count: 0,
      status: "outline",
    });

    // Create a conversation with messages
    const [conv] = await db
      .insert(conversations)
      .values({
        user_id: DEV_USER_ID,
        project_id: firstProject.id,
        mode: "research",
        title: "Literature search strategy for CRISPR SCD review",
      })
      .returning();

    await db.insert(messages).values({
      conversation_id: conv.id,
      role: "user",
      content: "Help me define the inclusion criteria for my systematic review on CRISPR-Cas9 for sickle cell disease.",
    });
    await db.insert(messages).values({
      conversation_id: conv.id,
      role: "assistant",
      content: "Based on your research question, I suggest the following PICO-based inclusion criteria:\n\n**Population:** Patients with confirmed sickle cell disease (HbSS or HbS/β-thal)\n**Intervention:** CRISPR-Cas9 gene editing targeting BCL11A, HBB, or related loci\n**Comparison:** Standard of care (hydroxyurea, transfusions) or no treatment\n**Outcomes:** HbF levels, transfusion independence, vaso-occlusive crises, adverse events\n\n**Additional criteria:**\n- Study types: RCTs, single-arm trials, case series (n≥3)\n- Published 2016-2025 (CRISPR clinical trials era)\n- English language\n\nShall I help refine the search strategy for PubMed?",
      model: "claude-sonnet-4-20250514",
      tokens_used: 285,
    });

    // Create a slide deck
    const [deck] = await db
      .insert(slideDecks)
      .values({
        projectId: firstProject.id,
        userId: DEV_USER_ID,
        title: "CRISPR-Cas9 for SCD: Preliminary Findings",
        description: "Conference presentation of systematic review preliminary results",
        theme: "academic",
        audienceType: "conference",
        totalSlides: 5,
      })
      .returning();

    const slideData = [
      { sortOrder: 0, layout: "title_content" as const, title: "CRISPR-Cas9 for Sickle Cell Disease", subtitle: "A Systematic Review of Clinical Evidence", speakerNotes: "Welcome. Today I present preliminary findings from our systematic review." },
      { sortOrder: 1, layout: "title_content" as const, title: "Background", content: { text: "SCD affects 20M+ globally. CRISPR enables one-time gene correction." }, speakerNotes: "SCD is one of the most common monogenic disorders." },
      { sortOrder: 2, layout: "title_content" as const, title: "Methods", content: { text: "Searched PubMed, EMBASE, Cochrane. PRISMA 2020 guidelines." }, speakerNotes: "Two independent reviewers screened all abstracts." },
      { sortOrder: 3, layout: "title_content" as const, title: "Key Findings", content: { text: "CTX001/exa-cel: 97% transfusion-free at 2yr follow-up." }, speakerNotes: "The results are remarkably consistent across trials." },
      { sortOrder: 4, layout: "title_content" as const, title: "Conclusions & Next Steps", content: { text: "CRISPR-Cas9 shows curative potential. Long-term safety data needed." }, speakerNotes: "Thank you. Questions?" },
    ];

    for (const s of slideData) {
      await db.insert(slides).values({
        deckId: deck.id,
        ...s,
      });
    }
  }

  return { seeded: true, message: "Dev data seeded: 1 user, 6 projects, 8 papers, 5 searches, 1 document, 1 conversation, 1 slide deck" };
}
