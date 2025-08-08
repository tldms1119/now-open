import Image from "next/image";
import { getSession, signOut } from "@/lib/session";
import Button from "@/components/form-button";
import Link from "next/link";

export default async function NavBar() {
  const session = await getSession();
  const isSignedIn = !!session?.token;
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-neutral-200 shadow-md">
      <div className="flex items-center gap-2">
        <Image src="/foodtruck.png" alt="Logo" width={50} height={50} />
        <span className="font-bold text-xl">Now Open</span>
      </div>
      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <form action={signOut}>
            <Button text="Sign Out" />
          </form>
        ) : (
          <Link
            href="/sign-in"
            className="primary-btn px-3 h-10 text-lg flex items-center"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
