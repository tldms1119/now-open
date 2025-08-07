import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface SessionContent {
  email: string;
  username: string;
  token: string;
  expireIn: number;
}

export async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "now-open-session",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function signUserIn(user: SessionContent) {
  const session = await getSession();
  session.email = user.email;
  session.username = user.username;
  session.token = user.token;
  await session.save();
  return redirect("/home");
}
