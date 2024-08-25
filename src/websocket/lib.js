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

    let isValidSession =
        !!initialCookies.access_token &&
        initialCookies.refresh_token &&
        initialCookies.session_expires;

    if (!isValidSession) return;

    let isRefreshing = false;
    let refreshTimer;

    const startRefreshTimer = () => {
        const refreshInterval = Math.max(
            new Date(initialCookies.session_expires) - new Date() - 10000,
            10000
        );

        clearInterval(refreshTimer);
        refreshTimer = setInterval(handleRefresh, refreshInterval);
    };

    const handleRefresh = async () => {
        if (isRefreshing || !isValidSession) return;

        isRefreshing = true;

        clearInterval(refreshTimer);

        try {
            console.log('Starting refresh...');

            const cookie = `access_token=${initialCookies.access_token}; refresh_token=${initialCookies.refresh_token}`;

            const res = await fetch(`${origin}/api/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cookie),
            });

            if (!res.ok) return;

            const { code, new_cookies } = await res.json();
            console.log('handleRefresh', code, new_cookies);

            if (code === 200 && new_cookies) {
                await ws.send(
                    JSON.stringify({
                        action: 'update-token',
                        data: new_cookies,
                    })
                );

                initialCookies.access_token = new_cookies.access_token;
                initialCookies.refresh_token = new_cookies.refresh_token;
                initialCookies.session_expires = new_cookies.session_expires;

                console.log(`Updated, new =>  ${JSON.stringify(initialCookies)}`);

                isValidSession = true;

                startRefreshTimer();
            } else {
                ws.send(
                    JSON.stringify({
                        action: 'missing-tokens',
                        data: null,
                    })
                );

                isValidSession = false;
                clearInterval(refreshTimer);
            }
        } catch (error) {
            ws.send(
                JSON.stringify({
                    action: 'missing-tokens',
                    data: null,
                })
            );

            isValidSession = false;
            clearInterval(refreshTimer);
            console.error('Error refreshing tokens:', error);
        } finally {
            isRefreshing = false;
        }
    };

    startRefreshTimer();

    ws.on('close', () => {
        clearInterval(refreshTimer);
        isRefreshing = false;
    });
});
