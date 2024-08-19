import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { decrypt } from './utils';
import { cookies } from 'next/headers';
import { ISession } from '@my_types/auth-types';

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
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return NextResponse.next();
    }

    const response = nextIntlMiddleware(req);

    const cookieHeader = req.headers.get('cookie') || '';
    const themeCookieMatch = cookieHeader.match(/mode=(dark|light)/);
    const theme = themeCookieMatch ? themeCookieMatch[1] : 'light';

    const cookieExpireTime = 604800;

    response.cookies.set({
        name: 'mode',
        value: theme,
        path: '/',
        maxAge: cookieExpireTime,
    });

    const session: ISession = decrypt(cookies().get('souyz_session')?.value || '');

    const basePath = req.nextUrl.pathname.replace(/^\/(ru|kg)\//, '/');
    const isProtectedRoute = protectedRoutes.includes(basePath);
    const isAuthRoute = basePath.startsWith('/auth');
    const locale = req.nextUrl.pathname.split('/')[1];

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
    }

    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL(`/${locale}/profile`, req.url));
    }

    return response;
}
