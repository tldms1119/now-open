"use client";

import Button from "@/components/form-button";
import { test } from "./action";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Welcome to Our Application!</h1>
      </div>
      <p className="text-base">hehehehehehehehe</p>
      <form action={test} className="flex flex-col gap-3">
        <Button text="test" />
      </form>
    </div>
  );
}
