import { ISession } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { COOKIES, sharedCookieDomain } from '@src/utils/constants';
import { decrypt, encrypt, parseISOStringToDate } from '@src/utils/helpers';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    console.log('API');

    const res = await authService.refreshToken();

    if (res.code != 200) {
        return new Response(JSON.stringify(encrypt({ code: 401 })), { status: 200 });
    }

    const headers = new Headers();
    const data = res?.data;

    const cookieStore = cookies();

    const oldSession = cookieStore.get(COOKIES.SESSION)?.value;
    const decryptedOldSession = decrypt(oldSession || '') as ISession;

    const newSession = { ...decryptedOldSession, ...data };

    const encryptedNewSession = encrypt(newSession);

    headers.append(
        'Set-Cookie',
        `${
            COOKIES.SESSION
        }=${encryptedNewSession}; Path=/; SameSite=Lax; Domain=${sharedCookieDomain}; Expires=${parseISOStringToDate(
            data.refresh_token_expire_time
        )}`
    );

    const response = new Response(JSON.stringify(encryptedNewSession), {
        status: 200,
        headers,
    });

    return response;
}
