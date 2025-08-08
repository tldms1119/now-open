"use server";

import { api } from "@/lib/fetchWrapper";

export async function test() {
  const res = await api.auth.get(process.env.API_URL + "/test");
  console.log(res);
}
