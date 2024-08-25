import { ISession, IUpdateProfileRequest } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { decrypt, encrypt } from '@src/utils/helpers';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body: IUpdateProfileRequest = JSON.parse(await request.json());

    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;

    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`;

    const res = await authService.updateProfile(body, cookie);

    if (res.code !== 200) {
        return new Response(JSON.stringify({ code: res.code }), { status: 200 });
    }

    const old_souyz_session = decrypt(cookies().get('souyz_session')?.value || '') as ISession;

    const headers = new Headers();

    const new_souyz_session = {
        ...old_souyz_session,
        first_name: body.data.first_name,
        last_name: body.data.last_name,
        phone: body.data.phone,
        email: body.data.email,
    } as ISession;

    const encrypted_souyz_session = encrypt(new_souyz_session);

    headers.append(
        'Set-Cookie',
        `souyz_session=${encrypted_souyz_session}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    const response = new Response(JSON.stringify({ code: 200, data: new_souyz_session }), {
        headers,
    });

    return response;
}
