'use client';

import { useRouter } from '@i18n/routing';
import { ISession } from '@my_types/auth-types';
import { LOCAL_API_URL, REFRESH_INTERVAL_GUARD } from '@src/utils/constants';
import { decrypt } from '@src/utils/helpers';
import { isAxiosError } from 'axios';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { useUser } from './user-provider';

interface IProps {
    children: ReactNode;
    initialSession: string;
}

const RefreshOnExpire: FC<IProps> = ({ children, initialSession }) => {
    const { updateUser } = useUser();
    const decrypted = decrypt(initialSession) as ISession | null;
    const router = useRouter();

    const access = useRef(decrypted?.access_token);
    const refresh = useRef(decrypted?.refresh_token);
    const expires = useRef(decrypted?.access_token_expire_time);
    const lastRefreshed = useRef(decrypted?.last_refreshed);

    const isRefreshing = useRef(false);
    const refreshTimer = useRef<NodeJS.Timeout | null>(null);
    const isErrorHandled = useRef(false);
    const abortController = useRef<AbortController | null>(null);

    const isValidSession =
        !!access.current && !!refresh.current && !!expires.current;

    const clearRefreshTimer = useCallback(() => {
        if (refreshTimer.current) {
            clearTimeout(refreshTimer.current);
            refreshTimer.current = null;
        }
    }, []);

    const onError = useCallback(async () => {
        if (isErrorHandled.current) return;

        isErrorHandled.current = true;
        abortController.current?.abort();

        await fetch(`${LOCAL_API_URL}/clear-session`, {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            router.push('/auth/login');
            updateUser(null);
            router.refresh();
        });
    }, [router]);

    const startRefreshTimer = useCallback(() => {
        if (
            !expires.current ||
            !isValidSession ||
            isRefreshing.current ||
            isErrorHandled.current
        )
            return;

        const sessionExpireDate = new Date(expires.current);
        const now = new Date();
        const refreshInterval = Math.max(
            sessionExpireDate.getTime() - now.getTime() - 10000,
            0
        );

        clearRefreshTimer();
        refreshTimer.current = setTimeout(handleRefresh, refreshInterval);
    }, [isValidSession, clearRefreshTimer]);

    const handleRefresh = useCallback(async () => {
        if (isRefreshing.current || !isValidSession || isErrorHandled.current)
            return;

        if (
            lastRefreshed.current &&
            new Date().getTime() - lastRefreshed.current <
                REFRESH_INTERVAL_GUARD
        ) {
            return;
        }

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
            lastRefreshed.current = new Date().getTime();
            isErrorHandled.current = false;
            router.refresh();
        } catch (error) {
            if (isAxiosError(error) && error.status === 401) {
                router.refresh();
            } else {
                await onError();
            }
        } finally {
            isRefreshing.current = false;
        }
    }, [router, onError, startRefreshTimer, isValidSession]);

    useEffect(() => {
        if (isValidSession) {
            startRefreshTimer();

            const visibilityChangeHandler = () => {
                if (document.visibilityState === 'visible') {
                    startRefreshTimer();
                } else {
                    clearRefreshTimer();
                }
            };

            const focusHandler = () => startRefreshTimer();

            const resumeHandler = () => startRefreshTimer();

            document.addEventListener(
                'visibilitychange',
                visibilityChangeHandler
            );
            window.addEventListener('focus', focusHandler);
            document.addEventListener('resume', resumeHandler);

            return () => {
                clearRefreshTimer();
                document.removeEventListener(
                    'visibilitychange',
                    visibilityChangeHandler
                );
                window.removeEventListener('focus', focusHandler);
                document.removeEventListener('resume', resumeHandler);
                abortController.current?.abort();
            };
        }
    }, [isValidSession, startRefreshTimer, clearRefreshTimer]);

    useEffect(() => {
        isRefreshing.current = false;
    }, []);

    return <>{children}</>;
};

export default RefreshOnExpire;
