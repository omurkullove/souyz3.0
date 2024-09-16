import { ReactNode } from 'react';

import { Layout } from '@components/layout';
import { ISession } from '@my_types/auth-types';
import { InitialCookies } from '@my_types/main-types';
import { decrypt } from '@src/utils/helpers';
import { cookies } from 'next/headers';
import { LocaleProvider } from './locale-provider';
import RefreshTokenProvider from './refresh-token-provider';
import { UserProvider } from './user-provider';

interface IMainProviderProps {
    children: ReactNode;
    mode: ModeType;
}

const MainProvider = async ({ children, mode }: IMainProviderProps) => {
    const cookieStore = cookies();

    const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ru') as Locale;
    const user = decrypt(cookieStore.get('soyuz_session')?.value || '') as ISession;

    const access_token = cookieStore.get('access_token')?.value || null;
    const refresh_token = cookieStore.get('refresh_token')?.value || null;

    const initialCookies = {
        session_expires: user?.session_expires,
        access_token,
        refresh_token,
    } as InitialCookies;

    return (
        <UserProvider user={user}>
            <RefreshTokenProvider initialCookies={initialCookies}>
                <LocaleProvider locale={locale}>
                    <Layout mode={mode}>{children}</Layout>
                </LocaleProvider>
            </RefreshTokenProvider>
        </UserProvider>
    );
};

export default MainProvider;
