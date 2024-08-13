import React, { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { LocaleProvider } from './locale-provider';
import { Layout } from '@components/layout';

interface IMainProviderProps {
    children: ReactNode;
    mode: ModeType;
}

const MainProvider = ({ children, mode }: IMainProviderProps) => {
    const cookieStore = cookies();
    const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ru') as Locale;

    return (
        <LocaleProvider locale={locale}>
            <Layout mode={mode}>{children}</Layout>
        </LocaleProvider>
    );
};

export default MainProvider;
