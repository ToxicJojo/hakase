import wordsJson from "@/data/words.json";

export type Word = { display: string; meaning: string };

export const hiraganaWords: Word[] = wordsJson.words
  .filter((w) => w.furigana !== "")
  .map((w) => ({ display: w.furigana, meaning: w.meaning.split(/[;,]/)[0].replace(/^\d+\.\s*/, "").trim() }));

export const katakanaWords: Word[] = wordsJson.words
  .filter((w) => w.furigana === "" && /[ァ-ヿ]/.test(w.word))
  .map((w) => ({ display: w.word, meaning: w.meaning.split(/[;,]/)[0].replace(/^\d+\.\s*/, "").trim() }));
