"use client";
import { useEffect, useState } from "react";
import { toRomaji } from "wanakana";
import {
  dakutenHiragana,
  dakutenKatakana,
  handakutenHiragana,
  handakutenKatakana,
  hiragana,
  hiraganaDigraphs,
  katakana,
  katakanaDigraphs,
} from "@/data/kana";
import KanaTable from "./KanaTable";

export default function KanaPage() {
  const [kanaInput, setKanaInput] = useState("");
  const [currentKana, setCurrentKana] = useState<string>("あ");

  const [selectedKana, setSelectedKana] = useState<(string | null)[]>([]);

  const noKanaSelected = selectedKana.length === 0;
  const currentKanaRomaji = toRomaji(currentKana);
  const inputMistake = !currentKanaRomaji.startsWith(kanaInput);

  useEffect(() => {
    if (selectedKana.length === 0) return;

    localStorage.setItem("selectedKana", JSON.stringify(selectedKana));
  }, [selectedKana]);

  useEffect(() => {
    const defaultKana = localStorage.getItem("selectedKana");
    if (defaultKana) {
      setSelectedKana(JSON.parse(defaultKana));
    }
  }, []);

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
            "border p-1 text-center " +
            (inputMistake ? "border-red-500 " : "mb-10") +
            (noKanaSelected ? "opacity-20 cursor-not-allowed" : "")
          }
        />
        {inputMistake && (
          <span className="text-red-500 mb-2">
            {currentKana} = {toRomaji(currentKana)}
          </span>
        )}
        {noKanaSelected && (
          <span className="mb-2">Please select at least one kana.</span>
        )}
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="flex flex-wrap gap-4 items-start justify-center">
            <KanaTable
              selectedKana={selectedKana}
              onKanaSelect={handleKanaSelect}
              kanaOptions={hiragana}
              heading="Hiragana"
            />
            <div className="flex flex-col gap-2">
              <KanaTable
                selectedKana={selectedKana}
                onKanaSelect={handleKanaSelect}
                kanaOptions={dakutenHiragana}
                heading="Dakuten Hiragana"
              />
              <KanaTable
                selectedKana={selectedKana}
                onKanaSelect={handleKanaSelect}
                kanaOptions={handakutenHiragana}
                heading="Handakuten Hiragana"
              />
            </div>
            <KanaTable
              selectedKana={selectedKana}
              onKanaSelect={handleKanaSelect}
              kanaOptions={hiraganaDigraphs}
              heading="Hiragana Digraphs"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-start justify-center">
            <KanaTable
              selectedKana={selectedKana}
              onKanaSelect={handleKanaSelect}
              kanaOptions={katakana}
              heading="Katakana"
            />
            <div className="flex flex-col gap-2">
              <KanaTable
                selectedKana={selectedKana}
                onKanaSelect={handleKanaSelect}
                kanaOptions={dakutenKatakana}
                heading="Dakuten Katakana"
              />
              <KanaTable
                selectedKana={selectedKana}
                onKanaSelect={handleKanaSelect}
                kanaOptions={handakutenKatakana}
                heading="Handakuten Katakana"
              />
            </div>
            <KanaTable
              selectedKana={selectedKana}
              onKanaSelect={handleKanaSelect}
              kanaOptions={katakanaDigraphs}
              heading="Katakana Digraphs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
