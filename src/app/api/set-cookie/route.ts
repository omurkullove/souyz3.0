import { ISession, IUpdateCookie } from '@my_types/auth-types';
import { encrypt } from '@src/utils';

export async function POST(request: Request) {
    const body: IUpdateCookie = await request.json();

    const { user, access_token, refresh_token, session_expires } = body;

    const headers = new Headers();

    const souyz_session = {
        ...user,
        session_expires: session_expires,
    } as ISession;

    console.log(`New session in handler => ${JSON.stringify(souyz_session)}`);

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
