import axios from 'axios';
import { API_URL, COOKIES } from './utils/constants';
import { getTokensFromSession } from './utils/helpers';

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

API.interceptors.request.use(async (config) => {
    const { cookies } = await import('next/headers');

    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(COOKIES.SESSION);
    const tokens = getTokensFromSession(sessionCookie?.value);

    if (tokens) {
        config.headers['Cookie'] = tokens;
    }

    return config;
});
