import { ISession } from '@my_types/auth-types';
import createMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from './utils/helpers';

const nextIntlMiddleware = createMiddleware({
    locales: ['ru', 'kg'],
    defaultLocale: 'ru',
    localeDetection: false,
});

const PUBLIC_FILE = /\.(.*)$/;

const protectedRoutes = ['/profile'];

export default async function middleware(req: NextRequest): Promise<NextResponse> {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        req.nextUrl.pathname.includes('/skgapi/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return NextResponse.next();
    }

    const response = nextIntlMiddleware(req);

    const basePath = req.nextUrl.pathname.replace(/^\/(ru|kg)\//, '/');

    // Dark mode
    const cookieHeader = req.headers.get('cookie') || '';
    const themeCookieMatch = cookieHeader.match(/mode=(dark|light)/);
    const theme = themeCookieMatch ? themeCookieMatch[1] : 'light';

    response.cookies.set({
        name: 'mode',
        value: theme,
        path: '/',
    });

    // News route, initial cookie for pagination
    const isNewsRoute = basePath === '/news-portal';
    const page = Number(decrypt(cookies().get('page')?.value || ''));

    if (!page || typeof page !== 'number') {
        if (isNewsRoute) {
            const encrypted_value = encrypt('1');

            response.cookies.set({
                name: 'page',
                value: encrypted_value,
                path: '/',
            });
        }
    }

    // Session & Route protection
    const session: ISession = decrypt(cookies().get('soyuz_session')?.value || '');

    const isProtectedRoute = protectedRoutes.includes(basePath);
    const isAuthRoute = basePath.startsWith('/auth');
    const locale = req.nextUrl.pathname.split('/')[1];

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
    }

    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL(`/${locale}/profile`, req.url));
    }

    const cookie_locale_match = cookieHeader.match(/NEXT_LOCALE=(ru|kg)/);
    const cookie_locale = cookie_locale_match ? cookie_locale_match[1] : 'ru';

    return response;
}

export const config = {
    matcher: ['/', '/(ru|kg)/:path*'],
};
