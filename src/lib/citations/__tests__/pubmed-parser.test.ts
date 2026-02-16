import { describe, it, expect } from "vitest";
import { parsePubMedXml } from "../pubmed-parser";

const sampleXml = `<PubmedArticleSet>
<PubmedArticle>
  <MedlineCitation>
    <PMID>12345678</PMID>
    <Article>
      <ArticleTitle>Effect of Drug X on Disease Y</ArticleTitle>
      <Abstract><AbstractText>This study examines the effect of Drug X.</AbstractText></Abstract>
      <AuthorList>
        <Author><LastName>Smith</LastName><ForeName>John</ForeName></Author>
        <Author><LastName>Doe</LastName><ForeName>Jane</ForeName></Author>
      </AuthorList>
      <Journal>
        <ISOAbbreviation>N Engl J Med</ISOAbbreviation>
        <JournalIssue>
          <Volume>389</Volume>
          <Issue>12</Issue>
          <PubDate><Year>2023</Year></PubDate>
        </JournalIssue>
      </Journal>
      <ELocationID EIdType="doi">10.1056/NEJMoa2301422</ELocationID>
      <Pagination><MedlinePgn>1089-1098</MedlinePgn></Pagination>
    </Article>
  </MedlineCitation>
</PubmedArticle>
</PubmedArticleSet>`;

describe("parsePubMedXml", () => {
  it("parses a complete article", () => {
    const refs = parsePubMedXml(sampleXml, "doc_1");
    expect(refs).toHaveLength(1);
    const ref = refs[0];
    expect(ref.title).toBe("Effect of Drug X on Disease Y");
    expect(ref.pmid).toBe("12345678");
    expect(ref.doi).toBe("10.1056/NEJMoa2301422");
    expect(ref.year).toBe(2023);
    expect(ref.journal).toBe("N Engl J Med");
    expect(ref.volume).toBe("389");
    expect(ref.issue).toBe("12");
    expect(ref.pages).toBe("1089-1098");
    expect(ref.documentId).toBe("doc_1");
    expect(ref.type).toBe("article");
  });

  it("extracts authors correctly", () => {
    const refs = parsePubMedXml(sampleXml, "doc_1");
    expect(refs[0].authors).toHaveLength(2);
    expect(refs[0].authors[0]).toEqual({ given: "John", family: "Smith" });
    expect(refs[0].authors[1]).toEqual({ given: "Jane", family: "Doe" });
  });

  it("extracts abstract", () => {
    const refs = parsePubMedXml(sampleXml, "doc_1");
    expect(refs[0].abstract).toBe("This study examines the effect of Drug X.");
  });

  it("returns empty array for empty XML", () => {
    expect(parsePubMedXml("", "doc_1")).toEqual([]);
    expect(parsePubMedXml("<PubmedArticleSet></PubmedArticleSet>", "doc_1")).toEqual([]);
  });

  it("parses multiple articles", () => {
    const multiXml = `<PubmedArticleSet>
<PubmedArticle><MedlineCitation><PMID>111</PMID><Article><ArticleTitle>Paper A</ArticleTitle><AuthorList><Author><LastName>A</LastName><ForeName>B</ForeName></Author></AuthorList><Journal><ISOAbbreviation>J1</ISOAbbreviation><JournalIssue><PubDate><Year>2020</Year></PubDate></JournalIssue></Journal></Article></MedlineCitation></PubmedArticle>
<PubmedArticle><MedlineCitation><PMID>222</PMID><Article><ArticleTitle>Paper B</ArticleTitle><AuthorList><Author><LastName>C</LastName><ForeName>D</ForeName></Author></AuthorList><Journal><ISOAbbreviation>J2</ISOAbbreviation><JournalIssue><PubDate><Year>2021</Year></PubDate></JournalIssue></Journal></Article></MedlineCitation></PubmedArticle>
</PubmedArticleSet>`;
    const refs = parsePubMedXml(multiXml, "doc_2");
    expect(refs).toHaveLength(2);
    expect(refs[0].title).toBe("Paper A");
    expect(refs[1].title).toBe("Paper B");
  });

  it("handles MedlineDate format", () => {
    const xml = `<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>333</PMID><Article><ArticleTitle>Old Paper</ArticleTitle><AuthorList><Author><LastName>Test</LastName><ForeName>T</ForeName></Author></AuthorList><Journal><ISOAbbreviation>J</ISOAbbreviation><JournalIssue><PubDate><MedlineDate>2019 Jan-Feb</MedlineDate></PubDate></JournalIssue></Journal></Article></MedlineCitation></PubmedArticle></PubmedArticleSet>`;
    const refs = parsePubMedXml(xml, "doc_3");
    expect(refs[0].year).toBe(2019);
  });

  it("extracts DOI from ArticleId when ELocationID absent", () => {
    const xml = `<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>444</PMID><Article><ArticleTitle>Paper C</ArticleTitle><AuthorList><Author><LastName>X</LastName><ForeName>Y</ForeName></Author></AuthorList><Journal><ISOAbbreviation>J</ISOAbbreviation><JournalIssue><PubDate><Year>2022</Year></PubDate></JournalIssue></Journal></Article></MedlineCitation><PubmedData><ArticleIdList><ArticleId IdType="doi">10.1234/test</ArticleId></ArticleIdList></PubmedData></PubmedArticle></PubmedArticleSet>`;
    const refs = parsePubMedXml(xml, "doc_4");
    expect(refs[0].doi).toBe("10.1234/test");
  });

  it("extracts PMCID", () => {
    const xml = `<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>555</PMID><Article><ArticleTitle>Paper D</ArticleTitle><AuthorList><Author><LastName>Z</LastName><ForeName>W</ForeName></Author></AuthorList><Journal><ISOAbbreviation>J</ISOAbbreviation><JournalIssue><PubDate><Year>2022</Year></PubDate></JournalIssue></Journal></Article></MedlineCitation><PubmedData><ArticleIdList><ArticleId IdType="pmc">PMC9876543</ArticleId></ArticleIdList></PubmedData></PubmedArticle></PubmedArticleSet>`;
    const refs = parsePubMedXml(xml, "doc_5");
    expect(refs[0].pmcid).toBe("PMC9876543");
  });

  it("cleans HTML from title and abstract", () => {
    const xml = `<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>666</PMID><Article><ArticleTitle>Effect of &amp; Drug &lt;X&gt;</ArticleTitle><Abstract><AbstractText>Results were &quot;significant&quot;</AbstractText></Abstract><AuthorList><Author><LastName>T</LastName><ForeName>R</ForeName></Author></AuthorList><Journal><ISOAbbreviation>J</ISOAbbreviation><JournalIssue><PubDate><Year>2022</Year></PubDate></JournalIssue></Journal></Article></MedlineCitation></PubmedArticle></PubmedArticleSet>`;
    const refs = parsePubMedXml(xml, "doc_6");
    // cleanHtml strips HTML-like tags (<X>) and decodes entities
    expect(refs[0].title).toBe("Effect of & Drug");
    expect(refs[0].abstract).toBe('Results were "significant"');
  });

  it("sets cslData fields correctly", () => {
    const refs = parsePubMedXml(sampleXml, "doc_1");
    const csl = refs[0].cslData;
    expect(csl.type).toBe("article-journal");
    expect(csl.title).toBe("Effect of Drug X on Disease Y");
    expect(csl.DOI).toBe("10.1056/NEJMoa2301422");
    expect(csl.PMID).toBe("12345678");
    expect(csl.issued).toEqual({ "date-parts": [[2023]] });
  });

  it("handles CollectiveName authors", () => {
    const xml = `<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>777</PMID><Article><ArticleTitle>Consortium Paper</ArticleTitle><AuthorList><Author><CollectiveName>WHO Working Group</CollectiveName></Author></AuthorList><Journal><ISOAbbreviation>J</ISOAbbreviation><JournalIssue><PubDate><Year>2023</Year></PubDate></JournalIssue></Journal></Article></MedlineCitation></PubmedArticle></PubmedArticleSet>`;
    const refs = parsePubMedXml(xml, "doc_7");
    expect(refs[0].authors[0].family).toBe("WHO Working Group");
  });
});
