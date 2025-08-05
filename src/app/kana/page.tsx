"use client";
import { useState } from "react";
import { toRomaji } from "wanakana";
import { hiragana } from "@/data/kana";
import KanaTable from "./KanaTable";

export default function KanaPage() {
  const [kanaInput, setKanaInput] = useState("");
  const [currentKana, setCurrentKana] = useState<string>("あ");
  const [selectedKana, setSelectedKana] = useState<(string | null)[]>(
    hiragana[0]
  );

  const noKanaSelected = selectedKana.length === 0;
  const currentKanaRomaji = toRomaji(currentKana);
  const inputMistake = !currentKanaRomaji.startsWith(kanaInput);

  function handleKanaSelect(kana: (string | null)[]) {
    if (selectedKana.includes(kana[0])) {
      setSelectedKana(selectedKana.filter((k) => !kana.includes(k)));
    } else {
      setSelectedKana([...selectedKana, ...kana]);
    }
  }

  function handleKanaInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setKanaInput(input);

    if (currentKanaRomaji === input) {
      nextKana();
      setKanaInput("");
    }
  }

  function nextKana() {
    const hiraganaWithoutNulls = selectedKana.flat().filter((k) => k !== null);
    const hiraganaWithoutCurrent = hiraganaWithoutNulls.filter(
      (k) => k !== currentKana
    );

    if (hiraganaWithoutCurrent.length === 0) {
      setCurrentKana("あ");
      return;
    }

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
          disabled={noKanaSelected}
          className={
            "border p-1 text-center" +
            (inputMistake ? " border-red-500" : "") +
            (noKanaSelected ? " opacity-20 cursor-not-allowed" : "")
          }
        />
        {inputMistake && (
          <span className="text-red-500 mb-2">
            {currentKana} = {toRomaji(currentKana)}
          </span>
        )}
        {noKanaSelected && (
          <span className="mb-2 text-xs">Please select at least one kana.</span>
        )}
        <KanaTable
          selectedKana={selectedKana}
          onKanaSelect={handleKanaSelect}
        />
      </div>
    </div>
  );
}
