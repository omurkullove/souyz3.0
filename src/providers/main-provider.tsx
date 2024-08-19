import React, { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { LocaleProvider } from './locale-provider';
import { Layout } from '@components/layout';
import { UserProvider } from './user-provider';
import { decrypt } from '@src/utils';
import WebsocketWrapper from '@src/websocket/websocket-wrapper';

interface IMainProviderProps {
    children: ReactNode;
    mode: ModeType;
}

const MainProvider = async ({ children, mode }: IMainProviderProps) => {
    const cookieStore = cookies();

    const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ru') as Locale;
    const user = decrypt(cookieStore.get('souyz_session')?.value || '');

    return (
        <UserProvider user={user}>
            <LocaleProvider locale={locale}>
                <WebsocketWrapper>
                    <Layout mode={mode}>{children}</Layout>
                </WebsocketWrapper>
            </LocaleProvider>
        </UserProvider>
    );
};

export default MainProvider;
