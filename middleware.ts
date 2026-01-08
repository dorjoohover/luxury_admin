import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  if (!token && !pathname.includes("login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && pathname.includes("login"))
    return NextResponse.redirect(new URL("/", req.url));
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/brands/:path*",
    "/engines/:path*",
    "/login",
    "/orders/:path*",
    "/products/:path*",
    "/users/:path*",
  ],
};
