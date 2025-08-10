import KanaTableRow from "./KanaTableRow";

interface KanaTableProps {
  selectedKana: (string | null)[];
  onKanaSelect: (kana: (string | null)[]) => void;
  kanaOptions: (string | null)[][];
  heading: string;
}

export default function KanaTable(props: KanaTableProps) {
  const { selectedKana, onKanaSelect, kanaOptions, heading } = props;

  const allSelected = kanaOptions.flat().every((k) => selectedKana.includes(k));

  function toggleAll() {
    onKanaSelect(kanaOptions.flat());
  }

  return (
    <table className="">
      <thead>
        <tr>
          <th>
            <label className="p-2">
              <input
                type="checkbox"
                onChange={toggleAll}
                checked={allSelected}
                id={`toggle-all-${heading}`}
              />
            </label>
          </th>
          <th colSpan={100} align="left" className="text-sm ">
            <label htmlFor={`toggle-all-${heading}`}>{heading}</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {kanaOptions.map((row, rowIndex) => (
          <KanaTableRow
            key={rowIndex}
            kana={row}
            selected={selectedKana.includes(row[0])}
            onSelect={() => onKanaSelect(row)}
          />
        ))}
      </tbody>
    </table>
  );
}
