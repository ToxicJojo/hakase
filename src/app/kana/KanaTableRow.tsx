interface KanaTableRowProps {
  kana: (string | null)[];
}

export default function KanaTableRow(props: KanaTableRowProps) {
  const { kana } = props;

  return (
    <tr>
      <td className="p-2 border">
        <input type="checkbox" />
      </td>
      {kana.map((k, index) => (
        <td key={index} className="p-2 border text-center">
          <span className="block">{k ? k : " "}</span>
        </td>
      ))}
    </tr>
  );
}
