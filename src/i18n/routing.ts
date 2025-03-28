import { COOKIES, locales } from '@src/utils/constants';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: locales,
    defaultLocale: 'ru',
    localeCookie: {
        sameSite: 'lax',
        path: '/',
        name: COOKIES.NEXT_LOCALE,
        maxAge: undefined,
    },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
