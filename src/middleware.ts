export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const unauthRoutes = ["/", "/signin", "/signup"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
  });
  if (!session && !unauthRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  } else if (session && (path === "/signin" || path === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard/:path*"],
};
