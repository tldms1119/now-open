import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/sign-in": true,
  "/create-account": true,
  "/home": true,
};

// the name of function should be 'middleware'
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.token) {
    if (!exists) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
}

// the name of configuration object should be 'config'
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
