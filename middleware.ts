import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("service_session")?.value;
  const isAuth = !!cookie;
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isLoginOrRegister = pathname === "/login" || pathname === "/register";
  const isBookDetails = /^\/books\/\d+$/i.test(pathname);

  if ((isDashboard || isBookDetails) && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginOrRegister && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/books/:path*"],
};
