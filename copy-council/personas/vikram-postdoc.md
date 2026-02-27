# Persona Evaluation: Dr. Vikram Rao
## Post-Doctoral Researcher, JIPMER Puducherry | Cardiology Systematic Reviews
### ScholarSync Landing Page Copy Evaluation — All 5 Copies

---

**Who I am and why my opinion matters here:**

I am 32. I have published 6 systematic reviews and 2 meta-analyses in cardiology. I have spent more time than I care to admit building PRISMA flow diagrams in PowerPoint. I currently pay $49 per Covidence review — which, converted to rupees at whatever the dollar is doing that month, makes me wince every time the invoice hits. I use Rayyan for screening, RevMan for meta-analysis, and Zotero for citations. I have taught systematic review methodology to junior residents. I am the person people WhatsApp at 11 PM when they cannot figure out how to structure their inclusion/exclusion criteria.

I am also precisely the kind of person who will walk away from a tool the moment I catch it being imprecise about methodology. One wrong claim about RoB 2 and I am gone. One vague hand-wave about "AI screening" without explaining the methodology and I assume the worst.

I read all five copies. Here is my honest assessment.

---

---

## COPY A — Schwartz-Halbert Framework

---

### Methodological Accuracy: 7/10

The PRISMA 2020 claims are accurate. The RoB 2 domain breakdown is correctly listed — randomisation process, deviations from intervention, missing outcome data, measurement of outcome, selection of reported results — and that is not something a non-researcher would get right without either knowing the framework or looking it up carefully. I notice the copy states the tool "returns low / some concerns / high risk per domain, with overall risk judgment" — that is precisely the RoB 2 output structure. That tells me someone actually read the Cochrane RoB 2 guidance.

The evidence level hierarchy (Level I through V) is described as corresponding to meta-analyses, RCTs, cohort studies, case-control studies, and expert opinion respectively. This is a reasonable approximation of Oxford CEBM, though I would note it is not specified whose hierarchy is being used. A reviewer would ask: GRADE? CEBM? SIGN? The copy never names the source. That is an accuracy gap, though not an error.

The triple-agent screening claim is specific enough to be checkable: "Three independent AI agents screen each paper against your inclusion and exclusion criteria. Each agent makes an independent decision with reasoning. Unanimous include: included. Unanimous exclude: excluded. Any disagreement: flagged for your review." This is methodologically coherent. It maps to the principle of dual-independent reviewer screening with consensus adjudication. The analogy is fair.

What I would challenge: "Screening methodology is citable in a systematic review's Methods section." That is a strong claim. Whether a journal reviewer accepts AI-assisted screening as methodologically equivalent to dual-human-reviewer screening depends entirely on the journal, the year, and the evolving guidance from Cochrane and PRISMA on AI-assisted reviews. The 2024 Cochrane guidance on this is still developing. The copy makes it sound settled. It is not.

### Technical Sophistication: 6/10

The technical language is accurate but not deep. The copy mentions MeSH, Boolean queries, Reciprocal Rank Fusion, Cohere Rerank, HyDE — these are real technologies. But they are named rather than explained. For a junior resident, naming them signals credibility. For me, naming them without any discussion of their limitations or trade-offs signals someone who wants to impress without being accountable.

HyDE (Hypothetical Document Embeddings) is a genuinely interesting retrieval technique. The copy says it "improves search accuracy beyond standard keyword matching" — true in principle, but how much? Under what conditions? Are there retrieval failure modes? A sophisticated tool would tell me.

The writing skews toward PG students and junior residents. The example in the hero body is a 400 PubMed results problem — not my problem. My problem is: how do I screen 1,847 papers from a SGLT2i search with confidence in the methodology, and how do I defend the AI-assisted screening in my Methods section?

### Transparency: 5/10

This is where Copy A disappoints me most. The technical vocabulary is present, but the explanations stop at the surface. I am told the system uses "triple-agent AI screening" but I am not told what the agents are, how they were trained or prompted, whether they are the same underlying model with different prompts or genuinely different models, or what the empirically observed inter-rater agreement rate is. That last point is critical — a key methodological requirement for dual-reviewer screening is reporting Cohen's kappa. Does this system produce something analogous?

Similarly, RoB 2 automation: I am told it "automates domain-level assessment." But RoB 2 is not a checkbox exercise. It requires contextual judgment about what the paper reports and what it omits. How does an AI handle the difference between "not reported" and "not done"? This is non-trivial. The copy does not acknowledge the difficulty.

The line "Your committee can check the checklist against your submitted document. It will pass" is overconfident. I have sat on review committees. Whether a systematic review "passes" depends on reviewer judgment, not checklist completion.

### Covidence Comparison: 7/10

The explicit Covidence price comparison ($119 per review — the copy says "USD 119 per review" which is actually the single-review rate; I pay $49/month for the individual subscription — so the copy's math is slightly off, but directionally honest) is the most directly useful thing in this copy for me. The framing that ScholarSync includes writing, citation management, and a search engine while Covidence does not is accurate and relevant.

What Covidence gives me that this copy does not address: a dedicated conflict resolution interface designed for dual-reviewer workflows, an established track record in published systematic review methods sections, and the ability to write "we used Covidence for screening" in a Methods section and have any reviewer instantly understand what that means. The audit trail that Covidence provides is trusted. "We used ScholarSync's triple-agent AI system" is going to require significantly more explanation and methodological defense.

### Red Flags: 2 flags

**Flag 1:** "What ScholarSync produces is not a simulation of PRISMA compliance. It is actual PRISMA 2020 compliance — the artifacts, the documentation, the flow diagram — ready to submit with your thesis. Your committee can check the checklist against your submitted document. It will pass."

This is the kind of guarantee that no tool should make. PRISMA compliance is evaluated by human reviewers. The checklist completion is necessary but not sufficient. I have seen PRISMA flow diagrams that were technically complete and methodologically flawed. This sentence would cause me to distrust the entire copy.

**Flag 2:** "The triple-agent consensus screening...is methodologically equivalent to dual-reviewer independent screening with consensus resolution — which is the Cochrane-recommended approach."

"Methodologically equivalent" is doing enormous work here. The Cochrane Handbook is explicit that screening should be performed by humans with domain knowledge. Cochrane does not currently recommend AI-only screening as equivalent. There is emerging guidance on human-AI collaborative screening, but not equivalence of AI-only processes.

### Professional Utility: 7/10

The PICO-to-search-strategy generation, if it actually works as described, would meaningfully accelerate my workflow. The automated PRISMA flow diagram is real utility — I currently build these in PowerPoint and update them manually every time a screening decision changes, which is exactly as painful as it sounds. The citation graph traversal for snowball sampling is genuinely useful. The RoB 2 automation would need testing before I trusted it for publication-grade work, but even as a first-pass tool, it would save time.

The writing features are largely irrelevant to me. I know how to structure a manuscript.

### Would You Switch? 5/10

Tentatively interested. I would trial the systematic review features. I would not cancel Covidence until I had used this for one complete review and successfully defended the methodology in a Methods section that survived peer review.

---

---

## COPY B — Ogilvy-Hopkins Framework

---

### Methodological Accuracy: 9/10

This is the most methodologically precise copy I read. The SGLT2i demonstration is where it earns that score.

The MeSH Boolean query shown for the SGLT2i search is legitimate:
`("Sodium-Glucose Transporter 2 Inhibitors"[MeSH Terms] OR "SGLT2 inhibitor*"[tiab]) AND ("Heart Failure"[MeSH Terms] AND "reduced ejection fraction"[tiab]) AND ("2015"[PDat]:"2026"[PDat])`

I ran something very close to this query myself for a review I completed in late 2024. The field tags are correct — [MeSH Terms], [tiab] for title/abstract, [PDat] for publication date. The use of the asterisk as a wildcard is correct PubMed syntax. This is not marketing language. Someone who actually builds PubMed searches wrote this or reviewed it.

The synthesis result references specific trials: EMPEROR-Reduced (HR 0.75; 95% CI 0.65-0.86) and DAPA-HF (HR 0.74; 95% CI 0.65-0.85). These are accurate figures. The I-squared value for the 2023 Cochrane review (14%, indicating low heterogeneity) is plausible and consistent with published meta-analyses I have read. The copy also correctly identifies HFpEF and mixed ejection fraction populations as the evidence gap — which is precisely where the evidence base was uncertain as of the most recent comprehensive review.

Someone in this organisation knows cardiology literature. That is either a very good researcher on the team, or very careful fact-checking. Either way, it earns trust.

The PRISMA 27-item checklist across 9 domains is correctly cited. The EMTREE/PubMed MeSH equivalence mention for EMBASE strategies is accurate — EMBASE uses EMTREE, not MeSH, and experienced searchers know to cross-map. The Cochrane Register formatting note is correct.

The Oxford CEBM attribution for the evidence hierarchy is the specific addition Copy A was missing. Now I know which hierarchy. I can evaluate it. That is how methodological transparency works.

The one accuracy concern: the comparison table states manual abstract screening for two independent reviewers takes "40+ hours per 1,000 citations." This is consistent with published estimates in systematic review methodology literature (roughly 30-60 hours per 1,000 is the range I have seen), so it is not wrong. But the table then says triple-agent AI screening takes "Minutes for screening; human time concentrated at genuine decision points." This is where I want more specificity — minutes under what conditions? What percentage of papers reach the "disagreement" threshold requiring human review? If 40% of papers are flagged for human review, the time saving is much less dramatic.

### Technical Sophistication: 9/10

Copy B speaks to me. The feature demonstration using an actual cardiology example — SGLT2i in HFrEF — is precisely calibrated to a cardiologist's worldview. The copy doesn't tell me the search tool is good; it shows me a search I would actually run and gives me the output I would evaluate. That is the difference between demonstration and description.

The methodology table is the most sophisticated element in any of the five copies. It breaks down the systematic review workflow step by step, estimates time per step, and contrasts current with ScholarSync. A researcher who has done systematic reviews will immediately recognize the steps: query construction, literature search, abstract screening, PRISMA flow, RoB assessment, citation formatting, document formatting, AI detection. These are the actual bottlenecks. The table was written by someone who has experienced them.

The mention of "HyDE retrieval technique (Hypothetical Document Embeddings, in which the AI generates a hypothetical ideal answer to your research question and retrieves papers whose language patterns match)" is accurate and specific. More importantly, the copy uses it correctly — as an enhancement to semantic retrieval, not as magic. That is the right framing.

### Transparency: 8/10

The Ogilvy framework demands factual proof, and this copy delivers more of it than any other. The specific query syntax, the named trials with actual effect sizes, the confidence intervals — these are the transparency markers that I look for. A tool that will give me fabricated statistics would not put real ones in its marketing copy, because the risk of discovery is too high.

The RoB 2 section says assessments "can be included in a systematic review's supplementary materials" and that every judgment "cites the specific passage from the paper that supports it." This is important. If the AI's RoB 2 judgment can be traced to specific text evidence in the paper, I can audit it. That is methodologically defensible. If it cannot, it is a black box. The copy asserts auditability without demonstrating it, but at least it raises the right criterion.

The Cochrane-Methodology Search Strategy section is precise enough to be held accountable: "Queries include MeSH terms with explosion, field tag specifications ([tiab], [MeSH Terms], [Subheading]), proximity operators where appropriate, and year filters." "A medical information specialist reviewing your search strategy will find it constructed correctly." That is a falsifiable claim. I can test it.

What I still do not know: How does the AI handle ambiguous study designs? What happens when a paper is mislabeled in its abstract as an "RCT" but is actually a quasi-experimental study? Does the tool catch that? What is the false positive rate on inclusion decisions during triple-agent screening? What is the false negative rate — papers the AI excludes that a human reviewer would include? These are the numbers that determine whether I can trust this for publication-grade work.

### Covidence Comparison: 8/10

The comparison is direct and honest: "Covidence, the current institutional standard for systematic review screening, costs approximately $160 USD per month for individual researchers — roughly ₹13,500. ScholarSync Pro costs ₹1,999 and includes capabilities Covidence does not have."

I want to push back on the $160/month figure. My individual Covidence subscription is $49/month (unlimited reviews, annual billing). The institutional rate is higher. The pricing page figure may be accurate for certain subscription types but is potentially misleading for researchers like me on the individual plan. This is a minor inaccuracy but worth noting.

The substantive point — that Covidence does not include integrated writing, citation management, or a search engine — is accurate. Covidence is a screening and data extraction tool. I use it alongside PubMed, Zotero, Rayyan, and Word. If ScholarSync genuinely integrates all of these without sacrificing the methodological rigor of the dedicated tools, that is a significant workflow argument.

The comparison table's claim that full-text RoB assessment per RCT takes "Under 5 minutes per paper" with ScholarSync versus "30-60 minutes per paper; two independent reviewers required" manually is interesting. If the automated RoB 2 is accurate and auditable, 5 minutes per paper versus 30-60 minutes per paper is not a marginal gain — it is a structural change in what it costs to do a rigorous systematic review.

### Red Flags: 1 flag

**Flag 1:** The synthesis example includes this: "A 2023 Cochrane review synthesising 12 RCTs confirmed these findings with low heterogeneity (I² = 14%)." This is presented as if ScholarSync generated it. If ScholarSync's AI synthesis is producing these specific figures from its own analysis of the retrieved papers, that is extraordinary. If it is retrieving and displaying a published synthesis, that is useful but less impressive. The copy does not clarify which it is. The distinction matters enormously for how I evaluate the tool's capabilities.

I also note that the copy says the synthesis "links to the specific papers it draws from." That is the right design decision. Any synthesis that does not show its sources is worthless to a researcher.

### Professional Utility: 9/10

The highest professional utility rating of any copy, because this one addresses my actual workflow problems rather than a junior resident's problems. The step-by-step time comparison in the methodology table maps precisely to where I lose time on systematic reviews. The SGLT2i example makes the output concrete and evaluable.

If this tool delivers what the demonstration promises — a correctly structured MeSH-Boolean query, ranked results that surface EMPEROR-Reduced and DAPA-HF at the top, a synthesis with actual effect sizes and heterogeneity estimates, and an auditable RoB 2 assessment — I would use it for every review.

### Would You Switch? 7/10

Genuinely interested. This copy addresses my concerns more directly than any other. I would want to see one complete review through the tool before switching, specifically testing: (1) the search strategy output against what I would construct manually, (2) the RoB 2 assessment against my own domain-level judgments on the same papers, and (3) whether the methods section output passes peer review at a cardiology journal without requiring extensive manual revision.

---

---

## COPY C — Wiebe-Kennedy Framework

---

### Methodological Accuracy: 6/10

Copy C is accurate at the surface level but thin in methodological depth. The PRISMA mention is correct. The triple-agent screening description matches Copy A and B. The RoB 2 five-domain framework is correctly cited.

The Covidence pricing claim is the most egregious error in this copy: "Covidence for systematic reviews costs $3,500 per review, for a tool built for Western institutions with Western pricing."

This is factually wrong. Covidence's single-review access costs $49. The institutional plan starts at $349/year. There is no individual pricing that reaches $3,500 per review. A researcher who pays for Covidence — like me — reads this and immediately distrusts everything else the copy says. This is a basic fact-check failure on a directly testable claim.

Everything else in the copy is accurate, but this one error is significant enough to damage credibility with the specific audience that most needs to find Copy C persuasive — experienced researchers evaluating a Covidence replacement.

The quote from the STROBE criteria mention ("CARE guidelines," "STROBE criteria," "CONSORT") in the FAQ is accurate and appreciated — it suggests the tool knows that different study types have different reporting standards. That is methodologically correct. A tool that applied CONSORT criteria to a case report or CARE guidelines to an RCT would be useless.

### Technical Sophistication: 5/10

Copy C is written for junior residents facing their first paper. The "you know exactly what this feels like" framing assumes a reader who is overwhelmed by 847 PubMed results, unsure what PRISMA means, and afraid to ask their guide for help.

That is not me. My problems are not "what is PRISMA" — I could write the PRISMA 2020 guidance from memory. My problems are: (1) how do I defend AI-assisted screening in my Methods section, (2) does the automated RoB 2 catch the kinds of methodological weaknesses that a trained Cochrane reviewer would flag, and (3) is the search comprehensiveness equivalent to a manually constructed strategy reviewed by a medical librarian?

Copy C does not address any of these. It is well-targeted for its audience. Its audience is not me.

### Transparency: 4/10

The least transparent of the five copies. The feature descriptions are accurate but surface-level. "Three independent AI agents screen each one against your criteria" — I want to know: what constitutes a "disagreement" threshold? Is it any divergence, or disagreement between at least two agents? What reasoning does each agent provide? Is the reasoning visible to the researcher, or just the include/exclude decision?

The copy says the PRISMA flow diagram "generates in real time." That is a useful feature. It does not tell me whether the excluded-with-reasons documentation is granular enough to satisfy a journal reviewer who wants to know precisely why 234 papers were excluded at abstract screening.

The "Not for Everyone" section (Section 6) is actually a transparency-adjacent move I respect — it explicitly calls out who the tool is and is not for. That is honest. But the copy does not extend that honesty to explaining the tool's limitations within its intended use case.

### Covidence Comparison: 3/10

The $3,500 pricing error is disqualifying for this criterion. Any researcher who knows what Covidence actually costs reads that figure and stops trusting the comparison. The right number is $49 for a single-review individual plan, or $349/year for unlimited reviews — and these should be compared to ScholarSync's equivalent tiers.

Beyond the factual error, the comparison is framed as a cost argument rather than a capability argument. For me, cost is not the primary concern. I can justify $49/month if the tool is better. What I want to know is: is ScholarSync's systematic review methodology as defensible to a peer reviewer as Covidence's? Copy C does not address this.

### Red Flags: 2 flags

**Flag 1:** The Covidence $3,500 figure is simply wrong. See above.

**Flag 2:** "PRISMA-compliant in one click." PRISMA compliance is not something achieved with a click. It is a 27-item checklist that requires substantive methodological decisions throughout the review process. "One click" suggests a misunderstanding of what PRISMA compliance requires, or a deliberately misleading simplification.

### Professional Utility: 4/10

Low for my needs. This copy would be useful if I were a junior resident writing my first systematic review. It does not give me the information I need to evaluate whether this tool belongs in my workflow as a post-doctoral researcher.

The feature set described (if accurate) is genuinely useful. The copy simply does not speak to how I would use it.

### Would You Switch? 2/10

Not based on this copy alone. The pricing error would make me distrust the rest of the claims enough to investigate independently before making any decision.

---

---

## COPY D — Deep Work Framework

---

### Methodological Accuracy: 8/10

Copy D earns its accuracy marks through methodological specificity that goes beyond other copies. The evidence hierarchy classification section includes this: "When study design is ambiguous, ScholarSync flags the paper for manual review rather than misclassifying it." That is the correct methodological response to uncertainty. A tool that confidently misclassifies is dangerous. A tool that acknowledges ambiguity and escalates is trustworthy. This sentence tells me someone thought through the failure modes.

The triple-agent screening description in Section 6 includes: "Consensus algorithm: unanimous results proceed automatically; any disagreement triggers human review." This is the same claim as other copies, but the framing in Copy D is more methodologically aware — it frames disagreement as the meaningful signal, not just a flag.

The MeSH query reformulation section correctly notes "explosion terms" — a specific PubMed feature where a MeSH term search automatically includes narrower terms in the hierarchy. Including this detail suggests genuine PubMed expertise, not surface familiarity.

The accuracy gap: the copy's Covidence pricing comparison states "$148 USD per year per user for a basic license." I cannot verify this figure precisely — Covidence pricing has changed over the years and varies by subscription type. It is in the right range for some institutional configurations but may not be accurate for individual researchers. This is less egregious than Copy C's error but still imprecise.

### Technical Sophistication: 10/10

The highest rating of any copy on this criterion, and it is not close.

Copy D speaks directly to the cognitive science of research practice, and it does so accurately. The Sophie Leroy attention residue research is real (though I note the copy attributes it to "University of Washington" in one place and "University of Minnesota" in another — that is a factual inconsistency; Leroy has been at both institutions at different career stages, but a careful editor would make this consistent). The 23-minute recovery time figure for task-switching is consistent with published cognitive psychology research.

The Newport deliberate practice framing in the Learn Mode section is sophisticated and accurate: "The neural circuits that make a researcher capable of sustained analytical engagement...are maintained and strengthened through use. They deteriorate through disuse." This is a legitimate application of Ericsson's deliberate practice research to research skill development. It is not hand-waving — it is a real mechanism applied to a real problem.

The craftsman approach to tool selection is the most intellectually honest framework any of the five copies uses to evaluate the tool itself. The Any-Benefit Mindset critique is a genuine and important observation about how researchers accumulate tool stacks without evaluating their cognitive cost. I am guilty of this. I have fourteen browser bookmarks for academic databases. I have two reference managers with different paper collections in each, for reasons I could not fully explain.

What makes Copy D technically sophisticated is that it uses ideas, not just vocabulary. The other copies drop "MeSH" and "RoB 2" as credibility signals. Copy D builds an actual argument using cognitive science, methodological vocabulary, and a specific theory of what makes research good. I do not agree with every claim, but I respect the argument.

### Transparency: 7/10

Copy D is transparent about its design philosophy — what it is trying to do and why — more than any other copy. The Learn Mode discussion is the most transparent treatment of AI's role in research across all five copies: it explicitly names the risk of AI delegation (skill atrophy), explains why Learn Mode was designed to avoid it, and makes a verifiable claim about the AI's behaviour ("Ask it to write your introduction, and it responds...").

The technical transparency on the search and screening tools is adequate but not exceptional. I still do not know the false positive and false negative rates for AI screening. I do not know what "under 5 minutes per paper" for RoB 2 means in terms of accuracy. The tool's limitations are not discussed.

The five-year trajectory thought experiment in Section 7 is intellectually honest in a way that many AI research tools are not: it explicitly names the risk of AI delegation as a career-level concern, not just a paper-level concern. "The researcher who delegates her literature synthesis to an AI for two years has not become more efficient. She has become less capable of doing it herself." That is a claim that most AI tools would never make, because it cuts against their value proposition. ScholarSync's Learn Mode is the answer to that concern, and the copy makes the argument clearly.

### Covidence Comparison: 7/10

The comparison here is the most honest framing of any copy: "Pro is not a comparison to Covidence. It is a replacement of it, and of everything else in the stack, at a lower combined cost." That is the right argument. I do not just pay for Covidence — I pay for Covidence, Rayyan, Zotero, and the time I spend managing the integrations between them. If ScholarSync genuinely replaces the stack, the cost comparison is not ₹2,000 versus Covidence's rate. It is ₹2,000 versus everything.

The specific Covidence pricing figure ($148 USD per year) is lower than what I actually pay, but the directional argument is sound.

What I note is absent: Copy D does not address whether ScholarSync's screening audit trail is as complete as Covidence's. Covidence maintains a full record of every reviewer's decision and every conflict resolution, which is the standard I would need to cite in a Methods section. Does ScholarSync? The copy does not say.

### Red Flags: 1 flag

**Flag 1:** The Sophie Leroy institution inconsistency (Washington vs. Minnesota). A small detail, but in a copy that builds its credibility on intellectual precision, inconsistencies in attributed facts are noticed.

Otherwise, Copy D is the cleanest of the five copies in terms of claims I would challenge. The Newport framework is applied accurately. The cognitive science citations are real. The methodological vocabulary is used correctly.

### Professional Utility: 8/10

The utility argument Copy D makes is the most compelling for a researcher like me. Not "it is faster" — every tool claims to be faster. The argument is: tool switching imposes a cognitive tax that degrades the quality of the thinking you do within each tool session, and eliminating tool switching increases the depth of research you can achieve. That is a genuine insight, applied to a real workflow problem.

For my systematic review workflow specifically: I do not just lose time to tool switching. I lose cognitive continuity. When I am in Covidence screening abstracts and need to check a paper's full text in a separate database while simultaneously deciding on inclusion criteria while having my inclusion/exclusion rationale document open in another tab — I lose the thread. I lose the holistic sense of the evidence base I am building. A unified workspace where all of these live together is not just more efficient. It is structurally more conducive to good judgment.

### Would You Switch? 7/10

Copy D makes me want to evaluate the tool on its own terms. The intellectual framing earns trust. The methodological vocabulary is used accurately. The Learn Mode argument addresses a genuine concern I have about AI tools in research. The craftsman framework gives me a principled way to evaluate the switch, rather than just a cost comparison.

I would trial this. I would test the search quality against my own manual queries. I would evaluate the RoB 2 output against my own assessments of the same papers. If it passes those tests, I would consider switching.

---

---

## COPY E — Collier Emotional Arc

---

### Methodological Accuracy: 6/10

Copy E's methodological claims are accurate where they appear, but they appear less frequently than in other copies. The PRISMA 2020 description is correct. The RoB 2 five-domain framework is correctly cited. The triple-agent screening description is consistent with other copies.

The hero copy mentions "Nobody showed you how to frame a PICO question. Nobody explained what makes a MeSH term effective. Nobody walked you through a PRISMA flow diagram or told you what evidence level means when you're reading a PubMed result." This is accurate as a description of the problem and implicitly accurate as a description of the tool's scope.

What concerns me: the testimonial from "Dr. Priya Menon, MD Resident, Internal Medicine, JIPMER" claims she "built a complete literature review in 2 weeks" and her guide called it "the most thorough systematic review he'd seen from a first-year PG." I am a post-doc at JIPMER. I know what a thorough systematic review looks like. A complete literature review and a complete systematic review are different things. If a first-year PG at JIPMER produced a genuinely rigorous systematic review in 2 weeks, that would be remarkable enough that I would have heard about it. The testimonial reads as aspirational rather than verified.

### Technical Sophistication: 4/10

Copy E is written for the emotional centre of the target audience — the frightened, exhausted junior resident at 11 PM, three days before a guide meeting, with nothing to show. It is masterfully written for that reader. I am not that reader.

The technical vocabulary in Copy E is present but decorative. PICO, MeSH, PRISMA, RoB 2 appear as symbols of credibility rather than as concepts being explained or defended. The copy trusts the words to do the work rather than the arguments.

The "Victory Scene" (Section 7) is well-written as emotional copy. It is completely useless to me as a researcher evaluating a tool. I am not making purchase decisions based on imagined moments of approval from a supervisor. I am making them based on whether the methods output will survive peer review at a cardiology journal.

### Transparency: 3/10

The lowest transparency rating of any copy. The emotional arc prioritises feeling over mechanism. I understand why — for the target audience, how the tool makes them feel is central to adoption. For me, it is almost entirely irrelevant.

The critical transparency gap: how does the AI make its screening decisions? What does the Learn Mode AI's Socratic questioning actually look like in practice? What happens when the RoB 2 automation disagrees with my domain judgment? None of these are addressed. The copy assumes I will trust the output, which is exactly what a methodologically sophisticated researcher will not do.

The AI humanisation feature (mentioned briefly under Pro Plan) is described without any acknowledgment of what it is actually doing. "AI humanization: light, medium, and heavy" — light and heavy what, exactly? What is being changed? Copy E treats this as a feature, where a more transparent copy would explain the mechanism and acknowledge the ethical complexity of making AI-generated text harder to detect.

### Covidence Comparison: 5/10

"Covidence — the tool most post-docs use for systematic reviews — costs multiples of this." This is vague and, for the individual researcher pricing I use, imprecise. "Multiples" covers a wide range. The comparison does not provide Covidence's actual price, which is the kind of specificity that builds trust with a researcher who already knows the Covidence cost.

The one useful comparison: "And it doesn't have an integrated writing editor, or Learn Mode, or AI detection, or multi-format export." This is accurate. Covidence's value proposition is specifically screening and data extraction. The integrated workspace argument is valid.

### Red Flags: 2 flags

**Flag 1:** "ScholarSync researchers average 18 days for a complete literature review." This is stated as a fact, not a claim. "That is not a marketing claim. That is what happens when the infrastructure of research is handled correctly." If you tell me that is not a marketing claim in your marketing copy, my trust decreases rather than increases. Where does the 18-day figure come from? What is the sample? What counts as "complete"? The aggressive assertion of credibility where evidence is absent is a persuasion technique that sophisticated readers recognise and distrust.

**Flag 2:** The testimonial from Dr. Rohit Sharma at NIMHANS: "I rebuilt my entire literature review in 9 days — proper PRISMA flow diagram, evidence table, everything." A "proper PRISMA flow diagram" for a systematic review that was rebuilt in 9 days, from 200 downloaded papers that had no prior synthesis structure, would require specific documentation at every stage. It is possible. But the testimonial reads like a marketing artefact. Real researchers describing real experiences tend to be more specific about what was hard, what didn't work, and what required manual intervention.

### Professional Utility: 4/10

Minimal for my level. The emotional arc is well-constructed but addresses the wrong reader. The "Victory Scene" of a supervisor saying "This is thorough work" is not my motivating goal — having a systematic review that survives peer review at a cardiology journal and contributes something to the evidence base is my motivating goal. Those require different things from a tool.

The step-by-step pathway (Research, Synthesise, Write, Review, Export) is useful for understanding the tool's scope. But the emotional framing around each step crowds out the technical information I need.

### Would You Switch? 2/10

Not based on this copy. This is excellent copy for junior residents and not useful to me. If I were recommending a tool to a first-year PG student who needed to publish a case report, I might show them this. I would not use it to make my own decisions.

---

---

## FINAL RANKING — Best to Worst FOR ME

---

### Rank 1: COPY B — Ogilvy-Hopkins

Copy B is the copy that treats me as a peer. The SGLT2i search demonstration with real trial data, real effect sizes, and real confidence intervals is the closest any copy comes to showing me actual tool output I can evaluate. The methodology table is the most professionally useful comparison I have seen. The factual proof approach trusts my ability to evaluate evidence without emotional manipulation.

The Covidence pricing imprecision and the unanswered questions about AI screening false-negative rates prevent a perfect score, but this is the copy that most nearly addresses my actual decision-making criteria.

### Rank 2: COPY D — Deep Work

Copy D is the most intellectually sophisticated copy. The attention residue argument is real, accurately applied, and addresses a genuine workflow problem that I experience but do not always articulate. The craftsman approach to tool selection gives me a principled framework for making the switch decision. The Learn Mode discussion is the most honest treatment of AI's role in research that any copy attempts.

It falls behind Copy B because it is stronger on philosophy than on methodology. I trust it as a worldview argument. I need more methodological specificity to trust it as a tool claim.

### Rank 3: COPY A — Schwartz-Halbert

Copy A earns its third-place ranking through methodological accuracy and the most detailed feature descriptions of any copy. The RoB 2 domain breakdown is correct. The triple-agent screening is well-described. The explicit Covidence comparison is useful.

It falls below the top two because its primary audience is PG students, not post-docs. The emotional hook (400 PubMed results, blank Word document) is not my hook. The overconfident "It will pass" claim in the PRISMA section damages trust. The transparency is insufficient for the sophistication of claims being made.

### Rank 4: COPY E — Collier Emotional Arc

Copy E is excellent copy for its intended audience. It is not useful to me. The 18-day average claim without sourcing, the aspirational testimonials, and the near-total absence of mechanistic explanation make this copy unpersuasive for a researcher who evaluates claims rather than feelings.

It ranks above Copy C because the methodology it does mention is accurate, the JIPMER testimonial (whatever its provenance) at least targets the right institution context, and there are no egregious factual errors equivalent to the Covidence mispricing.

### Rank 5: COPY C — Wiebe-Kennedy

The $3,500 Covidence pricing error disqualifies Copy C from serious consideration by any researcher who knows what Covidence costs. This is not a minor imprecision — it is an order of magnitude wrong relative to individual researcher pricing. Any copy that gets this fact wrong cannot be trusted on methodology claims. The copy is otherwise competent for its target audience, but the factual error is disqualifying.

---

---

## SINGLE STRONGEST TECHNICAL CLAIM ACROSS ALL 5 COPIES

---

**Copy B, Section 4 — The SGLT2i MeSH Boolean Query Demonstration:**

`("Sodium-Glucose Transporter 2 Inhibitors"[MeSH Terms] OR "SGLT2 inhibitor*"[tiab]) AND ("Heart Failure"[MeSH Terms] AND "reduced ejection fraction"[tiab]) AND ("2015"[PDat]:"2026"[PDat])`

This is the strongest technical claim because it is a real, testable, correct PubMed query. I could run this query right now and evaluate whether ScholarSync produces equivalent output. The use of correct field tags, proper Boolean syntax, and the inclusion of both MeSH term and title/abstract variants for SGLT2 inhibitors (to catch papers published before the MeSH term was indexed) shows genuine PubMed expertise. Paired with accurate trial data (EMPEROR-Reduced HR 0.75, 95% CI 0.65-0.86; DAPA-HF HR 0.74, 95% CI 0.65-0.85) and a plausible I-squared value, this demonstration is the single most credible technical moment in any of the five copies.

It earns the title of "strongest" because it is falsifiable, domain-specific, and would be immediately caught as wrong by any cardiologist who runs the same search. The copy made itself accountable to expertise, which is exactly what serious technical copy should do.

---

## SINGLE WEAKEST TECHNICAL CLAIM ACROSS ALL 5 COPIES

---

**Copy C, Pricing Section — "Covidence for systematic reviews costs $3,500 per review":**

This is factually incorrect by one to two orders of magnitude depending on which pricing tier you compare against. The individual single-review access costs $49. The annual unlimited plan costs $349. There is no standard individual Covidence pricing that approaches $3,500.

It earns the title of "weakest" not just because it is wrong, but because it is wrong in a way that is immediately detectable by the audience most likely to convert: post-docs and researchers who already pay for Covidence and are evaluating whether to switch. These are precisely the readers who know the real price, and precisely the readers who will conclude that a copy that gets this fact wrong cannot be trusted on the technical claims that matter more.

Methodological hand-waving is forgivable — it is an error of omission. Factual mispricing is an error of commission. One suggests incomplete knowledge. The other suggests carelessness with facts. In research methodology, carelessness with facts is the cardinal sin.

---

---

## SUMMARY SCORECARD

| Criterion | Copy A | Copy B | Copy C | Copy D | Copy E |
|---|---|---|---|---|---|
| Methodological Accuracy | 7 | 9 | 6 | 8 | 6 |
| Technical Sophistication | 6 | 9 | 5 | 10 | 4 |
| Transparency | 5 | 8 | 4 | 7 | 3 |
| Covidence Comparison | 7 | 8 | 3 | 7 | 5 |
| Red Flags (fewer = better) | 2 flags | 1 flag | 2 flags | 1 flag | 2 flags |
| Professional Utility | 7 | 9 | 4 | 8 | 4 |
| Would You Switch? | 5 | 7 | 2 | 7 | 2 |
| **Overall FOR ME** | **Rank 3** | **Rank 1** | **Rank 5** | **Rank 2** | **Rank 4** |

---

## WHAT THE COPY-WRITER NEEDS TO KNOW

**What works for a researcher at my level:**

1. Show me a real search. Copy B does this. It is the most persuasive thing in any of the five copies. Show me a PubMed query I would actually construct and let me evaluate whether the syntax is right. If it is, I trust the tool.

2. Tell me the failure modes. No tool has a 100% sensitivity for literature retrieval. No AI screening process has zero false negatives. The tool that tells me its limitations earns more trust than the tool that claims it will "pass" every committee review. I do not need perfection. I need to know what I am working with.

3. Distinguish what the AI does from what I must do. In a systematic review Methods section, I need to describe what was automated and what required human judgment. Copy B comes closest to making this distinction clear. The others treat automation as a selling point without acknowledging that some methodological decisions must remain mine.

4. Address the auditability question directly. Covidence's key advantage is not features — it is an established, auditable record that peer reviewers and journal editors recognise and accept. ScholarSync needs to demonstrate that its screening record, its PRISMA documentation, and its RoB 2 assessments are equally auditable and equally citable. None of the five copies makes this case fully.

5. The Learn Mode is genuinely differentiated. As a supervisor of junior researchers, the existence of a Socratic AI that refuses to write for students is more valuable than almost anything else described. I would pay for it for my juniors alone, independent of whether I use the systematic review features myself. This case is best made in Copy D and should be made more explicitly in any copy targeting research supervisors.

**What to stop doing:**

- Stop claiming PRISMA compliance will definitely "pass." It will not always, and making that claim sets up a trust failure when it does not.
- Stop comparing to $3,500/review Covidence pricing. Fix this immediately. Any researcher who pays for Covidence reads that number and stops reading.
- Stop treating "triple-agent AI screening" as self-evidently defensible without addressing how it maps to Cochrane's evolving guidance on human-AI collaboration in systematic reviews. The guidance is developing. Acknowledge it.
- Stop using "methodologically equivalent" for AI-human comparisons. It is not equivalent. It is potentially defensible as a first-pass tool with human oversight. Make that claim instead — it is more accurate and more honest.

---

*Dr. Vikram Rao*
*Post-Doctoral Researcher, Cardiology*
*JIPMER, Puducherry*
*February 2026*
