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
};

export function getTemplate(id: string): LatexTemplate | null {
  return LATEX_TEMPLATES[id] ?? null;
}
