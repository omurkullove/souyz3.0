import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import { cookies } from 'next/headers';
import React, { ReactNode } from 'react';

import GoogleAnalytics from '@components/google-analytics/google-analytics';
import MainProvider from '@providers/main-provider';
import NextTopLoader from 'nextjs-toploader';

import '@src/globals.scss';

const font = Raleway({
    subsets: ['latin'],
});

type Props = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: 'Цифровой портал «Союз»',
    description:
        'Souyz.kg — это организация, предоставляющая широкий спектр услуг для российских соотечественников и всех, кто заинтересован в жизни и работе в Кыргызстане. Мы оказываем помощь в юридических вопросах, поддерживаем малый и средний бизнес, а также помогаем людям, находящимся в поиск образовательных программ или решения миграционных вопросов.',
    icons: '/images/page-icon.ico',
    robots: 'index, follow',
    keywords:
        'юридические вопросы, малый бизнес, документы, туризм, средний бизнес, Кыргызстан, образовательные программы, миграционные вопросы',
    openGraph: {
        title: 'Цифровой портал «Союз»',
        description:
            'Souyz.kg — это организация, предоставляющая широкий спектр услуг для российских соотечественников и всех, кто заинтересован в жизни и работе в Кыргызстане. Мы оказываем помощь в юридических вопросах, поддерживаем малый и средний бизнес, а также помогаем людям, находящимся в поиск образовательных программ или решения миграционных вопросов.',
        images: ['/images/page-icon.ico'],
        url: 'https://souyz.kg',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Цифровой портал «Союз»',
        description:
            'Souyz.kg — это организация, предоставляющая широкий спектр услуг для российских соотечественников и всех, кто заинтересован в жизни и работе в Кыргызстане. Мы оказываем помощь в юридических вопросах, поддерживаем малый и средний бизнес, а также помогаем людям, находящимся в поиск образовательных программ или решения миграционных вопросов.',
        images: ['/images/og_photo.png'],
    },
    metadataBase: new URL('https://souyz.kg'),
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
            lang={locale?.value}
            data-theme={mode?.value}
        >
            <GoogleAnalytics />
            <body className={font.className}>
                <NextTopLoader
                    color='#007bff'
                    height={3}
                />
                <MainProvider mode={(mode?.value as ModeType) || 'light'}>{children}</MainProvider>
            </body>
        </html>
    );
};

export default RootLayout;
