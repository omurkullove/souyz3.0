'use client';

import useWebSocket from '@src/websocket/useWebsocket';
import { ReactNode, useEffect } from 'react';
import { useRouter } from '@/navigation';
import { IUpdateCookie } from '@my_types/auth-types';
import { useUser } from '@providers/user-provider';

interface IWebsocketWrapperProps {
    children: ReactNode;
    hostname: string;
}

const WebsocketWrapper = ({ children, hostname }: IWebsocketWrapperProps) => {
    const { updateUser, user } = useUser();

    const { ws } = useWebSocket(`wss://${hostname}`);

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
