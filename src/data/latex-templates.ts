// ---------------------------------------------------------------------------
// LaTeX Project Templates
// ---------------------------------------------------------------------------

export interface LatexTemplate {
  id: string;
  label: string;
  description: string;
  compiler: "pdflatex" | "xelatex" | "lualatex";
  files: { path: string; content: string; isMain: boolean }[];
}

export const LATEX_TEMPLATES: Record<string, LatexTemplate> = {
  blank: {
    id: "blank",
    label: "Blank Document",
    description: "Start from scratch with a standard article template",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

\\title{__TITLE__}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract here.
\\end{abstract}

\\section{Introduction}

Start writing here.

\\section{Methods}

\\section{Results}

\\section{Discussion}

\\section{Conclusion}

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}
`,
      },
      {
        path: "references.bib",
        isMain: false,
        content: `% Add your BibTeX references here
% Example:
% @article{key2024,
%   author  = {Author Name},
%   title   = {Paper Title},
%   journal = {Journal Name},
%   year    = {2024},
%   volume  = {1},
%   pages   = {1--10},
% }
`,
      },
    ],
  },

  ieee: {
    id: "ieee",
    label: "IEEE Conference",
    description: "Two-column IEEE conference paper format",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[conference]{IEEEtran}
\\usepackage{cite}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{algorithmic}
\\usepackage{graphicx}
\\usepackage{textcomp}
\\usepackage{xcolor}
\\usepackage{hyperref}

\\begin{document}

\\title{__TITLE__}

\\author{
  \\IEEEauthorblockN{First Author}
  \\IEEEauthorblockA{
    \\textit{Department of Computer Science} \\\\
    \\textit{University Name} \\\\
    City, Country \\\\
    email@example.com
  }
  \\and
  \\IEEEauthorblockN{Second Author}
  \\IEEEauthorblockA{
    \\textit{Department of Computer Science} \\\\
    \\textit{University Name} \\\\
    City, Country \\\\
    email@example.com
  }
}

\\maketitle

\\begin{abstract}
This document provides a template for IEEE conference papers. Replace this text with your abstract (150--250 words).
\\end{abstract}

\\begin{IEEEkeywords}
keyword1, keyword2, keyword3
\\end{IEEEkeywords}

\\section{Introduction}
\\label{sec:intro}

Introduce your research problem and contributions here.

\\section{Related Work}
\\label{sec:related}

Review prior work and position your contribution.

\\section{Methodology}
\\label{sec:method}

Describe your approach in detail.

\\subsection{Problem Formulation}

\\subsection{Proposed Solution}

\\section{Experiments}
\\label{sec:experiments}

\\subsection{Experimental Setup}

\\subsection{Results}

Describe your experimental findings. Use tables and figures to present results clearly.

\\begin{table}[htbp]
\\caption{Comparison of Results}
\\label{tab:results}
\\centering
\\begin{tabular}{lcc}
\\hline
\\textbf{Method} & \\textbf{Accuracy} & \\textbf{F1 Score} \\\\
\\hline
Baseline & 0.85 & 0.82 \\\\
Our Method & \\textbf{0.92} & \\textbf{0.90} \\\\
\\hline
\\end{tabular}
\\end{table}

\\section{Discussion}
\\label{sec:discussion}

Discuss implications and limitations of your work.

\\section{Conclusion}
\\label{sec:conclusion}

Summarize contributions and outline future work.

\\bibliographystyle{IEEEtran}
\\bibliography{references}

\\end{document}
`,
      },
      {
        path: "references.bib",
        isMain: false,
        content: `@inproceedings{example2024,
  author    = {Smith, John and Doe, Jane},
  title     = {An Example Conference Paper},
  booktitle = {Proceedings of the International Conference},
  year      = {2024},
  pages     = {1--10},
  doi       = {10.1000/example},
}
`,
      },
    ],
  },

  nature: {
    id: "nature",
    label: "Nature",
    description: "Nature journal article format with structured abstract",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{natbib}
\\usepackage{setspace}
\\usepackage{lineno}

% Nature-style formatting
\\onehalfspacing
\\linenumbers
\\renewcommand{\\abstractname}{Summary}

\\title{__TITLE__}

\\author{
  First Author\\textsuperscript{1,*},
  Second Author\\textsuperscript{2},
  Third Author\\textsuperscript{1,2}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Biology, University Name, City, Country \\\\
  \\small\\textsuperscript{2}Institute of Research, City, Country \\\\
  \\small\\textsuperscript{*}Corresponding author: email@example.com
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
% Nature abstracts are a single paragraph of up to 150 words.
% They should convey the main findings without specialized jargon.
Replace this text with your abstract. Nature abstracts are structured as a single paragraph that covers: the problem context (1--2 sentences), what was done (1--2 sentences), the main results (2--3 sentences), and the broader implications (1--2 sentences). Maximum 150 words.
\\end{abstract}

\\section*{Introduction}

Introduce the research question and its significance. Provide context from prior work. State your hypothesis or objectives clearly in the final paragraph.

\\section*{Results}

Present your findings in a logical order. Use subheadings to organize different aspects of the results.

\\subsection*{Main Finding}

Describe your primary result. Reference figures and tables: see Fig.~\\ref{fig:main} and Table~\\ref{tab:data}.

\\begin{figure}[htbp]
  \\centering
  % \\includegraphics[width=0.8\\textwidth]{figure1.pdf}
  \\caption{\\textbf{Main finding illustrated.} Detailed caption describing the figure. \\textbf{a}, Description of panel a. \\textbf{b}, Description of panel b.}
  \\label{fig:main}
\\end{figure}

\\begin{table}[htbp]
  \\centering
  \\caption{Summary of experimental data.}
  \\label{tab:data}
  \\begin{tabular}{lccc}
    \\hline
    Condition & $n$ & Mean $\\pm$ s.d. & $P$ value \\\\
    \\hline
    Control   & 30  & $1.2 \\pm 0.3$   & ---       \\\\
    Treatment & 30  & $2.8 \\pm 0.5$   & $<0.001$  \\\\
    \\hline
  \\end{tabular}
\\end{table}

\\subsection*{Additional Analyses}

Present supplementary analyses that support the main finding.

\\section*{Discussion}

Interpret your findings in context of existing literature. Discuss limitations and implications. Suggest future directions.

\\section*{Methods}

Provide sufficient detail for reproducibility. Use subheadings for distinct methods.

\\subsection*{Sample Preparation}

\\subsection*{Data Collection}

\\subsection*{Statistical Analysis}

All statistical tests were two-sided with a significance threshold of $P < 0.05$. Data are presented as mean $\\pm$ standard deviation unless otherwise stated.

\\section*{Data Availability}

Data supporting the findings of this study are available from the corresponding author upon reasonable request.

\\section*{Acknowledgements}

Acknowledge funding sources and contributions.

\\bibliographystyle{naturemag}
\\bibliography{references}

\\end{document}
`,
      },
      {
        path: "references.bib",
        isMain: false,
        content: `@article{example2024,
  author  = {Smith, J. and Doe, J. and Johnson, A.},
  title   = {An Example Research Article},
  journal = {Nature},
  year    = {2024},
  volume  = {620},
  pages   = {100--105},
  doi     = {10.1038/example},
}
`,
      },
    ],
  },

  thesis: {
    id: "thesis",
    label: "Thesis",
    description: "Multi-chapter thesis with table of contents and bibliography",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt,a4paper]{report}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{fancyhdr}
\\usepackage{natbib}
\\usepackage{booktabs}
\\usepackage{caption}
\\usepackage{subcaption}
\\usepackage{appendix}

% Page style
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\leftmark}
\\fancyhead[R]{\\thepage}
\\renewcommand{\\headrulewidth}{0.4pt}

% Theorem environments
\\newtheorem{theorem}{Theorem}[chapter]
\\newtheorem{lemma}[theorem]{Lemma}
\\newtheorem{definition}[theorem]{Definition}

\\onehalfspacing

\\begin{document}

% ---------------------------------------------------------------------------
% Title Page
% ---------------------------------------------------------------------------
\\begin{titlepage}
  \\centering
  \\vspace*{2cm}

  {\\LARGE\\bfseries __TITLE__ \\par}
  \\vspace{2cm}

  {\\large A thesis submitted in partial fulfillment \\\\
  of the requirements for the degree of \\\\[6pt]
  \\textbf{Doctor of Philosophy} \\\\[6pt]
  in \\\\[6pt]
  \\textbf{Computer Science} \\par}
  \\vspace{2cm}

  {\\large Author Name \\par}
  \\vspace{1cm}

  {\\large Supervisor: Prof.\\ Supervisor Name \\par}
  \\vspace{2cm}

  {\\large Department of Computer Science \\\\
  University Name \\\\[12pt]
  \\today \\par}
\\end{titlepage}

% ---------------------------------------------------------------------------
% Front Matter
% ---------------------------------------------------------------------------
\\pagenumbering{roman}

\\chapter*{Abstract}
\\addcontentsline{toc}{chapter}{Abstract}
Write your abstract here. It should summarize the entire thesis in 300--500 words.

\\chapter*{Acknowledgements}
\\addcontentsline{toc}{chapter}{Acknowledgements}
Thank your supervisors, collaborators, and funding bodies.

\\tableofcontents
\\listoffigures
\\listoftables

% ---------------------------------------------------------------------------
% Main Matter
% ---------------------------------------------------------------------------
\\cleardoublepage
\\pagenumbering{arabic}

\\chapter{Introduction}
\\label{ch:intro}

\\section{Motivation}
\\label{sec:motivation}

Introduce the research problem and its significance.

\\section{Research Questions}
\\label{sec:questions}

State your research questions or hypotheses:
\\begin{enumerate}
  \\item Research question one.
  \\item Research question two.
  \\item Research question three.
\\end{enumerate}

\\section{Contributions}
\\label{sec:contributions}

Summarize the main contributions of this thesis.

\\section{Thesis Outline}
\\label{sec:outline}

Chapter~\\ref{ch:background} provides background and related work. Chapter~\\ref{ch:method} describes the methodology. Chapter~\\ref{ch:results} presents the results. Chapter~\\ref{ch:conclusion} concludes with a discussion and future directions.

\\chapter{Background and Related Work}
\\label{ch:background}

\\section{Theoretical Foundation}

\\section{Related Work}

\\section{Summary}

\\chapter{Methodology}
\\label{ch:method}

\\section{Overview}

\\section{Approach}

\\section{Implementation}

\\chapter{Results}
\\label{ch:results}

\\section{Experimental Setup}

\\section{Evaluation Metrics}

\\section{Main Results}

\\section{Discussion}

\\chapter{Conclusion and Future Work}
\\label{ch:conclusion}

\\section{Summary of Contributions}

\\section{Limitations}

\\section{Future Directions}

% ---------------------------------------------------------------------------
% Back Matter
% ---------------------------------------------------------------------------
\\bibliographystyle{plainnat}
\\bibliography{references}

\\begin{appendices}
\\chapter{Supplementary Material}
\\label{app:supplementary}

Additional details, proofs, or data tables.

\\end{appendices}

\\end{document}
`,
      },
      {
        path: "references.bib",
        isMain: false,
        content: `@book{knuth1986,
  author    = {Knuth, Donald E.},
  title     = {The \\TeX{}book},
  publisher = {Addison-Wesley},
  year      = {1986},
}

@article{example2024,
  author  = {Smith, J. and Doe, J.},
  title   = {An Example Research Article},
  journal = {Journal of Example Studies},
  year    = {2024},
  volume  = {42},
  pages   = {1--15},
  doi     = {10.1000/example},
}
`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Medical Journal Templates
  // ---------------------------------------------------------------------------

  ijmr: {
    id: "ijmr",
    label: "IJMR",
    description: "Indian Journal of Medical Research — original article format",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}
\\usepackage{caption}

% IJMR formatting
\\doublespacing
\\renewcommand{\\abstractname}{Abstract}

\\title{__TITLE__}

\\author{
  First Author\\textsuperscript{1},
  Second Author\\textsuperscript{2} \\&
  Third Author\\textsuperscript{1,*}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Medicine, Institution Name, City, India \\\\
  \\small\\textsuperscript{2}Department of Biochemistry, Institution Name, City, India \\\\
  \\small\\textsuperscript{*}Corresponding author: email@example.com
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Background \\& objectives:} State the purpose and rationale for the study.

\\textbf{Methods:} Describe the study design, setting, participants, interventions, and main outcome measures.

\\textbf{Results:} Present the main findings with numerical data and statistical significance.

\\textbf{Interpretation \\& conclusions:} Summarize the interpretation and implications of the findings.

\\noindent\\textbf{Key words:} Keyword1 -- Keyword2 -- Keyword3 -- Keyword4
\\end{abstract}

\\section{Introduction}

Introduce the research question, review relevant literature, and state the objectives. IJMR requires concise introductions (max 500 words).

\\section{Material \\& Methods}

\\subsection{Study Design}

Describe the study design (e.g., randomized controlled trial, cohort study, cross-sectional study).

\\subsection{Study Setting \\& Population}

Detail the setting, inclusion/exclusion criteria, and sampling method.

\\subsection{Data Collection}

Describe instruments, procedures, and variables measured.

\\subsection{Statistical Analysis}

Specify statistical tests, software used, and significance threshold ($P < 0.05$).

\\subsection{Ethical Approval}

This study was approved by the Institutional Ethics Committee (IEC No. XXXX/YYYY). Written informed consent was obtained from all participants.

\\section{Results}

Present findings in a logical sequence. Use tables and figures.

\\begin{table}[htbp]
  \\centering
  \\caption{Baseline characteristics of study participants.}
  \\label{tab:baseline}
  \\begin{tabular}{lccc}
    \\toprule
    \\textbf{Variable} & \\textbf{Group A} ($n$=50) & \\textbf{Group B} ($n$=50) & \\textbf{$P$ value} \\\\
    \\midrule
    Age (yr), mean $\\pm$ SD & $42.3 \\pm 8.1$ & $43.1 \\pm 7.9$ & 0.62 \\\\
    Male, \\textit{n} (\\%) & 28 (56) & 30 (60) & 0.68 \\\\
    BMI (kg/m\\textsuperscript{2}) & $24.1 \\pm 3.2$ & $24.5 \\pm 3.0$ & 0.51 \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\section{Discussion}

Discuss findings in context of existing literature. Address limitations. IJMR requires discussion under 1500 words.

\\section{Acknowledgment}

Acknowledge funding and contributions.

\\begin{thebibliography}{99}
\\bibitem{ref1} Author AB, Author CD. Title of the article. \\textit{Indian J Med Res} 2024; \\textbf{159} : 100-108.
\\bibitem{ref2} Author EF. Title of the second article. \\textit{Lancet} 2023; \\textbf{401} : 50-58.
\\end{thebibliography}

\\end{document}
`,
      },
    ],
  },

  japi: {
    id: "japi",
    label: "JAPI",
    description: "Journal of the Association of Physicians of India",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}

% JAPI formatting
\\doublespacing

\\title{__TITLE__}

\\author{
  First Author\\textsuperscript{1},
  Second Author\\textsuperscript{2},
  Third Author\\textsuperscript{1}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Internal Medicine, Hospital Name, City, India \\\\
  \\small\\textsuperscript{2}Department of Cardiology, Hospital Name, City, India \\\\[3pt]
  \\small\\textbf{Received:} DD/MM/YYYY; \\textbf{Accepted:} DD/MM/YYYY
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Objective:} State the primary objective of the study.

\\textbf{Methods:} Describe the study design, setting, participants, and main outcome measures.

\\textbf{Results:} Present key findings with effect sizes and confidence intervals.

\\textbf{Conclusion:} State the main conclusion and clinical relevance.
\\end{abstract}

\\noindent\\textbf{Keywords:} keyword1, keyword2, keyword3

\\section{Introduction}

Introduce the clinical problem and review relevant literature. State the study objectives clearly.

\\section{Materials and Methods}

\\subsection{Study Design and Setting}

\\subsection{Participants}

Include eligibility criteria and recruitment process.

\\subsection{Outcome Measures}

\\subsection{Statistical Analysis}

Data were analyzed using SPSS version XX. Continuous variables are presented as mean $\\pm$ SD or median (IQR). Categorical variables are presented as frequencies and percentages. A $P$ value $<0.05$ was considered statistically significant.

\\subsection{Ethics}

The study was approved by the Institutional Ethics Committee. Informed consent was obtained from all participants.

\\section{Results}

\\begin{table}[htbp]
  \\centering
  \\caption{Clinical outcomes in study groups.}
  \\label{tab:outcomes}
  \\begin{tabular}{lccc}
    \\toprule
    \\textbf{Outcome} & \\textbf{Group A} & \\textbf{Group B} & \\textbf{$P$ value} \\\\
    \\midrule
    Primary endpoint, \\textit{n} (\\%) & 12 (24) & 22 (44) & 0.03 \\\\
    Secondary endpoint & $3.2 \\pm 1.1$ & $4.8 \\pm 1.3$ & 0.01 \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\section{Discussion}

Discuss clinical significance of findings, compare with existing literature, and address limitations.

\\section{Conclusion}

Summarize the key message for practicing physicians.

\\section*{Conflict of Interest}
None declared.

\\begin{thebibliography}{99}
\\bibitem{ref1} Author AB, Author CD. Title of article. \\textit{J Assoc Physicians India} 2024; 72: 45-50.
\\bibitem{ref2} Author EF, Author GH. Title of second article. \\textit{Indian J Med Res} 2023; 158: 112-118.
\\end{thebibliography}

\\end{document}
`,
      },
    ],
  },

  jama: {
    id: "jama",
    label: "JAMA",
    description: "Journal of the American Medical Association format",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}
\\usepackage{lineno}

% JAMA formatting
\\doublespacing
\\linenumbers

\\title{__TITLE__}

\\author{
  First Author, MD\\textsuperscript{1};
  Second Author, PhD\\textsuperscript{2};
  Third Author, MD, PhD\\textsuperscript{1,3}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Medicine, University Medical Center, City, State \\\\
  \\small\\textsuperscript{2}School of Public Health, University Name, City, State \\\\
  \\small\\textsuperscript{3}Research Institute, City, State
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Importance:} Why is this study important? Describe the gap in knowledge.

\\textbf{Objective:} State the precise objective or hypothesis tested.

\\textbf{Design, Setting, and Participants:} Describe the study design (e.g., randomized clinical trial), setting (e.g., academic medical center), dates of study, and participants with eligibility criteria.

\\textbf{Interventions:} Describe the interventions for each group (if applicable).

\\textbf{Main Outcomes and Measures:} State the primary outcome(s) and how they were measured.

\\textbf{Results:} Summarize the key results. Include the number of participants, effect sizes with 95\\% CIs, and $P$ values.

\\textbf{Conclusions and Relevance:} State the conclusions directly supported by the data and their clinical relevance.

\\textbf{Trial Registration:} ClinicalTrials.gov Identifier: NCTXXXXXXXX
\\end{abstract}

\\section{Introduction}

Provide context for the study. Describe what is known and the specific gap addressed. State the study objective in the final paragraph.

\\section{Methods}

\\subsection{Study Design and Oversight}

Describe the study design, regulatory approvals, and role of the funder. This study was approved by the institutional review board at [institution]. Written informed consent was obtained from all participants.

\\subsection{Participants}

Describe eligibility criteria, recruitment, and enrollment.

\\subsection{Randomization and Interventions}

Describe randomization method and allocation concealment (if applicable).

\\subsection{Outcome Measures}

The primary outcome was [describe]. Secondary outcomes included [list].

\\subsection{Statistical Analysis}

Describe the sample size calculation, analysis plan, and statistical methods. All analyses were conducted using [software] version [X]. Two-sided $P < .05$ was considered statistically significant.

\\section{Results}

\\subsection{Study Population}

Of [N] patients screened, [n] were enrolled and randomized. Table~\\ref{tab:baseline} shows baseline characteristics.

\\begin{table}[htbp]
  \\centering
  \\caption{Baseline Characteristics of the Study Population}
  \\label{tab:baseline}
  \\begin{tabular}{lccc}
    \\toprule
    \\textbf{Characteristic} & \\textbf{Intervention} ($n$=XX) & \\textbf{Control} ($n$=XX) \\\\
    \\midrule
    Age, mean (SD), y & 58.3 (12.1) & 57.8 (11.9) \\\\
    Female sex, No. (\\%) & 48 (52) & 45 (49) \\\\
    BMI, mean (SD) & 27.4 (4.2) & 27.1 (4.0) \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\subsection{Primary Outcome}

Present the primary outcome with effect size (absolute difference, relative risk, or hazard ratio), 95\\% CI, and $P$ value.

\\subsection{Secondary Outcomes}

\\subsection{Adverse Events}

\\section{Discussion}

Discuss the principal findings, comparison with other studies, limitations (including generalizability), and conclusions.

\\subsection{Limitations}

This study has several limitations. First, \\ldots

\\section{Conclusions}

State the conclusion supported by the data. Avoid overgeneralization.

\\section*{Article Information}

\\textbf{Corresponding Author:} Name, MD, Department, Institution, Address. Email.

\\textbf{Author Contributions:} Dr [Name] had full access to all data and takes responsibility for data integrity and accuracy of analysis.

\\textbf{Conflict of Interest Disclosures:} None reported.

\\textbf{Funding/Support:} This work was supported by [source].

\\textbf{Data Sharing Statement:} See Supplement.

\\begin{thebibliography}{99}
\\bibitem{ref1} Author AB, Author CD, Author EF. Title of article. \\textit{JAMA}. 2024;331(1):45-53. doi:10.1001/jama.2024.XXXXX
\\bibitem{ref2} Author GH, Author IJ. Title of second article. \\textit{N Engl J Med}. 2023;389(12):1100-1110.
\\end{thebibliography}

\\end{document}
`,
      },
    ],
  },

  lancet: {
    id: "lancet",
    label: "Lancet",
    description: "The Lancet journal article format with structured abstract",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}
\\usepackage{lineno}

% Lancet formatting
\\doublespacing
\\linenumbers

\\title{__TITLE__}

\\author{
  First Author\\textsuperscript{a,*},
  Second Author\\textsuperscript{b},
  Third Author\\textsuperscript{a,c}
  \\\\[6pt]
  \\small\\textsuperscript{a}Department of Epidemiology, University Name, City, Country \\\\
  \\small\\textsuperscript{b}School of Public Health, University Name, City, Country \\\\
  \\small\\textsuperscript{c}WHO Collaborating Centre, City, Country \\\\
  \\small\\textsuperscript{*}Correspondence to: Prof First Author, email@example.com
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Background} \\quad
Describe what was known before this study and why the study was done.

\\textbf{Methods} \\quad
Describe the study design, setting, participants, interventions, and primary outcome.

\\textbf{Findings} \\quad
Report the main results. Include effect estimates with 95\\% CIs and $p$ values.

\\textbf{Interpretation} \\quad
State what the findings mean and their clinical or public health implications.

\\textbf{Funding} \\quad
Name the funding source(s).
\\end{abstract}

\\section*{Research in context}

\\subsection*{Evidence before this study}

We searched PubMed, Embase, and the Cochrane Library for studies published from [date] to [date], using the search terms \\textquotedblleft [terms]\\textquotedblright. We found\\ldots

\\subsection*{Added value of this study}

This study adds to existing evidence by\\ldots

\\subsection*{Implications of all the available evidence}

The combined evidence suggests\\ldots

\\section{Introduction}

The Lancet requires concise introductions (max 3 paragraphs). State the research question clearly.

\\section{Methods}

\\subsection{Study design and participants}

Describe the design, setting, and participants. State eligibility criteria.

\\subsection{Procedures}

Describe the intervention or exposure and data collection procedures.

\\subsection{Outcomes}

The primary outcome was [define]. Secondary outcomes included [list].

\\subsection{Statistical analysis}

Describe the sample size calculation and analysis plan. Analyses were done with [software]. This study is registered with ClinicalTrials.gov, number NCTXXXXXXXX.

\\subsection{Role of the funding source}

The funder had no role in study design, data collection, analysis, interpretation, or writing.

\\section{Results}

Present results corresponding to each outcome. The Lancet prefers results presented in the text with supporting tables/figures.

\\begin{table}[htbp]
  \\centering
  \\caption{Primary and secondary outcomes}
  \\label{tab:outcomes}
  \\begin{tabular}{lcccc}
    \\toprule
    & \\textbf{Intervention} & \\textbf{Control} & \\textbf{HR (95\\% CI)} & \\textbf{$p$ value} \\\\
    \\midrule
    Primary outcome & 42/500 (8\\%) & 68/500 (14\\%) & 0.59 (0.40--0.87) & 0.008 \\\\
    Secondary outcome 1 & \\ldots & \\ldots & \\ldots & \\ldots \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\section{Discussion}

Discuss findings systematically: main results, comparison with other studies, strengths and limitations, and implications. Max 1500 words.

\\section*{Contributors}

[First Author] designed the study and wrote the manuscript. [Second Author] did the statistical analysis. All authors reviewed and approved the final manuscript.

\\section*{Declaration of interests}

We declare no competing interests.

\\section*{Acknowledgments}

This work was supported by [funder, grant number].

\\begin{thebibliography}{99}
\\bibitem{ref1} Author AB, Author CD, Author EF, et al. Title of the article. \\textit{Lancet} 2024; \\textbf{403}: 100--110.
\\bibitem{ref2} Author GH, Author IJ. Title of the second article. \\textit{Lancet} 2023; \\textbf{401}: 2050--2060.
\\end{thebibliography}

\\end{document}
`,
      },
    ],
  },

  bmj: {
    id: "bmj",
    label: "BMJ",
    description: "British Medical Journal research article format",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}
\\usepackage{lineno}
\\usepackage{enumitem}

% BMJ formatting
\\doublespacing
\\linenumbers

\\title{__TITLE__}

\\author{
  First Author\\textsuperscript{1},
  Second Author\\textsuperscript{2},
  Third Author\\textsuperscript{1,3}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Primary Care, University of Oxford, Oxford, UK \\\\
  \\small\\textsuperscript{2}Department of Public Health, London School of Hygiene, London, UK \\\\
  \\small\\textsuperscript{3}NIHR Biomedical Research Centre, Oxford, UK \\\\[3pt]
  \\small Correspondence to: First Author, email@example.com
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Objective} \\quad To investigate [state precise study objective].

\\textbf{Design} \\quad [Describe study design, e.g., prospective cohort study].

\\textbf{Setting} \\quad [Describe setting, e.g., 42 NHS primary care practices in England].

\\textbf{Participants} \\quad [Number and description, e.g., 12\\,458 adults aged 40--75 years].

\\textbf{Main outcome measures} \\quad [Primary and secondary outcomes].

\\textbf{Results} \\quad [Key findings with effect sizes, CIs, and $P$ values].

\\textbf{Conclusions} \\quad [Main conclusion and implications].

\\textbf{Trial registration} \\quad ISRCTNXXXXXXXX.
\\end{abstract}

\\section*{What is already known on this topic}
\\begin{itemize}[nosep]
  \\item Bullet point summarizing existing evidence
  \\item Another key finding from prior work
\\end{itemize}

\\section*{What this study adds}
\\begin{itemize}[nosep]
  \\item The main novel finding
  \\item Clinical or policy implication
  \\item Methodological advance (if applicable)
\\end{itemize}

\\section{Introduction}

BMJ introductions should be concise (max 3 paragraphs). State the research question and justify why the study was needed.

\\section{Methods}

\\subsection{Study design}

\\subsection{Participants}

\\subsection{Exposures and outcomes}

The primary outcome was [define]. We measured\\ldots

\\subsection{Statistical analysis}

Describe the statistical methods, software, and pre-specified analysis plan. State how missing data were handled.

\\subsection{Patient and public involvement}

Patients were involved in [describe role]. The study protocol was reviewed by [patient advisory group].

\\section{Results}

\\subsection{Study population}

During [period], [N] participants were enrolled. Table~\\ref{tab:baseline} shows baseline characteristics.

\\begin{table}[htbp]
  \\centering
  \\caption{Baseline characteristics by exposure group. Values are numbers (percentages) unless stated otherwise}
  \\label{tab:baseline}
  \\begin{tabular}{lcc}
    \\toprule
    \\textbf{Characteristic} & \\textbf{Exposed} ($n$=XXXX) & \\textbf{Unexposed} ($n$=XXXX) \\\\
    \\midrule
    Mean (SD) age, years & 55.2 (10.3) & 54.8 (10.1) \\\\
    Women & 3200 (52) & 3150 (51) \\\\
    Current smoker & 800 (13) & 850 (14) \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\subsection{Main findings}

\\subsection{Sensitivity analyses}

\\section{Discussion}

\\subsection{Principal findings}

\\subsection{Comparison with other studies}

\\subsection{Strengths and limitations}

\\subsection{Conclusions and policy implications}

\\section*{Data availability statement}

The study data are available from the corresponding author upon reasonable request.

\\section*{Funding}

This study was funded by [source, grant number].

\\section*{Competing interests}

All authors have completed the ICMJE uniform disclosure form. No competing interests declared.

\\begin{thebibliography}{99}
\\bibitem{ref1} Author AB, Author CD, Author EF. Title of the article. \\textit{BMJ} 2024;384:e073491. doi:10.1136/bmj-2022-073491
\\bibitem{ref2} Author GH, Author IJ. Title of the second article. \\textit{Lancet} 2023;401:1200-10.
\\end{thebibliography}

\\end{document}
`,
      },
    ],
  },

  elsevier: {
    id: "elsevier",
    label: "Elsevier",
    description: "Elsevier journal format with graphical abstract placeholder",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[preprint,12pt]{elsarticle}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{booktabs}
\\usepackage{lineno}

\\linenumbers
\\journal{Journal Name}

\\begin{document}

\\begin{frontmatter}

\\title{__TITLE__}

\\author[inst1]{First Author\\corref{cor1}}
\\ead{first.author@example.com}
\\author[inst2]{Second Author}
\\author[inst1,inst3]{Third Author}

\\cortext[cor1]{Corresponding author}
\\affiliation[inst1]{organization={Department of Medicine, University Name}, city={City}, country={Country}}
\\affiliation[inst2]{organization={Department of Surgery, Hospital Name}, city={City}, country={Country}}
\\affiliation[inst3]{organization={Research Institute}, city={City}, country={Country}}

\\begin{abstract}
Replace this text with a structured or unstructured abstract (max 300 words depending on the journal). State the purpose, methods, results, and conclusions.
\\end{abstract}

\\begin{graphicalabstract}
% Include a graphical abstract image:
% \\includegraphics[width=\\textwidth]{graphical-abstract.pdf}
\\textit{[Graphical abstract placeholder --- include a visual summary of the study]}
\\end{graphicalabstract}

\\begin{highlights}
  \\item First highlight summarizing a key finding (max 85 characters)
  \\item Second highlight about methodology or scope
  \\item Third highlight about clinical or practical implications
\\end{highlights}

\\begin{keyword}
keyword1 \\sep keyword2 \\sep keyword3 \\sep keyword4 \\sep keyword5
\\end{keyword}

\\end{frontmatter}

\\section{Introduction}
\\label{sec:intro}

Introduce the research problem, review literature, and state the objectives.

\\section{Materials and methods}
\\label{sec:methods}

\\subsection{Study design}

\\subsection{Data collection}

\\subsection{Statistical analysis}

Data were analyzed using [software]. Results are expressed as mean $\\pm$ standard deviation. Statistical significance was set at $P < 0.05$.

\\section{Results}
\\label{sec:results}

\\begin{table}[htbp]
  \\centering
  \\caption{Summary of results.}
  \\label{tab:results}
  \\begin{tabular}{lcc}
    \\toprule
    \\textbf{Parameter} & \\textbf{Value} & \\textbf{95\\% CI} \\\\
    \\midrule
    Outcome A & 0.85 & 0.78--0.92 \\\\
    Outcome B & 0.72 & 0.65--0.79 \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\section{Discussion}
\\label{sec:discussion}

Discuss the implications, compare with prior work, and state limitations.

\\section{Conclusions}
\\label{sec:conclusions}

Summarize the main findings and their significance.

\\section*{CRediT authorship contribution statement}

\\textbf{First Author:} Conceptualization, Methodology, Writing -- original draft. \\textbf{Second Author:} Data curation, Formal analysis. \\textbf{Third Author:} Supervision, Writing -- review \\& editing.

\\section*{Declaration of competing interest}

The authors declare that they have no known competing financial interests or personal relationships that could have influenced the work reported in this paper.

\\section*{Data availability}

Data will be made available on request.

\\section*{Acknowledgments}

This work was supported by [funding source, grant number].

\\bibliographystyle{elsarticle-num}
\\bibliography{references}

\\end{document}
`,
      },
      {
        path: "references.bib",
        isMain: false,
        content: `@article{example2024,
  author  = {Smith, A.B. and Doe, C.D. and Johnson, E.F.},
  title   = {An example research article for Elsevier journals},
  journal = {Journal Name},
  year    = {2024},
  volume  = {150},
  pages   = {100--110},
  doi     = {10.1016/j.jname.2024.01.001},
}
`,
      },
    ],
  },

  casereport: {
    id: "casereport",
    label: "Case Report (CARE)",
    description: "CARE-guideline compliant case report template",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}

% CARE Case Report formatting
\\doublespacing

\\title{__TITLE__}

\\author{
  First Author, MD\\textsuperscript{1,*},
  Second Author, MD\\textsuperscript{2},
  Third Author, MD, PhD\\textsuperscript{1}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Medicine, Hospital Name, City, Country \\\\
  \\small\\textsuperscript{2}Department of Radiology, Hospital Name, City, Country \\\\
  \\small\\textsuperscript{*}Corresponding author: email@example.com
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Introduction:} Briefly introduce the condition and why this case is reportable (novelty, rarity, or educational value).

\\textbf{Patient Concerns:} Describe the patient's chief complaints and symptoms at presentation.

\\textbf{Diagnoses:} State the final diagnosis.

\\textbf{Interventions:} Describe the treatments administered.

\\textbf{Outcomes:} Summarize the clinical outcome and follow-up.

\\textbf{Lessons:} State the key take-home messages for clinicians.

\\noindent\\textbf{Keywords:} keyword1, keyword2, keyword3
\\end{abstract}

% ---- CARE Checklist Sections ----

\\section{Introduction}

Provide background on the condition. Explain what makes this case unusual, novel, or educational. State what this case adds to the existing literature.

\\textit{CARE item 1: What does this case report add?}

\\section{Patient Information}

\\subsection{Demographics and History}

A [age]-year-old [sex] patient presented with [chief complaint] for [duration].

\\textbf{Past medical history:} [List relevant conditions]

\\textbf{Family history:} [Relevant family history]

\\textbf{Relevant psychosocial history:} [If applicable]

\\textit{CARE items 2--4: Patient demographics, chief complaints, medical/family/psychosocial history.}

\\section{Clinical Findings}

Describe the relevant physical examination findings at initial presentation.

\\textit{CARE item 5: Physical examination findings.}

\\section{Timeline}

\\begin{table}[htbp]
  \\centering
  \\caption{Clinical timeline of the case}
  \\label{tab:timeline}
  \\begin{tabular}{ll}
    \\toprule
    \\textbf{Date/Time} & \\textbf{Event} \\\\
    \\midrule
    Day 0 & Presentation with chief complaint \\\\
    Day 1 & Initial investigations performed \\\\
    Day 3 & Diagnosis confirmed \\\\
    Day 3 & Treatment initiated \\\\
    Week 2 & Follow-up: clinical improvement noted \\\\
    Month 3 & Final follow-up: full recovery \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\textit{CARE item 6: Timeline of important dates and events.}

\\section{Diagnostic Assessment}

\\subsection{Laboratory Findings}

Present relevant laboratory results.

\\subsection{Imaging Findings}

Describe imaging studies (reference figures).

% \\begin{figure}[htbp]
%   \\centering
%   \\includegraphics[width=0.6\\textwidth]{figure1.pdf}
%   \\caption{Imaging findings. (A) Description. (B) Description.}
%   \\label{fig:imaging}
% \\end{figure}

\\subsection{Diagnostic Reasoning}

Describe the differential diagnosis considered and how the final diagnosis was reached.

\\textit{CARE items 7--8: Diagnostic methods and reasoning, including challenges.}

\\section{Therapeutic Intervention}

Describe the interventions administered (pharmacological, surgical, supportive), including dosages and duration.

\\textit{CARE item 9: Types of intervention, administration, and duration.}

\\section{Follow-up and Outcomes}

Describe the clinical outcome at each follow-up visit. Include both clinician-assessed and patient-reported outcomes if available.

\\textit{CARE items 10--11: Outcomes assessment and follow-up.}

\\section{Discussion}

Discuss the case in context of the existing literature. Address the strengths and limitations of this case report. Describe the scientific rationale for conclusions.

\\textit{CARE items 12--13: Discussion including strengths, limitations, and relevant literature.}

\\section*{Patient Perspective}

[If available, include a brief statement from the patient about their experience.]

\\textit{CARE item 14: Patient perspective (when available).}

\\section*{Informed Consent}

Written informed consent was obtained from the patient for publication of this case report and accompanying images. A copy is available for review.

\\textit{CARE item 15: Informed consent documentation.}

\\section*{Conflict of Interest}
None declared.

\\begin{thebibliography}{99}
\\bibitem{ref1} Gagnier JJ, Kienle G, Altman DG, et al. The CARE guidelines: consensus-based clinical case reporting guideline development. \\textit{Headache} 2013; 53: 1541--1547.
\\bibitem{ref2} Author AB, Author CD. Relevant article title. \\textit{Journal Name} 2024; 100: 50--55.
\\end{thebibliography}

\\end{document}
`,
      },
    ],
  },

  systematicreview: {
    id: "systematicreview",
    label: "Systematic Review (PRISMA)",
    description: "PRISMA-compliant systematic review and meta-analysis template",
    compiler: "pdflatex",
    files: [
      {
        path: "main.tex",
        isMain: true,
        content: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{setspace}
\\usepackage{booktabs}
\\usepackage{lineno}
\\usepackage{enumitem}
\\usepackage{longtable}

% PRISMA Systematic Review formatting
\\doublespacing
\\linenumbers

\\title{__TITLE__: A Systematic Review and Meta-Analysis}

\\author{
  First Author\\textsuperscript{1,*},
  Second Author\\textsuperscript{2},
  Third Author\\textsuperscript{1}
  \\\\[6pt]
  \\small\\textsuperscript{1}Department of Evidence-Based Medicine, University Name, City, Country \\\\
  \\small\\textsuperscript{2}Library and Information Sciences, University Name, City, Country \\\\
  \\small\\textsuperscript{*}Corresponding author: email@example.com
}
\\date{}

\\begin{document}

\\maketitle

\\begin{abstract}
\\noindent
\\textbf{Background:} State the rationale and what is already known.

\\textbf{Objectives:} State the precise review question using PICO format (Population, Intervention, Comparison, Outcome).

\\textbf{Data Sources:} List databases searched and date range (e.g., PubMed, Embase, Cochrane CENTRAL from inception to [date]).

\\textbf{Study Selection:} State eligibility criteria and number of studies included.

\\textbf{Data Extraction and Synthesis:} Describe data extraction process and synthesis method (narrative, meta-analysis).

\\textbf{Results:} Report the number of studies and participants. State the main pooled effect estimate with 95\\% CI and heterogeneity ($I^2$).

\\textbf{Limitations:} Identify key limitations of the evidence.

\\textbf{Conclusions:} State the main conclusion and implications for practice or research.

\\textbf{Systematic Review Registration:} PROSPERO CRD42XXXXXXXXX
\\end{abstract}

\\noindent\\textbf{Keywords:} systematic review, meta-analysis, keyword3, keyword4

% ---- PRISMA Sections ----

\\section{Introduction}

\\subsection{Rationale}

Describe the condition, existing evidence, and the gap this review addresses.

\\textit{PRISMA item 3: Rationale for the review.}

\\subsection{Objectives}

State the review question using the PICO framework:
\\begin{itemize}[nosep]
  \\item \\textbf{Population:} [Define]
  \\item \\textbf{Intervention:} [Define]
  \\item \\textbf{Comparison:} [Define]
  \\item \\textbf{Outcome:} [Define]
\\end{itemize}

\\textit{PRISMA item 4: Objectives and review question.}

\\section{Methods}

\\subsection{Protocol and Registration}

This systematic review was conducted following the PRISMA 2020 guidelines. The protocol was registered with PROSPERO (CRD42XXXXXXXXX).

\\textit{PRISMA item 5: Protocol registration.}

\\subsection{Eligibility Criteria}

\\textbf{Inclusion criteria:}
\\begin{itemize}[nosep]
  \\item Study design: Randomized controlled trials
  \\item Population: [Define]
  \\item Intervention: [Define]
  \\item Outcome: [Define]
  \\item Language: English
\\end{itemize}

\\textbf{Exclusion criteria:}
\\begin{itemize}[nosep]
  \\item [Criterion 1]
  \\item [Criterion 2]
\\end{itemize}

\\textit{PRISMA item 6: Eligibility criteria.}

\\subsection{Information Sources}

We searched PubMed/MEDLINE, Embase, Cochrane CENTRAL, and Web of Science from inception to [date]. Reference lists of included studies and relevant reviews were hand-searched.

\\textit{PRISMA item 7: Information sources.}

\\subsection{Search Strategy}

The full search strategy for PubMed is provided in Appendix~\\ref{app:search}. Search terms were adapted for each database.

\\textit{PRISMA item 8: Search strategy.}

\\subsection{Selection Process}

Two reviewers (FA, SA) independently screened titles/abstracts, then full texts. Disagreements were resolved by discussion or a third reviewer (TA).

\\textit{PRISMA items 9--10: Selection process.}

\\subsection{Data Extraction}

Data were extracted independently by two reviewers using a standardized form. Extracted items included: study characteristics, participant demographics, intervention details, and outcome data.

\\textit{PRISMA item 11: Data collection process.}

\\subsection{Risk of Bias Assessment}

Risk of bias was assessed using the Cochrane Risk of Bias 2 (RoB 2) tool for randomized trials. Each domain was rated as low risk, some concerns, or high risk.

\\textit{PRISMA item 12: Risk of bias assessment.}

\\subsection{Data Synthesis}

Meta-analysis was performed using a random-effects model (DerSimonian--Laird). Heterogeneity was assessed using the $I^2$ statistic and Cochran's $Q$ test. Publication bias was evaluated using funnel plots and Egger's test. Analyses were conducted using R (meta package).

\\textit{PRISMA items 13--14: Synthesis methods and meta-analysis.}

\\section{Results}

\\subsection{Study Selection}

% PRISMA Flow Diagram placeholder
\\begin{figure}[htbp]
  \\centering
  \\fbox{\\parbox{0.85\\textwidth}{\\centering
    \\vspace{6pt}
    \\textbf{PRISMA 2020 Flow Diagram}\\\\[6pt]
    Records identified (\\textit{n} = XXXX)\\\\
    $\\downarrow$\\\\
    After duplicates removed (\\textit{n} = XXXX)\\\\
    $\\downarrow$\\\\
    Titles/abstracts screened (\\textit{n} = XXXX)\\\\
    $\\rightarrow$ Excluded (\\textit{n} = XXXX)\\\\
    $\\downarrow$\\\\
    Full-text articles assessed (\\textit{n} = XX)\\\\
    $\\rightarrow$ Excluded with reasons (\\textit{n} = XX)\\\\
    $\\downarrow$\\\\
    \\textbf{Studies included in synthesis (\\textit{n} = XX)}\\\\
    \\quad Meta-analysis (\\textit{n} = XX)\\\\
    \\vspace{6pt}
  }}
  \\caption{PRISMA 2020 flow diagram of study selection.}
  \\label{fig:prisma}
\\end{figure}

\\textit{PRISMA item 16: Study selection results.}

\\subsection{Study Characteristics}

\\begin{table}[htbp]
  \\centering
  \\caption{Characteristics of included studies}
  \\label{tab:characteristics}
  \\begin{tabular}{lccccl}
    \\toprule
    \\textbf{Study} & \\textbf{Year} & \\textbf{Design} & \\textbf{$n$} & \\textbf{Follow-up} & \\textbf{Country} \\\\
    \\midrule
    Author A et al. & 2020 & RCT & 200 & 12 mo & USA \\\\
    Author B et al. & 2021 & RCT & 150 & 6 mo & UK \\\\
    Author C et al. & 2022 & RCT & 300 & 24 mo & India \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

\\textit{PRISMA item 17: Study characteristics.}

\\subsection{Risk of Bias}

Describe overall and per-study risk of bias.

\\textit{PRISMA item 18: Risk of bias in included studies.}

\\subsection{Meta-Analysis Results}

The pooled effect estimate was [RR/OR/MD] = X.XX (95\\% CI: X.XX--X.XX; $P$ = X.XX). Heterogeneity was [low/moderate/high] ($I^2$ = XX\\%, $P$ = X.XX).

% Include forest plot figure
% \\begin{figure}[htbp]
%   \\centering
%   \\includegraphics[width=0.9\\textwidth]{forest-plot.pdf}
%   \\caption{Forest plot of the primary outcome.}
%   \\label{fig:forest}
% \\end{figure}

\\textit{PRISMA items 19--20: Results of synthesis.}

\\subsection{Subgroup and Sensitivity Analyses}

\\subsection{Publication Bias}

\\section{Discussion}

\\subsection{Summary of Evidence}

\\textit{PRISMA item 23: General interpretation in context of other evidence.}

\\subsection{Limitations}

Discuss limitations at the study and review level.

\\textit{PRISMA item 24: Limitations.}

\\subsection{Implications for Practice and Research}

\\section{Conclusions}

State the main conclusion with the level of certainty (GRADE).

\\textit{PRISMA item 25: Conclusions.}

\\section*{Funding}

[Funding source, or \\textquotedblleft None\\textquotedblright]

\\section*{Conflicts of Interest}

None declared.

\\begin{thebibliography}{99}
\\bibitem{prisma2020} Page MJ, McKenzie JE, Bossuyt PM, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. \\textit{BMJ} 2021; 372: n71.
\\bibitem{ref2} Author AB, Author CD. Title of relevant meta-analysis. \\textit{Journal} 2024; 100: 200--210.
\\end{thebibliography}

\\appendix
\\section{Search Strategy}
\\label{app:search}

\\textbf{PubMed/MEDLINE search (executed [date]):}
\\begin{verbatim}
("population term"[MeSH] OR "population term"[tiab])
AND
("intervention term"[MeSH] OR "intervention term"[tiab])
AND
("outcome term"[MeSH] OR "outcome term"[tiab])
AND
(randomized controlled trial[pt] OR clinical trial[pt])
\\end{verbatim}

\\end{document}
`,
      },
      {
        path: "references.bib",
        isMain: false,
        content: `@article{prisma2020,
  author  = {Page, Matthew J. and McKenzie, Joanne E. and Bossuyt, Patrick M. and others},
  title   = {The PRISMA 2020 statement: an updated guideline for reporting systematic reviews},
  journal = {BMJ},
  year    = {2021},
  volume  = {372},
  pages   = {n71},
  doi     = {10.1136/bmj.n71},
}
`,
      },
    ],
  },
};

export function getTemplate(id: string): LatexTemplate | null {
  return LATEX_TEMPLATES[id] ?? null;
}
