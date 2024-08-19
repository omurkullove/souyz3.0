require('dotenv').config();

const WebSocket = require('ws');
const CryptoJS = require('crypto-js');

const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT || 8080 });

const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'P82QND2AXKSl1AQE9mYMiysCY8g2IRtX';

function getCookie(name, cookieString) {
    const nameEQ = name + '=';
    const parts = cookieString.split(';');
    for (let part of parts) {
        let cookie = part.trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

const _decrypt = (encryptedData) => {
    try {
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_KEY);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

wss.on('connection', (ws, req) => {
    const cookies = req.headers.cookie;
    const origin = req.headers.origin;

    const initialCookies = {
        access_token: getCookie('access_token', cookies),
        refresh_token: getCookie('refresh_token', cookies),
        session_expires: _decrypt(getCookie('souyz_session', cookies))?.session_expires,
    };

    const isValidSession =
        !!initialCookies.access_token &&
        initialCookies.refresh_token &&
        initialCookies.session_expires;

    if (!isValidSession) return;

    let refreshTimer;

    let isRefreshing = false;

    console.log(
        `Websocket initial stage: initialCookies: ${JSON.stringify(
            initialCookies
        )} is refreshing => ${isRefreshing}`
    );

    const handleRefresh = () => {
        if (isRefreshing) return;

        isRefreshing = true;

        refreshTimer = setTimeout(async () => {
            console.log('Starting refresh...');

            const cookie = `access_token=${initialCookies.access_token}; refresh_token=${initialCookies.refresh_token}`;

            const res = await fetch(`${origin}/api/refresh-token`, {
                method: 'POST',
                body: JSON.stringify(cookie),
                credentials: 'include',
            });

            const { code, new_cookies } = await res.json();

            if (code === 200 && new_cookies) {
                ws.send(
                    JSON.stringify({
                        action: 'update-token',
                        data: new_cookies,
                    })
                );

                initialCookies.access_token = new_cookies.access_token;
                initialCookies.refresh_token = new_cookies.refresh_token;
                initialCookies.session_expires = new_cookies.session_expires;

                console.log(`Refreshed, new => ${JSON.stringify(initialCookies)}`);

                isRefreshing = false;
            } else {
                ws.send(
                    JSON.stringify({
                        action: 'missing-tokens',
                        data: null,
                    })
                );
                initialCookies.access_token = null;
                initialCookies.refresh_token = null;
                initialCookies.session_expires = null;

                isRefreshing = false;
            }
        }, Math.max(new Date(initialCookies.session_expires) - new Date() - 60000, 0));
    };

    handleRefresh();

    ws.on('close', () => {
        isRefreshing = false;
        clearTimeout(refreshTimer);
    });
});
