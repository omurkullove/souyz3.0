import newsService from '@service/news/news-service';

import { decrypt } from '@src/utils/helpers';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import NewsPortalView from './news-portal-view';

const fetchNews = async (page: number) => {
    const news = await newsService.getNews(page);

    return news;
};

const fetchCachedNews = (page: number, hashed_page: string) => {
    return unstable_cache(() => fetchNews(page), [`news-data-page-${hashed_page}`], {
        revalidate: 600,
    })();
};

const NewsPortal = async () => {
    const hashed_page = cookies().get('page')?.value ?? 'static';

    const page = Number(decrypt(hashed_page)) || 1;

    const { data } = await fetchCachedNews(page, hashed_page);

    return (
        <NewsPortalView
            news={data}
            initialPage={page}
        />
    );
};

export default NewsPortal;
