// ============================================================================
// ScholarSync — Curated Journal Feed Directory
// ~80 medical/scientific journals organized by specialty
// ============================================================================

import type { JournalDirectoryEntry } from "@/types/feed";

export const JOURNAL_FEEDS: JournalDirectoryEntry[] = [

  // ═══════════════════════════════════════════════════════════════════
  // GENERAL MEDICINE / INTERNAL MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "NEJM — Current Issue",
    feedUrl: "https://www.nejm.org/action/showFeed?jc=nejm&type=etoc&feed=rss",
    siteUrl: "https://www.nejm.org",
    publisher: "Massachusetts Medical Society",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0028-4793",
    description: "The most trusted, influential source of new medical knowledge and clinical best practices.",
  },
  {
    title: "The Lancet",
    feedUrl: "https://www.thelancet.com/rssfeed/lancet_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lancet",
    publisher: "Elsevier",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0140-6736",
    description: "Publishing the best science for better lives.",
  },
  {
    title: "JAMA",
    feedUrl: "https://jamanetwork.com/rss/site_3/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jama",
    publisher: "American Medical Association",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0098-7484",
    description: "The Journal of the American Medical Association — peer-reviewed medical journal.",
  },
  {
    title: "BMJ",
    feedUrl: "https://www.bmj.com/rss/recent.xml",
    siteUrl: "https://www.bmj.com",
    publisher: "BMJ Publishing Group",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0959-8138",
    description: "Leading general medical journal. Research, education, comment, and analysis.",
  },
  {
    title: "Annals of Internal Medicine",
    feedUrl: "https://www.acpjournals.org/action/showFeed?type=etoc&feed=rss&jc=aim",
    siteUrl: "https://www.acpjournals.org/journal/aim",
    publisher: "American College of Physicians",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "0003-4819",
  },
  {
    title: "JAMA Internal Medicine",
    feedUrl: "https://jamanetwork.com/rss/site_110/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamainternalmedicine",
    publisher: "American Medical Association",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "2168-6106",
  },
  {
    title: "Nature Medicine",
    feedUrl: "https://www.nature.com/nm.rss",
    siteUrl: "https://www.nature.com/nm",
    publisher: "Springer Nature",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "1078-8956",
    description: "Biomedical research advancing clinical practice.",
  },
  {
    title: "PLOS Medicine",
    feedUrl: "https://journals.plos.org/plosmedicine/feed/atom",
    siteUrl: "https://journals.plos.org/plosmedicine",
    publisher: "PLOS",
    category: "General Medicine",
    specialty: "Internal Medicine",
    issn: "1549-1676",
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARDIOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Circulation",
    feedUrl: "https://www.ahajournals.org/action/showFeed?type=etoc&feed=rss&jc=circ",
    siteUrl: "https://www.ahajournals.org/journal/circ",
    publisher: "American Heart Association",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0009-7322",
    description: "Premier journal of the AHA, publishing cardiovascular research since 1950.",
  },
  {
    title: "European Heart Journal",
    feedUrl: "https://academic.oup.com/rss/site_5375/3048.xml",
    siteUrl: "https://academic.oup.com/eurheartj",
    publisher: "Oxford University Press / ESC",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0195-668X",
  },
  {
    title: "JACC",
    feedUrl: "https://www.jacc.org/action/showFeed?type=etoc&feed=rss&jc=jacc",
    siteUrl: "https://www.jacc.org/journal/jacc",
    publisher: "American College of Cardiology / Elsevier",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0735-1097",
    description: "Journal of the American College of Cardiology.",
  },
  {
    title: "JAMA Cardiology",
    feedUrl: "https://jamanetwork.com/rss/site_174/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamacardiology",
    publisher: "American Medical Association",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "2380-6583",
  },
  {
    title: "Circulation Research",
    feedUrl: "https://www.ahajournals.org/action/showFeed?type=etoc&feed=rss&jc=res",
    siteUrl: "https://www.ahajournals.org/journal/res",
    publisher: "American Heart Association",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "0009-7330",
  },
  {
    title: "Nature Reviews Cardiology",
    feedUrl: "https://www.nature.com/nrcardio.rss",
    siteUrl: "https://www.nature.com/nrcardio",
    publisher: "Springer Nature",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "1759-5002",
  },
  {
    title: "JACC: Heart Failure",
    feedUrl: "https://www.jacc.org/action/showFeed?type=etoc&feed=rss&jc=heart-failure",
    siteUrl: "https://www.jacc.org/journal/heart-failure",
    publisher: "American College of Cardiology / Elsevier",
    category: "Cardiology",
    specialty: "Internal Medicine",
    issn: "2213-1779",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SURGERY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Annals of Surgery",
    feedUrl: "https://journals.lww.com/annalsofsurgery/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/annalsofsurgery",
    publisher: "Wolters Kluwer",
    category: "Surgery",
    specialty: "Surgery",
    issn: "0003-4932",
  },
  {
    title: "JAMA Surgery",
    feedUrl: "https://jamanetwork.com/rss/site_117/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamasurgery",
    publisher: "American Medical Association",
    category: "Surgery",
    specialty: "Surgery",
    issn: "2168-6254",
  },
  {
    title: "British Journal of Surgery",
    feedUrl: "https://academic.oup.com/rss/site_5282/3162.xml",
    siteUrl: "https://academic.oup.com/bjs",
    publisher: "Oxford University Press",
    category: "Surgery",
    specialty: "Surgery",
    issn: "0007-1323",
  },
  {
    title: "The Lancet — General Surgery",
    feedUrl: "https://www.thelancet.com/rssfeed/lancet_surgery.xml",
    siteUrl: "https://www.thelancet.com",
    publisher: "Elsevier",
    category: "Surgery",
    specialty: "Surgery",
    issn: "0140-6736",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PEDIATRICS
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Pediatrics",
    feedUrl: "https://jamanetwork.com/rss/site_75/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamapediatrics",
    publisher: "American Medical Association",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "2168-6203",
  },
  {
    title: "Pediatrics",
    feedUrl: "https://publications.aap.org/action/showFeed?type=etoc&feed=rss&jc=pediatrics",
    siteUrl: "https://publications.aap.org/pediatrics",
    publisher: "American Academy of Pediatrics",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "0031-4005",
  },
  {
    title: "The Lancet Child & Adolescent Health",
    feedUrl: "https://www.thelancet.com/rssfeed/lanchi_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanchi",
    publisher: "Elsevier",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "2352-4642",
  },
  {
    title: "Archives of Disease in Childhood",
    feedUrl: "https://adc.bmj.com/rss/recent.xml",
    siteUrl: "https://adc.bmj.com",
    publisher: "BMJ Publishing Group",
    category: "Pediatrics",
    specialty: "Pediatrics",
    issn: "0003-9888",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ONCOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Oncology",
    feedUrl: "https://jamanetwork.com/rss/site_172/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaoncology",
    publisher: "American Medical Association",
    category: "Oncology",
    specialty: "Internal Medicine",
    issn: "2374-2437",
  },
  {
    title: "The Lancet Oncology",
    feedUrl: "https://www.thelancet.com/rssfeed/lanonc_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanonc",
    publisher: "Elsevier",
    category: "Oncology",
    specialty: "Internal Medicine",
    issn: "1470-2045",
  },
  {
    title: "Nature Reviews Cancer",
    feedUrl: "https://www.nature.com/nrc.rss",
    siteUrl: "https://www.nature.com/nrc",
    publisher: "Springer Nature",
    category: "Oncology",
    specialty: "Internal Medicine",
    issn: "1474-175X",
  },

  // ═══════════════════════════════════════════════════════════════════
  // NEUROLOGY / PSYCHIATRY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Neurology",
    feedUrl: "https://jamanetwork.com/rss/site_112/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaneurology",
    publisher: "American Medical Association",
    category: "Neurology",
    specialty: "Internal Medicine",
    issn: "2168-6149",
  },
  {
    title: "The Lancet Neurology",
    feedUrl: "https://www.thelancet.com/rssfeed/laneur_current.xml",
    siteUrl: "https://www.thelancet.com/journals/laneur",
    publisher: "Elsevier",
    category: "Neurology",
    specialty: "Internal Medicine",
    issn: "1474-4422",
  },
  {
    title: "Nature Neuroscience",
    feedUrl: "https://www.nature.com/neuro.rss",
    siteUrl: "https://www.nature.com/neuro",
    publisher: "Springer Nature",
    category: "Neurology",
    specialty: "Internal Medicine",
    issn: "1097-6256",
  },
  {
    title: "JAMA Psychiatry",
    feedUrl: "https://jamanetwork.com/rss/site_70/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamapsychiatry",
    publisher: "American Medical Association",
    category: "Psychiatry",
    specialty: "Psychiatry",
    issn: "2168-622X",
  },
  {
    title: "The Lancet Psychiatry",
    feedUrl: "https://www.thelancet.com/rssfeed/lanpsy_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanpsy",
    publisher: "Elsevier",
    category: "Psychiatry",
    specialty: "Psychiatry",
    issn: "2215-0366",
  },

  // ═══════════════════════════════════════════════════════════════════
  // RADIOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Radiology",
    feedUrl: "https://pubs.rsna.org/action/showFeed?type=etoc&feed=rss&jc=radiology",
    siteUrl: "https://pubs.rsna.org/journal/radiology",
    publisher: "RSNA",
    category: "Radiology",
    specialty: "Radiology",
    issn: "0033-8419",
  },
  {
    title: "JAMA Radiology (Diagnostic Imaging)",
    feedUrl: "https://jamanetwork.com/rss/site_176/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jama/diagnostic-imaging",
    publisher: "American Medical Association",
    category: "Radiology",
    specialty: "Radiology",
  },
  {
    title: "European Radiology",
    feedUrl: "https://link.springer.com/search.rss?search-within=Journal&facet-journal-id=330&query=",
    siteUrl: "https://link.springer.com/journal/330",
    publisher: "Springer Nature",
    category: "Radiology",
    specialty: "Radiology",
    issn: "0938-7994",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ORTHOPEDICS
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Journal of Bone & Joint Surgery",
    feedUrl: "https://journals.lww.com/jbjsjournal/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/jbjsjournal",
    publisher: "Wolters Kluwer",
    category: "Orthopedics",
    specialty: "Orthopedics",
    issn: "0021-9355",
  },
  {
    title: "Clinical Orthopaedics and Related Research",
    feedUrl: "https://journals.lww.com/clinorthop/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/clinorthop",
    publisher: "Wolters Kluwer",
    category: "Orthopedics",
    specialty: "Orthopedics",
    issn: "0009-921X",
  },

  // ═══════════════════════════════════════════════════════════════════
  // DERMATOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Dermatology",
    feedUrl: "https://jamanetwork.com/rss/site_68/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamadermatology",
    publisher: "American Medical Association",
    category: "Dermatology",
    specialty: "Dermatology",
    issn: "2168-6068",
  },
  {
    title: "British Journal of Dermatology",
    feedUrl: "https://academic.oup.com/rss/site_5102/3128.xml",
    siteUrl: "https://academic.oup.com/bjd",
    publisher: "Oxford University Press",
    category: "Dermatology",
    specialty: "Dermatology",
    issn: "0007-0963",
  },

  // ═══════════════════════════════════════════════════════════════════
  // OPHTHALMOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Ophthalmology",
    feedUrl: "https://jamanetwork.com/rss/site_116/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaophthalmology",
    publisher: "American Medical Association",
    category: "Ophthalmology",
    specialty: "Ophthalmology",
    issn: "2168-6165",
  },
  {
    title: "Ophthalmology",
    feedUrl: "https://www.aaojournal.org/action/showFeed?type=etoc&feed=rss&jc=ophtha",
    siteUrl: "https://www.aaojournal.org",
    publisher: "AAO / Elsevier",
    category: "Ophthalmology",
    specialty: "Ophthalmology",
    issn: "0161-6420",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ENT (OTOLARYNGOLOGY)
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "JAMA Otolaryngology — Head & Neck Surgery",
    feedUrl: "https://jamanetwork.com/rss/site_113/67.xml",
    siteUrl: "https://jamanetwork.com/journals/jamaotolaryngology",
    publisher: "American Medical Association",
    category: "Otolaryngology",
    specialty: "ENT",
    issn: "2168-6181",
  },
  {
    title: "The Laryngoscope",
    feedUrl: "https://onlinelibrary.wiley.com/action/showFeed?jc=15314995&type=etoc&feed=rss",
    siteUrl: "https://onlinelibrary.wiley.com/journal/15314995",
    publisher: "Wiley",
    category: "Otolaryngology",
    specialty: "ENT",
    issn: "0023-852X",
  },

  // ═══════════════════════════════════════════════════════════════════
  // OBSTETRICS & GYNECOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Obstetrics & Gynecology",
    feedUrl: "https://journals.lww.com/greenjournal/_layouts/oaks.journals/feed.aspx?FeedType=CurrentIssue",
    siteUrl: "https://journals.lww.com/greenjournal",
    publisher: "Wolters Kluwer / ACOG",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics & Gynecology",
    issn: "0029-7844",
  },
  {
    title: "The Lancet — Obstetrics, Gynaecology & Women's Health",
    feedUrl: "https://www.thelancet.com/rssfeed/lancet_obsgyn.xml",
    siteUrl: "https://www.thelancet.com",
    publisher: "Elsevier",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics & Gynecology",
  },
  {
    title: "BJOG",
    feedUrl: "https://onlinelibrary.wiley.com/action/showFeed?jc=14710528&type=etoc&feed=rss",
    siteUrl: "https://onlinelibrary.wiley.com/journal/14710528",
    publisher: "Wiley / RCOG",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics & Gynecology",
    issn: "1470-0328",
  },

  // ═══════════════════════════════════════════════════════════════════
  // EMERGENCY MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Annals of Emergency Medicine",
    feedUrl: "https://www.annemergmed.com/action/showFeed?type=etoc&feed=rss&jc=ymem",
    siteUrl: "https://www.annemergmed.com",
    publisher: "ACEP / Elsevier",
    category: "Emergency Medicine",
    specialty: "Emergency Medicine",
    issn: "0196-0644",
  },
  {
    title: "Emergency Medicine Journal",
    feedUrl: "https://emj.bmj.com/rss/recent.xml",
    siteUrl: "https://emj.bmj.com",
    publisher: "BMJ Publishing Group",
    category: "Emergency Medicine",
    specialty: "Emergency Medicine",
    issn: "1472-0205",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANESTHESIOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Anesthesiology",
    feedUrl: "https://pubs.asahq.org/anesthesiology/pages/rss",
    siteUrl: "https://pubs.asahq.org/anesthesiology",
    publisher: "ASA / Wolters Kluwer",
    category: "Anesthesiology",
    specialty: "Anesthesiology",
    issn: "0003-3022",
  },
  {
    title: "British Journal of Anaesthesia",
    feedUrl: "https://academic.oup.com/rss/site_5290/3166.xml",
    siteUrl: "https://academic.oup.com/bja",
    publisher: "Oxford University Press",
    category: "Anesthesiology",
    specialty: "Anesthesiology",
    issn: "0007-0912",
  },

  // ═══════════════════════════════════════════════════════════════════
  // INFECTIOUS DISEASE / MICROBIOLOGY / PATHOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Lancet Infectious Diseases",
    feedUrl: "https://www.thelancet.com/rssfeed/laninf_current.xml",
    siteUrl: "https://www.thelancet.com/journals/laninf",
    publisher: "Elsevier",
    category: "Infectious Disease",
    specialty: "Microbiology",
    issn: "1473-3099",
  },
  {
    title: "Clinical Infectious Diseases",
    feedUrl: "https://academic.oup.com/rss/site_5176/3091.xml",
    siteUrl: "https://academic.oup.com/cid",
    publisher: "Oxford University Press / IDSA",
    category: "Infectious Disease",
    specialty: "Microbiology",
    issn: "1058-4838",
  },
  {
    title: "Nature Microbiology",
    feedUrl: "https://www.nature.com/nmicrobiol.rss",
    siteUrl: "https://www.nature.com/nmicrobiol",
    publisher: "Springer Nature",
    category: "Microbiology",
    specialty: "Microbiology",
    issn: "2058-5276",
  },
  {
    title: "American Journal of Clinical Pathology",
    feedUrl: "https://academic.oup.com/rss/site_5188/3097.xml",
    siteUrl: "https://academic.oup.com/ajcp",
    publisher: "Oxford University Press",
    category: "Pathology",
    specialty: "Pathology",
    issn: "0002-9173",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PHARMACOLOGY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Clinical Pharmacology & Therapeutics",
    feedUrl: "https://ascpt.onlinelibrary.wiley.com/action/showFeed?jc=15326535&type=etoc&feed=rss",
    siteUrl: "https://ascpt.onlinelibrary.wiley.com/journal/15326535",
    publisher: "Wiley / ASCPT",
    category: "Pharmacology",
    specialty: "Pharmacology",
    issn: "0009-9236",
  },
  {
    title: "Nature Reviews Drug Discovery",
    feedUrl: "https://www.nature.com/nrd.rss",
    siteUrl: "https://www.nature.com/nrd",
    publisher: "Springer Nature",
    category: "Pharmacology",
    specialty: "Pharmacology",
    issn: "1474-1776",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PUBLIC HEALTH / COMMUNITY MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Lancet Public Health",
    feedUrl: "https://www.thelancet.com/rssfeed/lanpub_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanpub",
    publisher: "Elsevier",
    category: "Public Health",
    specialty: "Community Medicine",
    issn: "2468-2667",
  },
  {
    title: "The Lancet Global Health",
    feedUrl: "https://www.thelancet.com/rssfeed/langlo_current.xml",
    siteUrl: "https://www.thelancet.com/journals/langlo",
    publisher: "Elsevier",
    category: "Public Health",
    specialty: "Community Medicine",
    issn: "2214-109X",
  },
  {
    title: "American Journal of Public Health",
    feedUrl: "https://ajph.aphapublications.org/action/showFeed?type=etoc&feed=rss&jc=ajph",
    siteUrl: "https://ajph.aphapublications.org",
    publisher: "APHA",
    category: "Public Health",
    specialty: "Community Medicine",
    issn: "0090-0036",
  },

  // ═══════════════════════════════════════════════════════════════════
  // BASIC SCIENCES (Anatomy, Physiology, Biochemistry)
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Nature",
    feedUrl: "https://www.nature.com/nature.rss",
    siteUrl: "https://www.nature.com/nature",
    publisher: "Springer Nature",
    category: "General Science",
    specialty: "Other",
    issn: "0028-0836",
    description: "International journal of science publishing peer-reviewed research across all fields.",
  },
  {
    title: "Science",
    feedUrl: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
    siteUrl: "https://www.science.org/journal/science",
    publisher: "AAAS",
    category: "General Science",
    specialty: "Other",
    issn: "0036-8075",
  },
  {
    title: "Cell",
    feedUrl: "https://www.cell.com/cell/rss",
    siteUrl: "https://www.cell.com/cell/home",
    publisher: "Cell Press / Elsevier",
    category: "Cell Biology",
    specialty: "Biochemistry",
    issn: "0092-8674",
  },
  {
    title: "Nature Cell Biology",
    feedUrl: "https://www.nature.com/ncb.rss",
    siteUrl: "https://www.nature.com/ncb",
    publisher: "Springer Nature",
    category: "Cell Biology",
    specialty: "Biochemistry",
    issn: "1465-7392",
  },
  {
    title: "Physiological Reviews",
    feedUrl: "https://journals.physiology.org/action/showFeed?type=etoc&feed=rss&jc=physrev",
    siteUrl: "https://journals.physiology.org/journal/physrev",
    publisher: "American Physiological Society",
    category: "Physiology",
    specialty: "Physiology",
    issn: "0031-9333",
  },
  {
    title: "Journal of Anatomy",
    feedUrl: "https://onlinelibrary.wiley.com/action/showFeed?jc=14697580&type=etoc&feed=rss",
    siteUrl: "https://onlinelibrary.wiley.com/journal/14697580",
    publisher: "Wiley",
    category: "Anatomy",
    specialty: "Anatomy",
    issn: "0021-8782",
  },

  // ═══════════════════════════════════════════════════════════════════
  // RESEARCH METHODS / EVIDENCE-BASED MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Cochrane Database of Systematic Reviews",
    feedUrl: "https://www.cochranelibrary.com/rss/content/feed?topic=&contentLanguage=&searchBy=&orderBy=publishedDate&feed=rss",
    siteUrl: "https://www.cochranelibrary.com",
    publisher: "Cochrane",
    category: "Evidence-Based Medicine",
    specialty: "Other",
    issn: "1469-493X",
  },
  {
    title: "Systematic Reviews",
    feedUrl: "https://systematicreviewsjournal.biomedcentral.com/articles/most-recent/rss.xml",
    siteUrl: "https://systematicreviewsjournal.biomedcentral.com",
    publisher: "BioMed Central / Springer Nature",
    category: "Research Methods",
    specialty: "Other",
    issn: "2046-4053",
  },
  {
    title: "Trials",
    feedUrl: "https://trialsjournal.biomedcentral.com/articles/most-recent/rss.xml",
    siteUrl: "https://trialsjournal.biomedcentral.com",
    publisher: "BioMed Central / Springer Nature",
    category: "Research Methods",
    specialty: "Other",
    issn: "1745-6215",
  },

  // ═══════════════════════════════════════════════════════════════════
  // NEPHROLOGY / ENDOCRINOLOGY / PULMONOLOGY (cross-specialty)
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "The Lancet Diabetes & Endocrinology",
    feedUrl: "https://www.thelancet.com/rssfeed/landia_current.xml",
    siteUrl: "https://www.thelancet.com/journals/landia",
    publisher: "Elsevier",
    category: "Endocrinology",
    specialty: "Internal Medicine",
    issn: "2213-8587",
  },
  {
    title: "Kidney International",
    feedUrl: "https://www.kidney-international.org/action/showFeed?type=etoc&feed=rss&jc=kint",
    siteUrl: "https://www.kidney-international.org",
    publisher: "Elsevier / ISN",
    category: "Nephrology",
    specialty: "Internal Medicine",
    issn: "0085-2538",
  },
  {
    title: "The Lancet Respiratory Medicine",
    feedUrl: "https://www.thelancet.com/rssfeed/lanres_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanres",
    publisher: "Elsevier",
    category: "Pulmonology",
    specialty: "Internal Medicine",
    issn: "2213-2600",
  },
  {
    title: "The Lancet Gastroenterology & Hepatology",
    feedUrl: "https://www.thelancet.com/rssfeed/langas_current.xml",
    siteUrl: "https://www.thelancet.com/journals/langas",
    publisher: "Elsevier",
    category: "Gastroenterology",
    specialty: "Internal Medicine",
    issn: "2468-1253",
  },
  {
    title: "The Lancet Rheumatology",
    feedUrl: "https://www.thelancet.com/rssfeed/lanrhe_current.xml",
    siteUrl: "https://www.thelancet.com/journals/lanrhe",
    publisher: "Elsevier",
    category: "Rheumatology",
    specialty: "Internal Medicine",
    issn: "2665-9913",
  },

  // ═══════════════════════════════════════════════════════════════════
  // FORENSIC MEDICINE
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "Forensic Science International",
    feedUrl: "https://rss.sciencedirect.com/publication/science/03790738",
    siteUrl: "https://www.sciencedirect.com/journal/forensic-science-international",
    publisher: "Elsevier",
    category: "Forensic Medicine",
    specialty: "Forensic Medicine",
    issn: "0379-0738",
  },

  // ═══════════════════════════════════════════════════════════════════
  // OPEN ACCESS / MULTIDISCIPLINARY
  // ═══════════════════════════════════════════════════════════════════

  {
    title: "BMC Medicine",
    feedUrl: "https://bmcmedicine.biomedcentral.com/articles/most-recent/rss.xml",
    siteUrl: "https://bmcmedicine.biomedcentral.com",
    publisher: "BioMed Central / Springer Nature",
    category: "General Medicine",
    specialty: "Other",
    issn: "1741-7015",
  },
  {
    title: "Scientific Reports — Health Sciences",
    feedUrl: "https://www.nature.com/subjects/health-sciences.rss",
    siteUrl: "https://www.nature.com/srep",
    publisher: "Springer Nature",
    category: "General Science",
    specialty: "Other",
    issn: "2045-2322",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// Category list derived from the data
// ═══════════════════════════════════════════════════════════════════════

export const FEED_CATEGORIES = [
  ...new Set(JOURNAL_FEEDS.map((f) => f.category)),
].sort();

// ═══════════════════════════════════════════════════════════════════════
// Specialty list derived from the data
// ═══════════════════════════════════════════════════════════════════════

export const FEED_SPECIALTIES = [
  ...new Set(JOURNAL_FEEDS.map((f) => f.specialty)),
].sort();
