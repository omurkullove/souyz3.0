import { ISession, IUpdateCookie } from '@my_types/auth-types';
import { encrypt } from '@src/utils/helpers';

export async function POST(request: Request) {
    const body = await request.json();

    const headers = new Headers();

    headers.append(
        'Set-Cookie',
        `NEXT_LOCALE=${body.locale}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    const response = new Response(JSON.stringify({ code: 200 }), { headers });

    return response;
}
