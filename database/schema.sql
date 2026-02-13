-- ============================================================================
-- SCHOLARSYNC - DEFINITIVE DATABASE SCHEMA v3.0 (FINAL)
-- ============================================================================
-- This file is the SINGLE SOURCE OF TRUTH for the entire database.
-- Merges: research_mentor_v2.sql (22 tables) + build prompt v2 (36 tables) + 71-table inventory
-- TOTAL: 71 tables. Run against Cloud SQL PostgreSQL as-is. DO NOT modify.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- V1 CORE — 22 TABLES
-- ============================================================

-- 1. users (id = Clerk TEXT, not SERIAL)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  degree_level TEXT CHECK(degree_level IN ('undergraduate','postgraduate','phd','postdoc','faculty')),
  specialty TEXT,
  country TEXT DEFAULT 'India',
  bio TEXT,
  research_interests JSONB DEFAULT '[]',
  plan TEXT DEFAULT 'free' CHECK(plan IN ('free','basic','pro','institutional')),
  subscription_id INTEGER,
  tokens_used_this_month INTEGER DEFAULT 0,
  tokens_limit INTEGER DEFAULT 10000,
  tokens_used_total BIGINT DEFAULT 0,
  searches_used_this_month INTEGER DEFAULT 0,
  plagiarism_checks_used INTEGER DEFAULT 0,
  exports_used_this_month INTEGER DEFAULT 0,
  deep_research_used INTEGER DEFAULT 0,
  usage_reset_date TIMESTAMP,
  preferred_language TEXT DEFAULT 'en',
  orcid_id TEXT,
  institution_id INTEGER,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 2. projects
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  research_question TEXT,
  project_type TEXT CHECK(project_type IN ('thesis','review_article','original_article','case_report','case_series','meta_analysis','systematic_review','literature_review','book_chapter','dissertation','letter','editorial','short_communication')),
  study_type TEXT,
  field TEXT,
  template_id INTEGER,
  target_journal TEXT,
  citation_style TEXT DEFAULT 'vancouver',
  target_word_count INTEGER,
  deadline DATE,
  status TEXT DEFAULT 'drafting' CHECK(status IN ('planning','drafting','reviewing','completed','archived')),
  modes_used JSONB DEFAULT '[]',
  is_public BOOLEAN DEFAULT FALSE,
  supervisor_id TEXT,
  institution_id INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 3. papers
CREATE TABLE papers (
  id SERIAL PRIMARY KEY,
  pubmed_id TEXT UNIQUE,
  doi TEXT UNIQUE,
  semantic_scholar_id TEXT,
  arxiv_id TEXT,
  openalex_id TEXT,
  title TEXT NOT NULL,
  authors JSONB,
  abstract TEXT,
  journal TEXT,
  publication_date DATE,
  year INTEGER,
  volume TEXT,
  issue TEXT,
  pages TEXT,
  study_type TEXT,
  citation_count INTEGER DEFAULT 0,
  source TEXT NOT NULL CHECK(source IN ('pubmed','semantic_scholar','openalex','arxiv','user_upload','snowball','deep_research')),
  full_text_available BOOLEAN DEFAULT FALSE,
  pdf_url TEXT,
  pdf_storage_path TEXT,
  full_text_plain TEXT,
  is_chunked BOOLEAN DEFAULT FALSE,
  is_extracted BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'en',
  tldr TEXT,
  retracted BOOLEAN DEFAULT FALSE,
  open_access BOOLEAN,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_papers_fulltext ON papers USING gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(abstract,'')));

-- 4. project_papers
CREATE TABLE project_papers (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  relevance_score REAL,
  user_rating INTEGER CHECK(user_rating BETWEEN 1 AND 5),
  user_notes TEXT,
  tags JSONB DEFAULT '[]',
  status TEXT DEFAULT 'saved' CHECK(status IN ('saved','reading','approved','cited','excluded')),
  added_by TEXT DEFAULT 'search' CHECK(added_by IN ('user','search','snowball','deep_research','ai_suggestion')),
  is_approved BOOLEAN DEFAULT TRUE,
  screening_decision TEXT CHECK(screening_decision IN ('include','exclude','maybe')),
  screening_reason TEXT,
  full_text_reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, paper_id)
);

-- 5. paper_chunks (RAG foundation)
CREATE TABLE paper_chunks (
  id SERIAL PRIMARY KEY,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  text TEXT NOT NULL,
  section_type TEXT CHECK(section_type IN ('title','abstract','introduction','methods','results','discussion','conclusion','references','other')),
  page_number INTEGER,
  embedding vector(1536),
  highlight_priority REAL DEFAULT 0.0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_paper_chunks_embedding ON paper_chunks USING hnsw (embedding vector_cosine_ops);

-- 6. search_queries
CREATE TABLE search_queries (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  original_query TEXT NOT NULL,
  query_type TEXT DEFAULT 'user' CHECK(query_type IN ('user','agent_generated','agent_augmented','snowball','deep_research')),
  source TEXT CHECK(source IN ('pubmed','semantic_scholar','openalex','arxiv','all','internal')),
  augmented_queries JSONB,
  filters_applied JSONB,
  result_count INTEGER,
  parent_query_id INTEGER REFERENCES search_queries(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. paper_extractions (PICO + structured data)
CREATE TABLE paper_extractions (
  id SERIAL PRIMARY KEY,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  population TEXT,
  intervention TEXT,
  comparison TEXT,
  outcome TEXT,
  sample_size INTEGER,
  study_design TEXT,
  effect_size TEXT,
  p_value TEXT,
  confidence_interval TEXT,
  risk_of_bias TEXT,
  evidence_level TEXT,
  custom_extractions JSONB DEFAULT '{}',
  extraction_model TEXT,
  confidence_score REAL,
  human_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. synthesis_documents
CREATE TABLE synthesis_documents (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  document_type TEXT DEFAULT 'original_article' CHECK(document_type IN ('original_article','review_article','systematic_review','state_of_art_review','thesis_chapter','literature_review','meta_analysis','case_report','case_series','letter','editorial','short_communication','book_chapter')),
  citation_style TEXT DEFAULT 'vancouver',
  target_journal TEXT,
  word_limit INTEGER,
  template_id INTEGER,
  language TEXT DEFAULT 'en',
  overall_status TEXT DEFAULT 'drafting' CHECK(overall_status IN ('outlining','drafting','revising','final','submitted')),
  submission_status TEXT,
  last_export_at TIMESTAMP,
  latex_export_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 9. synthesis_sections
CREATE TABLE synthesis_sections (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES synthesis_documents(id) ON DELETE CASCADE,
  section_type TEXT CHECK(section_type IN ('title_page','abstract','introduction','literature_review','methodology','results','discussion','conclusion','references','appendix','acknowledgments','custom')),
  title TEXT,
  sort_order INTEGER,
  editor_content JSONB,
  plain_text_content TEXT,
  word_count INTEGER DEFAULT 0,
  target_word_count INTEGER,
  status TEXT DEFAULT 'outline' CHECK(status IN ('outline','draft','revision','approved','final')),
  ai_draft TEXT,
  human_edits TEXT,
  readability_score REAL,
  ai_tone_score REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. synthesis_citations
CREATE TABLE synthesis_citations (
  id SERIAL PRIMARY KEY,
  section_id INTEGER NOT NULL REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  citation_key TEXT,
  page_reference TEXT,
  claim_text TEXT,
  paragraph_index INTEGER,
  position_in_section INTEGER,
  formatted JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(section_id, paper_id, paragraph_index)
);

-- 11. synthesis_versions
CREATE TABLE synthesis_versions (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES synthesis_documents(id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  version_name TEXT,
  content_snapshot JSONB NOT NULL,
  change_summary TEXT,
  auto_saved BOOLEAN DEFAULT TRUE,
  saved_by TEXT DEFAULT 'user' CHECK(saved_by IN ('user','agent','auto')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. conversations
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK(mode IN ('chat','learn','draft','research','notebook','statistics','integrity','general')),
  title TEXT,
  paper_ids JSONB DEFAULT '[]',
  dataset_id INTEGER,
  is_archived BOOLEAN DEFAULT FALSE,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK(role IN ('user','assistant','system','tool')),
  content TEXT NOT NULL,
  tool_calls JSONB,
  tool_results JSONB,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cached_tokens INTEGER DEFAULT 0,
  tokens_used INTEGER,
  cost_usd REAL,
  model TEXT,
  retrieved_chunks JSONB,
  feedback_rating INTEGER CHECK(feedback_rating BETWEEN 1 AND 5),
  feedback_comment TEXT,
  flagged_inaccurate BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. project_context_cache
CREATE TABLE project_context_cache (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  cache_type TEXT,
  system_prompt TEXT,
  project_summary TEXT,
  paper_summaries TEXT,
  methodology_context TEXT,
  mode_context JSONB,
  compiled_content TEXT,
  token_count INTEGER,
  needs_recompile BOOLEAN DEFAULT TRUE,
  last_compiled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. citation_graph
CREATE TABLE citation_graph (
  id SERIAL PRIMARY KEY,
  citing_paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  cited_paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  discovered_via TEXT CHECK(discovered_via IN ('forward_snowball','backward_snowball','semantic_scholar','openalex','pubmed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(citing_paper_id, cited_paper_id)
);

-- 16. snowball_sessions
CREATE TABLE snowball_sessions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  seed_paper_id INTEGER NOT NULL REFERENCES papers(id),
  direction TEXT CHECK(direction IN ('forward','backward','both')),
  depth INTEGER DEFAULT 1,
  papers_found INTEGER DEFAULT 0,
  status TEXT DEFAULT 'running' CHECK(status IN ('running','completed','failed')),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- 17. slide_decks
CREATE TABLE slide_decks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  document_id INTEGER REFERENCES synthesis_documents(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  theme TEXT DEFAULT 'modern',
  total_slides INTEGER DEFAULT 0,
  source_type TEXT CHECK(source_type IN ('synthesis','papers','custom')),
  source_paper_ids JSONB DEFAULT '[]',
  export_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 18. slides
CREATE TABLE slides (
  id SERIAL PRIMARY KEY,
  deck_id INTEGER NOT NULL REFERENCES slide_decks(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL,
  layout TEXT DEFAULT 'title_content',
  title TEXT,
  content JSONB,
  speaker_notes TEXT,
  source_section_id INTEGER REFERENCES synthesis_sections(id) ON DELETE SET NULL,
  source_citations JSONB DEFAULT '[]',
  has_chart BOOLEAN DEFAULT FALSE,
  has_table BOOLEAN DEFAULT FALSE,
  has_image BOOLEAN DEFAULT FALSE,
  visual_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 19. deep_research_sessions
CREATE TABLE deep_research_sessions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  original_query TEXT NOT NULL,
  decomposed_queries JSONB,
  research_plan JSONB,
  status TEXT DEFAULT 'planning' CHECK(status IN ('planning','searching','reading','synthesizing','completed','failed')),
  total_steps INTEGER DEFAULT 0,
  completed_steps INTEGER DEFAULT 0,
  papers_found INTEGER DEFAULT 0,
  papers_read INTEGER DEFAULT 0,
  final_report TEXT,
  key_findings JSONB,
  gaps_identified JSONB,
  total_tokens_used BIGINT DEFAULT 0,
  total_cost_usd REAL DEFAULT 0.0,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- 20. deep_research_steps
CREATE TABLE deep_research_steps (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES deep_research_sessions(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  step_type TEXT CHECK(step_type IN ('query_decompose','search','filter','read_abstract','read_fulltext','extract','synthesize','gap_analysis')),
  input_data JSONB,
  output_data JSONB,
  tokens_used INTEGER,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','running','completed','failed')),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 21. datasets
CREATE TABLE datasets (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_type TEXT CHECK(file_type IN ('csv','xlsx','xls','sav','dta','json','tsv')),
  file_size_bytes BIGINT,
  detected_columns JSONB,
  row_count INTEGER,
  column_count INTEGER,
  missing_values JSONB,
  data_summary JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 22. statistical_analyses
CREATE TABLE statistical_analyses (
  id SERIAL PRIMARY KEY,
  dataset_id INTEGER NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL,
  variables JSONB NOT NULL,
  parameters JSONB,
  results JSONB,
  interpretation TEXT,
  generated_code TEXT,
  code_language TEXT DEFAULT 'python',
  results_table TEXT,
  results_figure TEXT,
  plots JSONB,
  status TEXT DEFAULT 'completed' CHECK(status IN ('running','completed','failed','needs_review')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- V1 EDITOR, WRITING & INTEGRITY — 14 TABLES
-- ============================================================

-- 23. integrity_checks
CREATE TABLE integrity_checks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  document_id INTEGER REFERENCES synthesis_documents(id) ON DELETE SET NULL,
  section_id INTEGER REFERENCES synthesis_sections(id) ON DELETE SET NULL,
  check_type TEXT CHECK(check_type IN ('plagiarism','ai_detection','both')),
  content_checked TEXT NOT NULL,
  word_count INTEGER,
  plagiarism_score REAL,
  plagiarism_matches JSONB,
  plagiarism_engine TEXT DEFAULT 'copyleaks',
  ai_score REAL,
  ai_detection_details JSONB,
  ai_detection_engine TEXT DEFAULT 'copyleaks',
  flagged_passages JSONB,
  source_matches JSONB,
  user_reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 24. writing_action_log
CREATE TABLE writing_action_log (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  original_text TEXT,
  modified_text TEXT,
  accepted BOOLEAN,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 25. writing_analysis_snapshots
CREATE TABLE writing_analysis_snapshots (
  id SERIAL PRIMARY KEY,
  section_id INTEGER NOT NULL REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  flesch_reading_ease REAL,
  flesch_kincaid_grade REAL,
  gunning_fog_index REAL,
  coleman_liau_index REAL,
  passive_voice_pct REAL,
  avg_sentence_length REAL,
  vocabulary_diversity REAL,
  academic_jargon_pct REAL,
  objectivity_score REAL,
  confidence_score REAL,
  formality_score REAL,
  word_count INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 26. document_changes
CREATE TABLE document_changes (
  id SERIAL PRIMARY KEY,
  section_id INTEGER NOT NULL REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  author_type TEXT CHECK(author_type IN ('user','ai','collaborator')),
  author_id TEXT,
  change_type TEXT CHECK(change_type IN ('insertion','deletion','replacement')),
  original_text TEXT,
  new_text TEXT,
  position_start INTEGER,
  position_end INTEGER,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

-- 27. templates
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  project_type TEXT,
  sections JSONB NOT NULL,
  is_system BOOLEAN DEFAULT TRUE,
  created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 28. template_sections
CREATE TABLE template_sections (
  id SERIAL PRIMARY KEY,
  template_id INTEGER NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  title TEXT NOT NULL,
  sort_order INTEGER,
  suggested_word_count INTEGER,
  guidance TEXT,
  example_content TEXT,
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 29. user_references
CREATE TABLE user_references (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paper_id INTEGER REFERENCES papers(id) ON DELETE SET NULL,
  collection TEXT DEFAULT 'All Papers',
  is_favorite BOOLEAN DEFAULT FALSE,
  tags JSONB DEFAULT '[]',
  notes TEXT,
  manual_citation_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- 30. document_comments
CREATE TABLE document_comments (
  id SERIAL PRIMARY KEY,
  section_id INTEGER NOT NULL REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  author_type TEXT CHECK(author_type IN ('user','ai','collaborator')),
  text_range_start INTEGER,
  text_range_end INTEGER,
  content TEXT NOT NULL,
  parent_comment_id INTEGER REFERENCES document_comments(id) ON DELETE CASCADE,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 31. document_shares
CREATE TABLE document_shares (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES synthesis_documents(id) ON DELETE CASCADE,
  shared_with_email TEXT,
  shared_with_user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  permission TEXT CHECK(permission IN ('view','comment','edit')),
  share_token TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 32. activity_log
CREATE TABLE activity_log (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 33. discipline_profiles
CREATE TABLE discipline_profiles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  system_prompt_additions TEXT,
  key_journals JSONB,
  key_guidelines JSONB,
  terminology JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 34. export_templates
CREATE TABLE export_templates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  journal_name TEXT,
  formatting_rules JSONB,
  citation_style TEXT,
  word_limits JSONB,
  section_requirements JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 35. learning_modules
CREATE TABLE learning_modules (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  difficulty TEXT CHECK(difficulty IN ('beginner','intermediate','advanced')),
  content TEXT,
  prerequisites JSONB DEFAULT '[]',
  estimated_minutes INTEGER,
  trigger_mode TEXT,
  trigger_action TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 36. user_learning_progress
CREATE TABLE user_learning_progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL REFERENCES learning_modules(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK(status IN ('not_started','in_progress','completed')),
  score REAL,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  UNIQUE(user_id, module_id)
);

-- ============================================================
-- V1 BILLING & TRACKING — 5 TABLES
-- ============================================================

-- 37. usage_events
CREATE TABLE usage_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  tokens_used INTEGER,
  cost_usd REAL,
  model TEXT,
  project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 38. subscriptions
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT CHECK(plan IN ('free','basic','pro','institutional')),
  razorpay_subscription_id TEXT,
  razorpay_customer_id TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active','cancelled','past_due','trialing')),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 39. feedback
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_id INTEGER REFERENCES messages(id) ON DELETE SET NULL,
  feature TEXT,
  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 40. prompt_versions
CREATE TABLE prompt_versions (
  id SERIAL PRIMARY KEY,
  prompt_name TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  system_prompt TEXT NOT NULL,
  description TEXT,
  avg_feedback_rating REAL,
  total_uses INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(prompt_name, version_number)
);

-- 41. pdf_annotations
CREATE TABLE pdf_annotations (
  id SERIAL PRIMARY KEY,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  page_number INTEGER,
  highlight_text TEXT,
  note TEXT,
  color TEXT DEFAULT 'yellow' CHECK(color IN ('yellow','green','red','blue','purple')),
  position JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- V2 SYSTEMATIC REVIEW & COMPARISON — 11 TABLES
-- ============================================================

-- 42. screening_criteria
CREATE TABLE screening_criteria (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  criterion_type TEXT CHECK(criterion_type IN ('inclusion','exclusion')),
  description TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 43. screening_decisions
CREATE TABLE screening_decisions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  stage TEXT CHECK(stage IN ('title_abstract','full_text')),
  decision TEXT CHECK(decision IN ('include','exclude','maybe')),
  reason TEXT,
  decided_by TEXT CHECK(decided_by IN ('user','ai','collaborator')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, paper_id, stage)
);

-- 44. prisma_flow
CREATE TABLE prisma_flow (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  source TEXT,
  record_count INTEGER DEFAULT 0,
  excluded_count INTEGER DEFAULT 0,
  exclusion_reasons JSONB,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 45. risk_of_bias
CREATE TABLE risk_of_bias (
  id SERIAL PRIMARY KEY,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  judgment TEXT CHECK(judgment IN ('low','some_concerns','high')),
  support_text TEXT,
  assessed_by TEXT CHECK(assessed_by IN ('user','ai')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(paper_id, project_id, domain)
);

-- 46. meta_analysis_results
CREATE TABLE meta_analysis_results (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  analysis_name TEXT,
  outcome_measure TEXT,
  effect_model TEXT CHECK(effect_model IN ('fixed','random')),
  pooled_effect REAL,
  pooled_ci_lower REAL,
  pooled_ci_upper REAL,
  heterogeneity_i2 REAL,
  heterogeneity_p REAL,
  study_data JSONB,
  forest_plot_path TEXT,
  funnel_plot_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 47. comparison_matrices
CREATE TABLE comparison_matrices (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 48. matrix_columns
CREATE TABLE matrix_columns (
  id SERIAL PRIMARY KEY,
  matrix_id INTEGER NOT NULL REFERENCES comparison_matrices(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER,
  column_type TEXT DEFAULT 'text' CHECK(column_type IN ('text','number','boolean','select')),
  options JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 49. matrix_cells
CREATE TABLE matrix_cells (
  id SERIAL PRIMARY KEY,
  matrix_id INTEGER NOT NULL REFERENCES comparison_matrices(id) ON DELETE CASCADE,
  column_id INTEGER NOT NULL REFERENCES matrix_columns(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  value TEXT,
  source TEXT CHECK(source IN ('manual','ai_extracted','auto')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(matrix_id, column_id, paper_id)
);

-- 50. project_milestones
CREATE TABLE project_milestones (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  sort_order INTEGER,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','in_progress','completed','overdue')),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 51. milestone_progress
CREATE TABLE milestone_progress (
  id SERIAL PRIMARY KEY,
  milestone_id INTEGER NOT NULL REFERENCES project_milestones(id) ON DELETE CASCADE,
  progress_pct INTEGER DEFAULT 0 CHECK(progress_pct BETWEEN 0 AND 100),
  notes TEXT,
  updated_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 52. usage_quotas
CREATE TABLE usage_quotas (
  id SERIAL PRIMARY KEY,
  plan TEXT NOT NULL UNIQUE CHECK(plan IN ('free','basic','pro','institutional')),
  ai_tokens_monthly INTEGER NOT NULL,
  paper_searches_monthly INTEGER,
  plagiarism_checks_monthly INTEGER,
  exports_monthly INTEGER,
  deep_research_monthly INTEGER,
  max_projects INTEGER,
  max_papers_per_project INTEGER,
  max_file_upload_mb INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- V2 INSTITUTIONAL — 3 TABLES
-- ============================================================

-- 53. institutions
CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  country TEXT,
  institution_type TEXT CHECK(institution_type IN ('university','medical_college','research_institute','hospital')),
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 54. institution_memberships
CREATE TABLE institution_memberships (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution_id INTEGER NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  role TEXT CHECK(role IN ('student','supervisor','admin','faculty')),
  department TEXT,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, institution_id)
);

-- 55. supervisor_assignments
CREATE TABLE supervisor_assignments (
  id SERIAL PRIMARY KEY,
  supervisor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, project_id)
);

-- ============================================================
-- V3+ PLATFORM — 16 TABLES
-- ============================================================

-- 56. marketplace_items
CREATE TABLE marketplace_items (
  id SERIAL PRIMARY KEY,
  creator_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_type TEXT CHECK(item_type IN ('template','workflow','style_guide')),
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  avg_rating REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 57. marketplace_reviews
CREATE TABLE marketplace_reviews (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL REFERENCES marketplace_items(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(item_id, user_id)
);

-- 58. journal_profiles
CREATE TABLE journal_profiles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  publisher TEXT,
  impact_factor REAL,
  word_limits JSONB,
  citation_style TEXT,
  section_requirements JSONB,
  submission_url TEXT,
  guidelines_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 59. submissions
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES synthesis_documents(id) ON DELETE CASCADE,
  journal_id INTEGER REFERENCES journal_profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'preparing' CHECK(status IN ('preparing','submitted','under_review','revision_requested','accepted','rejected','withdrawn')),
  submitted_at TIMESTAMP,
  response_at TIMESTAMP,
  cover_letter TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 60. submission_checks
CREATE TABLE submission_checks (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  check_type TEXT,
  passed BOOLEAN,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 61. review_simulations
CREATE TABLE review_simulations (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES synthesis_documents(id) ON DELETE CASCADE,
  reviewer_persona TEXT,
  overall_recommendation TEXT CHECK(overall_recommendation IN ('accept','minor_revision','major_revision','reject')),
  summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 62. simulated_comments
CREATE TABLE simulated_comments (
  id SERIAL PRIMARY KEY,
  simulation_id INTEGER NOT NULL REFERENCES review_simulations(id) ON DELETE CASCADE,
  section_type TEXT,
  severity TEXT CHECK(severity IN ('critical','major','minor','suggestion')),
  category TEXT,
  comment_text TEXT NOT NULL,
  user_addressed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 63. user_profiles_public
CREATE TABLE user_profiles_public (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  headline TEXT,
  profile_url_slug TEXT UNIQUE,
  education JSONB,
  research_areas JSONB,
  is_visible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 64. publications
CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  doi TEXT,
  journal TEXT,
  year INTEGER,
  citation_count INTEGER DEFAULT 0,
  paper_id INTEGER REFERENCES papers(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 65. orcid_links
CREATE TABLE orcid_links (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  orcid_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 66. audio_summaries
CREATE TABLE audio_summaries (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  document_id INTEGER REFERENCES synthesis_documents(id) ON DELETE SET NULL,
  title TEXT,
  storage_path TEXT,
  duration_seconds INTEGER,
  status TEXT DEFAULT 'generating' CHECK(status IN ('generating','completed','failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 67. audio_scripts
CREATE TABLE audio_scripts (
  id SERIAL PRIMARY KEY,
  summary_id INTEGER NOT NULL REFERENCES audio_summaries(id) ON DELETE CASCADE,
  script_text TEXT NOT NULL,
  speaker_assignments JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 68. knowledge_notes
CREATE TABLE knowledge_notes (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  tags JSONB DEFAULT '[]',
  paper_id INTEGER REFERENCES papers(id) ON DELETE SET NULL,
  project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 69. knowledge_links
CREATE TABLE knowledge_links (
  id SERIAL PRIMARY KEY,
  source_type TEXT CHECK(source_type IN ('note','paper','project')),
  source_id INTEGER NOT NULL,
  target_type TEXT CHECK(target_type IN ('note','paper','project')),
  target_id INTEGER NOT NULL,
  link_type TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(source_type, source_id, target_type, target_id)
);

-- 70. integrations
CREATE TABLE integrations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMP,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, provider)
);

-- 71. sync_log
CREATE TABLE sync_log (
  id SERIAL PRIMARY KEY,
  integration_id INTEGER NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
  direction TEXT CHECK(direction IN ('import','export','bidirectional')),
  status TEXT CHECK(status IN ('running','completed','failed')),
  records_synced INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- ============================================================
-- ALL INDEXES
-- ============================================================

CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_deleted ON projects(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_papers_project ON project_papers(project_id);
CREATE INDEX idx_project_papers_paper ON project_papers(paper_id);
CREATE INDEX idx_project_papers_status ON project_papers(status);
CREATE INDEX idx_papers_pubmed ON papers(pubmed_id) WHERE pubmed_id IS NOT NULL;
CREATE INDEX idx_papers_doi ON papers(doi) WHERE doi IS NOT NULL;
CREATE INDEX idx_papers_semantic ON papers(semantic_scholar_id) WHERE semantic_scholar_id IS NOT NULL;
CREATE INDEX idx_papers_arxiv ON papers(arxiv_id) WHERE arxiv_id IS NOT NULL;
CREATE INDEX idx_papers_openalex ON papers(openalex_id) WHERE openalex_id IS NOT NULL;
CREATE INDEX idx_papers_source ON papers(source);
CREATE INDEX idx_papers_title_trgm ON papers USING gin (title gin_trgm_ops);
CREATE INDEX idx_paper_chunks_paper ON paper_chunks(paper_id);
CREATE INDEX idx_paper_chunks_section ON paper_chunks(section_type);
CREATE INDEX idx_search_queries_project ON search_queries(project_id);
CREATE INDEX idx_search_queries_user ON search_queries(user_id);
CREATE INDEX idx_paper_extractions_paper ON paper_extractions(paper_id);
CREATE INDEX idx_paper_extractions_project ON paper_extractions(project_id);
CREATE INDEX idx_synthesis_docs_project ON synthesis_documents(project_id);
CREATE INDEX idx_synthesis_sections_doc ON synthesis_sections(document_id);
CREATE INDEX idx_synthesis_citations_section ON synthesis_citations(section_id);
CREATE INDEX idx_synthesis_citations_paper ON synthesis_citations(paper_id);
CREATE INDEX idx_synthesis_versions_doc ON synthesis_versions(document_id);
CREATE INDEX idx_conversations_project ON conversations(project_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_mode ON conversations(mode);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_citation_graph_citing ON citation_graph(citing_paper_id);
CREATE INDEX idx_citation_graph_cited ON citation_graph(cited_paper_id);
CREATE INDEX idx_deep_research_project ON deep_research_sessions(project_id);
CREATE INDEX idx_deep_research_user ON deep_research_sessions(user_id);
CREATE INDEX idx_deep_research_steps_sess ON deep_research_steps(session_id);
CREATE INDEX idx_slide_decks_project ON slide_decks(project_id);
CREATE INDEX idx_slides_deck ON slides(deck_id);
CREATE INDEX idx_datasets_project ON datasets(project_id);
CREATE INDEX idx_datasets_user ON datasets(user_id);
CREATE INDEX idx_analyses_dataset ON statistical_analyses(dataset_id);
CREATE INDEX idx_analyses_project ON statistical_analyses(project_id);
CREATE INDEX idx_integrity_project ON integrity_checks(project_id);
CREATE INDEX idx_integrity_document ON integrity_checks(document_id);
CREATE INDEX idx_writing_actions_section ON writing_action_log(section_id);
CREATE INDEX idx_writing_actions_user ON writing_action_log(user_id);
CREATE INDEX idx_writing_snapshots_section ON writing_analysis_snapshots(section_id);
CREATE INDEX idx_doc_changes_section ON document_changes(section_id);
CREATE INDEX idx_user_refs_user ON user_references(user_id);
CREATE INDEX idx_user_refs_paper ON user_references(paper_id);
CREATE INDEX idx_pdf_annotations_paper ON pdf_annotations(paper_id);
CREATE INDEX idx_pdf_annotations_user ON pdf_annotations(user_id);
CREATE INDEX idx_doc_comments_section ON document_comments(section_id);
CREATE INDEX idx_doc_shares_document ON document_shares(document_id);
CREATE INDEX idx_activity_log_user ON activity_log(user_id);
CREATE INDEX idx_activity_log_project ON activity_log(project_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at);
CREATE INDEX idx_usage_events_user ON usage_events(user_id);
CREATE INDEX idx_usage_events_created ON usage_events(created_at);
CREATE INDEX idx_inst_memberships_user ON institution_memberships(user_id);
CREATE INDEX idx_inst_memberships_inst ON institution_memberships(institution_id);
CREATE INDEX idx_supervisor_assign_super ON supervisor_assignments(supervisor_id);
CREATE INDEX idx_supervisor_assign_student ON supervisor_assignments(student_id);
CREATE INDEX idx_screening_criteria_proj ON screening_criteria(project_id);
CREATE INDEX idx_screening_decisions_proj ON screening_decisions(project_id);
CREATE INDEX idx_screening_decisions_paper ON screening_decisions(paper_id);
CREATE INDEX idx_prisma_flow_project ON prisma_flow(project_id);
CREATE INDEX idx_risk_of_bias_paper ON risk_of_bias(paper_id);
CREATE INDEX idx_risk_of_bias_project ON risk_of_bias(project_id);
CREATE INDEX idx_meta_analysis_project ON meta_analysis_results(project_id);
CREATE INDEX idx_matrix_columns_matrix ON matrix_columns(matrix_id);
CREATE INDEX idx_matrix_cells_matrix ON matrix_cells(matrix_id);
CREATE INDEX idx_matrix_cells_paper ON matrix_cells(paper_id);
CREATE INDEX idx_milestones_project ON project_milestones(project_id);
CREATE INDEX idx_marketplace_creator ON marketplace_items(creator_id);
CREATE INDEX idx_marketplace_reviews_item ON marketplace_reviews(item_id);
CREATE INDEX idx_submissions_document ON submissions(document_id);
CREATE INDEX idx_review_sims_document ON review_simulations(document_id);
CREATE INDEX idx_publications_user ON publications(user_id);
CREATE INDEX idx_knowledge_notes_user ON knowledge_notes(user_id);
CREATE INDEX idx_integrations_user ON integrations(user_id);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO usage_quotas (plan, ai_tokens_monthly, paper_searches_monthly, plagiarism_checks_monthly, exports_monthly, deep_research_monthly, max_projects, max_papers_per_project, max_file_upload_mb) VALUES
  ('free',          10000,    50,    1,     0,    0,    3,    50,    10),
  ('basic',         100000,   NULL,  10,    10,   5,    20,   200,   50),
  ('pro',           500000,   NULL,  50,    NULL, 25,   NULL, NULL,  100),
  ('institutional', 1000000,  NULL,  NULL,  NULL, NULL, NULL, NULL,  500);

-- ============================================================
-- VERIFICATION: 71 TABLES
-- V1 Core(22) + Editor(14) + Billing(5) + Systematic(11) + Institutional(3) + Platform(16) = 71
-- ============================================================
