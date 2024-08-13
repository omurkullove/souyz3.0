import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const nextIntlMiddleware = createMiddleware({
    locales: ['ru', 'kg'],
    defaultLocale: 'ru',
});

export default function middleware(req: NextRequest): NextResponse {
    const response = nextIntlMiddleware(req);

    const cookieHeader = req.headers.get('cookie') || '';
    const themeCookieMatch = cookieHeader.match(/mode=(dark|light)/);

    let theme = 'light';

    if (themeCookieMatch) {
        theme = themeCookieMatch[1];
        if (theme !== 'dark' && theme !== 'light') {
            theme = 'light';
        }
    }

    const cookieHeaderResponse = response.headers.get('Set-Cookie') || '';
    const themeCookie = `mode=${theme}; Path=/; Max-Age=2592000`;
    response.headers.set('Set-Cookie', `${cookieHeaderResponse}${themeCookie}`);

    return response;
}

export const config = {
    matcher: ['/', '/(ru|kg)/:path*'],
};
