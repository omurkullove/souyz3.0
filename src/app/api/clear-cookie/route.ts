export async function POST(request: Request) {
    const headers = new Headers();

    headers.append(
        'Set-Cookie',
        `access_token=; HttpOnly; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );

    headers.append(
        'Set-Cookie',
        `refresh_token=; HttpOnly; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );

    headers.append(
        'Set-Cookie',
        `soyuz_session=; HttpOnly; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );

    const response = new Response(JSON.stringify({ code: 200 }), { headers, status: 200 });

    return response;
}
