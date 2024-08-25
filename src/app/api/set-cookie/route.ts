import { ISession, IUpdateCookie } from '@my_types/auth-types';
import { decrypt, encrypt } from '@src/utils/helpers';

export async function POST(request: Request) {
    const body = await request.json();

    const decrypted_body: IUpdateCookie = decrypt(body);

    const { user, access_token, refresh_token, session_expires } = decrypted_body;

    const headers = new Headers();

    const souyz_session = {
        ...user,
        session_expires: session_expires,
    } as ISession;

    const encrypted_souyz_session = encrypt(souyz_session);

    headers.append(
        'Set-Cookie',
        `access_token=${access_token}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    headers.append(
        'Set-Cookie',
        `refresh_token=${refresh_token}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    headers.append(
        'Set-Cookie',
        `souyz_session=${encrypted_souyz_session}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    const response = new Response(JSON.stringify({ code: 200 }), { headers });

    return response;
}
