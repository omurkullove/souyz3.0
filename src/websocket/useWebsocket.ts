'use client';

import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const reconnectInterval = useRef<number | null>(null);

    useEffect(() => {
        const connect = () => {
            const socket = new WebSocket(url);

            socket.onopen = () => {
                console.log('WebSocket connection established');
            };

            socket.onclose = (event) => {
                console.log('WebSocket connection closed', event.reason);
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
