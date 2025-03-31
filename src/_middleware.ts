import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/signin", "/signup", "/activate_account"];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  console.log(accessToken);
  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!accessToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|api).*)"],
};
