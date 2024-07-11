export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
  });
  if (!session && path !== "/signin") {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } else if (session && (path === "/signin" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin"],
};
