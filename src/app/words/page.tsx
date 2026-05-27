"use client";
import { hiraganaWords, katakanaWords, Word } from "@/data/words";
import { useEffect, useState } from "react";
import { toRomaji } from "wanakana";

export default function Words() {
  const [scripts, setScripts] = useState<Set<"hiragana" | "katakana">>(
    new Set(["hiragana"]),
  );
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [input, setInput] = useState<string>("");

  const wordPool = [
    ...(scripts.has("hiragana") ? hiraganaWords : []),
    ...(scripts.has("katakana") ? katakanaWords : []),
  ];
  const currentWordRomaji = currentWord ? toRomaji(currentWord.display) : "";
  const inputMistake = !currentWordRomaji.startsWith(input);

  useEffect(() => {
    randomWord(wordPool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scripts]);

  function toggleScript(script: "hiragana" | "katakana") {
    setScripts((prev) => {
      const next = new Set(prev);
      if (next.has(script) && next.size > 1) {
        next.delete(script);
      } else {
        next.add(script);
      }
      return next;
    });
  }

  function randomWord(pool: Word[]) {
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setCurrentWord(pool[randomIndex]);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInput(value);

    if (currentWordRomaji === value) {
      randomWord(wordPool);
      setInput("");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-4 justify-center">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={scripts.has("hiragana")}
            onChange={() => toggleScript("hiragana")}
          />
          Hiragana
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={scripts.has("katakana")}
            onChange={() => toggleScript("katakana")}
          />
          Katakana
        </label>
      </div>
      <span title={currentWordRomaji}>
        {currentWord?.display}{" "}
        {currentWord && (
          <span className="text-gray-500">({currentWord.meaning})</span>
        )}
      </span>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className={
          "mt-2 p-1 border rounded " +
          (input && inputMistake ? "border-red-500" : "")
        }
      />
      {input && inputMistake && (
        <span className="text-red-500 mt-1">
          {currentWord?.display} = {currentWordRomaji}
        </span>
      )}
    </div>
  );
}
