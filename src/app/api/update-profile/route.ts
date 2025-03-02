import { ISession, IUpdateProfileRequest } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { COOKIES, sharedCookieDomain } from '@src/utils/constants';
import { decrypt, encrypt, parseISOStringToDate } from '@src/utils/helpers';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body: IUpdateProfileRequest = JSON.parse(await request.json());
    const res = await authService.updateProfile(body);

    if (res.code !== 200) {
        return new Response(JSON.stringify({ code: res.code }), { status: 200 });
    }

    const old_soyuz_session = decrypt(cookies().get(COOKIES.SESSION)?.value || '') as ISession;

    const headers = new Headers();

    const new_soyuz_session: ISession = {
        ...old_soyuz_session,
        user: {
            ...old_soyuz_session.user,
            ...body.data,
        },
    } as ISession;

    const encrypted_soyuz_session = encrypt(new_soyuz_session);

    headers.append(
        'Set-Cookie',
        `${
            COOKIES.SESSION
        }=${encrypted_soyuz_session}; Path=/; SameSite=Lax; Domain=${sharedCookieDomain}; Expires=${parseISOStringToDate(
            old_soyuz_session.refresh_token_expire_time
        )}`
    );

    const response = new Response(JSON.stringify({ code: 200, data: new_soyuz_session.user }), {
        headers,
    });

    return response;
}
