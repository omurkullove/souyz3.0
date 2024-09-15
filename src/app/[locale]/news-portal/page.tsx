import newsService from '@service/news/news-service';

import { decrypt } from '@src/utils/helpers';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import NewsPortalView from './news-portal-view';

const fetchNews = async (decrypted_page: number) => {
    const news = await newsService.getNews(decrypted_page);

    return news;
};

const fetchCachedNews = (decrypted_page: number, page: string) => {
    return unstable_cache(() => fetchNews(decrypted_page), [page], {
        revalidate: 600,
    })();
};

const NewsPortal = async () => {
    const page = cookies().get('page')?.value || '';
    const decrypted_page = Number(decrypt(page)) || 1;

    const { data } = await fetchCachedNews(decrypted_page, page);

    return (
        <NewsPortalView
            news={data}
            initialPage={decrypted_page}
        />
    );
};

export default NewsPortal;
