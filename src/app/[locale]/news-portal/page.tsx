import newsService from '@service/news/news-service';

import { decrypt } from '@src/utils/helpers';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import NewsPortalView from './news-portal-view';

const fetchNews = async (page: number) => {
    const news = await newsService.getNews(page);

    console.log('NEWS');

    return news;
};

const fetchCachedNews = (page: number, cookie: string) => {
    return unstable_cache(() => fetchNews(page), [`news-data-page-${page}`, cookie], {
        revalidate: 600,
    })();
};

const NewsPortal = async () => {
    const page = Number(decrypt(cookies().get('page')?.value || '')) || 1;
    const cookie = cookies().get('access_token')?.value || 'static-key';

    const { data } = await fetchCachedNews(page, cookie);

    return (
        <NewsPortalView
            news={data}
            initialPage={page}
        />
    );
};

export default NewsPortal;
