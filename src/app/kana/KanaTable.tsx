import { hiragana } from "@/data/kana";
import KanaTableRow from "./KanaTableRow";

interface KanaTableProps {
  selectedKana: (string | null)[];
  onKanaSelect?: (kana: (string | null)[]) => void;
}

export default function KanaTable(props: KanaTableProps) {
  const { selectedKana, onKanaSelect } = props;

  return (
    <table className="w-full">
      <tbody>
        {hiragana.map((row, rowIndex) => (
          <KanaTableRow
            key={rowIndex}
            kana={row}
            selected={selectedKana.includes(row[0])}
            onSelect={() => onKanaSelect && onKanaSelect(row)}
          />
        ))}
      </tbody>
    </table>
  );
}
