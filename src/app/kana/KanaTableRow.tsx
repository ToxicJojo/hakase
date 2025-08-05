interface KanaTableRowProps {
  kana: (string | null)[];
  selected?: boolean;
  onSelect?: () => void;
}

export default function KanaTableRow(props: KanaTableRowProps) {
  const { kana, selected, onSelect } = props;

  return (
    <tr className={selected ? "bg-blue-100" : ""}>
      <td className="border">
        <label className="p-2">
          <input type="checkbox" checked={selected} onChange={onSelect} />
        </label>
      </td>
      {kana.map((k, index) => (
        <td key={index} className="p-2 border text-center">
          <span className="block">{k ? k : " "}</span>
        </td>
      ))}
    </tr>
  );
}
