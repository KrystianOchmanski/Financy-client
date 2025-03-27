import Link from "next/link";
import { logout } from "../login/actions";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white text-xl font-bold">
          Financy
        </Link>
        <span className="ml-3 hidden sm:block">
          <button
            onClick={logout}
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm text-red-500 hover:bg-gray-200"
          >
            Log out
          </button>
        </span>
      </div>
    </nav>
  );
}
