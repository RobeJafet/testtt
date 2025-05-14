import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  const nextLocaleCookie = request.cookies ? request.cookies.get('NEXT_LOCALE') : null;

  if (nextLocaleCookie) {
    const langCookie = nextLocaleCookie.value;
    return langCookie;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );
  const locale = matchLocale(languages, locales, defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect /intent/edit/mode=presentation to /studio/edit/mode
  if (pathname.startsWith("/intent/edit/mode=presentation")) {
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname.replace("/intent/edit/mode=presentation", "/studio/presentation/");
    return NextResponse.redirect(newUrl);
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  } else {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', pathname.split('/')[1]);
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api/|api$|_next/|favicon.ico|studio|assets/).*)"
  ]
};