import { COOKIES } from '@src/utils/constants';

export async function POST(request: Request) {
    const headers = new Headers();

    headers.append(
        'Set-Cookie',
        `${COOKIES.SESSION}=; Path=/; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );

    const response = new Response(JSON.stringify({ code: 200 }), { headers, status: 200 });

    return response;
}
