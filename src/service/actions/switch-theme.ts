'use server';

import { COOKIES } from '@src/utils/constants';
import { cookies } from 'next/headers';

export async function switchTheme(theme: Theme) {
    const cookieStore = cookies();

    console.log(theme);

    cookieStore.set(COOKIES.THEME, theme, {
        sameSite: 'lax',
        path: '/',
    });
}
