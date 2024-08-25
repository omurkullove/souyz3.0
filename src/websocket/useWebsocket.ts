'use client';

import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const connect = () => {
            const socket = new WebSocket(url);

            socket.onopen = () => {
                console.log('WebSocket connection established');
                setAttempts(0);
            };

            socket.onclose = (event) => {
                console.log('WebSocket connection closed', event.reason);
                if (attempts < 10) {
                    setTimeout(() => {
                        setAttempts((prev) => prev + 1);
                        connect();
                    }, 10000);
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket error', error);
                socket.close();
            };

            setWs(socket);
        };

        connect();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    return { ws };
};

export default useWebSocket;
