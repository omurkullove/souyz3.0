import { INewsResponse } from '@my_types/news-types';
import { API } from '@src/axios';
import { requestHandler } from '../request-handler';

class NewsService {
    async getNews(page: number): Promise<INewsResponse> {
        return requestHandler(() => API.get('/ntf/news/all', { params: { page } }));
    }
}

export default new NewsService();
