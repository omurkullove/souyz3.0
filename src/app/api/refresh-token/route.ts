import { ITokenWithExpire } from '@my_types/auth-types';
import { ITokens } from '@my_types/main-types';
import authService from '@service/auth/auth-service';

export async function POST(request: Request) {
    const body = await request.json();

    const res = await authService.refreshToken(body);
    const data = res.data as ITokens;

    if (res.code != 200) {
        return new Response(JSON.stringify({ code: 401 }), { status: 200 });
    }

    const newCookies = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        session_expires: data.access_token_expire_time,
    } as ITokenWithExpire;

    const response = new Response(JSON.stringify({ code: 200, new_cookies: newCookies }), {
        status: 200,
    });

    return response;
}
