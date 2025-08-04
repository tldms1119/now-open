import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  email: string;
  username: string;
}

export async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "now-open-session",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function logUserIn(email: string, username: string) {
  const session = await getSession();
  session.email = email;
  session.username = username;
  await session.save();
  return redirect("/home");
}
