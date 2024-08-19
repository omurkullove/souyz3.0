'use client';

import useWebSocket from '@src/websocket/useWebsocket';
import { ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from '@/navigation';
import { IUpdateCookie } from '@my_types/auth-types';
import { useUser } from '@providers/user-provider';

interface IWebsocketWrapperProps {
    children: ReactNode;
}

const WebsocketWrapper = ({ children }: IWebsocketWrapperProps) => {
    const { updateUser, user } = useUser();
    const { ws, status } = useWebSocket('ws://localhost:8080');
    const router = useRouter();

    const handleUpdateCookie = useCallback(async (newCookie: IUpdateCookie) => {
        await fetch('/api/set-cookie', {
            method: 'POST',
            body: JSON.stringify(newCookie),
            credentials: 'include',
        });
    }, []);

    const clearData = useCallback(async () => {
        await fetch('/api/clear-cookie', { method: 'POST' });
        updateUser(null);
    }, [updateUser]);

    const handleMessage = useCallback(
        async (event: MessageEvent) => {
            const { action, data } = JSON.parse(event.data);

            console.log(data, 'DATA');

            if (action === 'update-token') {
                await handleUpdateCookie({ user, ...data });
                updateUser({ ...user!, session_expires: data.session_expires });
                router.refresh();
            }

            if (action === 'missing-tokens') {
                console.log(`client missing tokens ${action} ${data}`);

                await clearData().then(() => {
                    updateUser(null);
                    router.refresh();
                });
            }
        },
        [handleUpdateCookie, user, updateUser]
    );

    const handleClose = useCallback(async () => {
        console.log('Websocket closed');
        await clearData().then(() => {
            updateUser(null);
            router.refresh();
        });
    }, [clearData, updateUser]);

    const handleError = useCallback(async () => {
        await clearData().then(() => {
            updateUser(null);
            router.refresh();
        });
    }, [clearData, updateUser]);

    useEffect(() => {
        if (ws) {
            ws.addEventListener('message', handleMessage);
            ws.addEventListener('close', handleClose);
            ws.addEventListener('error', handleError);

            return () => {
                ws.removeEventListener('message', handleMessage);
                ws.removeEventListener('close', handleClose);
                ws.removeEventListener('error', handleError);
            };
        }
    }, [ws, handleMessage, handleClose, handleError]);

    return <>{children}</>;
};

export default WebsocketWrapper;
