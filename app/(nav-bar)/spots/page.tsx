import GoogleMap from "@/components/google-map";
import { fetchSpots } from "./action";
import SpotsContent from "./components/SpotsContent";

export default async function SpotsPage() {
  const spots = await fetchSpots();

  return (
    <>
      <main className="flex flex-1 px-6 py-4 h-max-screen gap-3">
        {/* left */}
        <section className="flex-1 flex flex-col justify-start">
          <SpotsContent initialSpots={spots} />
        </section>
        {/* right */}
        <section className="flex-2 flex items-center justify-center">
          <GoogleMap />
        </section>
      </main>
    </>
  );
}
