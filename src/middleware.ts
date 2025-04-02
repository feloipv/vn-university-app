import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/signin",
  "/signup",
  "/activate_account",
  "/reset_password",
];

export function middleware(req: NextRequest) {
  const isSignin = Number(req.cookies.get("isSignin")?.value);

  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isSignin && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isSignin && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|api).*)"],
};
