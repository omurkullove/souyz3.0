import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Raleway } from 'next/font/google';
import { cookies } from 'next/headers';
import React, { ReactNode } from 'react';

import MainProvider from '@providers/main-provider';
import NextTopLoader from 'nextjs-toploader';

import GoogleAnalytics from '@components/google-analytics/google-analytics';
import '@src/globals.scss';
import { domain, protocol } from '@src/utils/constants';

const font = Raleway({
    subsets: ['latin', 'cyrillic'],
});

type Props = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: 'Цифровой портал «Союз»',
    description:
        'soyuz.kg — это организация, предоставляющая широкий спектр услуг для российских соотечественников и всех, кто заинтересован в жизни и работе в Кыргызстане. Мы оказываем помощь в юридических вопросах, поддерживаем малый и средний бизнес, а также помогаем людям, находящимся в поиск образовательных программ или решения миграционных вопросов.',
    icons: '/images/page-icon.ico',
    robots: 'index, follow',
    keywords:
        'юридические вопросы, малый бизнес, документы, туризм, средний бизнес, Кыргызстан, образовательные программы, миграционные вопросы',
    openGraph: {
        title: 'Цифровой портал «Союз»',
        description:
            'Soyuz.kg — это организация, предоставляющая широкий спектр услуг для российских соотечественников и всех, кто заинтересован в жизни и работе в Кыргызстане. Мы оказываем помощь в юридических вопросах, поддерживаем малый и средний бизнес, а также помогаем людям, находящимся в поиск образовательных программ или решения миграционных вопросов.',
        images: ['/images/page-icon.ico'],
        url: `${protocol}://${domain}`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Цифровой портал «Союз»',
        description:
            'Soyuz.kg — это организация, предоставляющая широкий спектр услуг для российских соотечественников и всех, кто заинтересован в жизни и работе в Кыргызстане. Мы оказываем помощь в юридических вопросах, поддерживаем малый и средний бизнес, а также помогаем людям, находящимся в поиск образовательных программ или решения миграционных вопросов.',
        images: ['/images/og_photo.png'],
    },
    metadataBase: new URL(`${protocol}://${domain}`),
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
};

const RootLayout: React.FC<Props> = ({ children }) => {
    const cookiesStore = cookies();

    const mode = cookiesStore.get('mode');
    const locale = cookiesStore.get('NEXT_LOCALE');

    return (
        <html
            lang={locale?.value ?? 'ru'}
            data-theme={mode?.value}
        >
            <GoogleAnalytics />
            <body className={font.className}>
                <NextTopLoader
                    color='#007bff'
                    height={3}
                />
                <NextIntlClientProvider>
                    <MainProvider mode={(mode?.value as ModeType) || 'light'}>
                        {children}
                    </MainProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
