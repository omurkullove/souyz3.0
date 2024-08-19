import { ILoginRequest, ILoginResponse } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { encrypt } from '@src/utils';

export async function POST(request: Request) {
    const body: ILoginRequest = await request.json();

    const res = (await authService.login(body)) as ILoginResponse;
    const data = res.data;

    if (res.code !== 200) {
        return new Response(JSON.stringify({ code: res.code }), { status: 200 });
    }

    const headers = new Headers();

    const session = {
        ...data.user,
        session_expires: data.access_token_expire_time,
    };

    const encrypted_session = encrypt(session);

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
        `souyz_session=${encrypted_session}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    const response = new Response(JSON.stringify({ code: 200, data: data.user }), { headers });

    return response;
}
