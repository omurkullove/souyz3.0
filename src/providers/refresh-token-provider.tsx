'use client';

import { useRouter } from '@i18n/routing';
import { ISession } from '@my_types/auth-types';
import { LOCAL_API_URL } from '@src/utils/constants';
import { decrypt } from '@src/utils/helpers';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';

interface IProps {
    children: ReactNode;
    initialSession: string;
}

const RefreshOnExpire: FC<IProps> = ({ children, initialSession }) => {
    const decrypted = decrypt(initialSession);
    const router = useRouter();

    const access = useRef(decrypted?.access_token);
    const refresh = useRef(decrypted?.refresh_token);
    const expires = useRef(decrypted?.access_token_expire_time);

    const isRefreshing = useRef(false);
    const refreshTimer = useRef<NodeJS.Timeout | null>(null);
    const isErrorHandled = useRef(false);
    const abortController = useRef<AbortController | null>(null);

    const isValidSession = !!access.current && !!refresh.current && !!expires.current;

    const clearRefreshTimer = () => {
        if (refreshTimer.current) {
            clearTimeout(refreshTimer.current);
            refreshTimer.current = null;
        }
    };
    const onError = useCallback(async () => {
        if (isErrorHandled.current) return;

        isErrorHandled.current = true;
        abortController.current?.abort();

        await fetch(`${LOCAL_API_URL}/clear-session`, {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            router.push('/auth/login');
            router.refresh();
        });
    }, [router]);

    const startRefreshTimer = useCallback(() => {
        if (!expires.current || !isValidSession || isRefreshing.current || isErrorHandled.current)
            return;

        const sessionExpireDate = new Date(expires.current);
        const now = new Date();
        const refreshInterval = Math.max(sessionExpireDate.getTime() - now.getTime() - 10000, 0);

        clearRefreshTimer();
        refreshTimer.current = setTimeout(handleRefresh, refreshInterval);
    }, [isValidSession]);

    const handleRefresh = useCallback(async () => {
        if (isRefreshing.current || !isValidSession || isErrorHandled.current) return;

        if (document.readyState !== 'complete') {
            await new Promise((resolve) =>
                window.addEventListener('load', resolve, { once: true })
            );
        }

        if (document.visibilityState !== 'visible') {
            startRefreshTimer();
            return;
        }

        isRefreshing.current = true;
        clearRefreshTimer();
        abortController.current = new AbortController();

        try {
            const res = await fetch(`${LOCAL_API_URL}/refresh-session`, {
                method: 'POST',
                credentials: 'include',
                signal: abortController.current.signal,
                priority: 'high',
            });

            if (!res.ok) throw new Error('Failed to refresh token');

            const data = await res.json();
            const decryptedData = decrypt(data) as ISession;

            if (!decryptedData?.access_token) throw new Error('Invalid token');

            access.current = decryptedData.access_token;
            refresh.current = decryptedData.refresh_token;
            expires.current = decryptedData.access_token_expire_time;
            isErrorHandled.current = false;
            router.refresh();
            startRefreshTimer();
        } catch (error) {
            await onError();
        } finally {
            isRefreshing.current = false;
        }
    }, [router, onError]);

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

            const handleFocus = () => {
                startRefreshTimer();
            };

            const handleResume = () => {
                startRefreshTimer();
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('focus', handleFocus);
            document.addEventListener('resume', handleResume);

            return () => {
                clearRefreshTimer();
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('focus', handleFocus);
                document.removeEventListener('resume', handleResume);
                abortController.current?.abort();
            };
        }
    }, [isValidSession, startRefreshTimer]);

    useEffect(() => {
        isRefreshing.current = false;
    }, []);

    return <>{children}</>;
};

export default RefreshOnExpire;
