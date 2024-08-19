'use client';

import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const reconnectInterval = useRef<number | null>(null);

    const [status, setStatus] = useState('loading....');

    useEffect(() => {
        const connect = () => {
            const socket = new WebSocket(url);

            socket.onopen = () => {
                console.log('WebSocket connection established');
                setStatus('OPENED');
                if (reconnectInterval.current) {
                    clearInterval(reconnectInterval.current);
                }
            };

            socket.onclose = (event) => {
                setStatus('CLOSED');
                console.log('WebSocket connection closed', event.reason);
                reconnectInterval.current = window.setInterval(() => {
                    connect();
                }, 5000);
            };

            socket.onerror = (error) => {
                setStatus('ERROR');
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
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current);
            }
        };
    }, []);

    return { ws, status };
};

export default useWebSocket;
