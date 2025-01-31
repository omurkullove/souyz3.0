import newsService from '@service/news/news-service';
import { decrypt } from '@src/utils/helpers';
import { cache } from 'react';
import NewsPortalView from './news-portal-view';

const fetchNews = cache(async (page: number) => {
    const news = await newsService.getNews(page);
    return news.data;
});

const NewsPortal = async ({ searchParams }: { searchParams: { page?: string } }) => {
    const decrypted_page = Number(decrypt(searchParams.page || '1')) || 1;
    const news = await fetchNews(decrypted_page);

    return (
        <NewsPortalView
            news={news}
            initialPage={decrypted_page}
        />
    );
};

export default NewsPortal;
