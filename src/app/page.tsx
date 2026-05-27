import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/kana">Kana</Link>
      </li>
      <li>
        <Link href="/words">Kana - Words</Link>
      </li>
    </ul>
  );
}
