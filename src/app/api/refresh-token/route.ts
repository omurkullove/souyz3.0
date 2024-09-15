import { ISession } from '@my_types/auth-types';
import { ITokens } from '@my_types/main-types';
import authService from '@service/auth/auth-service';
import { decrypt, encrypt } from '@src/utils/helpers';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();

    const res = await authService.refreshToken(decrypt(body));

    if (res.code != 200) {
        return new Response(JSON.stringify(encrypt({ code: 401 })), { status: 200 });
    }

    const headers = new Headers();

    const data = res?.data as ITokens;

    const souyz_session = decrypt(cookies().get('souyz_session')?.value || '') as ISession;

    const new_souyz_session = encrypt({
        ...souyz_session,
        session_expires: data.access_token_expire_time,
    });

    headers.append(
        'Set-Cookie',
        `access_token=${data.access_token}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    headers.append(
        'Set-Cookie',
        `refresh_token=${data.refresh_token}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    headers.append(
        'Set-Cookie',
        `souyz_session=${new_souyz_session}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    const new_response = {
        code: 200,
        newAccessToken: data.access_token,
        newRefreshToken: data.refresh_token,
        newSessionExpires: data.access_token_expire_time,
        souyz_session: {
            ...souyz_session,
            session_expires: data.access_token_expire_time,
        },
    };

    const decrypted_response = encrypt(new_response);

    const response = new Response(JSON.stringify(decrypted_response), {
        status: 200,
        headers,
    });

    return response;
}
