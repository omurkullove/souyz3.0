import { ReactNode } from 'react';

import { Layout } from '@components/layout';
import { decrypt } from '@src/utils/helpers';
import WebsocketWrapper from '@src/websocket/websocket-wrapper';
import { cookies, headers } from 'next/headers';
import { LocaleProvider } from './locale-provider';
import { UserProvider } from './user-provider';

interface IMainProviderProps {
    children: ReactNode;
    mode: ModeType;
}

const MainProvider = async ({ children, mode }: IMainProviderProps) => {
    const cookieStore = cookies();

    const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ru') as Locale;
    const user = decrypt(cookieStore.get('souyz_session')?.value || '');

    const hostname = headers().get('Host')?.replace(':3000', '');

    return (
        <UserProvider user={user}>
            <LocaleProvider locale={locale}>
                <WebsocketWrapper hostname={hostname ?? ''}>
                    <Layout mode={mode}>{children}</Layout>
                </WebsocketWrapper>
            </LocaleProvider>
        </UserProvider>
    );
};

export default MainProvider;
