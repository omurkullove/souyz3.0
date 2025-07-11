import { routing } from "@i18n/routing";
import type { ISession } from "@my_types/auth-types";
import createMiddleware from "next-intl/middleware";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { COOKIES } from "./utils/constants";
import { decrypt } from "./utils/helpers";

const nextIntlMiddleware = createMiddleware({
	locales: ["ru", "kg"],
	defaultLocale: "ru",
	localeDetection: false,
});

const PUBLIC_FILE = /\.(.*)$/;

const protectedRoutes = ["/profile"];

export default async function middleware(
	req: NextRequest,
): Promise<NextResponse> {
	const { pathname } = req.nextUrl;

	if (
		req.nextUrl.pathname.startsWith("/_next") ||
		req.nextUrl.pathname.includes("/api/") ||
		req.nextUrl.pathname.includes("/skgapi/") ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return NextResponse.next();
	}

	const response = nextIntlMiddleware(req);

	const basePath = req.nextUrl.pathname.replace(/^\/(ru|kg)\//, "/");

	// Session & Route protection
	const session: ISession = decrypt(
		cookies().get(COOKIES.SESSION)?.value || "",
	);

	const isProtectedRoute = protectedRoutes.includes(basePath);
	const isAuthRoute = basePath.startsWith("/auth");
	const locale = req.nextUrl.pathname.split("/")[1];

	if (!session && isProtectedRoute) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
	}

	if (session && isAuthRoute) {
		return NextResponse.redirect(new URL(`/${locale}/profile`, req.url));
	}

	// Dark mode
	const cookieHeader = req.headers.get("cookie") || "";
	const themeCookieMatch = cookieHeader.match(/theme=(dark|light)/);
	const theme = themeCookieMatch ? themeCookieMatch[1] : "light";

	response.cookies.set({
		name: COOKIES.THEME,
		value: theme,
		path: "/",
		sameSite: "lax",
	});

	// locale redirect
	const locales = routing.locales;
	const localeCookie = req.cookies.get(COOKIES.NEXT_LOCALE);
	const pathLocale = pathname.split("/")[1];
	const validLocale = locales.includes(pathLocale);
	const validLocaleCookie = locales.includes(localeCookie?.value || "");

	if (!validLocale) {
		const url = req.nextUrl.clone();
		url.pathname = `/${validLocaleCookie ? localeCookie?.value : "ru"}`;
		return NextResponse.redirect(url);
	}

	if (validLocale && localeCookie?.value !== pathLocale) {
		response.cookies.set(COOKIES.NEXT_LOCALE, pathLocale, {
			path: "/",
			sameSite: "lax",
		});
	}

	if (!localeCookie || !locales.includes(localeCookie.value)) {
		response.cookies.set(COOKIES.NEXT_LOCALE, "ru", {
			path: "/",
			sameSite: "lax",
		});
	}

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
