"use client";
import { useState } from "react";
import { toRomaji } from "wanakana";
import { hiragana } from "@/data/kana";

export default function KanaPage() {
  const [kanaInput, setKanaInput] = useState("");
  const [currentKana, setCurrentKana] = useState<string>("あ");

  const currentKanaRomaji = toRomaji(currentKana);
  const inputMistake = !currentKanaRomaji.startsWith(kanaInput);

  function handleKanaInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setKanaInput(input);

    if (currentKanaRomaji === input) {
      nextKana();
      setKanaInput("");
    }
  }

  function nextKana() {
    const hiraganaWithoutNulls = hiragana.flat().filter((k) => k !== null);
    const hiraganaWithoutCurrent = hiraganaWithoutNulls.filter(
      (k) => k !== currentKana
    );
    const randomKana =
      hiraganaWithoutCurrent[
        Math.floor(Math.random() * hiraganaWithoutCurrent.length)
      ];

    setCurrentKana(randomKana);
  }

  return (
    <div>
      <div className="flex flex-col items-center mb-4 gap-2">
        <span className="text-xl" title={toRomaji(currentKana)}>
          {currentKana}
        </span>
        <input
          type="text"
          value={kanaInput}
          onChange={handleKanaInputChange}
          className="border p-1 text-center"
        />
        {inputMistake && (
          <span className="text-red-500 mb-2">
            {currentKana} = {toRomaji(currentKana)}
          </span>
        )}
      </div>
    </div>
  );
}
