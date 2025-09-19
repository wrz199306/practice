import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/wagmi">Wagmi</Link>
      </li>
      <li>
        <Link href="/viem">Viem</Link>
      </li>
    </ul>
  );
}
