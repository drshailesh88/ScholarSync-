declare module "write-good" {
  interface WriteGoodResult {
    index: number;
    offset: number;
    reason: string;
  }

  interface WriteGoodOptions {
    passive?: boolean;
    illusion?: boolean;
    so?: boolean;
    thereIs?: boolean;
    weasel?: boolean;
    adverb?: boolean;
    tooWordy?: boolean;
    cliches?: boolean;
    eprime?: boolean;
  }

  function writeGood(
    text: string,
    options?: WriteGoodOptions
  ): WriteGoodResult[];

  export default writeGood;
}
