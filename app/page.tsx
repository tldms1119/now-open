import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 max-w-screen-sm mx-auto">
      <div className="flex flex-col items-center gap-2 my-auto *:font-medium">
        <Image src="/foodtruck.png" alt="Logo" width={120} height={120} />
        <h1 className="text-4xl">Now Open!</h1>
        <h2 className="text-2xl">Come visit us 🙂</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/home" className="primary-btn py-2.5 text-lg">
          Start
        </Link>
        <div className="flex gap-2">
          <span>Already had your account?</span>
          <Link href="/sign-in" className="hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
