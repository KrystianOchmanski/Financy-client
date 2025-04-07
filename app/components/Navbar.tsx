import Link from "next/link";
import MenuItem from "./MenuItem";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { clearAccessToken } = useAuth();
  const router = useRouter();

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`);
    clearAccessToken();
    router.push("/login");
  };

  return (
    <nav className="bg-white stroke-1 stroke-gray-100">
      <div className="container mx-auto flex justify-between lg:w-7xl py-4 px-8">
        <Link href="/" className="my-auto">
          <img src="/logo_full.png" alt="Logo" />
        </Link>
        <menu className="my-auto">
          <MenuItem href="/dashboard" label="Dashboard" />
          <MenuItem href="/transactions" label="Transactions" />
          <MenuItem href="/analytics" label="Analytics" />
          <MenuItem href="/accounts" label="Accounts" />
          <MenuItem href="/wallet" label="Wallet" />
        </menu>
        <span className="ml-3 hidden sm:block">
          <button
            onClick={logout}
            type="button"
            className="rounded-md bg-white px-3 py-2 text-xs lg:text-sm text-red-500 hover:bg-gray-200"
          >
            Log out
          </button>
        </span>
      </div>
    </nav>
  );
}
