import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/en") || pathname.startsWith("/es")) {
    return NextResponse.next();
  }

  const acceptLang = req.headers.get("accept-language") || "";
  const prefersSpanish = acceptLang.toLowerCase().startsWith("es");

  const url = req.nextUrl.clone();
  url.pathname = `/${prefersSpanish ? "es" : "en"}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
