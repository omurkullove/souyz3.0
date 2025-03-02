import { ReactNode } from 'react';

import { Layout } from '@components/layout';
import { COOKIES } from '@src/utils/constants';
import { cookies } from 'next/headers';
import { LocaleProvider } from './locale-provider';
import RefreshOnExpire from './refresh-token-provider';
import { UserProvider } from './user-provider';

interface IMainProviderProps {
    children: ReactNode;
    theme: Theme;
    locale: Locale;
}

const MainProvider = async ({ children, theme, locale }: IMainProviderProps) => {
    const cookieStore = cookies();

    const session = cookieStore.get(COOKIES.SESSION)?.value || '';

    return (
        <UserProvider session={session}>
            <RefreshOnExpire initialSession={session}>
                <LocaleProvider locale={locale}>
                    <Layout theme={theme}>{children}</Layout>
                </LocaleProvider>
            </RefreshOnExpire>
        </UserProvider>
    );
};

export default MainProvider;
