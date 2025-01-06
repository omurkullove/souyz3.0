'use client';

import { useRouter } from '@/navigation';
import { InitialCookies } from '@my_types/main-types';
import { FETCH_API_RL } from '@src/utils/constants';
import { decrypt, encrypt } from '@src/utils/helpers';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useUser } from './user-provider';

interface IRefreshTokenProviderProps {
    children: ReactNode;
    initialCookies: InitialCookies;
}

const RefreshTokenProvider = ({ children, initialCookies }: IRefreshTokenProviderProps) => {
    const [accessToken, setAccessToken] = useState(initialCookies.access_token);
    const [refreshToken, setRefreshToken] = useState(initialCookies.refresh_token);
    const [sessionExpires, setSessionExpires] = useState(initialCookies.session_expires);

    const isRefreshing = useRef(false);
    const refreshTimer = useRef<NodeJS.Timeout | null>(null);
    const isErrorHandled = useRef(false);
    const { updateUser } = useUser();

    const isValidSession = !!accessToken && !!refreshToken && !!sessionExpires;
    const router = useRouter();

    const clearRefreshTimer = () => {
        if (refreshTimer.current) {
            clearTimeout(refreshTimer.current);
            refreshTimer.current = null;
        }
    };

    const onError = async () => {
        if (isErrorHandled.current) return;

        isErrorHandled.current = true;
        await fetch(`${FETCH_API_RL}/api/clear-cookie`, {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            updateUser(null);
            router.push('/auth/login');
            router.refresh();
        });
    };

    const startRefreshTimer = () => {
        if (sessionExpires && isValidSession && !isRefreshing.current && !isErrorHandled.current) {
            const sessionExpireDate = new Date(sessionExpires);
            const now = new Date();
            const refreshInterval = Math.max(
                sessionExpireDate.getTime() - now.getTime() - 10000,
                0
            );

            clearRefreshTimer();
            refreshTimer.current = setTimeout(handleRefresh, refreshInterval);
        }
    };

    const handleRefresh = async () => {
        if (isRefreshing.current || !isValidSession || isErrorHandled.current) return;

        clearRefreshTimer();
        isRefreshing.current = true;

        try {
            const cookie = `access_token=${accessToken}; refresh_token=${refreshToken}`;
            const res = await fetch(`${FETCH_API_RL}/api/refresh-token`, {
                method: 'POST',
                body: JSON.stringify(encrypt(cookie)),
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Failed to refresh token');

            const data = await res.json();
            const decryptedData = decrypt(data);

            const { code, newAccessToken, newRefreshToken, newSessionExpires } = decryptedData;

            if (code === 200) {
                console.log('Updated!');
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                setSessionExpires(newSessionExpires);
                isErrorHandled.current = false;
                router.refresh();
            } else if (code === 401) {
                await onError();
            }
        } catch (error) {
            await onError();
        } finally {
            isRefreshing.current = false;
            if (!isErrorHandled.current) startRefreshTimer();
        }
    };

    useEffect(() => {
        if (isValidSession) {
            startRefreshTimer();

            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    startRefreshTimer();
                } else {
                    clearRefreshTimer();
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            return () => {
                clearRefreshTimer();
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };
        }
    }, [accessToken, refreshToken, sessionExpires, isValidSession]);

    return <>{children}</>;
};

export default RefreshTokenProvider;
