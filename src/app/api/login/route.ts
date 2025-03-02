import { ILoginRequest, ISession } from '@my_types/auth-types';
import { IResponse } from '@my_types/main-types';
import authService from '@service/auth/auth-service';
import { COOKIES, sharedCookieDomain } from '@src/utils/constants';
import { encrypt, parseISOStringToDate } from '@src/utils/helpers';

export async function POST(request: Request) {
    const body: ILoginRequest = await request.json();

    const res = (await authService.login(body)) as IResponse<ISession>;
    const data = res.data;

    if (res.code !== 200) {
        return new Response(JSON.stringify({ code: res.code }), { status: 200 });
    }

    const headers = new Headers();

    const encrypted_session = encrypt(data);

    console.log(encrypted_session);

    headers.append(
        'Set-Cookie',
        `${
            COOKIES.SESSION
        }=${encrypted_session}; Path=/; SameSite=Lax; Domain=${sharedCookieDomain}; Expires=${parseISOStringToDate(
            data.refresh_token_expire_time
        )}`
    );

    const response = new Response(JSON.stringify({ code: 200, data: data.user }), { headers });

    return response;
}
