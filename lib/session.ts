import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  email: string;
  username: string;
  token: string;
}

export async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "now-open-session",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function logUserIn(user: SessionContent) {
  const session = await getSession();
  session.email = user.email;
  session.username = user.username;
  session.token = user.token;
  await session.save();
  return redirect("/home");
}
