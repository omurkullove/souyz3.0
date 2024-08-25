'use client';

import { useRouter } from '@/navigation';
import HeroPages from '@components/hero-pages/hero-pages';
import { IPaginatedData } from '@my_types/main-types';
import { INews } from '@my_types/news-types';
import { encrypt } from '@src/utils/helpers';
import Cookies from 'js-cookie';
import 'moment/locale/ky';
import 'moment/locale/ru';

import { withTranslate } from '@i18n/withTranslate';
import { NEWS_PAGE_COOKIE_EXPIRE } from '@src/utils/constants';
import { useRef } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import NewsItem from './news-item/news-item';
import styles from './news-portal-view.module.scss';

interface INewsPortalViewProps {
    news: IPaginatedData<INews>;
    initialPage: number;
    translated: IntlMessages['NewsPortal'];
}

const NewsPortalView = ({ news, initialPage, translated }: INewsPortalViewProps) => {
    const isNews = news && news.items && news.items.length;

    const router = useRouter();

    const ref = useRef<HTMLHeadingElement>(null);

    const scrollToStart = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleNextPage = () => {
        const encrypted_value = encrypt(initialPage + 1);
        Cookies.set('page', encrypted_value, { expires: NEWS_PAGE_COOKIE_EXPIRE });
        scrollToStart();
        router.refresh();
    };

    const handlePreviousPage = () => {
        if (initialPage > 1) {
            const encrypted_value = encrypt(initialPage - 1);
            Cookies.set('page', encrypted_value, { expires: NEWS_PAGE_COOKIE_EXPIRE });

            router.refresh();
        }
    };

    return (
        <div className={styles.container}>
            <HeroPages
                title={translated.title}
                img_key='news-portal'
            />
            <div className={styles.content}>
                <h1
                    className={styles.title}
                    ref={ref}
                >
                    {translated.subtitle}
                </h1>

                <div className={styles.body}>
                    {isNews ? (
                        news.items.map((item) => (
                            <NewsItem
                                key={item.uuid}
                                item={item}
                                source_title={translated.source}
                            />
                        ))
                    ) : (
                        <h5 className={styles.no_news_tile}>{translated.no_news}</h5>
                    )}
                </div>
                {isNews && (
                    <div className={styles.footer}>
                        <button
                            className={styles.navigation_btn}
                            onClick={handlePreviousPage}
                            disabled={initialPage === 1}
                        >
                            <FaArrowLeftLong />
                            {translated.btn_back}
                        </button>
                        <p className={styles.page}>{initialPage}</p>
                        <button
                            className={styles.navigation_btn}
                            onClick={handleNextPage}
                            disabled={initialPage === news.total_pages}
                        >
                            {translated.btn_forward}

                            <FaArrowRightLong />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withTranslate(NewsPortalView, ['NewsPortal']);
