import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white text-xl font-bold">
          Financy
        </Link>
        <Link href="/login" className="text-white">
          Zaloguj się
        </Link>
      </div>
    </nav>
  );
}
