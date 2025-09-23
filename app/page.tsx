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
      <li>
        <Link href="/rainbowkit">rainbowkit</Link>
      </li>
    </ul>
  );
}
