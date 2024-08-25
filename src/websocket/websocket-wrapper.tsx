'use client';

import { useRouter } from '@/navigation';
import { useUser } from '@providers/user-provider';
import { encrypt } from '@src/utils/helpers';
import useWebSocket from '@src/websocket/useWebsocket';
import { ReactNode, useEffect } from 'react';

interface IWebsocketWrapperProps {
    children: ReactNode;
    hostname: string;
}

const WebsocketWrapper = ({ children, hostname }: IWebsocketWrapperProps) => {
    const { updateUser, user } = useUser();

    const { ws } = useWebSocket(`wss://souyz3-0.vercel.app:8080`);

    const router = useRouter();

    const handleUpdateCookie = async (newCookie: string) => {
        await fetch('/api/set-cookie', {
            method: 'POST',
            body: JSON.stringify(newCookie),
            credentials: 'include',
        });
    };

    const clearData = async () => {
        await fetch('/api/clear-cookie', { method: 'POST' }).then((res) => {
            if (res.ok) {
                router.refresh();
            }
        });
    };

    useEffect(() => {
        if (ws) {
            ws.onmessage = async (event) => {
                console.log('JAI JAI');
                const { action, data } = JSON.parse(event.data);

                if (action === 'update-token') {
                    const encrypted_data = encrypt({ user, ...data });

                    await handleUpdateCookie(encrypted_data);

                    updateUser({ ...user!, session_expires: data.session_expires });

                    router.refresh();

                    console.log('updated!', user, data);
                }

                if (action === 'missing-tokens') {
                    console.log(`client missing tokens ${action} ${data}`);
                    await clearData();
                }
            };

            ws.onclose = async () => {
                console.log('Websocket closed');
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
