import { ISession } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { COOKIES, REFRESH_INTERVAL_GUARD, sharedCookieDomain } from '@src/utils/constants';
import { decrypt, encrypt, parseISOStringToDate } from '@src/utils/helpers';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = cookies();
    const oldSession = cookieStore.get(COOKIES.SESSION)?.value;
    const decryptedOldSession = decrypt(oldSession || '') as ISession;

    if (
        decryptedOldSession?.last_refreshed &&
        Date.now() - decryptedOldSession.last_refreshed < REFRESH_INTERVAL_GUARD
    ) {
        return new Response(JSON.stringify(oldSession), {
            status: 200,
        });
    }

    const res = await authService.refreshToken();

    if (res.code !== 200) {
        return new Response(JSON.stringify(encrypt({ code: 401 })), { status: 200 });
    }

    const headers = new Headers();
    const data = res?.data;

    const newSession: ISession = {
        ...decryptedOldSession,
        ...data,
        last_refreshed: Date.now(),
    };

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
