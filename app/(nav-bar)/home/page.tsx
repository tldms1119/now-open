import GoogleMap from "@/components/google-map";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  const isSignedIn = !!session?.token;
  return (
    <>
      {/* Main Content */}
      <main className="flex flex-1 px-6 py-4 h-max-screen gap-2">
        {/* left */}
        <section className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Now Open!</h2>
          <p className="text-lg text-neutral-600">
            You can find food trucks around you and get various information
            about events.
          </p>
          {isSignedIn && (
            <Link
              href="/spots"
              className="primary-btn px-3 h-10 text-lg flex items-center justify-center mt-4 w-40"
            >
              Manage Spots
            </Link>
          )}
        </section>
        {/* right */}
        <section className="flex-3 flex items-center justify-center">
          <GoogleMap />
        </section>
      </main>
    </>
  );
}
