'use client';

import useWebSocket from '@src/websocket/useWebsocket';
import { ReactNode, useEffect } from 'react';
import { useRouter } from '@/navigation';
import { IUpdateCookie } from '@my_types/auth-types';
import { useUser } from '@providers/user-provider';
import { pushAndRefresh } from '@src/utils';
import { useLocale } from '@providers/locale-provider';

interface IWebsocketWrapperProps {
    children: ReactNode;
}

const WebsocketWrapper = ({ children }: IWebsocketWrapperProps) => {
    const { updateUser, user } = useUser();
    const { locale } = useLocale();
    const { ws } = useWebSocket('ws://localhost:8080');

    const router = useRouter();

    const handleUpdateCookie = async (newCookie: IUpdateCookie) => {
        await fetch('/api/set-cookie', {
            method: 'POST',
            body: JSON.stringify(newCookie),
            credentials: 'include',
        });
    };

    const clearData = async () => {
        await fetch('/api/clear-cookie', { method: 'POST' });
        updateUser(null);
        pushAndRefresh(`/${locale}`);
    };

    useEffect(() => {
        if (ws) {
            ws.onmessage = async (event) => {
                const { action, data } = JSON.parse(event.data);

                console.log(data, 'DATA');

                if (action === 'update-token') {
                    await handleUpdateCookie({ user, ...data });
                    updateUser({ ...user!, session_expires: data.session_expires });
                    router.refresh();
                }

                if (action === 'missing-tokens') {
                    console.log(`client missing tokens ${action} ${data}`);

                    await clearData();
                }
            };

            ws.onclose = async () => {
                console.log('Websocket closed');
                await clearData().then(() => {
                    updateUser(null);
                    router.refresh();
                });
            };

            ws.onerror = async () => {
                await clearData().then(() => {
                    updateUser(null);
                    router.refresh();

                    ws.close();
                });
            };
        }
    }, [ws]);

    return <>{children}</>;
};

export default WebsocketWrapper;
