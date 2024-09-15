'use client';

import { useRouter } from '@/navigation';
import { InitialCookies } from '@my_types/main-types';
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
        await fetch(`/api/clear-cookie`, {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            updateUser(null);
            router.push('/auth/login');
            router.refresh();
        });
    };

    const startRefreshTimer = () => {
        if (sessionExpires && isValidSession && !isRefreshing.current) {
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
        if (isRefreshing.current || !isValidSession) return;

        clearRefreshTimer();

        isRefreshing.current = true;

        try {
            const cookie = `access_token=${accessToken}; refresh_token=${refreshToken}`;

            const res = await fetch(`/api/refresh-token`, {
                method: 'POST',
                body: JSON.stringify(encrypt(cookie)),
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Failed to refresh token');

            const data = await res.json();
            const decrypt_data = decrypt(data);

            const { code, newAccessToken, newRefreshToken, newSessionExpires, souyz_session } =
                decrypt_data;

            if (code === 200) {
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                setSessionExpires(newSessionExpires);
                router.refresh();
            } else if (code === 401 && isRefreshing) {
                await onError();
            }
        } catch (error) {
            await onError();
        } finally {
            isRefreshing.current = false;
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
