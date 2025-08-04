import { hiragana } from "@/data/kana";
import { useState } from "react";
import KanaTableRow from "./KanaTableRow";

export default function KanaTable() {
  const [selectedKana, setSelectedKana] = useState<string[]>([]);

  return (
    <table>
      <tbody>
        {hiragana.map((row, rowIndex) => (
          <KanaTableRow key={rowIndex} kana={row} />
        ))}
      </tbody>
    </table>
  );
}
